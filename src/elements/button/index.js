import { compile } from 'handlebars';

import { buttonTmp } from "./buttonTmp";

console.log('buttonTmp',buttonTmp)
const button = ()=>{
  return compile(buttonTmp)()
}

export default {button}