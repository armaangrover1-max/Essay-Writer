import { useState } from 'react'
import { promptById } from '../data/prompts'
import { RUBRICS, criteriaIds } from '../data/rubrics'
import { DepthPanel } from '../components/DepthPanel'
import { SessionPhoto } from '../components/SessionPhoto'
import { Card, Empty, PageTitle, Pill, SectionLabel, cx } from '../components/ui'
import { useAppData } from '../lib/appData'
import { criterionTrends } from '../lib/stats'
import { formatClock } from '../lib/timer'
import { LANES, LANE_LABEL, type Lane, type Mark } from '../lib/types'

const MARK_TONE: Record<Mark, string> = {
  solid: 'text-good',
  shaky: 'text-shaky',
  missing: 'text-missing',
}

const MARK_GLYPH: Record<Mark, string> = { solid: '✓', shaky: '~', missing: '✕' }

function Trends({ lane, sessions }: { lane: Lane; sessions: ReturnType<typeof useAppData>['data']['sessions'] }) {
  const trends = criterionTrends(sessions, lane, criteriaIds(lane)).filter((t) => t.total > 0)
  if (trends.length === 0) return null

  const weakest = [...trends].sort(
    (a, b) => b.shaky + b.missing * 2 - (a.shaky + a.missing * 2),
  )[0]!
  const label = RUBRICS[lane].find((c) => c.id === weakest.criterionId)?.label ?? weakest.criterionId
  const weak = weakest.shaky + weakest.missing

  return (
    <Card className="mb-6 p-5">
      <p className="text-sm text-ink-soft">
        Across your last {trends[0]!.total} {LANE_LABEL[lane].toLowerCase()}{' '}
        {trends[0]!.total === 1 ? 'essay' : 'essays'},{' '}
        <strong className="font-medium text-ink">{label}</strong>{' '}
        {weak === 0 ? 'has held up every time.' : `came up short ${weak} ${weak === 1 ? 'time' : 'times'}.`}
      </p>
      <div className="mt-4 space-y-2">
        {trends.map((trend) => {
          const criterion = RUBRICS[lane].find((c) => c.id === trend.criterionId)
          const solidPct = (trend.solid / trend.total) * 100
          const shakyPct = (trend.shaky / trend.total) * 100
          return (
            <div key={trend.criterionId} className="flex items-center gap-3">
              <span className="w-32 shrink-0 truncate text-xs text-ink-soft">
                {criterion?.label ?? trend.criterionId}
              </span>
              <span className="flex h-2 flex-1 overflow-hidden rounded-full bg-sunk">
                <span style={{ width: `${solidPct}%`, background: 'var(--c-good)' }} />
                <span style={{ width: `${shakyPct}%`, background: 'var(--c-shaky)' }} />
                <span
                  style={{
                    width: `${100 - solidPct - shakyPct}%`,
                    background: 'var(--c-missing)',
                  }}
                />
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default function History() {
  const { data } = useAppData()
  const [lane, setLane] = useState<Lane | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const sessions = data.sessions
    .filter((s) => s.status === 'completed')
    .filter((s) => lane === 'all' || s.lane === lane)
    .sort((a, b) => Date.parse(b.completedAt!) - Date.parse(a.completedAt!))

  return (
    <>
      <PageTitle sub="Every essay you have finished, what you scored yourself, and the page itself.">
        History
      </PageTitle>

      <div className="mb-6 flex flex-wrap gap-2">
        {(['all', ...LANES] as const).map((option) => (
          <button
            key={option}
            onClick={() => setLane(option)}
            aria-pressed={lane === option}
            className={cx(
              'rounded-lg border px-3 py-1.5 text-sm transition',
              lane === option
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-line bg-surface text-ink-soft hover:border-ink-faint hover:text-ink',
            )}
          >
            {option === 'all' ? 'All' : LANE_LABEL[option]}
          </button>
        ))}
      </div>

      {lane !== 'all' ? <Trends lane={lane} sessions={data.sessions} /> : null}

      {sessions.length === 0 ? (
        <Empty>Nothing here yet.</Empty>
      ) : (
        <div className="space-y-2">
          {sessions.map((session) => {
            const prompt = promptById(session.promptId)
            const open = openId === session.id
            return (
              <Card key={session.id} className="overflow-hidden">
                <button
                  onClick={() => setOpenId(open ? null : session.id)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-sunk"
                >
                  <div className="mr-auto min-w-0">
                    <p className="truncate font-display text-lg">
                      {prompt?.title ?? 'Unknown prompt'}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-faint">
                      {new Date(session.completedAt!).toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}{' '}
                      · {formatClock(session.elapsedSeconds)} of {session.plannedMinutes} min
                      {session.photoId ? ' · photographed' : ''}
                    </p>
                  </div>
                  <Pill>{LANE_LABEL[session.lane]}</Pill>
                </button>

                {open && prompt ? (
                  <div className="space-y-6 border-t border-line-soft p-5">
                    <div>
                      <p className="font-display leading-relaxed text-ink-soft">{prompt.seed}</p>
                      <p className="mt-3 border-l-2 border-accent pl-4 leading-relaxed">
                        {prompt.task}
                      </p>
                    </div>

                    <div>
                      <SectionLabel>How you judged it</SectionLabel>
                      <ul className="grid gap-1.5 sm:grid-cols-2">
                        {RUBRICS[session.lane].map((criterion) => {
                          const mark = session.marks[criterion.id]
                          return (
                            <li key={criterion.id} className="flex items-center gap-2 text-sm">
                              <span
                                className={cx(
                                  'w-4 text-center font-mono',
                                  mark ? MARK_TONE[mark] : 'text-ink-faint',
                                )}
                              >
                                {mark ? MARK_GLYPH[mark] : '–'}
                              </span>
                              <span className="text-ink-soft">{criterion.label}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    {session.photoId ? (
                      <div>
                        <SectionLabel>The page</SectionLabel>
                        <SessionPhoto photoId={session.photoId} alt={`Your essay: ${prompt.title}`} />
                      </div>
                    ) : null}

                    <DepthPanel prompt={prompt} />
                  </div>
                ) : null}
              </Card>
            )
          })}
        </div>
      )}
    </>
  )
}
