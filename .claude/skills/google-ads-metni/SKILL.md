---
name: google-ads-metni
description: Google Ads duyarlı arama reklamı (RSA) metinleri üretir - 15 başlık, 4 açıklama, görünen yol, site bağlantıları ve açıklama metinleri; karakter sınırlarını script ile doğrular.
---

# Google Ads metni

## Önce oku
`marketing/context/reklam-kurallari.md`, `marka-sesi.md`, `markalar-ve-urunler.md`

## Girdi
- Reklam grubu: ürün / koleksiyon / marka ve hedef URL (mağazada var olduğunu Shopify'dan doğrula)
- Anahtar kelime teması (kullanıcı verir veya arama niyetinden türet)
- Fiyatlı mı teklifli mi (Shopify'dan)

## Üret
Dosya: `marketing/cikti/reklamlar/YYYY-AA-GG-google-{konu}.md`

1. Reklam grubu, hedef URL, anahtar kelime teması
2. **15 başlık** (≤30): en az 3'ü anahtar kelimeyi, 3'ü marka/distribütör, 3'ü satış modeli (fiyat/teklif/katalog), 3'ü fayda/kullanım içersin. Birbirinin tekrarı olmasın.
3. **4 açıklama** (≤90)
4. **Görünen yol** 2 × ≤15 (ör. `kett` / `nem-olcer`)
5. **4 site bağlantısı** (metin ≤25, 2 açıklama satırı ≤35) — yalnızca var olan sayfalar
6. **4 callout** (≤25)
7. Sabitleme (pin) önerisi: 1. pozisyon için hangi başlık
8. Teyit gerekli listesi

## Doğrulama (zorunlu)
Her grubu `python3 marketing/araclar/karakter_say.py baslik30 ...` (ve `aciklama90`, `yol15`, `sitelink25`, `sitelink_aciklama35`, `callout25`) ile say; çıktıyı dosyaya ekle. AŞIYOR olan metin teslim edilmez.
