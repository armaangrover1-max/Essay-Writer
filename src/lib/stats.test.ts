import { describe, expect, test } from 'vitest'
import { computeStats, criterionTrends } from './stats'
import type { Lane, Mark, Session, SessionStatus } from './types'

const NOW = new Date('2026-09-02T12:00:00') // Wednesday; ISO week began Mon Aug 31

function makeSession(
  completedAt: string,
  lane: Lane = 'argument',
  status: SessionStatus = 'completed',
  marks: Record<string, Mark> = {},
): Session {
  return {
    id: `s-${completedAt}-${lane}-${Math.random()}`,
    promptId: 'p1',
    lane,
    startedAt: completedAt,
    completedAt: status === 'completed' ? completedAt : null,
    plannedMinutes: 45,
    elapsedSeconds: 2700,
    vehicle: 'plane',
    marks,
    photoId: null,
    status,
  }
}

const opts = { weeklyGoal: 3, now: NOW }

describe('computeStats', () => {
  test('ignores sessions that were never completed', () => {
    const sessions = [
      makeSession('2026-09-01T10:00:00'),
      makeSession('2026-09-01T11:00:00', 'argument', 'abandoned'),
      makeSession('2026-09-01T12:00:00', 'argument', 'in-progress'),
    ]

    expect(computeStats(sessions, opts).allTime).toBe(1)
  })

  test('counts essays written since Monday of the current week', () => {
    const sessions = [
      makeSession('2026-08-31T09:00:00'), // Monday, this week
      makeSession('2026-09-02T09:00:00'), // today
      makeSession('2026-08-30T09:00:00'), // Sunday, last week
    ]

    expect(computeStats(sessions, opts).thisWeek).toBe(2)
  })

  test('counts essays written in the current calendar month', () => {
    const sessions = [
      makeSession('2026-09-01T09:00:00'),
      makeSession('2026-09-02T09:00:00'),
      makeSession('2026-08-31T09:00:00'), // August
    ]

    expect(computeStats(sessions, opts).thisMonth).toBe(2)
  })

  test('splits the all-time count by lane', () => {
    const sessions = [
      makeSession('2026-09-01T09:00:00', 'argument'),
      makeSession('2026-09-01T10:00:00', 'argument'),
      makeSession('2026-09-01T11:00:00', 'creative'),
    ]

    expect(computeStats(sessions, opts).byLane).toEqual({
      application: 0,
      argument: 2,
      creative: 1,
    })
  })

  test('counts consecutive earlier weeks that met the goal', () => {
    const sessions = [
      // last week (Aug 24-30): 3 essays
      makeSession('2026-08-24T09:00:00'),
      makeSession('2026-08-25T09:00:00'),
      makeSession('2026-08-26T09:00:00'),
      // two weeks ago (Aug 17-23): 3 essays
      makeSession('2026-08-17T09:00:00'),
      makeSession('2026-08-18T09:00:00'),
      makeSession('2026-08-19T09:00:00'),
    ]

    expect(computeStats(sessions, opts).weekChain).toBe(2)
  })

  test('includes the current week in the chain once it meets the goal', () => {
    const sessions = [
      makeSession('2026-08-31T09:00:00'),
      makeSession('2026-09-01T09:00:00'),
      makeSession('2026-09-02T09:00:00'),
      makeSession('2026-08-24T09:00:00'),
      makeSession('2026-08-25T09:00:00'),
      makeSession('2026-08-26T09:00:00'),
    ]

    expect(computeStats(sessions, opts).weekChain).toBe(2)
  })

  test('does not break the chain because the current week is still in progress', () => {
    const sessions = [
      makeSession('2026-09-01T09:00:00'), // only 1 so far this week
      makeSession('2026-08-24T09:00:00'),
      makeSession('2026-08-25T09:00:00'),
      makeSession('2026-08-26T09:00:00'),
    ]

    expect(computeStats(sessions, opts).weekChain).toBe(1)
  })

  test('reports a chain of zero when the previous week missed the goal', () => {
    const sessions = [
      makeSession('2026-08-24T09:00:00'),
      makeSession('2026-08-25T09:00:00'), // only 2 last week
    ]

    expect(computeStats(sessions, opts).weekChain).toBe(0)
  })

  test('builds an 84-day heatmap ending today', () => {
    const sessions = [
      makeSession('2026-09-02T09:00:00'),
      makeSession('2026-09-02T14:00:00'),
    ]

    const { heatmap } = computeStats(sessions, opts)

    expect(heatmap).toHaveLength(84)
    expect(heatmap.at(-1)).toEqual({ date: '2026-09-02', count: 2 })
    expect(heatmap.at(0)?.date).toBe('2026-06-11')
  })
})

describe('criterionTrends', () => {
  test('counts weak marks per criterion for a lane', () => {
    const sessions = [
      makeSession('2026-09-01T09:00:00', 'argument', 'completed', {
        thesis: 'solid',
        counterargument: 'shaky',
      }),
      makeSession('2026-09-02T09:00:00', 'argument', 'completed', {
        thesis: 'solid',
        counterargument: 'missing',
      }),
    ]

    const trends = criterionTrends(sessions, 'argument', ['thesis', 'counterargument'])

    expect(trends).toEqual([
      { criterionId: 'thesis', solid: 2, shaky: 0, missing: 0, total: 2 },
      { criterionId: 'counterargument', solid: 0, shaky: 1, missing: 1, total: 2 },
    ])
  })

  test('ignores sessions from other lanes', () => {
    const sessions = [
      makeSession('2026-09-01T09:00:00', 'argument', 'completed', { thesis: 'solid' }),
      makeSession('2026-09-02T09:00:00', 'creative', 'completed', { thesis: 'missing' }),
    ]

    const trends = criterionTrends(sessions, 'argument', ['thesis'])

    expect(trends[0]).toEqual({ criterionId: 'thesis', solid: 1, shaky: 0, missing: 0, total: 1 })
  })

  test('looks only at the most recent sessions within the window', () => {
    const sessions = [
      makeSession('2026-08-01T09:00:00', 'argument', 'completed', { thesis: 'missing' }),
      makeSession('2026-09-01T09:00:00', 'argument', 'completed', { thesis: 'solid' }),
      makeSession('2026-09-02T09:00:00', 'argument', 'completed', { thesis: 'solid' }),
    ]

    const trends = criterionTrends(sessions, 'argument', ['thesis'], 2)

    expect(trends[0]).toEqual({ criterionId: 'thesis', solid: 2, shaky: 0, missing: 0, total: 2 })
  })
})
