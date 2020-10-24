const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
// const keypress = require('./keypressHandler');
const validMessages = ['left', 'right', 'up', 'down'];

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.randomCommand = () => {
  let index = Math.floor(Math.random() * validMessages.length);
  return validMessages[index];
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  res.end(module.exports.randomCommand());
  next(); // invoke next() at the end of a request to help with testing!
};
