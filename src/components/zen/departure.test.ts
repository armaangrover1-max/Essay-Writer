import { describe, expect, test } from 'vitest'
import {
  DEPARTURE_MS,
  DEPARTURE_PHASES,
  departurePhaseAt,
  departureProgress,
  isDepartureComplete,
  phaseProgress,
} from './departure'

describe('departure timing', () => {
  test('is short enough not to be in the way', () => {
    // Long enough to read as a departure, short enough to sit through daily.
    expect(DEPARTURE_MS).toBeGreaterThan(1000)
    expect(DEPARTURE_MS).toBeLessThanOrEqual(2000)
  })

  test('begins on the runway', () => {
    expect(departurePhaseAt(0)).toBe('roll')
  })

  test('passes through every phase in order', () => {
    const seen: string[] = []
    for (let t = 0; t <= DEPARTURE_MS + 50; t += 5) {
      const phase = departurePhaseAt(t)
      if (seen[seen.length - 1] !== phase) seen.push(phase)
    }
    expect(seen).toEqual([...DEPARTURE_PHASES])
  })

  test('never goes backwards', () => {
    let highest = 0
    for (let t = 0; t <= DEPARTURE_MS + 200; t += 7) {
      const index = DEPARTURE_PHASES.indexOf(departurePhaseAt(t))
      expect(index, `regressed at ${t}ms`).toBeGreaterThanOrEqual(highest)
      highest = index
    }
  })

  test('is finished exactly at the end, not before', () => {
    expect(isDepartureComplete(DEPARTURE_MS - 1)).toBe(false)
    expect(isDepartureComplete(DEPARTURE_MS)).toBe(true)
    expect(departurePhaseAt(DEPARTURE_MS)).toBe('done')
  })

  test('stays on the runway if handed a negative time', () => {
    expect(departurePhaseAt(-500)).toBe('roll')
    expect(departureProgress(-500)).toBe(0)
  })

  test('overall progress runs 0 to 1 and clamps', () => {
    expect(departureProgress(0)).toBe(0)
    expect(departureProgress(DEPARTURE_MS / 2)).toBeCloseTo(0.5, 5)
    expect(departureProgress(DEPARTURE_MS)).toBe(1)
    expect(departureProgress(DEPARTURE_MS * 4)).toBe(1)
  })

  test('overall progress only ever increases', () => {
    let previous = -1
    for (let t = 0; t <= DEPARTURE_MS; t += 3) {
      const p = departureProgress(t)
      expect(p).toBeGreaterThanOrEqual(previous)
      previous = p
    }
  })

  test('each phase runs its own 0 to 1', () => {
    // At every phase boundary the local progress restarts near zero.
    let start = 0
    for (const phase of DEPARTURE_PHASES.slice(0, -1)) {
      expect(phaseProgress(start), `${phase} start`).toBeCloseTo(0, 5)
      start += 1
      while (departurePhaseAt(start) === phase) start += 1
      expect(phaseProgress(start - 1), `${phase} end`).toBeGreaterThan(0.9)
    }
  })

  test('phase progress is settled once done', () => {
    expect(phaseProgress(DEPARTURE_MS + 500)).toBe(1)
  })
})
