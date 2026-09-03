import { useEffect, useState } from 'react'
import { getPhoto } from '../lib/storage/photos'

export function SessionPhoto({ photoId, alt }: { photoId: string; alt: string }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let revoked = false
    let objectUrl: string | null = null

    void getPhoto(photoId).then((blob) => {
      if (!blob || revoked) return
      objectUrl = URL.createObjectURL(blob)
      setUrl(objectUrl)
    })

    return () => {
      revoked = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [photoId])

  if (!url) {
    return <div className="h-40 animate-pulse rounded-lg bg-sunk" aria-hidden />
  }
  return <img src={url} alt={alt} className="max-h-96 w-full rounded-lg border border-line object-contain" />
}
