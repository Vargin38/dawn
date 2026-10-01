# Yeni İş Fikirleri Araştırması — Türkiye

**Hazırlanma:** 1 Ekim 2026
**Web araştırması:** 1 Ekim 2026, 19:48–22:00 TSİ
**Kanıtlar:** [`evidence/`](evidence/README.md)
**Kapsam:**
- Bu rapor `ETICARET_ARASTIRMASI.md`'den bağımsızdır.
- E-ticaret sitesi denetimi başka bir adla yeniden önerilmedi.
- Projedeki mevcut dosyalara dokunulmadı.

---

## 0. Kısa cevap

**Kanıtlarla "güçlü" diyebileceğim bir aday çıkmadı.** İncelenen hiçbir fikirde Türkiye'de müşterinin para ödeyeceği kanıtlanmış değil. Bu soru masa başında cevaplanamaz; görüşme ve ön satış gerekir.

Yine de adaylar arasında belirgin bir sıralama var.

**1. En iyi test edilebilir aday: restoran ve kafeler için menü bilgilendirme uyumu + reçete maliyeti**

Menüdeki her ürün için bileşen listesi, alerjenler ve porsiyon başına kalori hazırlanır; aynı reçete verisinden ürün maliyeti çıkarılır.

Neden öne çıkıyor:
- **Resmî bir son tarih var:** Tarım ve Orman Bakanlığı'nın 10.03.2026 tarihli kılavuz revizyonuna göre zincir olmayan tüm toplu tüketim yerleri bileşen bilgisini 31.12.2026'ya, kalori bilgisini 31.12.2027'ye kadar vermek zorunda.
- **Pazar büyük:** Kayıtlı yeme-içme işyeri sayısı 158.725 (TEPAV, 2025).
- **Ödeyen kişi belli:** İşletme sahibi.
- **Ulaşmak kolay:** Müşteriye yüz yüze gidilebilir; depo veya araç gerekmez.

Zayıf yanları:
- Gelir büyük ölçüde tek seferlik.
- QR menü firmaları yapay zekâ ile kalori "tahmini" sunuyor; bunlardan biri tüm özellikleriyle yıllık 5.000 TL + KDV.
- Bakanlığın ulusal gıda veri tabanı TÜRKOMP'un ticari kullanımı ücretli: 2026'da 26–100 gıda için yıllık 75.902 TL + KDV.
- Denetimin ne kadar sıkı olacağı ve sürenin ertelenip ertelenmeyeceği belirsiz.

**2. Problemi en büyük ama modeli en zor aday: işverenler için iş davalarına karşı belge ve süreç düzeni**

- **Sorun çok büyük:** 2024'te 1.041.842 iş uyuşmazlığı arabuluculuk dosyası açıldı (Adalet Bakanlığı).
- **Yurt dışında para ödendiği kesin:** İngiltere'de bu hizmeti veren Peninsula grubunun yıllık geliri 463,2 milyon £, müşteri sayısı 150 binin üzerinde.
- **Türkiye'de üç engel var:**
  - Hukuki danışmanlık avukatlara ayrılmış.
  - Önleyici hizmete ödeme isteği belirsiz.
  - Bazı işverenler için doğru kayıt tutmak, elden ödenen ücret gibi kayıt dışı uygulamalarla çelişebilir.

**3. Yapması en kolay ama rekabeti en kötü aday: yurt dışı hisse kazançları için beyan hesaplama raporu**

- Midas hesaplamayı yapmıyor.
- Ancak ücretsiz (VergiHemen) ve ucuz (KolayBeyan, yıllık 60 $) yerli araçlar zaten var.

**Önerim:**
- Aday 1 için **hemen 14 günlük ön satış testi** yapın. Son tarih yaklaştığı için ödeme isteği hızlı ölçülür.
- Test başarısız olursa Aday 2'yi muhasebeciler üzerinden test edin.
- İkisi de başarısız olursa bu listedeki hiçbir fikre yazılım yatırımı yapmayın.

---

## 1. Erişim, yöntem ve kısıtlar

### 1.1 Erişim kontrolü (19:48 TSİ)

| Araç | Durum |
|---|---|
| Web araması | Çalışıyor. Arama aracı ABD konumlu; Türkçe sorgular sonuç verdi. |
| Sayfa okuma | Çalışıyor. |
| Doğrudan indirme (curl) | Çalışıyor. Resmî PDF'ler indirilip metne çevrildi. |
| Engelli siteler | Capterra.com, Reddit ve Ekşi Sözlük doğrudan indirmede 403 verdi (sitelerin bot koruması). Bu kaynaklardaki yorumlara yalnızca arama özetleri veya başka sayfalar üzerinden ulaşılabildi. |

Ayrıntı: [`evidence/00_erisim_kontrolu.md`](evidence/00_erisim_kontrolu.md)

### 1.2 Yöntem

1. Kullanıcı şikâyetleri, işletme süreçleri, yurt dışındaki ücretli ürünler ve resmî verilerden 21 gerçek problem çıkarıldı.
2. Her problem için Türkiye'de mevcut çözümler arandı. Kullanılan sorgular: [`evidence/aramalar.md`](evidence/aramalar.md)
3. En güçlü 5 aday için yurt dışı örnekleri, fiyatlar, kullanıcı yorumları, yerli rakipler, kanallar, operasyon yükü, hukuki engeller ve başarısızlık nedenleri incelendi.
4. İlk 3 aday için kötümser, orta ve iyimser ekonomi hesabı yapıldı.
5. Birinci aday için 14 günlük doğrulama planı yazıldı.

### 1.3 Kanıt etiketleri

Rapor boyunca her bilgi şu etiketlerden biriyle işaretlendi:

| Etiket | Anlamı |
|---|---|
| **[Resmî]** | Resmî belge veya denetlenmiş finansal tablo; sayfası ya da PDF'i açılıp okundu |
| **[Şirket iddiası]** | Şirketin kendi sitesindeki fiyat veya pazarlama bilgisi |
| **[Bağımsız yorum]** | Trustpilot, Capterra, Şikâyetvar, BBB gibi üçüncü taraf yorumları. Puanlar şirketlerin yorum toplama kampanyalarından etkilenebilir. |
| **[Arama özeti]** | Kaynak sayfası açılamadı veya açılmadı; yalnızca arama aracının özeti |
| **[Çıkarım]** / **[Varsayım]** | Benim yorumum veya test edilmesi gereken varsayım |

### 1.4 Kısıtlar

- **Türkiye'de ödeme isteği ölçülmedi.** Kural gereği hiçbir işletmeyle görüşülmedi, mesaj atılmadı, para harcanmadı.
- **Döviz çevirileri:** 01.10.2026 TCMB döviz satış kuru kullanıldı (USD 49,0348; EUR 55,3963; GBP 64,9812) [Resmî].
- **Arama özetleri:** Bazı rakamlar yalnızca arama özetinden alındı ve öyle etiketlendi. Bunlar karar için tek başına kullanılmamalı.
- **Bilinmeyen pazar büyüklükleri:** Örneğin yurt dışı hisse kazancı beyan eden kişi sayısı ve ETGB ile ihracat yapan firma sayısı için kaynak bulunamadı. Bu boşluklar uydurma rakamla doldurulmadı.

---

## 2. 21 problem ve eleme gerekçeleri

