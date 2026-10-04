#!/usr/bin/env python3
"""Reklam ve SEO metinlerinin karakter sayısını sınırlara göre kontrol eder.

Kullanım:
  python3 marketing/araclar/karakter_say.py <tür> "metin 1" "metin 2" ...
  python3 marketing/araclar/karakter_say.py <tür> --dosya metinler.txt   (her satır bir metin)

Türler: baslik30, aciklama90, yol15, sitelink25, sitelink_aciklama35, callout25,
        seo_baslik60, meta155, meta_birincil125, meta_baslik40, meta_aciklama30
"""
import sys

SINIRLAR = {
    "baslik30": 30,
    "aciklama90": 90,
    "yol15": 15,
    "sitelink25": 25,
    "sitelink_aciklama35": 35,
    "callout25": 25,
    "seo_baslik60": 60,
    "meta155": 155,
    "meta_birincil125": 125,
    "meta_baslik40": 40,
    "meta_aciklama30": 30,
}


def main():
    if len(sys.argv) < 3 or sys.argv[1] not in SINIRLAR:
        print(__doc__)
        sys.exit(2)
    sinir = SINIRLAR[sys.argv[1]]
    if sys.argv[2] == "--dosya":
        with open(sys.argv[3], encoding="utf-8") as f:
            metinler = [s.rstrip("\n") for s in f if s.strip()]
    else:
        metinler = sys.argv[2:]
    hata = 0
    for m in metinler:
        n = len(m)
        durum = "OK " if n <= sinir else "AŞIYOR"
        if n > sinir:
            hata += 1
        print(f"{durum} {n:>3}/{sinir}  {m}")
    sys.exit(1 if hata else 0)


if __name__ == "__main__":
    main()
