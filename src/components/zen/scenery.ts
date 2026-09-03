import type { PhaseId } from './journey'
import { hashSeed, pick, seededRandom } from './random'

export type SceneryId = 'city' | 'hills' | 'mountains' | 'dunes' | 'coast'

export const SCENERY_IDS: readonly SceneryId[] = ['city', 'hills', 'mountains', 'dunes', 'coast']

export interface SceneryProfile {
  label: string
  /** How many crests across one tile. Fewer reads as bigger landforms. */
  points: number
  /** Vertical relief of the ridgeline. */
  amplitude: number
  /** Sharp peaks versus rounded swells. */
  jagged: boolean
  /** Flat water sits in front of the ridges. */
  water: boolean
  /** Carries window lights and a street grid when banked over. */
  builtUp: boolean
}

export const SCENERY: Record<SceneryId, SceneryProfile> = {
  city: { label: 'City', points: 26, amplitude: 46, jagged: true, water: false, builtUp: true },
  hills: { label: 'Hills', points: 9, amplitude: 16, jagged: false, water: false, builtUp: false },
  mountains: { label: 'Mountains', points: 13, amplitude: 40, jagged: true, water: false, builtUp: false },
  dunes: { label: 'Dunes', points: 6, amplitude: 14, jagged: false, water: false, builtUp: false },
  coast: { label: 'Coast', points: 8, amplitude: 26, jagged: false, water: true, builtUp: false },
}

/** Airports sit beside cities, so the ends of every journey are built-up. */
const WILD: readonly SceneryId[] = ['mountains', 'dunes', 'coast', 'hills']
const OUTSKIRTS: readonly SceneryId[] = ['city', 'hills']
const APPROACH: readonly SceneryId[] = ['hills', 'coast', 'mountains']

export function sceneryArc(seed: string): Record<PhaseId, SceneryId> {
  const rand = seededRandom(hashSeed(`scenery:${seed}`))
  return {
    depart: 'city',
    climb: pick(OUTSKIRTS, rand),
    cruise: pick(WILD, rand),
    descend: pick(APPROACH, rand),
    arrive: 'city',
  }
}

export function sceneryAt(seed: string, phase: PhaseId): SceneryId {
  return sceneryArc(seed)[phase]
}
