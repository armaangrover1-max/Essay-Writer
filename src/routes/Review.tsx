import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { promptById } from '../data/prompts'
import { criteriaIds } from '../data/rubrics'
import { ChecklistForm } from '../components/ChecklistForm'
import { DepthPanel } from '../components/DepthPanel'
import { PhotoCapture } from '../components/PhotoCapture'
import { Button, Empty, PageTitle, SectionLabel } from '../components/ui'
import { useAppData } from '../lib/appData'
import { putPhoto } from '../lib/storage/photos'
import { formatClock } from '../lib/timer'
import { useTimer } from '../lib/useTimer'
import type { Mark } from '../lib/types'

export default function Review() {
  const { sessionId = '' } = useParams()
  const navigate = useNavigate()
  const { data, finishSession } = useAppData()

  const session = data.sessions.find((s) => s.id === sessionId)
  const prompt = session ? promptById(session.promptId) : undefined
  const timer = useTimer(sessionId, session?.plannedMinutes ?? 45)

  const [marks, setMarks] = useState<Record<string, Mark>>({})
  const [photo, setPhoto] = useState<Blob | null>(null)
  const [saving, setSaving] = useState(false)

  if (!session || !prompt) {
    return <Empty>That session could not be found.</Empty>
  }

  const total = criteriaIds(prompt.lane).length
  const answered = criteriaIds(prompt.lane).filter((id) => marks[id]).length

  async function save() {
    setSaving(true)
    try {
      const photoId = photo ? await putPhoto(photo) : null
      finishSession(sessionId, { elapsedSeconds: timer.elapsed, marks, photoId })
      timer.clear()
      navigate('/history')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageTitle sub={`${prompt.title} · ${formatClock(timer.elapsed)} spent against ${session.plannedMinutes} planned`}>
        Now look at what you wrote
      </PageTitle>

      <DepthPanel prompt={prompt} />

      <section className="mt-10">
        <SectionLabel>
          Self-review · {answered} of {total}
        </SectionLabel>
        <p className="mb-4 text-sm text-ink-soft">
          Judge the page in front of you, honestly. Shaky is the useful answer — a row of
          &ldquo;solid&rdquo; teaches you nothing next month.
        </p>
        <ChecklistForm
          lane={prompt.lane}
          marks={marks}
          onChange={(id, mark) => setMarks((m) => ({ ...m, [id]: mark }))}
        />
      </section>

      <section className="mt-10">
        <SectionLabel>The page itself</SectionLabel>
        <PhotoCapture onChange={setPhoto} />
      </section>

      <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
        <Button variant="primary" size="lg" onClick={() => void save()} disabled={saving}>
          {saving ? 'Saving…' : 'Save this session'}
        </Button>
        <Button size="lg" onClick={() => navigate(`/write/${sessionId}`)}>
          Back to the prompt
        </Button>
      </div>
    </>
  )
}
