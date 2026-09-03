import { formatClock } from '../lib/timer'
import { Button, Card, cx } from './ui'

interface Props {
  minutes: number
  remaining: number
  isRunning: boolean
  hasStarted: boolean
  onSetMinutes: (minutes: number) => void
  onStart: () => void
  onPause: () => void
  onEnterZen: () => void
  onFinish: () => void
}

const STEP = 5
const MIN = 5
const MAX = 120

export function TimerControl({
  minutes,
  remaining,
  isRunning,
  hasStarted,
  onSetMinutes,
  onStart,
  onPause,
  onEnterZen,
  onFinish,
}: Props) {
  const over = remaining < 0

  return (
    <Card className="p-5 sm:p-6">
      {hasStarted ? (
        <div className="text-center">
          <p
            className={cx(
              'font-mono text-5xl tabular-nums tracking-tight sm:text-6xl',
              over && 'text-warm',
            )}
          >
            {formatClock(remaining)}
          </p>
          <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-ink-faint">
            {over ? 'over your planned time' : 'remaining'}
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <Button
            size="sm"
            onClick={() => onSetMinutes(Math.max(MIN, minutes - STEP))}
            disabled={minutes <= MIN}
            aria-label="Five minutes less"
          >
            −
          </Button>
          <div className="text-center">
            <p className="font-mono text-5xl tabular-nums tracking-tight">{minutes}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-faint">minutes</p>
          </div>
          <Button
            size="sm"
            onClick={() => onSetMinutes(Math.min(MAX, minutes + STEP))}
            disabled={minutes >= MAX}
            aria-label="Five minutes more"
          >
            +
          </Button>
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {!hasStarted ? (
          <>
            <Button variant="primary" size="lg" onClick={onStart}>
              Start writing
            </Button>
            <Button size="lg" onClick={onEnterZen}>
              Start in Zen mode
            </Button>
          </>
        ) : (
          <>
            {isRunning ? (
              <Button onClick={onPause}>Pause</Button>
            ) : (
              <Button variant="primary" onClick={onStart}>
                Resume
              </Button>
            )}
            <Button onClick={onEnterZen}>Zen mode</Button>
            <Button variant="primary" onClick={onFinish}>
              I&rsquo;ve finished
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}