| # | Problem (kimin sorunu) | Yurt dışında para ödenen örnek | Türkiye'de bulunan çözümler | Karar ve gerekçe |
|---|---|---|---|---|
| 1 | **Restoran menülerinde bileşen, alerjen ve kalori zorunluluğu** (restoran ve kafe sahipleri) | MenuCalc 30,66–74,83 $/ay [Arama özeti]; Nutritics [Bağımsız yorum]; ürün başı analiz 25–100 $ [Arama özeti] | QR menü firmalarının yapay zekâ tahmini (İrensoft 5.000 TL + KDV/yıl [Şirket iddiası]); menü danışmanları; TÜRKOMP (ticari kullanım ücretli) | **İlk 5 — Aday 1.** Resmî son tarih [Resmî], ödeyen belli, saha işi az |
| 2 | **İşverenin iş davalarında belge eksikliği yüzünden kaybetmesi** (5–50 çalışanlı KOBİ'ler) | Peninsula 463,2 m£ gelir [Resmî]; BrightHR; Employsure 23.500+ müşteri [Resmî] | Avukatlar, iş hukuku danışmanlık firmaları, İK yazılımları, e-bordro araçları | **İlk 5 — Aday 2.** En büyük problem; model zor |
| 3 | **Yurt dışı hisse kazançlarının beyanı** (Midas, IBKR kullanıcıları) | Koinly 49–199 $/vergi yılı [Arama özeti]; Sharesight vergi paketi 59 $/yıl [Arama özeti] | VergiHemen (ücretsiz), KolayBeyan (60 $/yıl), pratikhesaplama, muhasebeciler | **İlk 5 — Aday 3.** Kolay ama rekabet ücretsiz |
| 4 | **E-ihracatçının (ETGB) KDV iadesini alamaması** | VAT IT gibi başarıya bağlı ücretli iade firmaları (%15–30 [Arama özeti]) | Mali müşavirler; e-ihracat rehberleri | **İlk 5 — Aday 4.** Mali müşavir ruhsatı gerekir; iade alınmayan tutara dair veri yok |
| 5 | **Küçük paketli gıda üreticisinin etiket ve besin değeri tablosu** | ReciPal 29 $/tarif, 59–129 $/ay [Şirket iddiası] | Laboratuvarlar, gıda mühendisliği büroları, BeBiS, TÜRKOMP | **İlk 5 — Aday 5.** Sık yaşanmıyor; ucuz alternatifler var |
| 6 | Restoranın tedarikçi zamlarını menü fiyatına geç yansıtması (yazılım olarak) | MarginEdge 350 $/lokasyon/ay [Şirket iddiası] | e-Fatura XML ile stok girişi ve otomatik reçete maliyeti yapan çok sayıda POS (RobotPOS, YepPos, restorantakibi, Simpra, Karekodgarson 1.000 TL/ay) | **Elendi:** Yazılım olarak karşılanmış. Hizmet versiyonu Aday 1'e eklendi |
| 7 | Mali müşavirin mükelleften evrak toplaması | TaxDome, Content Snare (fiyat doğrulanmadı) | KolayBi'Link, Mükellef Pro, MüşavirPro+, e-Mükellef, DefterAsist | **Elendi:** Kalabalık pazar |
| 8 | B2B vadesi geçmiş alacak takibi | Chaser, Upflow | Tahsildar, Cari Ofis, iKobi, nicheCRM, Kuvvem | **Elendi:** Kalabalık; ayrışma zor |
| 9 | Pazaryeri hakediş ve kesinti hataları | Amazon tazminat takip hizmetleri | KarPanel, Verimle, Sentos; Trendyol'un resmî itiraz süreci | **Elendi:** Araçlar var ve önceki e-ticaret fikrine çok yakın |
| 10 | Benzer marka başvurusunu kaçırma | CompuMark türü izleme hizmetleri | Patent vekilleri, yıllık 6.000–9.000 TL [Arama özeti] | **Elendi:** Karşılanmış; itiraz vekil gerektirir |
| 11 | Reaktif enerji cezası | Enerji faturası denetim firmaları | Pts Pano, Yeşil Pano, Olivenet vb. | **Elendi:** Karşılanmış; pano başında saha işi |
| 12 | Uçuş gecikme ve iptal tazminatı | AirHelp (%25 + KDV vb. [Arama özeti]) | AirHelp'in Türkçe hizmeti, ucusiptali.com; dava aşaması avukat işi | **Elendi:** Karşılanmış; avukatlık tekeli |
| 13 | AB'ye satan Türk e-ihracatçının ürün güvenliği temsilcisi (GPSR) ve ambalaj kaydı (EPR/LUCID) | Temsilci hizmeti yıllık 150 €'dan 800 $'a kadar [Arama özeti] | yetkilitemsilci.com, StartSmart, Export Partners, Yalmans vb. | **Elendi:** Fiyatlar çok düşük (metalaşmış); AB'de şirket şartı nedeniyle biz ancak aracı olabiliriz |
| 14 | Müşteri firmanın konkordato ilan etmesi | Red Flag Alert 200 £/ay'dan [Arama özeti] | konkordata.com, konkordatoilanlari.com, konkordato.web.tr, Findeks | **Elendi:** İlan verisi kamuya açık; çok sayıda takip sitesi var |
| 15 | Eczanede SGK reçete kesintisi | Eczane fatura mutabakat hizmetleri | EczAILabs, EczaneRapor, EczaRK | **Elendi:** Yapay zekâ destekli yerli araçlar var |
| 16 | Spor okulu ve kurs aidat tahsilatı | Jackrabbit, ClassForKids | Lumo (otomatik kart çekimi), Mobil Sporcu, Hilspot, SporPilot vb. | **Elendi:** Kalabalık; sıradan üyelik uygulamasına yakın |
| 17 | Restoranda HACCP ve sıcaklık kayıtları | Jolt, FoodDocs | SKT Takip, Kilardar, Simpra, kalite yönetim yazılımları | **Elendi:** Küçük işletmede ödeme isteği kanıtı yok |
| 18 | AB'ye çelik/alüminyum ihraç eden KOBİ'nin karbon sınır vergisi (SKDM/CBAM) verisi | SKDM yazılımları; yerli danışmanlık 25–200 bin TL [Arama özeti] | CASEM, Green Carbon AI, Alaz Karbon vb. | **Elendi:** Danışmanlık pazarı oluşmuş. Yıllık 50 tonun altındaki AB ithalatçıları muaf (AB, 20.10.2025 [Arama özeti]). Tesis ziyareti ve uzmanlık gerekir |
| 19 | Arabulucuların dosya ve tutanak yönetimi | Arabuluculuk yazılımları | ArabulucuOfis, ArabulucuPro, Arca, Arabulucu Asistanı (6.000 TL/yıl) | **Elendi:** Karşılanmış |
| 20 | Özel sağlık sigortası red kararlarına itiraz | ABD'de itiraz dilekçesi hazırlayan girişimler | Sigorta Tahkim Komisyonu: online başvuru, ücret 600 TL'den başlıyor [Arama özeti] | **Elendi:** Ucuz resmî yol var; temsil avukat işi |
| 21 | Vardiya, puantaj ve fazla mesai hesabı | 7shifts, Deputy, Homebase | Teamshift, ikai, Mobofis, pdksweb, Patron PDKS, POS modülleri | **Elendi (ayrı fikir olarak):** Kalabalık. Dava riski boyutu Aday 2'de ele alındı |

Ayrıntılı kaynak notları: [`evidence/notlar/elenenler.md`](evidence/notlar/elenenler.md)

**Bu listeden çıkan genel ders [Çıkarım]:** Türkiye'de KOBİ yazılımı tarafı çok kalabalık; neredeyse her yurt dışı yazılımın birden fazla yerli karşılığı var. Boşluklar daha çok iki yerde görülüyor:
- Yeni mevzuatın getirdiği ve henüz oturmamış yükümlülükler (Aday 1).
- Uzmanlık ve güven isteyen, avukat veya muhasebeci tekelinin kenarında kalan işler (Aday 2 ve 4).

---

## 3. En güçlü 5 adayın karşılaştırması

**Puanlar benim öznel değerlendirmemdir.** 1 = zayıf, 5 = güçlü. "Operasyon yükü" satırında 5 = hafif.

| Ölçüt | Aday 1: Restoran menü uyumu + maliyet | Aday 2: İşveren belge ve süreç düzeni | Aday 3: Yurt dışı hisse vergi raporu | Aday 4: E-ihracat KDV iade dosyası | Aday 5: Paketli gıda etiketi |
|---|---|---|---|---|---|
| Sorunun önemi ve sıklığı | 4 | **5** | 3 | 3 | 3 |
| Ödeme isteğine dair kanıt | 3 | 3 | 2 | 3 | 2 |
| İlk müşteriye erişim | **4** | 2 | 3 | 2 | 3 |
| Tekrar satın alma | 2 | **4** | 3 | **4** | 2 |
| Türkiye'de rekabet ve farklılaşma | 2 | 3 | 2 | 2 | 2 |
| İki kişiyle uygulanabilirlik | 4 | 2 | **5** | 2 | 3 |
| Operasyon yükü (5 = hafif) | 3 | 3 | **5** | 3 | 3 |
| Birim ekonomi | 3 | 3 | 3 | 3 | 2 |
| Kanıt kalitesi | **5** | 4 | 3 | 2 | 3 |
| **Toplam (45 üzerinden)** | **30** | **29** | **29** | **24** | **23** |

**Puanların gerekçesi:**
- **Aday 1:**
  - Son tarih resmî belgeden doğrulandı.
  - Yurt dışında aynı iş için para ödeniyor.
  - Türkiye'de restoranlar menü yazılımına zaten para ödüyor (yıllık 5.000–25.000 TL).
  - Ancak tekrar eden gelir zayıf; yapay zekâ tahmini sunan ucuz rakipler var.
- **Aday 2:**
  - Problem ve yurt dışı ödeme kanıtı en güçlü olan aday.
  - Müşteriye ulaşma yavaş ve iki kurucunun hukuki itibarı sınırlı. Bu yüzden düşük puan aldı.
- **Aday 3:**
  - Yapımı ve işletmesi en kolay olan aday.
  - Ücretsiz rakip ve platform riski yüzünden ödeme ve rekabet puanı düşük.
- **Aday 4 ve 5:** Hem ödeme isteği hem pazar büyüklüğü kanıtı zayıf.

**Aday 1–3 arasındaki fark 1 puan.** Bu fark, sıralamanın kesin olmadığını gösteriyor. Aday 1'i öne koyan nitel gerekçeler 6. bölümde.

---

## 4. Beş adayın ayrıntılı kartları

### Aday 1 — Restoran ve kafeler için menü bilgilendirme uyumu + reçete maliyeti

**Ne satılır:** Restoranın menüsündeki her ürün için:
- bileşen listesi,
- 14 alerjenin işaretlenmesi,
- alkol ve domuz kaynaklı bileşen işareti,
- porsiyon başına kalori değeri.

Bunlar basılı menüye, QR menüye ve yemek sipariş platformlarına konacak biçimde teslim edilir. Aynı reçete ve gramaj verisinden her ürünün **maliyeti** hesaplanır. Menü değiştikçe güncelleme ve aylık maliyet raporu abonelik olarak sunulur.

**Mevzuat dayanağı [Resmî]** — Tarım ve Orman Bakanlığı, Türk Gıda Kodeksi Etiketleme Yönetmeliği Kılavuzu, Rev. 002, 10.03.2026 ([alıntı](evidence/alintilar/tgk_kilavuz_toplu_tuketim.txt), [PDF](evidence/belgeler/tarim_tgk_etiketleme_kilavuzu_rev002_2026-03-10.pdf)):

- **Md. 41.3:** "Gıda işletmecisi tarafından, toplu tüketim yerlerinde tüketiciye sunulan gıdaların içeriğinde yer alan bileşenlere ve enerji değerine ilişkin tüketiciye bilgilendirme yapılması zorunludur."
- **Md. 41.5:** Alerjen, alkol ve domuz kaynaklı bileşenler vurgulanarak gösterilmeli. Alerjen bildiriminde 14 alerjen esas alınır (md. 20).
- **Md. 43.5:** Online sipariş gibi mesafeli satışlarda bileşen ve enerji bilgisi satın alma aşamasında verilmeli.
- **Md. 47 — uyum tarihleri:**
  - Ulusal zincirler: 01.07.2026
  - Aynı ilde 3 ve daha fazla şubesi olanlar: 31.12.2026
  - Diğer tüm toplu tüketim yerleri: bileşen bilgisi 31.12.2026, kalori bilgisi 31.12.2027
- **Kalori hesabı:** Kılavuzdaki örnekte porsiyon başına toplam kalori, TÜRKOMP ortalama değerleriyle hesaplanıyor (örnek et yemeği: 353,5 g = 312 kcal).

**Kılavuzun bağlayıcılığı:**
- Ankara Ticaret Odası'nın duyurusuna göre 6 Nisan 2024 yönetmelik değişikliğiyle işletmeler kılavuz hükümlerine de uymakla yükümlü kılındı ([alıntı](evidence/alintilar/ato_gida_etiket_duyurusu_2026-04.txt)). Yönetmelik metninin kendisi ayrıca okunmadı.
- Ceza tutarı doğrulanamadı. Karmalt'ın yazısına göre 5996 sayılı Kanun md. 40'taki taban tutarlar (2.000 TL, tekrarında 10.000 TL; beyan-içerik uyumsuzluğunda 5.000 TL) her yıl yeniden değerleme oranıyla artıyor. 2026 tutarı teyit edilmedi.

| Başlık | Bulgular |
|---|---|
| **Sorunu yaşayan** | Kayıtlı 158.725 yeme-içme işyeri; 913.782 kayıtlı çalışan (TEPAV, Ağustos 2026, 2025 verisi) [Resmî; [alıntı](evidence/alintilar/tepav_yeme_icme.txt)]. Okul, hastane ve fabrika yemekhaneleri de "toplu tüketim yeri" tanımına giriyor. |
| **Ödeyen** | İşletme sahibi. Zincirlerde merkez. |
| **Satın almaya yönelten olay** | 31.12.2026 son tarihi; Tarım il müdürlüğü denetimi (zincirlerde başladığı haberleri var [Arama özeti]); QR menü firmasının içerik istemesi; yemek sipariş platformlarının satın alma aşamasında bilgi istemesi. Platformların fiilen bu alanı zorunlu tutup tutmadığı bulunamadı. Menü değişikliği ve zam dönemleri. |
| **Bugünkü çözüm ve maliyeti** | (a) Hiçbir şey yapmamak. (b) QR menü firmasının yapay zekâ "tahmini": İrensoft tüm özellikler dahil 5.000 TL + KDV/yıl [Şirket iddiası]. (c) Diyetisyen veya gıda mühendisine yaptırmak (fiyat bulunamadı). (d) TÜRKOMP sitesinden elle hesap. 60 ürünlük menüde çok zaman alır [Çıkarım]. (e) Bakanlığın örnek alerjen afişi (ücretsiz). |
| **Neden değişmeye değer** | Tahmin değil, işletmenin kendi reçete ve gramajına dayalı, kaynağı belgelenmiş hesap. 14 alerjenin bileşen bazında kontrolü. Bir kez toplanan reçete verisiyle hem 2026 bileşen hem 2027 kalori yükümlülüğü karşılanır; üstüne ürün maliyeti ve kâr marjı görünür. Restoranın yapacağı tek iş reçeteyi WhatsApp'tan göndermek [Çıkarım]. |
| **Yurt dışı örnekler** | **MenuCalc** (ABD): 30,66 / 51,91 / 74,83 $/ay ≈ 1.503–3.669 TL [Arama özeti; resmî fiyat sayfasında fiyat görünmedi]. "30.000+ restoran lokasyonu" [Şirket iddiası; arama özeti]. **Nutritics** (İrlanda): fiyat yayımlamıyor; Capterra UK'de "21 $/ay'dan" [Bağımsız yorum sitesi]. **Ürün başı veri tabanı analizi:** 25–100 $ (≈1.226–4.903 TL); laboratuvar analizi ürün başı 650 $ [Arama özeti]. **Not:** İngiltere'de Gıda Standartları Ajansı ücretsiz MenuCal aracını sunuyor [Resmî]. Yani yurt dışında da devletin ücretsiz alternatifi var. |
| **Kullanıcı yorumları** | Nutritics, Capterra UK: 3,8/5 (25 yorum). Beğenilen: veri tabanı, raporlar. Şikâyet: "Buggy, horrendously slow, old-fashioned software that frequently crashes" (2 Temmuz 2025) [Bağımsız yorum]. MenuCalc için olumlu yönler (büyük veri tabanı) ve özelleştirme eksikliği arama özetinde geçiyor [Arama özeti]. |
| **Türkiye: doğrudan rakipler** | Yapay zekâ ile kalori/alerjen tahmini sunan QR menü firmaları (İrensoft); menü danışmanları (Nutrist, Umami F&B, Armut'taki danışmanlar). |
| **Türkiye: dolaylı rakipler** | Düzenlemeyi pazarlayan QR menü ve POS firmaları: finedinemenu, tabpadmenu, monu, diyarmenu, lokmenu, kobiqr, karekod360, ticarethub, promenu, 3E Yazılım (6.990–25.000 TL/yıl [Arama özeti]). Gıda mühendisliği büroları. |
| **Türkiye: ücretsiz alternatifler** | TÜRKOMP web araması (ticari kullanım ücretli); Bakanlık örnek afişi; işletmenin kendi hesabı. |
| **İki kişiyle ilk sürüm** | Yazılım yazmadan: reçete toplama formu (WhatsApp veya Google Form), hesap tablosu, PDF + CSV teslim. Veri: paketli bileşenlerin etiket değerleri, gerekiyorsa lisanslı TÜRKOMP. Bir gıda mühendisi veya diyetisyenin örneklem kontrolü. 2027 kalorisi aynı dosyada hazır teslim edilir. |
| **İlk 10 müşteri için kanal** | (1) İki ilçede yürüyerek ve telefonla bağımsız restoran ve kafeler. Google Haritalar listeleri. (2) QR menü ve POS firmaları: içerik ortağı ya da beyaz etiket (kendi markalarıyla satma) modeli. (3) Restoran müşterisi olan muhasebeciler. (4) Esnaf ve ticaret odaları: ATO duyuru yayınlamış; seminer kanalı olabilir. |
| **Kurulum, destek ve operasyon yükü** | 40 ürünlük menü için yaklaşık 8 saat teslim + 4 saat satış [Varsayım; ilk teslimatlarda ölçülmeli]. Güncelleme ürün başı 15–30 dakika [Varsayım]. Destek WhatsApp üzerinden. En büyük operasyon riski: işletmede standart reçete ve gramaj olmaması [Çıkarım]. |
| **Hukuki ve entegrasyon engelleri** | (1) TÜRKOMP verisinin yazılımda veya internet sitesinde ticari kullanımı yıllık ücretli. 2026 bedelleri (KDV hariç): 1 gıda 3.052 TL; 26–100 gıda 75.902 TL; tüm 645 gıda 176.065 TL [Resmî; [alıntı](evidence/alintilar/turkomp_veri_kullanim_kosullari.txt)]. (2) Yanlış bilgi verilirse sorumluluk gıda işletmecisinde (kılavuz md. 42). Sözleşmede bizim sorumluluğumuz ve hesap yöntemi açık yazılmalı. Mesleki sorumluluk sigortası araştırılmalı. (3) QR menü ve POS sistemlerine aktarım CSV ile mümkün görünüyor; doğrulanmadı. |
| **Başarısız olmasının en güçlü 3 nedeni** | (1) Yapay zekâ tahmini sunan ucuz QR menüler restoranlar için "yeterli" görülür ve fiyat çöker. (2) Denetim gevşek kalır veya süre ertelenir, aciliyet kaybolur. Türkiye'de yükümlülük tarihlerinin ertelendiği örnekler bilinir; bu düzenleme için bir erteleme haberi bulunamadı. (3) Gelir tek seferlik kalır; maliyet takibi aboneliği satılamazsa iş 31.12.2026 sonrası küçülür. |

Kaynak notu: [`evidence/notlar/restoran_menu_uyum.md`](evidence/notlar/restoran_menu_uyum.md)

### Aday 2 — İşverenler için iş davalarına karşı belge ve süreç düzeni

**Ne satılır:** 5–50 çalışanlı işletmeye şunlar kurulur ve her ay işletilir:
- iş sözleşmeleri ve yıllık fazla çalışma onayları,
- aylık bordro ve puantaja çalışan imzası toplama,
- yıllık izin kayıtları,
- işten çıkış dosyası (fesih bildirimi, kıdem/ihbar/izin hesabı kontrolü, doğru SGK çıkış kodu),
- hatırlatmalar.

Hukuki soru çıkarsa işletme bağımsız bir avukata yönlendirilir. Hukuki danışmanlık verilmez.

| Başlık | Bulgular |
|---|---|
| **Sorunu yaşayan** | Küçük işverenler. 0–50 çalışanlı 2.176.121 işyeri; bunlar toplam işyerlerinin %98,1'i ve sigortalıların %57,4'ü (SGK verisi, Ocak 2025, TİSK bülteni) [Resmî; [alıntı](evidence/alintilar/sgk_isyeri_sayisi_ocak2025.txt)]. Yüksek devirli sektörler (yeme-içme 913.782 çalışan) öncelikli [Çıkarım]. |
| **Sorunun büyüklüğü** | İş uyuşmazlığı arabuluculuk dosyası: 2019'da 552.168 → 2024'te 1.041.842. 2024'te 694.052 dosyada anlaşma sağlandı. Tüm arabuluculuk dosyalarının %59,6'sı iş uyuşmazlığı (Adalet İstatistikleri 2024, Tablo 46) [Resmî; [alıntı](evidence/alintilar/adalet_istatistikleri_2024_tablo46.txt)]. Yargıtay uygulamasına göre imzalı ve ihtirazi kayıtsız bordro fazla mesai ödemesinin kesin delili. Bordro imzasızsa işçi tanıkla ispat edebiliyor [Arama özeti; avukat yazıları]. |
| **Ödeyen** | İşveren. |
| **Satın almaya yönelten olay** | Arabulucu davet mektubu gelmesi; bir çalışanın ayrılması; SGK veya iş müfettişi denetimi; daha önce kaybedilmiş ya da uzlaşmayla ödenmiş bir dava; muhasebecinin uyarısı. |
| **Bugünkü çözüm ve maliyeti** | Bordroyu muhasebeci hazırlıyor, imza takibi çoğunlukla işverende kalıyor [Çıkarım]. Dava çıkınca avukata gidiliyor. 2026 avukatlık asgari ücretleri [Resmî; [alıntı](evidence/alintilar/aaut_2026.txt)]: büroda ilk saat danışma 4.000 TL; arabuluculukta anlaşma olmazsa taraf vekili 8.000 TL; asliye mahkemesinde dava 45.000 TL; sürekli sözleşmeli avukat ayda en az 33.000 TL. Bunlara uzlaşma veya hüküm tutarı eklenir. |
| **Neden değişmeye değer** | Davayı belirleyen şey belge. Aylık imza döngüsü ve çıkış dosyası düzenli işletilirse olası alacak ve avukat maliyeti düşer [Çıkarım]. Avukatın 33.000 TL'lik aylık asgari ücretinin çok altında, belge ve süreç odaklı bir hizmet olabilir. |
| **Yurt dışı örnekler** | **Peninsula Business Services Group** (İngiltere): 31.03.2025'te biten yılda gelir 463,2 milyon £, 150.000'den fazla müşteri [Resmî — denetlenmiş hesaplar; [alıntı](evidence/alintilar/peninsula_fy25.txt)]. Müşteri başına yıllık ortalama ≈ 3.088 £ (≈ 16.700 TL/ay) [Çıkarım; grup tüm hizmetleri kapsar]. **BrightHR** (aynı grup): İngiltere'de çalışan başına aylık 16,67 £'dan (≈1.083 TL), 5 çalışan minimum [Arama özeti]. **Employsure** (Avustralya): 2021 mali yılında 23.500'den fazla müşteri [Resmî — ACCC açıklaması]. |
| **Kullanıcı yorumları** | **BrightHR**, Trustpilot 4,7/5 (6.612 yorum). Olumsuz: "I have been paying around £180 every month for the last two years, despite the fact that I no longer use the service" (28.09.2026); "Using BrightHR has not reduced the time I spend on HR" (21.05.2026). **Peninsula**, Trustpilot 4,9/5 (23.739 yorum): karmaşık davalarda gecikme şikâyetleri [Bağımsız yorum]. Kanada BBB'de son 3 yılda 21 şikâyet [Bağımsız yorum]. 5 yıllık otomatik yenileme şikâyetleri [Arama özeti]. **Employsure**, devlet kurumu izlenimi veren Google reklamları için 3 milyon AUD cezaya çarptırıldı [Resmî]. Bu modelin kötü satış uygulamalarına yatkın olduğunu gösteriyor. |
| **Türkiye: doğrudan rakipler** | İş hukuku avukatlık büroları (önleyici danışmanlık; fiyat yayımlamıyorlar); iş ve sosyal güvenlik danışmanlık firmaları (Consulta, Mehmet Koçak Danışmanlık, CMB Global, VIP Danışmanlık, Efor OSGB). |
| **Türkiye: dolaylı rakipler** | İK yazılımları: Kolay İK (Şikâyetvar'da 3 şikâyet [Arama özeti]), Mobofis. e-Bordro ve onay araçları: BordromCepte, MorePayroll, Matech (KEP ile), Kamutech, EDM. Personel devam kontrol sistemleri (Patron PDKS, pdksweb). Muhasebeciler. |
| **Türkiye: ücretsiz alternatifler** | İSMMMO'nun işçi özlük dosyası e-kitabı; ALO 170; avukat blogları; hesaplama araçları. |
| **İki kişiyle ilk sürüm** | Bir avukata asgari ücret tarifesiyle hazırlatılmış şablon seti. Kontrol listesi. Mevcut bir e-bordro onay aracı veya ıslak imza takibi. Aylık hatırlatma ve çıkış dosyası. Ekipte iş hukuku veya İK geçmişi olan biri olmazsa itibar ve kalite riski yüksek [Çıkarım]. |
| **İlk 10 müşteri için kanal** | Muhasebeciler (aktif serbest çalışan SM/SMMM sayısı 59.958 [Bir YMM'nin TÜRMOB verisine dayanan yazısı]). Restoran ve perakende esnaf odaları. Kişisel ağ. Kamuya açık bir tetikleyici liste yok: arabulucu daveti alan işverenler bilinemez. |
| **Kurulum, destek ve operasyon yükü** | Kurulum 10–14 saat; ayda 2–3 saat/10 çalışan; her işten çıkış 2–4 saat [Varsayım]. Müşteri başına satış süresi uzun (≈20 saat [Varsayım]). |
| **Hukuki ve entegrasyon engelleri** | (1) Hukuki danışmanlık avukatlara ait (Avukatlık Kanunu md. 35). Hizmet "belge ve süreç" ile sınırlı kalmalı. (2) Avukatlarla komisyon paylaşımı ve iş getirme meslek kurallarına takılabilir; teyit edilmeli [Çıkarım]. (3) Bordro hazırlamak muhasebeci işi (3568 sayılı Kanun); biz yalnızca imza ve arşiv süreciyle ilgilenmeliyiz [Çıkarım]. (4) Çalışan verileri KVKK kapsamında; veri işleyen sözleşmesi gerekir. (5) SMS veya basit onay ile alınan e-bordro onayının, ıslak imzalı bordroyla aynı delil gücünü taşıyıp taşımadığı net değil. Güvenli e-imza ise ıslak imzaya eşit [Arama özeti]. |
| **Başarısız olmasının en güçlü 3 nedeni** | (1) KOBİ önleme için ödemez; dava olunca avukata gider. (2) Kayıt dışı ve elden ücret pratiği: doğru kayıt işverenin işine gelmeyebilir. TÜİK Temmuz 2026'da kayıt dışılık %24,6, tarım dışında %15,9 [Arama özeti]; elden ödenen ücret bu orana dahil değil. (3) Avukatlık tekeli ve itibar sorunu; e-bordro ve İK yazılımları "imza toplama" özelliğini zaten sunuyor. |

Kaynak notu: [`evidence/notlar/isveren_is_hukuku.md`](evidence/notlar/isveren_is_hukuku.md)

### Aday 3 — Yurt dışı hisse ve ETF kazançları için beyan hesaplama raporu

**Ne satılır:** Kullanıcı Midas, IBKR veya Trading 212 ekstresini yükler. Rapor, işlem tarihindeki TCMB kuruyla TL çevrimini, ilk alınan ilk satılır (FIFO) eşleştirmesini, Yİ-ÜFE endekslemesini ve temettü/mahsup kalemlerini hesaplar. Kullanıcı Hazır Beyan'a girilecek rakamları adım adım içeren bir PDF alır. İsteyen kullanıcı ayrıca anlaşmalı bir mali müşavire yönlendirilir.

| Başlık | Bulgular |
|---|---|
| **Sorunu yaşayan** | Yurt dışı hisse alıp satan tam mükellef bireyler. Yurt dışı hisse alım-satım kazancında istisna yok; tutar ne olursa olsun beyan gerekiyor [Arama özeti; Midas ve aracı kurum rehberleri]. Midas "4 milyonu aşkın kullanıcı" diyor [Şirket iddiası; arama özeti]. Kaç kişinin yurt dışı hisse kazancı beyan ettiği bilinmiyor. GİB, 2025 gelirleri için Hazır Beyan'dan 2,558 milyon beyanname alındığını açıkladı; bu rakamın yurt dışı hisse kırılımı yok [Haber, AA 12.04.2026]. |
| **Ödeyen** | Yatırımcının kendisi. |
| **Satın almaya yönelten olay** | Mart ayındaki beyan dönemi; vergi dairesinden yazı gelmesi; yanlış beyan korkusu. |
| **Bugünkü çözüm ve maliyeti** | Midas yalnızca Hazır Beyan'ı nasıl dolduracağını anlatıyor; kur, Yİ-ÜFE ve FIFO hesabını kullanıcı yapıyor (Midas destek sayfası, 29.09.2026 güncel). Seçenekler: Excel; ücretsiz araçlar; mali müşavir (yıllık beyanname 475–1.425 TL [Arama özeti; tarife niteliği doğrulanmadı]). |
| **Neden değişmeye değer** | Hata riskini ve zamanı azaltır. Ücretsiz araçlardan güven (kaynak gösterimi, denetim izi) ve muhasebeci kontrolü seçeneğiyle ayrışabilir [Çıkarım]. |
| **Yurt dışı örnekler** | **Koinly** (kripto vergi raporu): vergi yılı başına 49 / 99 / 199 $ ≈ 2.403–9.758 TL [Arama özeti]. **Sharesight** vergi paketi (Avustralya): yıllık 59 $ ≈ 2.893 TL [Arama özeti]. |
| **Kullanıcı yorumları** | Koinly, Trustpilot 4,5/5 (2.362 yorum). Beğenilen: kolay bağlantı, net rapor. Şikâyet: "The AI Chat bot is typically useless when you want help" (03.09.2026); "Managing three separate sign-ins and paying full price for each is frustrating" (25.09.2026) [Bağımsız yorum]. |
| **Türkiye: doğrudan rakipler** | KolayBeyan: 10 $/ay veya 60 $/yıl (≈2.942 TL); IBKR, Midas ve Trading 212 dosyalarını tanıdığını söylüyor [Şirket iddiası]. hissevergibeyan.com (fiyat görülemedi). |
| **Türkiye: ücretsiz alternatifler** | VergiHemen (0 TL [Arama özeti]); pratikhesaplama.com; vergimerkezi.com.tr rehberleri. |
| **Türkiye: dolaylı rakipler** | Mali müşavirler. Platform riski: Midas veya bir aracı kurum bu hesabı ücretsiz eklerse pazar kapanır [Çıkarım]. |
| **İki kişiyle ilk sürüm** | Web uygulaması: CSV yükleme → hesap → PDF. Veri kaynakları ücretsiz: TCMB kurları, TÜİK Yİ-ÜFE. 6–10 haftalık geliştirme [Varsayım]. |
| **İlk 10 müşteri için kanal** | Yatırımcı toplulukları (X, Telegram, YouTube finans içerikleri); kişisel ağ; Şubat–Mart döneminde arama motoru trafiği. |
| **Kurulum, destek ve operasyon yükü** | Düşük. Destek Mart ayında yoğunlaşır. Asıl yük hesap motorunun doğruluğunu sürdürmek; mevzuat her yıl değişebilir. |
| **Hukuki ve entegrasyon engelleri** | Vergi danışmanlığı mali müşavir ve YMM işi (3568). Ürün "hesaplama aracı" olarak konumlanmalı. Hatalı hesap sorumluluğu ve itibar riski var. Finansal veriler KVKK kapsamında. Aracı kurum dosya formatları değişebilir. |
| **Başarısız olmasının en güçlü 3 nedeni** | (1) Ücretsiz ve ucuz yerli araçlar fiyatı sıfıra çeker. (2) Midas veya aracı kurumlar özelliği kendileri ekler. (3) Gelir yılda 6–8 haftaya sıkışır; güven kazanmak zaman alır. |

Kaynak notu: [`evidence/notlar/yurtdisi_hisse_vergi.md`](evidence/notlar/yurtdisi_hisse_vergi.md)

### Aday 4 — E-ihracatçılar (ETGB) için KDV iade dosyası hazırlığı

| Başlık | Bulgular |
|---|---|
| **Sorunu yaşayan ve ödeyen** | Etsy, Amazon veya kendi sitesinden mikro ihracat yapan KOBİ (ödeyen de kendisi). Sayıları bulunamadı. |
| **Satın almaya yönelten olay** | ETGB'li satışların birikmesi. Kargo "numune" veya "bireysel gönderi" olarak çıktığı, ETGB kapanmadığı ya da DAB/SWIFT belgesi olmadığı için iadenin reddedilmesi [Arama özeti]. |
| **Bugünkü çözüm** | Mali müşavir veya iade hiç istenmiyor. Mal ihracatından mahsuben iade tutar sınırı olmadan, nakden iade 50.000 TL'ye kadar teminatsız ve raporsuz yapılıyor [Arama özeti]. |
| **Yurt dışı benzer** | VAT IT gibi firmalar yabancı KDV iadesini başarıya bağlı ücretle alıyor; sektörde %15–30 [Arama özeti]. Birebir aynı iş değil. |
| **Türkiye'de rakipler** | E-ihracata odaklı mali müşavirler; ikas, mukellef.co, wionsoft içerikleri. |
| **İki kişiyle ilk sürüm** | Belge kontrol listesi ve ETGB–fatura–ödeme eşleştirme tablosu; dosya mali müşavire teslim edilir. |
| **İlk 10 müşteri** | E-ihracat toplulukları, Etsy satıcı grupları, kargo firmalarının e-ihracat ekipleri. |
| **Operasyon** | Aylık eşleştirme; ayda 2–4 saat [Varsayım]. |
| **Hukuki engel** | KDV iade talebi ve beyan işleri mali müşavir veya YMM işi (3568) [Çıkarım; teyit edilmeli]. Ekipte ruhsatlı mali müşavir yoksa ancak "dosya hazırlayan" konumunda kalınır. |
| **Başarısız olmasının 3 nedeni** | (1) Alınmayan iade tutarının büyüklüğü bilinmiyor; mikro satıcıda tutar küçük olabilir. (2) Muhasebeciler bu işi zaten yapıyor. (3) Ruhsat engeli. |

Kaynak notu: [`evidence/notlar/eihracat_kdv_iadesi.md`](evidence/notlar/eihracat_kdv_iadesi.md)

### Aday 5 — Küçük paketli gıda üreticileri için etiket ve besin değeri uyumu

| Başlık | Bulgular |
|---|---|
| **Sorunu yaşayan ve ödeyen** | Bal, reçel, baharat, unlu mamul gibi paketli ürün çıkaran küçük üretici (ödeyen de kendisi). Hazır ambalajlı gıdada 100 g/ml başına enerji ve 6 besin öğesi zorunlu [Resmî; kılavuz md. 28]. |
| **Satın almaya yönelten olay** | Yeni ürün çıkarmak; ambalaj baskısı; pazaryerinde listeleme; denetim. 2024 yönetmelik değişikliklerine uyum süresi 31.12.2026'da doluyor [Resmî; ATO duyurusu]. |
| **Bugünkü çözüm ve maliyeti** | Laboratuvar: Gıda Kontrol Laboratuvarı ücret listelerinde parametre başı yaklaşık 314–1.600 TL [Arama özeti]. Ayrıca gıda mühendisi danışmanlığı, BeBiS ya da TÜRKOMP ile hesap. |
| **Yurt dışı örnek** | ReciPal: tarif başı 29 $; aylık 59 $ ve 129 $; "No commitment, cancel anytime" [Şirket iddiası]. |
| **Türkiye'de rakipler** | Laboratuvarlar, Karmalt, Sigmacert, TEKLYNX, BeBiS. |
| **İki kişiyle ilk sürüm** | Hesap tablosu ve etiket metni şablonu; gıda mühendisi kontrolü. |
| **İlk 10 müşteri** | Pazaryerlerindeki küçük gıda satıcıları; yerel üretici kooperatifleri. |
| **Operasyon** | Ürün başı 1–2 saat [Varsayım]. |
| **Hukuki engel** | Etiketten gıda işletmecisi sorumlu. TÜRKOMP verisi etikette kullanılırsa bir defalık ücret alınıyor [Resmî]. |
| **Başarısız olmasının 3 nedeni** | (1) İhtiyaç sık doğmuyor (ürün başına bir kez). (2) Laboratuvar ve danışman ucuz ve güvenilir algılanıyor. (3) Hata durumunda itibar riski. |
| **Not** | Aday 1 ile aynı uzmanlığı ve aracı kullanır. Aday 1 tutarsa yan ürün olabilir. |

Kaynak notu: [`evidence/notlar/paketli_gida_etiket.md`](evidence/notlar/paketli_gida_etiket.md)

---

## 5. İlk 3 adayın ekonomisi

### 5.1 Ortak varsayımlar

| Kalem | Tutar | Kaynak ve etiket |
|---|---|---|
| Muhasebe | 3.593 TL/ay | Önceki rapordaki 2026 kaynağı [Arama özeti] |
| Bağ-Kur (şahıs şirketi sahibi tek kurucu, en düşük basamak) | 10.156,73 TL/ay | Önceki rapordaki 2026 kaynağı [Arama özeti] |
| **Sabit taban** | **13.750 TL/ay** | Toplam |
| Kurucu emeğinin fırsat maliyeti | 2 × 28.075 TL net asgari ücret = **56.150 TL/ay** | 2026 net asgari ücret [Arama özeti]. Kâr hem bu tutar düşülmeden hem düşüldükten sonra gösterildi. |
| KDV | Fiyatlara KDV dahil değil. Alınan KDV ciroya eklenmedi; ödenen KDV indirilebilir varsayıldı. | [Varsayım] |
| Fiyatlar | Tümü **test edilecek varsayımdır**. Pazar verisi değildir. Yanlarında karşılaştırma çıpaları verildi. | [Varsayım] |

Satış adetleri **varsayımdır**. Bu tablolar gerçekçi gelir tahmini değil, hangi satış hızında işin ayakta kalacağını gösteren hesaplardır.

### 5.2 Aday 1 — Restoran menü uyumu + maliyet

**Fiyat varsayımları:**
- Menü uyum dosyası: 40 ürüne kadar 4.900 TL; 41–80 ürün 7.900 TL. Ortalama 5.900 TL varsayıldı.
- Uyum + maliyet aboneliği: 990 TL/ay.

**Fiyat çıpaları:**
- İrensoft QR menü: 5.000 TL + KDV/yıl (yapay zekâ tahmini dahil).
- Restoran yazılımları: 583–1.000 TL/ay; 3E Yazılım 6.990–25.000 TL/yıl.
- MenuCalc ≈ 1.503–3.669 TL/ay.
- Yurt dışında ürün başı analiz ≈ 1.226–4.903 TL.

**Birim ekonomi:**

| Kalem | Tutar |
|---|---|
| İade (ücret iadesi) payı | %5 [Varsayım] |
| Kurulum başına değişken gider | 1.327 TL: dış uzman kontrolü 1.000 TL + ödeme komisyonu %3 + baskı, afiş ve yol 150 TL [Varsayım] |
| Kurulum başına katkı payı | **4.278 TL** |
| Abonelik başına aylık katkı | **960 TL** |
| Aylık sabit gider | **24.075 TL**: taban 13.750 + TÜRKOMP 26–100 gıda lisansı (75.902 TL ÷ 12 = 6.325) + yazılım ve barındırma 1.000 + saha ve tanıtım 3.000 |
| Ücretsiz ön çalışma | Her aday müşteriye 3 ürünlük örnek. Satış süresinin içinde sayıldı (müşteri başına 4 saat). |
| Teslim süresi | Kurulum başına 8 saat [Varsayım] |

**Başabaş noktası:**

| Ölçü | Kurucu maaşı hariç | Net asgari ücret dahil |
|---|---|---|
| Ayda gereken kurulum | 5,6 | 18,8 |
| Yalnız abonelikle gereken abone | 25 | 84 |

**Senaryolar (Ekim–Aralık 2026; son tarih öncesi 3 ay):**

| Senaryo | Kurulum (Eki/Kas/Ara) | Aboneliğe geçiş | Ciro | Değişken gider | Sabit gider (3 ay) | Kâr (kurucu emeği hariç) | Kâr (kurucu emeği dahil) | İş yükü |
|---|---|---|---|---|---|---|---|---|
| Kötümser | 2 / 4 / 6 = 12 | %10 | 68.250 TL | 15.954 TL | 72.225 TL | **−19.928 TL** | −188.378 TL | ~145 saat |
| Orta | 5 / 10 / 15 = 30 | %20 (yıl sonunda 6 abone) | 172.110 TL | 39.929 TL | 72.225 TL | **+59.957 TL** | −108.493 TL | ~364 saat |
| İyimser | 10 / 20 / 25 = 55 | %30 (yıl sonunda 16 abone) | 320.155 TL | 73.341 TL | 72.225 TL | **+174.589 TL** | +6.139 TL | ~672 saat (≈224 saat/ay; iki kişinin kapasitesine yakın) |

**Yorum:**
- Bu iş en iyi ihtimalle **3 aylık yoğun bir proje gibi** para kazandırıyor.
- 31.12.2026'dan sonra bileşen talebi düşer. 31.12.2027 kalori tarihi ikinci dalga yaratabilir; ancak biz kaloriyi ilk teslimatta verirsek bu dalga bizim için küçülür.
- Kalıcı bir şirket olması için 2027'de **en az 25 abone** (kurucu maaşı hariç başabaş) gerekir.
- TÜRKOMP lisansı test aşamasında alınmamalı; önce talep görülmeli.

### 5.3 Aday 2 — İşveren belge ve süreç düzeni

**Fiyat varsayımları:**
- Kurulum: 6.900 TL.
- Aylık hizmet: 1.490 TL (15 çalışana kadar; ortalama 10 çalışan varsayıldı).

**Fiyat çıpaları:**
- BrightHR ≈ 1.083 TL/çalışan/ay.
- Peninsula müşteri başı ortalaması ≈ 16.700 TL/ay.
- Sürekli sözleşmeli avukat asgarisi 33.000 TL/ay.

**Birim ekonomi:**

| Kalem | Tutar |
|---|---|
| Şablon seti (tek seferlik) | 48.000 TL. Avukatlık asgari ücret tarifesindeki sözleşme hazırlama (21.000 TL) ve ihtarname (6.000 TL) kalemlerinden türetildi [Varsayım]. 12 ayda amorti: 4.000 TL/ay. |
| Aylık sabit gider | **20.750 TL**: taban 13.750 + şablon amortismanı 4.000 + yazılım 1.000 + tanıtım 2.000 |
| Müşteri başına aylık değişken gider | 245 TL: e-onay altyapısı 10 çalışan × 20 TL [Varsayım] + ödeme komisyonu %3 |
| Aylık katkı | **1.245 TL** |
| Kurulum katkısı | **6.193 TL** |
| Satış süresi | Müşteri başına ≈ 20 saat [Varsayım] |
| Kurulum süresi | 12 saat; ardından ayda 2,5 saat [Varsayım] |

**Başabaş noktası:** Kurucu maaşı hariç **17 müşteri**; net asgari ücret dahil **62 müşteri**.

**Senaryolar (3 ay):**

| Senaryo | Yeni müşteri (1./2./3. ay) | Ciro | Değişken gider | Sabit gider | Kâr (kurucu emeği hariç) | Kâr (kurucu emeği dahil) | İş yükü |
|---|---|---|---|---|---|---|---|
| Kötümser | 0 / 1 / 1 = 2 | 18.270 TL | 2.148 TL | 62.249 TL | **−46.127 TL** | −214.577 TL | ~72 saat |
| Orta | 1 / 2 / 3 = 6 | 56.300 TL | 6.689 TL | 62.249 TL | **−12.638 TL** | −181.088 TL | ~217 saat |
| İyimser | 2 / 4 / 6 = 12 | 112.600 TL | 13.378 TL | 62.249 TL | **+36.973 TL** | −131.477 TL | ~434 saat |

**Yorum:** Aylık tekrar eden gelir var ama yavaş birikir. İlk 3 ay her senaryoda kurucuları geçindirmez. Avukata yaptırılacak şablon maliyeti, ilk müşteriden önce harcanması gereken bir yatırım.

### 5.4 Aday 3 — Yurt dışı hisse vergi raporu

**Fiyat varsayımları:**
- Standart rapor: 790 TL/vergi yılı.
- Kapsamlı rapor: 1.490 TL/vergi yılı.
- Ortalama 950 TL varsayıldı.

**Fiyat çıpaları:** KolayBeyan ≈ 2.942 TL/yıl; VergiHemen 0 TL; Koinly ≈ 2.403–9.758 TL.

**Birim ekonomi:**

| Kalem | Tutar |
|---|---|
| İade payı | %5 [Varsayım] |
| Ödeme komisyonu | %3,5 [Varsayım] |
| Rapor başına katkı | **869 TL** |
| Aylık sabit gider | **17.750 TL**: taban 13.750 + barındırma 1.000 + tanıtım 3.000 ortalaması |
| Geliştirme | 6–10 hafta kurucu emeği (kurucu maliyetine dahil) |

**Başabaş noktası:** Kurucu maaşı hariç **yılda 245 rapor**; net asgari ücret dahil **yılda 1.020 rapor**.

**Senaryolar (Ekim 2026–Mart 2027, 6 ay):** Satışlar Şubat–Mart 2027'de olur; Ekim–Aralık'ta gelir yok.

| Senaryo | Satılan rapor | Ciro | Değişken gider | Sabit gider (6 ay) | Kâr (kurucu emeği hariç) | Kâr (kurucu emeği dahil) |
|---|---|---|---|---|---|---|
| Kötümser | 100 | 90.250 TL | 3.325 TL | 106.498 TL | **−19.573 TL** | −356.473 TL |
| Orta | 400 | 361.000 TL | 13.300 TL | 106.498 TL | **+241.202 TL** | −95.698 TL |
| İyimser | 1.500 | 1.353.750 TL | 49.875 TL | 106.498 TL | **+1.197.377 TL** | +860.477 TL |

**Yorum:**
- Bu adayın büyüme potansiyeli en yüksek; marjinal maliyeti çok düşük bir yazılım işi.
- Ancak **satış adedine dair hiçbir kanıt yok**. Kaç kişinin bu beyanı yaptığı bilinmiyor ve ücretsiz araçlar var.
- Satış sezonu Şubat–Mart olduğu için ödeme isteği bugünden ölçülemez. Ekim'de yapılacak bir ön satış testi zayıf sinyal verir.

---

## 6. Birinci seçim: Aday 1 — ve neden

**Aday 1'i öne koyan nedenler:**

1. **Problemin kanıtı resmî ve tarihli.** Son tarihler Bakanlık kılavuzunda madde numarasıyla yazılı. Aday 2'nin problemi de resmî veriyle güçlü. Ama Aday 1'de müşteriye "bunu yapmak zorundasınız ve son tarih şu" diyebilecek bir dayanak var; Aday 2'de "ileride dava açılabilir" denebiliyor. Önleme satışı, yükümlülük satışından zordur [Çıkarım].
2. **Ödeme isteği 14 günde ölçülebilir.** Son tarih 3 ay sonra; restoranlar şimdi karar vermek zorunda. Aday 3'ün satış sezonu Şubat–Mart, Aday 2'nin satış döngüsü uzun.
3. **Ulaşmak kolay.** Restoranlar sokakta; kamuya açık listeleri var. QR menü firmaları ve odalar hazır kanallar.
4. **İki kişi ve düşük sermayeyle başlanır.** Depo, araç ve büyük ekip gerekmez. Yazılım yazmadan teslim edilebilir.
5. **Önceki e-ticaret denetimi fikrinden farkı:** O fikirde bulgular isteğe bağlı küçük düzeltmelerdi. Burada çıktı, mevzuatın istediği somut bir belge.

**Aday 1'in diğerlerinden zayıf olduğu yerler (açıkça):**
- Aday 2 daha büyük ve kalıcı bir iş olabilir; Aday 1 bir "son tarih projesine" dönüşebilir.
- Aday 3'ün büyüme potansiyeli daha yüksek.
- Aday 1'in en büyük riski, yapay zekâ tahminli ucuz QR menülerin "yeterli" görülmesi. Bu risk, e-ticaret araştırmasındaki "küçük hata için ödeme yapmama" riskine benziyor.

**Sıralama ne zaman değişir:**
- 14 günlük testte restoranlar uyuma değil maliyet takibine ilgi gösterirse → odak maliyet takibine kayar.
- Restoranlar ödemezse ama muhasebeciler işveren belge hizmetine ilgi gösterirse → Aday 2'ye geçilir. Ekibe iş hukuku veya İK geçmişi olan biri gerekir.
- Ocak 2027'de yapılacak bir ön kayıt testinde 50'den fazla kişi ödeme yaparsa → Aday 3 yeniden değerlendirilir.

---

## 7. 14 günlük doğrulama planı (Aday 1)

**Kurallar:**
- Yazılım geliştirilmez.
- TÜRKOMP lisansı alınmaz; reklam verilmez.
- Harcama; yol, isteğe bağlı birkaç sayfalık baskı ve uzmanla 1 saatlik görüşmeyle sınırlıdır.
- Görüşmeleri siz ve Ahmet yaparsınız. Bu raporu hazırlarken hiçbir işletmeyle iletişime geçilmedi.

| Gün | İş | Çıktı |
|---|---|---|
| 1–2 | **Netlik.** (a) Bir gıda mühendisi veya diyetisyenle 1 saat: kılavuz md. 41 ve 47'nin yorumu, hesap yöntemi, sorumluluk. (b) Bursa Gıda ve Yem Kontrol Merkez Araştırma Enstitüsü'ne TÜRKOMP lisans koşullarını sormak. (c) Ankara Ticaret Odası ve Lokantacılar Odası duyurularını toplamak. (d) 3 örnek yemek için bileşen listesi, 14 alerjen tablosu ve porsiyon başına kalori. Paketli bileşenlerin etiket değerleri ve hesap yöntemi gösterilir. | Örnek çıktı (PDF + CSV); tek sayfalık teklif |
| 3–4 | **Hedef listesi.** İki ilçede 80 bağımsız restoran ve kafe; 10 QR menü/POS firması; restoran müşterisi olan 5 muhasebeci; 1–2 oda. | Liste (iletişime geçilmeden) |
| 5–10 | **Görüşmeler.** En az 40 restoran (yüz yüze tercih), 5 QR menü firması, 3 muhasebeci. | Görüşme notları |
| 7–12 | **Somut teklif ve ön ödeme.** (aşağıda) | İmzalı sipariş ve ödeme |
| 13–14 | **Karar.** İlk 1–2 teslimatın gerçek süresi ölçülür. | Devam / değiştir / bırak |

**Restoranlara sorulacaklar:**
1. 31 Aralık'tan itibaren menüde bileşen ve alerjen bilgisinin zorunlu olacağını biliyor musunuz? Kimden duydunuz?
2. Menünüzde kaç ürün var? Yazılı reçete ve gramajınız var mı?
3. Bunu nasıl yapmayı planlıyorsunuz: QR menü firması, kendiniz, diyetisyen? Bunun için ne kadar ayırırsınız?
4. Son 12 ayda Tarım veya Ticaret denetimi geçirdiniz mi? Ceza aldınız mı?
5. Ürün maliyetlerinizi en son ne zaman hesapladınız? Zam yaparken neye bakıyorsunuz?
6. Yemek sipariş platformları sizden bileşen veya kalori bilgisi istedi mi?

**QR menü ve POS firmalarına sorulacaklar:**
1. Müşterileriniz içerik ve kalori için ne yapıyor?
2. Yapay zekâ tahminine güveniyor musunuz? Yanlış bilgi verilirse sorumluluk kimde?
3. Kendi markanızla satabileceğiniz bir içerik hizmeti ister misiniz? Hangi fiyata?

**Somut teklif (yazılı):**
- **Menü Uyum Dosyası:**
  - 40 ürüne kadar 4.900 TL + KDV; 41–80 ürün 7.900 TL + KDV.
  - 7 iş günü içinde teslim; %50 peşin.
  - İçerik: bileşen listesi, 14 alerjen, alkol ve domuz işareti, porsiyon başına kalori (2027 yükümlülüğü için de hazır), QR menü/CSV ve basılı menü metni, hesap yöntemi dökümü.
- **Güncelleme:** Ürün başı 150 TL **veya** aylık 990 TL. Aylık pakette maliyet raporu dahil.
- **Fiyat testi:** Görüşmelerin yarısında 40 ürünlük paket 4.900 TL, diğer yarısında 6.900 TL teklif edilir.
- **QR menü firmalarına:** Kendi markalarıyla satmaları için toptan fiyat önerilir (ör. dosya başı 3.500 TL).

**Devam kriterleri (hepsi):**
- En az 40 restoran görüşmesi tamamlandı.
- **En az 5 restoran ön ödeme yaptı**, ya da imzalı sipariş ve 7 gün içinde ödeme tarihi var.
- En az 1 QR menü veya POS firmasıyla yazılı pilot niyeti var.
- 40 ürünlük menünün gerçek teslim süresi 10 saati geçmiyor.
- En az 2 restoran aylık 990 TL'lik pakete ödeme yaptı veya sözleşme imzaladı.

**Bırakma kriterleri (herhangi biri):**
- 40 görüşmede 2'den az ödeme.
- Görüşülenlerin çoğu QR firmalarının yapay zekâ tahminini yeterli buluyor ve ek ödeme istemiyor.
- Resmî erteleme veya kapsam daraltması duyuruldu.
- Veri lisansı ya da sorumluluk riski makul bir maliyetle çözülemiyor.
- 40 ürünlük teslim 16 saati aşıyor; birim ekonomi bozuluyor.

**Ara sonuçlar:**
- Uyum satılıyor ama abonelik satılmıyorsa: Bu bir şirket değil, Ekim–Aralık'a sıkışmış bir proje. İkiniz bunu bilerek, işinizi bırakmadan yapabilirsiniz.
- Restoranlar uyumdan çok maliyete ilgi gösteriyorsa: Aynı 14 günlük yöntemle "aylık maliyet ve marj raporu" ayrı test edilir.

---

## 8. Ahmet'e kısa özet

> Ahmet merhaba,
>
> E-ticaret fikrini bıraktıktan sonra 21 farklı problemi inceledim. Çoğunda Türkiye'de zaten birden fazla yazılım var. Kesin "bu iş tutar" diyebileceğim bir fikir çıkmadı. Ama hızlıca test edebileceğimiz bir aday var.
>
> **Restoran ve kafelerin menü zorunluluğu:** Tarım Bakanlığı'nın kılavuzuna göre tüm restoran ve kafeler 31 Aralık 2026'ya kadar menüdeki her ürünün içeriğini ve alerjenlerini, 31 Aralık 2027'ye kadar da kalorisini göstermek zorunda. Türkiye'de 158 binden fazla kayıtlı yeme-içme işyeri var. Biz restoranın tarifini alıp menüye konacak bilgiyi hazırlarız; aynı veriden yemek maliyetini de çıkarırız.
>
> **Riskler:** QR menü firmaları bunu yapay zekâyla yılda yaklaşık 5.000 TL'ye "tahmin" ediyor. Gelir büyük ölçüde tek seferlik. Bakanlığın gıda veri tabanını ticari kullanmak ücretli. Denetimin ne kadar sıkı olacağı bilinmiyor.
>
> **Önerim:** İki hafta boyunca 40 restoranla yüz yüze konuşup 4.900 TL'lik bir paketi ön ödemeyle satmayı deneyelim. En az 5 restoran ödemezse bırakalım.
>
> **Yedek fikir:** Küçük işverenlerin iş davalarına karşı belgelerini düzenli tutmak. Türkiye'de yılda bir milyondan fazla iş uyuşmazlığı arabulucuya gidiyor; İngiltere'de bu işi yapan bir firmanın yıllık geliri 463 milyon sterlin. Ama hukuki danışmanlık avukatlara ait, satışı da zor. İlk fikir tutmazsa bunu muhasebecilerle test edebiliriz.
>
> İkisi de tutmazsa hiçbirine yazılım yatırımı yapmayalım.

---

## 9. Kaynaklar

Erişim tarihi: 1 Ekim 2026. Saatler TSİ. Daha ayrıntılı liste: [`evidence/kaynaklar.tsv`](evidence/kaynaklar.tsv)

**Resmî ve doğrulanmış belgeler**
- Adalet Bakanlığı, *Adalet İstatistikleri 2024*, Tablo 46 (19:55) — https://adlisicil.adalet.gov.tr/Resimler/SayfaDokuman/7042025092455Adalet_%C4%B0statistikleri_2024%20T%C3%BCrk%C3%A7e_Ingilizce.pdf
- Tarım ve Orman Bakanlığı GKGM, *TGK Etiketleme ve Tüketicileri Bilgilendirme Yönetmeliği Kılavuzu*, Rev.002, 10.03.2026 (21:12) — https://gidamo.org.tr/uploads/editor/2026-03-16-12-34-08-429462.pdf
- Tarım ve Orman Bakanlığı, 6.04.2024 yönetmelik değişikliği duyurusu (21:55) — https://www.tarimorman.gov.tr/GKGM/Haber/789/Turk-Gida-Kodeksi-Gida-Etiketleme-Ve-Tuketicileri-Bilgilendirme-Yonetmeliginde-Degisiklik-Yapilmistir
- Ankara Ticaret Odası, gıda etiketleme mevzuat düzenlemeleri duyurusu (2026-04) (21:55) — https://www.atonet.org.tr/Uploads/Birimler/Internet/Duyurular/ATO%20DUYURULARI/____2026/2026-04-15-gida_etiket/mevzuat_duzenlemeleri.pdf
- TÜRKOMP veri kullanım koşulları ve 2026 lisans bedelleri (21:35) — https://turkomp.tarimorman.gov.tr/useofdata
- TBB, *Avukatlık Asgari Ücret Tarifesi 2025–2026* karşılaştırma cetveli (20:00) — https://d.barobirlik.org.tr/2025/20251103_tbbtablo_karsilastirmacetveli.pdf
- TİSK, *SGK Sigortalı İstatistikleri Ocak 2025* (20:12) — https://www.tisk.org.tr/dokuman/sgk-sigortali-istatistikleri-ocak-2025-bulteni.pdf
- TEPAV, *Cafe Latte Ekonomisi: Bir Fincanda İki Türkiye*, Ağustos 2026 (21:08) — https://files.tepav.org.tr/upload/files/1787904391748-0.Cafe_latte_ekonomisiBir_fincanda_iki_Turkiye.pdf
- Peninsula Business Services Group, 31.03.2025 yıl sonu hesapları (20:04) — https://www.datocms-assets.com/75137/1767620419-peninsula-business-services-group-limited-fy25-final-accounts-wesite-typeset-27-october-2025.pdf
- ACCC, Employsure kararı, 8.02.2023 (20:30) — https://www.accc.gov.au/media-release/employsure-to-pay-3m-penalty-for-misleading-google-ads-after-accc-appeal
- UK Food Standards Agency, MenuCal (21:40) — https://www.gov.uk/government/publications/menucal-calorie-and-allergen-tool
- TCMB kurları, 01.10.2026 (21:50) — https://www.tcmb.gov.tr/kurlar/today.xml

**Şirket fiyat ve iddia sayfaları**
- MarginEdge fiyatları — https://www.marginedge.com/pricing
- ReciPal fiyatları — https://www.recipal.com/pricing
- İrensoft QR Menü — https://qrmenu.irensoft.com/
- KolayBeyan — https://kolay-beyan.vercel.app/
- Midas, "Beyanname nasıl verilir?" — https://www.getmidas.com/destek/amerikan-borsalari/vergilendirme/beyanname-nasil-verilir

**Bağımsız kullanıcı yorumları**
- BrightHR, Trustpilot — https://www.trustpilot.com/review/brighthr.com
- Peninsula, Trustpilot — https://www.trustpilot.com/review/peninsulagrouplimited.com
- Peninsula Kanada, BBB — https://www.bbb.org/ca/on/toronto/profile/professional-services/peninsula-employment-services-limited-0107-1357971/complaints
- Koinly, Trustpilot — https://www.trustpilot.com/review/koinly.io
- Nutritics, Capterra UK — https://www.capterra.co.uk/software/173920/nutritics-labelling
- Kolay İK, Şikâyetvar — https://www.sikayetvar.com/kolay-ik

**Haber ve sektör kaynakları**
- AA, gelir vergisi beyannameleri, 12.04.2026 — https://www.aa.com.tr/tr/ekonomi/gelir-vergisinde-5-5-milyon-beyannameyle-rekor-kirildi/3902647
- AA, 2024 arabuluculuk sonuçları — https://www.aa.com.tr/tr/gundem/arabuluculuk-uygulamasiyla-gecen-yil-826-binden-fazla-dosyada-anlasma-saglandi/3442697
- Türkiye Arabuluculuk Vakfı, 2025 istatistikleri — https://arabuluculukvakfi.org/2025in-anahtar-arabuluculuk-istatistikleri/
- Gıda Bülteni, menüde kalori zorunluluğu, 22.03.2026 — https://www.gidabulteni.com/gida/restoran-ve-kafelerde-yeni-donem-menude-kalori-zorunlulugu/2983
- Hürriyet, Yasin Girgin, "İşveren davaları neden hep kaybeder?", 25.06.2015 — https://www.hurriyet.com.tr/yazarlar/yasin-girgin/isveren-davalari-neden-hep-kaybeder-29369429
- Alomaliye, SMMM ve YMM sayıları, 29.01.2026 — https://www.alomaliye.com/2026/01/29/smmm-ve-ymm-sayilari-ve-sorunlari/
- Karmalt, 5996 sayılı Kanun idari yaptırımlar — https://www.karmalt.com/gida-ve-yem-sektorunde-idari-yaptirimlar/

**Yalnızca arama özetine dayanan bilgiler (karar için tek başına kullanılmamalı):**
- MenuCalc, MarketMan, xtraCHEF, Koinly, Sharesight, BrightHR, Red Flag Alert ve AB temsilci hizmeti fiyatları
- CBAM danışmanlık ücretleri
- Konkordato sayıları
- SHY-YOLCU tutarları
- Sigorta Tahkim ücretleri
- TÜİK kayıt dışılık oranı
- KDV iade sınırları
- Laboratuvar analiz ücretleri
- 5996 sayılı Kanun için 2026 ceza tutarı

Bu bilgilerin sorgu ve sonuç listeleri [`evidence/aramalar.md`](evidence/aramalar.md) ve [`evidence/notlar/`](evidence/notlar/) altında.
