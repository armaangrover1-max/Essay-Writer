import { describe, expect, test } from 'vitest'
import { PHASE_LABEL, PHASES, phaseAt, phaseIndex } from './journey'

describe('phaseAt', () => {
  test('opens on the ground', () => {
    expect(phaseAt(0)).toBe('depart')
    expect(phaseAt(0.04)).toBe('depart')
  })

  test('climbs out of the first twentieth', () => {
    expect(phaseAt(0.05)).toBe('climb')
    expect(phaseAt(0.19)).toBe('climb')
  })

  test('spends the long middle at cruise', () => {
    expect(phaseAt(0.2)).toBe('cruise')
    expect(phaseAt(0.5)).toBe('cruise')
    expect(phaseAt(0.74)).toBe('cruise')
  })

  test('begins descending at three quarters', () => {
    expect(phaseAt(0.75)).toBe('descend')
    expect(phaseAt(0.94)).toBe('descend')
  })

  test('arrives in the last twentieth', () => {
    expect(phaseAt(0.95)).toBe('arrive')
    expect(phaseAt(1)).toBe('arrive')
  })

  test('clamps values that fall outside the journey', () => {
    expect(phaseAt(-1)).toBe('depart')
    expect(phaseAt(5)).toBe('arrive')
  })
})

describe('phaseIndex', () => {
  test('numbers the phases in travel order', () => {
    expect(phaseIndex('depart')).toBe(0)
    expect(phaseIndex('arrive')).toBe(PHASES.length - 1)
  })
})

describe('PHASE_LABEL', () => {
  test('names every phase for both vehicles', () => {
    for (const phase of PHASES) {
      expect(PHASE_LABEL.plane[phase]).toBeTruthy()
      expect(PHASE_LABEL.bus[phase]).toBeTruthy()
    }
  })

  test('describes the plane and the bus differently', () => {
    expect(PHASE_LABEL.plane.cruise).not.toBe(PHASE_LABEL.bus.cruise)
  })
})
