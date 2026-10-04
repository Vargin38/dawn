# Değirmen A.Ş. — Shopify teması ve pazarlama ekibi

Bu repo, Değirmen Sanayi ve Ticaret A.Ş.'nin (İstanbul, 1984) Shopify Dawn tabanlı temasıdır.
Mağaza Kett, HAWO, EUROMESH ve Newlong ürünlerini satar; fiyatlı ürünler sepete eklenir, diğerleri teklifle satılır.

## Her işten önce oku
- `marketing/context/` — marka sesi, markalar/ürünler, SEO kuralları, reklam kuralları. Bunlara aykırı içerik üretme.
- Tema işlerinde `docs/team/front.md` (dg-* tasarım sistemi kuralları).

## Temel kurallar
- Ürün özelliği, rakam, sertifika, garanti, hizmet **uydurma**. Kaynak: repo, Shopify mağaza verisi veya kullanıcının verdiği üretici bilgisi. Emin değilsen "Teyit gerekli" listesine yaz.
- Metinler Türkçe, sade ve somut; abartılı pazarlama dili yok.
- Mevcut `dg-*` dosyalarını değiştirmeden önce kullanıcıya sor; yeni iş için yeni dosya aç.
- Çıktılar `marketing/cikti/` altına, tarihli dosya adıyla (`YYYY-AA-GG-konu.md`).
- Canlı tema GitHub'a bağlı değildir: repo değişikliği canlıya kendiliğinden geçmez.

## Agent yönlendirme kuralları

| İş | Kim yapar | Neden |
| :- | :- | :- |
| Tek ürün için SEO metni / meta açıklama | `urun-seo` skill'i doğrudan | Kısa, tek adımlı iş; agent gerekmez |
| Birden çok ürün (ör. bir serinin tüm modelleri) SEO metni | `icerik-yazari` agent | Tekrarlı içerik ve seri tutarlılığı kontrolü gerekir |
| Marka/koleksiyon açılış sayfası | `icerik-yazari` → `sayfa-gelistirici` → `kalite-kontrol` (ekip) | Metin, kod ve denetim ayrı uzmanlık; dosya sahipliği ayrı |
| Google Ads metni | `reklam-uzmani` agent (`google-ads-metni` skill) | Karakter sınırları ve politika kontrolü |
| Meta (Facebook/Instagram) reklam metni | `reklam-uzmani` agent (`meta-ads-metni` skill) | Aynı |
| Kampanya paketi (sayfa + reklamlar) | `icerik-yazari` + `reklam-uzmani` paralel, sonra `kalite-kontrol` | Bağımsız işler paralel yürür, tek mesaj tutarlılığı denetlenir |
| Satış / trafik / reklam performans raporu | `veri-analisti` agent (`performans-raporu` skill) | Veri çekme ve yorumlama ayrı düşünme biçimi |
| Herhangi bir çıktının yayına girmeden kontrolü | `kalite-kontrol` agent | Üreten kendi işini denetlemez |

Basit, tek adımlı işlerde agent başlatma; skill yeterli. 3'ten fazla agent'ı aynı anda çalıştırma.

## Dosya sahipliği (ekip çalışırken)
- icerik-yazari → `marketing/cikti/urun-metinleri/`, `marketing/cikti/sayfalar/*-copy.md`
- reklam-uzmani → `marketing/cikti/reklamlar/`
- sayfa-gelistirici → `templates/`, yeni `sections/dg-*.liquid`, yeni `assets/dg-*.css`
- veri-analisti → `marketing/cikti/raporlar/`
- kalite-kontrol → `marketing/cikti/**/*-kontrol.md`
- Ortak not dosyası: `docs/team/baglam.md` (herkes kendi başlığının altına yazar)

## Bağlı araçlar
- Shopify (Admin API): ürün, koleksiyon, sipariş, analitik (ShopifyQL). Yazma işlemleri kullanıcı onayıyla; canlı temaya dosya yazılamaz.
- Supermetrics: Google Ads ve Meta Ads performans verisi (hesap bağlantısı gerekir).
