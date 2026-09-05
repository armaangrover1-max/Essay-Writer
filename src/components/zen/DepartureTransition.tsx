import { useEffect, useRef, useState } from 'react'
import type { Vehicle } from '../../lib/types'
import {
  DEPARTURE_MS,
  departurePhaseAt,
  departureProgress,
  type DeparturePhase,
} from './departure'

/** Ground markings that rush past and fall away as you leave them. */
function Ground({ vehicle, phase }: { vehicle: Vehicle; phase: DeparturePhase }) {
  const gone = phase === 'climb' || phase === 'open' || phase === 'done'
  const marks = vehicle === 'plane' ? 7 : 12

  return (
    <div
      className="absolute inset-x-0 bottom-0 h-[38%] overflow-hidden transition-[opacity,transform] duration-700 ease-[var(--ease-soft)]"
      style={{ opacity: gone ? 0 : 1, transform: gone ? 'translateY(40%) scale(1.1)' : 'none' }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent, color-mix(in oklab, var(--c-ink) 12%, transparent))',
        }}
      />
      <div className="dep-rush absolute inset-x-0 bottom-[30%] flex items-center gap-[6vw]">
        {Array.from({ length: marks }, (_, i) => (
          <span
            key={i}
            className="h-[3px] shrink-0 rounded-full bg-ink-faint"
            style={{ width: vehicle === 'plane' ? '7vw' : '3vw', opacity: 0.5 }}
          />
        ))}
      </div>
    </div>
  )
}

function Plane({ phase }: { phase: DeparturePhase }) {
  const rotated = phase === 'rotate' || phase === 'climb' || phase === 'open' || phase === 'done'
  const climbing = phase === 'climb' || phase === 'open' || phase === 'done'

  return (
    <svg
      viewBox="0 0 120 40"
      className="absolute h-[9vh] w-auto transition-all duration-[700ms] ease-[var(--ease-soft)]"
      style={{
        left: climbing ? '78%' : '30%',
        bottom: climbing ? '72%' : '30%',
        transform: `rotate(${rotated ? -19 : 0}deg) scale(${climbing ? 0.55 : 1})`,
        opacity: phase === 'open' || phase === 'done' ? 0 : 1,
      }}
      aria-hidden
    >
      {/* Nose to the right: it climbs away toward the top-right corner, and a
          silhouette facing the other way would fly backwards. */}
      <g fill="var(--c-ink)">
        <path d="M10,21 L96,16 L112,19.5 L96,23 L10,24 Z" />
        <path d="M16,21 L27,5 L34,5 L29,21 Z" opacity="0.85" />
        <path d="M20,23 L12,31 L19,31 L27,23 Z" opacity="0.55" />
        <path d="M66,22 L44,37 L57,37 L78,22 Z" opacity="0.75" />
      </g>
    </svg>
  )
}

function Bus({ phase }: { phase: DeparturePhase }) {
  const away = phase === 'climb' || phase === 'open' || phase === 'done'
  const pulling = phase === 'rotate' || away

  return (
    <svg
      viewBox="0 0 140 60"
      className="absolute h-[11vh] w-auto transition-all duration-[700ms] ease-[var(--ease-soft)]"
      style={{
        left: away ? '86%' : pulling ? '46%' : '28%',
        bottom: '26%',
        transform: `scale(${away ? 0.62 : 1})`,
        opacity: phase === 'open' || phase === 'done' ? 0 : 1,
      }}
      aria-hidden
    >
      <g fill="var(--c-ink)">
        <rect x="6" y="10" width="124" height="34" rx="7" />
        <rect x="14" y="17" width="26" height="14" rx="3" fill="var(--c-canvas)" opacity="0.75" />
        <rect x="46" y="17" width="26" height="14" rx="3" fill="var(--c-canvas)" opacity="0.75" />
        <rect x="78" y="17" width="26" height="14" rx="3" fill="var(--c-canvas)" opacity="0.75" />
        <circle cx="34" cy="46" r="8" />
        <circle cx="104" cy="46" r="8" />
      </g>
    </svg>
  )
}

/**
 * Plays once on the way into Zen, then calls onDone. Skippable by any click or
 * key, and skipped outright when the viewer prefers reduced motion — a
 * departure animation is exactly the sort of thing that setting is asking about.
 */
export function DepartureTransition({
  vehicle,
  onDone,
}: {
  vehicle: Vehicle
  onDone: () => void
}) {
  const [phase, setPhase] = useState<DeparturePhase>('roll')
  const [progress, setProgress] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const finish = () => {
      if (done.current) return
      done.current = true
      onDone()
    }

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
    if (reduced) {
      finish()
      return
    }

    const started = performance.now()
    const startedAt = Date.now()
    let frame = requestAnimationFrame(function tick(now) {
      const elapsed = now - started
      setPhase(departurePhaseAt(elapsed))
      setProgress(departureProgress(elapsed))
      if (elapsed >= DEPARTURE_MS) finish()
      else frame = requestAnimationFrame(tick)
    })

    // A backgrounded tab delivers no frames, and its timers are throttled hard
    // — so neither a frame loop nor a timeout can be trusted to end this on its
    // own. Wall-clock time is the one thing that keeps running, so returning to
    // the tab settles it immediately rather than resuming a stale take-off.
    const settleIfOverdue = () => {
      if (Date.now() - startedAt >= DEPARTURE_MS) finish()
    }
    const guard = window.setTimeout(finish, DEPARTURE_MS + 600)
    document.addEventListener('visibilitychange', settleIfOverdue)

    window.addEventListener('keydown', finish)
    window.addEventListener('pointerdown', finish)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(guard)
      document.removeEventListener('visibilitychange', settleIfOverdue)
      window.removeEventListener('keydown', finish)
      window.removeEventListener('pointerdown', finish)
    }
  }, [onDone])

  const opening = phase === 'open' || phase === 'done'

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-canvas"
      style={{ opacity: phase === 'done' ? 0 : 1, transition: 'opacity 320ms var(--ease-soft)' }}
      role="presentation"
    >
      {/* The sky washing in from the horizon as you leave the ground. */}
      <div
        className="absolute inset-0 transition-opacity duration-[900ms] ease-[var(--ease-soft)]"
        style={{
          opacity: progress * 0.9,
          background:
            'linear-gradient(to bottom, var(--sky-1, #24406e) 0%, var(--sky-3, #c98a79) 62%, var(--sky-4, #f0b07a) 100%)',
        }}
        aria-hidden
      />

      {vehicle === 'plane' ? <Plane phase={phase} /> : <Bus phase={phase} />}
      <Ground vehicle={vehicle} phase={phase} />

      {/* The window opening onto the scene. */}
      <div
        className="absolute inset-0 grid place-items-center transition-opacity duration-500"
        style={{ opacity: opening ? 1 : 0 }}
        aria-hidden
      >
        <div
          className="rounded-[46%/33%] border border-line bg-canvas transition-all duration-[620ms] ease-[var(--ease-soft)]"
          style={{
            width: opening ? '160vmax' : '12vmin',
            height: opening ? '160vmax' : '16vmin',
            opacity: opening ? 0 : 1,
          }}
        />
      </div>

      <p
        className="absolute inset-x-0 bottom-8 text-center text-xs tracking-[0.16em] text-ink-faint uppercase transition-opacity duration-300"
        style={{ opacity: phase === 'roll' ? 0.7 : 0 }}
      >
        {vehicle === 'plane' ? 'cleared for take-off' : 'departing'}
      </p>
    </div>
  )
}
