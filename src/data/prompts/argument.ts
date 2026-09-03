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
]
