import Handlebars from 'handlebars';
import {
  renderLogin,
  renderProfile,
  renderRegistration,
  renderClientError,
  renderServerError,
  //  renderChat,
} from './pages';
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

switch (path) {
  case '/':
    window.location.href = '/sign-in';
    break;
  case '/sign-in':
    container.innerHTML = renderLogin();
    break;
  case '/sign-up':
    container.innerHTML = renderRegistration();
    break;
  case '/profile':
    container.innerHTML = renderProfile();
    break;
  case '/500':
    container.innerHTML = renderServerError();
    break;
  // case '/chat':
  //   container.innerHTML = renderChat();
  //   break;
  default:
    container.innerHTML = renderClientError();
    break;
}
