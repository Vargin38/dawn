# Tedarikçi Fiyat Listesi Fark ve Marj Aracı — Türkiye Değerlendirmesi

**Değerlendirilen fikir:** Tedarikçiden gelen Excel/CSV fiyat listesini işletmenin kendi ürün ve satış fiyatı dosyasıyla barkod veya ürün koduyla eşleştiren bir araç. Araç fiyatı değişen, yeni eklenen ve listeden çıkan ürünleri, hedef brüt marjın altına düşenleri ve eşleşmeyen satırları gösterir; onaydan sonra içe aktarılabilir bir dosya üretir.

**Araştırma zamanı:** 4 Ekim 2026, 01:51–02:15 TSİ.
**Kanıtlar:** [`evidence/fiyat_listesi_araci/`](evidence/fiyat_listesi_araci/README.md)

**Kapsam:**
- Önceki raporlardaki rakamlar devralınmadı; kullanılan her rakam bu çalışmada yeniden arandı.
- Hiçbir işletmeyle iletişime geçilmedi, hesap açılmadı, satın alma yapılmadı.
- Mevcut proje dosyalarına dokunulmadı.

---

## 0. Net karar (300 kelimeden kısa)

**Karar: Ele.** Bağımsız, tek kişilik bir iş olarak zaman ve para ayırmaya değmez.

**1. Türkiye'de denenmeye değer mi?**
Hayır. Sorun gerçek ama küçük ve büyük ölçüde çözülmüş durumda.
- Yurt dışında aynı ürünü yapan en az 14 bağımsız geliştirici, Haziran–Ekim 2026'da Shopify forumunda müşteri arıyor. Müşteri aradıkları beş başlığa hiçbir mağaza sahibi yanıt vermemiş.
- Ücretsiz araçlar zaten var.
- Türkiye'de bu iş için ayrı bir yazılıma veya aboneliğe para ödendiğine dair internette kanıt bulamadım.

**2. Kim satın alır, hangi sorunu için?**
En olası alıcı: 10'dan fazla tedarikçiden XML yerine Excel liste alan, kendi sitesi olan çok markalı online perakendeci (örneğin pet ürünleri).
- Sorunu: zamlı listeyi ürünlerle eşleştirmek, marjı düşenleri bulmak, içe aktarım dosyası hazırlamak.
- Satıcıların kendi anlatımıyla bu iş liste başına yaklaşık bir saat sürüyor.

**3. Neden mevcut alternatiften geçsin?**
Tek somut fark şu: liste geldiği anda, alım yapmadan önce marj etkisini Türkiye'ye özgü ayrıntılarla (KDV, iskonto, döviz, koli) göstermek ve platformun içe aktarım dosyasını hazır vermek.
- Ancak işin çoğunu zaten şunlar yapıyor: Excel'in ÇAPRAZARA'sı, Claude/ChatGPT, XML entegratörleri (örneğin JetStok, aylık 3.742 TL) ve ERP'lerin fiyat güncelleme özellikleri.
- Bunları bırakıp bize geçmek için güçlü bir neden göremedim.

**4. Tek kişi için en büyük engel ne?**
- Değerin yüksek olduğu yerde veri dağınık: PDF, barkodsuz, karışık para birimi. Bu da sizin istemediğiniz elle düzeltme işini gerektiriyor.
- Verinin temiz olduğu yerde ise değer düşük ve ücretsiz alternatif çok.
- Üstüne müşteri bulmak zor: başka geliştiricilerin müşteri arayan ilanları yanıtsız kalıyor.

**5. İlk somut adım ne?**
Kod yazmayın. Kararı yine de yeniden açmak isterseniz tek bir test yapın: 14 günde aday mağazalarla görüşüp 1.500 TL'lik ücretli pilot satmayı deneyin. En az 3 ödeme gelmezse kalıcı olarak bırakın.

---

## 1. Yöntem, kanıt etiketleri ve kısıtlar

### 1.1 Erişim

| Araç | Durum |
|---|---|
| Web araması | Çalıştı. Arama motoru ABD konumlu; Türkçe sorgular sonuç verdi. |
| Sayfa okuma ve dosya indirme | Çalıştı. PDF ve Excel dosyaları indirilip metne çevrildi. |
| Engellenenler (tekrar denenmedi) | excel.web.tr (403), kariyer.net ilan sayfası (403), auristoptan.com (403), petibom.com (522). web.archive.org'a erişilemedi; bu yüzden aynı listenin önceki ayıyla gerçek bir fiyat farkı ölçülemedi. |

### 1.2 Kanıt etiketleri

| Etiket | Anlamı |
|---|---|
| **[Doğrulandı]** | Sayfa veya dosya açılıp okundu; resmî belge, şirketin fiyat sayfası ya da dosyanın kendisi. |
| **[Şirket iddiası]** | Şirketin kendi tanıtım metni. Var olması, müşterisi olduğunu veya kâr ettiğini kanıtlamaz. |
| **[Kullanıcı yorumu]** | Forum gönderisi, mağaza yorumu, iş ilanı gibi üçüncü kişi ifadesi. |
| **[Arama özeti]** | Sayfa açılmadı; yalnızca arama aracının özeti. |
| **[Çıkarım]** / **[Varsayım]** | Benim yorumum veya test edilmesi gereken varsayım. |

### 1.3 Kısıtlar

- **Ödeme isteği internetten doğrulanamadı.** Bunu ancak görüşme ve ön ödeme gösterir.
- Türkiye'de kaç işletmenin tedarikçiden Excel liste aldığına dair bir veri bulunamadı. Pazar büyüklüğü tahmini yapmadım.
- Kurlar: TCMB, 2 Ekim 2026 döviz satış kuru — USD 49,0582; EUR 55,1819 [Doğrulandı].

---

## 2. Türkiye'de gerçek ihtiyaç var mı?

### 2.1 Kanıt envanteri

