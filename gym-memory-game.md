# Fluence

**Tagline:** Fluent in movement

The name comes from the idea of learning the language of the gym and the pilates studio: knowing what each movement is called and what it looks like.

A short, Duolingo-style memory game where beginners match gym and pilates movements to their names using simple line illustrations. Built as a vibe-coded web app that people play by opening a link. Not a native app (yet). Videos for Shorts, Reels and TikTok are a secondary way to share it.

---

## 1. Concept

Players see a movement illustration and guess its name, or read a name and pick the right illustration. Memory is tested and scored, and by the end of a round the player has paired the image with the name, so the movement is easier to recall in a real gym or pilates class.

## 2. Problem

- **At the gym:** without a PT, I feel lost. I end up watching TikToks and Reels and repeating them because I forget the movements and what they are called.
- **In pilates class:** some instructors only say the movement name without demonstrating it. I don't know what to do and feel lost.

The gap: most fitness content teaches *how to do* an exercise. Very few help people remember *what it is called and what it looks like*.

## 3. Audience

- Beginners to working out
- Primarily women
- People who feel intimidated or lost in gyms and pilates classes

## 4. Goals

**Product goals**
- After one play-through, players can match more movements to names than before.
- The game feels calm, friendly and non-intimidating, never like a test they can fail.

**Build goals**
- A polished, playable, mobile-first web app, finished end to end: topic select, a mixed round, scoring and an end screen.
- A look and feel that matches the reference style, with all 32 illustrations in place.

**Success looks like (for now)**
- People can open the link, finish a round without instructions, and want to replay.
- Players match more movements to names on their second round than their first.

## 5. Scope

**In scope**
- 2 topics, 16 movements each (32 illustrations in total)
- One mixed round per topic: 3 segments in a fixed order, no levels
- Scoring, a rank and an end screen
- Single-page web app, hardcoded content, no backend

**Out of scope for now**
- Real app, accounts, or social features
- Spaced repetition, saved movement library, progress map, XP, streak reminders
- Additional topics (e.g. Reformer Pilates, No Equipment Workout)
- Real-time class or workout companion features

## 6. Topics and movements

### Gym Basics

1. Squat
2. Lunge
3. Hip Thrust
4. Romanian Deadlift
5. Leg Press
6. Shoulder Press
7. Lateral Raise
8. Bicep Curl
9. Tricep Extension
10. Lat Pulldown
11. Seated Row
12. Chest Press
13. Plank
14. Glute Kickback
15. Russian Twist
16. Leg Extension

### Mat Pilates

1. Shoulder Bridge
2. Bicycle
3. Side Kick
4. The Hundred
5. Roll Up
6. Table Top
7. Crunch Row
8. Oblique Crunch
9. Bear Hold
10. Glute Bridge
11. Bird Dog
12. Single-Leg Extension
13. Side Bend with Reach
14. Double-Leg Extension
15. Criss-Cross
16. Saw

Names like "The Hundred", "Saw", "Bear Hold" and "Bird Dog" sound unfamiliar and funny, which makes the pilates list the stronger hook for a first video.

## 7. Gameplay

### The round (per topic, no levels)

One mixed round of about 12 questions, split into 3 short segments. The segments always play in the same order (1, 2, 3).

| # | Segment | How it works |
| --- | --- | --- |
| 1 | Image → Name (4 questions) | See a movement illustration, pick its name from 4 options |
| 2 | Name → Image (4 questions) | Read a movement name, pick the correct illustration from 4 options |
| 3 | Speed burst (20 seconds) | Name as many movements as you can. A short "Speed round!" screen warns the player first |

### Round rules

- Questions are drawn at random from the topic's 16 movements, so replays feel different.
- The same movement may return in another mode (good for recall), but never twice in a row.
- Wrong options come from the same topic. Similar movements make the best distractors.
- In the speed burst, repeats are allowed and there are no penalties.

### Scoring

- +10 per correct answer
- +5 speed bonus for answering in under 3 seconds
- ×2 streak multiplier after 3 correct in a row
- No lives and no penalties, to keep it friendly for beginners

### End screen

- Final score
- A rank title based on score, from lowest to highest (score ranges TBD):
  1. Just Starting Out
  2. Picking Up the Basics
  3. Getting the Hang of It
  4. Fluent in Movement
- "Movements you missed" shown as small cards, which supports the "I learned something" story
- Replay and switch-topic buttons

## 8. Video format (secondary)

Videos are an optional way to share the game, not the focus of the build.

- **Hook:** "Can you name these 8 gym movements?" or "POV: your pilates instructor just said 'teaser' and you panic."
- **Structure:** play cold (low score) → learn the movements → replay (higher score). This shows memory improving in about 60 seconds.
- **Shareable moment:** the end screen with score and rank, designed to be screenshotted and commented on.

## 9. Illustration risks

1. **Similar poses are hard in one-color line art.** Shoulder Bridge vs Glute Bridge (and Hip Thrust in the gym topic), Single-Leg vs Double-Leg Extension, Table Top vs Bear Hold, and Bicycle vs Criss-Cross vs Oblique Crunch are the worst offenders. Exaggerate the key difference (arm and leg position) or use them deliberately as "tricky" questions.
2. **Consistency across 32 images.** Use one character, one stroke weight, and one prompt or style template.
3. **Accuracy.** Wrong form teaches wrong habits. Have someone who trains or teaches pilates review the 32 poses and names before recording.

## 10. Technical approach

- Single-page web app (React or plain HTML/JS)
- No backend
- Content as a hardcoded array: `{ name, image, topic }`
- Hosted as a simple static page that opens from a shared link

## 11. Open items

- [x] Game name: Fluence (a concept name for the videos; viewers open a link to play, so no SEO, handle or app store work needed)
- [x] Tagline: Fluent in movement
- [x] Rank titles for the end screen (see End screen)

**To define before and during the build**
- [ ] Screen list and user flow (home, topic select, game, end screen). Done: no level select
- [x] Score ranges: 0 / 90 / 170 / 250 (first guess, tune after playtests)
- [ ] Data structure for the 32 movements, and how wrong options (distractors) are chosen
- [ ] Tech stack (React or plain HTML/JS) and where to host it
- [ ] Microcopy tone guide and sample lines (buttons, feedback, end screen)
- [ ] Illustration prompt template or illustrator for the 32 images
- [ ] Placeholder illustrations so the app can be built before the real ones are ready
- [ ] Form check on the 32 poses

## 12. Possible later additions

Only if the videos get traction: spaced repetition, a saved movement library, a third topic (e.g. Reformer Pilates), progress map and streaks, additional game modes (muscle group match, spot the difference, sequence memory, pilates cue mode).
