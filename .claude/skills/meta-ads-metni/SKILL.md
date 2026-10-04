---
name: meta-ads-metni
description: Meta (Facebook ve Instagram) reklam metinleri üretir - birincil metin, başlık, açıklama, CTA ve görsel yönlendirmesi; B2B ekipman alıcısına uygun, doğrulanmış iddialarla.
---

# Meta (Facebook/Instagram) reklam metni

## Önce oku
`marketing/context/reklam-kurallari.md`, `marka-sesi.md`, `markalar-ve-urunler.md`

## Girdi
- Ürün / koleksiyon / marka sayfası ve hedef URL (Shopify'dan doğrula)
- Kampanya amacı: trafik, potansiyel müşteri (teklif), satış (fiyatlı ürün)
- Yerleşim: Facebook akışı, Instagram akışı, Stories/Reels

## Üret
Dosya: `marketing/cikti/reklamlar/YYYY-AA-GG-meta-{konu}.md`

3 varyasyon (A/B testi için farklı açılar: ürünün ne yaptığı / distribütör güvencesi / satış modeli). Her biri:
1. **Birincil metin**: ana mesaj ilk ~125 karakterde; toplam 1–3 kısa paragraf
2. **Başlık** (~40)
3. **Açıklama** (~30)
4. **CTA** (Meta seçeneklerinden)
5. **Görsel yönlendirmesi**: hangi ürün fotoğrafı, görsel üzerinde metin varsa en fazla 5–6 kelime; Stories için dikey kadraj notu
6. Hedef kitle önerisi (meslek/ilgi alanı) — öneri olarak işaretle

## Doğrulama
`python3 marketing/araclar/karakter_say.py meta_birincil125 / meta_baslik40 / meta_aciklama30` ile say ve sonucu ekle. Meta sınırları öneridir; aşan varsa gerekçesini yaz.
