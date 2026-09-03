import { useMemo } from 'react'
import type { Vehicle } from '../../lib/types'
import type { PhaseId } from './journey'
import { buildLandform } from './landforms'
import { hashSeed, seededRandom } from './random'
import { SCENERY, type SceneryId } from './scenery'
import { PHASE_SCENE } from './sceneProfile'
import { WEATHER, type WeatherId } from './weather'

const TILE_VIEWBOX = '0 0 200 110'

function Band({
  layer,
  path,
  className,
  style,
}: {
  layer: 'far' | 'mid' | 'near' | 'cloud'
  path: string
  className: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      className={`zen-band absolute inset-x-0 bottom-0 h-full ${className}`}
      viewBox={TILE_VIEWBOX}
      preserveAspectRatio="none"
      data-layer={layer}
      aria-hidden
      style={style}
    >
      <path d={path} />
    </svg>
  )
}

function CityLights({ landform, seed }: { landform: ReturnType<typeof buildLandform>; seed: number }) {
  const lights = useMemo(() => {
    const rand = seededRandom(seed)
    return landform.buildings.flatMap((b) => {
      const rows = Math.max(1, Math.floor(b.height / 2.6))
      const cells: { x: number; y: number; s: number; o: number }[] = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < Math.max(1, Math.floor(b.width / 1.4)); c++) {
          if (rand() > 0.42) continue
          cells.push({
            x: b.x + 0.45 + c * 1.4,
            y: 102 - b.height + 1.4 + r * 2.6,
            s: 0.55,
            o: 0.35 + rand() * 0.65,
          })
        }
      }
      return cells
    })
  }, [landform, seed])

  return (
    <svg
      className="zen-band absolute inset-x-0 bottom-0 h-full"
      viewBox={TILE_VIEWBOX}
      preserveAspectRatio="none"
      data-layer="near"
      aria-hidden
      style={{ opacity: 'calc(var(--star-opacity) * 1.5)' }}
    >
      {lights.map((l, i) => (
        <rect
          key={i}
          x={l.x}
          y={l.y}
          width={l.s}
          height={l.s * 1.4}
          fill="var(--city-light)"
          opacity={l.o}
        />
      ))}
    </svg>
  )
}

function Stars({ visibility }: { visibility: number }) {
  const stars = useMemo(() => {
    const rand = seededRandom(1234)
    return Array.from({ length: 90 }, () => ({
      x: rand() * 100,
      y: rand() * 66,
      r: 0.15 + rand() * 0.36,
      o: 0.3 + rand() * 0.7,
    }))
  }, [])

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      style={{ opacity: `calc(var(--star-opacity) * ${visibility})` }}
    >
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} />
      ))}
    </svg>
  )
}

function Clouds({ opacity }: { opacity: number }) {
  const puffs = useMemo(() => {
    const rand = seededRandom(88)
    return Array.from({ length: 16 }, () => ({
      x: rand() * 100,
      y: 8 + rand() * 60,
      r: 2.4 + rand() * 5.5,
      o: 0.5 + rand() * 0.5,
    }))
  }, [])

  return (
    <svg
      className="zen-band absolute inset-0 h-full"
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      data-layer="cloud"
      aria-hidden
      style={{ opacity, filter: 'blur(1.6px)' }}
    >
      {[0, 100].map((offset) =>
        puffs.map((p, i) => (
          <g key={`${offset}-${i}`} fill="var(--cloud)" opacity={p.o * 0.62}>
            <ellipse cx={p.x + offset} cy={p.y} rx={p.r * 1.7} ry={p.r * 0.42} />
            <ellipse cx={p.x + offset - p.r} cy={p.y + p.r * 0.22} rx={p.r * 0.95} ry={p.r * 0.32} />
            <ellipse cx={p.x + offset + p.r * 1.1} cy={p.y + p.r * 0.16} rx={p.r * 0.78} ry={p.r * 0.28} />
          </g>
        )),
      )}
    </svg>
  )
}

function Haze({ strength }: { strength: number }) {
  if (strength <= 0.01) return null
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="zen-haze pointer-events-none absolute"
          aria-hidden
          style={{
            top: `${44 + i * 14}%`,
            height: `${12 + i * 5}%`,
            opacity: strength * (0.5 - i * 0.1),
            animationDuration: `${120 + i * 55}s`,
            background:
              'linear-gradient(to right, transparent, var(--cloud) 18%, var(--cloud) 78%, transparent)',
            filter: 'blur(9px)',
          }}
        />
      ))}
    </>
  )
}

