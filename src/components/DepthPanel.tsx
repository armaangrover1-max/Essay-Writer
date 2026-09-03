import { STEELMAN_HEADING } from '../data/rubrics'
import { Emphasised } from './Emphasised'
import type { Prompt } from '../lib/types'
import { Card } from './ui'

export function DepthPanel({ prompt }: { prompt: Prompt }) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line-soft bg-sunk px-5 py-3">
        <p className="text-xs uppercase tracking-[0.14em] text-ink-faint">
          Unlocked now that you have written
        </p>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <section>
          <h3 className="font-display text-lg">{STEELMAN_HEADING[prompt.lane]}</h3>
          <p className="mt-2 leading-relaxed text-ink-soft">{prompt.depth.steelman}</p>
        </section>

        <section>
          <h3 className="font-display text-lg">Go further</h3>
          <ul className="mt-2 space-y-1.5">
            {prompt.depth.goFurther.map((source) => (
              <li key={source} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden />
                <span>
                  <Emphasised text={source} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border-l-2 border-warm bg-sunk px-4 py-3">
          <h3 className="font-display text-lg">The trap</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{prompt.depth.trap}</p>
        </section>
      </div>
    </Card>
  )
}
