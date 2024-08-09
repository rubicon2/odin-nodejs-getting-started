const http = require('http');
const fs = require('fs/promises');

const PORT = 8080;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/': {
      fs.readFile('./pages/index.html').then((page) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(page);
      });
      break;
    }

    case '/turnips': {
      fs.readFile('./pages/turnips.html').then((page) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(page);
      });
      break;
    }

    default: {
      fs.readFile('./pages/missing.html').then((page) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(page);
      });
    }
  }
});

server.listen(PORT);
