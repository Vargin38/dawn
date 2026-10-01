# Erişim kontrolü

Tarih/saat: 2026-10-01 19:48 TSİ

| Araç | Sonuç |
|---|---|
| WebSearch (arama) | Çalışıyor. Test sorgusu: "MarginEdge pricing per location per month" → 10 sonuç |
| WebFetch (sayfa okuma) | Çalışıyor. https://www.marginedge.com/pricing okundu |
| curl (proxy üzerinden) | google.com 200, sikayetvar.com 200, marginedge.com 200 |
| curl engelleri | capterra.com 403, reddit.com 403, eksisozluk.com 403 (sitelerin bot korumaları; ortam engeli değil). Bu sitelerdeki kullanıcı yorumlarına yalnızca arama özetleri veya başka sayfalar üzerinden ulaşılabildi; bu durum ilgili kanıtlarda belirtilmiştir. |

Not: WebSearch aracı ABD konumlu arama yapıyor. Türkçe sorgular da denendi; sonuç kalitesi her sorguda ayrıca değerlendirildi.
