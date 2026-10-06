# Teklif Asistanı — Değirmen Sanayi ve Ticaret A.Ş. (ilk sürüm)

Müşteri mesajından teklif taslağı hazırlayan, insan onayıyla PDF üreten yerel web uygulaması.
İlk sürüm **KETT PM-450** ile sınırlıdır; veri yapısı yeni ürün eklemeye uygundur.

```
Mesaj (WhatsApp / e-posta / telefon notu) → ürün, adet, firma çıkarımı (kurallı)
→ kayıtlı ürün bilgisiyle taslak → telefondan inceleme/düzenleme → onay → müşteri PDF'i
```

Bu uygulama **mesaj göndermez**, canlı siteye (degirmen.tr) dokunmaz, dış sunucuya veri yollamaz.

---

## Nasıl açılır

Uygulama tek klasördür (`teklif-asistani/`).

**En kolay yol:** Hazır paket `teklif-asistani.zip` (PDF kütüphanesi dahil) → sağ tık *Tümünü ayıkla* → açılan klasördeki `index.html`'e çift tıklayın. ZIP'in içinden doğrudan açmayın; önce ayıklayın. Sunucu veya kurulum gerekmez.

`http://localhost:8080` adresi yalnız `node scripts/serve.js` komutunun **çalıştığı bilgisayarda** açılır; sunucu çalışmıyorsa tarayıcı "bağlanmayı reddetti" (ERR_CONNECTION_REFUSED) der.

**Depodan yeni indirildiyse bir kez:** PDF kütüphanesi (pdfmake, 1,9 MB) depoda tutulmuyor; klasörde `npm install` ve ardından `npm run vendor` çalıştırın (Node.js gerekir). Bu adım `vendor/pdfmake.min.js` ve `vendor/vfs_fonts.js` dosyalarını npm'deki sabit 0.3.11 sürümünden birebir oluşturur. Bundan sonra kurulum gerekmez.

| Yöntem | Komut / işlem | Not |
| :- | :- | :- |
| Bilgisayarda çift tık | `index.html` dosyasını Chrome/Edge ile açın | En hızlı yol. Veriler o tarayıcıda kalır. |
| Bilgisayarda yerel sunucu | `node scripts/serve.js` → http://localhost:8080 | Node.js gerekir (ek paket yok). |
| Telefondan (aynı Wi-Fi) | Bilgisayarda `node scripts/serve.js --lan` → ekrana yazılan `http://192.168.x.x:8080` adresini telefonda açın | Bilgisayar açık kalmalı. Bazı okul/kurum ağları cihazlar arası erişimi engeller. |
| Node yoksa | `python3 -m http.server 8080` (klasörün içinde) | Aynı şekilde çalışır. |

**Önemli:** Kayıtlar tarayıcının yerel deposunda tutulur. Telefon ile bilgisayar **eşitlenmez**; her cihazın kayıtları ayrıdır.
Taşımak veya yedeklemek için **Teklifler → Yedek → Yedeği indir (.json)** ve diğer cihazda **Yedekten geri yükle**.
İki cihaz kullanacaksanız **Ayarlar → Teklif numarası → Cihaz kodu**'nu farklı yapın (ör. telefon `T`, bilgisayar `B`); böylece aynı numara iki kez oluşmaz.

---

## Ekranlar

