import type { AppData, Lane, Mark, Session, Vehicle } from './types'

export interface StartArgs {
  promptId: string
  lane: Lane
  plannedMinutes: number
  vehicle: Vehicle
}

export interface FinishArgs {
  elapsedSeconds: number
  marks: Record<string, Mark>
  photoId: string | null
}

function newSessionId(): string {
  return `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function startSession(
  data: AppData,
  args: StartArgs,
): { data: AppData; session: Session } {
  const session: Session = {
    id: newSessionId(),
    promptId: args.promptId,
    lane: args.lane,
    startedAt: new Date().toISOString(),
    completedAt: null,
    plannedMinutes: args.plannedMinutes,
    elapsedSeconds: 0,
    vehicle: args.vehicle,
    marks: {},
    photoId: null,
    status: 'in-progress',
  }
  return { data: { ...data, sessions: [...data.sessions, session] }, session }
}

export function finishSession(data: AppData, sessionId: string, args: FinishArgs): AppData {
  const target = data.sessions.find((s) => s.id === sessionId)
  if (!target) return data

  const sessions = data.sessions.map((s) =>
    s.id === sessionId
      ? {
          ...s,
          status: 'completed' as const,
          completedAt: new Date().toISOString(),
          elapsedSeconds: args.elapsedSeconds,
          marks: args.marks,
          photoId: args.photoId,
        }
      : s,
  )

  const written = data.writtenPromptIds.includes(target.promptId)
    ? data.writtenPromptIds
    : [...data.writtenPromptIds, target.promptId]

  return { ...data, sessions, writtenPromptIds: written }
}

export function abandonSession(data: AppData, sessionId: string): AppData {
  return {
    ...data,
    sessions: data.sessions.map((s) =>
      s.id === sessionId ? { ...s, status: 'abandoned' as const } : s,
    ),
  }
}

export function toggleBookmark(data: AppData, promptId: string): AppData {
  const has = data.bookmarkedPromptIds.includes(promptId)
  return {
    ...data,
    bookmarkedPromptIds: has
      ? data.bookmarkedPromptIds.filter((id) => id !== promptId)
      : [...data.bookmarkedPromptIds, promptId],
  }
}
