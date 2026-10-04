# Kett marka açılış sayfası: metinler

Hazırlayan: metin-yazari. Şablon: `templates/page.kett.json` (frontend-dev).
Kaynaklar: `templates/index.json`, `templates/page.json`, `templates/page.sss.json`,
`templates/product.collection-kalite-kontrol-ve-laboratuvar.json`, `snippets/dg-collection-description.liquid`,
`snippets/dg-urun-cta.liquid`, `sections/dg-urun-guven.liquid`, `snippets/dg-satis.liquid`, `snippets/header-search.liquid`,
`config/settings_schema.json`. Ayar id'leri ilgili `sections/dg-*.liquid` schema'larından kontrol edildi.

Ton: ana sayfadaki gibi sade ve somut. Kısa cümleler, "biz" dili, abartı yok. Repoda geçmeyen rakam ve model bilgisi kullanılmadı.

---

## 1. SEO

| Alan | Metin | Uzunluk |
| :- | :- | :- |
| Sayfa başlığı (Shopify sayfa adı, `dg-sayfa-ust` bunu h1 olarak basar) | `Kett nem ve beyazlık ölçüm cihazları` | — |
| SEO başlığı (title) | `Kett Nem Ölçer ve Beyazlık Ölçer \| Türkiye Distribütörü` | 55 karakter |
| Meta açıklama | `Kett tahıl nem ölçer ve pirinç beyazlık ölçerleri Türkiye distribütörü Değirmen A.Ş.'den: teknik katalog, teklif, servis ve yedek parça.` | 136 karakter |
| Önerilen URL handle | `kett` (sayfa: `/pages/kett`) | — |

Not: Sayfa başlığı ve SEO alanları Shopify yöneticisinde sayfa oluşturulurken girilir; tema dosyasında değil.

### Hedef anahtar kelimeler ve arama niyeti

| Anahtar kelime | Niyet | Sayfada karşılandığı yer |
| :- | :- | :- |
| kett türkiye distribütörü / kett distribütörü | Gezinme + güven: resmi tedarikçiyi arıyor | Sayfa üstü, hizmet bölümü |
| kett nem ölçer | Ticari araştırma: marka belli, model seçecek | Sektör blokları, ürün ızgarası |
| tahıl nem ölçer / tahıl rutubet ölçer | Ticari araştırma: ihtiyaç belli, marka seçecek | "Tahıl ve tohum nemi" bloğu |
| pirinç beyazlık ölçer / beyazlık ölçer | Ticari araştırma | "Pirinç beyazlığı" bloğu |
| kett pm-450 | Satın alma: model belli (site içi arama önerisinde de geçiyor) | Ürün ızgarası, süreç adımları |
| kett servis / kett yedek parça | Satış sonrası destek | Hizmet bölümü, SSS |

---

## 2. Sayfa bölümleri (sırasıyla)

Önerilen `order`: `ust` → `uygulamalar` → `urunler` → `hizmet` → `katalog` (isteğe bağlı, aşağıdaki nota bakın) → `surec` → `sss` → `cta`

### 2.1 `ust` → `dg-sayfa-ust`

| id | Metin |
| :- | :- |
| `kas` | `Kett · Türkiye distribütörü` |
| `metin` | `Kett'in tahıl nem ölçerlerini ve pirinç beyazlık cihazlarını Türkiye'de Değirmen A.Ş. olarak sunuyoruz. Model seçimi, teklif, servis ve yedek parça için tek muhatabınız biziz.` |

h1 = sayfa adı (`Kett nem ve beyazlık ölçüm cihazları`). Bu bölüm h1 bastığı için sayfaya ikinci h1 eklenmemeli.

### 2.2 `uygulamalar` → `dg-sektorler`

| id | Metin |
| :- | :- |
| `kas` | `Ne ölçüyor` |
| `baslik` | `Kett cihazları iki şeye odaklanır: nem ve beyazlık` |
| `metin` | `Silo, değirmen ve gıda laboratuvarında tahıl, tohum ve pirinç numunelerini kontrol etmek için kullanılır. Ölçmek istediğiniz parametreden başlayın.` |

Bloklar (`type: sektor`):

