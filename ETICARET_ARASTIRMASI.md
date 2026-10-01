# E-Ticaret Satın Alma Akışı Denetimi — İş Fikri Araştırması

**Araştırılan fikir:** E-ticaret sitelerinin alışveriş akışındaki hataları ve satış kaybettiren sorunları bulup düzelten bir hizmet/yazılım.
**Rapor tarihi:** 1 Ekim 2026
**Veri toplama zaman aralığı:** 1 Ekim 2026, 14:05–14:30 TSİ (UTC+3)
**Hazırlayan:** Claude Code (yalnızca araştırma; proje kodlarına dokunulmadı)

---

> ## ⚠️ Önce okunması gereken kısıt
>
> Bu araştırmanın yürütüldüğü bulut ortamının **ağ politikası, e-ticaret sitelerine doğrudan erişimi engelledi.** 50 sitenin her birine 1 Ekim 2026 14:14:51–14:15:05 TSİ arasında birer erişim denemesi yapıldı; **50 denemenin 50'si de ortamın çıkış vekil sunucusunda (proxy) `403` ile reddedildi** (kayıt: [Ek A](#ek-a--erişim-denemesi-kaydı)). Tarayıcı (Playwright/Chromium), `curl` ve sayfa getirme aracı aynı engele takıldı. Bu, sitelerin hatası **değildir**; araştırma ortamının kısıtıdır ve raporda site hatası olarak değerlendirilmedi.
>
> **Sonuç:** Bu raporda, 50 sitenin hiçbirinde ürün seçimi, sepete ekleme, kupon, kargo, ödeme sayfasına geçiş veya mobil görünüm **gözlemlenemedi**. Bu nedenle:
> - **Doğrulanmış site sorunu sayısı: 0**
> - Denetim tablosundaki "bulunan sorun" sütunları dürüstçe **"Gözlem yapılamadı"** olarak bırakıldı.
> - Yalnızca arama motoru dizininden görülebilen 5 **aday** durum ayrıca listelendi (site üzerinde doğrulanmadı).
>
> Erişim gerektirmeyen kısımlar (pazar büyüklüğü, platformlar, fiyatlar, mevzuat, rakipler, iş modeli) web araması ile araştırıldı. Web aramasının döndürdüğü özetler bazı durumlarda kaynak sayfa açılamadan kullanıldı; bu durumlar metinde **"arama özeti, doğrulanmadı"** olarak işaretlendi.
>
> Gerçek 50 site denetimi için ortamın ağ erişim ayarının genişletilmesi (veya denetimin normal bir bilgisayardan yapılması) gerekir. Bu raporun 13. bölümündeki plan, eksik kalan saha denetimini ilk adım olarak içerir.

---

## İçindekiler

