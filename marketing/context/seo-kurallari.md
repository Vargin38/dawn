# SEO kuralları

## Genel
- Önce arama niyetini belirle: bilgi ("tahıl nemi nasıl ölçülür"), ticari araştırma ("tahıl nem ölçer"), satın alma ("kett pm-450 fiyat"), destek ("kett servis").
- Sayfa başına tek ana anahtar kelime + 2–4 yakın varyant. Anahtar kelimeyi doğal kullan; tekrar doldurma yok.
- Türkçe karakterleri doğru yaz (ı, ş, ğ, ü, ö, ç); URL handle'da ASCII.

## Uzunluklar (karakter sayısını script ile ölç, tahmin etme)
- SEO başlığı (title): ≤ 60 karakter. Kalıp: `{Ürün/Model} {ne yapar} | {Marka veya Değirmen}`
- Meta açıklama: 120–155 karakter. Ne olduğu + kime + satış modeli (fiyat/teklif, katalog, servis).
- H1: tek; Shopify ürün/sayfa adı.

## Ürün sayfası
- Teknik özellikler tablo olarak; değerler yalnızca üretici kataloğu veya kullanıcıdan.
- Aynı serideki modeller (ör. PM serisi) için **tekrarlı içerik riski**: her modelin sayfası, o modeli ayıran özellikle başlamalı (ölçüm aralığı, numune tipi, hacim ağırlığı vb.). Ayıran özellik bilinmiyorsa ayrı sayfa yerine tek sayfa + varyant öner ve kullanıcıya sor.
- Katalog PDF'i varsa bağlantı ver; "kayıt olmadan indirin".

## Marka/koleksiyon sayfası
- Koleksiyon açıklaması 1–2 cümle, benzersiz; diğer koleksiyon açıklamalarını kopyalama.
- Marka sayfası: kim/ne ölçer → model grupları → satış sonrası → katalog → nasıl alınır → SSS → iletişim (Kett sayfası örnek: `templates/page.kett.json`).
- SSS yalnızca doğrulanmış bilgiyle; FAQPage yapısal verisi `dg-marka-sss` bölümünde hazır.
