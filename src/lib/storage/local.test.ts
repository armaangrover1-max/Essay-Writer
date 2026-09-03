import { beforeEach, describe, expect, test } from 'vitest'
import { LocalStore, STORAGE_KEY } from './local'
import { DEFAULT_SETTINGS, type AppData } from '../types'

function fullData(): AppData {
  return {
    version: 1,
    sessions: [
      {
        id: 's1',
        promptId: 'p1',
        lane: 'argument',
        startedAt: '2026-09-01T09:00:00.000Z',
        completedAt: '2026-09-01T09:45:00.000Z',
        plannedMinutes: 45,
        elapsedSeconds: 2700,
        vehicle: 'plane',
        marks: { thesis: 'solid' },
        photoId: 'photo-1',
        status: 'completed',
      },
    ],
    writtenPromptIds: ['p1'],
    bookmarkedPromptIds: ['p2'],
    settings: { theme: 'dark', vehicle: 'bus', ambientSound: true, weeklyGoal: 5, weather: 'rain' },
  }
}

describe('LocalStore', () => {
  let store: LocalStore

  beforeEach(() => {
    localStorage.clear()
    store = new LocalStore()
  })

  test('returns empty data when nothing has been stored yet', () => {
    expect(store.load()).toEqual({
      version: 1,
      sessions: [],
      writtenPromptIds: [],
      bookmarkedPromptIds: [],
      settings: DEFAULT_SETTINGS,
    })
  })

  test('round-trips a full data payload', () => {
    const data = fullData()
    store.save(data)

    expect(store.load()).toEqual(data)
  })

  test('falls back to empty data when the stored payload is corrupt', () => {
    localStorage.setItem(STORAGE_KEY, '{ not json')

    expect(store.load().sessions).toEqual([])
  })

  test('fills in settings that an older payload did not have', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, sessions: [], writtenPromptIds: [], settings: { theme: 'dark' } }),
    )

    const loaded = store.load()

    expect(loaded.settings).toEqual({ ...DEFAULT_SETTINGS, theme: 'dark' })
    expect(loaded.bookmarkedPromptIds).toEqual([])
  })

  test('discards a payload written by an incompatible future version', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...fullData(), version: 99 }))

    expect(store.load().sessions).toEqual([])
  })

  test('clear removes everything', () => {
    store.save(fullData())
    store.clear()

    expect(store.load().sessions).toEqual([])
  })
})
