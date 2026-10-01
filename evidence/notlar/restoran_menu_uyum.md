# Aday: Restoran menü bilgilendirme uyumu (bileşen, alerjen, enerji) + reçete maliyeti

## Resmi kaynak (doğrulandı — metin PDF'ten çıkarıldı)
- T.C. Tarım ve Orman Bakanlığı, Gıda ve Kontrol Genel Müdürlüğü, "Türk Gıda Kodeksi Gıda Etiketleme ve Tüketicileri Bilgilendirme Yönetmeliği Kılavuzu", İlk yayım 26/11/2024, Revizyon 002, Revizyon tarihi 10/03/2026
- PDF: https://gidamo.org.tr/uploads/editor/2026-03-16-12-34-08-429462.pdf (indirildi 2026-10-01 ~21:15 TSİ; Gıda Mühendisleri Odası sitesinde barındırılan kopya)
- Madde 41.3 (Rev.002): "Gıda işletmecisi tarafından, toplu tüketim yerlerinde tüketiciye sunulan gıdaların içeriğinde yer alan bileşenlere ve enerji değerine ilişkin tüketiciye bilgilendirme yapılması zorunludur."
- Madde 41.4: Bilgilendirme menü, yazı tahtası, broşür, karekod, dijital ekran vb. ile yapılabilir; karekod kullanılıyorsa cihazı olmayanlara talep halinde sunulacağına dair yazılı bilgilendirme gerekir.
- Madde 41.5: Alerjen, alkol ve domuz kaynaklı bileşenler vurgulanarak gösterilmeli.
- Madde 20.2 ve sonrası: 14 alerjen esas alınır; Bakanlığın örnek afişi kullanılabilir.
- Enerji hesabı örneği: TÜRKOMP ortalama değerleriyle porsiyon başına toplam kcal (örnek et yemeği 353,5 g → 312 kcal). "Tüketiciye toplam enerji değeri verilmelidir."
- Madde 43.5 (Rev.002): "Toplu tüketim yerleri tarafından, mesafeli satış yoluyla tüketiciye sunulan gıdaların içeriğinde yer alan bileşenlere ve enerji değerine ilişkin satın alma aşamasında tüketiciye bilgilendirme yapılması zorunludur." (yemek siparişi platformları dahil — çıkarım)
- Madde 47 (Rev.002) uyum süreleri:
  47.1 Ulusal çapta zincir toplu tüketim yerleri: 01/07/2026
  47.2 Sadece bulunduğu ilde üç ve üzeri şubesi olanlar: 31/12/2026
  47.3 Diğer tüm toplu tüketim yerleri: bileşen bildirimi 31/12/2026, enerji bildirimi 31/12/2027
- Toplu tüketim yeri tanımı (Yönetmelik, kılavuzda alıntı): "...hazır yemek hizmeti veren restoranlar, kantinler, okullar ve hastaneler gibi işletmeler"
- Not: Metin bir "kılavuz"dur; amacı "resmî kontroller sırasında yapılacak değerlendirmelerde uygulama birlikteliği sağlamak" olarak yazılmış. Bağlayıcılık ve ceza tutarı için ayrıca hukuki görüş gerekir (bu çalışmada ceza tutarı doğrulanamadı).

## Pazar büyüklüğü (doğrulandı)
- TEPAV, "Cafe Latte Ekonomisi: Bir Fincanda İki Türkiye", Ağustos 2026 (N202687), PDF: https://files.tepav.org.tr/upload/files/1787904391748-0.Cafe_latte_ekonomisiBir_fincanda_iki_Turkiye.pdf
  "Kayıtlı yeme-içme iş yeri sayısı 62.384 (2010) → 158.725 (2025), +%154"; "Kayıtlı 4/a çalışan sayısı (yiyecek-içecek) 326.601 → 913.782"
  (Tanım: en az bir sigortalı çalıştıran kayıtlı işyerleri — arama özeti; sigortalısı olmayan işletmeler dahil değil.)

## Haber/pazarlama kaynakları (ikincil)
- Gıda Bülteni, 22.03.2026: kalori/alerjen/bileşen zorunluluğu ve takvim (kılavuzla tutarlı)
- QR menü firmaları düzenlemeyi pazarlıyor: finedinemenu, tabpadmenu, monu, diyarmenu, lokmenu, kobiqr, karekod360, ticarethub, tripleworks (pazarlama iddiası)
- Ticaret Bakanlığı denetim haberleri (arama özeti): Ankara'da döner/iskender/hamburger menülerinde gramaj zorunluluğu denetimi (AA); "Fiyat listesi olmayan işletmeye 325 bin lira ceza" (ensonhaber); Aksaray'da 27 restoranda 1.143 üründen 15'inde aykırılık, 59.595 TL ceza. Bunlar Ticaret Bakanlığı'nın fiyat etiketi denetimleri; Tarım Bakanlığı'nın bileşen/enerji kuralıyla aynı şey değil.
- Fiyat Etiketi Yönetmeliği değişikliği (RG 11.10.2025, 33044): yeme-içme işletmelerinde fiyat listesinin karekodla sunulabilmesi, talep halinde ayrıca sunulması, fiyat listesi verilerinin Bakanlık sistemine bildirimi (arama özeti)

