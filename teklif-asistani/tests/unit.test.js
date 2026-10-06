/*
 * Birim testleri: node --test tests/unit.test.js
 */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const kok = path.join(__dirname, '..');
const P = require(path.join(kok, 'js/money.js'));
const AY = require(path.join(kok, 'js/parser.js'));
const T = require(path.join(kok, 'js/quote.js'));
const D = require(path.join(kok, 'js/store.js'));
const PDF = require(path.join(kok, 'js/pdf.js'));
const K = require(path.join(kok, 'data/catalog.js'));
const ORN = require(path.join(kok, 'data/samples.js'));
const AS = require(path.join(kok, 'data/assets.js'));

const ornek = (id) => ORN.find((o) => o.id === id).metin;
const ayr = (m) => AY.ayristir(m, { katalog: K });

function yeniTeklif(metin, ayarlar, ek) {
  ayarlar = ayarlar || D.varsayilanAyarlar();
  const t = T.teklifOlustur(Object.assign({ ayristirma: ayr(metin), kaynak: 'whatsapp', katalog: K, ayarlar, mevcutNolar: [], simdi: '2026-10-06T10:00:00.000Z' }, ek || {}));
  return { t, ayarlar };
}

// Tüm kararları kullanıcı adına verir (test için).
function tamamla(t, iskontoBp, adet) {
  T.icerikGuncelle(t, (ic) => {
    ic.satirlar.forEach((s) => { if (s.durum === 'tamam') { s.iskontoBp = iskontoBp; if (adet) s.adet = adet; } });
    ic.kosullar.teslim = { secim: 'stokta_degil', metin: 'Ödeme sonrası 1–2 hafta içinde teslim.', teyitZamani: '2026-10-06T10:05:00.000Z' };
    ic.kosullar.sevk = { secim: 'deger', metin: 'Test sevk metni' };
    ic.kosullar.garanti = { secim: 'yok', metin: '' };
    ic.kosullar.gecerlilik = { secim: 'deger', metin: 'Test geçerlilik metni' };
  }, '2026-10-06T10:05:00.000Z');
}

// ---------------------------------------------------------------------------
test('para: üç kontrol hesabı (%20 KDV, önce iskonto sonra KDV)', () => {
  const durumlar = [
    { adet: 1, isk: 10, net: '36.000,00 TL', kdv: '7.200,00 TL', top: '43.200,00 TL' },
    { adet: 1, isk: 20, net: '32.000,00 TL', kdv: '6.400,00 TL', top: '38.400,00 TL' },
    { adet: 2, isk: 15, net: '68.000,00 TL', kdv: '13.600,00 TL', top: '81.600,00 TL' }
  ];
  for (const d of durumlar) {
    const s = P.satirHesapla(4000000, d.adet, d.isk * 100);
    const t = P.toplamHesapla([s], 2000);
    assert.equal(P.bicimle(t.net), d.net);
    assert.equal(P.bicimle(t.kdv), d.kdv);
    assert.equal(P.bicimle(t.genelToplam), d.top);
  }
});

test('para: kuruş yuvarlama, biçim ve geçersiz girdi', () => {
  const s = P.satirHesapla(1001, 1, 1500); // 1001 × 0,85 = 850,85 → 851
  assert.equal(s.iskontoluBirim, 851n);
  assert.equal(P.toplamHesapla([P.satirHesapla(333, 1, 0)], 2000).kdv, 67n); // 66,6 → 67
  assert.equal(P.bicimle(123456789n), '1.234.567,89 TL');
  assert.equal(P.oranBicimle(1250), '%12,5');
  assert.throws(() => P.satirHesapla(4000000, 1.5, 1000));
  assert.throws(() => P.satirHesapla(4000000, 0, 1000));
  assert.equal(P.tlCoz('40.000'), 4000000);
  assert.equal(P.tlCoz('40.000,5'), 4000050);
  assert.equal(P.tlCoz('abc'), null);
});

