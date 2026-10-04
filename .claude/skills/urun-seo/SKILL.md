---
name: urun-seo
description: Shopify ürün sayfası için SEO başlığı, meta açıklama, ürün açıklaması ve teknik özellik tablosu yazar. Tek ürün ya da bir serinin modelleri için kullan; aynı serideki modellerde tekrarlı içerik riskini kontrol eder.
---

# Ürün sayfası SEO metni

## Önce oku
- `marketing/context/marka-sesi.md`, `markalar-ve-urunler.md`, `seo-kurallari.md`

## Girdi topla
1. Ürünü Shopify'dan oku (başlık, vendor, koleksiyonlar, mevcut açıklama, fiyat var mı, varyantlar).
2. Teknik değerlerin kaynağı: mevcut ürün açıklaması, üretici kataloğu (kullanıcı verirse) veya kullanıcı. Başka kaynak yok.
3. Aynı serinin diğer modellerini de oku (aynı koleksiyon/vendor, benzer başlık).

## Üret
Dosya: `marketing/cikti/urun-metinleri/YYYY-AA-GG-{handle}.md`

1. **Arama niyeti ve ana anahtar kelime** (1 satır gerekçe)
2. **SEO başlığı** (≤60) ve **meta açıklama** (120–155)
3. **Açılış paragrafı**: 2–3 cümle; ne ölçer/yapar, kim için, bu modeli serideki diğerlerinden ayıran özellik
4. **Teknik özellikler tablosu**: yalnızca kaynağı olan değerler; her satırın kaynağını dosya sonunda listele
5. **Kullanım alanları**: madde madde, koleksiyon açıklamalarıyla tutarlı
6. **Nasıl alınır**: fiyatlıysa sepete ekle (KDV dahil); değilse teklif iste
7. **Teyit gerekli** listesi

## Kontroller
- Karakterleri say: `python3 marketing/araclar/karakter_say.py seo_baslik60 "..."` ve `meta155`.
- Seri kontrolü: aynı serideki diğer ürünlerin açıklamasıyla ilk paragraf aynı/çok benzer ise uyar. Ayıran özellik bilinmiyorsa tek sayfa + varyant seçeneğini öner.
- Shopify'a yazma: yalnızca kullanıcı açıkça onaylarsa (`productUpdate`; SEO alanları `seo { title description }`).
