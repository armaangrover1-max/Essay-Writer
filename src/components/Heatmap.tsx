import type { HeatmapDay } from '../lib/stats'

const LEVELS = [
  'var(--c-sunk)',
  'color-mix(in srgb, var(--c-accent) 32%, var(--c-sunk))',
  'color-mix(in srgb, var(--c-accent) 62%, var(--c-sunk))',
  'var(--c-accent)',
]

function level(count: number): string {
  if (count === 0) return LEVELS[0]!
  if (count === 1) return LEVELS[1]!
  if (count === 2) return LEVELS[2]!
  return LEVELS[3]!
}

export function Heatmap({ days }: { days: HeatmapDay[] }) {
  // 84 days is exactly 12 columns of 7, oldest first.
  const weeks: HeatmapDay[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1.5" style={{ minWidth: 'max-content' }}>
        {weeks.map((week, w) => (
          <div key={w} className="flex flex-col gap-1.5">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.date} · ${day.count} ${day.count === 1 ? 'essay' : 'essays'}`}
                className="h-3.5 w-3.5 rounded-[3px] border border-line-soft"
                style={{ background: level(day.count) }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-ink-faint">
        <span>Less</span>
        {LEVELS.map((bg) => (
          <span
            key={bg}
            className="h-3 w-3 rounded-[3px] border border-line-soft"
            style={{ background: bg }}
          />
        ))}
        <span>More</span>
        <span className="ml-auto">Last 12 weeks</span>
      </div>
    </div>
  )
}