// ---------------------------------------------------------------------------
test('ayrıştırma: PM450 yazım çeşitleri aynı ürüne eşleşir, 450 adet sayılmaz', () => {
  for (const m of ['PM450 fiyatı?', 'PM-450 fiyatı?', 'PM 450 fiyatı?', 'pm‐450 fiyatı?', 'Pm–450 fiyatı?', 'KETT PM.450', "PM-450'nin fiyatı", 'PM450den fiyat']) {
    const r = ayr(m);
    assert.equal(r.urunler.length, 1, m);
    assert.equal(r.urunler[0].tur, 'kesin', m);
    assert.equal(r.urunler[0].urunId, 'kett-pm-450', m);
    assert.equal(r.urunler[0].adet, null, m + ' → model numarasındaki 450 adet olarak okunmamalı');
  }
  const r = ayr('PM 450 adet fiyatı nedir');
  assert.equal(r.urunler[0].adet, null);
});

test('ayrıştırma: "450" tek başına kesin eşleşme yapmaz', () => {
  const r = ayr(ornek('belirsiz'));
  assert.equal(r.urunler.length, 1);
  assert.equal(r.urunler[0].tur, 'belirsiz');
  assert.equal(r.urunler[0].urunId, null);
  assert.equal(r.urunler[0].adayUrunId, 'kett-pm-450');
  assert.ok(r.uyarilar.some((u) => u.kod === 'BELIRSIZ_URUN'));
  assert.equal(ayr('450 TL').urunler.length, 0, 'fiyat olarak geçen 450 ürün adayı değildir');
  assert.equal(ayr('PM4501 lazım').urunler[0].tur, 'taninmayan', 'PM4501 PM-450 sayılmaz');
});

test('ayrıştırma: adet ifadeleri', () => {
  const beklenen = {
    'PM 450 2 adet': 2, '2 adet PM-450': 2, 'iki tane PM450': 2, 'PM450 x3': 3, '3x PM450': 3,
    'Kett PM450den 4 tane': 4, 'dört adet PM450': 4, 'Adet: 5\nPM-450': 5, 'PM450 için 10 adet': 10
  };
  for (const [m, a] of Object.entries(beklenen)) assert.equal(ayr(m).urunler[0].adet, a, m);
});

test('ayrıştırma: eksik adet 1 varsayılmaz; çelişkili adet seçilmez', () => {
  const r = ayr(ornek('adet-yok'));
  assert.equal(r.urunler[0].adet, null);
  assert.ok(r.uyarilar.some((u) => u.kod === 'ADET_YOK'));
  const c = ayr('PM450 fiyatı? PM-450 den 3 adet ama belki 2 adet');
  assert.equal(c.urunler[0].adet, null);
  assert.ok(c.uyarilar.some((u) => u.kod === 'CELISKILI_ADET'));
  const b = ayr('PM450 den birkaç tane');
  assert.equal(b.urunler[0].adet, null);
  assert.ok(b.uyarilar.some((u) => u.kod === 'BELIRSIZ_MIKTAR'));
});

test('ayrıştırma: çoklu ürün — tanınmayan kalem atlanmaz', () => {
  const r = ayr(ornek('coklu'));
  assert.equal(r.urunler.length, 2);
  const pm = r.urunler.find((u) => u.urunId === 'kett-pm-450');
  const hx = r.urunler.find((u) => u.tur === 'taninmayan');
  assert.equal(pm.adet, 3);
  assert.equal(hx.ifade, 'HX-500');
  assert.equal(hx.adet, 1);
  assert.ok(r.uyarilar.some((u) => u.kod === 'COKLU_URUN'));
  const x = ayr('PM450 ve HX500 2 adet');
  assert.equal(x.urunler.find((u) => u.urunId).adet, null, 'başka ürüne ait adet PM-450\'ye bağlanmamalı');
});

