import { Lesson } from "@/lib/types";

const lesson: Lesson = {
    id: "lesson-19",
    title: "President Washington",
    description: "First Administration (1789-1797)",
    heroImage: "/images/hero-washington-president.jpg",
    story: {
      narrator: "Eleanor, age 14, living in New York City, 1789",
      chapters: [
        {
          title: "A New Government Begins",
          content: `I'm Eleanor, fourteen, and I witnessed history today. George Washington took the oath of office as our first President on the balcony of Federal Hall in New York City. Thousands of people filled the streets, cheering and crying. Washington looked dignified but nervous—he knows the weight of this responsibility.

We're creating a government from scratch. No one has done this before. Washington must establish precedents that future presidents will follow. How should a president act? What powers should he have? How formal should the office be? Every decision Washington makes will shape the presidency forever.

Washington chose talented men for his cabinet: Thomas Jefferson as Secretary of State, Alexander Hamilton as Secretary of the Treasury, Henry Knox as Secretary of War. But these men disagree on almost everything. The challenge won't just be governing—it will be keeping the government united.`
        },
        {
          title: "Hamilton's Financial Plan",
          content: `Secretary Hamilton proposed a bold financial plan. The national government should assume all state debts from the Revolutionary War. We should create a national bank. We should encourage manufacturing. Hamilton believes a strong economy requires a powerful central government supporting business and industry.

But Thomas Jefferson and James Madison oppose this. They fear Hamilton wants to make America like Britain—urban, industrial, with a powerful central government favoring the wealthy. They believe America should remain a nation of independent farmers with strong state governments and limited federal power.

The debate grows bitter. Hamilton and Jefferson can barely stand to be in the same room. Washington tries to mediate, but even he can't bridge this divide. Two visions of America are emerging, and they're incompatible.`
        },
        {
          title: "Staying Neutral",
          content: `In 1793, France and Britain went to war. France helped us win independence—shouldn't we help them now? But Washington declared neutrality. We're too weak for another war. We must stay out of European conflicts and focus on building our nation.

Many Americans were angry. Democratic-Republicans like Jefferson sympathized with France's revolution. Federalists like Hamilton favored Britain, our largest trading partner. But Washington stood firm: neutrality was essential for our survival.

Washington served two terms, then voluntarily stepped down—establishing the precedent that presidents shouldn't serve for life. In his Farewell Address, he warned against political parties and foreign entanglements. We didn't listen to either warning, but his example of peacefully transferring power became our greatest democratic tradition.`
        },
        {
          title: "The Whiskey Rebellion",
          content: `In 1794, farmers in western Pennsylvania rebelled against Hamilton's whiskey tax. These frontier farmers grew grain and distilled it into whiskey—easier to transport than bulky grain sacks. The tax hit them hard, and they saw it as the same kind of unfair taxation Britain had imposed.

The rebels attacked tax collectors, burned buildings, and threatened armed resistance. This was the first major test of federal authority under the Constitution. Could the new government enforce its laws? Or would it collapse like the Articles of Confederation?

Washington's response was decisive. He personally led 13,000 militia troops to western Pennsylvania. The rebels melted away without a fight when they saw federal power backed by military force. Washington had proven that the Constitution wasn't just words on paper—the federal government had real authority and would use it.

I watched from my window as troops marched through New York on their way west. My father said this was the difference between Washington and a king. A king would have executed the rebels. Washington arrested a few leaders, but pardoned them. He'd shown strength without tyranny, enforcing law without revenge. That balance would become the American way.`
        },
        {
          title: "Washington's Legacy",
          content: `When Washington left office in 1797, he'd served eight years as our first President. He could have served for life—many wanted him to. But he chose to step down, proving that American presidents would serve limited terms and transfer power peacefully. That decision may be his greatest gift to our republic.

Washington established so many precedents. He showed how a president should act: dignified but republican, not royal. He created the cabinet system. He asserted federal authority while respecting states' rights. He kept us out of unnecessary foreign wars. He held the government together despite bitter disagreements between Hamilton and Jefferson.

Most importantly, he proved that republican government could work on a large scale. Most of history's republics had been small city-states. Enlightenment philosophers doubted that a large republic could survive without collapsing into tyranny or chaos. Washington proved them wrong.

My father took me to see Washington's farewell parade. The man looked old and tired—eight years of presidency had aged him. But the crowd's love and respect were genuine. He'd won our independence as a general and secured it as a president. He was offered a crown and chose to be a citizen instead.

"That's the greatest act of his life," Father said, pointing at Washington's carriage disappearing down the street. "Not winning the war, not serving as president, but walking away from power when he could have kept it. That's what makes us different from every other nation. That's what makes us a republic." Watching Washington leave office peacefully, I finally understood what our experiment in self-government really meant. We had proven we didn't need kings. Citizens could govern themselves.`
        }
      ]
    },
    flashcards: [
      {
        id: "fc19-1",
        term: "George Washington (President)",
        definition: "First President of the United States (1789-1797) who established many precedents for the office."
      },
      {
        id: "fc19-2",
        term: "Cabinet",
        definition: "The President's advisory group of department heads, including Secretary of State and Secretary of Treasury."
      },
      {
        id: "fc19-3",
        term: "Alexander Hamilton",
        definition: "First Secretary of Treasury who created a financial plan favoring strong central government and industry."
      },
      {
        id: "fc19-4",
        term: "Thomas Jefferson",
        definition: "First Secretary of State who favored limited federal power, states' rights, and an agricultural economy."
      },
      {
        id: "fc19-5",
        term: "Neutrality Proclamation",
        definition: "Washington's 1793 declaration that America would remain neutral in European wars."
      },
      {
        id: "fc19-6",
        term: "Precedent",
        definition: "An action or decision that serves as an example for future situations."
      },
      {
        id: "fc19-7",
        term: "Farewell Address",
        definition: "Washington's 1796 speech warning against political parties and foreign alliances."
      },
      {
        id: "fc19-8",
        term: "Two-Term Tradition",
        definition: "Washington's decision to serve only two terms, establishing an informal limit later made law."
      },
      {
        id: "fc19-9",
        term: "Whiskey Rebellion",
        definition: "1794 Pennsylvania farmers' uprising against federal whiskey tax, crushed by Washington leading militia, proving the new government could enforce its laws with strength."
      },
      {
        id: "fc19-10",
        term: "National Bank",
        definition: "Financial institution proposed by Hamilton to stabilize currency, manage debt, and strengthen the economy, opposed by Jefferson as unconstitutional expansion of federal power."
      }
    ],
    quiz: [
      {
        id: "q19-1",
        question: "Why was Washington's presidency so important?",
        options: [
          "He was the tallest president",
          "He established precedents and examples that future presidents would follow",
          "He had no importance",
          "He ruled like a king"
        ],
        correctOptionIndex: 1,
        explanation: "Washington's presidency was crucial because he established precedents for how presidents should act, how much power they should have, and how to transfer power peacefully—examples that shaped the office forever."
      },
      {
        id: "q19-2",
        question: "What did Alexander Hamilton's financial plan include?",
        options: [
          "Eliminating all government",
          "Federal assumption of state debts, creating a national bank, and encouraging manufacturing",
          "Giving all power to states",
          "Banning all trade"
        ],
        correctOptionIndex: 1,
        explanation: "Hamilton's financial plan included the federal government assuming state debts, creating a national bank, and encouraging manufacturing and industry—all aimed at strengthening the central government and economy."
      },
      {
        id: "q19-3",
        question: "Why did Jefferson oppose Hamilton's plans?",
        options: [
          "He didn't oppose them",
          "He feared they gave too much power to central government and favored wealthy over farmers",
          "He wanted even more federal power",
          "He opposed all economic plans"
        ],
        correctOptionIndex: 1,
        explanation: "Jefferson opposed Hamilton's plans because he feared they would create a too-powerful central government that favored wealthy merchants and manufacturers over independent farmers, making America too similar to Britain."
      },
      {
        id: "q19-4",
        question: "What was Washington's Neutrality Proclamation?",
        options: [
          "A declaration of war",
          "A declaration that America would stay neutral in European wars",
          "An alliance with France",
          "A trade agreement"
        ],
        correctOptionIndex: 1,
        explanation: "Washington's Neutrality Proclamation declared that America would remain neutral in the war between France and Britain, arguing that the young nation needed to avoid foreign conflicts."
      },
      {
        id: "q19-5",
        question: "What precedent did Washington set by serving only two terms?",
        options: [
          "That presidents should serve forever",
          "That presidents should voluntarily limit themselves to two terms",
          "That there should be no president",
          "That presidents should serve only one term"
        ],
        correctOptionIndex: 1,
        explanation: "Washington voluntarily stepped down after two terms, establishing the precedent that presidents shouldn't serve for life. This tradition lasted until FDR and was made law by the 22nd Amendment."
      },
      {
        id: "q19-6",
        question: "What were the main philosophical differences between Hamilton and Jefferson?",
        options: [
          "They agreed on everything",
          "Hamilton favored strong central government and industry; Jefferson favored states' rights and agriculture",
          "Hamilton opposed all government",
          "Jefferson wanted monarchy"
        ],
        correctOptionIndex: 1,
        explanation: "Hamilton believed in a strong federal government, national bank, and industrial economy. Jefferson favored limited federal power, strong state governments, and an agricultural economy of independent farmers. These opposing visions created America's first political divide."
      },
      {
        id: "q19-7",
        question: "Why did Washington warn against political parties in his Farewell Address?",
        options: [
          "He loved political parties",
          "He feared parties would divide the nation and prioritize party loyalty over national interest",
          "He wanted only one party",
          "He didn't mention parties"
        ],
        correctOptionIndex: 1,
        explanation: "Washington warned that political parties ('factions') would divide Americans, make compromise impossible, and lead people to put party loyalty above national interest. Despite this warning, parties emerged immediately with the Hamilton-Jefferson rivalry."
      },
      {
        id: "q19-8",
        question: "What did Washington's decision to step down after two terms demonstrate about American democracy?",
        options: [
          "That he was tired of the job",
          "That power could transfer peacefully and presidents would voluntarily give up power—rejecting monarchy",
          "That the presidency was weak",
          "That Washington failed"
        ],
        correctOptionIndex: 1,
        explanation: "By voluntarily giving up power when he could have served for life, Washington proved that America wasn't replacing a king with another kind of monarch. His peaceful transfer of power established that presidents serve temporarily, not for life—a revolutionary act that defined American democracy."
      }
    ]
  };

export default lesson;
