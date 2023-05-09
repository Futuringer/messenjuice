/* eslint-disable @typescript-eslint/no-var-requires */
const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const fs = require('fs');

const { window } = new JSDOM('<div id="root"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.FormData = window.FormData;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.scss'] = function () {
  module.exports = () => ({});
};
require.extensions['.png'] = () => null;
