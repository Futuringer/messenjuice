import Handlebars from 'handlebars';
import RegistrationPage from './pages/registration';
import LoginPage from './pages/login';
import ChatPage from './pages/chat';
import ProfilePage from './pages/profile';
import { renderClientError, renderServerError } from './pages';
import errorBlockTmp from './elements/errorBlock/errorBlockTmp';
import buttonTmp from './elements/button/buttonTmp';
import formTmp from './elements/form/formTmp';
import inputTmp from './elements/input/inputTmp';

Handlebars.registerPartial('errorBlock', errorBlockTmp);
Handlebars.registerPartial('button', buttonTmp);
Handlebars.registerPartial('input', inputTmp);
Handlebars.registerPartial('form', formTmp);
const container = document.getElementById('root');
const path = window.location.pathname;

if (container) {
  switch (path) {
    case '/':
      window.location.href = '/sign-in';
      break;
    case '/sign-in':
      container.append(LoginPage.getContent()!);
      break;
    case '/sign-up':
      container.append(RegistrationPage.getContent()!);
      break;
    case '/profile':
      container.append(ProfilePage.getContent()!);
      break;
    case '/500':
      container.innerHTML = renderServerError();
      break;
    case '/chat':
      container.append(ChatPage.getContent()!);
      break;
    default:
      container.innerHTML = renderClientError();
      break;
  }
}
