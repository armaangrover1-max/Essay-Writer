import { seededRandom } from './random'
import { SCENERY, type SceneryId, type SceneryProfile } from './scenery'

export interface Building {
  x: number
  width: number
  height: number
}

export interface Landform {
  /** Two tiles end to end, so a drift of one tile loops seamlessly. */
  path: string
  /** Lit windows, present only where the scenery is built up. */
  buildings: Building[]
}

const TILE = 100

function smoothstepPath(heights: number[], step: number, offset: number): string {
  let d = ''
  for (let i = 0; i < heights.length; i++) {
    const x = offset + i * step
    const y = heights[i]!
    if (i === 0) {
      d += `L${x.toFixed(2)},${y.toFixed(2)}`
    } else {
      // A midpoint control on each span rounds the crests into swells.
      const px = offset + (i - 1) * step
      const cx = (px + x) / 2
      d += ` Q${cx.toFixed(2)},${heights[i - 1]!.toFixed(2)} ${x.toFixed(2)},${y.toFixed(2)}`
    }
  }
  return d
}

function jaggedPath(heights: number[], step: number, offset: number): string {
  return heights
    .map((h, i) => `L${(offset + i * step).toFixed(2)},${h.toFixed(2)}`)
    .join(' ')
}

function ridge(profile: SceneryProfile, seed: number, base: number, scale: number): Landform {
  const rand = seededRandom(seed)
  const step = TILE / profile.points
  const amplitude = profile.amplitude * scale

  // The first and last height match so the two tiles meet without a seam.
  const heights = Array.from({ length: profile.points }, () => base - rand() * amplitude)
  const closed = [...heights, heights[0]!]

  const draw = profile.jagged ? jaggedPath : smoothstepPath
  return {
    path: `M0,110 ${draw(closed, step, 0)} ${draw(closed, step, TILE)} L${TILE * 2},110 Z`,
    buildings: [],
  }
}

function skyline(profile: SceneryProfile, seed: number, base: number, scale: number): Landform {
  const rand = seededRandom(seed)
  const buildings: Building[] = []
  const amplitude = profile.amplitude * scale

  let x = 0
  while (x < TILE) {
    const width = 1.6 + rand() * 3.4
    const height = amplitude * (0.25 + rand() * 0.75)
    buildings.push({ x, width, height })
    x += width + 0.5 + rand() * 1.6
  }

  // Both tiles share the same buildings so the skyline repeats cleanly.
  const tiles = [0, TILE].flatMap((offset) =>
    buildings.map((b) => ({ ...b, x: b.x + offset })),
  )

  const path = tiles
    .map(
      (b) =>
        `M${b.x.toFixed(2)},110 L${b.x.toFixed(2)},${(base - b.height).toFixed(2)} ` +
        `L${(b.x + b.width).toFixed(2)},${(base - b.height).toFixed(2)} ` +
        `L${(b.x + b.width).toFixed(2)},110 Z`,
    )
    .join(' ')

  return { path: `M0,110 L0,${base} L${TILE * 2},${base} L${TILE * 2},110 Z ${path}`, buildings: tiles }
}

/**
 * The near band carries the character of the place: a skyline over a city,
 * flat water on the coast, a ridgeline everywhere else.
 */
export function buildLandform(
  sceneryId: SceneryId,
  band: 'far' | 'mid' | 'near',
  seed: number,
): Landform {
  const profile = SCENERY[sceneryId]
  // Nearer bands sit lower in the frame and so have less room to rise; the
  // sense of depth comes from where they sit, not from being drawn smaller.
  const base = band === 'far' ? 76 : band === 'mid' ? 90 : 102
  const scale = band === 'far' ? 1 : band === 'mid' ? 0.74 : 0.48

  // A city reads as a city only when it is layered, so every band is skyline.
  if (profile.builtUp) return skyline(profile, seed, base, scale)
  if (profile.water && band === 'near') {
    return { path: `M0,${base} L${TILE * 2},${base} L${TILE * 2},110 L0,110 Z`, buildings: [] }
  }
  return ridge(profile, seed, base, scale)
}
