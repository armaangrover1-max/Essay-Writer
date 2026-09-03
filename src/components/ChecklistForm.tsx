import { RUBRICS } from '../data/rubrics'
import type { Lane, Mark } from '../lib/types'
import { Card, cx } from './ui'

const OPTIONS: { value: Mark; label: string; tone: string }[] = [
  { value: 'solid', label: 'Solid', tone: 'border-good text-good' },
  { value: 'shaky', label: 'Shaky', tone: 'border-shaky text-shaky' },
  { value: 'missing', label: 'Missing', tone: 'border-missing text-missing' },
]

interface Props {
  lane: Lane
  marks: Record<string, Mark>
  onChange: (criterionId: string, mark: Mark) => void
}

export function ChecklistForm({ lane, marks, onChange }: Props) {
  return (
    <div className="space-y-3">
      {RUBRICS[lane].map((criterion) => (
        <Card key={criterion.id} className="p-5">
          <p className="font-display text-lg">{criterion.label}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{criterion.question}</p>

          <div className="mt-4 flex gap-2" role="group" aria-label={criterion.label}>
            {OPTIONS.map((option) => {
              const selected = marks[criterion.id] === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => onChange(criterion.id, option.value)}
                  aria-pressed={selected}
                  className={cx(
                    'flex-1 rounded-lg border px-3 py-2 text-sm transition',
                    selected
                      ? `${option.tone} bg-sunk font-medium`
                      : 'border-line text-ink-faint hover:border-ink-faint hover:text-ink-soft',
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </Card>
      ))}
    </div>
  )
}
