const express = require('express');
const next = require('next');
const fs = require('fs');
const http = require('http');
const https = require('https');
const { printBanner } = require('./utils/banner');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  printBanner();

  server.all('*', (req, res) => handle(req, res));

  const useHttps = process.env.USE_HTTPS === 'true';

  if (useHttps) {
    const httpsOptions = {
      key: fs.readFileSync('./certs/key.pem'),
      cert: fs.readFileSync('./certs/cert.pem'),
    };
    https.createServer(httpsOptions, server).listen(port, '0.0.0.0', (err) => {
      if (err) throw err;
      console.log(`> Ready on https://0.0.0.0:${port}`);
    });
  } else {
    http.createServer(server).listen(port, '0.0.0.0', (err) => {
      if (err) throw err;
      console.log(`> Ready on http://0.0.0.0:${port}`);
    });
  }
});