test('ayrıştırma: iletişim ve firma bilgisi uydurulmaz', () => {
  const r = ayr(ornek('tek-urun'));
  assert.equal(r.firma.deger, 'Örnek Tarım Ürünleri Ltd. Şti.');
  assert.equal(r.yetkili.deger, 'Ayşe Test');
  assert.deepEqual(r.telefonlar.map((x) => x.deger), ['+90 500 000 00 01']);
  assert.equal(r.epostalar.length, 0);
  const bos = ayr('Merhaba PM450 fiyatı nedir?');
  assert.equal(bos.firma, null);
  assert.equal(bos.yetkili, null);
  assert.equal(bos.epostalar.length, 0);
  assert.equal(bos.telefonlar.length, 0);
  const kendi = ayr('Sayın Değirmen Sanayi ve Ticaret A.Ş., PM450 1 adet. Tel: +90 212 494 33 33, info@degirmen.com.tr');
  assert.equal(kendi.firma, null, 'şirketin kendi unvanı müşteri olamaz');
  assert.equal(kendi.telefonlar.length, 0);
  assert.equal(kendi.epostalar.length, 0);
  const e = ayr(ornek('talimat'));
  assert.equal(e.firma.deger, 'Örnek Gıda San. ve Tic. A.Ş.');
  assert.equal(e.yetkili.deger, 'Fatma Örnek');
  assert.deepEqual(e.epostalar.map((x) => x.deger), ['fatma@example.com']);
});

test('ayrıştırma: mesajdaki talimatlar kural değiştirmez', () => {
  const r = ayr(ornek('talimat'));
  assert.ok(r.uyarilar.some((u) => u.kod === 'TALIMAT'));
  assert.ok(r.uyarilar.some((u) => u.kod === 'MUSTERI_ISKONTO'));
  assert.ok(r.uyarilar.some((u) => u.kod === 'MESAJDA_FIYAT'));
  const { t } = yeniTeklif(ornek('talimat'));
  const ic = T.aktifRev(t).icerik;
  assert.equal(ic.satirlar[0].urun.listeFiyatiKurus, 4000000, 'fiyat kayıtlı değerde kalır');
  assert.equal(ic.satirlar[0].iskontoBp, null, 'iskonto otomatik seçilmez');
  assert.equal(T.durum(t), 'taslak', 'onaysız gönderim/onay yok');
});

// ---------------------------------------------------------------------------
test('teklif: varsayılanlar — iskonto "Seçilmedi", teslim teyitsiz, sevk/garanti/geçerlilik karar bekler', () => {
  const { t, ayarlar } = yeniTeklif(ornek('tek-urun'));
  const ic = T.aktifRev(t).icerik;
  assert.equal(ic.satirlar[0].adet, 2);
  assert.equal(ic.satirlar[0].iskontoBp, null);
  assert.equal(ic.kosullar.teslim.secim, null);
  assert.equal(ic.kosullar.odeme.metin, 'Ödeme sonrası teslimat.');
  assert.equal(ic.kdvBp, 2000);
  const kodlar = T.engeller(ic, { ayarlar, asama: 'gonder' }).map((e) => e.kod);
  for (const k of ['ISKONTO', 'TESLIM', 'SEVK', 'GARANTI', 'GECERLILIK']) assert.ok(kodlar.includes(k), k);
  assert.throws(() => T.onayaGonder(t, { ayarlar }), /onaya gönderilemez/);
  assert.match(t.no, /^TKL-261006-[A-Z0-9]{1,3}01$/);
});

