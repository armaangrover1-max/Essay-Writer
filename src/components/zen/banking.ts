import { hashSeed, seededRandom } from './random'

export interface BankEvent {
  /** Seconds into the session when the roll begins. */
  start: number
  duration: number
  direction: 1 | -1
}

export const BANK_MAX_DEGREES = 14

/** Four seconds in, ten level, four out — slow enough never to startle. */
const BANK_DURATION = 18
const RAMP = 4 / BANK_DURATION
const FIRST_BANK_NO_EARLIER_THAN = 30
const GAP_MIN = 150
const GAP_RANGE = 170

function smoothstep(x: number): number {
  const t = Math.min(1, Math.max(0, x))
  return t * t * (3 - 2 * t)
}

/**
 * Shape of a single roll: ease out to full angle, hold there, ease back.
 * Holding is what makes it read as an aircraft turning rather than a wobble.
 */
function profile(t: number): number {
  if (t <= 0 || t >= 1) return 0
  if (t < RAMP) return smoothstep(t / RAMP)
  if (t > 1 - RAMP) return smoothstep((1 - t) / RAMP)
  return 1
}

export function bankSchedule(seed: string, totalSeconds: number): BankEvent[] {
  const rand = seededRandom(hashSeed(`bank:${seed}`))
  const events: BankEvent[] = []

  let cursor = FIRST_BANK_NO_EARLIER_THAN + rand() * 90
  let direction: 1 | -1 = rand() < 0.5 ? 1 : -1

  while (cursor + BANK_DURATION <= totalSeconds) {
    events.push({ start: cursor, duration: BANK_DURATION, direction })
    direction = direction === 1 ? -1 : 1
    cursor += BANK_DURATION + GAP_MIN + rand() * GAP_RANGE
  }

  return events
}

function activeAt(schedule: readonly BankEvent[], elapsed: number): { event: BankEvent; t: number } | null {
  for (const event of schedule) {
    if (elapsed >= event.start && elapsed <= event.start + event.duration) {
      return { event, t: (elapsed - event.start) / event.duration }
    }
  }
  return null
}

export function bankAngleAt(schedule: readonly BankEvent[], elapsed: number): number {
  const active = activeAt(schedule, elapsed)
  if (!active) return 0
  return profile(active.t) * BANK_MAX_DEGREES * active.event.direction
}

/** 0 when level, 1 at full bank — drives how much ground comes into view. */
export function bankProgressAt(schedule: readonly BankEvent[], elapsed: number): number {
  const active = activeAt(schedule, elapsed)
  return active ? profile(active.t) : 0
}
