const Handlebars = require('handlebars');

const { inputTmp } = require("./inputTmp").default;

console.log('formTmp',formTmp)

const input = ()=>{
  return Handlebars.compile(inputTmp)()
}

module.exports = {input}