test('teklif: iskonto seçilmeden ve teslim teyit edilmeden onay engellenir', () => {
  const { t, ayarlar } = yeniTeklif(ornek('tek-urun'));
  T.icerikGuncelle(t, (ic) => {
    ic.kosullar.sevk = { secim: 'yok', metin: '' };
    ic.kosullar.garanti = { secim: 'yok', metin: '' };
    ic.kosullar.gecerlilik = { secim: 'yok', metin: '' };
  });
  let kodlar = T.engeller(T.aktifRev(t).icerik, { ayarlar }).map((e) => e.kod);
  assert.deepEqual(kodlar.sort(), ['ISKONTO', 'TESLIM']);
  T.icerikGuncelle(t, (ic) => { ic.satirlar[0].iskontoBp = 1500; });
  kodlar = T.engeller(T.aktifRev(t).icerik, { ayarlar }).map((e) => e.kod);
  assert.deepEqual(kodlar, ['TESLIM']);
  T.icerikGuncelle(t, (ic) => { ic.satirlar[0].iskontoBp = 2500; ic.kosullar.teslim = { secim: 'stokta', metin: 'x', teyitZamani: '2026-10-06T10:00:00Z' }; });
  kodlar = T.engeller(T.aktifRev(t).icerik, { ayarlar }).map((e) => e.kod);
  assert.deepEqual(kodlar, ['ISKONTO_ARALIK']);
});

test('teklif: onay akışı, KDV teyidi, gerçek durum değişikliği', () => {
  const { t, ayarlar } = yeniTeklif(ornek('tek-urun'));
  tamamla(t, 1500);
  T.onayaGonder(t, { ayarlar });
  assert.equal(T.durum(t), 'onay_bekliyor');
  assert.throws(() => T.icerikGuncelle(t, (ic) => { ic.satirlar[0].adet = 3; }), /Onay bekleyen/);
  assert.throws(() => T.onayla(t, {}, { ayarlar }), /KDV/);
  assert.equal(T.durum(t), 'onay_bekliyor');
  T.onayla(t, { kdvTeyit: true }, { ayarlar }, '2026-10-06T11:00:00.000Z');
  assert.equal(T.durum(t), 'onaylandi');
  assert.equal(ayarlar.kdv.teyitliBp, 2000);
  assert.ok(T.butunlukTamam(T.aktifRev(t)));
  const h = T.hesapla(T.aktifRev(t).icerik).toplam;
  assert.equal(P.bicimle(h.genelToplam), '81.600,00 TL');
  // İkinci teklifte KDV yeniden sorulmaz
  const ikinci = yeniTeklif(ornek('tek-urun'), ayarlar).t;
  tamamla(ikinci, 1000);
  T.onayaGonder(ikinci, { ayarlar });
  T.onayla(ikinci, {}, { ayarlar });
  assert.equal(T.durum(ikinci), 'onaylandi');
});

test('teklif: onay sonrası değişiklik yeni revizyon açar ve yeniden onay ister', () => {
  const { t, ayarlar } = yeniTeklif(ornek('tek-urun'));
  tamamla(t, 1500);
  T.onayaGonder(t, { ayarlar });
  T.onayla(t, { kdvTeyit: true }, { ayarlar });
  const r0ozet = T.aktifRev(t).onayOzeti;

  assert.deepEqual(T.icerikGuncelle(t, () => {}), { degisti: false, yeniRevizyon: false });
  t.icNotlar = 'iç not değişti'; // müşteriye görünmez → revizyon gerekmez
  assert.equal(t.revizyonlar.length, 1);

  const r = T.icerikGuncelle(t, (ic) => { ic.satirlar[0].adet = 3; });
  assert.deepEqual(r, { degisti: true, yeniRevizyon: true });
  assert.equal(t.revizyonlar.length, 2);
  assert.equal(T.aktifRev(t).rev, 1);
  assert.equal(T.durum(t), 'taslak');
  assert.equal(t.revizyonlar[0].durum, 'onaylandi');
  assert.equal(t.revizyonlar[0].icerik.satirlar[0].adet, 2, 'onaylı revizyon değişmez');
  assert.equal(t.revizyonlar[0].onayOzeti, r0ozet);
  assert.equal(T.nihaiPdfIzni(t, 1).izin, false);
  assert.equal(T.nihaiPdfIzni(t, 0).izin, true);

  // Müşteri, tutar ve koşul değişiklikleri de revizyon açar
  for (const degistir of [(ic) => { ic.alici.firma = 'Başka'; }, (ic) => { ic.satirlar[0].iskontoBp = 2000; }, (ic) => { ic.kosullar.sevk.metin = 'farklı'; }]) {
    const { t: x, ayarlar: a } = yeniTeklif(ornek('tek-urun'));
    tamamla(x, 1500);
    T.onayaGonder(x, { ayarlar: a });
    T.onayla(x, { kdvTeyit: true }, { ayarlar: a });
    assert.equal(T.icerikGuncelle(x, degistir).yeniRevizyon, true);
  }

  // Rev. 1 yeniden onaylanabilir; Rev. 0 geçerliliğini korur
  T.onayaGonder(t, { ayarlar });
  T.onayla(t, {}, { ayarlar });
  assert.equal(T.durum(t), 'onaylandi');
  assert.equal(t.revizyonlar[0].yerineGelen, 1);
});

