import type { Lane } from '../../lib/types'

export interface GuidanceSection {
  heading: string
  /** Each item is a move you can actually make on the page. */
  items: string[]
}

export const GUIDANCE: Record<Lane, GuidanceSection[]> = {
  argument: [
    {
      heading: 'Build the thesis',
      items: [
        'Write one sentence someone could disagree with. “Social media affects democracy” is a topic; “Social media weakens democracy by rewarding certainty over accuracy” is a thesis.',
        'Add the word “because”. If the sentence cannot carry it, you have a claim without a reason.',
        'Name what would prove you wrong. If nothing could, you are not arguing — you are describing.',
      ],
    },
    {
      heading: 'Open in one of four ways',
      items: [
        'The tension: two things both true, and apparently incompatible.',
        'The concrete case: one specific situation, then the general question it forces.',
        'The received view: what most people assume, stated fairly, then the crack in it.',
        'The stakes: what changes depending on the answer. Never open with a dictionary definition.',
      ],
    },
    {
      heading: 'Architecture of a paragraph',
      items: [
        'Claim — the one thing this paragraph establishes.',
        'Evidence — the case, text, statistic or example.',
        'Warrant — why that evidence supports that claim. This is the sentence most essays skip, and the one that separates argument from assertion.',
        'Link — what this earns you for the next step.',
      ],
    },
    {
      heading: 'Handle the counterargument',
      items: [
        'State it in the form its holder would endorse. If they would not sign your version, you are attacking a substitute.',
        'Concede whatever is genuinely right. Conceding strengthens you; refusing to concede anything reads as fear.',
        'Then say precisely where it fails, and why your position survives that failure.',
      ],
    },
    {
      heading: 'Conclusions that earn their place',
      items: [
        'Name what follows from your argument that was not obvious at the start.',
        'Name the cost of your own position. Every real position has one.',
        'Do not summarise. The reader was there.',
      ],
    },
  ],

  application: [
    {
      heading: 'The shape (roughly 650 words)',
      items: [
        'Roughly 100 words: a specific moment, in scene. No preamble.',
        'Roughly 300 words: what happened, and what you did — actions, not adjectives.',
        'Roughly 200 words: what it changed in how you think. This is the actual essay.',
        'Roughly 50 words: land it. Do not restate.',
      ],
    },
    {
      heading: 'Openings that work',
      items: [
        'In medias res — start inside the moment, explain nothing yet.',
        'An object — one concrete thing, described precisely.',
        'A contradiction — something about you that does not fit, stated plainly.',
        'Never: a quotation from someone famous, or “ever since I was young”.',
      ],
    },
    {
      heading: 'Show, don’t tell',
      items: [
        'Every abstract virtue you name is a scene you decided not to write.',
        'Replace “I was determined” with the thing you did at 6am for four months.',
        'The reader draws the conclusion. Your job is to make it unavoidable, not to state it.',
      ],
    },
    {
      heading: 'The “so what” test',
      items: [
        'After every paragraph, ask: so what? If there is no answer, the paragraph is filler.',
        'Ask it of the whole essay too. What does a reader now know about how your mind works?',
        'If the answer is “that they did an impressive thing”, you have written a résumé in prose.',
      ],
    },
  ],

  creative: [
    {
      heading: 'Take the constraint seriously',
      items: [
        'The constraint is the prompt. Drifting out of it when it gets hard is how the piece goes ordinary.',
        'If the constraint feels impossible around the halfway mark, that is usually the point at which it starts working.',
      ],
    },
    {
      heading: 'Scene or summary',
      items: [
        'Scene: one moment, real time, sensory detail. Slow. Use it for what matters.',
        'Summary: compressed time, no detail. Fast. Use it to get between the things that matter.',
        'Most weak pieces are summary throughout, then wonder why nothing lands.',
      ],
    },
    {
      heading: 'Image discipline',
      items: [
        'One precise image beats three approximate ones. Cut the other two.',
        'Prefer the specific noun to the adjective — “a Ford Escort” over “an old car”.',
        'If an image is doing symbolic work, do not also explain the symbol.',
      ],
    },
    {
      heading: 'Endings',
      items: [
        'Cut your last paragraph and read it again. It is often better.',
        'An ending should feel inevitable but not predicted.',
        'Resist resolution. A piece can close without the problem closing.',
      ],
    },
  ],
}

export interface CitationNote {
  style: string
  inText: string
  works: string
}

/**
 * A deliberately small reference. Handwritten practice essays do not need full
 * format guides; this exists so the shape is familiar when it eventually matters.
 */
export const CITATIONS: CitationNote[] = [
  {
    style: 'MLA 9',
    inText: '(Sandel 42)',
    works: 'Sandel, Michael. *The Tyranny of Merit*. Farrar, Straus and Giroux, 2020.',
  },
  {
    style: 'APA 7',
    inText: '(Sandel, 2020, p. 42)',
    works: 'Sandel, M. (2020). *The tyranny of merit*. Farrar, Straus and Giroux.',
  },
  {
    style: 'Chicago (notes)',
    inText: '1. Michael Sandel, *The Tyranny of Merit* (New York: FSG, 2020), 42.',
    works: 'Sandel, Michael. *The Tyranny of Merit*. New York: Farrar, Straus and Giroux, 2020.',
  },
]
