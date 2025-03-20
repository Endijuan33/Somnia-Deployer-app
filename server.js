// server.js
const express = require('express');
const next = require('next');
const { printBanner } = require('./utils/banner');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Tampilkan banner saat server mulai
  printBanner();

  // Gunakan handler Next.js untuk semua route
  server.all('*', (req, res) => handle(req, res));

  // Bind ke 0.0.0.0 agar bisa diakses melalui jaringan lokal
  server.listen(port, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log(`> Ready on http://0.0.0.0:${port}`);
  });
});