test('teklif: değişiklikleri atma, reddetme, yeniden açma', () => {
  const { t, ayarlar } = yeniTeklif(ornek('tek-urun'));
  tamamla(t, 1500);
  T.onayaGonder(t, { ayarlar });
  T.onayla(t, { kdvTeyit: true }, { ayarlar });
  T.icerikGuncelle(t, (ic) => { ic.satirlar[0].adet = 5; });
  T.revizyonuGeriAl(t);
  assert.equal(t.revizyonlar.length, 1);
  assert.equal(T.durum(t), 'onaylandi');
  assert.throws(() => T.reddet(t, 'x'), /reddedilebilir/);

  const { t: y } = yeniTeklif(ornek('adet-yok'));
  T.reddet(y, 'Müşteri vazgeçti');
  assert.equal(T.durum(y), 'reddedildi');
  assert.throws(() => T.icerikGuncelle(y, (ic) => { ic.alici.firma = 'x'; }), /Reddedilmiş/);
  T.yenidenAc(y);
  assert.equal(T.durum(y), 'taslak');
});

test('teklif: onaylı içerik elle bozulursa nihai PDF verilmez', () => {
  const { t, ayarlar } = yeniTeklif(ornek('tek-urun'));
  tamamla(t, 1500);
  T.onayaGonder(t, { ayarlar });
  T.onayla(t, { kdvTeyit: true }, { ayarlar });
  t.revizyonlar[0].icerik.satirlar[0].iskontoBp = 2000; // depoda elle oynanmış gibi
  assert.equal(T.butunlukTamam(t.revizyonlar[0]), false);
  assert.equal(T.nihaiPdfIzni(t, 0).izin, false);
  assert.throws(() => PDF.belgeTanimi(t, 0, { katalog: K, assets: AS, mod: 'nihai' }), /bütünlük/);
});

test('teklif: belirsiz/tanınmayan kalem incelenmeden onay yok; alıcı tanımı yeterli', () => {
  const { t, ayarlar } = yeniTeklif(ornek('coklu'));
  let kodlar = T.engeller(T.aktifRev(t).icerik, { ayarlar }).map((e) => e.kod);
  assert.ok(kodlar.includes('KALEM_TANINMAYAN'));
  const hx = T.aktifRev(t).icerik.satirlar.find((s) => s.durum === 'taninmayan');
  T.icerikGuncelle(t, (ic) => T.islem.satirHaric(ic, hx.id, 'Ayrı değerlendirilecek'));
  kodlar = T.engeller(T.aktifRev(t).icerik, { ayarlar }).map((e) => e.kod);
  assert.ok(!kodlar.includes('KALEM_TANINMAYAN'));
  assert.equal(T.aktifRev(t).icerik.satirlar.length, 2, 'hariç bırakılan kalem kayıtta kalır');

  const { t: b } = yeniTeklif(ornek('belirsiz'));
  const s = T.aktifRev(b).icerik.satirlar[0];
  assert.equal(s.durum, 'belirsiz');
  T.icerikGuncelle(b, (ic) => T.islem.satirEslestir(ic, s.id, 'kett-pm-450', { katalog: K, ayarlar }));
  const s2 = T.aktifRev(b).icerik.satirlar[0];
  assert.equal(s2.durum, 'tamam');
  assert.equal(s2.adet, 1);
  assert.equal(s2.iskontoBp, null);

  const { t: a } = yeniTeklif('PM450 1 adet');
  T.icerikGuncelle(a, (ic) => { ic.alici.tanim = 'WhatsApp müşterisi (ad bilinmiyor)'; });
  tamamla(a, 1000);
  assert.deepEqual(T.engeller(T.aktifRev(a).icerik, { ayarlar }), [], 'vergi no / firma adı zorunlu değil');
});

