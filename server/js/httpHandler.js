const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const dequeueMessage = require('./messageQueue');
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

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  if (req.method === 'GET') {
    if (req.url === '/') {
      var data = dequeueMessage.dequeue() || module.exports.randomCommand();
      res.writeHead(200, headers);
      res.end(data);
      next();
    }
    if (req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          // console.log('hellooooo')
          res.writeHead(404, headers);
        } else {

          res.writeHead(200, headers);

        }
        res.end()
        next();
      })
    }
  }
  if (req.method === 'POST') {

  }

  // next(); // invoke next() at the end of a request to help with testing!
};