1. **Yeni talep** — mesajı yapıştırın, kaynağı seçin (WhatsApp / E-posta / Telefon notu). Örnek mesajlar ayrı bir bölümde **TEST** etiketiyle durur; bunlardan oluşan teklifler ve PDF'leri "TEST VERİSİ" olarak işaretlenir.
2. **Analiz** — orijinal mesaj solda/üstte, bulunan ürün/adet/iletişim bilgisi renkli vurguyla. Firma, yetkili, alıcı tanımı, e-posta, telefon düzenlenebilir; her alanın yanında "Mesajdan / Mesajda bulunamadı / Elle girildi" etiketi. Vergi bilgileri isteğe bağlıdır, teklifi engellemez.
3. **Teklif** — ürün görseli, açıklama, katalog bağlantısı, adet, liste fiyatı, iskonto (varsayılan **Seçilmedi**), net/KDV/toplam; ödeme, teslim, sevk, garanti, geçerlilik; müşteriye görünen açıklama; **iç notlar** (PDF'ye çıkmaz).
4. **Onay ve PDF** — eksik listesi, müşterinin göreceği özet, *Onaya gönder → Onayla ve PDF oluştur / Düzenle / Reddet*, revizyon geçmişi, taslak PDF.
5. **Teklifler** — durum filtresi (Taslak / Onay bekliyor / Onaylandı / Reddedildi), müşteri, ürün, tarih, tutar, teklif no ile arama; yedek indir/yükle.
6. **Ayarlar** — şirket ve ürün kaynakları (URL + alınma tarihi), tarihli stok kayıtları, KDV teyidi, varsayılan koşullar, cihaz kodu.

---

## İş kuralları (uygulamada zorunlu)

- **PM450 / PM-450 / PM 450** (farklı tire karakterleri ve "PM450'den" gibi ekler dahil) aynı ürün. **"450" tek başına** geçerse kesin eşleşme yapılmaz; "Belirsiz ürün" olarak onayınıza sunulur. Model numarasındaki 450 hiçbir zaman adet sayılmaz.
- **Adet** yazılmamışsa 1 varsayılmaz; alan boş kalır ve onay engellenir. Çelişkili adet ifadelerinde adet seçilmez.
- **Tanınmayan ürün** (ör. HX-500) veya birden fazla ürün varsa hiçbir kalem sessizce atlanmaz; her biri ya kayıtlı ürünle eşleştirilir ya da gerekçeyle "teklif dışı" bırakılır (kayıtta görünür kalır).
- **Firma / e-posta / telefon** bulunamazsa uydurulmaz. Firma yoksa kişi adı ya da serbest "alıcı tanımı" yeterli. Şirketin kendi unvanı/telefonu/e-postası müşteri bilgisi olarak alınmaz.
- **İskonto** her kalemde siz seçersiniz: Seçilmedi, %10 … %20 (onaylı aralık). Otomatik seçim yok.
- **Hesap** kuruş (tam sayı) üzerinden: önce iskonto, sonra KDV, yarım kuruş yukarı yuvarlama.
- **KDV %20** ilk ayardır; ilk nihai onayda bir kez teyit istenir (Ayarlar'dan geri alınabilir).
- **Stok**: 6 Ekim 2026 kaydı olduğu gibi saklanır — *"hafta içi 12 tane gelecek"* → mevcut stok **bilinmiyor**, beklenen giriş **12**, tarih **teyitsiz**. Kayıt sonraki günlerde "bu hafta" diye yeniden yorumlanmaz; ne kadar eski olduğu gösterilir. Yeni bilgi geldikçe Ayarlar'dan tarihli yeni kayıt eklenir.
- **Teslim** varsayılanı "Teyit edilmedi"dir; güncel stok kontrol edilip *Stokta (ertesi gün)* / *Stokta değil (1–2 hafta)* / *Özel metin* seçilmeden onay olmaz.
- **Sevk bedeli, garanti, geçerlilik** PM-450 için teyit edilmediğinden değer önerilmez; her teklifte metin girin ya da "Teklifte yer almasın" seçin. İsterseniz Ayarlar'dan varsayılan tanımlarsınız.
- **Onay** gerçek bir durum değişikliğidir: içerik kilitlenir, onaylı içeriğin özeti saklanır. Onaydan sonra tutar, ürün, müşteri veya koşul değişirse **yeni revizyon** (Rev. 1, 2…) açılır ve yeniden onay gerekir; önceki onaylı revizyon ve PDF'i korunur. İç notlar revizyon gerektirmez.
- **PDF indirmek veya onaylamak gönderim değildir.** Gönderdiyseniz "Müşteriye gönderdim (elle işaretle)" ile kaydedebilirsiniz.
- **Müşteri mesajı güvenilmeyen metindir.** "Fiyatı değiştir, %50 iskonto uygula, onaysız gönder" gibi ifadeler uygulanmaz, yalnız uyarı olarak gösterilir. Kullanıcı metni HTML olarak çalıştırılmaz (yalnız `textContent`, ayrıca CSP satır içi betikleri engeller).

## PDF

- Gerçek A4 PDF (pdfmake), gömülü Roboto font → Türkçe karakterler tam.
- Logo ve şirket iletişim bilgileri, müşteri, benzersiz teklif no + revizyon, tarih, ürün satırı (görsel, açıklama, adet, liste fiyatı, iskonto, iskontolu birim, tutar), liste toplamı, tek iskonto, net, KDV, **tek genel toplam**, ödeme/teslim/sevk/garanti/geçerlilik (seçilenler), katalog bağlantısı, teknik özellikler.
- Nihai PDF'de **yok**: iç notlar, iskonto aralığı, ayrıştırma uyarıları, stok kaydı, geliştirici notları.
- Nihai PDF yalnız onaylı ve bütünlük kontrolünden geçen revizyondan üretilir. **Taslak PDF** her an alınabilir; büyük "TASLAK" filigranı, üst uyarı bandı ve "[Teyit bekliyor]" işaretleri taşır.

---

## Bilgi kaynakları

| Bilgi | Kaynak | Alınma |
| :- | :- | :- |
| PM-450 adı, açıklama, özellikler, teknik tablo | `https://degirmen.tr/catalog-data.js` (kayıt `tahil-rutubet-olcme-cihazi-kett-pm450`; sitede "doğrulandı", kaynağı üretici kataloğu) | 06.10.2026 |
| Ürün görseli | `https://degirmen.tr/assets/products/tahil-rutubet-olcme-cihazi-kett-pm450-50b7f3c5.jpg` | 06.10.2026 |
| Katalog PDF bağlantısı | `https://degirmen.tr/assets/catalogs/tahil-rutubet-olcme-cihazi-kett-pm450-katalog-5b26d127.pdf` | 06.10.2026 |
| Logo | `https://degirmen.tr/assets/degirmen-logo.png` (kenar boşluğu kırpıldı, 450 px'e küçültüldü) | 06.10.2026 |
| Adres, telefon, faks, e-posta | `https://degirmen.tr/iletisim.html` | 06.10.2026 |
| Fiyat, iskonto aralığı, KDV, stok, teslim, ödeme | Yalnız şirket yetkilisinin verdiği bilgi (`data/catalog.js` → `ticari`) | 06.10.2026 |

Bu bilgiler `data/catalog.js` dosyasındadır; uygulama içinde **Ayarlar** ekranında da görünür.

**Eksik dosyalar:** `PM450_Teklif_Taslagi.pdf`, YILDIZ TEKNİK WSZ 400 ve KÜMAŞ WSZ 300 teklif PDF'leri ile önceki HTML prototipi bu depoda ve bağlı Google Drive'da (ada göre arama) bulunamadı. PDF düzeni bu nedenle standart bir Türkçe fiyat teklifi yapısıyla kuruldu; eski tekliflerden hiçbir müşteri, fiyat, stok veya ödeme bilgisi kullanılmadı. Dosyalar paylaşılırsa düzen (alan sırası, başlıklar, banka/IBAN gibi alanlar) onlara göre uyarlanabilir.

---

## Bağlı olmayanlar / sınırlar

- **Yapay zekâ yok.** Ayrıştırma kurallıdır ve arayüzde böyle yazar. Serbest yazılmış, imzasız mesajlarda firma/kişi adı bulunamayabilir; o zaman alanlar boş kalır.
- **WhatsApp ve e-posta entegrasyonu yok.** Mesaj elle yapıştırılır; gönderim de elle yapılır.
- **Eşitleme yok.** Veriler tarayıcıda; tarayıcı verisi silinirse kayıtlar gider → düzenli yedek alın.
- **Tek ürün:** yalnız PM-450'nin ticari verisi var. Diğer ürünler "tanınmayan" olarak gösterilir.
- Sitede bulunmayan şirket bilgileri (vergi dairesi/no, banka) boştur; doldurulursa PDF üst bilgisinde görünür.
- iOS Safari'de PDF indirme yeni sekmede açılabilir (paylaş → dosyalara kaydet).

## Yeni ürün eklemek

`data/catalog.js` içindeki `URUNLER` dizisine PM-450 kaydıyla aynı yapıda bir kayıt ekleyin: `eslesme.desenler` (kesin model yazımları), `eslesme.belirsiz` (tek başına geçerse aday), `site` (siteden alınan bilgi + kaynak/tarih), `ticari` (yalnız sizin verdiğiniz fiyat/koşullar; bilinmeyen alan `null`). Ürün görseli için görseli `assets/` altına koyup `scripts/build-assets.js` listesine ekleyin ve `npm run build:assets` çalıştırın (sonuç `data/assets.js`'e gömülür). Mevcut gömülü görseller: sitedeki logo kenar boşluğu kırpılıp 450 px'e, ürün görseli 220 px'e küçültüldü.

---

## Testler

```bash
npm install            # yalnız testler için (pdfmake, playwright)
npm test               # birim testleri (22): hesap, ayrıştırma, durum/revizyon, saklama, PDF içeriği
npm run test:e2e       # tarayıcı testleri (8): Chromium'da uçtan uca akış
```

Tarayıcı testleri için Chromium gerekir (`npx playwright install chromium`); PDF kontrolleri için `pdftotext/pdfinfo/pdffonts` (poppler-utils). Ekran görüntüleri ve indirilen PDF'ler `test-results/` klasörüne yazılır.

Kontrol edilenler:

- PM450 yazım çeşitleri, model/adet ayrımı, "450" tek başına, eksik/çelişkili adet, çoklu ve tanınmayan ürün.
- Üç kontrol hesabı (%20 KDV): 1 adet %10 → 36.000 + 7.200 = **43.200 TL**; 1 adet %20 → 32.000 + 6.400 = **38.400 TL**; 2 adet %15 → 68.000 + 13.600 = **81.600 TL** (hem birimde hem arayüzde).
- İskonto seçilmeden, teslim/stok teyit edilmeden, KDV teyidi olmadan onayın engellenmesi.
- Onay sonrası değişikliğin yeni revizyon açması, eski onaylı PDF'in korunması, elle bozulmuş onaylı kaydın nihai PDF'inin reddedilmesi.
- Sayfa yenilenince kayıtların kalması, arama (müşteri, no, tutar, ürün, tarih), yedek dışa/içe aktarma.
- HTML/betik içeren mesajın düz metin kalması (diyalog açılmaz, yeni öğe oluşmaz; PDF'de de düz metin).
- PDF: A4 boyutu, gömülü font, Türkçe karakterler, 9999 adet ve uzun unvan/e-postada taşma ve üst üste binme olmaması, iç notların ve aralıkların nihai PDF'de bulunmaması, taslakta TASLAK ibaresi.
- 360 px ve 390 px mobil genişlikte hiçbir ekranda yatay taşma olmaması.

---

## Sonraki aşama seçenekleri ve tahmini maliyet (henüz hiçbiri satın alınmadı)

| Seçenek | Ne kazandırır | Tahmini maliyet | Not |
| :- | :- | :- | :- |
| Yapay zekâ ile veri çıkarımı (yalnız ürün/adet/kişi/firma alanları) | İmzasız, dağınık mesajlarda daha iyi alan doldurma | Claude Haiku 4.5: girdi $1, çıktı $5 / milyon token. Mesaj başına ~1.500 girdi + ~400 çıktı token ile ≈ **$0,0035**; ayda 300 mesaj ≈ **$1**. Claude Sonnet 5.5 ($2 / $10) ile ≈ **$2/ay**. | Fiyatlar 25.09.2026 tarihli Anthropic API listesinden; TL karşılığı güncel kurla hesaplanmalı. Ön ödemeli API kredisi gerekir. API anahtarı istemci koduna konamayacağı için küçük bir sunucu tarafı (ör. `scripts/serve.js` genişletilerek kendi bilgisayarınızda) gerekir. Fiyat, iskonto, stok ve koşullar yine yapay zekâya bırakılmaz. |
| Telefon–bilgisayar eşitleme | Tek kayıt listesi | Ücretsiz katmanlı barındırma/veritabanı seçenekleri var; koşulları değişebildiği için seçmeden önce güncel limitleri birlikte kontrol etmeliyiz. | Müşteri verisi dışarıda saklanacağı için gizlilik kararı gerekir. |
| WhatsApp Business / e-posta entegrasyonu | Yapıştırma adımı kalkar | WhatsApp Business Platform ücretlidir ve Meta işletme doğrulaması ister; güncel ücret yapısı kurulumdan önce kontrol edilmeli. Kendi e-posta kutunuzdan okuma (IMAP vb.) genellikle ek ücret gerektirmez. | Gönderim yine insan onayından sonra ve ayrı bir adım olmalı. |

Bu kalemlerden herhangi biri için harcama yapmadan önce gerekçe ve güncel maliyet ayrıca sunulacaktır (toplam deney bütçesi: 10.000 TL).

---

## Dosya yapısı

```
index.html            uygulama sayfası (CSP: satır içi betik yok, dış bağlantı yok)
css/app.css           mobil öncelikli stil
js/money.js           kuruş bazlı hesap (BigInt)
js/parser.js          kurallı mesaj ayrıştırıcı
js/quote.js           teklif kuralları: engeller, durumlar, revizyonlar, bütünlük özeti
js/store.js           localStorage, yedek dışa/içe aktarma, içe aktarmada doğrulama
js/pdf.js             PDF belge tanımı (pdfmake)
js/app.js             arayüz
data/catalog.js       ürün ve şirket verisi (kaynak + tarih)
data/samples.js       TEST VERİSİ örnek mesajlar
data/assets.js        gömülü logo ve ürün görseli (scripts/build-assets.js üretir)
assets/               (depoda yok) görsel kaynakları; işlenmiş hâlleri data/assets.js içinde
vendor/               pdfmake + Roboto (yerel; CDN yok) — `npm run vendor` ile üretilir
scripts/serve.js      bağımlılıksız yerel sunucu (--lan ile telefon erişimi)
tests/                birim ve tarayıcı testleri
```