## Veri kaynağı ve lisans (doğrulandı — curl ile okundu, ~21:35 TSİ)
- TÜRKOMP: "14 gıda grubundan 645 gıdaya ait 100 gıda bileşeni için yaklaşık 63.000 ... veri"
- "YASAL UYARI : Türkomp sitesi verilerinin ticari kullanımı ücretli..."
- Veri satış yetkilisi: Gıda ve Yem Kontrol Merkez Araştırma Enstitüsü (Bursa)
- 2026 yıllık ürün bazlı lisans (KDV hariç): 1 ürün 3.052 TL; 2-5: 11.411; 6-25: 37.961; 26-100: 75.902; 101-250: 125.982; 251-645: 176.065 TL. Bilgisayar programında/internet sitesinde ticari kullanımda ücret yıllık alınır; etikette bilgilendirme amacıyla kullanımda bir defalık.
- Çıkarım: Türkomp verisini kullanan ücretli bir hizmet/yazılım lisans maliyeti taşır. Kılavuz enerji hesabını Türkomp örneğiyle anlatıyor ama metinde başka kaynak kullanımını yasaklayan bir ifade bulunmadı (paketli bileşenlerin etiket değerleri de kullanılabilir — hukuki teyit gerekir).

## Yurt dışı benzerleri
- MenuCalc (ABD): planlar $30,66 / $51,91 / $74,83 aylık (SaaSworthy, arama özeti; menucalc.com/pricing sayfasında fiyat görünmedi); "30,000+ restaurant locations" ve Denny's, Jimmy John's müşteri iddiası (arama özeti, şirket iddiası); hedef: FDA kuralına tabi 20+ şubeli zincirler.
- Nutritics (İrlanda): fiyat yayımlanmıyor; Capterra UK'de 3,8/5 (25 yorum), "US$21.00/month" başlangıç; olumsuz yorumlar: "Buggy, horrendously slow, old-fashioned software that frequently crashes" (2 Temmuz 2025) — WebFetch, ~21:40 TSİ.
- UK Food Standards Agency "MenuCal": "a free online tool which helps food businesses put allergen and calorie information on their menu" (gov.uk, son güncelleme 26.10.2020) → yurt dışında da devletin ücretsiz aracı var.
- Veritabanı temelli besin analizi hizmeti: ürün başına $25–100, laboratuvar analizi ürün başına $650 (arama özeti; birincil kaynak açılamadı).

## Türkiye'de rakipler (aramalar: "menü kalori hesaplama hizmeti restoran fiyat diyetisyen...", "\"alerjen\" \"kalori\" menü hazırlama hizmeti restoran gıda mühendisi...")
- QR menü yazılımları düzenlemeyi pazarlıyor: İrensoft QR Menü — "Kalori & Alerjen Tahmini: Ürün bilgilerinden yapay zeka ile kalori değerini ve olası alerjenleri otomatik hesaplayın", tek yıllık plan "₺5,000 + VAT/year" (WebFetch, ~21:30 TSİ); finedinemenu, tabpadmenu, monu, diyarmenu, lokmenu, kobiqr, karekod360, ticarethub, promenu
- Restoran yazılım fiyat çıpaları: 3E Yazılım yıllık 6.990 / 15.000 / 25.000 TL (arama özeti); Restomenum 583–699 TL/ay; Karekodgarson 1.000 TL/ay
- Menü/ürün danışmanlığı: Nutrist (Menü ve Ürün Danışmanlığı), Umami F&B, Armut'ta menü danışmanları (fiyat yayımlanmıyor / 1.000–25.000 TL aralığı restoran danışmanlığı genel ilanı)
- Ücretsiz: Türkomp web araması (ticari kullanım hariç), Bakanlığın örnek alerjen afişi (kılavuz 20.3)

## Ceza tutarı (doğrulanamadı)
- 5996 sy. Kanun md. 40/1-j (etiketleme kurallarına aykırılık) kanundaki baz tutar 2.000 TL, bir yıl içinde tekrarı 10.000 TL; 40/1-k beyan-içerik uyumsuzluğu 5.000 TL; tutarlar her yıl yeniden değerleme oranıyla artar (karmalt.com, WebFetch). 2026 tutarı için "52.801 TL" geçen bir arama özeti var ama kaynağı açılamadı → raporda kullanılmadı.
- Denetim: "Tarım ve Orman Bakanlığı ekipleri ... denetimlere başladı" (ahaber/habereguven haberleri, arama özeti; 1 Temmuz 2026 zincirler için)
