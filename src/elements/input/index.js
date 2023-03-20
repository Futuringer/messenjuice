import { compile } from 'handlebars';

import { inputTmp } from "./inputTmp";

console.log('formTmp',formTmp)

const input = ()=>{
  return compile(inputTmp)()
}

export default {input}