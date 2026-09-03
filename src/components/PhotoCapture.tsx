import { useEffect, useRef, useState } from 'react'
import { downscaleImage } from '../lib/image'
import { Button, Card } from './ui'

export function PhotoCapture({ onChange }: { onChange: (blob: Blob | null) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview)
  }, [preview])

  async function handleFile(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const blob = await downscaleImage(file)
      if (preview) URL.revokeObjectURL(preview)
      setPreview(URL.createObjectURL(blob))
      onChange(blob)
    } catch {
      setError('That image could not be read. Try another photo.')
    } finally {
      setBusy(false)
    }
  }

  function clear() {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <Card className="p-5">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />

      {preview ? (
        <div className="space-y-3">
          <img
            src={preview}
            alt="The page you just wrote"
            className="max-h-80 w-full rounded-lg border border-line object-contain"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => inputRef.current?.click()}>
              Replace
            </Button>
            <Button size="sm" variant="ghost" onClick={clear}>
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Button onClick={() => inputRef.current?.click()} disabled={busy}>
            {busy ? 'Processing…' : 'Photograph the page'}
          </Button>
          <p className="mt-2 text-xs text-ink-faint">
            Optional. Kept on this device only, resized so your archive stays small.
          </p>
        </div>
      )}

      {error ? <p className="mt-3 text-sm text-missing">{error}</p> : null}
    </Card>
  )
}
