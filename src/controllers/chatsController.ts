import store from '../utils/store';
import ChatsAPI, { GetChatsParams, AddUsersToChatPayload, ChatType } from '../api/chatsApi';
import {
  transformGetChatsResponse,
  transformGetChatsParams,
  transformGetChatUsers,
} from './transformers/chatsTransformers';
import webSocketController from './webSocketController';

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  async getChats(data: GetChatsParams) {
    await this.api.getChats(transformGetChatsParams(data)).then(chats => {
      store.set('chats.cards', transformGetChatsResponse(chats));
      const fn = (v: ChatType) => {
        return this.getToken(v.id);
      };
      const actions = chats.map(fn);
      const results = Promise.all(actions);
      results.then(() => {
        const str = store.getState();
        const cards = str.chats?.cards;
        const userId = str.user.data?.id;
        cards?.forEach(item => {
          const { token } = item;
          if (userId) {
            webSocketController.connectToChat({ wsParams: { chatId: item.id, userId, token }, unreadMessages: 0 });
          }
        });
      });
    });
  }

  async deleteChat(data: number) {
    await this.api.deleteChat({ chatId: data });
    store.set(
      'chats.cards',
      store.getState().chats?.cards.filter(item => item.id !== data),
    );
  }

  async createChat(data: string) {
    await this.api.createChat({ title: data });
    this.getChats({});
  }

  async addUsers(data: AddUsersToChatPayload) {
    await this.api.addUsers(data).then(_ => {
      this.getChatUsers(data.chatId);
    });
  }

  async deleteUsers(data: AddUsersToChatPayload) {
    await this.api.deleteUsers(data).then(_ => {
      this.getChatUsers(data.chatId);
    });
  }

  async getChatUsers(chatId: number) {
    await this.api.getUsers(chatId).then(users => {
      store.set('currentChat.users', transformGetChatUsers(users));
    });
  }

  async getToken(chatId: number) {
    await this.api.fetchToken(chatId).then(data => {
      const cards = store.getState().chats?.cards;
      const withToken = cards?.map(item => {
        if (item.id === chatId) {
          return { ...item, token: data.token };
        }
        return item;
      });
      store.set('chats.cards', withToken);
    });
  }
}

const chatsController = new ChatsController();
export default chatsController;
