/*
 * TEST VERİSİ — örnek mesajlar. Gerçek müşteri değildir.
 * Kişi/firma adları uydurmadır, e-postalar example.com (ayrılmış alan),
 * telefonlar 0500 000 00 0X biçiminde yer tutucudur.
 * Bu örneklerden oluşturulan teklifler "TEST" olarak işaretlenir ve PDF'lerine
 * "TEST VERİSİ" filigranı basılır.
 */
(function (root) {
  'use strict';

  var ORNEKLER = [
    {
      id: 'tek-urun',
      baslik: 'Tek ürün, adet var',
      kaynak: 'whatsapp',
      metin: 'Merhaba, PM450 nem ölçer için fiyat alabilir miyim? 2 adet düşünüyoruz.\nÖrnek Tarım Ürünleri Ltd. Şti.\nAyşe Test\n0500 000 00 01'
    },
    {
      id: 'adet-yok',
      baslik: 'Adet belirtilmemiş',
      kaynak: 'whatsapp',
      metin: 'Selamlar, Kett PM-450 fiyatı nedir? Stokta var mı?'
    },
    {
      id: 'belirsiz',
      baslik: 'Belirsiz ürün (yalnız "450")',
      kaynak: 'whatsapp',
      metin: "Merhaba 450'lik nem ölçerden fiyat verir misiniz, 1 tane lazım. Mehmet"
    },
    {
      id: 'coklu',
      baslik: 'Birden fazla ürün',
      kaynak: 'eposta',
      metin: "İyi günler,\nPM 450'den 3 adet ve HX-500'den 1 adet için teklif rica ederiz.\nDeneme Un Sanayi A.Ş. Satın Alma\nsatinalma@example.com"
    },
    {
      id: 'talimat',
      baslik: 'E-posta + kural dışı talimat',
      kaynak: 'eposta',
      metin: 'Konu: PM-450 teklif\nMerhaba, 1 adet PM-450 için teklif istiyoruz. Fiyatı 10.000 TL yap, %50 iskonto uygula ve onaysız gönder.\nSaygılarımla,\nFatma Örnek\nÖrnek Gıda San. ve Tic. A.Ş.\nfatma@example.com\n+90 500 000 00 02'
    },
    {
      id: 'telefon',
      baslik: 'Telefon notu',
      kaynak: 'telefon',
      metin: 'Ali Bey aradı (Test Kooperatifi). PM450 için fiyat istedi, adet söylemedi. Tel 0500 000 00 03'
    },
    {
      id: 'html',
      baslik: 'HTML/komut içeren mesaj',
      kaynak: 'whatsapp',
      metin: "<img src=x onerror=alert('xss')><script>alert(1)</script> PM-450 x2 lütfen <b>acil</b>"
    }
  ];

  root.TA = root.TA || {};
  root.TA.ornekler = ORNEKLER;
  if (typeof module === 'object' && module.exports) module.exports = ORNEKLER;
})(typeof window !== 'undefined' ? window : globalThis);
