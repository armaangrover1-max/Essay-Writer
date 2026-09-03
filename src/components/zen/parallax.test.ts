import { describe, expect, test } from 'vitest'
import { LAYER_RATES, createParallax, stepParallax } from './parallax'

const LAYERS = ['far', 'mid', 'near', 'cloud'] as const

describe('stepParallax', () => {
  test('advances nearer layers further than distant ones', () => {
    const after = stepParallax(createParallax(1), 1, 1)

    expect(after.near).toBeGreaterThan(after.mid)
    expect(after.mid).toBeGreaterThan(after.far)
  })

  test('moves each layer at its own rate', () => {
    const after = stepParallax(createParallax(1), 1, 1)

    for (const layer of LAYERS) {
      expect(after[layer], layer).toBeCloseTo(LAYER_RATES[layer], 6)
    }
  })

  test('wraps every offset back into a single tile', () => {
    let state = createParallax(1)
    for (let i = 0; i < 4000; i++) state = stepParallax(state, 1, 0.5)

    for (const layer of LAYERS) {
      expect(state[layer], layer).toBeGreaterThanOrEqual(0)
      expect(state[layer], layer).toBeLessThan(1)
    }
  })

  test('eases toward a new speed instead of snapping to it', () => {
    const after = stepParallax(createParallax(0.4), 2, 0.1)

    expect(after.speed).toBeGreaterThan(0.4)
    expect(after.speed).toBeLessThan(1)
  })

  test('settles on the target speed given enough time', () => {
    let state = createParallax(0.4)
    // A minute of frames — comfortably longer than the easing constant.
    for (let i = 0; i < 1200; i++) state = stepParallax(state, 2, 0.05)

    expect(state.speed).toBeCloseTo(2, 5)
  })

  test('eases downward as readily as upward', () => {
    const after = stepParallax(createParallax(2), 0.4, 0.1)

    expect(after.speed).toBeLessThan(2)
    expect(after.speed).toBeGreaterThan(0.4)
  })

  test('stands still when no time has passed', () => {
    const state = createParallax(1)

    expect(stepParallax(state, 1, 0)).toEqual(state)
  })

  test('survives the long gap left by a backgrounded tab', () => {
    const after = stepParallax(createParallax(1), 1, 600)

    for (const layer of LAYERS) {
      expect(Number.isFinite(after[layer]), layer).toBe(true)
      expect(after[layer], layer).toBeLessThan(1)
    }
    expect(Number.isFinite(after.speed)).toBe(true)
  })

  test('ignores a negative delta rather than running backwards', () => {
    const state = createParallax(1)

    expect(stepParallax(state, 1, -5)).toEqual(state)
  })
})
