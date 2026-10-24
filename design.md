# Fluence: Brand and Design Brief

**Tagline:** Fluent in movement

Look-and-feel reference for the Fluence app (women's pilates and workout). Source: the Fluence moodboard in Figma (file `zGQkXaNMMzrwg3hybmu0i9`, frame "Moodboard"). Use the moodboard images as a **style reference only**: create our own copy, imagery and illustrations.

---

## 1. Brand idea

**Calm body-tech.** Organic and soft on the surface, precise and digital underneath. Natural wellness meets a quiet gadget feel.

- Premium, editorial and graceful. Not gym-bro, loud or competitive.
- Movement and flow are the core metaphor: blurred motion, soft gradients, fluid shapes.
- Women's pilates and workout focus. Faceless bodies keep it inclusive and calm.
- Light mode only.

## 2. Color

Flat editorial palette from the Figma style guide ("Colors"). Source of truth is `styles.css` `:root`.

| Token | Hex |
| --- | --- |
| Neutral 700 (ink) / 600 / 500 / 400 / 300 / 200 / 100 | `#191818` / `#525252` / `#737373` / `#AAAAAA` / `#D4D4D4` / `#EEEEEE` / `#FFFFFF` |
| Pink 400 / 300 / 200 / 100 | `#653228` / `#935447` / `#C78375` / `#FFD8CF` |
| Cream 300 / 200 / 100 | `#7E695B` / `#9A7D69` / `#F3EDE1` |

- White page, cream surfaces, ink text and 1px ink outlines.
- Brown-to-cream radial gradient tiles with grain (stage, score, image options). Green tile = correct, grey tile = wrong.
- Pink 300 = correct / hot chip. Neutral 300 = wrong. No dark mode.

## 3. Typography

- **Header:** Goudy Bookletter 1911, line-height 0.9, tight tracking (sizes 12-82).
- **Sub-heading / numerals:** Gill Sans Regular, line-height 1.2 (8-24, Huge 96).
- **Paragraph:** Gill Sans Light, line-height 1.4 (10-20).
- **Caption:** DM Mono 12px, tracked, uppercase.

Gill Sans is a system font (not on Google Fonts); fallback is Lato.

## 4. Logo

Lowercase "fluence" with a small tm mark in thin sans. Ink on light backgrounds.

## 5. UI style

- Flat, 1px ink borders, light shadows only (`0 2px 10px` / `0 4px 20px` at 10% black).
- Radii: pill 999, option row / stage / score 8, image option 12, topic card and icon button 22.
- Buttons: primary = ink fill, secondary = ink outline, on-dark = cream fill.
- Icon buttons: 44px circle, 5% black fill, 11px backdrop blur.

## 6. Interaction states

- **Selected:** brighter glass with a white outline and a faint lemon-lime glow.
- **Correct:** soft glow in the green/yellow range.
- **Wrong:** subtle shake or muted gray outline. No harsh red or green.
- **Progress / timer:** thin bar at the top of each round. Timer value in pixel font.
- **Streak:** simple counter in pixel font.
- No lives and no penalties. The game must feel friendly, never like a test you can fail.

## 7. Illustration

**Marker, single color, clean, no face.**

- Black (or white on gradients) marker line art of pilates and workout poses.
- One color, clean confident strokes. Outline and filled-silhouette variants are both in the references. Pick one primary style and keep it consistent.
- **Faceless** figures only.
- One consistent character across the full set (same proportions, hair, stroke weight).
- Equipment (mat, dumbbell, machine) drawn as simple outlines.
- One signature frame per movement: the pose an instructor would use to name it.
- Poses must be accurate. Have someone who trains or teaches pilates review them.

## 8. Layout

- Mobile-first, vertical layout. It must also work in a phone screen recording.
- Big images, big text, thumb-sized buttons.
- No tiny UI that disappears when recorded.
- Generous spacing. Let the gradient backgrounds breathe.

## 9. Tone of voice

Encouraging, jargon-free, a little cheeky. Never intimidating or guilt-heavy.

## 10. Moodboard map

| Section | What it says |
| --- | --- |
| Colors & Vibes | Gradient: green, blue, yellow. Botanical, soft, dreamy |
| Font | Sans serif, monospace, vintage pixel font |
| UI Style | Glassmorphism, modern, tech |
| Logo | Vintage pixel fonts |
| Illustration Style | Marker, single color, clean, no face |

## 11. Open items

- [x] Palette, fonts and components taken from the Figma style guide, implemented in `styles.css`
