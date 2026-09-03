import type { Vehicle } from '../../lib/types'

export type PhaseId = 'depart' | 'climb' | 'cruise' | 'descend' | 'arrive'

export const PHASES: readonly PhaseId[] = ['depart', 'climb', 'cruise', 'descend', 'arrive']

/** Where each phase begins, as a fraction of the planned session. */
const PHASE_START: Record<PhaseId, number> = {
  depart: 0,
  climb: 0.05,
  cruise: 0.2,
  descend: 0.75,
  arrive: 0.95,
}

export function phaseAt(progress: number): PhaseId {
  const p = Math.min(1, Math.max(0, progress))
  let current: PhaseId = 'depart'
  for (const phase of PHASES) {
    if (p >= PHASE_START[phase]) current = phase
  }
  return current
}

export function phaseIndex(phase: PhaseId): number {
  return PHASES.indexOf(phase)
}

export const PHASE_LABEL: Record<Vehicle, Record<PhaseId, string>> = {
  plane: {
    depart: 'Taxiing',
    climb: 'Climbing',
    cruise: 'Cruising',
    descend: 'Descending',
    arrive: 'Landing',
  },
  bus: {
    depart: 'Leaving the depot',
    climb: 'City streets',
    cruise: 'Open road',
    descend: 'Approaching town',
    arrive: 'Arriving',
  },
}
