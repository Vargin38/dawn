# Kalite kontrol: Kett Google Ads RSA + Meta reklam paketi

Denetleyen: kalite-kontrol · Tarih: 2026-10-04
Denetlenen dosyalar:
- `marketing/cikti/reklamlar/2026-10-04-google-kett.md`
- `marketing/cikti/reklamlar/2026-10-04-meta-kett.md`

Kaynaklar: `marketing/context/*.md`, `templates/page.kett.json`, `docs/team/copy.md`, `templates/index.json`, `sections/dg-ust-bar.liquid`, `snippets/dg-urun-cta.liquid`, `snippets/dg-collection-description.liquid`, Shopify Admin API (yalnızca okuma sorguları; mutation yok).

## Güncel karar (2. tur): **ONAY**

reklam-uzmani 1. turdaki bulguları düzeltti; değişiklikler yeniden denetlendi (2026-10-04).

| # | 1. tur bulgusu | 2. tur durumu |
| :- | :- | :- |
| 1 | Başlık #6'daki yıl, distribütör başlığı veya callout'uyla birlikte "1984'ten beri Kett distribütörü" diye okunabiliyordu | **Kapandı.** Başlık #6 artık "Değirmen A.Ş. · İstanbul" (24/30). "Kett Türkiye Distribütörü" callout'u kaldırıldı. Meta B'deki "1984'ten beri…" cümlesi çıkarıldı. Grep sonucu: iki dosyadaki reklam metinlerinin hiçbirinde "1984" yok, yalnızca açıklama notlarında geçiyor. |
| 2 | `dg-urun-cta` içindeki "kurulum" ifadesi (site) | **Açık.** Reklam metniyle ilgili değil; sahibi sayfa-gelistirici, kullanıcı onayı gerekli. Kampanyadan önce düzeltilmesi önerilir. |
| 3 | Callout ile başlık/site bağlantısı arasında tekrar | **Kapandı.** Yeni callout'lar: "Kendi Atölyemizde Onarım" (24), "Fiyatlar KDV Dahil" (18), "Kartla Ödeme Seçeneği" (21), "Kayıtsız Katalog İndirme" (24). Servis site bağlantısının 1. satırı "Model ve seri no iletmeniz yeterli" (34/35) oldu; kaynağı `page.kett.json` hizmet metni. Kartla ödeme bilgisinin kaynağı `marka-sesi.md` / `markalar-ve-urunler.md`. |
| 4 | Fiyat başlığında model kodu ile fiyat bitişikti | **Kapandı.** Başlık artık "PM-450: 44.798,02 TL KDV Dahil" (30/30). Shopify'da yeniden kontrol edildi: fiyat 44798.02, stok 2, satışta. |
| 5 | "Tüm Kett Cihazları" site bağlantısı satırı TP-3000'i kapsamıyordu | **Kapandı.** Satır artık "Nem, beyazlık ve numune cihazları" (33/35). |
| 6 | Meta tam metin uzunluğu | Bilgi. B'nin tam metni 206 karakter (paragraf arası boşluk dahil 207); ana mesaj 119/125. Uzmanın sayımı doğru. |

2. tur yeniden sayımı: Google metinlerinin tamamı dosyadan yeniden çıkarılıp `karakter_say.py` ile sayıldı. 15 başlık, 4 açıklama, 4 site bağlantısı, 8 satır ve 4 callout'un hepsi OK, AŞIYOR yok. Meta başlık ve açıklamalar değişmedi; hepsi OK. Yeni başlık eşleşmeleri ("Kett Türkiye Distribütörü | Değirmen A.Ş. · İstanbul") teyitsiz bir izlenim yaratmıyor. Yeni metinlerde politika riski (büyük harf, ünlem, tekrar) yok. Eklenen "Yayın öncesi kontrol" notları (PM-450 stok ve fiyat) yeterli.

Kalan koşullar: bulgu #2'nin site düzeltmesi önerilir; yayın günü PM-450 fiyatı ve stoğu yeniden kontrol edilmeli. Aşağıdaki "Kalan riskler" bölümü geçerliliğini koruyor.

---

## 1. tur kararı: RED (tarihçe)

