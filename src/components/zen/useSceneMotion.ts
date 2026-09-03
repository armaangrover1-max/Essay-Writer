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

    // Custom properties inherit, so driving the scene through them invalidated
    // style for every star, cloud and flake in the window — several hundred
    // elements, sixty times a second. That starved the main thread enough to
    // stall the clock and leave its digits half-repainted. Only five elements
    // actually move, so the transforms are written straight to those.
    let world: HTMLElement | null = null
    let bands: SVGElement[] = []

    const collect = () => {
      world = element.querySelector<HTMLElement>('.zen-world')
      bands = Array.from(element.querySelectorAll<SVGElement>('.zen-band[data-layer]'))
    }
    collect()

    const stale = () =>
      !world ||
      !world.isConnected ||
      bands.length === 0 ||
      !bands[0]!.isConnected

    const tick = (now: number) => {
      const dt = (now - previous) / 1000
      previous = now

      // React replaces these on a phase or scenery change.
      if (stale()) collect()

      const { targetSpeed: target, schedule: events, timer: t } = latest.current
      state = stepParallax(state, target, dt)

      const elapsed = elapsedNow(t)
      const angle = bankAngleAt(events, elapsed)
      const progress = bankProgressAt(events, elapsed)
      const bob = Math.sin(now / 4200) * 0.45 + Math.sin(now / 9700) * 0.3

      for (const band of bands) {
        const layer = band.dataset.layer as 'far' | 'mid' | 'near' | 'cloud' | undefined
        if (!layer) continue
        band.style.transform = `translate3d(${(state[layer] * -50).toFixed(3)}%,0,0)`
      }

      if (world) {
        world.style.transform =
          `rotate(${angle.toFixed(2)}deg) ` +
          `scale(${(1 + progress * 0.4).toFixed(4)}) ` +
          `translateY(${(progress * -8 + bob).toFixed(3)}%)`
      }

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
