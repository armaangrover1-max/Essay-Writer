import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CabinInterior } from '../components/zen/CabinInterior'
import { WindowScene } from '../components/zen/WindowScene'
import { phaseSpeed } from '../components/zen/sceneProfile'
import { bankSchedule } from '../components/zen/banking'
import { PHASES, PHASE_LABEL, phaseAt, phaseIndex } from '../components/zen/journey'
import { SCENERY, sceneryAt } from '../components/zen/scenery'
import { useAmbientAudio } from '../components/zen/useAmbientAudio'
import { usePrefersReducedMotion, useSceneMotion } from '../components/zen/useSceneMotion'
import { WEATHER, resolveWeather, type WeatherPref } from '../components/zen/weather'
import { useAppData } from '../lib/appData'
import { formatClock } from '../lib/timer'
import { useTimer } from '../lib/useTimer'
import { Button, cx } from '../components/ui'

export default function ZenFocus() {
  const { sessionId = '' } = useParams()
  const navigate = useNavigate()
  const { data } = useAppData()

  const session = data.sessions.find((s) => s.id === sessionId)
  const timer = useTimer(sessionId, session?.plannedMinutes ?? 45)
  const vehicle = session?.vehicle ?? data.settings.vehicle
  const reducedMotion = usePrefersReducedMotion()

  useAmbientAudio(data.settings.ambientSound)

  const phase = phaseAt(timer.progress)
  const scenery = useMemo(() => sceneryAt(sessionId, phase), [sessionId, phase])
  const weather = useMemo(
    () => resolveWeather(data.settings.weather as WeatherPref, sessionId),
    [data.settings.weather, sessionId],
  )
  const schedule = useMemo(
    () => bankSchedule(sessionId, (session?.plannedMinutes ?? 45) * 60),
    [sessionId, session?.plannedMinutes],
  )

  const sceneRef = useRef<HTMLDivElement>(null)
  useSceneMotion(sceneRef, {
    targetSpeed: phaseSpeed(phase, vehicle),
    schedule,
    timer: timer.state,
    enabled: !reducedMotion,
  })

  const [chromeVisible, setChromeVisible] = useState(true)
  const hideTimer = useRef<number | undefined>(undefined)

  const revealChrome = useCallback(() => {
    setChromeVisible(true)
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => setChromeVisible(false), 3500)
  }, [])

  // Chrome starts visible; this only begins the countdown that hides it.
  useEffect(() => {
    hideTimer.current = window.setTimeout(() => setChromeVisible(false), 3500)
    return () => window.clearTimeout(hideTimer.current)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate(`/write/${sessionId}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, sessionId])

  if (!session) {
    return (
      <div className="grid min-h-dvh place-items-center p-8">
        <Button onClick={() => navigate('/new')}>That session is gone — start a new one</Button>
      </div>
    )
  }

  const landed = timer.remaining <= 0
  const isPlane = vehicle === 'plane'

  return (
    <div
      ref={sceneRef}
      className="zen relative min-h-dvh overflow-hidden bg-canvas"
      data-phase={phase}
      onMouseMove={revealChrome}
      onClick={revealChrome}
      onTouchStart={revealChrome}
    >
      {/* Cabin wall the window is cut into. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 80% at 50% 42%, color-mix(in oklab, var(--c-surface) 55%, var(--c-canvas)), var(--c-canvas) 72%)',
        }}
      />

      <div className="relative mx-auto flex min-h-dvh max-w-4xl flex-col items-center justify-center gap-6 px-4 py-6 sm:gap-8">
        <div
          className={cx(
            'relative overflow-hidden',
            isPlane
              ? 'aspect-[3/4] h-[min(74vh,760px)] max-w-[92vw] rounded-[46%/33%]'
              : 'aspect-[4/3] w-[min(92vw,880px)] max-h-[74vh] rounded-2xl',
          )}
          style={{
            boxShadow:
              '0 40px 90px -28px rgba(0,0,0,0.6), 0 0 0 10px color-mix(in oklab, var(--c-sunk) 88%, #000), 0 0 0 12px color-mix(in oklab, var(--c-surface) 60%, transparent)',
          }}
        >
          <WindowScene
            phase={phase}
            vehicle={vehicle}
            scenery={scenery}
            weather={weather}
            seed={sessionId}
          />
          <CabinInterior vehicle={vehicle} weather={weather} />
        </div>

        <div className="text-center">
          <p className="font-display text-lg tracking-wide text-ink">
            {PHASE_LABEL[vehicle][phase]}
            <span className="text-ink-faint">
              {' · '}
              {SCENERY[scenery].label}
              {weather === 'clear' ? '' : ` · ${WEATHER[weather].label}`}
            </span>
          </p>

          <div className="mt-3.5 flex items-center justify-center gap-2" aria-hidden>
            {PHASES.map((p, i) => (
              <span
                key={p}
                className={cx(
                  'h-1.5 rounded-full transition-all duration-700',
                  i < phaseIndex(phase) && 'w-6 bg-ink-faint',
                  i === phaseIndex(phase) && 'w-10 bg-accent',
                  i > phaseIndex(phase) && 'w-6 bg-line',
                )}
              />
            ))}
          </div>

          <p
            className={cx(
              'mt-5 font-mono text-3xl tabular-nums transition-opacity duration-500',
              chromeVisible ? 'opacity-100' : 'opacity-35',
              landed && 'text-warm',
            )}
          >
            {formatClock(timer.remaining)}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-faint">
            {landed ? (isPlane ? 'you have landed' : 'you have arrived') : 'remaining'}
          </p>
        </div>

        <div
          className={cx(
            'flex flex-wrap justify-center gap-2 transition-opacity duration-500',
            chromeVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          {timer.isRunning ? (
            <Button size="sm" onClick={timer.pause}>
              Pause
            </Button>
          ) : (
            <Button size="sm" variant="primary" onClick={timer.start}>
              Resume
            </Button>
          )}
          <Button size="sm" onClick={() => navigate(`/write/${sessionId}`)}>
            Leave Zen
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              timer.pause()
              navigate(`/review/${sessionId}`)
            }}
          >
            I&rsquo;ve finished
          </Button>
        </div>
      </div>
    </div>
  )
}