test('teklif: numaralar benzersiz', () => {
  const a = D.varsayilanAyarlar();
  a.cihazKodu = 'T';
  const z = '2026-10-06T09:00:00.000Z';
  const n1 = T.teklifNo(a, z, []);
  const n2 = T.teklifNo(a, z, [n1]);
  const n3 = T.teklifNo(a, z, [n1, n2]);
  assert.deepEqual([n1, n2, n3], ['TKL-261006-T01', 'TKL-261006-T02', 'TKL-261006-T03']);
});

// ---------------------------------------------------------------------------
function sahteDepo() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), m };
}

test('depo: kaydet/yükle sonrası kayıtlar ve onay bütünlüğü korunur', () => {
  const depo = sahteDepo();
  const veri = D.bosVeri();
  const { t } = yeniTeklif(ornek('tek-urun'), veri.ayarlar);
  tamamla(t, 1500);
  T.onayaGonder(t, { ayarlar: veri.ayarlar });
  T.onayla(t, { kdvTeyit: true }, { ayarlar: veri.ayarlar });
  T.icerikGuncelle(t, (ic) => T.islem.satirEkle(ic, 'kett-pm-450', { katalog: K, ayarlar: veri.ayarlar }));
  t.icNotlar = '<b>iç</b>';
  veri.teklifler.push(t);
  D.kaydet(veri, depo);
  const y = D.yukle(depo);
  assert.deepEqual(y.hatalar, []);
  assert.equal(y.veri.teklifler.length, 1);
  const t2 = y.veri.teklifler[0];
  assert.equal(T.kararliMetin(t2.revizyonlar), T.kararliMetin(t.revizyonlar), 'doğrulama içeriği değiştirmemeli');
  assert.ok(T.butunlukTamam(t2.revizyonlar[0]));
  assert.equal(y.veri.ayarlar.kdv.teyitliBp, 2000);
  assert.equal(t2.icNotlar, '<b>iç</b>');
});

test('depo: yedek dışa/içe aktarma, birleştirme ve bozuk dosyalar', () => {
  const veri = D.bosVeri();
  const { t } = yeniTeklif(ornek('tek-urun'), veri.ayarlar);
  tamamla(t, 1500);
  T.onayaGonder(t, { ayarlar: veri.ayarlar });
  T.onayla(t, { kdvTeyit: true }, { ayarlar: veri.ayarlar });
  veri.teklifler.push(t);
  const json = D.disaAktar(veri);

  const hedef = D.bosVeri();
  const gelen = D.iceAktarCoz(json);
  assert.deepEqual(gelen.butunlukUyarisi, []);
  const ozet = D.birlestir(hedef, gelen, 'birlestir');
  assert.equal(ozet.eklenen, 1);
  assert.equal(D.birlestir(hedef, D.iceAktarCoz(json), 'birlestir').ayni, 1, 'ikinci kez yüklemek çoğaltmaz');
  assert.equal(hedef.teklifler.length, 1);

  assert.throws(() => D.iceAktarCoz('{bozuk'), /JSON/);
  assert.throws(() => D.iceAktarCoz('{"a":1}'), /yedeği değil/);

  const j = JSON.parse(json);
  j.teklifler[0].revizyonlar[0].icerik.satirlar[0].iskontoBp = 2000; // elle oynanmış yedek
  j.teklifler.push({ id: 1, no: null }); // geçersiz kayıt
  const g2 = D.iceAktarCoz(JSON.stringify(j));
  assert.equal(g2.atlanan, 1);
  assert.equal(g2.butunlukUyarisi.length, 1);
});

