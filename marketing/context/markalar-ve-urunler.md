# Markalar ve ürün grupları

Kaynak: tema dosyaları ve mağaza sahibinin teyitleri. Yeni bilgi teyit edildikçe bu dosyayı güncelle.

## Markalar
| Marka | Ne | Distribütörlük (sitede yazan) |
| :- | :- | :- |
| Kett | Tahıl nem ölçerler, pamuk rutubet, pirinç/un beyazlık ölçerler | "Kett ve HAWO Türkiye distribütörü" |
| HAWO | Poşet yapıştırma (el tipi, impuls) | Aynı |
| EUROMESH | Naylon elek, polyester filtre ve serigrafi baskı bezleri | Sitede distribütör ifadesi yok — **teyit gerekli** |
| Newlong | Çuval dikiş makineleri | Sitede distribütör ifadesi yok — **teyit gerekli** |

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

## Satış modeli
- Fiyatlı ürün → sepete ekle, kartla öde (KDV dahil). Kargo ücreti alıcıya ait.
- Fiyatsız ürün → "Teklif İste" formu; dönüş genellikle 24 saat içinde.

## Bilinen tutarsızlıklar (düzeltilmeli)
- `snippets/dg-urun-cta.liquid`: tüm ürün sayfalarında "{marka} Türkiye distribütöründen; **kurulum**, servis ve yedek parça desteğiyle." yazıyor. Kett için kurulum yok; EUROMESH/Newlong distribütörlüğü teyitsiz.
- `snippets/dg-collection-description.liquid` (`kalite-kontrol-ve-laboratuvar-cihazlari`): "kurulum ve servis desteği" — Kett için kurulum yok.

## Teyit bekleyenler
- Kett teknik değerleri (50 MHz, %1–40, 240 mL; C-600 5,0–69,9) hangi modellere ait?
- Kett distribütörlüğü hangi yıldan beri?
- Garanti süresi/kapsamı, kalibrasyon hizmeti.
