import { useMemo } from 'react'
import type { Vehicle } from '../../lib/types'
import { seededRandom } from './random'
import { WEATHER, type WeatherId } from './weather'

/**
 * Beads sit still on the glass; streaks run. Both belong to the window rather
 * than the world, so neither moves when the aircraft rolls.
 */
function RainOnGlass({ heavy }: { heavy: boolean }) {
  const { beads, streaks } = useMemo(() => {
    const rand = seededRandom(heavy ? 777 : 313)
    const count = heavy ? 30 : 20
    return {
      beads: Array.from({ length: count }, () => ({
        x: rand() * 100,
        y: rand() * 100,
        r: 0.8 + rand() * 2.3,
        o: 0.11 + rand() * 0.2,
      })),
      streaks: Array.from({ length: heavy ? 26 : 17 }, () => ({
        x: rand() * 100,
        w: 0.7 + rand() * 1.1,
        h: 10 + rand() * 30,
        duration: 1.9 + rand() * 3.6,
        delay: -rand() * 6,
        o: 0.14 + rand() * 0.24,
      })),
    }
  }, [heavy])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {beads.map((b, i) => (
        <span
          key={`b${i}`}
          className="absolute rounded-full"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.r * 2,
            height: b.r * 2.3,
            opacity: b.o,
            background:
              'radial-gradient(circle at 36% 30%, rgba(255,255,255,0.6), rgba(255,255,255,0.04) 58%, transparent 74%)',
            boxShadow: 'inset 0 -1px 1px rgba(255,255,255,0.2)',
          }}
        />
      ))}
      {streaks.map((s, i) => (
        <span
          key={`s${i}`}
          className="zen-drop absolute inset-y-0"
          style={{
            left: `${s.x}%`,
            width: s.w,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <span
            className="absolute left-0 top-0 rounded-full"
            style={{
              width: s.w,
              height: s.h,
              opacity: s.o,
              background:
                'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), rgba(255,255,255,0.2))',
            }}
          />
        </span>
      ))}
    </div>
  )
}

/**
 * From a window seat the wing never moves — the horizon does. Keeping it
 * pinned to the frame while the world rolls behind it is what makes a bank
 * read as the aircraft turning rather than the picture spinning.
 */
function Wing() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[31%] w-full"
      viewBox="0 0 100 42"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* Root at the lower left, swept out and back to a tip near the edge. */}
      <path d="M-6,42 L-6,31 L58,24.5 L86,22.2 L89.5,23.3 L78,25.6 L44,42 Z" fill="#0a0d14" />
      <path d="M86,22.2 L89.5,23.3 L91,15.8 L87.8,15.2 Z" fill="#0a0d14" />
      {/* One hairline along the leading edge, so it is not a flat cut-out. */}
      <path
        d="M-6,31 L58,24.5 L86,22.2 L86.1,22.9 L58.1,25.2 L-6,31.7 Z"
        fill="var(--sun)"
        opacity="0.13"
      />
    </svg>
  )
}

export function CabinInterior({
  vehicle,
  weather,
}: {
  vehicle: Vehicle
  weather: WeatherId
}) {
  const isPlane = vehicle === 'plane'

  return (
    <>
      {isPlane ? <Wing /> : null}

      {WEATHER[weather].droplets ? <RainOnGlass heavy={weather === 'storm'} /> : null}

      {/* Glass: one soft sheen across the pane. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(118deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 34%, transparent 52%)',
        }}
      />

      {/* Recess: the aperture is a hole in a wall, not a sticker on one. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          boxShadow:
            'inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 14px 26px -10px rgba(0,0,0,0.72), inset 0 -10px 22px -12px rgba(0,0,0,0.55)',
          borderRadius: 'inherit',
        }}
      />

      {/* The shade, parked at the top of its run. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[5%]"
        aria-hidden
        style={{
          background: 'linear-gradient(to bottom, var(--c-sunk), color-mix(in oklab, var(--c-sunk) 70%, #000))',
          borderBottom: '1px solid rgba(0,0,0,0.4)',
          boxShadow: '0 3px 9px rgba(0,0,0,0.45)',
        }}
      />

      {/* Bleed hole — the small detail that makes it a real window. */}
      {isPlane ? (
        <span
          className="pointer-events-none absolute bottom-[6%] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
          aria-hidden
          style={{ background: 'rgba(0,0,0,0.5)', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.8)' }}
        />
      ) : null}
    </>
  )
}
