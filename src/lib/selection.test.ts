import { describe, expect, test } from 'vitest'
import { rollPrompts } from './selection'
import type { Lane, Prompt, Tier } from './types'

function makePrompt(id: string, lane: Lane = 'argument', tier: Tier = 'standard'): Prompt {
  return {
    id,
    lane,
    tier,
    title: `Title ${id}`,
    seed: 'seed',
    task: 'task',
    themes: ['ethics'],
    recommendedMinutes: 45,
    depth: { steelman: 's', goFurther: ['g'], trap: 't' },
  }
}

/** Deterministic stand-in for Math.random: cycles through fixed values. */
function fakeRng(values: number[]): () => number {
  let i = 0
  return () => values[i++ % values.length]
}

const bankOfTen = Array.from({ length: 10 }, (_, i) => makePrompt(`a${i}`))

describe('rollPrompts', () => {
  test('returns exactly three prompts', () => {
    const result = rollPrompts(bankOfTen, {
      lane: 'argument',
      tier: 'standard',
      writtenPromptIds: [],
    })

    expect(result.prompts).toHaveLength(3)
  })

  test('never returns a prompt that has already been written', () => {
    const written = ['a0', 'a1', 'a2', 'a3', 'a4', 'a5']

    for (let run = 0; run < 25; run++) {
      const result = rollPrompts(bankOfTen, {
        lane: 'argument',
        tier: 'standard',
        writtenPromptIds: written,
      })
      const ids = result.prompts.map((p) => p.id)
      expect(ids.some((id) => written.includes(id))).toBe(false)
    }
  })

  test('returns only prompts from the requested lane', () => {
    const mixed = [
      ...Array.from({ length: 5 }, (_, i) => makePrompt(`arg${i}`, 'argument')),
      ...Array.from({ length: 5 }, (_, i) => makePrompt(`cre${i}`, 'creative')),
    ]

    const result = rollPrompts(mixed, {
      lane: 'creative',
      tier: 'standard',
      writtenPromptIds: [],
    })

    expect(result.prompts.every((p) => p.lane === 'creative')).toBe(true)
  })

  test('returns only prompts from the requested tier', () => {
    const mixed = [
      ...Array.from({ length: 5 }, (_, i) => makePrompt(`sh${i}`, 'argument', 'sharpener')),
      ...Array.from({ length: 5 }, (_, i) => makePrompt(`fu${i}`, 'argument', 'full')),
    ]

    const result = rollPrompts(mixed, {
      lane: 'argument',
      tier: 'full',
      writtenPromptIds: [],
    })

    expect(result.prompts.every((p) => p.tier === 'full')).toBe(true)
  })

  test('never repeats a prompt within a single roll', () => {
    for (let run = 0; run < 25; run++) {
      const result = rollPrompts(bankOfTen, {
        lane: 'argument',
        tier: 'standard',
        writtenPromptIds: [],
      })
      const ids = result.prompts.map((p) => p.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  test('reports the pool as not exhausted while unwritten prompts remain', () => {
    const result = rollPrompts(bankOfTen, {
      lane: 'argument',
      tier: 'standard',
      writtenPromptIds: ['a0', 'a1'],
    })

    expect(result.exhausted).toBe(false)
  })

  test('recycles written prompts and flags exhaustion once the pool runs dry', () => {
    const allButOneWritten = bankOfTen.slice(1).map((p) => p.id)

    const result = rollPrompts(bankOfTen, {
      lane: 'argument',
      tier: 'standard',
      writtenPromptIds: allButOneWritten,
    })

    expect(result.exhausted).toBe(true)
    expect(result.prompts).toHaveLength(3)
    expect(result.prompts.map((p) => p.id)).toContain('a0')
  })

  test('returns everything available when the bank holds fewer than three matches', () => {
    const tiny = [makePrompt('only1'), makePrompt('only2')]

    const result = rollPrompts(tiny, {
      lane: 'argument',
      tier: 'standard',
      writtenPromptIds: [],
    })

    expect(result.prompts).toHaveLength(2)
  })

  test('returns an empty roll when no prompt matches the lane and tier', () => {
    const result = rollPrompts(bankOfTen, {
      lane: 'application',
      tier: 'standard',
      writtenPromptIds: [],
    })

    expect(result.prompts).toEqual([])
    expect(result.exhausted).toBe(false)
  })

  test('produces different orderings for different random sources', () => {
    const ascending = rollPrompts(bankOfTen, {
      lane: 'argument',
      tier: 'standard',
      writtenPromptIds: [],
      rng: fakeRng([0]),
    })
    const descending = rollPrompts(bankOfTen, {
      lane: 'argument',
      tier: 'standard',
      writtenPromptIds: [],
      rng: fakeRng([0.999]),
    })

    expect(ascending.prompts.map((p) => p.id)).not.toEqual(
      descending.prompts.map((p) => p.id),
    )
  })
})
