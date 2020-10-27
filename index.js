// A script to save the entire Bible into a mongoDB

// console.log(process.env)
const http = require('http');
const https = require('https');


// const requestListener = function (req, res) {
//   res.writeHead(200);
//   res.end('Hello, World!');
// }

// const server = http.createServer(requestListener);
// server.listen(8080)


var options = {
  host: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET'
};

