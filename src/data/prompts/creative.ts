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
  {
    id: 'cre-one-breath',
    lane: 'creative',
    tier: 'sharpener',
    title: 'One Sentence, One Breath',
    seed: 'A long sentence is not a run-on. It is a held note — it can accumulate, delay, and refuse to let the reader rest until it decides to. The skill is keeping it navigable: the reader must never lose the thread, however far it travels.',
    task: 'Write one sentence of at least two hundred words that stays grammatical and legible throughout. It must build to something, not merely continue.',
    themes: ['syntax', 'craft'],
    recommendedMinutes: 20,
    depth: {
      steelman:
        'The strongest versions use rhythm and repetition as handrails, so the reader always knows where they are in the structure. A long sentence fails not from length but from the moment the reader cannot tell which clause governs which.',
      goFurther: [
        'Virginia Woolf, *Mrs Dalloway* (1925) — the opening pages',
        'Gabriel García Márquez, *One Hundred Years of Solitude* (1967)',
        'Stanley Fish, *How to Write a Sentence* (2011)',
      ],
      trap: 'Chaining clauses with “and” until you reach the word count. Length without subordination is a list, and a list has no held note in it.',
    },
  },
  {
    id: 'cre-only-dialogue',
    lane: 'creative',
    tier: 'sharpener',
    title: 'Nothing But Speech',
    seed: 'Strip away narration and everything must be carried by what people say and refuse to say. Hemingway did it in “Hills Like White Elephants”: two people discuss something for pages without once naming it, and the reader knows exactly what it is.',
    task: 'Write a scene in dialogue only. No “he said”, no description, no interior access. The reader must be able to tell who is speaking, where they are, and what is at stake.',
    themes: ['dialogue', 'craft'],
    recommendedMinutes: 22,
    depth: {
      steelman:
        'The strongest versions distinguish the speakers by rhythm and vocabulary rather than by content, so attribution is never in doubt. Setting arrives through what people mention in passing — the noise, the wait, the thing on the table.',
      goFurther: [
        'Ernest Hemingway, “Hills Like White Elephants” (1927)',
        'Harold Pinter, *The Dumb Waiter* (1957)',
        'Ivy Compton-Burnett, *A Family and a Fortune* (1939)',
      ],
      trap: 'Having characters narrate for you — “as you know, we have been sitting in this station for an hour”. Exposition wearing a mouth is still exposition.',
    },
  },
  {
    id: 'cre-room-after',
    lane: 'creative',
    tier: 'sharpener',
    title: 'The Room After',
    seed: 'Aftermath is often more powerful than event. A room shortly after something has happened contains the whole of it — in what has been moved, what has been left, and what somebody has already begun tidying.',
    task: 'Describe a room immediately after an event you never name. The reader should be able to reconstruct roughly what happened, and should not be told.',
    themes: ['implication', 'description'],
    recommendedMinutes: 20,
    depth: {
      steelman:
        'The strongest versions include one thing that has already been put right. Evidence of somebody beginning to tidy carries more information than the disorder does, because it implies a decision and therefore a person.',
      goFurther: [
        'Anton Chekhov, “The Lady with the Dog” (1899)',
        'Denis Johnson, *Jesus’ Son* (1992)',
        'Georges Perec, *Species of Spaces* (1974)',
      ],
      trap: 'Overloading the room with clues until it reads as a crime scene. Two or three precise details do more than a dozen, and a dozen turns the reader into a detective rather than a witness.',
    },
  },
  {
    id: 'cre-beautiful-and-disliked',
    lane: 'creative',
    tier: 'sharpener',
    title: 'Something Beautiful You Dislike',
    seed: 'Describing what you love is easy and tends toward the sentimental. Describing something you find genuinely beautiful and also cannot stand forces precision, because you have to render the beauty honestly while your own resistance shows through the prose.',
    task: 'Describe something you find beautiful and dislike. The beauty must be convincing to a reader who does not share your resistance.',
    themes: ['description', 'voice'],
    recommendedMinutes: 20,
    depth: {
      steelman:
        'The strongest versions never state the dislike. It arrives through word choice, through what the writer lingers on and what they hurry past — an attitude carried entirely by the texture of the description.',
      goFurther: [
        'Vladimir Nabokov, *Speak, Memory* (1951)',
        'John Ruskin, *Modern Painters* (1843–60)',
        'Rebecca Solnit, *A Field Guide to Getting Lost* (2005)',
      ],
      trap: 'Announcing the ambivalence in the first line. Once stated, the tension is resolved and the description has nothing left to do.',
    },
  },
  {
    id: 'cre-last-ten-minutes',
    lane: 'creative',
    tier: 'sharpener',
    title: 'Real Time',
    seed: 'Most prose compresses. A scene written in real time — where reading it takes about as long as living it — creates a particular pressure, because the reader cannot skip ahead and neither can the character.',
    task: 'Write a scene covering no more than ten minutes, at roughly the pace it would take to happen. No summary, no flashback, no jumping ahead.',
    themes: ['pacing', 'scene'],
    recommendedMinutes: 25,
    depth: {
      steelman:
        'The strongest versions choose a situation where waiting is itself the content — a queue, a held breath, a conversation that has not started yet. Real time is unbearable when nothing is at stake and gripping when something is about to be.',
      goFurther: [
        'Nicholson Baker, *The Mezzanine* (1988)',
        'Anna Burns, *Milkman* (2018)',
        'Nicola Barker, *Darkmans* (2007)',
      ],
      trap: 'Filling the time with incident to keep it moving. The exercise is about duration; adding events converts it back into ordinary compressed narrative.',
    },
  },
  {
    id: 'cre-object-speaks',
    lane: 'creative',
    tier: 'sharpener',
    title: 'The Thing That Cannot Speak',
    seed: 'Giving voice to an object is an old device and usually a twee one. It only works when the object’s limits are honoured — when what it can perceive, and cannot, becomes the shape of the piece.',
    task: 'Write from the point of view of something that has no mind. Obey its physical limits strictly: what it can register, where it is, what it cannot know.',
    themes: ['point of view', 'constraint'],
    recommendedMinutes: 22,
    depth: {
      steelman:
        'The strongest versions get their power from the gap between what the object registers and what the reader infers. The object reports pressure, temperature and darkness; the reader assembles a human situation the object has no access to.',
      goFurther: [
        'Italo Calvino, *Cosmicomics* (1965)',
        'Francis Ponge, *Le parti pris des choses* (1942)',
        'Ted Hughes, “Wind” (1957)',
      ],
      trap: 'Giving the object human feelings and a wry personality. The moment it starts commenting on its owners, it is a person in a costume and the constraint has been abandoned.',
    },
  },
  {
    id: 'cre-second-time',
    lane: 'creative',
    tier: 'standard',
    title: 'The Second Time It Happened',
    seed: 'First occurrences get written about because they are dramatic. Second occurrences are more interesting, because now the character knows what is coming and has to decide what to do with that knowledge — and the reader watches them decide.',
    task: 'Write a scene of something happening for the second time. The first time must be present in the reader’s mind without being narrated in full.',
    themes: ['structure', 'repetition'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions convey the first occurrence entirely through the character’s altered behaviour — where they stand, what they check, what they do not bother saying. The reader reconstructs the original from the changes.',
      goFurther: [
        'Alice Munro, “Runaway” (2004)',
        'Kazuo Ishiguro, *A Pale View of Hills* (1982)',
        'Marilynne Robinson, *Housekeeping* (1980)',
      ],
      trap: 'Explaining the first time in a flashback. Once you narrate it, the second occurrence loses its charge, because the reader is no longer assembling anything.',
    },
  },
  {
    id: 'cre-two-places',
    lane: 'creative',
    tier: 'standard',
    title: 'Two Places at Once',
    seed: 'Cutting between two scenes makes the reader build a relationship between them that neither states. Handled well, the join carries meaning that would sound crude if written directly.',
    task: 'Intercut two scenes in different places. They must never be explicitly connected, and the cuts must fall where the juxtaposition does the most work.',
    themes: ['structure', 'montage'],
    recommendedMinutes: 50,
    depth: {
      steelman:
        'The strongest versions cut on a rhyme — a gesture, an object, a phrase repeated in a different register — so the transition feels inevitable while the meaning stays unstated. The reader does the connecting and therefore believes it.',
      goFurther: [
        'Michael Ondaatje, *The English Patient* (1992)',
        'Gustave Flaubert, *Madame Bovary* (1856) — the agricultural show',
        'Sergei Eisenstein, *Film Form* (1949) — on montage',
      ],
      trap: 'Making the parallel exact. If both scenes are about the same thing in the same way, the structure is decorative; the friction between them is what generates the meaning.',
    },
  },
  {
    id: 'cre-letter-never-sent',
    lane: 'creative',
    tier: 'standard',
    title: 'The Letter That Was Never Sent',
    seed: 'A letter written to be read is a performance. A letter written and withheld is something else — the writer is arguing with an imagined listener, and the reader sees both the argument and the fact that it was never risked.',
    task: 'Write a letter that was never sent. It must be clear from the letter itself why it was not sent, without the writer saying so.',
    themes: ['voice', 'subtext'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions let the letter change direction as it goes — a passage of composure that gives way, or a hard opening that softens. The unsent letter is a record of thinking, and thinking is not consistent.',
      goFurther: [
        'Franz Kafka, *Letter to His Father* (1919)',
        'Anne Carson, *Nox* (2010)',
        'Ted Hughes, *Birthday Letters* (1998)',
      ],
      trap: 'Making it a confession that resolves everything. If the letter says all of it plainly, there is no reason it would have stayed in the drawer.',
    },
  },
  {
    id: 'cre-weather-doing-work',
    lane: 'creative',
    tier: 'standard',
    title: 'Weather That Earns Its Place',
    seed: 'Weather matching mood is the oldest cliché in prose — rain at funerals, sun at weddings. But weather is also genuinely part of experience, and refusing to use it is its own kind of poverty. The craft is making it do something other than agree with the character.',
    task: 'Write a scene where weather matters materially and does not reflect the emotional content. It should complicate the scene rather than underline it.',
    themes: ['setting', 'craft'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions make weather a physical inconvenience with consequences — it changes what people can do, hear, or wear, and therefore what happens. Indifference is the point: the sky is not participating, which is often more affecting than if it were.',
      goFurther: [
        'Cormac McCarthy, *Blood Meridian* (1985)',
        'Thomas Hardy, *The Return of the Native* (1878) — the opening chapter',
        'John Ruskin on the pathetic fallacy, *Modern Painters* III (1856)',
      ],
      trap: 'Inverting the cliché — sunshine at a funeral — and thinking that solves it. Deliberate contrast is still the weather commenting on the mood; you have changed its opinion, not its role.',
    },
  },
  {
    id: 'cre-defined-by-refusal',
    lane: 'creative',
    tier: 'standard',
    title: 'Defined by Refusal',
    seed: 'Characters are usually built from what they want. A character built from what they will not do is stranger and often stronger, because refusal is visible in small moments and does not need a plot to demonstrate it.',
    task: 'Write a character whose defining trait is something they consistently decline to do. Show the refusal at least three times, in different registers, and never explain it.',
    themes: ['character', 'restraint'],
    recommendedMinutes: 50,
    depth: {
      steelman:
        'The strongest versions vary the cost of the refusal. Declining once is a preference; declining when it becomes expensive is character; declining when the reader wants them to relent is the moment the character becomes real.',
      goFurther: [
        'Herman Melville, “Bartleby, the Scrivener” (1853)',
        'Kazuo Ishiguro, *The Remains of the Day* (1989)',
        'Muriel Spark, *The Prime of Miss Jean Brodie* (1961)',
      ],
      trap: 'Supplying the backstory that explains the refusal. Explanation converts a presence into a case history, and the character shrinks to the size of their reason.',
    },
  },
  {
    id: 'cre-same-day-three-times',
    lane: 'creative',
    tier: 'full',
    title: 'The Same Day, Three Times',
    seed: 'Telling one event from three vantages is not a trick for revealing a twist. Done properly, all three accounts are honest and they still do not reconcile — because people genuinely see different things, and memory is not a recording.',
    task: 'Narrate one afternoon three times, from three people. No version may be a lie. The reader should finish unable to say definitively what happened.',
    themes: ['point of view', 'structure'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'The strongest versions differ in what the narrators notice rather than in the facts they report. When two accounts contradict outright, the reader looks for the liar; when they merely emphasise differently, the reader has to sit with irreducible ambiguity, which is the harder and better effect.',
      goFurther: [
        'Ryūnosuke Akutagawa, “In a Grove” (1922)',
        'William Faulkner, *The Sound and the Fury* (1929)',
        'Julian Barnes, *The Sense of an Ending* (2011)',
      ],
      trap: 'Saving a revelation for the third account. That turns the structure into a delivery mechanism for a twist, and the first two versions become setup rather than testimony.',
    },
  },
  {
    id: 'cre-document-with-gaps',
    lane: 'creative',
    tier: 'full',
    title: 'The Document With Gaps',
    seed: 'An archive is not a story. It is a set of records with holes in it, and the holes are rarely accidental — someone did not write it down, or wrote it down and destroyed it. Fiction built from documents makes the reader an historian.',
    task: 'Tell a story entirely through documents — letters, inventories, minutes, receipts, marginalia. The most important events must fall in the gaps between them.',
    themes: ['form', 'implication'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'The strongest versions make the gaps deliberate within the fiction: a ledger that stops, a correspondence with one side missing, minutes where a name has been struck out. The absence then carries intention, and intention carries plot.',
      goFurther: [
        'Bram Stoker, *Dracula* (1897)',
        'Vladimir Nabokov, *Pale Fire* (1962)',
        'Saidiya Hartman, *Wayward Lives, Beautiful Experiments* (2019)',
      ],
      trap: 'Using documents that conveniently narrate. A letter that recounts events in scene order is a chapter with a date on it; real records are partial, dull in places, and concerned with the wrong things.',
    },
  },
  {
    id: 'cre-told-backwards',
    lane: 'creative',
    tier: 'full',
    title: 'Backwards',
    seed: 'Reverse chronology removes suspense about what happens and replaces it with suspense about why. The reader knows the outcome from the first page and spends the piece watching the causes assemble — which makes every ordinary moment ominous.',
    task: 'Tell a story in reverse order, ending at the earliest moment. Each section must recontextualise the one before it without any section explaining the trick.',
    themes: ['structure', 'time'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'The strongest versions end on something small and unremarkable, because by then the reader knows what it leads to and the ordinariness is unbearable. A dramatic final scene wastes the structure, which exists precisely to charge the mundane.',
      goFurther: [
        'Harold Pinter, *Betrayal* (1978)',
        'Martin Amis, *Time’s Arrow* (1991)',
        'Muriel Spark, *The Driver’s Seat* (1970)',
      ],
      trap: 'Writing forwards and reversing the sections. Each unit has to be composed knowing what the reader already knows, or the piece reads as a shuffled deck rather than a designed one.',
    },
  },
  {
    id: 'cre-voice-not-your-own',
    lane: 'creative',
    tier: 'full',
    title: 'A Voice Not Your Own',
    seed: 'Sustained persona is the hardest thing in fiction, because a voice unlike yours will drift back toward yours the moment the writing gets difficult. The failure is almost never at the start; it is three pages in, when the syntax quietly relaxes.',
    task: 'Write in the sustained voice of someone whose vocabulary, syntax and assumptions differ sharply from your own. Hold it to the last line.',
    themes: ['voice', 'persona'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'The strongest versions build the voice from constraints rather than from accent — a limited vocabulary, a habitual sentence shape, subjects the speaker will not approach. Phonetic spelling is the weakest tool available and the most commonly reached for.',
      goFurther: [
        'Mark Twain, *Adventures of Huckleberry Finn* (1884)',
        'Roddy Doyle, *Paddy Clarke Ha Ha Ha* (1993)',
        'Marlon James, *A Brief History of Seven Killings* (2014)',
      ],
      trap: 'Letting the voice slip during description. Writers stay in character through dialogue and drift out of it the moment they describe a room, because describing well feels like it requires their own register.',
    },
  },
  {
    id: 'cre-corner-of-the-frame',
    lane: 'creative',
    tier: 'full',
    title: 'The Corner of the Frame',
    seed: 'Every scene has a foreground the characters attend to and a background they do not. If the real story is happening in the background, the reader watches two things at once — the one being narrated and the one being missed.',
    task: 'Write a piece in which the narrator attends closely to the wrong thing. The reader must be able to follow the story the narrator is not telling.',
    themes: ['point of view', 'irony'],
    recommendedMinutes: 85,
    depth: {
      steelman:
        'The strongest versions give the narrator a good reason for their attention. A narrator absorbed in something genuinely absorbing is credible; one who ignores an obvious catastrophe to describe wallpaper is a device, and the reader feels handled.',
      goFurther: [
        'Kazuo Ishiguro, *The Remains of the Day* (1989)',
        'Henry James, *What Maisie Knew* (1897)',
        'W. H. Auden, “Musée des Beaux Arts” (1938)',
      ],
      trap: 'Tipping the reader off with a knowing aside. The whole effect depends on the narrator never suspecting they are looking the wrong way.',
    },
  },
  {
    id: 'cre-inheritance',
    lane: 'creative',
    tier: 'full',
    title: 'Inheritance',
    seed: 'An object outlives the people who own it and takes on their meanings in turn. Following one thing through three hands is a way of writing history at domestic scale — and of showing how much of what we inherit is misunderstanding.',
    task: 'Follow a single object through three owners across at least sixty years. Each owner must be wrong about something concerning it, and the reader must see what.',
    themes: ['structure', 'time', 'objects'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'The strongest versions let the object’s meaning degrade rather than deepen. Inheritance stories usually accumulate significance; the truer and stranger version is that meaning is lost in transmission, and the third owner holds something they cannot read.',
      goFurther: [
        'Edmund de Waal, *The Hare with Amber Eyes* (2010)',
        'Annie Proulx, *Accordion Crimes* (1996)',
        'W. G. Sebald, *The Rings of Saturn* (1995)',
      ],
      trap: 'Making the object a symbol that each generation interprets correctly. If everyone understands it, it is a baton rather than an inheritance, and nothing has actually been lost.',
    },
  },
]
