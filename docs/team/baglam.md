# Ekip ortak bağlam dosyası

Her üye yalnızca **kendi başlığının altına** yazar. Kısa tutun: ne yaptınız, hangi dosyaya dokundunuz, diğerlerinin bilmesi gereken ne var.

## Görev
Kett marka açılış sayfası (`templates/page.kett.json`). Değirmen A.Ş. Kett'in Türkiye distribütörüdür.

## Dosya sahipliği
| Üye | Sahip olduğu dosyalar |
| :- | :- |
| metin-yazari | `docs/team/copy.md` |
| frontend-dev | `templates/page.kett.json`, yeni `sections/dg-marka-*.liquid`, yeni `assets/dg-marka.css` |
| kalite-kontrol | `docs/team/report.md` |

## metin-yazari
- `docs/team/copy.md` hazır: SEO (title 55, meta 145 karakter), 8 bölüm, 5 SSS, 10 maddelik teyit listesi.
- Sıra: dg-sayfa-ust → dg-sektorler (4 blok) → dg-urunler (sekmeli) → dg-hizmet → dg-katalog (isteğe bağlı) → dg-surec → SSS (ss-faq-17 alanları) → dg-cta.
- h1 = Shopify sayfa adı "Kett nem ve beyazlık ölçüm cihazları"; dg-sayfa-ust zaten h1 basıyor.
- Uyarı: dg-katalog tüm markaları listeliyor; `genel-rutubet-olcme-cihazlari` koleksiyonu teyitsiz (boşsa ilgili blok/sekme çıkarılsın).
- Güncelleme: frontend-dev genel-rutubet koleksiyonunu teyit etti (1 ürün: Kett HX-500); katalog için dg-marka-katalog, SSS için dg-marka-sss kullanıldı. Teyit listesi #3 kısmen kapandı.
- Teknik rakamlar (50 MHz, %1–40, 240 mL, C-600 aralığı) model eşleşmesi belirsiz olduğu için kullanılmadı.

## frontend-dev
- `templates/page.kett.json` hazır; metinler copy.md'den birebir. Sıra: `ust` (dg-sayfa-ust, tek h1 = sayfa adı) → `uygulamalar` (dg-sektorler, 4 blok) → `urunler` (dg-urunler, 3 sekme) → `hizmet` (dg-hizmet) → `katalog` (YENİ dg-marka-katalog) → `surec` (dg-surec) → `sss` (YENİ dg-marka-sss) → `cta` (dg-cta).
- Yeni `sections/dg-marka-katalog.liquid`: dg-katalog mantığı + koleksiyon ve marka (vendor, büyük/küçük harf duyarsız) süzgeci; doküman yoksa bölüm hiç basılmaz. dg-katalog CSS sınıflarını kullanır. Sütun başlıkları ayar (varsayılanlar dg-katalog ile aynı).
- Yeni `sections/dg-marka-sss.liquid` + `assets/dg-marka.css`: details/summary akordeon, h2 + aria-labelledby, FAQPage JSON-LD. ss-faq-17 yerine seçildi (dg tasarımı, başlık alanı, sade ayarlar).
- Shopify'dan teyit (Admin API, 2026-10-04): `genel-rutubet-olcme-cihazlari` var, 1 ürün (Kett HX-500) → rutubet bloğu ve s_rutubet sekmesi tutuldu. kalite-kontrol koleksiyonu 6 ürün, hepsi vendor "Kett".
- İlk planlanan dg-marka-tanitim bölümü copy.md'de karşılığı olmadığı için silindi. Mevcut dosyalara dokunulmadı.
- Doğrulama: JSON parse OK; bölüm dosyaları, ayar ve blok id'leri, select/range değerleri, max_blocks kontrol edildi (scratchpad/dogrula.js).

## kalite-kontrol
- Karar: **ONAY**. Rapor `docs/team/report.md` için hazırlandı ama alt ajan dosya yazımı ortam tarafından engellendi; rapor metni lead'e (main) teslim edildi.
- Shopify Admin API: frontend-dev oturum kaydında yalnızca okuma çağrıları var (`search_collections`, `graphql_query` ile `collectionByHandle` sorgusu); mutation/update/create çağrısı yok.
- 1. tur: 1 orta (SSS boş durumda boş h2/aria) ve 2 düşük bulgu (soru escape, katalogdaki sabit "PDF" metni). frontend-dev üçünü de düzeltti, yeniden doğrulandı.
- Doğrulama: node scripti (şablon, schema, id, copy.md karşılaştırması) ve liquidjs render (JSON-LD, boş durumlar, marka süzgeci). Mevcut dosyalarda değişiklik yok.
- Açık işler mağaza sahibinde: sayfayı `page.kett` şablonuyla oluşturmak ve copy.md'deki teyit listesi.
