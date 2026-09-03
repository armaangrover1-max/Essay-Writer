import { openDB, type IDBPDatabase } from 'idb'

const DB_NAME = 'essay-trainer-photos'
const STORE = 'photos'
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase> | null = null

function db(): Promise<IDBPDatabase> {
  dbPromise ??= openDB(DB_NAME, DB_VERSION, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(STORE)) {
        database.createObjectStore(STORE)
      }
    },
  })
  return dbPromise
}

function newId(): string {
  return `photo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export async function putPhoto(blob: Blob): Promise<string> {
  const id = newId()
  await putPhotoWithId(id, blob)
  return id
}

/**
 * Photos are stored as raw bytes plus a mime type rather than as Blobs.
 * Blob round-tripping through IndexedDB has a long history of engine bugs
 * (notably in Safari), and ArrayBuffers structured-clone reliably everywhere.
 */
interface StoredPhoto {
  type: string
  bytes: ArrayBuffer
}

export async function putPhotoWithId(id: string, blob: Blob): Promise<void> {
  const record: StoredPhoto = { type: blob.type, bytes: await blob.arrayBuffer() }
  await (await db()).put(STORE, record, id)
}

export async function getPhoto(id: string): Promise<Blob | undefined> {
  const record = (await (await db()).get(STORE, id)) as StoredPhoto | undefined
  if (!record) return undefined
  return new Blob([record.bytes], { type: record.type })
}

export async function deletePhoto(id: string): Promise<void> {
  await (await db()).delete(STORE, id)
}

export async function allPhotos(): Promise<Record<string, Blob>> {
  const database = await db()
  const keys = await database.getAllKeys(STORE)
  const values = await database.getAll(STORE)
  const out: Record<string, Blob> = {}
  keys.forEach((key, i) => {
    const record = values[i] as StoredPhoto
    out[String(key)] = new Blob([record.bytes], { type: record.type })
  })
  return out
}

/** Test helper: drop everything so each case starts from a clean store. */
export async function resetPhotoStore(): Promise<void> {
  await (await db()).clear(STORE)
}
