/*
 * Teklif iş kuralları: içerik, hesap, engeller, durumlar ve revizyonlar.
 *
 * Durumlar: taslak → onay_bekliyor → onaylandi | reddedildi
 *  - Onay, kalıcı bir durum değişikliğidir; onaylı içeriğin özeti (hash) saklanır.
 *  - Onaylı revizyonun müşteriye görünen içeriği değişirse yeni revizyon (taslak) açılır
 *    ve yeniden onay gerekir. İç notlar müşteriye görünmediği için revizyon açtırmaz.
 *  - Onaylamak veya PDF indirmek "müşteriye gönderildi" demek değildir; bu ayrı ve elle tutulur.
 *
 * Fiyat, iskonto, stok ve koşullar yalnız kayıtlı ticari veriden veya kullanıcının
 * seçiminden gelir; ayrıştırıcı bu alanlara hiç dokunmaz.
 */
(function (root) {
  'use strict';

  var para = (root.TA && root.TA.para) || require('./money.js');

  var DURUM = { TASLAK: 'taslak', BEKLIYOR: 'onay_bekliyor', ONAYLI: 'onaylandi', RED: 'reddedildi' };
  var DURUM_ETIKET = { taslak: 'Taslak', onay_bekliyor: 'Onay bekliyor', onaylandi: 'Onaylandı', reddedildi: 'Reddedildi' };
  var KAYNAK_ETIKET = { whatsapp: 'WhatsApp', eposta: 'E-posta', telefon: 'Telefon notu' };
  var KDV_SECENEKLERI = [2000, 1000, 100, 0];
  var KOSUL_ETIKET = { odeme: 'Ödeme', teslim: 'Teslim', sevk: 'Sevk bedeli', garanti: 'Garanti', gecerlilik: 'Teklif geçerliliği' };

  // ---------------------------------------------------------------------------
  // Yardımcılar
  // ---------------------------------------------------------------------------

  function kimlik() {
    var c = root.crypto;
    var b = new Uint8Array(12);
    if (c && c.getRandomValues) c.getRandomValues(b);
    else for (var i = 0; i < b.length; i++) b[i] = Math.floor(Math.random() * 256);
    return Array.prototype.map.call(b, function (x) { return x.toString(16).padStart(2, '0'); }).join('');
  }

  function kopya(x) { return JSON.parse(JSON.stringify(x)); }

  function kararliMetin(x) {
    if (x === null || typeof x !== 'object') return JSON.stringify(x);
    if (Array.isArray(x)) return '[' + x.map(kararliMetin).join(',') + ']';
    return '{' + Object.keys(x).sort().map(function (k) {
      return x[k] === undefined ? '' : JSON.stringify(k) + ':' + kararliMetin(x[k]);
    }).filter(Boolean).join(',') + '}';
  }

  // cyrb53 — değişiklik tespiti için (güvenlik amaçlı değil).
  function ozet(x) {
    var str = kararliMetin(x);
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (var i = 0; i < str.length; i++) {
      var ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
  }

  function tarihParca(iso) {
    var d = new Date(iso);
    return { y: d.getFullYear(), m: d.getMonth() + 1, g: d.getDate(), s: d.getHours(), dk: d.getMinutes() };
  }
  function tarihTR(iso) {
    if (!iso) return '';
    var p = tarihParca(iso);
    return String(p.g).padStart(2, '0') + '.' + String(p.m).padStart(2, '0') + '.' + p.y;
  }
  function tarihSaatTR(iso) {
    if (!iso) return '';
    var p = tarihParca(iso);
    return tarihTR(iso) + ' ' + String(p.s).padStart(2, '0') + ':' + String(p.dk).padStart(2, '0');
  }
  // "2026-10-06" gibi gün kayıtlarını yerel gün olarak okur.
  function gunTR(gun) {
    if (!gun) return '';
    var p = String(gun).split('-');
    return p[2] + '.' + p[1] + '.' + p[0];
  }
  function gunFarki(gun, simdiIso) {
    var p = String(gun).split('-').map(Number);
    var a = new Date(p[0], p[1] - 1, p[2]);
    var s = new Date(simdiIso);
    var b = new Date(s.getFullYear(), s.getMonth(), s.getDate());
    return Math.round((b - a) / 86400000);
  }

  var EPOSTA_GECERLI = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // ---------------------------------------------------------------------------
  // Ürünler (katalog + kullanıcının ayarlardan eklediği kayıtlar)
  // ---------------------------------------------------------------------------

  function urunEtkin(katalog, ayarlar, id) {
    var u = (katalog.urunler || []).filter(function (x) { return x.id === id; })[0];
    if (!u) return null;
    u = kopya(u);
    var ek = (ayarlar && ayarlar.urunEk && ayarlar.urunEk[id]) || {};
    u.ticari.stokKayitlari = (u.ticari.stokKayitlari || []).concat(ek.stokKayitlari || []);
    if (ek.garanti) u.ticari.garantiVarsayilan = ek.garanti;
    return u;
  }

  function sonStokKaydi(u) {
    var k = (u && u.ticari.stokKayitlari) || [];
    return k.length ? k[k.length - 1] : null;
  }

  function urunOzeti(u) {
    return {
      id: u.id,
      marka: u.marka,
      model: u.model,
      ad: u.ad,
      aciklama: u.site.aciklama,
      gorsel: u.site.gorsel,
      katalogUrl: u.site.katalogUrl,
      urunSayfasi: u.site.urunSayfasi,
      teknik: u.site.teknik,
      siteAlinma: u.site.kaynak && u.site.kaynak.alinma,
      listeFiyatiKurus: u.ticari.listeFiyatiKurus,
      kdvDahil: u.ticari.kdvDahil,
      iskontoAraligi: u.ticari.iskontoAraligi
    };
  }

  // ---------------------------------------------------------------------------
  // İçerik
  // ---------------------------------------------------------------------------

  function kosulKarar(v) {
    // Ayarlardaki varsayılan: { secim: 'deger'|'yok', metin }
    if (v && (v.secim === 'deger' || v.secim === 'yok')) return { secim: v.secim, metin: v.metin || '', kaynak: 'ayar' };
    return { secim: null, metin: '' };
  }

  function bosIcerik(ayarlar) {
    var a = ayarlar || {};
    var v = a.varsayilan || {};
    return {
      alici: { firma: '', yetkili: '', tanim: '', eposta: '', telefon: '', adres: '', vergiDairesi: '', vergiNo: '' },
      satirlar: [],
      kosullar: {
        odeme: { secim: null, metin: '' },
        teslim: { secim: null, metin: '', teyitZamani: null },
        sevk: kosulKarar(v.sevk),
        garanti: { secim: null, metin: '' },
        gecerlilik: kosulKarar(v.gecerlilik)
      },
      kdvBp: (a.kdv && a.kdv.varsayilanBp != null) ? a.kdv.varsayilanBp : 2000,
      musteriNotu: '',
      teknikEkle: true
    };
  }

  // Bir ürün kalemi kesinleştiğinde, henüz karar verilmemiş koşulları kayıtlı ticari veriyle doldurur.
  function urunKosullariniUygula(icerik, u) {
    var k = icerik.kosullar;
    if (!k.odeme.secim && u.ticari.odeme) k.odeme = { secim: 'deger', metin: u.ticari.odeme, kaynak: 'kayıtlı ticari bilgi' };
    if (!k.garanti.secim && u.ticari.garantiVarsayilan) k.garanti = kosulKarar(u.ticari.garantiVarsayilan);
  }

  function yeniSatir(alanlar) {
    var s = {
      id: kimlik().slice(0, 10),
      durum: 'tamam',
      urunId: null,
      adayUrunId: null,
      urun: null,
      ham: '',
      adet: null,
      iskontoBp: null,
      haricNedeni: '',
      oncekiDurum: null,
      kaynak: null
    };
    Object.keys(alanlar || {}).forEach(function (k) { s[k] = alanlar[k]; });
    return s;
  }

  function icerikOlustur(ayristirma, ctx) {
    var icerik = bosIcerik(ctx.ayarlar);
    var p = ayristirma;
    if (p.firma) icerik.alici.firma = p.firma.deger;
    if (p.yetkili) icerik.alici.yetkili = p.yetkili.deger;
    // Birden fazla aday varsa seçim kullanıcıya bırakılır (tahmin yok).
    if (p.epostalar.length === 1) icerik.alici.eposta = p.epostalar[0].deger;
    if (p.telefonlar.length === 1) icerik.alici.telefon = p.telefonlar[0].deger;

    p.urunler.forEach(function (k) {
      var kaynak = { ifade: k.ifade || null, adetKaynak: k.adetKaynak || null, adetGuven: k.adetGuven || null, notlar: k.notlar.slice() };
      var adet = Number.isInteger(k.adet) && k.adet > 0 ? k.adet : null;
      if (k.tur === 'kesin') {
        var u = urunEtkin(ctx.katalog, ctx.ayarlar, k.urunId);
        icerik.satirlar.push(yeniSatir({ durum: 'tamam', urunId: u.id, urun: urunOzeti(u), ham: k.ifade, adet: adet, kaynak: kaynak }));
        urunKosullariniUygula(icerik, u);
      } else if (k.tur === 'belirsiz' || k.tur === 'tur') {
        icerik.satirlar.push(yeniSatir({ durum: 'belirsiz', adayUrunId: k.adayUrunId, ham: k.ifade, adet: adet, kaynak: kaynak }));
      } else {
        icerik.satirlar.push(yeniSatir({ durum: 'taninmayan', ham: k.ifade, adet: adet, kaynak: kaynak }));
      }
    });
    return icerik;
  }

  // İçerik üzerinde kullanılan küçük işlemler (UI bunları icerikGuncelle içinde çağırır)
  var islem = {
    satirEslestir: function (icerik, satirId, urunId, ctx) {
      var s = icerik.satirlar.filter(function (x) { return x.id === satirId; })[0];
      var u = urunEtkin(ctx.katalog, ctx.ayarlar, urunId);
      if (!s || !u) throw new Error('Kalem veya ürün bulunamadı');
      s.durum = 'tamam';
      s.urunId = u.id;
      s.urun = urunOzeti(u);
      s.adayUrunId = null;
      s.iskontoBp = null; // iskonto her zaman kullanıcı seçimi
      urunKosullariniUygula(icerik, u);
    },
    satirHaric: function (icerik, satirId, neden) {
      var s = icerik.satirlar.filter(function (x) { return x.id === satirId; })[0];
      if (!s || s.durum === 'haric') return;
      s.oncekiDurum = s.durum;
      s.durum = 'haric';
      s.haricNedeni = (neden || '').trim() || 'Teklif dışı bırakıldı';
    },
    satirGeriAl: function (icerik, satirId) {
      var s = icerik.satirlar.filter(function (x) { return x.id === satirId; })[0];
      if (!s || s.durum !== 'haric') return;
      s.durum = s.oncekiDurum || (s.urunId ? 'tamam' : 'taninmayan');
      s.oncekiDurum = null;
      s.haricNedeni = '';
    },
    satirEkle: function (icerik, urunId, ctx) {
      var u = urunEtkin(ctx.katalog, ctx.ayarlar, urunId);
      if (!u) throw new Error('Ürün bulunamadı');
      icerik.satirlar.push(yeniSatir({ durum: 'tamam', urunId: u.id, urun: urunOzeti(u), ham: '(elle eklendi)', kaynak: { ifade: null, adetKaynak: null, adetGuven: null, notlar: ['Elle eklendi'] } }));
      urunKosullariniUygula(icerik, u);
    },
    satirSil: function (icerik, satirId) {
      icerik.satirlar = icerik.satirlar.filter(function (x) { return x.id !== satirId; });
    }
  };

  // ---------------------------------------------------------------------------
  // Hesap
  // ---------------------------------------------------------------------------

  function aktifSatirlar(icerik) {
    return icerik.satirlar.filter(function (s) { return s.durum !== 'haric'; });
  }

  function adetGecerli(a) { return Number.isInteger(a) && a >= 1 && a <= 9999; }

  function hesapla(icerik) {
    var sonuclar = [];
    var tamam = true;
    var aktif = aktifSatirlar(icerik);
    aktif.forEach(function (s) {
      if (s.durum !== 'tamam' || !s.urun || s.urun.listeFiyatiKurus == null || !adetGecerli(s.adet) || s.iskontoBp == null) {
        tamam = false;
        sonuclar.push({ satir: s, hesap: null });
        return;
      }
      sonuclar.push({ satir: s, hesap: para.satirHesapla(s.urun.listeFiyatiKurus, s.adet, s.iskontoBp) });
    });
    var toplam = null;
    if (tamam && aktif.length > 0) {
      toplam = para.toplamHesapla(sonuclar.map(function (x) { return x.hesap; }), icerik.kdvBp);
    }
    return { satirlar: sonuclar, toplam: toplam };
  }

  // ---------------------------------------------------------------------------
  // Engeller (onayı durduran eksikler) ve uyarılar (durdurmayan)
  // ---------------------------------------------------------------------------

  function satirAdi(s, i) {
    var ad = s.urun ? (s.urun.marka + ' ' + s.urun.model) : ('"' + (s.ham || '?') + '"');
    return 'Kalem ' + (i + 1) + ' (' + ad + ')';
  }

  function engeller(icerik, ctx) {
    ctx = ctx || {};
    var e = [];
    var a = icerik.alici;
    if (!a.firma.trim() && !a.yetkili.trim() && !a.tanim.trim()) {
      e.push({ kod: 'ALICI', sekme: 'analiz', mesaj: 'Alıcı belirtilmedi: firma, kişi adı veya alıcı tanımından en az birini girin.' });
    }
    if (a.eposta.trim() && !EPOSTA_GECERLI.test(a.eposta.trim())) {
      e.push({ kod: 'EPOSTA', sekme: 'analiz', mesaj: 'E-posta adresi geçerli görünmüyor.' });
    }
    var aktif = aktifSatirlar(icerik);
    if (!aktif.length) e.push({ kod: 'KALEM_YOK', sekme: 'analiz', mesaj: 'Teklifte ürün kalemi yok.' });
    icerik.satirlar.forEach(function (s, i) {
      if (s.durum === 'haric') return;
      var ad = satirAdi(s, i);
      if (s.durum === 'belirsiz') {
        e.push({ kod: 'KALEM_BELIRSIZ', sekme: 'analiz', satirId: s.id, mesaj: ad + ': ürün eşleşmesi belirsiz. Ürünü onaylayın veya teklif dışı bırakın.' });
        return;
      }
      if (s.durum === 'taninmayan') {
        e.push({ kod: 'KALEM_TANINMAYAN', sekme: 'analiz', satirId: s.id, mesaj: ad + ': tanınmayan ürün. Kayıtlı bir ürünle eşleştirin veya teklif dışı bırakın.' });
        return;
      }
      if (!adetGecerli(s.adet)) e.push({ kod: 'ADET', sekme: 'analiz', satirId: s.id, mesaj: ad + ': adet seçilmedi.' });
      if (s.urun.listeFiyatiKurus == null) e.push({ kod: 'FIYAT', sekme: 'teklif', satirId: s.id, mesaj: ad + ': kayıtlı fiyat yok.' });
      if (s.iskontoBp == null) {
        e.push({ kod: 'ISKONTO', sekme: 'teklif', satirId: s.id, mesaj: ad + ': iskonto seçilmedi.' });
      } else {
        var ar = s.urun.iskontoAraligi;
        if (ar && (s.iskontoBp < ar.min * 100 || s.iskontoBp > ar.max * 100)) {
          e.push({ kod: 'ISKONTO_ARALIK', sekme: 'teklif', satirId: s.id, mesaj: ad + ': iskonto onaylı aralığın (%' + ar.min + '–%' + ar.max + ') dışında.' });
        }
      }
    });
    var k = icerik.kosullar;
    if (!k.odeme.secim || !k.odeme.metin.trim()) e.push({ kod: 'ODEME', sekme: 'teklif', mesaj: 'Ödeme koşulu belirlenmedi.' });
    if (!k.teslim.secim) e.push({ kod: 'TESLIM', sekme: 'teklif', mesaj: 'Stok/teslim durumu teyit edilmedi. Güncel stoğu kontrol edip teslim seçeneğini işaretleyin.' });
    else if (!k.teslim.metin.trim()) e.push({ kod: 'TESLIM', sekme: 'teklif', mesaj: 'Teslim metni boş.' });
    ['sevk', 'garanti', 'gecerlilik'].forEach(function (ad) {
      var v = k[ad];
      if (!v.secim) e.push({ kod: ad.toUpperCase(), sekme: 'teklif', mesaj: KOSUL_ETIKET[ad] + ' için karar verilmedi: metni girin ya da "Teklifte yer almasın" seçin.' });
      else if (v.secim === 'deger' && !v.metin.trim()) e.push({ kod: ad.toUpperCase(), sekme: 'teklif', mesaj: KOSUL_ETIKET[ad] + ' metni boş.' });
    });
    if (KDV_SECENEKLERI.indexOf(icerik.kdvBp) === -1) e.push({ kod: 'KDV', sekme: 'teklif', mesaj: 'KDV oranı geçersiz.' });
    if (ctx.asama === 'onay') {
      var kdv = (ctx.ayarlar && ctx.ayarlar.kdv) || {};
      if (kdv.teyitliBp !== icerik.kdvBp) {
        e.push({ kod: 'KDV_TEYIT', sekme: 'onay', mesaj: 'KDV oranı (' + para.oranBicimle(icerik.kdvBp) + ') henüz teyit edilmedi. Onaylamadan önce teyit kutusunu işaretleyin.' });
      }
    }
    return e;
  }

  function uyarilar(teklif, ctx) {
    ctx = ctx || {};
    var simdi = ctx.simdi || new Date().toISOString();
    var rev = aktifRev(teklif);
    var ic = rev.icerik;
    var u = [];
    if (teklif.test) u.push({ kod: 'TEST', mesaj: 'Bu bir TEST kaydıdır; PDF\'lere "TEST VERİSİ" filigranı basılır.' });
    if (!ic.alici.eposta.trim() && !ic.alici.telefon.trim()) u.push({ kod: 'ILETISIM', mesaj: 'Alıcı için e-posta veya telefon yok. Teklifi nasıl ileteceğinizi kontrol edin.' });
    if (ic.kosullar.teslim.secim && ic.kosullar.teslim.teyitZamani) {
      var saat = (new Date(simdi) - new Date(ic.kosullar.teslim.teyitZamani)) / 3600000;
      if (saat > 48 && rev.durum !== DURUM.ONAYLI) u.push({ kod: 'TESLIM_ESKI', mesaj: 'Stok/teslim teyidi ' + tarihSaatTR(ic.kosullar.teslim.teyitZamani) + ' tarihinde yapıldı. Hâlâ geçerli mi?' });
    }
    if (ctx.katalog) {
      aktifSatirlar(ic).forEach(function (s) {
        if (!s.urun) return;
        var g = urunEtkin(ctx.katalog, ctx.ayarlar, s.urunId);
        if (g && g.ticari.listeFiyatiKurus !== s.urun.listeFiyatiKurus) {
          u.push({ kod: 'FIYAT_DEGISTI', mesaj: s.urun.model + ' için kayıtlı liste fiyatı değişmiş (teklifte ' + para.bicimle(s.urun.listeFiyatiKurus) + ', güncel ' + para.bicimle(g.ticari.listeFiyatiKurus) + ').' });
        }
      });
    }
    if (ctx.tumTeklifler) {
      var tel = ic.alici.telefon.replace(/\D/g, '').slice(-10);
      var ep = ic.alici.eposta.trim().toLowerCase();
      ctx.tumTeklifler.forEach(function (d) {
        if (d.id === teklif.id) return;
        var di = aktifRev(d).icerik.alici;
        var ayni = (tel.length === 10 && di.telefon.replace(/\D/g, '').slice(-10) === tel) || (ep && di.eposta.trim().toLowerCase() === ep);
        var gun = Math.abs(new Date(d.olusturma) - new Date(teklif.olusturma)) / 86400000;
        if (ayni && gun <= 7) u.push({ kod: 'BENZER', mesaj: 'Aynı iletişim bilgisiyle başka bir talep var: ' + d.no + '. Talepler birleştirilmedi; ayrı teklif olarak duruyor.' });
      });
    }
    return u;
  }

  // ---------------------------------------------------------------------------
  // Teklif kaydı, numara, durum geçişleri
  // ---------------------------------------------------------------------------

  function teklifNo(ayarlar, simdiIso, mevcutNolar) {
    var p = tarihParca(simdiIso);
    var onek = 'TKL-' + String(p.y).slice(2) + String(p.m).padStart(2, '0') + String(p.g).padStart(2, '0') + '-' + (ayarlar.cihazKodu || 'A');
    var enBuyuk = 0;
    (mevcutNolar || []).forEach(function (no) {
      if (no.indexOf(onek) === 0) {
        var n = parseInt(no.slice(onek.length), 10);
        if (n > enBuyuk) enBuyuk = n;
      }
    });
    return onek + String(enBuyuk + 1).padStart(2, '0');
  }

  function ayristirmaKaydi(p) {
    return {
      surum: p.surum,
      yontem: p.yontem,
      urunler: p.urunler.map(function (k) {
        return { tur: k.tur, urunId: k.urunId, adayUrunId: k.adayUrunId, ifade: k.ifade, adet: k.adet, adetKaynak: k.adetKaynak, adetGuven: k.adetGuven, notlar: k.notlar };
      }),
      firma: p.firma,
      yetkili: p.yetkili,
      epostalar: p.epostalar.map(function (x) { return x.deger; }),
      telefonlar: p.telefonlar.map(function (x) { return x.deger; }),
      uyarilar: p.uyarilar,
      bilgiler: p.bilgiler,
      vurgular: p.vurgular
    };
  }

  function teklifOlustur(g) {
    var simdi = g.simdi || new Date().toISOString();
    var icerik = icerikOlustur(g.ayristirma, { katalog: g.katalog, ayarlar: g.ayarlar });
    return {
      id: kimlik(),
      no: teklifNo(g.ayarlar, simdi, g.mevcutNolar),
      olusturma: simdi,
      guncelleme: simdi,
      test: !!g.test,
      talep: {
        kaynak: KAYNAK_ETIKET[g.kaynak] ? g.kaynak : 'whatsapp',
        metin: g.ayristirma.metin,
        ayristirma: ayristirmaKaydi(g.ayristirma),
        zaman: simdi
      },
      icNotlar: '',
      revizyonlar: [{ rev: 0, durum: DURUM.TASLAK, icerik: icerik, olusturma: simdi }],
      gecmis: [{ zaman: simdi, olay: 'Talepten oluşturuldu (' + KAYNAK_ETIKET[g.kaynak] + ', ' + g.ayristirma.yontem + ' ayrıştırma)', rev: 0 }],
      pdfKayitlari: [],
      gonderimKayitlari: []
    };
  }

  function aktifRev(t) { return t.revizyonlar[t.revizyonlar.length - 1]; }
  function durum(t) { return aktifRev(t).durum; }
  function sonOnayliRev(t) {
    for (var i = t.revizyonlar.length - 1; i >= 0; i--) if (t.revizyonlar[i].durum === DURUM.ONAYLI) return t.revizyonlar[i];
    return null;
  }

  function olay(t, simdi, metin, rev) {
    t.gecmis.push({ zaman: simdi, olay: metin, rev: rev });
    t.guncelleme = simdi;
  }

  function hata(mesaj, kod) { var e = new Error(mesaj); e.kod = kod; return e; }

  /*
   * Müşteriye görünen içeriği değiştirir.
   *  - taslak: yerinde güncellenir
   *  - onaylandi: değişiklik varsa yeni revizyon (taslak) açılır; onaylı revizyon aynen kalır
   *  - onay_bekliyor / reddedildi: değiştirilemez (önce taslağa alınmalı)
   */
  function icerikGuncelle(t, degistir, simdi) {
    simdi = simdi || new Date().toISOString();
    var rev = aktifRev(t);
    if (rev.durum === DURUM.BEKLIYOR) throw hata('Onay bekleyen teklif değiştirilemez. Önce "Düzenle" ile taslağa alın.', 'KILITLI');
    if (rev.durum === DURUM.RED) throw hata('Reddedilmiş teklif değiştirilemez. Önce "Yeniden aç" kullanın.', 'KILITLI');
    var yeni = kopya(rev.icerik);
    degistir(yeni);
    if (kararliMetin(yeni) === kararliMetin(rev.icerik)) return { degisti: false, yeniRevizyon: false };
    if (rev.durum === DURUM.ONAYLI) {
      var r = { rev: rev.rev + 1, durum: DURUM.TASLAK, icerik: yeni, olusturma: simdi, oncekiRev: rev.rev };
      rev.yerineGelen = r.rev;
      t.revizyonlar.push(r);
      olay(t, simdi, 'Onaylı Rev. ' + rev.rev + ' değiştirildi → Rev. ' + r.rev + ' taslak olarak açıldı; yeniden onay gerekir', r.rev);
      return { degisti: true, yeniRevizyon: true };
    }
    rev.icerik = yeni;
    t.guncelleme = simdi;
    return { degisti: true, yeniRevizyon: false };
  }

  function onayaGonder(t, ctx, simdi) {
    simdi = simdi || new Date().toISOString();
    var rev = aktifRev(t);
    if (rev.durum !== DURUM.TASLAK) throw hata('Yalnız taslak onaya gönderilebilir.', 'DURUM');
    var e = engeller(rev.icerik, { ayarlar: ctx.ayarlar, asama: 'gonder' });
    if (e.length) throw hata('Eksikler giderilmeden onaya gönderilemez: ' + e.map(function (x) { return x.mesaj; }).join(' '), 'ENGEL');
    rev.durum = DURUM.BEKLIYOR;
    rev.onayaGonderim = simdi;
    olay(t, simdi, 'Onaya gönderildi', rev.rev);
  }

  function taslagaAl(t, simdi) {
    simdi = simdi || new Date().toISOString();
    var rev = aktifRev(t);
    if (rev.durum !== DURUM.BEKLIYOR) throw hata('Yalnız onay bekleyen teklif taslağa alınabilir.', 'DURUM');
    rev.durum = DURUM.TASLAK;
    rev.onayaGonderim = null;
    olay(t, simdi, 'Düzenleme için taslağa alındı', rev.rev);
  }

  /*
   * Onay. secenek.kdvTeyit: kullanıcı KDV oranını bu adımda teyit ettiyse true.
   * Ayarlar nesnesi (KDV teyidi) yerinde güncellenir.
   */
  function onayla(t, secenek, ctx, simdi) {
    simdi = simdi || new Date().toISOString();
    var rev = aktifRev(t);
    if (rev.durum !== DURUM.BEKLIYOR) throw hata('Onay için teklifin "Onay bekliyor" durumunda olması gerekir.', 'DURUM');
    var ayarlar = ctx.ayarlar;
    if (secenek && secenek.kdvTeyit && ayarlar.kdv.teyitliBp !== rev.icerik.kdvBp) {
      ayarlar.kdv.teyitliBp = rev.icerik.kdvBp;
      ayarlar.kdv.teyitZamani = simdi;
    }
    var e = engeller(rev.icerik, { ayarlar: ayarlar, asama: 'onay' });
    if (e.length) throw hata('Onaylanamaz: ' + e.map(function (x) { return x.mesaj; }).join(' '), 'ENGEL');
    rev.durum = DURUM.ONAYLI;
    rev.onayZamani = simdi;
    rev.onayOzeti = ozet(rev.icerik);
    olay(t, simdi, 'Onaylandı (Rev. ' + rev.rev + ', KDV ' + para.oranBicimle(rev.icerik.kdvBp) + ')', rev.rev);
  }

  function reddet(t, neden, simdi) {
    simdi = simdi || new Date().toISOString();
    var rev = aktifRev(t);
    if (rev.durum !== DURUM.TASLAK && rev.durum !== DURUM.BEKLIYOR) throw hata('Yalnız taslak veya onay bekleyen teklif reddedilebilir.', 'DURUM');
    rev.durum = DURUM.RED;
    rev.redZamani = simdi;
    rev.redNedeni = (neden || '').trim();
    olay(t, simdi, 'Reddedildi' + (rev.redNedeni ? ': ' + rev.redNedeni : ''), rev.rev);
  }

  function yenidenAc(t, simdi) {
    simdi = simdi || new Date().toISOString();
    var rev = aktifRev(t);
    if (rev.durum !== DURUM.RED) throw hata('Yalnız reddedilen teklif yeniden açılabilir.', 'DURUM');
    rev.durum = DURUM.TASLAK;
    olay(t, simdi, 'Yeniden açıldı (taslak)', rev.rev);
  }

  // Onaydan sonra açılmış ama henüz onaya gönderilmemiş revizyonu siler; önceki onaylı revizyon geçerli kalır.
  function revizyonuGeriAl(t, simdi) {
    simdi = simdi || new Date().toISOString();
    var rev = aktifRev(t);
    var onceki = t.revizyonlar[t.revizyonlar.length - 2];
    if (rev.durum !== DURUM.TASLAK || !onceki || onceki.durum !== DURUM.ONAYLI) throw hata('Geri alınacak taslak revizyon yok.', 'DURUM');
    t.revizyonlar.pop();
    onceki.yerineGelen = null;
    olay(t, simdi, 'Rev. ' + rev.rev + ' taslağı silindi; onaylı Rev. ' + onceki.rev + ' geçerli', onceki.rev);
  }

  function butunlukTamam(rev) {
    return rev.durum === DURUM.ONAYLI && !!rev.onayOzeti && ozet(rev.icerik) === rev.onayOzeti;
  }

  function nihaiPdfIzni(t, revNo) {
    var rev = t.revizyonlar.filter(function (r) { return r.rev === revNo; })[0];
    if (!rev) return { izin: false, neden: 'Revizyon bulunamadı.' };
    if (rev.durum !== DURUM.ONAYLI) return { izin: false, neden: 'Nihai PDF yalnız onaylı revizyon için oluşturulur.' };
    if (!butunlukTamam(rev)) return { izin: false, neden: 'Onaylı içerik onaydan sonra değişmiş görünüyor (bütünlük kontrolü başarısız). Yeniden onay gerekir.' };
    return { izin: true, rev: rev };
  }

  function aliciEtiketi(alici) {
    return (alici.firma || '').trim() || (alici.yetkili || '').trim() || (alici.tanim || '').trim() || '';
  }

  function aramaMetni(t) {
    var katla = (root.TA && root.TA.ayristirici && root.TA.ayristirici.katla) || function (s) { return s.toLowerCase(); };
    var rev = aktifRev(t);
    var ic = rev.icerik;
    var parcalar = [t.no, DURUM_ETIKET[rev.durum], ic.alici.firma, ic.alici.yetkili, ic.alici.tanim, ic.alici.eposta, ic.alici.telefon,
      ic.alici.telefon.replace(/\D/g, ''), tarihTR(t.olusturma), t.olusturma.slice(0, 10), t.test ? 'test' : ''];
    ic.satirlar.forEach(function (s) {
      if (s.urun) parcalar.push(s.urun.marka, s.urun.model, s.urun.model.replace(/\W/g, ''), s.urun.ad);
      if (s.ham) parcalar.push(s.ham);
    });
    var h = hesapla(ic);
    if (h.toplam) {
      [h.toplam.genelToplam, h.toplam.net].forEach(function (k) {
        parcalar.push(para.bicimle(k), para.bicimle(k, false), String(k / 100n), para.bicimle(k, false).split(',')[0]);
      });
    }
    return katla(parcalar.filter(Boolean).join(' | '));
  }

  var TEKLIF = {
    DURUM: DURUM,
    DURUM_ETIKET: DURUM_ETIKET,
    KAYNAK_ETIKET: KAYNAK_ETIKET,
    KDV_SECENEKLERI: KDV_SECENEKLERI,
    KOSUL_ETIKET: KOSUL_ETIKET,
    kimlik: kimlik,
    kopya: kopya,
    ozet: ozet,
    kararliMetin: kararliMetin,
    tarihTR: tarihTR,
    tarihSaatTR: tarihSaatTR,
    gunTR: gunTR,
    gunFarki: gunFarki,
    urunEtkin: urunEtkin,
    sonStokKaydi: sonStokKaydi,
    bosIcerik: bosIcerik,
    icerikOlustur: icerikOlustur,
    islem: islem,
    aktifSatirlar: aktifSatirlar,
    adetGecerli: adetGecerli,
    hesapla: hesapla,
    engeller: engeller,
    uyarilar: uyarilar,
    teklifNo: teklifNo,
    teklifOlustur: teklifOlustur,
    aktifRev: aktifRev,
    durum: durum,
    sonOnayliRev: sonOnayliRev,
    icerikGuncelle: icerikGuncelle,
    onayaGonder: onayaGonder,
    taslagaAl: taslagaAl,
    onayla: onayla,
    reddet: reddet,
    yenidenAc: yenidenAc,
    revizyonuGeriAl: revizyonuGeriAl,
    butunlukTamam: butunlukTamam,
    nihaiPdfIzni: nihaiPdfIzni,
    aliciEtiketi: aliciEtiketi,
    aramaMetni: aramaMetni
  };

  root.TA = root.TA || {};
  root.TA.teklif = TEKLIF;
  if (typeof module === 'object' && module.exports) module.exports = TEKLIF;
})(typeof window !== 'undefined' ? window : globalThis);
