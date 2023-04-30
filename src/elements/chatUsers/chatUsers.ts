import chatController from '../../controllers/chatsController';
import store from '../../utils/store';

export const handleAddChatClick = () => {
  const input = document.getElementsByName('addUserInput')[0] as HTMLInputElement;
  const currentChat = store.getState().currentChat?.value;
  if (currentChat && input.value.length) {
    chatController.addUsers({ chatId: currentChat, users: [+input.value] });
  }
};
