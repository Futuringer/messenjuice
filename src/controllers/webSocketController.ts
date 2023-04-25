import store from '../utils/store';
import WebSocketAPI, { WebSocketConnectPayload, ChatMessagePaload } from '../api/webSocketApi';

import { transformGetChatsResponse } from './transformers/webSocketTransformer';

class WebSocketController {
  private api: WebSocketAPI;

  constructor() {
    this.api = new WebSocketAPI();
  }

  connectToChat(data: { wsParams: WebSocketConnectPayload; unreadMessages: number }) {
    const api = new WebSocketAPI();

    const crds = store.getState().chats?.cards;
    const updatedCards = crds?.map(item => {
      return item.id === data.wsParams.chatId ? { ...item, wsInstance: api } : item;
    });
    store.set('chats.cards', updatedCards);

    api.connect(data.wsParams);
    const socket = api.getSocketInstance();
    socket.addEventListener('open', () => {
      setInterval(() => {
        api.ping();
      }, 3000);
    });

    socket.addEventListener('message', e => {
      const res = JSON.parse(e.data);
      const cards = store.getState().chats?.cards;

      // получили массив сообщений для всех чатов
      if (Array.isArray(res as ChatMessagePaload[])) {
        const changedCard = cards?.find(item => {
          return item.id === res[0]?.chat_id;
        });
        const newCard = { ...changedCard, messages: transformGetChatsResponse(res) };
        const newCards = cards?.map(item => {
          return item.id === newCard.id ? newCard : item;
        });
        store.set('chats.cards', newCards);

        // получили сообщение по сокету для конкретного чата
      } else if (res.type === 'message') {
        const changedCard = cards?.find(item => {
          return item.id === data.wsParams.chatId;
        });
        const newCard = {
          ...changedCard,
          messages: [transformGetChatsResponse(res), ...(changedCard?.messages || [])],
        };
        const newCards = cards?.map(item => {
          return item.id === newCard.id ? newCard : item;
        });
        store.set('chats.cards', newCards);
      }
    });
  }

  sendMessage(api: WebSocketAPI, message: string) {
    api.send({ content: message, type: 'message' });
  }
}

const webSocketController = new WebSocketController();
export default webSocketController;
