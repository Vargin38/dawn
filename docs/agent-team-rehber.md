# Agent Team Rehberi (Türkçe referans)

Kaynak: Claude Code resmi dokümantasyonu — https://code.claude.com/docs/en/agent-teams
Bu dosya, ekip kurarken Claude'un ve bizim başvuracağımız özet referanstır.

> Agent team'ler **deneysel** bir özelliktir ve varsayılan olarak kapalıdır.
> Bilinen sınırlamaları vardır (oturum devam ettirme, görev koordinasyonu, kapatma).

## 1. Kurulum

Bu projede `.claude/settings.json` dosyasına eklendi:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

- Ekip kurmak için **etkileşimli oturum** gerekir. `-p` (headless) ve Agent SDK oturumlarında
  teammate oluşmaz; isim verilen alt ajanlar normal subagent olarak çalışır.
- Özellik açıkken Claude'un isim verdiği her alt ajan teammate olarak başlar. Kapatmak için değeri `"0"` yapın.

## 2. Subagent ile Agent Team farkı

| | Subagent | Agent Team |
| :- | :- | :- |
| Bağlam | Kendi bağlam penceresi; sonucu çağırana döner | Kendi bağlam penceresi; tamamen bağımsız |
| İletişim | Sonucu ana ajana raporlar | Ekip üyeleri birbirine doğrudan mesaj atar |
| Koordinasyon | Tüm işi ana ajan yönetir | Ortak görev listesi + mesajlaşma ile kendi kendine koordinasyon |
| En uygun iş | Sadece sonucun önemli olduğu odaklı işler | Tartışma ve iş birliği gerektiren karmaşık işler |
| Token maliyeti | Düşük | Yüksek: her üye ayrı bir Claude oturumu |

Benzetme: Subagent'ta patron (siz) her çalışana ayrı iş verir, çalışanlar birbirinden habersizdir.
Agent team'de bir **Team Lead** görev listesini oluşturur, işleri dağıtır; üyeler hem lead ile hem birbirleriyle konuşur.

## 3. Mimari

| Bileşen | Görev |
| :- | :- |
| Team lead | Ekibi kuran, görev dağıtan, sonuçları birleştiren ana oturum |
| Teammate | Atanan görev üzerinde çalışan ayrı Claude Code oturumu |
| Task list | Üyelerin sahiplendiği ve tamamladığı ortak iş listesi (pending / in progress / completed, bağımlılık destekli) |
| Mailbox | Ajanlar arası mesajlaşma (`~/.claude/teams/{takım}/inboxes/{ajan}.json`) |

- Takım yapılandırması: `~/.claude/teams/{takım}/config.json` (elle düzenlemeyin, otomatik üretilir).
- Görev listesi: `~/.claude/tasks/{takım}/`.
- Proje içine `.claude/teams/teams.json` gibi bir dosya koymak yapılandırma **sayılmaz**.

## 4. Ekip nasıl başlatılır

Doğal dille isteyin. Örnek:

```text
Üç kişilik bir ekip kur: biri metin yazarı, biri frontend geliştirici, biri kalite kontrolcü.
```

- Rol isimlerini siz verin (ör. `metin-yazari`, `frontend-dev`, `kalite-kontrol`), sonra isimle hitap edebilirsiniz.
- Model belirtmek isterseniz prompt'ta söyleyin ("her üye için Sonnet kullan").
- Tekrar kullanılacak roller için `.claude/agents/` altında subagent tanımı yapıp "X agent tipini kullanarak bir teammate oluştur" diyebilirsiniz.

## 5. Ekibi yönetme

- **Görünüm modu:** varsayılan `in-process` (tüm üyeler aynı terminalde, ↑/↓ ile seç, Enter ile mesaj at, Ctrl+T görev listesi).
  Bölünmüş panel için `~/.claude/settings.json` → `"teammateMode": "auto"` veya `"tmux"` (tmux ya da iTerm2 + `it2` gerekir; VS Code terminalinde çalışmaz).
- **Plan onayı:** Lead'i plan moduna alıp teammate oluşturursanız teammate önce salt-okunur planlar, plan onaylanınca uygular.
- **Doğrudan konuşma:** Herhangi bir üyeye ek talimat verebilirsiniz.
- **Kapatma:** "frontend-dev teammate'ini kapat" deyin.
- **Kalite kapıları (hook):** `TeammateIdle`, `TaskCreated`, `TaskCompleted` hook'ları exit code 2 ile işi durdurup geri bildirim verebilir.

## 6. İzinler

- Üyeler lead'in izin modunu devralır (`dontAsk` hariç).
- Üyelerin izin istekleri lead oturumuna düşer → çok onay penceresi çıkmaması için izinleri önceden verin
  (`/permissions`, `settings.json` → `permissions.allow`, veya `--dangerously-skip-permissions`).
- Bir üyenin reddedilen işlemi başka üyeye yaptırılamaz; ajan mesajları kullanıcı onayı yerine geçmez.

## 7. En iyi uygulamalar (videodaki püf noktaları + dokümantasyon)

1. **Prompt yapısı:** Hedef → özel talimatlar / referans dosyalar → her ajanın rolü, erişebileceği dosyalar, üreteceği çıktı → ajanlar arası iletişim kuralı → son çıktılar.
2. **Dosya sahipliği:** Her ajanın kendi dosyaları olsun; iki ajan aynı dosyayı düzenlemesin (üzerine yazma/kaos).
3. **Ekip boyutu:** 3–5 üye ideal. Token maliyeti üye sayısıyla doğrusal artar; 3 odaklı üye çoğu zaman 5 dağınık üyeden iyidir.
4. **Görev boyutu:** Üye başına 5–6 net, teslim edilebilir görev.
5. **Bağlamı verin:** Üyeler CLAUDE.md, MCP ve skill'leri yükler ama lead'in sohbet geçmişini görmez. Gerekenleri spawn prompt'una yazın.
6. **Plan/inceleme döngüsü:** Kalite kontrol üyesi bulguları iletir, sorumlu üye düzeltir, kontrolcü onaylar.
7. **Ortak bağlam dosyası:** Herkesin kendi bölümüne kısa not düştüğü bir dosya (bu projede `docs/team/baglam.md`).
8. **İzleyin ve yönlendirin:** Ekibi çok uzun süre başıboş bırakmayın. Lead kendi başına işe girişirse "ekip arkadaşlarının bitirmesini bekle" deyin.

## 8. Ne zaman kullanılmalı / kullanılmamalı

Kullanın: paralel araştırma ve inceleme, ayrı parçalardan oluşan yeni özellik, rakip hipotezlerle hata ayıklama,
frontend + backend + test gibi katmanlar arası işler, kalite kontrol döngüsü gereken işler.

Kullanmayın: ardışık (A→B→C) basit işler, aynı dosya üzerinde düzenleme, çok bağımlı küçük işler.
Bunlar için tek oturum ya da subagent daha ucuz ve etkilidir.

## 9. Sınırlamalar

- `/resume` ve `/rewind` in-process üyeleri geri getirmez.
- Görev durumu gecikebilir; takılan görevi elle kontrol edin.
- Oturum başına tek takım; iç içe takım yok (üyeler üye oluşturamaz); lead değiştirilemez.
- Kapatma yavaş olabilir (üye mevcut işini bitirir).

## 10. Bu projede örnek kullanım

Bkz. `docs/team/` klasörü:
- `front.md` — frontend kuralları (Dawn + `dg-*` tasarım sistemi)
- `baglam.md` — ekibin ortak bağlam dosyası
- `copy.md` — metin yazarının çıktısı
- `report.md` — kalite kontrol raporu
