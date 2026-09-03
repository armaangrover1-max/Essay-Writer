import type { Prompt } from '../../lib/types'

export const argumentPrompts: Prompt[] = [
  {
    id: 'arg-murderer-at-the-door',
    lane: 'argument',
    tier: 'standard',
    title: 'The Murderer at the Door',
    seed: 'Kant argued that you may never lie — not even to a murderer who arrives at your door and asks where your friend is hiding. Benjamin Constant called this monstrous: surely a life outweighs a rule about speech. Kant published a reply, and did not move an inch.',
    task: 'Defend or dismantle Kant’s position. If moral duties can be overridden, say what governs the override — and why that principle is not simply consequentialism wearing a deontological coat.',
    themes: ['ethics', 'philosophy'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'Kant’s real argument is not stubbornness about rules; it is humility about consequences. You do not know that lying saves your friend. He may have slipped out the back while you were talking — in which case your lie sends the murderer directly to him. You are certain about the wrong you commit and only guessing about the good you achieve.',
      goFurther: [
        'Christine Korsgaard, “The Right to Lie: Kant on Dealing with Evil” (1986)',
        'Benjamin Constant, “Des réactions politiques” (1797) — the original objection',
        'Sissela Bok, *Lying: Moral Choice in Public and Private Life* (1978), ch. 3',
      ],
      trap: 'Nearly every essay on this asserts that consequences obviously matter, and stops there. Kant agrees that consequences matter; he denies that they generate obligations. If you do not engage that distinction, you have argued past him rather than against him.',
    },
  },
  {
    id: 'arg-tyranny-of-merit',
    lane: 'argument',
    tier: 'standard',
    title: 'The Tyranny of Merit',
    seed: 'Michael Sandel argues that meritocracy corrodes the societies that achieve it. The more convincingly a society tells people success is earned, the more forcefully it tells the unsuccessful they deserve their position. Winners acquire hubris; losers acquire humiliation. The fairer the sorting appears, the crueller its verdict feels.',
    task: 'Is the problem that we practise meritocracy badly, or that the ideal corrodes even when practised perfectly? Whichever you argue, your answer must survive the strongest version of the other.',
    themes: ['social science', 'political philosophy'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The case for meritocracy is not that it treats losers kindly — it is that every alternative is worse. Inherited position, party loyalty and lottery all sort people too, and none of them even attempts to match ability to responsibility. Sandel’s diagnosis is far easier to state than his remedy, and he knows it.',
      goFurther: [
        'Michael Sandel, *The Tyranny of Merit* (2020)',
        'Michael Young, *The Rise of the Meritocracy* (1958) — the satire that coined the word',
        'John Rawls, *A Theory of Justice*, §17 on desert',
      ],
      trap: 'Drifting into whether meritocracy actually exists rather than whether it should. Sandel’s argument bites hardest in a perfectly fair meritocracy — that is the entire point, and an essay about hypocrisy misses it.',
    },
  },
  {
    id: 'arg-repugnant-conclusion',
    lane: 'argument',
    tier: 'standard',
    title: 'The Repugnant Conclusion',
    seed: 'Derek Parfit noticed that if we ought to maximise total wellbeing, then a world of ten billion people with lives barely worth living outranks a world of ten million flourishing ones: sheer quantity swamps quality. He called it the Repugnant Conclusion and spent decades failing to escape it. Every repair he attempted broke something else.',
    task: 'Either identify the premise to abandon and pay honestly for what that costs, or argue that the conclusion is repugnant only to intuitions we have no good reason to trust.',
    themes: ['ethics', 'philosophy'],
    recommendedMinutes: 45,
    depth: {
      steelman:
        'The conclusion resists escape because each step is separately plausible. Rejecting it usually requires denying that adding a life worth living makes a world better — which most people find worse than the conclusion they were trying to avoid.',
      goFurther: [
        'Derek Parfit, *Reasons and Persons* (1984), Part IV',
        'Gustaf Arrhenius, “An Impossibility Theorem for Welfarist Axiologies” (2000)',
        'Larry Temkin, *Rethinking the Good* (2012)',
      ],
      trap: 'Declaring the conclusion absurd and moving on. Everyone finds it absurd, Parfit included. The essay only earns its keep at the moment you name the premise you are killing and count the cost.',
    },
  },
  {
    id: 'arg-trolley-and-surgeon',
    lane: 'argument',
    tier: 'sharpener',
    title: 'The Trolley and the Surgeon',
    seed: 'Nearly everyone will divert a runaway trolley to kill one instead of five. Almost nobody will let a surgeon cut up one healthy patient to save five dying ones. The arithmetic is identical. Philippa Foot noticed this asymmetry in 1967 and it has resisted explanation ever since.',
    task: 'Give the principle that separates the two cases — and then test it against a third case of your own devising. If your principle cannot survive your own counter-example, say so.',
    themes: ['ethics', 'philosophy'],
    recommendedMinutes: 25,
    depth: {
      steelman:
        'The most promising answer is that in the trolley case the death is a foreseen side effect, while in the surgery case the death is the means. But this doctrine of double effect struggles with the footbridge variant, where you push a large man to stop the trolley: the death is the means, yet the mechanism is a lever rather than a scalpel.',
      goFurther: [
        'Philippa Foot, “The Problem of Abortion and the Doctrine of the Double Effect” (1967)',
        'Judith Jarvis Thomson, “The Trolley Problem” (1985)',
        'Frances Kamm, *Intricate Ethics* (2007)',
      ],
      trap: 'Answering that the surgery case feels worse. Of course it does — that is the datum, not the explanation. The essay begins where the intuition ends.',
    },
  },
  {
    id: 'arg-ship-of-theseus',
    lane: 'argument',
    tier: 'sharpener',
    title: 'The Ship of Theseus',
    seed: 'The Athenians replaced the planks of Theseus’ ship one by one until none of the original remained. Hobbes sharpened it: suppose someone gathered the discarded planks and rebuilt a second ship from them. Now there are two, and each has a serious claim to be the original.',
    task: 'Say which ship is Theseus’ — or argue that the question is malformed. If it is malformed, explain why we nonetheless cannot stop asking it.',
    themes: ['metaphysics', 'philosophy'],
    recommendedMinutes: 25,
    depth: {
      steelman:
        'The deflationary answer — that “the same ship” means different things in different contexts and there is no further fact — is stronger than it looks. But it owes an account of why identity feels like a discovery rather than a decision, especially when the object in question is a person.',
      goFurther: [
        'Plutarch, *Life of Theseus*, §23',
        'Thomas Hobbes, *De Corpore* (1655), ch. 11 — the second ship',
        'Derek Parfit, *Reasons and Persons* (1984), Part III',
      ],
      trap: 'Treating it as a puzzle about boats. The reason anyone cares is that you are also a thing whose parts have all been replaced.',
    },
  },
  {
    id: 'arg-experience-machine',
    lane: 'argument',
    tier: 'sharpener',
    title: 'The Experience Machine',
    seed: 'Nozick asks you to imagine a machine that would give you any experience you desired, indistinguishable from the real thing, for life. Most people say they would not plug in. If pleasure were all that mattered, refusing would be irrational.',
    task: 'Explain what refusal reveals about what we value — and then ask whether the intuition survives scrutiny, or is merely a bias toward whatever we happen to have.',
    themes: ['ethics', 'philosophy of mind'],
    recommendedMinutes: 25,
    depth: {
      steelman:
        'The strongest reply to Nozick is status-quo bias: people also refuse to unplug from a machine they are told they have been in all along. If the answer flips depending on which side you start from, the intuition may be tracking familiarity rather than value.',
      goFurther: [
        'Robert Nozick, *Anarchy, State, and Utopia* (1974), pp. 42–45',
        'Roger Crisp, *Reasons and the Good* (2006), ch. 4',
        'Felipe De Brigard, “If You Like It, Does It Matter If It’s Real?” (2010)',
      ],
      trap: 'Listing things the machine cannot give you — real friendship, real achievement — without noticing that by stipulation it gives you the experience of all of them. The claim has to be that something beyond experience matters, and that is the hard part.',
    },
  },
  {
    id: 'arg-sorites-heap',
    lane: 'argument',
    tier: 'sharpener',
    title: 'The Heap',
    seed: 'One grain of sand is not a heap. Adding one grain to something that is not a heap cannot make it a heap. Therefore no number of grains makes a heap. Every premise looks obvious and the conclusion is plainly false.',
    task: 'Locate the failure and pay for it. Whichever premise you reject, say what it costs — because each of the standard escapes gives up something people are reluctant to give up.',
    themes: ['logic', 'language'],
    recommendedMinutes: 22,
    depth: {
      steelman:
        'Williamson’s epistemicism holds that there is a sharp cut-off — some exact grain at which a heap begins — and that we simply cannot know where it is. Everyone finds this repellent, and it is nonetheless the only view that keeps classical logic intact.',
      goFurther: [
        'Timothy Williamson, *Vagueness* (1994)',
        'Roy Sorensen, *Vagueness and Contradiction* (2001)',
        'Bertrand Russell, “Vagueness” (1923)',
      ],
      trap: 'Saying the word “heap” is just imprecise and moving on. That is the observation the paradox starts from. The question is what imprecision *is*, and whether logic survives it.',
    },
  },
  {
    id: 'arg-marys-room',
    lane: 'argument',
    tier: 'sharpener',
    title: 'Mary’s Room',
    seed: 'Mary is a brilliant scientist who has spent her life in a black-and-white room and knows every physical fact about colour vision. One day she is let out and sees a red tomato. Frank Jackson asks: does she learn something new? If she does, physical facts are not all the facts.',
    task: 'Say whether Mary learns something, and what follows. If she does learn something, explain what kind of thing it is without smuggling in a substance that physics cannot see.',
    themes: ['philosophy of mind', 'epistemology'],
    recommendedMinutes: 25,
    depth: {
      steelman:
        'The ability reply grants that Mary gains something without granting a new fact: she acquires a capacity — to recognise, imagine and remember red — not an item of propositional knowledge. Jackson himself eventually abandoned the argument, which is worth taking seriously.',
      goFurther: [
        'Frank Jackson, “Epiphenomenal Qualia” (1982)',
        'Frank Jackson, “What Mary Didn’t Know” (1986)',
        'David Lewis, “What Experience Teaches” (1988)',
      ],
      trap: 'Asserting that of course she learns what red looks like. The physicalist agrees she undergoes something new; they deny it is a new fact. Meet that distinction or you have not engaged.',
    },
  },
  {
    id: 'arg-paradox-of-tolerance',
    lane: 'argument',
    tier: 'sharpener',
    title: 'The Paradox of Tolerance',
    seed: 'Popper argued that unlimited tolerance leads to the disappearance of tolerance: if a society extends it to those who would destroy it, the tolerant are destroyed and tolerance with them. He concluded that a tolerant society must claim the right to be intolerant of intolerance.',
    task: 'Draw the line, and defend it against the obvious objection — that whoever holds the pen decides who counts as intolerant.',
    themes: ['political philosophy', 'ethics'],
    recommendedMinutes: 25,
    depth: {
      steelman:
        'Popper is more careful than the meme suggests: he says intolerant philosophies should be countered by argument and kept in check by public opinion, and suppressed only where their adherents refuse argument and answer with fists. The paradox is not a licence, it is a last resort.',
      goFurther: [
        'Karl Popper, *The Open Society and Its Enemies* (1945), note 4 to ch. 7',
        'John Rawls, *A Theory of Justice* (1971), §35',
        'John Stuart Mill, *On Liberty* (1859), ch. 2',
      ],
      trap: 'Quoting the paradox as though it settles something. It states a problem about where the line goes. An essay that does not put the line somewhere specific has restated Popper rather than used him.',
    },
  },
  {
    id: 'arg-original-position',
    lane: 'argument',
    tier: 'standard',
    title: 'Behind the Veil',
    seed: 'Rawls asks what rules you would choose for a society if you did not know who in it you would be — your class, talents, race, or convictions. He argues you would protect the worst-off, since you might be them. Nozick replied that justice is not about patterns of distribution at all, but about whether each holding was acquired justly.',
    task: 'Choose between them. Whichever you take, your account must say something about the person who worked for what they have and the person who was born without.',
    themes: ['political philosophy', 'ethics'],
    recommendedMinutes: 50,
    depth: {
      steelman:
        'Nozick’s Wilt Chamberlain argument is the sharpest thing in the debate: start from any distribution you consider just, let a million people each freely pay a quarter to watch one man play, and the pattern is destroyed. To restore it you must forbid capitalist acts between consenting adults.',
      goFurther: [
        'John Rawls, *A Theory of Justice* (1971), §§3–4, 11–17',
        'Robert Nozick, *Anarchy, State, and Utopia* (1974), ch. 7',
        'G. A. Cohen, *Rescuing Justice and Equality* (2008)',
      ],
      trap: 'Treating the veil of ignorance as a thought experiment about empathy. It is a decision procedure under uncertainty, and Rawls’ argument depends on a specific and contestable claim about how rational agents choose when the stakes are total.',
    },
  },
  {
    id: 'arg-judging-the-past',
    lane: 'argument',
    tier: 'standard',
    title: 'By Whose Standards?',
    seed: 'It is common to say the past should not be judged by present standards. It is also common to say some things were always wrong. Both cannot be held without qualification, and historians have argued about the seam between them for a century.',
    task: 'Say when moral judgement of the past is legitimate and when it is anachronism. Your criterion must produce a determinate answer in at least one hard case you name yourself.',
    themes: ['history', 'ethics'],
    recommendedMinutes: 50,
    depth: {
      steelman:
        'The case against judgement is not relativism but epistemic humility: we judge with concepts our subjects did not possess, and future generations will judge us by concepts we lack. Williams argues that some past outlooks are so distant that our judgements of them are not so much false as idle.',
      goFurther: [
        'Herbert Butterfield, *The Whig Interpretation of History* (1931)',
        'E. H. Carr, *What Is History?* (1961), ch. 1',
        'Bernard Williams, *Shame and Necessity* (1993)',
      ],
      trap: 'Retreating to “it was a different time” as a general solvent. Abolitionists existed alongside slaveholders; the standards were available. Any principle that erases contemporaneous dissent is doing history badly.',
    },
  },
  {
    id: 'arg-banality-of-evil',
    lane: 'argument',
    tier: 'standard',
    title: 'The Banality of Evil',
    seed: 'Watching Eichmann in the dock, Arendt concluded he was not a monster but a joiner — a man who stopped thinking. Milgram appeared to confirm it in a laboratory: ordinary people delivered what they believed were lethal shocks because a man in a coat told them to.',
    task: 'Assess the thesis that atrocity is mostly the work of ordinary people in ordinary institutions. Take seriously that both Arendt’s reporting and Milgram’s methods have been seriously challenged since.',
    themes: ['history', 'social science', 'ethics'],
    recommendedMinutes: 50,
    depth: {
      steelman:
        'Later archival work suggests Eichmann was a far more committed ideologue than the man Arendt watched perform mediocrity for a court, and Perry’s reading of Milgram’s archive shows how much prodding many subjects needed. The banality thesis may be true of systems while being false of the particular man who made it famous.',
      goFurther: [
        'Hannah Arendt, *Eichmann in Jerusalem* (1963)',
        'Stanley Milgram, *Obedience to Authority* (1974)',
        'Gina Perry, *Behind the Shock Machine* (2013)',
        'Bettina Stangneth, *Eichmann Before Jerusalem* (2011)',
      ],
      trap: 'Using “banality of evil” to mean that evil is boring, or that anyone would do it. Arendt’s claim is about thoughtlessness — a specific failure to make the world present to oneself — not about statistical inevitability.',
    },
  },
  {
    id: 'arg-tragedy-of-commons',
    lane: 'argument',
    tier: 'standard',
    title: 'The Commons',
    seed: 'Hardin argued that a shared pasture is doomed: each herder gains the whole benefit of one more animal while bearing only a fraction of the cost of overgrazing, so all rationally graze until the land dies. His remedy was private property or coercion. Ostrom then spent decades documenting communities that had managed commons for centuries without either.',
    task: 'Decide what Hardin got right and what he got wrong, and state the conditions under which a commons survives. Abstract argument alone will not do — use at least one real case.',
    themes: ['social science', 'political philosophy'],
    recommendedMinutes: 50,
    depth: {
      steelman:
        'Hardin’s defenders point out that Ostrom’s successes are small, bounded and long-lived — communities where everyone can monitor everyone else. Scale the group to a planet of strangers who will never meet, and the monitoring that makes her design principles work becomes impossible.',
      goFurther: [
        'Garrett Hardin, “The Tragedy of the Commons” (*Science*, 1968)',
        'Elinor Ostrom, *Governing the Commons* (1990)',
        'Mancur Olson, *The Logic of Collective Action* (1965)',
      ],
      trap: 'Concluding that Ostrom refuted Hardin and stopping. She refuted his inevitability, not his mechanism. The interesting essay is about which conditions switch the mechanism on.',
    },
  },
  {
    id: 'arg-moral-luck',
    lane: 'argument',
    tier: 'standard',
    title: 'Moral Luck',
    seed: 'Two drivers run a red light while equally distracted. One arrives at an empty crossing. The other kills a child. We blame the second far more — yet the difference between them is entirely luck. Kant held that the good will shines like a jewel regardless of outcome. Almost nobody actually judges that way.',
    task: 'Either defend our practice of judging by outcomes, or explain what we should do instead — knowing that the alternative requires holding both drivers equally guilty.',
    themes: ['ethics', 'philosophy'],
    recommendedMinutes: 50,
    depth: {
      steelman:
        'Williams’ point is more radical than an observation about inconsistency: he argues that a life lived by pure moral luck-proofing would not be recognisably a life. Agents are constituted by projects whose success is not up to them, and regret for what one has caused is not a mistake to be corrected.',
      goFurther: [
        'Bernard Williams, “Moral Luck” (1976, in *Moral Luck*, 1981)',
        'Thomas Nagel, “Moral Luck” (in *Mortal Questions*, 1979)',
        'Immanuel Kant, *Groundwork of the Metaphysics of Morals* (1785), First Section',
      ],
      trap: 'Solving it by declaring that we blame the second driver for the outcome but not the character. That is the standard move, and it does not explain why the second driver’s own guilt is not irrational — which is where the problem actually bites.',
    },
  },
  {
    id: 'arg-great-divergence',
    lane: 'argument',
    tier: 'full',
    title: 'Why Europe First?',
    seed: 'In 1750 the richest parts of China and the richest parts of Europe were roughly comparable in living standards, life expectancy and commercial sophistication. A century later they were not remotely comparable. Explanations have been offered from coal, colonies, culture, institutions, patents, geography and pure accident, and no consensus exists.',
    task: 'Argue for the explanation you find strongest, and account for the strongest rival. A monocausal answer will not survive; say how much weight each factor carries and why.',
    themes: ['history', 'social science', 'economics'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'Pomeranz’s contingency case is the hardest to dislodge: Britain had coal near water and an entire hemisphere of ecological relief in the Americas, both of which are luck rather than merit. Any culture-first or institutions-first account has to explain why those advantages were not sufficient on their own.',
      goFurther: [
        'Kenneth Pomeranz, *The Great Divergence* (2000)',
        'Joel Mokyr, *A Culture of Growth* (2016)',
        'Robert C. Allen, *The British Industrial Revolution in Global Perspective* (2009)',
        'Daron Acemoglu & James Robinson, *Why Nations Fail* (2012)',
      ],
      trap: 'Writing a survey. Naming six factors and calling them all important is the safe answer and it earns nothing. The essay must rank them and defend the ranking.',
    },
  },
  {
    id: 'arg-epistocracy',
    lane: 'argument',
    tier: 'full',
    title: 'Does Democracy Deserve Its Reputation?',
    seed: 'Brennan argues that most voters are ignorant, irrational and tribal, that their votes impose real costs on others, and that rule by the informed would be better. Landemore replies that cognitive diversity in large groups outperforms expert panels. Achen and Bartels find voters punishing incumbents for droughts and shark attacks.',
    task: 'Defend democracy or defend a competent alternative. Whichever you choose must answer both the empirical evidence on voter behaviour and the question of who decides who is competent.',
    themes: ['political philosophy', 'social science'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'The strongest case for democracy is not that voters are wise but that no one can be trusted with the power to certify wisdom. Epistocracy requires a test, and whoever writes the test rules — which converts an epistemic question into a question of power, where democracy’s advantages are clearest.',
      goFurther: [
        'Jason Brennan, *Against Democracy* (2016)',
        'Hélène Landemore, *Democratic Reason* (2013)',
        'Christopher Achen & Larry Bartels, *Democracy for Realists* (2016)',
        'Joseph Schumpeter, *Capitalism, Socialism and Democracy* (1942), Part IV',
      ],
      trap: 'Defending democracy on the grounds that it is fair, without engaging the claim that voting imposes costs on people who did not consent to be governed incompetently. Fairness to voters is not the only fairness at stake.',
    },
  },
  {
    id: 'arg-dirty-hands',
    lane: 'argument',
    tier: 'full',
    title: 'Dirty Hands',
    seed: 'Walzer argues that a good politician is precisely the person who knows they must sometimes do wrong to govern well — and who feels the wrong rather than explaining it away. Machiavelli said the prince must learn how not to be good. Weber called it the ethic of responsibility, and said whoever seeks the salvation of the soul should not seek it in politics.',
    task: 'Say whether there are acts a leader is both obliged to perform and guilty for performing. If yes, explain how an act can be both required and wrong; if no, explain what happens to the leader who refuses.',
    themes: ['political philosophy', 'ethics'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'The tidy alternative — that the act is simply permissible in the circumstances, so no guilt is owed — is more coherent than Walzer’s position. His reply is that we do not want to be governed by anyone who believes that: the residue of guilt is the only thing preventing the exception from becoming the rule.',
      goFurther: [
        'Michael Walzer, “Political Action: The Problem of Dirty Hands” (1973)',
        'Niccolò Machiavelli, *The Prince* (1532), chs. 15–18',
        'Max Weber, “Politics as a Vocation” (1919)',
        'Jean-Paul Sartre, *Les Mains sales* (1948)',
      ],
      trap: 'Sliding into a general defence of consequentialism. Walzer is not saying the ends justify the means; he is saying they sometimes require means that remain unjustified. Holding both halves is the whole difficulty.',
    },
  },
  {
    id: 'arg-distant-strangers',
    lane: 'argument',
    tier: 'full',
    title: 'The Drowning Child',
    seed: 'Singer points out that you would ruin an expensive pair of shoes to pull a drowning child from a pond, and argues that distance and numbers make no moral difference: if you can prevent something very bad without sacrificing anything comparably important, you ought to. Followed strictly, the principle consumes most of an ordinary life.',
    task: 'Say how demanding morality is. If you reject Singer’s conclusion you must reject a premise, and the premises are hard to reject; if you accept it, say honestly what it requires of you.',
    themes: ['ethics', 'philosophy'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'Williams and Wolf both argue that a life organised entirely around impartial benefit is not a better life but a hollowed-out one — that partiality toward your own projects and people is not a moral failing to be minimised but part of what makes an agent a person at all. Wolf’s moral saints are not admirable; they are missing something.',
      goFurther: [
        'Peter Singer, “Famine, Affluence, and Morality” (1972)',
        'Susan Wolf, “Moral Saints” (1982)',
        'Bernard Williams, “Persons, Character and Morality” (in *Moral Luck*, 1981)',
        'Peter Singer, *The Life You Can Save* (2009)',
      ],
      trap: 'Escaping through practical objections — aid does not work, charities are corrupt. Those are empirical claims, and Singer’s argument survives if any effective intervention exists. Attack the principle or accept it.',
    },
  },
  {
    id: 'arg-immoral-art',
    lane: 'argument',
    tier: 'full',
    title: 'Can a Work of Art Be Bad Because It Is Wrong?',
    seed: 'Some works are beautifully made and morally repellent. Autonomists say the two judgements are simply separate: a film can be vile and superb. Moralists say a work that invites us to enjoy cruelty has failed on its own terms, because it asks for a response it does not deserve.',
    task: 'Decide whether a moral defect can be an aesthetic defect. Argue it through one specific work you actually know, and let the case do real work rather than serving as decoration.',
    themes: ['aesthetics', 'ethics'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'Gaut’s ethicism is subtler than blanket moralism: he claims a work is aesthetically flawed only insofar as it *prescribes* a response that is unmerited. This lets a novel depict atrocity in full without defect, while a work that invites delight in it fails — because the invitation is part of the work’s design.',
      goFurther: [
        'Berys Gaut, *Art, Emotion and Ethics* (2007)',
        'Noël Carroll, “Moderate Moralism” (1996)',
        'Plato, *Republic*, Book X',
        'Susan Sontag, “Fascinating Fascism” (1975)',
      ],
      trap: 'Arguing about whether the artist was a bad person. That is a different question. The claim at issue is about the work’s own address to its audience.',
    },
  },
  {
    id: 'arg-replication-crisis',
    lane: 'argument',
    tier: 'full',
    title: 'When Most Findings Are False',
    seed: 'In 2015 a large collaboration tried to reproduce a hundred psychology experiments and succeeded with fewer than half. Ioannidis had argued a decade earlier, on statistical grounds alone, that most published research findings in many fields are false. Neither claim has been convincingly refuted.',
    task: 'Say what this does and does not license. If the reply is that science is self-correcting, show the mechanism actually correcting; if the reply is that we should trust less, say how much less and on what basis.',
    themes: ['epistemology', 'social science', 'critical thinking'],
    recommendedMinutes: 90,
    depth: {
      steelman:
        'The optimistic reading is that the crisis is itself the self-correction working: the field detected the problem using its own methods, published the bad news, and changed practice through pre-registration and larger samples. A discipline that can measure its own failure rate is in better shape than one that cannot.',
      goFurther: [
        'Open Science Collaboration, “Estimating the Reproducibility of Psychological Science” (*Science*, 2015)',
        'John Ioannidis, “Why Most Published Research Findings Are False” (2005)',
        'Thomas Kuhn, *The Structure of Scientific Revolutions* (1962)',
        'Stuart Ritchie, *Science Fictions* (2020)',
      ],
      trap: 'Using the crisis as a general licence to disbelieve inconvenient science. The findings that replicate least well are typically small, surprising and underpowered; that is a specific diagnosis, and it does not transfer to results with large samples and independent confirmation.',
    },
  },
]
