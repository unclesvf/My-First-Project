import { Lesson } from "@/lib/types";

const lesson: Lesson = {
  id: "lesson-15",
  title: "The Ambitious Vision",
  description: "Alexander Hamilton: Architect of American Finance and Power",
  heroImage: "/images/hero-hamilton.jpg",
  story: {
    narrator: "Robert, a 16-year-old clerk at the Treasury Department, 1791",
    chapters: [
      {
        title: "The Immigrant's Dream",
        content: `My name is Robert, and I am sixteen years old. I work as a junior clerk at the Treasury Department in Philadelphia, and I have the extraordinary fortune to observe the most brilliant—and controversial—member of President Washington's cabinet: Secretary of the Treasury Alexander Hamilton.

Mr. Hamilton's story seems impossible. Born out of wedlock in the Caribbean islands, orphaned young, he came to America with nothing but his intelligence and ambition. Now, at thirty-six, he is reshaping the American economy and the very structure of the federal government.

The other clerks whisper that he works eighteen-hour days, that his mind never rests, that he can produce reports and essays faster than any ten men. I have seen him dictate letters while reviewing financial statements, never losing the thread of either task.

But I have also seen the fury his plans provoke. Thomas Jefferson and James Madison, once allies in creating the Constitution, have become his bitter opponents. They believe Hamilton is trying to transform America into something like the British system they fought to overthrow—with a powerful central government, a permanent national debt, and wealthy financiers pulling the strings.

Hamilton believes he is saving America from chaos and weakness. The clash between these visions will define our politics for generations.`
      },
      {
        title: "The Financial Revolution",
        content: `When Hamilton became Treasury Secretary in 1789, the United States was drowning in debt. The Revolutionary War had been financed with borrowed money and printed currency worth almost nothing. Congress owed millions to foreign governments and American citizens. The states had their own massive debts.

Many thought the debts should simply be repudiated or scaled down. Hamilton had a different vision. In his first major report to Congress, he proposed that the federal government assume all the state debts and pay them in full.

Why would he add to the federal burden? Because Hamilton understood that debt, properly managed, could be an asset.

By guaranteeing payment, the federal government would establish its creditworthiness. Wealthy investors who held government bonds would gain a stake in the government's success. The bonds themselves would circulate as a form of money, lubricating commerce.

"A national debt, if it is not excessive, will be to us a national blessing," Hamilton wrote. His opponents were horrified. Jefferson saw a scheme to enrich speculators. Madison worried about corruption. But Hamilton prevailed.

The assumption of debts required a deal. In exchange for Southern support, the new national capital would be located on the Potomac River—what would become Washington, D.C. Politics and principle intertwined from the beginning.`
      },
      {
        title: "The Bank and the Constitution",
        content: `Hamilton's next great project was a national bank—the Bank of the United States.

He modeled it on the Bank of England. The bank would be partly owned by the government, partly by private investors. It would hold government funds, make loans to the government and to businesses, and issue banknotes that could serve as reliable currency throughout the nation.

Opposition was fierce. Jefferson and Madison argued that the Constitution gave Congress no power to create a bank. The document listed specific powers—coining money, raising armies, regulating commerce. Banking was not among them.

Hamilton's response created a doctrine that would shape American constitutional law forever: the theory of implied powers.

The Constitution, Hamilton argued, gave Congress all powers "necessary and proper" for executing its explicit powers. A bank was a useful means to collect taxes, pay debts, and regulate currency—all enumerated powers. Therefore, Congress could create it.

"If the end be clearly comprehended within any of the specified powers, and if the measure have an obvious relation to that end," Hamilton wrote, "it may safely be deemed to come within the compass of the national authority."

President Washington sided with Hamilton. The Bank of the United States was chartered in 1791. The loose construction of the Constitution that Hamilton pioneered would later justify the Louisiana Purchase, the transcontinental railroad, and countless other federal actions.`
      },
      {
        title: "Manufacturing America",
        content: `Hamilton's third great report was on manufactures—factories and industry. While Jefferson dreamed of an agrarian republic of independent farmers, Hamilton saw a different future: a diversified economy with agriculture, commerce, and manufacturing all flourishing together.

He proposed tariffs to protect infant industries, bounties to encourage new manufactures, and government investment in infrastructure. America, he believed, must produce its own goods rather than depend on imports from Europe.

"Not only the wealth but the independence and security of a country appear to be materially connected with the prosperity of manufactures," he wrote.

Congress rejected most of these proposals. The agricultural South saw no benefit in taxing imports to help Northern factories. But Hamilton had planted ideas that would eventually triumph. The American System of Henry Clay, the protective tariffs of the nineteenth century, and the industrial economy that made America a world power all trace their lineage to Hamilton's vision.

What strikes me, watching him work, is how he thinks in systems. He does not see isolated problems but interconnections—how debt relates to credit, credit to banking, banking to commerce, commerce to manufacturing. He imagines America as a great machine, and he is designing the gears that will make it run.`
      },
      {
        title: "The Price of Genius",
        content: `Hamilton's brilliance has made him enemies. His arrogance makes it worse. He cannot resist cutting remarks about opponents, cannot admit when he might be wrong, cannot stop pushing even when prudence would counsel patience.

Jefferson and Madison have organized an opposition party—the Democratic-Republicans—partly in reaction to Hamilton's policies. They accuse him of monarchism, of favoring the rich over common farmers, of betraying the Revolution's ideals.

Some accusations are unfair. Hamilton is no monarchist—he believes in republican government, in elections, in the Constitution. But he does trust elites more than common people, does favor a strong central government, and does see commerce and finance as the foundations of national power.

His personal life is troubled too. Whispers circulate about financial improprieties—whispers that, I will later learn, conceal a scandalous affair that Hamilton will publicly confess to clear his name of corruption charges.

Yet for all his flaws, Hamilton has given America something invaluable: a functioning government. When Washington took office, the Treasury was empty, the currency worthless, the government's credit destroyed. Hamilton built systems that work—that collect revenue, pay debts, support commerce.

He will not live to see the full flowering of his vision. In 1804, Vice President Aaron Burr will kill him in a duel. He will die at forty-nine, leaving debts of his own despite a lifetime in finance.

But his legacy will endure. The strong federal government, the national banking system, the industrial economy—these are Hamilton's monuments. He imagined an America that could stand among the great powers of the world. And though his methods were often controversial, his vision proved prophetic.

Perhaps that is the lesson of Alexander Hamilton: that genius without restraint can be dangerous, but that bold vision is sometimes necessary to build something new. He saw what America could become and bent every fiber of his being toward making it real.`
      }
    ]
  },
  flashcards: [
    {
      id: "fc-1",
      term: "Alexander Hamilton",
      definition: "American Founding Father (1755-1804), first Secretary of the Treasury, who created the financial systems of the new government and advocated for a strong central government."
    },
    {
      id: "fc-2",
      term: "Assumption of State Debts",
      definition: "Hamilton's proposal that the federal government take on all state debts from the Revolution, establishing national creditworthiness."
    },
    {
      id: "fc-3",
      term: "Bank of the United States",
      definition: "A national bank created in 1791 at Hamilton's urging, which held government funds, made loans, and issued paper currency."
    },
    {
      id: "fc-4",
      term: "Implied Powers",
      definition: "Hamilton's constitutional doctrine that Congress can exercise powers not explicitly listed if they are 'necessary and proper' means to achieve explicit powers."
    },
    {
      id: "fc-5",
      term: "Necessary and Proper Clause",
      definition: "The Constitutional provision Hamilton used to justify the national bank—Congress may make laws necessary and proper for executing its enumerated powers."
    },
    {
      id: "fc-6",
      term: "Report on Manufactures",
      definition: "Hamilton's 1791 proposal for government support of industry through tariffs, bounties, and infrastructure—a vision of America as an industrial power."
    },
    {
      id: "fc-7",
      term: "Loose Construction",
      definition: "The interpretation of the Constitution that allows Congress broad powers through the necessary and proper clause, pioneered by Hamilton."
    },
    {
      id: "fc-8",
      term: "Strict Construction",
      definition: "Jefferson and Madison's view that the Constitution should be interpreted narrowly, limiting federal power to explicitly listed functions."
    },
    {
      id: "fc-9",
      term: "Federalist Party",
      definition: "The political party led by Hamilton and Adams, favoring a strong central government, national bank, and commercial economy."
    },
    {
      id: "fc-10",
      term: "National Debt as Blessing",
      definition: "Hamilton's controversial idea that properly managed debt could establish government credit and give wealthy citizens a stake in national success."
    }
  ],
  quiz: [
    {
      id: "q-1",
      question: "What was Hamilton's main argument for having the federal government assume state debts?",
      options: [
        "It would help Southern states only",
        "It would establish federal creditworthiness and bind wealthy investors to the government's success",
        "It would eliminate all debt immediately",
        "It would weaken the federal government"
      ],
      correctOptionIndex: 1,
      explanation: "Hamilton saw debt assumption as a way to establish the federal government's credit and give wealthy bondholders a stake in its success—making them supporters of the new nation."
    },
    {
      id: "q-2",
      question: "What constitutional doctrine did Hamilton develop to justify the Bank of the United States?",
      options: [
        "Strict construction",
        "States' rights",
        "Implied powers—that Congress can use means not explicitly listed if necessary and proper",
        "Judicial review"
      ],
      correctOptionIndex: 2,
      explanation: "Hamilton argued that the Constitution's 'necessary and proper' clause gave Congress implied powers—the authority to create a bank as a means to execute its explicit powers like collecting taxes and regulating currency."
    },
    {
      id: "q-3",
      question: "Who opposed Hamilton's financial programs and why?",
      options: [
        "George Washington, who wanted lower taxes",
        "Jefferson and Madison, who feared the programs favored wealthy elites and concentrated too much power",
        "Aaron Burr, who wanted to be Treasury Secretary",
        "Benjamin Franklin, who preferred state banks"
      ],
      correctOptionIndex: 1,
      explanation: "Jefferson and Madison opposed Hamilton's programs, believing they enriched speculators, favored Northern commerce over Southern agriculture, and dangerously expanded federal power."
    },
    {
      id: "q-4",
      question: "What was Hamilton's vision in his Report on Manufactures?",
      options: [
        "America should remain purely agricultural",
        "America should develop industry through tariffs and government support to become economically independent",
        "America should import all manufactured goods",
        "Factories should be banned"
      ],
      correctOptionIndex: 1,
      explanation: "Hamilton envisioned a diversified economy with thriving manufactures alongside agriculture. He proposed government support through tariffs and investment to make America economically self-sufficient."
    },
    {
      id: "q-5",
      question: "How did Hamilton's interpretation of the Constitution differ from Jefferson's?",
      options: [
        "Hamilton wanted strict limits; Jefferson wanted broad powers",
        "Hamilton favored loose construction allowing broad federal powers; Jefferson favored strict construction limiting federal action",
        "They agreed on constitutional interpretation",
        "Neither cared about the Constitution"
      ],
      correctOptionIndex: 1,
      explanation: "Hamilton's 'loose construction' interpreted the Constitution broadly, finding implied powers. Jefferson's 'strict construction' limited the federal government to powers explicitly listed."
    },
    {
      id: "q-6",
      question: "What deal was made to get Southern support for Hamilton's debt assumption?",
      options: [
        "Slavery would be abolished",
        "The national capital would be located on the Potomac River (Washington, D.C.)",
        "Southern states wouldn't have to pay taxes",
        "Hamilton would resign"
      ],
      correctOptionIndex: 1,
      explanation: "In exchange for Southern votes for debt assumption, Hamilton agreed that the permanent national capital would be built on the Potomac River between Virginia and Maryland—what became Washington, D.C."
    },
    {
      id: "q-7",
      question: "What did Hamilton mean by calling a national debt 'a national blessing'?",
      options: [
        "Debt is always good",
        "Properly managed debt establishes credit, creates a financial system, and binds citizens to national success",
        "America should never pay its debts",
        "Only rich people benefit from debt"
      ],
      correctOptionIndex: 1,
      explanation: "Hamilton argued that well-managed debt could be beneficial—it established government creditworthiness, created financial instruments for commerce, and gave investors a stake in the nation's success."
    },
    {
      id: "q-8",
      question: "What was Hamilton's lasting impact on American government?",
      options: [
        "He had no lasting impact",
        "He created financial systems—the Treasury, national debt management, banking—that enabled the federal government to function and grow",
        "He abolished the federal government",
        "He moved the capital to New York permanently"
      ],
      correctOptionIndex: 1,
      explanation: "Hamilton built the financial infrastructure of the federal government—revenue collection, debt management, banking, and the precedent of implied powers—that enabled America to become an economic power."
    }
  ]
};

export default lesson;
