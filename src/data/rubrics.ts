import type { Lane } from '../lib/types'

export interface Criterion {
  id: string
  label: string
  /** Phrased as a test you can actually run on the page in front of you. */
  question: string
}

/** The depth panel means something slightly different per lane. */
export const STEELMAN_HEADING: Record<Lane, string> = {
  argument: 'The steelman you may have missed',
  application: 'What the strongest versions do',
  creative: 'What the strongest versions do',
}

export const RUBRICS: Record<Lane, Criterion[]> = {
  argument: [
    {
      id: 'thesis',
      label: 'Thesis',
      question:
        'Is there one sentence stating a claim a reasonable person could disagree with? Underline it. If you cannot find it, it is not there.',
    },
    {
      id: 'structure',
      label: 'Structure',
      question:
        'Does each paragraph do exactly one job — and would swapping any two paragraphs damage the argument? If the order does not matter, there is no argument.',
    },
    {
      id: 'evidence',
      label: 'Evidence',
      question:
        'Is every load-bearing claim supported by something other than your confidence in it? Mark any sentence that is assertion wearing the clothes of proof.',
    },
    {
      id: 'counterargument',
      label: 'Counterargument',
      question:
        'Did you engage the strongest opposing view, stated so its holder would recognise it? A weak version you defeat easily costs you more than it gains.',
    },
    {
      id: 'clarity',
      label: 'Clarity',
      question:
        'Read one paragraph aloud. Did you stumble anywhere? Every stumble is a sentence the reader would have to re-read.',
    },
    {
      id: 'conclusion',
      label: 'Conclusion',
      question:
        'Does the ending earn something the opening could not have said — or does it restate the introduction in a heavier coat?',
    },
  ],

  application: [
    {
      id: 'specificity',
      label: 'Specificity',
      question:
        'Could any other applicant have written this sentence? Find three that could survive in someone else’s essay. Those are the ones to cut or sharpen.',
    },
    {
      id: 'voice',
      label: 'Voice',
      question:
        'Does this sound like you talking, or like an essay being performed? Mark any phrase you would never say out loud.',
    },
    {
      id: 'showing',
      label: 'Show, don’t tell',
      question:
        'Did you name a quality you could have demonstrated instead? Every "I am curious" is a scene you did not write.',
    },
    {
      id: 'stakes',
      label: 'Stakes',
      question:
        'Is it clear what you stood to lose? Without stakes the reader has no reason to keep going.',
    },
    {
      id: 'reflection',
      label: 'Reflection',
      question:
        'Do you say what changed in you, not merely what happened to you? The events are the setting, not the subject.',
    },
    {
      id: 'opening',
      label: 'Opening',
      question:
        'Does the first line make the second line necessary? Cover everything but the first sentence and ask whether you would read on.',
    },
  ],

  creative: [
    {
      id: 'image',
      label: 'Image',
      question:
        'Is there at least one image a reader would still see tomorrow? Name it. If you cannot, the piece is made of statements.',
    },
    {
      id: 'constraint',
      label: 'Constraint',
      question:
        'Did you honour the constraint the prompt set, or drift out of it when it got difficult? The difficulty was the point.',
    },
    {
      id: 'compression',
      label: 'Compression',
      question:
        'Find one sentence doing no work and cut it. If you cannot find one, look harder — there is always one.',
    },
    {
      id: 'register',
      label: 'Voice consistency',
      question:
        'Does the register hold from first line to last, or does the writing get more formal whenever you are unsure?',
    },
    {
      id: 'ending',
      label: 'Ending',
      question:
        'Does it land, or does it merely stop? An ending that could have come one paragraph earlier has not landed.',
    },
    {
      id: 'surprise',
      label: 'Surprise',
      question:
        'Is there one moment you did not plan before you started writing? If everything went to plan, you transcribed rather than wrote.',
    },
  ],
}

export function criteriaIds(lane: Lane): string[] {
  return RUBRICS[lane].map((c) => c.id)
}
