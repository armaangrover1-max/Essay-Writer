import { describe, expect, test } from 'vitest'
import { PROMPT_BANK, promptById } from './index'
import { LANES, TIER_MINUTES, type Lane } from '../../lib/types'

describe('prompt bank integrity', () => {
  test('every prompt id is unique', () => {
    const ids = PROMPT_BANK.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('no prompt ships with an empty field', () => {
    for (const p of PROMPT_BANK) {
      expect(p.title.trim(), `${p.id} title`).not.toBe('')
      expect(p.seed.trim(), `${p.id} seed`).not.toBe('')
      expect(p.task.trim(), `${p.id} task`).not.toBe('')
      expect(p.depth.steelman.trim(), `${p.id} steelman`).not.toBe('')
      expect(p.depth.trap.trim(), `${p.id} trap`).not.toBe('')
      expect(p.themes.length, `${p.id} themes`).toBeGreaterThan(0)
    }
  })

  test('every prompt points at two or more real sources', () => {
    for (const p of PROMPT_BANK) {
      expect(p.depth.goFurther.length, `${p.id} goFurther`).toBeGreaterThanOrEqual(2)
    }
  })

  test('a seed frames the problem rather than just posing a question', () => {
    for (const p of PROMPT_BANK) {
      expect(p.seed.length, `${p.id} seed is too thin to teach anything`).toBeGreaterThan(140)
    }
  })

  test('recommended minutes stay near the tier they are filed under', () => {
    for (const p of PROMPT_BANK) {
      const baseline = TIER_MINUTES[p.tier]
      expect(p.recommendedMinutes, `${p.id} minutes`).toBeGreaterThanOrEqual(baseline * 0.5)
      expect(p.recommendedMinutes, `${p.id} minutes`).toBeLessThanOrEqual(baseline * 1.5)
    }
  })

  test('every lane can fill a full roll of three at standard tier', () => {
    for (const lane of LANES as Lane[]) {
      const standard = PROMPT_BANK.filter((p) => p.lane === lane && p.tier === 'standard')
      expect(standard.length, `${lane} standard prompts`).toBeGreaterThanOrEqual(3)
    }
  })
})

describe('promptById', () => {
  test('finds a prompt that exists', () => {
    expect(promptById('arg-murderer-at-the-door')?.title).toBe('The Murderer at the Door')
  })

  test('returns undefined for an unknown id', () => {
    expect(promptById('does-not-exist')).toBeUndefined()
  })
})
