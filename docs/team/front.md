# Frontend kuralları (Değirmen teması)

Bu tema Shopify Dawn tabanlıdır; mağazaya özel tasarım `dg-*` bölümleri ve `assets/dg-*.css` dosyalarıyla yapılmıştır.

## Yapı
- Yeni sayfa = `templates/page.<ad>.json` + gerekirse yeni `sections/dg-*.liquid`.
- Mevcut `dg-*` bölümlerini (dg-sayfa-ust, dg-sektorler, dg-urunler, dg-hizmet, dg-katalog, dg-surec, dg-cta, dg-markalar, dg-hero) **önce yeniden kullanın**; yalnızca karşılığı yoksa yeni bölüm yazın.
- Mevcut bölüm ve CSS dosyalarını değiştirmeyin; yeni stil gerekiyorsa yeni bir `assets/dg-*.css` dosyası açın ve sadece yeni bölümde yükleyin (`{{ 'dosya.css' | asset_url | stylesheet_tag }}`).
- Sınıf adları ve ayar id'leri Türkçe ve mevcut adlandırmaya uygun: `dg-sayfa`, `dg-kas`, `dg-btn`, `dg-baslik-blok`, `dg-ok`, ikonlar için `{% render 'dg-ikon', ad: '...' %}`.

## Metin
- Sayfada görünen her metin bölüm ayarlarından (schema `settings` / `blocks`) gelir; Liquid içine sabit metin gömmeyin.
- Metinler `docs/team/copy.md` dosyasından alınır; frontend metni değiştirmez, gerekirse metin yazarına mesaj atar.

## SEO ve erişilebilirlik
- Sayfada tek `<h1>` olmalı (`dg-sayfa-ust` sayfa başlığını h1 olarak basıyorsa ikinci h1 eklemeyin).
- Her `<section>` için `aria-labelledby`, görseller için `alt`, dekoratif ikonlar için `aria-hidden`.
- Linkler `shopify://collections/<handle>` veya koleksiyon nesnesi ile verilir; uydurma URL kullanmayın.

## Doğrulama
- JSON şablonlar geçerli JSON olmalı; bölüm `type` değerleri gerçekten var olan dosyalara karşılık gelmeli.
- Blok ayar id'leri ilgili bölümün schema'sında tanımlı olmalı.
- Mobilde (≤ 749px) taşma ve buton çakışması olmamalı.
