/*
 * Teklif Asistanı — arayüz.
 *
 * Güvenlik: kullanıcı/müşteri metni DOM'a yalnız textContent ile yazılır (innerHTML yok).
 * Sayfa CSP ile satır içi betikleri de engeller.
 */
(function () {
  'use strict';

  var TA = window.TA;
  var P = TA.para, AY = TA.ayristirici, T = TA.teklif, D = TA.depo, PDF = TA.pdf, K = TA.katalog, AS = TA.assets || {}, ORN = TA.ornekler || [];

  // ---------------------------------------------------------------------------
  // DOM yardımcıları
  // ---------------------------------------------------------------------------

  function el(etiket, oz, cocuk) {
    var e = document.createElement(etiket);
    if (oz) Object.keys(oz).forEach(function (k) {
      var v = oz[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k.indexOf('on') === 0) e.addEventListener(k.slice(2), v);
      else if (k === 'value') e.value = v;
      else if (k === 'checked') e.checked = !!v;
      else if (k === 'disabled') e.disabled = !!v;
      else if (k === 'selected') e.selected = !!v;
      else e.setAttribute(k, v === true ? '' : String(v));
    });
    ekle(e, cocuk);
    return e;
  }
  function ekle(e, c) {
    if (c === null || c === undefined || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { ekle(e, x); }); return; }
    e.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  }
  function bosalt(e) { while (e.firstChild) e.removeChild(e.firstChild); }

  var sayac = 0;
  function yeniId(on) { sayac++; return (on || 'a') + '-' + sayac; }

  // ---------------------------------------------------------------------------
  // Durum
  // ---------------------------------------------------------------------------

  var yukleme = D.yukle();
  var veri = yukleme.veri;
  var arayuz = {
    duzenlemeModu: {},
    arama: '',
    filtre: 'hepsi',
    yeni: { kaynak: 'whatsapp', metin: '', test: false },
    bildirim: null,
    iceAktarMod: 'birlestir',
    kdvTeyitKutusu: false,
    redNedeni: ''
  };
  var turevler = [];

  function simdi() { return new Date().toISOString(); }
  function ctx() { return { katalog: K, ayarlar: veri.ayarlar }; }

  var kayitZamanlayici = null;
  function kaydetHemen() {
    clearTimeout(kayitZamanlayici);
    kayitZamanlayici = null;
    try { D.kaydet(veri); } catch (e) { bildir(e.message, 'hata'); }
  }
  function kaydetGecikmeli() {
    clearTimeout(kayitZamanlayici);
    kayitZamanlayici = setTimeout(kaydetHemen, 250);
  }
  window.addEventListener('pagehide', function () { if (kayitZamanlayici) kaydetHemen(); });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden' && kayitZamanlayici) kaydetHemen(); });

  function bildir(mesaj, tur) {
    arayuz.bildirim = { mesaj: mesaj, tur: tur || 'bilgi', zaman: Date.now() };
    bildirimCiz();
  }
  function bildirimCiz() {
    var kutu = document.getElementById('bildirim');
    if (!kutu) return;
    bosalt(kutu);
    var b = arayuz.bildirim;
    if (!b) return;
    kutu.appendChild(el('div', { class: 'bildirim bildirim-' + b.tur, role: b.tur === 'hata' ? 'alert' : 'status' }, [
      el('span', { text: b.mesaj }),
      el('button', { type: 'button', class: 'kapat', 'aria-label': 'Bildirimi kapat', onclick: function () { arayuz.bildirim = null; bildirimCiz(); } }, '×')
    ]));
  }

  function teklifBul(id) { return veri.teklifler.filter(function (t) { return t.id === id; })[0] || null; }

  // ---------------------------------------------------------------------------
  // Yönlendirme
  // ---------------------------------------------------------------------------

  function rota() {
    var p = location.hash.replace(/^#\/?/, '').split('/');
    return { sayfa: p[0] || '', id: p[1] ? decodeURIComponent(p[1]) : null, sekme: p[2] || 'analiz' };
  }
  function git(h) { if (location.hash === h) ciz(); else location.hash = h; }
  window.addEventListener('hashchange', function () {
    // Eski bildirim başka ekranda kalmasın (az önce oluşturulan, yönlendirmeyle birlikte gelen kalır).
    if (arayuz.bildirim && Date.now() - arayuz.bildirim.zaman > 1500) arayuz.bildirim = null;
    window.scrollTo(0, 0);
    ciz();
  });

  // ---------------------------------------------------------------------------
  // Genel çizim
  // ---------------------------------------------------------------------------

  function ciz() {
    var aktif = document.activeElement;
    var odakId = aktif && aktif.id ? aktif.id : null;
    var secim = null;
    try { if (odakId && aktif.selectionStart != null) secim = [aktif.selectionStart, aktif.selectionEnd]; } catch (e) { secim = null; }
    sayac = 0;
    turevler = [];
    var r = rota();
    if (!r.sayfa) r.sayfa = veri.teklifler.length ? 'liste' : 'yeni';
    var kok = document.getElementById('sayfa');
    bosalt(kok);
    menuCiz(r.sayfa);
    var icerik;
    if (r.sayfa === 'yeni') icerik = sayfaYeni();
    else if (r.sayfa === 'teklif') icerik = sayfaTeklif(r.id, r.sekme);
    else if (r.sayfa === 'ayarlar') icerik = sayfaAyarlar();
    else icerik = sayfaListe();
    kok.appendChild(icerik);
    turevGuncelle();
    bildirimCiz();
    if (odakId) {
      var yeni = document.getElementById(odakId);
      if (yeni) {
        yeni.focus({ preventScroll: true });
        try { if (secim && yeni.setSelectionRange) yeni.setSelectionRange(secim[0], secim[1]); } catch (e) { /* bazı alanlar seçim desteklemez */ }
      }
    }
  }

  function turev(fn, etiket, oz) {
    var e = el(etiket || 'div', oz || {});
    turevler.push({ el: e, fn: fn });
    return e;
  }
  function turevGuncelle() {
    turevler.forEach(function (x) { bosalt(x.el); ekle(x.el, x.fn()); });
  }

  function menuCiz(sayfa) {
    var sayi = veri.teklifler.length;
    [['ust-menu', 'menu-ust'], ['alt-menu', 'menu-alt']].forEach(function (m) {
      var nav = document.getElementById(m[0]);
      if (!nav) return;
      bosalt(nav);
      [['yeni', '#/yeni', '+ Yeni talep'], ['liste', '#/liste', 'Teklifler (' + sayi + ')'], ['ayarlar', '#/ayarlar', 'Ayarlar']].forEach(function (x) {
        var aktif = sayfa === x[0] || (x[0] === 'liste' && sayfa === 'teklif');
        nav.appendChild(el('a', { href: x[1], class: aktif ? 'aktif' : null, 'aria-current': aktif ? 'page' : null }, x[2]));
      });
    });
  }

  function rozet(durum) {
    return el('span', { class: 'rozet rozet-' + durum }, T.DURUM_ETIKET[durum]);
  }

  function kucuk(metin, sinif) { return el('p', { class: 'kucuk ' + (sinif || '') }, metin); }

  function uyariKutusu(liste, tur, baslik) {
    if (!liste || !liste.length) return null;
    return el('div', { class: 'kutu kutu-' + tur }, [
      baslik ? el('strong', { text: baslik }) : null,
      el('ul', null, liste.map(function (u) { return el('li', { text: typeof u === 'string' ? u : u.mesaj }); }))
    ]);
  }

  function radyoGrubu(ad, secenekler, secili, degisti, ozellik) {
    ozellik = ozellik || {};
    return el('div', { class: 'radyo-grup', role: 'radiogroup', 'aria-label': ozellik.etiket || ad }, secenekler.map(function (s) {
      var id = yeniId(ad);
      return el('label', { class: 'radyo' + (s.deger === secili ? ' secili' : ''), for: id }, [
        el('input', { type: 'radio', name: ad, id: id, value: s.deger == null ? '' : s.deger, checked: s.deger === secili, disabled: ozellik.kilitli || s.kilitli,
          onchange: function () { degisti(s.deger); } }),
        el('span', null, [el('span', { class: 'radyo-baslik', text: s.etiket }), s.aciklama ? el('span', { class: 'radyo-aciklama', text: s.aciklama }) : null])
      ]);
    }));
  }

  // ---------------------------------------------------------------------------
  // 1) Talep girişi
  // ---------------------------------------------------------------------------

  var KAYNAK_YARDIM = {
    whatsapp: { etiket: 'WhatsApp mesajı', ipucu: 'Mesajı olduğu gibi yapıştırın.', satir: 8 },
    eposta: { etiket: 'E-posta metni', ipucu: 'Konu, gövde ve imzayı birlikte yapıştırın.', satir: 10 },
    telefon: { etiket: 'Telefon görüşmesi notu', ipucu: 'Kısa not yeterli: kim aradı, hangi ürün, kaç adet, iletişim bilgisi.', satir: 4 }
  };

  function sayfaYeni() {
    var y = arayuz.yeni;
    var yardim = KAYNAK_YARDIM[y.kaynak];
    var dugme = el('button', { type: 'button', class: 'dugme ana', id: 'analiz-et', disabled: !y.metin.trim(), onclick: analizEt }, 'Analiz et ve teklif taslağı oluştur');
    var testKutusu = el('label', { class: 'onay-kutusu' }, [
      el('input', { type: 'checkbox', id: 'test-kaydi', checked: y.test, onchange: function (e) { y.test = e.target.checked; } }),
      el('span', null, 'Bu bir test kaydı (PDF\'lere "TEST VERİSİ" basılır)')
    ]);

    return el('div', { class: 'sayfa-yeni' }, [
      el('h1', { text: 'Yeni teklif talebi' }),
      el('section', { class: 'kart' }, [
        el('h2', { text: 'Talep kaynağı' }),
        radyoGrubu('kaynak', [
          { deger: 'whatsapp', etiket: 'WhatsApp' },
          { deger: 'eposta', etiket: 'E-posta' },
          { deger: 'telefon', etiket: 'Telefon notu' }
        ], y.kaynak, function (v) { y.kaynak = v; ciz(); }, { etiket: 'Talep kaynağı' }),
        el('label', { for: 'mesaj', class: 'alan-etiket' }, yardim.etiket),
        el('textarea', {
          id: 'mesaj', rows: yardim.satir, maxlength: 20000, value: y.metin, spellcheck: 'false',
          placeholder: yardim.ipucu,
          oninput: function (e) { y.metin = e.target.value; dugme.disabled = !y.metin.trim(); }
        }),
        testKutusu,
        dugme,
        el('div', { class: 'kutu kutu-bilgi' }, [
          el('p', null, [el('strong', { text: 'Ayrıştırma yöntemi: ' }), 'kurallı eşleştirme. Yapay zekâ kullanılmıyor; sonuçları her zaman kontrol edin.']),
          el('p', { text: 'Mesaj güvenilmeyen metin olarak işlenir: içindeki "fiyatı değiştir", "onaysız gönder" gibi talimatlar uygulanmaz. Fiyat, iskonto, stok ve koşulları yalnız siz belirlersiniz.' }),
          el('p', { text: 'Her mesaj ayrı bir taleptir. Aynı gün aynı ürüne gelen talepler tek siparişte birleştirilmez.' })
        ])
      ]),
      el('section', { class: 'kart kart-test' }, [
        el('h2', { text: 'Test verisi — örnek mesajlar' }),
        kucuk('Bunlar uydurma örneklerdir, gerçek müşteri değildir. Seçince yukarıdaki alana yüklenir ve "test kaydı" işaretlenir.'),
        el('div', { class: 'ornekler' }, ORN.map(function (o) {
          return el('button', { type: 'button', class: 'dugme ikincil ornek', 'data-ornek': o.id, onclick: function () {
            y.kaynak = o.kaynak; y.metin = o.metin; y.test = true; ciz();
            var m = document.getElementById('mesaj'); if (m) m.focus();
          } }, [el('span', { class: 'etiket-test', text: 'TEST' }), ' ' + o.baslik]);
        }))
      ])
    ]);
  }

  function analizEt() {
    var y = arayuz.yeni;
    if (!y.metin.trim()) return;
    var p = AY.ayristir(y.metin, { katalog: K });
    var t = T.teklifOlustur({
      ayristirma: p, kaynak: y.kaynak, test: y.test, katalog: K, ayarlar: veri.ayarlar,
      mevcutNolar: veri.teklifler.map(function (x) { return x.no; }), simdi: simdi()
    });
    veri.teklifler.unshift(t);
    kaydetHemen();
    arayuz.yeni = { kaynak: y.kaynak, metin: '', test: false };
    bildir(t.no + ' oluşturuldu. Çıkarılan bilgileri kontrol edin.', 'bilgi');
    git('#/teklif/' + encodeURIComponent(t.id) + '/analiz');
  }

  // ---------------------------------------------------------------------------
  // Teklif ekranı (analiz / teklif / onay sekmeleri)
  // ---------------------------------------------------------------------------

  function duzenlenebilir(t) {
    var d = T.durum(t);
    return d === T.DURUM.TASLAK || (d === T.DURUM.ONAYLI && !!arayuz.duzenlemeModu[t.id]);
  }

  // İçerik değişikliği: onaylıysa yeni revizyon açılır (quote.js), değilse yerinde güncellenir.
  function guncelle(t, fn, yenidenCiz) {
    var r;
    try { r = T.icerikGuncelle(t, fn, simdi()); } catch (e) { bildir(e.message, 'hata'); ciz(); return; }
    if (!r.degisti) return;
    if (r.yeniRevizyon) {
      arayuz.duzenlemeModu[t.id] = false;
      kaydetHemen();
      bildir('Onaylı teklif değiştirildi: Rev. ' + T.aktifRev(t).rev + ' taslak olarak açıldı. Yeniden onay gerekir.', 'uyari');
      ciz();
      return;
    }
    kaydetGecikmeli();
    if (yenidenCiz) ciz(); else turevGuncelle();
  }

  function sayfaTeklif(id, sekme) {
    var t = teklifBul(id);
    if (!t) {
      return el('div', { class: 'kart' }, [el('h1', { text: 'Teklif bulunamadı' }), el('p', null, [el('a', { href: '#/liste' }, 'Teklif listesine dön')])]);
    }
    var rev = T.aktifRev(t);
    var sekmeler = [['analiz', '1 · Analiz'], ['teklif', '2 · Teklif'], ['onay', '3 · Onay ve PDF']];
    var onceki = T.sonOnayliRev(t);

    var ust = el('div', { class: 'teklif-ust' }, [
      el('div', { class: 'teklif-baslik' }, [
        el('h1', null, [el('span', { class: 'no', text: t.no }), ' ', rozet(rev.durum), ' ', el('span', { class: 'rev', text: 'Rev. ' + rev.rev }),
          t.test ? el('span', { class: 'etiket-test', text: 'TEST' }) : null]),
        kucuk(T.KAYNAK_ETIKET[t.talep.kaynak] + ' · oluşturma ' + T.tarihSaatTR(t.olusturma) +
          (onceki && onceki !== rev ? ' · Rev. ' + onceki.rev + ' onaylı (geçerli PDF onda)' : ''))
      ]),
      el('nav', { class: 'sekmeler', 'aria-label': 'Teklif adımları' }, sekmeler.map(function (s) {
        return el('a', { href: '#/teklif/' + encodeURIComponent(t.id) + '/' + s[0], class: s[0] === sekme ? 'aktif' : null, 'aria-current': s[0] === sekme ? 'page' : null }, s[1]);
      }))
    ]);

    var kilit = kilitNotu(t);
    var govde;
    if (sekme === 'teklif') govde = sekmeTeklif(t);
    else if (sekme === 'onay') govde = sekmeOnay(t);
    else govde = sekmeAnaliz(t);
    return el('div', { class: 'sayfa-teklif' }, [ust, kilit, govde]);
  }

  function kilitNotu(t) {
    var rev = T.aktifRev(t);
    if (rev.durum === T.DURUM.BEKLIYOR) {
      return el('div', { class: 'kutu kutu-uyari' }, 'Teklif onay bekliyor; içerik kilitli. Değiştirmek için "Onay ve PDF" sekmesinde "Düzenle"yi kullanın.');
    }
    if (rev.durum === T.DURUM.RED) {
      return el('div', { class: 'kutu kutu-hata' }, [
        'Teklif reddedildi' + (rev.redNedeni ? ': ' + rev.redNedeni : '') + '. ',
        el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', onclick: function () { T.yenidenAc(t, simdi()); kaydetHemen(); ciz(); } }, 'Yeniden aç (taslağa al)')
      ]);
    }
    if (rev.durum === T.DURUM.ONAYLI) {
      if (arayuz.duzenlemeModu[t.id]) {
        return el('div', { class: 'kutu kutu-uyari' }, [
          'Düzenleme açık. İlk değişiklikte Rev. ' + (rev.rev + 1) + ' taslak olarak açılır; onaylı Rev. ' + rev.rev + ' aynen saklanır ve yeni revizyon yeniden onay ister. ',
          el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', onclick: function () { arayuz.duzenlemeModu[t.id] = false; ciz(); } }, 'Vazgeç')
        ]);
      }
      return el('div', { class: 'kutu kutu-basari' }, [
        'Rev. ' + rev.rev + ' onaylı ve kilitli. ',
        el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', id: 'duzenle-yeni-rev', onclick: function () { arayuz.duzenlemeModu[t.id] = true; ciz(); } }, 'Düzenle (yeni revizyon)')
      ]);
    }
    if (rev.rev > 0) {
      return el('div', { class: 'kutu kutu-uyari' }, [
        'Rev. ' + rev.rev + ' taslak: onaylı Rev. ' + (rev.rev - 1) + ' değiştirildiği için açıldı ve yeniden onay gerekiyor. ',
        el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', onclick: function () {
          T.revizyonuGeriAl(t, simdi()); kaydetHemen(); bildir('Değişiklikler atıldı; onaylı Rev. ' + T.aktifRev(t).rev + ' geçerli.', 'bilgi'); ciz();
        } }, 'Değişiklikleri at')
      ]);
    }
    return null;
  }

  // --- Orijinal mesaj (vurgulu, yalnız metin düğümleri) ---
  function vurguluMesaj(metin, vurgular) {
    var pre = el('pre', { class: 'mesaj', id: 'orijinal-mesaj' });
    var konum = 0;
    (vurgular || []).slice().sort(function (a, b) { return a.bas - b.bas || b.son - a.son; }).forEach(function (v) {
      if (v.bas < konum || v.son > metin.length || v.bas >= v.son) return;
      if (v.bas > konum) pre.appendChild(document.createTextNode(metin.slice(konum, v.bas)));
      pre.appendChild(el('mark', { class: 'v-' + v.tur, text: metin.slice(v.bas, v.son) }));
      konum = v.son;
    });
    if (konum < metin.length) pre.appendChild(document.createTextNode(metin.slice(konum)));
    return pre;
  }

  function sekmeAnaliz(t) {
    var rev = T.aktifRev(t);
    var ic = rev.icerik;
    var a = t.talep.ayristirma || { uyarilar: [], bilgiler: [], epostalar: [], telefonlar: [] };
    var kilitli = !duzenlenebilir(t);

    var mesajKart = el('section', { class: 'kart mesaj-kart' }, [
      el('h2', { text: 'Orijinal mesaj' }),
      kucuk(T.KAYNAK_ETIKET[t.talep.kaynak] + ' · ' + T.tarihSaatTR(t.talep.zaman) + ' · değiştirilemez'),
      vurguluMesaj(t.talep.metin, a.vurgular),
      el('p', { class: 'lejant' }, [
        el('mark', { class: 'v-urun', text: 'ürün' }), ' ', el('mark', { class: 'v-aday', text: 'belirsiz/tanınmayan' }), ' ',
        el('mark', { class: 'v-adet', text: 'adet' }), ' ', el('mark', { class: 'v-iletisim', text: 'iletişim' })
      ]),
      el('p', { class: 'yontem' }, 'Ayrıştırma: kurallı eşleştirme (' + (a.surum || '') + '), yapay zekâ kullanılmadı.'),
      uyariKutusu(a.uyarilar, 'uyari', 'Ayrıştırma uyarıları'),
      uyariKutusu((a.bilgiler || []).filter(function (b) { return /YOK$|KENDI|STOK/.test(b.kod); }), 'bilgi', 'Bulunamayan / not edilen')
    ]);

    // Alıcı alanları
    function alan(anahtar, etiket, oz) {
      oz = oz || {};
      var id = 'alici-' + anahtar;
      var cikarilan = oz.cikarilan;
      var giris = el(oz.cokSatir ? 'textarea' : 'input', {
        id: id, type: oz.cokSatir ? null : (oz.tip || 'text'), value: ic.alici[anahtar], maxlength: 300, rows: oz.cokSatir ? 2 : null,
        disabled: kilitli, placeholder: oz.yerTutucu || null, inputmode: oz.inputmode || null, autocomplete: 'off',
        oninput: function (e) { var v = e.target.value; guncelle(t, function (x) { x.alici[anahtar] = v; }); }
      });
      var rozetAlani = turev(function () {
        var simdiki = T.aktifRev(t).icerik.alici[anahtar];
        if (!cikarilan && oz.izlenmez) return null;
        if (cikarilan && simdiki === cikarilan.deger) {
          return el('span', { class: 'kaynak kaynak-mesaj' }, 'Mesajdan' + (cikarilan.guven ? ' (güven: ' + cikarilan.guven + ')' : '') + (cikarilan.kaynak ? ': “' + cikarilan.kaynak + '”' : ''));
        }
        if (!simdiki.trim()) return el('span', { class: 'kaynak kaynak-eksik' }, cikarilan ? 'Boş bırakıldı' : 'Mesajda bulunamadı');
        return el('span', { class: 'kaynak kaynak-elle' }, 'Elle girildi');
      }, 'div', { class: 'kaynak-satir' });
      var cipler = null;
      if (oz.adaylar && oz.adaylar.length > 1) {
        cipler = el('div', { class: 'cipler' }, [el('span', { class: 'kucuk', text: 'Mesajda bulunanlar: ' })].concat(oz.adaylar.map(function (d) {
          return el('button', { type: 'button', class: 'cip', disabled: kilitli, onclick: function () { guncelle(t, function (x) { x.alici[anahtar] = d; }, true); } }, d);
        })));
      }
      return el('div', { class: 'alan' }, [el('label', { for: id, class: 'alan-etiket' }, etiket), giris, rozetAlani, cipler, oz.ipucu ? kucuk(oz.ipucu) : null]);
    }

    var tekDeger = function (liste) { return liste && liste.length === 1 ? { deger: liste[0], guven: null, kaynak: null } : null; };
    var aliciKart = el('section', { class: 'kart' }, [
      el('h2', { text: 'Alıcı bilgileri' }),
      turev(function () {
        var al = T.aktifRev(t).icerik.alici;
        return (!al.firma.trim() && !al.yetkili.trim() && !al.tanim.trim())
          ? el('div', { class: 'kutu kutu-uyari' }, 'Alıcı yok: firma, kişi adı veya alıcı tanımından en az biri gerekli. Vergi numarası gibi bilgiler zorunlu değildir.')
          : null;
      }),
      alan('firma', 'Firma adı', { cikarilan: a.firma }),
      alan('yetkili', 'Yetkili / müşteri adı', { cikarilan: a.yetkili }),
      alan('tanim', 'Alıcı tanımı (firma veya kişi adı yoksa)', { izlenmez: true, yerTutucu: 'Firma/kişi adı bilinmiyorsa kısa bir tanım' }),
      alan('eposta', 'E-posta', { tip: 'email', cikarilan: tekDeger(a.epostalar), adaylar: a.epostalar, inputmode: 'email' }),
      alan('telefon', 'Telefon', { tip: 'tel', cikarilan: tekDeger(a.telefonlar), adaylar: a.telefonlar, inputmode: 'tel' }),
      el('details', { class: 'ek-alanlar' }, [
        el('summary', { text: 'İsteğe bağlı: adres ve vergi bilgileri' }),
        alan('adres', 'Adres', { izlenmez: true, cokSatir: true }),
        alan('vergiDairesi', 'Vergi dairesi', { izlenmez: true }),
        alan('vergiNo', 'Vergi no', { izlenmez: true, inputmode: 'numeric' })
      ])
    ]);

    var kalemKart = el('section', { class: 'kart' }, [
      el('h2', { text: 'Ürün kalemleri' }),
      kucuk('Mesajdaki her ürün ayrı kalem olarak gösterilir; hiçbiri sessizce atlanmaz.'),
      el('div', { class: 'kalemler' }, ic.satirlar.map(function (s, i) { return kalemAnaliz(t, s, i, kilitli); })),
      ic.satirlar.length ? null : el('div', { class: 'kutu kutu-uyari' }, 'Mesajda ürün bulunamadı. Aşağıdan kalem ekleyin.'),
      kalemEkleFormu(t, kilitli)
    ]);

    return el('div', { class: 'iki-sutun' }, [
      mesajKart,
      el('div', { class: 'sutun' }, [aliciKart, kalemKart,
        el('div', { class: 'ileri' }, [el('a', { class: 'dugme ana', href: '#/teklif/' + encodeURIComponent(t.id) + '/teklif' }, 'Teklif taslağına geç →')])])
    ]);
  }

  function adetGirisi(t, s, kilitli, ek) {
    var id = (ek || 'adet') + '-' + s.id;
    return el('div', { class: 'alan alan-adet' }, [
      el('label', { for: id, class: 'alan-etiket' }, 'Adet'),
      el('input', {
        id: id, type: 'text', inputmode: 'numeric', pattern: '[0-9]*', maxlength: 4, autocomplete: 'off',
        value: s.adet == null ? '' : String(s.adet), placeholder: 'Seçin', disabled: kilitli,
        'aria-invalid': T.adetGecerli(s.adet) ? 'false' : 'true',
        oninput: function (e) {
          var v = e.target.value.trim();
          var n = /^\d{1,4}$/.test(v) && Number(v) >= 1 ? Number(v) : null;
          e.target.setAttribute('aria-invalid', n == null ? 'true' : 'false');
          guncelle(t, function (x) { x.satirlar.forEach(function (y) { if (y.id === s.id) y.adet = n; }); });
        }
      })
    ]);
  }

  function adetKaynakNotu(s) {
    var k = s.kaynak || {};
    if (k.adetKaynak) return kucuk('Mesajdan: “' + k.adetKaynak + '”' + (k.adetGuven ? ' (güven: ' + k.adetGuven + ')' : ''), 'kaynak-mesaj-metin');
    return kucuk('Mesajda adet yok — siz girin (1 varsayılmadı).', 'eksik-metin');
  }

  function kalemAnaliz(t, s, i, kilitli) {
    var no = el('span', { class: 'kalem-no', text: String(i + 1) });
    var notlar = s.kaynak && s.kaynak.notlar && s.kaynak.notlar.length ? uyariKutusu(s.kaynak.notlar, 'uyari') : null;
    var haricDugme = el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', disabled: kilitli, onclick: function () {
      guncelle(t, function (x) { T.islem.satirHaric(x, s.id, s.durum === 'taninmayan' ? 'Kayıtlı ürün verisi yok; ayrıca değerlendirilecek' : 'Teklif dışı bırakıldı'); }, true);
    } }, 'Teklif dışı bırak');

    if (s.durum === 'haric') {
      return el('div', { class: 'kalem kalem-haric' }, [no,
        el('div', { class: 'kalem-govde' }, [
          el('strong', { text: 'Teklif dışı: ' + (s.urun ? s.urun.marka + ' ' + s.urun.model : '“' + s.ham + '”') }),
          kucuk(s.haricNedeni),
          el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', disabled: kilitli, onclick: function () { guncelle(t, function (x) { T.islem.satirGeriAl(x, s.id); }, true); } }, 'Geri al')
        ])]);
    }
    if (s.durum === 'tamam') {
      return el('div', { class: 'kalem kalem-tamam' }, [no,
        el('div', { class: 'kalem-govde' }, [
          el('strong', { text: s.urun.marka + ' ' + s.urun.model + ' — ' + s.urun.ad }),
          s.kaynak && s.kaynak.ifade ? kucuk('Mesajda: “' + s.kaynak.ifade + '” → kayıtlı ürünle kesin eşleşme') : kucuk('Elle eklendi'),
          adetGirisi(t, s, kilitli),
          adetKaynakNotu(s),
          notlar,
          haricDugme
        ])]);
    }
    if (s.durum === 'belirsiz') {
      var aday = s.adayUrunId ? T.urunEtkin(K, veri.ayarlar, s.adayUrunId) : null;
      return el('div', { class: 'kalem kalem-belirsiz' }, [no,
        el('div', { class: 'kalem-govde' }, [
          el('strong', { text: 'Belirsiz ürün: “' + s.ham + '”' }),
          kucuk('Kesin model eşleşmesi yapılmadı.' + (aday ? ' Kayıtlı aday: ' + aday.marka + ' ' + aday.model + ' (' + aday.ad + ').' : '')),
          s.adet != null ? adetKaynakNotu(s) : null,
          el('div', { class: 'dugmeler' }, [
            aday ? el('button', { type: 'button', class: 'dugme ana kucuk-dugme', disabled: kilitli, 'data-eslestir': s.id, onclick: function () {
              guncelle(t, function (x) { T.islem.satirEslestir(x, s.id, aday.id, ctx()); }, true);
            } }, 'Evet, ' + aday.marka + ' ' + aday.model) : null,
            haricDugme
          ])
        ])]);
    }
    // tanınmayan
    var secId = 'eslestir-' + s.id;
    var sec = el('select', { id: secId, disabled: kilitli }, [el('option', { value: '' }, 'Kayıtlı ürün seçin…')].concat(K.urunler.map(function (u) {
      return el('option', { value: u.id }, u.marka + ' ' + u.model + ' — ' + u.ad);
    })));
    return el('div', { class: 'kalem kalem-taninmayan' }, [no,
      el('div', { class: 'kalem-govde' }, [
        el('strong', { text: 'Tanınmayan ürün: “' + s.ham + '”' + (s.adet ? ' · mesajdaki adet: ' + s.adet : '') }),
        kucuk('Bu ürün için kayıtlı ürün/fiyat verisi yok; teklife fiyat yazılamaz. Kayıtlı bir ürünle eşleştirin ya da teklif dışı bırakıp ayrıca ele alın.'),
        el('div', { class: 'satir-ici' }, [
          el('label', { for: secId, class: 'gizli' }, 'Kayıtlı ürünle eşleştir'),
          sec,
          el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', disabled: kilitli, onclick: function () {
            if (!sec.value) { bildir('Önce bir ürün seçin.', 'uyari'); return; }
            guncelle(t, function (x) { T.islem.satirEslestir(x, s.id, sec.value, ctx()); }, true);
          } }, 'Eşleştir')
        ]),
        haricDugme
      ])]);
  }

  function kalemEkleFormu(t, kilitli) {
    var secId = 'kalem-ekle-urun';
    var sec = el('select', { id: secId, disabled: kilitli }, K.urunler.map(function (u) { return el('option', { value: u.id }, u.marka + ' ' + u.model); }));
    return el('div', { class: 'kalem-ekle' }, [
      el('label', { for: secId, class: 'alan-etiket' }, 'Elle kalem ekle'),
      el('div', { class: 'satir-ici' }, [sec, el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', disabled: kilitli, onclick: function () {
        guncelle(t, function (x) { T.islem.satirEkle(x, sec.value, ctx()); }, true);
      } }, 'Ekle')])
    ]);
  }

  // --- Teklif sekmesi ---
  function ilkUrun(ic) {
    var s = T.aktifSatirlar(ic).filter(function (x) { return x.durum === 'tamam'; })[0];
    return s ? T.urunEtkin(K, veri.ayarlar, s.urunId) : null;
  }

  function stokKaydiKutusu(u) {
    var k = T.sonStokKaydi(u);
    if (!k) return el('div', { class: 'kutu kutu-uyari' }, 'Bu ürün için stok kaydı yok.');
    var gun = T.gunFarki(k.tarih, simdi());
    return el('div', { class: 'kutu kutu-bilgi stok-kaydi' }, [
      el('strong', { text: 'Son stok kaydı · ' + T.gunTR(k.tarih) + ' · ' + k.kaynak }),
      el('p', { text: 'İfade: “' + k.ifade + '”' }),
      el('p', { text: 'Mevcut stok: ' + (k.mevcutStok == null ? 'bilinmiyor' : k.mevcutStok + ' adet') +
        ' · Beklenen giriş: ' + (k.beklenenGiris == null ? 'bilinmiyor' : k.beklenenGiris + ' adet') +
        ' · Giriş tarihi: ' + (k.beklenenTarih ? T.gunTR(k.beklenenTarih) : 'teyitsiz') }),
      k.not ? kucuk(k.not) : null,
      kucuk('Kayıt ' + (gun <= 0 ? 'bugün' : gun + ' gün önce') + ' girildi. Bu kayıt mevcut stoğu göstermez; teslim seçeneğini güncel durumu kontrol ederek işaretleyin.')
    ]);
  }

  function kosulKarari(t, ad, etiket, kilitli, aciklama) {
    var v = T.aktifRev(t).icerik.kosullar[ad];
    var metinId = 'kosul-' + ad;
    return el('div', { class: 'kosul' }, [
      el('h3', { text: etiket }),
      aciklama ? kucuk(aciklama) : null,
      radyoGrubu('kosul-' + ad + '-secim', [
        { deger: null, etiket: 'Karar verilmedi' },
        { deger: 'deger', etiket: 'Metin gir' },
        { deger: 'yok', etiket: 'Teklifte yer almasın' }
      ], v.secim, function (d) {
        guncelle(t, function (x) { x.kosullar[ad] = { secim: d, metin: d === 'deger' ? x.kosullar[ad].metin : '' }; }, true);
      }, { kilitli: kilitli, etiket: etiket }),
      v.secim === 'deger' ? el('div', { class: 'alan' }, [
        el('label', { for: metinId, class: 'alan-etiket' }, etiket + ' metni (müşteri görür)'),
        el('textarea', { id: metinId, rows: 2, maxlength: 1000, value: v.metin, disabled: kilitli, placeholder: etiket + ' bilgisini yazın',
          oninput: function (e) { var m = e.target.value; guncelle(t, function (x) { x.kosullar[ad].metin = m; delete x.kosullar[ad].kaynak; }); } })
      ]) : null
    ]);
  }

  function sekmeTeklif(t) {
    var rev = T.aktifRev(t);
    var ic = rev.icerik;
    var kilitli = !duzenlenebilir(t);
    var aktif = T.aktifSatirlar(ic);
    var tamamlar = aktif.filter(function (s) { return s.durum === 'tamam'; });
    var bekleyen = aktif.filter(function (s) { return s.durum !== 'tamam'; });

    var kalemler = tamamlar.map(function (s) {
      var iskId = 'iskonto-' + s.id;
      var ar = s.urun.iskontoAraligi || { min: 0, max: 0 };
      var secenekler = [el('option', { value: '', selected: s.iskontoBp == null }, 'Seçilmedi')];
      for (var y = ar.min; y <= ar.max; y++) secenekler.push(el('option', { value: String(y * 100), selected: s.iskontoBp === y * 100 }, '%' + y));
      var gorsel = s.urun.gorsel && AS[s.urun.gorsel] ? el('img', { src: AS[s.urun.gorsel], alt: s.urun.marka + ' ' + s.urun.model + ' ürün görseli', width: 96, height: 96, class: 'urun-gorsel' }) : null;
      return el('div', { class: 'urun-kart' }, [
        gorsel,
        el('div', { class: 'urun-bilgi' }, [
          el('h3', { text: s.urun.marka + ' ' + s.urun.model }),
          el('p', { class: 'urun-ad', text: s.urun.ad }),
          el('p', { class: 'kucuk', text: s.urun.aciklama }),
          el('p', { class: 'baglantilar' }, [
            s.urun.katalogUrl ? el('a', { href: s.urun.katalogUrl, target: '_blank', rel: 'noopener noreferrer' }, 'Katalog (PDF)') : null,
            s.urun.urunSayfasi ? el('a', { href: s.urun.urunSayfasi, target: '_blank', rel: 'noopener noreferrer' }, 'Ürün sayfası') : null
          ]),
          kucuk('Ürün bilgisi: degirmen.tr (' + T.gunTR(s.urun.siteAlinma) + ') · Fiyat: şirket yetkilisinin verdiği bilgi'),
          el('div', { class: 'fiyat-izgara' }, [
            adetGirisi(t, s, kilitli, 'adet-t'),
            el('div', { class: 'alan' }, [
              el('span', { class: 'alan-etiket', text: 'Liste birim fiyatı' }),
              el('div', { class: 'deger', text: s.urun.listeFiyatiKurus != null ? P.bicimle(s.urun.listeFiyatiKurus) : 'Fiyat yok' }),
              kucuk(s.urun.kdvDahil ? 'KDV dahil' : 'KDV hariç')
            ]),
            el('div', { class: 'alan' }, [
              el('label', { for: iskId, class: 'alan-etiket' }, 'İskonto'),
              el('select', { id: iskId, disabled: kilitli, 'aria-invalid': s.iskontoBp == null ? 'true' : 'false', onchange: function (e) {
                var v = e.target.value === '' ? null : Number(e.target.value);
                e.target.setAttribute('aria-invalid', v == null ? 'true' : 'false');
                guncelle(t, function (x) { x.satirlar.forEach(function (z) { if (z.id === s.id) z.iskontoBp = v; }); });
              } }, secenekler),
              kucuk('Onaylı aralık %' + ar.min + '–%' + ar.max + '; oranı siz seçersiniz.')
            ])
          ]),
          turev(function () {
            var h = T.hesapla(T.aktifRev(t).icerik);
            var x = h.satirlar.filter(function (z) { return z.satir.id === s.id; })[0];
            if (!x || !x.hesap) return el('p', { class: 'eksik-metin' }, 'Adet ve iskonto seçilince satır tutarı hesaplanır.');
            return el('p', { class: 'satir-sonuc' }, 'İskontolu birim: ' + P.bicimle(x.hesap.iskontoluBirim) + ' · Satır tutarı (KDV hariç): ' + P.bicimle(x.hesap.net));
          }, 'div')
        ])
      ]);
    });

    var kdvId = 'kdv-orani';
    var toplamKart = el('section', { class: 'kart toplam-kart' }, [
      el('h2', { text: 'Tutarlar' }),
      turev(function () {
        var ic2 = T.aktifRev(t).icerik;
        var h = T.hesapla(ic2);
        if (!h.toplam) return el('p', { class: 'eksik-metin' }, 'Tüm kalemlerde adet ve iskonto seçilince toplam hesaplanır.');
        var oranlar = T.aktifSatirlar(ic2).map(function (s) { return s.iskontoBp; }).filter(function (v, i, d) { return d.indexOf(v) === i; });
        return el('table', { class: 'toplam-tablo', id: 'toplam-tablo' }, [el('tbody', null, [
          ['Liste fiyatı toplamı', P.bicimle(h.toplam.brut), ''],
          ['İskonto' + (oranlar.length === 1 ? ' (' + P.oranBicimle(oranlar[0]) + ')' : ''), '−' + P.bicimle(h.toplam.iskonto), ''],
          ['Net tutar (KDV hariç)', P.bicimle(h.toplam.net), 'net'],
          ['KDV (' + P.oranBicimle(h.toplam.kdvBp) + ')', P.bicimle(h.toplam.kdv), 'kdv'],
          ['Genel toplam (KDV dahil)', P.bicimle(h.toplam.genelToplam), 'genel']
        ].map(function (r) { return el('tr', { class: r[2] ? 't-' + r[2] : null }, [el('th', { scope: 'row', text: r[0] }), el('td', { text: r[1], 'data-tutar': r[2] || null })]); }))]);
      }),
      el('div', { class: 'alan' }, [
        el('label', { for: kdvId, class: 'alan-etiket' }, 'KDV oranı'),
        el('select', { id: kdvId, disabled: kilitli, onchange: function (e) {
          var v = Number(e.target.value);
          guncelle(t, function (x) { x.kdvBp = v; }, true);
        } }, T.KDV_SECENEKLERI.map(function (bp) { return el('option', { value: String(bp), selected: ic.kdvBp === bp }, P.oranBicimle(bp)); })),
        veri.ayarlar.kdv.teyitliBp === ic.kdvBp
          ? kucuk('KDV ' + P.oranBicimle(ic.kdvBp) + ' teyitli (' + T.tarihSaatTR(veri.ayarlar.kdv.teyitZamani) + ').', 'kaynak-mesaj-metin')
          : kucuk('KDV ' + P.oranBicimle(ic.kdvBp) + ' ilk ayardır (örnek şirket tekliflerindeki oran). İlk nihai onaydan önce teyit istenecek.', 'eksik-metin')
      ]),
      kucuk('Hesap kuruş bazında yapılır: önce iskonto, sonra KDV.')
    ]);

    // Koşullar
    var k = ic.kosullar;
    var u0 = ilkUrun(ic);
    var teslimSecenekleri = [{ deger: null, etiket: 'Teyit edilmedi', aciklama: 'Stok durumunu kontrol etmeden seçmeyin.' }];
    if (u0) {
      teslimSecenekleri.push({ deger: 'stokta', etiket: 'Stokta (teyit ettim)', aciklama: u0.ticari.teslim.stokta });
      teslimSecenekleri.push({ deger: 'stokta_degil', etiket: 'Stokta değil', aciklama: u0.ticari.teslim.stoktaDegil });
    }
    teslimSecenekleri.push({ deger: 'ozel', etiket: 'Özel teslim metni', aciklama: 'Kendi metninizi yazın.' });

    var kosulKart = el('section', { class: 'kart' }, [
      el('h2', { text: 'Ödeme, teslim ve sevk koşulları' }),
      el('div', { class: 'kosul' }, [
        el('h3', { text: 'Ödeme' }),
        el('label', { for: 'kosul-odeme', class: 'alan-etiket' }, 'Ödeme koşulu (müşteri görür)'),
        el('textarea', { id: 'kosul-odeme', rows: 2, maxlength: 1000, value: k.odeme.metin, disabled: kilitli,
          oninput: function (e) { var m = e.target.value; guncelle(t, function (x) { x.kosullar.odeme = { secim: m.trim() ? 'deger' : null, metin: m }; }); } }),
        turev(function () {
          var o = T.aktifRev(t).icerik.kosullar.odeme;
          if (o.kaynak) return kucuk('Kaynak: ' + o.kaynak + '.', 'kaynak-mesaj-metin');
          return o.metin.trim() ? kucuk('Elle düzenlendi.') : kucuk('Ödeme koşulu boş.', 'eksik-metin');
        })
      ]),
      el('div', { class: 'kosul' }, [
        el('h3', { text: 'Teslim' }),
        u0 ? stokKaydiKutusu(u0) : null,
        radyoGrubu('teslim-secim', teslimSecenekleri, k.teslim.secim, function (d) {
          guncelle(t, function (x) {
            var metin = d === 'stokta' ? u0.ticari.teslim.stokta : d === 'stokta_degil' ? u0.ticari.teslim.stoktaDegil : '';
            x.kosullar.teslim = { secim: d, metin: metin, teyitZamani: d ? simdi() : null };
          }, true);
        }, { kilitli: kilitli, etiket: 'Teslim durumu' }),
        k.teslim.secim ? el('div', { class: 'alan' }, [
          el('label', { for: 'kosul-teslim', class: 'alan-etiket' }, 'Teslim metni (müşteri görür)'),
          el('textarea', { id: 'kosul-teslim', rows: 2, maxlength: 1000, value: k.teslim.metin, disabled: kilitli,
            oninput: function (e) { var m = e.target.value; guncelle(t, function (x) { x.kosullar.teslim.metin = m; }); } }),
          kucuk('Teyit: ' + T.tarihSaatTR(k.teslim.teyitZamani))
        ]) : null
      ]),
      kosulKarari(t, 'sevk', 'Sevk bedeli', kilitli, 'PM-450 için sevk bedeli teyit edilmedi; uygulama değer önermez.'),
      kosulKarari(t, 'garanti', 'Garanti', kilitli, 'PM-450 için garanti süresi teyit edilmedi; uygulama değer önermez.'),
      kosulKarari(t, 'gecerlilik', 'Teklif geçerliliği', kilitli, 'Geçerlilik süresi teyit edilmedi; uygulama değer önermez.')
    ]);

    var notKart = el('section', { class: 'kart' }, [
      el('h2', { text: 'Müşteriye görünen ek bilgiler' }),
      el('label', { for: 'musteri-notu', class: 'alan-etiket' }, 'Açıklama (isteğe bağlı, PDF\'de görünür)'),
      el('textarea', { id: 'musteri-notu', rows: 3, maxlength: 2000, value: ic.musteriNotu, disabled: kilitli,
        oninput: function (e) { var m = e.target.value; guncelle(t, function (x) { x.musteriNotu = m; }); } }),
      el('label', { class: 'onay-kutusu' }, [
        el('input', { type: 'checkbox', id: 'teknik-ekle', checked: ic.teknikEkle, disabled: kilitli, onchange: function (e) { var v = e.target.checked; guncelle(t, function (x) { x.teknikEkle = v; }); } }),
        el('span', null, 'Teknik özellik tablosunu PDF\'ye ekle (degirmen.tr / üretici kataloğu)')
      ])
    ]);

    var icNotKart = el('section', { class: 'kart kart-ic' }, [
      el('h2', { text: 'İç notlar' }),
      el('p', { class: 'ic-uyari', text: 'Yalnız iç kullanım. PDF\'ye ve müşteriye çıkmaz; değiştirmek yeni revizyon gerektirmez.' }),
      el('label', { for: 'ic-notlar', class: 'gizli' }, 'İç notlar'),
      el('textarea', { id: 'ic-notlar', rows: 3, maxlength: 5000, value: t.icNotlar, placeholder: 'Ör. pazarlık durumu, hatırlatmalar',
        oninput: function (e) { t.icNotlar = e.target.value; t.guncelleme = simdi(); kaydetGecikmeli(); } })
    ]);

    return el('div', { class: 'sekme-teklif' }, [
      bekleyen.length ? el('div', { class: 'kutu kutu-uyari' }, [bekleyen.length + ' kalem ürün eşleşmesi bekliyor. ', el('a', { href: '#/teklif/' + encodeURIComponent(t.id) + '/analiz' }, 'Analiz sekmesinde inceleyin')]) : null,
      tamamlar.length ? el('section', { class: 'kart' }, [el('h2', { text: 'Ürünler' })].concat(kalemler)) : el('div', { class: 'kutu kutu-uyari' }, 'Teklifte kesinleşmiş ürün kalemi yok.'),
      toplamKart,
      kosulKart,
      notKart,
      icNotKart,
      el('div', { class: 'ileri' }, [el('a', { class: 'dugme ana', href: '#/teklif/' + encodeURIComponent(t.id) + '/onay' }, 'Onay ve PDF →')])
    ]);
  }

  // --- Onay sekmesi ---
  function musteriOnizleme(t, rev) {
    var ic = rev.icerik;
    var h = T.hesapla(ic);
    var a = ic.alici;
    var satirlar = h.satirlar.filter(function (x) { return x.satir.durum === 'tamam'; });
    return el('div', { class: 'onizleme' }, [
      el('p', null, [el('strong', { text: 'Alıcı: ' }), T.aliciEtiketi(a) || '—']),
      a.yetkili && a.firma ? el('p', { text: 'İlgili: ' + a.yetkili }) : null,
      a.telefon || a.eposta ? el('p', { text: [a.telefon, a.eposta].filter(Boolean).join(' · ') }) : null,
      el('ul', null, satirlar.map(function (x) {
        var s = x.satir;
        return el('li', { text: s.urun.marka + ' ' + s.urun.model + ' × ' + (s.adet == null ? '?' : s.adet) + ' · iskonto ' + (s.iskontoBp == null ? 'seçilmedi' : P.oranBicimle(s.iskontoBp)) + (x.hesap ? ' · ' + P.bicimle(x.hesap.net) : '') });
      })),
      h.toplam ? el('p', { class: 'onizleme-toplam' }, 'Net ' + P.bicimle(h.toplam.net) + ' + KDV ' + P.oranBicimle(h.toplam.kdvBp) + ' ' + P.bicimle(h.toplam.kdv) + ' = ' + P.bicimle(h.toplam.genelToplam)) : null,
      el('ul', { class: 'kosul-liste' }, ['odeme', 'teslim', 'sevk', 'garanti', 'gecerlilik'].map(function (ad) {
        var v = ic.kosullar[ad];
        if (v.secim === 'yok') return el('li', { class: 'soluk', text: T.KOSUL_ETIKET[ad] + ': teklifte yer almıyor' });
        return el('li', { text: T.KOSUL_ETIKET[ad] + ': ' + (v.secim && v.metin.trim() ? v.metin.trim() : '— karar bekliyor') });
      }))
    ]);
  }

  function pdfIndir(t, revNo, mod) {
    return PDF.indir(t, revNo, { katalog: K, assets: AS, mod: mod, simdi: simdi(), sirketEk: veri.ayarlar.sirketEk }).then(function (r) {
      t.pdfKayitlari.push({ zaman: simdi(), tur: mod, rev: revNo, dosya: r.dosya });
      kaydetHemen();
      bildir((mod === 'nihai' ? 'Nihai PDF indirildi: ' : 'Taslak PDF indirildi: ') + r.dosya + '. Müşteriye gönderilmedi.', 'bilgi');
      ciz();
    }).catch(function (e) { bildir('PDF oluşturulamadı: ' + e.message, 'hata'); });
  }

  function sekmeOnay(t) {
    var rev = T.aktifRev(t);
    var d = rev.durum;
    var engelGonder = T.engeller(rev.icerik, { ayarlar: veri.ayarlar, asama: 'gonder' });
    var engelOnay = T.engeller(rev.icerik, { ayarlar: veri.ayarlar, asama: 'onay' });
    var kdvTeyitGerekli = engelOnay.some(function (e) { return e.kod === 'KDV_TEYIT'; });
    var uyarilar = T.uyarilar(t, { katalog: K, ayarlar: veri.ayarlar, tumTeklifler: veri.teklifler, simdi: simdi() });

    var adimlar = el('ol', { class: 'adimlar' }, [
      ['taslak', 'Taslak'], ['onay_bekliyor', 'Onay bekliyor'], [d === 'reddedildi' ? 'reddedildi' : 'onaylandi', d === 'reddedildi' ? 'Reddedildi' : 'Onaylandı']
    ].map(function (a) { return el('li', { class: a[0] === d ? 'aktif' : null, 'aria-current': a[0] === d ? 'step' : null }, a[1]); }));

    var engelListesi = engelGonder.length
      ? el('div', { class: 'kutu kutu-hata', id: 'engeller' }, [
        el('strong', { text: 'Onayı durduran eksikler (' + engelGonder.length + ')' }),
        el('ul', null, engelGonder.map(function (e) {
          return el('li', null, [e.mesaj + ' ', el('a', { href: '#/teklif/' + encodeURIComponent(t.id) + '/' + e.sekme }, 'Düzelt')]);
        }))
      ])
      : (d === T.DURUM.TASLAK || d === T.DURUM.BEKLIYOR ? el('div', { class: 'kutu kutu-basari', id: 'engeller' }, 'Eksik yok.') : null);

    var eylemler = [];
    var taslakPdf = el('button', { type: 'button', class: 'dugme ikincil', id: 'taslak-pdf', onclick: function () { pdfIndir(t, rev.rev, 'taslak'); } }, 'Taslak PDF (TASLAK filigranlı)');
    var redKutusu = function () {
      return el('div', { class: 'red-kutusu' }, [
        el('label', { for: 'red-nedeni', class: 'alan-etiket' }, 'Red nedeni (iç not, isteğe bağlı)'),
        el('input', { id: 'red-nedeni', type: 'text', maxlength: 300, value: arayuz.redNedeni, oninput: function (e) { arayuz.redNedeni = e.target.value; } }),
        el('button', { type: 'button', class: 'dugme tehlike', id: 'reddet', onclick: function () {
          try { T.reddet(t, arayuz.redNedeni, simdi()); } catch (e) { bildir(e.message, 'hata'); return; }
          arayuz.redNedeni = '';
          kaydetHemen(); bildir(t.no + ' reddedildi.', 'uyari'); ciz();
        } }, 'Reddet')
      ]);
    };

    if (d === T.DURUM.TASLAK) {
      eylemler.push(el('div', { class: 'dugmeler' }, [
        el('button', { type: 'button', class: 'dugme ana', id: 'onaya-gonder', disabled: engelGonder.length > 0, onclick: function () {
          try { T.onayaGonder(t, ctx(), simdi()); } catch (e) { bildir(e.message, 'hata'); return; }
          kaydetHemen(); bildir('Onaya gönderildi. İçerik kilitlendi.', 'bilgi'); ciz();
        } }, 'Onaya gönder'),
        taslakPdf
      ]));
      if (engelGonder.length) eylemler.push(kucuk('"Onaya gönder" eksikler giderilince açılır. Taslak PDF her zaman alınabilir.'));
      eylemler.push(redKutusu());
    } else if (d === T.DURUM.BEKLIYOR) {
      var onayDugme = el('button', { type: 'button', class: 'dugme ana', id: 'onayla', disabled: kdvTeyitGerekli && !arayuz.kdvTeyitKutusu, onclick: function () {
        try { T.onayla(t, { kdvTeyit: arayuz.kdvTeyitKutusu }, ctx(), simdi()); } catch (e) { bildir(e.message, 'hata'); return; }
        arayuz.kdvTeyitKutusu = false;
        kaydetHemen();
        ciz();
        pdfIndir(t, rev.rev, 'nihai');
      } }, 'Onayla ve PDF oluştur');
      eylemler.push(kdvTeyitGerekli ? el('label', { class: 'onay-kutusu kdv-teyit' }, [
        el('input', { type: 'checkbox', id: 'kdv-teyit', checked: arayuz.kdvTeyitKutusu, onchange: function (e) { arayuz.kdvTeyitKutusu = e.target.checked; onayDugme.disabled = !e.target.checked; } }),
        el('span', null, 'KDV oranının ' + P.oranBicimle(rev.icerik.kdvBp) + ' olduğunu teyit ediyorum. (Bir kez sorulur; Ayarlar\'dan geri alınabilir.)')
      ]) : null);
      eylemler.push(el('div', { class: 'dugmeler' }, [
        el('button', { type: 'button', class: 'dugme ikincil', id: 'duzenle', onclick: function () { T.taslagaAl(t, simdi()); kaydetHemen(); ciz(); } }, 'Düzenle'),
        onayDugme,
        taslakPdf
      ]));
      eylemler.push(redKutusu());
    } else if (d === T.DURUM.ONAYLI) {
      var izin = T.nihaiPdfIzni(t, rev.rev);
      eylemler.push(el('div', { class: 'kutu kutu-basari' }, 'Onaylandı: ' + T.tarihSaatTR(rev.onayZamani) + ' · Rev. ' + rev.rev));
      if (!izin.izin) eylemler.push(el('div', { class: 'kutu kutu-hata' }, izin.neden));
      eylemler.push(el('div', { class: 'dugmeler' }, [
        el('button', { type: 'button', class: 'dugme ana', id: 'nihai-pdf', disabled: !izin.izin, onclick: function () { pdfIndir(t, rev.rev, 'nihai'); } }, 'Nihai PDF\'yi indir'),
        el('button', { type: 'button', class: 'dugme ikincil', id: 'onay-duzenle', onclick: function () { arayuz.duzenlemeModu[t.id] = true; git('#/teklif/' + encodeURIComponent(t.id) + '/teklif'); } }, 'Düzenle (yeni revizyon)')
      ]));
      eylemler.push(el('div', { class: 'kutu kutu-bilgi' }, [
        el('p', { text: 'Onaylamak veya PDF indirmek müşteriye gönderildiği anlamına gelmez. Bu uygulama mesaj veya e-posta göndermez.' }),
        el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', id: 'gonderildi-isaretle', onclick: function () {
          t.gonderimKayitlari.push({ zaman: simdi(), rev: rev.rev, not: 'Elle işaretlendi' });
          t.gecmis.push({ zaman: simdi(), olay: 'Müşteriye gönderildi olarak elle işaretlendi (Rev. ' + rev.rev + ')', rev: rev.rev });
          kaydetHemen(); ciz();
        } }, 'Müşteriye gönderdim (elle işaretle)'),
        t.gonderimKayitlari.length ? kucuk('Gönderim işaretleri: ' + t.gonderimKayitlari.map(function (g) { return 'Rev. ' + g.rev + ' · ' + T.tarihSaatTR(g.zaman); }).join('; ')) : kucuk('Gönderim kaydı yok.')
      ]));
    } else if (d === T.DURUM.RED) {
      eylemler.push(el('div', { class: 'dugmeler' }, [
        el('button', { type: 'button', class: 'dugme ikincil', onclick: function () { T.yenidenAc(t, simdi()); kaydetHemen(); ciz(); } }, 'Yeniden aç (taslağa al)')
      ]));
    }

    var revListe = el('ul', { class: 'rev-liste' }, t.revizyonlar.slice().reverse().map(function (r) {
      var iz = r.durum === T.DURUM.ONAYLI ? T.nihaiPdfIzni(t, r.rev) : null;
      return el('li', null, [
        el('span', { text: 'Rev. ' + r.rev + ' · ' }), rozet(r.durum),
        el('span', { text: ' · ' + T.tarihSaatTR(r.onayZamani || r.olusturma) + (r.yerineGelen != null ? ' · yerine Rev. ' + r.yerineGelen + ' açıldı' : '') }),
        iz && iz.izin && r !== rev ? el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', onclick: function () { pdfIndir(t, r.rev, 'nihai'); } }, 'Rev. ' + r.rev + ' PDF') : null,
        iz && !iz.izin ? el('span', { class: 'eksik-metin', text: ' bütünlük hatası' }) : null
      ]);
    }));

    return el('div', { class: 'sekme-onay' }, [
      el('section', { class: 'kart' }, [el('h2', { text: 'Durum' }), adimlar, engelListesi, uyariKutusu(uyarilar, 'uyari', 'Uyarılar (onayı durdurmaz)')].concat(eylemler)),
      el('section', { class: 'kart' }, [el('h2', { text: 'Müşterinin göreceği özet' }), kucuk('PDF\'de iç notlar, iskonto aralığı, stok kaydı ve uyarılar yer almaz.'), musteriOnizleme(t, rev)]),
      el('section', { class: 'kart' }, [
        el('h2', { text: 'Revizyonlar ve geçmiş' }),
        revListe,
        el('details', null, [el('summary', { text: 'Olay geçmişi (' + t.gecmis.length + ')' }),
          el('ul', { class: 'gecmis' }, t.gecmis.slice().reverse().map(function (g) { return el('li', { text: T.tarihSaatTR(g.zaman) + ' — ' + g.olay }); }))]),
        el('details', null, [el('summary', { text: 'PDF kayıtları (' + t.pdfKayitlari.length + ')' }),
          el('ul', { class: 'gecmis' }, t.pdfKayitlari.slice().reverse().map(function (p) { return el('li', { text: T.tarihSaatTR(p.zaman) + ' — ' + (p.tur === 'nihai' ? 'Nihai' : 'Taslak') + ' · Rev. ' + p.rev + ' · ' + p.dosya }); }))])
      ])
    ]);
  }

  // ---------------------------------------------------------------------------
  // 5) Teklif listesi + yedek
  // ---------------------------------------------------------------------------

  function sayfaListe() {
    var sayilar = { hepsi: veri.teklifler.length, taslak: 0, onay_bekliyor: 0, onaylandi: 0, reddedildi: 0 };
    veri.teklifler.forEach(function (t) { sayilar[T.durum(t)]++; });

    var listeAlani = turev(function () {
      var q = AY.katla(arayuz.arama.trim());
      var qRakam = arayuz.arama.replace(/\D/g, '');
      var sonuc = veri.teklifler.filter(function (t) {
        if (arayuz.filtre !== 'hepsi' && T.durum(t) !== arayuz.filtre) return false;
        if (!q) return true;
        var m = T.aramaMetni(t);
        return m.indexOf(q) !== -1 || (qRakam.length >= 4 && m.replace(/\D/g, ' ').indexOf(qRakam) !== -1);
      });
      if (!veri.teklifler.length) return el('div', { class: 'kutu kutu-bilgi' }, ['Henüz teklif yok. ', el('a', { href: '#/yeni' }, 'Yeni talep girin.')]);
      if (!sonuc.length) return el('p', { class: 'eksik-metin' }, 'Aramaya uyan teklif yok.');
      return el('ul', { class: 'teklif-liste', id: 'teklif-liste' }, sonuc.map(teklifSatiri));
    }, 'div');

    var aramaKutusu = el('input', { type: 'search', id: 'arama', value: arayuz.arama, placeholder: 'Müşteri, ürün, tarih, tutar veya teklif no',
      oninput: function (e) { arayuz.arama = e.target.value; turevGuncelle(); } });

    return el('div', { class: 'sayfa-liste' }, [
      el('h1', { text: 'Teklifler' }),
      el('div', { class: 'kart' }, [
        el('label', { for: 'arama', class: 'alan-etiket' }, 'Ara'),
        aramaKutusu,
        el('div', { class: 'filtreler', role: 'group', 'aria-label': 'Durum filtresi' }, [['hepsi', 'Tümü'], ['taslak', 'Taslak'], ['onay_bekliyor', 'Onay bekliyor'], ['onaylandi', 'Onaylandı'], ['reddedildi', 'Reddedildi']].map(function (f) {
          return el('button', { type: 'button', class: 'filtre' + (arayuz.filtre === f[0] ? ' secili' : ''), 'aria-pressed': arayuz.filtre === f[0] ? 'true' : 'false',
            onclick: function () { arayuz.filtre = f[0]; ciz(); } }, f[1] + ' (' + sayilar[f[0]] + ')');
        })),
        listeAlani
      ]),
      yedekKarti()
    ]);
  }

  function teklifSatiri(t) {
    var rev = T.aktifRev(t);
    var ic = rev.icerik;
    var h = T.hesapla(ic);
    var urunler = T.aktifSatirlar(ic).map(function (s) {
      return (s.urun ? s.urun.model : '“' + s.ham + '”') + (s.adet ? ' × ' + s.adet : '');
    }).join(', ') || 'ürün yok';
    var onceki = T.sonOnayliRev(t);
    return el('li', null, [el('a', { class: 'teklif-satir', href: '#/teklif/' + encodeURIComponent(t.id) + '/' + (rev.durum === T.DURUM.TASLAK ? 'analiz' : 'onay') }, [
      el('div', { class: 'satir-ust' }, [el('span', { class: 'no', text: t.no }), rozet(rev.durum), rev.rev ? el('span', { class: 'rev', text: 'Rev. ' + rev.rev }) : null,
        onceki && onceki !== rev ? el('span', { class: 'rev', text: 'Rev. ' + onceki.rev + ' onaylı' }) : null,
        t.test ? el('span', { class: 'etiket-test', text: 'TEST' }) : null]),
      el('div', { class: 'satir-alici', text: T.aliciEtiketi(ic.alici) || '(alıcı belirtilmedi)' }),
      el('div', { class: 'satir-alt' }, [
        el('span', { text: urunler }),
        el('span', { text: T.tarihTR(t.olusturma) }),
        el('span', { class: 'tutar', text: h.toplam ? P.bicimle(h.toplam.genelToplam) : '—' })
      ])
    ])]);
  }

  function yedekKarti() {
    var dosyaId = 'yedek-dosya';
    return el('section', { class: 'kart', id: 'yedek' }, [
      el('h2', { text: 'Yedek' }),
      el('div', { class: 'kutu kutu-uyari' }, 'Veriler yalnız bu cihazdaki bu tarayıcıda saklanır. Telefon ile bilgisayar arasında eşitleme yoktur. Tarayıcı verileri silinirse kayıtlar da silinir; düzenli yedek alın.'),
      kucuk('Son yedek: ' + (veri.ayarlar.sonYedek ? T.tarihSaatTR(veri.ayarlar.sonYedek) : 'hiç alınmadı') + ' · Kayıt sayısı: ' + veri.teklifler.length),
      el('div', { class: 'dugmeler' }, [
        el('button', { type: 'button', class: 'dugme ikincil', id: 'yedek-indir', onclick: yedekIndir }, 'Yedeği indir (.json)')
      ]),
      el('label', { for: dosyaId, class: 'alan-etiket' }, 'Yedekten geri yükle'),
      radyoGrubu('iceaktar-mod', [
        { deger: 'birlestir', etiket: 'Birleştir', aciklama: 'Yeni kayıtlar eklenir; aynı kayıtta daha güncel olan kalır.' },
        { deger: 'degistir', etiket: 'Tümünü değiştir', aciklama: 'Bu cihazdaki tüm teklifler yedektekilerle değiştirilir.' }
      ], arayuz.iceAktarMod, function (v) { arayuz.iceAktarMod = v; ciz(); }, { etiket: 'İçe aktarma yöntemi' }),
      el('input', { type: 'file', id: dosyaId, accept: 'application/json,.json', onchange: function (e) { var f = e.target.files && e.target.files[0]; if (f) yedekYukle(f); e.target.value = ''; } })
    ]);
  }

  function yedekIndir() {
    var z = simdi();
    var json = D.disaAktar(veri, z);
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = el('a', { href: url, download: 'teklif-asistani-yedek-' + z.slice(0, 10) + '.json' });
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1000);
    veri.ayarlar.sonYedek = z;
    kaydetHemen();
    bildir('Yedek indirildi. Dosya müşteri bilgisi içerir; güvenli yerde saklayın.', 'bilgi');
    ciz();
  }

  function yedekYukle(dosya) {
    var okuyucu = new FileReader();
    okuyucu.onload = function () {
      var gelen;
      try { gelen = D.iceAktarCoz(String(okuyucu.result)); } catch (e) { bildir(e.message, 'hata'); return; }
      if (arayuz.iceAktarMod === 'degistir' && !window.confirm('Bu cihazdaki ' + veri.teklifler.length + ' teklif silinip yedekteki ' + gelen.teklifler.length + ' teklif yüklenecek. Devam edilsin mi?')) return;
      if (veri.okumaHatasi) { veri.okumaHatasi = false; }
      var ozet = D.birlestir(veri, gelen, arayuz.iceAktarMod);
      kaydetHemen();
      var mesaj = 'Yedek yüklendi: ' + ozet.eklenen + ' eklendi, ' + ozet.guncellenen + ' güncellendi, ' + ozet.ayni + ' aynı' + (ozet.atlanan ? ', ' + ozet.atlanan + ' okunamadı' : '') + '.';
      if (ozet.noCakismasi.length) mesaj += ' Aynı numaralı farklı kayıt var: ' + ozet.noCakismasi.join(', ') + '.';
      if (gelen.butunlukUyarisi.length) mesaj += ' Bütünlük kontrolünden geçmeyen onaylı revizyon: ' + gelen.butunlukUyarisi.join(', ') + ' (nihai PDF verilmez).';
      bildir(mesaj, gelen.butunlukUyarisi.length || ozet.atlanan ? 'uyari' : 'bilgi');
      ciz();
    };
    okuyucu.onerror = function () { bildir('Dosya okunamadı.', 'hata'); };
    okuyucu.readAsText(dosya);
  }

  // ---------------------------------------------------------------------------
  // Ayarlar
  // ---------------------------------------------------------------------------

  function varsayilanKosulAyari(baslik, deger, kaydet, ad) {
    var v = deger || { secim: null, metin: '' };
    var metinId = 'ayar-' + ad + '-metin';
    return el('div', { class: 'kosul' }, [
      el('h3', { text: baslik }),
      radyoGrubu('ayar-' + ad, [
        { deger: null, etiket: 'Varsayılan yok (her teklifte karar verilir)' },
        { deger: 'deger', etiket: 'Varsayılan metin' },
        { deger: 'yok', etiket: 'Varsayılan: teklifte yer almasın' }
      ], v.secim, function (d) { kaydet(d ? { secim: d, metin: d === 'deger' ? v.metin : '' } : null); kaydetHemen(); ciz(); }, { etiket: baslik }),
      v.secim === 'deger' ? el('div', { class: 'alan' }, [
        el('label', { for: metinId, class: 'alan-etiket' }, 'Metin'),
        el('textarea', { id: metinId, rows: 2, maxlength: 1000, value: v.metin, oninput: function (e) { kaydet({ secim: 'deger', metin: e.target.value }); kaydetGecikmeli(); } })
      ]) : null,
      kucuk('Yalnız yeni tekliflere uygulanır. Uygulama değer önermez.')
    ]);
  }

  function sayfaAyarlar() {
    var s = K.sirket;
    var a = veri.ayarlar;
    var bolumler = [el('h1', { text: 'Ayarlar ve kaynaklar' })];

    bolumler.push(el('section', { class: 'kart' }, [
      el('h2', { text: 'Şirket bilgileri (degirmen.tr)' }),
      el('img', { src: AS[s.logo], alt: 'Değirmen logosu', class: 'logo-onizleme', width: 240, height: 46 }),
      el('dl', { class: 'bilgi-listesi' }, [
        ['Unvan', s.unvan], ['Adres', s.adres.join(', ')], ['Telefon', s.telefon], ['Cep/WhatsApp', s.cep], ['Faks', s.faks], ['E-posta', s.eposta], ['Web', s.web]
      ].map(function (r) { return [el('dt', { text: r[0] }), el('dd', { text: r[1] })]; }).reduce(function (x, y) { return x.concat(y); }, [])),
      kucuk('Kaynak: ' + s.kaynak.iletisim + ' ve ' + s.kaynak.logo + ' · alınma: ' + T.gunTR(s.kaynak.alinma) + '. ' + s.kaynak.not),
      el('h3', { text: 'Sitede bulunmayan şirket bilgileri (isteğe bağlı)' }),
      el('div', { class: 'alan' }, [el('label', { for: 'sirket-vd', class: 'alan-etiket' }, 'Vergi dairesi'),
        el('input', { id: 'sirket-vd', type: 'text', maxlength: 100, value: a.sirketEk.vergiDairesi, oninput: function (e) { a.sirketEk.vergiDairesi = e.target.value; kaydetGecikmeli(); } })]),
      el('div', { class: 'alan' }, [el('label', { for: 'sirket-vn', class: 'alan-etiket' }, 'Vergi no'),
        el('input', { id: 'sirket-vn', type: 'text', inputmode: 'numeric', maxlength: 20, value: a.sirketEk.vergiNo, oninput: function (e) { a.sirketEk.vergiNo = e.target.value; kaydetGecikmeli(); } })]),
      kucuk('Doldurulursa PDF üst bilgisinde görünür. Boşsa hiç yazılmaz.')
    ]));

    K.urunler.forEach(function (u0) {
      var u = T.urunEtkin(K, a, u0.id);
      var ek = a.urunEk[u.id] = a.urunEk[u.id] || {};
      var tic = u.ticari;
      var stokFormu = { tarih: simdi().slice(0, 10), ifade: '', mevcut: '', beklenen: '', beklenenTarih: '', not: '' };
      var tabanSayisi = (u0.ticari.stokKayitlari || []).length;
      bolumler.push(el('section', { class: 'kart' }, [
        el('h2', { text: u.marka + ' ' + u.model + ' — ' + u.ad }),
        el('h3', { text: 'Site bilgileri' }),
        kucuk(u.site.aciklama),
        kucuk('Kaynak: ' + u.site.kaynak.veri + ' (kayıt: ' + u.site.kaynak.kayitId + ') · görsel ' + u.site.gorselUrl + ' · katalog ' + u.site.katalogUrl + ' · alınma: ' + T.gunTR(u.site.kaynak.alinma)),
        el('h3', { text: 'Ticari bilgiler (' + tic.kaynak + ')' }),
        el('dl', { class: 'bilgi-listesi' }, [
          ['Liste fiyatı', P.bicimle(tic.listeFiyatiKurus) + (tic.kdvDahil ? ' (KDV dahil)' : ' (KDV hariç)')],
          ['İskonto aralığı', '%' + tic.iskontoAraligi.min + '–%' + tic.iskontoAraligi.max + ' (her teklifte siz seçersiniz)'],
          ['Ödeme', tic.odeme],
          ['Teslim (stokta)', tic.teslim.stokta],
          ['Teslim (stokta değil)', tic.teslim.stoktaDegil],
          ['Sevk bedeli', 'teyit edilmedi'],
          ['Garanti', 'teyit edilmedi'],
          ['Teklif geçerliliği', 'teyit edilmedi']
        ].map(function (r) { return [el('dt', { text: r[0] }), el('dd', { text: r[1] })]; }).reduce(function (x, y) { return x.concat(y); }, [])),
        kucuk('Fiyat ve iskonto aralığı kod içindeki kayıttan (data/catalog.js) gelir; değiştirmek için o dosyayı güncelleyin.'),
        el('h3', { text: 'Stok kayıtları (tarihli, yalnız eklenir)' }),
        el('ul', { class: 'stok-liste' }, tic.stokKayitlari.map(function (k, i) {
          return el('li', null, [
            el('strong', { text: T.gunTR(k.tarih) + ' · ' + k.kaynak + ': ' }),
            '“' + k.ifade + '” — mevcut stok: ' + (k.mevcutStok == null ? 'bilinmiyor' : k.mevcutStok) + ', beklenen giriş: ' + (k.beklenenGiris == null ? 'bilinmiyor' : k.beklenenGiris) + ', tarih: ' + (k.beklenenTarih ? T.gunTR(k.beklenenTarih) : 'teyitsiz'),
            k.not ? kucuk(k.not) : null,
            i >= tabanSayisi ? el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', onclick: function () {
              ek.stokKayitlari.splice(i - tabanSayisi, 1); kaydetHemen(); ciz();
            } }, 'Hatalı kaydı sil') : null
          ]);
        })),
        el('details', { class: 'stok-ekle' }, [
          el('summary', { text: 'Yeni stok kaydı ekle' }),
          ayarAlani('stok-tarih', 'Kayıt tarihi', 'date', stokFormu.tarih, function (v) { stokFormu.tarih = v; }),
          ayarAlani('stok-ifade', 'Verilen bilgi (olduğu gibi)', 'text', '', function (v) { stokFormu.ifade = v; }),
          ayarAlani('stok-mevcut', 'Mevcut stok (bilinmiyorsa boş)', 'number', '', function (v) { stokFormu.mevcut = v; }),
          ayarAlani('stok-beklenen', 'Beklenen giriş adedi (bilinmiyorsa boş)', 'number', '', function (v) { stokFormu.beklenen = v; }),
          ayarAlani('stok-beklenen-tarih', 'Kesin giriş tarihi (teyitsizse boş)', 'date', '', function (v) { stokFormu.beklenenTarih = v; }),
          ayarAlani('stok-not', 'Not', 'text', '', function (v) { stokFormu.not = v; }),
          el('button', { type: 'button', class: 'dugme ikincil', onclick: function () {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(stokFormu.tarih) || !stokFormu.ifade.trim()) { bildir('Tarih ve verilen bilgi zorunlu.', 'uyari'); return; }
            var sayi = function (x) { return /^\d{1,6}$/.test(String(x).trim()) ? Number(x) : null; };
            ek.stokKayitlari = ek.stokKayitlari || [];
            ek.stokKayitlari.push({ id: 'stok-' + T.kimlik().slice(0, 8), tarih: stokFormu.tarih, kaynak: 'Kullanıcı kaydı', ifade: stokFormu.ifade.trim(),
              mevcutStok: sayi(stokFormu.mevcut), beklenenGiris: sayi(stokFormu.beklenen), beklenenTarih: stokFormu.beklenenTarih || null, not: stokFormu.not.trim() || null });
            kaydetHemen(); bildir('Stok kaydı eklendi.', 'bilgi'); ciz();
          } }, 'Kaydı ekle')
        ]),
        varsayilanKosulAyari('Varsayılan garanti metni (' + u.model + ')', ek.garanti, function (v) { ek.garanti = v; }, 'garanti-' + u.id)
      ]));
    });

    bolumler.push(el('section', { class: 'kart' }, [
      el('h2', { text: 'KDV' }),
      el('div', { class: 'alan' }, [
        el('label', { for: 'ayar-kdv', class: 'alan-etiket' }, 'Yeni teklifler için KDV oranı'),
        el('select', { id: 'ayar-kdv', onchange: function (e) { a.kdv.varsayilanBp = Number(e.target.value); kaydetHemen(); ciz(); } },
          T.KDV_SECENEKLERI.map(function (bp) { return el('option', { value: String(bp), selected: a.kdv.varsayilanBp === bp }, P.oranBicimle(bp)); }))
      ]),
      a.kdv.teyitliBp != null
        ? el('p', null, ['Teyitli oran: ' + P.oranBicimle(a.kdv.teyitliBp) + ' (' + T.tarihSaatTR(a.kdv.teyitZamani) + ') ',
          el('button', { type: 'button', class: 'dugme ikincil kucuk-dugme', onclick: function () { a.kdv.teyitliBp = null; a.kdv.teyitZamani = null; kaydetHemen(); ciz(); } }, 'Teyidi geri al')])
        : kucuk('KDV oranı henüz teyit edilmedi. %20, örnek şirket tekliflerinde kullanılan orandır; ilk nihai onayda teyit istenir.', 'eksik-metin')
    ]));

    bolumler.push(el('section', { class: 'kart' }, [
      el('h2', { text: 'Varsayılan teklif koşulları' }),
      varsayilanKosulAyari('Sevk bedeli', a.varsayilan.sevk, function (v) { a.varsayilan.sevk = v; }, 'sevk'),
      varsayilanKosulAyari('Teklif geçerliliği', a.varsayilan.gecerlilik, function (v) { a.varsayilan.gecerlilik = v; }, 'gecerlilik')
    ]));

    bolumler.push(el('section', { class: 'kart' }, [
      el('h2', { text: 'Teklif numarası' }),
      el('div', { class: 'alan' }, [
        el('label', { for: 'cihaz-kodu', class: 'alan-etiket' }, 'Cihaz kodu (1–3 harf/rakam)'),
        el('input', { id: 'cihaz-kodu', type: 'text', maxlength: 3, value: a.cihazKodu, autocapitalize: 'characters', oninput: function (e) {
          var v = e.target.value.toLocaleUpperCase('tr-TR').replace(/[^A-Z0-9]/g, '');
          if (v) { a.cihazKodu = v; kaydetGecikmeli(); }
        } })
      ]),
      kucuk('Biçim: TKL-YYAAGG-' + a.cihazKodu + '01. Telefon ve bilgisayarda farklı kod kullanırsanız iki cihazda aynı numara oluşmaz.')
    ]));

    var boyut = 0;
    try { boyut = (localStorage.getItem(D.ANAHTAR) || '').length; } catch (e) { boyut = 0; }
    bolumler.push(el('section', { class: 'kart' }, [
      el('h2', { text: 'Veri ve bağlantılar' }),
      el('ul', null, [
        el('li', { text: 'Saklama: bu tarayıcının yerel deposu (yaklaşık ' + Math.ceil(boyut / 1024) + ' KB). Cihazlar arası eşitleme yok.' }),
        el('li', { text: 'Ayrıştırma: kurallı eşleştirme. Yapay zekâ bağlı değil.' }),
        el('li', { text: 'WhatsApp / e-posta entegrasyonu: bağlı değil. Uygulama hiçbir mesaj göndermez.' }),
        el('li', { text: 'Ağ: uygulama çalışırken dış sunucuya veri göndermez; katalog ve ürün sayfası bağlantıları yalnız siz tıklayınca açılır.' })
      ]),
      el('details', { class: 'tehlike-bolge' }, [
        el('summary', { text: 'Tüm verileri sil' }),
        kucuk('Önce yedek alın. Onay için kutuya SİL yazın.'),
        el('label', { for: 'sil-onay', class: 'gizli' }, 'Onay metni'),
        el('input', { id: 'sil-onay', type: 'text', maxlength: 3 }),
        el('button', { type: 'button', class: 'dugme tehlike', onclick: function () {
          var g = document.getElementById('sil-onay');
          if (!g || g.value.trim().toLocaleUpperCase('tr-TR') !== 'SİL') { bildir('Silmek için kutuya SİL yazın.', 'uyari'); return; }
          var kod = veri.ayarlar.cihazKodu;
          veri = D.bosVeri();
          veri.ayarlar.cihazKodu = kod;
          kaydetHemen(); bildir('Tüm veriler silindi.', 'uyari'); git('#/yeni');
        } }, 'Tüm verileri sil')
      ])
    ]));
    return el('div', { class: 'sayfa-ayarlar' }, bolumler);
  }

  function ayarAlani(id, etiket, tip, deger, degisti) {
    return el('div', { class: 'alan' }, [
      el('label', { for: id, class: 'alan-etiket' }, etiket),
      el('input', { id: id, type: tip, value: deger, min: tip === 'number' ? 0 : null, oninput: function (e) { degisti(e.target.value); } })
    ]);
  }

  // ---------------------------------------------------------------------------
  // Başlat
  // ---------------------------------------------------------------------------

  if (yukleme.hatalar.length) bildir(yukleme.hatalar.join(' '), yukleme.depoYok || veri.okumaHatasi ? 'hata' : 'uyari');
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* güvenli bağlam değilse desteklenmez */ }
  if (!yukleme.depoYok && !veri.okumaHatasi) kaydetHemen(); // ilk açılışta cihaz kodunu kalıcı yap
  ciz();
})();
