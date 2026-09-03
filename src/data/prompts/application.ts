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
  {
    id: 'app-one-sentence-only-you',
    lane: 'application',
    tier: 'sharpener',
    title: 'A Sentence Only You Could Write',
    seed: 'Admissions readers describe the same experience over and over: essays that are competent, warm, and interchangeable. The test they apply, consciously or not, is whether a sentence could have appeared in someone else’s file. Most could.',
    task: 'Write one paragraph in which every sentence would be false or meaningless in anyone else’s essay. No general claims about yourself — only things that are true because of specific facts about your life.',
    themes: ['personal statement', 'specificity'],
    recommendedMinutes: 20,
    depth: {
      steelman:
        'The strongest versions get their uniqueness from proper nouns and exact quantities rather than from unusual experiences. An ordinary life described precisely is far less replaceable than a remarkable one described in general terms.',
      goFurther: [
        'Vivian Gornick, *The Situation and the Story* (2001)',
        'George Orwell, “Why I Write” (1946)',
        'Annie Dillard, *An American Childhood* (1987) — the opening pages',
      ],
      trap: 'Reaching for an unusual experience instead of unusual detail. The rare event described vaguely still reads as generic; the ordinary afternoon described exactly does not.',
    },
  },
  {
    id: 'app-compliment-you-disbelieved',
    lane: 'application',
    tier: 'sharpener',
    title: 'The Compliment You Didn’t Believe',
    seed: 'Being praised for something you know you did badly is a small, universal, almost never-written-about experience. It puts a gap between how you are seen and what you know, and that gap is where self-knowledge lives.',
    task: 'Describe a time you were praised for something you knew you had not earned. Do not resolve it into modesty or into impostor syndrome — stay in the discomfort and say what you actually concluded.',
    themes: ['personal statement', 'reflection'],
    recommendedMinutes: 20,
    depth: {
      steelman:
        'The strongest versions resist both available endings. They do not conclude that the praiser was wrong, nor that the writer was too hard on themselves. They sit with the possibility that both readings are partly true and that the writer still cannot tell which.',
      goFurther: [
        'Joan Didion, “On Self-Respect” (1961)',
        'Michel de Montaigne, “Of Presumption” (*Essays*, Book II)',
        'Mary Karr, *The Art of Memoir* (2015), ch. 1',
      ],
      trap: 'Turning it into a humblebrag. If the reader finishes the paragraph more impressed by you than when they started, the essay has done the opposite of what it set out to do.',
    },
  },
  {
    id: 'app-place-you-return-to',
    lane: 'application',
    tier: 'sharpener',
    title: 'A Place You Keep Returning To',
    seed: 'There is usually one physical place a person goes back to without deciding to — a stairwell, a stretch of road, a particular table. It is rarely significant on its own. What makes it worth writing is that you cannot fully explain the pull.',
    task: 'Describe the place in physical detail, and then say what you go there to think about. Do not claim the place taught you anything.',
    themes: ['personal statement', 'place'],
    recommendedMinutes: 20,
    depth: {
      steelman:
        'The strongest versions treat the place as evidence rather than symbol. The reader learns about the writer from what they notice — which corner, which sound, what time of day — without a single sentence of self-description.',
      goFurther: [
        'Joan Didion, “Goodbye to All That” (1967)',
        'Robert Macfarlane, *The Old Ways* (2012)',
        'Seamus Heaney, “Personal Helicon”',
      ],
      trap: 'Making the place a metaphor for growth. The moment it becomes a symbol it stops being a place, and the specific detail that made it interesting turns into decoration.',
    },
  },
  {
    id: 'app-skill-nobody-sees',
    lane: 'application',
    tier: 'sharpener',
    title: 'The Skill Nobody Sees',
    seed: 'Everyone has some competence that never appears on a form: reading a room, fixing a specific machine, cooking one dish exactly right, knowing when a friend is lying. These are real skills, acquired by repetition, and they say more about a mind than a certificate does.',
    task: 'Explain one such skill of yours as though teaching it. The reader should finish able to see how it is done, and should learn something about you only as a by-product.',
    themes: ['personal statement', 'craft'],
    recommendedMinutes: 20,
    depth: {
      steelman:
        'The strongest versions are genuinely instructional. Explaining something well is itself a demonstration of the quality of mind an admissions reader is looking for, which is why the by-product is more convincing than any direct claim.',
      goFurther: [
        'Matthew Crawford, *Shop Class as Soulcraft* (2009)',
        'Michael Pollan, *Cooked* (2013)',
        'Primo Levi, *The Wrench* (1978)',
      ],
      trap: 'Choosing something impressive rather than something you can actually explain in detail. The essay lives on the precision of the explanation, not the prestige of the skill.',
    },
  },
  {
    id: 'app-unassigned-work',
    lane: 'application',
    tier: 'sharpener',
    title: 'What You Do When No One Assigns It',
    seed: 'Grades measure response to instruction. What nobody can assign is what you do with an unstructured Saturday. Admissions readers are trying to work out which one they are looking at, and most essays only give them the first.',
    task: 'Describe something you have pursued with no external reason to. Include the boring parts — the maintenance, the repetition, the stretch where it stopped being fun.',
    themes: ['personal statement', 'intellectual curiosity'],
    recommendedMinutes: 22,
    depth: {
      steelman:
        'The strongest versions include the periods of tedium, because tedium is the evidence. Anyone can enjoy the interesting part; continuing through the dull middle is what distinguishes an interest from a hobby you mention.',
      goFurther: [
        'Richard Feynman, *The Pleasure of Finding Things Out* (1999)',
        'Annie Dillard, *The Writing Life* (1989)',
        'Haruki Murakami, *What I Talk About When I Talk About Running* (2007)',
      ],
      trap: 'Describing enthusiasm rather than activity. “I have always loved X” is a claim; three hours on a Sunday spent on a specific stubborn problem is proof.',
    },
  },
  {
    id: 'app-argument-lost-at-home',
    lane: 'application',
    tier: 'sharpener',
    title: 'The Argument You Lost at Home',
    seed: 'Disagreements with family are the ones you cannot walk away from, cannot win by being cleverer, and have to keep living inside afterwards. They test something different from a debate: not whether you are right, but what you do when being right is not enough.',
    task: 'Write about a disagreement at home that you did not win. Give the other person their strongest case — in their words, not your summary of them.',
    themes: ['personal statement', 'family'],
    recommendedMinutes: 25,
    depth: {
      steelman:
        'The strongest versions let the other person be right about something. An essay in which the writer is clearly correct and merely unheard is a complaint; one in which the writer discovers a real limit in their own position is an argument for their mind.',
      goFurther: [
        'James Baldwin, “Notes of a Native Son” (1955)',
        'Jhumpa Lahiri, “My Two Lives” (2006)',
        'Alison Bechdel, *Fun Home* (2006)',
      ],
      trap: 'Writing the parent or sibling as an obstacle. If they have no interior life in your essay, the reader concludes you did not give them one in the argument either.',
    },
  },
  {
    id: 'app-person-who-changed-your-thinking',
    lane: 'application',
    tier: 'standard',
    title: 'The Person Who Changed How You Think',
    seed: 'The essay about an influential person is among the most written and least successful, because it usually becomes a portrait of someone else. The version that works keeps the other person specific while staying about the machinery of your own thinking.',
    task: 'Write about someone who changed a method of yours — how you decide, read, argue or notice. Show the before and the after, and be exact about the moment the change took.',
    themes: ['personal statement', 'influence'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions choose someone slightly unexpected and make the influence technical rather than inspirational. A specific habit transmitted — how to check a source, how to sit with not knowing — is far more convincing than admiration.',
      goFurther: [
        'James Baldwin, “Notes of a Native Son” (1955)',
        'Oliver Sacks, *Uncle Tungsten* (2001)',
        'Vivian Gornick, *Fierce Attachments* (1987)',
      ],
      trap: 'Spending three quarters of the essay on them. A reader who finishes knowing your grandmother better than you has read a well-written essay about the wrong person.',
    },
  },
  {
    id: 'app-failure-youd-repeat',
    lane: 'application',
    tier: 'standard',
    title: 'The Failure You Would Repeat',
    seed: 'Failure essays almost always end in a lesson learned, which quietly converts the failure into a success. The harder and rarer essay is about a failure you would choose again — where the attempt was right and the outcome was still bad.',
    task: 'Write about something that did not work and that you would do the same way again. Justify the decision on the information you had, and be honest about the cost of it.',
    themes: ['personal statement', 'judgement'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions separate the quality of a decision from the quality of its outcome — a distinction most applicants never make, and one that signals a genuinely developed mind. Good decisions can have bad outcomes; saying so without self-justification is the difficult part.',
      goFurther: [
        'Annie Duke, *Thinking in Bets* (2018)',
        'Bernard Williams, “Moral Luck” (in *Moral Luck*, 1981)',
        'Atul Gawande, *Complications* (2002)',
      ],
      trap: 'Slipping back into the redemption arc. The moment you write “but I learned”, the essay becomes the one every other applicant wrote.',
    },
  },
  {
    id: 'app-unfashionable-opinion',
    lane: 'application',
    tier: 'standard',
    title: 'Your Unfashionable Opinion',
    seed: 'Most application essays are written to be agreed with. That is a reasonable strategy and it produces a file of pleasant, forgettable documents. The alternative is to argue something your reader may well not share — which requires you to actually persuade rather than merely appeal.',
    task: 'Argue for a position you hold that people around you mostly do not. Give the opposing view its full strength, and do not soften your conclusion at the end to seem reasonable.',
    themes: ['personal statement', 'argument'],
    recommendedMinutes: 50,
    depth: {
      steelman:
        'The strongest versions choose something genuinely contestable within their own world rather than something safely contrarian at a distance. The risk is the point: an essay that costs nothing to write demonstrates nothing about the writer’s willingness to think alone.',
      goFurther: [
        'George Orwell, “Politics and the English Language” (1946)',
        'Zadie Smith, *Changing My Mind* (2009)',
        'John Stuart Mill, *On Liberty* (1859), ch. 2',
      ],
      trap: 'Picking a position that is contrarian in the abstract but costs you nothing among the people who actually know you. Readers can tell the difference between courage and posture.',
    },
  },
  {
    id: 'app-the-thing-you-quit',
    lane: 'application',
    tier: 'standard',
    title: 'The Thing You Quit',
    seed: 'Applications reward persistence, so almost nobody writes about stopping. But quitting well is a real skill — knowing when a commitment has become a sunk cost, and being willing to disappoint people who expected you to continue.',
    task: 'Write about something you gave up. Make the case that it was right, and do not hide who was disappointed.',
    themes: ['personal statement', 'judgement'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions treat the decision as genuinely costly. If quitting turns out to have been obviously correct with no residue, the essay has chosen too easy a case; the interesting territory is where something real was lost.',
      goFurther: [
        'Annie Duke, *Quit* (2022)',
        'Michel de Montaigne, “Of Repentance” (*Essays*, Book III)',
        'Kathryn Schulz, *Being Wrong* (2010)',
      ],
      trap: 'Explaining that you quit in order to focus on something better. That converts the essay back into a story about achievement, which is the version everyone else has written.',
    },
  },
  {
    id: 'app-two-in-the-morning',
    lane: 'application',
    tier: 'standard',
    title: 'What You Were Doing at Two in the Morning',
    seed: 'What a person does with time nobody is watching is more diagnostic than anything they do on record. It need not be noble. It is simply the clearest available evidence of what actually holds someone’s attention.',
    task: 'Reconstruct one late night in detail — what you were doing, why it had you, and what state you were in. Resist framing it as dedication.',
    themes: ['personal statement', 'attention'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The strongest versions are unembarrassed and specific, and let the reader draw the flattering conclusion themselves. Any sentence that explains why this shows commitment removes the reader’s chance to notice it, which is the only way they will believe it.',
      goFurther: [
        'Nicholson Baker, *The Mezzanine* (1988)',
        'Annie Dillard, *The Writing Life* (1989)',
        'Oliver Sacks, *Gratitude* (2015)',
      ],
      trap: 'Choosing a night of virtuous studying. A reader has seen a thousand of those. The unexpected object of attention is the one that reveals a person.',
    },
  },
  {
    id: 'app-why-this-subject',
    lane: 'application',
    tier: 'full',
    title: 'Why This Subject, Really',
    seed: 'Almost every applicant writes that they have been fascinated by their subject since childhood. Almost none can say what specific problem inside it they want to work on, or what they have already tried to understand and failed to. The gap between those two essays is the whole game.',
    task: 'Make the case for your subject through one particular problem in it that you cannot let go of. Show the reading you have actually done and where your understanding currently stops.',
    themes: ['personal statement', 'intellectual curiosity'],
    recommendedMinutes: 85,
    depth: {
      steelman:
        'The strongest versions are willing to be specific enough to be wrong. Naming the exact question, the exact source, and the exact point of confusion is riskier than a general declaration of interest, and it is the only version that could not have been written by someone who had not done the work.',
      goFurther: [
        'Richard Feynman, “Cargo Cult Science” (1974)',
        'Peter Medawar, *Advice to a Young Scientist* (1979)',
        'Karl Popper, *Conjectures and Refutations* (1963), ch. 1',
      ],
      trap: 'Listing books read. A reading list demonstrates compliance. One book argued with, in detail, demonstrates a mind.',
    },
  },
  {
    id: 'app-community-you-belong-to',
    lane: 'application',
    tier: 'full',
    title: 'The Community You Actually Belong To',
    seed: 'The community essay usually produces a description of a group the writer is proud to be listed among. The more revealing version asks where you are genuinely a member — where people would notice your absence — which is often somewhere much smaller and less impressive.',
    task: 'Write about a group you actually belong to, and be precise about what membership costs and requires. If you are partly outside it, say so.',
    themes: ['personal statement', 'belonging'],
    recommendedMinutes: 85,
    depth: {
      steelman:
        'The strongest versions admit ambivalence. Real membership involves obligations you did not choose and people you did not select, and an essay that reports only warmth has described an affiliation rather than a community.',
      goFurther: [
        'Ta-Nehisi Coates, *Between the World and Me* (2015)',
        'Zadie Smith, “Joy” (2013)',
        'Robert Putnam, *Bowling Alone* (2000)',
      ],
      trap: 'Writing about a group you were assigned to rather than one you sustain. School, family and nationality are starting conditions; what you have kept up despite inconvenience is the evidence.',
    },
  },
  {
    id: 'app-problem-you-cannot-drop',
    lane: 'application',
    tier: 'full',
    title: 'The Problem You Cannot Put Down',
    seed: 'There is a difference between a topic you find interesting and a problem you keep returning to against your own intentions. The second kind interrupts you. It is also the only kind that survives three years of a degree.',
    task: 'Identify a problem — practical, intellectual, social — that has occupied you across more than one period of your life. Trace how your understanding of it has changed, including the version you now think was naive.',
    themes: ['personal statement', 'intellectual curiosity'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'The strongest versions show the question itself being reformulated. A problem you understand better is ordinary progress; a problem you have learned to ask differently is evidence of real intellectual movement, and it is much harder to fake.',
      goFurther: [
        'Karl Popper, *Unended Quest* (1976)',
        'E. O. Wilson, *Naturalist* (1994)',
        'Susan Sontag, *Reborn: Journals and Notebooks* (2008)',
      ],
      trap: 'Presenting a settled conclusion. If you have solved it, it is an achievement rather than a problem, and the essay ends where it should have started.',
    },
  },
  {
    id: 'app-version-that-didnt-happen',
    lane: 'application',
    tier: 'full',
    title: 'The Version of You That Didn’t Happen',
    seed: 'Every life contains a fork where something nearly went differently — a school not attended, an illness, a move, an opportunity that closed. Writing about the road not taken is a way of saying what you think you are made of, and how much of it was circumstance.',
    task: 'Describe a point where your life could plausibly have gone another way, and say honestly how different you think you would be. Avoid both fatalism and the claim that you would have been the same regardless.',
    themes: ['personal statement', 'contingency'],
    recommendedMinutes: 85,
    depth: {
      steelman:
        'The strongest versions concede more to luck than is comfortable. Claiming that your character would have prevailed under any circumstances is the flattering answer and the least believable one; the essay gains its authority from where it refuses to flatter.',
      goFurther: [
        'Thomas Nagel, “Moral Luck” (in *Mortal Questions*, 1979)',
        'Kazuo Ishiguro, *Never Let Me Go* (2005)',
        'Michael Sandel, *The Tyranny of Merit* (2020), ch. 5',
      ],
      trap: 'Using the fork to demonstrate resilience. The point of the exercise is to think clearly about contingency, and resilience is the move that lets you avoid doing so.',
    },
  },
  {
    id: 'app-what-you-owe',
    lane: 'application',
    tier: 'full',
    title: 'What You Owe Someone',
    seed: 'Gratitude essays tend toward the ceremonial. Obligation is a harder and more interesting subject: not who you are thankful to, but what you actually owe, to whom, and whether you have paid any of it.',
    task: 'Name a specific debt of yours — to a person, an institution, a place. Say what discharging it would require, and be honest about whether you intend to.',
    themes: ['personal statement', 'ethics'],
    recommendedMinutes: 85,
    depth: {
      steelman:
        'The strongest versions accept that some debts cannot be repaid to the person who is owed, and think seriously about what follows from that — whether an unpayable debt transfers, expires, or simply stays open. That is a real ethical question, not a rhetorical one.',
      goFurther: [
        'Seneca, *On Benefits* (c. 60 AD)',
        'Lewis Hyde, *The Gift* (1983)',
        'Marilynne Robinson, *Gilead* (2004)',
      ],
      trap: 'Writing a thank-you note. Gratitude is comfortable; obligation is not, and the essay only earns its keep at the point where it becomes uncomfortable.',
    },
  },
  {
    id: 'app-book-that-ruined-another',
    lane: 'application',
    tier: 'full',
    title: 'The Book That Ruined Another Book',
    seed: 'Reading changes you by making previous reading unavailable. A book that shows you how something works can make a book you loved unreadable, or reveal that you had misunderstood it entirely. That sequence — the loss as well as the gain — is a better record of a mind than a list of favourites.',
    task: 'Describe two things you read, in order, where the second altered the first. Be precise about the mechanism: what exactly did the second make visible?',
    themes: ['personal statement', 'reading'],
    recommendedMinutes: 85,
    depth: {
      steelman:
        'The strongest versions can name the specific technique or assumption that became visible — a structural device, a hidden premise, a piece of context. Vague talk of new perspectives suggests the change was mood rather than understanding.',
      goFurther: [
        'C. S. Lewis, *An Experiment in Criticism* (1961)',
        'Zadie Smith, “Rereading Barthes and Nabokov” (in *Changing My Mind*, 2009)',
        'Italo Calvino, *Why Read the Classics?* (1991)',
      ],
      trap: 'Choosing two prestigious books to signal seriousness. The essay works better when the first book is one you loved uncritically, which usually means it is not a prestigious choice at all.',
    },
  },
]
