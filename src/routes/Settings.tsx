import { useRef, useState } from 'react'
import { Button, Card, PageTitle, SectionLabel, cx } from '../components/ui'
import { useAppData } from '../lib/appData'
import { exportArchive, exportHistory, parseArchive } from '../lib/storage/exportImport'
import { allPhotos, putPhotoWithId } from '../lib/storage/photos'
import { EMPTY_DATA, type ThemePref, type Vehicle } from '../lib/types'
import { WEATHER, WEATHER_PREFS, type WeatherPref } from '../components/zen/weather'

function download(filename: string, contents: string) {
  const url = URL.createObjectURL(new Blob([contents], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function stamp(): string {
  return new Date().toISOString().slice(0, 10)
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-line-soft px-5 py-4 last:border-b-0">
      <div className="mr-auto">
        <p className="text-sm font-medium">{label}</p>
        {hint ? <p className="mt-0.5 text-xs text-ink-faint">{hint}</p> : null}
      </div>
      {children}
    </div>
  )
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (next: T) => void
}) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-line">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={cx(
            'px-3 py-1.5 text-sm transition',
            value === option.value
              ? 'bg-accent text-accent-ink'
              : 'bg-surface text-ink-soft hover:text-ink',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default function SettingsView() {
  const { data, updateSettings, replaceAll } = useAppData()
  const fileRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<{ tone: 'ok' | 'bad'; text: string } | null>(null)

  async function handleImport(file: File | undefined) {
    if (!file) return
    try {
      const { data: incoming, photos } = await parseArchive(await file.text())
      for (const [id, blob] of Object.entries(photos)) {
        await putPhotoWithId(id, blob)
      }
      replaceAll(incoming)
      setMessage({
        tone: 'ok',
        text: `Restored ${incoming.sessions.length} sessions and ${Object.keys(photos).length} photos.`,
      })
    } catch (error) {
      setMessage({ tone: 'bad', text: (error as Error).message })
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <>
      <PageTitle sub="Everything lives on this device. Nothing is sent anywhere.">Settings</PageTitle>

      <SectionLabel>Appearance & focus</SectionLabel>
      <Card className="mb-8">
        <Row label="Theme" hint="Warm paper by day, night flight after dark.">
          <Segmented<ThemePref>
            value={data.settings.theme}
            onChange={(theme) => updateSettings({ theme })}
            options={[
              { value: 'light', label: 'Paper' },
              { value: 'dark', label: 'Night' },
              { value: 'system', label: 'Auto' },
            ]}
          />
        </Row>
        <Row label="Zen vehicle" hint="What you are looking out of while you write.">
          <Segmented<Vehicle>
            value={data.settings.vehicle}
            onChange={(vehicle) => updateSettings({ vehicle })}
            options={[
              { value: 'plane', label: 'Plane' },
              { value: 'bus', label: 'Bus' },
            ]}
          />
        </Row>
        <Row
          label="Weather"
          hint={
            data.settings.weather === 'surprise'
              ? 'A different sky each session.'
              : WEATHER[data.settings.weather as keyof typeof WEATHER]?.note ?? ''
          }
        >
          <select
            value={data.settings.weather}
            onChange={(e) => updateSettings({ weather: e.target.value })}
            aria-label="Weather in Zen mode"
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink"
          >
            {WEATHER_PREFS.map((pref: WeatherPref) => (
              <option key={pref} value={pref}>
                {pref === 'surprise' ? 'Surprise me' : WEATHER[pref].label}
              </option>
            ))}
          </select>
        </Row>
        <Row label="Ambient hum" hint="Generated cabin noise. Off by default.">
          <Segmented<'on' | 'off'>
            value={data.settings.ambientSound ? 'on' : 'off'}
            onChange={(v) => updateSettings({ ambientSound: v === 'on' })}
            options={[
              { value: 'on', label: 'On' },
              { value: 'off', label: 'Off' },
            ]}
          />
        </Row>
        <Row label="Weekly goal" hint="Essays per week. The chain counts weeks that hit this.">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => updateSettings({ weeklyGoal: Math.max(1, data.settings.weeklyGoal - 1) })}
              aria-label="Lower the weekly goal"
            >
              −
            </Button>
            <span className="w-6 text-center font-mono tabular-nums">{data.settings.weeklyGoal}</span>
            <Button
              size="sm"
              onClick={() => updateSettings({ weeklyGoal: Math.min(14, data.settings.weeklyGoal + 1) })}
              aria-label="Raise the weekly goal"
            >
              +
            </Button>
          </div>
        </Row>
      </Card>

      <SectionLabel>Backup</SectionLabel>
      <Card className="mb-4">
        <Row label="Export history" hint="Metadata only — a few KB.">
          <Button size="sm" onClick={() => download(`essay-trainer-history-${stamp()}.json`, exportHistory(data))}>
            Download
          </Button>
        </Row>
        <Row label="Export full archive" hint="Includes every photo. Larger, but restores completely.">
          <Button
            size="sm"
            onClick={async () =>
              download(`essay-trainer-archive-${stamp()}.json`, await exportArchive(data, await allPhotos()))
            }
          >
            Download
          </Button>
        </Row>
        <Row label="Import" hint="Replaces what is on this device with the file's contents.">
          <>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="sr-only"
              onChange={(e) => void handleImport(e.target.files?.[0])}
            />
            <Button size="sm" onClick={() => fileRef.current?.click()}>
              Choose file
            </Button>
          </>
        </Row>
      </Card>

      {message ? (
        <p className={cx('mb-8 text-sm', message.tone === 'ok' ? 'text-good' : 'text-missing')}>
          {message.text}
        </p>
      ) : (
        <p className="mb-8 text-xs text-ink-faint">
          Browser storage can be cleared without warning. Export the archive once a month.
        </p>
      )}

      <SectionLabel>Danger</SectionLabel>
      <Card>
        <Row label="Erase everything" hint="Sessions, streaks and bookmarks. Photos are kept.">
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              if (confirm('Erase all sessions, streaks and bookmarks? This cannot be undone.')) {
                replaceAll({ ...structuredClone(EMPTY_DATA), settings: data.settings })
                setMessage({ tone: 'ok', text: 'Everything has been erased.' })
              }
            }}
          >
            Erase
          </Button>
        </Row>
      </Card>
    </>
  )
}
