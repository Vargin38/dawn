# E-Ticaret Satın Alma Akışı Denetimi — İş Fikri Araştırması

**Araştırılan fikir:** E-ticaret sitelerinin alışveriş akışındaki hataları ve satış kaybettiren sorunları bulup düzelten bir hizmet/yazılım.
**Rapor tarihi:** 1 Ekim 2026 (güncellenmiş sürüm)
**Masa başı araştırma:** 1 Ekim 2026, 14:05–14:30 TSİ (UTC+3)
**Saha testi (50 site):** 1 Ekim 2026, 15:04–16:50 TSİ
**Hazırlayan:** Claude Code. Yalnızca araştırma yapıldı; projedeki mevcut kodlara dokunulmadı.

---

> ## Bu sürümde ne değişti?
>
> İlk sürümde araştırma ortamı sitelere erişemediği için hiçbir site test edilememişti. Ağ erişimi açıldıktan sonra **55 siteye girmeyi denedim; 5'i Cloudflare güvenlik doğrulamasında kaldı (aşmaya çalışılmadı), kalan 50 site gerçek tarayıcıyla, normal bir müşteri gibi test edildi.** Tablo, bulgular, sıklık sayıları ve karar artık gözleme dayanıyor.
>
> **Kısa sonuç:** 50 sitenin **14'ünde (%28) en az bir doğrulanmış sorun** var. Satışı tamamen durduran sorun ise yalnızca **1 sitede** görüldü: mağaza alan adı, ikas yönetici giriş sayfasına yönleniyor. Sorunların büyük kısmı **orta veya düşük önemde** ve panelde birkaç dakikada düzeltilebilecek ayar ya da içerik hataları: çelişkili kargo eşikleri, hatalı WhatsApp bağlantıları, sepette KDV hariç fiyat gösterimi, eski alan adları. **Hiçbir sitede sepete ekleme veya ödeme sayfasının kendisi kırık değildi.**
>
> **Uyulan kurallar:** Ödeme yapılmadı, sipariş oluşturulmadı, hesap açılmadı, hiçbir forma kişisel bilgi girilmedi, işletmelere mesaj gönderilmedi. CAPTCHA ve bot korumaları aşılmaya çalışılmadı. Konum, çerez katmanı veya güvenlik sisteminden kaynaklanan engeller site hatası sayılmadı. İlk sürümdeki erişim engeli kaydı Ek A'da korunuyor.

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
- [Ek A — İlk erişim denemesi kaydı (engelli ortam)](#ek-a--ilk-erişim-denemesi-kaydı-engelli-ortam)
- [Ek B — Saha testi zaman çizelgesi](#ek-b--saha-testi-zaman-çizelgesi)
- [Kaynaklar](#kaynaklar)

---

## 1. Yönetici özeti

**Kısa cevap: Fikrin dayandığı sorunlar Türk e-ticaret sitelerinde gerçekten var. Ancak çoğu küçük ve ucuz düzeltilebilir hatalar. Bu yüzden "hata bulma" tek başına yüksek fiyatlı bir hizmet olarak satılmaya elverişli görünmüyor. Tam zamanlı başlamak için kanıt hâlâ yetersiz. En büyük bilinmeyen artık "sorun var mı?" değil, "bu sorunlar için kim, ne kadar öder?" sorusu.**

**Saha testinden çıkan sayılar (50 site, 1 Ekim 2026):**

| Gösterge | Sonuç |
|---|---|
| Test edilen site | 50 (ayrıca 5 site güvenlik doğrulaması nedeniyle test edilemedi, yerlerine aynı sektörden 5 site eklendi) |
| Sepete kadar ilerlenebilen | 32 site (29'unda ödeme sayfası girişine kadar) |
| En az 1 doğrulanmış sorun bulunan | **14 site (%28)** |
| Toplam doğrulanmış sorun | **17** (ayrıca 7 aday, 11 yanlış alarm) |
| Satışı tamamen durduran sorun | **1** (Pump Butik: alan adı ikas giriş sayfasına yönleniyor) |
| Sepete ekleme veya ödeme sayfası kırık olan | **0** |
| Mobilde yatay taşma (sayfa ekrandan geniş) | **0 / 50** |
| Üyeliksiz alışverişe izin vermeyen | **3** (Elle Shoes, Troyestore, Gratis) |
| Kendi sitesinden satan KOBİ profilindeki, akışı en az sepete kadar test edilen 15 site | **7'sinde (%47) en az 1 doğrulanmış sorun** |

*KOBİ alt örneklemi (benim sınıflandırmam):* ulusal perakende zinciri, franchise veya global marka distribütörü olmayan, akışı en az sepete kadar test edilebilen 15 site: Qarmacha, advb cosmetics, Limonian, D&P Perfumum, kahve.com, Troyestore, Elle Shoes (sorun bulunan 7), Spada Coffee, A4 Kahve, Proteinocean, VitaminSAN, Medipera, WalkingPad Türkiye, Kanken Home, TAFT Coffee (sorun bulunmayan 8). Test edilemeyen Pump Butik dahil edilirse oran 8/16 (%50) olur. Örneklem küçüktür; oran yalnızca yön gösterir.

**En sık görülen doğrulanmış sorunlar:**
1. Alan adı ve erişim sorunları (4 site)
2. Hatalı veya boş WhatsApp bağlantısı (3 site)
3. Zorunlu üyelik (3 site)
4. Çelişkili ücretsiz kargo eşiği (2 site)
5. Sepette KDV hariç birim fiyat gösterimi (2 site, ikisi de IdeaSoft)

**Bu ne anlama geliyor?**
- **İhtiyaç var mı?** Var. KOBİ profilindeki sitelerin yaklaşık yarısında müşteriyi yanıltabilecek veya güveni zedeleyebilecek en az bir sorun bulundu.
- **Para öder mi?** Hâlâ bilinmiyor. Bulunan sorunların çoğu panelde 5–30 dakikada düzeltilebiliyor. Bu da "bir kez bulup söylemenin" değerini düşürüyor. Fiyat beklentisi, ilk sürümde önerilenden daha düşük test edilmeli.
- **Platform farkı belirgin:** Shopify sitelerinde neredeyse hiç akış sorunu çıkmadı. ikas sitelerinde ayar/içerik tutarsızlıkları (kargo eşiği, WhatsApp, stok sayacı) öne çıktı. İki IdeaSoft sitesinde aynı KDV gösterim sorunu görüldü. Bu, **platforma özgü kontrol listeleriyle hızlı ve ucuz denetim** yapılabileceğini gösteriyor.
- **Öneri:** Yazılım değil, manuel hizmet. 2 kişiyle, yan iş olarak, **2–4 haftalık satış testi**. Hizmeti "hata avı" olarak değil, "kargo/fiyat/iletişim tutarlılığı + güven + mevzuat kontrolü" olarak konumlandırın.

---

## 2. Araştırma yöntemi

### 2.1 Masa başı araştırma (14:05–14:30)
Pazar büyüklüğü, platformlar, fiyatlar, mevzuat ve rakipler web aramasıyla araştırıldı. Kaynak sayfaların bir kısmı açılamadığından bu rakamlar **arama özeti** olarak işaretlendi. Saha testi sırasında doğrudan açılabilen sayfalar varsa bu kısımlar değiştirilmedi.

### 2.2 Saha testi (15:04–16:50)

**Araçlar ve ortam:**
- Gerçek Chromium tarayıcı (Playwright).
- Mobil: iPhone 13 görünümü (390×664, dokunmatik). Masaüstü: 1440×900.
- Dil `tr-TR`, saat dilimi Europe/Istanbul.
- Araştırma sunucusu **Türkiye dışında (ABD IP'si)**. Bu yüzden bazı siteler bölge açılır penceresi, USD fiyat veya İngilizce sayfaya yönlendirme gösterdi. Bunlar **site hatası sayılmadı.**

**Her sitede izlenen adımlar:**
1. Ana sayfa (mobil + masaüstü): erişim, başlık, iletişim bağlantıları, kargo ifadeleri, politika sayfası bağlantıları, mobilde yatay taşma.
2. Ürün sayfası: fiyat, stok mesajı, varyant (beden/renk/gramaj) seçimi, **varyant seçmeden "Sepete Ekle"** davranışı.
3. Varyant seçip sepete ekleme. Shopify sitelerinde arayüz konum penceresi nedeniyle kilitlendiğinde, sitenin kendi "sepete ekle" düğmesinin kullandığı vitrin uç noktası (`/cart/add.js`) kullanıldı ve bu durum tabloda belirtildi.
4. Sepet: tutarlar, kargo/ücretsiz kargo ifadeleri, kupon alanı.
5. Sepetten ödeme sayfasına geçiş. **Kişisel bilgi istenen ilk ekranda durduldu.** Bu ekranda misafir (üyeliksiz) alışveriş seçeneğine bakıldı.
6. Şüpheli her bulgu **sayfa yenilenerek ve/veya ikinci bir ürün, cihaz veya oturumla** tekrar kontrol edildi.

**Sınıflandırma:**
- **Doğrulanmış:** En az iki ayrı gözlemde (yenileme, ikinci ürün/sayfa veya ikinci oturum) aynı sonuç.
- **Aday:** Bir kez görüldü, ya da gerçek etkisi kişisel bilgi girmeden ölçülemedi.
- **Yanlış alarm:** İlk bakışta sorun gibi görünen ama kontrolde sorun olmadığı ya da test aracından kaynaklandığı anlaşılan durum.

**Önemli yöntem dersi:** İlk mobil denemelerde fare tıklaması kullanıldı. Bu, bazı Ticimax sitelerinde "sepete ekleme çalışmıyor" ve "uyarı çıkmıyor" gibi **sahte sorunlar** üretti. Gerçek dokunma (touch) olayıyla tekrarlanınca her şey çalıştı. Bu bulgular yanlış alarm olarak kaydedildi (bkz. 3.3). Bundan sonraki tüm mobil testler dokunma olayıyla yapıldı. **İşe başlanırsa denetimler mutlaka gerçek telefonla da doğrulanmalı.**

### 2.3 Kısıtlar
- Her sitede **1–2 ürün** test edildi. Bu, sitenin bütününü temsil etmez; özellikle kupon/kampanya senaryoları sınırlı denendi. Kod tahmini yapılmadı, yalnızca sayfada herkese açık yazılı kodlar dikkate alındı.
- Ödeme sayfasında **adres girilmediği için** kargo ücretinin son hali birçok sitede görülemedi.
- 17 sitede akış ürün sayfası veya ana sayfa düzeyinde kaldı. Nedenler: çerez katmanları (efilli, Cookiebot vb.), bülten açılır pencereleri, ABD IP'si, stokta olmayan ürünler veya otomasyonun sepete ekleme düğmesini tetikleyememesi. Bu siteler tabloda **"kısmi"** olarak işaretlendi. Bu sitelerde "sorun gözlenmedi" ifadesi, "sorun yok" anlamına gelmez.
- Sitemap'ten seçilen ürünlerin bir kısmı stokta yoktu. Bu durumlarda stokta olan başka ürün seçildi.
- Fiyatlar yalnızca test anında görüldüğü haliyle ve saatiyle yazıldı. Fiyatlar değişebilir.

---

## 3. 50 sitenin ayrıntılı denetim tablosu

**Okuma kılavuzu**
- **Derinlik:**
  - **Tam:** ürün → sepet → ödeme sayfası girişi.
  - **Sepet:** sepete kadar.
  - **Kısmi:** ürün sayfası veya ana sayfa düzeyi.
- **Altyapı:** "(gözlem)" yazanlar sayfa kodundaki platform izlerinden doğrulandı (ör. `cdn.shopify.com`, `myikas`, Ticimax `Addtobasket`/`size_box`, IdeaSoft `/urun/` + `order/step2`). Diğerleri kaynakta geçen bilgidir.
- **Sorun kodları** (V1–V17, A1–A7, Y1–Y11) 3.1–3.3'te açıklanmıştır.
- **Sütun 11 (hizmete dönüşür mü)** işletme profiline ve bulgulara dayalı bir tahmindir.

| # | 1. Site ve URL | 2. Sektör | 3. Altyapı | 4. İncelenen ürün (test anındaki fiyat) | 5. Kontrol edilen adımlar (derinlik, saat) | 6. Bulunan sorun | 7. Tekrarlanabilir mi | 8. Olası etki | 9. Kanıt | 10. Önerilecek çözüm | 11. Hizmete dönüşür mü |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Kiğılı — [kigili.com](https://www.kigili.com) | Giyim | Shopify (gözlem) | Fermuarlı polo yaka sweatshirt, M (1.499 TL; "Sepette 1.049,30 TL") | Tam, mobil; 15:30–15:31 | Yok. Sepette indirim doğru (−449,70 TL), 1.500 TL eşiğine göre 59,99 TL kargo ödeme sayfasında doğru, misafir ödeme var | — | — | Sepet "ÜRÜN TOPLAMI 1.049,30 TL"; ödeme "1.109,29 TL" | — | Düşük (sorun yok) |
| 2 | Manu Atelier — [manuatelier.com](https://manuatelier.com) | Çanta/ayakkabı | Shopify (gözlem) | Le Cambon 40 | Kısmi: sepet + ödeme girişi; 15:40 | Gözlenmedi. ABD IP'sine USD fiyat ve uluslararası ödeme gösterildi (konum kaynaklı) | — | — | Ödeme URL'si `/en-us` | — | Orta |
| 3 | Les Benjamins — [lesbenjamins.com](https://lesbenjamins.com) | Giyim | Shopify (gözlem) | Basic tee, 2.999 TL | Tam (sepete ekleme vitrin API'siyle), mobil; 15:31–15:38 | Gözlenmedi. "It seems you're in the United States…" konum penceresi arayüzü kilitledi (sayılmadı). Sepette "5000TL ve üzeri ücretsiz kargo…2.001 TL" doğru | — | — | Ödeme sayfası açıldı, misafir girişi var | — | Orta |
| 4 | Derimod — [derimod.com.tr](https://derimod.com.tr) | Deri giyim/ayakkabı | Shopify (gözlem) | Kadın siyah deri bot, 36 (8.999 TL) | Tam, mobil; 15:40–15:42 | Yok. Sepetteki "Kargo 75.00 TL" satırının üstü çizili (Y1) | — | — | Sepet ve ödeme toplamı 8.999 TL | — | Orta |
| 5 | Zeki Triko — [zekitriko.com](https://zekitriko.com) | Mayo/plaj giyim | ikas (gözlem) | Brazilian bikini altı (₺1.999) | Kısmi: ürün; 15:44, 16:07, 16:30 | Gözlenmedi. "United States / Devam / Ülke Değiştir" penceresi; listede Türkiye yok, "Devam" `/us/` mağazasına götürdü (konum kaynaklı) | — | — | Yönlenen URL `zekitriko.com/us/...` | — | Yüksek (test tamamlanamadı) |
| 6 | Qarmacha — [qarmacha.com](https://qarmacha.com) | Kadın giyim | ikas (gözlem) | İpli Etekli Salopet (₺1.250, sepette ₺1.000); Torba Cepli Ceket (stokta yok) | Tam, mobil; 15:45–16:12 | **V3** stok sayacı/sosyal kanıt tutarsız; **V4** kargo eşiği 2500 ↔ 1500; **V5** WhatsApp `wa.me/05444187900` | Evet (yenileme + 2 ürün + 2 sayfa) | Güven kaybı, yanıltıcı uygulama riski, iletişim kaybı | Bkz. 3.1 | Sayaç uygulamasını kapatmak/gerçek stoğa bağlamak; tek eşik; `wa.me/905444187900` | **Yüksek** |
| 7 | Pump Butik — [pumpbutik.com](https://pumpbutik.com) | Giyim | ikas (yönlendirme hedefi) | — | Ana sayfa + kategori URL; 15:04, 15:09, 15:44 | **V1** mağaza alan adı `accounts.ikas.com/login`'e yönleniyor | Evet (3 zaman, 2 URL, curl + tarayıcı) | **Kritik:** kendi sitesinden satış yapılamıyor | `307 → https://accounts.ikas.com/` | Panelde mağaza/alan adı durumunu kontrol etmek; kapalıysa bilgi sayfası ve pazaryeri yönlendirmesi | **Yüksek (acil)** |
| 8 | AVVA — [avva.com.tr](https://www.avva.com.tr) | Erkek giyim | Ticimax (gözlem) | Antrasit keten gömlek, XL (1.599,99 TL) | Tam, mobil; 15:24–15:29 | Yok. Bedensiz eklemede "Lütfen Beden Seçin" çıkıyor; 3.000 TL eşiği tutarlı (1.400,01 TL kaldı); "Üyeliksiz Devam Et" var | — | — | Sepet 1.709,98 TL (109,99 TL kargo) | — | Düşük |
| 9 | Elle Shoes — [elleshoes.com](https://www.elleshoes.com) | Ayakkabı | Ticimax (gözlem) | Kahve kadın spor ayakkabı, 39 (4.279,90 TL; sepette %30 → 2.995,93 TL) + 3 eski ürün | Tam, mobil + masaüstü; 16:07–16:17 | **V11** üyeliksiz alışveriş yok; **V14** sitemap'teki eski ürünlerde gerçek dışı fiyatlar (7,86 TL kemer vb.); **A3** stokta olmayan üründe "Sepete Ekle" görünür | Evet (mobil + masaüstü; 3 ürün) | Ödeme adımında terk; güven ve arama motoru görünürlüğü | Bkz. 3.1 | Misafir ödemeyi açmak; eski ürünleri kapatmak/noindex | **Yüksek** |
| 10 | Desa — [desa.com.tr](https://www.desa.com.tr) | Deri çanta/ayakkabı | Ticimax (gözlem) | Kahve erkek klasik ayakkabı, 40 (3.954 TL) | Tam, mobil (dokunma) + masaüstü; 15:55–16:11 | Yok. Masaüstünde "Lütfen Beden Seçiniz" vurgusu çalışıyor; mobilde dokunmayla ekleme çalışıyor ("Ürün Sepetinize Eklendi"). Mobil sorunlar yanlış alarm (Y3) | — | — | `api/cart/AddToCartV3` 200; ödeme adımında e-posta ile misafir giriş | — | Orta |
| 11 | Miniso Türkiye — [miniso.com.tr](https://miniso.com.tr) | Aksesuar/kozmetik | ikas (gözlem) | Kumaş saç lastiği 3'lü (269,99 TL) | Sepet, mobil; 16:08 | Yok. Sepette "750 TL ve üzeri ücretsiz kargo" tutarlı | — | — | "Ürün sepetinize başarıyla eklendi" | — | Orta |
| 12 | advb cosmetics — [advbcosmetics.com](https://advbcosmetics.com) | Kozmetik | ikas (gözlem) | Stain Lip Gel (₺599) | Tam (apex alan adında), mobil; 16:44 | **V2** `www.advbcosmetics.com` Cloudflare 403 "CNAME Cross-User Banned" | Evet (ana sayfa + ürün yolu; 15:05, 15:11, 15:44) | www ile gelen ziyaretçi/link hata sayfası görür | Bkz. 3.1 | DNS/Cloudflare kaydını düzeltmek; www → apex 301 | **Yüksek** |
| 13 | Limonian — [limonian.com](https://limonian.com) | Kore kozmetiği | ikas (gözlem) | MJCARE ayak peeling 2'li (₺394,95) + 3'lü (₺539,95) | Tam, mobil; 16:08–16:13 | **V8** "1000₺ üzeri ücretsiz kargo" yazıyor, sepet hesabı 900 ₺ eşiğiyle çalışıyor | Evet (iki farklı sepet tutarı) | Kafa karışıklığı, upsell kaybı, kampanya ayarı riski | Bkz. 3.1 | Eşiği panelde ve metinlerde eşitlemek | **Yüksek** |
| 14 | D&P Perfumum — [dpperfumum.com.tr](https://dpperfumum.com.tr) | Parfüm | ikas (gözlem) | P6 Soncy 100 ml (₺900) | Tam, mobil; 16:09 | **V6** "Whatsapp" bağlantısı `wa.me/05393623636` (ülke kodu yok); yüzen düğme doğru | Evet (ana sayfa + ürün sayfası) | Düşük–orta (alternatif düğme çalışıyor) | Bkz. 3.1 | `wa.me/905393623636` | Orta–Yüksek |
| 15 | Bath & Body Works TR — [bathandbodyworks.com.tr](https://www.bathandbodyworks.com.tr) | Kişisel bakım | Ticimax (gözlem) | Gingham Hero 3'ü 1 arada (1.399 ₺) | Sepet, mobil; 16:07, 16:35 | Yok. 2.200 ₺ eşiği tutarlı (801 ₺ kaldı) | — | — | Ürün ve sepet fiyatı aynı | — | Düşük |
| 16 | The Body Shop TR — [thebodyshop.tr](https://www.thebodyshop.tr) | Kozmetik | Shopify (gözlem) | Shea El Balsamı 30 ml (500 TL) | Tam, mobil; 15:42–15:43 | **V16** eski alan adı `thebodyshop.com.tr` 503 veriyor | Evet (3 deneme; 16:39, 16:46) | Eski link/dizin üzerinden gelen müşteri hata görür | `503 Service Unavailable` | Eski alan adını yeni siteye 301 yönlendirmek | Düşük–Orta |
| 17 | Gratis — [gratis.com](https://www.gratis.com) | Kozmetik perakende | Özel (Next.js) | Beaulis Kiss It mat ruj | Kısmi: ürün → giriş duvarı; 16:43–16:45 | **V13** "Sepete Ekle" ve "Hemen Al" üyelik/telefon girişine yönlendiriyor; sepet sayfası da girişe yönleniyor | Evet (2 düğme, 2 deneme) | Misafir müşteri sepete bile ekleyemiyor (bilinçli tercih olabilir) | `→ /login` "Telefon numaranızla giriş yapabilir…" | Misafir sepet/ödeme veya en azından sepet önizleme | Düşük (büyük kurum) |
| 18 | Flormar — [flormar.com.tr](https://www.flormar.com.tr) | Makyaj | Özel | Perfect Lip Combo (stokta yok, ₺1.969,97 / sepette ₺984,99), Stay Perfect kapatıcı | Kısmi: ürün; 16:16, 16:20, 16:28 | Gözlenmedi (sepete ekleme otomasyonla tetiklenemedi) | — | — | 499 TL eşiği ürün ve sepet sayfasında aynı | — | Düşük |
| 19 | kahve.com — [kahve.com](https://www.kahve.com) | Kahve | IdeaSoft (gözlem) | Hario V60 filtre kağıdı (ürün sayfası 270,00 TL) + Caffeo filtre kağıdı | Tam, mobil; 16:07–16:11 | **V9** sepette birim fiyat KDV hariç ("225,00 TL + KDV %20"), toplam doğru (424,80 TL) | Evet (2 ürün, sepet yenileme) | Fiyat algısı karışıklığı; tüketiciye KDV dahil fiyat gösterimi yükümlülüğü açısından risk | Bkz. 3.1 | IdeaSoft'ta sepet fiyat gösterimini KDV dahil yapmak | Orta–Yüksek |
| 20 | Spada Coffee — [spadacoffee.com](https://spadacoffee.com) | Kahve | ikas (gözlem) | Motion/Natural 250 gr çekirdek (₺460) | Tam, mobil; 15:40–15:41 | Yok. Varsayılan varyant görünür şekilde seçili; 850 TL eşiği tutarlı; misafir ödeme + indirim kodu alanı var | — | — | Ödeme sayfası `step=info` | — | Yüksek profil, sorun yok |
| 21 | A4 Kahve — [a4kahve.com](https://a4kahve.com) | Kahve | ikas (gözlem) | Kenya Gakuyuini, Kolombiya Huila (₺1.400) | Sepet, mobil; 15:47, 16:10 | Yok. 1000 TL eşiği tutarlı | — | — | "ÖDEMEYE DEVAM ET" | — | Yüksek profil, sorun yok |
| 22 | Gloria Jean's TR — [gloriajeans.com.tr](https://gloriajeans.com.tr) | Kahve | ikas (gözlem) | Glorious Blend 4'lü (₺2.399) | Tam, mobil; 15:47–15:48 | Yok. "Tüm ürünlerde ücretsiz kargo" ↔ sepet kargo ₺0 tutarlı. **A5** "Sepet tutarı 10.000₺'yi geçemez" | — | Büyük siparişlerde satış kısıtı (bilinçli olabilir) | Sepet metni | Kuralı gözden geçirmek veya toplu sipariş yolunu belirgin yapmak | Orta |
| 23 | Ömer Güllü (Güllüoğlu) — [omergullu.com.tr](https://www.omergullu.com.tr) | Baklava | Shopify (gözlem) | Kaymaklı baklava 1 kg (1.200 TL) | Tam, mobil; 15:40–15:43 | Yok. 4.500₺ eşiği tutarlı (3.300 TL kaldı); misafir ödeme var | — | — | iyzico ödeme seçeneği | — | Orta |
| 24 | TAFT Coffee — [taftcoffee.com](https://www.taftcoffee.com) | Kahve | Shopify (gözlem) | TAFT kahve 250 gr (399,99 TL), V60 filtre (199,99 TL) | Tam, mobil; 15:12, 15:41 | Yok. "Ücretsiz kargo" ödeme sayfasında da ÜCRETSİZ | — | — | Ödeme sayfası PayTR yönlendirmesi | — | Yüksek profil, sorun yok |
| 25 | VitaminSAN — [vitaminsan.com](https://vitaminsan.com) | Takviye | Ticimax (gözlem) | Wellcare Magnezyum B6 (₺382) | Tam, mobil; 16:01–16:07 | Yok. 300 TL eşiği uygulandı; e-postayla misafir ödeme. **A2** WhatsApp `wa.me/+90…` biçimi | — | — | "Ücretsiz kargo hakkınız sepetinize uygulandı" | (A2 için) `wa.me/90…` | Orta |
| 26 | Medipera — [medipera.com](https://www.medipera.com) | Medikal | Ticimax (gözlem) | For2Hands 50 ml (₺392) | Tam, mobil; 16:08–16:09 | Yok. 490 TL eşiği tutarlı (₺98 kaldı); e-postayla misafir ödeme | — | — | Ödeme adımı `step=payment` | — | Orta |
| 27 | Konix — [konix.com.tr](https://www.konix.com.tr) | Medikal | Ticimax (gözlem) | El dezenfektanı 500 ml (stokta yok) | Kısmi: ürün; 15:46, 16:03 | Gözlenmedi. **A6:** taranan 14 ürünün hiçbirinde sepete ekle yoktu | — | Stok/katalog yönetimi sorusu | "Gelince Haber Ver" | Stokta olmayan ürünleri listelerde geriye almak | Orta |
| 28 | Proteinocean — [proteinocean.com](https://proteinocean.com) | Takviye | ikas (gözlem) | Caffeine, B-Complex (299 TL) | Tam, mobil; 16:10–16:36 | Yok. "Üye olmadan devam" var. Gözlem: 299 TL fiyatlar, 300 TL ücretsiz kargo eşiğinin hemen altında (bilinçli fiyatlama) | — | — | `continue-without-membership=true` | — | Orta |
| 29 | İstikbal — [istikbal.com.tr](https://www.istikbal.com.tr) | Mobilya | IdeaSoft (referans) | — | Kısmi: ana sayfa; 15:17 | Gözlenmedi. ABD IP'si `/en/`'e yönlendirildi (konum kaynaklı) | — | — | `→ /en/` | — | Düşük |
| 30 | Bellona — [bellona.com.tr](https://www.bellona.com.tr) | Mobilya | IdeaSoft (gözlem) | Weston mutfak masa takımı, Montego TV ünitesi | Kısmi: ürün; 16:14, 16:29 | Gözlenmedi. Sepete ekle düğmesi otomasyonla bulunamadı (il/ilçe/bayi seçimi gerektirebilir) | — | — | "Ücretsiz Teslimat / Ücretsiz Kurulum" | — | Düşük |
| 31 | Doğtaş — [dogtas.com](https://www.dogtas.com) | Mobilya | Özel | Margo puf | Kısmi: ürün; 16:17 | Gözlenmedi. "35 İş Günü İçinde Kargoda" bilgisi var | — | — | — | — | Düşük |
| 32 | English Home — [englishhome.com](https://www.englishhome.com) | Ev tekstili | Ticimax (gözlem) | Relax Visco yastık | Kısmi: ürün; 15:46, 16:09 | Gözlenmedi. Çerez katmanı (efilli) otomasyonla kapatılamadı (sayılmadı) | — | — | "1000 TL ve Üzeri … Kargo Bedava" | — | Düşük |
| 33 | Schäfer — [schafer.com.tr](https://www.schafer.com.tr) | Mutfak/ev | Ticimax (gözlem) | Home Premium Comfort nevresim (₺4.999; sepette ₺3.999,20) | Tam, mobil; 16:08 | Yok. 1.500 TL eşiği tutarlı; "Üyeliksiz Devam Et" var. **A3** stokta olmayan kepçe sayfasında "Sepete Ekle" görünür | — | — | "Ücretsiz kargo hakkınız sepetinize uygulandı" | (A3) Tükenmiş üründe düğmeyi gizlemek | Orta |
| 34 | Karaca — [karaca.com](https://www.karaca.com) | Mutfak/ev | Özel (Next.js) | Compact Steel tost makinesi | Kısmi: ürün; 16:16, 16:30 | Gözlenmedi. Çerez katmanı (efilli) dokunmayı engelledi (sayılmadı) | — | — | — | — | Düşük |
| 35 | Kanken Home — [kankenhome.com](https://kankenhome.com) | Ev dekorasyon | Shopify (gözlem) | Dalgalı LED ayna 50×30 (3.993 TL) | Tam, mobil; 15:41–15:43 | Yok. "Ücretsiz Teslimat" ödeme sayfasında da ÜCRETSİZ | — | — | Ödeme toplamı 3.993 TL | — | Yüksek profil, sorun yok |
| 36 | Atasay — [atasay.com](https://www.atasay.com) | Mücevher | Özel | Sarı altın taşlı serçe parmak yüzükler (17.810 / 11.335 / 12.985 ₺) | Kısmi: ürün; 16:42–16:45 | **V15** taksit tablosunda hatalı sayı biçimi ("5.667.5 ₺", "3.778.34 ₺") | Evet (3 ürün) | Fiyat güvenilirliği algısı | Bkz. 3.1 | Ondalık biçimini `5.667,50 ₺` yapmak | Düşük–Orta |
| 37 | Pırlant — [pirlant.com.tr](https://www.pirlant.com.tr) | Mücevher/saat | Shopify (gözlem) | Lacivert kadranlı kadın saati (15.267 ₺) | Tam, mobil; 15:42 | Yok. Misafir ödeme var. **A2** WhatsApp `wa.me/+90…` | — | — | Paratika POS yönlendirmesi | (A2) `wa.me/90…` | Orta |
| 38 | D Diamond — [ddiamond.com.tr](https://www.ddiamond.com.tr) | Mücevher | Özel | Pırlantalı nazar kolye, yonca kolye | Kısmi: ürün + sepet sayfası; 16:17, 16:29 | Gözlenmedi. Sepet sayfasında "ÜYE OLMADAN TAMAMLA" var; sepete ekleme otomasyonla tamamlanamadı | — | — | — | — | Orta |
| 39 | Salomon Türkiye — [salomon.com.tr](https://www.salomon.com.tr) | Outdoor | Ticimax (gözlem) | Quest 4 GTX, 40 | Tam, mobil; 16:09–16:10 | Yok (akış). **A1** "Tüm siparişlerde ücretsiz teslimat" ile "Ücretsiz kargo… S/PLUS avantajları için hesap oluşturun" aynı sayfada | — | Kargo koşulu belirsizliği | Ürün sayfası metinleri | Koşulu tek cümleyle netleştirmek | Orta |
| 40 | ASICS Türkiye — [asics.com.tr](https://www.asics.com.tr) | Spor | Ticimax (gözlem) | Gel-Kayano 14 | Kısmi: ürün; 16:10; ek alan adı kontrolü 16:38, 16:46 | **V17** eski alan adı `asicstr.com` Cloudflare 403 "DNS points to prohibited IP" | Evet (2 URL, 2 zaman) | Eski arama sonuçlarından gelen müşteri hata görür | `403` başlık "DNS points to prohibited IP" | Eski alan adını 301 ile yönlendirmek veya kapatmak | Düşük–Orta |
| 41 | WalkingPad Türkiye — [walkingpadturkiye.com](https://www.walkingpadturkiye.com) | Spor ekipmanı | Ticimax (gözlem) | Silikon yağı 2'li (₺790) | Tam, mobil; 16:11 | Yok. Ücretsiz kargo uygulandı; e-postayla misafir ödeme | — | — | "Ürün(ler) sepetinize eklendi." | — | Orta |
| 42 | Harley-Davidson Shop TR — [harleydavidsonshop.com.tr](https://harleydavidsonshop.com.tr) | Lisanslı giyim | ikas (gözlem) | Velo H34 kask, M ("Son 2 Ürün"), Enduro deri ceket (stokta yok) | Kısmi: ürün; 15:49, 16:43 | Gözlenmedi. Bülten penceresi dokunmayı engelledi (sayılmadı) | — | — | 5.000 ₺ eşiği metinleri tutarlı | — | Orta |
| 43 | Galen Leather — [galenleather.com](https://www.galenleather.com) | Deri kırtasiye | Shopify (gözlem) | Black Forest Pens MultiMill ($125) | Kısmi: sepet + ödeme girişi; 15:41–15:42 | Gözlenmedi. ABD IP'sine USD/uluslararası mağaza (konum kaynaklı) | — | — | "FREE SHIPPING OVER 250$ WITH CODE SHIP25" | — | Orta |
| 44 | Hektaş Bahçe — [hektasbahce.com](https://www.hektasbahce.com) | Bahçe/tarım | IdeaSoft (gözlem) | Domates tohumu, sıvı bitki besini (3 ürün de stokta yok) | Kısmi: ürün; 15:14, 16:29 | Gözlenmedi. **A6** örneklenen 3 ürünün 3'ü stokta yok | — | — | "Gelince Haber Ver" | — | Düşük–Orta |
| 45 | TFF E-Shop — [eshop.tff.org](https://eshop.tff.org) | Lisanslı taraftar ürünü | IdeaSoft (gözlem) | Tween slim fit t-shirt, M (ürün sayfası 4.950,00 ₺) | Tam, mobil; 16:37–16:38 | **V10** sepette "4.500,00 TL + KDV %10" (KDV hariç), toplam 4.950 TL. Seçeneksiz eklemede uyarı çalışıyor; misafir ödeme var | Evet (ürün sayfası ↔ sepet karşılaştırması, 2 yükleme) | Fiyat algısı karışıklığı | Bkz. 3.1 | Sepet fiyat gösterimini KDV dahil yapmak | Düşük (kurumsal) |
| 46 | **Reeder** (yedek: elektronik) — [reeder.com.tr](https://reeder.com.tr) | Elektronik | Shopify (gözlem) | S23 SE 64 GB (6.299 TL) | Tam, mobil; 15:43 | Yok. "veya misafir olarak devam et" var; "Tüm ürünlerde ücretsiz kargo" | — | — | Ödeme toplamı 6.299 TL | — | Orta |
| 47 | **Gaming.gen.tr** (yedek: elektronik) — [gaming.gen.tr](https://www.gaming.gen.tr) | Elektronik | WooCommerce (iz) | ASUS ROG monitör kolu (13.199 ₺, "Son 30 günün en düşük fiyatı") | Kısmi: ürün; 16:30 | Gözlenmedi. Dokunuş başka bir öğeye geldi, sepet boş kaldı (araç kaynaklı olabilir; tekrar edilmedi) | — | — | — | — | Orta |
| 48 | **Troyestore** (yedek: elektronik) — [troyestore.com](https://www.troyestore.com) | Elektronik | Doğrulanmadı | AirPods 4 ANC (sepette 8.499 TL; ürün sayfası 11.999 TL −%29) | Tam, mobil; 16:30–16:34 | **V12** "Siparişi Tamamla" → yalnızca üye girişi/üye ol (`/uye?ReturnUrl=/siparis/teslimat`) | Evet (2 ayrı oturum) | Ödeme adımında terk | Bkz. 3.1 | Misafir ödeme seçeneği eklemek | Orta–Yüksek |
| 49 | **BigJoy** (yedek: takviye) — [bigjoy.com.tr](https://www.bigjoy.com.tr) | Takviye | Doğrulanmadı | Bigwhey 2304 g | Kısmi: ürün; 16:31–16:48 | **V7** "Whatsapp Destek" bağlantısı numarasız (`https://wa.me/`). **A4** sepete eklemeden önce zorunlu hediye seçimi | V7 evet (2 sayfa); A4 bir kez | İletişim kaybı; ek adım sürtünmesi | Bkz. 3.1 | Numarayı eklemek (`wa.me/90…`); hediye seçimini isteğe bağlı veya varsayılanlı yapmak | **Yüksek** |
| 50 | **Barçın** (yedek: spor) — [barcin.com](https://www.barcin.com) | Spor | Next.js (iz) | — | Kısmi: ana sayfa; 16:47 | Gözlenmedi (ürün bağlantısı otomasyonla bulunamadı) | — | — | — | — | Düşük |

**Test edilemeyen 5 site (değerlendirme dışı; yerlerine 46–50. satırlar eklendi):** Supplementler, Vatan Bilgisayar, İnceHesap, İtopya, Decathlon Türkiye. Beşi de normal tarayıcıda 25 saniye beklendiğinde bile "Bir dakika lütfen… Güvenlik doğrulaması yapılıyor" (Cloudflare) sayfasında kaldı (15:16–15:20). Kurala uygun olarak doğrulama aşılmaya çalışılmadı; **site hatası sayılmadı.**

**Altyapı dağılımı (gözlemle):** ikas 12, Ticimax 12, Shopify 11, IdeaSoft 4, özel/diğer 11.
**Derinlik:** Tam 27, Sepet 3, Kısmi 19, mağaza erişilemez 1. Kısmi olanların 2'si (Manu Atelier, Galen Leather) ödeme sayfasına ulaştı, ancak konum nedeniyle uluslararası (USD) vitrin gösterildiği için "kısmi" sayıldı. Böylece ödeme sayfası girişine ulaşılan site sayısı 29'dur.

### 3.1 Doğrulanmış sorunlar (17)

| Kod | Site | Ne görüldü (saat, TSİ) | Nasıl doğrulandı | Önem |
|---|---|---|---|---|
| V1 | Pump Butik | `pumpbutik.com` ve `pumpbutik.com/t-shirt` → `307` → `accounts.ikas.com` (ikas giriş sayfası). Tarayıcıda başlık "ikas - Giriş Yap" (15:04:55, 15:09:57, 15:44:56–57) | 3 zaman, 2 URL, curl + tarayıcı | **Kritik** |
| V2 | advb cosmetics | `www.advbcosmetics.com` ve `www…/trust-me-eyeshadow-palette` → Cloudflare `403` "CNAME Cross-User Banned"; `advbcosmetics.com` (www'siz) çalışıyor (15:05, 15:11, 15:44:57–58) | 3 zaman, 2 URL | Orta |
| V3 | Qarmacha | Stokta olmayan üründe ("Stoğa Gelince Haber Ver", `out-of-stock`) "Stokta yalnızca **6** ürün kaldı" (15:45:12) → yenileme "**4**" (15:46:25) → yenileme "**2**" (15:46:32). "Bu ürün son 7 günde **17** kez satın alındı" ve "şu anda **3** kişinin sepetinde" iki farklı üründe birebir aynı | 3 yükleme + 2 ürün | **Yüksek** (güven + hukuki risk) |
| V4 | Qarmacha | Üst bant "2500 TL ve Üzeri Ücretsiz Kargo!". Aynı sepet sayfasında "Ücretsiz kargo için sepetine ₺500.00 daha ürün ekle" (₺1.000 sepette → 1.500) ve alt bilgi "1500 TL ve Üzeri Siparişlerde Kargo ücretsiz!" (16:07:52, 16:12:25) | 2 yükleme, aynı sayfada iki çelişkili ifade | Orta |
| V5 | Qarmacha | Görünür "Whatsapp" bağlantısı `https://wa.me/05444187900`. WhatsApp kuralına göre numara uluslararası biçimde, başında 0 olmadan yazılmalı (15:17:05, 15:17:17) | Ana sayfa + ürün sayfası | Orta |
| V6 | D&P Perfumum | Alt bilgideki "Whatsapp" bağlantısı `https://wa.me/05393623636`; yüzen düğme doğru (`phone=905393623636`) (15:16:40, 15:16:50) | Ana sayfa + ürün sayfası | Düşük–Orta |
| V7 | BigJoy | Görünür "Whatsapp Destek" bağlantısı `https://wa.me/` (numara yok) (16:47:58, 16:48:08) | Ana sayfa + ürün sayfası | Orta |
| V8 | Limonian | Metin: "1000₺ ve Üzeri Ücretsiz Kargo" / "1000 TL üzeri ücretsiz kargo". Sepet ₺394,95 iken "₺505,05 daha ürün ekle" (394,95 + 505,05 = **900**). Sepet ₺934,90'a çıkınca "daha ekle" mesajı kayboldu (16:09:05, 16:13:15, 16:13:47) | İki farklı sepet tutarı | Düşük–Orta |
| V9 | kahve.com | Ürün sayfası "270,00 TL" (KDV dahil); sepette "225,00 TL + KDV % 20" ve "129,00 TL + KDV % 20"; toplam 424,80 TL doğru (16:10:02–16:11:24) | 2 ürün, sepet yenileme | Orta |
| V10 | TFF E-Shop | Ürün sayfası "4.950,00 ₺"; sepette "4.500,00 TL + KDV % 10"; toplam 4.950,00 TL (16:37:57, 16:38:28) | Ürün ↔ sepet karşılaştırması | Orta |
| V11 | Elle Shoes | "Alışverişi Tamamla" sonrası yalnızca "GİRİŞ YAP / ÜYE OL" (e-posta/telefon + şifre, Facebook/Google). Üyeliksiz seçeneği yok (mobil 16:16:54–17:01, masaüstü 16:17:45) | Mobil + masaüstü | **Yüksek** |
| V12 | Troyestore | "Siparişi Tamamla" → `/uye?ReturnUrl=/siparis/teslimat`: "Üye girişi, Giriş Yap, Üye Ol"; misafir seçeneği yok (16:32:38, 16:34:26) | 2 ayrı oturum | **Yüksek** |
| V13 | Gratis | "Sepete Ekle" ve "Hemen Al" → `/login` ("Telefon numaranızla giriş yapabilir ya da yeni bir hesap oluşturabilirsiniz"); `/cart` da girişe yönleniyor (16:43:48, 16:45:25, 16:45:31) | 2 düğme, 2 deneme | Yüksek etki (muhtemelen bilinçli iş kararı) |
| V14 | Elle Shoes | Sitemap'teki eski ürünler: kemer "17,55 TL → 7,86 TL %55", cüzdan "35,19 TL → 28,15 TL", cüzdan "30,17 TL → 24,13 TL"; "RESİM HAZIRLANIYOR" görseli; stokta yok ama "Sepete Ekle" görünür (16:14:40–16:15:19). Güncel ürünler normal fiyatlı (ör. 4.279,90 TL) | 3 ürün + ekran görüntüsü | Orta |
| V15 | Atasay | Taksit tablosu: "2 Taksit 5.667.5 ₺", "3 Taksit 3.778.34 ₺", "8.905 ₺ / 5.936.67 ₺", "6.492.5 ₺ / 4.328.34 ₺" (16:42:38, 16:45:57, 16:46:05) | 3 ürün | Düşük |
| V16 | The Body Shop TR | Eski alan adı `www.thebodyshop.com.tr` (ve `/sss`) → `503 Service Unavailable` (16:39:00, 16:39:31 tarayıcı, 16:46:05) | 3 deneme | Düşük–Orta |
| V17 | ASICS Türkiye | Eski alan adı `www.asicstr.com` (ana sayfa + ürün yolu) → Cloudflare `403` "DNS points to prohibited IP" (16:38:57, 16:38:59, 16:46:05). İlk sürümdeki arama sonuçlarında bu alan adı "Asics Türkiye Resmi Web Sitesi" olarak listeleniyordu | 2 URL, 2 zaman | Düşük–Orta |

**Not:** Bu bulgular, işletmelerin kötü niyetli olduğu anlamına gelmez. Çoğu tema, uygulama veya alan adı ayarından kaynaklanan teknik tutarsızlıklardır. Bu liste kamuya açık paylaşım için değil, iş fikrini değerlendirmek içindir.

### 3.2 Aday sorunlar (7) — tek gözlem veya etkisi ölçülemeyenler

| Kod | Site | Ne görüldü | Neden doğrulanmadı |
|---|---|---|---|
| A1 | Salomon | Aynı ürün sayfasında "Tüm siparişlerde ücretsiz teslimat" ve "Ücretsiz kargo, özel ödüller… S/PLUS avantajlarından yararlanmak için hesabınızı oluşturun" | Misafir siparişte kargo ücreti adres girilmeden görülemedi |
| A2 | Pırlant, VitaminSAN | WhatsApp bağlantıları `wa.me/+905…` biçiminde ("+" ile) | WhatsApp SSS "+" kullanılmamasını öneriyor; pratikte çalışıp çalışmadığı uygulama açılmadan doğrulanamadı |
| A3 | Elle Shoes, Schäfer | "Ürün stoklarımızda kalmamıştır" yazan sayfalarda "Sepete Ekle" düğmesi görünür (Elle'de basınca "Lütfen Seçim Yapınız") | UX sorunu; satışa etkisi ölçülmedi |
| A4 | BigJoy | "Sepete Ekle" öncesi zorunlu hediye seçimi ("Lütfen 1 adet hediye seçiniz") | Bir kez görüldü; çerez katmanı nedeniyle tekrar tamamlanamadı |
| A5 | Gloria Jean's | Sepette "Sepet tutarı 10.000₺'yi geçemez. Toplu siparişleriniz için müşteri hizmetlerini arayınız." | Bilinçli iş kuralı olabilir |
| A6 | Konix, Hektaş Bahçe | Konix'te taranan 14, Hektaş'ta 3 ürünün hiçbiri sepete eklenebilir değildi | Örneklem küçük; mevsimsel olabilir |
| A7 | Derimod | Mobil çerez bandı metni "Reddet" seçeneğinden söz ediyor; görünen düğmeler yalnızca "Ayarlar" ve "Kabul Et" | Tek ekran görüntüsü; mevzuat yorumu gerektirir |

**İlk sürümdeki arama dizini adaylarının durumu:**

| Eski kod | Sonuç |
|---|---|
| A1 Qarmacha `iletisim.aspx` | Sonuç yok. Cloudflare güvenlik sayfası bizim istemciyi engelledi ("You are unable to access myikas.com"); site hatası sayılmadı |
| A2 TFF `tff.myideasoft.com` | Sorun yok: 301 ile `eshop.tff.org`'a yönleniyor. Sepet sayfası `index, follow` (çok düşük önemli SEO notu) |
| A3 ASICS `asicstr.com` | **Doğrulandı → V17** |
| A4 The Body Shop eski alan adı | **Doğrulandı → V16.** "200₺ üzeri ücretsiz kargo" ifadesi güncel sitede yok; arama dizinindeki eski bilgi |
| A5 Salomon çoklu alan adı | Değerlendirme dışı. `salomon-tr.com` yanıt vermedi, `salomonturkiye.com` 403, `salomonsturkiye.com` "Salomon Türkiye" başlıklı bir site açtı. Sahiplik doğrulanamadığı için yorum yapılmadı |

### 3.3 Yanlış alarmlar (11) ve değerlendirme dışı durumlar

| Kod | İlk görünüm | Gerçek durum |
|---|---|---|
| Y1 | Derimod sepetinde 8.999 TL'lik siparişe "Kargo 75.00 TL" | Tutarın üstü çizili (`line-through`) → ücretsiz; ödeme toplamı 8.999 TL |
| Y2 | kahve.com'da `wa.me/905555555555` (yer tutucu numara) | Bağlantı DOM'da var ama mobilde gizli, masaüstünde yok; müşteri görmüyor |
| Y3 | Desa mobilde "beden seçmeden Sepete Ekle'ye basınca uyarı yok" ve "sepete ekleme çalışmıyor" | Fare tıklaması kaynaklı test hatası; gerçek dokunmayla uyarı ve ekleme çalışıyor |
| Y4 | VitaminSAN "sepete ekle sonrası sepet boş" | Aynı test hatası; dokunmayla ekleme çalışıyor |
| Y5 | AVVA tükenen bedende "Son 0", "Son 308" metinleri | Gizli öğe metni; ekranda görünmüyor |
| Y6 | Medipera "Sepete Ekle" dokunuşu "Favorilerim"e gitti | Kaydırma konumu kaynaklı; düğme ortalanınca ekleme çalıştı |
| Y7 | Ömer Güllü ürün sayfasında koşulsuz "Ücretsiz Kargo" | İfade gizli bir slaytta; görünür değil |
| Y8 | Kiğılı ve Les Benjamins ürün sayfaları 404 | Benim kısalttığım hatalı URL'ler; doğru URL'lerle sayfalar açıldı |
| Y9 | kahve.com'da yanlış ürün sepete eklendi | Öneri karuselindeki düğmeye dokunulmuştu (test aracı hatası) |
| Y10 | Qarmacha eski URL "engelli" | Cloudflare güvenlik katmanı bizim istemciyi engelledi |
| Y11 | Elle'de "stokta" görünen ürün sonra "stokta yok" çıktı | Stok mesajı sayfa yüklendikten sonra geliyor; tarama aracı erken okumuştu |

**Değerlendirme dışı (site hatası sayılmadı):**
- 5 Cloudflare güvenlik doğrulaması.
- Konum kaynaklı durumlar: Les Benjamins ve Zeki Triko bölge pencereleri, İstikbal `/en/` yönlendirmesi, Manu Atelier ve Galen Leather USD vitrini.
- Çerez katmanı veya bülten penceresinin otomasyonu engellemesi: English Home, Karaca, ASICS, Harley-Davidson Shop.

---

## 4. En sık karşılaşılan 10 sorun

Sayılar 50 site üzerinde, bu çalışmada **gözlenen** durumlardır. "Doğrulanmış" ve "aday" ayrı gösterildi.

| Sıra | Sorun türü | Doğrulanmış (site) | Aday (site) | Örnek |
|---|---|---|---|---|
| 1 | Alan adı / erişim sorunları (mağaza kapalı görünümü, www hatası, yönlendirilmeyen eski alan adı) | 4 | — | Pump Butik, advb, The Body Shop, ASICS |
| 2 | Hatalı veya boş WhatsApp bağlantısı | 3 | 2 | Qarmacha, D&P, BigJoy; (+) Pırlant, VitaminSAN |
| 3 | Zorunlu üyelik / misafir alışveriş yok | 3 | — | Elle Shoes, Troyestore, Gratis |
| 4 | Çelişkili ücretsiz kargo eşiği veya koşulu | 2 | 1 | Qarmacha, Limonian; (aday) Salomon |
| 5 | Sepette KDV hariç birim fiyat gösterimi | 2 | — | kahve.com, TFF (ikisi de IdeaSoft) |
| 6 | Yanlış/eski fiyat veya bozuk fiyat biçimi | 2 | — | Elle (eski ürünler), Atasay (taksit tablosu) |
| 7 | Stokta olmayan üründe "Sepete Ekle" görünmesi | (V14 içinde 1) | 2 | Elle, Schäfer |
| 8 | Gerçeği yansıtmayan stok/aciliyet mesajları | 1 | — | Qarmacha |
| 9 | Sepete eklemeden önce ek zorunlu adım | — | 1 | BigJoy (hediye seçimi) |
| 10 | Sepet tutarı sınırı / yüksek stok-dışı oranı | — | 3 | Gloria Jean's; Konix, Hektaş |

**Hiç görülmeyen sorunlar (bu örneklemde):**
- Varyant seçmeden sepete ekleme: test edilen tüm varyantlı ürünlerde ya uyarı çıktı ya da varsayılan seçenek görünür şekilde seçiliydi.
- Sepet ile ödeme sayfası arasında fiyat farkı, sepetten ödeme sayfasına geçememe, mobilde yatay taşma.

**Yorum:** İlk sürümde beklenen "kırık sepet/ödeme" türü ağır hatalar bu örneklemde çıkmadı. Bulunanlar daha çok **tutarlılık, iletişim, alan adı ve ayar hataları**.

---

## 5. En fazla para kaybettirme ihtimali olan 5 sorun

Sıralama, gözlenen sorunların satışa etki mekanizmasına göre yapıldı; etkinin büyüklüğü ölçülmedi.

| # | Sorun (gözlenen örnek) | Neden çok para kaybettirir |
|---|---|---|
| 1 | **Mağaza alan adının çalışmaması** (Pump Butik → ikas giriş sayfası) | Kendi sitesinden satış sıfırlanır; reklam, sosyal medya ve arama trafiği boşa gider. Mağaza sahibi pazaryerinde satış yaptığı için fark etmeyebilir. |
| 2 | **Zorunlu üyelik** (Elle, Troyestore, Gratis) | Baymard'a göre hesap açma zorunluluğu başlıca terk nedenlerinden (%19–26). Ödeme adımına gelmiş, satın almaya en yakın müşteri kaybedilir. |
| 3 | **Çelişkili kargo eşiği / koşulu** (Qarmacha 2500↔1500, Limonian 1000↔900, Salomon adayı) | Ek maliyet belirsizliği en büyük terk nedeni (%39–48). Ayrıca yanlış eşik ya sepeti büyütme fırsatını kaçırır ya da gereksiz ücretsiz kargo maliyeti doğurur. |
| 4 | **Güveni zedeleyen fiyat/stok gösterimi** (Qarmacha rastgele stok sayacı, Elle 7,86 TL'lik eski ürünler, sepette KDV hariç fiyat, Atasay bozuk taksit biçimi) | Müşteri fiyat veya stok bilgisine inanmazsa satın almaz. Yanıltıcı ticari uygulama ve fiyat gösterimi mevzuatı açısından idari para cezası riski doğabilir (hukuki değerlendirme avukata aittir). |
| 5 | **Kopuk iletişim kanalı** (numarasız veya hatalı WhatsApp bağlantısı) | Türkiye'de alışveriş öncesi soru sorma çoğunlukla WhatsApp'tan yapılıyor. Kararsız müşterinin sorusu cevapsız kalır. |

**Satış konuşmasında kullanılabilecek kayıp hesabı (örnek; gerçek veri değildir):**

> Aylık kayıp ≈ etkilenen oturum sayısı × normal dönüşüm oranı × ortalama sepet tutarı
>
> Örnek varsayım: aylık 20.000 mobil oturum, %1,5 dönüşüm oranı, 1.200 TL ortalama sepet, sorun mobil oturumların %10'unu etkiliyor.
> 2.000 oturum × 0,015 × 1.200 TL = **36.000 TL/ay**.
>
> Bu rakamlar örnektir. Her müşteri için kendi analitik verisiyle hesaplanmalıdır.

---

## 6. Mağaza sahiplerinin para ödeyebileceği hizmet paketi önerileri

**Saha testinden çıkan ders:** Bulunan sorunların çoğu panelde 5–30 dakikada düzeltilebiliyor (WhatsApp numarası, eşik metni, KDV gösterim ayarı, misafir ödeme anahtarı, 301 yönlendirmesi). Değer, düzeltmeden çok **bulmada ve düzenli kontrol etmede**. Bu yüzden giriş fiyatı düşük tutulmalı.

Fiyatlar **öneridir; pazar tarafından doğrulanmamıştır.**

| Paket | İçerik | Önerilen fiyat (KDV hariç) | Kim için |
|---|---|---|---|
| **0. Ücretsiz mini tarama** | 3 doğrulanmış bulgu, her biri için ekran görüntüsü/kaydı ve tek cümlelik çözüm | 0 TL | Yalnızca gerçek sorun bulunan mağazalara |
| **A. Tutarlılık denetimi** | Platforma özgü 40–60 maddelik kontrol listesi: kargo eşiği tutarlılığı (bant ↔ ürün ↔ sepet ↔ ödeme), iletişim bağlantıları, misafir ödeme, varyant uyarıları, stok mesajları, KDV dahil fiyat gösterimi, eski alan adları, sitemap'teki eski ürünler; mobil (gerçek telefon) + masaüstü; öncelikli düzeltme listesi | **2.900–4.900 TL** (önce 2.900 TL test edilmeli) | Küçük mağaza |
| **B. Kapsamlı denetim + düzeltme planı** | A + 10 ürün/varyant, kampanya/kupon senaryoları, iade/teslimat/ön bilgilendirme metinlerinin tutarlılığı, 30 dakikalık sunum | 9.900 TL | Orta ölçekli, düzenli kampanya yapan |
| **C. Düzeltme uygulaması** | Panel ayarları, tema düzenlemesi, alan adı/301 yönlendirmesi | 1.500–2.000 TL/saat veya madde başı sabit fiyat | A/B paketini alanlar |
| **D. Aylık tutarlılık bekçisi** | Ayda 2 kampanya öncesi kontrol, haftalık otomatik kontroller (alan adı erişimi, sepete ekleme, ödeme sayfası, WhatsApp/telefon bağlantısı, kargo eşiği metni), aylık kısa rapor | 1.490–2.990 TL/ay (min. 3 ay) | Sık kampanya yapanlar |
| **E. Ajans/iş ortağı paketi** | Ajansın kendi markasıyla sunduğu denetim (beyaz etiket) | Denetim başına 1.500–3.000 TL toptan | Reklam ve platform partner ajansları |

**Mevzuat eklentisi (dikkatli sunulmalı):** Saha testinde KDV hariç sepet fiyatı (2 site), yanıltıcı olabilecek stok sayacı (1 site) ve indirim etiketleri ("10 Günün En Düşük Fiyatı", "Son 30 günün en düşük fiyatı") görüldü. Bunlar için bir kontrol listesi sunulabilir. Ancak bu **hukuki görüş değildir**; avukatla iş birliği yapılmadan "uyum garantisi" verilmemelidir.

İlgili mevzuat bilgileri (arama özetleri; resmi metinden teyit edilmeli):
- **İndirim duyuruları:** Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği'ndeki değişiklik 1 Temmuz 2026 tarihli ve 33297 sayılı Resmî Gazete'de yayımlandı, **1 Ağustos 2026'da yürürlüğe girdi**. İndirim öncesi fiyat olarak **son 10 günün en düşük fiyatı** esas alınıyor (önceden 30 gündü). Saha testinde AVVA'da "10 Günün En Düşük Fiyatı" etiketi görüldü.
- **Mesafeli sözleşmeler:** Ön bilgilendirmede vergiler dahil toplam fiyat, teslimat masrafları ve 14 günlük cayma hakkı bilgisi zorunlu. 2026 için bilgilendirme yükümlülüğü ihlalinde **işlem başına 3.973 TL** idari para cezası bildiriliyor.
- **Aldatıcı reklam / haksız ticari uygulama:** Haberlerde 108.370 TL – 39.916.524 TL aralığında cezalar geçiyor.

---

## 7. Türkiye'de hedef müşteri profili

### 7.1 Pazar büyüklüğü (masa başı araştırma; arama özetleri)

| Gösterge | Değer | Kaynak / güvenilirlik |
|---|---|---|
| 2025 e-ticaret hacmi | 4,57 trilyon TL (+%52,2) | Ticaret Bakanlığı duyurusu, 12.05.2026 |
| 2025 e-ticaret yapan işletme sayısı | 634.611 | Aynı |
| Pazaryerinde satan işletme | ~540 bin | Bakanlık raporuna dayanan kaynaklar (yıl 2023/2024 olarak farklı aktarılıyor) |
| **Kendi sitesi/uygulamasından satan ETBİS kayıtlı işletme** | **35 bin+** | Aynı; yıl belirsiz |
| Shopify canlı mağaza (TR) | 15.784 | Store Leads, 10 Temmuz 2026 |
| WooCommerce canlı mağaza (TR) | 39.879 | Store Leads, 28 Ağustos 2026 |
| ikas / Ticimax / IdeaSoft | 20 bin+ / 30 bin+ / 35–50 bin+ | Şirket beyanları |

### 7.2 Saha testine göre en uygun müşteri

| Özellik | Saha testinden kanıt |
|---|---|
| **ikas veya IdeaSoft kullanan KOBİ** | Doğrulanmış sorunların 7'si ikas, 2'si IdeaSoft sitelerinde. Shopify sitelerinde akış sorunu çıkmadı (yalnızca eski alan adı) |
| **Kendi sitesi + pazaryerinde birlikte satan marka** | Pump Butik pazaryerinde satış yaparken kendi alan adı çalışmıyordu. Bu tür markalar kendi sitelerini daha az kontrol ediyor olabilir (tek örnek; hipotez) |
| **Sık kampanya ve uygulama kullanan** (stok sayacı, hediye seçimi, sepette indirim) | Qarmacha (stok sayacı), BigJoy (hediye seçimi), Limonian (eşik/hediye paketi) |
| **Altyapı veya alan adı değiştirmiş marka** | The Body Shop, ASICS (eski alan adları), advb (www), Pump Butik |
| Reklam harcaması olan, 1–15 kişilik ekip | (Saha testinde ölçülmedi; varsayım) |

### 7.3 Hedeflenmemesi gerekenler
- **Büyük perakendeciler:** Saha testinde Gratis, Karaca, Doğtaş, Bellona, English Home gibi büyük oyuncularda çerez katmanları, bayi modelleri ve bilinçli iş kuralları vardı. Zorunlu üyelik gibi bulgular bu şirketlerde çoğunlukla bilinçli tercih; satın alma süreçleri de uzun.
- Yalnızca pazaryerinde satanlar.
- Shopify'ın standart ödeme sayfasını kullanan küçük mağazalar: bu örneklemde akış sorunu en az bu grupta çıktı. Yine de içerik/eşik kontrolü yapılabilir.

---

## 8. Müşteriye nasıl ulaşılacağı ve satış konuşması

### 8.1 Kanallar (öncelik sırasıyla)

1. **Somut bulguyla doğrudan e-posta.** Önce denetleyin, yalnızca doğrulanmış sorunu olan mağazaya yazın. Saha testindeki oran (KOBİ profilinde ~%47) bu yöntemin uygulanabilir olduğunu gösteriyor.
   - Hukuki not: 6563 sayılı Kanun ve yönetmeliğe göre **tacir veya esnafa ticari elektronik ileti için önceden onay gerekmez; ancak ret hakkı kullanılmışsa gönderilemez** ve gönderim öncesinde İYS kontrolü gerekir. Mali müşavir veya avukatla teyit edin.
2. **ikas ve IdeaSoft partner ajansları.** Bulguların çoğu bu platformlarda çıktı ve ajansların panel erişimi var. Beyaz etiketli denetim (Paket E) önerin.
3. **İçerik:** "50 e-ticaret sitesini test ettik: %28'inde en az bir sorun vardı" türünden **isimsiz** paylaşımlar. Marka adıyla hata ifşa etmeyin.
4. **Kampanya dönemi:** Kasım indirimlerinden (11.11, Black Friday) önce "kampanya öncesi tutarlılık kontrolü" teklifi.

### 8.2 Satış konuşması (e-posta taslağı)

> **Konu:** [Mağaza adı] — sitenizde fark ettiğimiz 2 küçük ama önemli tutarsızlık
>
> Merhaba [Ad],
>
> [Tarih] günü sitenizi normal bir müşteri gibi telefondan denedik. Sitenin üst bandında "[X] TL üzeri ücretsiz kargo" yazıyor, ancak sepet sayfası müşteriye [Y] TL'lik eşiğe göre hesap gösteriyor. Ayrıca alt bilgideki WhatsApp bağlantısı ülke kodu olmadan yazıldığı için müşteriyi sohbete götürmüyor. Her ikisini de sayfayı yenileyip ikinci bir üründe tekrar kontrol ettik; ekran görüntülerini ekledik.
>
> İkisi de panelden birkaç dakikada düzeltilebilir. İsterseniz kontrol ettiğimiz 40 maddenin kısa raporunu ücretsiz gönderelim.
>
> [İmza — ad, telefon, web sitesi]
> Bu tür e-postaları almak istemiyorsanız bu e-postayı yanıtlamanız yeterli.

### 8.3 Görüşmede kullanılacak 4 soru
1. Kampanyalarınızı yayına almadan önce sitede kargo eşiğini, kuponları ve bantları kim kontrol ediyor?
2. Son 3 ayda tema, uygulama veya alan adı değişikliği yaptınız mı?
3. WhatsApp'tan günde kaç soru geliyor? Bağlantı çalışmasa fark eder miydiniz?
4. Ödeme adımında misafir alışverişi açık tutmama nedeniniz nedir? (Zorunlu üyelik varsa)

### 8.4 İtirazlar ve yanıtlar

| İtiraz | Yanıt |
|---|---|
| "Bunu kendim de düzeltirim." | Kesinlikle; değer düzeltmede değil, bulmada. Biz her kampanyadan önce tüm sayfaları sizin yerinize kontrol ediyoruz. |
| "Platform zaten bunu yapıyor." | Platform ödeme altyapısını çalışır tutar. Sizin metinlerinizi, eşiklerinizi, uygulamalarınızı ve alan adlarınızı kontrol etmez. Bulduğumuz sorunlar platform hatası değil, ayar/içerik sorunu. |
| "Ajansımız var." | Ajansınıza rapor verebiliriz; düzeltmeyi onlar uygular. |
| "Bütçemiz yok." | Ücretsiz mini raporla başlayın; ücretli denetim 2.900 TL'den başlıyor. |

---

## 9. Tek seferlik hizmet ve aylık abonelik modeli

| | Tek seferlik denetim | Aylık abonelik |
|---|---|---|
| Satması | Daha kolay; somut çıktı | Zor; sürekli değer kanıtlanmalı |
| Saha testinin işareti | Bulguların çoğu tek seferde düzeltilip kapanıyor | Sorunlar **ayar değiştikçe** yeniden doğuyor (eşik, kampanya, uygulama, alan adı). Bu, düzenli kontrol için gerekçe olabilir |
| Risk | Bir kez düzeltildikten sonra müşteri geri gelmeyebilir | 2–3 ay sonra "yeni bir şey çıkmıyor" diyerek ayrılma |

**Öneri:** Önce tek seferlik **tutarlılık denetimi** satın. Aboneliği yalnızca **sık kampanya yapan** ve uygulama/tema değişikliği sık olan müşterilere "kampanya öncesi kontrol + haftalık otomatik izleme" olarak, en az 3 ay taahhütle önerin. Haftalık otomatik izleme kapsamı: alan adı erişimi, sepete ekleme, ödeme sayfasının açılması, WhatsApp/telefon bağlantı biçimi, kargo eşiği metinleri. Saha testinde kullanılan basit tarayıcı betikleriyle bu kontrollerin otomatikleştirilebildiği görüldü. Yurt dışında yalnızca izleme yapan ucuz uygulamaların (ör. MyStoreGuardian 9,99–99,99 $/ay) olması, saf izlemeye yüksek ödeme isteği olmadığına dair zayıf bir işarettir.

---

## 10. Tahmini maliyetler ve gelir modeli

### 10.1 Sabit maliyetler (2 kişi, şahıs şirketi varsayımı)

| Kalem | Tutar | Kaynak / not |
|---|---|---|
| Şahıs şirketi kuruluşu | ~2.240–5.500 TL (tek seferlik) | Arama özeti |
| Muhasebe | 3.593 TL/ay'dan başlayan | Arama özeti |
| Bağ-Kur (şirket sahibi için) | 10.156,73 TL/ay (5 puan indirimli en düşük) | 2026, arama özeti; kurucunun SGK durumuna göre değişir |
| Yazılım | Playwright (açık kaynak), Microsoft Clarity (ücretsiz) | Saha testinde Playwright yeterli oldu |
| Test cihazları | Kurucuların mevcut telefonları (0 TL varsayıldı) | **Gerçek iOS + Android telefon şart:** emülatör, dokunma olaylarında yanlış alarm üretti (Y3, Y4) |
| **Aylık sabit toplam** | **≈ 13.750 TL/ay** | Kurucu maaşları hariç |
| **İlk 3 ay toplam** | **≈ 43–47 bin TL** | Kurucu maaşları hariç |

Referans: 2026 asgari ücret net 28.075 TL (Temmuz 2026'da ara zam yapılmadı; arama özeti). İki kurucunun asgari ücret düzeyinde gelir alabilmesi için **aylık ≈ 70 bin TL** ciro (KDV ve vergiler hariç) gerekir.

### 10.2 Zaman maliyeti (saha testinden ölçülen)
- Bu çalışmada 50 site için yaklaşık 1 saat 45 dakika harcandı. Ancak derinlik site başına değişti ve otomasyon araçları bu sırada geliştirildi.
- Hazır araçlarla, **platform bilinen bir site için tam akış + tutarlılık kontrolü ≈ 20–40 dakika**, rapor yazımıyla birlikte **1,5–3 saat** sürüyor (tahmin).
- Bu, Paket A'nın 2.900 TL'ye bile saat başına makul kaldığını gösteriyor.

### 10.3 İlk 3 ay gelir senaryoları (KDV hariç; tamamen varsayım)

Fiyatlar: A = 2.900 TL, B = 9.900 TL, abonelik = 1.990 TL/ay, düzeltme = 1.750 TL/saat.

| Senaryo | 1. ay | 2. ay | 3. ay | 3 ay toplam | Sabit gider sonrası (3 ay) |
|---|---|---|---|---|---|
| **Kötümser** | 0 | 2A = 5.800 | 3A = 8.700 | **14.500 TL** | ≈ −30 bin TL |
| **Baz** | 2A = 5.800 | 4A + 1B = 21.500 | 6A + 1B + 4 abone + 8 saat = 49.260 | **76.560 TL** | ≈ +31 bin TL (kişi başı ayda ≈ 5.200 TL) |
| **İyimser** | 4A + 1B = 21.500 | 8A + 2B + 5 abone + 15 saat = 79.200 | 10A + 3B + 10 abone + 25 saat = 122.350 | **223.050 TL** | ≈ +178 bin TL (kişi başı ayda ≈ 29.700 TL) |

**Sonuç:** Fiyatlar daha düşük olduğu için aynı geliri elde etmek **daha çok müşteri** gerektiriyor. Baz senaryoda ilk 3 ayda kurucular geçinemez; iş yan iş olarak başlamalı.

---

## 11. Rakipler ve yurt dışında benzer hizmetler

### 11.1 Türkiye

| Rakip türü | Örnekler | Fiyat bilgisi (arama özeti) | Bizden farkı / tehdit |
|---|---|---|---|
| CRO ajansları | Magna Dijital, İKOMERS, Pixenon, Sanal Yönetmen, Nuans, ROIPublic, Magmaroot, Poligon, dotCREA | Yayımlanmamış; çoğu ücretsiz ön analiz sunuyor | Daha geniş hizmet. "Ücretsiz ön analiz" giriş teklifimizle çakışır |
| Platform partner ajansları | ikas ve Ticimax partner ajansları | Kurulum/bakım odaklı | Panel erişimi onlarda; **hem rakip hem satış kanalı** |
| E-ticaret danışmanları | Bireysel/butik | Teşhis paketi 15–40 bin TL | Daha üst bant |
| Freelance pazar yerleri | Bionluk, Armut | SEO analiz raporu 200–350 TL | Düşük fiyat çıpası |
| Kurumsal test otomasyonu | Testinium, Keytorc, Virgosol | Testinium min. proje 75.000 $+ | Büyük kurumlar |
| Ücretsiz araçlar | Microsoft Clarity, Google Analytics | 0 TL | Mağaza sahibi bakarsa sorunu kendisi bulabilir |
| Platformların kendisi | ikas, Ticimax, IdeaSoft | Pakete dahil | KDV gösterimi veya WhatsApp biçimi gibi kontrolleri panele eklerlerse pazar daralır |

### 11.2 Yurt dışı

| Hizmet | Ne yapıyor | Fiyat (arama özeti; doğrulanmadı) |
|---|---|---|
| Baymard Institute | Araştırmaya dayalı UX denetimi | 3.400–9.700 $; mobil 10.900 $ |
| Noibu | E-ticaret hata izleme, gelir etkisi tahmini | Teklife göre |
| Contentsquare / Quantum Metric / Glassbox | Kurumsal deneyim analitiği | Yüksek, satış ekibiyle |
| Ghost Inspector | Tarayıcı otomasyonuyla sepet/ödeme izleme | ≈ 109–499 $/ay |
| Shopify uygulamaları (MyStoreGuardian, Uptime, TestingBot) | Otomatik "sepete ekle çalışıyor mu" testi | 9,99–99,99 $/ay; Uptime 29 $/ay'dan |
| Fiverr/ajans CRO denetimleri | Manuel denetim | 45–300 $; ajanslar 500–2.000 $ |

### 11.3 Nasıl ayrışılabilir?
1. **Platforma özgü kontrol listesi.** Saha testinde platforma göre tekrar eden kalıplar görüldü:
   - IdeaSoft: sepette KDV hariç fiyat.
   - ikas: eşik metinleri, WhatsApp biçimi, stok sayacı uygulamaları.
   - Ticimax: tükenmiş üründe "Sepete Ekle".
   - Tüm platformlar: eski alan adları ve www kayıtları.
2. **Türkiye'ye özgü kontroller:** WhatsApp `wa.me/90…` biçimi, KDV dahil fiyat, 10 gün indirim etiketi, misafir ödeme, kapıda ödeme ve taksit tablosu biçimi.
3. **Kanıtlı ve yanlış alarmsız rapor:** Her bulgu iki kez doğrulanır, yanlış alarm ayrıca listelenir. Bu çalışmada 11 yanlış alarm elendi.
4. **Gerçek telefonla test:** Emülatörün ürettiği sahte hatalar ayıklanır.
5. **"Sorun bulamazsak ücret iadesi"** garantisi.

---

## 12. Bu işin güçlü ve zayıf tarafları

| Güçlü taraflar | Zayıf taraflar |
|---|---|
| **Sorunlar gerçek:** 50 sitenin %28'inde, KOBİ profilinin ~%47'sinde doğrulanmış sorun var | **Sorunların çoğu küçük:** Satışı tamamen durduran yalnızca 1 vaka (1/50). "Kırık ödeme" bulunmadı |
| Sorunlar hızlı bulunabiliyor ve gösterilebilir kanıtı var (ekran görüntüsü, URL, saat) | Düzeltmeler 5–30 dakikalık; müşteri "bunu ben de yaparım" diyebilir. Fiyat baskısı yüksek |
| Platforma özgü kalıplar var; kontrol listesi ve otomasyonla ölçeklenebilir | Platformlar bu kontrolleri ürüne eklerse pazar daralır |
| Başlangıç maliyeti çok düşük; açık kaynak araçlar yeterli | Gerçek cihaz testi şart; emülatör yanlış alarm üretiyor |
| Mevzuat değişiklikleri (10 gün kuralı, KDV dahil fiyat) ek değer sağlıyor | Hukuki yorum gerektiren bulgular avukat olmadan satılamaz |
| Ajanslar ve platform partnerleri doğal satış kanalı | Bot korumaları ve çerez katmanları bazı siteleri otomatik denetime kapatıyor |
| 2 kişiyle yürütülebilir | Büyük markalarda bulgular çoğunlukla bilinçli tercih (zorunlu üyelik); onlara satış zor |

---

## 13. 30 günlük doğrulama planı

**Durum:** İlk planın 1. adımı ("sorun yaygın mı?") bu çalışmada yapıldı.

**Sonuç:** KOBİ profilindeki, en az sepete kadar test edilen 15 sitenin 7'sinde (%47) doğrulanmış sorun var. Bu, ilk planda konan **%30 eşiğinin üzerinde**. Ancak sorunların çoğu küçük; asıl soru artık **ödeme isteği**.

| Gün | İş | Çıktı | Başarı ölçütü |
|---|---|---|---|
| 1–3 | Kontrol listesini platform bazında (ikas / Ticimax / IdeaSoft / Shopify) 40–60 maddeye çıkarmak; gerçek iOS + Android telefonla doğrulama düzeni kurmak | Kontrol listesi v2 | — |
| 4–10 | 60–80 yeni KOBİ sitesini (öncelik ikas ve IdeaSoft, kendi sitesi + pazaryeri satıcıları) tarayıp doğrulanmış sorunu olanlara 3 bulgulu mini rapor hazırlamak | 30–40 mini rapor | Doğrulanmış sorun oranı ≥ %30 (bu çalışmadaki %47'nin tekrarı) |
| 11–20 | Kişisel e-posta (İYS/ret kontrolüyle), 10 ikas/IdeaSoft partner ajansına beyaz etiket teklifi | Görüşmeler | **≥ 10 görüşme**; ajanslardan ≥ 2 ilgi |
| 21–27 | Ücretli teklif (Paket A: 2.900 TL; yarısına 4.900 TL, fiyat testi) | Teklifler | **≥ 5 ücretli satış** veya **≥ 1 ajans anlaşması** |
| 28–30 | Karar | Devam / değiştir / bırak | Aşağıdaki kurallar |

**Karar kuralları:**
- 40+ kişisel temasa rağmen **5'ten az görüşme** → mesajı değiştirip 2 hafta daha deneyin; yine olmazsa bırakın.
- 30 günde **0–2 ücretli müşteri** → bu iş tek başına yürümez; ajans/platform iş birliği modeline geçin ya da bırakın.
- **≥ 5 ücretli müşteri** veya **1 ajans anlaşması** ve en az 1 abonelik talebi → 60 gün daha yan iş olarak devam.
- 2.900 TL ile 4.900 TL arasında kabul oranı farkı yoksa yüksek fiyatla devam edin.

---

## 14. Son karar: Bu fikre başlanmalı mı?

### Karar

**Tam zamanlı başlanmamalı. Yan iş olarak, 30 günlük bir satış testine geçilebilir.** Saha testi, sorunların var olduğunu ve hızlı bulunabildiğini gösterdi. Ancak sorunların küçük ve kolay düzeltilebilir olması, yüksek fiyatlı bir "hata bulma" işinin önünde ciddi bir engel. Karar artık "sorun var mı" sorusuna değil, "para öderler mi" sorusuna bağlı. Bu soruyu yalnızca satış denemesi cevaplayabilir.

### Net cevaplar

**1. Türkiye'de bu hizmete gerçekten ihtiyaç var mı?**
**Evet, ama ağır değil.** 50 sitenin 14'ünde (%28), KOBİ profilinde ~%47'sinde doğrulanmış sorun var. Ancak bunların çoğu tutarlılık, iletişim ve ayar hatası. Satışı tamamen durduran sorun yalnızca 1 sitede görüldü. Sepete ekleme veya ödeme sayfası kırık olan site yoktu.

**2. Mağaza sahipleri bu sorunları çözmek için para öder mi?**
**Bilinmiyor; bu çalışma ödeme isteğini ölçmedi.** Lehte: sorunlar somut ve gösterilebilir; Pump Butik gibi kritik vakalarda değer çok açık. Aleyhte: düzeltmeler dakikalar sürüyor ve piyasada 200–350 TL'lik analiz raporları var. Fiyat 2.900–4.900 TL bandında test edilmeli.

**3. Manuel hizmet mi, yazılım mı?**
**Manuel hizmet + kendi kullanımınız için otomasyon.** Saha testinde basit tarayıcı betikleri tutarlılık kontrollerinin büyük kısmını otomatikleştirdi. Ancak 11 yanlış alarm, insan doğrulamasının şart olduğunu gösterdi. Yazılım, ancak tekrar eden kontroller netleştikten ve ≥ 20 ödeme yapan müşteri olduktan sonra düşünülmeli. Ayrıca platformların bu kontrolleri kendi panellerine ekleme riski var.

**4. İlk müşteriyi bulmak kolay mı?**
**Görüşme bulmak muhtemelen kolay, satışa çevirmek belirsiz.** Her iki KOBİ sitesinden birinde gösterilecek somut bir bulgu çıkıyor. Bu, ilk e-postayı güçlü kılar. Ancak bulgu küçük olduğunda "teşekkürler, düzelttik" deyip ödeme yapmadan geçme riski yüksek.

**5. Aylık abonelik mantıklı mı?**
**Yalnızca sık kampanya ve değişiklik yapan mağazalar için.** Saha testi, sorunların ayar değiştikçe yeniden doğduğunu gösteriyor (eşikler, uygulamalar, alan adları). Bu, "kampanya öncesi kontrol + haftalık otomatik izleme" aboneliğine gerekçe olabilir. Ancak 1.490–2.990 TL/ay üzerine çıkmak zor görünüyor.

**6. Rakiplerden nasıl ayrışabiliriz?**
Platforma özgü kontrol listesi (IdeaSoft KDV gösterimi, ikas eşik/WhatsApp/stok sayacı, Ticimax tükenen ürün düğmesi), iki kez doğrulanmış ve yanlış alarmı ayıklanmış raporlar, gerçek telefonla test, Türkiye'ye özgü mevzuat kontrolleri ve "sorun bulamazsak iade" garantisi.

**7. 3 kişiyle mi, 2 kişiyle mi?**
**2 kişi.** Biri denetim ve doğrulama, diğeri satış ve ajans ilişkileri. Daha düşük fiyatla baz senaryo ilk 3 ayda 2 kişiyi bile geçindirmiyor.

**8. İlk 3 ayda gerçekçi gelir ne olabilir?**
Varsayıma dayalı: **≈ 15 bin TL (kötümser), ≈ 77 bin TL (baz), ≈ 223 bin TL (iyimser), KDV hariç.** Gerçekçi beklenti **0–80 bin TL** aralığında.

**9. Bu fikir neden başarısız olabilir?**
- **Sorunlar küçük:** Saha testi bunu doğruladı. Ortalama bulgu ciddi bir gelir kaybını kanıtlamıyor.
- Müşteri bulguyu öğrendikten sonra ücretsiz düzeltip geçebilir (bilgi bir kez verilince değeri tükeniyor).
- Platformlar benzer kontrolleri panele ekleyebilir.
- Büyük markalarda bulgular bilinçli tercih (zorunlu üyelik); onlara satış zor.
- Otomatik denetim bot korumalarına ve çerez katmanlarına takılıyor (bu çalışmada 5 site tamamen, 4 site kısmen).
- Yanlış alarm riski: dikkatli doğrulama yapılmazsa güven kaybedilir.

**10. Bu fikir yerine daha iyi bir iş modeli var mı?**
Saha testinin işaret ettiği, **hipotez olarak** daha güçlü görünen yönler:
- **Ajanslara beyaz etiket denetim:** Bulguların platforma özgü olması, ajansların toplu kullanımına uygun. Tek tek KOBİ ikna etmekten daha verimli olabilir.
- **Alan adı / göç sonrası kontrol:** 17 doğrulanmış sorunun 4'ü alan adı ve yönlendirme kaynaklıydı. En kritik vaka (Pump Butik) da bu türdendi. Tetikleyicisi net, bileti daha yüksek olabilecek bir hizmet.
- **Kampanya öncesi tutarlılık kontrolü:** Eşik, kupon ve bant metinleri her kampanyada değişiyor; aciliyet var.
- **Çok kanallı satıcılar için fiyat/stok senkronizasyon denetimi:** Bu çalışmada test edilmedi; pazaryeri satıcısı sayısı çok daha büyük.

Bu dört yön, 30 günlük planda ana teklifle birlikte test edilmeli.

---

## Karar tablosu

| Kriter | Kanıt düzeyi | Değerlendirme | Not |
|---|---|---|---|
| Sorun Türk e-ticaret sitelerinde var mı? | **Güçlü (gözlem)** | ✅ Evet | 50 sitenin %28'inde doğrulanmış sorun |
| Sorun hedef KOBİ sitelerinde yaygın mı? | Orta (15 sitelik alt örneklem) | ✅ Evet | ~%47 |
| Sorunlar satışı ciddi etkiliyor mu? | Orta | ⚠️ Çoğunlukla hayır | 1 kritik vaka; çoğu orta/düşük önem |
| Mağaza sahibi para öder mi? | **Yok** | ❓ Bilinmiyor | Satış testi yapılmadı |
| Pazar büyüklüğü | Orta | ⚠️ Sınırlı | 35 bin+ kendi sitesi olan ETBİS kayıtlı işletme |
| Rekabet | Orta | ⚠️ Orta | Ajanslar, freelancer'lar, ücretsiz araçlar, platformların kendisi |
| Başlangıç maliyeti | Yüksek | ✅ Düşük | ≈ 43–47 bin TL / 3 ay (maaşlar hariç) |
| İlk 3 ay geliri | Varsayım | ⚠️ Zayıf | Baz ≈ 77 bin TL; 2 kişiyi geçindirmez |
| Ölçeklenebilirlik | Gözlem | ⚠️ Orta | Kontrollerin çoğu otomatikleşebiliyor, doğrulama insan istiyor |
| Ayrışma imkânı | Gözlem | ✅ Orta–İyi | Platforma özgü kalıplar net |
| Yasal/itibar riski | Orta | ⚠️ Yönetilebilir | İsimle hata ifşa etmeyin; hukuki görüş vermeyin |
| **Genel karar** | — | **🟡 Şartlı: yan iş olarak 30 günlük satış testi; tam zamanlı başlamayın** | 13. bölümdeki kurallara göre devam/bırak |

---

## Ahmet'e gönderilecek sade özet

> **Konu: E-ticaret sitelerindeki satış kaybettiren hataları bulma işi — 50 site test ettik**
>
> Ahmet merhaba,
>
> **Ne yaptık:** Türkiye'deki 50 e-ticaret sitesini normal bir müşteri gibi telefondan ve bilgisayardan denedik. Ürün seçtik, sepete ekledik, ödeme sayfasına kadar gittik. Ödeme yapmadık, hiçbir yere bilgi girmedik.
>
> **Ne bulduk:**
> - 50 sitenin 14'ünde en az bir gerçek sorun var. Küçük ve orta ölçekli markalarda bu oran yaklaşık yarı yarıya.
> - Örnekler: bir markanın sitesi açılınca altyapı firmasının giriş sayfasına gidiyor (kendi sitesinden satış yapamıyor). Bir sitenin üst bandında "2500 TL üzeri ücretsiz kargo", sepette "1500 TL üzeri" yazıyor. Üç sitede WhatsApp bağlantısı çalışmıyor. Üç site üye olmadan alışverişe izin vermiyor. İki sitede sepette fiyatlar KDV hariç gösteriliyor.
> - **Ama:** Sepete ekleme ya da ödeme sayfası bozuk olan hiçbir site yoktu. Sorunların çoğu panelden 5–30 dakikada düzeltilebilecek küçük ayar hataları.
>
> **Bunun anlamı:** Sorun gerçekten var ve müşteriye göstermesi kolay. Ama tek tek küçük hatalar için mağaza sahibinin ne kadar ödeyeceğini bilmiyoruz. Bu yüzden fiyatı düşük tutmalıyız: denetim için 2.900–4.900 TL, düzenli kontrol için ayda 1.500–3.000 TL.
>
> **Önerim:** İşimizi bırakmadan 30 gün deneyelim:
> 1. 60–80 küçük mağazanın sitesini tarayıp sorun bulduklarımıza kısa ücretsiz rapor gönderelim.
> 2. ikas ve IdeaSoft ile çalışan ajanslara "sizin müşterileriniz için kontrol yapalım" diyelim.
> 3. Ay sonunda en az 5 mağaza para ödemezse ya da bir ajansla anlaşamazsak bu işi bırakalım veya "site taşıma sonrası kontrol", "kampanya öncesi kontrol" gibi daha net bir alana kaydıralım.
>
> **İş bölümü:** Biri test ve rapor, diğeri satış ve ajanslar. Üçüncü kişiye şimdilik gerek yok.
>
> İlk 3 ayda gerçekçi gelir 0 ile 80 bin TL arası; ikimizi geçindirmez. Kararı 30 günün sonunda, kaç kişinin para ödediğine bakarak verelim.

---

## Ek A — İlk erişim denemesi kaydı (engelli ortam)

Raporun ilk sürümünde araştırma ortamının ağ politikası sitelere erişimi engelledi. 1 Ekim 2026 14:14:51–14:15:05 TSİ arasında 50 siteye yapılan birer HTTPS `HEAD` isteğinin tamamı ortamın çıkış proxy'sinde `CONNECT 403` ile reddedildi. İstekler sitelere ulaşmadı. Bu kayıt sitelerin durumu hakkında bilgi vermez; ağ erişimi açıldıktan sonra yapılan saha testi Ek B'dedir.

Engellenen hedefler (sırasıyla): kigili.com, manuatelier.com, lesbenjamins.com, derimod.com.tr, zekitriko.com, qarmacha.com, pumpbutik.com, avva.com.tr, elleshoes.com, desa.com.tr, miniso.com.tr, advbcosmetics.com, limonian.com, dpperfumum.com.tr, bathandbodyworks.com.tr, thebodyshop.tr, gratis.com, flormar.com.tr, kahve.com, spadacoffee.com, a4kahve.com, gloriajeans.com.tr, omergullu.com.tr, taftcoffee.com, vitaminsan.com, medipera.com, konix.com.tr, supplementler.com, proteinocean.com, vatanbilgisayar.com, incehesap.com, itopya.com, istikbal.com.tr, bellona.com.tr, dogtas.com, englishhome.com, schafer.com.tr, karaca.com, kankenhome.com, atasay.com, pirlant.com.tr, ddiamond.com.tr, salomon.com.tr, asics.com.tr, decathlon.com.tr, walkingpadturkiye.com, harleydavidsonshop.com.tr, galenleather.com, hektasbahce.com, eshop.tff.org.

---

## Ek B — Saha testi zaman çizelgesi

Tüm saatler 1 Ekim 2026, TSİ (UTC+3).

| Saat | İş |
|---|---|
| 15:04:10 | Ağ erişimi doğrulandı (pumpbutik.com, kigili.com, gratis.com; yönlendirmeler izlendiğinde son yanıt 200 — pumpbutik.com'un son adresi accounts.ikas.com) |
| 15:04:47–15:05:48 | 50 sitenin ana sayfası `curl` ile alındı, platform izleri çıkarıldı |
| 15:08–15:20 | 50 site + 5 yedek için mobil ve masaüstü ana sayfa taraması (tarayıcı); 5 sitede Cloudflare doğrulaması (25 sn bekleme ile tekrar, 15:18–15:20) |
| 15:12–15:43 | Shopify sitelerinde tam akış (TAFT, Kiğılı, Les Benjamins, Derimod, Manu Atelier, Ömer Güllü, Kanken, Galen, The Body Shop, Pırlant, Reeder) |
| 15:24–15:29 | AVVA tam akış |
| 15:40–15:49 | ikas sitelerinde ürün/sepet/ödeme (Spada, Zeki Triko, Qarmacha, Miniso, Limonian, D&P, A4, Gloria Jean's, Proteinocean, Harley, advb) |
| 15:44–15:46 | Ticimax ürün sayfaları; Qarmacha stok sayacı doğrulaması (15:45:12, 15:46:25, 15:46:32) |
| 15:55–16:01 | Desa mobil sorunlarının dokunma olayıyla yeniden testi → yanlış alarm (Y3) |
| 16:01–16:13 | Ticimax ve ikas tam akışlar (dokunma ile); Limonian ve Qarmacha eşik doğrulamaları |
| 16:07–16:11 | kahve.com tam akış ve KDV gösterimi doğrulaması |
| 16:14–16:18 | Elle Shoes eski ürün fiyatları ve zorunlu üyelik doğrulaması (mobil + masaüstü) |
| 16:30–16:38 | Yedek sitelerden Troyestore (2 oturum), Gaming.gen.tr, BigJoy; TFF tam akış |
| 16:38–16:46 | Eski alan adı doğrulamaları (asicstr.com, thebodyshop.com.tr, Qarmacha eski URL, TFF alt alan adı, Salomon alan adları) |
| 16:42–16:46 | Atasay taksit tablosu (3 ürün), Harley, Gratis (2 deneme), advb tam akış |
| 16:46–16:48 | 5 yedek sitenin ana sayfa taraması; BigJoy WhatsApp doğrulaması |

Ekran görüntüleri ve ham test kayıtları araştırma ortamının geçici çalışma klasöründe tutuldu; projeye eklenmedi.

---

## Kaynaklar

Masa başı kaynaklara 1 Ekim 2026, 14:05–14:30 TSİ arasında web araması üzerinden ulaşıldı. Saha testi bulgularının kaynağı, tabloda bağlantısı verilen sitelerin kendisidir (15:04–16:50 TSİ).

**Resmi veriler ve mevzuat**
- [Ticaret Bakanlığı — Türkiye'de E-Ticaretin Görünümü Raporu Yayınlandı (12.05.2026)](https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-12-05-2026)
- [Ticaret Bakanlığı — Türkiye'de E-Ticaretin Görünümü Raporu Yayınlandı (06.05.2025)](https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-06-05-2025)
- [Türkiye'de E-Ticaretin Görünümü Raporu 2025 (PDF)](https://ticaret.gov.tr/data/6a02f2c7269de183c0b98bc4/T%C3%BCrkiye'de%20E-Ticaretin%20G%C3%B6r%C3%BCn%C3%BCm%C3%BC%20Raporu%202025.pdf)
- [ETBİS — Türkiye'de E-Ticaretin Görünümü 2025 Raporu Yayımlandı](https://etbis.ticaret.gov.tr/tr/Post/postturkiyede-e-ticaretin-gorunumu-2025-raporu-yayimlandi-3)
- [Webrazzi — Türkiye'nin e-ticaret hacmi 2024'te 3 trilyon TL oldu](https://webrazzi.com/2025/05/06/turkiye-nin-e-ticaret-hacmi-2024-te-3-trilyon-tl-oldu/)
- [Ticaret Bakanlığı — Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği değişiklikleri](https://ticaret.gov.tr/haberler/ticaret-bakanligi-tarafindan-ticari-reklam-ve-haksiz-ticari-uygulamalar-yonetmeliginde-yapilan-degisikliklerle-tuketicilerin-aldatici-reklam-ve-ticari-uygulamalara-karsi-korunmasi-guclendiriliyor)
- [Erdem & Erdem — Ticari Reklam Yönetmeliği değişiklikleri](https://www.erdem-erdem.av.tr/bilgi-bankasi/ticari-reklam-ve-haksiz-ticari-uygulamalar-yonetmeliginde-kapsamli-degisiklikler-yapildi)
- [TGRT Haber — İndirim reklamlarında "son 10 gün" kuralı](https://www.tgrthaber.com/ekonomi/ticaret-bakanligindan-indirim-reklamlarina-siki-denetim-son-10-gunun-en-dusuk-fiyati-3357012)
- [Tüketici.org.tr — Mesafeli Sözleşmeler Yönetmeliği](https://www.tuketici.org.tr/tr/h/tuketicinin-korunmasi/mesafeli-sozlesmeler-yonetmeligi/)
- [Ticaret Bakanlığı TKPGM — 2026 idari para cezaları](https://tuketici.ticaret.gov.tr/haberler/6502-sayili-tuketicinin-korunmasi-hakkinda-kanun-kapsaminda-uygulanan-idari-para-cezalari-1-ocak-2026-tarihinden-itibaren-25-49-oraninda-arttirildi)
- [Aksan Hukuk — 2026 tüketici hukukunda parasal sınırlar ve cezalar](https://aksan.av.tr/blog/2026-yili-tuketici-hukukunda-yeni-donem-parasal-sinirlar-ve-idari-para-cezalari-guncellendi)
- [Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik](https://www.mevzuat.gov.tr/File/GeneratePdf?mevzuatNo=20914&mevzuatTur=KurumVeKurulusYonetmeligi&mevzuatTertip=5)
- [Tacir veya esnafa ticari ileti gönderiminde onay şartı (İYS SSS)](https://iys.doruk.net.tr/faq-items/tacir-veya-esnafa-ticari-elektronik-ileti-gonderilirken-onay-sarti-var-midir/)

**Sepet terki ve iletişim**
- [Baymard — Cart Abandonment Rate Statistics](https://baymard.com/lists/cart-abandonment-rate)
- [Baymard — Reasons for Cart Abandonment](https://baymard.com/blog/ecommerce-checkout-usability-report-and-benchmark)
- [WhatsApp SSS — Click to Chat (wa.me biçimi: uluslararası numara, 0/parantez/tire yok)](https://faq.whatsapp.com/5913398998672934)
- [iyzico — Sepet terk ve nedenleri](https://www.iyzico.com/blog/sepet-terk-ve-nedenleri-hakkinda-her-sey)

**Şikâyet kategorileri (tüketici beyanı; ilk sürümde kullanıldı)**
- [Şikâyetvar — Hepsiburada indirim kodu çalışmıyor](https://www.sikayetvar.com/hepsiburada/indirim/kod)
- [Şikâyetvar — Duvarkagidisec.com ücretsiz kargo şikâyeti](https://www.sikayetvar.com/duvarkagidiseccom/duvarkagidiseccomdan-ucretsiz-kargo-deyip-kapida-ucret-almasi)
- [Şikâyetvar — İpekyol stokta görünen ürün iptali](https://www.sikayetvar.com/ipekyol/stokta-gorunen-urun-aniden-iptal-edildi-bilgilendirme-yok)
- [Şikâyetvar — IKEA ödeme hatası](https://www.sikayetvar.com/ikea/ikea-online-alisveriste-odeme-hatasi-nedeniyle-siparis-tamamlanamiyor)

**Platformlar ve mağaza sayıları**
- [ikas — E-ticaret paketleri ve fiyatları](https://ikas.com/tr/e-ticaret-paketleri)
- [ikas — Referanslar](https://ikas.com/tr/referanslar)
- [ikas — Müşteri ayarları (misafir alışveriş)](https://support.ikas.com/tr/musteri-ayarlari)
- [Ticimax — E-ticaret paketleri fiyatları 2026](https://www.ticimax.com/e-ticaret-paketleri/)
- [Ticimax — Referanslarımız](https://www.ticimax.com/referanslarimiz/)
- [Ticimax Destek — Genel ayarlar (üyeliksiz alışveriş)](https://www.destekalani.com/Icerik/genel-ayarlar-734)
- [IdeaSoft — Referanslar](https://www.ideasoft.com.tr/referanslar/)
- [Shopify TR — En iyi Shopify mağazaları](https://www.shopify.com/tr/blog/shopify-magazalari)
- [Store Leads — Shopify Stores in Turkey](https://storeleads.app/reports/shopify/TR/top-stores)
- [Store Leads — WooCommerce Stores in Turkey](https://storeleads.app/reports/woocommerce/TR/most-recent-stores)

**Rakipler ve fiyatlar**
- [Baymard — UX araştırma ürünleri ve hizmetleri](https://baymard.com/products)
- [Noibu — Platform](https://www.noibu.com/platform)
- [GetApp — Ghost Inspector fiyatları](https://www.getapp.com/it-management-software/a/ghost-inspector/)
- [Shopify App Store — MyStoreGuardian](https://apps.shopify.com/mystoreguardian)
- [Shopify App Store — Uptime](https://apps.shopify.com/uptime)
- [Fiverr — Shopify CRO audit örneği](https://www.fiverr.com/davidaitken518/help-you-increase-your-conversion-rates-25-your-expert-usa)
- [CRO.media — Shopify CRO Audit](https://cro.media/shopify-cro-audit/)
- [Clutch — Testinium](https://clutch.co/profile/testinium)
- [Bionluk — SEO analiz raporu örneği](https://bionluk.com/muratyildizhan/siteniz-icin-detayli-bir-SEO-Analiz-Raporu-olusturabilirim-128777)
- [Adapte Dijital — Web danışmanlığı ücretleri 2026](https://adaptedijital.com/danismanlik/web-danismanligi/web-danismanligi-ucretleri/)
- [Microsoft Clarity incelemesi](https://www.solidgrowth.com/tool/microsoft-clarity)

**Maliyet verileri**
- [Kolay İK — 2026 asgari ücret](https://kolayik.com/blog/2026-asgari-ucret-net-hesabi-ve-kesintiler)
- [Danış Özcan — 2026 Bağ-Kur primi](https://danisozcan.com/guncel-bagkur-primi/)
- [İşbaşı — Şahıs şirketi kurma maliyeti](https://isbasi.com/blog/sahis-sirketi-kurma-maliyeti)
- [Kobitime — Aylık muhasebeci ücretleri 2026](https://kobitime.com/aylik-muhasebeci-ucretleri-2026/)
