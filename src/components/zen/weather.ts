import { hashSeed, pick, seededRandom } from './random'

export type WeatherId = 'clear' | 'overcast' | 'rain' | 'snow' | 'fog' | 'storm'
export type WeatherPref = WeatherId | 'surprise'

export const WEATHER_IDS: readonly WeatherId[] = [
  'clear',
  'overcast',
  'rain',
  'snow',
  'fog',
  'storm',
]

export const WEATHER_PREFS: readonly WeatherPref[] = ['surprise', ...WEATHER_IDS]

export interface WeatherProfile {
  label: string
  /** One line for the Settings row. */
  note: string
  /** How much light the weather takes out of the sky, 0–1. */
  dim: number
  /** Extra cloud on top of whatever the phase already carries, 0–1. */
  cloudBoost: number
  /** How much of the starfield survives, 0–1. */
  starVisibility: number
  /** Haze bands that swallow the far ridges, 0–1. */
  haze: number
  /** Water running on the window itself. */
  droplets: boolean
  /** Flakes drifting past the glass. */
  flakes: boolean
  /** Distant, soundless flashes deep in the cloud. */
  lightning: boolean
}

export const WEATHER: Record<WeatherId, WeatherProfile> = {
  clear: {
    label: 'Clear',
    note: 'Nothing between you and the ground.',
    dim: 0,
    cloudBoost: 0,
    starVisibility: 1,
    haze: 0.05,
    droplets: false,
    flakes: false,
    lightning: false,
  },
  overcast: {
    label: 'Overcast',
    note: 'Thick deck, flat light.',
    dim: 0.22,
    cloudBoost: 0.75,
    starVisibility: 0.15,
    haze: 0.3,
    droplets: false,
    flakes: false,
    lightning: false,
  },
  rain: {
    label: 'Rain',
    note: 'Water running on the glass.',
    dim: 0.32,
    cloudBoost: 0.6,
    starVisibility: 0.1,
    haze: 0.45,
    droplets: true,
    flakes: false,
    lightning: false,
  },
  snow: {
    label: 'Snow',
    note: 'Slow flakes, quietest of the six.',
    dim: 0.18,
    cloudBoost: 0.45,
    starVisibility: 0.35,
    haze: 0.4,
    droplets: false,
    flakes: true,
    lightning: false,
  },
  fog: {
    label: 'Fog',
    note: 'Haze swallowing the far ridges.',
    dim: 0.2,
    cloudBoost: 0.2,
    starVisibility: 0.25,
    haze: 0.9,
    droplets: false,
    flakes: false,
    lightning: false,
  },
  storm: {
    label: 'Storm',
    note: 'Far-off flashes, no thunder.',
    dim: 0.42,
    cloudBoost: 0.9,
    starVisibility: 0.05,
    haze: 0.5,
    droplets: true,
    flakes: false,
    lightning: true,
  },
}

export function resolveWeather(pref: WeatherPref, seed: string): WeatherId {
  if (pref === 'surprise') {
    return pick(WEATHER_IDS, seededRandom(hashSeed(`weather:${seed}`)))
  }
  // A preference stored by an older build might no longer exist.
  return WEATHER_IDS.includes(pref) ? pref : 'clear'
}
