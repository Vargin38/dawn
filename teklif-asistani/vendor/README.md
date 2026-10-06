# Üçüncü taraf dosyalar

| Dosya | Kaynak | Sürüm | Lisans |
| :- | :- | :- | :- |
| `pdfmake.min.js` | npm `pdfmake` (`build/`) | 0.3.11 | MIT (`LICENSE-pdfmake.txt`) |
| `vfs_fonts.js` | npm `pdfmake` (`build/`) — Roboto fontlarını içerir | Roboto 3.014 | SIL Open Font License 1.1 (fontun kendi lisans alanında yazılı) |

Bu iki dosya depoda tutulmaz (`.gitignore`); npm'deki sabit sürümden birebir üretilir:

```bash
npm install
npm run vendor
```

Uygulama bu dosyaları yerelden yükler; çalışırken CDN'e veya başka bir sunucuya bağlanmaz.
Dosyalar yoksa uygulama açılır ve çalışır, yalnız PDF oluşturma bu adımı isteyen bir hata verir.
