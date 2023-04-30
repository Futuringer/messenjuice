import { ChatMessageType } from 'src/utils/store';
import { User } from './authApi';
import BaseAPI from './baseApi';
import WebSocketAPI from './webSocketApi';

export type UserWithRole = User & {
  role: string;
};

type UserChatData = Omit<User, 'id' | 'display_name'>;

type LastMessageType = {
  user: UserChatData;
  time: string;
  content: string;
};

export type ChatType = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: LastMessageType;
  token: string;
  messages: ChatMessageType[];
  users: UserWithRole[];
  userIsAdmin: boolean;
  wsInstance: WebSocketAPI;
};

export type GetChatsParams = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type CreateChatPayload = {
  title: string;
};

export type AddUsersToChatPayload = {
  users: number[];
  chatId: number;
};

export type DeleteChatPayload = {
  chatId: number;
};

export type GetTokenResponse = {
  token: string;
};

export default class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  // получить список чатов
  getChats(data: GetChatsParams) {
    return this.http.get<ChatType[]>('', { data });
  }

  // создать чат
  createChat(data: CreateChatPayload) {
    return this.http.post('', {
      data,
    });
  }

  // добавить пользователей в чат
  addUsers(data: AddUsersToChatPayload) {
    return this.http.put('/users', {
      data,
    });
  }

  // удалить пользователей из чата
  deleteUsers(data: AddUsersToChatPayload) {
    return this.http.delete('/users', {
      data,
    });
  }

  // получить пользователей чата
  getUsers(id: number) {
    return this.http.get<UserWithRole[]>(`/${id}/users`);
  }

  // удалить чат
  deleteChat(data: DeleteChatPayload) {
    return this.http.delete('', {
      data,
    });
  }

  // получить токен
  fetchToken(chatId: number) {
    return this.http.post<GetTokenResponse>(`/token/${chatId}`);
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  read = undefined;
}
