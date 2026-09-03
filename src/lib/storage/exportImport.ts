import { DEFAULT_SETTINGS, type AppData, type Settings } from '../types'

const ARCHIVE_KIND = 'essay-trainer-archive'

export interface ArchiveFile {
  kind: typeof ARCHIVE_KIND
  version: 1
  exportedAt: string
  data: AppData
  photos?: Record<string, string>
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error ?? new Error('Could not read image'))
    reader.readAsDataURL(blob)
  })
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64 = ''] = dataUrl.split(',')
  const type = header?.match(/^data:([^;]+)/)?.[1] ?? 'application/octet-stream'
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Blob([bytes], { type })
}

function envelope(data: AppData): Omit<ArchiveFile, 'photos'> {
  return { kind: ARCHIVE_KIND, version: 1, exportedAt: new Date().toISOString(), data }
}

/** Metadata only — a few KB, safe to export often. */
export function exportHistory(data: AppData): string {
  return JSON.stringify(envelope(data), null, 2)
}

/** Everything, with photos inlined as data URLs. Large, but restores completely. */
export async function exportArchive(
  data: AppData,
  photos: Record<string, Blob>,
): Promise<string> {
  const encoded: Record<string, string> = {}
  for (const [id, blob] of Object.entries(photos)) {
    encoded[id] = await blobToDataUrl(blob)
  }
  return JSON.stringify({ ...envelope(data), photos: encoded }, null, 2)
}

export async function parseArchive(
  json: string,
): Promise<{ data: AppData; photos: Record<string, Blob> }> {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    throw new Error('That file could not be read as JSON.')
  }

  const file = parsed as Partial<ArchiveFile>
  if (file?.kind !== ARCHIVE_KIND || typeof file.data !== 'object' || file.data === null) {
    throw new Error('That file is not an Essay Trainer archive.')
  }

  const incoming = file.data as Partial<AppData>
  const data: AppData = {
    version: 1,
    sessions: Array.isArray(incoming.sessions) ? incoming.sessions : [],
    writtenPromptIds: Array.isArray(incoming.writtenPromptIds) ? incoming.writtenPromptIds : [],
    bookmarkedPromptIds: Array.isArray(incoming.bookmarkedPromptIds)
      ? incoming.bookmarkedPromptIds
      : [],
    settings: { ...DEFAULT_SETTINGS, ...(incoming.settings as Partial<Settings> | undefined) },
  }

  const photos: Record<string, Blob> = {}
  for (const [id, dataUrl] of Object.entries(file.photos ?? {})) {
    photos[id] = dataUrlToBlob(dataUrl)
  }

  return { data, photos }
}
