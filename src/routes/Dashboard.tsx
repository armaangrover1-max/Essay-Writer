import { Link, useNavigate } from 'react-router-dom'
import { promptById } from '../data/prompts'
import { GoalRing } from '../components/GoalRing'
import { Heatmap } from '../components/Heatmap'
import { Button, Card, Empty, PageTitle, Pill, SectionLabel } from '../components/ui'
import { useAppData } from '../lib/appData'
import { computeStats } from '../lib/stats'
import { LANE_LABEL, LANES } from '../lib/types'

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <p className="font-mono text-2xl tabular-nums">{value}</p>
      <p className="mt-0.5 text-xs text-ink-faint">{label}</p>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { data } = useAppData()
  const stats = computeStats(data.sessions, { weeklyGoal: data.settings.weeklyGoal })

  const inProgress = data.sessions.filter((s) => s.status === 'in-progress').at(-1)
  const recent = data.sessions
    .filter((s) => s.status === 'completed')
    .slice(-3)
    .reverse()

  return (
    <>
      <PageTitle sub="Essays are written on paper. This is everything around them.">
        Today
      </PageTitle>

      {inProgress ? (
        <Card className="mb-8 flex flex-wrap items-center gap-4 border-accent p-5">
          <div className="mr-auto">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-faint">Still open</p>
            <p className="mt-1 font-display text-lg">
              {promptById(inProgress.promptId)?.title ?? 'A session'}
            </p>
          </div>
          <Button variant="primary" onClick={() => navigate(`/write/${inProgress.id}`)}>
            Pick it back up
          </Button>
        </Card>
      ) : null}

      <Card className="flex flex-wrap items-center gap-8 p-6">
        <GoalRing done={stats.thisWeek} goal={data.settings.weeklyGoal} />
        <div className="grid flex-1 grid-cols-3 gap-6">
          <Stat value={stats.thisMonth} label="this month" />
          <Stat value={stats.allTime} label="all time" />
          <Stat value={stats.weekChain} label={stats.weekChain === 1 ? 'week running' : 'weeks running'} />
        </div>
      </Card>

      <p className="mt-3 text-xs text-ink-faint">
        The chain counts weeks, not days — a busy Tuesday should not cost you a streak.
      </p>

      <div className="mt-8">
        <Button variant="primary" size="lg" onClick={() => navigate('/new')} className="w-full sm:w-auto">
          Start a new essay
        </Button>
      </div>

      <section className="mt-10">
        <SectionLabel>Consistency</SectionLabel>
        <Card className="p-5">
          <Heatmap days={stats.heatmap} />
        </Card>
      </section>

      <section className="mt-10">
        <SectionLabel>By lane</SectionLabel>
        <div className="grid grid-cols-3 gap-3">
          {LANES.map((lane) => (
            <Card key={lane} className="p-4">
              <p className="font-mono text-xl tabular-nums">{stats.byLane[lane]}</p>
              <p className="mt-0.5 text-xs text-ink-faint">{LANE_LABEL[lane]}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionLabel>Recently written</SectionLabel>
        {recent.length === 0 ? (
          <Empty>Nothing yet. The first one is the hard one.</Empty>
        ) : (
          <div className="space-y-2">
            {recent.map((session) => {
              const prompt = promptById(session.promptId)
              return (
                <Card key={session.id} className="flex items-center gap-3 p-4">
                  <div className="mr-auto min-w-0">
                    <p className="truncate font-display">{prompt?.title ?? 'Unknown prompt'}</p>
                    <p className="mt-0.5 text-xs text-ink-faint">
                      {new Date(session.completedAt!).toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                  <Pill>{LANE_LABEL[session.lane]}</Pill>
                </Card>
              )
            })}
            <Link to="/history" className="inline-block pt-1 text-sm text-accent hover:underline">
              All history →
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
