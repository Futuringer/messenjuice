import { compile } from 'handlebars';

import buttonTmp from './buttonTmp';

const button = () => {
  return compile(buttonTmp)();
};

export default { button };
