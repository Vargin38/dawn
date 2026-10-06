/*
 * Kurallı (yapay zekâ kullanmayan) mesaj ayrıştırıcı.
 *
 * Müşteri mesajı GÜVENİLMEYEN metindir: içindeki talimatlar hiçbir kuralı değiştirmez.
 * Bu modül yalnız aday bilgi çıkarır; fiyat, iskonto, stok veya koşul belirlemez.
 * Emin olunamayan her şey boş bırakılır ve uyarıyla kullanıcı incelemesine gönderilir.
 *
 * Konumlar (bas/son) normalize edilmiş metne göredir; sonuçta bu metin de döner.
 */
(function (root) {
  'use strict';

  var SURUM = 'kural-1.0';

  // ---------------------------------------------------------------------------
  // Yardımcılar
  // ---------------------------------------------------------------------------

  // Uzunluğu koruyan Türkçe katlama (büyük/küçük ve aksan farkını kaldırır).
  var KATLA = {
    'İ': 'i', 'I': 'i', 'ı': 'i', 'Ğ': 'g', 'ğ': 'g', 'Ü': 'u', 'ü': 'u', 'Ş': 's', 'ş': 's',
    'Ö': 'o', 'ö': 'o', 'Ç': 'c', 'ç': 'c', 'Â': 'a', 'â': 'a', 'Î': 'i', 'î': 'i', 'Û': 'u', 'û': 'u',
    '’': "'", '‘': "'", 'ʼ': "'"
  };
  function katla(s) {
    var out = '';
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (KATLA[c]) { out += KATLA[c]; continue; }
      var l = c.toLowerCase();
      out += l.length === 1 ? l : c;
    }
    return out;
  }

  function normalize(metin) {
    return String(metin == null ? '' : metin)
      .replace(/\r\n?/g, '\n')
      .normalize('NFC');
  }

  function cakisir(a, b) { return a.bas < b.son && b.bas < a.son; }
  function herhangiCakisir(span, liste) {
    for (var i = 0; i < liste.length; i++) if (cakisir(span, liste[i])) return true;
    return false;
  }

  // Belirtilen aralıkları rakam/harf içermeyen bir karakterle örter (uzunluk korunur).
  function maskele(metin, araliklar) {
    var dizi = metin.split('');
    araliklar.forEach(function (a) {
      for (var i = a.bas; i < a.son; i++) if (dizi[i] !== '\n') dizi[i] = '█';
    });
    return dizi.join('');
  }

  function satirNo(metin, konum) {
    var n = 0;
    for (var i = 0; i < konum && i < metin.length; i++) if (metin[i] === '\n') n++;
    return n;
  }

  // Cümle sınırı: satır sonu, ! ? ve iki rakam arasında olmayan nokta ("10.000" bölünmez).
  function sinirMi(metin, i) {
    var c = metin[i];
    if (c === '\n' || c === '!' || c === '?') return true;
    if (c === '.') return !(/\d/.test(metin[i - 1] || '') && /\d/.test(metin[i + 1] || ''));
    return false;
  }
  function cumleCevresi(metin, bas, son) {
    var b = bas, s = son;
    while (b > 0 && !sinirMi(metin, b - 1)) b--;
    while (s < metin.length && !sinirMi(metin, s)) s++;
    if (s < metin.length && metin[s] !== '\n') s++;
    return metin.slice(b, s).trim().slice(0, 200);
  }

  function hepsiniBul(re, metin, fn) {
    re.lastIndex = 0;
    var m;
    while ((m = re.exec(metin)) !== null) {
      fn(m);
      if (m[0].length === 0) re.lastIndex++;
    }
  }

  // ---------------------------------------------------------------------------
  // İletişim bilgileri
  // ---------------------------------------------------------------------------

  var EPOSTA_RE = /[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,}/g;
  var URL_RE = /\bhttps?:\/\/[^\s<>"]+|\bwww\.[^\s<>"]+/gi;
  // 10 haneli Türkiye numarası: +90 / 0 önekli veya öneksiz, 3-3-2-2 gruplu ya da bitişik.
  var TELEFON_RE = /(^|[^\d+])((?:\+\s?90|0090|90)?[\s.\-]?\(?\s?0?\s?([2-58]\d{2})\s?\)?[\s.\-]?(\d{3})[\s.\-]?(\d{2})[\s.\-]?(\d{2}))(?!\d)/g;

  function telefonBicimle(a, b, c, d) { return '+90 ' + a + ' ' + b + ' ' + c + ' ' + d; }

  function sirketKendisiMi(katlanmis, sirket) {
    if (!sirket) return false;
    if (/degirmen\s*(sanayi|san\.|a\.?\s?s\b|a\.s\.)/.test(katlanmis)) return true;
    return false;
  }

  function kendiTelefonlari(sirket) {
    var set = {};
    if (!sirket) return set;
    [sirket.telefon, sirket.cep, sirket.faks].concat(sirket.digerTelefonlar || []).forEach(function (t) {
      if (!t) return;
      var r = String(t).replace(/\D/g, '');
      if (r.length >= 10) set[r.slice(-10)] = true;
    });
    return set;
  }

  // ---------------------------------------------------------------------------
  // Ürün ve model tespiti
  // ---------------------------------------------------------------------------

  var MODEL_RE = /(^|[^A-Za-z0-9ÇĞİÖŞÜçğıöşü])([A-Za-zÇĞİÖŞÜçğıöşü]{1,5})([\s\-‐-―−_.]?)(\d{2,5})(?!\d)/g;

  // Model sanılmaması gereken kısaltma/kelimeler (katlanmış).
  var MODEL_DISI = [
    'kdv', 'tl', 'try', 'usd', 'eur', 'euro', 'iso', 'no', 'nr', 'tel', 'gsm', 'fax', 'faks', 'cep', 'kod',
    'vkn', 'tckn', 'tc', 'adet', 'ad', 'iban', 'tr', 'mah', 'sk', 'sok', 'cad', 'kat', 'daire', 'pk', 'm',
    'kg', 'gr', 'g', 'ml', 'mm', 'cm', 'km', 'kw', 'w', 'v', 'hz', 'mhz', 'rpm', 'yil', 'saat', 'gun', 'sn',
    'dk', 'blok', 'ocak', 'subat', 'mart', 'nisan', 'mayis', 'hazir', 'temmu', 'agust', 'eylul', 'ekim',
    'kasim', 'arali', 'hafta', 'ay', 'sayi', 'ref', 'fatur', 'tekli', 'tkl', 'x', 'lt', 'l', 'mt', 'ton',
    'bar', 'psi', 'pa', 'kpa', 'ip', 'yas', 'ile', 've', 'icin', 'den', 'dan', 'version', 'ver', 'rev',
    'sayfa', 'oda', 'no.', 'top', 'toplam', 'yuzde', 'mesaj', 'tarih', 'posta', 'cad.', 'sira'
  ];

  // ---------------------------------------------------------------------------
  // Adet ifadeleri
  // ---------------------------------------------------------------------------

  var SAYI_KELIME = {
    'on dokuz': 19, 'on sekiz': 18, 'on yedi': 17, 'on alti': 16, 'on bes': 15, 'on dort': 14,
    'on uc': 13, 'on iki': 12, 'on bir': 11, 'yirmi': 20, 'dokuz': 9, 'sekiz': 8, 'yedi': 7,
    'alti': 6, 'bes': 5, 'dort': 4, 'uc': 3, 'iki': 2, 'bir': 1, 'tek': 1, 'on': 10
  };
  var BIRIM = "(?:adet|ad\\.|tane|cihaz|pcs|pieces|piece|units|unit|unite|takim)";
  var SAYI_BIRIM_RE = new RegExp("(^|[^\\d.,])(\\d{1,4})\\s*(?:'\\s*)?(?:ser|sar|er|ar)?\\s*" + BIRIM, 'g');
  var KELIME_BIRIM_RE = new RegExp('(^|[^a-z])(' + Object.keys(SAYI_KELIME).join('|') + ')\\s+' + BIRIM, 'g');
  var ETIKET_ADET_RE = /(^|[^a-z])(adet|miktar)\s*(?:sayisi)?\s*[:=]\s*(\d{1,4})(?![\d.,])/g;
  var BELIRSIZ_MIKTAR_RE = /\b(birkac|bir kac|bir iki|birden fazla|kac adet|kac tane|bir miktar|toplu)\b/g;

  // ---------------------------------------------------------------------------
  // Talimat / kural dışı istek tespiti (yalnız uyarı üretir, hiçbir şey uygulanmaz)
  // ---------------------------------------------------------------------------

  var TALIMAT_DESENLERI = [
    /fiyat\w*(?:[^.\n]|\.(?=\d)){0,40}\b(yap|degistir|dusur|guncelle|olsun)\b/,
    /\bonays[iı]z\b/,
    /\bonay(lamadan|beklemeden|sizca)\b/,
    /\b(direkt|direk|dogrudan|hemen|otomatik(?:man)?)\s+(gonder|yolla|ilet)/,
    /\bignore\b[^.\n]{0,40}\b(instruction|rule|previous|above)/,
    /\b(previous|above|onceki)\s+(instructions|talimat)/,
    /\b(sistem|system)\s+(talimat|prompt|mesaj)/,
    /\bkurallar\w*\s+(yok say|unut|degistir|atla)/,
    /(iskonto|indirim)\w*[^.\n]{0,30}\b(uygula|yap|tanimla|ekle)\b/
  ];

  // ---------------------------------------------------------------------------
  // Ana fonksiyon
  // ---------------------------------------------------------------------------

  function ayristir(hamMetin, secenek) {
    secenek = secenek || {};
    var katalog = secenek.katalog || { urunler: [], sirket: null };
    var metin = normalize(hamMetin);
    var kat = katla(metin);
    var sonuc = {
      surum: SURUM,
      yontem: 'kurallı',
      metin: metin,
      urunler: [],
      adetIfadeleri: [],
      firma: null,
      yetkili: null,
      epostalar: [],
      telefonlar: [],
      uyarilar: [],
      bilgiler: [],
      vurgular: []
    };
    if (!metin.trim()) {
      sonuc.uyarilar.push({ kod: 'BOS', mesaj: 'Mesaj boş.' });
      return sonuc;
    }

    var tuketilen = []; // ürün dışı (url, e-posta, telefon)
    var anmalar = [];   // ürün anmaları {bas, son, metin, anahtar}

    // URL'ler
    hepsiniBul(URL_RE, metin, function (m) {
      tuketilen.push({ bas: m.index, son: m.index + m[0].length });
    });

    // E-postalar
    var kendiAlan = /@(degirmen\.com\.tr|degirmen\.tr)$/i;
    hepsiniBul(EPOSTA_RE, metin, function (m) {
      var span = { bas: m.index, son: m.index + m[0].length };
      tuketilen.push(span);
      var e = m[0].toLowerCase();
      if (kendiAlan.test(e)) {
        sonuc.bilgiler.push({ kod: 'KENDI_EPOSTA', mesaj: 'Şirketin kendi e-posta adresi (' + e + ') müşteri bilgisi olarak alınmadı.' });
        return;
      }
      if (sonuc.epostalar.map(function (x) { return x.deger; }).indexOf(e) === -1) {
        sonuc.epostalar.push({ deger: e, kaynak: m[0], bas: span.bas, son: span.son });
        sonuc.vurgular.push({ bas: span.bas, son: span.son, tur: 'iletisim' });
      }
    });

    // Bilinen ürünlerin kesin desenleri (telefon taramasından önce, rakamları çakışmasın)
    var urunAnmalari = [];
    (katalog.urunler || []).forEach(function (u) {
      ((u.eslesme && u.eslesme.desenler) || []).forEach(function (desen) {
        var re = new RegExp('(^|[^A-Za-z0-9])(' + desen + ')', 'gi');
        hepsiniBul(re, metin, function (m) {
          var bas = m.index + m[1].length;
          var span = { bas: bas, son: bas + m[2].length };
          if (herhangiCakisir(span, tuketilen) || herhangiCakisir(span, urunAnmalari)) return;
          span.urunId = u.id;
          span.metin = m[2];
          urunAnmalari.push(span);
        });
      });
    });

    // Telefonlar
    var kendiTel = kendiTelefonlari(katalog.sirket);
    var telMaske = maskele(metin, tuketilen.concat(urunAnmalari));
    hepsiniBul(TELEFON_RE, telMaske, function (m) {
      var bas = m.index + m[1].length;
      var ham = m[2];
      // Baştaki boşluk/ayraçları kırp
      var kirp = ham.match(/^[\s.\-]*/)[0].length;
      bas += kirp;
      ham = ham.slice(kirp);
      var span = { bas: bas, son: bas + ham.length };
      var ulusal = m[3] + m[4] + m[5] + m[6];
      tuketilen.push(span);
      if (kendiTel[ulusal]) {
        sonuc.bilgiler.push({ kod: 'KENDI_TELEFON', mesaj: 'Şirketin kendi numarası (' + telefonBicimle(m[3], m[4], m[5], m[6]) + ') müşteri bilgisi olarak alınmadı.' });
        return;
      }
      var bicimli = telefonBicimle(m[3], m[4], m[5], m[6]);
      if (sonuc.telefonlar.map(function (x) { return x.deger; }).indexOf(bicimli) === -1) {
        sonuc.telefonlar.push({ deger: bicimli, kaynak: metin.slice(span.bas, span.son), bas: span.bas, son: span.son });
        sonuc.vurgular.push({ bas: span.bas, son: span.son, tur: 'iletisim' });
      }
    });

    urunAnmalari.forEach(function (a) {
      anmalar.push({ bas: a.bas, son: a.son, metin: a.metin, anahtar: 'urun:' + a.urunId, tur: 'kesin', urunId: a.urunId });
    });

    // "450" gibi tek başına geçen model numarası: yalnız aday (kesin eşleşme yok)
    var eslesenUrunler = {};
    urunAnmalari.forEach(function (a) { eslesenUrunler[a.urunId] = true; });
    (katalog.urunler || []).forEach(function (u) {
      if (eslesenUrunler[u.id]) return;
      ((u.eslesme && u.eslesme.belirsiz) || []).forEach(function (ifade) {
        var re = new RegExp('(^|[^A-Za-z0-9.,])(' + ifade.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?![\\d.,]\\d|\\d)', 'g');
        hepsiniBul(re, metin, function (m) {
          var bas = m.index + m[1].length;
          var span = { bas: bas, son: bas + m[2].length };
          if (herhangiCakisir(span, tuketilen) || herhangiCakisir(span, anmalar)) return;
          var sonra = kat.slice(span.son, span.son + 8);
          // Fiyat veya ölçü birimiyse ürün adayı değildir.
          if (/^\s?(tl|try|lira|bin|usd|eur|\$|€|₺|kg|gr|g\b|ml|mm|cm|lt|l\b|°|derece|adet|tane)/.test(sonra)) return;
          if (/[₺$€]\s?$/.test(metin.slice(Math.max(0, span.bas - 2), span.bas))) return;
          anmalar.push({ bas: span.bas, son: span.son, metin: m[2], anahtar: 'belirsiz:' + u.id, tur: 'belirsiz', adayUrunId: u.id });
        });
      });
    });

    // Tanınmayan model numaraları (ör. HX-500, WSZ 300)
    hepsiniBul(MODEL_RE, metin, function (m) {
      var bas = m.index + m[1].length;
      var harf = m[2], ayrac = m[3], rakam = m[4];
      var span = { bas: bas, son: bas + harf.length + ayrac.length + rakam.length };
      if (herhangiCakisir(span, tuketilen) || herhangiCakisir(span, anmalar)) return;
      var harfK = katla(harf);
      if (MODEL_DISI.indexOf(harfK) !== -1) return;
      var buyukVar = /[A-ZÇĞİÖŞÜ]/.test(harf);
      var hepsiBuyuk = harf === harf.toLocaleUpperCase('tr-TR') && buyukVar;
      if (/\s/.test(ayrac)) {
        // Boşlukla ayrılmışsa yalnız büyük harfli kısa kodları kabul et (ör. "WSZ 300").
        if (!hepsiBuyuk || harf.length > 4) return;
      } else if (!buyukVar) {
        // Küçük harfli bitişik yazım (ör. "hx500"): kısa kod ve en az 3 rakam.
        if (harf.length > 4 || rakam.length < 3) return;
      }
      var anahtar = 'taninmayan:' + harfK + rakam;
      anmalar.push({ bas: span.bas, son: span.son, metin: metin.slice(span.bas, span.son), anahtar: anahtar, tur: 'taninmayan' });
    });

    // Model yazılmadan ürün türü anılmışsa (ör. "nem ölçer") aday göster.
    if (anmalar.length === 0) {
      (katalog.urunler || []).forEach(function (u) {
        ((u.eslesme && u.eslesme.anahtarKelimeler) || []).forEach(function (k) {
          var i = kat.indexOf(k);
          while (i !== -1) {
            var span = { bas: i, son: i + k.length };
            if (!herhangiCakisir(span, anmalar)) {
              anmalar.push({ bas: span.bas, son: span.son, metin: metin.slice(span.bas, span.son), anahtar: 'tur:' + u.id, tur: 'tur', adayUrunId: u.id });
            }
            i = kat.indexOf(k, i + k.length);
          }
        });
      });
    }

    anmalar.sort(function (a, b) { return a.bas - b.bas; });

    // Kalemleri grupla (aynı ürünün birden fazla anılması tek kalemdir)
    var kalemler = {};
    var sira = [];
    anmalar.forEach(function (a) {
      if (!kalemler[a.anahtar]) {
        kalemler[a.anahtar] = {
          anahtar: a.anahtar,
          tur: a.tur,
          urunId: a.urunId || null,
          adayUrunId: a.adayUrunId || null,
          ifade: a.metin,
          anmalar: [],
          adet: null,
          adetGuven: null,
          adetKaynak: null,
          adetAdaylari: [],
          notlar: []
        };
        sira.push(a.anahtar);
      }
      kalemler[a.anahtar].anmalar.push({ bas: a.bas, son: a.son, metin: a.metin });
      sonuc.vurgular.push({ bas: a.bas, son: a.son, tur: a.tur === 'kesin' ? 'urun' : 'aday' });
    });

    // -------------------------------------------------------------------------
    // Adetler — ürün/telefon/e-posta alanları örtülü metinde aranır, böylece
    // model numarasındaki "450" asla adet olarak okunmaz.
    // -------------------------------------------------------------------------
    var adetMaske = katla(maskele(metin, tuketilen.concat(anmalar)));
    var adetler = []; // {bas, son, deger, ifade, guven, kalemAnahtari?}

    hepsiniBul(SAYI_BIRIM_RE, adetMaske, function (m) {
      var bas = m.index + m[1].length;
      adetler.push({ bas: bas, son: m.index + m[0].length, deger: Number(m[2]), guven: 'yüksek' });
    });
    hepsiniBul(KELIME_BIRIM_RE, adetMaske, function (m) {
      var bas = m.index + m[1].length;
      var span = { bas: bas, son: m.index + m[0].length };
      if (herhangiCakisir(span, adetler)) return;
      adetler.push({ bas: span.bas, son: span.son, deger: SAYI_KELIME[m[2]], guven: (m[2] === 'bir' || m[2] === 'tek') ? 'orta' : 'yüksek' });
    });
    hepsiniBul(ETIKET_ADET_RE, adetMaske, function (m) {
      var bas = m.index + m[1].length;
      var span = { bas: bas, son: m.index + m[0].length };
      if (herhangiCakisir(span, adetler)) return;
      adetler.push({ bas: span.bas, son: span.son, deger: Number(m[3]), guven: 'yüksek' });
    });

    // Ürün anmasına bitişik çarpan/sayı: "PM450 x2", "2x PM450", "2 PM450"
    anmalar.forEach(function (a) {
      var sonra = adetMaske.slice(a.son, a.son + 8);
      var m1 = sonra.match(/^([ \t]{0,2})([x×*][ \t]?(\d{1,3}))(?![\d.,])/);
      if (m1) {
        var s1 = { bas: a.son + m1[1].length, son: a.son + m1[0].length };
        if (!herhangiCakisir(s1, adetler)) adetler.push({ bas: s1.bas, son: s1.son, deger: Number(m1[3]), guven: 'yüksek', kalemAnahtari: a.anahtar });
      }
      var once = adetMaske.slice(Math.max(0, a.bas - 8), a.bas);
      var ofset = a.bas - once.length;
      var m2 = once.match(/(^|[^\d.,:\/])((\d{1,3})[ \t]?[x×*])[ \t]{0,2}$/);
      if (m2) {
        var b2 = ofset + m2.index + m2[1].length;
        var s2 = { bas: b2, son: b2 + m2[2].length };
        if (!herhangiCakisir(s2, adetler)) adetler.push({ bas: s2.bas, son: s2.son, deger: Number(m2[3]), guven: 'yüksek', kalemAnahtari: a.anahtar });
        return;
      }
      var m3 = once.match(/(^|[^\d.,:\/'\-])(\d{1,3})[ \t]{1,2}$/);
      if (m3) {
        var b3 = ofset + m3.index + m3[1].length;
        var s3 = { bas: b3, son: b3 + m3[2].length };
        if (!herhangiCakisir(s3, adetler)) adetler.push({ bas: s3.bas, son: s3.son, deger: Number(m3[2]), guven: 'orta', kalemAnahtari: a.anahtar });
      }
    });

    adetler = adetler.filter(function (q) { return q.deger >= 1 && q.deger <= 9999; });
    adetler.forEach(function (q) { q.ifade = metin.slice(q.bas, q.son).trim(); });

    // Adetleri aynı satırdaki en yakın ürün anmasına bağla.
    // Ürüne bitişik Türkçe ek ("PM450'den 3 adet") anmanın parçası sayılır;
    // arada "ve", virgül vb. bağlaç varsa ya da başka bir ürün anması varsa bağ zayıflar/kesilir.
    function uzatilmisSon(a) {
      var s = a.son, n = 0;
      while (s < metin.length && n < 6 && /['’A-Za-zçğıöşüÇĞİÖŞÜ]/.test(metin[s])) { s++; n++; }
      return s;
    }
    var sahipsiz = [];
    adetler.forEach(function (q) {
      if (q.kalemAnahtari) return;
      var qSatir = satirNo(metin, q.bas);
      var enIyi = null, enIyiPuan = Infinity;
      anmalar.forEach(function (a) {
        if (satirNo(metin, a.bas) !== qSatir) return;
        var aSon = uzatilmisSon(a);
        var araBas, araSon;
        if (q.son <= a.bas) { araBas = q.son; araSon = a.bas; } else if (aSon <= q.bas) { araBas = aSon; araSon = q.bas; } else { araBas = araSon = 0; }
        var ara = { bas: araBas, son: araSon };
        // Arada başka bir ürün anması varsa bu adet o ürüne ait olamaz.
        var arayaGiren = anmalar.some(function (b) { return b !== a && b.bas >= ara.bas && b.son <= ara.son; });
        if (arayaGiren) return;
        var araMetin = katla(metin.slice(araBas, araSon));
        var puan = araSon - araBas + (/(\sve\s|,|;|\sile\s|\sayrica\s|\+)/.test(' ' + araMetin + ' ') ? 50 : 0);
        if (puan < enIyiPuan) { enIyiPuan = puan; enIyi = a; }
      });
      if (enIyi) q.kalemAnahtari = enIyi.anahtar; else sahipsiz.push(q);
    });

    adetler.forEach(function (q) {
      if (!q.kalemAnahtari) return;
      kalemler[q.kalemAnahtari].adetAdaylari.push({ deger: q.deger, ifade: q.ifade, guven: q.guven, bas: q.bas, son: q.son });
    });

    // Başka satırdaki sahipsiz adet: yalnız tek kalem varsa ve o kalemin adedi yoksa, düşük güvenle öner.
    if (sahipsiz.length) {
      var degerler = sahipsiz.map(function (q) { return q.deger; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
      var adetsizKalemler = sira.filter(function (k) { return kalemler[k].adetAdaylari.length === 0; });
      if (sira.length === 1 && adetsizKalemler.length === 1 && degerler.length === 1) {
        sahipsiz.forEach(function (q) {
          kalemler[sira[0]].adetAdaylari.push({ deger: q.deger, ifade: q.ifade, guven: 'düşük', bas: q.bas, son: q.son });
        });
        kalemler[sira[0]].notlar.push('Adet ürünle aynı satırda değil ("' + sahipsiz[0].ifade + '"); kontrol edin.');
      } else {
        sahipsiz.forEach(function (q) {
          sonuc.uyarilar.push({ kod: 'SAHIPSIZ_ADET', mesaj: '"' + q.ifade + '" ifadesi bir ürünle eşleştirilemedi; ilgili kaleme elle girin.', ifade: q.ifade });
        });
      }
    }

    sira.forEach(function (k) {
      var kalem = kalemler[k];
      var farkli = kalem.adetAdaylari.map(function (a) { return a.deger; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
      if (farkli.length === 1) {
        var ilk = kalem.adetAdaylari[0];
        kalem.adet = farkli[0];
        kalem.adetKaynak = ilk.ifade;
        var derece = { 'düşük': 0, 'orta': 1, 'yüksek': 2 };
        kalem.adetGuven = kalem.adetAdaylari.reduce(function (g, a) {
          return derece[a.guven] < derece[g] ? a.guven : g;
        }, 'yüksek');
      } else if (farkli.length > 1) {
        kalem.notlar.push('Çelişkili adet ifadeleri: ' + kalem.adetAdaylari.map(function (a) { return '"' + a.ifade + '"'; }).join(', ') + '. Adet seçilmedi.');
        sonuc.uyarilar.push({ kod: 'CELISKILI_ADET', mesaj: (kalem.ifade || 'Ürün') + ' için birden fazla farklı adet geçiyor; adet otomatik seçilmedi.' });
      }
      kalem.adetAdaylari.forEach(function (a) { sonuc.vurgular.push({ bas: a.bas, son: a.son, tur: 'adet' }); });
    });

    hepsiniBul(BELIRSIZ_MIKTAR_RE, kat, function (m) {
      sonuc.uyarilar.push({ kod: 'BELIRSIZ_MIKTAR', mesaj: 'Belirsiz miktar ifadesi: "' + metin.slice(m.index, m.index + m[0].length) + '". Adet otomatik belirlenmedi.' });
    });

    sonuc.urunler = sira.map(function (k) { return kalemler[k]; });
    sonuc.adetIfadeleri = adetler.map(function (q) { return { deger: q.deger, ifade: q.ifade, guven: q.guven }; });

    // Ürün uyarıları
    sonuc.urunler.forEach(function (k) {
      if (k.tur === 'kesin' && k.adet == null && k.adetAdaylari.length === 0) {
        sonuc.uyarilar.push({ kod: 'ADET_YOK', mesaj: (k.ifade) + ' için adet belirtilmemiş. Adet sizin seçiminize bırakıldı (1 varsayılmadı).' });
      }
      if (k.tur === 'belirsiz') {
        sonuc.uyarilar.push({ kod: 'BELIRSIZ_URUN', mesaj: '"' + k.ifade + '" tek başına geçiyor; kesin model eşleştirmesi yapılmadı. Kontrol edin.' });
      }
      if (k.tur === 'tur') {
        sonuc.uyarilar.push({ kod: 'MODEL_YOK', mesaj: 'Model belirtilmemiş ("' + k.ifade + '"). Ürün eşleştirmesi sizin onayınızı bekliyor.' });
      }
      if (k.tur === 'taninmayan') {
        sonuc.uyarilar.push({ kod: 'TANINMAYAN_URUN', mesaj: '"' + k.ifade + '" kayıtlı ürünlerde yok. Bu kalem atlanmadı; incelemeniz gerekiyor.' });
      }
    });
    var kalemSayisi = sonuc.urunler.length;
    if (kalemSayisi === 0) {
      sonuc.uyarilar.push({ kod: 'URUN_YOK', mesaj: 'Mesajda ürün veya model bulunamadı. Kalemi elle ekleyin.' });
    } else if (kalemSayisi > 1) {
      sonuc.uyarilar.push({ kod: 'COKLU_URUN', mesaj: 'Mesajda ' + kalemSayisi + ' ayrı ürün/kalem var. Hiçbiri sessizce atlanmadı; her birini inceleyin.' });
    }

    // -------------------------------------------------------------------------
    // Firma ve yetkili (yalnız açık işaret varsa; yoksa boş kalır)
    // -------------------------------------------------------------------------
    var satirlar = metin.split('\n');
    var UNVAN_EKI = /^(A\.?\s?Ş|AŞ|A\.S|LTD|Ltd|ŞTİ|Şti|STI|Sti|ŞTI|Koop|KOOP|Kooperatifi|KOOPERATİFİ|Limited|LİMİTED|LIMITED|Anonim|ANONİM|ANONIM|Şirketi|ŞİRKETİ|Sirketi)$/;
    var BAGLAC = /^(ve|&|-|San\.?|Tic\.?|İth\.?|Ith\.?|İhr\.?|Ihr\.?|Paz\.?|Ltd\.?)$/;

    function firmaDene(satir, satirIdx) {
      var k = katla(satir);
      var etiket = k.match(/^\s*(firma|sirket|kurum|isletme)\s*(adi|unvani)?\s*[:\-]\s*(.+)$/);
      if (etiket) {
        var bas = k.indexOf(etiket[3]);
        var deger = satir.slice(bas).trim().replace(/[,;]$/, '');
        if (deger) return { deger: deger, yontem: 'etiket', guven: 'yüksek', satir: satirIdx };
      }
      var sozcukler = satir.trim().split(/\s+/);
      // Sözcüğün başındaki/sonundaki parantez, tırnak ve noktalama atılarak unvan eki mi diye bakılır.
      var ekMi = function (w) { return UNVAN_EKI.test(w.replace(/^[("“'\[]+/, '').replace(/[)"”'\],;:!?.]+$/, '')); };
      var ekIdx = -1;
      for (var i = 0; i < sozcukler.length; i++) {
        if (ekMi(sozcukler[i])) { ekIdx = i; break; }
      }
      if (ekIdx <= 0) return null;
      var bas2 = ekIdx;
      for (var j = ekIdx - 1; j >= 0; j--) {
        var w = sozcukler[j];
        if (/^[A-ZÇĞİÖŞÜ0-9"“(]/.test(w) || BAGLAC.test(w)) bas2 = j; else break;
      }
      var son2 = ekIdx;
      while (son2 + 1 < sozcukler.length && (ekMi(sozcukler[son2 + 1]) || BAGLAC.test(sozcukler[son2 + 1]))) son2++;
      if (bas2 === ekIdx) return null; // yalnız ek, ad yok
      var ad = sozcukler.slice(bas2, son2 + 1).join(' ')
        .replace(/^[(\"“'\[]+/, '')
        .replace(/[)\"”'\],;:!?]+\.?$/, '')
        .replace(/[,;:]$/, '');
      while (/^(ve|&|-)$/i.test(ad.split(' ')[0])) ad = ad.split(' ').slice(1).join(' ');
      return { deger: ad, yontem: 'unvan eki', guven: 'orta', satir: satirIdx };
    }

    for (var si = 0; si < satirlar.length; si++) {
      var f = firmaDene(satirlar[si], si);
      if (f && !sirketKendisiMi(katla(f.deger), katalog.sirket)) {
        f.kaynak = satirlar[si].trim();
        sonuc.firma = f;
        break;
      } else if (f) {
        sonuc.bilgiler.push({ kod: 'KENDI_FIRMA', mesaj: 'Mesajdaki "' + f.deger + '" şirketin kendi unvanı; müşteri olarak alınmadı.' });
      }
    }

    var AD = "[A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:[-'][A-Za-zÇĞİÖŞÜçğıöşü]+)?";
    var DEPARTMAN = /^(satin ?alma|muhasebe|genel mudur|yonetim|iletisim|teklif|konu|merhaba|selam|iyi gunler|iyi calismalar|saygilarimla|tesekkurler|kolay gelsin|gunaydin|bilgi|kett|ornek)\b/;

    function yetkiliBul() {
      for (var i = 0; i < satirlar.length; i++) {
        var k = katla(satirlar[i]);
        var e = k.match(/^\s*(ad soyad|adi soyadi|ad-soyad|isim|yetkili|ilgili kisi|ilgili|gonderen|irtibat)\s*[:\-]\s*(.+)$/);
        if (e) {
          var deger = satirlar[i].slice(k.indexOf(e[2])).trim();
          if (deger) return { deger: deger, yontem: 'etiket', guven: 'yüksek', kaynak: satirlar[i].trim() };
        }
      }
      var tanit = new RegExp('(?:^|[\\s,.!])(?:[Bb]enim adım|[Aa]dım|[İi]smim|[Bb]en)\\s+(' + AD + '(?:\\s+' + AD + '){0,2})', 'g');
      var m = tanit.exec(metin);
      if (m) return { deger: m[1], yontem: 'tanıtma', guven: 'orta', kaynak: cumleCevresi(metin, m.index, m.index + m[0].length) };

      var hitap = new RegExp('(' + AD + '(?:\\s+' + AD + ')?)\\s+(Bey|Hanım|bey|hanım)(?![a-zçğıöşü])', 'g');
      var h;
      while ((h = hitap.exec(metin)) !== null) {
        var onceki = katla(metin.slice(Math.max(0, h.index - 25), h.index));
        if (/(merhaba|selam|sayin|degerli|iyi gunler|gunaydin|iyi calismalar)[\s,]*$/.test(onceki)) continue;
        var adK = katla(h[1]);
        if (/^(merhaba|selam|sayin|degerli)/.test(adK)) continue;
        return { deger: h[1] + ' ' + h[2].charAt(0).toLocaleUpperCase('tr-TR') + h[2].slice(1), yontem: 'hitap', guven: 'düşük', kaynak: cumleCevresi(metin, h.index, h.index + h[0].length) };
      }

      var imzaRe = new RegExp('^\\s*(' + AD + '(?:\\s+' + AD + '){1,3})\\s*$');
      for (var j = 0; j < satirlar.length; j++) {
        var kk = katla(satirlar[j]).trim();
        if (/^(saygilarimla|saygilar|iyi calismalar|tesekkurler|tesekkur ederim|kolay gelsin|selamlar|iyi gunler)[,.!]?$/.test(kk)) {
          for (var n = j + 1; n < satirlar.length; n++) {
            if (!satirlar[n].trim()) continue;
            var im = satirlar[n].match(imzaRe);
            if (im && !DEPARTMAN.test(katla(im[1])) && !firmaDene(satirlar[n], n)) {
              return { deger: im[1], yontem: 'imza', guven: 'orta', kaynak: satirlar[n].trim() };
            }
            break;
          }
        }
      }
      // Ürün anmasından sonra tek başına duran 2–3 kelimelik ad satırı (düşük güven)
      var ilkUrunSatiri = anmalar.length ? satirNo(metin, anmalar[0].bas) : 0;
      for (var p = ilkUrunSatiri + 1; p < satirlar.length; p++) {
        var sm = satirlar[p].match(new RegExp('^\\s*(' + AD + '(?:\\s+' + AD + '){1,2})\\s*$'));
        if (sm && !DEPARTMAN.test(katla(sm[1])) && !firmaDene(satirlar[p], p)) {
          return { deger: sm[1], yontem: 'ad satırı', guven: 'düşük', kaynak: satirlar[p].trim() };
        }
      }
      return null;
    }
    sonuc.yetkili = yetkiliBul();
    if (sonuc.yetkili && sonuc.firma && sonuc.yetkili.deger === sonuc.firma.deger) sonuc.yetkili = null;

    if (!sonuc.firma) sonuc.uyarilar.push({ kod: 'FIRMA_YOK', mesaj: 'Firma adı mesajda bulunamadı. Bilinmiyorsa müşteri adı veya başka bir alıcı tanımı kullanabilirsiniz.' });
    if (!sonuc.yetkili) sonuc.bilgiler.push({ kod: 'YETKILI_YOK', mesaj: 'Yetkili/kişi adı bulunamadı.' });
    if (!sonuc.epostalar.length) sonuc.bilgiler.push({ kod: 'EPOSTA_YOK', mesaj: 'E-posta bulunamadı.' });
    if (!sonuc.telefonlar.length) sonuc.bilgiler.push({ kod: 'TELEFON_YOK', mesaj: 'Telefon bulunamadı (WhatsApp numarası mesaj metninde yoksa elle girin).' });
    if (sonuc.epostalar.length > 1) sonuc.uyarilar.push({ kod: 'COKLU_EPOSTA', mesaj: 'Birden fazla e-posta var; doğru olanı seçin.' });
    if (sonuc.telefonlar.length > 1) sonuc.uyarilar.push({ kod: 'COKLU_TELEFON', mesaj: 'Birden fazla telefon var; doğru olanı seçin.' });

    // -------------------------------------------------------------------------
    // Kural dışı talimatlar, müşteri fiyat/iskonto istekleri (bilgi amaçlı; uygulanmaz)
    // -------------------------------------------------------------------------
    var talimatlar = [];
    TALIMAT_DESENLERI.forEach(function (re) {
      var m = re.exec(kat);
      if (m) {
        var cumle = cumleCevresi(metin, m.index, m.index + m[0].length);
        if (talimatlar.indexOf(cumle) === -1) talimatlar.push(cumle);
      }
    });
    talimatlar.forEach(function (c) {
      sonuc.uyarilar.push({ kod: 'TALIMAT', mesaj: 'Mesajda iş kurallarını değiştirmeye yönelik ifade var ve UYGULANMADI: "' + c + '". Fiyat, iskonto ve onay yalnız sizin seçiminizle belirlenir.' });
    });

    hepsiniBul(/(%\s?(\d{1,2}(?:[.,]\d)?))|((\d{1,2}(?:[.,]\d)?)\s?%)/g, metin, function (m) {
      var satir = katla(satirlar[satirNo(metin, m.index)] || '');
      if (/iskonto|indirim/.test(satir)) {
        sonuc.uyarilar.push({ kod: 'MUSTERI_ISKONTO', mesaj: 'Müşteri iskonto istiyor: "' + m[0] + '". Otomatik uygulanmadı; iskonto oranını siz seçersiniz.' });
      }
    });
    hepsiniBul(/(\d{1,3}(?:\.\d{3})+|\d+)(?:,\d{1,2})?\s?(TL|tl|Tl|₺|lira|Lira|TRY|USD|\$|EUR|€)/g, maskele(metin, tuketilen), function (m) {
      sonuc.uyarilar.push({ kod: 'MESAJDA_FIYAT', mesaj: 'Mesajda fiyat ifadesi var: "' + m[0] + '". Kayıtlı fiyat değiştirilmedi.' });
    });
    if (/\bstok|ne zaman|teslim|kac gunde/.test(kat)) {
      sonuc.bilgiler.push({ kod: 'STOK_SORUSU', mesaj: 'Müşteri stok veya teslim süresi soruyor.' });
    }

    sonuc.vurgular.sort(function (a, b) { return a.bas - b.bas || b.son - a.son; });
    return sonuc;
  }

  var AYRISTIRICI = { ayristir: ayristir, katla: katla, normalize: normalize, SURUM: SURUM };

  root.TA = root.TA || {};
  root.TA.ayristirici = AYRISTIRICI;
  if (typeof module === 'object' && module.exports) module.exports = AYRISTIRICI;
})(typeof window !== 'undefined' ? window : globalThis);
