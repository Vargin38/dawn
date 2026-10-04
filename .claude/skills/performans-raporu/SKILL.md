---
name: performans-raporu
description: Shopify satış ve trafik verisinden, bağlıysa Google Ads ve Meta Ads verisinden aylık/haftalık performans raporu hazırlar - özet, en çok satan/bakılan ürünler, reklam harcaması ve getirisi, aksiyon önerileri.
---

# Performans raporu

## Veri kaynakları
1. **Shopify** (ShopifyQL / Admin API): ciro, sipariş sayısı, ortalama sepet, en çok satan ürünler, oturum ve dönüşüm (analitik erişimi varsa), teklif formu talepleri (varsa).
2. **Supermetrics** (bağlıysa): Google Ads ve Meta Ads — harcama, gösterim, tıklama, TO, TBM, dönüşüm, ROAS; kampanya kırılımıyla.
3. Bağlı değilse veya yetki yoksa: raporda "veri yok" olarak yaz, tahmin etme.

## Üret
Dosya: `marketing/cikti/raporlar/YYYY-AA-GG-{donem}-rapor.md`

1. **Dönem ve karşılaştırma** (ör. Eylül 2026 vs Ağustos 2026)
2. **Özet**: 3–5 madde, rakamla
3. **Satış**: ciro, sipariş, ortalama sepet; marka ve koleksiyon kırılımı
4. **Ürünler**: en çok satan 10; görüntülenip satılmayan ürünler (varsa)
5. **Reklam**: kanal bazında harcama → gelir/dönüşüm; en iyi/en kötü kampanya
6. **Aksiyonlar**: en fazla 5; her biri hangi veriye dayandığıyla
7. **Yöntem**: hangi sorgu/kaynak, eksik veriler

## Kurallar
- Her rakamın kaynağı belli olsun; hesaplanan oranlarda formülü yaz.
- Para birimi TL; KDV dahil/hariç olduğunu belirt.
- Grafik istenirse `dataviz` skill'ini kullan.