| Blok | `ikon` | `baslik` | `metin` | `koleksiyon` |
| :- | :- | :- | :- | :- |
| `tahil` | `tane` | `Tahıl ve tohum nemi` | `Buğday, arpa, mısır ve tohumlarda alım ve depolama sırasında nem ölçümü. Kett PM serisi cihazları ölçüm aralığı, numune hacmi ve hacim ağırlığı özelliğine göre karşılaştırın.` | `tahil-rutubet-olcme-cihazlari` |
| `pirinc` | `pirinc` | `Pirinç beyazlığı` | `Öğütülmüş ve parlatılmış pirinçte beyazlık derecesinin sayısal olarak ölçülmesi. Un ve toz numuneler için de kullanılabilen modeller var.` | `beyazlik-olcerler` |
| `rutubet` | `lab` | `Pamuk ve diğer numunelerde rutubet` | `Pamuk ve farklı endüstriyel numunelerde rutubet tayini için taşınabilir Kett ölçüm cihazları.` | `genel-rutubet-olcme-cihazlari` |
| `tum` | `lab` | `Tüm Kett kalite kontrol cihazları` | `Nem ve beyazlık ölçen Kett cihazlarının tamamını teknik özellikleri ve kataloglarıyla bir arada görün.` | `kalite-kontrol-ve-laboratuvar-cihazlari` |

Not: `pirinc` bloğundaki "un ve toz numuneler" ifadesi `beyazlik-olcerler` koleksiyon açıklamasından alındı. `genel-rutubet-olcme-cihazlari` handle'ı yalnızca `snippets/dg-collection-description.liquid` içinde geçiyor; mağazada koleksiyonun var ve dolu olduğu teyit edilmeli (teyit listesi #3). Boşsa `rutubet` bloğu çıkarılsın; 3 blok da düzgün durur.

### 2.3 `urunler` → `dg-urunler`

| id | Değer |
| :- | :- |
| `koleksiyon` | `kalite-kontrol-ve-laboratuvar-cihazlari` |
| `kas` | `Ürünler` |
| `baslik` | `Katalogdaki Kett cihazları` |
| `link_etiket` | `Tüm Kett cihazları` |
| `adet` | `12` |

Sekmeler (`type: sekme`):

| Blok | `koleksiyon` | `etiket` |
| :- | :- | :- |
| `s_tahil` | `tahil-rutubet-olcme-cihazlari` | `Tahıl nemi` |
| `s_beyazlik` | `beyazlik-olcerler` | `Beyazlık` |
| `s_rutubet` | `genel-rutubet-olcme-cihazlari` | `Pamuk ve diğer` (koleksiyon teyit edilmezse çıkarın) |

### 2.4 `hizmet` → `dg-hizmet`

| id | Metin |
| :- | :- |
| `kas` | `Satış sonrası` |
| `baslik` | `Kett cihazınızı aldıktan sonra da buradayız` |
| `metin` | `Kett ürünlerini doğrudan distribütöründen, teknik dokümanıyla birlikte alırsınız. Servis ya da yedek parça için cihazın modelini ve seri numarasını iletmeniz yeterli.` |
| `adres_baslik` | `Servis şubesi` |
| `adres` | `İMÇ 5. Blok No:5413, Unkapanı / İstanbul` |
| `telefon` | `+90 543 244 73 08` |
| `buton_etiket` | `Servis ve yedek parça` |
| `buton_link` | `shopify://pages/servis-ve-yedek-parca` |

Bloklar (`type: hizmet`):

| Blok | `ikon` | `baslik` | `metin` |
| :- | :- | :- | :- |
| `distributor` | `kalkan` | `Türkiye distribütörü` | `Kett cihazlarını 1984'ten beri İstanbul'da faaliyet gösteren Değirmen A.Ş.'den, servis ve yedek parça desteğiyle alırsınız.` |
| `bakim` | `bakim` | `Bakım ve onarım` | `Kendi atölyemizde onarım; yerinde müdahale gereken durumlarda servis ekibimizle destek.` |
| `parca` | `parca` | `Yedek parça` | `Sattığımız cihazların parçaları için stok tutuyoruz; stokta olmayanı üreticiden temin ediyoruz.` |

Not: Metinler ana sayfadaki `dg-hizmet` bloklarından ve `dg-urun-guven` "distribütör" maddelerinden uyarlandı; yeni iddia eklenmedi. "Kurulum" bloğunda ana sayfadaki "makinenin yerine konması" ifadesi Kett gibi taşınabilir/masaüstü cihazlara uymadığı için çıkarıldı.

### 2.5 `katalog` → `dg-katalog` (isteğe bağlı)

| id | Metin |
| :- | :- |
| `kas` | `Teknik dokümanlar` |
| `baslik` | `Katalog ve veri sayfaları` |
| `metin` | `Üretici kataloglarını kayıt olmadan indirin. Kullanım kılavuzu gerekirse cihazın model kodunu yazmanız yeterli.` |
| `adet` | `12` |

