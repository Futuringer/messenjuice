const Handlebars = require('handlebars');

const  { errorBlockTmp } = require("./errorBlockTmp");

const errorBlock = ()=>{
  return Handlebars.compile(errorBlockTmp)()
}

module.exports = {errorBlock}