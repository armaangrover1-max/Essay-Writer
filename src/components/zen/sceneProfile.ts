import type { Vehicle } from '../../lib/types'
import type { PhaseId } from './journey'

export interface Scene {
  /** Fraction down the window where land begins. */
  horizon: number
  /** Drift-speed multiplier the motion loop eases toward. */
  speed: number
  /** Ridge amplitude. Altitude flattens the ground you look down on. */
  terrainScale: number
  cloudOpacity: number
}

export const PHASE_SCENE: Record<PhaseId, Scene> = {
  depart: { horizon: 0.74, speed: 1.8, terrainScale: 1, cloudOpacity: 0.14 },
  climb: { horizon: 0.6, speed: 1.2, terrainScale: 0.72, cloudOpacity: 0.45 },
  cruise: { horizon: 0.58, speed: 0.42, terrainScale: 0.42, cloudOpacity: 0.9 },
  descend: { horizon: 0.58, speed: 0.95, terrainScale: 0.72, cloudOpacity: 0.5 },
  arrive: { horizon: 0.78, speed: 2, terrainScale: 1, cloudOpacity: 0.1 },
}

export function phaseSpeed(phase: PhaseId, vehicle: Vehicle): number {
  return PHASE_SCENE[phase].speed * (vehicle === 'bus' ? 1.25 : 1)
}