// ---------------------------------------------------------------------------
function nihaiTeklif(test) {
  const { t, ayarlar } = yeniTeklif(ornek('tek-urun'), null, { test: !!test });
  T.icerikGuncelle(t, (ic) => { ic.musteriNotu = 'Müşteriye görünen açıklama'; });
  t.icNotlar = 'GİZLİ-İÇ-NOT-987';
  tamamla(t, 1500);
  T.onayaGonder(t, { ayarlar });
  T.onayla(t, { kdvTeyit: true }, { ayarlar }, '2026-10-06T12:00:00.000Z');
  return t;
}

test('pdf: nihai belge tanımında iç not, aralık ve uyarı yok; tek iskonto ve tek toplam var', () => {
  const t = nihaiTeklif(false);
  const dd = PDF.belgeTanimi(t, 0, { katalog: K, assets: AS, mod: 'nihai' });
  const metin = JSON.stringify(dd.content);
  assert.equal(dd.pageSize, 'A4');
  assert.equal(dd.watermark, undefined);
  for (const yok of ['GİZLİ-İÇ-NOT-987', 'TASLAK', 'Teyit bekliyor', 'Seçilmedi', '%10–%20', 'kurallı', 'stok kaydı', 'hafta içi 12 tane']) {
    assert.ok(!metin.includes(yok), 'nihai PDF\'de olmamalı: ' + yok);
  }
  assert.ok(metin.includes('81.600,00 TL'));
  assert.equal((metin.match(/GENEL TOPLAM/g) || []).length, 1);
  assert.ok(metin.includes('İskonto (%15)'));
  assert.ok(metin.includes('Müşteriye görünen açıklama'));
  assert.ok(!metin.includes('Garanti'), '"yer almasın" seçilen koşul basılmaz');
});

test('pdf: taslak belgede TASLAK filigranı ve teyit bekleyen alanlar', () => {
  const { t } = yeniTeklif(ornek('adet-yok'));
  const dd = PDF.belgeTanimi(t, 0, { katalog: K, assets: AS, mod: 'taslak', simdi: '2026-10-06T12:00:00.000Z' });
  assert.equal(dd.watermark.text, 'TASLAK');
  const metin = JSON.stringify(dd.content);
  assert.ok(metin.includes('TASLAK — Onaylanmamış belgedir'));
  assert.ok(metin.includes('[Teyit bekliyor]'));
  assert.ok(metin.includes('Kalem 1: adet seçilmedi, iskonto seçilmedi'));
  assert.throws(() => PDF.belgeTanimi(t, 0, { katalog: K, assets: AS, mod: 'nihai' }), /onaylı/);
});

function aracVar(ad) { try { execFileSync(ad, ['-v'], { stdio: 'ignore' }); return true; } catch (e) { return e.code !== 'ENOENT'; } }

