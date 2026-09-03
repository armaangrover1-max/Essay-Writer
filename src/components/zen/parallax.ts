export interface ParallaxState {
  /** Current drift speed, easing toward whatever the phase asks for. */
  speed: number
  far: number
  mid: number
  near: number
  cloud: number
}

export type LayerId = 'far' | 'mid' | 'near' | 'cloud'

/** Tiles travelled per second at speed 1. Distance is what sells depth. */
export const LAYER_RATES: Record<LayerId, number> = {
  far: 1 / 190,
  mid: 1 / 95,
  near: 1 / 34,
  cloud: 1 / 110,
}

/** Seconds for a speed change to be most of the way done. */
const EASE_TAU = 3.5

export function createParallax(speed: number): ParallaxState {
  return { speed, far: 0, mid: 0, near: 0, cloud: 0 }
}

/**
 * Speed is eased rather than set, because a phase change that snapped the
 * drift rate read as the ground lurching.
 */
export function stepParallax(
  state: ParallaxState,
  targetSpeed: number,
  dtSeconds: number,
): ParallaxState {
  if (!(dtSeconds > 0)) return state

  // A backgrounded tab can hand back a gap of minutes; cap it so the scene
  // resumes where it was rather than teleporting.
  const dt = Math.min(dtSeconds, 1)
  const speed = state.speed + (targetSpeed - state.speed) * (1 - Math.exp(-dt / EASE_TAU))

  const advance = (offset: number, rate: number) => (offset + rate * speed * dt) % 1

  return {
    speed,
    far: advance(state.far, LAYER_RATES.far),
    mid: advance(state.mid, LAYER_RATES.mid),
    near: advance(state.near, LAYER_RATES.near),
    cloud: advance(state.cloud, LAYER_RATES.cloud),
  }
}
