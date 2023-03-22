import { compile } from 'handlebars';

import errorBlockTmp from './errorBlockTmp';

const errorBlock = () => {
  return compile(errorBlockTmp)();
};

export default { errorBlock };
