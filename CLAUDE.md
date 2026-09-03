# Essay Trainer

A companion for essay practice. Essays are written **on paper** — there is no text
editor anywhere in this app and there should never be one. Everything here happens
*around* the writing: the prompt, the guidance, the timer, the record.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server on :5173 |
| `npm test` | Vitest (129 tests) |
| `npm run typecheck` | `tsc -b` |
| `npm run lint` | oxlint |
| `npm run build` | Production build |

Stack: Vite 8, React 19, TypeScript 6, Tailwind v4, react-router 7, `idb`. No
backend, no network requests, works fully offline.

## Rules that aren't obvious from the code

- **The depth layer stays hidden until the session is finished.** `prompt.depth`
  (steelman, reading list, trap) must only ever render on `/review` or in history.
  Leaking it onto `/write` destroys the point of the feature.
- **Only the prompt actually written is consumed.** Passed-over prompts stay in the
  pool. `writtenPromptIds` is appended in `finishSession`, never on selection.
- **Departure and arrival scenery are always `city`.** Airports sit beside them, and
  the banking reveal depends on it.
- **Anything in `components/zen/` that could be wrong gets a pure module + tests.**
  scenery, weather, banking, parallax, journey, random are all pure and tested;
  the `.tsx` files only render. Don't put logic in the components.
- **Prompt bank standards are enforced by tests** (`data/prompts/index.test.ts`):
  unique ids, no empty fields, ≥2 real sources, seed >140 chars, ≥3 standard-tier
  prompts per lane. Adding prompts is appending to a lane file — no code changes.

## Layout

```
src/
  routes/          Dashboard NewSession Session ZenFocus Review History Settings
  components/      Prompt card, timer, rubric, photo capture, heatmap, goal ring
  components/zen/  Pure: scenery weather banking parallax journey random landforms
                   Render: WindowScene CabinInterior useSceneMotion
  data/prompts/    The bank, one file per lane (application/argument/creative)
  data/guidance/   Per-lane structural guidance + a small citation reference
  data/rubrics.ts  Six review criteria per lane
  lib/             types selection stats timer actions image storage/
  styles/          index.css (app theme) + zen.css (window palettes)
```

Storage is behind an interface in `lib/storage/` — localStorage for data, IndexedDB
for photos. Swapping in a hosted DB later is a contained change.

## Gotchas (each of these cost real time)

1. **CSS custom properties cannot transition unless registered with `@property`.**
   All the sky/land/sun variables are registered at the top of `zen.css`. Without
   that, `transition: --sky-1 10s` is silently inert and phase changes hard-cut.
2. **Percentage `translate()` resolves against the element's own box, not its
   parent.** Snow and rain therefore use full-height carrier columns, with the
   visible dot/streak as a child. A 2px flake translated 100% moves 2px.
3. **Theme must be applied before first paint.** An inline script in `index.html`
   reads `settings.theme` from localStorage and sets `data-theme`. Without it a
   dark-preferring browser starts on the wrong palette and slowly transitions.
4. **Blobs do not survive IndexedDB structured-clone in jsdom**, and historically
   not in Safari. `storage/photos.ts` stores `{ type, bytes: ArrayBuffer }` and
   reconstructs the Blob on read. Keep it that way.
5. **TypeScript runs with `erasableSyntaxOnly`** — constructor parameter properties
   (`constructor(private x: T)`) are a compile error. Assign in the body.

Also: percentage width and height are different lengths on a non-square box (this
stretched the sun into an egg), and `formatClock` floors its input because a
fractional value printed as `43:5.3521835`.

## State

The prompt bank ships **9 of a planned 60** prompts — 3 per lane, all standard
tier. This is deliberate: the format is meant to be judged in real use before the
remaining 51 are authored. Everything else is complete.

Not built, by decision: a pre-writing planning pane, a per-session retrospective
note, multi-device sync.
