import { describe, expect, test } from 'vitest'
import { BANK_MAX_DEGREES, bankAngleAt, bankProgressAt, bankSchedule } from './banking'

const FORTY_FIVE_MIN = 45 * 60
const schedule = bankSchedule('s-abc', FORTY_FIVE_MIN)

describe('bankSchedule', () => {
  test('banks at least once during a standard session', () => {
    expect(schedule.length).toBeGreaterThanOrEqual(1)
  })

  test('leaves you alone for the first half-minute', () => {
    expect(schedule[0]!.start).toBeGreaterThanOrEqual(30)
  })

  test('never overlaps two banks', () => {
    for (let i = 1; i < schedule.length; i++) {
      const previousEnd = schedule[i - 1]!.start + schedule[i - 1]!.duration
      expect(schedule[i]!.start).toBeGreaterThan(previousEnd)
    }
  })

  test('finishes every bank before the session ends', () => {
    for (const event of schedule) {
      expect(event.start + event.duration).toBeLessThanOrEqual(FORTY_FIVE_MIN)
    }
  })

  test('banks both ways over a long enough session', () => {
    const long = bankSchedule('s-abc', 4 * 60 * 60)
    const directions = new Set(long.map((e) => e.direction))

    expect(directions.size).toBe(2)
  })

  test('is stable for a given session', () => {
    expect(bankSchedule('s-abc', FORTY_FIVE_MIN)).toEqual(schedule)
  })

  test('schedules nothing for a session too short to hold a bank', () => {
    expect(bankSchedule('s-abc', 20)).toEqual([])
  })
})

describe('bankAngleAt', () => {
  const first = schedule[0]!

  test('sits level before the first bank', () => {
    expect(bankAngleAt(schedule, 0)).toBe(0)
    expect(bankAngleAt(schedule, first.start - 1)).toBe(0)
  })

  test('returns to level once the bank is over', () => {
    expect(bankAngleAt(schedule, first.start + first.duration + 1)).toBe(0)
  })

  test('reaches full angle through the middle of the bank', () => {
    const middle = first.start + first.duration / 2

    expect(Math.abs(bankAngleAt(schedule, middle))).toBeCloseTo(BANK_MAX_DEGREES, 5)
  })

  test('eases in rather than snapping to full angle', () => {
    const justAfterStart = bankAngleAt(schedule, first.start + 0.4)

    expect(Math.abs(justAfterStart)).toBeGreaterThan(0)
    expect(Math.abs(justAfterStart)).toBeLessThan(BANK_MAX_DEGREES * 0.2)
  })

  test('moves smoothly, never jumping between adjacent moments', () => {
    let previous = bankAngleAt(schedule, first.start - 2)
    for (let t = first.start - 2; t < first.start + first.duration + 2; t += 0.1) {
      const current = bankAngleAt(schedule, t)
      expect(Math.abs(current - previous), `jump at ${t.toFixed(1)}s`).toBeLessThan(1)
      previous = current
    }
  })

  test('banks the other way when the event says so', () => {
    const left = [{ start: 10, duration: 20, direction: -1 as const }]
    expect(bankAngleAt(left, 20)).toBeLessThan(0)
  })
})

describe('bankProgressAt', () => {
  const first = schedule[0]!

  test('is zero when level', () => {
    expect(bankProgressAt(schedule, 0)).toBe(0)
  })

  test('is one at full bank, so the ground below can be revealed', () => {
    expect(bankProgressAt(schedule, first.start + first.duration / 2)).toBeCloseTo(1, 5)
  })

  test('is always positive regardless of which way you lean', () => {
    const left = [{ start: 10, duration: 20, direction: -1 as const }]
    expect(bankProgressAt(left, 20)).toBeGreaterThan(0)
  })
})
