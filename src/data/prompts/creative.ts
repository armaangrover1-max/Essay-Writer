import type { Prompt } from '../../lib/types'

export const creativePrompts: Prompt[] = [
  {
    id: 'cre-unreliable-room',
    lane: 'creative',
    tier: 'standard',
    title: 'The Unreliable Room',
    seed: 'A narrator’s unreliability is usually signalled by what they say. It is far more interesting when it shows in what they notice. Someone who describes a room in obsessive detail while omitting one obvious thing tells you everything about themselves, and never once lies.',
    task: 'Describe a room through the eyes of someone concealing something — from the reader, or from themselves. Every sentence must be literally true. The concealment happens only in what goes unmentioned.',
    themes: ['point of view', 'craft'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions make the omission felt by circling it. The reader senses the shape of the missing thing from the pressure of everything arranged around it — the chair angled away, the drawer described twice, the window the narrator keeps returning to for reasons they do not give.',
      goFurther: [
        'Kazuo Ishiguro, *The Remains of the Day* (1989)',
        'Ernest Hemingway, “Hills Like White Elephants” (1927)',
        'Vladimir Nabokov, *Pale Fire* (1962) — the commentary',
      ],
      trap: 'Winking at the reader. One knowing aside — “I certainly was not thinking about the letter” — collapses the whole effect. The narrator must not know that they are concealing anything.',
    },
  },
  {
    id: 'cre-fifty-years',
    lane: 'creative',
    tier: 'standard',
    title: 'Fifty Years in Nine Hundred Words',
    seed: 'Compression is the hardest thing in prose. A novel can let a decade pass in a chapter break; a short piece has to make duration felt in a few paragraphs. Summary tells us that time passed. Scene makes us live one moment of it. The craft is knowing exactly when to switch.',
    task: 'Cover at least fifty years in one person’s life. You may write no more than three scenes — everything else must be summary. The piece must end on a scene, not on summary.',
    themes: ['structure', 'time'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions choose scenes that are small. A wedding and a funeral cover a great deal of time and tell us almost nothing. A woman relacing the same boot in three different decades tells us everything.',
      goFurther: [
        'Alice Munro, “The Bear Came Over the Mountain” (1999)',
        'Virginia Woolf, *To the Lighthouse* — the “Time Passes” section',
        'Gabriel García Márquez, *One Hundred Years of Solitude* — the opening sentence',
      ],
      trap: 'Writing a biography. Coverage is not the goal: the years must be felt as accumulation or as loss, not listed as events. If a reader could reconstruct a timeline from your piece, you have written a record rather than a story.',
    },
  },
  {
    id: 'cre-argument-neither-wins',
    lane: 'creative',
    tier: 'standard',
    title: 'The Argument Neither Wins',
    seed: 'Most written dialogue is a delivery mechanism: one character is right, and the other exists to be corrected. Real arguments do not work that way. Both people are partly right, both are arguing about something other than the stated subject, and neither changes their mind.',
    task: 'Write a scene in which two people argue and neither is defeated. The stated subject must not be the real subject. No narration of feelings — what each of them wants has to be visible in what they say and do.',
    themes: ['dialogue', 'subtext'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions let each character land a real blow. If a reader can tell whose side the author is on, the scene has quietly become an essay in costume — and the argument stops being an argument.',
      goFurther: [
        'Harold Pinter, *The Homecoming* (1965)',
        'Raymond Carver, “Why Don’t You Dance?” (1981)',
        'Sally Rooney, *Normal People* (2018) — the arguments about money',
      ],
      trap: 'Giving one character the better lines. The moment a reader knows who to root for, the tension leaves the scene and does not come back.',
    },
  },
]