| Kaynak | Tarih | Tür | Neyi destekliyor | Neyi desteklemiyor |
|---|---|---|---|---|
| [excelcozum.com sorusu](https://excelcozum.com/konu/iki-farkli-tabloyu-karsilastirip-eslesmeyen-kodlara-urun-bulunamadi-yazdirma.10056/) | 29.08.2026 | [Kullanıcı yorumu] | Bir mağaza çalışanı, tedarikçi fiyat listesindeki kodları kendi tablosuyla eşleştirmeye çalışıyor; listede "W-999" gibi hatalı veya eski kodlar var. | Sorun ücretsiz bir formülle (ÇAPRAZARA) aynı gün çözülmüş. Ödeme isteği göstermiyor. |
| [r10.net talebi](https://www.r10.net/ofis-uygulama/2608920-satis-ve-alis-fiyat-listesi-excel.html) | 15.12.2020 | [Kullanıcı yorumu] | Demir-çelik bayisi: 4'ten fazla tedarikçi listesi, iskontolar her gün değişiyor; serbest çalışan bir Excel uzmanı tutmuş. | Eski bir kayıt. Tek seferlik Excel işine ödeme yapılmış; abonelik değil. |
| 3Dcim "E-Ticaret Operasyon Uzmanı" ilanı | 17.06.2026 | [Arama özeti] (sayfa 403 verdi) | Görev tanımında "kampanya ve fiyat güncellemelerini sisteme tanımlamak" var. | Fiyat güncelleme, birçok görevden yalnızca biri. İşletme bu işi bir çalışana yaptırıyor. |
| [Akınsoft bilgi bankası](https://bilgibankasi.akinsoft.net/tr/home/makale/1276-akinsoft-wolvox-erp-programimizda-alis-ve-satis-fiyatlarini-otomatik-olusturma-islemi) (güncelleme 03.09.2026) | 2026 | [Doğrulandı] | Yerli ERP'de alış faturası kaydedilince "Satış fiyatları yeniden oluşturulsun mu?" sorusu ve kâr marjıyla fiyat oluşturma var. İhtiyaç tanınmış bir ihtiyaç. | Bu ihtiyaç ERP içinde zaten karşılanıyor. |
| Pet ve kozmetik toptancıları ([Pelagos](https://bayi.pelagos.com.tr/fiyat-listeleri), [Patiya](https://patiyapetshop.com/), [ToptanTR](https://www.toptantr.com/kozmetik-ve-kisisel-bakim)) | 2026 | [Doğrulandı] | Fiyat listeleri bayi girişinin arkasında, WhatsApp üzerinden ya da B2B pazaryerinde paylaşılıyor. | **Bir firmanın fiyat listesi paylaşması, alıcının bizim yazılımımıza ihtiyaç duyduğunu göstermez.** |
| Kamuya açık örnek listeler (bkz. 2.2) | 2025–2026 | [Doğrulandı] | Listelerin biçimini ve dağınıklığını gösteriyor. | Bu listeleri alan işletmenin bunun için ödeme yapacağını göstermez. |

**Sonuç:** Türkiye'de ihtiyacın varlığına dair kanıt **zayıf ama sıfır değil**. Kodları eşleştirme ve fiyatları güncelleme işi var. Ama bulduğum her örnekte iş ya ücretsiz bir formülle, ya mevcut ERP ile ya da bir çalışanla çözülmüş. Toplu fiyat güncelleme ERP eklentisi olarak satılıyor (Fiyat Matik, ExcelTrans), ama kaç işletmenin aldığı bilinmiyor. Ayrı bir fark ve marj aracına ödeme yapıldığına dair kanıt bulamadım.

### 2.2 Fiyat listeleri hangi formatta ve ne sıklıkla geliyor? (Gerçek dosyalarla ölçüldü)

Ayrıntılar: [`analiz/ornek_fiyat_listeleri.md`](evidence/fiyat_listesi_araci/analiz/ornek_fiyat_listeleri.md)

| Örnek | Format | Barkod | Para birimi | Sıklık işareti | Bizim ilk sürüme uygun mu? |
|---|---|---|---|---|---|
| Standart Civata, Hırdavat Fiyat Listesi, Ekim 2026 | PDF (Illustrator ile tasarlanmış broşür), 13 sayfa | **Yok** (yalnızca 9 haneli SAP kodu) | USD, TL, **TRY** ve EUR aynı listede | Aynı adres aramada "Eylül 2026" başlığıyla görünüyordu, bugün "Ekim 2026" → büyük olasılıkla aylık [Çıkarım] | **Hayır.** PDF ve barkodsuz. Basit bir kuralla satırların %84'ü (183/219) okunabildi; geri kalanı elle düzeltme ister. |
| Dekor, Ürün ve Barkod Listesi, 30.01.2026 | Excel'den PDF'e çevrilmiş, 7 sayfa | Ürün barkodu ve koli barkodu var | Belirtilmemiş; KDV dahil mi hariç mi belirtilmemiş | Yılda bir veya birkaç kez [Çıkarım] | **Kısmen.** Excel aslı istenirse uygun. KDV durumu sorulmalı. |
| Schneider Electric listesi (.xlsx, bir bayi sitesinde) | Excel, 3.222 satır | **Yok** (üretici referans kodu) | EUR | "23 Temmuz 2025 tarihinden itibaren geçerlidir" | **Kısmen.** Ürün koduyla eşleşir; para birimi ve geçerlilik tarihi ayrıca ele alınmalı. |
| Elektrik malzemesi siteleri (3 site) | 120 PDF bağlantısına karşılık 1 Excel | — | — | Marka bazında yıllık veya dönemsel | Çoğunlukla **hayır.** |
| Pet ve kozmetik toptancıları | Bayi portalı, WhatsApp, B2B pazaryeri; XML de sunuluyor (Petibom: yıllık 3.500 TL + KDV ile XML [Arama özeti], site açılmadı) | Paketli üründe EAN barkod yaygın [Çıkarım] | TL [Çıkarım] | Bilinmiyor | **Bilinmiyor.** Test edilmesi gereken ana varsayım bu. |

**Yurt dışında sıklık:**
- Bir freelancer.com ilanında "Every day, we receive supplier price lists" yazıyor [Kullanıcı yorumu].
- Başka bir ilanda iş sahibi listeleri haftalık işlediğini söylüyor [Kullanıcı yorumu].

**Türkiye'de enflasyon:** Ağustos 2026'da yıllık TÜFE %31,51 [Arama özeti]. Bu oranda tedarikçi fiyatlarının yılda birden çok kez değişmesi beklenir [Çıkarım].

### 2.3 Sektör karşılaştırması

Kanıt düzeyi, o sektörde bu çalışmada açılıp okunan kaynaklara göre verilmiştir.

| Sektör | Liste kanalı (kanıt) | Barkod | Sorunun yoğunluğu [Çıkarım] | İlk sürüme uyum | Kanıt düzeyi |
|---|---|---|---|---|---|
| Kozmetik / dermokozmetik | B2B pazaryeri (ToptanTR'de "Excelle Sepet Doldur"); online mağazalar yetkili distribütörlerden aldığını yazıyor | Yaygın | Orta: çok marka, kampanyalı fiyatlar | Orta | Zayıf |
| Pet ürünleri | Bayi portalı (Pelagos), WhatsApp (Patiya), XML (Petibom [Arama özeti]) | Yaygın | Orta: mama fiyatları sık değişiyor, marjlar dar olabilir | Orta | Zayıf–orta |
| Kırtasiye | Kamuya açık bayi listesi bulunamadı | Yaygın | Mevsimlik (okula dönüş) | Bilinmiyor | Yok |
| Ev eşyası / züccaciye | Dekor (Excel'den PDF, barkodlu); Bizim Toptan B2B | Var | Orta | Excel aslı alınırsa iyi | Tek örnek |
| Telefon aksesuarı | Bayi girişli B2B (toptananadolu), dolar bazlı fiyat [Arama özeti] | Markasız üründe eksik olabilir [Çıkarım] | Yüksek: kur etkisi | Düşük–orta | Zayıf |
| **Eklenen: Hırdavat** | Aylık PDF, barkodsuz, USD/TL/EUR karışık (Standart Civata) | Yok | **Yüksek**: çok kalem, döviz, aylık liste | **Düşük** | Orta |
| **Eklenen: Elektrik malzemesi** | Marka listeleri çoğunlukla PDF; brüt liste fiyatı + iskonto; EUR | Yok (referans kodu) | **Yüksek**: onlarca marka, döviz, iskonto | **Düşük** | Orta |

**Daha güçlü bir sektör var mı?** Sorunun en yoğun yaşandığı yerler hırdavat ve elektrik. Ama buralarda listeler PDF, barkodsuz ve birden fazla para birimli. Yani ilk sürüm burada işe yaramaz; PDF okuma ve her tedarikçi için elle eşleştirme gerekir. Bu da sizin koşullarınızla çelişiyor. **Hem sorunun güçlü olduğu hem de koşullarınıza uyan bir sektör bulamadım.**

### 2.4 Kaç tedarikçi ve ürün olunca ciddi yük oluşuyor? (Model, gözlem değil)

Liste başına el emeği için tek dayanak, yurt dışındaki satıcı ifadeleri:
- "The CSV import is the easy 5 minutes. The messy hour is everything before it."
- Bir diğeri son güncellemesinin yaklaşık bir saat sürdüğünü söylüyor.

[Kullanıcı yorumu, [Shopify Community 676989](https://community.shopify.com/t/676989), Eylül 2026]

Saat değeri için asgari ücretin işverene maliyeti kullanıldı: 40.874,63 TL [Arama özeti] ÷ 195 saat ≈ 210 TL/saat.

| Profil [Varsayım] | Ayda gelen liste | Liste başı süre | Aylık el emeği | Emek değeri | Araçla tasarruf |
|---|---|---|---|---|---|
| Küçük: 5 tedarikçi, ~1.500 ürün | 5 | 45 dk | 3,75 saat | ≈ 786 TL | %70 → ≈ 550 TL |
| Orta: 15 tedarikçi, ~5.000 ürün | 15 | 45 dk | 11,25 saat | ≈ 2.358 TL | %70 → ≈ 1.651 TL |
| Büyük: 40 tedarikçi, ~15.000 ürün, karışık format | 40 | 60 dk | 40 saat | ≈ 8.385 TL | %40 (PDF'ler hariç) → ≈ 3.354 TL |

**Çıkarım:**
- Yük, 10–15 tedarikçinin üzerinde anlamlı hale geliyor.
- Küçük işletmede tasarruf ayda birkaç yüz lira; ücretli bir araç için yetersiz.
- Büyük işletmede tasarruf yüksek; ama formatlar dağınık ve bu işletmeler genellikle ERP veya entegratör kullanıyor.

### 2.5 İşletmeler bugün nasıl çözüyor?

| Yöntem | Kanıt |
|---|---|
| Excel formülleri (DÜŞEYARA, ÇAPRAZARA), elle kontrol | excelcozum.com sorusu (2026); Türkçe forum ve eğitim sayfaları [Doğrulandı / Arama özeti] |
| Serbest çalışana Excel şablonu yaptırmak | r10.net (2020); yurt dışında freelancer.com ilanları [Kullanıcı yorumu] |
| ERP: alış faturası gelince alış fiyatını güncellemek, kâr marjıyla satış fiyatı oluşturmak | Akınsoft (Fiyat Matik bayi sayfasında peşin 3.864 TL; KDV durumu yazmıyor), Kursoft, Logo ExcelTrans (123.700 TL + KDV) [Doğrulandı] |
| XML entegratörü: tedarikçi XML'inden otomatik fiyat + kâr kuralı | JetStok (Premium aylık 3.742 TL), Sopyo, Entegra, PraPazar [Şirket iddiası] |
| Platformun Excel/CSV ile toplu güncellemesi | ikas, IdeaSoft, Ticimax, Trendyol [Doğrulandı / Arama özeti] |
| Bu işi yapan bir çalışan | Türk e-ticaret operasyon ilanları [Arama özeti] |
| Yapay zekâ | Yurt dışında bir satıcı: "I use Claude thats enough for me right now" (08.09.2026) [Kullanıcı yorumu] |

### 2.6 Sorun dosya düzenlemek mi, satış fiyatlarının güncel kalmaması mı?

- **Kanıt ağırlıkla dosya hazırlama ve eşleştirme yükünü gösteriyor.** Satıcıların anlattıkları şunlar: sütun adlarının her seferinde değişmesi, kodların eşleşmemesi, Shopify'ın SKU yerine "handle" ile eşleştirmesi, Excel'in barkodları bozması [Kullanıcı yorumu].
- **"Zam satış fiyatına geç yansıyor, marj sessizce eriyor" iddiası** neredeyse yalnızca araç satan şirketlerin tanıtımlarında geçiyor. Örneğin Arovon: "Catch supplier cost increases before they quietly eat your margin" [Şirket iddiası]. Bunu ölçen bağımsız bir kaynak bulamadım.
- **Türkiye'de** ERP ve entegratörler fiyatı ya alış faturası geldiğinde ya da XML ile kurala göre otomatik güncelliyor. Bu yüzden "fiyat güncel değil" sorunu en çok **XML vermeyen ve alımdan önce liste gönderen** tedarikçilerde kalıyor [Çıkarım].
- Bu boşluğun büyüklüğü bilinmiyor.

### 2.7 Güncel alış fiyatı ile eldeki stoğun maliyeti farklıysa yanlış alarm oluşur mu?

Evet; bu bir **tanım sorunu** ve ürün bunu açıkça göstermezse yanıltır.

| Örnek (KDV hariç) | Değer |
|---|---|
| Eldeki stoğun maliyeti (eski listeden alınmış) | 100 TL |
| Yeni liste alış fiyatı | 120 TL |
| Mevcut satış fiyatı | 150 TL |
| Hedef brüt marj | %25 |
| Eldeki stoğa göre marj | (150 − 100) / 150 = **%33,3** → hedefin üstünde |
| Yeni alış fiyatına göre marj | (150 − 120) / 150 = **%20** → araç uyarı verir |

- **Uyarı yanlış değil, farklı bir soruya cevap veriyor:** "Bir sonraki alımda bu fiyattan satarsam hedefi tutturur muyum?" Enflasyon ortamında fiyatlama kararı için doğru soru bu olabilir. Ama işletme "şu an zarar ediyor muyum?" diye okursa yanlış alarm olarak algılanır [Çıkarım].
- **Ters durum daha risklidir.** Tedarikçi fiyat düşürürse araç "fiyatı düşürebilirsin" sinyali verir. Oysa eldeki stok pahalıya alınmış olabilir ve fiyat düşürülürse gerçekleşen marj hedefin altına iner [Çıkarım].
- **Gerekli tasarım:**
  - Çıktıda "**yenileme maliyetine göre brüt marj**" yazmalı.
  - Mümkünse kullanıcının verdiği stok adedi ve ortalama maliyetle ikinci bir sütun ("eldeki stoğa göre") gösterilmeli.
  - Fiyat düşüşleri ayrı bir uyarıyla işaretlenmeli.

---

## 3. Rakipler ve mevcut alternatifler

Fiyatların TL karşılığı 02.10.2026 TCMB kuruyla hesaplandı. Fiyat sayfası, ücretli müşteri olduğunu veya kârlılığı kanıtlamaz.

| Araç | Hedef müşteri | Kapsam | Fiyat | Kurulum | Destek yükü | Bize kalabilecek boşluk |
|---|---|---|---|---|---|---|
| **Excel** (ÇAPRAZARA, Power Query, makro) | Herkes | Eşleştirme, fark, formülle marj | Office lisansı | Şablon kurmak gerekir; her yeni tedarikçide tekrar | Kullanıcının kendisi | Sütunlar değişince şablon bozulur; içe aktarım dosyası elle hazırlanır |
| **Claude / ChatGPT** | Teknik olmayan kullanıcı dahil | PDF ve Excel okuma, karşılaştırma, CSV üretme | Abonelik (bu çalışmada fiyatı doğrulanmadı) | Yok | Kullanıcının kendisi | Kaydedilmiş eşleştirme yok; büyük dosyada doğruluk denetimi zor [Çıkarım]. Ama satıcılar "yeterli" buluyor [Kullanıcı yorumu] |
| **Akınsoft Wolvox + Fiyat Matik** | Perakende ve toptan KOBİ | Alış faturasıyla alış fiyatını güncelleme; kâr marjıyla satış fiyatı; kurallı toplu fiyat değiştirme ve önizleme | Fiyat Matik: bayi sayfasında peşin 3.864 TL [Doğrulandı; KDV durumu yok] | Bayi kurulumu | Bayi | Alım öncesi tedarikçi listesi karşılaştırması belgelerde görünmüyor (doğrulanmadı) |
| **Logo Tiger 3 ExcelTrans** | Orta ve büyük işletmeler | Excel'den veri aktarımı | 123.700 TL + KDV (LEM'li) [Doğrulandı] | İş ortağı | İş ortağı | Pahalı; fark ve marj raporu ayrıca kurgulanmalı |
| **ARMİX** (parmix.com.tr) | KOBİ ERP | "Excel'den Fiyat Güncelle" (ürün kodu, yeni fiyat, iskonto); yapay zekâ ile PDF fiyat listesi okuma; fiyat değişim analizi | Yayımlanmamış [Şirket iddiası] | ? | ? | Sürüm 1.0; müşteri veya aktif kullanım kanıtı yok. Aynı işlevi bir ERP'nin özelliği olarak sunuyor |
| **ikas, IdeaSoft, Ticimax toplu güncelleme** | E-ticaret siteleri | Excel/CSV ile alış ve satış fiyatı güncelleme. ikas'ta eşleşme "Ürün Grup ID" ve "Varyant ID" ile yapılıyor [Doğrulandı] | Pakete dahil | Yok | Platform | Fark raporu ve marj kontrolü yok; tedarikçi dosyasını platform şablonuna kullanıcı çeviriyor |
| **XML entegratörleri** (JetStok, Sopyo, Entegra, PraPazar) | XML veren tedarikçilerle çalışan satıcılar | XML'den ürün, fiyat ve stok; oranla veya sabit tutarla kâr ekleme; döviz çevirme | JetStok Premium aylık 3.742 TL [Doğrulandı]; Entegra'da tedarikçi XML'i Paket 1 ve üstünde [Arama özeti] | Gerekli | Orta | XML vermeyen tedarikçiler; marjı düşen ürünler için "önce incele" adımı (bu araçlar kuralla otomatik fiyat basıyor) |
| **Distribütör B2B portalları** (Pelagos, ToptanTR, Opak B4B) | Bayiler | Fiyatları portalda gösterme, sipariş; bayiye özel Excel indirme [Arama özeti] | Bayiye ücretsiz | — | — | Her portal ayrı; bayinin kendi satış fiyatına etkisini göstermiyor |
| **Tablola** (Türk) | Belgeyle çalışanlar | PDF veya görselden Excel'e dönüştürme | İlk 5 işlem ücretsiz; ücretli paketler okunamadı [Şirket iddiası] | Yok | Düşük | PDF'yi tabloya çeviriyor; karşılaştırma ve marj yok. **Bizim için bir girdi aracı olabilir** |
| **PriceListIQ** | Toptancı, distribütör, e-ticaret | PDF ve OCR, eşleştirme, fark raporu; doğrudan sisteme yazmıyor | 39 $/ay ≈ 1.913 TL; ayda 100 karşılaştırma [Şirket iddiası] | Yok | ? | Türkçe, TL, KDV, iskonto desteği yok; müşteri kanıtı yok |
| **Arovon** | Endüstriyel distribütörler | Excel, CSV ve PDF; eşleştirme güven puanı; birim ve koli farkı; döviz; geçerlilik tarihi; marj etkisi; ERP dosyası | 229 $/ay'dan ≈ 11.234 TL [Şirket iddiası] | Demo | ? | Bizim ilk sürümün tamamını ve fazlasını kapsıyor; Türkiye için pahalı. Müşteri kanıtı yok |
| **Stock Sync** (syncX, Shopify) | Shopify satıcıları | Tedarikçi beslemesini senkronlama, fiyat kuralları | Ücretsiz; aylık 7, 10 ve 300 $ planları; 2014'ten beri; **924 yorum** [Doğrulandı] | Orta | Yorumlarda kurulum ve destek şikâyetleri | Yalnızca Shopify; Türk platformlarını desteklemiyor |
| **Matrixify** (Shopify) | Shopify satıcıları | Toplu içe/dışa aktarım; SKU ile maliyet ve fiyat güncelleme | Ücretsiz; aylık 20, 50 ve 200 $; **1.717 yorum** [Doğrulandı] | Düşük | — | Fark raporu ve marj kontrolü yok |
| **FyreTrail** (Shopify) | Satın alma yönetimi | Satın alma siparişi, tedarikçi PDF'leri | Aylık 59, 99 ve 159 $; 30.01.2026'dan beri; **2 yorum** [Doğrulandı] | ? | ? | Benzer bir ürün yeni ve az kullanılıyor |
| **Ücretsiz araçlar:** Extensions Market Supplier Price Reconciler, CostRift, MarginSync | Shopify satıcıları | Eşleştirme, fark, marj | **0 TL** [Şirket iddiası] | Yok | — | Fiyat çıpasını sıfıra çekiyor |

**Türkiye'de doğrudan rakip:** Tam olarak "tedarikçi listesi farkı + marj uyarısı + platform içe aktarım dosyası" sunan bağımsız bir Türk ürünü **bulamadım**. Kullandığım sorgular [`aramalar.md`](evidence/fiyat_listesi_araci/aramalar.md) dosyasında. Ancak bu "rakip yok" demek değil. İşin parçaları ERP'lerde (Akınsoft, ARMİX, Logo), XML entegratörlerinde ve platformların toplu güncelleme özelliklerinde zaten var.

### 3.1 Müşteri bizi neden seçer? (Somut test)

Aday profil: ikas veya Ticimax kullanan, 15 distribütörden Excel liste alan bir online pet mağazası.

| Mağaza bugün… | Bizim aracımızla… | Geçmek için yeterli mi? [Çıkarım] |
|---|---|---|
| Excel'de tedarikçi listesini ve mağaza dışa aktarımını ÇAPRAZARA ile birleştiriyor, sonra platform şablonuna kopyalıyor | Tedarikçi şablonu bir kez eşleşiyor; sonraki listelerde 2–3 dakikada fark raporu ve platform kimlikleriyle (Varyant ID vb.) içe aktarım dosyası çıkıyor | Ayda 15 listede ≈ 8 saat kazandırabilir. **Değer var ama küçük.** |
| Zamlı ürünü fiyatı güncelleyene kadar eski fiyattan satıyor | Hedef marjın altına düşenler ayrı listede; yenileme maliyetine göre öneri fiyatı | Gerçek kaybın ölçüsü bilinmiyor. Varsayımsal örnek: aylık 1 milyon TL KDV hariç ciro, ürünlerin %20'sine %8 zam, alış/satış oranı %75, zam 15 gün geç yansıyor → yaklaşık 6.000 TL brüt kâr kaybı. **Ancak rekabet nedeniyle zammı hemen yansıtmak her zaman mümkün değil.** |
| XML veren tedarikçiler için entegratör kullanıyor | Entegratörün yerini almıyoruz; yalnızca XML vermeyenler için | Müşteri ikinci bir araç için ödeme yapmak isteyecek mi? **Bilinmiyor.** |
| Claude/ChatGPT kullanıyor | Kaydedilmiş eşleştirme ve tekrarlanabilir çıktı | Yurt dışında bir satıcı "Claude yeterli" diyor. **Zayıf fark.** |

---

## 4. Yurt dışındaki talep ve memnuniyet

### 4.1 Alıcı tarafı (talep) — farklı müşterilerden gelen ifadeler

| Kaynak | Tarih | Ne istiyor / ne yaşıyor | Bütçe / durum |
|---|---|---|---|
| [freelancer.com 40612333](https://www.freelancer.com/projects/automation/Supplier-Price-List-Workflow-Automation) | Okuma anında "2 ay önce" (≈ Ağustos 2026) | Her gün web sitesi ve Telegram'dan gelen tedarikçi listelerini kurallara göre işleyip yönetim paneline yüklemek; önce bir tedarikçi, sonra genişletmek | **30–250 USD, kapalı.** 87 teklif, ortalama 157 USD. Bütçe ilan bütçesidir; ödendiği doğrulanmadı. |
| [freelancer.com 40032378](https://www.freelancer.com/projects/data-analysis/excel-commerce-pricing-reports.html) | "10 ay önce" (≈ Aralık 2025) | Excel içinde: listeyi bırak, sütunları bir kez eşle, güncelle → maliyet, marj formülü, önceki güncellemeye göre fiyat farkları | **750–1.250 INR/saat, kapalı.** 49 teklif. Müşteri harici bir araç değil, Excel içinde çözüm istiyor. |
| [Shopify 295931](https://community.shopify.com/t/295931) | 14.02.2024 | 150 marka, ~3.000 ürünün maliyet ve satış fiyatını barkod/SKU ile güncellemek | Önerilen çözüm: Matrixify ve Ablestar |
| [Shopify 676989](https://community.shopify.com/t/676989) | Eylül 2026 | İki satıcı: liste başına yaklaşık 1 saat; sütunlar değişiyor; eşleştirme her dosyada yeniden yapılıyor | Biri "Claude yeterli" diyor |
| [Shopify 653358](https://community.shopify.com/t/653358) | 21.07.2026 | Birden çok tedarikçiden PDF katalog ve fiyat listesi; Claude ile yüklemeyi deniyor; görsel ve eşleştirme sorunları | — |
| [Shopify 221854](https://community.shopify.com/t/221854) | 05.06.2023 | Yerel tedarikçiler farklı formatlarda liste gönderiyor | Yanıtı bir araç satıcısı vermiş |

**Değerlendirme:**
- İhtiyaç **farklı müşterilerde tekrar ediyor.**
- Ama ilan bütçeleri düşük (30–250 USD, tek seferlik) ve alıcılar Excel içinde ya da tek seferlik bir otomasyon istiyor. **Abonelik isteğine dair bir kanıt bulamadım.**

### 4.2 Satıcı tarafı (arz) — hizmet ilanlarını talep saymıyorum

Ayrıntı: [`shopify_katilimci_siniflamasi.md`](evidence/fiyat_listesi_araci/alintilar/shopify_katilimci_siniflamasi.md)

- Haziran–Ekim 2026 arasında Shopify Community'de **14 bağımsız geliştirici** bu iş için araç geliştirdiğini, sattığını ya da araştırdığını kendisi söylüyor. Örnekler: CostRift, SkuAlign, MarginSync, SupplierSync, FyreTrail, 50 $ ve 95 $ ücretli hizmetler.
- Aynı başlıklarda kendi iş akışını anlatan satıcı sayısı **3**.
- Geliştiricilerin müşteri aradığı 5 başlığın hiçbirine mağaza sahibi yanıt vermemiş:
  - 690164: 28 görüntülenme, 0 yanıt
  - 688982: 32 görüntülenme, 0 yanıt
  - 684485: 51 görüntülenme, 0 yanıt
  - 687149: 18 görüntülenme, 0 yanıt
  - 679730: 1 yanıt; o da başka bir geliştiriciden: "There is already a free tool"
- **Çıkarım:** Bu nişte arz, görünür talebin çok üstünde. Bir forum küçük bir örneklemdir; ama yurt dışında bile müşteri bulmanın bu kadar zor olması önemli bir işaret.

### 4.3 Kullanıcı yorumları: olumlu ve olumsuz

| Ürün | Olumlu | Olumsuz | Not |
|---|---|---|---|
| Stock Sync (924 yorum) | Kurulum yardımı ve hızlı destek (Haziran–Temmuz 2026) [Kullanıcı yorumu] | "Support is extremely poor… Waited 16 hours" (18.03.2026); öncelikli desteğe rağmen bot yanıtları (23.03.2026); "Works but is expensive" (14.01.2026); tek tedarikçi için iyi ama kısıtlı (26.08.2026) [Kullanıcı yorumu] | Olumsuz yorumların ortak konusu **kurulum ve destek**. Bu, her tedarikçi için ayrı kurulumun destek yükü yarattığını gösteriyor. Puanın çoğu olumlu; olumsuzlar azınlıkta. |
| Matrixify (1.717 yorum) | Forumda satıcılar SKU ile maliyet ve fiyat güncellemesi için öneriyor | Aynı başlıkta 2025'te bir kullanıcı önerilen uygulamalar için "but it's paid for bulk products" diyor; hangi uygulamayı kastettiği belirsiz [Kullanıcı yorumu] | Genel içe/dışa aktarım aracı; fark raporu ürünü değil |
| FyreTrail | — | — | Ocak 2026'dan beri yalnızca 2 yorum |
| PriceListIQ, Arovon | — | — | Bağımsız yorum veya müşteri referansı bulunamadı |

---

## 5. Tek kişi için teknik ve operasyonel fizibilite

### 5.1 Veri sorunları ve etkileri

| Sorun | Gerçek örnek | Otomatikleşir mi? | Sürekli insan müdahalesi ister mi? |
|---|---|---|---|
| Barkod eksikliği | Standart Civata ve Schneider listelerinde barkod yok | Ürün koduyla eşleşme mümkün; bunun için kullanıcının kendi ürün kartında tedarikçi kodu sütunu olmalı | **Evet**, ilk kurulumda kod eşleme tablosu gerekir |
| Değişen ürün kodu | excelcozum sorusunda "W-999" gibi eski kodlar; Arovon "Changed supplier alias" uyarısı | Hayır; ancak "listeden çıkan + yeni gelen ürün" çifti olarak öneri sunulabilir | **Evet**, kullanıcı onaylamalı |
| Koli / adet farkı | Dekor ve Standart Civata'da "koli içi" sütunu; Arovon "per 100 vs each" | Birim alanı varsa evet | Yeni tedarikçide **evet** |
| Para birimi | Standart Civata'da tek listede USD, TL, **TRY** ve EUR; Schneider'de EUR | Satır bazında para birimi ve kur tarihiyle evet | Kur kaynağı ve tarihi kuralı bir kez belirlenir |
| İskonto | Elektrikte brüt liste fiyatı + bayiye özel iskonto [Arama özeti]; r10'da günlük iskonto | Tedarikçi bazında iskonto zinciri ile evet | Değiştikçe kullanıcı girmeli |
| KDV | Dekor listesinde KDV ibaresi yok; e-ticaret satış fiyatları genellikle KDV dahil [Çıkarım] | Tedarikçi bazında "KDV dahil/hariç" ayarı ve ürün bazında oranla evet | Belirsiz listede **evet** |
| Geçerlilik tarihi | Schneider'de "23 Temmuz 2025 tarihinden itibaren geçerlidir" | Evet (ileri tarihli liste bugünkü fiyatın üzerine yazılmaz) | Hayır |
| Tam liste mi, yalnızca değişenler mi | Arovon bunu ayrı bir uyarı olarak işliyor | Kullanıcı seçimiyle evet | Hayır; ama yanlış seçim çok sayıda "listeden çıkmış" ürün gösterir |
| Değişen dosya şablonu | "columns renamed again" [Kullanıcı yorumu] | Sütun adından otomatik tahmin kısmen | **Evet**, her şablon değişikliğinde onay |
| Platform eşleşme anahtarı | ikas Ürün Grup ID ve Varyant ID; Shopify handle | Kullanıcı mağaza dışa aktarımını yüklerse evet | Hayır |
| PDF | Elektrik ve hırdavatta yaygın; basit kuralla %84 okunabildi | Kısmen (OCR veya Tablola gibi araçlarla) | **Evet**, her PDF şablonunda |

**Sonuç:** Temiz Excel ve barkodlu dosyada kod tarafı bir kişinin yapabileceği büyüklükte; zor kısım ürün değil, veri.

### 5.2 Müşteri başına ilk kurulum ve aylık destek [Varsayım]

| Profil | İlk kurulum | Aylık destek | Neden |
|---|---|---|---|
| Küçük: 5 tedarikçi, barkod oranı %95, tek para birimi | 2–3 saat | 0,5–1 saat | Platform dışa aktarımı, 5 şablon, kısa eğitim |
| Orta: 15 tedarikçi, barkod %85, 3 tedarikçi USD, 2 tedarikçi koli fiyatı | 5–8 saat | 1–2 saat | Kod eşleme tablosu, kur kuralı, ayda 2–3 şablon değişikliği |
| Büyük: 40 tedarikçi, barkod %60, bir kısmı PDF | 15–30 saat | 4–8 saat | PDF dönüşümü, kod eşleme, iskonto zincirleri. **Sizin istemediğiniz elle veri işi.** |

**Otomatikleşen işler:** sütun eşleme (ikinci dosyadan itibaren), birebir barkod veya kod eşleşmesi, fark hesabı, marj hesabı, içe aktarım dosyası.

**İnsan isteyen işler:**
- yeni tedarikçi şablonu,
- eşleşmeyen veya şüpheli satırlar (bunlar müşteriye inceleme listesi olarak döner),
- kod değişiklikleri,
- birim ve koli farkları,
- KDV ve iskonto belirsizliği.

### 5.3 Kavramlar: çıktıya "net kâr" denmemeli

Örnek (KDV hariç): alış 80 TL, satış 100 TL.

| Kavram | Formül | Örnek | Dikkat |
|---|---|---|---|
| **Brüt marj** | (Satış − Alış) / Satış | (100 − 80) / 100 = **%20** | Araç yalnızca bunu hesaplayabilir; KDV hariç değerlerle |
| **Maliyet üzerine eklenen oran** (markup) | (Satış − Alış) / Alış | (100 − 80) / 80 = **%25** | XML entegratörlerindeki "alış × 1,40" kuralı bu türdendir; %25 ekleme %20 marj demektir |
| **Net kâr** | Satış − alış − pazaryeri komisyonu − kargo − ödeme komisyonu − iade − reklam − genel giderler | Bu verilerle hesaplanamaz | Araç bu kalemleri almıyorsa çıktıda "net kâr" yazmamalı |

**Önerilen çıktı etiketi:** "Yeni alış fiyatına göre brüt marj (KDV hariç)".

### 5.4 Özellik mi, bağımsız ücretli ürün mü?

**Kanıtlar bunun ağırlıkla bir özellik olduğunu gösteriyor:**
- Akınsoft'ta "satış fiyatlarını yeniden oluştur" ve Fiyat Matik var.
- ARMİX'te "Excel'den Fiyat Güncelle" ve "Fiyat Değişim Analizi" var.
- Logo'da ExcelTrans var.
- XML entegratörlerinde kâr kuralları var.
- Shopify'da Matrixify ve Stock Sync gibi genel araçların içinde bu iş zaten yapılıyor.

**Bağımsız ürün olarak dağıtım:** Tek gerçekçi yol bir platform uygulama mağazası. Örneğin ikas uygulama mağazasında bir stok ve satın alma uygulaması "Free Trial, Then $30" olarak listelenmiş; dönem belirtilmemiş [Doğrulandı]. Ama Shopify'da benzer yeni uygulamaların yorum sayısı çok düşük (FyreTrail: 2). [Çıkarım]

---

## 6. Para kazanma ve müşteri edinme

### 6.1 Sabit giderler

| Kalem | Tutar | Etiket |
|---|---|---|
| Muhasebe (2026, Ankara, işletme defteri, işçisiz; KDV dahil, oda tarifesindeki asgari ücret) | 3.593 TL/ay | [Doğrulandı] |
| KDV beyannamesi damga vergisi | 834,50 TL/ay | [İkincil kaynak, 03.01.2026] |
| Altyapı (sunucu, veritabanı, alan adı, e-posta, yedek) | 1.500 TL/ay | [Varsayım] |
| Bağ-Kur (şahıs şirketi sahibi, 5 puan indirimli en düşük) | 10.156,73 TL/ay | [İkincil kaynak]. Başka bir kaynak 9.743,85 TL diyor; **kaynaklar çelişiyor.** Başka bir işte 4/a sigortalı iseniz durumunuzu mali müşavirinize sorun. |
| **Sabit gider — A: yan iş (Bağ-Kur yok)** | **5.928 TL/ay** | |
| **Sabit gider — B: tam zamanlı şahıs şirketi** | **16.084 TL/ay** | |

**Diğer varsayımlar:**
- Ödeme komisyonu %3 [Varsayım]. Dayanak: iyzico link ile ödemede şirketler için %2,29 + 0,25 TL'den başlıyor; PayTR abonelikte ek %0,50 alıyor [Arama özeti].
- Müşteri başına değişken altyapı maliyeti 50 TL/ay [Varsayım].

**Geliştirme maliyeti (işletme maliyetinden ayrı):** Yazılım becerinizi bilmediğim için üç senaryo verdim. İlk sürüm kapsamı: yükleme, sütun eşleme, eşleştirme, fark, marj, inceleme listesi, iki platformun içe aktarım dosyası, giriş ve ödeme.

| Beceri senaryosu [Varsayım] | Süre | Fırsat maliyeti (175 TL/saat = net asgari ücret ÷ 160 saat) |
|---|---|---|
| Deneyimli web geliştirici | 120 saat | ≈ 21.000 TL |
| Orta seviye | 250 saat | ≈ 43.900 TL |
| Başlangıç seviyesi / az kodlu araçlar | 400 saat | ≈ 70.200 TL |

Geliştirme döneminde nakit gider: altyapı ve alan adı, birkaç bin TL [Varsayım].

### 6.2 Fiyat modelleri: orta büyüklükte bir müşteri için

Varsayılan müşteri: 15 tedarikçi, ayda 15 liste. Fiyatların hepsi **[Varsayım]**.

| Model | Önerilen fiyat ve gerekçe | Müşteri başı aylık nakit katkı | Sizin saatiniz | Sorun |
|---|---|---|---|---|
| Tek seferlik kurulum (Excel şablonu veya betik) | 7.500 TL. Freelancer ilanlarının 30–250 $ (≈ 1.470–12.265 TL) bandında | Sadece bir kez | 8–12 saat + şablonlar bozuldukça ücretsiz destek talebi | Tekrar eden gelir yok; şablon bozuldukça elle iş çıkar |
| Kurulum + aylık bakım | 2.500 TL kurulum + 990 TL/ay. ikas uygulama mağazasındaki fiyat etiketleri (30–50 $ ≈ 1.472–2.453 TL; dönem belirtilmemiş) ve PriceListIQ'nun aylık fiyatı (≈ 1.913 TL) altında | ≈ 910 TL | 5 saat kurulum + ~1 saat/ay | Satış süresi uzun |
| Dosya başına ücret | 120 TL/dosya → 15 dosya = 1.800 TL/ay | ≈ 1.700 TL | Kullanım arttıkça destek artar | Gelir düzensiz; müşteri dosyaları biriktirip toplu yükler |
| Aylık abonelik (kurulum yok, kullanıcı kendisi kurar) | 990 TL/ay | ≈ 910 TL | Kurulum desteği yine gelir (bkz. Stock Sync yorumları) | Kurulumu müşteriye bırakmak terk oranını artırabilir [Çıkarım] |

Senaryolarda en dengeli görünen "kurulum + aylık abonelik" modeli kullanıldı. Ama bu model de **satış süresini** çözmüyor.

### 6.3 Senaryolar: ilk sürümden sonraki 12 ay

Model dosyası: [`senaryo_modeli.py`](evidence/fiyat_listesi_araci/analiz/senaryo_modeli.py) · Çıktı: [`model_cikti.txt`](evidence/fiyat_listesi_araci/analiz/model_cikti.txt)

**Satış adetleri ve fiyatlar varsayımdır; gerçekçi gelir tahmini değildir.** Geliştirme saatleri tabloya dahil değildir.

| | Kötümser | Orta | İyimser |
|---|---|---|---|
| Fiyat | 690 TL/ay + 1.500 TL kurulum | 990 TL/ay + 2.500 TL | 1.490 TL/ay + 3.500 TL |
| 12 ayda yeni müşteri | 5 | 21 | 51 |
| Aylık müşteri kaybı | %8 | %4 | %2,5 |
| Müşteri başı satış saati | 25 | 14 | 8 |
| 12. ayın sonunda aktif müşteri | 3,4 | 17,4 | 45,4 |
| 12. ay aylık tekrarlayan gelir | 2.346 TL | 17.226 TL | 67.646 TL |
| **12 ay ciro** | 23.743 TL | 159.565 TL | 579.216 TL |
| Değişken gider | 1.889 TL | 10.194 TL | 30.823 TL |
| **Nakit katkı** (ciro − değişken gider) | 21.854 TL | 149.371 TL | 548.393 TL |
| 12 ay net nakit — A: yan iş | **−49.276 TL** | **+78.241 TL** | **+477.263 TL** |
| 12 ay net nakit — B: tam zamanlı | **−171.157 TL** | **−43.640 TL** | **+355.382 TL** |
| Çalışma saati (satış, kurulum, destek, bakım) | 370 saat (≈ 31/ay) | 651 saat (≈ 54/ay) | 934 saat (≈ 78/ay) |
| Saat başı net nakit (A / B) | −133 / −462 TL | +120 / −67 TL | +511 / +381 TL |
| Başabaş için gereken aktif müşteri (A / B) | 9,6 / 26 | 6,5 / 17,7 | 4,2 / 11,5 |
| Size ayda net asgari ücret (28.075,50 TL) bırakmak için gereken aktif müşteri (A / B) | 55 / 71 | 37 / 49 | 24 / 32 |

**Okuma:**
- Orta senaryoda bile tam zamanlı çalışırsanız ilk yıl nakit açığı var. Yan iş olarak yapılırsa saat başına yaklaşık 120 TL kalıyor; bu net asgari ücretin saatlik karşılığından (175 TL) düşük.
- İyimser senaryo 12 ayda 51 ücretli müşteri gerektiriyor. Yurt dışındaki geliştiricilerin forumdaki deneyimi (5 müşteri arama başlığına 0 satıcı yanıtı) ve Türkiye'de ödeme isteğine dair kanıt bulunamaması, bu varsayımı desteklemiyor [Çıkarım].

### 6.4 En uygun tek müşteri profili

**Seçim:** Kendi e-ticaret sitesi (ikas, Ticimax, IdeaSoft, T-Soft) ve pazaryeri satışı olan, 10'dan fazla distribütörden alım yapan, 2.000–10.000 barkodlu ürün satan **çok markalı online pet ürünleri perakendecisi**.

**Neden bu profil:**
- Paketli ürünlerde EAN barkod yaygın [Çıkarım].
- Çok sayıda marka ve distribütör var. İncelenen sitelerin ana sayfalarında 3 ile 14 arasında bilinen mama markası adı geçiyor; birinde ana sayfada marka adı yok.
- Online çalıştıkları için Excel/CSV içe aktarmaya alışkınlar.
- Kamuya açık iletişim sayfaları var; saha ziyareti gerekmiyor.

**Neden ödeme yapabilir:** Tedarikçi Excel liste gönderiyorsa her listede eşleştirme ve fiyat güncelleme işi tekrar ediyor. Marjı dar ürünlerde geç güncelleme doğrudan brüt kârı düşürüyor [Çıkarım].

**Neden ödemeyebilir:**
- Distribütörler giderek XML ve B2B portal sunuyor (Pelagos'ta portal, Petibom'da XML).
- Bu işi şu an bir çalışan Excel ile yapıyor.
- Küçük mağazada tasarruf ayda birkaç yüz TL.

**Nasıl ulaşılır:**
- Sitelerdeki iletişim sayfaları (bkz. 7.1).
- ikas ve Ticimax uygulama mağazaları.
- Bu platformların partner ajansları.

Not: Siz "müşteri kovalamak istemiyorum" dediniz. Bu profilin ilk müşterileri büyük olasılıkla doğrudan iletişimle gelir; uygulama mağazasından kendiliğinden gelen talep kanıtlanmadı.

---

## 7. Yazılım geliştirmeden 14 günlük test

**Kararım "ele".** Aşağıdaki test, yalnızca bu kararı yeniden açmak isterseniz yapılmalı. Eşikler bilerek yüksek tutuldu. Bu çalışmada hiçbir işletmeye mesaj gönderilmedi.

### 7.1 Görüşülebilecek 10 aday işletme

Hepsi **aday**dır; ihtiyaçları doğrulanmadı. Ana sayfa ve iletişim sayfası 4 Ekim 2026 sabahı (01:51–02:10 TSİ) HTTP 200 döndü. Platform bilgisi sayfa kodundaki izlerden çıkarıldı.

| # | İşletme | Site | İletişim sayfası | Platform izi | Not |
|---|---|---|---|---|---|
| 1 | Petpal | https://petpal.com.tr/ | https://petpal.com.tr/pages/iletisim | ikas | |
| 2 | Pet İhtiyaç | https://www.petihtiyac.com/ | https://www.petihtiyac.com/iletisim | T-Soft | Kendini "Türkiye'nin en büyük" online pet mağazası olarak tanıtıyor [Arama özeti]; hedef profil için büyük olabilir |
| 3 | Evcilal | https://www.evcilal.com/ | https://www.evcilal.com/iletisim | IdeaSoft | |
| 4 | PetZone | https://www.petzone.com.tr/ | https://www.petzone.com.tr/iletisim | Ticimax | Site başlığında İstanbul Göktürk'te pet shop geçiyor [Arama özeti] |
| 5 | Petikom | https://www.petikom.com.tr/ | https://www.petikom.com.tr/iletisim | Ticimax | B2B toptan satış da yaptığını söylüyor [Arama özeti] |
| 6 | Mismama | https://www.mismama.com/ | https://www.mismama.com/iletisim.aspx | Ticimax | |
| 7 | Petmarketburada | https://www.petmarketburada.com/ | https://www.petmarketburada.com/iletisim | IdeaSoft | |
| 8 | Petzzshop | https://www.petzzshop.com/ | https://www.petzzshop.com/pages/iletisim | ikas | Adı benzeyen bir toptan tedarik sitesi (petzztedarik.com) var; aralarındaki bağlantı doğrulanmadı |
| 9 | Patiya Pet Shop | https://patiyapetshop.com/ | https://patiyapetshop.com/iletisim/ | WooCommerce | Hem toptancı hem perakendeci; liste alıyor ve gönderiyor |
| 10 | Amazon Pet Center | https://amazonpetcenter.com/ | https://amazonpetcenter.com/pages/iletisim | ikas | |

### 7.2 Özel bilgi istemeden sorulabilecek 6 soru

1. Son 30 günde kaç tedarikçiden yeni fiyat listesi geldi? Hangi yolla geldi: Excel, PDF, WhatsApp, XML, bayi portalı?
2. En son gelen listeyi sitenize işlemek ne kadar sürdü ve bu işi kim yaptı?
3. O listede barkod ya da sizin sisteminizdeki ürün koduyla eşleşen bir kod var mıydı? Eşleşmeyen satır çıktı mı, onları ne yaptınız?
4. Bir zammı satış fiyatına geç yansıttığınızı ya da gözden kaçırdığınızı sonradan fark ettiğiniz oldu mu? Nasıl fark ettiniz?
5. Bu iş için şu an hangi aracı kullanıyorsunuz (Excel, entegratör, ERP, yapay zekâ) ve bunun için bir ücret ödüyor musunuz?
6. Bir listeyi yükleyip birkaç dakikada "fiyatı değişenler, marjı hedefin altına düşenler ve sitenize yüklenecek dosya" çıktısını alsaydınız, bu hangi koşulda size para ödemeye değer gelirdi, hangi koşulda gelmezdi?

### 7.3 Hassas alanları kapatılmış örnek dosya talebi (metin)

> Merhaba, tedarikçi fiyat listelerinin sitelere işlenmesi üzerine kısa bir araştırma yapıyorum. Uygun görürseniz, herhangi bir tedarikçinize ait **bir önceki ve bir yeni fiyat listesini** rica edebilir miyim?
>
> - Tedarikçi adını silebilir, fiyatları sabit bir sayıyla çarparak değiştirebilirsiniz; bana yalnızca dosyanın yapısı gerekiyor.
> - Sitenizden yalnızca **barkod veya stok kodu, ürün adı ve satış fiyatı** sütunlarının olduğu bir dışa aktarım yeterli. Satış fiyatının KDV dahil mi hariç mi olduğunu belirtirseniz yeter.
> - Müşteri, sipariş veya ciro bilgisine ihtiyacım yok.
>
> Dosyaları yalnızca bu inceleme için kullanacağım, kimseyle paylaşmayacağım ve 30 gün içinde sileceğim.

### 7.4 Sınırları belirli ücretli pilot teklifi (metin)

> **Tedarikçi Fiyat Listesi Pilotu — 1.500 TL + KDV, 30 gün**
>
> **Kapsam:**
> - En fazla 3 tedarikçi, her biri için 2 liste.
> - Yalnızca Excel/CSV dosyaları; dosyada barkod ya da sizin sisteminizdeki ürün koduyla eşleşen bir kod bulunmalı.
>
> **Size teslim edilecekler (her liste için 1 iş günü içinde):**
> - fiyatı değişen ürünler (eski fiyat, yeni fiyat, % değişim),
> - yeni eklenen ve listeden çıkan ürünler,
> - yeni alış fiyatına göre brüt marjı (KDV hariç) hedefinizin altına düşen ürünler,
> - eşleşmeyen veya şüpheli satırlar için inceleme listesi,
> - onayınızdan sonra sitenize yükleyebileceğiniz içe aktarım dosyası.
>
> **Kapsam dışı:** PDF ve görsel okuma, eşleşmeyen satırların sizin yerinize düzeltilmesi, sisteminize doğrudan yazma, net kâr hesabı (komisyon, kargo, iade dahil değil).
>
> **İade:** İlk listenin raporundan memnun kalmazsanız ücretin tamamı iade edilir.

Pilot, kurucu tarafından Excel/Power Query veya kısa bir betikle elle yürütülür. Bu süreçte her listenin gerçekte kaç dakika sürdüğü ölçülmelidir.

### 7.5 Devam, değiştir ve bırak eşikleri

**Devam (yeniden değerlendir) — hepsi birlikte gerçekleşmeli:**
- En az 6 görüşme yapıldı (10 aday yetmezse aynı profilden 10 aday daha eklenebilir).
- Görüşülenlerin en az yarısı son 30 günde **en az 5 tedarikçiden Excel/CSV liste** aldığını söyledi.
- **En az 3 ücretli pilot** için ödeme alındı.
- Pilot dosyalarında satırların en az %80'i otomatik eşleşti.
- Müşteri başına kurulum 4 saati geçmedi.

**Değiştir:**
- Görüşmelerde sorun var ama listeler çoğunlukla PDF/WhatsApp ise bu ürün değil, PDF'yi tabloya çevirme işi gerekir. Bu sizin koşullarınıza aykırı; bu durumda **bırakın**.
- Listeler çoğunlukla XML ise talep entegratörlerde demektir; **bırakın**.

**Bırak — herhangi biri yeterli:**
- 14 günde 3'ten az ücretli pilot.
- Görüşülenlerin çoğu "Excel, entegratör ya da yapay zekâ yetiyor" dedi.
- Pilot dosyalarında otomatik eşleşme %70'in altında kaldı.
- Liste başına sizin harcadığınız süre 30 dakikayı geçti.

---

## 8. Son karar: **Ele**

**Gerekçeler:**

1. **Talep kanıtı zayıf.** Türkiye'de kodları eşleştirme ihtiyacı görülüyor, ama örneklerin hepsi ücretsiz bir formülle, mevcut ERP ile ya da bir çalışanla çözülmüş. Yurt dışında alıcı ilanları tek seferlik ve 30–250 $ bandında.
2. **Arz kalabalık ve fiyat sıfıra yakın.** Haziran–Ekim 2026'da 14 bağımsız geliştirici aynı müşteriyi arıyor; ücretsiz araçlar var; müşteri arama gönderileri yanıtsız.
3. **Değer ile koşullarınız ters yönde.** İş, verinin dağınık olduğu yerde değerli (hırdavat ve elektrikte PDF, barkodsuz, karışık para birimi). Orası da sizin istemediğiniz elle düzeltme işini gerektiriyor. Temiz Excel ve barkodlu veride ise kazanç küçük işletmede ayda birkaç yüz TL.
4. **Bu ihtiyaç Türkiye'de büyük ölçüde başka ürünlerin bir özelliği olarak karşılanıyor:** ERP'ler (Akınsoft, ARMİX, Logo), XML entegratörleri ve platformların toplu güncelleme araçları.
5. **Ekonomi zor.** Orta senaryoda tam zamanlı çalışırsanız ilk yıl nakit açığı var. Size net asgari ücret kadar gelir bırakmak için 37–49 aktif ücretli müşteri gerekiyor.

**Bu kararı ne değiştirir:** Bölüm 7'deki testte en az 3 Türk işletmesinin kendi dosyasıyla ve ön ödeme yaparak pilot istemesi. Bunun dışında "fikri kurtaracak" güçlü bir gerekçe bulamadım.

---

## 9. Kaynaklar

Erişim: 4 Ekim 2026, 01:51–02:15 TSİ. Ayrıntılı liste: [`kaynaklar.tsv`](evidence/fiyat_listesi_araci/kaynaklar.tsv)

**Verilen başlangıç kaynakları**
- PriceListIQ — https://www.pricelistiq.com/ (fiyat ve işlev; müşteri kanıtı yok)
- Arovon — https://arovon.com/price-list-automation (fiyat ve işlev; müşteri kanıtı yok)
- syncX Stock Sync — https://apps.shopify.com/stock-sync (924 yorum, fiyatlar) · olumsuz yorumlar: https://apps.shopify.com/stock-sync/reviews?ratings%5B%5D=1&ratings%5B%5D=2&sort_by=newest
- Tablola — https://tablola.com/ (PDF'den tabloya; fiyat ve işlem kredisi)
- ARMİX / Parmix — https://parmix.com.tr/ (ERP arayüzü; fiyat ve müşteri bilgisi yok)
- ikas uygulama mağazası — https://apps.ikas.com/
- freelancer.com 40612333 — https://www.freelancer.com/projects/automation/Supplier-Price-List-Workflow-Automation (kapalı, 30–250 USD, 87 teklif)

**Yurt dışı talep ve arz**
- freelancer.com 40032378 — https://www.freelancer.com/projects/data-analysis/excel-commerce-pricing-reports.html
- Shopify Community — https://community.shopify.com/t/676989 · https://community.shopify.com/t/295931 · https://community.shopify.com/t/653358 · https://community.shopify.com/t/221854 · https://community.shopify.com/t/684485 · https://community.shopify.com/t/688982 · https://community.shopify.com/t/690164 · https://community.shopify.com/t/687149 · https://community.shopify.com/t/679730
- Extensions Market (ücretsiz araç) — https://extensionsmarket.com/free-supplier-price-reconciler
- FyreTrail — https://apps.shopify.com/fyretrail · Matrixify — https://apps.shopify.com/excel-export-import

**Türkiye: ihtiyaç ve format**
- excelcozum.com sorusu (29.08.2026) — https://excelcozum.com/konu/iki-farkli-tabloyu-karsilastirip-eslesmeyen-kodlara-urun-bulunamadi-yazdirma.10056/
- r10.net talebi (15.12.2020) — https://www.r10.net/ofis-uygulama/2608920-satis-ve-alis-fiyat-listesi-excel.html
- Standart Civata hırdavat listesi (Ekim 2026) — https://standartcivata.com.tr/wp-content/uploads/documents/tr/fiyat-listeleri/hirdavat-fiyat-listesi.pdf
- Dekor ürün ve barkod listesi (30.01.2026) — https://cdn.prod.website-files.com/6974c5dd94243ffc3632334c/69aec3ffef126b8f99162c45_Dekor%202026%20U%CC%88ru%CC%88n%20ve%20Koli%20Barkod%20Listesi.pdf
- Schneider fiyat listesi (bayi sitesi) — https://www.bayberkelektrik.com/fiyat-listeleri/schneider-fiyat-listesi.xlsx
- Elektrik liste sayfaları — https://baytekotomasyon.com/fiyatlar · https://www.bayberkelektrik.com/fiyat-listesi · https://www.elektrikmarket.com.tr/sayfa/elektrik-malzemesi-markalari-fiyat-listesi
- Pelagos — https://bayi.pelagos.com.tr/fiyat-listeleri · Patiya — https://patiyapetshop.com/ · ToptanTR — https://www.toptantr.com/kozmetik-ve-kisisel-bakim

**Türkiye: mevcut çözümler**
- Akınsoft bilgi bankası — https://bilgibankasi.akinsoft.net/tr/home/makale/1276-akinsoft-wolvox-erp-programimizda-alis-ve-satis-fiyatlarini-otomatik-olusturma-islemi
- Wolvox Fiyat Matik (bayi sayfası) — https://www.mertbilisimhizmetleri.com.tr/akinsoft-wolvox-fiyat-matik-bursa
- Logo Tiger 3 fiyat listesi (7 Ocak 2026) — https://cdn.logo.com.tr/files/logocomtr/Uploads/Documents/logo-tiger-3-fiyat-listesi.pdf
- Kursoft — https://blog.kursoft.com.tr/satis-fiyatlarini-otomatik-guncelleme/
- ikas toplu güncelleme — https://support.ikas.com/tr/ikasa-urunlerinizi-topluca-nasil-yukler-ve-guncellersiniz
- JetStok — https://www.jetstok.com/xml-entegrasyonu · Sopyo — https://www.sopyo.com/entegrasyonlar/xml-bankasi-xml-entegrasyonu · PraPazar — https://prapazar.com/tr/program-ozelligi/xml-excel-entegrasyonu

**Maliyet ve kur**
- SMMM 2026 asgari ücret tarifesi (Ankara) — https://asmmmo.org.tr/userfiles/others/files/Mvzt/Prtk/uc/AUT-2026.pdf
- Bağ-Kur 2026 — https://musavirlerkulubu.com.tr/araclar/bagkur-prim-hesaplama · https://www.ifasturk.com.tr/sahis-sirketi-aylik-giderleri-2026 (iki kaynak çelişiyor)
- TCMB kurları — https://www.tcmb.gov.tr/kurlar/today.xml

**Yalnızca arama özetine dayananlar (karar için tek başına kullanılmadı)**
- Ağustos 2026 TÜFE (%31,51)
- 2026 asgari ücret ve işveren maliyeti (28.075,50 TL / 40.874,63 TL)
- iyzico ve PayTR komisyon oranları
- Entegra ve Dopigo fiyatları
- Petibom XML ücreti
- 3Dcim iş ilanı
- Elektrikte brüt fiyat + iskonto uygulaması
- Telefon aksesuarında dolar bazlı fiyat
- ikas Flowventory işlev ayrıntısı
