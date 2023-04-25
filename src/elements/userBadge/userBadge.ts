import chatController from '../../controllers/chatsController';
import store from '../../utils/store';

export const handleDeleteUserFromChat = (id: number) => {
  const chatId = store.getState().currentChat?.value;
  if (chatId) {
    chatController.deleteUsers({ chatId, users: [id] });
  }
};
