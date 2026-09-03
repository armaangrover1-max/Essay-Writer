import { describe, expect, test } from 'vitest'
import { exportArchive, exportHistory, parseArchive } from './exportImport'
import { EMPTY_DATA, type AppData } from '../types'

function dataWithOneSession(photoId: string | null): AppData {
  return {
    ...structuredClone(EMPTY_DATA),
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
        photoId,
        status: 'completed',
      },
    ],
    writtenPromptIds: ['p1'],
  }
}

const jpeg = () => new Blob([new Uint8Array([1, 2, 3, 4])], { type: 'image/jpeg' })

describe('exportHistory', () => {
  test('includes sessions but carries no photo payload', () => {
    const json = exportHistory(dataWithOneSession('photo-1'))
    const parsed = JSON.parse(json)

    expect(parsed.data.sessions).toHaveLength(1)
    expect(parsed.photos).toBeUndefined()
  })
})

describe('exportArchive', () => {
  test('embeds each photo alongside the data', async () => {
    const json = await exportArchive(dataWithOneSession('photo-1'), { 'photo-1': jpeg() })
    const parsed = JSON.parse(json)

    expect(Object.keys(parsed.photos)).toEqual(['photo-1'])
    expect(parsed.photos['photo-1']).toMatch(/^data:image\/jpeg;base64,/)
  })
})

describe('parseArchive', () => {
  test('restores the data from a history export', async () => {
    const original = dataWithOneSession(null)
    const restored = await parseArchive(exportHistory(original))

    expect(restored.data).toEqual(original)
    expect(restored.photos).toEqual({})
  })

  test('restores photos as blobs with their original bytes', async () => {
    const json = await exportArchive(dataWithOneSession('photo-1'), { 'photo-1': jpeg() })

    const restored = await parseArchive(json)
    const blob = restored.photos['photo-1']!

    expect(blob.type).toBe('image/jpeg')
    expect(new Uint8Array(await blob.arrayBuffer())).toEqual(new Uint8Array([1, 2, 3, 4]))
  })

  test('rejects a file that is not an Essay Trainer archive', async () => {
    await expect(parseArchive('{"hello":"world"}')).rejects.toThrow(/not an Essay Trainer/i)
  })

  test('rejects a file that is not valid JSON', async () => {
    await expect(parseArchive('{ nope')).rejects.toThrow(/could not be read/i)
  })
})
