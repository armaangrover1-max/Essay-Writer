import { describe, expect, test } from 'vitest'
import { WEATHER, WEATHER_IDS, WEATHER_PREFS, resolveWeather } from './weather'

const seeds = Array.from({ length: 40 }, (_, i) => `s-session-${i}`)

describe('resolveWeather', () => {
  test('honours an explicit choice exactly', () => {
    for (const id of WEATHER_IDS) {
      expect(resolveWeather(id, 's-abc')).toBe(id)
    }
  })

  test('rolls a real weather when the choice is to be surprised', () => {
    for (const seed of seeds) {
      expect(WEATHER_IDS).toContain(resolveWeather('surprise', seed))
    }
  })

  test('gives the same session the same surprise every time', () => {
    expect(resolveWeather('surprise', 's-abc')).toBe(resolveWeather('surprise', 's-abc'))
  })

  test('does not give every session the same surprise', () => {
    const rolled = new Set(seeds.map((s) => resolveWeather('surprise', s)))

    expect(rolled.size).toBeGreaterThan(2)
  })

  test('falls back to clear when a stored value is no longer recognised', () => {
    expect(resolveWeather('hurricane' as never, 's-abc')).toBe('clear')
  })
})

describe('WEATHER profiles', () => {
  test('describes every weather id', () => {
    for (const id of WEATHER_IDS) expect(WEATHER[id]).toBeDefined()
  })

  test('puts water on the glass only for rain and storm', () => {
    const wet = WEATHER_IDS.filter((id) => WEATHER[id].droplets)

    expect(wet.sort()).toEqual(['rain', 'storm'])
  })

  test('reserves lightning for the storm', () => {
    const flashing = WEATHER_IDS.filter((id) => WEATHER[id].lightning)

    expect(flashing).toEqual(['storm'])
  })

  test('leaves clear skies undimmed and unclouded', () => {
    expect(WEATHER.clear.dim).toBe(0)
    expect(WEATHER.clear.cloudBoost).toBe(0)
  })

  test('hides more of the stars the thicker the weather gets', () => {
    expect(WEATHER.overcast.starVisibility).toBeLessThan(WEATHER.clear.starVisibility)
    expect(WEATHER.storm.starVisibility).toBeLessThanOrEqual(WEATHER.overcast.starVisibility)
  })
})

describe('WEATHER_PREFS', () => {
  test('offers every weather plus the surprise option', () => {
    expect(WEATHER_PREFS).toHaveLength(WEATHER_IDS.length + 1)
    expect(WEATHER_PREFS[0]).toBe('surprise')
  })
})
