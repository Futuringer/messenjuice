import { compile } from 'handlebars';

import { formTmp } from "./formTmp";

const form = ()=>{
  return compile(formTmp)()
}

export default {form}