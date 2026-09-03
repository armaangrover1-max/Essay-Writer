import type { Prompt } from '../lib/types'
import { Button, Card, Pill } from './ui'

interface Props {
  prompt: Prompt
  bookmarked: boolean
  onBookmark: () => void
  onChoose: () => void
}

export function PromptCard({ prompt, bookmarked, onBookmark, onChoose }: Props) {
  return (
    <Card className="flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <h3 className="mr-auto font-display text-xl leading-snug">{prompt.title}</h3>
        <button
          onClick={onBookmark}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this prompt'}
          className="-m-1 shrink-0 rounded-lg p-1 text-lg transition hover:bg-sunk"
        >
          <span className={bookmarked ? 'text-warm' : 'text-ink-faint'}>
            {bookmarked ? '★' : '☆'}
          </span>
        </button>
      </div>

      <p className="font-display text-[0.98rem] leading-relaxed text-ink-soft">{prompt.seed}</p>

      <p className="border-l-2 border-accent pl-4 leading-relaxed">{prompt.task}</p>

      <div className="flex flex-wrap items-center gap-2">
        {prompt.themes.map((theme) => (
          <Pill key={theme}>{theme}</Pill>
        ))}
        <Pill>{prompt.recommendedMinutes} min suggested</Pill>
      </div>

      <Button variant="primary" onClick={onChoose} className="mt-1 self-start">
        Write this one
      </Button>
    </Card>
  )
}
