import { describe, expect, test } from 'vitest'
import { hashSeed, seededRandom } from './random'

describe('hashSeed', () => {
  test('turns a string into a stable number', () => {
    expect(hashSeed('s-abc123')).toBe(hashSeed('s-abc123'))
  })

  test('gives different strings different numbers', () => {
    expect(hashSeed('s-abc123')).not.toBe(hashSeed('s-abc124'))
  })

  test('handles an empty string without blowing up', () => {
    expect(Number.isFinite(hashSeed(''))).toBe(true)
  })
})

describe('seededRandom', () => {
  test('replays the same sequence for the same seed', () => {
    const a = seededRandom(42)
    const b = seededRandom(42)

    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })

  test('produces a different sequence for a different seed', () => {
    const a = seededRandom(42)
    const b = seededRandom(43)

    expect(a()).not.toBe(b())
  })

  test('stays within the unit interval', () => {
    const rand = seededRandom(7)
    for (let i = 0; i < 500; i++) {
      const value = rand()
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(1)
    }
  })

  test('does not simply repeat one value', () => {
    const rand = seededRandom(9)
    const values = new Set(Array.from({ length: 50 }, () => rand()))

    expect(values.size).toBeGreaterThan(40)
  })
})
