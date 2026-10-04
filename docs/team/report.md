# Kalite kontrol raporu — Kett açılış sayfası
Tarih: 2026-10-04 · Karar: **ONAY** · Hazırlayan: kalite-kontrol (dosyaya lead tarafından işlendi)

## Özet
İncelenen: `templates/page.kett.json`, `sections/dg-marka-katalog.liquid`, `sections/dg-marka-sss.liquid`, `assets/dg-marka.css`.
- Metinler `copy.md` ile birebir aynı ("Kett" marka süzgeci bir yapılandırma değeridir).
- Uydurma rakam, teknik özellik veya garanti ifadesi yok.
- Tek h1 (`dg-sayfa-ust`); başlık sırası h1 → h2 → h3.
- FAQPage JSON-LD geçerli ve görünür SSS ile aynı.
- Mevcut tema dosyaları değişmedi.

## Bulgular
| # | Bulgu | Önem | Durum | Düzeltme |
|:-|:-|:-|:-|:-|
| 1 | `dg-marka-sss`: geçerli soru yoksa / başlık boşsa bölüm boş h2, boş `aria-labelledby` ve boş listeyle basılıyordu | Orta | Kapandı | Bölüm, CSS ve JSON-LD `if sss_sayi > 0` içinde; h2 ve `aria-labelledby` yalnızca başlık doluysa basılıyor |
| 2 | `dg-marka-sss`: soru metni escape edilmeden h3'e basılıyordu | Düşük | Kapandı | `\| escape` eklendi |
| 3 | `dg-marka-katalog`: "PDF · " metni Liquid'e gömülüydü (front.md'ye aykırı) | Düşük | Kapandı | Yeni `pdf_etiket` ayarına taşındı (varsayılan "PDF") |

## Doğrulama yöntemleri
1. Node scripti: JSON parse, bölüm dosyaları, ayar/blok id'leri, select/range değerleri, `max_blocks`, richtext yapısı, `copy.md` ile metin karşılaştırması. Sonuç: hatasız.
2. liquidjs render: SSS (normal, özel karakterli, boş durum), JSON-LD parse ve görünür SSS ile eşleşme; katalogda yalnızca Kett satırları ve boş koleksiyon durumu.
3. Elle inceleme: ikonlar `dg-ikon`'da mevcut; `dg-marka.css` yalnızca SSS'de yükleniyor, seçiciler `dg-marka-` önekli; ≤749px'te taşma yok.
4. `git status` / `git diff`: mevcut dosyalarda değişiklik yok.
5. Shopify Admin API: frontend-dev'in oturum kaydında yalnızca okuma çağrıları var (`search_collections`, `graphql_query` ile `collectionByHandle`). Mutation/create/update çağrısı yok.

## Kalan riskler
- SSS'de h3, `<summary>` içinde; bazı ekran okuyucular başlık olarak duyurmayabilir.
- SSS başlık ayarı boşaltılırsa bölümün erişilebilir adı kalmaz.
- `strip_html`, `&amp;` gibi karakter kodlarını çözmez; JSON-LD'de kod hâlinde görünebilir.
- Katalog, ürün açıklamasındaki `urun-katalog` yapısının ayrıştırılmasına dayanır (`dg-katalog`'dan miras).
- Katalog koleksiyonun ilk 50 ürününü tarar.
- `genel-rutubet-olcme-cihazlari` tek ürünlü (HX-500); ürün kaldırılırsa ilgili blok ve sekme şablondan çıkarılmalı.

## Mağaza sahibinin yapması gerekenler
1. Shopify yönetici → Online Mağaza → Sayfalar → yeni sayfa: başlık "Kett nem ve beyazlık ölçüm cihazları", şablon `page.kett`, handle `kett`.
2. SEO başlığı: "Kett Nem Ölçer ve Beyazlık Ölçer | Türkiye Distribütörü"; meta açıklama: `copy.md` §1.
3. `servis-ve-yedek-parca` sayfasının yayında olduğunu kontrol edin.
4. `copy.md` §4'teki teyit listesini cevaplayın (teknik değerler, HX-500 ifadesi, garanti, kurulum, yedek parça, fiyatlı başka Kett modeli).
5. Önizlemede katalog tablosunu ve mobil görünümü kontrol edin.