test('pdf: gerçek A4 PDF, gömülü font, Türkçe karakterler, taşma yok', { skip: !aracVar('pdftotext') && 'poppler (pdftotext) yok' }, async () => {
  const pdfmake = require('pdfmake');
  const f = path.join(kok, 'node_modules/pdfmake/build/fonts/Roboto/');
  pdfmake.addFonts({ Roboto: { normal: f + 'Roboto-Regular.ttf', bold: f + 'Roboto-Medium.ttf', italics: f + 'Roboto-Italic.ttf', bolditalics: f + 'Roboto-MediumItalic.ttf' } });
  pdfmake.setUrlAccessPolicy(() => false);
  pdfmake.setLocalAccessPolicy((p) => p.startsWith(f));
  const t = nihaiTeklif(false);
  // Yalnız render testi için onaylı içerik zorlanır: uzun alanlar ve en büyük adet (9999)
  const ic = T.aktifRev(t).icerik;
  ic.alici.adres = 'Şehit Öğretmen Çağlayan Sokak No:12, Ilgın / Konya';
  ic.alici.firma = 'Çok Uzun Unvanlı Örnek Tarım Ürünleri Gıda Sanayi ve Ticaret Limited Şirketi Şubesi';
  ic.alici.eposta = 'cok-uzun-bir-satin-alma-adresi.bolum.sorumlusu@ornek-cok-uzun-alan-adi.example.com';
  ic.satirlar[0].adet = 9999;
  T.aktifRev(t).onayOzeti = T.ozet(ic);
  fs.mkdirSync(path.join(kok, 'test-results'), { recursive: true });
  const dosya = path.join(kok, 'test-results', 'birim-zorlama.pdf'); // incelemek için saklanır
  await pdfmake.createPdf(PDF.belgeTanimi(t, 0, { katalog: K, assets: AS, mod: 'nihai' })).write(dosya);
  const info = execFileSync('pdfinfo', [dosya]).toString();
  assert.match(info, /Page size:\s+595\.28 x 841\.89 pts \(A4\)/);
  assert.match(execFileSync('pdffonts', [dosya]).toString(), /Roboto-Regular\s+CID TrueType\s+Identity-H\s+yes yes yes/);
  const yazi = execFileSync('pdftotext', ['-layout', dosya, '-']).toString();
  for (const v of ['FİYAT TEKLİFİ', 'Çok Uzun Unvanlı Örnek Tarım', 'Şehit Öğretmen Çağlayan Sokak', 'Ilgın', 'KETT PM-450', 'Tahıl Rutubet Ölçme Cihazı', '9999 adet', '339.966.000,00', '407.959.200,00 TL', 'Ödeme sonrası teslimat.', 'Değirmen Sanayi ve Ticaret A.Ş.']) {
    assert.ok(yazi.includes(v), 'PDF metninde yok: ' + v);
  }
  assert.ok(!yazi.includes('GİZLİ-İÇ-NOT-987'));
  // Taşma kontrolü: her kelime sayfa kenar boşluğu içinde
  const bbox = execFileSync('pdftotext', ['-bbox', dosya, '-']).toString();
  const kenar = [...bbox.matchAll(/xMin="([\d.]+)" yMin="[\d.]+" xMax="([\d.]+)"/g)].map((m) => [Number(m[1]), Number(m[2])]);
  assert.ok(kenar.length > 50);
  for (const [x0, x1] of kenar) assert.ok(x0 >= 35 && x1 <= 560, 'kelime kenar boşluğu dışında: ' + x0 + '–' + x1);
  // Tablo hücreleri üst üste binmemeli: aynı sayfa ve satırdaki sözcükler birbirine girmemeli
  bbox.split('<page ').slice(1).forEach((sayfa) => {
    const satirlar = {};
    for (const m of sayfa.matchAll(/xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="[\d.]+">([^<]*)</g)) {
      const y = Math.round(Number(m[2]));
      (satirlar[y] = satirlar[y] || []).push([Number(m[1]), Number(m[3]), m[4]]);
    }
    for (const k of Object.values(satirlar)) {
      k.sort((a, b) => a[0] - b[0]);
      for (let i = 1; i < k.length; i++) assert.ok(k[i][0] >= k[i - 1][1] - 0.5, 'üst üste binen metin: ' + JSON.stringify([k[i - 1], k[i]]));
    }
  });
});
