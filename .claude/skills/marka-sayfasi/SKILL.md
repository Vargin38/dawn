---
name: marka-sayfasi
description: Bir marka (HAWO, EUROMESH, Newlong vb.) veya ürün grubu için Shopify açılış sayfası hazırlar - metin, page.<ad>.json şablonu ve SEO alanları. Kett sayfasındaki ekip akışını tekrar kullanır.
---

# Marka / koleksiyon açılış sayfası

Örnek ve referans: `templates/page.kett.json`, `docs/team/copy.md`, `docs/team/report.md`.

## Akış (3 rol, dosya sahipliği ayrı)
1. **Metin** (icerik-yazari): `marketing/cikti/sayfalar/{marka}-copy.md`
   - SEO başlığı (≤60), meta (120–155), anahtar kelime/niyet tablosu
   - Bölüm metinleri, her biri kullanılacak dg bölümünün ayar id'leriyle (schema'dan doğrula)
   - SSS (3–5), yalnızca doğrulanmış bilgi
   - Teyit listesi
2. **Şablon** (sayfa-gelistirici): `templates/page.{marka}.json`
   - Sıra: `dg-sayfa-ust` → `dg-sektorler` → `dg-urunler` → `dg-hizmet` → `dg-marka-katalog` → `dg-surec` → `dg-marka-sss` → `dg-cta`
   - `dg-marka-katalog` ayarında `marka` = Shopify vendor adı
   - Metni değiştirmez; JSON + schema doğrulaması yapar
3. **Kontrol** (kalite-kontrol): `kalite-kontrol` skill'i

## Yayına alma
- Canlı tema GitHub'a bağlı değil. Yeni bölüm/şablon dosyaları canlı temaya kullanıcı tarafından kod editöründen eklenir (sections → assets → templates sırası).
- Sayfa Shopify'da `pageCreate` ile oluşturulur: `templateSuffix` = marka, SEO `global.title_tag` / `global.description_tag` metafield'ları. Şablon canlı temada yoksa sayfayı **gizli** oluştur.

## Koleksiyon açıklaması (kısa iş)
Tek koleksiyon açıklaması isteniyorsa ekip kurma: 1–2 cümlelik benzersiz metin + SEO başlık/meta üret, `snippets/dg-collection-description.liquid` ile çakışmasını kontrol et.
