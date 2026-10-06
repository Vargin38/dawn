/*
 * Ürün ve şirket kaynak verisi.
 *
 * İki ayrı kaynak var ve karıştırılmamalı:
 *  - `site`: degirmen.tr'den alınan bilgiler (ad, açıklama, teknik özellik, görsel,
 *    katalog, logo, iletişim). Kaynak URL'si ve alınma tarihi yanında.
 *  - `ticari`: fiyat, iskonto, KDV, stok, teslim ve ödeme. YALNIZ şirket yetkilisinin
 *    verdiği bilgiler. Bilinmeyen alan null bırakılır; uygulama bunları teyit ister.
 *
 * Yeni ürün eklemek için URUNLER dizisine aynı yapıda bir kayıt ekleyin.
 * Ayrıştırıcı `eslesme.desenler` (kesin eşleşme) ve `eslesme.belirsiz`
 * (tek başına geçerse yalnız aday olarak gösterilecek ifade) alanlarını kullanır.
 */
(function (root) {
  'use strict';

  var ALINMA_TARIHI = '2026-10-06';

  var SIRKET = {
    unvan: 'Değirmen Sanayi ve Ticaret A.Ş.',
    kisaAd: 'Değirmen',
    adres: ['Değirmen Plaza, Mehmet Akif Mah. Bahariye Cad. Akarsu Sk. No:4', '34307 İkitelli / İstanbul'],
    telefon: '+90 212 494 33 33',
    cep: '+90 541 889 00 92',
    faks: '+90 212 494 24 14',
    eposta: 'info@degirmen.com.tr',
    web: 'degirmen.tr',
    logo: 'degirmen-logo', // data/assets.js anahtarı
    // Sitede bulunmayan bilgiler: boş. Gerekirse Ayarlar ekranından girilir.
    vergiDairesi: null,
    vergiNo: null,
    kaynak: {
      iletisim: 'https://degirmen.tr/iletisim.html',
      logo: 'https://degirmen.tr/assets/degirmen-logo.png',
      alinma: ALINMA_TARIHI,
      not: 'Adres, telefon, faks ve e-posta iletisim.html sayfasından; logo sitedeki degirmen-logo.png dosyasından (kenar boşluğu kırpıldı, 450 px genişliğe küçültüldü).'
    }
  };

  var URUNLER = [
    {
      id: 'kett-pm-450',
      marka: 'KETT',
      model: 'PM-450',
      ad: 'Tahıl Rutubet Ölçme Cihazı',
      eslesme: {
        // PM450, PM-450, PM 450, pm‑450 (farklı tire karakterleri) — ardından rakam gelmez.
        desenler: ['PM[\\s\\-\\u2010-\\u2015\\u2212_.]?450(?!\\d)'],
        // "450" tek başına: kesin eşleşme yapılmaz, yalnız aday olarak gösterilir.
        belirsiz: ['450'],
        // Model yazılmadan ürün türü anılırsa aday olarak gösterilir.
        anahtarKelimeler: ['tahil nem', 'tahil rutubet', 'nem olcer', 'nem olcum', 'rutubet olcer', 'rutubet olcum', 'nem olcme', 'rutubet olcme']
      },
      site: {
        aciklama: 'Entegre tartı ve sıcaklık düzeltmesiyle tahıl, tohum ve benzeri numunelerde hızlı rutubet ölçümü.',
        ozellikler: [
          ['Hızlı ve kolay ölçüm', 'Numune hazneye döküldüğünde cihaz rutubet değerini dijital ekranda hızlı şekilde gösterir.'],
          ['Otomatik düzeltme', 'Entegre tartı ve termistör sayesinde yoğunluk ve sıcaklık değişimleri otomatik olarak dengelenir.'],
          ['Geniş ürün kalibrasyonu', 'Tahıl, tohum, kahve, fındık ve benzeri birçok ürün için tanımlanmış kalibrasyonlarla çalışır.'],
          ['Taşınabilir kullanım', 'Hafif gövdesi, pil ile çalışması ve otomatik kapanma özelliğiyle sahada kullanıma uygundur.']
        ],
        teknik: [
          ['Ölçüm prensibi', 'Kapasitans / dielektrik, 50 MHz'],
          ['Uygulamalar', 'Tahıllar, tohumlar ve ürüne bağlı diğer numuneler'],
          ['Ölçüm aralığı', 'Numuneye bağlı olarak %1–40'],
          ['Numune hacmi', '240 mL'],
          ['Çalışma sıcaklığı', '0–40 °C'],
          ['Ekran', 'Dijital LCD'],
          ['Fonksiyonlar', 'Tartı, otomatik sıcaklık düzeltme, ortalama ve otomatik kapanma'],
          ['Güç kaynağı', '4 adet 1,5 V AA alkalin pil'],
          ['Boyutlar', '125 × 205 × 215 mm'],
          ['Ağırlık', 'Yaklaşık 1,3 kg'],
          ['Standart aksesuarlar', 'Huni, numune kabı, fırça, piller ve kullanım kılavuzu']
        ],
        teknikKaynakNotu: 'Kett PM-450 kataloğu, "Specification / Özellikler : Version 4501" tablosu (sitede "doğrulandı" işaretli).',
        gorsel: 'kett-pm-450', // data/assets.js anahtarı
        gorselUrl: 'https://degirmen.tr/assets/products/tahil-rutubet-olcme-cihazi-kett-pm450-50b7f3c5.jpg',
        katalogUrl: 'https://degirmen.tr/assets/catalogs/tahil-rutubet-olcme-cihazi-kett-pm450-katalog-5b26d127.pdf',
        urunSayfasi: 'https://degirmen.tr/product.html?product=Tah%C4%B1l%20Rutubet%20%C3%96l%C3%A7me%20Cihaz%C4%B1%20Kett%20PM450',
        kaynak: {
          veri: 'https://degirmen.tr/catalog-data.js?v=20260910f',
          kayitId: 'tahil-rutubet-olcme-cihazi-kett-pm450',
          alinma: ALINMA_TARIHI
        }
      },
      ticari: {
        kaynak: 'Şirket yetkilisinin verdiği bilgi (6 Ekim 2026)',
        listeFiyatiKurus: 4000000, // 40.000,00 TL
        paraBirimi: 'TRY',
        kdvDahil: false,
        iskontoAraligi: { min: 10, max: 20 }, // yüzde; seçim kullanıcıya ait, otomatik seçilmez
        stokKayitlari: [
          {
            id: 'stok-2026-10-06',
            tarih: '2026-10-06',
            kaynak: 'Şirket yetkilisi',
            ifade: 'hafta içi 12 tane gelecek',
            mevcutStok: null, // bilinmiyor
            beklenenGiris: 12,
            beklenenTarih: null, // kesin tarih teyitsiz
            not: 'Mevcut stok 12 demek değildir. "Hafta içi" ifadesi 6 Ekim 2026 tarihli bildirime aittir; sonraki günlerde "bu hafta" diye yeniden yorumlanmaz.'
          }
        ],
        teslim: {
          stokta: 'Stoktan teslim: ödeme sonrası ertesi gün.',
          stoktaDegil: 'Ödeme sonrası 1–2 hafta içinde teslim.'
        },
        odeme: 'Ödeme sonrası teslimat.',
        // Teyit edilmedi — uydurulmaz. Her teklifte kullanıcı karar verir.
        sevkBedeli: null,
        garanti: null,
        gecerlilik: null
      }
    }
  ];

  var KATALOG = { sirket: SIRKET, urunler: URUNLER, alinmaTarihi: ALINMA_TARIHI };

  root.TA = root.TA || {};
  root.TA.katalog = KATALOG;
  if (typeof module === 'object' && module.exports) module.exports = KATALOG;
})(typeof window !== 'undefined' ? window : globalThis);
