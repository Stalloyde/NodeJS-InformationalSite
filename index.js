const http = require('http');
const fs = require('fs');
const url = require('url');

http
  .createServer(function (req, res) {
    const url = req.url;
    let path;

    url === '/' ? (path = 'index.html') : (path = `.${url}.html`);

    fs.readFile(path, (error, data) => {
      if (error) {
        res.write(`There's an error`);
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end;
    });
  })
  .listen(8080);
