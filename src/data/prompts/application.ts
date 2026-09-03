import type { Prompt } from '../../lib/types'

export const applicationPrompts: Prompt[] = [
  {
    id: 'app-thing-you-were-wrong-about',
    lane: 'application',
    tier: 'standard',
    title: 'The Thing You Were Wrong About',
    seed: 'Admissions readers see thousands of essays about growth, and nearly all of them describe a difficulty that was overcome. Almost none describe a belief that was mistaken. The first shows resilience, which is common. The second shows you can revise yourself, which is rare — and far harder to fake.',
    task: 'Write about something you believed and no longer believe. Not a preference that drifted: a conviction you argued for out loud, and were wrong about. Show the moment it broke, and what admitting it cost you.',
    themes: ['personal statement', 'reflection'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions refuse the tidy ending. They admit the belief was comfortable, name what holding it was doing for them, and stop short of claiming full enlightenment. A reader trusts an essay that concedes it is not finished changing.',
      goFurther: [
        'Montaigne, “Of Repentance” (Essays, Book III)',
        'Joan Didion, “On Self-Respect” (1961)',
        'James Baldwin, “Notes of a Native Son” — on revising a judgement of one’s own father',
      ],
      trap: 'Choosing a belief so trivial — a food you disliked, a band you dismissed — that being wrong cost nothing. The stakes of the belief set the ceiling of the essay, and no amount of good prose raises it afterwards.',
    },
  },
  {
    id: 'app-object-on-your-desk',
    lane: 'application',
    tier: 'standard',
    title: 'The Object on Your Desk',
    seed: 'The most over-written opening in applications is the abstract claim: “I have always been fascinated by…”. The most under-used is the concrete particular. An object carries a story without announcing one, and forces you into detail before you are allowed to reach for meaning.',
    task: 'Choose one physical object you actually own. Open with it, in specific detail. Let it carry you to something true about how you think — and arrive there without ever stating the lesson outright.',
    themes: ['personal statement', 'craft'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions trust the object. The reader is running well ahead of you; if the object is chosen well and described precisely, the meaning arrives on its own. Essays fail here by explaining the symbol they have just successfully built.',
      goFurther: [
        'George Orwell, “A Nice Cup of Tea” (1946)',
        'Nicholson Baker, *The Mezzanine* (1988)',
        'Roland Barthes, *Mythologies* (1957) — the short pieces',
      ],
      trap: 'Naming the lesson in the final paragraph. If you have to write “that watch taught me patience”, the watch did not. Cut the last two sentences and see whether the essay survives — it usually improves.',
    },
  },
  {
    id: 'app-question-you-cannot-answer',
    lane: 'application',
    tier: 'standard',
    title: 'The Question You Cannot Answer',
    seed: 'Applications reward competence, and most essays perform it. But intellectual character shows far more clearly in what someone does not know and keeps returning to anyway. A live question reveals more than a settled achievement.',
    task: 'Name a question you genuinely cannot answer and have not stopped thinking about. Show your actual attempts on it — including the ones that failed — rather than describing your interest in it from a safe distance.',
    themes: ['personal statement', 'intellectual curiosity'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions demonstrate curiosity instead of asserting it. They show a mind working: here is what I tried, here is where it broke, here is the better version of the question I now hold. Interest can be claimed by anyone; inquiry has to be shown.',
      goFurther: [
        'Richard Feynman, *The Pleasure of Finding Things Out* (1999)',
        'Karl Popper, *Conjectures and Refutations* (1963), ch. 1',
        'Susan Sontag, *Reborn: Journals and Notebooks* — thinking caught mid-motion',
      ],
      trap: 'Choosing a question that has an answer you simply have not looked up. The question must be genuinely open, or the essay becomes a display of not having done the reading.',
    },
  },
]
