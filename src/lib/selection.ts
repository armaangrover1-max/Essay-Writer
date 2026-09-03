import type { Lane, Prompt, Tier } from './types'

export interface RollOptions {
  lane: Lane
  tier: Tier
  /** Prompts already written. Passed-over prompts are not in here. */
  writtenPromptIds: string[]
  count?: number
  rng?: () => number
}

export interface RollResult {
  prompts: Prompt[]
  /** True when written prompts had to be recycled to fill the roll. */
  exhausted: boolean
}

function shuffle<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const swap = out[i]!
    out[i] = out[j]!
    out[j] = swap
  }
  return out
}

export function rollPrompts(bank: readonly Prompt[], options: RollOptions): RollResult {
  const { lane, tier, writtenPromptIds, count = 3, rng = Math.random } = options

  const matching = bank.filter((p) => p.lane === lane && p.tier === tier)
  if (matching.length === 0) return { prompts: [], exhausted: false }

  const written = new Set(writtenPromptIds)
  const fresh = matching.filter((p) => !written.has(p.id))
  const picked = shuffle(fresh, rng).slice(0, count)

  // Enough fresh prompts, or the whole pool is fresh and simply small.
  if (picked.length >= count || picked.length === matching.length) {
    return { prompts: picked, exhausted: false }
  }

  const recycled = shuffle(
    matching.filter((p) => written.has(p.id)),
    rng,
  )
  return {
    prompts: [...picked, ...recycled.slice(0, count - picked.length)],
    exhausted: true,
  }
}
