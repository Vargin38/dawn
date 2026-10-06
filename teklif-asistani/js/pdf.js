/*
 * Müşteriye yönelik teklif PDF'i (A4, pdfmake + gömülü Roboto font: Türkçe karakterler tam).
 *
 * Nihai PDF yalnız onaylı ve bütünlük kontrolünden geçen revizyondan üretilir.
 * PDF'ye ASLA girmeyenler: iç notlar, iskonto aralığı/seçenekleri, ayrıştırma uyarıları,
 * stok kaydı ayrıntıları ve geliştirici açıklamaları.
 * Taslak PDF: büyük "TASLAK" filigranı + üst bant; eksik alanlar "[Teyit bekliyor]" olarak görünür.
 */
(function (root) {
  'use strict';

  var para = (root.TA && root.TA.para) || require('./money.js');
  var T = (root.TA && root.TA.teklif) || require('./quote.js');

  var RENK = { ana: '#0a7fb8', koyu: '#1f2933', gri: '#5f6b7a', cizgi: '#cfd8e0', zemin: '#eef4f8', kirmizi: '#c62828', kirmiziZemin: '#fdecea' };

  function tl(k) { return para.bicimle(k, false); }

  function harfCevir(s) {
    var m = { 'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U' };
    return String(s).replace(/[çÇğĞıİöÖşŞüÜ]/g, function (c) { return m[c]; });
  }

  function dosyaAdi(t, rev, mod) {
    var alici = harfCevir(T.aliciEtiketi(rev.icerik.alici) || 'alici').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
    return 'Teklif_' + t.no + '_Rev' + rev.rev + '_' + alici + (mod === 'taslak' ? '_TASLAK' : '') + (t.test ? '_TEST' : '') + '.pdf';
  }

  var bekliyor = { text: '[Teyit bekliyor]', color: RENK.kirmizi, bold: true };

  function hucre(text, ek) {
    var h = { text: text };
    Object.keys(ek || {}).forEach(function (k) { h[k] = ek[k]; });
    return h;
  }

  var izgara = {
    hLineWidth: function (i, node) { return (i === 0 || i === node.table.body.length) ? 0.8 : 0.4; },
    vLineWidth: function () { return 0; },
    hLineColor: function (i) { return i <= 1 ? RENK.ana : RENK.cizgi; },
    paddingLeft: function () { return 4; },
    paddingRight: function () { return 4; },
    paddingTop: function () { return 4; },
    paddingBottom: function () { return 4; }
  };
  var siki = {
    hLineWidth: function () { return 0.3; },
    vLineWidth: function () { return 0; },
    hLineColor: function () { return RENK.cizgi; },
    paddingLeft: function () { return 4; },
    paddingRight: function () { return 4; },
    paddingTop: function () { return 1.5; },
    paddingBottom: function () { return 1.5; }
  };
  var sade = {
    hLineWidth: function () { return 0.4; },
    vLineWidth: function () { return 0; },
    hLineColor: function () { return RENK.cizgi; },
    paddingLeft: function () { return 4; },
    paddingRight: function () { return 4; },
    paddingTop: function () { return 3; },
    paddingBottom: function () { return 3; }
  };

  // Teknik özellik satırlarını yer kazanmak için iki sütuna yerleştirir (sol sütun önce dolar).
  function ikiSutun(satirlar) {
    var yari = Math.ceil(satirlar.length / 2);
    var govde = [];
    for (var i = 0; i < yari; i++) {
      var sol = satirlar[i], sag = satirlar[i + yari];
      govde.push([hucre(sol[0], { color: RENK.gri }), hucre(sol[1]),
        sag ? hucre(sag[0], { color: RENK.gri }) : hucre(''), sag ? hucre(sag[1]) : hucre('')]);
    }
    return govde;
  }

  /*
   * ctx: { katalog, assets, mod: 'nihai'|'taslak', simdi }
   */
  function belgeTanimi(t, revNo, ctx) {
    var mod = ctx.mod === 'nihai' ? 'nihai' : 'taslak';
    var rev = t.revizyonlar.filter(function (r) { return r.rev === revNo; })[0];
    if (!rev) throw new Error('Revizyon bulunamadı');
    if (mod === 'nihai') {
      var izin = T.nihaiPdfIzni(t, revNo);
      if (!izin.izin) throw new Error(izin.neden);
      if (T.engeller(rev.icerik, {}).length) throw new Error('Onaylı revizyonda eksik alan var; nihai PDF oluşturulamaz.');
    }
    var taslak = mod === 'taslak';
    var ic = rev.icerik;
    var sirket = ctx.katalog.sirket;
    var assets = ctx.assets || {};
    var h = T.hesapla(ic);
    var tarihIso = taslak ? (ctx.simdi || new Date().toISOString()) : rev.onayZamani;
    var icerik = [];

    // --- Uyarı bantları (yalnız taslak / test) ---
    var bantlar = [];
    if (taslak) bantlar.push('TASLAK — Onaylanmamış belgedir; müşteriye gönderilmez.');
    if (t.test) bantlar.push('TEST VERİSİ — Gerçek bir teklif değildir.');
    if (bantlar.length) {
      icerik.push({
        table: { widths: ['*'], body: [[{ text: bantlar.join('\n'), bold: true, color: RENK.kirmizi, alignment: 'center', fillColor: RENK.kirmiziZemin, margin: [0, 4, 0, 4] }]] },
        layout: 'noBorders',
        margin: [0, 0, 0, 10]
      });
    }

    // --- Başlık ve teklif bilgileri ---
    var meta = [
      ['Teklif No', t.no],
      ['Revizyon', 'Rev. ' + rev.rev],
      ['Tarih', T.tarihTR(tarihIso) + (taslak ? ' (taslak)' : '')]
    ];
    icerik.push({
      columns: [
        { width: '*', stack: [{ text: 'FİYAT TEKLİFİ', style: 'baslik' }] },
        {
          width: 190,
          table: { widths: [62, '*'], body: meta.map(function (r) { return [hucre(r[0], { color: RENK.gri }), hucre(r[1], { bold: true })]; }) },
          layout: sade
        }
      ],
      margin: [0, 0, 0, 8]
    });

    // --- Alıcı ---
    var a = ic.alici;
    var aliciSatirlari = [];
    if (a.firma.trim()) aliciSatirlari.push({ text: a.firma.trim(), bold: true });
    if (a.yetkili.trim()) aliciSatirlari.push({ text: (a.firma.trim() ? 'İlgili: ' : '') + a.yetkili.trim(), bold: !a.firma.trim() });
    if (!a.firma.trim() && !a.yetkili.trim() && a.tanim.trim()) aliciSatirlari.push({ text: a.tanim.trim(), bold: true });
    if (!aliciSatirlari.length) aliciSatirlari.push(taslak ? bekliyor : { text: '' });
    if (a.adres.trim()) aliciSatirlari.push({ text: a.adres.trim() });
    var iletisim = [];
    if (a.telefon.trim()) iletisim.push('Tel: ' + a.telefon.trim());
    if (a.eposta.trim()) iletisim.push('E-posta: ' + a.eposta.trim());
    if (iletisim.length) aliciSatirlari.push({ text: iletisim.join('   ·   ') });
    var vergi = [];
    if (a.vergiDairesi.trim()) vergi.push('V.D.: ' + a.vergiDairesi.trim());
    if (a.vergiNo.trim()) vergi.push('V.N.: ' + a.vergiNo.trim());
    if (vergi.length) aliciSatirlari.push({ text: vergi.join('   ·   ') });

    icerik.push({
      table: { widths: ['*'], body: [[{ stack: [{ text: 'MÜŞTERİ', fontSize: 7, color: RENK.gri, bold: true, margin: [0, 0, 0, 2] }].concat(aliciSatirlari), fillColor: RENK.zemin, margin: [4, 4, 4, 4] }]] },
      layout: 'noBorders',
      margin: [0, 0, 0, 8]
    });

    var hitap = (a.yetkili.trim() || a.firma.trim() || a.tanim.trim());
    icerik.push({ text: (hitap ? 'Sayın ' + hitap + ',' : 'Sayın Yetkili,'), margin: [0, 0, 0, 4] });
    icerik.push({ text: 'Talebiniz üzerine hazırladığımız fiyat teklifimizi bilgilerinize sunarız.', margin: [0, 0, 0, 6] });

    // --- Ürün tablosu ---
    var basliklar = ['#', '', 'Ürün', 'Miktar', 'Birim Fiyat (TL)', 'İskonto', 'İskontolu Birim (TL)', 'Tutar (TL)'].map(function (b, i) {
      return { text: b, bold: true, fontSize: 7.5, color: RENK.koyu, alignment: i >= 3 ? 'right' : 'left' };
    });
    var govde = [basliklar];
    var sira = 0;
    var eksikler = []; // yalnız taslakta, tablonun altında tam cümleyle (dar sütunda kelime bölünmesin)
    h.satirlar.forEach(function (x) {
      var s = x.satir;
      if (s.durum !== 'tamam' || !s.urun) return;
      sira++;
      var eksik = [];
      if (!T.adetGecerli(s.adet)) eksik.push('adet seçilmedi');
      if (s.iskontoBp == null) eksik.push('iskonto seçilmedi');
      if (eksik.length) eksikler.push('Kalem ' + sira + ': ' + eksik.join(', '));
      var g = s.urun.gorsel && assets[s.urun.gorsel] ? { image: assets[s.urun.gorsel], width: 38, height: 38 } : { text: '' };
      govde.push([
        hucre(String(sira)),
        g,
        { stack: [
          { text: s.urun.marka + ' ' + s.urun.model, bold: true },
          { text: s.urun.ad },
          { text: s.urun.aciklama || '', fontSize: 7.5, color: RENK.gri, margin: [0, 2, 0, 0] }
        ] },
        T.adetGecerli(s.adet) ? hucre(s.adet + ' adet', { alignment: 'right', noWrap: true }) : hucre('—', { alignment: 'right', color: RENK.kirmizi, bold: true }),
        hucre(s.urun.listeFiyatiKurus != null ? tl(s.urun.listeFiyatiKurus) : '—', { alignment: 'right', noWrap: true }),
        s.iskontoBp != null ? hucre(para.oranBicimle(s.iskontoBp), { alignment: 'right', noWrap: true }) : hucre('—', { alignment: 'right', color: RENK.kirmizi, bold: true }),
        hucre(x.hesap ? tl(x.hesap.iskontoluBirim) : '—', { alignment: 'right', noWrap: true }),
        hucre(x.hesap ? tl(x.hesap.net) : '—', { alignment: 'right', bold: true, noWrap: true })
      ]);
    });
    if (taslak && eksikler.length) {
      govde.push([{ text: '[Teyit bekliyor] ' + eksikler.join(' · ') + '.', colSpan: 8, color: RENK.kirmizi, bold: true }, '', '', '', '', '', '', '']);
    }
    var incelemede = ic.satirlar.filter(function (s) { return s.durum === 'belirsiz' || s.durum === 'taninmayan'; });
    if (taslak && incelemede.length) {
      govde.push([{ text: incelemede.length + ' kalem ürün eşleşmesi bekliyor: ' + incelemede.map(function (s) { return '"' + s.ham + '"'; }).join(', '), colSpan: 8, color: RENK.kirmizi, bold: true }, '', '', '', '', '', '', '']);
    }
    if (govde.length === 1) govde.push([{ text: taslak ? '[Ürün kalemi yok]' : '', colSpan: 8, color: RENK.kirmizi }, '', '', '', '', '', '', '']);
    icerik.push({
      table: { headerRows: 1, dontBreakRows: true, widths: [12, 40, '*', 40, 58, 36, 62, 64], body: govde },
      layout: izgara,
      fontSize: 8.5,
      margin: [0, 0, 0, 8]
    });

    // --- Toplamlar ---
    var toplamSatirlari = [];
    if (h.toplam) {
      var oranlar = T.aktifSatirlar(ic).filter(function (s) { return s.durum === 'tamam'; }).map(function (s) { return s.iskontoBp; })
        .filter(function (v, i, d) { return d.indexOf(v) === i; });
      var iskEtiket = oranlar.length === 1 ? 'İskonto (' + para.oranBicimle(oranlar[0]) + ')' : 'İskonto';
      toplamSatirlari = [
        ['Liste fiyatı toplamı', tl(h.toplam.brut) + ' TL', false],
        [iskEtiket, '−' + tl(h.toplam.iskonto) + ' TL', false],
        ['Net tutar (KDV hariç)', tl(h.toplam.net) + ' TL', true],
        ['KDV (' + para.oranBicimle(h.toplam.kdvBp) + ')', tl(h.toplam.kdv) + ' TL', false]
      ].map(function (r) { return [hucre(r[0], { bold: r[2] }), hucre(r[1], { alignment: 'right', bold: r[2], noWrap: true })]; });
      toplamSatirlari.push([
        hucre('GENEL TOPLAM (KDV dahil)', { bold: true, color: '#ffffff', fillColor: RENK.ana }),
        hucre(tl(h.toplam.genelToplam) + ' TL', { bold: true, color: '#ffffff', fillColor: RENK.ana, alignment: 'right', noWrap: true, fontSize: 10 })
      ]);
    } else {
      toplamSatirlari = [[hucre('Toplam', { bold: true }), hucre('[Adet ve iskonto seçilince hesaplanır]', { color: RENK.kirmizi, bold: true, alignment: 'right' })]];
    }
    icerik.push({
      columns: [
        { width: '*', text: '' },
        { width: 250, table: { widths: ['*', 'auto'], body: toplamSatirlari }, layout: sade }
      ],
      margin: [0, 0, 0, 4]
    });
    icerik.push({ text: 'Tutarlar Türk lirası (TL) cinsindendir. Birim fiyatlara KDV dahil değildir; KDV ayrıca gösterilmiştir.', fontSize: 7.5, color: RENK.gri, alignment: 'right', margin: [0, 0, 0, 8] });

    // --- Koşullar ---
    var k = ic.kosullar;
    var kosulSatirlari = [];
    ['odeme', 'teslim', 'sevk', 'garanti', 'gecerlilik'].forEach(function (ad) {
      var v = k[ad];
      var etiket = hucre(T.KOSUL_ETIKET[ad], { bold: true, color: RENK.koyu });
      if (v.secim === 'yok') return;
      if (v.secim && v.metin.trim()) kosulSatirlari.push([etiket, hucre(v.metin.trim())]);
      else if (taslak) kosulSatirlari.push([etiket, bekliyor]);
    });
    if (kosulSatirlari.length) {
      icerik.push({ text: 'Ticari koşullar', style: 'altBaslik' });
      icerik.push({ table: { widths: [110, '*'], body: kosulSatirlari }, layout: sade, margin: [0, 0, 0, 8], unbreakable: true });
    }

    if (ic.musteriNotu.trim()) {
      icerik.push({ text: 'Açıklama', style: 'altBaslik' });
      icerik.push({ text: ic.musteriNotu.trim(), margin: [0, 0, 0, 10] });
    }

    // --- Dokümanlar ve teknik özellikler ---
    var urunler = T.aktifSatirlar(ic).filter(function (s) { return s.durum === 'tamam' && s.urun; })
      .map(function (s) { return s.urun; })
      .filter(function (u, i, d) { return d.map(function (x) { return x.id; }).indexOf(u.id) === i; });
    var dokuman = [];
    urunler.forEach(function (u) {
      if (u.katalogUrl) {
        dokuman.push({ text: [{ text: u.marka + ' ' + u.model + ' ürün kataloğu (PDF): ', bold: true }, { text: u.katalogUrl, link: u.katalogUrl, color: RENK.ana }], fontSize: 8, margin: [0, 0, 0, 2] });
      }
      if (u.urunSayfasi) {
        dokuman.push({ text: [{ text: u.marka + ' ' + u.model + ' ürün sayfası: ', bold: true }, { text: 'degirmen.tr', link: u.urunSayfasi, color: RENK.ana }], fontSize: 8, margin: [0, 0, 0, 2] });
      }
    });
    if (dokuman.length) {
      icerik.push({ text: 'Ürün dokümanları', style: 'altBaslik' });
      icerik.push({ stack: dokuman, margin: [0, 0, 0, 8] });
    }

    if (ic.teknikEkle) {
      urunler.forEach(function (u) {
        if (!u.teknik || !u.teknik.length) return;
        // Tablo sayfa arasında bölünmez; sığmazsa bütün olarak sonraki sayfaya geçer.
        icerik.push({
          unbreakable: true,
          stack: [
            {
              table: {
                widths: [72, '*', 72, '*'],
                body: [[{ text: 'Teknik özellikler — ' + u.marka + ' ' + u.model, colSpan: 4, bold: true, color: RENK.koyu, fillColor: RENK.zemin }, '', '', '']]
                  .concat(ikiSutun(u.teknik))
              },
              layout: siki,
              fontSize: 7.5,
              margin: [0, 0, 0, 2]
            },
            { text: 'Teknik bilgiler üretici kataloğundan alınmıştır.', fontSize: 7, color: RENK.gri, margin: [0, 0, 0, 6] }
          ]
        });
      });
    }

    // Kapanış, son blokla birlikte tutulur; sonraki sayfada tek başına kalmaz.
    var kapanis = [{ text: 'Saygılarımızla,', margin: [0, 4, 0, 2] }, { text: sirket.unvan, bold: true }];
    var sonBlok = icerik.pop();
    icerik.push({ unbreakable: true, stack: [sonBlok].concat(kapanis) });

    var logo = assets[sirket.logo];
    var watermark = null;
    if (taslak) watermark = { text: t.test ? 'TASLAK · TEST' : 'TASLAK', color: RENK.kirmizi, opacity: 0.13, bold: true };
    else if (t.test) watermark = { text: 'TEST VERİSİ', color: RENK.kirmizi, opacity: 0.13, bold: true };

    var dd = {
      pageSize: 'A4',
      pageMargins: [40, 88, 40, 46],
      info: {
        title: 'Fiyat Teklifi ' + t.no + ' Rev. ' + rev.rev + (taslak ? ' (TASLAK)' : ''),
        author: sirket.unvan,
        subject: 'Fiyat teklifi',
        creator: 'Değirmen Teklif Asistanı'
      },
      header: function () {
        return {
          margin: [40, 26, 40, 0],
          columns: [
            logo ? { image: logo, width: 150 } : { text: sirket.unvan, bold: true, fontSize: 12, color: RENK.ana },
            {
              width: '*',
              alignment: 'right',
              fontSize: 7.5,
              color: RENK.gri,
              stack: [
                { text: sirket.unvan, bold: true, color: RENK.koyu, fontSize: 8.5 },
                sirket.adres.join(', '),
                'Tel: ' + sirket.telefon + '   ·   Cep/WhatsApp: ' + sirket.cep,
                'Faks: ' + sirket.faks + '   ·   ' + sirket.eposta + '   ·   ' + sirket.web
              ].concat(ctx.sirketEk && (ctx.sirketEk.vergiDairesi || ctx.sirketEk.vergiNo)
                ? ['V.D.: ' + (ctx.sirketEk.vergiDairesi || '—') + '   ·   V.N.: ' + (ctx.sirketEk.vergiNo || '—')] : [])
            }
          ]
        };
      },
      footer: function (sayfa, toplamSayfa) {
        return {
          margin: [40, 14, 40, 0],
          columns: [
            { text: sirket.unvan + ' · ' + sirket.web, fontSize: 7, color: RENK.gri },
            { text: 'Teklif No ' + t.no + ' · Rev. ' + rev.rev + ' · Sayfa ' + sayfa + '/' + toplamSayfa, fontSize: 7, color: RENK.gri, alignment: 'right' }
          ]
        };
      },
      content: icerik,
      styles: {
        baslik: { fontSize: 17, bold: true, color: RENK.ana, margin: [0, 2, 0, 0] },
        altBaslik: { fontSize: 10, bold: true, color: RENK.koyu, margin: [0, 2, 0, 4] }
      },
      defaultStyle: { font: 'Roboto', fontSize: 9, lineHeight: 1.15, color: RENK.koyu }
    };
    if (watermark) dd.watermark = watermark;
    return dd;
  }

  // Tarayıcı: PDF'yi üretip indirir. Dış URL erişimi kapalı (görseller gömülü data URL).
  function indir(t, revNo, ctx) {
    var pm = root.pdfMake;
    if (!pm) return Promise.reject(new Error('PDF kütüphanesi bulunamadı (vendor/pdfmake.min.js). Klasörde bir kez "npm install" ve "npm run vendor" çalıştırın.'));
    if (pm.setUrlAccessPolicy) pm.setUrlAccessPolicy(function () { return false; });
    var rev = t.revizyonlar.filter(function (r) { return r.rev === revNo; })[0];
    var dd;
    try { dd = belgeTanimi(t, revNo, ctx); } catch (e) { return Promise.reject(e); }
    var ad = dosyaAdi(t, rev, ctx.mod);
    return pm.createPdf(dd).download(ad).then(function () { return { dosya: ad }; });
  }

  var PDF = { belgeTanimi: belgeTanimi, indir: indir, dosyaAdi: dosyaAdi };

  root.TA = root.TA || {};
  root.TA.pdf = PDF;
  if (typeof module === 'object' && module.exports) module.exports = PDF;
})(typeof window !== 'undefined' ? window : globalThis);
