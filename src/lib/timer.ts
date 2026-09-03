/**
 * Elapsed time is derived from timestamps rather than accumulated by ticking,
 * so a backgrounded tab, a sleeping laptop or a page reload all stay accurate.
 */
export interface TimerState {
  plannedMinutes: number
  accumulatedSeconds: number
  /** Epoch ms the current run began, or null when paused. */
  runningSince: number | null
}

export function createTimer(plannedMinutes: number): TimerState {
  return { plannedMinutes, accumulatedSeconds: 0, runningSince: null }
}

export function elapsedSeconds(state: TimerState, now: number): number {
  if (state.runningSince === null) return state.accumulatedSeconds
  return state.accumulatedSeconds + Math.floor((now - state.runningSince) / 1000)
}

export function remainingSeconds(state: TimerState, now: number): number {
  return state.plannedMinutes * 60 - elapsedSeconds(state, now)
}

export function start(state: TimerState, now: number): TimerState {
  if (state.runningSince !== null) return state
  return { ...state, runningSince: now }
}

export function pause(state: TimerState, now: number): TimerState {
  if (state.runningSince === null) return state
  return {
    plannedMinutes: state.plannedMinutes,
    accumulatedSeconds: elapsedSeconds(state, now),
    runningSince: null,
  }
}

export function setPlanned(state: TimerState, plannedMinutes: number): TimerState {
  return { ...state, plannedMinutes }
}

/** Fraction of the planned session that has passed, clamped to 0–1. */
export function progress(state: TimerState, now: number): number {
  const total = state.plannedMinutes * 60
  if (total <= 0) return 1
  return Math.min(1, Math.max(0, elapsedSeconds(state, now) / total))
}

export function formatClock(totalSeconds: number): string {
  const negative = totalSeconds < 0
  // Floor before splitting: a fractional value would otherwise print as 2:5.35.
  const abs = Math.floor(Math.abs(totalSeconds))
  const minutes = Math.floor(abs / 60)
  const seconds = abs % 60
  return `${negative ? '−' : ''}${minutes}:${`${seconds}`.padStart(2, '0')}`
}
