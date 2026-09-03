import { describe, expect, test } from 'vitest'
import { createTimer, elapsedSeconds, formatClock, pause, remainingSeconds, setPlanned, start } from './timer'

const T0 = 1_700_000_000_000

describe('timer', () => {
  test('a fresh timer has run for no time', () => {
    expect(elapsedSeconds(createTimer(45), T0)).toBe(0)
  })

  test('counts wall-clock seconds while running', () => {
    const running = start(createTimer(45), T0)

    expect(elapsedSeconds(running, T0 + 90_000)).toBe(90)
  })

  test('freezes once paused', () => {
    const paused = pause(start(createTimer(45), T0), T0 + 90_000)

    expect(elapsedSeconds(paused, T0 + 500_000)).toBe(90)
  })

  test('resumes from where it was paused rather than restarting', () => {
    const paused = pause(start(createTimer(45), T0), T0 + 90_000)
    const resumed = start(paused, T0 + 500_000)

    expect(elapsedSeconds(resumed, T0 + 530_000)).toBe(120)
  })

  test('keeps counting across a reload, since elapsed is derived from timestamps', () => {
    const running = start(createTimer(45), T0)
    const revived = JSON.parse(JSON.stringify(running))

    expect(elapsedSeconds(revived, T0 + 600_000)).toBe(600)
  })

  test('changing the planned length does not disturb time already spent', () => {
    const running = start(createTimer(45), T0)
    const relengthened = setPlanned(running, 90)

    expect(relengthened.plannedMinutes).toBe(90)
    expect(elapsedSeconds(relengthened, T0 + 60_000)).toBe(60)
  })

  test('reports remaining time, and goes negative once you run over', () => {
    const running = start(createTimer(1), T0)

    expect(remainingSeconds(running, T0 + 30_000)).toBe(30)
    expect(remainingSeconds(running, T0 + 90_000)).toBe(-30)
  })

  test('starting an already running timer changes nothing', () => {
    const running = start(createTimer(45), T0)

    expect(start(running, T0 + 10_000)).toEqual(running)
  })

  test('pausing an already paused timer changes nothing', () => {
    const idle = createTimer(45)

    expect(pause(idle, T0)).toEqual(idle)
  })
})

describe('formatClock', () => {
  test('renders whole minutes and seconds', () => {
    expect(formatClock(0)).toBe('0:00')
    expect(formatClock(65)).toBe('1:05')
    expect(formatClock(2700)).toBe('45:00')
  })

  test('marks time run over with a minus', () => {
    expect(formatClock(-30)).toBe('\u22120:30')
  })

  test('never prints a fractional second', () => {
    expect(formatClock(125.3521835)).toBe('2:05')
    expect(formatClock(-125.9)).toBe('\u22122:05')
  })
})
