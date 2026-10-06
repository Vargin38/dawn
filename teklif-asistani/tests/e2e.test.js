/*
 * Uçtan uca tarayıcı testleri (Playwright + Chromium):
 *   npm run test:e2e
 * Ekran görüntüleri ve indirilen PDF'ler test-results/ altına yazılır.
 */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');
const net = require('net');
const { spawn, execFileSync } = require('child_process');
const { chromium } = require('playwright');

const kok = path.join(__dirname, '..');
const cikti = path.join(kok, 'test-results');
fs.mkdirSync(cikti, { recursive: true });

let sunucu, tarayici, adres;

function bosPort() {
  return new Promise((coz) => { const s = net.createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => coz(p)); }); });
}

test.before(async () => {
  const port = await bosPort();
  sunucu = spawn(process.execPath, [path.join(kok, 'scripts/serve.js'), '--port', String(port)], { stdio: 'pipe' });
  await new Promise((coz, red) => {
    sunucu.stdout.on('data', (d) => { if (String(d).includes('çalışıyor')) coz(); });
    sunucu.on('exit', (c) => red(new Error('sunucu kapandı: ' + c)));
  });
  adres = 'http://127.0.0.1:' + port + '/';
  tarayici = await chromium.launch();
});

test.after(async () => {
  if (tarayici) await tarayici.close();
  if (sunucu) sunucu.kill();
});

async function yeniSayfa(genislik) {
  const baglam = await tarayici.newContext({ viewport: { width: genislik || 390, height: 844 }, acceptDownloads: true, locale: 'tr-TR' });
  const sayfa = await baglam.newPage();
  sayfa.diyaloglar = [];
  sayfa.hatalar = [];
  sayfa.on('dialog', (d) => { sayfa.diyaloglar.push(d.message()); d.dismiss(); });
  sayfa.on('pageerror', (e) => sayfa.hatalar.push(e.message));
  sayfa.on('console', (m) => { if (m.type() === 'error') sayfa.hatalar.push(m.text()); });
  await sayfa.goto(adres);
  return sayfa;
}