Güncelleme: frontend-dev yalnızca Kett ürünlerini listeleyen `dg-marka-katalog` bölümünü yazdı ve başlık olarak `Kett katalogları ve veri sayfaları` kullanıldı. Önceki not: `dg-katalog` marka filtrelemiyor; `collections.all` içindeki tüm markaların PDF'lerini listeliyor. Kett sayfasında HAWO/EUROMESH dokümanları da çıkar. Bu yüzden ya bu bölüm sayfaya konmasın, ya da yeni bir bölümle yalnızca Kett ürünleri listelensin (bu durumda başlık `Kett katalogları ve veri sayfaları` olsun). Metin değişmeden kullanılabilir.

### 2.6 `surec` → `dg-surec`

| id | Metin |
| :- | :- |
| `kas` | `Nasıl satın alırsınız` |
| `baslik` | `Kett cihazı almanın iki yolu` |
| `metin` | `Fiyatı yazan cihazları sepete ekleyip kartla ödeyebilirsiniz. Fiyatı görünmeyen modellerde fiyat, teslim süresi ve ödeme koşulları teklifle iletilir.` |

Bloklar (`type: adim`, en fazla 4):

| Blok | `baslik` | `metin` |
| :- | :- | :- |
| `sec` | `Modeli seçin` | `Cihazın sayfasında teknik özellikleri ve üretici kataloğunu inceleyin. Hangi modelin uygun olduğundan emin değilseniz ölçeceğiniz ürünü yazın, birlikte seçelim.` |
| `sepet` | `Fiyatlıysa sepete ekleyin` | `Fiyatı yazan ürünlerde sepete ekleyip kartla ödeyin. Sitede yazan fiyatlar KDV dahildir.` |
| `teklif` | `Fiyat yoksa teklif isteyin` | `Ürün sayfasındaki Teklif İste butonuyla formu doldurun; genellikle 24 saat içinde dönüş yapıyoruz.` |

### 2.7 `sss` → SSS bölümü

Repoda `dg-*` SSS bölümü yok. `templates/page.sss.json` uygulama bölümü `ss-faq-17` kullanıyor (bloklar: `tab` → `tab`; `faq_item` → `question`, `answer` [HTML]). Frontend aynı bölümü kullanabilir ya da yeni bir `dg-marka-*` bölümüne aynı alanları taşıyabilir. Sekme gerekmiyorsa tek sekme: `tab` = `Kett hakkında`.

Bölüm başlığı önerisi (yeni bölüm yazılırsa): kas `Sık sorulanlar`, başlık `Kett cihazları hakkında sorular`.

| # | `question` | `answer` |
| :- | :- | :- |
| 1 | `Kett cihazlarının Türkiye distribütörü kim?` | `<p>Değirmen Sanayi ve Ticaret A.Ş., Kett'in Türkiye distribütörüdür. 1984'ten bu yana İstanbul'da kalite kontrol, ambalaj, gıda işleme ve tekstil ekipmanı tedarik ediyoruz.</p>` |
| 2 | `Kett cihazları neyi ölçer?` | `<p>Katalogdaki Kett cihazları tahıl, tohum ve pirinç başta olmak üzere numunelerde nem veya beyazlık ölçer. Tahıl nemi, pirinç beyazlığı ve pamuk gibi diğer numunelerde rutubet için ayrı model grupları var.</p>` |
| 3 | `Fiyatı görünmeyen Kett cihazı için ne yapmalıyım?` | `<p>Ürün sayfasındaki <strong>Teklif İste</strong> butonuyla formu doldurun ya da WhatsApp'tan yazın. Fiyat, teslim süresi ve ödeme koşullarını genellikle 24 saat içinde iletiyoruz.</p>` |
| 4 | `Kett cihazım için servis ve yedek parça alabilir miyim?` | `<p>Evet. Kendi atölyemizde onarım yapıyor, sattığımız cihazların parçaları için stok tutuyoruz. Cihazın modelini ve seri numarasını iletmeniz yeterli. Ayrıntılar için <a href="/pages/servis-ve-yedek-parca">Servis ve yedek parça</a> sayfasına bakın.</p>` |
| 5 | `Kett ürün kataloğuna nasıl ulaşırım?` | `<p>Kataloğu olan her ürünün PDF'i kendi sayfasında; kayıt olmadan indirebilirsiniz. Kullanım kılavuzu gerekirse model kodunu yazmanız yeterli.</p>` |

