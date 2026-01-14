import { Lesson } from "@/lib/types";

const lesson: Lesson = {
    id: "lesson-18",
    title: "A More Perfect Union",
    description: "The Constitutional Convention (1787-1789)",
    heroImage: "/images/hero-constitution.jpg",
    story: {
      narrator: "Rebecca, age 15, daughter of a Pennsylvania delegate, 1787",
      chapters: [
        {
          title: "The Articles of Confederation Fail",
          content: `I'm Rebecca, fifteen, living in Philadelphia. My father is a delegate to a special convention meeting here. After winning independence, our states created the Articles of Confederation—a weak central government that's failing. Congress can't collect taxes, regulate trade, or enforce laws. States act like separate countries, printing their own money and ignoring Congress.

Last year, farmers in Massachusetts rebelled against high taxes in Shays' Rebellion. The weak national government couldn't stop it. Everyone realized we need a stronger government, or our new nation will fall apart. That's why delegates from twelve states are meeting in secret at Independence Hall.`
        },
        {
          title: "The Great Compromise",
          content: `Father comes home exhausted each night, unable to tell me details—they've sworn secrecy. But I overhear conversations. The big debate is representation: Should each state have equal votes, or should larger states have more power based on population?

Delegates are deadlocked. Small states fear being controlled by large states. Large states say equal votes are unfair when they have more people. Finally, Roger Sherman proposes the Great Compromise: a two-house legislature. The Senate gives each state equal votes (two senators). The House of Representatives bases votes on population. Both houses must approve laws.

Other compromises follow. Northern and Southern states disagree about counting enslaved people for representation. They settle on the Three-Fifths Compromise—enslaved people count as three-fifths of a person for population purposes. This is morally wrong, but it's the compromise that keeps Southern states in the Union.`
        },
        {
          title: "The Constitution's Framework",
          content: `The Constitution creates a government of separated powers designed to prevent tyranny. The delegates remembered how British power had been abused, so they built a system where no one branch could dominate.

The Legislative Branch (Congress) makes laws. It's divided into two houses: the Senate and House of Representatives. This was the Great Compromise. Only Congress can declare war, collect taxes, coin money, and regulate interstate commerce.

The Executive Branch, headed by the President, enforces laws. The President is commander-in-chief of the military, conducts foreign policy, and appoints judges and officials (with Senate approval). The President can veto laws, but Congress can override vetoes with a two-thirds vote.

The Judicial Branch interprets laws. The Supreme Court and lower federal courts decide if laws follow the Constitution. Though not explicitly stated, this gives courts the power to strike down unconstitutional laws.

Each branch checks the others. The President can veto laws, but Congress can override. Congress approves Presidential appointments and can impeach the President. The courts can declare laws unconstitutional. It's a delicate balance designed to protect liberty while maintaining effective government.`
        },
        {
          title: "Ratification and the Bill of Rights",
          content: `The Constitution is finished—creating three branches of government with checks and balances, federalism dividing power between national and state governments. But it needs ratification by nine of thirteen states.

Federalists like Hamilton, Madison, and Jay support it, writing essays called The Federalist Papers. Anti-Federalists like Patrick Henry oppose it, saying it gives too much power to the central government and lacks protection for individual rights.

The debate is intense. To win ratification, Federalists promise to add a Bill of Rights—amendments protecting freedoms like speech, religion, press, and trial by jury. States ratify the Constitution. In 1789, George Washington becomes our first President. The Bill of Rights is added in 1791.

We've created something remarkable: a republic based on popular sovereignty, where government power comes from the people. It's not perfect—it allows slavery, excludes women and non-property owners from voting. But it's a start, and the amendment process means we can improve it over time.`
        },
        {
          title: "A Living Experiment",
          content: `Father brought home a printed copy of the Constitution. I read the Preamble carefully: "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America."

"More perfect"—not perfect, but more perfect. Father explains that the delegates knew they hadn't created a perfect document. The Three-Fifths Compromise treats human beings as property. Women aren't mentioned. Native peoples aren't considered. Poor men without property often can't vote. Yet the Constitution includes a mechanism for amendment, a way to improve over time.

This is the radical part: a government that can change, adapt, and grow more just without revolution. The Constitution isn't carved in stone like ancient laws. It's a living document that can evolve as we learn and grow as a people.

Some delegates, like Benjamin Franklin, signed despite reservations. He reportedly said, "I consent, Sir, to this Constitution because I expect no better, and because I am not sure that it is not the best." He understood that perfection is impossible, but progress is essential.

Standing in Independence Hall where both the Declaration and the Constitution were created, I feel the weight of what we've begun. In 1776, we declared our independence and stated our ideals. In 1787, we created a framework to pursue those ideals. The experiment is just beginning.

Will we live up to "all men are created equal"? Will we expand liberty and justice to include everyone? Will this Constitution endure through challenges we can't yet imagine? These questions will define America's future. We've built the structure, but each generation must decide what kind of nation to build within it. Father says that's the true meaning of "We the People"—the Constitution belongs to all of us, and we all have a responsibility to make it work and make it better.`
        }
      ]
    },
    flashcards: [
      {
        id: "fc18-1",
        term: "Constitutional Convention",
        definition: "The 1787 Philadelphia meeting where delegates created the U.S. Constitution to replace the failing Articles of Confederation."
      },
      {
        id: "fc18-2",
        term: "Articles of Confederation",
        definition: "America's first government system (1781-1789), which created a weak central government that ultimately failed."
      },
      {
        id: "fc18-3",
        term: "Great Compromise",
        definition: "The agreement creating a two-house legislature: Senate (equal state representation) and House (population-based representation)."
      },
      {
        id: "fc18-4",
        term: "Three-Fifths Compromise",
        definition: "The agreement to count enslaved people as three-fifths of a person for representation and taxation purposes."
      },
      {
        id: "fc18-5",
        term: "Federalists",
        definition: "Supporters of the Constitution who favored a strong central government, including Hamilton, Madison, and Jay."
      },
      {
        id: "fc18-6",
        term: "Anti-Federalists",
        definition: "Opponents of the Constitution who feared too much central power and wanted a Bill of Rights, including Patrick Henry."
      },
      {
        id: "fc18-7",
        term: "Bill of Rights",
        definition: "The first ten amendments to the Constitution, protecting individual freedoms like speech, religion, and due process."
      },
      {
        id: "fc18-8",
        term: "Checks and Balances",
        definition: "The system where each branch of government can limit the powers of the other branches."
      },
      {
        id: "fc18-9",
        term: "Separation of Powers",
        definition: "The constitutional principle dividing government into three branches—legislative, executive, and judicial—each with distinct responsibilities to prevent concentration of power and tyranny."
      },
      {
        id: "fc18-10",
        term: "Shays' Rebellion",
        definition: "1786 Massachusetts farmers' uprising against high taxes that exposed the Articles of Confederation's weakness, prompting calls for a stronger national government and the Constitutional Convention."
      }
    ],
    quiz: [
      {
        id: "q18-1",
        question: "Why did the Articles of Confederation fail?",
        options: [
          "They gave too much power to central government",
          "They created a weak central government that couldn't tax, regulate trade, or enforce laws",
          "They were perfect",
          "Foreign countries rejected them"
        ],
        correctOptionIndex: 1,
        explanation: "The Articles created a very weak central government that lacked the power to tax, regulate interstate commerce, or enforce laws effectively. This led to economic chaos and events like Shays' Rebellion."
      },
      {
        id: "q18-2",
        question: "What was the Great Compromise?",
        options: [
          "Ending slavery",
          "Creating a two-house legislature with Senate (equal representation) and House (population-based)",
          "Giving all power to large states",
          "Abolishing state governments"
        ],
        correctOptionIndex: 1,
        explanation: "The Great Compromise resolved the debate between large and small states by creating a bicameral legislature: the Senate gives equal representation (two per state), while the House bases representation on population."
      },
      {
        id: "q18-3",
        question: "What was the Three-Fifths Compromise?",
        options: [
          "A tax rate",
          "An agreement to count enslaved people as three-fifths of a person for representation purposes",
          "A voting requirement",
          "A trade agreement"
        ],
        correctOptionIndex: 1,
        explanation: "The Three-Fifths Compromise counted enslaved people as three-fifths of a person for determining representation and taxation. This was a morally troubling compromise between Northern and Southern states."
      },
      {
        id: "q18-4",
        question: "What were Federalists and Anti-Federalists debating?",
        options: [
          "Whether to declare independence",
          "Whether to ratify the Constitution—Federalists supported it, Anti-Federalists opposed it",
          "Who should be president",
          "Where the capital should be"
        ],
        correctOptionIndex: 1,
        explanation: "Federalists supported ratifying the Constitution and favored strong central government. Anti-Federalists opposed it, fearing too much central power and demanding a Bill of Rights."
      },
      {
        id: "q18-5",
        question: "What is the Bill of Rights?",
        options: [
          "A tax bill",
          "The first ten amendments protecting individual freedoms like speech and religion",
          "A military strategy",
          "A treaty with Britain"
        ],
        correctOptionIndex: 1,
        explanation: "The Bill of Rights consists of the first ten amendments to the Constitution, added in 1791 to protect individual liberties such as freedom of speech, religion, press, and due process of law."
      },
      {
        id: "q18-6",
        question: "What is checks and balances?",
        options: [
          "A banking system",
          "A system where each branch of government can limit the powers of other branches",
          "A method of voting",
          "A tax system"
        ],
        correctOptionIndex: 1,
        explanation: "Checks and balances is the constitutional principle that each branch of government (legislative, executive, judicial) has ways to check and limit the powers of the other branches, preventing any one branch from becoming too powerful."
      },
      {
        id: "q18-7",
        question: "What triggered Shays' Rebellion, and why was it significant?",
        options: [
          "High taxes on farmers in Massachusetts; showed the Articles of Confederation government was too weak to maintain order",
          "A dispute over slavery",
          "A foreign invasion",
          "It never happened"
        ],
        correctOptionIndex: 0,
        explanation: "Shays' Rebellion was an uprising of Massachusetts farmers against high taxes and debt collection. The weak federal government couldn't stop it, alarming leaders and demonstrating the urgent need for a stronger central government—directly leading to the Constitutional Convention."
      },
      {
        id: "q18-8",
        question: "What does Rebecca mean when she notes the Constitution says 'more perfect,' not 'perfect'?",
        options: [
          "It was a mistake in writing",
          "The founders knew the Constitution had flaws but included a way to improve it over time through amendments",
          "They thought it was already perfect",
          "They didn't care about perfection"
        ],
        correctOptionIndex: 1,
        explanation: "The phrase 'more perfect Union' acknowledges the Constitution wasn't perfect—it allowed slavery, excluded women and the poor from voting. But the amendment process meant it could evolve and improve over time without revolution. This made it a 'living document' capable of growth toward justice."
      }
    ]
  };

export default lesson;
