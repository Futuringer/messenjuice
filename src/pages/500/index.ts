import Handlebars from 'handlebars';
import serverErrorTmp from './500Tmp';

const renderServerError = () => {
  return Handlebars.compile(serverErrorTmp)({
    errorTitle: '500',
    errorText: 'Server error',
    button: { type: 'button', text: 'Back to chat', isActive: true },
  });
};

export default renderServerError;
