/*
 * Kalıcı saklama: tarayıcının localStorage alanı (yalnız bu cihaz + bu tarayıcı).
 * Telefon ile bilgisayar arasında eşitleme YOKTUR. Taşımak için yedek dosyası kullanılır.
 */
(function (root) {
  'use strict';

  var teklifMod = (root.TA && root.TA.teklif) || require('./quote.js');

  var ANAHTAR = 'teklif-asistani.v1';
  var SURUM = 1;

  function rastgeleKod() {
    var harfler = 'ABCDEFGHJKLMNPRSTUVYZ';
    var b = new Uint8Array(2);
    if (root.crypto && root.crypto.getRandomValues) root.crypto.getRandomValues(b);
    else { b[0] = Math.random() * 255; b[1] = Math.random() * 255; }
    return harfler[b[0] % harfler.length] + harfler[b[1] % harfler.length];
  }

  function varsayilanAyarlar() {
    return {
      cihazKodu: rastgeleKod(),
      kdv: { varsayilanBp: 2000, teyitliBp: null, teyitZamani: null },
      varsayilan: { sevk: null, gecerlilik: null },
      urunEk: {},
      sirketEk: { vergiDairesi: '', vergiNo: '' },
      sonYedek: null
    };
  }

  function bosVeri() {
    return { surum: SURUM, teklifler: [], ayarlar: varsayilanAyarlar() };
  }

  function ayarlariTamamla(a) {
    var v = varsayilanAyarlar();
    a = a && typeof a === 'object' ? a : {};
    if (typeof a.cihazKodu !== 'string' || !/^[A-Z0-9]{1,3}$/.test(a.cihazKodu)) a.cihazKodu = v.cihazKodu;
    a.kdv = Object.assign({}, v.kdv, a.kdv || {});
    a.varsayilan = Object.assign({}, v.varsayilan, a.varsayilan || {});
    a.urunEk = a.urunEk && typeof a.urunEk === 'object' ? a.urunEk : {};
    a.sirketEk = Object.assign({}, v.sirketEk, a.sirketEk || {});
    if (!('sonYedek' in a)) a.sonYedek = null;
    return a;
  }

  // ---------------------------------------------------------------------------
  // Doğrulama: içe aktarılan veya bozulmuş veriden yalnız beklenen yapıyı kabul et.
  // ---------------------------------------------------------------------------

  function metin(x, uzunluk) { return typeof x === 'string' ? x.slice(0, uzunluk || 5000) : ''; }
  function tamSayiVeyaNull(x) { return Number.isInteger(x) ? x : null; }

  function icerikDogrula(ic) {
    if (!ic || typeof ic !== 'object' || !Array.isArray(ic.satirlar) || !ic.alici || !ic.kosullar) return null;
    var a = ic.alici;
    var temiz = {
      alici: {},
      satirlar: [],
      kosullar: {},
      kdvBp: Number.isInteger(ic.kdvBp) ? ic.kdvBp : 2000,
      musteriNotu: metin(ic.musteriNotu, 2000),
      teknikEkle: ic.teknikEkle !== false
    };
    ['firma', 'yetkili', 'tanim', 'eposta', 'telefon', 'adres', 'vergiDairesi', 'vergiNo'].forEach(function (k) { temiz.alici[k] = metin(a[k], 300); });
    ic.satirlar.forEach(function (s) {
      if (!s || typeof s !== 'object') return;
      if (['tamam', 'belirsiz', 'taninmayan', 'haric'].indexOf(s.durum) === -1) return;
      var u = s.urun && typeof s.urun === 'object' ? s.urun : null;
      if (s.durum === 'tamam' && !u) return;
      temiz.satirlar.push({
        id: metin(s.id, 40) || teklifMod.kimlik().slice(0, 10),
        durum: s.durum,
        urunId: s.urunId ? metin(s.urunId, 80) : null,
        adayUrunId: s.adayUrunId ? metin(s.adayUrunId, 80) : null,
        urun: u ? {
          id: metin(u.id, 80), marka: metin(u.marka, 80), model: metin(u.model, 80), ad: metin(u.ad, 200),
          aciklama: metin(u.aciklama, 1000), gorsel: metin(u.gorsel, 80), katalogUrl: metin(u.katalogUrl, 500),
          urunSayfasi: metin(u.urunSayfasi, 500),
          teknik: Array.isArray(u.teknik) ? u.teknik.filter(Array.isArray).map(function (r) { return [metin(r[0], 100), metin(r[1], 300)]; }) : [],
          siteAlinma: metin(u.siteAlinma, 20),
          listeFiyatiKurus: tamSayiVeyaNull(u.listeFiyatiKurus),
          kdvDahil: !!u.kdvDahil,
          iskontoAraligi: u.iskontoAraligi && Number.isFinite(u.iskontoAraligi.min) && Number.isFinite(u.iskontoAraligi.max) ? { min: u.iskontoAraligi.min, max: u.iskontoAraligi.max } : null
        } : null,
        ham: metin(s.ham, 200),
        adet: tamSayiVeyaNull(s.adet),
        iskontoBp: tamSayiVeyaNull(s.iskontoBp),
        haricNedeni: metin(s.haricNedeni, 300),
        oncekiDurum: ['tamam', 'belirsiz', 'taninmayan'].indexOf(s.oncekiDurum) !== -1 ? s.oncekiDurum : null,
        kaynak: s.kaynak && typeof s.kaynak === 'object' ? {
          ifade: s.kaynak.ifade ? metin(s.kaynak.ifade, 200) : null,
          adetKaynak: s.kaynak.adetKaynak ? metin(s.kaynak.adetKaynak, 200) : null,
          adetGuven: s.kaynak.adetGuven ? metin(s.kaynak.adetGuven, 20) : null,
          notlar: Array.isArray(s.kaynak.notlar) ? s.kaynak.notlar.map(function (n) { return metin(n, 300); }) : []
        } : null
      });
    });
    ['odeme', 'teslim', 'sevk', 'garanti', 'gecerlilik'].forEach(function (k) {
      var v = ic.kosullar[k] || {};
      var secimler = k === 'teslim' ? ['stokta', 'stokta_degil', 'ozel'] : (k === 'odeme' ? ['deger'] : ['deger', 'yok']);
      temiz.kosullar[k] = { secim: secimler.indexOf(v.secim) !== -1 ? v.secim : null, metin: metin(v.metin, 1000) };
      if (v.kaynak) temiz.kosullar[k].kaynak = metin(v.kaynak, 60);
      if (k === 'teslim') temiz.kosullar[k].teyitZamani = v.teyitZamani ? metin(v.teyitZamani, 40) : null;
    });
    return temiz;
  }

  function teklifDogrula(t) {
    if (!t || typeof t !== 'object' || typeof t.id !== 'string' || typeof t.no !== 'string' || !Array.isArray(t.revizyonlar) || !t.revizyonlar.length) return null;
    var DURUMLAR = ['taslak', 'onay_bekliyor', 'onaylandi', 'reddedildi'];
    var revler = [];
    for (var i = 0; i < t.revizyonlar.length; i++) {
      var r = t.revizyonlar[i];
      var ic = icerikDogrula(r && r.icerik);
      if (!ic || DURUMLAR.indexOf(r.durum) === -1) return null;
      var temizRev = { rev: Number.isInteger(r.rev) ? r.rev : i, durum: r.durum, icerik: ic, olusturma: metin(r.olusturma, 40) };
      ['onayaGonderim', 'onayZamani', 'onayOzeti', 'redZamani', 'redNedeni'].forEach(function (k) { if (r[k]) temizRev[k] = metin(r[k], 500); });
      if (Number.isInteger(r.oncekiRev)) temizRev.oncekiRev = r.oncekiRev;
      if (Number.isInteger(r.yerineGelen)) temizRev.yerineGelen = r.yerineGelen;
      revler.push(temizRev);
    }
    var talep = t.talep && typeof t.talep === 'object' ? t.talep : {};
    return {
      id: metin(t.id, 64),
      no: metin(t.no, 40),
      olusturma: metin(t.olusturma, 40),
      guncelleme: metin(t.guncelleme, 40),
      test: !!t.test,
      talep: {
        kaynak: ['whatsapp', 'eposta', 'telefon'].indexOf(talep.kaynak) !== -1 ? talep.kaynak : 'whatsapp',
        metin: metin(talep.metin, 20000),
        zaman: metin(talep.zaman, 40),
        // Ayrıştırma çıktısı yalnız görüntüleme içindir; yapısı bozuksa atılır.
        ayristirma: talep.ayristirma && typeof talep.ayristirma === 'object' ? JSON.parse(JSON.stringify(talep.ayristirma)) : null
      },
      icNotlar: metin(t.icNotlar, 5000),
      revizyonlar: revler,
      gecmis: Array.isArray(t.gecmis) ? t.gecmis.map(function (g) { return { zaman: metin(g && g.zaman, 40), olay: metin(g && g.olay, 500), rev: Number.isInteger(g && g.rev) ? g.rev : null }; }) : [],
      pdfKayitlari: Array.isArray(t.pdfKayitlari) ? t.pdfKayitlari.map(function (p) { return { zaman: metin(p && p.zaman, 40), tur: metin(p && p.tur, 20), rev: Number.isInteger(p && p.rev) ? p.rev : null, dosya: metin(p && p.dosya, 200) }; }) : [],
      gonderimKayitlari: Array.isArray(t.gonderimKayitlari) ? t.gonderimKayitlari.map(function (p) { return { zaman: metin(p && p.zaman, 40), rev: Number.isInteger(p && p.rev) ? p.rev : null, not: metin(p && p.not, 500) }; }) : []
    };
  }

  // ---------------------------------------------------------------------------
  // Yükle / kaydet
  // ---------------------------------------------------------------------------

  function depoAl(depo) {
    if (depo) return depo;
    try { return root.localStorage; } catch (e) { return null; }
  }

  function yukle(depo) {
    var d = depoAl(depo);
    var veri = bosVeri();
    var hatalar = [];
    if (!d) return { veri: veri, hatalar: ['Tarayıcı depolaması kullanılamıyor; kayıtlar sayfa kapanınca kaybolur.'], depoYok: true };
    var ham;
    try { ham = d.getItem(ANAHTAR); } catch (e) { hatalar.push('Depolama okunamadı: ' + e.message); }
    if (ham) {
      try {
        var j = JSON.parse(ham);
        veri.ayarlar = ayarlariTamamla(j.ayarlar);
        (j.teklifler || []).forEach(function (t) {
          var tt = teklifDogrula(t);
          if (tt) veri.teklifler.push(tt); else hatalar.push('Okunamayan bir kayıt atlandı.');
        });
      } catch (e) {
        hatalar.push('Kayıtlı veri bozuk görünüyor; okunamadı. (Ham veri silinmedi.)');
        veri.okumaHatasi = true;
      }
    } else {
      veri.ayarlar = ayarlariTamamla(null);
    }
    return { veri: veri, hatalar: hatalar };
  }

  function kaydet(veri, depo) {
    var d = depoAl(depo);
    if (!d) throw new Error('Tarayıcı depolaması kullanılamıyor.');
    if (veri.okumaHatasi) throw new Error('Kayıtlı veri okunamadığı için üzerine yazılmadı. Önce yedekten geri yükleyin veya verileri sıfırlayın.');
    var j = JSON.stringify({ surum: SURUM, teklifler: veri.teklifler, ayarlar: veri.ayarlar });
    try {
      d.setItem(ANAHTAR, j);
    } catch (e) {
      throw new Error('Kaydedilemedi (depolama dolu olabilir): ' + e.message);
    }
    return j.length;
  }

  // ---------------------------------------------------------------------------
  // Yedek
  // ---------------------------------------------------------------------------

  function disaAktar(veri, simdi) {
    return JSON.stringify({
      uygulama: 'teklif-asistani',
      surum: SURUM,
      disaAktarim: simdi || new Date().toISOString(),
      not: 'Değirmen Teklif Asistanı yedeği. Müşteri bilgisi içerir; güvenli saklayın.',
      teklifler: veri.teklifler,
      ayarlar: veri.ayarlar
    }, null, 2);
  }

  function iceAktarCoz(jsonMetni) {
    var j;
    try { j = JSON.parse(jsonMetni); } catch (e) { throw new Error('Dosya geçerli bir JSON değil.'); }
    if (!j || j.uygulama !== 'teklif-asistani' || !Array.isArray(j.teklifler)) throw new Error('Bu dosya bir Teklif Asistanı yedeği değil.');
    var teklifler = [];
    var atlanan = 0;
    var butunlukUyarisi = [];
    j.teklifler.forEach(function (t) {
      var tt = teklifDogrula(t);
      if (!tt) { atlanan++; return; }
      tt.revizyonlar.forEach(function (r) {
        if (r.durum === 'onaylandi' && !teklifMod.butunlukTamam(r)) butunlukUyarisi.push(tt.no + ' Rev. ' + r.rev);
      });
      teklifler.push(tt);
    });
    return { teklifler: teklifler, ayarlar: j.ayarlar ? ayarlariTamamla(j.ayarlar) : null, atlanan: atlanan, butunlukUyarisi: butunlukUyarisi, tarih: metin(j.disaAktarim, 40) };
  }

  /*
   * mod 'birlestir': aynı kimlikli kayıtta güncelleme tarihi yeni olan kalır; yeni kayıtlar eklenir.
   *                  Ayarlar korunur (cihaz kodu değişmez).
   * mod 'degistir' : mevcut tüm teklifler yedektekilerle değiştirilir; ayarlar yedekten alınır
   *                  (bu cihazın cihaz kodu korunur).
   */
  function birlestir(veri, gelen, mod) {
    var ozet = { eklenen: 0, guncellenen: 0, ayni: 0, atlanan: gelen.atlanan, noCakismasi: [] };
    if (mod === 'degistir') {
      var kod = veri.ayarlar.cihazKodu;
      veri.teklifler = gelen.teklifler.slice();
      if (gelen.ayarlar) { veri.ayarlar = gelen.ayarlar; veri.ayarlar.cihazKodu = kod; }
      ozet.eklenen = gelen.teklifler.length;
      return ozet;
    }
    var idx = {};
    veri.teklifler.forEach(function (t, i) { idx[t.id] = i; });
    gelen.teklifler.forEach(function (t) {
      if (idx[t.id] === undefined) {
        var cakisan = veri.teklifler.filter(function (x) { return x.no === t.no; })[0];
        if (cakisan) ozet.noCakismasi.push(t.no);
        veri.teklifler.push(t);
        ozet.eklenen++;
      } else {
        var mevcut = veri.teklifler[idx[t.id]];
        if ((t.guncelleme || '') > (mevcut.guncelleme || '')) { veri.teklifler[idx[t.id]] = t; ozet.guncellenen++; } else ozet.ayni++;
      }
    });
    return ozet;
  }

  var DEPO = {
    ANAHTAR: ANAHTAR,
    bosVeri: bosVeri,
    varsayilanAyarlar: varsayilanAyarlar,
    ayarlariTamamla: ayarlariTamamla,
    teklifDogrula: teklifDogrula,
    yukle: yukle,
    kaydet: kaydet,
    disaAktar: disaAktar,
    iceAktarCoz: iceAktarCoz,
    birlestir: birlestir
  };

  root.TA = root.TA || {};
  root.TA.depo = DEPO;
  if (typeof module === 'object' && module.exports) module.exports = DEPO;
})(typeof window !== 'undefined' ? window : globalThis);
