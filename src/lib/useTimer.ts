import { useCallback, useEffect, useState } from 'react'
import {
  createTimer,
  elapsedSeconds,
  pause as pauseTimer,
  progress as progressOf,
  remainingSeconds,
  setPlanned,
  start as startTimer,
  type TimerState,
} from './timer'

const key = (sessionId: string) => `essay-trainer:timer:${sessionId}`

function loadTimer(sessionId: string, plannedMinutes: number): TimerState {
  try {
    const raw = localStorage.getItem(key(sessionId))
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<TimerState>
      if (typeof parsed.plannedMinutes === 'number') return parsed as TimerState
    }
  } catch {
    /* fall through to a fresh timer */
  }
  return createTimer(plannedMinutes)
}

export function useTimer(sessionId: string, plannedMinutes: number) {
  const [state, setState] = useState<TimerState>(() => loadTimer(sessionId, plannedMinutes))
  const [now, setNow] = useState(() => Date.now())

  const commit = useCallback(
    (next: TimerState) => {
      setState(next)
      try {
        localStorage.setItem(key(sessionId), JSON.stringify(next))
      } catch {
        /* a full or blocked store must not break the session */
      }
    },
    [sessionId],
  )

  useEffect(() => {
    if (state.runningSince === null) return
    // Aligned to the wall second: the display only shows whole seconds, so a
    // faster interval re-rendered the tree for nothing, and an unaligned one
    // made the digits change at an arbitrary moment within each second.
    let id = 0
    const tick = () => {
      setNow(Date.now())
      id = window.setTimeout(tick, 1000 - (Date.now() % 1000))
    }
    id = window.setTimeout(tick, 1000 - (Date.now() % 1000))
    return () => window.clearTimeout(id)
  }, [state.runningSince])

  // A tab returning to the foreground should show the truth immediately.
  useEffect(() => {
    const sync = () => setNow(Date.now())
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  return {
    state,
    isRunning: state.runningSince !== null,
    elapsed: elapsedSeconds(state, now),
    remaining: remainingSeconds(state, now),
    progress: progressOf(state, now),
    start: () => commit(startTimer(state, Date.now())),
    pause: () => commit(pauseTimer(state, Date.now())),
    setMinutes: (minutes: number) => commit(setPlanned(state, minutes)),
    clear: () => {
      try {
        localStorage.removeItem(key(sessionId))
      } catch {
        /* nothing to clean up */
      }
    },
  }
}
