import { Lesson } from "@/lib/types";

const lesson: Lesson = {
    id: "lesson-11",
    title: "No Taxation Without Representation",
    description: "The Stamp Act Crisis (1765)",
    heroImage: "/images/hero-stamp-act.jpg",
    story: {
      narrator: "William, age 16, apprentice to a Boston printer, 1765",
      chapters: [
        {
          title: "The Stamp Act",
          content: `My name is William, and I am sixteen years old. I'm an apprentice at a printing shop in Boston, learning the trade from Master Green. Today, March 22, 1765, news arrived that has everyone in our shop furious: Parliament has passed the Stamp Act.

This law requires colonists to buy special stamped paper for all printed materials—newspapers, legal documents, licenses, even playing cards. Every document must bear a tax stamp purchased from British officials. The money will pay for British troops stationed in America.

Master Green is livid. "This will destroy our business!" he says. We'll have to buy expensive stamped paper for every newspaper, pamphlet, and broadside we print. The cost will drive customers away. But it's not just about money—it's about principle.

"We are British subjects," Master Green declares. "We have the right to be taxed only by our own representatives. We have no representatives in Parliament. Therefore, Parliament has no right to tax us directly. This is tyranny!" His words echo what I'm hearing in taverns, on street corners, everywhere. The cry goes up: "No taxation without representation!"`
        },
        {
          title: "Sons of Liberty",
          content: `A group calling themselves the Sons of Liberty has formed to resist the Stamp Act. They meet at night, make plans, and intimidate anyone who supports the tax. Their leader is Samuel Adams, a firebrand who writes passionate articles against British tyranny.

I watched yesterday as a mob gathered around the house of Andrew Oliver, the man appointed to distribute stamps in Massachusetts. They hung an effigy of him from a tree, then burned it. They destroyed a building he owned and damaged his house. Oliver resigned the next day, refusing to distribute the stamps.

The crowds frightened me—there's something dangerous about mob violence, even when directed at unjust laws. But I also feel the excitement. We're standing up for our rights. We're refusing to submit to taxation without consent.

Similar protests are erupting throughout the colonies. In New York, stamp distributors resign. In Virginia, Patrick Henry delivers a fiery speech declaring "If this be treason, make the most of it!" The colonies are uniting in resistance, connected by shared outrage at this violation of their rights.`
        },
        {
          title: "Colonial Unity",
          content: `In October, representatives from nine colonies met in New York for a Stamp Act Congress. This is remarkable—the colonies rarely cooperate. But this threat has brought us together. The Congress declared that only colonial assemblies, not Parliament, have the right to tax colonists.

Meanwhile, merchants organized boycotts of British goods. "Non-importation agreements," they call them. Women formed spinning groups to make homemade cloth instead of buying British textiles. Even ordinary people like me are part of this resistance by choosing what we buy.

The boycotts hurt British merchants, who pressured Parliament to repeal the Stamp Act. In March 1766, Parliament repealed it! Church bells rang, celebrations erupted in the streets. We won! Our unity and resistance forced Britain to back down.

But there's a darker side to this victory. Parliament also passed the Declaratory Act, asserting their right to legislate for the colonies "in all cases whatsoever." They may have repealed this tax, but they claim absolute authority over us. The fundamental conflict hasn't been resolved—it's only been postponed.`
        },
        {
          title: "The Townshend Acts",
          content: `Our celebration didn't last long. In 1767, Parliament passed new taxes called the Townshend Acts, named for Charles Townshend, the British Chancellor of the Exchequer. These taxes are different from the Stamp Act—they're duties on imported goods like tea, glass, lead, paint, and paper.

Parliament thinks they're being clever. They claim these aren't "internal" taxes like the Stamp Act, but "external" taxes on trade—something they've always regulated. But we see through this distinction. A tax is a tax, and we still have no representation in Parliament.

The revenue from these taxes will pay the salaries of royal governors and judges in America. Master Green explains why this is dangerous: "If Britain pays our governors, they'll serve British interests, not ours. Our governors will no longer depend on colonial assemblies for their salaries, so they won't have to listen to us."

The acts also allow British customs officials to use "writs of assistance"—general search warrants that let them search any building for smuggled goods without specific cause. It feels like our rights as Englishmen are being stripped away, one by one. We renewed our boycotts, and once again, the streets filled with tension.`
        },
        {
          title: "The Power of Resistance",
          content: `These years have taught me something profound: ordinary people have power when they stand together. I'm just a printer's apprentice, but when I refuse to buy British tea, when Master Green prints pamphlets explaining our rights, when my neighbors boycott imported goods—we're all part of something larger.

Women have become crucial to this resistance. They're called the "Daughters of Liberty," and they organize spinning bees to produce homemade cloth. They serve coffee instead of tea. They teach their children about liberty and rights. My mother says she feels like she's part of history, not just watching it happen.

The colonial assemblies have grown bolder too. The Massachusetts Assembly circulated a letter to other colonies urging united resistance. Britain ordered them to rescind it. They refused. Britain dissolved the assembly, but that only made more people angry. You can't suppress ideas by silencing the people who speak them—the ideas just spread wider.

I've learned that we're not just fighting about taxes. We're fighting about what it means to have rights. Are we British subjects with the rights of Englishmen? Or are we second-class colonials who must submit to whatever Parliament decides? The answer to that question will shape our future—and Britain's too.`
        }
      ]
    },
    flashcards: [
      {
        id: "fc11-1",
        term: "Stamp Act",
        definition: "A 1765 British law requiring colonists to pay a tax on printed materials by purchasing special stamped paper."
      },
      {
        id: "fc11-2",
        term: "No Taxation Without Representation",
        definition: "The colonial principle that they could only be taxed by legislatures where they had elected representatives, not by Parliament."
      },
      {
        id: "fc11-3",
        term: "Sons of Liberty",
        definition: "A colonial organization that used protests, intimidation, and sometimes violence to resist British policies like the Stamp Act."
      },
      {
        id: "fc11-4",
        term: "Samuel Adams",
        definition: "A Boston leader and organizer of colonial resistance against British taxation and policies."
      },
      {
        id: "fc11-5",
        term: "Stamp Act Congress",
        definition: "A 1765 meeting of representatives from nine colonies to coordinate opposition to the Stamp Act and assert colonial rights."
      },
      {
        id: "fc11-6",
        term: "Boycott",
        definition: "Refusing to buy certain goods as a form of protest. Colonists boycotted British goods to resist unfair taxes."
      },
      {
        id: "fc11-7",
        term: "Declaratory Act",
        definition: "A 1766 British law asserting Parliament's right to make laws for the colonies 'in all cases whatsoever,' passed the same day the Stamp Act was repealed."
      },
      {
        id: "fc11-8",
        term: "Patrick Henry",
        definition: "Virginia orator who gave fiery speeches against British taxation, declaring 'If this be treason, make the most of it!'"
      },
      {
        id: "fc11-9",
        term: "Townshend Acts",
        definition: "1767 British laws placing duties on imported goods like tea, glass, and paper, with revenue used to pay royal governors, reducing colonial legislative control."
      },
      {
        id: "fc11-10",
        term: "Daughters of Liberty",
        definition: "Women's groups that supported colonial resistance by organizing spinning bees to make homemade cloth, boycotting British goods, and promoting patriotic values in their homes."
      }
    ],
    quiz: [
      {
        id: "q11-1",
        question: "What did the Stamp Act require colonists to do?",
        options: [
          "Join the British army",
          "Buy special stamped paper for all printed materials and legal documents",
          "Move to Britain",
          "Give up their weapons"
        ],
        correctOptionIndex: 1,
        explanation: "The Stamp Act required colonists to purchase special stamped paper for all printed materials, legal documents, and other items. This was a direct tax on the colonies."
      },
      {
        id: "q11-2",
        question: "What did 'No taxation without representation' mean?",
        options: [
          "Colonists should never pay taxes",
          "Colonists could only be taxed by legislatures where they had elected representatives",
          "Only wealthy colonists should pay taxes",
          "Britain should pay colonial taxes"
        ],
        correctOptionIndex: 1,
        explanation: "Colonists argued they could only be taxed by legislatures where they had representatives. Since they had no representatives in Parliament, they opposed Parliamentary taxation."
      },
      {
        id: "q11-3",
        question: "Who were the Sons of Liberty?",
        options: [
          "British soldiers",
          "A colonial organization that organized protests and resistance against British policies",
          "Native American allies",
          "French traders"
        ],
        correctOptionIndex: 1,
        explanation: "The Sons of Liberty were colonial patriots who organized protests, boycotts, and sometimes violent resistance against British policies like the Stamp Act."
      },
      {
        id: "q11-4",
        question: "What was the Stamp Act Congress?",
        options: [
          "A British government meeting",
          "A meeting of nine colonial representatives to coordinate opposition to the Stamp Act",
          "A celebration of the Stamp Act",
          "A military training session"
        ],
        correctOptionIndex: 1,
        explanation: "The Stamp Act Congress was a significant 1765 meeting where representatives from nine colonies coordinated their opposition and declared that only colonial assemblies could tax colonists."
      },
      {
        id: "q11-5",
        question: "How did colonists successfully resist the Stamp Act?",
        options: [
          "They ignored the law and Britain did nothing",
          "They organized protests, intimidated stamp distributors, and boycotted British goods until Parliament repealed it",
          "They paid the tax willingly",
          "They asked France for help"
        ],
        correctOptionIndex: 1,
        explanation: "Colonists used multiple tactics: protests, intimidation of stamp distributors, and boycotts of British goods. These actions hurt British merchants who pressured Parliament to repeal the act."
      },
      {
        id: "q11-6",
        question: "What was the Declaratory Act?",
        options: [
          "It gave colonists representation in Parliament",
          "It asserted Parliament's right to make laws for the colonies 'in all cases whatsoever'",
          "It freed enslaved people",
          "It ended all British taxes"
        ],
        correctOptionIndex: 1,
        explanation: "The Declaratory Act, passed the same day the Stamp Act was repealed, asserted Parliament's absolute authority over the colonies. This meant the fundamental conflict over authority remained unresolved."
      },
      {
        id: "q11-7",
        question: "What did colonial boycotts demonstrate?",
        options: [
          "Colonists had no economic power",
          "Colonial unity and economic leverage could force British policy changes",
          "Britain didn't care about colonial actions",
          "Only violence would work"
        ],
        correctOptionIndex: 1,
        explanation: "Colonial boycotts demonstrated that unity and economic pressure could be effective. The boycotts hurt British merchants enough that Parliament repealed the Stamp Act."
      },
      {
        id: "q11-8",
        question: "Why was the Stamp Act particularly offensive to colonists?",
        options: [
          "It only affected wealthy people",
          "It was a direct tax without colonial consent, affecting everyday activities and violating their rights as British subjects",
          "It was too cheap",
          "It only applied to one colony"
        ],
        correctOptionIndex: 1,
        explanation: "The Stamp Act was a direct tax on everyday activities, imposed without colonial consent. Colonists saw it as a violation of their rights as British subjects to be taxed only by their own representatives."
      }
    ]
  };

export default lesson;
