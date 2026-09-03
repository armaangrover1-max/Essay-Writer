import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PROMPT_BANK, promptById } from '../data/prompts'
import { useAppData } from '../lib/appData'
import { rollPrompts } from '../lib/selection'
import { LANES, LANE_LABEL, TIERS, TIER_LABEL, TIER_MINUTES, type Lane, type Prompt, type Tier } from '../lib/types'
import { PromptCard } from '../components/PromptCard'
import { Button, Card, Empty, PageTitle, SectionLabel, cx } from '../components/ui'

function Choice<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly T[]
  value: T
  onChange: (next: T) => void
  label: (option: T) => string
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={cx(
            'rounded-lg border px-3.5 py-2 text-sm transition',
            value === option
              ? 'border-accent bg-accent text-accent-ink'
              : 'border-line bg-surface text-ink-soft hover:border-ink-faint hover:text-ink',
          )}
        >
          {label(option)}
        </button>
      ))}
    </div>
  )
}

export default function NewSession() {
  const navigate = useNavigate()
  const { data, startSession, toggleBookmark } = useAppData()

  const [lane, setLane] = useState<Lane>('argument')
  const [tier, setTier] = useState<Tier>('standard')
  const [roll, setRoll] = useState<{ prompts: Prompt[]; exhausted: boolean } | null>(null)

  const bookmarks = data.bookmarkedPromptIds
    .map(promptById)
    .filter((p): p is Prompt => p !== undefined)

  function generate() {
    setRoll(rollPrompts(PROMPT_BANK, { lane, tier, writtenPromptIds: data.writtenPromptIds }))
  }

  function choose(prompt: Prompt) {
    const session = startSession({
      promptId: prompt.id,
      lane: prompt.lane,
      plannedMinutes: prompt.recommendedMinutes,
      vehicle: data.settings.vehicle,
    })
    navigate(`/write/${session.id}`)
  }

  return (
    <>
      <PageTitle sub="Pick a lane and a length, then take three at random. Only the one you write is used up — the other two go back in the pool.">
        Choose your ground
      </PageTitle>

      <div className="space-y-6">
        <div>
          <SectionLabel>Lane</SectionLabel>
          <Choice options={LANES} value={lane} onChange={setLane} label={(l) => LANE_LABEL[l]} />
        </div>

        <div>
          <SectionLabel>Length</SectionLabel>
          <Choice
            options={TIERS}
            value={tier}
            onChange={setTier}
            label={(t) => `${TIER_LABEL[t]} · ${TIER_MINUTES[t]} min`}
          />
        </div>

        <Button variant="primary" size="lg" onClick={generate} className="w-full sm:w-auto">
          Generate three prompts
        </Button>
      </div>

      {roll ? (
        <section className="mt-10 space-y-4">
          {roll.exhausted ? (
            <p className="rounded-lg border border-line bg-sunk px-4 py-3 text-sm text-ink-soft">
              You have worked through the whole {LANE_LABEL[lane].toLowerCase()} pool at this
              length. These are coming round again — worth writing differently this time.
            </p>
          ) : null}

          {roll.prompts.length === 0 ? (
            <Empty>
              No {LANE_LABEL[lane].toLowerCase()} prompts at {TIER_LABEL[tier].toLowerCase()} length
              yet. Try another length.
            </Empty>
          ) : (
            roll.prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                bookmarked={data.bookmarkedPromptIds.includes(prompt.id)}
                onBookmark={() => toggleBookmark(prompt.id)}
                onChoose={() => choose(prompt)}
              />
            ))
          )}
        </section>
      ) : null}

      {bookmarks.length > 0 ? (
        <section className="mt-12">
          <SectionLabel>Saved for later</SectionLabel>
          <div className="space-y-2">
            {bookmarks.map((prompt) => (
              <Card key={prompt.id} className="flex items-center gap-3 px-4 py-3">
                <div className="mr-auto min-w-0">
                  <p className="truncate font-display">{prompt.title}</p>
                  <p className="text-xs text-ink-faint">
                    {LANE_LABEL[prompt.lane]} · {prompt.recommendedMinutes} min
                  </p>
                </div>
                <Button size="sm" onClick={() => choose(prompt)}>
                  Write
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toggleBookmark(prompt.id)}>
                  Remove
                </Button>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}
