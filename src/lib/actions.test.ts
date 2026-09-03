import { describe, expect, test } from 'vitest'
import { abandonSession, finishSession, startSession, toggleBookmark } from './actions'
import { EMPTY_DATA, type AppData } from './types'

const base = (): AppData => structuredClone(EMPTY_DATA)

const startArgs = { promptId: 'p1', lane: 'argument' as const, plannedMinutes: 45, vehicle: 'plane' as const }

describe('startSession', () => {
  test('records an in-progress session', () => {
    const { data, session } = startSession(base(), startArgs)

    expect(data.sessions).toHaveLength(1)
    expect(session.status).toBe('in-progress')
    expect(session.completedAt).toBeNull()
    expect(session.plannedMinutes).toBe(45)
  })

  test('does not consume the prompt until it has actually been written', () => {
    const { data } = startSession(base(), startArgs)

    expect(data.writtenPromptIds).toEqual([])
  })
})

describe('finishSession', () => {
  test('completes the session and consumes the prompt', () => {
    const { data, session } = startSession(base(), startArgs)

    const after = finishSession(data, session.id, {
      elapsedSeconds: 2600,
      marks: { thesis: 'solid' },
      photoId: 'photo-1',
    })

    const saved = after.sessions[0]!
    expect(saved.status).toBe('completed')
    expect(saved.completedAt).not.toBeNull()
    expect(saved.elapsedSeconds).toBe(2600)
    expect(saved.marks).toEqual({ thesis: 'solid' })
    expect(saved.photoId).toBe('photo-1')
    expect(after.writtenPromptIds).toEqual(['p1'])
  })

  test('does not list the same prompt as written twice', () => {
    const first = startSession(base(), startArgs)
    const afterFirst = finishSession(first.data, first.session.id, {
      elapsedSeconds: 100,
      marks: {},
      photoId: null,
    })
    const second = startSession(afterFirst, startArgs)
    const afterSecond = finishSession(second.data, second.session.id, {
      elapsedSeconds: 100,
      marks: {},
      photoId: null,
    })

    expect(afterSecond.writtenPromptIds).toEqual(['p1'])
  })

  test('leaves the data untouched when the session id is unknown', () => {
    const data = base()

    expect(finishSession(data, 'nope', { elapsedSeconds: 1, marks: {}, photoId: null })).toEqual(data)
  })
})

describe('abandonSession', () => {
  test('marks the session abandoned and leaves the prompt available', () => {
    const { data, session } = startSession(base(), startArgs)

    const after = abandonSession(data, session.id)

    expect(after.sessions[0]!.status).toBe('abandoned')
    expect(after.writtenPromptIds).toEqual([])
  })
})

describe('toggleBookmark', () => {
  test('adds a prompt then removes it again', () => {
    const added = toggleBookmark(base(), 'p9')
    expect(added.bookmarkedPromptIds).toEqual(['p9'])

    expect(toggleBookmark(added, 'p9').bookmarkedPromptIds).toEqual([])
  })
})
