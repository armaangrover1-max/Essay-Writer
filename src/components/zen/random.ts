/**
 * Everything the window shows — which ground you fly over, what the weather
 * does, when the aircraft banks — is drawn from the session id. The same
 * session therefore always looks the same, and nothing ever re-rolls under you
 * mid-sentence.
 */

export function hashSeed(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function seededRandom(seed: number): () => number {
  let s = (seed >>> 0) || 1
  return () => {
    // xorshift32: cheap, and far better spread than a plain LCG's low bits.
    s ^= s << 13
    s >>>= 0
    s ^= s >> 17
    s ^= s << 5
    s >>>= 0
    return s / 4294967296
  }
}

export function pick<T>(items: readonly T[], rand: () => number): T {
  return items[Math.floor(rand() * items.length)]!
}
