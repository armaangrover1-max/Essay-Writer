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

6. **A glow needs one monotonic gradient, not a gradient plus a `box-shadow`.**
   The sun faded to transparent at 76% of its box while its shadow only began at
   the box edge, leaving a ring of bare sky between the two. It read as a dirty
   halo. One radial gradient whose alpha only ever decreases.
7. **The palette has three blocks per phase** — day, `@media` dark, and explicit
   `[data-theme="dark"]` — and `.zen[data-phase="X"] { --var` is a *substring* of
   the explicit-dark selector. A find-and-replace on it silently writes daytime
   values into the dark block. `styles/zen.css.test.ts` parses the CSS and asserts
   every variable exists in all three blocks, that the two dark blocks agree, and
   that night is never a copy of day. Run it after any palette edit.

8. **A linear gradient's iso-lines are straight, so its last stop is a visible
   edge.** The glass sheen was `linear-gradient(118deg, …, transparent 52%)`. On
   the portrait plane window that read as a corner highlight; on the wide bus
   window the 52% stop became a hard seam straight across the pane. Highlights
   that must not show an edge are radial.
9. **The Zen layout is height-constrained, not width-constrained.** The window
   sits in a `min-h-0 flex-1` row so it takes only the space left after the
   phase label, timer and controls. Sizing it independently (`74vh`) pushed the
   controls off the bottom of the page on short or wide viewports.
10. **Never make the Zen controls `pointer-events-none` when idle.** They fade to
   `opacity-30` and stay clickable; hiding them completely meant a returning user
   found dead buttons and had to click once just to reveal them.

11. **Never drive animation through inherited custom properties on a big
   subtree.** `--px-*`, `--bank` and `--bob` were written to the `.zen` root
   each frame. Custom properties inherit, so all ~528 elements in the scene had
   their style invalidated sixty times a second, starving the main thread: the
   clock stalled and its digits repainted over one another. Only five elements
   actually move, so `useSceneMotion` writes `transform` straight to those.
12. **`WindowScene` and `CabinInterior` are memoised, and must stay that way.**
   Their props are all primitives. Without `memo`, every clock tick reconciled
   the whole scene tree — several hundred SVG nodes, four times a second.
13. **The clock ticks once per wall second, not on a 250ms interval.** It only
   displays whole seconds; the aligned self-correcting `setTimeout` re-renders
   the tree a quarter as often and changes the digits when they visibly should.

Also: percentage width and height are different lengths on a non-square box (this
stretched the sun into an egg), and `formatClock` floors its input because a
fractional value printed as `43:5.3521835`.

## State

The prompt bank is **complete at 60** — 20 per lane, split 6 sharpener / 8
standard / 6 full essay, so every lane-and-length combination can fill a roll of
three. Tests enforce all of that. Everything else is complete too.

Not built, by decision: a pre-writing planning pane, a per-session retrospective
note, multi-device sync.