/** The reveal: banked over a city, a grid of streets and lights below you. */
function GroundBelow({ scenery }: { scenery: SceneryId }) {
  const lit = SCENERY[scenery].builtUp
  const dots = useMemo(() => {
    const rand = seededRandom(4242)
    return Array.from({ length: 150 }, () => {
      const depth = rand()
      return {
        x: rand() * 100,
        // Denser toward the horizon, sparser and larger near you.
        y: 70 + depth * depth * 30,
        s: 0.25 + depth * 0.9,
        o: 0.25 + rand() * 0.75,
      }
    })
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{ opacity: 'var(--bank-progress)' }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect
          x="0"
          y="66"
          width="100"
          height="34"
          fill="color-mix(in oklab, var(--land-base) 96%, var(--sky-4))"
        />
        {lit
          ? dots.map((d, i) => (
              <rect
                key={i}
                x={d.x}
                y={d.y}
                width={d.s}
                height={d.s}
                fill="var(--city-light)"
                opacity={d.o}
              />
            ))
          : null}
      </svg>
    </div>
  )
}

function Snow() {
  const flakes = useMemo(() => {
    const rand = seededRandom(555)
    return Array.from({ length: 54 }, () => {
      const depth = rand()
      return {
        left: rand() * 100,
        size: 1.2 + depth * 3.6,
        duration: 34 - depth * 20,
        delay: -rand() * 34,
        opacity: 0.28 + depth * 0.6,
        drift: (rand() - 0.5) * 4,
      }
    })
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {flakes.map((f, i) => (
        // The column spans the window so the fall covers the window, not the flake.
        <span
          key={i}
          className="zen-snow absolute inset-y-0"
          style={{
            left: `${f.left}%`,
            width: f.size,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        >
          <span
            className="absolute left-0 top-0 rounded-full bg-white"
            style={{
              width: f.size,
              height: f.size,
              opacity: f.opacity,
              transform: `translateX(${f.drift}px)`,
            }}
          />
        </span>
      ))}
    </div>
  )
}

function Lightning() {
  return (
    <div
      className="zen-lightning pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        background:
          'radial-gradient(ellipse 60% 40% at 62% 22%, rgba(226,236,255,0.9), transparent 70%)',
      }}
    />
  )
}

export function WindowScene({
  phase,
  vehicle,
  scenery,
  weather,
  seed,
}: {
  phase: PhaseId
  vehicle: Vehicle
  scenery: SceneryId
  weather: WeatherId
  seed: string
}) {
  const scene = PHASE_SCENE[phase]
  const sky = WEATHER[weather]
  const numericSeed = hashSeed(seed)

  const bands = useMemo(
    () => ({
      far: buildLandform(scenery, 'far', numericSeed + 7),
      mid: buildLandform(scenery, 'mid', numericSeed + 23),
      near: buildLandform(scenery, 'near', numericSeed + 41),
    }),
    [scenery, numericSeed],
  )

  // A bus never gets above the weather, and sits nearer the ground.
  const horizon = vehicle === 'bus' ? Math.min(0.86, scene.horizon + 0.14) : scene.horizon
  const terrainScale = vehicle === 'bus' ? Math.max(scene.terrainScale, 0.8) : scene.terrainScale
  const cloudOpacity = Math.min(1, scene.cloudOpacity + sky.cloudBoost * 0.7)

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Everything outside the glass rolls with the aircraft. */}
      <div className="zen-world">
        <div className="zen-sky absolute inset-0" />
        <Stars visibility={sky.starVisibility} />

        <div
          className="absolute left-[18%] aspect-square w-[24%] rounded-full"
          style={{
            top: 'var(--sun-y)',
            background:
              'radial-gradient(circle, var(--sun) 0%, var(--sun) 34%, ' +
              'color-mix(in oklab, var(--sun) 45%, transparent) 52%, transparent 76%)',
            boxShadow: '0 0 90px 34px var(--sun-glow), 0 0 200px 80px var(--sun-glow)',
            opacity: 1 - sky.dim * 0.9,
          }}
          aria-hidden
        />

        <GroundBelow scenery={scenery} />

        <div
          className="absolute inset-x-0 bottom-0 origin-bottom transition-[height,transform] duration-[6000ms] ease-in-out"
          style={{
            height: `${(1 - horizon) * 100 + 8}%`,
            transform: `scaleY(${terrainScale})`,
          }}
        >
          <Band layer="far" path={bands.far.path} className="zen-land-far" />
          <Band layer="mid" path={bands.mid.path} className="zen-land-mid" />
          <Band
            layer="near"
            path={bands.near.path}
            className={SCENERY[scenery].water ? 'zen-water' : 'zen-land-near'}
          />
          {SCENERY[scenery].builtUp ? (
            <CityLights landform={bands.near} seed={numericSeed + 91} />
          ) : null}
        </div>

        <Clouds opacity={cloudOpacity} />
        <Haze strength={sky.haze} />
        {sky.lightning ? <Lightning /> : null}

        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-[4000ms]"
          style={{ background: 'var(--sky-1)', opacity: sky.dim * 0.55 }}
          aria-hidden
        />
      </div>

      {/* Snow and rain sit on and against the glass, so they never roll. */}
      {sky.flakes ? <Snow /> : null}
    </div>
  )
}