Gerekçe: Tek engelleyici bulgu var (#1). Google RSA'da "Kett Türkiye Distribütörü" (başlık #5, ayrıca callout) ile "Değirmen A.Ş. · 1984'ten Beri" (başlık #6) birlikte gösterilebiliyor. Bu ikili, "1984'ten beri Kett distribütörü" diye okunabiliyor. Distribütörlüğün başlangıç yılı `markalar-ve-urunler.md` dosyasında "Teyit bekleyenler" listesinde. Düzeltme küçük: yalnızca başlık #6 değişecek. Diğer tüm metinler sınır, kaynak ve politika açısından geçti. #1 düzeltilince yeniden kontrol edilip onaylanabilir. Meta paketi tek başına ONAY seviyesinde.

## Bulgu tablosu

| # | Bulgu | Önem | Dosya:satır | Öneri |
| :- | :- | :- | :- | :- |
| 1 | Başlık #6 "Değirmen A.Ş. · 1984'ten Beri", #5 "Kett Türkiye Distribütörü" ve #7 "Kett Cihazı Distribütörden" ile yan yana çıkabiliyor. Örnek: "Kett Türkiye Distribütörü \| Değirmen A.Ş. · 1984'ten Beri". Bu ikili, teyitsiz "1984'ten beri Kett distribütörü" izlenimini veriyor. Callout "Kett Türkiye Distribütörü" (satır 75) başlıktan bağımsız gösterildiği için #6 hangi başlıkla eşleşirse eşleşsin aynı yan yana okuma oluşabiliyor. Bu yüzden sabitleme sorunu tek başına çözmez. Sitedeki üst bar da aynı ikiliyi kullanıyor ("Kett ve HAWO Türkiye distribütörü · 1984'ten bu yana"), ama o da teyitsiz. Reklamda tekrarlanmamalı. | Orta (engelleyici) | google-kett.md:31 (ilgili: :30, :32, :43, :75) | Önerilen yol, **başlığı değiştirmek**: #6'dan yılı çıkarın. Örnekler (sayıldı): "Değirmen A.Ş. · İstanbul" (24), "Değirmen A.Ş. İstanbul Firması" (30). Yıl mutlaka kalacaksa 30 karakterde şirket faaliyetine açıkça bağlamak zor; bu yüzden yılsız seçenekler önerilir. Sabitleme yalnızca yedek yol olur: #5, #6 ve #7'yi aynı pozisyona sabitlemek bunların aynı anda görünmesini engeller, ama callout eşleşmesini engellemez ve Ad Strength düşer. Mağaza sahibi distribütörlük yılını teyit ederse bu bulgu kapanır. |
| 2 | Reklamlar kurulum vaat etmiyor, ancak hedef sayfadan bir tık sonraki Kett ürün sayfaları (`product.json` → `dg-urun-cta`) "Kett Türkiye distribütöründen; **kurulum**, servis ve yedek parça desteğiyle." yazıyor. Kett için kurulum verilmiyor (teyitli). Reklam trafiği bu yanlış ifadeyi gösteren sayfalara gidecek. Bu, reklam metni hatası değil; bilinen bir site tutarsızlığı. | Orta (reklam engelleyicisi değil) | snippets/dg-urun-cta.liquid:43 (bkz. markalar-ve-urunler.md "Bilinen tutarsızlıklar") | Kampanya yayına girmeden önce snippet'in Kett için düzeltilmesi önerilir (sahibi sayfa-gelistirici; mevcut `dg-*` dosyası olduğu için kullanıcı onayı gerekir). Ana sayfadaki "cihaz seçiyor, kuruyor" ifadesi (`templates/index.json:54`) de aynı türden. `kalite-kontrol-ve-laboratuvar-cihazlari` koleksiyonunun yedek açıklamasındaki "kurulum" ifadesi görünmüyor, çünkü Shopify'da koleksiyon açıklaması dolu. |
| 3 | Callout "Servis ve Yedek Parça" ile site bağlantısı metni "Servis ve Yedek Parça" aynı. Başlık #15 de çok benzer ("Kett Servis ve Yedek Parça"). Benzer şekilde callout "Kett Türkiye Distribütörü" ile başlık #5 aynı. Politika ihlali değil, ama yer israfı. Tekrarlayan öğeler Google'da daha az gösterilebilir. | Düşük | google-kett.md:77, :64, :40; :75, :30 | Callout'ları başka bilgiyle çeşitlendirin, örneğin "Kendi Atölyemizde Onarım" (24) veya "Kartla Ödeme" (12). |
| 4 | Başlık #10 "PM-450 44.798,02 TL KDV Dahil" içinde model kodu ile fiyat bitişik. "PM-450 44.798,02" hızlı okunurken karışabiliyor. Fiyat Shopify ile **birebir aynı** (44798.02 TRY, `taxesIncluded: true`, compareAtPrice yok, stok 2, satışta). | Düşük | google-kett.md:35 | İsteğe bağlı: "PM-450: 44.798,02 TL KDV Dahil" (30/30). Yayın günü fiyatı yeniden kontrol edin; Meta C'deki fiyat da aynı. |
| 5 | Site bağlantısı "Tüm Kett Cihazları" satır 1'de "Nem ve beyazlık ölçen cihazlar" yazıyor. Hedef koleksiyondaki TP-3000 ise bir parlatma (numune hazırlama) cihazı. Aynı ifade `page.kett.json` "tum" bloğunda da geçiyor, yani kaynakla uyumlu ve küçük bir genelleme. | Düşük | google-kett.md:65 | İsteğe bağlı: "Nem, beyazlık ve numune cihazları" (33). |
| 6 | Meta birincil metinlerin tamamı 125 karakterden uzun (A 237, B 255, C 280). Bu, uzmanın kendi notuyla uyumlu ve Meta'da yalnızca öneri. Ana mesaj her varyasyonda ilk cümlede ve 125 karakterin altında. Varyasyon C'nin görsel üstü metni "Fiyatlıysa sepete, değilse teklif" 4 kelime; dosyadaki "≤6 kelime" notuyla uyumlu. | Bilgi | meta-kett.md:24–26, :39–41, :55–57 | Değişiklik gerekmez. Reklam Yöneticisi önizlemesinde "Devamını gör" kesimini kontrol edin. |

## Yeniden sayım özeti (`python3 marketing/araclar/karakter_say.py`, kalite-kontrol tarafından)

Metinler dosyalardan doğrudan çıkarıldı (tablo hücreleri awk/sed ile), elle yeniden yazılmadı.

| Tür | Adet | Sonuç | Uzmanın sayımıyla fark |
| :- | :- | :- | :- |
| Başlık (≤30) | 15 | Hepsi OK; en uzunlar 30/30 (#2, #3, #4, #11) | Yok |
| Açıklama (≤90) | 4 | 89, 88, 84, 86 → OK | Yok |
| Görünen yol (≤15) | 2 | 4, 9 → OK | Yok |
| Site bağlantısı metni (≤25) | 4 | 18, 17, 21, 18 → OK | Yok |
| Site bağlantısı satırı (≤35) | 8 | 24–34 → OK | Yok |
| Callout (≤25) | 4 | 25, 18, 21, 24 → OK | Yok |
| Meta ana mesaj / ilk cümle (~125) | 3 | 99, 119, 116 → OK | Yok |
| Meta birincil metnin tamamı | 3 | 237, 255, 280 (paragraf arası boşlukla) → öneriyi aşıyor (bilinçli, bkz. #6) | Uzmanın 240/258/283 sayısı "A: " önekini içeriyor; önek çıkınca aynı |
| Meta başlık (~40) | 3 | 36, 40, 29 → OK | Yok |
| Meta açıklama (~30) | 3 | 23, 29, 26 → OK | Yok |

Google'ın zorunlu sınırlarını aşan metin yok.

## Kaynak ve iddia kontrolü

| Kontrol | Sonuç |
| :- | :- |
| Kurulum / eğitim | İki dosyada da reklam metninde yok (yalnızca "kullanılmadı" notlarında geçiyor). ✔ |
| Garanti / kalibrasyon | Reklam metninde yok. ✔ |
| "En iyi", "lider", "en ucuz" vb. | Yok. ✔ |
| PM-450 fiyatı | Shopify: 44.798,02 TRY, tek varyant, `taxesIncluded: true` → "KDV dahil" doğru. ✔ PM-650 (120.038,11) ve HX-500 (126.551,81) fiyatlı; C-600, C-130 ve TP-3000 fiyatsız (0,00). "Karma satış modeli" ifadesi doğru. |
| Hedef URL `https://magaza.degirmen.tr/pages/kett` | Birincil alan adı `magaza.degirmen.tr`. Sayfa `kett` yayında, `templateSuffix: kett`. ✔ |
| Site bağlantısı URL'leri | `collections/tahil-rutubet-olcme-cihazlari` (2 ürün: PM-450, PM-650; ikisi de fiyatlı), `collections/beyazlik-olcerler` (2 ürün: C-130, C-600; ikisi de fiyatsız), `collections/kalite-kontrol-ve-laboratuvar-cihazlari` (6 ürün, hepsi Kett), `pages/servis-ve-yedek-parca` (yayında). Hepsi mevcut, satır açıklamaları içerikle uyumlu. ✔ |
| "Buğday, arpa, mısır" / "tohum" / "alım ve depolama" / "silo, değirmen" | `page.kett.json` (uygulamalar) ve PM-450 kalibrasyon listesi (buğday, arpa, mısır). ✔ |
| "PM-650: Nem ve Hacim Ağırlığı" | Ürün adı ve açıklaması. ✔ |
| "Kataloğu kayıt olmadan indirin" | 6 Kett ürününün hepsinin açıklamasında `urun-katalog` PDF'i var; `dg-marka-katalog` bunları listeliyor. ✔ |
| "Genellikle 24 saat içinde", "model seçimi, teklif, servis ve yedek parça için tek muhatabınız biziz", "kendi atölyemizde onarım", "parçalar için stok tutuyoruz", "Kett yedek parçaları mevcut" | `marka-sesi.md`, `page.kett.json`, `copy.md`, `markalar-ve-urunler.md` (teyitli). ✔ |
| Meta B: "1984'ten beri İstanbul'da faaliyet gösteriyoruz" | Ayrı bir cümlede, açıkça şirket faaliyetine bağlanmış. `page.kett.json:117` ile aynı yaklaşımı kullanıyor. Başlık "Kett Türkiye distribütörü: Değirmen A.Ş." yıl içermiyor. Kabul edilebilir. ✔ |

## Google Ads politika kontrolü

- Aşırı büyük harf: yok. Başlıklar Başlık Düzeninde; tamamı büyük harf olan kelimeler yalnızca model kodu ve kısaltma (PM, KDV, TL, A.Ş.). ✔
- Ünlem: yok (Google başlıkta ünlemi zaten kabul etmez). ✔
- Gereksiz tekrar ve noktalama: "·" orta nokta yalnızca bir kez, ayırıcı olarak kullanılmış. Sembol tekrarı yok. ✔ İçerik tekrarı için bkz. bulgu #3 (politika ihlali değil).
- Fiyat beyanı: fiyat hedef sayfadaki ürün ızgarasında görünüyor (`dg-urunler` → `card-product`) ve PM-450 ürün sayfasıyla aynı. ✔
- Görünen yol: alan adıyla uyumlu, yanıltıcı değil. ✔
- Marka adı "Kett": reklamveren yetkili distribütör. Google'da ticari marka kullanımına itiraz edilirse ticari marka yetkilendirmesi gerekebilir (aşağıya bakın).

## Kalan riskler ve teyit gerekenler

1. **Kett distribütörlüğünün başlangıç yılı**: teyit edilirse bulgu #1 kapanır. Sitedeki üst bar ("Kett ve HAWO Türkiye distribütörü · 1984'ten bu yana") da aynı belirsizliği taşıyor; mağaza sahibine sorulmalı.
2. **Ürün sayfalarındaki "kurulum" ifadesi** (bulgu #2): reklam trafiği bu sayfalara ulaşacak. Kampanyadan önce düzeltilmesi önerilir.
3. **PM-450 fiyatı**: yayın günü ve kampanya boyunca kontrol edilmeli. Fiyat değişirse başlık #10 ve Meta C metni güncellenmeli ya da duraklatılmalı. Stok şu an 2 ve `inventoryPolicy: DENY`, yani stok biterse ürün sepete eklenemez. Bu durumda "Fiyatlı Modeller Sepette" başlığı ve fiyat başlığı yanıltıcı olur.
4. **Ticari marka**: "Kett" başlıklarda geçiyor. Kett veya başka bir hesap Google'da ticari marka kısıtlaması koyarsa reklamlar onaylanmayabilir. Gerekirse Kett'ten yetki belgesi alınmalı.
5. **Meta CTA**: "Teklif Al" seçeneğinin kampanya amacında bulunup bulunmadığı Reklam Yöneticisi'nde kontrol edilmeli (uzmanın notuyla aynı).
6. **Meta Varyasyon B görseli**: gerçek atölye fotoğrafı yoksa ürün fotoğrafı kullanılmalı (uzmanın notuyla aynı).
