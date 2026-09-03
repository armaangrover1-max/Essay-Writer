import { LANES, type Lane, type Mark, type Session } from './types'

export interface HeatmapDay {
  date: string
  count: number
}

export interface Stats {
  thisWeek: number
  thisMonth: number
  allTime: number
  byLane: Record<Lane, number>
  /** Consecutive weeks meeting the goal. An unfinished current week never breaks it. */
  weekChain: number
  heatmap: HeatmapDay[]
}

export interface CriterionTrend {
  criterionId: string
  solid: number
  shaky: number
  missing: number
  total: number
}

export const HEATMAP_DAYS = 84

/** Local-time YYYY-MM-DD. Avoids the UTC shift that toISOString would introduce. */
export function dateKey(d: Date): string {
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

/** Monday 00:00 local time. */
export function startOfWeek(d: Date): Date {
  const out = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const daysSinceMonday = (out.getDay() + 6) % 7
  out.setDate(out.getDate() - daysSinceMonday)
  return out
}

function addDays(d: Date, days: number): Date {
  const out = new Date(d)
  out.setDate(out.getDate() + days)
  return out
}

function completed(sessions: readonly Session[]): Session[] {
  return sessions.filter((s) => s.status === 'completed' && s.completedAt !== null)
}

export function computeStats(
  sessions: readonly Session[],
  options: { weeklyGoal: number; now?: Date },
): Stats {
  const { weeklyGoal, now = new Date() } = options
  const done = completed(sessions)

  const perWeek = new Map<string, number>()
  const perDay = new Map<string, number>()
  const byLane: Record<Lane, number> = { application: 0, argument: 0, creative: 0 }

  let thisWeek = 0
  let thisMonth = 0

  const currentWeekKey = dateKey(startOfWeek(now))

  for (const session of done) {
    const at = new Date(session.completedAt!)
    const weekKey = dateKey(startOfWeek(at))

    perWeek.set(weekKey, (perWeek.get(weekKey) ?? 0) + 1)
    const dayKey = dateKey(at)
    perDay.set(dayKey, (perDay.get(dayKey) ?? 0) + 1)
    byLane[session.lane] += 1

    if (weekKey === currentWeekKey) thisWeek += 1
    if (at.getFullYear() === now.getFullYear() && at.getMonth() === now.getMonth()) {
      thisMonth += 1
    }
  }

  // The current week only extends the chain — never breaks it, since it is unfinished.
  let chain = 0
  let cursor = startOfWeek(now)
  if ((perWeek.get(dateKey(cursor)) ?? 0) >= weeklyGoal) chain += 1
  cursor = addDays(cursor, -7)
  while ((perWeek.get(dateKey(cursor)) ?? 0) >= weeklyGoal) {
    chain += 1
    cursor = addDays(cursor, -7)
  }

  const firstDay = addDays(new Date(now.getFullYear(), now.getMonth(), now.getDate()), -(HEATMAP_DAYS - 1))
  const heatmap: HeatmapDay[] = Array.from({ length: HEATMAP_DAYS }, (_, i) => {
    const key = dateKey(addDays(firstDay, i))
    return { date: key, count: perDay.get(key) ?? 0 }
  })

  return { thisWeek, thisMonth, allTime: done.length, byLane, weekChain: chain, heatmap }
}

export function criterionTrends(
  sessions: readonly Session[],
  lane: Lane,
  criteriaIds: readonly string[],
  window = 10,
): CriterionTrend[] {
  const recent = completed(sessions)
    .filter((s) => s.lane === lane)
    .sort((a, b) => Date.parse(b.completedAt!) - Date.parse(a.completedAt!))
    .slice(0, window)

  return criteriaIds.map((criterionId) => {
    const trend: CriterionTrend = { criterionId, solid: 0, shaky: 0, missing: 0, total: 0 }
    for (const session of recent) {
      const mark: Mark | undefined = session.marks[criterionId]
      if (!mark) continue
      trend[mark] += 1
      trend.total += 1
    }
    return trend
  })
}

export const ALL_LANES = LANES
