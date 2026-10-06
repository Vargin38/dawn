#!/usr/bin/env node
/*
 * Bağımlılıksız küçük statik sunucu.
 *   node scripts/serve.js            → yalnız bu bilgisayar: http://localhost:8080
 *   node scripts/serve.js --lan      → aynı Wi-Fi'deki telefondan da açılır (yerel ağ adresi yazdırılır)
 *   node scripts/serve.js --port 9000
 * Yalnız uygulama klasöründeki dosyaları sunar; dizin listelemez.
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const kok = path.resolve(__dirname, '..');
const arg = process.argv.slice(2);
const lan = arg.includes('--lan');
const pIdx = arg.indexOf('--port');
const port = pIdx !== -1 ? Number(arg[pIdx + 1]) : 8080;
const host = lan ? '0.0.0.0' : '127.0.0.1';

const turler = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8'
};
// Sunulmayacaklar: geliştirme dosyaları ve testler
const yasak = /^(node_modules|tests|scripts|test-results|\.)/;

const sunucu = http.createServer((istek, yanit) => {
  let yol;
  try { yol = decodeURIComponent(new URL(istek.url, 'http://x').pathname); } catch (e) { yanit.writeHead(400); return yanit.end(); }
  if (yol === '/') yol = '/index.html';
  const goreli = path.normalize(yol).replace(/^([/\\])+/, '');
  const tam = path.join(kok, goreli);
  if (!tam.startsWith(kok + path.sep) || yasak.test(goreli)) { yanit.writeHead(404); return yanit.end('Bulunamadı'); }
  fs.stat(tam, (h, st) => {
    if (h || !st.isFile()) { yanit.writeHead(404); return yanit.end('Bulunamadı'); }
    yanit.writeHead(200, {
      'Content-Type': turler[path.extname(tam).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer'
    });
    fs.createReadStream(tam).pipe(yanit);
  });
});

sunucu.listen(port, host, () => {
  console.log('Teklif Asistanı çalışıyor:');
  console.log('  Bu bilgisayar: http://localhost:' + port + '/');
  if (lan) {
    Object.values(os.networkInterfaces()).flat().filter((a) => a && a.family === 'IPv4' && !a.internal)
      .forEach((a) => console.log('  Aynı ağdaki telefon: http://' + a.address + ':' + port + '/'));
    console.log('  Not: Telefon ve bilgisayardaki kayıtlar ayrı tutulur (eşitleme yok).');
  }
  console.log('Durdurmak için Ctrl+C.');
});
