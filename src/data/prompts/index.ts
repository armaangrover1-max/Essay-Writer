import type { Prompt } from '../../lib/types'
import { applicationPrompts } from './application'
import { argumentPrompts } from './argument'
import { creativePrompts } from './creative'

export const PROMPT_BANK: readonly Prompt[] = [
  ...applicationPrompts,
  ...argumentPrompts,
  ...creativePrompts,
]

const byId = new Map(PROMPT_BANK.map((p) => [p.id, p]))

export function promptById(id: string): Prompt | undefined {
  return byId.get(id)
}
