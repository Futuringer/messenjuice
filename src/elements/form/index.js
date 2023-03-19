const Handlebars = require('handlebars');

const { formTmp } = require("./formTmp");

console.log('formTmp',formTmp)

const form = ()=>{
  return Handlebars.compile(formTmp)()
}

module.exports = {form}