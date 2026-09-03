import { DEFAULT_SETTINGS, EMPTY_DATA, type AppData, type Settings } from '../types'

export const STORAGE_KEY = 'essay-trainer:v1'
const CURRENT_VERSION = 1

function emptyData(): AppData {
  return structuredClone(EMPTY_DATA)
}

/**
 * Reads a payload that may have been written by an older build: anything
 * missing is filled from defaults rather than crashing the app.
 */
function reconcile(raw: unknown): AppData {
  if (typeof raw !== 'object' || raw === null) return emptyData()
  const candidate = raw as Partial<AppData>
  if (candidate.version !== CURRENT_VERSION) return emptyData()

  return {
    version: CURRENT_VERSION,
    sessions: Array.isArray(candidate.sessions) ? candidate.sessions : [],
    writtenPromptIds: Array.isArray(candidate.writtenPromptIds) ? candidate.writtenPromptIds : [],
    bookmarkedPromptIds: Array.isArray(candidate.bookmarkedPromptIds)
      ? candidate.bookmarkedPromptIds
      : [],
    settings: { ...DEFAULT_SETTINGS, ...(candidate.settings as Partial<Settings> | undefined) },
  }
}

export class LocalStore {
  private readonly key: string

  constructor(key: string = STORAGE_KEY) {
    this.key = key
  }

  load(): AppData {
    let raw: string | null = null
    try {
      raw = localStorage.getItem(this.key)
    } catch {
      return emptyData()
    }
    if (raw === null) return emptyData()

    try {
      return reconcile(JSON.parse(raw))
    } catch {
      return emptyData()
    }
  }

  save(data: AppData): void {
    localStorage.setItem(this.key, JSON.stringify(data))
  }

  clear(): void {
    localStorage.removeItem(this.key)
  }
}
