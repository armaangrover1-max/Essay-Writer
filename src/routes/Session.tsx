import { useNavigate, useParams } from 'react-router-dom'
import { promptById } from '../data/prompts'
import { useAppData } from '../lib/appData'
import { useTimer } from '../lib/useTimer'
import { LANE_LABEL } from '../lib/types'
import { GuidancePanel } from '../components/GuidancePanel'
import { TimerControl } from '../components/TimerControl'
import { Button, Card, Empty, Pill, SectionLabel } from '../components/ui'

export default function SessionView() {
  const { sessionId = '' } = useParams()
  const navigate = useNavigate()
  const { data, abandonSession } = useAppData()

  const session = data.sessions.find((s) => s.id === sessionId)
  const prompt = session ? promptById(session.promptId) : undefined
  const timer = useTimer(sessionId, session?.plannedMinutes ?? 45)

  if (!session || !prompt) {
    return (
      <Empty>
        That session could not be found. <Button size="sm" onClick={() => navigate('/new')}>Start a new one</Button>
      </Empty>
    )
  }

  const hasStarted = timer.state.runningSince !== null || timer.state.accumulatedSeconds > 0

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Pill>{LANE_LABEL[prompt.lane]}</Pill>
        {prompt.themes.map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>

      <h1 className="font-display text-3xl sm:text-4xl">{prompt.title}</h1>

      <Card className="mt-6 p-5 sm:p-6">
        <p className="font-display leading-relaxed text-ink-soft">{prompt.seed}</p>
        <p className="mt-4 border-l-2 border-accent pl-4 leading-relaxed">{prompt.task}</p>
      </Card>

      <p className="mt-6 rounded-lg border border-dashed border-line px-4 py-3 text-sm text-ink-soft">
        Write on paper. The reading list, the counter-case and the trap for this prompt unlock once
        you finish — so they cannot shape what you write.
      </p>

      <div className="mt-8">
        <TimerControl
          minutes={timer.state.plannedMinutes}
          remaining={timer.remaining}
          isRunning={timer.isRunning}
          hasStarted={hasStarted}
          onSetMinutes={timer.setMinutes}
          onStart={timer.start}
          onPause={timer.pause}
          onEnterZen={() => {
            if (!hasStarted) timer.start()
            navigate(`/zen/${session.id}`)
          }}
          onFinish={() => {
            timer.pause()
            navigate(`/review/${session.id}`)
          }}
        />
      </div>

      <section className="mt-10">
        <SectionLabel>How this form works</SectionLabel>
        <GuidancePanel lane={prompt.lane} />
      </section>

      <div className="mt-10 border-t border-line pt-6">
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            abandonSession(session.id)
            timer.clear()
            navigate('/new')
          }}
        >
          Abandon this session
        </Button>
        <p className="mt-2 text-xs text-ink-faint">
          The prompt goes back in the pool — abandoning does not use it up.
        </p>
      </div>
    </>
  )
}
