import Handlebars from 'handlebars';
import LoginPageComponent from './pages/login';
import ClientErrorPageComponent from './pages/404';
import ServerErrorPageComponent from './pages/500';
import ChatPageComponent from './pages/chat';
import ProfilePageComponent from './pages/profile';
import RegistrationPageComponent from './pages/registration';
import errorBlockTmp from './elements/errorBlock/errorBlockTmp';
import buttonTmp from './elements/button/buttonTmp';
import formTmp from './elements/form/formTmp';
import inputTmp from './elements/input/inputTmp';
import { router } from './utils/router';
import authController from './controllers/authController';
import chatsController from './controllers/chatsController';
import Block from './utils/block';
import { ROUTES } from './utils/consts';

Handlebars.registerPartial('errorBlock', errorBlockTmp);
Handlebars.registerPartial('button', buttonTmp);
Handlebars.registerPartial('input', inputTmp);
Handlebars.registerPartial('form', formTmp);
router
  .use(ROUTES.LOGIN, LoginPageComponent as typeof Block)
  .use(ROUTES.REGISTRATION, RegistrationPageComponent as typeof Block)
  .use(ROUTES.PROFILE, ProfilePageComponent)
  .use(ROUTES.MESSENGER, ChatPageComponent)
  .use(ROUTES.SERVERERROR, ServerErrorPageComponent as typeof Block)
  .use(ROUTES.CLIENTERROR, ClientErrorPageComponent as typeof Block);

window.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname === ROUTES.MESSENGER) {
    chatsController.getChats({});
  }
  if (window.location.pathname !== ROUTES.LOGIN && window.location.pathname !== ROUTES.REGISTRATION) {
    try {
      await authController.fetchUser();
      router.start();
    } catch (e) {
      router.start();
      router.go(ROUTES.LOGIN);
    }
  } else {
    router.start();
  }
});
