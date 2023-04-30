import { ROUTES } from '../../utils/consts';
import { router } from '../../utils/router';
import webSocketController from '../../controllers/webSocketController';
import store from '../../utils/store';

export const handleSettingsButtonClick = () => {
  router.go(ROUTES.PROFILE);
};

export const handleSendMessage = (message: string) => {
  const { currentChat } = store.getState();
  const chats = store.getState().chats?.cards;

  const currentWSInstance = chats?.find(item => {
    return item.id === currentChat?.value;
  })?.wsInstance;

  if (currentChat && currentWSInstance) {
    webSocketController.sendMessage(currentWSInstance, message);
  }
};