Garanti sorusu bilinçli olarak yazılmadı (bkz. teyit listesi #5).

### 2.8 `cta` → `dg-cta`

| id | Metin |
| :- | :- |
| `kas` | `Doğrudan ulaşın` |
| `baslik` | `Hangi Kett modeli size uygun?` |
| `metin` | `Ölçeceğiniz ürünü ve günlük kullanım miktarınızı yazın; uygun modeli ve fiyatını birlikte belirleyelim. Hafta içi 09:00–18:00 arasında dönüş yapıyoruz.` |
| `whatsapp` | `905418890092` |
| `whatsapp_etiket` | `0541 889 00 92` |
| `wa_mesaj` | `Merhaba, Kett cihazları hakkında bilgi almak istiyorum.` |
| `telefon` | `+90 212 494 33 33` |
| `eposta` | `info@degirmen.com.tr` |

---

## 3. Kullanılmayan ama repoda geçen bilgiler

`templates/product.collection-kalite-kontrol-ve-laboratuvar.json` içinde şu teknik ifadeler var: "kapasitans/dielektrik (50 MHz)", "%1–40 aralığında nem", "240 mL numune", "C-600 ... 5,0–69,9 aralığında 0,1 çözünürlükte beyazlık", "mavi LED", "AA pil veya AC şebeke". Bunlar o koleksiyondaki **tüm** ürün sayfalarında aynı göründüğü için hangi modele ait olduğu belirsiz. Marka sayfasında kullanılmadı; teyit edilirse sektör bloklarına eklenebilir.

---

## 4. Mağaza sahibinden teyit gereken bilgiler

1. **Teknik değerler:** PM serisi için 50 MHz dielektrik yöntemi, %1–40 ölçüm aralığı ve 240 mL numune hacmi; C-600 için 5,0–69,9 beyazlık aralığı ve 0,1 çözünürlük. Hangi modellere ait ve güncel mi? (Kaynak yalnızca ortak ürün şablonu.)
2. **Kett ile ilişkinin başlangıcı:** Değirmen 1984'ten beri faaliyette; Kett distribütörlüğünün hangi yıldan beri sürdüğü repoda yok. Sayfada "1984'ten beri Kett distribütörü" yazılmadı, yalnızca şirketin 1984'ten beri faaliyette olduğu yazıldı.
3. **Koleksiyonlar:** ~~`genel-rutubet-olcme-cihazlari` mağazada var mı?~~ Kısmen teyit edildi: frontend-dev Admin API'den kontrol etti; koleksiyon var ve tek ürün içeriyor (Kett HX-500 Pamuk Rutubet Tayin Cihazı), blok ve sekme sayfada kaldı. ✅ "Pamuk ve farklı endüstriyel numunelerde" ifadesi mağaza sahibince doğrulandı.
4. **Numune hazırlama:** `numune-hazirlama-cihazlari` koleksiyonunda Kett ürünü var mı? Varsa sayfaya ayrı blok eklenebilir.
5. **Garanti:** Kett cihazlarında garanti süresi ve kapsamı. SSS'de sitenin genel ifadesi ("ürüne göre değişir, teklifte belirtilir") bile tekrarlanmadı; teyitle soru eklenebilir.
6. **Kalibrasyon:** Kett cihazları için kalibrasyon veya kalibrasyon kontrolü hizmeti veriliyor mu? Repoda bilgi yok, yazılmadı.
7. **Kurulum/eğitim:** ✅ Teyit edildi: Kett cihazlarında kurulum ve eğitim verilmiyor; kurulum bloğu ve ilgili ifadeler sayfadan çıkarıldı.
8. **Yedek parça stoğu:** ✅ Teyit edildi: Kett yedek parçaları mevcut.
9. **Kett üretici bilgisi:** Üreticinin ülkesi, kuruluş yılı, sertifikaları (ISO vb.). Repoda hiç yok; sayfada yazılmadı.
10. **Fiyatlı Kett ürünleri:** ✅ Teyit edildi: PM-450 dışında da fiyatlı Kett modelleri var; "sepete ekleyin" adımı kalıyor. Önceki not: Kett PM-450 satışta (`snippets/dg-satis.liquid`). Başka fiyatlı Kett modeli var mı? Süreç bölümü iki yolu da anlatıyor; hepsi teklifle satılıyorsa "sepete ekleyin" adımı çıkarılmalı.
