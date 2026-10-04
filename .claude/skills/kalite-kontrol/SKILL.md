---
name: kalite-kontrol
description: Pazarlama çıktısını (ürün metni, marka sayfası, Google/Meta reklamı, rapor) yayına girmeden önce doğruluk, marka sesi, SEO, karakter sınırı ve teknik açıdan denetler; bulguları önem derecesiyle raporlar.
---

# Kalite kontrol

Üreten kendi işini denetlemez. Kodu veya metni kendin düzeltme; bulguyu sahibine gönder.

## Kontrol listesi
1. **Doğruluk**: her teknik değer, hizmet ve iddia `marketing/context/markalar-ve-urunler.md`, Shopify verisi veya kaynakta var mı? Teyitsiz iddia = KRİTİK.
2. **Yasak ifadeler**: kurulum/eğitim (Kett), kanıtsız üstünlük ("en iyi", "lider"), teyitsiz garanti.
3. **Marka sesi**: `marka-sesi.md` ile uyum; abartı, ünlem, jargon.
4. **Uzunluklar**: `marketing/araclar/karakter_say.py` ile yeniden say (üreticinin sayımına güvenme).
5. **SEO**: tek H1, başlık/meta uzunluğu, anahtar kelime doğallığı, seri ürünlerde tekrarlı içerik.
6. **Bağlantılar**: hedef URL'ler mağazada var mı (Shopify'dan kontrol).
7. **Tema dosyaları** (varsa): JSON geçerli, section type dosyası var, ayar/blok id'leri schema'da tanımlı, mevcut dosyalar değişmemiş (`git diff`).

## Rapor
Dosya: çıktının yanına `*-kontrol.md`
- Karar: ONAY / RED
- Bulgu tablosu: #, bulgu, önem (kritik/orta/düşük), dosya:satır, öneri
- Kalan riskler ve teyit gerekenler
