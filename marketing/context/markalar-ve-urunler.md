# Markalar ve ürün grupları

Kaynak: tema dosyaları ve mağaza sahibinin teyitleri. Yeni bilgi teyit edildikçe bu dosyayı güncelle.

## Markalar
| Marka | Ne | Distribütörlük (sitede yazan) |
| :- | :- | :- |
| Kett | Tahıl nem ölçerler, pamuk rutubet, pirinç/un beyazlık ölçerler | "Kett ve HAWO Türkiye distribütörü" |
| HAWO | Poşet yapıştırma (el tipi, impuls) | Aynı |
| EUROMESH | Naylon elek, polyester filtre ve serigrafi baskı bezleri | Değirmen'in kendi markası (mağaza sahibi, 2026-10-04); "distribütör" deme |
| Newlong | Çuval dikiş makineleri | Türkiye distribütörü (mağaza sahibi, 2026-10-04) |
| Newport, Böttcher | Mağazada bu vendor adlarıyla ürün var | **Teyit gerekli**: ne ürünü, distribütörlük durumu |

## Koleksiyonlar (handle)
- `kalite-kontrol-ve-laboratuvar-cihazlari` — Kett ürünleri (6 ürün, hepsi vendor "Kett"; 2026-10-04)
- `tahil-rutubet-olcme-cihazlari` — Kett PM serisi
- `genel-rutubet-olcme-cihazlari` — Kett HX-500 pamuk rutubet (1 ürün)
- `beyazlik-olcerler` — Kett beyazlık ölçerler (pirinç, un, toz)
- `numune-hazirlama-cihazlari`
- `ambalaj-makineleri` — HAWO + Newlong
- `hawo-yapistirma-makineleri`
- `gida-isleme`
- `euromesh-elek-ve-filtre-bezleri`, `euromesh-baski-bezleri`, `tekstil`

## Teyit edilmiş bilgiler (mağaza sahibi, 2026-10-04)
- Kett cihazlarında **kurulum ve kullanım eğitimi verilmiyor**.
- Kett **yedek parçaları mevcut**.
- PM-450 dışında da **fiyatlı Kett modelleri var**.
- HX-500 için "pamuk ve farklı endüstriyel numunelerde rutubet tayini" ifadesi doğru.
- EUROMESH Değirmen'in kendi markası; Newlong'un Türkiye distribütörüyüz.

## Satış modeli
- Fiyatlı ürün → sepete ekle, kartla öde (KDV dahil). Kargo ücreti alıcıya ait.
- Fiyatsız ürün → "Teklif İste" formu; dönüş genellikle 24 saat içinde.

## Bilinen tutarsızlıklar
- ~~`snippets/dg-urun-cta.liquid`: Kett ürün sayfalarında "kurulum" vaadi~~ Repoda düzeltildi (2026-10-04): Kett ve Newlong için "servis ve yedek parça desteğiyle"; HAWO metni değişmedi. Canlı temaya elle uygulanmalı.
- `sections/dg-urun-guven.liquid`: Newlong ürünleri artık "Türkiye distribütörü" kartını gösteriyor (repoda; canlıya elle).
- `snippets/dg-collection-description.liquid` (`kalite-kontrol-ve-laboratuvar-cihazlari`): yedek açıklamada "kurulum" var; Shopify'da koleksiyon açıklaması dolu olduğu için görünmüyor.
- `templates/index.json` ana sayfa: "cihaz seçiyor, kuruyor ve servis veriyoruz" — tüm markalar için genel ifade; Kett için kurulum yok.
- HAWO için kurulum hizmeti teyit edilmedi (ürün sayfasında "kurulum" yazıyor).

## Teyit bekleyenler
- Kett teknik değerleri (50 MHz, %1–40, 240 mL; C-600 5,0–69,9) hangi modellere ait?
- Kett distribütörlüğü hangi yıldan beri?
- Garanti süresi/kapsamı, kalibrasyon hizmeti.
