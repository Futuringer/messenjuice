export type WebSocketConnectPayload = {
  userId: number;
  chatId: number;
  token: string;
};

export type WSMessageData = {
  content: string;
  type: 'get old' | 'ping' | 'pong' | 'message' | 'file' | 'sticker';
};

export type ChatMessagePaload = {
  chat_id: number;
  content: string;
  file: any;
  id: number;
  is_read: boolean;
  time: string;
  type: WSMessageData['type'];
  user_id: number;
};

export default class WebSocketAPI {
  socket: WebSocket;

  connect(data: WebSocketConnectPayload) {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${data.userId}/${data.chatId}/${data.token}`);
  }

  getSocketInstance() {
    return this.socket;
  }

  send(data: WSMessageData) {
    this.socket.send(JSON.stringify(data));
  }

  ping() {
    this.send({ content: '', type: 'ping' });
  }

  getOld(offset: string) {
    this.send({ content: offset, type: 'get old' });
  }
}
