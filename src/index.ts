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

Handlebars.registerPartial('errorBlock', errorBlockTmp);
Handlebars.registerPartial('button', buttonTmp);
Handlebars.registerPartial('input', inputTmp);
Handlebars.registerPartial('form', formTmp);
router
  .use('/', LoginPageComponent)
  .use('/sign-up', RegistrationPageComponent)
  .use('/settings', ProfilePageComponent)
  .use('/messenger', ChatPageComponent)
  .use('/serverError', ServerErrorPageComponent)
  .use('/clientError', ClientErrorPageComponent);
//   .start();

// if (window.location.pathname === '/settings') {
//   authController.fetchUser();
// }

window.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname !== '/' && window.location.pathname !== '/sign-up') {
    try {
      await authController.fetchUser();

      router.start();

      // if (!isProtectedRoute) {
      //   Router.go(Routes.Profile);
      // }
    } catch (e) {
      router.start();
      router.go('/');
    }
  } else {
    router.start();
  }
});