async function mesajGir(sayfa, metin, kaynak) {
  await sayfa.goto(adres + '#/yeni');
  if (kaynak) await sayfa.check('input[name="kaynak"][value="' + kaynak + '"]');
  await sayfa.fill('#mesaj', metin);
  await sayfa.click('#analiz-et');
  await sayfa.waitForURL(/#\/teklif\/.+\/analiz$/);
  await sayfa.waitForSelector('#orijinal-mesaj'); // hashchange sonrası çizim tamamlandı
  return sayfa.url().split('#/teklif/')[1].split('/')[0];
}

async function ornekYukle(sayfa, id) {
  await sayfa.goto(adres + '#/yeni');
  await sayfa.click('[data-ornek="' + id + '"]');
  assert.equal(await sayfa.isChecked('#test-kaydi'), true, 'örnek mesaj test kaydı olarak işaretlenmeli');
  await sayfa.click('#analiz-et');
  await sayfa.waitForURL(/#\/teklif\/.+\/analiz$/);
  await sayfa.waitForSelector('#orijinal-mesaj');
  return sayfa.url().split('#/teklif/')[1].split('/')[0];
}

// Sekmeye geçer ve yeni ekran çizilene kadar bekler (hash değişimi ile çizim arasında yarış olmasın).
async function sekme(sayfa, id, ad) {
  await sayfa.goto(adres + '#/teklif/' + id + '/' + ad);
  await sayfa.waitForSelector('.sekmeler a.aktif[href="#/teklif/' + id + '/' + ad + '"]');
}

// Hash ile sayfa değiştirir ve hedef ekranın bir öğesini bekler.
async function sayfayaGit(sayfa, hash, secici) {
  await sayfa.goto(adres + hash);
  await sayfa.waitForSelector(secici);
}

async function indir(sayfa, secici, ad) {
  const [dl] = await Promise.all([sayfa.waitForEvent('download'), sayfa.click(secici)]);
  const hedef = path.join(cikti, ad || dl.suggestedFilename());
  await dl.saveAs(hedef);
  return { dosya: hedef, onerilen: dl.suggestedFilename() };
}

const pdfMetni = (d) => execFileSync('pdftotext', ['-layout', d, '-']).toString();

async function tasmaYok(sayfa, etiket) {
  const [sw, cw] = await sayfa.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  assert.ok(sw <= cw, etiket + ': yatay taşma var (' + sw + ' > ' + cw + ')');
}

async function kosullariDoldur(sayfa) {
  await sayfa.check('input[name="teslim-secim"][value="stokta_degil"]');
  await sayfa.check('input[name="kosul-sevk-secim"][value="deger"]');
  await sayfa.fill('#kosul-sevk', 'Alıcıya aittir (test).');
  await sayfa.check('input[name="kosul-garanti-secim"][value="yok"]');
  await sayfa.check('input[name="kosul-gecerlilik-secim"][value="deger"]');
  await sayfa.fill('#kosul-gecerlilik', '15 gün (test).');
}

// ---------------------------------------------------------------------------

test('ana akış: talep → analiz → teklif → onay → nihai PDF → revizyon → kayıt kalıcılığı', async () => {
  const s = await yeniSayfa(390);
  const id = await mesajGir(s, 'Merhaba, PM-450 için 2 adet fiyat rica ederim.\nYıldız Değirmencilik Gıda Ltd. Şti.\nŞükrü Çağlar\nsukru@example.com', 'eposta');

  // Analiz
  assert.equal(await s.inputValue('#alici-firma'), 'Yıldız Değirmencilik Gıda Ltd. Şti.');
  assert.equal(await s.inputValue('#alici-yetkili'), 'Şükrü Çağlar');
  assert.equal(await s.inputValue('#alici-eposta'), 'sukru@example.com');
  assert.equal(await s.inputValue('#alici-telefon'), '');
  assert.match(await s.textContent('.sayfa-teklif'), /Mesajda bulunamadı/);
  assert.equal(await s.inputValue('input[id^="adet-"]'), '2');
  await s.screenshot({ path: path.join(cikti, 'mobil-analiz.png'), fullPage: true });

  // Teklif: iskonto varsayılanı "Seçilmedi"
  await sekme(s, id, 'teklif');
  const isk = 'select[id^="iskonto-"]';
  assert.equal(await s.inputValue(isk), '');
  assert.equal(await s.$eval(isk, (e) => e.options[e.selectedIndex].text), 'Seçilmedi');

  // Onay: eksikler onayı durdurur
  await sekme(s, id, 'onay');
  assert.equal(await s.isDisabled('#onaya-gonder'), true);
  const engel = await s.textContent('#engeller');
  assert.match(engel, /iskonto seçilmedi/);
  assert.match(engel, /Stok\/teslim durumu teyit edilmedi/);
  assert.match(engel, /Sevk bedeli için karar verilmedi/);

  // Teklif: iskonto, koşullar, iç not
  await sekme(s, id, 'teklif');
  await s.selectOption(isk, '1500');
  await kosullariDoldur(s);
  await s.fill('#ic-notlar', 'GİZLİ-İÇ-NOT-E2E');
  const toplam = await s.textContent('#toplam-tablo');
  assert.match(toplam, /68\.000,00 TL/);
  assert.match(toplam, /13\.600,00 TL/);
  assert.match(toplam, /81\.600,00 TL/);
  await s.screenshot({ path: path.join(cikti, 'mobil-teklif.png'), fullPage: true });

  // Onaya gönder → onay bekliyor (kilitli)
  await sekme(s, id, 'onay');
  await s.click('#onaya-gonder');
  assert.match(await s.textContent('.teklif-baslik'), /Onay bekliyor/);
  await sekme(s, id, 'teklif');
  assert.equal(await s.isDisabled(isk), true, 'onay bekleyen teklif kilitli olmalı');

  // KDV teyidi olmadan onay düğmesi kapalı
  await sekme(s, id, 'onay');
  assert.equal(await s.isDisabled('#onayla'), true);
  await s.check('#kdv-teyit');
  assert.equal(await s.isDisabled('#onayla'), false);
  const nihai = await indir(s, '#onayla', 'e2e-nihai.pdf');
  assert.match(await s.textContent('.teklif-baslik'), /Onaylandı/);
  assert.match(nihai.onerilen, /^Teklif_TKL-\d{6}-[A-Z0-9]+01_Rev0_Yildiz-Degirmencilik-Gida-Ltd-Sti\.pdf$/);
  assert.equal(await s.isEnabled('#nihai-pdf'), true);
  assert.match(await s.textContent('.sekme-onay'), /müşteriye gönderildiği anlamına gelmez/);
  assert.match(await s.textContent('.sekme-onay'), /Gönderim kaydı yok/);

  // Nihai PDF içeriği
  assert.match(execFileSync('pdfinfo', [nihai.dosya]).toString(), /595\.28 x 841\.89 pts \(A4\)/);
  assert.match(execFileSync('pdffonts', [nihai.dosya]).toString(), /Roboto-Regular/);
  const yazi = pdfMetni(nihai.dosya);
  for (const v of ['FİYAT TEKLİFİ', 'Yıldız Değirmencilik Gıda Ltd. Şti.', 'Şükrü Çağlar', 'sukru@example.com', 'KETT PM-450', 'Tahıl Rutubet Ölçme Cihazı',
    '%15', '68.000,00', '81.600,00 TL', 'Ödeme sonrası teslimat.', 'Ödeme sonrası 1–2 hafta içinde teslim.', 'Alıcıya aittir (test).', '15 gün (test).',
    'Değirmen Sanayi ve Ticaret A.Ş.', 'info@degirmen.com.tr', 'tahil-rutubet-olcme-cihazi-kett-pm450-katalog']) {
    assert.ok(yazi.includes(v), 'nihai PDF\'de yok: ' + v);
  }
  for (const v of ['GİZLİ-İÇ-NOT-E2E', 'TASLAK', 'Teyit bekliyor', 'Seçilmedi', '%10–%20', 'TEST VERİSİ', 'Garanti']) {
    assert.ok(!yazi.includes(v), 'nihai PDF\'de olmamalı: ' + v);
  }
  assert.equal((yazi.match(/GENEL TOPLAM/g) || []).length, 1);
  execFileSync('pdftoppm', ['-r', '60', '-png', '-f', '1', '-l', '1', nihai.dosya, path.join(cikti, 'e2e-nihai')]);

  // Onaydan sonra değişiklik → yeni revizyon, yeniden onay
  await s.click('#onay-duzenle');
  await s.waitForURL(/\/teklif$/);
  await s.fill('input[id^="adet-t-"]', '3');
  await s.waitForFunction(() => /Rev\. 1/.test(document.querySelector('.teklif-baslik').textContent));
  assert.match(await s.textContent('.teklif-baslik'), /Taslak/);
  assert.match(await s.textContent('#bildirim'), /Rev\. 1 taslak olarak açıldı/);
  assert.match(await s.textContent('#toplam-tablo'), /122\.400,00 TL/);
  await sekme(s, id, 'onay');
  assert.equal(await s.$('#nihai-pdf'), null, 'yeni revizyon onaylanmadan nihai PDF yok');
  assert.ok(await s.$('#onaya-gonder'));
  assert.match(await s.textContent('.rev-liste'), /Rev\. 0 · Onaylandı/);

  // Sayfa yenilenince kayıt kaybolmaz; önceki onaylı revizyonun PDF'i alınabilir
  await s.reload();
  assert.match(await s.textContent('.teklif-baslik'), /Taslak/);
  assert.match(await s.textContent('.teklif-baslik'), /Rev\. 1/);
  const eski = await indir(s, '.rev-liste button', 'e2e-rev0.pdf');
  assert.match(eski.onerilen, /_Rev0_/);
  assert.ok(pdfMetni(eski.dosya).includes('81.600,00 TL'), 'Rev. 0 PDF\'i onaylı tutarı korur');

  // Liste: arama ve yeniden açma
  await sayfayaGit(s, '#/liste', '#arama');
  const no = (await s.textContent('.satir-ust .no')).trim();
  const bugun = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  for (const q of ['yıldız', 'YILDIZ DEĞİRMENCİLİK', no, '122.400', 'pm-450', 'sukru@', bugun, 'taslak']) {
    await s.fill('#arama', q);
    assert.equal(await s.locator('#teklif-liste li').count(), 1, 'arama: ' + q);
  }
  await s.fill('#arama', 'olmayan-musteri-xyz');
  assert.equal(await s.locator('#teklif-liste li').count(), 0);
  await s.fill('#arama', '');
  await s.click('.teklif-satir');
  await s.waitForURL(new RegExp(id));
  assert.deepEqual(s.diyaloglar, []);
  assert.deepEqual(s.hatalar, []);
  await s.context().close();
});

test('kontrol hesapları arayüzde: 1 adet %10 ve %20', async () => {
  const s = await yeniSayfa(390);
  const id = await mesajGir(s, 'PM450 1 adet lazım');
  await sekme(s, id, 'teklif');
  await s.selectOption('select[id^="iskonto-"]', '1000');
  let t = await s.textContent('#toplam-tablo');
  assert.match(t, /36\.000,00 TL/); assert.match(t, /7\.200,00 TL/); assert.match(t, /43\.200,00 TL/);
  await s.selectOption('select[id^="iskonto-"]', '2000');
  t = await s.textContent('#toplam-tablo');
  assert.match(t, /32\.000,00 TL/); assert.match(t, /6\.400,00 TL/); assert.match(t, /38\.400,00 TL/);
  await s.context().close();
});

test('eksik adet, belirsiz ürün ve çoklu ürün incelemeye yönlendirilir', async () => {
  const s = await yeniSayfa(390);
  let id = await ornekYukle(s, 'adet-yok');
  assert.equal(await s.inputValue('input[id^="adet-"]'), '');
  assert.match(await s.textContent('.kalemler'), /Mesajda adet yok — siz girin \(1 varsayılmadı\)/);
  await sekme(s, id, 'onay');
  assert.match(await s.textContent('#engeller'), /adet seçilmedi/);

  id = await ornekYukle(s, 'belirsiz');
  assert.equal(await s.locator('.kalem-belirsiz').count(), 1);
  assert.match(await s.textContent('.kalem-belirsiz'), /Belirsiz ürün: “450”/);
  await sekme(s, id, 'onay');
  assert.match(await s.textContent('#engeller'), /ürün eşleşmesi belirsiz/);
  await sekme(s, id, 'analiz');
  await s.click('[data-eslestir]');
  assert.equal(await s.locator('.kalem-tamam').count(), 1);
  assert.equal(await s.inputValue('input[id^="adet-"]'), '1');

  id = await ornekYukle(s, 'coklu');
  assert.equal(await s.locator('.kalem').count(), 2);
  assert.match(await s.textContent('.kalem-taninmayan'), /HX-500/);
  assert.match(await s.textContent('.kalem-taninmayan'), /mesajdaki adet: 1/);
  assert.equal(await s.inputValue('input[id^="adet-"]'), '3');
  await sekme(s, id, 'onay');
  assert.match(await s.textContent('#engeller'), /tanınmayan ürün/);
  assert.deepEqual(s.hatalar, []);
  await s.context().close();
});

test('kullanıcı metni HTML olarak çalışmaz', async () => {
  const s = await yeniSayfa(390);
  const betikSayisi = await s.evaluate(() => document.scripts.length);
  const id = await ornekYukle(s, 'html');
  await s.waitForTimeout(300);
  const mesaj = await s.textContent('#orijinal-mesaj');
  assert.ok(mesaj.includes("<img src=x onerror=alert('xss')>"), 'etiket düz metin olarak görünmeli');
  assert.ok(mesaj.includes('<script>alert(1)</script>'));
  assert.equal(await s.evaluate(() => document.querySelectorAll('img[src="x"], b, #orijinal-mesaj script').length), 0);
  assert.equal(await s.evaluate(() => document.scripts.length), betikSayisi);
  assert.equal(await s.inputValue('input[id^="adet-"]'), '2', '"PM-450 x2" ayrıştırıldı');

  await s.fill('#alici-firma', '<img src=x onerror=alert(2)>Firma');
  await sayfayaGit(s, '#/liste', '#arama');
  assert.equal((await s.textContent('.satir-alici')).trim(), '<img src=x onerror=alert(2)>Firma');
  assert.equal(await s.evaluate(() => document.querySelectorAll('img[src="x"]').length), 0);
  await sekme(s, id, 'onay');
  const t2 = await indir(s, '#taslak-pdf', 'e2e-xss-taslak.pdf');
  assert.ok(pdfMetni(t2.dosya).includes('<img src=x onerror=alert(2)>Firma'), 'PDF\'de de düz metin');
  assert.deepEqual(s.diyaloglar, [], 'hiçbir alert çalışmamalı');
  await s.context().close();
});

test('taslak PDF: TASLAK ibaresi, test filigranı ve teyit bekleyen alanlar', async () => {
  const s = await yeniSayfa(390);
  const id = await ornekYukle(s, 'tek-urun');
  await sekme(s, id, 'onay');
  const t = await indir(s, '#taslak-pdf', 'e2e-taslak.pdf');
  assert.match(t.onerilen, /_TASLAK_TEST\.pdf$/);
  const yazi = pdfMetni(t.dosya);
  assert.ok(yazi.includes('TASLAK — Onaylanmamış belgedir; müşteriye gönderilmez.'));
  assert.ok(yazi.includes('TEST VERİSİ — Gerçek bir teklif değildir.'));
  assert.ok(yazi.includes('Kalem 1: iskonto seçilmedi'));
  assert.ok(yazi.includes('[Teyit bekliyor]'));
  assert.match(await s.textContent('.teklif-baslik'), /Taslak/, 'PDF indirmek durumu değiştirmez');
  execFileSync('pdftoppm', ['-r', '60', '-png', '-f', '1', '-l', '1', t.dosya, path.join(cikti, 'e2e-taslak')]);
  await s.context().close();
});

test('mobil görünüm (360 px): hiçbir ekranda yatay taşma yok', async () => {
  const s = await yeniSayfa(360);
  const id = await ornekYukle(s, 'talimat');
  for (const [ad, hash, secici] of [['yeni', '#/yeni', '#mesaj'], ['analiz', '#/teklif/' + id + '/analiz', '#orijinal-mesaj'], ['teklif', '#/teklif/' + id + '/teklif', '#toplam-tablo, .toplam-kart'],
    ['onay', '#/teklif/' + id + '/onay', '.adimlar'], ['liste', '#/liste', '#arama'], ['ayarlar', '#/ayarlar', '#cihaz-kodu']]) {
    await sayfayaGit(s, hash, secici);
    await tasmaYok(s, ad);
    await s.screenshot({ path: path.join(cikti, 'mobil-360-' + ad + '.png'), fullPage: true });
  }
  assert.match(await s.textContent('#sayfa'), /Cihazlar arası eşitleme yok/);
  await sekme(s, id, 'analiz');
  assert.match(await s.textContent('.mesaj-kart'), /UYGULANMADI/);
  await s.context().close();
});

test('yedek: dışa aktar → veriyi sil → içe aktar; onaylı kayıt bütün kalır', async () => {
  const s = await yeniSayfa(1200);
  const id = await ornekYukle(s, 'tek-urun');
  await sekme(s, id, 'teklif');
  await s.selectOption('select[id^="iskonto-"]', '1000');
  await kosullariDoldur(s);
  await sekme(s, id, 'onay');
  await s.click('#onaya-gonder');
  await s.check('#kdv-teyit');
  await indir(s, '#onayla', 'e2e-yedek-oncesi.pdf');
  await ornekYukle(s, 'adet-yok');
  await sayfayaGit(s, '#/liste', '#arama');
  assert.equal(await s.locator('#teklif-liste li').count(), 2);
  assert.match(await s.textContent('#yedek'), /eşitleme yoktur/);

  const yedek = await indir(s, '#yedek-indir', 'e2e-yedek.json');
  const j = JSON.parse(fs.readFileSync(yedek.dosya, 'utf8'));
  assert.equal(j.uygulama, 'teklif-asistani');
  assert.equal(j.teklifler.length, 2);

  await s.evaluate(() => localStorage.clear());
  await s.reload();
  await sayfayaGit(s, '#/liste', '#arama');
  assert.match(await s.textContent('#sayfa'), /Henüz teklif yok/);

  await s.setInputFiles('#yedek-dosya', yedek.dosya);
  await s.waitForFunction(() => /Yedek yüklendi/.test(document.getElementById('bildirim').textContent));
  assert.match(await s.textContent('#bildirim'), /2 eklendi/);
  assert.equal(await s.locator('#teklif-liste li').count(), 2);
  await sekme(s, id, 'onay');
  assert.match(await s.textContent('.teklif-baslik'), /Onaylandı/);
  assert.equal(await s.isEnabled('#nihai-pdf'), true);
  const sonra = await indir(s, '#nihai-pdf', 'e2e-yedek-sonrasi.pdf');
  assert.ok(pdfMetni(sonra.dosya).includes('86.400,00 TL'), '2 adet × %10: 72.000 + 14.400 = 86.400');

  // İkinci kez yüklemek kayıtları çoğaltmaz
  await sayfayaGit(s, '#/liste', '#arama');
  await s.setInputFiles('#yedek-dosya', yedek.dosya);
  await s.waitForFunction(() => /2 aynı/.test(document.getElementById('bildirim').textContent));
  assert.equal(await s.locator('#teklif-liste li').count(), 2);
  assert.deepEqual(s.hatalar, []);
  await s.context().close();
});

test('telefon notu ve tarihli stok kaydı: 6 Ekim kaydı yeniden yorumlanmaz, yeni kayıt eklenir', async () => {
  const s = await yeniSayfa(390);
  await s.goto(adres + '#/yeni');
  await s.check('input[name="kaynak"][value="telefon"]');
  assert.match(await s.textContent('label[for="mesaj"]'), /Telefon görüşmesi notu/);
  const id = await mesajGir(s, 'Hasan Bey aradı, PM450 için fiyat istedi. 0500 000 00 09', 'telefon');
  assert.match(await s.textContent('.mesaj-kart'), /Telefon notu/);
  assert.equal(await s.inputValue('#alici-yetkili'), 'Hasan Bey');
  assert.equal(await s.inputValue('#alici-telefon'), '+90 500 000 00 09');

  await sekme(s, id, 'teklif');
  const stok = await s.textContent('.stok-kaydi');
  assert.match(stok, /06\.10\.2026/);
  assert.match(stok, /“hafta içi 12 tane gelecek”/);
  assert.match(stok, /Mevcut stok: bilinmiyor/);
  assert.match(stok, /Beklenen giriş: 12 adet/);
  assert.match(stok, /Giriş tarihi: teyitsiz/);
  assert.ok(!/bu hafta/i.test(stok.replace(/"bu hafta"/, '')), 'kayıt "bu hafta gelecek" diye yeniden yorumlanmaz');
  assert.equal(await s.isChecked('input[name="teslim-secim"][value=""]'), true, 'teslim varsayılanı: teyit edilmedi');

  // Ayarlar: yeni tarihli kayıt eklenir, eskisi silinmez
  await sayfayaGit(s, '#/ayarlar', '.stok-ekle');
  await s.click('.stok-ekle summary');
  await s.fill('#stok-tarih', '2026-10-09');
  await s.fill('#stok-ifade', '12 adet depoya girdi');
  await s.fill('#stok-mevcut', '12');
  await s.click('.stok-ekle button');
  const liste = await s.textContent('.stok-liste');
  assert.match(liste, /06\.10\.2026/);
  assert.match(liste, /09\.10\.2026 · Kullanıcı kaydı: “12 adet depoya girdi” — mevcut stok: 12/);
  await sekme(s, id, 'teklif');
  assert.match(await s.textContent('.stok-kaydi'), /Mevcut stok: 12 adet/);
  assert.deepEqual(s.hatalar, []);
  await s.context().close();
});
