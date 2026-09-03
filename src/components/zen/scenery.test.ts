import { describe, expect, test } from 'vitest'
import { SCENERY, SCENERY_IDS, sceneryArc, sceneryAt } from './scenery'
import { PHASES } from './journey'

const seeds = Array.from({ length: 40 }, (_, i) => `s-session-${i}`)

describe('sceneryArc', () => {
  test('always takes off from a city', () => {
    for (const seed of seeds) expect(sceneryArc(seed).depart).toBe('city')
  })

  test('always lands at a city', () => {
    for (const seed of seeds) expect(sceneryArc(seed).arrive).toBe('city')
  })

  test('never spends the cruise over a city', () => {
    for (const seed of seeds) expect(sceneryArc(seed).cruise).not.toBe('city')
  })

  test('gives every phase a scenery that exists', () => {
    for (const seed of seeds) {
      const arc = sceneryArc(seed)
      for (const phase of PHASES) {
        expect(SCENERY_IDS, `${seed} ${phase}`).toContain(arc[phase])
      }
    }
  })

  test('is stable for a given session', () => {
    expect(sceneryArc('s-abc')).toEqual(sceneryArc('s-abc'))
  })

  test('does not hand every session the same cruise', () => {
    const cruises = new Set(seeds.map((s) => sceneryArc(s).cruise))

    expect(cruises.size).toBeGreaterThan(1)
  })
})

describe('sceneryAt', () => {
  test('agrees with the arc it came from', () => {
    for (const phase of PHASES) {
      expect(sceneryAt('s-abc', phase)).toBe(sceneryArc('s-abc')[phase])
    }
  })
})

describe('SCENERY profiles', () => {
  test('describes every scenery id', () => {
    for (const id of SCENERY_IDS) expect(SCENERY[id]).toBeDefined()
  })

  test('gives mountains sharper relief than dunes', () => {
    expect(SCENERY.mountains.amplitude).toBeGreaterThan(SCENERY.dunes.amplitude)
  })

  test('marks only the city as built-up, so lights can be drawn on it', () => {
    const builtUp = SCENERY_IDS.filter((id) => SCENERY[id].builtUp)

    expect(builtUp).toEqual(['city'])
  })
})
