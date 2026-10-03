# Kamuya açık fiyat listesi örnekleri — format analizi

İndirme: 2026-10-04 01:51–02:10 TSİ (curl). Dosyaların kendisi depoya eklenmedi (üçüncü taraf belgeleri); bağlantı, hash ve çıkarılan metin özeti burada.

## 1. Standart Civata — Hırdavat Fiyat Listesi (Ekim 2026)
- URL: https://standartcivata.com.tr/wp-content/uploads/documents/tr/fiyat-listeleri/hirdavat-fiyat-listesi.pdf
- SHA-256: 61e451baa0c3a72e291d0a508d5a8ddb6ad7810edcb74c7b6f825a12ecd50a07
- PDF bilgisi: 13 sayfa; Creator "Adobe Illustrator 30.8"; CreationDate 2026-10-02 12:01 UTC. Arama sonucunda aynı URL "EYLÜL 2026" başlığıyla görünüyordu; okunan dosya "EKİM 2026" → aynı adrese aylık yeni liste konuyor (çıkarım; önceki sürüm arşivden doğrulanamadı: web.archive.org proxy üzerinden erişilemedi).
- Sütunlar: SAP KOD (9 hane), STOK İSMİ, KOLİ İÇİ, NET SATIŞ FİYATI + para birimi.
- Ölçüm: 219 farklı SAP kodu; 13 haneli barkod: 0. Fiyat satırlarında para birimi: USD 105, TL 72, EUR 6 (basit kural ile ayrıştırılanlar); ayrıca "TRY" yazımı da var (aynı listede TL ve TRY birlikte).
- Basit kural (kod + ad + koli + fiyat + para birimi) ile otomatik ayrıştırılan: 183/219 (%84). Ayrışmayanlar: ad ile koli adedi arasında boşluk yok, "TRY" yazımı, 3 ondalıklı fiyat (0,375 USD), iki sütunlu sayfa düzeni.

## 2. Dekor — Ürün ve Barkod Listesi (30.01.2026)
- URL: https://cdn.prod.website-files.com/6974c5dd94243ffc3632334c/69aec3ffef126b8f99162c45_Dekor%202026%20U%CC%88ru%CC%88n%20ve%20Koli%20Barkod%20Listesi.pdf
- SHA-256: 5dec11ea2b123e16b74b15e7e6939ce6b34f7b15f3e5db169241fe50b622d5fa
- PDF bilgisi: 7 sayfa; Creator "Excel için Acrobat PDFMaker 25" (Excel'den PDF'e çevrilmiş); CreationDate 2026-01-29.
- Sütunlar: KOD, BOY, ÜRÜN ADI, FİYAT, KOLİ, ÜRÜN BARKOD, KOLİ BARKOD. KDV dahil/hariç ibaresi yok; para birimi yazılmamış.
- Ölçüm: 834 barkod geçişi; 421 ürün satırı ayrıştırıldı; 393 satırda ayrıca koli barkodu; 25 satırda koli adedi yok (stand/teşhir ürünleri).

## 3. Schneider Electric — Elektrik Tesisat ve Kontrol Ürünleri Fiyat Listesi (xlsx, bir bayi sitesinde)
- URL: https://www.bayberkelektrik.com/fiyat-listeleri/schneider-fiyat-listesi.xlsx
- SHA-256: 9452d1ecaed9bbd5fd195f282d96af4949aabb21c52aec2c8ee38afc1daab2ae
- Excel özellikleri: oluşturma 2025-07-08, değişiklik 2025-07-09. İkinci satır: "23 Temmuz 2025 tarihinden itibaren geçerlidir." (Bayi sitesindeki dosya güncel olmayabilir.)
- Sütunlar: Sıra, Aktivite, Referans, Açıklama, Seri, Fiyat, Para Birimi; 3.222 satırlık sayfa; para birimi EUR; barkod yok (üretici referans kodu).

## 4. Elektrik malzemesi sitelerinde liste biçimi (bağlantı sayımı)
- baytekotomasyon.com/fiyatlar: 52 PDF bağlantısı, 0 Excel
- bayberkelektrik.com/fiyat-listesi: 26 PDF, 1 Excel (yukarıdaki Schneider)
- elektrikmarket.com.tr (elektrik malzemesi markaları ve fiyat listesi sayfası): 42 PDF, 0 Excel
- (ankamuh.com ve gataelektrik.com ana sayfalarında doğrudan dosya bağlantısı bulunamadı)

## 5. Pet / kozmetik / aksesuar toptancılarında fiyat paylaşımı (sayfa metni)
- bayi.pelagos.com.tr: ürün sayfalarında "Ürünün fiyatını görmek için bayi girişi yapınız"; "Fiyat Listeleri" sayfası "Fiyat listelerini görebilmek için" girişe yönlendiriyor.
- patiyapetshop.com: "Düzenli alım yapan işletmelere özel fiyat listesi hazırlıyoruz; WhatsApp veya iletişim sayfamız üzerinden bize ulaşabilirsiniz."
- toptantr.com: B2B pazaryeri; "Excelle Sepet Doldur", "Entegrasyonlar" menüleri.
- toptananadolu.com: "Bayilik Satış Platformu", "Dropshipping" menüleri.
- auristoptan.com: 403 (erişim engeli; tekrar denenmedi). petibom.com: 522 (sunucu hatası).
