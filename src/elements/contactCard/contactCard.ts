import chatsController from '../../controllers/chatsController';
import store from '../../utils/store';

export const handleDeleteChat = (e: Event, id: number) => {
  e.stopPropagation();
  chatsController.deleteChat(id);
};

export const handleCardChange = (id: number) => {
  store.set('currentChat.value', id);
  chatsController.getChatUsers(id);
};
