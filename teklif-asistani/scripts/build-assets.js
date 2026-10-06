#!/usr/bin/env node
/*
 * assets/ altındaki PDF görsellerini data/assets.js içine data URL olarak gömer.
 * Böylece uygulama fetch kullanmadan (file:// ile açıldığında da) logo ve ürün
 * görselini PDF'ye koyabilir. Görsel değişirse bu betiği yeniden çalıştırın:
 *   node scripts/build-assets.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const kok = path.join(__dirname, '..');
const dosyalar = {
  'degirmen-logo': { yol: 'assets/degirmen-logo-pdf.png', tur: 'image/png' },
  'kett-pm-450': { yol: 'assets/kett-pm450-pdf.jpg', tur: 'image/jpeg' }
};

const cikti = {};
for (const [anahtar, d] of Object.entries(dosyalar)) {
  const veri = fs.readFileSync(path.join(kok, d.yol));
  cikti[anahtar] = 'data:' + d.tur + ';base64,' + veri.toString('base64');
}

const js =
  '/* Otomatik üretildi: node scripts/build-assets.js — elle düzenlemeyin. */\n' +
  '(function (root) {\n' +
  '  var ASSETS = ' + JSON.stringify(cikti) + ';\n' +
  '  root.TA = root.TA || {};\n' +
  '  root.TA.assets = ASSETS;\n' +
  "  if (typeof module === 'object' && module.exports) module.exports = ASSETS;\n" +
  "})(typeof window !== 'undefined' ? window : globalThis);\n";

fs.writeFileSync(path.join(kok, 'data/assets.js'), js);
console.log('data/assets.js yazıldı (' + Math.round(js.length / 1024) + ' KB)');
