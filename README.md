# Essay Trainer

A companion for essay practice — for essays written **on paper**.

It is not an editor. There is no text box anywhere in it. What it does is
everything *around* the writing: hand you a prompt worth thinking about, show
you how the form works, pace the session, and keep a record of what you did.

## What it does

**Three prompts, one button.** Pick a lane and a length, and it deals three
prompts at random. Only the one you actually write is used up — the two you pass
on go back in the pool.

**Prompts that teach before you write.** Every prompt is hand-authored. Each
carries a real position and a genuine tension: Kant refusing to lie to the
murderer at the door, Sandel on why meritocracy humiliates the people it sorts,
Parfit unable to escape his own Repugnant Conclusion. Nothing is generated.

**The depth layer unlocks only after you finish.** The steelman you may have
missed, a short reading list, and the trap the prompt reliably provokes — all
withheld until you have written, so they cannot shape what you wrote.

**Three lanes, three crafts.** Application, Argument and Creative each get their
own prompts, their own structural guidance, and their own review rubric. A
personal statement is judged on specificity and voice; an argument essay on
thesis and counterargument.

**Zen focus mode.** A window seat where the journey *is* the timer: taxi, climb,
cruise, descent, landing. The light turns over as the session runs, and the
ground under you changes — city on departure and arrival, then mountains, dunes,
coast or hills for the long middle, drawn from the session so it never re-rolls.

Every few minutes the aircraft banks. The horizon rolls, more ground comes into
view, and over a city that means a grid of lights below you. The wing stays put
while the world tilts, which is what makes it read as a turn rather than a
spinning picture.

Weather is chosen in Settings — clear, overcast, rain, snow, fog, storm, or
*surprise me*, which draws one per session. Rain and its droplets sit on the
glass rather than in the distance. Plane or bus; optional cabin hum, generated
in the browser. All of it is CSS and SVG: no images, no video, nothing fetched.

**A record worth keeping.** Self-review against six criteria, a photo of the
finished page, and a history that tells you which criterion has been letting you
down lately.

## Running it

```bash
npm install
```

```bash
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm test` | Run the test suite |
| `npm run build` | Production build into `dist/` |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | oxlint |

## Where your data lives

On this device, and nowhere else. There is no backend, no account and no network
request — the app works fully offline.

- Sessions, streaks, settings and bookmarks: `localStorage`
- Photos of pages: IndexedDB, downscaled to a 1600px long edge

**Browser storage can be cleared without warning.** Settings has two exports:
*History* (metadata only, a few KB) and *Full archive* (everything, photos
included). Export the archive about once a month.

## Adding prompts

The bank ships with nine prompts — three per lane, all at standard length — as a
deliberate first batch, so the format can be judged in real use before the rest
are written.

To add more, append to `src/data/prompts/{application,argument,creative}.ts`. No
code changes are needed; `index.ts` picks them up. The tests in
`src/data/prompts/index.test.ts` enforce the standards: unique ids, no empty
fields, at least two real sources per prompt, and a seed substantial enough to
actually frame a problem.

## Layout

```
src/
  routes/          Dashboard NewSession Session ZenFocus Review History Settings
  components/      Prompt cards, timer, rubric, photo capture, heatmap, goal ring
  components/zen/  Window scene, cabin interior, landforms, and the pure
                   modules behind them — scenery, weather, banking, parallax
  data/prompts/    The bank, one file per lane
  data/guidance/   Structural guidance per lane, plus a small citation reference
  data/rubrics.ts  The six review criteria for each lane
  lib/             types, selection, stats, timer, actions, storage
```

Storage sits behind an interface in `lib/storage/`, so swapping `localStorage`
for a hosted database later is a contained change.

Everything the window does that could be got wrong — which ground a session
flies over, what the weather resolves to, when and how far the aircraft banks,
how the parallax eases between speeds — lives in a pure module with tests, so
none of it depends on watching the screen to know it is right.

## Not built yet

- A pre-writing planning pane (thesis, three moves, strongest objection).
- A one-line retrospective note per session.
- Multi-device sync.
