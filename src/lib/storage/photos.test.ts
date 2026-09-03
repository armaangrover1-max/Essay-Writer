import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, test } from 'vitest'
import { allPhotos, deletePhoto, getPhoto, putPhoto, putPhotoWithId, resetPhotoStore } from './photos'

const jpeg = () => new Blob([new Uint8Array([0xff, 0xd8, 0xff])], { type: 'image/jpeg' })

describe('photo store', () => {
  beforeEach(async () => {
    await resetPhotoStore()
  })

  test('stores a photo and reads the same bytes back', async () => {
    const id = await putPhoto(jpeg())
    const found = await getPhoto(id)

    expect(found).toBeInstanceOf(Blob)
    expect(new Uint8Array(await found!.arrayBuffer())).toEqual(new Uint8Array([0xff, 0xd8, 0xff]))
  })

  test('gives every photo a distinct id', async () => {
    const first = await putPhoto(jpeg())
    const second = await putPhoto(jpeg())

    expect(first).not.toBe(second)
  })

  test('returns undefined for an id that was never stored', async () => {
    expect(await getPhoto('nope')).toBeUndefined()
  })

  test('deletes a photo', async () => {
    const id = await putPhoto(jpeg())
    await deletePhoto(id)

    expect(await getPhoto(id)).toBeUndefined()
  })

  test('returns every stored photo keyed by id', async () => {
    const first = await putPhoto(jpeg())
    const second = await putPhoto(jpeg())

    const all = await allPhotos()

    expect(Object.keys(all).sort()).toEqual([first, second].sort())
  })

  test('restores a photo under a caller-supplied id, as import needs', async () => {
    await putPhotoWithId('from-backup', jpeg())

    expect(await getPhoto('from-backup')).toBeInstanceOf(Blob)
  })
})