1. [Yönetici özeti](#1-yönetici-özeti)
2. [Araştırma yöntemi](#2-araştırma-yöntemi)
3. [50 sitenin ayrıntılı denetim tablosu](#3-50-sitenin-ayrıntılı-denetim-tablosu)
4. [En sık karşılaşılan 10 sorun](#4-en-sık-karşılaşılan-10-sorun)
5. [En fazla para kaybettirme ihtimali olan 5 sorun](#5-en-fazla-para-kaybettirme-ihtimali-olan-5-sorun)
6. [Hizmet paketi önerileri](#6-mağaza-sahiplerinin-para-ödeyebileceği-hizmet-paketi-önerileri)
7. [Hedef müşteri profili](#7-türkiyede-hedef-müşteri-profili)
8. [Müşteriye ulaşma ve satış konuşması](#8-müşteriye-nasıl-ulaşılacağı-ve-satış-konuşması)
9. [Tek seferlik hizmet ve aylık abonelik](#9-tek-seferlik-hizmet-ve-aylık-abonelik-modeli)
10. [Maliyetler ve gelir modeli](#10-tahmini-maliyetler-ve-gelir-modeli)
11. [Rakipler ve yurt dışı benzerleri](#11-rakipler-ve-yurt-dışında-benzer-hizmetler)
12. [Güçlü ve zayıf taraflar](#12-bu-işin-güçlü-ve-zayıf-tarafları)
13. [30 günlük doğrulama planı](#13-30-günlük-doğrulama-planı)
14. [Son karar ve net cevaplar](#14-son-karar-bu-fikre-başlanmalı-mı)
- [Karar tablosu](#karar-tablosu)
- [Ahmet'e gönderilecek sade özet](#ahmete-gönderilecek-sade-özet)
- [Ek A — Erişim denemesi kaydı](#ek-a--erişim-denemesi-kaydı)
- [Kaynaklar](#kaynaklar)

---

## 1. Yönetici özeti

**Kısa cevap: Kanıt, bu fikre tam zamanlı başlamak için yetersiz. Düşük maliyetli, 30 günlük bir doğrulamaya değer; ancak doğrulama yapılmadan yatırım veya işten ayrılma kararı verilmemeli.**

- **Saha denetimi yapılamadı.** Ortamın ağ politikası nedeniyle 50 siteye erişilemedi. Bu raporda gözleme dayalı tek bir site hatası yok. Fikrin en kritik varsayımı ("Türk KOBİ e-ticaret sitelerinde satış kaybettiren hatalar yaygın") **test edilmedi.**
- **Sorunun genel olarak var olduğuna dair dolaylı kanıt var:**
  - Baymard Institute'un küresel verilerine göre ortalama sepet terk oranı yaklaşık **%70**; en büyük nedenler beklenmedik ek maliyetler, zorunlu üyelik, karmaşık ödeme ve site hataları.
  - Şikâyetvar'da Türk sitelerine ilişkin "indirim kodu sepette uygulanmıyor", "ücretsiz kargo yazıyordu ama ücret alındı", "stokta görünüyordu, iptal edildi", "ödeme sayfası hata veriyor" başlıklı çok sayıda şikâyet sayfası var. Ancak bunlar çoğunlukla büyük pazaryerleri ve büyük markalarla ilgili ve şikâyetlerin doğruluğu tek tek doğrulanmadı.
- **Pazar sınırlı ama küçük değil:** Ticaret Bakanlığı verilerine dayanan kaynaklara göre e-ticaret yapan işletmelerin büyük çoğunluğu pazaryerinde satıyor; kendi sitesinden satış yapan ETBİS kayıtlı işletme sayısı **35 binin üzerinde** (yılı 2023 mü 2024 mü, kaynaklar arasında net değil). Store Leads'e göre Türkiye'de **15.784 canlı Shopify** (Temmuz 2026) ve **39.879 canlı WooCommerce** mağazası (Ağustos 2026) var. ikas 20 bin+, Ticimax 30 bin+ işletme beyan ediyor (şirket beyanı).
- **Ödeme isteği bilinmiyor.** Yurt dışında bu işin örnekleri var (Baymard denetimleri 3.400–9.700 $; Fiverr'da 45–300 $ CRO denetimleri; Noibu gibi hata izleme yazılımları). Türkiye'de CRO ajansları ve danışmanlar var; ancak KOBİ'lerin "akış denetimi" için para ödediğine dair doğrudan kanıt bulunamadı. Bionluk'ta SEO analiz raporlarının 200–350 TL'ye satılması, fiyat beklentisinin çok düşük olabileceğine işaret ediyor.
- **Başlangıç modeli:** Yazılım değil, **manuel hizmet + kendi iç kullanımınız için basit otomasyon.** 2 kişi yeterli; 3 kişi ilk 3 ay için gelirle taşınmaz.
- **İlk 3 ay gerçekçi gelir:** Varsayımlara dayalı senaryolarda toplam **15 bin TL (kötümser) – 77 bin TL (baz) – 222 bin TL (iyimser)**, KDV hariç. Baz senaryo iki kişiye asgari ücret düzeyinde gelir sağlamıyor.
- **Daha iyi olabilecek alternatifler (hipotez):** Kampanya öncesi kontrol (Kasım indirim dönemi), platform göçü sonrası kontrol, ajanslara beyaz etiketli denetim ve çok kanallı satıcılar için fiyat/stok senkronizasyon denetimi. Bunlar da doğrulanmadı; 30 günlük planda aynı anda test edilmeleri öneriliyor.

---

## 2. Araştırma yöntemi

### 2.1 Planlanan yöntem (görev tanımına göre)

Her site için normal bir müşteri gibi: ana sayfa → kategori → ürün → varyant seçimi → sepete ekleme → miktar değiştirme → kupon alanı → kargo bilgisi → sepetten ödeme sayfasına geçiş (kişisel bilgi girmeden durma noktası) → iletişim bağlantıları → teslimat/iade/ödeme sayfaları → mobil görünüm. Bulunan her sorunun sayfa yenilenerek ve farklı bir ürünle tekrar kontrol edilmesi.

**Uyulan kurallar:** Ödeme yapılmadı, sipariş oluşturulmadı, hesap açılmadı, kişisel bilgi girilmedi, işletmelere mesaj gönderilmedi, CAPTCHA veya güvenlik sistemi aşılmaya çalışılmadı. Erişim engeli aşılmaya çalışılmadı (ör. başka bir ağ veya üçüncü taraf sunucu üzerinden yönlendirme yapılmadı).

### 2.2 Gerçekte yapılabilen

| Adım | Durum | Ayrıntı |
|---|---|---|
| Sitelere tarayıcı/HTTP erişimi | ❌ Yapılamadı | 50/50 deneme ortam proxy'si tarafından `403` ile reddedildi ([Ek A](#ek-a--erişim-denemesi-kaydı)). Ayrıca Trendyol, LCW, Gratis, ikas, IdeaSoft, Ticimax, ticaret.gov.tr, Baymard, Shopify gibi alan adları da engelliydi. |
| Sayfa getirme aracı (WebFetch) | ❌ Yapılamadı | Aynı ağ politikası nedeniyle `EGRESS_BLOCKED`. |
| Web araması | ✅ Yapıldı | Arama motoru sonuçları (başlık, URL, özet) alınabildi. Kaynak sayfalar açılamadığı için rakamlar **arama özeti** üzerinden kullanıldı. |
| 50 sitenin listesi | ✅ Yapıldı | Alan adları arama sonuçlarıyla doğrulandı. Altyapı bilgisi yalnızca kamuya açık kaynak (çoğunlukla platformların kendi referans sayfaları) varsa yazıldı. |
| Masa başı pazar/rakip/mevzuat araştırması | ✅ Yapıldı | Ticaret Bakanlığı, platform fiyat sayfaları, Baymard, Store Leads, hukuk bürosu yazıları, Şikâyetvar kategori sayfaları (arama sonuçları üzerinden). |

### 2.3 Kısıtlar ve güvenilirlik notları

1. **Sıfır doğrudan gözlem.** Hiçbir sitenin alışveriş akışı görülmedi.
2. **Arama özeti riski.** Web arama aracı sonuçları bir model tarafından özetleniyor. Özetler yanlış veya eski olabilir. Önemli rakamlar için farklı aramalardan tutarlılık kontrol edildi; tutarsız olanlar metinde belirtildi.
3. **Platform bilgileri platformların kendi beyanı.** Referans sayfaları tarihsiz olabilir. Marka sonradan altyapı değiştirmiş olabilir.
4. **Fiyatlar.** Platform ve rakip fiyatları arama özetlerinden alındı. 1 Ekim 2026 itibarıyla geçerli oldukları **doğrulanmadı**. Gerçek veri gibi kullanılmamalı; karar öncesinde resmi sayfalardan teyit edilmeli.
5. **Şikâyet verileri.** Şikâyetvar başlıkları tüketici beyanıdır, doğruluğu kontrol edilmedi; büyük platformlarda yoğunlaşıyor, hedef KOBİ segmentini temsil etmeyebilir.
6. **Türkiye'ye özgü birincil sepet terk araştırması bulunamadı.** Türkçe kaynakların çoğu Baymard'ın küresel verilerini aktarıyor.

---

## 3. 50 sitenin ayrıntılı denetim tablosu

### 3.0 Tabloyu okuma kılavuzu

- **GY = Gözlem yapılamadı** (siteye erişim engellendi; sorun yok anlamına GELMEZ).
- **"Planlanan"** ifadesi, incelenmesi planlanan ancak incelenemeyen ürünü/adımı gösterir.
- **Altyapı** sütunu yalnızca kaynakta geçen bilgidir; güncel durum doğrulanmadı. Kaynak yoksa "Doğrulanmadı".
- **Sütun 11 (hizmete dönüşür mü):** Gözleme değil, işletme profiline dayalı **tahmindir**. "Yüksek" = KOBİ/orta ölçekli, hazır altyapı, muhtemelen kendi teknik ekibi yok. "Düşük" = büyük kurum, muhtemelen iç ekip/ajans/test firması var.
- **Kanıt** sütunundaki "E-n", [Ek A](#ek-a--erişim-denemesi-kaydı)'daki erişim denemesi satırını gösterir.

| # | 1. Site adı ve URL | 2. Sektör | 3. Altyapı (kaynak) | 4. İncelenen ürün | 5. Kontrol edilen adımlar | 6. Bulunan sorun | 7. Tekrarlanabilir mi | 8. Olası etki | 9. Kanıt | 10. Önerilecek çözüm | 11. Hizmete dönüşür mü |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Kiğılı — [kigili.com](https://www.kigili.com) | Giyim (erkek) | Shopify Plus ([Shopify TR blog](https://www.shopify.com/tr/blog/shopify-magazalari), [Fiyord](https://www.blog.fiyord.com/turkiye-de-shopify-kullanan-markalar/)) | İncelenmedi. Planlanan: beden+renk varyantlı gömlek | Yalnız erişim denemesi, 14:14:51 → 403 | GY | — | — | E-1 | — | Orta (köklü marka, Plus kullanıcısı; ajans desteği muhtemel) |
| 2 | Manu Atelier — [manuatelier.com](https://www.manuatelier.com) | Çanta/ayakkabı | Shopify ([Shopify TR blog](https://www.shopify.com/tr/blog/shopify-magazalari)) | Planlanan: renk varyantlı çanta | Erişim denemesi 14:14:51 → 403 | GY | — | — | E-2 | — | Orta (yurt dışı odaklı premium marka) |
| 3 | Les Benjamins — [lesbenjamins.com](https://www.lesbenjamins.com) | Giyim | Shopify ([Shopify TR blog](https://www.shopify.com/tr/blog/shopify-magazalari)) | Planlanan: bedenli sweatshirt | Erişim denemesi 14:14:52 → 403 | GY | — | — | E-3 | — | Orta |
| 4 | Derimod — [derimod.com.tr](https://www.derimod.com.tr) | Deri giyim/ayakkabı | Shopify ([Shopify TR blog](https://www.shopify.com/tr/blog/shopify-magazalari)) | Planlanan: numaralı ayakkabı | Erişim denemesi 14:14:52 → 403 | GY | — | — | E-4 | — | Orta |
| 5 | Zeki Triko — [zekitriko.com](https://zekitriko.com) | Mayo/plaj giyim | ikas ([ikas referanslar](https://ikas.com/tr/referanslar)) | Planlanan: alt-üst ayrı beden seçilen bikini | Erişim denemesi 14:14:52 → 403 | GY | — | — | E-5 | — | Yüksek (sezonluk kampanya yoğun) |
| 6 | Qarmacha — [qarmacha.com](https://qarmacha.com) | Kadın giyim/kozmetik | ikas ([ikas sayfası](https://ikas.com/tr/qarmacha)) | Planlanan: bedenli elbise | Erişim denemesi 14:14:53 → 403 | GY (bkz. aday A1) | — | — | E-6 | — | Yüksek |
| 7 | Pump Butik — [pumpbutik.com](https://pumpbutik.com) | Giyim (sokak modası) | ikas ([ikas sayfası](https://ikas.com/tr/pumpbutik)) | Planlanan: bedenli tişört | Erişim denemesi 14:14:53 → 403 | GY | — | — | E-7 | — | Yüksek |
| 8 | AVVA — [avva.com.tr](https://www.avva.com.tr) | Giyim (erkek) | Ticimax ([Ticimax referanslar](https://www.ticimax.com/referanslarimiz/)) | Planlanan: bedenli pantolon | Erişim denemesi 14:14:53 → 403 | GY | — | — | E-8 | — | Düşük–Orta (büyük marka) |
| 9 | Elle Shoes — [elleshoes.com](https://www.elleshoes.com) | Ayakkabı | Ticimax ([AVM markaları referansı](https://www.ticimax.com/avm-markalari-e-ticaret-sitesi/)) | Planlanan: numaralı topuklu ayakkabı | Erişim denemesi 14:14:53 → 403 | GY | — | — | E-9 | — | Orta |
| 10 | Desa — [desa.com.tr](https://www.desa.com.tr) | Deri çanta/aksesuar | Ticimax ([AVM markaları referansı](https://www.ticimax.com/avm-markalari-e-ticaret-sitesi/)) | Planlanan: renk varyantlı çanta | Erişim denemesi 14:14:54 → 403 | GY | — | — | E-10 | — | Düşük–Orta |
| 11 | Miniso Türkiye — [miniso.com.tr](https://miniso.com.tr) | Kozmetik/aksesuar/lisanslı ürün | ikas ([ikas blog](https://ikas.com/tr/blog/kozmetik-markalari-ikas-ile-satislarini-nasil-artiriyor)) | Planlanan: kampanyalı kozmetik seti | Erişim denemesi 14:14:54 → 403 | GY | — | — | E-11 | — | Orta |
| 12 | advb cosmetics — [advbcosmetics.com](https://advbcosmetics.com) | Kozmetik (makyaj) | ikas ([ikas blog](https://ikas.com/tr/blog/kozmetik-markalari-ikas-ile-satislarini-nasil-artiriyor)) | Planlanan: renk tonu seçilen ruj | Erişim denemesi 14:14:54 → 403 | GY | — | — | E-12 | — | Yüksek (influencer markası, kampanya trafiği) |
| 13 | Limonian — [limonian.com](https://limonian.com) | Kozmetik (Kore cilt bakımı) | ikas ([ikas blog](https://ikas.com/tr/blog/kozmetik-markalari-ikas-ile-satislarini-nasil-artiriyor)) | Planlanan: set ürün + kupon | Erişim denemesi 14:14:54 → 403 | GY | — | — | E-13 | — | Yüksek |
| 14 | D&P Perfumum — [dpperfumum.com.tr](https://dpperfumum.com.tr) | Parfüm | ikas ([ikas blog](https://ikas.com/tr/blog/kozmetik-markalari-ikas-ile-satislarini-nasil-artiriyor)) | Planlanan: ml varyantlı parfüm | Erişim denemesi 14:14:55 → 403 | GY | — | — | E-14 | — | Yüksek |
| 15 | Bath & Body Works TR — [bathandbodyworks.com.tr](https://www.bathandbodyworks.com.tr) | Kişisel bakım | Ticimax ([Ticimax referanslar](https://www.ticimax.com/referanslarimiz/)) | Planlanan: "X al Y öde" kampanya hesabı | Erişim denemesi 14:14:55 → 403 | GY | — | — | E-15 | — | Düşük (büyük grup) |
| 16 | The Body Shop TR — [thebodyshop.tr](https://thebodyshop.tr) | Kozmetik | Ticimax (Ticimax referans aramasında geçiyor; [kaynak](https://www.ticimax.com/referanslarimiz/)) | Planlanan: kargo eşiği tutarlılığı | Erişim denemesi 14:14:55 → 403 | GY (bkz. aday A4) | — | — | E-16 | — | Düşük–Orta |
| 17 | Gratis — [gratis.com](https://www.gratis.com) | Kozmetik perakende | Doğrulanmadı | Planlanan: kampanyalı ürün | Erişim denemesi 14:14:55 → 403 | GY | — | — | E-17 | — | Düşük (büyük perakendeci) |
| 18 | Flormar — [flormar.com.tr](https://www.flormar.com.tr) | Makyaj | Doğrulanmadı | Planlanan: renk tonlu ürün | Erişim denemesi 14:14:56 → 403 | GY | — | — | E-18 | — | Düşük |
| 19 | kahve.com — [kahve.com](https://www.kahve.com) | Gıda (kahve) | IdeaSoft ([IdeaSoft referanslar](https://www.ideasoft.com.tr/referanslar/)) | Planlanan: öğütme seçenekli kahve | Erişim denemesi 14:14:56 → 403 | GY | — | — | E-19 | — | Orta–Yüksek |
| 20 | Spada Coffee — [spadacoffee.com](https://spadacoffee.com) | Gıda (kahve) | ikas ([ikas sayfası](https://ikas.com/tr/spada-coffee)) | Planlanan: öğütme varyantı + kargo eşiği | Erişim denemesi 14:14:56 → 403 | GY | — | — | E-20 | — | Yüksek |
| 21 | A4 Kahve — [a4kahve.com](https://a4kahve.com) | Gıda (kahve) | ikas ([ikas sayfası](https://ikas.com/tr/a4kahve)) | Planlanan: ilk sipariş indirimi + kargo eşiği | Erişim denemesi 14:14:57 → 403 | GY | — | — | E-21 | — | Yüksek |
| 22 | Gloria Jean's Coffees TR — [gloriajeans.com.tr](https://gloriajeans.com.tr) | Gıda (kahve) | ikas ([ikas referanslar](https://ikas.com/tr/referanslar)) | Planlanan: çekirdek kahve | Erişim denemesi 14:14:57 → 403 | GY | — | — | E-22 | — | Orta |
| 23 | Ömer Güllü (Güllüoğlu) — [omergullu.com.tr](https://www.omergullu.com.tr) | Gıda (baklava) | Doğrulanmadı (bkz. yanlış alarm Y3) | Planlanan: gramaj varyantı + teslimat bölgesi | Erişim denemesi 14:14:57 → 403 | GY | — | — | E-23 | — | Orta |
| 24 | TAFT Coffee — [taftcoffee.com](https://www.taftcoffee.com) | Gıda (kahve) | Shopify ([DigitalPals](https://digitalpals.com/tr/turkiyedeki-shopify-magazalari/); dizindeki `/products/`, `/collections/` URL yapısı da uyumlu) | Planlanan: gramaj varyantı | Erişim denemesi 14:14:57 → 403 | GY | — | — | E-24 | — | Yüksek |
| 25 | VitaminSan — [vitaminsan.com](https://vitaminsan.com) | Takviye | Ticimax ([sağlık referansları](https://www.ticimax.com/saglik-medikal-dogal-urunler-e-ticaret-sitesi/)) | Planlanan: SKT bilgisi + stok | Erişim denemesi 14:14:57 → 403 | GY | — | — | E-25 | — | Yüksek |
| 26 | Medipera — [medipera.com](https://www.medipera.com) | Medikal/takviye | Ticimax ([sağlık referansları](https://www.ticimax.com/saglik-medikal-dogal-urunler-e-ticaret-sitesi/)) | Planlanan: medikal ürün iade koşulu | Erişim denemesi 14:14:58 → 403 | GY | — | — | E-26 | — | Yüksek |
| 27 | Konix — [konix.com.tr](https://www.konix.com.tr) | Medikal ürün | Ticimax ([sağlık referansları](https://www.ticimax.com/saglik-medikal-dogal-urunler-e-ticaret-sitesi/)) | Planlanan: adetli ürün, miktar değişimi | Erişim denemesi 14:14:58 → 403 | GY | — | — | E-27 | — | Yüksek |
| 28 | Supplementler.com — [supplementler.com](https://www.supplementler.com) | Spor takviyesi | Doğrulanmadı | Planlanan: aroma varyantlı protein tozu | Erişim denemesi 14:14:58 → 403 | GY | — | — | E-28 | — | Orta (büyük oyuncu) |
| 29 | Proteinocean — [proteinocean.com](https://www.proteinocean.com) | Takviye | Doğrulanmadı | Planlanan: aroma varyantı + kupon | Erişim denemesi 14:14:59 → 403 | GY | — | — | E-29 | — | Orta |
| 30 | Vatan Bilgisayar — [vatanbilgisayar.com](https://www.vatanbilgisayar.com) | Elektronik | Doğrulanmadı | Planlanan: stok + taksit tablosu | Erişim denemesi 14:14:59 → 403 | GY | — | — | E-30 | — | Düşük (büyük perakendeci) |
| 31 | İnceHesap — [incehesap.com](https://www.incehesap.com) | Elektronik/bilgisayar | Doğrulanmadı | Planlanan: stok/fiyat tutarlılığı | Erişim denemesi 14:14:59 → 403 | GY | — | — | E-31 | — | Düşük–Orta |
| 32 | İtopya — [itopya.com](https://www.itopya.com) | Bilgisayar | Doğrulanmadı | Planlanan: sistem toplama + sepet | Erişim denemesi 14:14:59 → 403 | GY | — | — | E-32 | — | Düşük–Orta |
| 33 | İstikbal — [istikbal.com.tr](https://www.istikbal.com.tr) | Mobilya | IdeaSoft ([IdeaSoft referanslar](https://www.ideasoft.com.tr/referanslar/); büyük marka, güncelliği şüpheli) | Planlanan: kumaş/ölçü varyantı, teslimat-kurulum bilgisi | Erişim denemesi 14:15:00 → 403 | GY | — | — | E-33 | — | Düşük |
| 34 | Bellona — [bellona.com.tr](https://www.bellona.com.tr) | Mobilya | IdeaSoft ([IdeaSoft referanslar](https://www.ideasoft.com.tr/referanslar/)) | Planlanan: büyük ürün kargo/teslimat süresi | Erişim denemesi 14:15:00 → 403 | GY | — | — | E-34 | — | Düşük |
| 35 | Doğtaş — [dogtas.com](https://www.dogtas.com) | Mobilya | Doğrulanmadı | Planlanan: renk varyantı + teslim süresi | Erişim denemesi 14:15:00 → 403 | GY | — | — | E-35 | — | Düşük |
| 36 | English Home — [englishhome.com](https://www.englishhome.com) | Ev tekstili | Ticimax ([Ticimax referanslar](https://www.ticimax.com/referanslarimiz/)) | Planlanan: ölçü varyantlı nevresim | Erişim denemesi 14:15:01 → 403 | GY | — | — | E-36 | — | Düşük |
| 37 | Schäfer — [schafer.com.tr](https://www.schafer.com.tr) | Mutfak/ev | Ticimax ([Ticimax referanslar](https://www.ticimax.com/referanslarimiz/)) | Planlanan: set ürün, sepette indirim | Erişim denemesi 14:15:01 → 403 | GY | — | — | E-37 | — | Orta |
| 38 | Karaca — [karaca.com](https://www.karaca.com) | Mutfak/ev | Doğrulanmadı | Planlanan: kampanya hesaplama | Erişim denemesi 14:15:01 → 403 | GY | — | — | E-38 | — | Düşük |
| 39 | Kanken Home — [kankenhome.com](https://kankenhome.com) | Ev dekorasyon (ayna) | Shopify ([Fiyord](https://tr.fiyord.com/blogs/shopify/turkiye-deki-shopify-magazalari); dizinde `/collections/` yapısı) | Planlanan: ölçü varyantlı ayna, kırılabilir ürün kargo bilgisi | Erişim denemesi 14:15:02 → 403 | GY | — | — | E-39 | — | Yüksek |
| 40 | Atasay — [atasay.com](https://www.atasay.com) | Mücevher | Doğrulanmadı | Planlanan: ölçü (yüzük) + altın fiyatına bağlı fiyat değişimi | Erişim denemesi 14:15:02 → 403 | GY | — | — | E-40 | — | Düşük |
| 41 | Pırlant — [pirlant.com.tr](https://www.pirlant.com.tr) | Mücevher | Doğrulanmadı | Planlanan: yüzük ölçüsü, sertifika bilgisi | Erişim denemesi 14:15:02 → 403 | GY | — | — | E-41 | — | Orta |
| 42 | D Diamond — [ddiamond.com.tr](https://www.ddiamond.com.tr) | Mücevher (gümüş/pırlanta) | Doğrulanmadı | Planlanan: ölçü + iade koşulu | Erişim denemesi 14:15:02 → 403 | GY | — | — | E-42 | — | Orta–Yüksek |
| 43 | Salomon Türkiye — [salomon.com.tr](https://www.salomon.com.tr) | Outdoor/spor | Ticimax (referans aramasında "Salomon" geçiyor; hangi alan adı olduğu doğrulanmadı) | Planlanan: numaralı ayakkabı | Erişim denemesi 14:15:03 → 403 | GY (bkz. aday A5) | — | — | E-43 | — | Orta |
| 44 | ASICS Türkiye — [asics.com.tr](https://www.asics.com.tr) | Spor | Ticimax ([Ticimax referanslar](https://www.ticimax.com/referanslarimiz/)) | Planlanan: numaralı koşu ayakkabısı | Erişim denemesi 14:15:03 → 403 | GY (bkz. aday A3) | — | — | E-44 | — | Düşük–Orta |
| 45 | Decathlon Türkiye — [decathlon.com.tr](https://www.decathlon.com.tr) | Spor perakende | Doğrulanmadı | Planlanan: stok/mağazadan teslim | Erişim denemesi 14:15:03 → 403 | GY | — | — | E-45 | — | Düşük |
| 46 | WalkingPad Türkiye — [walkingpadturkiye.com](https://walkingpadturkiye.com) | Spor ekipmanı | Ticimax ([sağlık referansları](https://www.ticimax.com/saglik-medikal-dogal-urunler-e-ticaret-sitesi/)) | Planlanan: büyük ürün kargo/kurulum, taksit | Erişim denemesi 14:15:04 → 403 | GY | — | — | E-46 | — | Yüksek |
| 47 | Harley-Davidson Shop TR — [harleydavidsonshop.com.tr](https://harleydavidsonshop.com.tr) | Lisanslı giyim/aksesuar | ikas ([ikas sayfası](https://ikas.com/tr/harley-davidson)) | Planlanan: bedenli mont | Erişim denemesi 14:15:04 → 403 | GY | — | — | E-47 | — | Orta–Yüksek |
| 48 | Galen Leather — [galenleather.com](https://www.galenleather.com) | Deri kırtasiye (yurt dışı satış) | Shopify ([Shopify TR blog](https://www.shopify.com/tr/blog/shopify-magazalari)) | Planlanan: kişiselleştirme seçenekli ürün | Erişim denemesi 14:15:04 → 403 | GY | — | — | E-48 | — | Orta (ağırlıklı yurt dışı müşteri) |
| 49 | Hektaş Bahçe — [hektasbahce.com](https://www.hektasbahce.com) | Bahçe/tarım/pet | IdeaSoft ([IdeaSoft referanslar](https://www.ideasoft.com.tr/referanslar/)) | Planlanan: hacim varyantlı gübre | Erişim denemesi 14:15:04 → 403 | GY | — | — | E-49 | — | Düşük–Orta (kurumsal grup) |
| 50 | TFF E-Shop — [eshop.tff.org](https://eshop.tff.org) | Lisanslı taraftar ürünü | IdeaSoft ([IdeaSoft referanslar](https://www.ideasoft.com.tr/referanslar/); dizinde `tff.myideasoft.com` görünüyor) | Planlanan: isim/numara baskılı forma | Erişim denemesi 14:15:05 → 403 | GY (bkz. aday A2) | — | — | E-50 | — | Düşük |

**Sektör dağılımı:** Giyim/ayakkabı/çanta 10, kozmetik/kişisel bakım 8, gıda/kahve 6, takviye/medikal 5, elektronik 3, mobilya 3, ev ürünleri 4, mücevher 3, spor 4, diğer (lisanslı ürün, kırtasiye, bahçe) 4 = **50**.

**Altyapı dağılımı (kaynaklı beyan):** ikas 11, Ticimax 13, Shopify 7, IdeaSoft 5, doğrulanmadı 14.

### 3.1 Doğrulanmış sorunlar

**Yok (0).** Hiçbir siteye erişilemediği için doğrulama yapılamadı.

### 3.2 Aday sorunlar — yalnızca arama motoru dizini gözlemi (site üzerinde DOĞRULANMADI)

Bu maddeler 1 Ekim 2026 tarihinde web arama sonuçlarında görülen URL ve başlıklardan çıkarılmıştır. Sitenin gerçek davranışı (yönlendirme var mı, sayfa açılıyor mu) kontrol edilemedi. **Hiçbiri satış akışı hatası değildir;** çoğu arama motoru hijyeni ve güven/karışıklık riskiyle ilgilidir. İşletmeye karşı bir iddia olarak kullanılmamalıdır.

| Kod | Site | Arama sonucunda görülen | Olası anlamı (hipotez) | Nasıl doğrulanır | Satışa olası etki |
|---|---|---|---|---|---|
| A1 | Qarmacha | Ana site ikas referansında, ancak arama sonuçlarında `www.qarmacha.com/iletisim.aspx` adresi de listelendi | Eski altyapıdan kalma URL dizinde kalmış olabilir | URL'yi açıp 301 yönlendirmesi mi, 404 mü döndüğüne bakmak | Düşük; 404 ise iletişim arayan müşteri kaybolabilir |
| A2 | TFF E-Shop | Arama sonuçlarında hem `eshop.tff.org` hem `tff.myideasoft.com`; ayrıca `eshop.tff.org/sepet` sayfası dizinde | Platformun varsayılan alt alan adı ve sepet sayfası dizine girmiş olabilir | Alt alan adının ana alan adına yönlenip yönlenmediği; sepet sayfasında `noindex` olup olmadığı | Düşük (SEO hijyeni) |
| A3 | ASICS Türkiye | Arama sonuçlarında hem `asics.com.tr` hem `asicstr.com` "Asics Türkiye Resmi Web Sitesi" başlığıyla | Alan adı değişikliği; eski alan adının yönlendirmesi belirsiz | Eski alan adındaki ürün URL'lerinin yeni siteye 301 ile gidip gitmediği | Düşük–orta; eski sayfada fiyat/stok farklıysa müşteri yanılabilir |
| A4 | The Body Shop TR | Arama sonuçlarında hem `thebodyshop.tr` ("yeni resmi site") hem `thebodyshop.com.tr/Default.aspx`; arama özetinde "200₺ ve üzeri ücretsiz kargo" ifadesi | Eski alan adı içeriği dizinde; kargo eşiği ifadesinin güncel olmadığı düşünülüyor (tarih ve kaynak sayfa belirsiz) | Eski alan adı yönlendirmesi ve güncel sitedeki kargo eşiği ile karşılaştırma | Orta (doğrulanırsa): yanlış kargo beklentisi sepet terkinin bilinen nedenlerinden biri |
| A5 | Salomon Türkiye | Arama sonuçlarında "Salomon Türkiye" başlığı taşıyan birden fazla alan adı: `salomon.com.tr`, `salomon-tr.com`, `salomonsturkiye.com`, `salomonturkiye.com` | Hangisinin resmi olduğu bu çalışmada **doğrulanmadı** | Alan adı sahipliği, markanın kendi sosyal medya/iletişim kanallarında gösterdiği adres | Müşteri karışıklığı ve güven riski; ayrı bir "marka adı izleme" hizmeti konusu olabilir |

### 3.3 Yanlış alarmlar ve değerlendirme dışı bırakılanlar

| Kod | Durum | Neden sorun sayılmadı |
|---|---|---|
| Y1 | 50 sitenin tamamında `403` | Hata ortamın ağ politikasından geliyor (proxy CONNECT reddi). Görev kuralı gereği site hatası sayılmadı. |
| Y2 | Qarmacha: ikas referansı ile `.aspx` uzantılı eski URL çelişkisi | Platform göçü olağandır; altyapı çelişkisi tek başına müşteri sorunu değildir. Yalnızca A1 olarak aday listesine alındı. |
| Y3 | "Güllüoğlu" Ticimax referansı | Türkiye'de birden fazla bağımsız Güllüoğlu işletmesi var (omergullu.com.tr, gulluoglu.com, gulluoglushop.com vb.). Hangi sitenin referans olduğu eşleştirilemedi; altyapı "Doğrulanmadı" bırakıldı. |
| Y4 | Arama özetlerinde geçen kargo eşikleri ve ürün fiyatları (ör. bazı kahve sitelerinde "X TL üzeri ücretsiz kargo") | Tarihi ve kaynak sayfası belirsiz. Görev kuralı gereği güncel veri gibi kullanılmadı. |
| Y5 | Shopify Türkiye mağaza sayısı için bir blogda "2.148", Store Leads'te "15.784" | Eski blog verisi ile güncel tarayıcı verisi çelişiyor. Tarihli kaynak (Store Leads, 10 Temmuz 2026) tercih edildi. |

---

## 4. En sık karşılaşılan 10 sorun

**Önemli:** Bu çalışmada sorun gözlenemediği için **gözleme dayalı bir sıklık sıralaması üretilemedi.** Aşağıdaki liste; Baymard'ın küresel bulguları, Şikâyetvar'daki şikâyet kategorileri ve Türkiye'deki ödeme/teslimat alışkanlıklarından türetilmiş bir **hipotez listesidir.** Sıra, beklenen sıklığa göre bir tahmindir. Saha denetiminde ilk test edilecek liste budur.

**Baymard'ın sepet terk nedenleri (arama özetleri):** ek maliyetlerin yüksek olması %39–48, hesap açma zorunluluğu %19–26, güvensizlik %19, karmaşık/uzun ödeme süreci %17–18, site hatası/çökmesi %17. Farklı aramalarda farklı yıllara ve farklı oran tabanlarına (tüm katılımcılar / "sadece bakıyordum" diyenler hariç) ait rakamlar döndüğü için aralık verildi; kesin değerler Baymard'ın sayfasından teyit edilmeli.

| # | Beklenen sorun | Dayanak | Nasıl kontrol edilir |
|---|---|---|---|
| 1 | Ücretsiz kargo eşiğinin sayfalar arasında çelişmesi (üst bant, ürün sayfası, sepet, SSS) | Baymard: ek maliyetler en büyük terk nedeni; Şikâyetvar'da "ücretsiz kargo yazıyordu, ücret alındı" şikâyetleri | Eşiğin altında/üstünde sepet oluşturup her sayfadaki ifadeyi karşılaştırmak |
| 2 | Ek ücretlerin geç gösterilmesi (kapıda ödeme bedeli, kargo, hizmet bedeli) | Baymard: beklenmedik ek maliyet ve toplam tutarın önceden görülememesi | Sepette ve ödeme sayfasında toplam tutarın değişip değişmediği |
| 3 | Kupon/indirim kodu hataları (uygulanmıyor, yanlış hesaplanıyor, şartlar belirsiz) | Şikâyetvar'da Hepsiburada, Trendyol, Migros için kupon kategorileri | Kampanya duyurusundaki kodu, şartlara uyan/uymayan sepetlerde denemek |
| 4 | Stokta görünüp sipariş sonrası iptal / stok bilgisinin sayfalar arasında farklı olması | Şikâyetvar'da İpekyol, Armine, Hepsiburada vb. için "stokta görünüyordu, iptal edildi" | Ürün sayfası, varyant ve sepet stok mesajlarını karşılaştırmak |
| 5 | Varyant seçim hataları (beden seçmeden sepete ekleme, tükenen bedenin seçilebilmesi, varyant fiyatının güncellenmemesi) | Hipotez (giyim ve kozmetikte varyant yoğun) | Her varyantı seçip fiyat/stok/görselin değişimini izlemek |
| 6 | Zorunlu üyelik veya misafir alışverişin kapalı olması | Baymard: zorunlu hesap açma başlıca terk nedenlerinden; ikas'ta misafir alışveriş varsayılan açık, Ticimax'ta panel ayarı | Sepetten ödemeye geçerken üyelik dayatılıp dayatılmadığı |
| 7 | Mobilde açılır pencere, çerez bandı veya sabit çubukların "Sepete ekle" düğmesini kapatması; küçük dokunma alanları | Hipotez; Türkiye'de işlemlerin büyük kısmı mobil | 2 farklı ekran boyutunda ürün sayfası ve sepet |
| 8 | Ödeme sağlayıcıya yönlendirme ve 3D Secure dönüş hataları | Şikâyetvar'da "ödeme sayfası hata veriyor" şikâyetleri; Shopify Türkiye'de Shopify Payments yok, iyzico/PayTR gibi sağlayıcılara yönlendirme gerekiyor (ajans kaynağı) | Kişisel bilgi girmeden ödeme sayfasının yüklenip yüklenmediğini görmek (kart işlemi yapılmaz) |
| 9 | Bozuk iletişim bağlantıları (yanlış biçimli WhatsApp `wa.me` numarası, tıklanamayan telefon, eksik e-posta) | Hipotez; Türkiye'de müşteri iletişiminde mesajlaşma tercih ediliyor (sektör kaynağı) | Her iletişim bağlantısının hedefini kontrol etmek (mesaj göndermeden) |
| 10 | Teslimat, iade ve ödeme bilgilerinin eksik veya çelişkili olması (cayma süresi, teslim süresi, iade kargo ücreti) | Mesafeli Sözleşmeler Yönetmeliği zorunlu bilgileri; Baymard'da iade politikası memnuniyetsizliği de bir terk nedeni | Ürün sayfası, SSS, iade sayfası ve ön bilgilendirme metnini karşılaştırmak |

---

## 5. En fazla para kaybettirme ihtimali olan 5 sorun

Bu sıralama ölçüme değil, **satışa etki mekanizmasına dayalı bir değerlendirmedir.**

| # | Sorun | Neden çok para kaybettirir |
|---|---|---|
| 1 | **Sepetten ödeme sayfasına geçişin veya ödeme sayfasının kırılması** | Etkilenen ziyaretçilerin satın alma oranı sıfıra iner. Reklam harcaması tamamen boşa gider. Mağaza sahibi çoğu zaman fark etmez, çünkü platform "site açık" görünür. |
| 2 | **Sepete ekleme çalışmaması (varyant veya tema/uygulama çakışması)** | Etkilenen ürün veya cihazda satış tamamen durur. Mobilde olursa trafiğin büyük kısmını etkiler. |
| 3 | **Beklenmedik ek maliyet / çelişkili kargo bilgisi** | Baymard'a göre en büyük terk nedeni. Her sepeti biraz etkiler; toplam etkisi büyük olabilir. |
| 4 | **Kupon ve kampanya hesaplama hatası** | İki yönlü kayıp: indirim uygulanmazsa müşteri kaçar; fazla uygulanırsa marj kaybolur. Ayrıca 1 Ağustos 2026'dan itibaren indirim öncesi fiyatın "son 10 günün en düşük fiyatı" olması kuralına aykırılık idari para cezası riski doğurur (bkz. 6. bölüm). |
| 5 | **Stok/fiyat tutarsızlığı** | Sipariş iptali, iade maliyeti, müşteri güven kaybı ve olumsuz yorum. Pazaryerinde de satan işletmelerde senkronizasyon hatası ayrıca pazaryeri yaptırımlarına yol açabilir (bu çalışmada doğrulanmadı). |

**Satış konuşmasında kullanılabilecek kayıp hesabı (örnek; gerçek veri değildir):**

> Aylık kayıp ≈ etkilenen oturum sayısı × normal dönüşüm oranı × ortalama sepet tutarı
>
> Örnek varsayım: aylık 20.000 mobil oturum, %1,5 dönüşüm oranı, 1.200 TL ortalama sepet, hata mobil oturumların %10'unu etkiliyor.
> 2.000 oturum × 0,015 × 1.200 TL = **36.000 TL/ay**.
>
> Bu rakamlar örnektir. Her müşteri için kendi analitik verisiyle hesaplanmalıdır.

---

## 6. Mağaza sahiplerinin para ödeyebileceği hizmet paketi önerileri

Aşağıdaki fiyatlar **öneridir; pazar tarafından doğrulanmamıştır.** Karşılaştırma noktaları:
- Bionluk'ta SEO analiz raporları: 200–350 TL (alt sınır; farklı hizmet) — arama özeti.
- Türkiye'de bir danışmanlık firmasının yayımladığı bantlar: tek seferlik teşhis paketi 15–40 bin TL, saatlik 2.000–6.000 TL, aylık 20–60 bin TL — tek kaynak, arama özeti.
- Fiverr'da Shopify CRO denetimi: 45–300 $; ajans denetimleri genellikle 500–2.000 $ — arama özeti.

| Paket | İçerik | Önerilen fiyat (KDV hariç) | Kim için |
|---|---|---|---|
| **0. Ücretsiz mini tarama** | 3 doğrulanmış bulgu, her biri için ekran kaydı ve tek cümlelik çözüm. 1 sayfa. | 0 TL (müşteri kazanma aracı) | Herkes; yalnızca gerçekten sorun bulunan mağazalara gönderilir |
| **A. Hızlı akış denetimi** | 3 ürün, mobil + masaüstü, ürün → varyant → sepet → kupon → kargo → ödeme sayfası girişi; ~30 maddelik kontrol listesi; video kanıt; öncelik sırası; "hangi panel ayarıyla düzelir" notları | 4.900 TL | Küçük mağaza, reklam harcaması başlamış |
| **B. Kapsamlı denetim + düzeltme planı** | 10 ürün/varyant, 2 cihaz + 2 tarayıcı, tüm kampanya ve kupon senaryoları, iletişim kanalları, teslimat/iade/ödeme metinlerinin tutarlılığı, Türkiye'ye özgü kontrol listesi (kapıda ödeme, havale indirimi, taksit tablosu, il/ilçe adres formu, fatura tipi); 45 dakikalık sunum | 12.900 TL | Orta ölçekli mağaza, düzenli kampanya yapan |
| **C. Düzeltme uygulaması** | Panel ayarı, tema düzenlemesi ve uygulama çakışması gibi düzeltilebilir maddelerin uygulanması; sonrasında yeniden test | 2.000 TL/saat veya madde başı sabit fiyat | A/B paketini alanlar |
| **D. Kampanya bekçisi (abonelik)** | Ayda 2 kampanya öncesi kontrol (kupon, kargo eşiği, bant-sepet fiyat tutarlılığı), haftalık otomatik "sepete ekle → ödeme sayfası açılıyor mu" testi, aylık kısa rapor | 2.990 TL/ay (min. 3 ay) | Sık kampanya yapanlar |
| **E. Ajans/iş ortağı paketi** | Ajansın kendi markasıyla sunduğu denetim (beyaz etiket) | Denetim başına 3.000–6.000 TL toptan | Meta/Google reklam ajansları, platform partner ajansları |

**Mevzuat eklentisi (dikkatli sunulmalı):** Ön bilgilendirme metinleri, iletişim bilgileri ve indirim gösterimi için bir kontrol listesi sunulabilir; ancak bu **hukuki görüş değildir** ve bir avukatla iş birliği yapılmadan "uyum garantisi" verilmemelidir.

İlgili mevzuat bilgileri (arama özetleri; resmi metinden teyit edilmeli):
- **İndirim duyuruları:** Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği'ndeki değişiklik 1 Temmuz 2026 tarihli ve 33297 sayılı Resmî Gazete'de yayımlandı, **1 Ağustos 2026'da yürürlüğe girdi.** İndirim öncesi fiyat olarak artık son 30 gün yerine **son 10 günün en düşük fiyatı** esas alınıyor.
- **Mesafeli sözleşmeler:** Ön bilgilendirmede satıcı bilgileri, vergiler dahil toplam fiyat, teslimat masrafları, ödeme/teslimat bilgisi ve 14 günlük cayma hakkı bilgisi zorunlu. 2026 yılı için cayma hakkı, bilgilendirme yükümlülüğü ve keyfi sipariş iptali yasağına aykırılıkta **işlem başına 3.973 TL** idari para cezası bildiriliyor.
- **Aldatıcı reklam:** Haberlerde 108.370 TL ile 39.916.524 TL arasında idari para cezası tutarları geçiyor.

---

## 7. Türkiye'de hedef müşteri profili

### 7.1 Pazar büyüklüğü (kaynaklı)

| Gösterge | Değer | Kaynak / güvenilirlik |
|---|---|---|
| 2025 e-ticaret hacmi | 4,57 trilyon TL (+%52,2) | Ticaret Bakanlığı duyurusu, 12.05.2026 (arama özeti) |
| 2025 perakende e-ticaret hacmi | 2,46 trilyon TL | Aynı |
| 2025 işlem sayısı | 5,94 milyar | Aynı |
| 2025 e-ticaret yapan işletme sayısı | 634.611 | Aynı |
| 2024 e-ticaret yapan işletme sayısı | 600.800 | Ticaret Bakanlığı duyurusu, 06.05.2025 (arama özeti) |
| Pazaryerinde satan işletme | ~540 bin | Bakanlık raporuna dayanan kaynaklar (yılı 2023/2024 olarak farklı aktarılıyor) |
| **Kendi sitesi/uygulamasından satan ETBİS kayıtlı işletme** | **35 bin+** | Aynı; **yıl belirsiz** |
| Mobil işlem payı | 2024'te %72; diğer bir özette mobil uygulamaların işlem adedinin %91'i | Arama özetleri; çelişkili olabilir, doğrulanmadı |
| Shopify canlı mağaza (TR) | 15.784 (183'ü Shopify Plus) | Store Leads, 10 Temmuz 2026 |
| WooCommerce canlı mağaza (TR) | 39.879 (BuiltWith: 51.867) | Store Leads, 28 Ağustos 2026 |
| ikas kullanıcı işletme | 20.000+ | Şirket beyanı (Eylül 2026 haberi) |
| Ticimax | 30.000+ marka | Şirket beyanı |
| IdeaSoft | 35.000+ / 50.000+ (çelişkili) | Şirket beyanı |

**Yorum:** Platform beyanlarının toplamı ETBİS'teki 35 bin rakamından çok yüksek. Platform sayıları kümülatif olabilir veya pasif mağazaları içerebilir; ETBİS kaydı eksik olabilir. **Gerçekçi hedeflenebilir kitle on binlerle ifade ediliyor; para ödeyebilecek kısmı bilinmiyor.**

### 7.2 İdeal müşteri (tahmine dayalı; doğrulanmalı)

- **Kendi sitesinden satış yapıyor** (yalnızca pazaryerinde satanlar ödeme akışını kontrol edemez).
- **Hazır altyapı** kullanıyor: ikas, Ticimax, IdeaSoft, T-Soft, Shopify, WooCommerce.
- **Ücretli reklam harcaması var** (Meta/Google). Kayıp ancak trafik satın alındığında somut hissedilir.
- **Kendi yazılım ekibi yok;** 1–15 kişilik ekip.
- **Sık kampanya ve kupon kullanıyor** (giyim, kozmetik, kahve/gıda, takviye, ev dekorasyon).
- Ücretli paket kullanıyor (ör. ikas Lift ve üzeri — arama özetine göre yıllık 39.948 TL + KDV; Ticimax Advantage ve üzeri). Ücretsiz/başlangıç paketindeki mağazaların denetime para ayırması daha az olası.

### 7.3 Hedeflenmemesi gerekenler

- Büyük perakendeciler ve pazaryerleri: kendi ekipleri ve test firmaları var (ör. Testinium'un Clutch profilinde minimum proje büyüklüğü 75.000 $+ — arama özeti).
- Sadece pazaryerinde satanlar (başka bir ürün gerekir; bkz. 14. bölüm).
- Çok düşük trafikli yeni mağazalar: düzeltmenin parasal karşılığı gösterilemez.

---

## 8. Müşteriye nasıl ulaşılacağı ve satış konuşması

### 8.1 Kanallar (öncelik sırasıyla)

1. **Somut bulguyla doğrudan e-posta.** Önce siteyi denetleyip gerçek bir sorun bulun, sonra yalnızca o mağazaya özel yazın.
   - Hukuki not: 6563 sayılı Kanun ve ilgili yönetmeliğe göre **tacir veya esnafa ticari elektronik ileti için önceden onay gerekmez; ancak ret hakkı kullanılmışsa gönderilemez** ve gönderim öncesinde İYS kontrolü gerekir. Uygulamayı bir mali müşavir veya avukatla teyit edin.
2. **Reklam ajansları ve platform partner ajansları.** Dönüşümü düşük olan mağaza, ajansın reklam performansını da kötü gösterir. ikas ve Ticimax'ın partner programları var. Bu ajanslara beyaz etiketli denetim (Paket E) önerilebilir.
3. **İçerik:** LinkedIn/Instagram'da "Bu hafta 20 sitenin sepetini test ettik, en sık 5 hata" türünden **isimsiz** paylaşımlar. Marka adı vererek hata ifşa etmeyin (itibar ve hukuki risk).
4. **E-ticaret toplulukları ve etkinlikler** (dernek etkinlikleri, platformların kullanıcı toplulukları).
5. **Kampanya dönemi zamanlaması:** Kasım indirim dönemi öncesi (Ekim–Kasım başı) "kampanya öncesi kontrol" teklifi.

### 8.2 Satış konuşması (e-posta taslağı)

> **Konu:** [Mağaza adı] — mobil sepette fark ettiğimiz bir sorun
>
> Merhaba [Ad],
>
> [Tarih] günü sitenizi normal bir müşteri gibi telefondan denedik. [Ürün adı] ürününde [sorun: ör. "beden seçildiğinde fiyat güncellenmiyor ve sepette farklı tutar çıkıyor"]. Aynı durumu sayfayı yenileyip ikinci bir üründe de gördük. 40 saniyelik ekran kaydını ekledik.
>
> Bu tür sorunlar genellikle bir panel ayarı veya tema düzenlemesiyle çözülüyor. İsterseniz 2 sorun daha içeren kısa raporu ücretsiz gönderelim.
>
> Ücretli bir şey istemiyoruz; raporu faydalı bulursanız tüm satın alma akışını ayrıntılı denetlemeyi konuşabiliriz.
>
> [İmza — ad, telefon, web sitesi]
> Bu tür e-postaları almak istemiyorsanız bu e-postayı yanıtlamanız yeterli.

### 8.3 Görüşmede kullanılacak 4 soru

1. Son 30 günde reklama ne kadar harcadınız, sitenizin dönüşüm oranı nedir?
2. Kampanyalarınızı yayına almadan önce kim test ediyor?
3. Son kampanyada kupon, kargo veya stokla ilgili müşteri şikâyeti geldi mi?
4. Sitenizde en son ne zaman tema veya uygulama değişikliği yaptınız?

### 8.4 İtirazlar ve yanıtlar

| İtiraz | Yanıt |
|---|---|
| "Platform zaten bunu yapıyor." | Platform ödeme altyapısını çalışır tutar; sizin kampanya ayarınızı, temanızı ve metinlerinizi test etmez. Bulduğumuz sorun platform hatası değil, ayar/içerik sorunu. |
| "Ajansımız var." | Ajansınıza rapor verebiliriz; düzeltmeyi onlar uygular. |
| "Bütçemiz yok." | Ücretsiz mini raporla başlayın; yalnızca kanıt gösterebildiğimizde ücret konuşalım. |
| "Bu kadar trafik kaybettiğimize inanmıyorum." | Kendi analitik verinizle birlikte hesaplayalım (5. bölümdeki formül). |

---

## 9. Tek seferlik hizmet ve aylık abonelik modeli

| | Tek seferlik denetim | Aylık abonelik |
|---|---|---|
| Satması | Daha kolay; somut çıktı (rapor + video) | Zor; sürekli değer kanıtlanmalı |
| Müşteri motivasyonu | Sorun gösterildiğinde yüksek | İlk düzeltmelerden sonra düşer |
| Gelir öngörülebilirliği | Düşük | Yüksek (iptal oranı düşükse) |
| Değerin devam etmesi | — | Site sık değişiyorsa var (kampanya, tema, uygulama güncellemesi); değişmiyorsa yok |
| Risk | Sürekli yeni müşteri bulma baskısı | Müşterinin 2–3 ay sonra "yeni bir şey bulunmuyor" diyerek ayrılması |

**Öneri:** Önce **tek seferlik denetim + düzeltme** satın. Aboneliği yalnızca **sık kampanya yapan** müşterilere, "kampanya öncesi kontrol" adıyla ve en az 3 aylık taahhütle önerin. Alternatif olarak "kontrol kredisi" (ör. 5 kampanya kontrolü paketi) iptal riskini azaltabilir. Yurt dışında yalnızca izleme yapan ucuz uygulamaların var olması (ör. MyStoreGuardian 9,99–99,99 $/ay; arama sırasında Shopify App Store'da hiç değerlendirmesi görünmüyordu) saf izlemeye yüksek ödeme isteği olmadığına dair zayıf bir işarettir.

---

## 10. Tahmini maliyetler ve gelir modeli

### 10.1 Sabit maliyetler (2 kişi, şahıs şirketi varsayımı)

| Kalem | Tutar | Kaynak / not |
|---|---|---|
| Şahıs şirketi kuruluşu | ~2.240–5.500 TL (tek seferlik) | Muhasebe sitelerinden arama özeti |
| Muhasebe | 3.593 TL/ay'dan başlayan | Arama özeti; mali müşavire göre değişir |
| Bağ-Kur (şirket sahibi için) | 10.156,73 TL/ay (5 puan indirimli en düşük) | 2026 tutarı, arama özeti. Kurucu başka bir işte SGK'lı çalışıyorsa durum farklıdır; mali müşavire sorulmalı. |
| Yazılım | Playwright (açık kaynak), Microsoft Clarity (ücretsiz) | Ücretli test platformları ilk aşamada gereksiz |
| Test cihazları | Kurucuların mevcut telefonları (0 TL varsayıldı) | En az 1 iOS + 1 Android önerilir |
| Alan adı, e-posta, basit web sitesi | Düşük; fiyat bu çalışmada doğrulanmadı | — |
| Hizmet sözleşmesi şablonu (avukat) | Fiyat doğrulanmadı | Önerilir |
| **Aylık sabit toplam (yaklaşık)** | **≈ 13.750 TL/ay** (muhasebe + 1 Bağ-Kur) | Kurucu maaşları hariç |
| **İlk 3 ay toplam** | **≈ 43–47 bin TL** (kuruluş dahil) | Kurucu maaşları hariç |

Referans: 2026 asgari ücret net 28.075 TL, brüt 33.030 TL (Temmuz 2026'da ara zam yapılmadı — arama özeti). İki kurucunun asgari ücret düzeyinde gelir alabilmesi için aylık sabit gidere ek olarak ≈ 56 bin TL gerekir; yani **aylık ≈ 70 bin TL** ciro (KDV ve vergiler hariç) başa baş noktasıdır.

### 10.2 İlk 3 ay gelir senaryoları (KDV hariç; tamamen varsayım)

Fiyatlar: A = 4.900 TL, B = 12.900 TL, abonelik = 2.990 TL/ay, düzeltme = 2.000 TL/saat.

| Senaryo | 1. ay | 2. ay | 3. ay | 3 ay toplam | Sabit gider sonrası (3 ay) |
|---|---|---|---|---|---|
| **Kötümser** | 0 | 1A = 4.900 | 2A = 9.800 | **14.700 TL** | ≈ −30 bin TL |
| **Baz** | 1A = 4.900 | 2A + 1B = 22.700 | 3A + 1B + 2 abone + 8 saat = 49.580 | **77.180 TL** | ≈ +32 bin TL (iki kurucuya kişi başı ayda ≈ 5.300 TL) |
| **İyimser** | 2A + 1B = 22.700 | 3A + 2B + 2 abone + 15 saat = 76.480 | 4A + 3B + 5 abone + 25 saat = 123.250 | **222.430 TL** | ≈ +177 bin TL (iki kurucuya kişi başı ayda ≈ 29.500 TL) |

**Kapasite notu (tahmin):** Paket A ≈ 4–6 saat, Paket B ≈ 12–16 saat iş. İyimser senaryonun 3. ayı (4A + 3B + 25 saat düzeltme ≈ 90–110 saat) iki kişi için yönetilebilir; asıl darboğaz satıştır.

**Sonuç:** Baz senaryoda iş ilk 3 ayda kurucuları geçindirmez. Bu, ancak yan iş olarak veya birikimle yürütülebilecek bir başlangıçtır.

---

## 11. Rakipler ve yurt dışında benzer hizmetler

### 11.1 Türkiye

| Rakip türü | Örnekler | Fiyat bilgisi | Bizden farkı / tehdit |
|---|---|---|---|
| CRO / dönüşüm optimizasyonu ajansları | Magna Dijital, İKOMERS, Pixenon, Sanal Yönetmen, Nuans, ROIPublic, Magmaroot, Poligon, dotCREA | Yayımlanmamış; çoğu ücretsiz ön analiz sunuyor | Daha geniş hizmet (A/B testi, tasarım). "Ücretsiz ön analiz" bizim giriş teklifimizle doğrudan çakışır. |
| Platform partner ajansları | ikas ve Ticimax partner ajansları (Artelio, Prix Studio, Admaxima vb.) | Kurulum/bakım odaklı | Mağazanın panel erişimi onlarda; **hem rakip hem satış kanalı** |
| E-ticaret danışmanları | Bireysel danışmanlar ve butik firmalar | Bir firma: teşhis paketi 15–40 bin TL, aylık 20–60 bin TL | Daha üst fiyat bandı; stratejik danışmanlık |
| Freelance pazar yerleri | Bionluk, Armut | SEO analiz raporu 200–350 TL | Çok düşük fiyat çıpası oluşturuyor |
| Kurumsal test otomasyonu | Testinium, Keytorc, Virgosol | Testinium için min. proje 75.000 $+ (Clutch, arama özeti) | Büyük kurumlar; KOBİ'ye inmiyorlar |
| Operasyonel e-ticaret denetimi | FS Denetim (eticaretdenetim.com) | Bilinmiyor | Stok, muhasebe, iade süreçlerine odaklı; site akışı değil |
| Ücretsiz araçlar | Microsoft Clarity (tamamen ücretsiz: ısı haritası, oturum kaydı), Google Analytics | 0 TL | Mağaza sahibi sorunu kendisi bulabilir (ama çoğu zaman bakmaz) |
| Platformların kendisi | ikas, Ticimax, IdeaSoft destek ekipleri | Pakete dahil | Bu özelliği ürüne eklerlerse pazar daralır |

**Not:** Türkiye'de yalnızca "satın alma akışı hata denetimi" satan, KOBİ odaklı, görünür bir hizmet arama sonuçlarında bulunamadı. Bu bir fırsat da olabilir, talep olmadığının işareti de. Arama ile sınırlı bir tespittir.

### 11.2 Yurt dışı

| Hizmet | Ne yapıyor | Fiyat (arama özeti; doğrulanmadı) |
|---|---|---|
| Baymard Institute | Araştırmaya dayalı UX denetimi | Genel denetim 3.400–9.700 $; mobil denetim 10.900 $; erişilebilirlik denetimi 21.900 $; "olumlu yatırım getirisi yoksa ücretsiz" garantisi |
| Noibu | E-ticaret hata izleme; hatanın gelir etkisini tahmin ediyor | Teklife göre (trafik/ciroya bağlı) |
| Contentsquare / Quantum Metric / Glassbox | Kurumsal deneyim analitiği, hata ve gelir etkisi | Satış ekibiyle; yüksek |
| Hotjar (Contentsquare) | Isı haritası, oturum kaydı | Ücretsiz katman + ücretli planlar (kaynaklarda rakamlar çelişkili) |
| Ghost Inspector | Tarayıcı otomasyonuyla sepet/ödeme izleme | ≈ 109–499 $/ay (kaynaklar arasında küçük farklar) |
| Shopify uygulamaları: MyStoreGuardian, Uptime, TestingBot, Blimey | Otomatik "sepete ekle/ödeme çalışıyor mu" testi | MyStoreGuardian 9,99–99,99 $/ay; Uptime 29 $/ay'dan başlıyor |
| Fiverr/ajans CRO denetimleri | Manuel Shopify denetimi | Fiverr 45–300 $; CRO.media 1.499 $; ajanslar 500–2.000 $; aylık hizmet 2.500 $+ |

### 11.3 Nasıl ayrışılabilir?

1. **Türkiye'ye özgü kontrol listesi:** kapıda ödeme ek ücreti, havale/EFT indirimi, taksit tablosu, iyzico/PayTR yönlendirmesi, il/ilçe adres formu, bireysel/kurumsal fatura alanları, WhatsApp butonları, 10 gün indirim kuralı, ön bilgilendirme metni.
2. **Platforma özgü çözüm:** Her bulgunun yanında "ikas/Ticimax/Shopify panelinde hangi menüden düzelir" bilgisi. Genel UX tavsiyesi değil, uygulanabilir talimat.
3. **Kanıt formatı:** Her bulgu için kısa ekran kaydı ve tekrar testi sonucu. "Doğrulanmamış bulguyu raporlamama" ilkesi.
4. **Sonuç garantisi:** "En az 3 doğrulanmış satış etkili sorun bulamazsak ücret iadesi" (Baymard'ın benzer garantisinden esinlenerek).
5. **Kampanya takvimine bağlı teklif:** Kasım indirimleri, Anneler Günü, okul dönemi öncesi kontrol.

---

## 12. Bu işin güçlü ve zayıf tarafları

| Güçlü taraflar | Zayıf taraflar |
|---|---|
| Başlangıç maliyeti düşük; ekipman ve yazılım neredeyse ücretsiz | **Sorunun Türk KOBİ sitelerinde ne sıklıkta olduğu bilinmiyor** (bu çalışmada ölçülemedi) |
| Somut, gösterilebilir çıktı (video kanıt) | Hazır platformlarda ödeme altyapısı ortak; temel hatalar platform tarafından düzeltilir, mağazaya kalan sorunlar çoğunlukla ayar/içerik düzeyinde |
| Sepet terki küresel ölçekte yüksek (~%70) ve bilinen bir problem | Türkiye'de düşük fiyat çıpası (Bionluk 200–350 TL) ve "ücretsiz ön analiz" yapan ajanslar |
| Mevzuat değişiklikleri (10 gün kuralı, 1 Ağustos 2026) yeni kontrol ihtiyacı doğuruyor | Düşük trafikli mağazada düzeltmenin parasal etkisini kanıtlamak zor |
| Ajanslar ve platform partnerleri üzerinden kanal kurulabilir | Manuel hizmet ölçeklenmez; gelir çalışılan saate bağlı |
| Kampanya dönemleri doğal satış zamanları yaratıyor | Platformlar benzer bir özelliği ürünlerine ekleyebilir |
| 2 kişiyle başlanabilir | Düzeltme için panel/tema erişimi gerekir; mağazalar bunu vermek istemeyebilir |
| | Marka adıyla hata paylaşmak itibar ve hukuki risk taşır; pazarlama dikkatli yapılmalı |
| | Kendi sitesinden satış yapan kitle pazaryeri satıcılarına göre küçük (35 bin+ ETBİS kaydı) |

---

## 13. 30 günlük doğrulama planı

**Amaç:** Üç varsayımı ucuza test etmek. (1) Sorun yaygın mı? (2) Mağaza sahibi önemsiyor mu? (3) Para ödüyor mu?

| Gün | İş | Çıktı | Başarı ölçütü |
|---|---|---|---|
| 1–2 | Kısıtsız ağa sahip bir bilgisayarda çalışma düzeni; 40–60 maddelik kontrol listesinin son hali; ekran kaydı aracı | Kontrol listesi v1 | — |
| 3–10 | **Bu raporda yapılamayan saha denetimi:** Tablodaki 50 site (özellikle "Yüksek/Orta" uygunluktaki ~30 KOBİ) + 20 yeni KOBİ sitesi. Her sitede 2 ürün, mobil + masaüstü, tekrar testi. Kural: ödeme/sipariş/hesap/kişisel bilgi yok. | Site başına bulgu kaydı; doğrulanmış / aday / yanlış alarm ayrımı | KOBİ sitelerinin **en az %30'unda** en az 1 doğrulanmış, satışı doğrudan etkileyen sorun |
| 11–13 | Bulguları sınıflandırma; en sık 10 sorunun gerçek listesi; 3 bulgulu mini raporların hazırlanması | 25–35 mini rapor | — |
| 14–24 | Yalnızca doğrulanmış sorunu olan mağazalara kişisel e-posta (İYS/ret kontrolüyle); 10 reklam/partner ajansına beyaz etiket teklifi; paralel olarak 2 alternatif teklif: "kampanya öncesi kontrol" ve "platform göçü sonrası kontrol" | Görüşme takvimi | **≥ 10 görüşme**; ajanslardan ≥ 2 ilgi |
| 25–28 | Ücretli teklif (Paket A/B); ücretsiz rapor alanlardan takip | Teklifler | **≥ 3 ücretli satış** (≥ 4.900 TL) |
| 29–30 | Karar toplantısı | Devam / değiştir / bırak kararı | Aşağıdaki kurallar |

**Karar kuralları (önceden belirlenmiş):**
- Doğrulanmış satış etkili sorun oranı KOBİ sitelerinde **%20'nin altındaysa** → fikir zayıf; bırakın veya mevzuat/kampanya kontrolüne yönelin.
- 40+ kişisel temasa rağmen **5'ten az görüşme** → mesajı/kanalı değiştirip 2 hafta daha deneyin; yine olmazsa bırakın.
- 30 günde **0 ücretli müşteri** → tam zamanlıya geçmeyin.
- **≥ 3 ücretli müşteri ve en az 1 tekrar/abonelik talebi** → 60 gün daha, yan iş olarak devam; 3. ayda 70 bin TL/ay hedefine yaklaşılıyorsa tam zamanlıyı düşünün.

**Bütçe:** Kurucuların zamanı dışında neredeyse sıfır. Şirket kurmadan önce ilk ödemeler için mali müşavire danışın (fatura kesilmesi gerekir).

---

## 14. Son karar: Bu fikre başlanmalı mı?

### Karar

**Tam zamanlı olarak başlanmamalı. 30 günlük, düşük maliyetli doğrulama yapılmalı.** Bu bir "evet" değil; "henüz bilinmiyor" kararıdır. Bu raporun en önemli eksikliği, fikrin temel varsayımını test edecek saha denetiminin yapılamamasıdır. Bu nedenle olumlu yönde de olumsuz yönde de kesin bir karar savunulamaz.

### Net cevaplar

**1. Türkiye'de bu hizmete gerçekten ihtiyaç var mı?**
Sorunların genel olarak var olduğuna dair **dolaylı kanıt** var: ~%70 sepet terki, Şikâyetvar'daki kupon/kargo/stok/ödeme şikâyetleri. Ancak bu şikâyetler çoğunlukla büyük platformlarla ilgili. Hedef KOBİ sitelerinde bu sorunların ne sıklıkta olduğu **ölçülemedi.** Cevap: **Bilinmiyor; muhtemelen var ama boyutu kanıtlanmadı.**

**2. Mağaza sahipleri bu sorunları çözmek için para öder mi?**
Yurt dışında öderler (Baymard, Fiverr denetimleri, Noibu). Türkiye'de CRO ajansları ve danışmanlar var. Ancak KOBİ'lerin özellikle "akış denetimi" için ödeme yaptığına dair **doğrudan kanıt bulunamadı;** düşük fiyat çıpası (200–350 TL'lik analiz raporları) ve ücretsiz ön analiz yapan ajanslar bir risk. Cevap: **Bir kısmı, somut kayıp gösterildiğinde ödeyebilir; oranı ve tutarı test edilmeli.**

**3. Manuel hizmet mi, yazılım mı?**
**Manuel hizmet.** Yazılım için önce hangi hataların tekrar ettiğini bilmek gerekir. Yurt dışında ucuz izleme yazılımları var ve en azından biri hiç değerlendirme almamış görünüyor. Bu, saf izlemeye ödeme isteğinin zayıf olabileceğine işaret ediyor. Otomasyonu (Playwright betikleri) yalnızca kendi verimliliğiniz için kullanın.

**4. İlk müşteriyi bulmak kolay mı?**
**Kolay olduğunu gösteren kanıt yok.** Somut bir hatayı videoyla göstermek kapı açabilir; ama bu bir hipotez. Ajanslar üzerinden gitmek doğrudan satıştan daha hızlı olabilir. İlk müşteri için 30 günlük planda en az 40 kişisel temas öngörüldü.

**5. Aylık abonelik mantıklı mı?**
**Başlangıçta hayır;** yalnızca sık kampanya yapan müşteriler için "kampanya öncesi kontrol" olarak, en az 3 ay taahhütle. Site değişmiyorsa abonelik değeri hızla düşer ve müşteri ayrılır.

**6. Rakiplerden nasıl ayrışabiliriz?**
Türkiye'ye özgü kontrol listesi (kapıda ödeme, taksit, havale indirimi, iyzico/PayTR, il/ilçe, 10 gün indirim kuralı), platforma özgü "hangi menüden düzelir" talimatı, video kanıt, doğrulanmamış bulguyu raporlamama ve "sorun bulamazsak iade" garantisi.

**7. 3 kişiyle mi, 2 kişiyle mi başlanmalı?**
**2 kişi.** Biri denetim/teknik (platform panelleri, tema, test), biri satış/iletişim. Baz senaryoda gelir ilk 3 ayda 2 kişiyi bile geçindirmiyor; 3 kişi ancak ≥ 5 düzenli ödeme yapan müşteri ve düzeltme talebi oluşursa düşünülmeli.

**8. İlk 3 ayda gerçekçi gelir ne olabilir?**
Varsayımlara dayalı senaryolar: **toplam 15 bin TL (kötümser), 77 bin TL (baz), 222 bin TL (iyimser), KDV hariç.** Bu rakamlar pazar verisine değil varsayıma dayanır. Gerçekçi beklenti: **0–80 bin TL aralığı.**

**9. Bu fikir neden başarısız olabilir?**
- Hazır platformlarda ciddi akış hataları az çıkabilir; bulgular "genel UX tavsiyesi"ne dönüşür ve değeri düşer.
- Ödeme isteği düşük; ajansların ücretsiz ön analizleriyle rekabet zor.
- Düşük trafikli mağazada parasal etki kanıtlanamaz.
- Mağazalar panel/tema erişimi vermez, düzeltme geliri oluşmaz.
- Platformlar benzer kontrolleri ürünlerine ekleyebilir.
- Hedef kitle (kendi sitesi olan, reklam veren, bütçesi olan KOBİ) beklenenden küçük olabilir.
- Satış, kurucuların zamanının büyük kısmını yer; manuel iş ölçeklenmez.

**10. Bu fikir yerine daha iyi bir iş modeli var mı?**
Kanıtla kıyaslanamadı; aşağıdakiler **hipotezdir** ve 30 günlük planda aynı anda test edilmesi önerilir:
- **Kampanya öncesi kontrol (olay odaklı):** Aciliyet var; Kasım indirim dönemi doğal bir satış zamanı.
- **Platform göçü sonrası kontrol:** WooCommerce/eski altyapıdan ikas/Shopify'a geçişte yönlendirmeler, kırık bağlantılar, ödeme akışı. Net tetikleyici, tek seferlik, daha yüksek bilet. (Bu rapordaki aday A1, A3, A4 bu tür göç izlerine benzer.)
- **Ajanslara beyaz etiketli denetim:** KOBİ'leri tek tek ikna etmek yerine az sayıda ajansla çalışmak.
- **Çok kanallı satıcılar için fiyat/stok senkronizasyon denetimi:** Site + pazaryeri + entegratör arasındaki fiyat/stok farkları doğrudan para kaybettirir; pazaryeri satıcıları çok daha kalabalık (~540 bin). Bu çalışmada hiç araştırılmadı.
- **Mevzuat uyum taraması (avukatla birlikte):** 10 gün indirim kuralı ve ön bilgilendirme metinleri. Ceza riski satın alma motivasyonu yaratabilir; hukuki sorumluluk nedeniyle tek başına yapılmamalı.

---

## Karar tablosu

| Kriter | Kanıt düzeyi | Değerlendirme | Not |
|---|---|---|---|
| Sorun genel olarak var mı? | Orta (dolaylı) | ✅ Muhtemelen | Baymard ~%70 terk; Şikâyetvar kategorileri |
| Sorun hedef KOBİ sitelerinde yaygın mı? | **Yok** | ❓ Bilinmiyor | Saha denetimi yapılamadı (0/50 erişim) |
| Mağaza sahibi para öder mi? | Zayıf | ❓ Bilinmiyor | Yurt dışında evet; Türkiye KOBİ'si için doğrudan kanıt yok |
| Pazar büyüklüğü | Orta | ⚠️ Sınırlı | 35 bin+ kendi sitesi olan ETBİS kayıtlı işletme; ödeme yapabilecek kısmı bilinmiyor |
| Rekabet | Orta | ⚠️ Orta | Ajanslar, danışmanlar, ücretsiz araçlar; doğrudan "akış denetimi" rakibi görünmüyor |
| Başlangıç maliyeti | Yüksek | ✅ Düşük | ≈ 43–47 bin TL / 3 ay (maaşlar hariç) |
| İlk 3 ay geliri | Varsayım | ⚠️ Zayıf | Baz senaryo 77 bin TL; 2 kişiyi geçindirmez |
| Ölçeklenebilirlik | Mantıksal | ❌ Düşük (manuel) | Yazılıma geçiş ancak tekrar eden sorunlar kanıtlanırsa |
| Ayrışma imkânı | Mantıksal | ✅ Orta | Türkiye'ye ve platforma özgü kontrol listesi |
| Yasal/itibar riski | Orta | ⚠️ Yönetilebilir | İsimle hata ifşa etmeyin; ticari ileti kurallarına uyun; hukuki görüş vermeyin |
| **Genel karar** | — | **🟡 Şartlı: 30 günlük doğrulama; tam zamanlı başlamayın** | 13. bölümdeki karar kurallarına göre devam/bırak |

---

## Ahmet'e gönderilecek sade özet

> **Konu: E-ticaret sitelerindeki satış kaybettiren hataları bulma işi — kısa özet**
>
> Ahmet merhaba,
>
> **Fikir:** Kendi e-ticaret sitesi olan küçük ve orta ölçekli mağazaların sitelerini normal bir müşteri gibi deneyip satışı kaçıran hataları bulmak: sepete ekleme çalışmaması, yanlış kargo bilgisi, kuponun uygulanmaması, mobilde bozuk sayfa, ödeme sayfasına geçememe gibi. Bulduğumuz sorunları videoyla gösterip nasıl düzeltileceğini anlatacak, istenirse düzeltmeyi de biz yapacağız.
>
> **Neden mantıklı olabilir:**
> - Dünya genelinde sepete ürün ekleyen her 10 kişiden yaklaşık 7'si satın almadan çıkıyor. Bunun önemli bir kısmı sürpriz masraflar, zorunlu üyelik ve site hatalarından kaynaklanıyor.
> - Türkiye'de kendi sitesinden satış yapan 35 binden fazla kayıtlı işletme var.
> - Başlamak için para gerekmiyor; bilgisayar, telefon ve zaman yeterli.
> - Ağustos 2026'da indirim kuralları değişti (indirimden önceki fiyat artık son 10 günün en düşük fiyatı). Mağazaların kontrol ihtiyacı arttı.
>
> **Neden riskli:**
> - Türk mağazalarında bu hataların ne kadar yaygın olduğunu henüz bilmiyoruz. Araştırmayı yaptığımız ortam sitelere erişemedi, yani tek bir siteyi bile gerçekten test edemedik.
> - Mağaza sahiplerinin bunun için para ödeyip ödemeyeceği belli değil. Piyasada 200–350 TL'ye "site analizi" satanlar ve ücretsiz ön analiz yapan ajanslar var.
> - İlk 3 ayda gerçekçi gelir muhtemelen 0 ile 80 bin TL arasında. Bu, ikimizi geçindirmeye yetmez.
>
> **Önerim:** İşimizi bırakmadan, 30 gün boyunca küçük bir deneme yapalım:
> 1. İlk 10 günde 50–70 mağaza sitesini gerçekten test edelim ve kaçında ciddi sorun çıktığını sayalım.
> 2. Sorun bulduğumuz mağazalara ücretsiz kısa rapor gönderelim, görüşme isteyelim.
> 3. Ay sonunda en az 3 mağaza 4.900 TL'lik denetim satın almazsa bu işi bırakalım veya "kampanya öncesi kontrol", "site taşıma sonrası kontrol" gibi daha net bir alana kaydıralım.
>
> **İş bölümü:** Biri test ve teknik tarafı, diğeri mağazalarla iletişim ve satışı üstlenir. Üçüncü bir kişiye şimdilik gerek yok.
>
> Kararı 30 günün sonunda, sayılara bakarak verelim.

---

## Ek A — Erişim denemesi kaydı

Her siteye 1 Ekim 2026 tarihinde birer HTTPS `HEAD` isteği gönderildi (TSİ, UTC+3). Tüm istekler araştırma ortamının çıkış proxy'si tarafından `CONNECT 403` ile reddedildi; istek siteye ulaşmadı. **Bu sonuçlar sitelerin durumu hakkında bilgi vermez.**

| E-n | Zaman (TSİ) | Hedef | Sonuç |
|---|---|---|---|
| E-1 | 2026-10-01 14:14:51 | www.kigili.com | proxy 403 |
| E-2 | 2026-10-01 14:14:51 | www.manuatelier.com | proxy 403 |
| E-3 | 2026-10-01 14:14:52 | www.lesbenjamins.com | proxy 403 |
| E-4 | 2026-10-01 14:14:52 | www.derimod.com.tr | proxy 403 |
| E-5 | 2026-10-01 14:14:52 | www.zekitriko.com | proxy 403 |
| E-6 | 2026-10-01 14:14:53 | www.qarmacha.com | proxy 403 |
| E-7 | 2026-10-01 14:14:53 | www.pumpbutik.com | proxy 403 |
| E-8 | 2026-10-01 14:14:53 | www.avva.com.tr | proxy 403 |
| E-9 | 2026-10-01 14:14:53 | www.elleshoes.com | proxy 403 |
| E-10 | 2026-10-01 14:14:54 | www.desa.com.tr | proxy 403 |
| E-11 | 2026-10-01 14:14:54 | www.miniso.com.tr | proxy 403 |
| E-12 | 2026-10-01 14:14:54 | www.advbcosmetics.com | proxy 403 |
| E-13 | 2026-10-01 14:14:54 | www.limonian.com | proxy 403 |
| E-14 | 2026-10-01 14:14:55 | www.dpperfumum.com.tr | proxy 403 |
| E-15 | 2026-10-01 14:14:55 | www.bathandbodyworks.com.tr | proxy 403 |
| E-16 | 2026-10-01 14:14:55 | www.thebodyshop.tr | proxy 403 |
| E-17 | 2026-10-01 14:14:55 | www.gratis.com | proxy 403 |
| E-18 | 2026-10-01 14:14:56 | www.flormar.com.tr | proxy 403 |
| E-19 | 2026-10-01 14:14:56 | www.kahve.com | proxy 403 |
| E-20 | 2026-10-01 14:14:56 | www.spadacoffee.com | proxy 403 |
| E-21 | 2026-10-01 14:14:57 | www.a4kahve.com | proxy 403 |
| E-22 | 2026-10-01 14:14:57 | www.gloriajeans.com.tr | proxy 403 |
| E-23 | 2026-10-01 14:14:57 | www.omergullu.com.tr | proxy 403 |
| E-24 | 2026-10-01 14:14:57 | www.taftcoffee.com | proxy 403 |
| E-25 | 2026-10-01 14:14:57 | www.vitaminsan.com | proxy 403 |
| E-26 | 2026-10-01 14:14:58 | www.medipera.com | proxy 403 |
| E-27 | 2026-10-01 14:14:58 | www.konix.com.tr | proxy 403 |
| E-28 | 2026-10-01 14:14:58 | www.supplementler.com | proxy 403 |
| E-29 | 2026-10-01 14:14:59 | www.proteinocean.com | proxy 403 |
| E-30 | 2026-10-01 14:14:59 | www.vatanbilgisayar.com | proxy 403 |
| E-31 | 2026-10-01 14:14:59 | www.incehesap.com | proxy 403 |
| E-32 | 2026-10-01 14:14:59 | www.itopya.com | proxy 403 |
| E-33 | 2026-10-01 14:15:00 | www.istikbal.com.tr | proxy 403 |
| E-34 | 2026-10-01 14:15:00 | www.bellona.com.tr | proxy 403 |
| E-35 | 2026-10-01 14:15:00 | www.dogtas.com | proxy 403 |
| E-36 | 2026-10-01 14:15:01 | www.englishhome.com | proxy 403 |
| E-37 | 2026-10-01 14:15:01 | www.schafer.com.tr | proxy 403 |
| E-38 | 2026-10-01 14:15:01 | www.karaca.com | proxy 403 |
| E-39 | 2026-10-01 14:15:02 | www.kankenhome.com | proxy 403 |
| E-40 | 2026-10-01 14:15:02 | www.atasay.com | proxy 403 |
| E-41 | 2026-10-01 14:15:02 | www.pirlant.com.tr | proxy 403 |
| E-42 | 2026-10-01 14:15:02 | www.ddiamond.com.tr | proxy 403 |
| E-43 | 2026-10-01 14:15:03 | www.salomon.com.tr | proxy 403 |
| E-44 | 2026-10-01 14:15:03 | www.asics.com.tr | proxy 403 |
| E-45 | 2026-10-01 14:15:03 | www.decathlon.com.tr | proxy 403 |
| E-46 | 2026-10-01 14:15:04 | www.walkingpadturkiye.com | proxy 403 |
| E-47 | 2026-10-01 14:15:04 | www.harleydavidsonshop.com.tr | proxy 403 |
| E-48 | 2026-10-01 14:15:04 | www.galenleather.com | proxy 403 |
| E-49 | 2026-10-01 14:15:04 | www.hektasbahce.com | proxy 403 |
| E-50 | 2026-10-01 14:15:05 | eshop.tff.org | proxy 403 |

---

## Kaynaklar

Tüm kaynaklara 1 Ekim 2026 tarihinde, 14:05–14:30 TSİ arasında **web araması üzerinden** ulaşıldı. Kaynak sayfaların çoğu doğrudan açılamadı; içerik arama motoru özetlerinden alındı.

**Resmi veriler ve mevzuat**
- [Ticaret Bakanlığı — Türkiye'de E-Ticaretin Görünümü Raporu Yayınlandı (12.05.2026)](https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-12-05-2026)
- [Ticaret Bakanlığı — Türkiye'de E-Ticaretin Görünümü Raporu Yayınlandı (06.05.2025)](https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-06-05-2025)
- [Türkiye'de E-Ticaretin Görünümü Raporu 2025 (PDF)](https://ticaret.gov.tr/data/6a02f2c7269de183c0b98bc4/T%C3%BCrkiye'de%20E-Ticaretin%20G%C3%B6r%C3%BCn%C3%BCm%C3%BC%20Raporu%202025.pdf)
- [ETBİS — Türkiye'de E-Ticaretin Görünümü 2025 Raporu Yayımlandı](https://etbis.ticaret.gov.tr/tr/Post/postturkiyede-e-ticaretin-gorunumu-2025-raporu-yayimlandi-3)
- [Webrazzi — Türkiye'nin e-ticaret hacmi 2024'te 3 trilyon TL oldu](https://webrazzi.com/2025/05/06/turkiye-nin-e-ticaret-hacmi-2024-te-3-trilyon-tl-oldu/)
- [Ticimax blog — 2024 e-ticaret verileri](https://www.ticimax.com/blog/2024-yili-e-ticaret-verileri-ve-istatistikleri)
- [Ticaret Bakanlığı — Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği değişiklikleri](https://ticaret.gov.tr/haberler/ticaret-bakanligi-tarafindan-ticari-reklam-ve-haksiz-ticari-uygulamalar-yonetmeliginde-yapilan-degisikliklerle-tuketicilerin-aldatici-reklam-ve-ticari-uygulamalara-karsi-korunmasi-guclendiriliyor)
- [Erdem & Erdem — Ticari Reklam Yönetmeliği'nde kapsamlı değişiklikler](https://www.erdem-erdem.av.tr/bilgi-bankasi/ticari-reklam-ve-haksiz-ticari-uygulamalar-yonetmeliginde-kapsamli-degisiklikler-yapildi)
- [Mondaq — Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği değişiklikleri](https://www.mondaq.com/turkey/consumer-trading-unfair-trading/1812910/ticari-reklam-ve-haks%C4%B1z-ticari-uygulamalar-y%C3%B6netmeli%C4%9Fi-de%C4%9Fi%C5%9Fiklikleri-hakk%C4%B1nda)
- [TGRT Haber — İndirim reklamlarında "son 10 gün" kuralı](https://www.tgrthaber.com/ekonomi/ticaret-bakanligindan-indirim-reklamlarina-siki-denetim-son-10-gunun-en-dusuk-fiyati-3357012)
- [Tüketici.org.tr — Mesafeli Sözleşmeler Yönetmeliği](https://www.tuketici.org.tr/tr/h/tuketicinin-korunmasi/mesafeli-sozlesmeler-yonetmeligi/)
- [Ticaret Bakanlığı TKPGM — 2026 idari para cezaları %25,49 artırıldı](https://tuketici.ticaret.gov.tr/haberler/6502-sayili-tuketicinin-korunmasi-hakkinda-kanun-kapsaminda-uygulanan-idari-para-cezalari-1-ocak-2026-tarihinden-itibaren-25-49-oraninda-arttirildi)
- [Aksan Hukuk — 2026 tüketici hukukunda parasal sınırlar ve cezalar](https://aksan.av.tr/blog/2026-yili-tuketici-hukukunda-yeni-donem-parasal-sinirlar-ve-idari-para-cezalari-guncellendi)
- [Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik (mevzuat.gov.tr)](https://www.mevzuat.gov.tr/File/GeneratePdf?mevzuatNo=20914&mevzuatTur=KurumVeKurulusYonetmeligi&mevzuatTertip=5)
- [Tacir veya esnafa ticari ileti gönderiminde onay şartı (İYS SSS)](https://iys.doruk.net.tr/faq-items/tacir-veya-esnafa-ticari-elektronik-ileti-gonderilirken-onay-sarti-var-midir/)

**Sepet terki ve dönüşüm**
- [Baymard — Cart Abandonment Rate Statistics](https://baymard.com/lists/cart-abandonment-rate)
- [Baymard — Reasons for Cart Abandonment](https://baymard.com/blog/ecommerce-checkout-usability-report-and-benchmark)
- [Baymard — Why Customers Abandon Their Shopping Cart](https://baymard.com/blog/cart-abandonment)
- [iyzico — Sepet terk ve nedenleri](https://www.iyzico.com/blog/sepet-terk-ve-nedenleri-hakkinda-her-sey)
- [PayTR — Sepet terk etme nedenleri](https://www.paytr.com/blog/e-ticarette-sepet-terk-etme-nedenleri-ve-onlemleri)

**Şikâyet kategorileri (tüketici beyanı; doğrulanmadı)**
- [Şikâyetvar — Hepsiburada indirim kodu çalışmıyor](https://www.sikayetvar.com/hepsiburada/indirim/kod)
- [Şikâyetvar — Trendyol kupon/sepette indirim](https://www.sikayetvar.com/trendyol/kupon/sepette-indirim)
- [Şikâyetvar — Migros indirim kodu hatası](https://www.sikayetvar.com/migros/hata/indirim-kodu)
- [Şikâyetvar — Duvarkagidisec.com ücretsiz kargo şikâyeti](https://www.sikayetvar.com/duvarkagidiseccom/duvarkagidiseccomdan-ucretsiz-kargo-deyip-kapida-ucret-almasi)
- [Şikâyetvar — Gardrops ücretsiz kargo](https://www.sikayetvar.com/gardrops/ucretsiz-kargo/yalan)
- [Şikâyetvar — İpekyol stokta görünen ürün iptali](https://www.sikayetvar.com/ipekyol/stokta-gorunen-urun-aniden-iptal-edildi-bilgilendirme-yok)
- [Şikâyetvar — Armine stokta görünen çanta iptali](https://www.sikayetvar.com/armine/stokta-gorunur-olan-canta-iptal-edildi-anneme-hediye-veremedim)
- [Şikâyetvar — IKEA ödeme hatası](https://www.sikayetvar.com/ikea/ikea-online-alisveriste-odeme-hatasi-nedeniyle-siparis-tamamlanamiyor)
- [Şikâyetvar — D&R sipariş oluşturma hatası](https://www.sikayetvar.com/d-r/siparis-olusturma-asamasinda-surekli-hata-ve-alisveris-tamamlanamiyor)
- [Şikâyetvar — Shopier ödeme hatası](https://www.sikayetvar.com/shopier/odeme/odeme-hatasi)

**Platformlar ve mağaza sayıları**
- [ikas — E-ticaret paketleri ve fiyatları](https://ikas.com/tr/e-ticaret-paketleri)
- [ikas — Referanslar](https://ikas.com/tr/referanslar)
- [ikas — Kozmetik markaları](https://ikas.com/tr/blog/kozmetik-markalari-ikas-ile-satislarini-nasil-artiriyor)
- [ikas — Müşteri ayarları (misafir alışveriş)](https://support.ikas.com/tr/musteri-ayarlari)
- [Foreks — ikas/Namoğlu (Eylül 2026)](https://www.foreks.com/haber/detay/6abb633f95016b5817e61bfe/FRKS/tr/ikas-namoglu-e-ticaret-yeni-sube-acmadan-buyume-imkani-sunuyor-29-09-26/)
- [Webrazzi — ikas 20 milyon $ yatırım](https://webrazzi.com/2024/04/04/ikas-ifc-ve-re-pie-portfoy-liderliginde-20-milyon-dolar-yatirim-aldi/)
- [Ticimax — E-ticaret paketleri fiyatları 2026](https://www.ticimax.com/e-ticaret-paketleri/)
- [Ticimax — Referanslarımız](https://www.ticimax.com/referanslarimiz/)
- [Ticimax — AVM markaları referansları](https://www.ticimax.com/avm-markalari-e-ticaret-sitesi/)
- [Ticimax — Sağlık, medikal ve doğal ürünler referansları](https://www.ticimax.com/saglik-medikal-dogal-urunler-e-ticaret-sitesi/)
- [Ticimax Destek — Genel ayarlar (üyeliksiz alışveriş)](https://www.destekalani.com/Icerik/genel-ayarlar-734)
- [Ticimax — Partner programı](https://www.ticimax.com/partner)
- [IdeaSoft — Referanslar](https://www.ideasoft.com.tr/referanslar/)
- [Shopify TR — En iyi Shopify mağazaları](https://www.shopify.com/tr/blog/shopify-magazalari)
- [Fiyord — Türkiye'de Shopify kullanan markalar](https://www.blog.fiyord.com/turkiye-de-shopify-kullanan-markalar/)
- [Fiyord — Türkiye'deki Shopify mağazaları](https://tr.fiyord.com/blogs/shopify/turkiye-deki-shopify-magazalari)
- [DigitalPals — Türkiye'deki Shopify mağazaları](https://digitalpals.com/tr/turkiyedeki-shopify-magazalari/)
- [Store Leads — Shopify Stores in Turkey](https://storeleads.app/reports/shopify/TR/top-stores)
- [Store Leads — WooCommerce Stores in Turkey](https://storeleads.app/reports/woocommerce/TR/most-recent-stores)
- [BuiltWith — WooCommerce in Turkey](https://trends.builtwith.com/shop/WooCommerce/Turkey)
- [Nodus Works — Shopify Türkiye rehberi (ödeme sağlayıcıları)](https://nodusworks.com/en/blog/shopify-turkey-guide-payment-shipping-legal-requirements-and-setup-2026)

**Rakipler ve fiyatlar**
- [Baymard — UX araştırma ürünleri ve hizmetleri](https://baymard.com/products)
- [Baymard — Mobile UX Audit](https://baymard.com/mcommerce-usability/expert-audit)
- [Noibu — Platform](https://www.noibu.com/platform)
- [Noibu — SSS](https://www.noibu.com/faq)
- [Contentsquare — Noibu alternatifleri](https://contentsquare.com/blog/noibu-alternatives/)
- [GetApp — Ghost Inspector fiyatları](https://www.getapp.com/it-management-software/a/ghost-inspector/)
- [Shopify App Store — MyStoreGuardian](https://apps.shopify.com/mystoreguardian)
- [Shopify App Store — Uptime](https://apps.shopify.com/uptime)
- [Shopify App Store — TestingBot Store Monitoring](https://apps.shopify.com/testingbot-1)
- [Fiverr — Shopify CRO audit örneği (300 $)](https://www.fiverr.com/davidaitken518/help-you-increase-your-conversion-rates-25-your-expert-usa)
- [Fiverr — Shopify CRO audit örneği (45 $)](https://www.fiverr.com/shopifyexpertde/increase-your-conversion-rate-with-detailed-website-review-and-cro-optimization)
- [CRO.media — Shopify CRO Audit](https://cro.media/shopify-cro-audit/)
- [Webulux — Shopify CRO pricing 2026](https://www.webulux.com/blog/shopify-cro-pricing-what-does-it-actually-cost)
- [Hotjar fiyatları 2026 (UXtweak)](https://blog.uxtweak.com/hotjar-pricing/)
- [Microsoft Clarity incelemesi](https://www.solidgrowth.com/tool/microsoft-clarity)
- [Clutch — Testinium](https://clutch.co/profile/testinium)
- [Webrazzi — Testinium](https://webrazzi.com/2021/01/04/test-otomasyon-yonetim-cozumu-testinium/)
- [Bionluk — SEO analiz raporu örneği](https://bionluk.com/muratyildizhan/siteniz-icin-detayli-bir-SEO-Analiz-Raporu-olusturabilirim-128777)
- [Adapte Dijital — Web danışmanlığı ücretleri 2026](https://adaptedijital.com/danismanlik/web-danismanligi/web-danismanligi-ucretleri/)
- [Magna Dijital — E-ticaret CRO](https://www.magnadijital.com.tr/sektorel-hizmetler/e-ticaret-pazarlama/e-ticaret-cro-donusum-orani-optimizasyonu)
- [İKOMERS — CRO](https://www.ikomers.com.tr/cro-donusum-orani-optimizasyonu-ikomers)
- [Pixenon — CRO hizmeti](https://www.pixenon.com.tr/donusum-orani-optimizasyonu-cro-hizmeti/)
- [dotCREA — Ürün sayfası dönüşüm denetimi](https://www.dotcrea.com/blog/urun-sayfasi-donusum-denetimi)
- [FS Denetim — E-ticaret denetimi](https://www.eticaretdenetim.com/service/e-ticaret/)
- [Artelio Dijital — ikas partner](https://www.arteliodijital.com/ikas-partner-nedir-2026da-partner-avantajlari-ve-komisyon-detaylari)

**Maliyet verileri**
- [Kolay İK — 2026 asgari ücret](https://kolayik.com/blog/2026-asgari-ucret-net-hesabi-ve-kesintiler)
- [CNN Türk — Temmuz 2026 ara zam](https://www.cnnturk.com/ekonomi/asgari-ucret-temmuz-ara-zammi-yapilacak-mi-2026-asgari-ucret-ara-zammi-olacak-mi-ne-kadar-olacak-3442107)
- [Danış Özcan — 2026 Bağ-Kur primi](https://danisozcan.com/guncel-bagkur-primi/)
- [İşbaşı — Şahıs şirketi kurma maliyeti](https://isbasi.com/blog/sahis-sirketi-kurma-maliyeti)
- [Kobitime — Aylık muhasebeci ücretleri 2026](https://kobitime.com/aylik-muhasebeci-ucretleri-2026/)

**50 site listesinin alan adı doğrulaması (arama sonuçları)**
- Zeki Triko: [zekitriko.com](https://zekitriko.com/us/) · Qarmacha: [qarmacha.com](https://qarmacha.com/) · advb: [advbcosmetics.com](https://advbcosmetics.com/) · Limonian: [limonian.com](https://limonian.com/) · D&P: [dpperfumum.com.tr](https://dpperfumum.com.tr/) · Spada: [spadacoffee.com](https://spadacoffee.com/) · A4 Kahve: [a4kahve.com](https://a4kahve.com/) · Gloria Jean's: [gloriajeans.com.tr](https://gloriajeans.com.tr/pages/hakkimizda) · Ömer Güllü: [omergullu.com.tr](https://www.omergullu.com.tr/) · TAFT: [taftcoffee.com](https://www.taftcoffee.com/collections/taft-coffee) · Kanken Home: [kankenhome.com](https://kankenhome.com/) · Harley-Davidson Shop: [harleydavidsonshop.com.tr](https://harleydavidsonshop.com.tr/) · Pump Butik: [pumpbutik.com](https://pumpbutik.com/) · Miniso: [miniso.com.tr](https://miniso.com.tr/) · Elle Shoes: [elleshoes.com](https://www.elleshoes.com/) · Salomon: [salomon.com.tr](https://www.salomon.com.tr/) · ASICS: [asics.com.tr](https://www.asics.com.tr/en) · Hektaş Bahçe: [hektasbahce.com](https://www.hektasbahce.com/sayfalar) · TFF: [eshop.tff.org](https://eshop.tff.org/kategoriler) · Bath & Body Works: [bathandbodyworks.com.tr](https://www.bathandbodyworks.com.tr/) · The Body Shop: [thebodyshop.tr](https://thebodyshop.tr/)
