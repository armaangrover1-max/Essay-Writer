import { useState } from 'react'
import { CITATIONS, GUIDANCE } from '../data/guidance'
import type { Lane } from '../lib/types'
import { Emphasised } from './Emphasised'
import { Card, cx } from './ui'

function Disclosure({
  heading,
  children,
  defaultOpen = false,
}: {
  heading: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-line-soft last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-sunk"
      >
        <span className="mr-auto text-sm font-medium">{heading}</span>
        <span
          className={cx(
            'text-ink-faint transition-transform duration-200',
            open && 'rotate-90',
          )}
          aria-hidden
        >
          ›
        </span>
      </button>
      {open ? <div className="px-5 pb-5">{children}</div> : null}
    </div>
  )
}

export function GuidancePanel({ lane }: { lane: Lane }) {
  return (
    <Card className="overflow-hidden">
      {GUIDANCE[lane].map((section, i) => (
        <Disclosure key={section.heading} heading={section.heading} defaultOpen={i === 0}>
          <ul className="space-y-2.5">
            {section.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Disclosure>
      ))}

      <Disclosure heading="Citations, briefly">
        <div className="space-y-4">
          {CITATIONS.map((c) => (
            <div key={c.style} className="text-sm">
              <p className="font-medium">{c.style}</p>
              <p className="mt-1 font-mono text-xs text-ink-soft">{c.inText}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                <Emphasised text={c.works} />
              </p>
            </div>
          ))}
          <p className="text-xs italic text-ink-faint">
            Kept short on purpose. Handwritten practice does not need full format guides — this is
            here so the shape is familiar when it matters.
          </p>
        </div>
      </Disclosure>
    </Card>
  )
}
