import { useEffect, useRef, useState } from 'react'
import type { TimerState } from '../../lib/timer'
import { bankAngleAt, bankProgressAt, type BankEvent } from './banking'
import { createParallax, stepParallax } from './parallax'

interface Options {
  targetSpeed: number
  schedule: readonly BankEvent[]
  timer: TimerState
  enabled: boolean
}

/** Elapsed derived from timestamps, so the scene is accurate to the frame
 *  rather than to the 250ms cadence React re-renders on. */
function elapsedNow(timer: TimerState): number {
  if (timer.runningSince === null) return timer.accumulatedSeconds
  return timer.accumulatedSeconds + (Date.now() - timer.runningSince) / 1000
}

/**
 * One loop drives everything that moves: parallax drift, the roll of a bank,
 * and a slow bob so the aircraft feels airborne. Values are written straight
 * to CSS variables — React never re-renders for a frame of animation.
 */
export function useSceneMotion(
  ref: React.RefObject<HTMLElement | null>,
  { targetSpeed, schedule, timer, enabled }: Options,
): void {
  const latest = useRef({ targetSpeed, schedule, timer })
  // Written after commit rather than during render: a render that React throws
  // away must not leave the loop reading values that were never shown.
  useEffect(() => {
    latest.current = { targetSpeed, schedule, timer }
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (!enabled) {
      element.style.setProperty('--bank', '0deg')
      element.style.setProperty('--bank-progress', '0')
      element.style.setProperty('--bob', '0px')
      return
    }

    let state = createParallax(latest.current.targetSpeed)
    let previous = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const dt = (now - previous) / 1000
      previous = now

      const { targetSpeed: target, schedule: events, timer: t } = latest.current
      state = stepParallax(state, target, dt)

      const elapsed = elapsedNow(t)
      const angle = bankAngleAt(events, elapsed)
      const progress = bankProgressAt(events, elapsed)
      const bob = Math.sin(now / 4200) * 0.45 + Math.sin(now / 9700) * 0.3

      element.style.setProperty('--px-far', state.far.toFixed(5))
      element.style.setProperty('--px-mid', state.mid.toFixed(5))
      element.style.setProperty('--px-near', state.near.toFixed(5))
      element.style.setProperty('--px-cloud', state.cloud.toFixed(5))
      element.style.setProperty('--bank', `${angle.toFixed(3)}deg`)
      element.style.setProperty('--bank-progress', progress.toFixed(4))
      element.style.setProperty('--bob', `${bob.toFixed(3)}%`)

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [ref, enabled])
}

export function usePrefersReducedMotion(): boolean {
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true,
  )
  return reduced
}
