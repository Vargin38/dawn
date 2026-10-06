/*
 * Para hesapları — tamamen kuruş (tam sayı) üzerinden, BigInt ile.
 * Sıra: önce iskonto, sonra KDV. Yuvarlama: yarım kuruş yukarı (ROUND_HALF_UP).
 * Oranlar "baz puan" (bp) ile tutulur: %10 = 1000 bp, %20 KDV = 2000 bp.
 */
(function (root) {
  'use strict';

  var BP = 10000n;

  function bi(n, ad) {
    if (typeof n === 'bigint') return n;
    if (typeof n !== 'number' || !Number.isSafeInteger(n)) {
      throw new Error((ad || 'değer') + ' tam sayı olmalı: ' + n);
    }
    return BigInt(n);
  }

  // a * b / c, yarım yukarı yuvarlanmış (pozitif değerler için).
  function carpBolYuvarla(a, b, c) {
    var pay = a * b;
    var bolum = pay / c;
    var kalan = pay % c;
    if (kalan * 2n >= c) bolum += 1n;
    return bolum;
  }

  /*
   * Satır hesabı.
   *  birimKurus: liste birim fiyatı (KDV hariç), kuruş
   *  adet: pozitif tam sayı
   *  iskontoBp: 0..10000
   * İskontolu birim fiyat kuruşa yuvarlanır; satır tutarı = iskontolu birim × adet.
   * Böylece müşteri "birim × adet" çarpımını belgeden doğrulayabilir.
   */
  function satirHesapla(birimKurus, adet, iskontoBp) {
    var b = bi(birimKurus, 'birim fiyat');
    var a = bi(adet, 'adet');
    var i = bi(iskontoBp, 'iskonto');
    if (b < 0n) throw new Error('birim fiyat negatif olamaz');
    if (a < 1n) throw new Error('adet en az 1 olmalı');
    if (i < 0n || i > BP) throw new Error('iskonto 0–100% arasında olmalı');
    var iskontoluBirim = carpBolYuvarla(b, BP - i, BP);
    var brut = b * a;
    var net = iskontoluBirim * a;
    return {
      listeBirim: b,
      iskontoluBirim: iskontoluBirim,
      adet: a,
      brut: brut,
      iskontoTutari: brut - net,
      net: net
    };
  }

  /*
   * Teklif toplamı: satır netleri toplanır, KDV toplam net üzerinden bir kez hesaplanır.
   */
  function toplamHesapla(satirlar, kdvBp) {
    var k = bi(kdvBp, 'KDV');
    if (k < 0n || k > BP) throw new Error('KDV oranı geçersiz');
    var brut = 0n, iskonto = 0n, net = 0n;
    satirlar.forEach(function (s) {
      brut += s.brut;
      iskonto += s.iskontoTutari;
      net += s.net;
    });
    var kdv = carpBolYuvarla(net, k, BP);
    return { brut: brut, iskonto: iskonto, net: net, kdvBp: k, kdv: kdv, genelToplam: net + kdv };
  }

  // 3600000n -> "36.000,00 TL"
  function bicimle(kurus, birimEkle) {
    var k = bi(kurus);
    var negatif = k < 0n;
    if (negatif) k = -k;
    var lira = (k / 100n).toString();
    var kr = (k % 100n).toString().padStart(2, '0');
    var gruplu = lira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (negatif ? '−' : '') + gruplu + ',' + kr + (birimEkle === false ? '' : ' TL');
  }

  // "%10", "%12,5"
  function oranBicimle(bp) {
    var b = Number(bp);
    var tam = Math.floor(b / 100);
    var ondalik = b % 100;
    if (ondalik === 0) return '%' + tam;
    return '%' + tam + ',' + String(ondalik).padStart(2, '0').replace(/0$/, '');
  }

  // "40.000" / "40000" / "40.000,50" -> kuruş (Number). Geçersizse null.
  function tlCoz(metin) {
    if (metin == null) return null;
    var s = String(metin).trim().replace(/\s|TL|₺/gi, '');
    if (!/^\d{1,3}(\.\d{3})*(,\d{1,2})?$|^\d+(,\d{1,2})?$/.test(s)) return null;
    var p = s.replace(/\./g, '').split(',');
    var kurus = Number(p[0]) * 100 + (p[1] ? Number(p[1].padEnd(2, '0')) : 0);
    return Number.isSafeInteger(kurus) ? kurus : null;
  }

  var PARA = {
    satirHesapla: satirHesapla,
    toplamHesapla: toplamHesapla,
    bicimle: bicimle,
    oranBicimle: oranBicimle,
    tlCoz: tlCoz,
    yuzdeBp: function (yuzde) { return Math.round(Number(yuzde) * 100); }
  };

  root.TA = root.TA || {};
  root.TA.para = PARA;
  if (typeof module === 'object' && module.exports) module.exports = PARA;
})(typeof window !== 'undefined' ? window : globalThis);
