import { compile } from 'handlebars';

import inputTmp from './inputTmp';

const input = () => {
  return compile(inputTmp)({});
};

export default { input };
