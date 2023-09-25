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
        //handle res error
        fs.readFile('./error404.html', (error, data) => {
          if (error) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('Error');
          }
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.write(data);
          return res.end();
        });
      } else {
        //handle ok res
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
