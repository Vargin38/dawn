# Değirmen mağaza teması – çalışma kuralları

Bu repo magaza.degirmen.tr'nin Shopify (Dawn 16) temasının aynasıdır. Canlı tema GitHub'a bağlı DEĞİLDİR; repo yalnızca yedek/ayna görevi görür.

- Düzenlemeye başlamadan önce `themes(roles:[MAIN])` ile canlı temanın id'sini doğrula; kullanıcı Sidekick ile yeni temalar oluşturabiliyor, id değişmiş olabilir.
- Akış: `shopify theme pull --theme <id>` → repoda düzenle → `shopify theme push --theme <id> --allow-live --nodelete --only <dosya>` → doğrula → GitHub'a ayna commit.
- Bölüm (.liquid) dosyasını JSON şablonundan ÖNCE push et; aksi halde Shopify şemanın tanımadığı ayarları siler.
- Kullanıcı yönetim panelinde veya Section Store'da kaydederken push yapma; `git fetch` ile shopify[bot] commit'lerini kontrol et.
- Satış kuralı: fiyat ve sepet yalnızca "Satışta" etiketi VE `price_min > 0` olan ürünlerde görünür (`snippets/dg-satis.liquid`). Fiyatsız ürünler katalogda kalır, teklif akışıyla satılır.
- Teknik özellik, fiyat, şirket yasal verisi (MERSİS, vergi no, adres) uydurma; bilmiyorsan kullanıcıya sor.
- Site metinleri ve kullanıcıya yanıtlar Türkçe.
- Dosyalar CRLF olabilir; tam eşleşmeli düzenlemelerde satır sonlarına dikkat et.
- Tarayıcı paneli `prefers-reduced-motion: reduce` ile çalışır ve ekran görüntüleri bayatlayabilir; görsel değişiklikleri hesaplanmış stil/JS ile doğrula.

---

# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
