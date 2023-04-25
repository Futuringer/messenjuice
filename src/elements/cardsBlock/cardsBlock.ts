import chatController from '../../controllers/chatsController';

export const handleAddChatClick = () => {
  const input = document.getElementsByName('newChatInput')[0] as HTMLInputElement;
  if (input.value.length) {
    chatController.createChat(input.value);
  }
};
