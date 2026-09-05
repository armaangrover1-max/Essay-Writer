/**
 * Timing for the departure sequence that plays on the way into Zen.
 * Kept pure so the ordering and the skip behaviour can be proved without
 * watching it — the same reason banking.ts is a module rather than a component.
 */

export type DeparturePhase = 'roll' | 'rotate' | 'climb' | 'open' | 'done'

/** Milliseconds each phase occupies, in order. */
const SPANS: readonly (readonly [DeparturePhase, number])[] = [
  ['roll', 460],
  ['rotate', 340],
  ['climb', 420],
  ['open', 420],
]

export const DEPARTURE_MS = SPANS.reduce((total, [, ms]) => total + ms, 0)

export const DEPARTURE_PHASES: readonly DeparturePhase[] = [
  ...SPANS.map(([phase]) => phase),
  'done',
]

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function departurePhaseAt(elapsedMs: number): DeparturePhase {
  let start = 0
  for (const [phase, span] of SPANS) {
    if (elapsedMs < start + span) return elapsedMs < 0 ? 'roll' : phase
    start += span
  }
  return 'done'
}

/** How far through the whole sequence, 0–1. */
export function departureProgress(elapsedMs: number): number {
  return clamp(elapsedMs / DEPARTURE_MS, 0, 1)
}

/** How far through the current phase, 0–1. Restarts at each boundary. */
export function phaseProgress(elapsedMs: number): number {
  let start = 0
  for (const [, span] of SPANS) {
    if (elapsedMs < start + span) return clamp((elapsedMs - start) / span, 0, 1)
    start += span
  }
  return 1
}

export function isDepartureComplete(elapsedMs: number): boolean {
  return elapsedMs >= DEPARTURE_MS
}
