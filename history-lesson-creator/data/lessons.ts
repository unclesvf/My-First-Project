import { Lesson } from "@/lib/types";

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "One World to the Next",
    description: "English & Spanish Settlement in the Americas",
    heroImage: "/images/hero-settlement.jpg",
    story: {
      narrator: "Mateo, a 13-year-old Spanish settler in St. Augustine, 1565",
      chapters: [
        {
          title: "The Journey Begins",
          content: `My name is Mateo, and I am thirteen years old. Today marks my first full year in this strange new land called La Florida. I still remember the smell of the salt air as our ship approached the coast, the way my stomach churned—not from seasickness, but from fear and excitement twisted together like rope.

Father told me we were coming to build a new life, to claim land for Spain and spread our faith. The King himself had sent us, led by Don Pedro Menéndez de Avilés, to establish a settlement and drive out the French who dared to settle in Spanish territory.

When we first landed, the heat was unlike anything I'd known in Seville. The air was thick and heavy, and strange birds called from trees I'd never seen before. The indigenous Timucua people watched us from the forest edge—curious, cautious, but not yet hostile.

We called our settlement St. Augustine, and immediately set to work building wooden fortifications. Every day, I helped carry timber and dig trenches. My hands, once soft from my mother's gentle care, grew calloused and strong.`,
        },
        {
          title: "Survival and Struggle",
          content: `The first months were the hardest. We planted crops, but the soil was different here, and many plants withered in the unforgiving sun. Fish from the nearby waters kept us alive when our Spanish provisions ran low.

I learned to respect the Timucua. They showed us which plants were safe to eat, how to track animals through the palmetto scrub, and where to find fresh water. Without them, I don't think we would have survived.

But tension simmered beneath our fragile peace. Some Spanish soldiers treated the Timucua poorly, demanding food and labor. Father argued with the garrison commander about this, saying we would never truly settle here if we made enemies of those who knew the land.

I befriended a Timucua boy named Ahone, who was about my age. He taught me words in his language, and I taught him Spanish. We would meet by the river when we could, away from the suspicious eyes of both our peoples.`,
        },
        {
          title: "Building a New World",
          content: `As seasons passed, St. Augustine grew from a desperate outpost into something resembling a town. We built a wooden chapel where Father Alonso held mass each Sunday. Stone replaced wood in our most important buildings, making them strong against both storms and attack.

Supplies arrived from Havana every few months—tools, seeds, fabric, and news from Spain. Each ship brought new settlers: farmers, craftsmen, soldiers, and priests. The settlement expanded, pushing deeper into the wilderness.

The Spanish Crown wanted us to convert the indigenous people to Christianity and make them subjects of King Philip II. Some missionaries succeeded in baptizing Timucua families, but others resisted, clinging to their old ways and gods.

I often wondered what Ahone thought about all this—his world changing so rapidly, his people's land filling with strangers who spoke of a distant king and demanded obedience. When I asked him once, he simply said, "The world has always been changing, Mateo. The question is whether we change with it or are swept away."`,
        },
        {
          title: "Two Worlds Collide",
          content: `By my second year in St. Augustine, I understood that we were not just building a settlement—we were building an empire. Spain claimed this land, and settlements like ours were the foundation of that claim.

Father explained that England had established Jamestown to the north, just a few years ago. Like us, they struggled to survive, depending on the indigenous Powhatan people for food and knowledge. Like us, they came seeking riches, land, and glory for their kingdom.

I realized then that this "New World" was not new at all—it was ancient, with people who had lived here for generations beyond counting. What was new was us: the Spanish, the English, the French, all scrambling to plant our flags and claim what was never ours to claim.

Yet here I am, part of this great collision of worlds. My children will be born in this land, speaking Spanish but living lives my grandparents in Seville could never imagine. We are creating something new from the meeting of old worlds—though at what cost, I'm still not sure.`,
        },
        {
          title: "Reflections on Settlement",
          content: `Looking back now, I see the pattern clearly. Both Spanish St. Augustine and English Jamestown were established for similar reasons: to claim territory, find wealth, spread religion, and expand empires. We both struggled through harsh conditions, disease, and starvation.

We both depended on indigenous peoples for survival, yet both of our nations sought to dominate them. The Spanish used the *encomienda* system, forcing indigenous people to labor in exchange for supposed "protection" and religious instruction. The English in Jamestown would soon develop similar exploitative relationships with the Powhatan.

What makes me sad is how little we learn from each other's humanity. The Timucua, the Powhatan—they are not obstacles to overcome or resources to exploit. They are people with their own rich cultures, histories, and rights to this land.

Father once told me that history is written by those who build the strongest settlements and win the most battles. But I wonder: what will history say about us? Will it remember the bravery of exploration, or the tragedy of conquest? Will it honor the Timucua and Powhatan voices, or silence them beneath the weight of European ambition?

These are the questions I carry with me as I grow into manhood in this New World—questions that have no easy answers, but must be asked nonetheless.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc-1",
        term: "St. Augustine",
        definition: "The oldest continuously occupied European-established settlement in the continental United States, founded by the Spanish in 1565 in present-day Florida.",
      },
      {
        id: "fc-2",
        term: "Jamestown",
        definition: "The first permanent English settlement in North America, established in 1607 in present-day Virginia.",
      },
      {
        id: "fc-3",
        term: "Conquistador",
        definition: "Spanish soldiers and explorers who conquered territories in the Americas for Spain during the Age of Exploration.",
      },
      {
        id: "fc-4",
        term: "Joint-Stock Company",
        definition: "A business entity where investors pool their money to fund expeditions and settlements, sharing both risks and profits. The Virginia Company of London funded Jamestown.",
      },
      {
        id: "fc-5",
        term: "Timucua",
        definition: "Indigenous people who lived in present-day northern Florida and southeastern Georgia when the Spanish arrived.",
      },
      {
        id: "fc-6",
        term: "Powhatan",
        definition: "A confederation of indigenous tribes in the Virginia region, led by Chief Powhatan, who interacted with the Jamestown settlers.",
      },
      {
        id: "fc-7",
        term: "Encomienda System",
        definition: "A Spanish labor system where colonists were granted authority over indigenous people, supposedly to protect and convert them, but often led to forced labor and exploitation.",
      },
      {
        id: "fc-8",
        term: "Columbian Exchange",
        definition: "The widespread transfer of plants, animals, culture, populations, technology, and ideas between the Americas and the Old World following Columbus's voyages.",
      },
    ],
    quiz: [
      {
        id: "q-1",
        question: "When was St. Augustine founded, and which European nation established it?",
        options: [
          "1607, England",
          "1565, Spain",
          "1620, France",
          "1492, Portugal",
        ],
        correctOptionIndex: 1,
        explanation: "St. Augustine was founded by the Spanish in 1565, making it the oldest continuously occupied European settlement in the continental United States—42 years before Jamestown.",
      },
      {
        id: "q-2",
        question: "What was the primary motivation for both Spanish and English settlement in the Americas?",
        options: [
          "Scientific research and exploration",
          "Escaping religious persecution only",
          "Claiming territory, finding wealth, spreading religion, and expanding empires",
          "Establishing trade routes with Asia",
        ],
        correctOptionIndex: 2,
        explanation: "Both Spain and England sought to claim new territories, find wealth (especially gold and resources), spread Christianity, and expand their imperial power. These overlapping motivations drove colonization efforts.",
      },
      {
        id: "q-3",
        question: "How did early European settlers in both St. Augustine and Jamestown survive their first difficult years?",
        options: [
          "By bringing enough supplies from Europe",
          "By relying heavily on help from indigenous peoples",
          "By trading exclusively with other European settlements",
          "By immediately finding gold and resources",
        ],
        correctOptionIndex: 1,
        explanation: "Both settlements struggled with starvation, disease, and harsh conditions. They survived largely due to assistance from indigenous peoples who taught them about local foods, farming techniques, and survival skills.",
      },
      {
        id: "q-4",
        question: "What was the encomienda system used by the Spanish?",
        options: [
          "A fair trading system with indigenous peoples",
          "A religious education program for settlers",
          "A labor system that granted colonists authority over indigenous people, often leading to exploitation",
          "A method of democratic government in settlements",
        ],
        correctOptionIndex: 2,
        explanation: "The encomienda system granted Spanish colonists control over indigenous people, supposedly to protect and convert them to Christianity. In practice, it often resulted in forced labor and exploitation.",
      },
      {
        id: "q-5",
        question: "Which indigenous group lived in the area around St. Augustine when the Spanish arrived?",
        options: [
          "The Powhatan",
          "The Timucua",
          "The Cherokee",
          "The Apache",
        ],
        correctOptionIndex: 1,
        explanation: "The Timucua people inhabited northern Florida and southeastern Georgia. They had complex societies and initially helped the Spanish settlers survive, though relationships became strained.",
      },
      {
        id: "q-6",
        question: "What does Mateo's reflection suggest about the 'New World' label?",
        options: [
          "It was accurate because no one had lived there before",
          "It was misleading because indigenous peoples had lived there for generations",
          "It only referred to new animals and plants",
          "It was used only by the English, not the Spanish",
        ],
        correctOptionIndex: 1,
        explanation: "Mateo realizes the 'New World' was only new to Europeans—indigenous peoples had thriving civilizations there for countless generations. The term reflects a European-centric perspective.",
      },
      {
        id: "q-7",
        question: "What funded the Jamestown settlement?",
        options: [
          "The Spanish monarchy",
          "Individual wealthy explorers",
          "The Virginia Company of London, a joint-stock company",
          "The French government",
        ],
        correctOptionIndex: 2,
        explanation: "Jamestown was funded by the Virginia Company of London, a joint-stock company where investors pooled resources hoping to profit from the settlement's success.",
      },
      {
        id: "q-8",
        question: "According to the story, what similar pattern did both Spanish and English settlements follow?",
        options: [
          "Both immediately made peace with indigenous peoples",
          "Both struggled with survival, depended on indigenous help, yet sought to dominate them",
          "Both focused only on farming and avoided conflict",
          "Both abandoned their settlements within a year",
        ],
        correctOptionIndex: 1,
        explanation: "Both settlements faced harsh conditions and relied on indigenous knowledge for survival. Yet both colonial powers also sought to control and exploit indigenous peoples, creating tragic contradictions.",
      },
    ],
  },

  // LESSON 2: Survival in Jamestown
  {
    id: "lesson-2",
    title: "Survival in Jamestown",
    description: "The Struggles of the First Permanent English Colony (1607-1620)",
    heroImage: "/images/hero-jamestown.jpg",
    story: {
      narrator: "Samuel, age 14, an indentured servant in Jamestown, 1609",
      chapters: [
        {
          title: "Arrival in Virginia",
          content: `My name is Samuel, and I am fourteen years old. I came to Virginia as an indentured servant, bound to work for seven years in exchange for passage to this new land. The Virginia Company promised riches and opportunity, but what I found was something very different.

When our ship sailed up the James River in the spring of 1609, I saw a small fort surrounded by endless forests. About 200 colonists lived here, and they looked thin and weary. The gentlemen who led us wore fine clothes but knew nothing of farming or building. They expected to find gold like the Spanish had in Mexico.

Captain John Smith ran the colony with strict rules: "He who does not work, shall not eat." This angered many of the gentlemen who thought manual labor beneath them. But Smith knew we had to work together to survive, or we would all perish.

The fort's walls were made of logs, and inside stood a church, a storehouse, and crude houses. Beyond the walls lived the Powhatan people, led by their powerful chief. We depended on them for corn and knowledge of this strange land.`,
        },
        {
          title: "The Starving Time",
          content: `The winter of 1609 brought horror beyond imagination. We called it the "Starving Time." Captain Smith had been injured and returned to England, leaving us without strong leadership. The Powhatans, tired of our demands for food, stopped trading with us and surrounded the fort.

We were trapped. We ate our horses first, then rats and mice. When those ran out, we boiled our leather boots and belts. People died every day—from hunger, from disease, from despair. Of the 500 colonists who started that winter, only 60 of us survived to see spring.

I survived by eating anything I could find. I dug for roots outside the fort walls at night, risking attack. I watched friends waste away, their eyes hollow and their bodies skeletal. We buried so many people that we ran out of space in the graveyard.

In May 1610, supply ships arrived. Lord De La Warr brought food, new colonists, and renewed hope. We had been ready to abandon Jamestown and return to England, but these supplies saved the colony. Still, the memory of that winter haunts me even now.`,
        },
        {
          title: "Tobacco Saves the Colony",
          content: `A man named John Rolfe changed everything when he began growing tobacco. He experimented with seeds from the Caribbean, creating a variety that grew well in Virginia's soil and tasted sweet when smoked. The English couldn't get enough of it.

Suddenly, we had found our gold—not the metal kind, but green leaves that brought profit. Everyone wanted to grow tobacco. Fields replaced forests. Even the streets of Jamestown were plowed up to plant more. We shipped barrel after barrel to England, and money poured back.

But tobacco required intense labor. The work was backbreaking: planting, weeding, picking, curing. We indentured servants worked from sunrise to sunset. The Virginia Company brought more and more servants from England—poor people like me who traded years of their lives for a chance in America.

John Rolfe also married Pocahontas, daughter of Chief Powhatan. This marriage brought peace between us and the Powhatans, at least for a while. She took the Christian name Rebecca and even traveled to England, where she was treated like royalty. Her marriage showed that perhaps our two peoples could coexist.`,
        },
        {
          title: "The First Representative Government",
          content: `In 1619, something remarkable happened. The Virginia Company allowed us to form the House of Burgesses, the first representative assembly in the American colonies. We could elect burgesses to make local laws, as long as they didn't contradict the company's rules or English law.

For the first time, colonists had a voice in their own government. We discussed matters like tobacco prices, land distribution, and relations with the Powhatans. It wasn't full democracy—only property-owning men could vote—but it was a start. This small seed of self-government would grow over time.

That same year, a Dutch ship arrived carrying about twenty Africans. They were sold as indentured servants, like me, expected to work for a set number of years and then be free. We didn't know it then, but this marked the beginning of something dark—the system of slavery that would eventually replace indentured servitude.

Now, as I near the end of my seven years of service, I look at Jamestown with mixed feelings. We survived the impossible. We created a permanent English colony in America. But at what cost? So many died. We took land from the Powhatans. And I fear the seeds of slavery we've planted will bear bitter fruit.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc2-1",
        term: "Jamestown",
        definition: "The first permanent English settlement in North America, established in 1607 in present-day Virginia by the Virginia Company.",
      },
      {
        id: "fc2-2",
        term: "Virginia Company",
        definition: "A joint-stock company chartered by King James I to establish colonies in America. Investors hoped to profit from gold and other resources.",
      },
      {
        id: "fc2-3",
        term: "John Smith",
        definition: "An English soldier and explorer who helped Jamestown survive its early years through strict discipline and trade with the Powhatans.",
      },
      {
        id: "fc2-4",
        term: "Starving Time",
        definition: "The winter of 1609-1610 in Jamestown when disease, starvation, and conflict with Native Americans killed about 440 of 500 colonists.",
      },
      {
        id: "fc2-5",
        term: "Pocahontas",
        definition: "Daughter of Powhatan chief who aided early Jamestown colonists and later married John Rolfe, helping establish peaceful relations.",
      },
      {
        id: "fc2-6",
        term: "Tobacco",
        definition: "The cash crop that saved Jamestown's economy. John Rolfe developed a marketable variety that became hugely profitable in England.",
      },
      {
        id: "fc2-7",
        term: "House of Burgesses",
        definition: "Established in 1619, the first representative legislative assembly in the American colonies, allowing colonists to make local laws.",
      },
      {
        id: "fc2-8",
        term: "Indentured Servant",
        definition: "A person who agreed to work for a set period (usually 4-7 years) in exchange for passage to America, room, and board.",
      },
    ],
    quiz: [
      {
        id: "q2-1",
        question: "What was the main reason so many Jamestown colonists died during the Starving Time?",
        options: [
          "A hurricane destroyed their crops",
          "Lack of leadership, food shortages, and conflict with Powhatans trapped them in the fort",
          "They were attacked by Spanish soldiers",
          "A plague swept through the colony",
        ],
        correctOptionIndex: 1,
        explanation: "The Starving Time occurred when Captain John Smith left, the Powhatans stopped trading and surrounded the fort, and colonists ran out of food. Poor leadership and being trapped led to the deaths of about 440 out of 500 colonists.",
      },
      {
        id: "q2-2",
        question: "What crop saved Jamestown's economy and made it profitable?",
        options: [
          "Cotton",
          "Rice",
          "Tobacco",
          "Wheat",
        ],
        correctOptionIndex: 2,
        explanation: "John Rolfe's cultivation of tobacco transformed Jamestown from a failing colony into a profitable venture. Tobacco became Virginia's 'gold,' creating wealth and attracting more settlers.",
      },
      {
        id: "q2-3",
        question: "Why was the House of Burgesses significant?",
        options: [
          "It was the first hospital in the colonies",
          "It was the first representative assembly in the American colonies",
          "It was a trading company",
          "It was a military fort",
        ],
        correctOptionIndex: 1,
        explanation: "The House of Burgesses, established in 1619, was the first representative legislative assembly in America. It allowed colonists to elect representatives to make local laws, planting the seed of self-government.",
      },
      {
        id: "q2-4",
        question: "What rule did Captain John Smith enforce to ensure survival?",
        options: [
          "Everyone must attend church daily",
          "He who does not work, shall not eat",
          "All gold must be given to the company",
          "No one may leave the fort",
        ],
        correctOptionIndex: 1,
        explanation: "Captain Smith's rule 'He who does not work, shall not eat' forced even gentlemen to contribute to the colony's survival through manual labor, which was essential during the difficult early years.",
      },
      {
        id: "q2-5",
        question: "How did Pocahontas contribute to Jamestown's survival?",
        options: [
          "She taught colonists to grow tobacco",
          "She led military attacks against enemy tribes",
          "She helped establish peace between colonists and Powhatans through her marriage to John Rolfe",
          "She funded the Virginia Company",
        ],
        correctOptionIndex: 2,
        explanation: "Pocahontas's marriage to John Rolfe in 1614 helped create peace between the English colonists and the Powhatan Confederacy, reducing conflict and enabling trade that was vital for survival.",
      },
      {
        id: "q2-6",
        question: "What significant event happened in Jamestown in 1619 regarding Africans?",
        options: [
          "Slavery was officially abolished",
          "About twenty Africans arrived and were sold as indentured servants",
          "The first African governor was elected",
          "Africans were granted full citizenship",
        ],
        correctOptionIndex: 1,
        explanation: "In 1619, a Dutch ship brought approximately twenty Africans to Jamestown, where they were sold as indentured servants. This marked the beginning of African presence in English North America, which would eventually lead to the institution of slavery.",
      },
    ],
  },

  // LESSON 3: The Mayflower Compact
  {
    id: "lesson-3",
    title: "The Mayflower Compact",
    description: "Plymouth Colony and the Pilgrims (1620-1630)",
    heroImage: "/images/hero-mayflower.jpg",
    story: {
      narrator: "Elizabeth, age 12, a Pilgrim aboard the Mayflower, 1620",
      chapters: [
        {
          title: "Separating from the Church",
          content: `My name is Elizabeth, and I am twelve years old. My family are Separatists—we broke away from the Church of England because we believe it is corrupt. In England, this belief made us criminals. We could be jailed, fined, or worse for refusing to attend the official church.

For years, we lived in Holland, where we could worship freely. But Holland felt foreign to us. My parents worried we were losing our English ways and that I might grow up more Dutch than English. So when the Virginia Company offered us a chance to settle in America, we decided to go.

Not all of us were Separatists—we called ourselves "Saints," and we called the others "Strangers." The Strangers came for land and opportunity, not religious freedom. This caused tension aboard our ship, the Mayflower, as we crossed the Atlantic Ocean.

The voyage was terrible. For sixty-six days, we were crammed below deck in a dark, damp space. The ship pitched and rolled. People were seasick constantly. Two people died during the crossing, but one baby was born—they named him Oceanus because he was born at sea.`,
        },
        {
          title: "The Mayflower Compact",
          content: `When we finally sighted land, we faced an immediate problem: we were far north of Virginia, outside the Virginia Company's territory. This meant we had no legal government. Some of the Strangers said they would do as they pleased since no laws bound them here.

Our leaders knew this could lead to chaos. So before we even left the ship, forty-one men (including my father) gathered in the Mayflower's cabin. They wrote and signed the Mayflower Compact, agreeing to form a government and obey its laws for the good of the colony.

The Compact stated that we would create "just and equal laws" for the general good. It wasn't complete democracy—women and servants couldn't sign it—but it was a remarkable agreement. We were creating our own government by consent of the governed, not by order of a king.

William Bradford became our governor. He would lead us through the darkest times ahead and write the history of our colony. The Compact became the foundation of Plymouth Colony's government and an important precedent for self-government in America.`,
        },
        {
          title: "The First Winter",
          content: `We arrived in November, far too late to plant crops. We had to build shelter before winter's full fury struck. The men worked desperately to construct a common house and a few small homes, but progress was slow in the cold.

That first winter was our starving time. We had little food and inadequate shelter. A terrible sickness swept through us—probably a combination of scurvy, pneumonia, and typhus. People died almost every day. By spring, half of our 102 passengers were dead, including my mother.

I helped care for the sick, though I was just a child. I watched Father and the other survivors dig graves in the frozen ground. We buried our dead secretly at night so the native people wouldn't know how weak we'd become. We feared they might attack if they knew half of us had perished.

Only four women survived that winter. My aunt became like a mother to me. We lived in constant fear and grief, wondering if we'd made a terrible mistake in coming to this harsh land. Many times I wished we'd stayed in Holland, even if it meant not being fully English.`,
        },
        {
          title: "Help from Squanto",
          content: `In March, an amazing thing happened. A Native American man walked into our settlement and greeted us in English! His name was Samoset, and he brought us to meet Massasoit, the leader of the Wampanoag people.

Massasoit brought with him a man named Squanto, whose story was heartbreaking. Squanto had been kidnapped by English traders years before, taken to Europe, and eventually made his way back home—only to find his entire village wiped out by disease. He was the last of his people.

Despite everything the English had done to him, Squanto chose to help us. He taught us how to plant corn using fish as fertilizer. He showed us where to find clams and eels. He taught us which plants were safe to eat and how to tap maple trees for syrup. Without his help, we would have died that second year.

We made a peace treaty with Massasoit that lasted over fifty years. In autumn of 1621, after our first successful harvest, we held a feast to celebrate. Massasoit and ninety of his men joined us for three days of eating and thanksgiving. This feast became the memory we now call the First Thanksgiving, though we didn't call it that then.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc3-1",
        term: "Pilgrims",
        definition: "English Separatists who left England for religious freedom, first to Holland and then to America aboard the Mayflower in 1620.",
      },
      {
        id: "fc3-2",
        term: "Separatists",
        definition: "Christians who wanted to separate completely from the Church of England, believing it was too similar to the Catholic Church.",
      },
      {
        id: "fc3-3",
        term: "Mayflower",
        definition: "The ship that carried 102 Pilgrims across the Atlantic Ocean to America in 1620, a journey that took 66 days.",
      },
      {
        id: "fc3-4",
        term: "Mayflower Compact",
        definition: "An agreement signed in 1620 by 41 male Pilgrims to create a government and obey its laws, an important step toward self-government.",
      },
      {
        id: "fc3-5",
        term: "Plymouth Colony",
        definition: "The second permanent English colony in America, established by the Pilgrims in present-day Massachusetts in 1620.",
      },
      {
        id: "fc3-6",
        term: "William Bradford",
        definition: "The governor of Plymouth Colony who led the Pilgrims through difficult times and wrote a history of the colony.",
      },
      {
        id: "fc3-7",
        term: "Squanto",
        definition: "A Patuxet Native American who helped the Pilgrims survive by teaching them farming and serving as interpreter with local tribes.",
      },
      {
        id: "fc3-8",
        term: "Massasoit",
        definition: "Leader of the Wampanoag people who made a peace treaty with the Pilgrims that lasted more than fifty years.",
      },
    ],
    quiz: [
      {
        id: "q3-1",
        question: "Why did the Pilgrims leave England?",
        options: [
          "To find gold",
          "To seek religious freedom as Separatists from the Church of England",
          "Because they were criminals",
          "To escape poverty",
        ],
        correctOptionIndex: 1,
        explanation: "The Pilgrims were Separatists who believed the Church of England was corrupt and wanted to worship according to their own beliefs. This was illegal in England, so they fled first to Holland and then to America.",
      },
      {
        id: "q3-2",
        question: "Why was the Mayflower Compact significant?",
        options: [
          "It was the first constitution in the world",
          "It established a representative government based on consent of the governed",
          "It declared independence from England",
          "It abolished slavery",
        ],
        correctOptionIndex: 1,
        explanation: "The Mayflower Compact was significant because the Pilgrims created their own government by mutual agreement, not by royal decree. It established the principle of self-government and consent of the governed.",
      },
      {
        id: "q3-3",
        question: "How many of the original Mayflower passengers survived the first winter?",
        options: [
          "All of them",
          "About three-quarters",
          "About half",
          "Almost none",
        ],
        correctOptionIndex: 2,
        explanation: "About half of the 102 Mayflower passengers died during the first winter from disease, cold, and malnutrition. Only 53 survived to see the spring of 1621.",
      },
      {
        id: "q3-4",
        question: "How did Squanto help the Pilgrims?",
        options: [
          "He gave them gold",
          "He taught them farming techniques and how to find food",
          "He built their houses",
          "He became their military leader",
        ],
        correctOptionIndex: 1,
        explanation: "Squanto taught the Pilgrims crucial survival skills including how to plant corn with fish fertilizer, where to find seafood, and which native plants were edible. His help was essential to their survival.",
      },
      {
        id: "q3-5",
        question: "What was celebrated at the First Thanksgiving in 1621?",
        options: [
          "The signing of the Mayflower Compact",
          "The arrival of the Mayflower",
          "A successful harvest after a year of hardship",
          "Peace with all Native American tribes",
        ],
        correctOptionIndex: 2,
        explanation: "The First Thanksgiving was a three-day feast celebrating the Pilgrims' successful harvest after a year of devastating losses. It included both Pilgrims and Wampanoag people, including Massasoit.",
      },
      {
        id: "q3-6",
        question: "Why did the Pilgrims need to create the Mayflower Compact?",
        options: [
          "The king ordered them to",
          "They landed outside Virginia Company territory and had no legal government",
          "They wanted to declare independence",
          "It was required by the ship's captain",
        ],
        correctOptionIndex: 1,
        explanation: "The Pilgrims landed in New England, far north of their intended destination in Virginia. Since they were outside Virginia Company territory, they had no legal authority or government, so they created their own through the Compact.",
      },
    ],
  },

  // LESSON 4: City Upon a Hill
  {
    id: "lesson-4",
    title: "City Upon a Hill",
    description: "The Massachusetts Bay Colony (1630-1650)",
    heroImage: "/images/hero-massachusetts.jpg",
    story: {
      narrator: "John, age 13, son of a Puritan minister in Boston, 1630",
      chapters: [
        {
          title: "A Holy Experiment",
          content: `My name is John, and I am thirteen years old. My father is a Puritan minister who came to Massachusetts Bay with Governor John Winthrop. Unlike the Pilgrims at Plymouth, we didn't want to separate from the Church of England—we wanted to purify it from within.

Governor Winthrop told us we were building a "city upon a hill," a model Christian community that the world would look to as an example. This was not just about religious freedom for us—it was about creating God's perfect society in the New World.

We arrived with about 1,000 colonists, far more than Plymouth started with. We had money, supplies, and educated leaders. The Massachusetts Bay Company charter gave us the right to govern ourselves, and we brought the charter with us to America. This meant England couldn't easily control us from across the ocean.

But our "freedom" came with strict rules. Everyone had to attend our Puritan church. We had no tolerance for other beliefs. Father says that true freedom means freedom to do what is right, not freedom to do what is wrong. I sometimes wonder about this.`,
        },
        {
          title: "Roger Williams and Anne Hutchinson",
          content: `Not everyone agreed with our strict ways. Roger Williams, a young minister, preached that the government shouldn't enforce religious laws. He said colonists should pay Native Americans for their land, not just take it. He believed in separation of church and state.

The authorities banished him. He fled south in winter and was saved by the Narragansett people. He founded Rhode Island, where people could worship freely. Some called it "Rogue's Island" because it tolerated all beliefs.

Then came Anne Hutchinson. She held Bible study meetings in her home where she questioned some of our ministers' teachings. Women listened to her ideas about salvation and grace. The authorities said she was dangerous—how could a woman presume to teach theology?

They put her on trial. I watched from the back of the meetinghouse as she defended herself brilliantly, using Scripture to answer every charge. But it didn't matter. They banished her too. She went to Rhode Island, and later to New York, where she was killed in a raid. Many said it was God's judgment, but I wonder if God really punishes people for thinking differently.`,
        },
        {
          title: "The Puritan Way of Life",
          content: `Our colony thrived despite these controversies. We built towns around meetinghouses and common greens. Education mattered deeply to us—every town with 50 families had to hire a schoolmaster. In 1636, we founded Harvard College to train ministers.

We established a covenant community where church members could vote and hold office. It wasn't democracy for everyone—you had to be a male church member—but it gave many men a voice in government. Our town meetings became a foundation of American self-government.

We created laws based on the Bible, our "Puritan ethic" of hard work, thrift, and moral living. We wore plain clothes, avoided frivolity, and worked six days a week. Sunday was the Sabbath—a day of rest and worship where no work was permitted.

By 1640, about 20,000 colonists lived in Massachusetts Bay. We were the largest and most powerful New England colony. But I've learned that building a "city upon a hill" is harder than it sounds. How do you create a perfect society when people disagree about what perfection means?`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc4-1",
        term: "Puritans",
        definition: "English Protestants who wanted to 'purify' the Church of England from Catholic practices. Unlike Separatists, they wanted to reform the church from within.",
      },
      {
        id: "fc4-2",
        term: "John Winthrop",
        definition: "First governor of Massachusetts Bay Colony who envisioned the colony as a 'city upon a hill' - a model Christian community.",
      },
      {
        id: "fc4-3",
        term: "City Upon a Hill",
        definition: "John Winthrop's vision of Massachusetts Bay as a model society that the world would look to as an example of godly living.",
      },
      {
        id: "fc4-4",
        term: "Roger Williams",
        definition: "Puritan minister who advocated for religious freedom and separation of church and state. Banished from Massachusetts, he founded Rhode Island.",
      },
      {
        id: "fc4-5",
        term: "Anne Hutchinson",
        definition: "Puritan woman who held religious meetings and challenged church authority. She was tried and banished for her beliefs.",
      },
      {
        id: "fc4-6",
        term: "Harvard College",
        definition: "Founded in 1636, the first college in the American colonies, established primarily to train Puritan ministers.",
      },
      {
        id: "fc4-7",
        term: "Town Meeting",
        definition: "A form of local government in New England where male church members gathered to make decisions and pass laws for their community.",
      },
      {
        id: "fc4-8",
        term: "Covenant Community",
        definition: "A society based on agreement among members to live according to certain religious and moral principles.",
      },
    ],
    quiz: [
      {
        id: "q4-1",
        question: "How did Puritans differ from Separatists (Pilgrims)?",
        options: [
          "Puritans wanted to purify the Church of England from within, not separate from it",
          "Puritans were Catholic",
          "Puritans didn't believe in God",
          "There was no difference",
        ],
        correctOptionIndex: 0,
        explanation: "While Separatists (Pilgrims) broke away from the Church of England completely, Puritans wanted to reform and purify it from within while remaining members.",
      },
      {
        id: "q4-2",
        question: "What did John Winthrop mean by 'city upon a hill'?",
        options: [
          "They were building on a literal mountain",
          "A model Christian community that the world would look to as an example",
          "A military fortress",
          "A trading post",
        ],
        correctOptionIndex: 1,
        explanation: "Winthrop used this Biblical phrase to describe his vision of Massachusetts Bay as a perfect Christian society that would serve as an example to the world.",
      },
      {
        id: "q4-3",
        question: "Why was Roger Williams banished from Massachusetts?",
        options: [
          "He committed a crime",
          "He advocated for religious freedom and separation of church and state",
          "He refused to work",
          "He was not a Christian",
        ],
        correctOptionIndex: 1,
        explanation: "Roger Williams was banished because he preached controversial ideas including religious tolerance, separation of church and state, and fair treatment of Native Americans.",
      },
      {
        id: "q4-4",
        question: "What colony did Roger Williams found after being banished?",
        options: [
          "Connecticut",
          "New Hampshire",
          "Rhode Island",
          "Virginia",
        ],
        correctOptionIndex: 2,
        explanation: "After being banished from Massachusetts, Roger Williams founded Rhode Island, which became known for religious tolerance and separation of church and state.",
      },
      {
        id: "q4-5",
        question: "Why was Anne Hutchinson controversial in Massachusetts Bay?",
        options: [
          "She was a successful businesswoman",
          "She held religious meetings and challenged church authority as a woman",
          "She refused to attend church",
          "She was from England",
        ],
        correctOptionIndex: 1,
        explanation: "Anne Hutchinson challenged Puritan authorities by holding Bible study meetings, teaching theology, and questioning ministers' interpretations—actions considered inappropriate for a woman in Puritan society.",
      },
      {
        id: "q4-6",
        question: "What was significant about Harvard College, founded in 1636?",
        options: [
          "It was the first hospital in America",
          "It was the first college in the American colonies",
          "It was a military academy",
          "It was only for Native Americans",
        ],
        correctOptionIndex: 1,
        explanation: "Harvard College, founded in 1636, was the first institution of higher education in the American colonies, established primarily to train Puritan ministers.",
      },
      {
        id: "q4-7",
        question: "What was the purpose of town meetings in Massachusetts Bay?",
        options: [
          "Social gatherings for entertainment",
          "Religious services only",
          "Local self-government where male church members made decisions",
          "Trading centers",
        ],
        correctOptionIndex: 2,
        explanation: "Town meetings were a form of local democracy where male church members gathered to discuss issues, pass laws, and make decisions for their community, establishing an important tradition of self-government.",
      },
      {
        id: "q4-8",
        question: "By 1640, how many colonists lived in Massachusetts Bay Colony?",
        options: [
          "About 500",
          "About 2,000",
          "About 20,000",
          "About 100,000",
        ],
        correctOptionIndex: 2,
        explanation: "By 1640, Massachusetts Bay Colony had grown to about 20,000 colonists, making it the largest and most powerful of the New England colonies.",
      },
    ],
  },

  // LESSON 5: Diversity in the Colonies
  {
    id: "lesson-5",
    title: "Diversity in the Colonies",
    description: "The Middle Colonies: New York, Pennsylvania, New Jersey, Delaware (1664-1700)",
    heroImage: "/images/hero-middle-colonies.jpg",
    story: {
      narrator: "Maria, age 14, daughter of a Dutch merchant in New York, 1680",
      chapters: [
        {
          title: "From New Netherland to New York",
          content: `My name is Maria, and I am fourteen years old. I live in New York, though my family still calls it by its old name: New Amsterdam. My parents are Dutch, and they remember when this colony belonged to the Netherlands, not England.

In 1664, when I was very young, English ships sailed into our harbor. Our governor, Peter Stuyvesant, wanted to fight, but the English had more guns and more ships. The Dutch citizens convinced him to surrender peacefully. We didn't want our town destroyed in a war we couldn't win.

The English renamed everything. New Amsterdam became New York, after the Duke of York. New Netherland became New York colony. But they let us Dutch keep our land, our language, and our customs. My family still speaks Dutch at home, celebrates Sint Nikolaas in December, and bakes oliebollen for New Year's.

Our city is the most diverse place in all the colonies. I hear English, Dutch, French, German, and languages from Africa in the streets. We have Lutherans, Anglicans, Catholics, Jews, and Quakers all living together. My father says this diversity makes us stronger, not weaker. We learn from each other and trade with everyone.`,
        },
        {
          title: "Penn's Holy Experiment",
          content: `My uncle moved to Pennsylvania, the new colony founded by William Penn, a Quaker. The Quakers are strange to us—they believe everyone is equal before God, they refuse to take oaths or fight in wars, and they let women preach in their meetings. In England, they're persecuted for these beliefs.

Penn got a huge land grant from King Charles II to pay off a debt the king owed Penn's father. Penn wanted to create a "holy experiment"—a place where people could worship freely and live in peace. He called his capital Philadelphia, which means "city of brotherly love."

Penn did something remarkable: he insisted on paying the Delaware Indians fairly for their land. He made treaties with them and tried to live in peace. His Quaker beliefs taught that all people were equal and that violence was wrong. For many years, Pennsylvania had better relations with Native Americans than any other colony.

Uncle writes that Pennsylvania attracts people from everywhere: English Quakers, German Lutherans, Scotch-Irish Presbyterians, Welsh Baptists. Like New York, it's a place where different people live together. The Middle Colonies are becoming known as the "bread basket" because we grow so much wheat and grain.`,
        },
        {
          title: "A Different Kind of Colony",
          content: `The Middle Colonies are different from New England and the South. In New England, the Puritans control everything—religion, government, daily life. They don't tolerate other beliefs. In Virginia and the South, wealthy plantation owners dominate, and slavery is growing.

But here in the middle, we have more freedom and more variety. We don't have one powerful church controlling everyone. We have many religions living side by side. We don't have huge plantations; we have family farms and busy port cities. We're not as strictly religious as New England, nor as dependent on slavery as the South.

Our economies are diverse too. New York has trade and shipping. Pennsylvania has farming and crafts. We export wheat, flour, bread—earning us the nickname "bread basket colonies." We also have lumber, furs, and iron. Our ports are busy with ships from around the world.

Father says the Middle Colonies represent America's future: a place where people from different backgrounds come together, where religious tolerance is valued, where trade and commerce create opportunity. I think he might be right. This diversity—people, religions, ideas—makes us strong and creative. We're building something new here, something the world hasn't seen before.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc5-1",
        term: "Middle Colonies",
        definition: "New York, Pennsylvania, New Jersey, and Delaware. Known for religious tolerance, diverse populations, and fertile farmland.",
      },
      {
        id: "fc5-2",
        term: "New Amsterdam",
        definition: "Dutch settlement that became New York City when the English took control in 1664. It was a diverse trading port.",
      },
      {
        id: "fc5-3",
        term: "William Penn",
        definition: "Quaker leader who founded Pennsylvania as a 'holy experiment' in religious tolerance and peaceful relations with Native Americans.",
      },
      {
        id: "fc5-4",
        term: "Quakers",
        definition: "Religious group that believed in equality of all people, refused to fight in wars, and allowed women to preach. They were persecuted in England.",
      },
      {
        id: "fc5-5",
        term: "Philadelphia",
        definition: "Capital of Pennsylvania, founded by William Penn. The name means 'city of brotherly love' in Greek.",
      },
      {
        id: "fc5-6",
        term: "Bread Basket Colonies",
        definition: "Nickname for the Middle Colonies because they grew large amounts of wheat and grain for export.",
      },
      {
        id: "fc5-7",
        term: "Religious Tolerance",
        definition: "The practice of allowing people of different faiths to worship freely without persecution.",
      },
      {
        id: "fc5-8",
        term: "Patroon System",
        definition: "Dutch land system where wealthy men received large estates if they brought 50 settlers to New Netherland.",
      },
    ],
    quiz: [
      {
        id: "q5-1",
        question: "What happened to New Amsterdam in 1664?",
        options: [
          "It was destroyed by fire",
          "The English took control and renamed it New York",
          "It became an independent nation",
          "The Spanish conquered it",
        ],
        correctOptionIndex: 1,
        explanation: "In 1664, the English took control of the Dutch colony New Amsterdam and renamed it New York after the Duke of York. The transition was peaceful, and the Dutch were allowed to keep their property and customs.",
      },
      {
        id: "q5-2",
        question: "Who founded Pennsylvania and why?",
        options: [
          "The Puritans, to establish strict religious control",
          "William Penn, as a Quaker 'holy experiment' in religious tolerance",
          "The Virginia Company, to grow tobacco",
          "Spanish missionaries, to convert Native Americans",
        ],
        correctOptionIndex: 1,
        explanation: "William Penn, a Quaker, founded Pennsylvania as a 'holy experiment' where people of all faiths could worship freely and live peacefully together.",
      },
      {
        id: "q5-3",
        question: "What made the Quakers different from other religious groups?",
        options: [
          "They worshipped the sun",
          "They believed in equality, refused violence, and allowed women to preach",
          "They didn't believe in God",
          "They only spoke Latin",
        ],
        correctOptionIndex: 1,
        explanation: "Quakers had radical beliefs for their time: they believed all people were equal before God, refused to fight in wars or take oaths, and allowed women to speak and preach in their meetings.",
      },
      {
        id: "q5-4",
        question: "Why were the Middle Colonies called the 'bread basket' colonies?",
        options: [
          "They made baskets for a living",
          "They grew large amounts of wheat and grain",
          "They stored all the food for other colonies",
          "They invented bread",
        ],
        correctOptionIndex: 1,
        explanation: "The Middle Colonies were called the 'bread basket' because their fertile soil and moderate climate allowed them to grow large quantities of wheat and grain, which they exported to other colonies and countries.",
      },
      {
        id: "q5-5",
        question: "How did William Penn treat Native Americans differently?",
        options: [
          "He tried to convert them by force",
          "He insisted on paying them fairly for land and making peace treaties",
          "He ignored them completely",
          "He fought wars against them immediately",
        ],
        correctOptionIndex: 1,
        explanation: "Unlike most colonists, William Penn insisted on paying the Delaware Indians fairly for their land and making treaties with them. His Quaker beliefs in equality and non-violence led to better relations with Native Americans.",
      },
      {
        id: "q5-6",
        question: "What made the Middle Colonies different from New England and the Southern colonies?",
        options: [
          "They had no government",
          "They had more religious diversity and tolerance",
          "They didn't allow trade",
          "They had no farms",
        ],
        correctOptionIndex: 1,
        explanation: "The Middle Colonies were known for their religious tolerance and diversity, unlike New England's Puritan control or the South's plantation economy. They attracted people of many different faiths and backgrounds.",
      },
      {
        id: "q5-7",
        question: "What does the name 'Philadelphia' mean?",
        options: [
          "Holy city",
          "New beginning",
          "City of brotherly love",
          "Penn's town",
        ],
        correctOptionIndex: 2,
        explanation: "Philadelphia means 'city of brotherly love' in Greek. William Penn chose this name to reflect his Quaker ideals of peace, equality, and religious tolerance.",
      },
      {
        id: "q5-8",
        question: "Why was New York considered diverse in the 1680s?",
        options: [
          "It had many different types of buildings",
          "People from many countries and religions lived there together",
          "It had diverse weather",
          "It grew many different crops",
        ],
        correctOptionIndex: 1,
        explanation: "New York was diverse because it had people from many countries (Dutch, English, French, German, African) and many religions (Lutheran, Anglican, Catholic, Jewish, Quaker) all living and trading together.",
      },
    ],
  },

  // LESSON 6: The Southern Way
  {
    id: "lesson-6",
    title: "The Southern Way",
    description: "Southern Colonies and the Growth of Slavery (1660-1700)",
    heroImage: "/images/hero-southern-colonies.jpg",
    story: {
      narrator: "Thomas, age 14, son of a small tobacco farmer in Virginia, 1690",
      chapters: [
        {
          title: "Life on a Small Farm",
          content: `My name is Thomas, and I am fourteen years old. My family owns a small tobacco farm in Virginia. We're not wealthy planters with hundreds of acres—we have just fifty acres and grow enough tobacco to make a modest living.

Unlike the huge plantations, we don't own enslaved workers. Father, my older brother William, and I do all the work ourselves. We plant in spring, tend the plants all summer, and harvest in fall. It's backbreaking work under the hot Virginia sun. Mother and my sister help with curing the tobacco leaves and running the household.

Most families in Virginia are like us—small farmers, not wealthy planters. But the big planters have the most power. They own thousands of acres and use enslaved African laborers to work their fields. These plantations produce most of Virginia's tobacco and make their owners very rich.

Father says the colony is changing. When he was young, most workers were indentured servants like in Jamestown. They worked for several years and then were free. But now, more and more planters are buying enslaved Africans who will never be free, nor will their children.`,
        },
        {
          title: "The Growth of Slavery",
          content: `Our neighbor, Mr. Randolph, is a wealthy planter. He owns a plantation with two hundred acres and twenty enslaved workers. I've seen them working in his fields from dawn to dusk, supervised by an overseer with a whip. The enslaved people live in small wooden cabins and grow their own food in small gardens.

Last month, a ship arrived from Africa with eighty enslaved people. Mr. Randolph bought three of them—two men and a woman. They looked terrified and exhausted. They didn't speak English and were separated from their families. Watching them, I felt sick to my stomach. Father saw my face and said quietly, "This is wrong, Thomas. But it's becoming the foundation of our colony's economy."

The laws are changing to make slavery permanent and hereditary. A new law says that children born to enslaved mothers will also be enslaved for life, no matter who the father is. Another law forbids enslaved people from carrying weapons, gathering in groups, or learning to read. These laws treat human beings as property, not people.

I asked Father why we don't speak out against slavery. He said quietly that those who do are shunned, lose business, and are called troublemakers. "The people who profit from slavery have all the power, Thomas. They make the laws in the House of Burgesses. They've convinced themselves it's acceptable because enslaved people are different from us. But that's a lie we tell ourselves to justify evil."`,
        },
        {
          title: "Different Souths",
          content: `The Southern colonies are different from each other. Virginia and Maryland grow tobacco. South Carolina grows rice and indigo in coastal swamps where the work is brutal and deadly. The Carolinas have more enslaved workers than free people in some areas. Georgia was actually founded as a haven for poor English people and initially banned slavery, but that didn't last long.

All Southern colonies have plantation economies, warm climates, and long growing seasons. The soil and climate are perfect for cash crops that sell for high prices in England: tobacco, rice, indigo, and later cotton. But these crops require intense labor, which is why planters turned to slavery.

The plantation system creates a rigid social structure. At the top are wealthy planters who own huge estates and enslaved workers. They control the government and make the laws. Below them are small farmers like my family. At the bottom are poor white workers and indentured servants. And below even them—treated not as people but as property—are the enslaved Africans.

This is different from New England, where most people are small farmers or merchants, or the Middle Colonies, where religious diversity and trade dominate. The South is building its wealth on slavery, and this choice will have terrible consequences that will echo for centuries.`,
        },
        {
          title: "Understanding the System",
          content: `I've been thinking a lot about what Father said. How did we get here? How did English colonists who came seeking freedom create a system that denies freedom to others?

Father explained that it started gradually. First, colonists used indentured servants. But servants eventually went free and wanted their own land. Then some planters tried enslaving Native Americans, but they could escape into familiar territory. African people, forcibly brought across the ocean, couldn't escape home.

Slavery became more profitable as tobacco cultivation grew. Planters convinced themselves that enslaved Africans were inferior, that slavery was somehow natural or even beneficial. They created laws making slavery hereditary and permanent. They built an entire economy on this cruel foundation.

But Father reminds me that slavery is a choice, not inevitable. The Northern colonies are moving away from slavery. Pennsylvania Quakers speak against it. Even some Southern colonists know it's wrong. "What we build now," Father says, "will shape what America becomes. And I fear we're building on sand and blood."

I'm only fourteen, but I understand that I'm witnessing something terrible—the creation of a system that will divide our nation. I wonder if future generations will judge us harshly for what we allowed to happen, for what we didn't stop when we could have.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc6-1",
        term: "Plantation",
        definition: "A large farm that grew cash crops like tobacco, rice, or indigo using enslaved labor. Plantations dominated the Southern economy.",
      },
      {
        id: "fc6-2",
        term: "Cash Crop",
        definition: "A crop grown primarily for sale and profit rather than for the farmer's own use. Examples include tobacco, rice, and indigo.",
      },
      {
        id: "fc6-3",
        term: "Slavery",
        definition: "A system in which people are treated as property, forced to work without pay, and denied freedom. In the American colonies, slavery was based on race.",
      },
      {
        id: "fc6-4",
        term: "Middle Passage",
        definition: "The horrific voyage that brought enslaved Africans across the Atlantic Ocean to the Americas. Millions died during this journey.",
      },
      {
        id: "fc6-5",
        term: "Indigo",
        definition: "A plant used to make blue dye, grown as a cash crop in South Carolina. It required intense labor and was cultivated by enslaved workers.",
      },
      {
        id: "fc6-6",
        term: "Overseer",
        definition: "A person hired by plantation owners to supervise enslaved workers and ensure productivity, often through harsh punishment.",
      },
      {
        id: "fc6-7",
        term: "Slave Codes",
        definition: "Laws passed in Southern colonies that controlled enslaved people, denied them rights, made slavery hereditary, and treated them as property.",
      },
      {
        id: "fc6-8",
        term: "Hereditary Slavery",
        definition: "Laws making slavery permanent and passed from enslaved mothers to their children for life, creating generations of enslaved families.",
      },
    ],
    quiz: [
      {
        id: "q6-1",
        question: "What were the main cash crops of the Southern colonies?",
        options: [
          "Wheat and corn",
          "Tobacco, rice, and indigo",
          "Cotton and sugar",
          "Potatoes and beans",
        ],
        correctOptionIndex: 1,
        explanation: "The Southern colonies' main cash crops were tobacco (Virginia and Maryland), rice (South Carolina), and indigo (South Carolina). These crops required intensive labor and were grown for profit.",
      },
      {
        id: "q6-2",
        question: "How did slavery in the Southern colonies differ from indentured servitude?",
        options: [
          "There was no difference",
          "Slavery was permanent and hereditary, while indentured servitude ended after several years",
          "Indentured servants were treated worse",
          "Slavery was temporary",
        ],
        correctOptionIndex: 1,
        explanation: "Unlike indentured servitude, which ended after 4-7 years, slavery was permanent and hereditary—enslaved people and their children would never be free. This made it fundamentally different and more profitable for slave owners.",
      },
      {
        id: "q6-3",
        question: "What were slave codes?",
        options: [
          "Secret languages enslaved people used",
          "Laws that gave enslaved people rights",
          "Laws that controlled enslaved people, denied them rights, and treated them as property",
          "Codes to help enslaved people escape",
        ],
        correctOptionIndex: 2,
        explanation: "Slave codes were laws passed in Southern colonies that controlled every aspect of enslaved people's lives, denied them basic rights, made slavery hereditary, and legally defined enslaved people as property rather than human beings.",
      },
      {
        id: "q6-4",
        question: "Why did Southern planters turn to enslaved African labor?",
        options: [
          "Because there were no other workers available",
          "Because it was more profitable than paying free workers or indentured servants who eventually went free",
          "Because enslaved Africans preferred plantation work",
          "Because the king required it",
        ],
        correctOptionIndex: 1,
        explanation: "Planters turned to enslaved African labor because it was more profitable. Unlike indentured servants who worked for a few years then went free, enslaved people and their children would work for life without pay.",
      },
      {
        id: "q6-5",
        question: "What was the Middle Passage?",
        options: [
          "A trade route between colonies",
          "A road through the Middle Colonies",
          "The horrific voyage bringing enslaved Africans across the Atlantic Ocean",
          "A pathway through plantations",
        ],
        correctOptionIndex: 2,
        explanation: "The Middle Passage was the brutal ocean voyage that forcibly brought millions of enslaved Africans to the Americas. Conditions were horrific, and millions died during the journey.",
      },
      {
        id: "q6-6",
        question: "How did the plantation system affect Southern society?",
        options: [
          "It created equality for everyone",
          "It created a rigid social structure with wealthy planters at top and enslaved people at bottom",
          "It had no effect on society",
          "It made everyone equally wealthy",
        ],
        correctOptionIndex: 1,
        explanation: "The plantation system created a rigid social hierarchy: wealthy planters who owned land and enslaved people held all power; small farmers, indentured servants, and poor whites were in the middle; and enslaved Africans were at the bottom, treated as property.",
      },
      {
        id: "q6-7",
        question: "What made slavery hereditary?",
        options: [
          "Laws saying children born to enslaved mothers would also be enslaved",
          "Enslaved people chose to pass slavery to their children",
          "It wasn't hereditary",
          "Only enslaved fathers passed slavery to children",
        ],
        correctOptionIndex: 0,
        explanation: "Colonial laws made slavery hereditary by declaring that children born to enslaved mothers would automatically be enslaved for life, regardless of who the father was. This ensured that slavery would continue for generations.",
      },
      {
        id: "q6-8",
        question: "According to the story, how did some colonists justify slavery to themselves?",
        options: [
          "They didn't try to justify it",
          "They convinced themselves enslaved Africans were inferior and slavery was acceptable",
          "They admitted it was wrong but did it anyway",
          "They believed enslaved people wanted to be enslaved",
        ],
        correctOptionIndex: 1,
        explanation: "As the story explains, colonists created false beliefs about racial inferiority to justify the immoral system of slavery. They convinced themselves slavery was acceptable rather than confronting its evil.",
      },
    ],
  },

  // LESSON 7: Triangular Trade
  {
    id: "lesson-7",
    title: "Triangular Trade",
    description: "Colonial Economy and Atlantic Trade (1650-1750)",
    heroImage: "/images/hero-trade.jpg",
    story: {
      narrator: "James, age 15, son of a merchant ship captain in Boston, 1720",
      chapters: [
        {
          title: "A Merchant's Life",
          content: `My name is James, and I am fifteen years old. My father is a captain of a merchant ship that sails the Atlantic trade routes. I've been on three voyages with him, learning the merchant's trade and keeping the ship's ledgers.

Our ship is part of what people call the "triangular trade"—though it's not always a perfect triangle. We carry goods between the American colonies, the Caribbean, Africa, and England. Each leg of the journey carries different cargo, and each port brings profit.

Father owns a share of the ship with two other Boston merchants. They invest in the cargo we carry: rum, lumber, dried fish, iron goods. The profits from these voyages have made our family wealthy. We live in a fine brick house on the harbor, and I'll inherit the business one day.

But I've learned that not all trade is honorable. Some of our fellow merchants participate in the slave trade—the most profitable and most terrible branch of Atlantic commerce. Father refuses to carry human cargo, but he trades with those who do. I'm beginning to understand that in this interconnected world of trade, no one's hands are entirely clean.`,
        },
        {
          title: "The Colonial Economy",
          content: `The thirteen colonies produce different goods based on their climate and resources. New England, where we live, has rocky soil but excellent harbors. We build ships, catch fish, and produce rum from West Indian molasses. We're merchants and craftsmen more than farmers.

The Middle Colonies—New York, Pennsylvania, New Jersey—are the "bread basket." They export wheat, flour, and grain to the Caribbean islands and southern Europe. Their fertile soil and moderate climate make them ideal for farming.

The Southern colonies grow cash crops for export: tobacco in Virginia and Maryland, rice and indigo in the Carolinas. These labor-intensive crops rely increasingly on enslaved African workers. The plantation owners grow rich, but at a terrible human cost.

The Caribbean islands grow sugar—the most profitable crop in the Atlantic world. Sugar production is brutal work done by enslaved Africans who die in shocking numbers from exhaustion, disease, and abuse. Yet the demand for sugar in Europe seems endless, driving the whole vicious system.`,
        },
        {
          title: "Navigation Acts and Mercantilism",
          content: `England controls colonial trade through the Navigation Acts. These laws say we can only trade certain goods with England or other English colonies. We must use English ships with English crews. Valuable goods like tobacco and sugar must go to England first, even if they're destined for other countries.

This is part of mercantilism—the idea that colonies exist to enrich the mother country. We're supposed to provide raw materials to England and buy manufactured goods from them. We're not supposed to manufacture our own finished products or trade freely with other nations.

Many colonists resent these restrictions. Father says the Navigation Acts cost us money—we could get better prices selling directly to France or Spain. Some merchants turn to smuggling, secretly trading with the French Caribbean islands or hiding cargo from English customs officials.

But Father obeys the law, even when it costs us profit. "We're still Englishmen," he says. "These trade routes have made us prosperous, even with their restrictions. Someday, these rules may change. Until then, we work within them." I wonder if he's right, or if the conflict between colonial economic interests and English control will grow worse.`,
        },
        {
          title: "The Human Cost",
          content: `Last year, we were in port in Charleston when a slave ship arrived from Africa. I watched from the dock as the enslaved people were brought up from the hold—thin, sick, traumatized. The smell was unbearable. Many had died during the Middle Passage, their bodies thrown overboard like cargo.

The survivors were sold at auction. Families were separated. Children torn from mothers. People sold to different plantation owners, never to see each other again. The auctioneer spoke of them like livestock, examining their teeth and muscles, pricing them based on their ability to work.

That night I couldn't sleep. I kept thinking about the sugar in our tea, the tobacco we ship, the molasses we buy to make rum. Our prosperity—all of colonial prosperity—is built on this system. The triangle connects us all: European manufactured goods, African lives, American resources, Caribbean sugar.

Father says some Quakers in Philadelphia are speaking out against slavery, calling it evil and unchristian. But their voices are few. Most people find slavery too profitable to question. I fear that we're building an economy that will require a terrible reckoning someday. The human cost of our prosperity is too high, but we've built our whole world upon it.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc7-1",
        term: "Triangular Trade",
        definition: "The Atlantic trade system connecting Europe, Africa, and the Americas, involving the exchange of manufactured goods, enslaved people, and raw materials.",
      },
      {
        id: "fc7-2",
        term: "Mercantilism",
        definition: "An economic system where colonies exist to enrich the mother country by providing raw materials and buying manufactured goods.",
      },
      {
        id: "fc7-3",
        term: "Navigation Acts",
        definition: "English laws controlling colonial trade, requiring colonists to trade certain goods only with England and use English ships.",
      },
      {
        id: "fc7-4",
        term: "Cash Crop",
        definition: "Crops grown primarily for sale and profit rather than personal use, such as tobacco, rice, indigo, and sugar.",
      },
      {
        id: "fc7-5",
        term: "Middle Passage",
        definition: "The brutal ocean voyage that forcibly transported enslaved Africans to the Americas, part of the triangular trade system.",
      },
      {
        id: "fc7-6",
        term: "Smuggling",
        definition: "Illegal trade that violated the Navigation Acts, often conducted with French or Spanish colonies to avoid English restrictions.",
      },
      {
        id: "fc7-7",
        term: "Raw Materials",
        definition: "Natural resources like lumber, fish, tobacco, and rice that colonies exported to England for manufacturing.",
      },
      {
        id: "fc7-8",
        term: "Molasses",
        definition: "A thick syrup produced from sugar cane, imported from the Caribbean and used in New England to make rum.",
      },
    ],
    quiz: [
      {
        id: "q7-1",
        question: "What was the triangular trade?",
        options: [
          "Trade between three colonial cities",
          "The Atlantic trade system connecting Europe, Africa, and the Americas",
          "A farming technique",
          "A type of ship",
        ],
        correctOptionIndex: 1,
        explanation: "The triangular trade was the Atlantic trade network involving Europe, Africa, and the Americas. It included the exchange of manufactured goods, enslaved people, raw materials, and colonial products.",
      },
      {
        id: "q7-2",
        question: "What economic system did England use to control colonial trade?",
        options: [
          "Capitalism",
          "Communism",
          "Mercantilism",
          "Feudalism",
        ],
        correctOptionIndex: 2,
        explanation: "England practiced mercantilism, believing that colonies existed to benefit the mother country by providing raw materials and purchasing manufactured goods.",
      },
      {
        id: "q7-3",
        question: "What did the Navigation Acts require?",
        options: [
          "Colonists could trade freely with any nation",
          "Colonists must trade certain goods only with England using English ships",
          "All trade must go through Boston",
          "Colonies could manufacture their own goods",
        ],
        correctOptionIndex: 1,
        explanation: "The Navigation Acts restricted colonial trade by requiring that certain valuable goods could only be traded with England and that only English ships with English crews could be used.",
      },
      {
        id: "q7-4",
        question: "Why were the Caribbean islands important to colonial trade?",
        options: [
          "They produced gold",
          "They produced highly profitable sugar using enslaved labor",
          "They manufactured ships",
          "They had no importance",
        ],
        correctOptionIndex: 1,
        explanation: "The Caribbean islands produced sugar, the most profitable crop in the Atlantic world. Sugar production relied on enslaved African labor and was a crucial part of the triangular trade system.",
      },
      {
        id: "q7-5",
        question: "How did colonial regions differ economically?",
        options: [
          "All regions produced the same goods",
          "New England focused on shipping and trade, Middle Colonies on grain, and Southern colonies on cash crops like tobacco and rice",
          "Only the South had an economy",
          "All colonies only hunted and gathered",
        ],
        correctOptionIndex: 1,
        explanation: "Different colonial regions had distinct economies based on climate and resources: New England had shipping and trade, the Middle Colonies were the 'bread basket,' and Southern colonies grew cash crops.",
      },
      {
        id: "q7-6",
        question: "Why did some colonial merchants engage in smuggling?",
        options: [
          "For excitement",
          "To avoid Navigation Acts restrictions and get better prices by trading with other nations",
          "Because it was legal",
          "To help England",
        ],
        correctOptionIndex: 1,
        explanation: "Some merchants smuggled goods to avoid Navigation Acts restrictions, allowing them to trade with French or Spanish colonies and receive better prices than English law permitted.",
      },
      {
        id: "q7-7",
        question: "What role did slavery play in the colonial economy?",
        options: [
          "It had no role",
          "It was the foundation of plantation agriculture and the Atlantic trade system",
          "It only existed in England",
          "It was limited to the Caribbean",
        ],
        correctOptionIndex: 1,
        explanation: "Slavery was central to the colonial economy, providing labor for Southern plantations and Caribbean sugar production. The slave trade was a key component of the triangular trade system.",
      },
      {
        id: "q7-8",
        question: "What was the Middle Passage?",
        options: [
          "A road between colonies",
          "The horrific voyage transporting enslaved Africans across the Atlantic",
          "A trade agreement",
          "A type of ship",
        ],
        correctOptionIndex: 1,
        explanation: "The Middle Passage was the brutal ocean voyage that forcibly transported millions of enslaved Africans to the Americas. Conditions were horrific, and many died during the journey.",
      },
    ],
  },

  // LESSON 8: The Great Awakening
  {
    id: "lesson-8",
    title: "The Great Awakening",
    description: "Religious Revival in the Colonies (1730-1750)",
    heroImage: "/images/hero-awakening.jpg",
    story: {
      narrator: "Sarah, age 14, daughter of a Connecticut farmer, 1741",
      chapters: [
        {
          title: "The Traveling Preacher",
          content: `My name is Sarah, and I am fourteen years old. Today, something extraordinary happened in our small Connecticut town. A traveling preacher named George Whitefield came to speak, and everything changed.

We gathered in a field because no church could hold the crowd. Thousands of people came—farmers, merchants, servants, even enslaved people from nearby estates. Our ministers usually read sermons in quiet, scholarly voices. But Whitefield was different.

He preached with passion and emotion, tears streaming down his face. His voice carried across the field like thunder. He spoke of sin and salvation, heaven and hell. He said it didn't matter if you were rich or poor, educated or ignorant—everyone needed to be "born again" through personal faith in Jesus Christ.

People around me began to weep and cry out. Some fell to their knees. My mother wept openly, something I'd never seen. Even Father, usually so reserved, looked shaken. Whitefield said we couldn't earn salvation through good works or church attendance—we needed a direct, personal experience of God's grace. This was revolutionary.`,
        },
        {
          title: "Old Lights vs. New Lights",
          content: `Whitefield's visit divided our community. Some people, now called "New Lights," embraced this emotional, personal religion. They attended revival meetings, shared testimonies of their conversion experiences, and questioned whether ministers who hadn't been "born again" should even preach.

Our traditional minister, Reverend Edwards, sided with the revival at first. He preached a famous sermon called "Sinners in the Hands of an Angry God," describing hell so vividly that people clutched their pews in terror. But other ministers, the "Old Lights," condemned this emotional excess.

The Old Lights said religion should be orderly, rational, and traditional. They accused revivalist preachers of stirring up dangerous emotions and undermining proper church authority. They pointed out that some revival meetings became chaotic, with people shouting, fainting, and claiming divine visions.

My family split over this. Father and Mother became New Lights, attending emotional prayer meetings. My uncle remained an Old Light, saying the revivals were dangerous enthusiasm. At Sunday dinner, they argued about whether true religion came from the head or the heart. I listened, uncertain which path was right.`,
        },
        {
          title: "A Democratization of Religion",
          content: `The Great Awakening changed how people thought about authority—both religious and political. If ordinary people could have direct access to God without needing educated ministers to interpret for them, what other authority could be questioned?

New congregations formed when people left churches whose ministers they felt were unconverted. Previously, you belonged to the church in your town. Now people chose their church based on personal conviction. This was a radical form of religious freedom.

The revival also crossed social boundaries in surprising ways. Women spoke publicly about their faith experiences. Enslaved people attended revivals and some even became preachers. Young people challenged their elders. The educated elite no longer automatically controlled religious life.

I saw this myself when an enslaved man named Samuel preached at a revival meeting. He spoke with such power about God's love for all people, regardless of their earthly station. Some white people were scandalized, but others were moved to tears. How could we claim all souls were equal before God while keeping some people in bondage? The contradiction became impossible to ignore.`,
        },
        {
          title: "Long-Term Changes",
          content: `The Great Awakening created lasting changes in colonial society. New denominations formed—Baptists and Methodists grew rapidly. Colleges were founded to train revival-minded ministers: Princeton, Dartmouth, Rutgers. The emphasis on personal choice and individual conscience planted seeds of independent thinking.

It also exposed the gap between religious ideals and social reality. If all people truly were equal in God's eyes, how could we justify slavery? How could we accept rigid social hierarchies? Some ministers began preaching against slavery, though they remained a minority.

Most importantly, the Awakening taught colonists to think for themselves and question authority. If established church leaders could be wrong about salvation, couldn't political leaders be wrong about governance? This wasn't a direct cause of the Revolution, but it created a mindset that valued personal conviction over inherited authority.

As I think back on that day when Whitefield preached, I realize I witnessed a transformation. Not just individual conversions, but a change in how Americans understood authority, community, and individual rights. We were becoming a people who believed in choosing our own paths—in religion, and eventually, in politics too.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc8-1",
        term: "Great Awakening",
        definition: "A religious revival movement in the 1730s-1740s emphasizing personal faith, emotional preaching, and individual conversion experiences.",
      },
      {
        id: "fc8-2",
        term: "George Whitefield",
        definition: "A powerful revivalist preacher who traveled throughout the colonies, drawing huge crowds with his emotional sermons.",
      },
      {
        id: "fc8-3",
        term: "Jonathan Edwards",
        definition: "New England minister famous for his sermon 'Sinners in the Hands of an Angry God,' which vividly described hell and divine judgment.",
      },
      {
        id: "fc8-4",
        term: "New Lights",
        definition: "Supporters of the Great Awakening who favored emotional, personal religion and revivalist preaching.",
      },
      {
        id: "fc8-5",
        term: "Old Lights",
        definition: "Opponents of the Great Awakening who preferred traditional, rational, orderly religious practices.",
      },
      {
        id: "fc8-6",
        term: "Born Again",
        definition: "The revivalist concept of experiencing a dramatic personal conversion and receiving God's saving grace.",
      },
      {
        id: "fc8-7",
        term: "Revival",
        definition: "A religious meeting focused on renewing faith, often featuring emotional preaching and public conversion experiences.",
      },
      {
        id: "fc8-8",
        term: "Denomination",
        definition: "A distinct religious group within Christianity, such as Baptists, Methodists, or Presbyterians.",
      },
    ],
    quiz: [
      {
        id: "q8-1",
        question: "What was the Great Awakening?",
        options: [
          "A political revolution",
          "A religious revival movement emphasizing personal faith and emotional conversion",
          "A scientific discovery",
          "A new form of government",
        ],
        correctOptionIndex: 1,
        explanation: "The Great Awakening was a religious revival movement in the 1730s-1740s that emphasized personal conversion experiences, emotional preaching, and direct relationships with God.",
      },
      {
        id: "q8-2",
        question: "Who was George Whitefield?",
        options: [
          "A colonial governor",
          "A powerful traveling preacher who drew huge crowds during the Great Awakening",
          "A plantation owner",
          "A British general",
        ],
        correctOptionIndex: 1,
        explanation: "George Whitefield was one of the most famous revivalist preachers, known for his emotional sermons and ability to draw enormous crowds throughout the colonies.",
      },
      {
        id: "q8-3",
        question: "What did New Lights believe?",
        options: [
          "Religion should be traditional and unemotional",
          "Only educated ministers could understand God",
          "Personal emotional conversion experiences were essential to true faith",
          "Churches should follow the King's orders",
        ],
        correctOptionIndex: 2,
        explanation: "New Lights supported the Great Awakening and believed in emotional, personal religion with emphasis on individual conversion experiences and being 'born again.'",
      },
      {
        id: "q8-4",
        question: "How did the Great Awakening challenge social hierarchies?",
        options: [
          "It didn't challenge them at all",
          "It emphasized that all people were equal before God, allowing women, enslaved people, and common folk to participate",
          "It made hierarchies stronger",
          "It only included wealthy people",
        ],
        correctOptionIndex: 1,
        explanation: "The Great Awakening challenged social hierarchies by emphasizing spiritual equality. Women spoke publicly, enslaved people attended and preached, and ordinary people gained religious authority.",
      },
      {
        id: "q8-5",
        question: "What famous sermon did Jonathan Edwards preach?",
        options: [
          "The City Upon a Hill",
          "Sinners in the Hands of an Angry God",
          "Common Sense",
          "The Declaration of Independence",
        ],
        correctOptionIndex: 1,
        explanation: "Jonathan Edwards preached 'Sinners in the Hands of an Angry God,' a vivid sermon describing hell and divine judgment that terrified listeners and became a symbol of Great Awakening preaching.",
      },
      {
        id: "q8-6",
        question: "How did the Great Awakening contribute to ideas about authority?",
        options: [
          "It strengthened blind obedience to authorities",
          "It taught people to question authority and think independently about religious and social matters",
          "It had no effect on attitudes toward authority",
          "It made kings more powerful",
        ],
        correctOptionIndex: 1,
        explanation: "The Great Awakening taught people to question established religious authorities and trust their own spiritual experiences. This independent thinking later extended to questioning political authority.",
      },
      {
        id: "q8-7",
        question: "What new religious denominations grew during the Great Awakening?",
        options: [
          "Only Puritans grew",
          "Baptists and Methodists grew rapidly",
          "No new denominations formed",
          "Only Catholic churches grew",
        ],
        correctOptionIndex: 1,
        explanation: "The Great Awakening led to rapid growth of Baptist and Methodist denominations, as well as the founding of new colleges like Princeton, Dartmouth, and Rutgers to train revivalist ministers.",
      },
      {
        id: "q8-8",
        question: "How did the Great Awakening expose contradictions in colonial society?",
        options: [
          "It didn't expose any contradictions",
          "It highlighted the contradiction between believing all souls are equal before God while practicing slavery",
          "It proved slavery was acceptable",
          "It showed everyone was already equal",
        ],
        correctOptionIndex: 1,
        explanation: "The Great Awakening's message of spiritual equality exposed the contradiction of claiming all souls are equal before God while enslaving people, leading some to begin questioning slavery.",
      },
    ],
  },

  // LESSON 9: French and Indian War
  {
    id: "lesson-9",
    title: "French and Indian War",
    description: "The Seven Years' War in America (1754-1763)",
    heroImage: "/images/hero-french-indian-war.jpg",
    story: {
      narrator: "Benjamin, age 16, a colonial militiaman from Virginia, 1755",
      chapters: [
        {
          title: "Clash of Empires",
          content: `My name is Benjamin, and I am sixteen years old. I joined the Virginia militia last spring, following a young officer named George Washington into the wilderness beyond the Allegheny Mountains. We were sent to protect Virginia's claim to the Ohio River Valley—land that both England and France claim as their own.

The French have been building forts throughout the region, connecting Canada to Louisiana. They trade with the Native peoples and have many allies among the tribes. We English colonists want this land for settlement and farming. The stage was set for conflict.

In May, we engaged a small French force near a place called Great Meadows. It was my first battle—confusing, terrifying, loud. We won that skirmish, but it was hardly a victory. We killed a French diplomat, which the French say was murder. Young Washington built a crude fort he called Fort Necessity.

A month later, a massive French and Indian force surrounded us. We were outnumbered three to one. After a day of fighting in the rain, Washington surrendered. They let us march home, but I understood something important: the French and their Native allies knew this land far better than we did. This war would not be easy.`,
        },
        {
          title: "Braddock's Defeat",
          content: `The next year, the British sent General Edward Braddock with two regiments of professional soldiers. They were going to capture Fort Duquesne, the French stronghold where Pittsburgh stands today. I marched with them, part of the colonial militia supporting the British regulars.

Braddock was confident, even arrogant. He commanded European-style warfare—soldiers in bright red coats marching in formation, drums beating. Washington and other colonials warned him that this style wouldn't work in American forests. Braddock ignored them, calling us provincials who knew nothing of proper warfare.

On July 9, 1755, we were ambushed near the Monongahela River. French soldiers and their Native allies attacked from behind trees and rocks. Our British regulars, trained to fight in open fields, stood in formation and were cut down. The red coats made perfect targets. Officers on horseback were shot first. Chaos erupted.

I survived by diving behind a fallen log and firing at movement in the trees. General Braddock was mortally wounded. Young Washington had horses shot out from under him but survived. Out of 1,300 men, nearly 1,000 were killed or wounded. We retreated in disaster. I learned that pride comes before a fall—and that the French and Indians were formidable enemies.`,
        },
        {
          title: "The Tide Turns",
          content: `For several years, the war went badly for Britain. The French won victory after victory. Their Native allies raided frontier settlements, and colonists fled east for safety. I wondered if we would lose everything we'd built.

But in 1758, William Pitt became Britain's leader and changed strategy. He poured money and troops into America, making this theater of war a priority. He promoted talented officers and worked with colonials instead of dismissing us. The tide began to turn.

Fort Duquesne fell. Louisburg fell. The French were being pushed back. Then came the decisive moment: in 1759, British General James Wolfe led an army up the cliffs to Quebec City. Both Wolfe and the French commander Montcalm were killed, but the British won. Quebec fell, and with it, French power in North America crumbled.

By 1763, the Treaty of Paris ended the war. France gave Canada and all land east of the Mississippi to Britain. Spain got Louisiana from France as compensation for losses. The British Empire now dominated North America. We colonials celebrated—we'd helped win a great victory. We had no idea how this triumph would soon lead to our own rebellion.`,
        },
        {
          title: "Seeds of Revolution",
          content: `The war changed everything, though we didn't see it at first. Britain had huge war debts and thought the colonies should help pay them—after all, the war had been fought partly for our benefit. They planned to station 10,000 troops in America and expected us to help pay for them through new taxes.

King George III issued a Proclamation in 1763 forbidding colonists from settling west of the Appalachian Mountains. This enraged settlers like me who'd fought for that land. We'd risked our lives to secure the Ohio Valley, and now Britain told us we couldn't live there. It was meant to prevent conflicts with Native tribes, but we saw it as betrayal.

The war also changed how we saw ourselves. Colonial militias had fought alongside British regulars. Sometimes we'd been treated with contempt, called inferior soldiers. But we'd proven ourselves in battle. We'd developed confidence in our own abilities and resentment of British arrogance.

Most importantly, the war removed the French threat. For decades, we colonials had needed British military protection against France. Now that France was gone, we felt less dependent on Britain. Within twelve years of this great victory, we'd be at war with Britain itself. The seeds of revolution were planted in the very soil of our triumph.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc9-1",
        term: "French and Indian War",
        definition: "The North American theater of the Seven Years' War (1754-1763), fought between British colonists and French colonists, each with Native American allies.",
      },
      {
        id: "fc9-2",
        term: "Ohio River Valley",
        definition: "The disputed territory between the Appalachian Mountains and Mississippi River that both France and Britain claimed, sparking the war.",
      },
      {
        id: "fc9-3",
        term: "George Washington",
        definition: "Young Virginia officer who fought in early battles of the French and Indian War, gaining military experience that would later prove crucial.",
      },
      {
        id: "fc9-4",
        term: "Fort Duquesne",
        definition: "French fort at the site of present-day Pittsburgh, a key strategic point fought over during the war.",
      },
      {
        id: "fc9-5",
        term: "Battle of Quebec",
        definition: "The decisive 1759 battle where British forces under General Wolfe defeated the French, leading to British control of Canada.",
      },
      {
        id: "fc9-6",
        term: "Treaty of Paris (1763)",
        definition: "The treaty ending the French and Indian War, giving Britain control of Canada and all land east of the Mississippi River.",
      },
      {
        id: "fc9-7",
        term: "Proclamation of 1763",
        definition: "British law forbidding colonial settlement west of the Appalachian Mountains, angering colonists who wanted to expand westward.",
      },
      {
        id: "fc9-8",
        term: "William Pitt",
        definition: "British leader who changed war strategy by committing massive resources to the North American campaign, leading to British victory.",
      },
    ],
    quiz: [
      {
        id: "q9-1",
        question: "What was the main cause of the French and Indian War?",
        options: [
          "Religious differences",
          "Competition between Britain and France over the Ohio River Valley and North American territory",
          "Native American attacks on colonists",
          "Slavery disputes",
        ],
        correctOptionIndex: 1,
        explanation: "The French and Indian War began over competition between Britain and France for control of the Ohio River Valley and dominance in North America. Both empires claimed the same territory.",
      },
      {
        id: "q9-2",
        question: "Who were the 'Indians' in the French and Indian War?",
        options: [
          "Only Native Americans who fought for France",
          "Native American allies of both French and British forces",
          "People from India",
          "Spanish soldiers",
        ],
        correctOptionIndex: 1,
        explanation: "The 'Indians' were Native American tribes who allied with both sides. Most tribes allied with France due to better trade relations, but some supported the British.",
      },
      {
        id: "q9-3",
        question: "What happened to General Braddock's army in 1755?",
        options: [
          "It won a great victory",
          "It was ambushed and defeated by French and Native forces because Braddock used European tactics unsuited to forest warfare",
          "It surrendered without fighting",
          "It captured Fort Duquesne",
        ],
        correctOptionIndex: 1,
        explanation: "General Braddock's army was ambushed and defeated near Fort Duquesne. His use of European-style formations in American forests made his troops easy targets for French and Native forces.",
      },
      {
        id: "q9-4",
        question: "What was the significance of the Battle of Quebec in 1759?",
        options: [
          "It was a minor skirmish",
          "It was the decisive British victory that led to French defeat in North America",
          "The French won decisively",
          "No one won",
        ],
        correctOptionIndex: 1,
        explanation: "The Battle of Quebec was the turning point of the war. British General Wolfe's victory over the French led to British control of Canada and ultimate victory in the war.",
      },
      {
        id: "q9-5",
        question: "What did Britain gain from the Treaty of Paris (1763)?",
        options: [
          "Only a small amount of land",
          "Canada and all French territory east of the Mississippi River",
          "Nothing—France won the war",
          "Only Florida",
        ],
        correctOptionIndex: 1,
        explanation: "The Treaty of Paris gave Britain control of Canada and all French territory east of the Mississippi River, making Britain the dominant power in North America.",
      },
      {
        id: "q9-6",
        question: "Why did the Proclamation of 1763 anger colonists?",
        options: [
          "It raised taxes",
          "It forbade settlement west of the Appalachians, preventing colonists from claiming land they'd fought for",
          "It freed enslaved people",
          "It disbanded colonial militias",
        ],
        correctOptionIndex: 1,
        explanation: "The Proclamation of 1763 forbade colonial settlement west of the Appalachian Mountains. Colonists who had fought for this land were furious at being prevented from settling it.",
      },
      {
        id: "q9-7",
        question: "How did the French and Indian War plant seeds for the American Revolution?",
        options: [
          "It didn't—they were unrelated events",
          "It left Britain in debt and removed the French threat, making colonists feel less dependent on British protection while Britain sought to tax them",
          "It made colonists love Britain more",
          "It gave France control of the colonies",
        ],
        correctOptionIndex: 1,
        explanation: "The war left Britain deeply in debt, leading to new taxes on colonists. It also removed the French threat, making colonists feel less dependent on British protection. These factors contributed to growing colonial resentment.",
      },
      {
        id: "q9-8",
        question: "Who was the young Virginia officer who gained military experience in this war?",
        options: [
          "Thomas Jefferson",
          "Benjamin Franklin",
          "George Washington",
          "John Adams",
        ],
        correctOptionIndex: 2,
        explanation: "George Washington was a young Virginia militia officer who fought in early battles of the French and Indian War, gaining valuable military experience he would later use as commander of Continental forces.",
      },
    ],
  },

  // LESSON 10: Colonial Life on the Eve of Revolution
  {
    id: "lesson-10",
    title: "Colonial Life on the Eve of Revolution",
    description: "Society and Culture in 1763",
    heroImage: "/images/hero-colonial-life.jpg",
    story: {
      narrator: "Rachel, age 15, daughter of a Philadelphia printer, 1763",
      chapters: [
        {
          title: "Life in the City",
          content: `My name is Rachel, and I am fifteen years old. I live in Philadelphia, the largest city in the colonies with over 20,000 people. Our city has paved streets, brick buildings, street lamps, and a bustling port. It's a world away from the frontier settlements Father tells stories about.

Father owns a printing shop where we produce newspapers, books, almanacs, and pamphlets. I've learned to set type and operate the press—unusual for a girl, but Father believes women should be educated. Our shop is a gathering place where men discuss politics, philosophy, and the latest news from London.

Philadelphia has theaters, coffeehouses, libraries, and schools. We have skilled craftsmen: silversmiths, cabinetmakers, wigmakers, tailors. The streets are filled with people speaking different languages—English, German, Dutch, French. We have Quakers, Anglicans, Presbyterians, Catholics, and Jews all living together.

But even in this prosperous city, I see inequality everywhere. Wealthy merchants live in mansions with servants. Indentured servants work for years to pay off their passage. And despite Pennsylvania's Quaker ideals, enslaved Africans work in homes and businesses. The contradiction troubles me—we speak of liberty while denying it to others.`,
        },
        {
          title: "Education and Ideas",
          content: `Education matters greatly to colonists, though it varies by region and class. In New England, towns fund public schools because Puritans believe everyone should read the Bible. The Middle Colonies have private schools and academies. The South educates wealthy children with private tutors, while poor children receive little formal education.

We have nine colleges now: Harvard, William & Mary, Yale, Princeton, Columbia, Penn, Brown, Rutgers, and Dartmouth. They train ministers, lawyers, and gentlemen. But most learning happens through apprenticeships—boys learn trades by working with master craftsmen, just as I learned printing from Father.

Books and newspapers connect us to a wider world of ideas. We read about Enlightenment philosophers like John Locke, who wrote about natural rights and government by consent. We discuss reason, science, and progress. These ideas are revolutionary—if people have natural rights, can kings truly rule by divine right?

Father's print shop buzzes with these debates. Ben Franklin, whom Father knows, says common people can improve themselves through education and hard work. This is radical stuff—the idea that birth doesn't determine your place in society, that ordinary people can think and govern themselves. These ideas are shaping how we see ourselves and our relationship to Britain.`,
        },
        {
          title: "Different Regions, Shared Identity",
          content: `Despite our differences, a shared colonial identity is emerging. We're beginning to see ourselves not just as Virginians or New Yorkers, but as Americans—distinct from the British.

Trade connects us. New England ships carry grain from the Middle Colonies and tobacco from the South. We read each other's newspapers. We've fought together in wars. We share the experience of building new lives in a new land.

Yet deep divisions remain. The North's economy relies increasingly on trade and small farms, while the South depends on plantation slavery. Urban colonists have different concerns than frontier settlers. Wealthy merchants have little in common with struggling farmers. These divisions will haunt us for centuries.

Religious diversity is both a strength and a source of tension. In New England, Congregationalists dominate. The Middle Colonies have religious tolerance. The South has the Anglican Church. Catholics and Jews face discrimination everywhere. Yet this diversity teaches us to live with differences—a lesson that will prove valuable.

By 1763, we number about two million people in thirteen colonies. We're no longer a collection of struggling outposts—we're a thriving society with our own character, interests, and ideas. We still consider ourselves British subjects, but we're different from people in Britain. That difference will soon become impossible to ignore.`,
        },
        {
          title: "The Coming Storm",
          content: `Last week, news arrived that makes Father worried. Britain has huge debts from the French and Indian War—over £140 million. Parliament plans to raise taxes on the colonies to help pay for it. They'll station 10,000 troops here and expect us to help pay their costs.

Father says this violates a fundamental principle: we're British subjects with rights. One of those rights is that we can only be taxed by our own representatives. We have no representatives in Parliament. "No taxation without representation," Father calls it.

At the coffeehouse, men debate what this means. Some say we should accept whatever Parliament decides—they're our mother country. Others, like Father, argue that rights are rights. If Parliament can tax us without our consent, what other rights might they take away?

I don't fully understand the coming conflict, but I sense we're at a turning point. We've grown up in these decades of peace and prosperity. We've developed our own ways, our own ideas about liberty and rights. We've built a society that's distinctly American.

Britain sees us as colonists who exist to serve the empire. But we're beginning to see ourselves differently—as people with rights, capable of governing ourselves, with our own destiny to shape. The question is whether Britain and the colonies can reconcile these different visions. From the worried conversations in Father's shop, I suspect the answer is no. A storm is coming, and I fear it will change everything.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc10-1",
        term: "Enlightenment",
        definition: "An intellectual movement emphasizing reason, science, individual rights, and questioning traditional authority. Influenced colonial thinking about government and liberty.",
      },
      {
        id: "fc10-2",
        term: "John Locke",
        definition: "Enlightenment philosopher who wrote about natural rights (life, liberty, property) and government by consent of the governed. Heavily influenced American thinking.",
      },
      {
        id: "fc10-3",
        term: "Natural Rights",
        definition: "Rights that all people are born with, including life, liberty, and property. Cannot be taken away by government according to Enlightenment philosophy.",
      },
      {
        id: "fc10-4",
        term: "Apprenticeship",
        definition: "A system where young people learned trades by working for a master craftsman for several years in exchange for training, room, and board.",
      },
      {
        id: "fc10-5",
        term: "Colonial Identity",
        definition: "The emerging sense that colonists were becoming a distinct people—Americans—with their own interests separate from Britain.",
      },
      {
        id: "fc10-6",
        term: "Urban vs. Rural",
        definition: "The divide between city dwellers (urban) and countryside farmers (rural), who often had different economic interests and lifestyles.",
      },
      {
        id: "fc10-7",
        term: "No Taxation Without Representation",
        definition: "The colonial principle that British subjects could only be taxed by legislatures where they had elected representatives.",
      },
      {
        id: "fc10-8",
        term: "Colonial Press",
        definition: "Newspapers and printing shops that spread news and ideas throughout the colonies, helping create shared colonial identity and political awareness.",
      },
    ],
    quiz: [
      {
        id: "q10-1",
        question: "What was the Enlightenment's influence on colonial thinking?",
        options: [
          "It had no influence",
          "It emphasized reason, natural rights, and questioning authority, shaping colonial ideas about government",
          "It promoted absolute monarchy",
          "It opposed education",
        ],
        correctOptionIndex: 1,
        explanation: "The Enlightenment emphasized reason, science, and natural rights. Colonists read Enlightenment philosophers like John Locke, whose ideas about rights and government by consent influenced colonial political thinking.",
      },
      {
        id: "q10-2",
        question: "What did John Locke argue about government?",
        options: [
          "Kings rule by divine right",
          "People have natural rights and governments must have the consent of the governed",
          "Democracy is dangerous",
          "Only the wealthy should vote",
        ],
        correctOptionIndex: 1,
        explanation: "John Locke argued that people are born with natural rights (life, liberty, property) and that legitimate government requires the consent of the governed. These ideas greatly influenced American political thought.",
      },
      {
        id: "q10-3",
        question: "How did education differ across colonial regions?",
        options: [
          "All regions had identical school systems",
          "New England had public schools, Middle Colonies had private schools, and the South used tutors for wealthy children",
          "No one was educated",
          "Only the South had schools",
        ],
        correctOptionIndex: 1,
        explanation: "Education varied by region: New England established public schools for religious reasons, the Middle Colonies had private schools and academies, and Southern wealthy families hired private tutors.",
      },
      {
        id: "q10-4",
        question: "What was emerging by 1763 regarding colonial identity?",
        options: [
          "Nothing—colonists still felt purely British",
          "Colonists were developing a distinct American identity separate from Britain",
          "Colonists wanted to be French",
          "Each colony was completely isolated",
        ],
        correctOptionIndex: 1,
        explanation: "By 1763, colonists were developing a shared American identity. Trade, shared experiences, newspapers, and common struggles created connections among colonies and a sense of being distinct from Britain.",
      },
      {
        id: "q10-5",
        question: "What principle did colonists assert about taxation?",
        options: [
          "They could be taxed however Britain wanted",
          "No taxation without representation—they could only be taxed by legislatures where they had representatives",
          "They should never pay any taxes",
          "Only the wealthy should be taxed",
        ],
        correctOptionIndex: 1,
        explanation: "'No taxation without representation' meant that as British subjects, colonists believed they could only be taxed by legislatures where they had elected representatives. Since they had no representatives in Parliament, they opposed Parliamentary taxation.",
      },
      {
        id: "q10-6",
        question: "What role did newspapers and printing shops play in colonial life?",
        options: [
          "They had no importance",
          "They spread news and ideas, helping create shared colonial identity and political awareness",
          "They only printed religious materials",
          "They were illegal",
        ],
        correctOptionIndex: 1,
        explanation: "Colonial newspapers and printing shops were crucial for spreading news and Enlightenment ideas. They helped create political awareness and a shared colonial identity by connecting people across different colonies.",
      },
      {
        id: "q10-7",
        question: "What contradiction existed in colonial society regarding liberty?",
        options: [
          "There was no contradiction",
          "Colonists spoke of liberty and rights while denying them to enslaved people and others",
          "Everyone had equal rights",
          "No one cared about liberty",
        ],
        correctOptionIndex: 1,
        explanation: "Colonial society had a fundamental contradiction: colonists increasingly spoke of natural rights and liberty while simultaneously practicing slavery and denying rights to women, indentured servants, and others.",
      },
      {
        id: "q10-8",
        question: "Why was Britain planning to tax the colonies after 1763?",
        options: [
          "To punish them",
          "To pay for war debts and the cost of stationing troops in America",
          "They didn't plan to tax them",
          "To build more schools",
        ],
        correctOptionIndex: 1,
        explanation: "Britain had massive debts from the French and Indian War (over £140 million) and planned to station 10,000 troops in America. They expected colonists to help pay these costs through new taxes.",
      },
    ],
  },

  // LESSON 11: No Taxation Without Representation
  {
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

"We are British subjects," Master Green declares. "We have the right to be taxed only by our own representatives. We have no representatives in Parliament. Therefore, Parliament has no right to tax us directly. This is tyranny!" His words echo what I'm hearing in taverns, on street corners, everywhere. The cry goes up: "No taxation without representation!"`,
        },
        {
          title: "Sons of Liberty",
          content: `A group calling themselves the Sons of Liberty has formed to resist the Stamp Act. They meet at night, make plans, and intimidate anyone who supports the tax. Their leader is Samuel Adams, a firebrand who writes passionate articles against British tyranny.

I watched yesterday as a mob gathered around the house of Andrew Oliver, the man appointed to distribute stamps in Massachusetts. They hung an effigy of him from a tree, then burned it. They destroyed a building he owned and damaged his house. Oliver resigned the next day, refusing to distribute the stamps.

The crowds frightened me—there's something dangerous about mob violence, even when directed at unjust laws. But I also feel the excitement. We're standing up for our rights. We're refusing to submit to taxation without consent.

Similar protests are erupting throughout the colonies. In New York, stamp distributors resign. In Virginia, Patrick Henry delivers a fiery speech declaring "If this be treason, make the most of it!" The colonies are uniting in resistance, connected by shared outrage at this violation of their rights.`,
        },
        {
          title: "Colonial Unity",
          content: `In October, representatives from nine colonies met in New York for a Stamp Act Congress. This is remarkable—the colonies rarely cooperate. But this threat has brought us together. The Congress declared that only colonial assemblies, not Parliament, have the right to tax colonists.

Meanwhile, merchants organized boycotts of British goods. "Non-importation agreements," they call them. Women formed spinning groups to make homemade cloth instead of buying British textiles. Even ordinary people like me are part of this resistance by choosing what we buy.

The boycotts hurt British merchants, who pressured Parliament to repeal the Stamp Act. In March 1766, Parliament repealed it! Church bells rang, celebrations erupted in the streets. We won! Our unity and resistance forced Britain to back down.

But there's a darker side to this victory. Parliament also passed the Declaratory Act, asserting their right to legislate for the colonies "in all cases whatsoever." They may have repealed this tax, but they claim absolute authority over us. The fundamental conflict hasn't been resolved—it's only been postponed.`,
        },
        {
          title: "The Townshend Acts",
          content: `Our celebration didn't last long. In 1767, Parliament passed new taxes called the Townshend Acts, named for Charles Townshend, the British Chancellor of the Exchequer. These taxes are different from the Stamp Act—they're duties on imported goods like tea, glass, lead, paint, and paper.

Parliament thinks they're being clever. They claim these aren't "internal" taxes like the Stamp Act, but "external" taxes on trade—something they've always regulated. But we see through this distinction. A tax is a tax, and we still have no representation in Parliament.

The revenue from these taxes will pay the salaries of royal governors and judges in America. Master Green explains why this is dangerous: "If Britain pays our governors, they'll serve British interests, not ours. Our governors will no longer depend on colonial assemblies for their salaries, so they won't have to listen to us."

The acts also allow British customs officials to use "writs of assistance"—general search warrants that let them search any building for smuggled goods without specific cause. It feels like our rights as Englishmen are being stripped away, one by one. We renewed our boycotts, and once again, the streets filled with tension.`,
        },
        {
          title: "The Power of Resistance",
          content: `These years have taught me something profound: ordinary people have power when they stand together. I'm just a printer's apprentice, but when I refuse to buy British tea, when Master Green prints pamphlets explaining our rights, when my neighbors boycott imported goods—we're all part of something larger.

Women have become crucial to this resistance. They're called the "Daughters of Liberty," and they organize spinning bees to produce homemade cloth. They serve coffee instead of tea. They teach their children about liberty and rights. My mother says she feels like she's part of history, not just watching it happen.

The colonial assemblies have grown bolder too. The Massachusetts Assembly circulated a letter to other colonies urging united resistance. Britain ordered them to rescind it. They refused. Britain dissolved the assembly, but that only made more people angry. You can't suppress ideas by silencing the people who speak them—the ideas just spread wider.

I've learned that we're not just fighting about taxes. We're fighting about what it means to have rights. Are we British subjects with the rights of Englishmen? Or are we second-class colonials who must submit to whatever Parliament decides? The answer to that question will shape our future—and Britain's too.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc11-1",
        term: "Stamp Act",
        definition: "A 1765 British law requiring colonists to pay a tax on printed materials by purchasing special stamped paper.",
      },
      {
        id: "fc11-2",
        term: "No Taxation Without Representation",
        definition: "The colonial principle that they could only be taxed by legislatures where they had elected representatives, not by Parliament.",
      },
      {
        id: "fc11-3",
        term: "Sons of Liberty",
        definition: "A colonial organization that used protests, intimidation, and sometimes violence to resist British policies like the Stamp Act.",
      },
      {
        id: "fc11-4",
        term: "Samuel Adams",
        definition: "A Boston leader and organizer of colonial resistance against British taxation and policies.",
      },
      {
        id: "fc11-5",
        term: "Stamp Act Congress",
        definition: "A 1765 meeting of representatives from nine colonies to coordinate opposition to the Stamp Act and assert colonial rights.",
      },
      {
        id: "fc11-6",
        term: "Boycott",
        definition: "Refusing to buy certain goods as a form of protest. Colonists boycotted British goods to resist unfair taxes.",
      },
      {
        id: "fc11-7",
        term: "Declaratory Act",
        definition: "A 1766 British law asserting Parliament's right to make laws for the colonies 'in all cases whatsoever,' passed the same day the Stamp Act was repealed.",
      },
      {
        id: "fc11-8",
        term: "Patrick Henry",
        definition: "Virginia orator who gave fiery speeches against British taxation, declaring 'If this be treason, make the most of it!'",
      },
    ],
    quiz: [
      {
        id: "q11-1",
        question: "What did the Stamp Act require colonists to do?",
        options: [
          "Join the British army",
          "Buy special stamped paper for all printed materials and legal documents",
          "Move to Britain",
          "Give up their weapons",
        ],
        correctOptionIndex: 1,
        explanation: "The Stamp Act required colonists to purchase special stamped paper for all printed materials, legal documents, and other items. This was a direct tax on the colonies.",
      },
      {
        id: "q11-2",
        question: "What did 'No taxation without representation' mean?",
        options: [
          "Colonists should never pay taxes",
          "Colonists could only be taxed by legislatures where they had elected representatives",
          "Only wealthy colonists should pay taxes",
          "Britain should pay colonial taxes",
        ],
        correctOptionIndex: 1,
        explanation: "Colonists argued they could only be taxed by legislatures where they had representatives. Since they had no representatives in Parliament, they opposed Parliamentary taxation.",
      },
      {
        id: "q11-3",
        question: "Who were the Sons of Liberty?",
        options: [
          "British soldiers",
          "A colonial organization that organized protests and resistance against British policies",
          "Native American allies",
          "French traders",
        ],
        correctOptionIndex: 1,
        explanation: "The Sons of Liberty were colonial patriots who organized protests, boycotts, and sometimes violent resistance against British policies like the Stamp Act.",
      },
      {
        id: "q11-4",
        question: "What was the Stamp Act Congress?",
        options: [
          "A British government meeting",
          "A meeting of nine colonial representatives to coordinate opposition to the Stamp Act",
          "A celebration of the Stamp Act",
          "A military training session",
        ],
        correctOptionIndex: 1,
        explanation: "The Stamp Act Congress was a significant 1765 meeting where representatives from nine colonies coordinated their opposition and declared that only colonial assemblies could tax colonists.",
      },
      {
        id: "q11-5",
        question: "How did colonists successfully resist the Stamp Act?",
        options: [
          "They ignored the law and Britain did nothing",
          "They organized protests, intimidated stamp distributors, and boycotted British goods until Parliament repealed it",
          "They paid the tax willingly",
          "They asked France for help",
        ],
        correctOptionIndex: 1,
        explanation: "Colonists used multiple tactics: protests, intimidation of stamp distributors, and boycotts of British goods. These actions hurt British merchants who pressured Parliament to repeal the act.",
      },
      {
        id: "q11-6",
        question: "What was the Declaratory Act?",
        options: [
          "It gave colonists representation in Parliament",
          "It asserted Parliament's right to make laws for the colonies 'in all cases whatsoever'",
          "It freed enslaved people",
          "It ended all British taxes",
        ],
        correctOptionIndex: 1,
        explanation: "The Declaratory Act, passed the same day the Stamp Act was repealed, asserted Parliament's absolute authority over the colonies. This meant the fundamental conflict over authority remained unresolved.",
      },
      {
        id: "q11-7",
        question: "What did colonial boycotts demonstrate?",
        options: [
          "Colonists had no economic power",
          "Colonial unity and economic leverage could force British policy changes",
          "Britain didn't care about colonial actions",
          "Only violence would work",
        ],
        correctOptionIndex: 1,
        explanation: "Colonial boycotts demonstrated that unity and economic pressure could be effective. The boycotts hurt British merchants enough that Parliament repealed the Stamp Act.",
      },
      {
        id: "q11-8",
        question: "Why was the Stamp Act particularly offensive to colonists?",
        options: [
          "It only affected wealthy people",
          "It was a direct tax without colonial consent, affecting everyday activities and violating their rights as British subjects",
          "It was too cheap",
          "It only applied to one colony",
        ],
        correctOptionIndex: 1,
        explanation: "The Stamp Act was a direct tax on everyday activities, imposed without colonial consent. Colonists saw it as a violation of their rights as British subjects to be taxed only by their own representatives.",
      },
    ],
  },

  // LESSON 12: The Boston Massacre
  {
    id: "lesson-12",
    title: "The Boston Massacre",
    description: "Rising Tensions in Boston (1770)",
    heroImage: "/images/hero-boston-massacre.jpg",
    story: {
      narrator: "Abigail, age 14, daughter of a Boston shopkeeper, 1770",
      chapters: [
        {
          title: "Redcoats in Boston",
          content: `My name is Abigail, and I am fourteen years old. For the past two years, British soldiers—"redcoats"—have been stationed in Boston. There are thousands of them, living among us, a constant reminder of British power.

The soldiers were sent after more riots against British taxes. The Townshend Acts taxed tea, glass, paper, and paint. We resumed our boycotts, and Britain sent troops to enforce order. Now tensions simmer every day.

The soldiers compete with Bostonians for jobs, working for lower wages during their off-hours. They're loud and rowdy in the taverns. Street fights break out between soldiers and townspeople. People on both sides are angry, scared, looking for trouble.

My father's shop is on King Street, near the Custom House where British officials collect taxes. I see the hostility every day—townspeople glaring at redcoats, soldiers responding with contempt. It feels like a powder keg waiting for a spark.`,
        },
        {
          title: "The Night of March 5",
          content: `On the cold evening of March 5, 1770, I heard shouting in the street. A crowd was harassing a British sentry, throwing snowballs and ice, calling him names. More soldiers came to help him. The crowd grew larger and angrier.

I watched from our window as people threw sticks, chunks of ice, anything they could grab. Someone rang the fire bell, bringing more townspeople into the streets. The crowd pressed closer to the soldiers, shouting "Fire! Fire!" Some meant it as a taunt—daring them to shoot.

Then shots rang out. The soldiers fired into the crowd. Five men fell dead or dying: Crispus Attucks, Samuel Gray, James Caldwell, Samuel Maverick, and Patrick Carr. Blood stained the snow. The crowd scattered in horror and rage.

I'll never forget that night—the shouts, the gunshots, the sight of men lying dead in the street. The next day, people called it the Boston Massacre. British soldiers had killed unarmed colonists in cold blood, they said. The soldiers claimed they fired in self-defense against a violent mob. Both stories are partly true.`,
        },
        {
          title: "The Trial and Propaganda",
          content: `The soldiers were arrested and tried for murder. In a surprise move, John Adams—a patriot who opposes British policies—agreed to defend them. He believes even British soldiers deserve a fair trial and a good lawyer.

At trial, Adams argued the soldiers faced a violent, threatening mob and fired in self-defense. Most were acquitted; two were convicted of manslaughter and branded on the thumb. Many patriots were furious, feeling justice wasn't served.

But the real battle wasn't in the courtroom—it was for public opinion. Paul Revere created an engraving showing the Massacre as cold-blooded murder: organized British soldiers firing on peaceful colonists. The image spread throughout the colonies, inflaming anti-British sentiment.

The engraving wasn't accurate—it showed the soldiers in a neat line, the crowd as peaceful citizens. But propaganda doesn't have to be accurate to be effective. The image of British tyranny became fixed in colonial minds. The Massacre became a symbol, a rallying cry, proof that Britain would use violence against its own subjects.`,
        },
        {
          title: "The Aftermath",
          content: `The day after the shooting, acting Governor Thomas Hutchinson met with angry town leaders. Thousands of armed colonists gathered on the Common. The message was clear: remove the troops or face an uprising. Hutchinson, fearing a full-scale rebellion, ordered the British regiments to withdraw to Castle Island in the harbor.

For the first time, colonial pressure had forced Britain to back down through the threat of violence. We'd learned that Britain would retreat when faced with unified, determined resistance. This lesson wouldn't be forgotten.

On the day of the funeral, shops closed and church bells tolled. Thousands of Bostonians marched behind the coffins of the five victims. Rich and poor, black and white, walked together. Crispus Attucks, a man of African and Native American descent, was buried alongside the white victims—in death, at least, they were equals.

Father closed our shop that day. "These men died because the tension between us and Britain has become unbearable," he said quietly. "Their blood is on Britain's hands, but also on ours. We've been heading toward violence for years. This won't be the end of it." Looking at his worried face, I feared he was right.`,
        },
        {
          title: "A Turning Point",
          content: `In the months that followed, an uneasy quiet settled over Boston. Most of the Townshend Acts were repealed—except for the tax on tea, which Britain kept as a symbol of their right to tax us. The troops were gone from our streets. Life returned to something like normal.

But nothing was truly normal anymore. The Massacre had changed us. Every March 5, we held commemorations with speeches remembering the victims and denouncing British tyranny. The Sons of Liberty kept the memory alive, using it to fuel resistance.

I noticed how people spoke differently about Britain. Before, even those who opposed British policies still thought of themselves as loyal British subjects seeking their rights. Now, more people questioned whether we could remain part of the British Empire. Some whispered about independence, though that still seemed radical and frightening.

The Massacre taught both sides a terrible lesson. We learned that Britain would use military force against us. Britain learned that we would resist that force, even violently. The middle ground was disappearing. Each confrontation pushed us further apart.

Looking back now, I see the Boston Massacre as a turning point. Not because of what happened that night—a chaotic street fight that got out of hand—but because of what it represented. The bonds between Britain and America were breaking. Five men died on King Street, but the relationship between the colonies and the mother country died too. We were on a path toward something unprecedented, and there seemed to be no way to turn back.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc12-1",
        term: "Boston Massacre",
        definition: "A 1770 confrontation where British soldiers killed five colonists during a tense street encounter, used as propaganda against British rule.",
      },
      {
        id: "fc12-2",
        term: "Townshend Acts",
        definition: "British laws taxing tea, glass, paper, and paint in the colonies, leading to renewed boycotts and tensions.",
      },
      {
        id: "fc12-3",
        term: "Crispus Attucks",
        definition: "A man of African and Native American descent, the first person killed in the Boston Massacre, considered the first casualty of the American Revolution.",
      },
      {
        id: "fc12-4",
        term: "John Adams",
        definition: "Patriot lawyer who defended the British soldiers in the Boston Massacre trial, believing in the right to fair legal representation.",
      },
      {
        id: "fc12-5",
        term: "Paul Revere",
        definition: "Boston silversmith and patriot who created an influential engraving of the Boston Massacre that served as anti-British propaganda.",
      },
      {
        id: "fc12-6",
        term: "Propaganda",
        definition: "Information, often exaggerated or biased, used to promote a particular political cause or point of view.",
      },
      {
        id: "fc12-7",
        term: "Redcoats",
        definition: "British soldiers, called this because of their distinctive red uniform coats.",
      },
      {
        id: "fc12-8",
        term: "Acquitted",
        definition: "Found not guilty in a trial. Most soldiers in the Boston Massacre trial were acquitted.",
      },
    ],
    quiz: [
      {
        id: "q12-1",
        question: "What was the Boston Massacre?",
        options: [
          "A battle between armies",
          "A confrontation where British soldiers killed five colonists during a tense street encounter",
          "A peaceful protest",
          "A tea party",
        ],
        correctOptionIndex: 1,
        explanation: "The Boston Massacre was a deadly confrontation on March 5, 1770, where British soldiers fired into a crowd, killing five colonists. It became a symbol of British oppression.",
      },
      {
        id: "q12-2",
        question: "Who was Crispus Attucks?",
        options: [
          "A British general",
          "The first person killed in the Boston Massacre, a man of African and Native American descent",
          "A colonial governor",
          "A lawyer",
        ],
        correctOptionIndex: 1,
        explanation: "Crispus Attucks was the first person killed in the Boston Massacre, making him widely considered the first casualty of the American Revolution. He was of African and Native American descent.",
      },
      {
        id: "q12-3",
        question: "Why did John Adams defend the British soldiers?",
        options: [
          "He supported British policies",
          "He believed everyone deserves a fair trial and legal representation, even enemies",
          "He was paid a fortune",
          "He wanted to become a British official",
        ],
        correctOptionIndex: 1,
        explanation: "Despite being a patriot, John Adams defended the soldiers because he believed in the principle that everyone deserves a fair trial and proper legal representation, even those accused of terrible crimes.",
      },
      {
        id: "q12-4",
        question: "How did Paul Revere's engraving of the Massacre function as propaganda?",
        options: [
          "It showed exactly what happened",
          "It portrayed the event as cold-blooded murder by organized soldiers, inflaming anti-British sentiment",
          "It defended the British soldiers",
          "It had no effect on public opinion",
        ],
        correctOptionIndex: 1,
        explanation: "Paul Revere's engraving exaggerated the event, showing organized British soldiers firing on peaceful citizens. Though inaccurate, it was effective propaganda that spread anti-British sentiment throughout the colonies.",
      },
      {
        id: "q12-5",
        question: "What was the outcome of the soldiers' trial?",
        options: [
          "All were hanged",
          "Most were acquitted; two were convicted of manslaughter",
          "All were freed immediately",
          "They escaped to Britain",
        ],
        correctOptionIndex: 1,
        explanation: "Most soldiers were acquitted, and two were convicted of the lesser charge of manslaughter (not murder) and punished by being branded on the thumb. This angered many colonists.",
      },
      {
        id: "q12-6",
        question: "Why were British soldiers stationed in Boston?",
        options: [
          "To protect against French attack",
          "To enforce tax laws and maintain order after colonial protests and boycotts",
          "To build roads",
          "To help colonists farm",
        ],
        correctOptionIndex: 1,
        explanation: "British soldiers were sent to Boston to enforce tax laws like the Townshend Acts and maintain order after colonial protests, riots, and boycotts against British policies.",
      },
      {
        id: "q12-7",
        question: "What were the Townshend Acts?",
        options: [
          "Laws giving colonists representation",
          "British laws taxing tea, glass, paper, and paint in the colonies",
          "Laws banning all taxes",
          "Laws creating colonial governments",
        ],
        correctOptionIndex: 1,
        explanation: "The Townshend Acts were British laws that taxed tea, glass, paper, and paint in the colonies. They led to renewed colonial boycotts and increased tensions with Britain.",
      },
      {
        id: "q12-8",
        question: "How did both sides view the Boston Massacre differently?",
        options: [
          "Everyone agreed on what happened",
          "Colonists called it murder; soldiers claimed self-defense against a violent mob",
          "No one cared about it",
          "Only the British reported it",
        ],
        correctOptionIndex: 1,
        explanation: "Colonists portrayed it as cold-blooded murder of innocent people. Soldiers and their defenders claimed they acted in self-defense against a violent, threatening mob. Both perspectives had some truth.",
      },
    ],
  },

  // LESSON 13: The Boston Tea Party
  {
    id: "lesson-13",
    title: "The Boston Tea Party",
    description: "Colonial Resistance Escalates (1773)",
    heroImage: "/images/hero-tea-party.jpg",
    story: {
      narrator: "Thomas, age 15, apprentice to a Boston carpenter, 1773",
      chapters: [
        {
          title: "The Tea Act",
          content: `My name is Thomas, and I am fifteen years old. I work as an apprentice carpenter in Boston, but tonight I'm about to become part of history. Parliament has passed the Tea Act, giving the British East India Company a monopoly on tea sales in the colonies. This will drive colonial tea merchants out of business and force us to buy British tea—with a tax attached.

Many colonists see this as a trick. Britain is trying to get us to accept Parliamentary taxation by making the tea cheap. If we buy the taxed tea, we're admitting Parliament has the right to tax us. "It's the principle," my master says. "Once we accept one tax, they'll tax everything."

Three ships carrying East India Company tea have arrived in Boston Harbor: the Dartmouth, the Eleanor, and the Beaver. Governor Hutchinson won't let them leave without unloading their cargo. Samuel Adams and the Sons of Liberty won't let the tea be unloaded. We're at a standoff.

Tonight, December 16, 1773, a huge crowd has gathered at Old South Meeting House. I'm here with my master, listening to speeches about liberty and tyranny. Samuel Adams says, "This meeting can do nothing more to save the country." It's a signal. We all know what happens next.`,
        },
        {
          title: "The Destruction of the Tea",
          content: `Outside the meeting house, I see men disguising themselves as Mohawk Indians—a thin disguise of blankets, face paint, and feathers. It's meant to hide our identities and perhaps to symbolize that we're Americans, not British. I join them. My heart races with excitement and fear.

We march to Griffin's Wharf where the ships are docked. There are about 150 of us. We board the ships in organized groups. The captains and crew don't resist—this is between us and the British government, not them.

For three hours, we work systematically. We break open 342 chests of tea with axes and hatchets. We dump the tea into Boston Harbor. The smell of tea fills the air. We damage nothing else—this is a protest against the tax, not theft or vandalism. When we're done, we sweep the decks clean.

The next morning, Boston Harbor is a giant tea pot. The destroyed tea is worth £10,000—a fortune. We've made our point: we will not accept taxation without representation, not even for cheap tea. Britain will have to respond, and I fear what that response will be.`,
        },
        {
          title: "The Intolerable Acts",
          content: `Britain's response is swift and harsh. Parliament passes laws we call the Intolerable Acts. The Boston Port Act closes Boston Harbor until we pay for the tea—shutting down our economy. The Massachusetts Government Act strips away our charter and self-government. British officials accused of crimes will be tried in Britain, not here. We must quarter soldiers in our homes if needed.

These laws aren't just punishing Boston—they're attacking the fundamental rights of all Massachusetts colonists. Britain is showing its power, trying to make an example of us to frighten other colonies into submission.

But the Intolerable Acts backfire. Instead of isolating Boston, they unite the colonies. The other colonies send food and supplies to help us survive the blockade. They see that what Britain does to Massachusetts, it could do to any colony. Our resistance has become their resistance.

Plans are being made for a Continental Congress—representatives from all thirteen colonies meeting to coordinate a response to British tyranny. The Boston Tea Party wasn't just about tea. It was about whether we would submit to British authority or stand up for our rights. We chose to stand up, and now there's no turning back.`,
        },
        {
          title: "Colonial Unity Emerges",
          content: `In September 1774, representatives from twelve colonies (all except Georgia) met in Philadelphia for the First Continental Congress. This was extraordinary—never before had the colonies united like this. Each colony had always looked after its own interests. But now we realized that an attack on one colony was an attack on all.

The Congress debated how to respond to British tyranny. Some wanted immediate armed resistance. Others hoped for reconciliation with Britain. They settled on a middle course: a complete boycott of British goods until the Intolerable Acts were repealed, and a declaration of colonial rights.

They also formed the Continental Association to enforce the boycott. Committees of Correspondence spread throughout the colonies, sharing information and coordinating resistance. We were no longer thirteen separate colonies—we were becoming a united American people.

My master attended meetings of Boston's Committee of Correspondence. He came home energized by the sense of possibility. "For the first time," he said, "we're acting as one. If Britain tries to divide us, they'll fail. We're stronger together than they realize." The Tea Party had achieved more than destroying tea—it had united us in common cause.`,
        },
        {
          title: "The Point of No Return",
          content: `Looking back now, I see that December night in 1773 as the point of no return. We'd protested before—boycotts, petitions, demonstrations. But dumping the tea was different. We'd destroyed British property worth a fortune. We'd directly defied British authority. There was no way to undo it, no way to apologize our way out of it.

Britain had to respond with force, or lose all authority over the colonies. The Intolerable Acts weren't a mistake or an overreaction—they were inevitable. And our unified resistance to those acts was equally inevitable. We'd crossed a line from protest to open defiance.

I remember the excitement I felt that night, breaking open the tea chests. I felt like I was striking a blow for liberty. But in the months that followed, as Boston suffered under the blockade, as tensions mounted, as we prepared for possible war, I came to understand what that blow would cost.

My master says we're on a path to independence now, though few dare speak the word aloud. We've discovered that we can stand together against Britain. We've learned that we value our rights more than we value peace. And we've proven we're willing to fight for those rights. The tea floating in Boston Harbor was a symbol—a symbol that we would rather destroy our relationship with Britain than submit to tyranny. Within two years, we'd be at war. The Tea Party was the spark that lit the fuse.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc13-1",
        term: "Boston Tea Party",
        definition: "A 1773 protest where colonists dumped 342 chests of British tea into Boston Harbor to resist the Tea Act and taxation without representation.",
      },
      {
        id: "fc13-2",
        term: "Tea Act",
        definition: "A 1773 British law giving the East India Company a monopoly on colonial tea sales, including a tax that colonists opposed.",
      },
      {
        id: "fc13-3",
        term: "Intolerable Acts",
        definition: "Harsh British laws punishing Massachusetts for the Boston Tea Party, including closing Boston Harbor and reducing colonial self-government.",
      },
      {
        id: "fc13-4",
        term: "Boston Port Act",
        definition: "Part of the Intolerable Acts, this law closed Boston Harbor until the city paid for the destroyed tea, devastating the local economy.",
      },
      {
        id: "fc13-5",
        term: "Continental Congress",
        definition: "A meeting of representatives from the thirteen colonies to coordinate response to British policies. The First Continental Congress met in 1774.",
      },
      {
        id: "fc13-6",
        term: "Quartering",
        definition: "Forcing colonists to provide housing and supplies for British soldiers in their homes.",
      },
      {
        id: "fc13-7",
        term: "Monopoly",
        definition: "Exclusive control over a commodity or service. The Tea Act gave the British East India Company a monopoly on colonial tea sales.",
      },
      {
        id: "fc13-8",
        term: "Old South Meeting House",
        definition: "A Boston building where colonists gathered for meetings and protests, including the meeting that preceded the Boston Tea Party.",
      },
    ],
    quiz: [
      {
        id: "q13-1",
        question: "What was the Boston Tea Party?",
        options: [
          "A formal British celebration",
          "A protest where colonists dumped 342 chests of tea into Boston Harbor",
          "A real tea party with refreshments",
          "A battle with British soldiers",
        ],
        correctOptionIndex: 1,
        explanation: "The Boston Tea Party was a protest on December 16, 1773, where colonists boarded ships and dumped 342 chests of British tea into Boston Harbor to resist the Tea Act and taxation without representation.",
      },
      {
        id: "q13-2",
        question: "Why did colonists oppose the Tea Act?",
        options: [
          "Tea was too expensive",
          "They saw it as a trick to make them accept Parliamentary taxation without representation",
          "They didn't like tea",
          "It banned tea completely",
        ],
        correctOptionIndex: 1,
        explanation: "Colonists opposed the Tea Act not because of the price, but because accepting the taxed tea would mean accepting Parliament's right to tax them without their consent. It was about the principle of representation.",
      },
      {
        id: "q13-3",
        question: "What were the Intolerable Acts?",
        options: [
          "Laws giving colonists more freedom",
          "Harsh British laws punishing Massachusetts, including closing Boston Harbor",
          "Laws against tea drinking",
          "Acts supporting colonial rights",
        ],
        correctOptionIndex: 1,
        explanation: "The Intolerable Acts were punishing laws passed by Britain in response to the Boston Tea Party. They closed Boston Harbor, reduced self-government, and imposed other harsh measures on Massachusetts.",
      },
      {
        id: "q13-4",
        question: "How did other colonies react to the Intolerable Acts?",
        options: [
          "They ignored Boston's problems",
          "They supported Britain against Boston",
          "They united in support of Massachusetts, sending aid and organizing the Continental Congress",
          "They each closed their own harbors",
        ],
        correctOptionIndex: 2,
        explanation: "Instead of isolating Boston as Britain intended, the Intolerable Acts united the colonies. They sent food and supplies to Boston and organized the First Continental Congress to coordinate resistance.",
      },
      {
        id: "q13-5",
        question: "Why did the Tea Party participants disguise themselves as Mohawk Indians?",
        options: [
          "To honor Native Americans",
          "To hide their identities and perhaps symbolize that they were Americans, not British",
          "They were actually Mohawks",
          "Britain required the disguise",
        ],
        correctOptionIndex: 1,
        explanation: "The disguises served two purposes: hiding participants' identities to avoid arrest, and perhaps symbolizing that they identified as Americans rather than British subjects.",
      },
      {
        id: "q13-6",
        question: "What was the Boston Port Act?",
        options: [
          "A law opening more ports",
          "Part of the Intolerable Acts that closed Boston Harbor until the city paid for the destroyed tea",
          "A celebration of the Tea Party",
          "A law protecting Boston's shipping",
        ],
        correctOptionIndex: 1,
        explanation: "The Boston Port Act closed Boston Harbor until the city paid for the destroyed tea. This devastated Boston's economy, which depended on maritime trade.",
      },
      {
        id: "q13-7",
        question: "How much tea was destroyed in the Boston Tea Party?",
        options: [
          "A few pounds",
          "342 chests worth about £10,000",
          "One chest",
          "All the tea in Boston",
        ],
        correctOptionIndex: 1,
        explanation: "Participants destroyed 342 chests of tea worth about £10,000—a fortune at the time. This significant destruction made a powerful statement about colonial resistance.",
      },
      {
        id: "q13-8",
        question: "What was significant about the Continental Congress forming after the Intolerable Acts?",
        options: [
          "It showed Britain had won",
          "It demonstrated colonial unity and coordination in response to British policies",
          "Only one colony participated",
          "It supported the Intolerable Acts",
        ],
        correctOptionIndex: 1,
        explanation: "The First Continental Congress brought together representatives from thirteen colonies to coordinate resistance. This unprecedented unity showed that Britain's punitive measures had backfired, uniting rather than dividing the colonies.",
      },
    ],
  },

  // LESSON 14: The Shot Heard Round the World
  {
    id: "lesson-14",
    title: "The Shot Heard Round the World",
    description: "Lexington and Concord (1775)",
    heroImage: "/images/hero-lexington-concord.jpg",
    story: {
      narrator: "Nathan, age 17, a Minuteman from Concord, Massachusetts, 1775",
      chapters: [
        {
          title: "The Midnight Ride",
          content: `My name is Nathan, and I am seventeen years old. I'm a Minuteman—part of our militia trained to be ready at a minute's notice. Tonight, April 18, 1775, that training will be tested.

Word has reached us that British troops are marching from Boston to seize our weapons and gunpowder stored in Concord, and possibly to arrest Samuel Adams and John Hancock who are hiding in Lexington. We've been preparing for this. The Sons of Liberty have a warning system—lanterns in the Old North Church steeple. "One if by land, two if by sea."

Paul Revere and William Dawes have ridden through the night warning us: "The Regulars are out!" They're coming. At dawn, British soldiers—about 700 of them—will reach Lexington, then Concord. We're outnumbered, but this is our land, our liberty. We will make a stand.

I've grabbed my musket, my powder horn, and my shot pouch. My mother holds back tears as I kiss her goodbye. My father grips my shoulder. "Remember, you're fighting for our rights, for our future," he says. I head to the Concord town green where militiamen are gathering. We're farmers, blacksmiths, shopkeepers—ordinary men about to make history.`,
        },
        {
          title: "Lexington Green",
          content: `At dawn in Lexington, Captain John Parker lined up about 70 militiamen on the town green. They could hear the British approaching—marching feet, rattling equipment, officers shouting commands. The British force was ten times their size.

Parker told his men: "Stand your ground. Don't fire unless fired upon. But if they mean to have a war, let it begin here." These words echo in my mind as I hear the story later. What courage to stand against the British army!

The British commander, Major Pitcairn, ordered the militiamen to disperse. Parker's men began to withdraw—they couldn't fight such overwhelming numbers. Then a shot rang out. Nobody knows who fired it—British or colonist. It didn't matter. More shots followed. British soldiers fired volleys into the militia.

Eight colonists died on Lexington Green. Ten were wounded. Only one British soldier was slightly injured. It wasn't a battle—it was a slaughter. The British marched on to Concord, thinking they'd crushed colonial resistance. They were wrong.`,
        },
        {
          title: "The Battle of Concord",
          content: `By the time the British reached Concord, we'd assembled hundreds of militiamen. We watched from a ridge as British soldiers searched the town for weapons and supplies. We'd hidden most of it, but they found some and started burning it. Smoke rose from the town center.

We couldn't just watch our town burn. We marched toward the North Bridge. British soldiers guarded it. Major John Buttrick gave the order: "Fire, fellow soldiers, for God's sake, fire!" We fired. The British fired back. Two militiamen fell dead, but several British soldiers also went down. The British retreated.

This was different from Lexington. We stood our ground. We fought back. We won. The British realized they were in trouble—surrounded by armed colonists who knew every hill, every stone wall, every hiding place in this countryside.

The British began their retreat to Boston. That's when the real fighting began. We didn't fight like European armies in neat lines. We fired from behind trees, stone walls, buildings. All the way back to Boston, we harassed them. They called it cowardly. We called it smart. By day's end, 73 British soldiers were dead, 200 wounded or missing. We lost 49 killed, 39 wounded. The war had begun.`,
        },
        {
          title: "No Turning Back",
          content: `Tonight, I'm home, exhausted and shaken. I fired my musket at British soldiers today. British soldiers fired at me. Some of my neighbors are dead. This morning we were British subjects arguing about taxes and rights. Tonight we're rebels fighting for our freedom.

News of Lexington and Concord is spreading throughout the colonies. Militias are forming everywhere. Men are marching toward Boston, surrounding the British forces there. The Second Continental Congress will meet to decide what to do. But in truth, the decision has already been made—not in Philadelphia, but here in Massachusetts.

We don't yet call it a revolution. We say we're defending our rights as Englishmen. But we're not fools. We've fired on the King's troops. They've fired on us. There's no peaceful resolution now. We're at war.

Ralph Waldo Emerson would later call that first shot at Concord "the shot heard round the world." He's right. What happened here will echo far beyond Massachusetts. We've shown that ordinary people can stand up to the most powerful empire on Earth. Others will follow our example. The American Revolution has begun, and the world will never be the same.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc14-1",
        term: "Lexington and Concord",
        definition: "The first battles of the American Revolution on April 19, 1775, where colonial militias fought British troops.",
      },
      {
        id: "fc14-2",
        term: "Minutemen",
        definition: "Colonial militia members trained to be ready to fight at a minute's notice.",
      },
      {
        id: "fc14-3",
        term: "Paul Revere",
        definition: "Patriot who rode from Boston to Lexington warning that British troops were coming to seize colonial weapons.",
      },
      {
        id: "fc14-4",
        term: "Shot Heard Round the World",
        definition: "A phrase describing the first shot at Lexington or Concord, symbolizing the start of the American Revolution and its global significance.",
      },
      {
        id: "fc14-5",
        term: "John Parker",
        definition: "Captain who commanded the militia at Lexington Green, famously saying 'If they mean to have a war, let it begin here.'",
      },
      {
        id: "fc14-6",
        term: "Second Continental Congress",
        definition: "Meeting of colonial delegates in May 1775 that managed the war effort and eventually declared independence.",
      },
      {
        id: "fc14-7",
        term: "Regulars",
        definition: "British regular army soldiers, as distinguished from colonial militia.",
      },
      {
        id: "fc14-8",
        term: "North Bridge",
        definition: "The location at Concord where colonial militia made a successful stand against British troops, forcing them to retreat.",
      },
    ],
    quiz: [
      {
        id: "q14-1",
        question: "What were the British trying to do when they marched to Lexington and Concord?",
        options: [
          "Negotiate peace",
          "Seize colonial weapons and possibly arrest patriot leaders like Samuel Adams and John Hancock",
          "Deliver supplies",
          "Celebrate a holiday",
        ],
        correctOptionIndex: 1,
        explanation: "The British marched to seize colonial weapons and ammunition stored in Concord and possibly to arrest patriot leaders Samuel Adams and John Hancock who were in Lexington.",
      },
      {
        id: "q14-2",
        question: "What were Minutemen?",
        options: [
          "British soldiers",
          "Colonial militia trained to be ready to fight at a minute's notice",
          "Politicians",
          "Shopkeepers",
        ],
        correctOptionIndex: 1,
        explanation: "Minutemen were members of colonial militias specially trained and equipped to respond quickly to threats. They could mobilize for battle at a minute's notice.",
      },
      {
        id: "q14-3",
        question: "What did Paul Revere do on April 18, 1775?",
        options: [
          "Led British troops",
          "Rode from Boston to warn colonists that British troops were coming",
          "Wrote the Declaration of Independence",
          "Fired the first shot",
        ],
        correctOptionIndex: 1,
        explanation: "Paul Revere rode from Boston to Lexington (and William Dawes took another route) to warn colonists that British troops were marching to seize weapons and arrest patriot leaders.",
      },
      {
        id: "q14-4",
        question: "What happened at Lexington Green?",
        options: [
          "Colonists won a great victory",
          "British troops killed eight militiamen in a brief confrontation",
          "Both sides negotiated peace",
          "Nothing significant",
        ],
        correctOptionIndex: 1,
        explanation: "At Lexington Green, British troops vastly outnumbered the militia. After someone fired the first shot (unclear who), British soldiers killed eight colonists and wounded ten in a brief, one-sided confrontation.",
      },
      {
        id: "q14-5",
        question: "How was the Battle of Concord different from the encounter at Lexington?",
        options: [
          "There was no difference",
          "At Concord, colonial militia successfully stood their ground, fought back, and forced British troops to retreat",
          "The British won at Concord too",
          "No one fought at Concord",
        ],
        correctOptionIndex: 1,
        explanation: "At Concord, larger numbers of colonial militia successfully engaged British troops at North Bridge, stood their ground, and forced the British to begin retreating to Boston.",
      },
      {
        id: "q14-6",
        question: "How did colonial militia fight during the British retreat to Boston?",
        options: [
          "In traditional European-style formations",
          "They didn't fight during the retreat",
          "From behind trees, stone walls, and buildings, using guerrilla tactics",
          "They surrendered",
        ],
        correctOptionIndex: 2,
        explanation: "Colonial militia used guerrilla tactics, firing from behind trees, stone walls, and buildings along the route. This harassment inflicted heavy casualties on British troops during their retreat to Boston.",
      },
      {
        id: "q14-7",
        question: "Why is the first shot at Lexington or Concord called 'the shot heard round the world'?",
        options: [
          "It was extremely loud",
          "It started the American Revolution, which would inspire people around the world",
          "Everyone on Earth heard it",
          "It was the only shot fired",
        ],
        correctOptionIndex: 1,
        explanation: "Ralph Waldo Emerson coined this phrase because the battle started the American Revolution, an event with global significance that would inspire revolutionary movements around the world.",
      },
      {
        id: "q14-8",
        question: "What was the significance of Lexington and Concord?",
        options: [
          "They were minor skirmishes with no importance",
          "They were the first battles of the American Revolution, making war inevitable",
          "They ended the war",
          "They made peace with Britain",
        ],
        correctOptionIndex: 1,
        explanation: "Lexington and Concord were the first military engagements of the American Revolution. After colonists and British troops exchanged fire, peaceful resolution became impossible and war was inevitable.",
      },
    ],
  },

  // LESSON 15: Common Sense & Independence
  {
    id: "lesson-15",
    title: "Common Sense & Independence",
    description: "The Declaration of Independence (1776)",
    heroImage: "/images/hero-declaration.jpg",
    story: {
      narrator: "Hannah, age 16, daughter of a Philadelphia delegate, 1776",
      chapters: [
        {
          title: "Common Sense",
          content: `My name is Hannah, and I am sixteen years old. My father is a delegate to the Continental Congress meeting here in Philadelphia. In January, a pamphlet called "Common Sense" by Thomas Paine swept through the colonies like wildfire. Father brought a copy home, and I read it with amazement.

Paine writes in plain language anyone can understand. He argues that it's absurd for a continent to be governed by an island, that hereditary monarchy is unjust, that America should be independent. His words are revolutionary: "The birthday of a new world is at hand."

Before "Common Sense," many colonists hoped to reconcile with Britain. We wanted our rights as British subjects restored. But Paine argues we should be our own nation. Within months, 120,000 copies sold in a population of 2.5 million. Everyone is talking about independence now.`,
        },
        {
          title: "Writing the Declaration",
          content: `On June 7, Richard Henry Lee proposed that "these United Colonies are, and of right ought to be, free and independent States." The Congress appointed a committee to draft a declaration: Thomas Jefferson, John Adams, Benjamin Franklin, and two others.

Jefferson did most of the writing. I saw him around Philadelphia, looking tired and worried. He wrote at a portable desk in his rented room, choosing each word carefully. He based it on Enlightenment ideas—natural rights, consent of the governed, the right to alter or abolish government.

The Declaration lists grievances against King George III, but the most powerful part is the beginning: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness."

These words will change the world. They don't just justify our rebellion—they express universal principles about human rights and government. Though I notice the irony: we say all men are created equal while many colonists own slaves. This contradiction will haunt our new nation.`,
        },
        {
          title: "The Vote for Independence",
          content: `On July 2, 1776, the Continental Congress voted for independence. Twelve colonies voted yes; New York abstained but later agreed. July 2 is actually Independence Day, though we'll celebrate July 4, when the Declaration was formally adopted.

The debates were intense. Some delegates feared we couldn't win against Britain. Others worried about what came next—how do you build a nation from scratch? But the momentum was unstoppable. After Lexington, Bunker Hill, and a year of war, there was no turning back.

On July 4, the Congress adopted the Declaration. Church bells rang. Crowds gathered. The document was read aloud to cheering citizens. In New York, soldiers toppled a statue of King George III. We've burned our bridges. We're no longer fighting for our rights as British subjects—we're fighting for independence as a new nation: the United States of America.`,
        },
        {
          title: "Revolutionary Ideas",
          content: `The Declaration is more than a list of complaints against King George. It's a statement of revolutionary political philosophy drawn from Enlightenment thinkers like John Locke. The ideas it expresses will echo through history.

First, it asserts that all people have natural rights that governments cannot legitimately take away. This contradicts the old idea that monarchs rule by divine right. Instead, governments exist to protect people's rights, and their power comes from the consent of the governed.

Second, it declares that when government becomes tyrannical, the people have the right—even the duty—to alter or abolish it and create new government. This justifies revolution as a legitimate political act when circumstances warrant it.

Third, though it says "all men are created equal," the Declaration plants seeds of universal human equality. Over time, groups denied these rights—women, enslaved people, indigenous peoples, workers—will point to these words and demand their own freedom and equality.

Father says the Declaration creates a promise America must strive to fulfill. We've declared these principles, but we don't yet live up to them. The real revolution won't be won just on battlefields—it will be the long struggle to make our practices match our principles.`,
        },
        {
          title: "The Price of Freedom",
          content: `After the signing, Benjamin Franklin reportedly said, "We must all hang together, or most assuredly we shall all hang separately." He meant it literally. By signing the Declaration, fifty-six men committed treason against Britain. If we lose this war, they'll be executed.

I've watched the strain on Father's face. Some signers have already paid dearly. British troops have burned homes, confiscated property, and imprisoned family members. These men have pledged "our Lives, our Fortunes and our sacred Honor" to this cause. They're risking everything for an uncertain future.

And it's not just the signers. Every soldier in the Continental Army is now a traitor to Britain. Every citizen supporting independence risks punishment. We've chosen a dangerous path. We're fighting the most powerful empire on Earth, with the world's strongest navy and a professional army. Our chances seem slim.

But Father says some things are worth any price. "We're not just fighting for ourselves," he told me. "We're fighting for the principle that people have the right to govern themselves. If we succeed, we'll prove that ordinary people can create their own government based on reason and rights, not tradition and force. That idea will change the world."

Standing in Independence Hall as the Declaration was read, I felt the weight of history. We've started something that won't end with this war. We've proclaimed ideals that will challenge tyranny everywhere. We've declared not just our independence, but humanity's right to freedom. Whatever happens next, there's no going back. We're Americans now, and we're free—or we'll die trying.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc15-1",
        term: "Common Sense",
        definition: "A 1776 pamphlet by Thomas Paine arguing for American independence in plain language that influenced public opinion.",
      },
      {
        id: "fc15-2",
        term: "Declaration of Independence",
        definition: "The 1776 document declaring American independence and explaining the philosophical basis for revolution.",
      },
      {
        id: "fc15-3",
        term: "Thomas Jefferson",
        definition: "Primary author of the Declaration of Independence, expressing Enlightenment ideals about rights and government.",
      },
      {
        id: "fc15-4",
        term: "Unalienable Rights",
        definition: "Rights that cannot be taken away, including life, liberty, and the pursuit of happiness according to the Declaration.",
      },
      {
        id: "fc15-5",
        term: "All Men Are Created Equal",
        definition: "A principle from the Declaration stating that all people have equal value and rights, though not practiced in reality.",
      },
      {
        id: "fc15-6",
        term: "Thomas Paine",
        definition: "Author of Common Sense, which persuaded many colonists to support independence from Britain.",
      },
      {
        id: "fc15-7",
        term: "July 4, 1776",
        definition: "The date the Continental Congress adopted the Declaration of Independence, celebrated as Independence Day.",
      },
      {
        id: "fc15-8",
        term: "Natural Rights",
        definition: "Enlightenment concept that people are born with certain fundamental rights that government must protect.",
      },
    ],
    quiz: [
      {
        id: "q15-1",
        question: "What was Thomas Paine's 'Common Sense'?",
        options: [
          "A military strategy",
          "A pamphlet arguing for American independence in plain language",
          "A newspaper",
          "A declaration of war",
        ],
        correctOptionIndex: 1,
        explanation: "Common Sense was a pamphlet written by Thomas Paine in plain language arguing that America should be independent. It was hugely influential, selling 120,000 copies and changing public opinion.",
      },
      {
        id: "q15-2",
        question: "Who was the primary author of the Declaration of Independence?",
        options: [
          "George Washington",
          "Thomas Paine",
          "Thomas Jefferson",
          "Benjamin Franklin",
        ],
        correctOptionIndex: 2,
        explanation: "Thomas Jefferson was the primary author of the Declaration of Independence, though he received input from John Adams, Benjamin Franklin, and others on the drafting committee.",
      },
      {
        id: "q15-3",
        question: "What does 'unalienable rights' mean in the Declaration?",
        options: [
          "Rights that can be taken away",
          "Rights that cannot be taken away, given by the Creator",
          "Rights only for wealthy people",
          "Rights from the King",
        ],
        correctOptionIndex: 1,
        explanation: "Unalienable rights are fundamental rights that cannot be taken away or given up. The Declaration lists life, liberty, and the pursuit of happiness as examples.",
      },
      {
        id: "q15-4",
        question: "When did Congress actually vote for independence?",
        options: [
          "July 4, 1776",
          "July 2, 1776",
          "January 1, 1776",
          "December 25, 1776",
        ],
        correctOptionIndex: 1,
        explanation: "Congress actually voted for independence on July 2, 1776. July 4 is celebrated because that's when they formally adopted the written Declaration of Independence.",
      },
      {
        id: "q15-5",
        question: "What contradiction did the Declaration contain?",
        options: [
          "There was no contradiction",
          "It proclaimed all men equal while many signers owned slaves",
          "It opposed all government",
          "It supported the King",
        ],
        correctOptionIndex: 1,
        explanation: "The Declaration stated 'all men are created equal' while many signers and colonists owned enslaved people. This fundamental contradiction between ideals and practice would trouble America for generations.",
      },
      {
        id: "q15-6",
        question: "What Enlightenment ideas influenced the Declaration?",
        options: [
          "Divine right of kings",
          "Natural rights, consent of the governed, and right to alter government",
          "Absolute monarchy",
          "No government at all",
        ],
        correctOptionIndex: 1,
        explanation: "The Declaration was based on Enlightenment ideas from thinkers like John Locke: natural rights, government by consent of the governed, and the right of people to alter or abolish unjust government.",
      },
    ],
  },

  // LESSON 16-18: Continuing Revolutionary War through Constitution
  // (Adding efficiently to save tokens for remaining lessons 19-50)

  {
    id: "lesson-16",
    title: "Winter at Valley Forge",
    description: "Revolutionary War Hardships (1777-1778)",
    heroImage: "/images/hero-valley-forge.jpg",
    story: {
      narrator: "Joseph, age 17, Continental Army soldier, 1777-1778",
      chapters: [
        {
          title: "Defeat and Despair",
          content: `I'm Joseph, seventeen, a soldier in General Washington's Continental Army. It's December 1777, and we've lost Philadelphia to the British. We're marching to winter camp at Valley Forge, Pennsylvania. Many soldiers have no shoes—I can track our route by bloody footprints in the snow.

We've been defeated at Brandywine and Germantown. The British sit warm in Philadelphia while we're headed to a frozen hillside with inadequate food, clothing, and shelter. Congress hasn't sent supplies or paid us. Some men are deserting. Others are too sick to walk. I wonder if we'll survive this winter, let alone win this war.`,
        },
        {
          title: "Trials of Valley Forge",
          content: `Valley Forge is hell on earth. We build crude log huts, twelve men crammed in each. The cold seeps through every crack. We have little food—sometimes just "firecake" (flour and water baked on stones) and watery soup. Men are dying of typhus, dysentery, and pneumonia. Of 12,000 men, 2,500 will die here.

I'm hungry all the time. My feet are wrapped in rags. I share a thin blanket with two others. At night, I hear men coughing, praying, weeping. Some give up and go home. Others steal from nearby farms. Washington struggles to hold the army together.

But we don't give up. We're fighting for something greater than ourselves—for liberty, for our families, for the idea that we can govern ourselves. Washington shares our suffering, refusing to stay in a warm house while his men freeze. His example keeps us going.`,
        },
        {
          title: "Baron von Steuben",
          content: `In February, Baron von Steuben arrives—a Prussian military officer who volunteers to train us. He doesn't speak English well, but he teaches us to march in formation, load muskets quickly, use bayonets effectively. He makes us into real soldiers.

Before von Steuben, we were farmers with guns. Now we drill every day, learning professional military tactics. It's hard work, but it gives us pride and purpose. We're becoming an army that can stand against British regulars.

By spring, we've survived. We're hardened, trained, disciplined. News arrives of a French alliance—France will support our cause with money, ships, and soldiers. The war isn't over, but we have hope now. Valley Forge didn't break us. It made us stronger.`,
        },
        {
          title: "Daily Survival",
          content: `Every day at Valley Forge is a battle for survival. We wake before dawn to the sound of drums. Those healthy enough for duty drill or stand guard. The sick—and there are always hundreds sick—lie in the huts, shivering with fever. Our surgeon does what he can with almost no medicine or equipment.

Food is our constant obsession. On good days, we get meat and bread. On bad days—and there are many bad days—we get nothing but firecake. I've learned to catch rats to supplement our rations. I'm not proud of it, but I'll eat anything to stay alive.

The worst part is watching friends die. My bunkmate Samuel died last week from pneumonia. We buried him in a shallow grave on the hillside with dozens of others. There was no time for proper funerals. His parents will never know where he's buried or that he died fighting for liberty.

Yet somehow we endure. We tell stories around fires, sing songs, write letters home. We gamble with worthless Continental currency. We complain bitterly about Congress, about officers, about the cold, the hunger, everything. Complaining keeps us human. And through it all, we see Washington—he could be in a warm house, but he visits our huts, checks on the sick, shares our hardships. If he hasn't given up on us, we can't give up on ourselves.`,
        },
        {
          title: "Transformation",
          content: `When we marched into Valley Forge in December, we were a defeated, disorganized rabble. When we marched out in June, we were an army. The transformation wasn't just about von Steuben's training, though that mattered. It was about what we endured together and what we became.

We learned that we could survive anything. British regulars might have better equipment, better supplies, better training. But they've never endured what we've endured. They fight for pay and duty. We fight for our homes, our freedom, our future. That difference makes us dangerous.

Von Steuben gave us the skills, but Valley Forge gave us the spirit. We're not fighting as separate colonies anymore—we're Americans, united by shared suffering and shared purpose. Men from Massachusetts and Virginia, farmers and merchants, immigrants and native-born, we've forged a brotherhood in this frozen camp.

The spring of 1778 brings new energy. The French alliance means we're not alone against Britain anymore. Supplies finally arrive. The weather warms. We drill with precision, our formations crisp, our movements coordinated. British General Howe decides to abandon Philadelphia and retreat to New York. For the first time, they're retreating from us.

As we prepared to leave Valley Forge, Washington addressed us. He thanked us for our sacrifice and endurance. He said history would remember what we accomplished here. I looked around at my fellow soldiers—thin, scarred, hardened—and I knew he was right. We'd been tested in the crucible of Valley Forge, and we'd passed the test. We'd become an army worthy of independence. The war was far from over, but we'd proven we could win it.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc16-1",
        term: "Valley Forge",
        definition: "The site where Washington's army spent the brutal winter of 1777-1778, enduring terrible conditions but emerging stronger.",
      },
      {
        id: "fc16-2",
        term: "Baron von Steuben",
        definition: "Prussian military officer who trained the Continental Army at Valley Forge, teaching professional military tactics.",
      },
      {
        id: "fc16-3",
        term: "Continental Army",
        definition: "The American military force led by George Washington during the Revolutionary War.",
      },
      {
        id: "fc16-4",
        term: "French Alliance",
        definition: "France's decision to support America with money, military supplies, and troops after the Battle of Saratoga.",
      },
      {
        id: "fc16-5",
        term: "George Washington",
        definition: "Commander of the Continental Army who held his troops together through terrible hardships at Valley Forge.",
      },
      {
        id: "fc16-6",
        term: "Desertion",
        definition: "When soldiers abandon their military service. Many Continental soldiers deserted due to harsh conditions.",
      },
      {
        id: "fc16-7",
        term: "Drill",
        definition: "Military training and practice in formations, tactics, and discipline.",
      },
      {
        id: "fc16-8",
        term: "Bayonet",
        definition: "A blade attached to the end of a musket, used in close combat. Von Steuben trained Americans in bayonet fighting.",
      },
    ],
    quiz: [
      {
        id: "q16-1",
        question: "Why did Washington's army go to Valley Forge?",
        options: [
          "For a vacation",
          "To set up winter camp after losing Philadelphia to the British",
          "To attack the British",
          "To celebrate victory",
        ],
        correctOptionIndex: 1,
        explanation: "After being defeated and losing Philadelphia to the British, Washington's army retreated to Valley Forge, Pennsylvania, for winter camp in December 1777.",
      },
      {
        id: "q16-2",
        question: "What were conditions like at Valley Forge?",
        options: [
          "Comfortable and warm",
          "Terrible—cold, hunger, disease, inadequate shelter, causing 2,500 deaths",
          "Perfectly supplied",
          "No different from summer camp",
        ],
        correctOptionIndex: 1,
        explanation: "Valley Forge was brutal: freezing cold, little food, inadequate clothing and shelter, and disease. About 2,500 of 12,000 soldiers died there during the winter.",
      },
      {
        id: "q16-3",
        question: "Who was Baron von Steuben and what did he do?",
        options: [
          "A British general who attacked Valley Forge",
          "A Prussian officer who trained the Continental Army in professional military tactics",
          "A French king",
          "An American politician",
        ],
        correctOptionIndex: 1,
        explanation: "Baron von Steuben was a Prussian military officer who volunteered to train the Continental Army. He taught them professional military tactics, drill, and discipline, transforming them into an effective fighting force.",
      },
      {
        id: "q16-4",
        question: "What good news arrived by spring 1778?",
        options: [
          "The war was over",
          "France had formed an alliance and would support America",
          "Britain surrendered",
          "Congress sent unlimited supplies",
        ],
        correctOptionIndex: 1,
        explanation: "France formally allied with America, agreeing to provide money, military supplies, ships, and troops. This alliance was crucial to eventual American victory.",
      },
      {
        id: "q16-5",
        question: "What was the ultimate significance of Valley Forge?",
        options: [
          "It destroyed the Continental Army",
          "Though brutal, it strengthened the army through survival, training, and renewed commitment",
          "Nothing significant happened",
          "The British won the war there",
        ],
        correctOptionIndex: 1,
        explanation: "Valley Forge, though devastating, ultimately strengthened the Continental Army. Survivors were toughened, von Steuben's training made them professional soldiers, and they proved their commitment to the cause.",
      },
    ],
  },

  {
    id: "lesson-17",
    title: "Victory at Yorktown",
    description: "Winning Independence (1781)",
    heroImage: "/images/hero-yorktown.jpg",
    story: {
      narrator: "Marcus, age 16, son of a freed Black soldier, 1781",
      chapters: [
        {
          title: "A Long War",
          content: `I'm Marcus, sixteen years old. My father is a freed Black man fighting for American independence in exchange for his freedom. For six years, this war has dragged on. We've won some battles, lost others. The British control the South. Many Americans are tired, wondering if we'll ever win.

But General Washington has a plan. British General Cornwallis has moved his army to Yorktown, Virginia, on the Chesapeake Bay. He expects British ships to supply and support him. Washington sees an opportunity—if we can trap Cornwallis with the French fleet blocking the bay, we might win a decisive victory.`,
        },
        {
          title: "The Trap Closes",
          content: `Washington marches his army south, coordinating with French General Rochambeau. The French fleet under Admiral de Grasse sails into Chesapeake Bay, defeating the British navy and blocking Cornwallis's escape by sea. American and French forces surround Yorktown by land. Cornwallis is trapped.

For weeks, we bombard Yorktown. French artillery pounds British positions. We dig trenches closer and closer to their fortifications. I watch as my father and other soldiers storm British redoubts in night attacks. The British are running out of food, ammunition, and hope. Cornwallis tries to escape across the York River but is turned back by a storm.`,
        },
        {
          title: "The Siege",
          content: `The siege of Yorktown lasts three weeks, and every day brings us closer to victory. Our artillery—American and French cannons positioned in carefully dug trenches—pounds the British positions day and night. The sound is constant, thunderous. I help carry ammunition, my ears ringing from the noise.

Washington and Rochambeau coordinate their forces with precision. We dig parallel trenches, each one closer to British fortifications. This is siege warfare—slow, methodical, deadly. British artillery fires back, and men die every day, but we keep advancing.

On October 14, Father participates in a night assault on British Redoubt Number 10. American troops, including Black soldiers like him, charge with bayonets fixed, taking the position in brutal hand-to-hand combat. The French simultaneously capture Redoubt Number 9. With these positions in American hands, our artillery can fire directly into Yorktown.

Cornwallis is desperate. He tries to evacuate across the York River to Gloucester Point, hoping to escape north. But a sudden storm scatters his boats. Even nature seems to favor American independence. By October 17, Cornwallis sends a drummer boy and an officer with a white flag. He's ready to discuss terms. After six years of war, the end is finally in sight.`,
        },
        {
          title: "Surrender",
          content: `On October 19, 1781, Cornwallis surrenders. Over 7,000 British soldiers lay down their weapons. As they march out, their band plays "The World Turned Upside Down"—an appropriate song. We colonists have defeated the mighty British Empire.

I watch with my father as redcoats stack their muskets. Some British soldiers are crying. American and French soldiers stand at attention. Washington sits on his horse, dignified in victory. My father stands straight and proud—a free man who helped win freedom for a nation.

This doesn't end the war officially—that will take two more years of negotiations. But Yorktown is the decisive victory. Britain will give up. We've won. The United States of America will be independent.`,
        },
        {
          title: "What Victory Means",
          content: `As I watch the British surrender, I think about what this victory means for different people. For General Washington and the Continental Army, it's vindication of eight years of sacrifice. For the French, it's revenge against their British rivals. For most Americans, it's the chance to govern themselves without kings or lords.

But for my father and other Black soldiers, the meaning is more complicated. Father fought for American freedom in exchange for his own freedom. Many enslaved men were promised liberty for their military service. Some will receive it; others will be betrayed, sent back to slavery despite their service.

I ask Father if he thinks America will live up to its promises of liberty and equality. He pauses, watching the British lay down their arms. "We've proven we can fight for freedom," he says quietly. "Now we must fight to make that freedom real for everyone. The war for independence is won, but the struggle for true equality is just beginning."

The victory is real—we've defeated the most powerful empire on Earth. Thirteen colonies have become a free nation. But Father's words remind me that independence is just the first step. The Declaration says all men are created equal, but we haven't made that true yet. That's the next battle, and it will take longer than this war.

Still, today is a day for celebration. The impossible has happened. Farmers and shopkeepers, French aristocrats and freed slaves, fighting together, have created a new nation based on the radical idea that people can govern themselves. Yorktown is more than a military victory—it's proof that ideals like liberty and self-government can triumph over tyranny and inherited power. The world has indeed turned upside down, and nothing will ever be the same.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc17-1",
        term: "Battle of Yorktown",
        definition: "The decisive 1781 battle where Washington and French forces trapped and defeated British General Cornwallis, ending major fighting in the Revolutionary War.",
      },
      {
        id: "fc17-2",
        term: "General Cornwallis",
        definition: "British general who surrendered at Yorktown, ending major combat in the Revolutionary War.",
      },
      {
        id: "fc17-3",
        term: "Admiral de Grasse",
        definition: "French admiral whose fleet blocked Chesapeake Bay, preventing British escape by sea and enabling the Yorktown victory.",
      },
      {
        id: "fc17-4",
        term: "Rochambeau",
        definition: "French general who commanded French forces fighting alongside Washington at Yorktown.",
      },
      {
        id: "fc17-5",
        term: "Siege",
        definition: "A military tactic of surrounding and bombarding an enemy position to force surrender, used at Yorktown.",
      },
      {
        id: "fc17-6",
        term: "Black Patriots",
        definition: "African Americans who fought for American independence, often in exchange for freedom from slavery.",
      },
      {
        id: "fc17-7",
        term: "Treaty of Paris (1783)",
        definition: "The treaty that officially ended the Revolutionary War and recognized American independence.",
      },
      {
        id: "fc17-8",
        term: "Redoubt",
        definition: "A small defensive fortification. American and French forces stormed British redoubts at Yorktown.",
      },
    ],
    quiz: [
      {
        id: "q17-1",
        question: "What was the key to American victory at Yorktown?",
        options: [
          "Fighting alone without help",
          "Trapping Cornwallis between French naval blockade and American/French land forces",
          "Bribing British soldiers",
          "A surprise snowstorm",
        ],
        correctOptionIndex: 1,
        explanation: "The key was coordination: the French fleet blocked Chesapeake Bay while American and French land forces surrounded Yorktown, trapping Cornwallis with no escape route.",
      },
      {
        id: "q17-2",
        question: "What role did France play at Yorktown?",
        options: [
          "None—Americans fought alone",
          "Crucial—French fleet blocked British ships and French troops fought alongside Americans",
          "France fought against America",
          "France only sent money",
        ],
        correctOptionIndex: 1,
        explanation: "France played a crucial role: Admiral de Grasse's fleet blocked British escape by sea, and French troops under Rochambeau fought alongside American forces on land.",
      },
      {
        id: "q17-3",
        question: "What happened on October 19, 1781?",
        options: [
          "The war started",
          "Cornwallis surrendered at Yorktown, effectively ending major combat",
          "Washington was captured",
          "Britain won a great victory",
        ],
        correctOptionIndex: 1,
        explanation: "On October 19, 1781, British General Cornwallis surrendered over 7,000 troops at Yorktown. This was the decisive American victory that effectively ended major combat in the Revolutionary War.",
      },
      {
        id: "q17-4",
        question: "Did the Battle of Yorktown immediately end the war?",
        options: [
          "Yes, Britain surrendered that day",
          "No, but it was the decisive victory; the war officially ended with the Treaty of Paris in 1783",
          "The war continued for ten more years",
          "Yorktown had no effect on the war",
        ],
        correctOptionIndex: 1,
        explanation: "While Yorktown was the decisive military victory, the war officially ended two years later with the Treaty of Paris in 1783, which recognized American independence.",
      },
      {
        id: "q17-5",
        question: "Why did some African Americans fight for American independence?",
        options: [
          "They were forced to fight",
          "They were promised freedom from slavery in exchange for military service",
          "They had no reason to fight",
          "All enslaved people were automatically freed",
        ],
        correctOptionIndex: 1,
        explanation: "Some African Americans fought for American independence because they were promised freedom from slavery in exchange for their military service. However, many remained enslaved even after the war.",
      },
    ],
  },

  {
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

Last year, farmers in Massachusetts rebelled against high taxes in Shays' Rebellion. The weak national government couldn't stop it. Everyone realized we need a stronger government, or our new nation will fall apart. That's why delegates from twelve states are meeting in secret at Independence Hall.`,
        },
        {
          title: "The Great Compromise",
          content: `Father comes home exhausted each night, unable to tell me details—they've sworn secrecy. But I overhear conversations. The big debate is representation: Should each state have equal votes, or should larger states have more power based on population?

Delegates are deadlocked. Small states fear being controlled by large states. Large states say equal votes are unfair when they have more people. Finally, Roger Sherman proposes the Great Compromise: a two-house legislature. The Senate gives each state equal votes (two senators). The House of Representatives bases votes on population. Both houses must approve laws.

Other compromises follow. Northern and Southern states disagree about counting enslaved people for representation. They settle on the Three-Fifths Compromise—enslaved people count as three-fifths of a person for population purposes. This is morally wrong, but it's the compromise that keeps Southern states in the Union.`,
        },
        {
          title: "The Constitution's Framework",
          content: `The Constitution creates a government of separated powers designed to prevent tyranny. The delegates remembered how British power had been abused, so they built a system where no one branch could dominate.

The Legislative Branch (Congress) makes laws. It's divided into two houses: the Senate and House of Representatives. This was the Great Compromise. Only Congress can declare war, collect taxes, coin money, and regulate interstate commerce.

The Executive Branch, headed by the President, enforces laws. The President is commander-in-chief of the military, conducts foreign policy, and appoints judges and officials (with Senate approval). The President can veto laws, but Congress can override vetoes with a two-thirds vote.

The Judicial Branch interprets laws. The Supreme Court and lower federal courts decide if laws follow the Constitution. Though not explicitly stated, this gives courts the power to strike down unconstitutional laws.

Each branch checks the others. The President can veto laws, but Congress can override. Congress approves Presidential appointments and can impeach the President. The courts can declare laws unconstitutional. It's a delicate balance designed to protect liberty while maintaining effective government.`,
        },
        {
          title: "Ratification and the Bill of Rights",
          content: `The Constitution is finished—creating three branches of government with checks and balances, federalism dividing power between national and state governments. But it needs ratification by nine of thirteen states.

Federalists like Hamilton, Madison, and Jay support it, writing essays called The Federalist Papers. Anti-Federalists like Patrick Henry oppose it, saying it gives too much power to the central government and lacks protection for individual rights.

The debate is intense. To win ratification, Federalists promise to add a Bill of Rights—amendments protecting freedoms like speech, religion, press, and trial by jury. States ratify the Constitution. In 1789, George Washington becomes our first President. The Bill of Rights is added in 1791.

We've created something remarkable: a republic based on popular sovereignty, where government power comes from the people. It's not perfect—it allows slavery, excludes women and non-property owners from voting. But it's a start, and the amendment process means we can improve it over time.`,
        },
        {
          title: "A Living Experiment",
          content: `Father brought home a printed copy of the Constitution. I read the Preamble carefully: "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America."

"More perfect"—not perfect, but more perfect. Father explains that the delegates knew they hadn't created a perfect document. The Three-Fifths Compromise treats human beings as property. Women aren't mentioned. Native peoples aren't considered. Poor men without property often can't vote. Yet the Constitution includes a mechanism for amendment, a way to improve over time.

This is the radical part: a government that can change, adapt, and grow more just without revolution. The Constitution isn't carved in stone like ancient laws. It's a living document that can evolve as we learn and grow as a people.

Some delegates, like Benjamin Franklin, signed despite reservations. He reportedly said, "I consent, Sir, to this Constitution because I expect no better, and because I am not sure that it is not the best." He understood that perfection is impossible, but progress is essential.

Standing in Independence Hall where both the Declaration and the Constitution were created, I feel the weight of what we've begun. In 1776, we declared our independence and stated our ideals. In 1787, we created a framework to pursue those ideals. The experiment is just beginning.

Will we live up to "all men are created equal"? Will we expand liberty and justice to include everyone? Will this Constitution endure through challenges we can't yet imagine? These questions will define America's future. We've built the structure, but each generation must decide what kind of nation to build within it. Father says that's the true meaning of "We the People"—the Constitution belongs to all of us, and we all have a responsibility to make it work and make it better.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc18-1",
        term: "Constitutional Convention",
        definition: "The 1787 Philadelphia meeting where delegates created the U.S. Constitution to replace the failing Articles of Confederation.",
      },
      {
        id: "fc18-2",
        term: "Articles of Confederation",
        definition: "America's first government system (1781-1789), which created a weak central government that ultimately failed.",
      },
      {
        id: "fc18-3",
        term: "Great Compromise",
        definition: "The agreement creating a two-house legislature: Senate (equal state representation) and House (population-based representation).",
      },
      {
        id: "fc18-4",
        term: "Three-Fifths Compromise",
        definition: "The agreement to count enslaved people as three-fifths of a person for representation and taxation purposes.",
      },
      {
        id: "fc18-5",
        term: "Federalists",
        definition: "Supporters of the Constitution who favored a strong central government, including Hamilton, Madison, and Jay.",
      },
      {
        id: "fc18-6",
        term: "Anti-Federalists",
        definition: "Opponents of the Constitution who feared too much central power and wanted a Bill of Rights, including Patrick Henry.",
      },
      {
        id: "fc18-7",
        term: "Bill of Rights",
        definition: "The first ten amendments to the Constitution, protecting individual freedoms like speech, religion, and due process.",
      },
      {
        id: "fc18-8",
        term: "Checks and Balances",
        definition: "The system where each branch of government can limit the powers of the other branches.",
      },
    ],
    quiz: [
      {
        id: "q18-1",
        question: "Why did the Articles of Confederation fail?",
        options: [
          "They gave too much power to central government",
          "They created a weak central government that couldn't tax, regulate trade, or enforce laws",
          "They were perfect",
          "Foreign countries rejected them",
        ],
        correctOptionIndex: 1,
        explanation: "The Articles created a very weak central government that lacked the power to tax, regulate interstate commerce, or enforce laws effectively. This led to economic chaos and events like Shays' Rebellion.",
      },
      {
        id: "q18-2",
        question: "What was the Great Compromise?",
        options: [
          "Ending slavery",
          "Creating a two-house legislature with Senate (equal representation) and House (population-based)",
          "Giving all power to large states",
          "Abolishing state governments",
        ],
        correctOptionIndex: 1,
        explanation: "The Great Compromise resolved the debate between large and small states by creating a bicameral legislature: the Senate gives equal representation (two per state), while the House bases representation on population.",
      },
      {
        id: "q18-3",
        question: "What was the Three-Fifths Compromise?",
        options: [
          "A tax rate",
          "An agreement to count enslaved people as three-fifths of a person for representation purposes",
          "A voting requirement",
          "A trade agreement",
        ],
        correctOptionIndex: 1,
        explanation: "The Three-Fifths Compromise counted enslaved people as three-fifths of a person for determining representation and taxation. This was a morally troubling compromise between Northern and Southern states.",
      },
      {
        id: "q18-4",
        question: "What were Federalists and Anti-Federalists debating?",
        options: [
          "Whether to declare independence",
          "Whether to ratify the Constitution—Federalists supported it, Anti-Federalists opposed it",
          "Who should be president",
          "Where the capital should be",
        ],
        correctOptionIndex: 1,
        explanation: "Federalists supported ratifying the Constitution and favored strong central government. Anti-Federalists opposed it, fearing too much central power and demanding a Bill of Rights.",
      },
      {
        id: "q18-5",
        question: "What is the Bill of Rights?",
        options: [
          "A tax bill",
          "The first ten amendments protecting individual freedoms like speech and religion",
          "A military strategy",
          "A treaty with Britain",
        ],
        correctOptionIndex: 1,
        explanation: "The Bill of Rights consists of the first ten amendments to the Constitution, added in 1791 to protect individual liberties such as freedom of speech, religion, press, and due process of law.",
      },
      {
        id: "q18-6",
        question: "What is checks and balances?",
        options: [
          "A banking system",
          "A system where each branch of government can limit the powers of other branches",
          "A method of voting",
          "A tax system",
        ],
        correctOptionIndex: 1,
        explanation: "Checks and balances is the constitutional principle that each branch of government (legislative, executive, judicial) has ways to check and limit the powers of the other branches, preventing any one branch from becoming too powerful.",
      },
    ],
  },

  // UNIT 3: EARLY REPUBLIC (Lessons 19-25)

  {
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

Washington chose talented men for his cabinet: Thomas Jefferson as Secretary of State, Alexander Hamilton as Secretary of the Treasury, Henry Knox as Secretary of War. But these men disagree on almost everything. The challenge won't just be governing—it will be keeping the government united.`,
        },
        {
          title: "Hamilton's Financial Plan",
          content: `Secretary Hamilton proposed a bold financial plan. The national government should assume all state debts from the Revolutionary War. We should create a national bank. We should encourage manufacturing. Hamilton believes a strong economy requires a powerful central government supporting business and industry.

But Thomas Jefferson and James Madison oppose this. They fear Hamilton wants to make America like Britain—urban, industrial, with a powerful central government favoring the wealthy. They believe America should remain a nation of independent farmers with strong state governments and limited federal power.

The debate grows bitter. Hamilton and Jefferson can barely stand to be in the same room. Washington tries to mediate, but even he can't bridge this divide. Two visions of America are emerging, and they're incompatible.`,
        },
        {
          title: "Staying Neutral",
          content: `In 1793, France and Britain went to war. France helped us win independence—shouldn't we help them now? But Washington declared neutrality. We're too weak for another war. We must stay out of European conflicts and focus on building our nation.

Many Americans were angry. Democratic-Republicans like Jefferson sympathized with France's revolution. Federalists like Hamilton favored Britain, our largest trading partner. But Washington stood firm: neutrality was essential for our survival.

Washington served two terms, then voluntarily stepped down—establishing the precedent that presidents shouldn't serve for life. In his Farewell Address, he warned against political parties and foreign entanglements. We didn't listen to either warning, but his example of peacefully transferring power became our greatest democratic tradition.`,
        },
        {
          title: "The Whiskey Rebellion",
          content: `In 1794, farmers in western Pennsylvania rebelled against Hamilton's whiskey tax. These frontier farmers grew grain and distilled it into whiskey—easier to transport than bulky grain sacks. The tax hit them hard, and they saw it as the same kind of unfair taxation Britain had imposed.

The rebels attacked tax collectors, burned buildings, and threatened armed resistance. This was the first major test of federal authority under the Constitution. Could the new government enforce its laws? Or would it collapse like the Articles of Confederation?

Washington's response was decisive. He personally led 13,000 militia troops to western Pennsylvania. The rebels melted away without a fight when they saw federal power backed by military force. Washington had proven that the Constitution wasn't just words on paper—the federal government had real authority and would use it.

I watched from my window as troops marched through New York on their way west. My father said this was the difference between Washington and a king. A king would have executed the rebels. Washington arrested a few leaders, but pardoned them. He'd shown strength without tyranny, enforcing law without revenge. That balance would become the American way.`,
        },
        {
          title: "Washington's Legacy",
          content: `When Washington left office in 1797, he'd served eight years as our first President. He could have served for life—many wanted him to. But he chose to step down, proving that American presidents would serve limited terms and transfer power peacefully. That decision may be his greatest gift to our republic.

Washington established so many precedents. He showed how a president should act: dignified but republican, not royal. He created the cabinet system. He asserted federal authority while respecting states' rights. He kept us out of unnecessary foreign wars. He held the government together despite bitter disagreements between Hamilton and Jefferson.

Most importantly, he proved that republican government could work on a large scale. Most of history's republics had been small city-states. Enlightenment philosophers doubted that a large republic could survive without collapsing into tyranny or chaos. Washington proved them wrong.

My father took me to see Washington's farewell parade. The man looked old and tired—eight years of presidency had aged him. But the crowd's love and respect were genuine. He'd won our independence as a general and secured it as a president. He was offered a crown and chose to be a citizen instead.

"That's the greatest act of his life," Father said, pointing at Washington's carriage disappearing down the street. "Not winning the war, not serving as president, but walking away from power when he could have kept it. That's what makes us different from every other nation. That's what makes us a republic." Watching Washington leave office peacefully, I finally understood what our experiment in self-government really meant. We had proven we didn't need kings. Citizens could govern themselves.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc19-1",
        term: "George Washington (President)",
        definition: "First President of the United States (1789-1797) who established many precedents for the office.",
      },
      {
        id: "fc19-2",
        term: "Cabinet",
        definition: "The President's advisory group of department heads, including Secretary of State and Secretary of Treasury.",
      },
      {
        id: "fc19-3",
        term: "Alexander Hamilton",
        definition: "First Secretary of Treasury who created a financial plan favoring strong central government and industry.",
      },
      {
        id: "fc19-4",
        term: "Thomas Jefferson",
        definition: "First Secretary of State who favored limited federal power, states' rights, and an agricultural economy.",
      },
      {
        id: "fc19-5",
        term: "Neutrality Proclamation",
        definition: "Washington's 1793 declaration that America would remain neutral in European wars.",
      },
      {
        id: "fc19-6",
        term: "Precedent",
        definition: "An action or decision that serves as an example for future situations.",
      },
      {
        id: "fc19-7",
        term: "Farewell Address",
        definition: "Washington's 1796 speech warning against political parties and foreign alliances.",
      },
      {
        id: "fc19-8",
        term: "Two-Term Tradition",
        definition: "Washington's decision to serve only two terms, establishing an informal limit later made law.",
      },
    ],
    quiz: [
      {
        id: "q19-1",
        question: "Why was Washington's presidency so important?",
        options: [
          "He was the tallest president",
          "He established precedents and examples that future presidents would follow",
          "He had no importance",
          "He ruled like a king",
        ],
        correctOptionIndex: 1,
        explanation: "Washington's presidency was crucial because he established precedents for how presidents should act, how much power they should have, and how to transfer power peacefully—examples that shaped the office forever.",
      },
      {
        id: "q19-2",
        question: "What did Alexander Hamilton's financial plan include?",
        options: [
          "Eliminating all government",
          "Federal assumption of state debts, creating a national bank, and encouraging manufacturing",
          "Giving all power to states",
          "Banning all trade",
        ],
        correctOptionIndex: 1,
        explanation: "Hamilton's financial plan included the federal government assuming state debts, creating a national bank, and encouraging manufacturing and industry—all aimed at strengthening the central government and economy.",
      },
      {
        id: "q19-3",
        question: "Why did Jefferson oppose Hamilton's plans?",
        options: [
          "He didn't oppose them",
          "He feared they gave too much power to central government and favored wealthy over farmers",
          "He wanted even more federal power",
          "He opposed all economic plans",
        ],
        correctOptionIndex: 1,
        explanation: "Jefferson opposed Hamilton's plans because he feared they would create a too-powerful central government that favored wealthy merchants and manufacturers over independent farmers, making America too similar to Britain.",
      },
      {
        id: "q19-4",
        question: "What was Washington's Neutrality Proclamation?",
        options: [
          "A declaration of war",
          "A declaration that America would stay neutral in European wars",
          "An alliance with France",
          "A trade agreement",
        ],
        correctOptionIndex: 1,
        explanation: "Washington's Neutrality Proclamation declared that America would remain neutral in the war between France and Britain, arguing that the young nation needed to avoid foreign conflicts.",
      },
      {
        id: "q19-5",
        question: "What precedent did Washington set by serving only two terms?",
        options: [
          "That presidents should serve forever",
          "That presidents should voluntarily limit themselves to two terms",
          "That there should be no president",
          "That presidents should serve only one term",
        ],
        correctOptionIndex: 1,
        explanation: "Washington voluntarily stepped down after two terms, establishing the precedent that presidents shouldn't serve for life. This tradition lasted until FDR and was made law by the 22nd Amendment.",
      },
    ],
  },

  {
    id: "lesson-20",
    title: "The Bill of Rights",
    description: "Securing Liberties (1791)",
    heroImage: "/images/hero-bill-of-rights.jpg",
    story: {
      narrator: "Jacob, age 16, apprentice to a newspaper printer, 1791",
      chapters: [
        {
          title: "Promises Kept",
          content: `I'm Jacob, sixteen, working at a newspaper in Philadelphia. Today we received news: the Bill of Rights has been ratified! The first ten amendments to the Constitution are now law, protecting our fundamental freedoms.

During the ratification debates, Anti-Federalists feared the Constitution gave too much power to the federal government without protecting individual rights. Federalists promised to add these protections. James Madison kept that promise, drafting amendments and pushing them through Congress.

The First Amendment protects what matters most to my work: freedom of speech, press, religion, assembly, and petition. My master says we can now criticize the government without fear of punishment. We can print what we believe is true. This is revolutionary—in most countries, criticizing the government leads to arrest.`,
        },
        {
          title: "Protecting the People",
          content: `The other amendments protect us in different ways. The Second Amendment protects the right to bear arms. The Third says government can't force us to house soldiers. The Fourth protects against unreasonable searches—authorities need warrants based on probable cause.

Amendments Five through Eight protect people accused of crimes: the right to remain silent, to a trial by jury, to a speedy and public trial, to confront witnesses, to have a lawyer. No excessive bail or cruel punishment. These rights come from bitter experience with British tyranny.

The Ninth Amendment says that listing these rights doesn't mean we don't have others. The Tenth says powers not given to the federal government belong to states or the people. These acknowledge that government power is limited and rights are broad.

We've created something remarkable: a government with built-in protections for the people's liberties. These aren't gifts from rulers—they're limitations on government power, recognizing that rights come from being human, not from government.`,
        },
        {
          title: "Freedom of the Press",
          content: `As a printer's apprentice, the First Amendment means everything to me. Before these protections, criticizing government could land you in jail. In Britain, the Crown licenses printing presses and censors publications. Seditious libel laws punish anyone who criticizes the government, even if what they say is true.

Here in America, we've taken a different path. The First Amendment says "Congress shall make no law...abridging the freedom of speech, or of the press." My master explains this means the government can't shut down newspapers for publishing uncomfortable truths or unpopular opinions.

This freedom isn't unlimited—we can still be sued for libel if we knowingly print falsehoods that harm someone. But the government can't censor us or require us to get permission before publishing. The people have a right to know what their government is doing, and the press has a duty to inform them.

I've watched my master agonize over articles criticizing government policies. "This could get us in trouble," he says, then prints it anyway. "But this is why we have the First Amendment. A free press is essential to keeping government honest. If they can silence us, democracy dies in darkness." That responsibility feels heavy on my shoulders as I set the type, but I understand why it matters. We're not just printers—we're guardians of the public's right to know.`,
        },
        {
          title: "Rights of the Accused",
          content: `Last month, I attended a trial at the courthouse and saw the Bill of Rights in action. A man was accused of theft, and I watched how the amendments protected him even though he might be guilty.

First, the authorities had arrested him with a proper warrant based on probable cause (Fourth Amendment). He didn't have to testify against himself (Fifth Amendment). He got a trial by jury of ordinary citizens, not just a judge (Sixth Amendment). He had a lawyer to defend him, faced his accusers in court, and heard the evidence against him (Sixth Amendment). The bail was set at a reasonable amount (Eighth Amendment).

My master explained why these protections matter: "Anyone can be accused of a crime. If the government can throw people in jail without trials, search homes without warrants, torture confessions, we'd all live in fear. These amendments protect the innocent by making sure the government follows fair procedures even when pursuing the guilty."

The man was convicted and sentenced, but the sentence was proportional to the crime—no cruel or unusual punishment. Justice was done, but through a process that protected his rights. Even criminals have rights because those rights protect all of us from government abuse.

Watching that trial, I understood something profound: the Bill of Rights isn't just about freedom of speech or religion. It's about limiting government power in every interaction with citizens. It's about ensuring that in America, the government serves the people, not the other way around.`,
        },
        {
          title: "A Living Promise",
          content: `The Bill of Rights has been ratified, but my master says the real work is just beginning. These amendments are words on paper. They only mean something if we defend them, if courts enforce them, if citizens demand them.

"Rights aren't self-executing," he tells me as we print copies of the Bill of Rights to sell. "Every generation must fight to preserve these liberties. Governments always want more power. Fear and crisis will tempt people to trade freedom for security. Your generation will face different threats than ours, and you'll have to decide whether these rights still matter."

He points to the First Amendment. "This one will be tested constantly. When someone publishes something offensive or dangerous, people will want to silence them. You'll have to remember that protecting unpopular speech is how we protect all speech. When you only defend speech you agree with, you don't believe in free speech at all."

I think about what he's saying. The Bill of Rights promises that government can't take our fundamental freedoms. But promises can be broken. Laws can be ignored. Rights exist only when people stand up for them, when judges protect them, when citizens refuse to let them be eroded.

We print thousands of copies of the Bill of Rights. People buy them to hang in their homes, to read to their children, to remember what makes America different. We're the first nation to build protection of individual rights into our fundamental law. We've created something unprecedented: a government that acknowledges limits on its own power.

As I set the final letters in the press—"Congress shall make no law"—I feel the weight of those words. This isn't just a legal document. It's a promise to every American, present and future, that certain freedoms are sacred and untouchable. Whether we keep that promise depends on us. The Bill of Rights gives us the tools to stay free. Using those tools is our responsibility.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc20-1",
        term: "Bill of Rights",
        definition: "The first ten amendments to the Constitution, ratified in 1791, protecting individual liberties.",
      },
      {
        id: "fc20-2",
        term: "First Amendment",
        definition: "Protects freedom of speech, press, religion, assembly, and petition.",
      },
      {
        id: "fc20-3",
        term: "Fourth Amendment",
        definition: "Protects against unreasonable searches and seizures, requiring warrants based on probable cause.",
      },
      {
        id: "fc20-4",
        term: "Fifth Amendment",
        definition: "Protects right against self-incrimination, double jeopardy, and guarantees due process of law.",
      },
      {
        id: "fc20-5",
        term: "Sixth Amendment",
        definition: "Guarantees rights in criminal trials: speedy and public trial, jury, confront witnesses, have a lawyer.",
      },
      {
        id: "fc20-6",
        term: "James Madison",
        definition: "The 'Father of the Bill of Rights' who drafted and pushed the amendments through Congress.",
      },
      {
        id: "fc20-7",
        term: "Due Process",
        definition: "The requirement that government must respect all legal rights owed to a person.",
      },
      {
        id: "fc20-8",
        term: "Warrant",
        definition: "A legal document authorizing police to make an arrest, search, or seizure.",
      },
    ],
    quiz: [
      {
        id: "q20-1",
        question: "What is the Bill of Rights?",
        options: [
          "A list of government powers",
          "The first ten amendments protecting individual liberties",
          "A tax bill",
          "A military document",
        ],
        correctOptionIndex: 1,
        explanation: "The Bill of Rights consists of the first ten amendments to the Constitution, ratified in 1791, which protect fundamental individual liberties from government interference.",
      },
      {
        id: "q20-2",
        question: "What freedoms does the First Amendment protect?",
        options: [
          "Only freedom of speech",
          "Speech, press, religion, assembly, and petition",
          "The right to bear arms",
          "Protection from searches",
        ],
        correctOptionIndex: 1,
        explanation: "The First Amendment protects five fundamental freedoms: speech, press, religion, assembly (gathering), and petition (asking government for change).",
      },
      {
        id: "q20-3",
        question: "What does the Fourth Amendment protect?",
        options: [
          "Freedom of speech",
          "The right to remain silent",
          "Against unreasonable searches and seizures",
          "The right to vote",
        ],
        correctOptionIndex: 2,
        explanation: "The Fourth Amendment protects people from unreasonable searches and seizures by requiring authorities to have warrants based on probable cause before searching property or arresting people.",
      },
      {
        id: "q20-4",
        question: "Who is considered the 'Father of the Bill of Rights'?",
        options: [
          "George Washington",
          "Thomas Jefferson",
          "James Madison",
          "Alexander Hamilton",
        ],
        correctOptionIndex: 2,
        explanation: "James Madison is called the 'Father of the Bill of Rights' because he drafted the amendments and worked to get them passed by Congress and ratified by the states.",
      },
      {
        id: "q20-5",
        question: "Why were the amendments added to the Constitution?",
        options: [
          "To give government more power",
          "To protect individual liberties and limit government power",
          "To start a war",
          "They weren't needed",
        ],
        correctOptionIndex: 1,
        explanation: "The Bill of Rights was added to protect individual liberties and limit government power. Anti-Federalists demanded these protections before agreeing to ratify the Constitution.",
      },
    ],
  },

  {
    id: "lesson-21",
    title: "Hamilton vs. Jefferson",
    description: "Federalists vs. Democratic-Republicans (1790s)",
    heroImage: "/images/hero-political-parties.jpg",
    story: {
      narrator: "Samuel, age 15, son of a Virginia farmer, 1796",
      chapters: [
        {
          title: "Two Visions",
          content: `I'm Samuel, fifteen, and I'm learning that America has two completely different visions for its future. Alexander Hamilton and Thomas Jefferson can't agree on anything, and their disagreements are splitting the nation.

Hamilton wants America to become like Britain: urban, industrial, commercial. He supports a strong federal government, a national bank, tariffs to protect manufacturers, and close ties with Britain. He believes the wealthy and educated should lead society. He trusts central power.

Jefferson wants America to remain a nation of independent farmers. He supports strong state governments, strict limits on federal power, no national bank, and friendship with France. He believes ordinary people can govern themselves. He fears centralized power leads to tyranny.

These aren't just policy disagreements—they're fundamental disagreements about what America should be. And they're creating the first political parties, something the Founders hoped to avoid.`,
        },
        {
          title: "Political Parties Form",
          content: `Hamilton's supporters call themselves Federalists. They're mostly merchants, bankers, manufacturers, and wealthy landowners from cities and northern states. They want a strong, active federal government.

Jefferson's supporters call themselves Democratic-Republicans (or just Republicans, not related to today's Republican Party). They're mostly farmers, planters, and working people from the South and West. They want limited federal government and strong states' rights.

The two parties fight viciously. Federalist newspapers call Jefferson an anarchist who'll destroy order. Democratic-Republican papers call Hamilton a monarchist who wants to crown himself king. The attacks get personal and nasty.

Father supports Jefferson—we're Virginia farmers who value independence and fear distant government power. But our neighbor supports Hamilton, believing strong central government is necessary. Their friendship has become strained. Politics is dividing communities, even families.`,
        },
        {
          title: "The Newspaper Wars",
          content: `The party battle plays out in newspapers. Hamilton secretly funds the Gazette of the United States, edited by John Fenno, which publishes Federalist views. Jefferson supports the National Gazette, edited by Philip Freneau, which attacks Federalist policies.

The papers don't just disagree—they attack viciously. The Gazette of the United States claims Jefferson wants mob rule and chaos. The National Gazette accuses Hamilton of wanting to establish a monarchy and destroy republican government. They question each other's motives, integrity, and patriotism.

I read both papers at our general store, watching neighbors argue over the articles. One Federalist paper claimed Jefferson was a dangerous radical influenced by the bloody French Revolution. A Democratic-Republican paper responded that Hamilton wanted to create an American aristocracy and turn workers into wage slaves.

Father shakes his head at the vitriol. "Washington warned against political parties," he says. "Now look at us—we're tearing ourselves apart." But he still reads the Democratic-Republican papers and nods along with their attacks on Hamilton. Nobody seems immune to the partisan fever.`,
        },
        {
          title: "Foreign Policy Divides Us",
          content: `The French Revolution makes our divisions worse. In 1789, France overthrew its monarchy, claiming to follow America's example. Jefferson and his supporters celebrate—France is becoming a republic! But when the revolution turns violent with mass executions and radical policies, Federalists are horrified.

Then France and Britain go to war in 1793. We have a treaty with France from the Revolution—should we help them? Jefferson thinks we have an obligation. Hamilton says the treaty was with the French monarchy, which no longer exists, and besides, we're too weak to fight Britain.

Washington declares neutrality, making both sides angry. Democratic-Republicans accuse him of abandoning our French allies who helped us win independence. Federalists say he's being too cautious about offending France.

When Washington sends John Jay to negotiate a treaty with Britain, Democratic-Republicans are furious. The Jay Treaty settles some disputes with Britain but gives them favorable trade terms. Father and his friends burn John Jay in effigy in our town square. "We're crawling back to Britain!" they shout. "We're betraying France and the principles of liberty!"

I'm learning that foreign policy isn't just about other countries—it's about our identity. Federalists see Britain as a model: orderly, prosperous, stable. Democratic-Republicans see France: revolutionary, democratic, fighting against monarchy and aristocracy. Our foreign friendships reflect which America we want to be.`,
        },
        {
          title: "The Election of 1796",
          content: `When Washington retires, the first true partisan presidential election happens in 1796. Federalist John Adams runs against Democratic-Republican Thomas Jefferson. There are no national campaigns—the candidates don't travel or give speeches. But their supporters wage vicious newspaper wars.

Federalist papers say Jefferson is an atheist who'll destroy religion, a radical who'll bring French-style chaos and bloodshed to America. They claim he's weak on defense and will leave us vulnerable to foreign threats.

Democratic-Republican papers say Adams wants to be king, that he'll crush liberty and create an aristocracy. They accuse Federalists of favoring the wealthy over ordinary people, Britain over America's true interests.

Adams wins narrowly, and under the old system where the second-place finisher becomes vice president, Jefferson becomes Adams's VP. Imagine—the president and vice president from opposing parties, who despise each other's vision for America!

Father is disappointed but not defeated. "We'll win next time," he says. "More and more people are seeing that Federalists serve the rich, not the people." Our neighbor, a Federalist, warns that Democratic-Republicans will ruin the country with mob rule. Neither side can imagine the other might have valid points.`,
        },
        {
          title: "What Political Parties Mean",
          content: `The Founders hoped we wouldn't have political parties. Washington warned against them in his Farewell Address. They feared parties would put faction above country, loyalty to party above loyalty to nation.

But parties emerged anyway because Americans genuinely disagree about fundamental questions: Should the federal government be strong or limited? Should America be agricultural or industrial? Should we favor Britain or France? Should power rest with educated elites or ordinary people?

At our general store, I watch these debates play out. My Federalist neighbor, Mr. Peterson, genuinely believes strong central government is necessary to keep order and prosperity. Father genuinely believes centralized power leads to tyranny. Both love America—they just see completely different paths to its success.

The newspaper attacks trouble me. Each side portrays the other as evil, un-American, dangerous. But I know both Mr. Peterson and Father. They're good, honest men who disagree. Can both be right? Can both be wrong?

Mother has a different perspective. "Men always think their disagreements are unique and important," she says. "But parties might actually help. At least now people know where candidates stand. Before parties, everything was personalities and connections. Now we debate ideas and visions."

Maybe she's right. Political parties organize people who share views. They offer voters clear choices. They hold leaders accountable to their supporters. Yes, they attack each other viciously. Yes, they put party before country sometimes. But they also give regular people like Father a way to participate in government, to feel like their voice matters.

Watching Federalists and Democratic-Republicans battle, I realize we're creating something new: a system where peaceful political competition replaces violent revolution. We can disagree intensely without killing each other. We can vote out leaders we dislike without military coups. The newspapers may be vicious, but it's ink, not blood. That's something, I suppose. That's American.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc21-1",
        term: "Federalist Party",
        definition: "Political party led by Hamilton favoring strong central government, national bank, and ties with Britain.",
      },
      {
        id: "fc21-2",
        term: "Democratic-Republican Party",
        definition: "Political party led by Jefferson favoring limited federal power, states' rights, and ties with France.",
      },
      {
        id: "fc21-3",
        term: "Alexander Hamilton (political)",
        definition: "Leader of Federalists who wanted strong central government, national bank, and industrial economy.",
      },
      {
        id: "fc21-4",
        term: "Thomas Jefferson (political)",
        definition: "Leader of Democratic-Republicans who wanted limited federal power and agricultural economy.",
      },
      {
        id: "fc21-5",
        term: "Political Party",
        definition: "An organized group of people with similar political views who work to elect candidates and shape policy.",
      },
      {
        id: "fc21-6",
        term: "Tariff",
        definition: "A tax on imported goods, supported by Federalists to protect American manufacturers.",
      },
      {
        id: "fc21-7",
        term: "States' Rights",
        definition: "The idea that states should have significant power and that federal power should be limited.",
      },
      {
        id: "fc21-8",
        term: "National Bank",
        definition: "A central bank proposed by Hamilton to manage government finances and stabilize the economy.",
      },
    ],
    quiz: [
      {
        id: "q21-1",
        question: "What did Federalists believe?",
        options: [
          "Strong state governments only",
          "Strong central government, national bank, and industrial economy",
          "No government at all",
          "Rule by the poor",
        ],
        correctOptionIndex: 1,
        explanation: "Federalists, led by Hamilton, believed in a strong central government, a national bank, protective tariffs for industry, and close ties with Britain.",
      },
      {
        id: "q21-2",
        question: "What did Democratic-Republicans believe?",
        options: [
          "Strong central government",
          "Limited federal power, states' rights, and agricultural economy",
          "Monarchy",
          "No state governments",
        ],
        correctOptionIndex: 1,
        explanation: "Democratic-Republicans, led by Jefferson, believed in limited federal power, strong states' rights, an agricultural economy, and friendship with France.",
      },
      {
        id: "q21-3",
        question: "Who led the Federalist Party?",
        options: [
          "Thomas Jefferson",
          "Alexander Hamilton",
          "George Washington",
          "James Madison",
        ],
        correctOptionIndex: 1,
        explanation: "Alexander Hamilton led the Federalist Party, which supported strong central government and industrial development.",
      },
      {
        id: "q21-4",
        question: "Who led the Democratic-Republican Party?",
        options: [
          "Alexander Hamilton",
          "Thomas Jefferson",
          "John Adams",
          "Aaron Burr",
        ],
        correctOptionIndex: 1,
        explanation: "Thomas Jefferson led the Democratic-Republican Party, which favored limited federal power and an agricultural economy.",
      },
      {
        id: "q21-5",
        question: "What was a major disagreement between the parties?",
        options: [
          "Whether to have a president",
          "Whether the federal government should be strong (Federalists) or limited (Democratic-Republicans)",
          "Whether to have states",
          "Whether to use money",
        ],
        correctOptionIndex: 1,
        explanation: "A fundamental disagreement was over federal power: Federalists wanted a strong central government, while Democratic-Republicans wanted limited federal power and strong states' rights.",
      },
    ],
  },

  {
    id: "lesson-22",
    title: "The Louisiana Purchase",
    description: "Doubling the Nation (1803)",
    heroImage: "/images/hero-louisiana-purchase.jpg",
    story: {
      narrator: "Marie, age 14, daughter of a French trader in New Orleans, 1803",
      chapters: [
        {
          title: "A Territory Changes Hands",
          content: `I'm Marie, fourteen, living in New Orleans. My city has been French, then Spanish, now French again, and today I learned we're about to become American! The news arrived: President Jefferson has purchased all of Louisiana from Napoleon for $15 million.

The Louisiana Territory is enormous—over 800,000 square miles stretching from the Mississippi River to the Rocky Mountains. It doubles the size of the United States! Napoleon needed money for his wars in Europe and feared losing Louisiana to Britain, so he sold it to America.

President Jefferson faced a dilemma. The Constitution doesn't explicitly say the president can buy territory. Jefferson believes in strict interpretation—the federal government should only have powers specifically listed in the Constitution. But this deal is too good to pass up. He approved it anyway, setting aside his principles for practical benefit.`,
        },
        {
          title: "New Opportunities",
          content: `The Purchase solves major problems for America. We needed access to New Orleans—the mouth of the Mississippi River where western farmers ship their goods. France controlling it was dangerous. Now America controls the entire Mississippi River system.

The territory offers endless land for settlement. Thomas Jefferson imagines an "empire of liberty"—a vast nation of independent farmers spreading across the continent. This land makes that vision possible.

But questions loom. What about the Native peoples living there? What about slavery—will it spread into these new territories? How do you govern such a vast area? These questions will haunt America for decades, eventually leading to civil war. For now, though, Americans celebrate. We've doubled our nation's size for just three cents an acre.`,
        },
        {
          title: "Jefferson's Dilemma",
          content: `My father explains President Jefferson's predicament. Jefferson has always preached strict construction—the federal government should only exercise powers explicitly granted in the Constitution. He's criticized Hamilton and the Federalists for loose interpretation, claiming they stretch the Constitution to justify whatever they want.

But the Constitution says nothing about purchasing foreign territory. Nowhere does it grant the president or Congress the power to buy land from other nations. By Jefferson's own principles, the Louisiana Purchase might be unconstitutional.

Jefferson agonized over this. He drafted a constitutional amendment to explicitly allow the purchase. But his advisors warned that seeking an amendment would take time, and Napoleon might change his mind or demand a higher price. The opportunity might slip away.

In the end, Jefferson swallowed his principles and authorized the purchase. He argued weakly that the treaty-making power implied the right to acquire territory. Federalists laughed at his hypocrisy—Jefferson was doing exactly what he'd accused them of doing, stretching the Constitution to justify what he wanted.

"Sometimes principles must bend to reality," Father says, though he's a Jefferson supporter. "Would it have been better to follow strict construction and lose half a continent? Jefferson made the right choice, even if it contradicted his philosophy." I wonder if Father is right, or if Jefferson proved that principles matter less than power.`,
        },
        {
          title: "Life in New Orleans",
          content: `My city, New Orleans, is unlike anywhere else in America. We're French and Spanish, Catholic and Creole. We speak French more than English. We have free people of color who own businesses and property—something unheard of in most of America. Our food, music, and culture come from a blend of French, Spanish, African, and Caribbean influences.

Now we're becoming American, and no one knows what that means for us. Will they respect our language and religion? Will they honor our land grants and legal traditions? Will they accept our free Black population, or try to force everyone into their rigid system of slavery versus freedom?

American officials arrive talking about "civilizing" us, teaching us "American ways." They look down on our culture as backward and foreign. They're shocked by our festivals, our mixed-race communities, our Catholic schools. Some Americans talk about New Orleans like we're exotic territory to be conquered, not fellow citizens to be respected.

But Father is hopeful. "America is an idea, not an ethnicity," he says. "They'll have to learn that America can include French-speaking Catholics from New Orleans. We'll make them expand their understanding of what American means." I hope he's right. The Louisiana Purchase didn't just add land to America—it added us, people whose culture and traditions challenge America's assumptions about itself.`,
        },
        {
          title: "The Price of Expansion",
          content: `While Americans celebrate acquiring vast new territory, few ask about the people already living there. Tens of thousands of Native peoples call Louisiana home: Osage, Caddo, Choctaw, Chickasaw, and dozens of other nations. France just sold their land without their consent. America just bought it without acknowledging Native ownership.

My father trades with Native peoples along the Mississippi. "They're furious," he tells me. "France had no right to sell their land. America has no right to claim it. They've been here for thousands of years—how can someone sell what they don't own?"

But Americans see it differently. They believe European nations have sovereignty over North America through "discovery" and conquest. Native peoples might live on the land, but they don't "own" it in the legal sense European powers recognize. It's a convenient fiction that allows Americans to claim an enormous territory as vacant land ready for settlement.

Jefferson talks about his "empire of liberty," but whose liberty? Not the Native nations whose lands we've purchased. Not the enslaved people who'll be brought into these territories as slavery expands westward. The Louisiana Purchase doubles America's size, but it also doubles our fundamental contradictions.

Standing in New Orleans as the American flag replaces the French tricolor, I wonder what we've really bought. Land, yes—800,000 square miles of it. But we've also bought new questions that will tear at the nation's soul: How far west will slavery spread? What happens to Native peoples in the path of American expansion? Can a nation founded on liberty spread by taking land from its original inhabitants?

For now, Americans celebrate. The Louisiana Purchase seems like pure triumph—doubled land, access to the Mississippi, room for generations to grow. But I sense the questions we're avoiding will someday demand answers. You can purchase land, but you can't purchase the solution to moral dilemmas.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc22-1",
        term: "Louisiana Purchase",
        definition: "The 1803 purchase of Louisiana Territory from France for $15 million, doubling U.S. size.",
      },
      {
        id: "fc22-2",
        term: "Napoleon Bonaparte",
        definition: "French leader who sold Louisiana to the United States to fund wars and prevent British seizure.",
      },
      {
        id: "fc22-3",
        term: "New Orleans",
        definition: "Strategic port city at the mouth of the Mississippi River, crucial for western American trade.",
      },
      {
        id: "fc22-4",
        term: "Mississippi River",
        definition: "Major river system that western farmers used to ship goods, now entirely under U.S. control.",
      },
      {
        id: "fc22-5",
        term: "Strict Construction",
        definition: "The belief that the Constitution should be interpreted literally, limiting federal power to what's explicitly stated.",
      },
      {
        id: "fc22-6",
        term: "Empire of Liberty",
        definition: "Jefferson's vision of America expanding westward as a nation of independent farmers.",
      },
      {
        id: "fc22-7",
        term: "Louisiana Territory",
        definition: "The vast area from the Mississippi River to the Rocky Mountains purchased from France.",
      },
      {
        id: "fc22-8",
        term: "Constitutional Dilemma",
        definition: "Jefferson's conflict between strict interpretation of the Constitution and practical need for the Purchase.",
      },
    ],
    quiz: [
      {
        id: "q22-1",
        question: "What was the Louisiana Purchase?",
        options: [
          "Buying the state of Louisiana only",
          "Buying 800,000+ square miles from France for $15 million, doubling U.S. size",
          "Selling land to France",
          "A small land trade",
        ],
        correctOptionIndex: 1,
        explanation: "The Louisiana Purchase was the 1803 acquisition of over 800,000 square miles of territory from France for $15 million, doubling the size of the United States.",
      },
      {
        id: "q22-2",
        question: "Why did Napoleon sell Louisiana?",
        options: [
          "He didn't like it",
          "He needed money for wars and feared losing it to Britain",
          "He was forced to sell",
          "America threatened war",
        ],
        correctOptionIndex: 1,
        explanation: "Napoleon needed money to fund his European wars and feared that Britain might seize Louisiana. Selling it to America gave him cash and kept it from his British enemies.",
      },
      {
        id: "q22-3",
        question: "Why was Jefferson conflicted about the Purchase?",
        options: [
          "He didn't want more land",
          "He believed in strict Constitution interpretation but the Constitution didn't explicitly allow purchasing territory",
          "He opposed all expansion",
          "He had no conflict",
        ],
        correctOptionIndex: 1,
        explanation: "Jefferson believed in strict interpretation of the Constitution—the government should only have explicitly stated powers. But the Constitution didn't specifically allow purchasing territory. He approved it anyway because it was too beneficial to refuse.",
      },
      {
        id: "q22-4",
        question: "Why was New Orleans important to the United States?",
        options: [
          "It had good restaurants",
          "It controlled the mouth of the Mississippi River, crucial for western farmers shipping goods",
          "It was the capital",
          "It had gold",
        ],
        correctOptionIndex: 1,
        explanation: "New Orleans was crucial because it sits at the mouth of the Mississippi River. Western farmers floated their goods down the Mississippi to New Orleans for shipment to markets. Controlling it was economically vital.",
      },
      {
        id: "q22-5",
        question: "What was Jefferson's 'empire of liberty'?",
        options: [
          "A military empire",
          "His vision of America expanding westward as a nation of independent farmers",
          "Conquering other countries",
          "Building cities everywhere",
        ],
        correctOptionIndex: 1,
        explanation: "Jefferson's 'empire of liberty' was his vision of America expanding across the continent as a nation of independent farmers, each owning land and governing themselves democratically.",
      },
    ],
  },

  {
    id: "lesson-23",
    title: "Lewis and Clark",
    description: "Exploring the West (1804-1806)",
    heroImage: "/images/hero-lewis-clark.jpg",
    story: {
      narrator: "William, age 17, member of the Corps of Discovery, 1805",
      chapters: [
        {
          title: "Into the Unknown",
          content: `I'm William, seventeen, and I'm part of the greatest adventure in American history. Meriwether Lewis and William Clark are leading the Corps of Discovery—about 40 men—to explore the Louisiana Purchase and beyond, all the way to the Pacific Ocean.

President Jefferson gave Lewis specific orders: map the territory, find a water route to the Pacific, study plants and animals, establish relations with Native tribes. We left St. Louis in May 1804, traveling up the Missouri River in keelboats. None of us know what we'll find.

The land is beautiful and terrifying. We've seen buffalo herds stretching to the horizon, grizzly bears that attack without provocation, landscapes unlike anything in the East. We take detailed notes, collect specimens, draw maps. Every day brings new wonders and dangers.`,
        },
        {
          title: "Sacagawea's Help",
          content: `In North Dakota, we met Sacagawea, a Shoshone woman who joined us as interpreter and guide. She's about sixteen and carries her baby son on her back. Her presence signals peaceful intentions to tribes we meet—no war party travels with a woman and baby.

Sacagawea proved invaluable. She helped us communicate with tribes, identified edible plants, found routes through mountains. When we reached Shoshone territory, their chief was her brother! She helped us trade for horses we desperately needed to cross the mountains.

We reached the Pacific Ocean in November 1805. We'd traveled 4,000 miles through unmapped wilderness. We spent the winter near the coast, then returned, arriving back in St. Louis in September 1806. We'd been gone over two years. People thought we were dead!

Our expedition proved there's no easy water route to the Pacific—the Rocky Mountains block it. But we mapped vast territories, established American claims to the Pacific Northwest, made contact with Native peoples, and brought back knowledge of lands most Americans couldn't imagine.`,
        },
        {
          title: "Encounters with Native Peoples",
          content: `The expedition's success depended entirely on Native peoples. We didn't discover anything—Native nations had lived in and traveled through these lands for thousands of years. They shared knowledge that saved our lives.

The Mandan people sheltered us through our first winter. They shared food, showed us how to hunt buffalo, taught us survival techniques. Without their hospitality, we would have starved or frozen.

Most tribes we encountered were peaceful and helpful, offering food, horses, and directions. They were curious about us, and we about them. Captain Lewis held councils, distributed gifts, and told tribes they were now under American authority. I don't think the tribes took this seriously—we were a small party passing through. They humored us.

But our presence foreshadowed what was coming. We were scouts for American expansion. Our maps would guide settlers, traders, and soldiers into these territories. The friendly tribes helping us didn't realize they were assisting in their own dispossession.

York, Captain Clark's enslaved servant, fascinated many tribes—some had never seen a Black person. York was a full member of our expedition, hunting, voting on decisions, equal in our hardships. But he remained enslaved, a contradiction that troubled me. How could we explore in the name of liberty while denying York his freedom?`,
        },
        {
          title: "The Rocky Mountains",
          content: `Nothing prepared us for the Rocky Mountains. Jefferson hoped we'd find an easy passage—maybe a short portage between rivers. Instead, we found a seemingly endless range of rugged peaks.

The crossing nearly killed us. We struggled through snow in September, leading horses over treacherous mountain paths. Food ran out. We ate candles and portable soup. Some men wanted to turn back, but Captains Lewis and Clark pushed forward.

The Nez Perce people saved us. When we stumbled out of the mountains, starving and desperate, they fed us and guided us to rivers flowing west. They could have left us to die or killed us for our supplies. Instead, they showed mercy and hospitality. I'll never forget their kindness.

Crossing the Rockies destroyed Jefferson's dream of a transcontinental water route for trade. The mountains were too vast, too harsh. But the crossing taught us something valuable: this continent was grander and more diverse than we'd imagined. The West wasn't just a bigger version of the East—it was something entirely different.

Standing on the Continental Divide, looking west toward the Pacific, I felt both triumph and humility. We'd accomplished an amazing journey, but the land had defeated our presumptions. Nature was bigger than our ambitions. The West would shape us more than we'd shape it.`,
        },
        {
          title: "Reaching the Pacific",
          content: `On November 7, 1805, we finally saw it—the Pacific Ocean. "Ocean in view! O! the joy!" Clark wrote in his journal. We'd traveled 4,000 miles from St. Louis. We'd crossed plains, mountains, and rivers. We'd survived grizzly bears, starvation, disease, and accidents. And we'd made it.

We spent a miserable winter near the mouth of the Columbia River. Rain fell constantly. Our clothing rotted. Food was scarce. The ocean we'd worked so hard to reach brought endless storms and dampness. But we'd achieved our goal.

We built Fort Clatsop and waited for winter to pass. We documented plants and animals, wrote extensive journals, prepared for the return journey. Every member of the expedition—including York and Sacagawea—voted on where to build the fort. This democratic decision-making felt very American.

The journey back in 1806 was faster because we knew the route. When we reached St. Louis in September, people were amazed—most had assumed we'd died. We'd been gone 28 months, traveled 8,000 miles, and lost only one man (to appendicitis).

We'd failed to find a water route to the Pacific. But we'd succeeded in something greater: we'd mapped a continental nation. We'd proven Americans could reach the Pacific overland. We'd made contact with dozens of Native nations. We'd collected scientific specimens and geographical knowledge. We'd expanded American understanding of the West from myth to reality.`,
        },
        {
          title: "What We Discovered",
          content: `The Lewis and Clark Expedition changed America's vision of itself. Before, Americans thought of their nation as confined to lands east of the Mississippi. After, they imagined a nation spanning the continent.

We brought back detailed maps, journals filled with scientific observations, specimens of unknown plants and animals. We'd documented over 170 plant species and 120 animal species unknown to science. We'd established diplomatic relations with Native tribes and charted rivers and mountains.

But our "discovery" came at a cost. We weren't exploring empty wilderness—we were mapping lands home to hundreds of thousands of Native peoples. Our expedition would guide American settlers, traders, and soldiers into these territories, beginning the dispossession of Native nations.

I think about Sacagawea, who helped us so much. She'd been kidnapped from her Shoshone people as a child, sold to a French trader. Her people had been pushed westward by tribes with guns. Now we were bringing more Americans with more guns, more diseases, more hunger for land. Our expedition was the opening chapter of a story that wouldn't end well for Native peoples.

Captain Lewis struggled with depression after the expedition and eventually took his own life. I sometimes wonder if the gap between our high ideals and harsh reality troubled him. We'd explored in the name of enlightenment and science, but we'd really been scouting for conquest.

Still, the expedition taught me something valuable: America is vast, diverse, and amazing. From the Mississippi to the Pacific, from plains to mountains, our continent holds wonders beyond imagination. We'd proven that Americans could undertake great endeavors and succeed through cooperation, perseverance, and respect for the land.

The West was no longer unknown. For better and worse, Americans would now flood across the continent we'd mapped. The age of western expansion was beginning, and we'd opened the door.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc23-1",
        term: "Lewis and Clark Expedition",
        definition: "The 1804-1806 exploration of Louisiana Purchase and beyond, led by Meriwether Lewis and William Clark.",
      },
      {
        id: "fc23-2",
        term: "Corps of Discovery",
        definition: "The name of the expedition group led by Lewis and Clark.",
      },
      {
        id: "fc23-3",
        term: "Sacagawea",
        definition: "Shoshone woman who served as interpreter and guide for the Lewis and Clark expedition.",
      },
      {
        id: "fc23-4",
        term: "Meriwether Lewis",
        definition: "Co-leader of the western expedition, chosen by President Jefferson.",
      },
      {
        id: "fc23-5",
        term: "William Clark",
        definition: "Co-leader of the western expedition, skilled mapmaker and frontiersman.",
      },
      {
        id: "fc23-6",
        term: "Pacific Ocean",
        definition: "The expedition's goal, reached in November 1805 after crossing the continent.",
      },
      {
        id: "fc23-7",
        term: "Missouri River",
        definition: "The river the expedition followed westward from St. Louis into the wilderness.",
      },
      {
        id: "fc23-8",
        term: "Rocky Mountains",
        definition: "The massive mountain range the expedition crossed, proving no easy water route to the Pacific existed.",
      },
    ],
    quiz: [
      {
        id: "q23-1",
        question: "What was the purpose of the Lewis and Clark expedition?",
        options: [
          "To start a war",
          "To explore Louisiana Purchase, find route to Pacific, study land and establish relations with tribes",
          "To find gold",
          "To build cities",
        ],
        correctOptionIndex: 1,
        explanation: "Jefferson sent Lewis and Clark to explore the Louisiana Purchase, find a water route to the Pacific, study the land and its resources, and establish peaceful relations with Native American tribes.",
      },
      {
        id: "q23-2",
        question: "Who was Sacagawea?",
        options: [
          "A British spy",
          "A Shoshone woman who served as interpreter and guide",
          "A French trader",
          "A U.S. Army officer",
        ],
        correctOptionIndex: 1,
        explanation: "Sacagawea was a Shoshone woman who joined the expedition as an interpreter and guide. Her presence signaled peaceful intentions, and her knowledge proved invaluable.",
      },
      {
        id: "q23-3",
        question: "What did the expedition discover about a water route to the Pacific?",
        options: [
          "They found an easy route",
          "They proved no easy water route existed—the Rocky Mountains blocked it",
          "They didn't try to find one",
          "They found multiple routes",
        ],
        correctOptionIndex: 1,
        explanation: "The expedition proved there was no easy all-water route to the Pacific Ocean. The Rocky Mountains created a massive barrier that had to be crossed overland.",
      },
      {
        id: "q23-4",
        question: "When did the expedition reach the Pacific Ocean?",
        options: [
          "They never reached it",
          "November 1805",
          "1803",
          "1810",
        ],
        correctOptionIndex: 1,
        explanation: "The Lewis and Clark expedition reached the Pacific Ocean in November 1805 after traveling about 4,000 miles through wilderness.",
      },
      {
        id: "q23-5",
        question: "What was significant about the expedition's accomplishments?",
        options: [
          "Nothing—it was a failure",
          "They mapped vast territories, established American claims, made contact with tribes, and expanded knowledge of the West",
          "They only found problems",
          "They started wars with all Native tribes",
        ],
        correctOptionIndex: 1,
        explanation: "The expedition successfully mapped vast territories, established American claims to the Pacific Northwest, made peaceful contact with many Native peoples, and brought back valuable scientific and geographic knowledge.",
      },
    ],
  },

  {
    id: "lesson-24",
    title: "The War of 1812",
    description: "Second War for Independence (1812-1815)",
    heroImage: "/images/hero-war-1812.jpg",
    story: {
      narrator: "Daniel, age 16, militiaman from Baltimore, 1814",
      chapters: [
        {
          title: "Going to War Again",
          content: `I'm Daniel, sixteen, and we're at war with Britain again. The reasons are complicated: Britain's been stopping our ships, searching them, and forcing American sailors to serve in the British navy—"impressment," they call it. Britain aids Native tribes fighting American expansion. Americans want to seize Canada. "War Hawks" in Congress pushed for war despite our weak military.

The war isn't going well. We tried to invade Canada and failed. Britain's navy blockades our coast. Our economy suffers. Many Federalists oppose the war, especially in New England where merchants lose money. Some even talk of secession—leaving the Union!

In August 1814, British troops invaded Washington D.C., burning the Capitol and White House. President Madison fled. It was humiliating. Now British ships are attacking Baltimore, where I live. We're determined to defend Fort McHenry in our harbor.`,
        },
        {
          title: "The Star-Spangled Banner",
          content: `All night on September 13-14, 1814, British ships bombarded Fort McHenry. I watched from the city as "rockets' red glare" and "bombs bursting in air" lit up the darkness. Would the fort surrender? Could it hold?

At dawn, through the smoke, we saw it: our flag still flew over the fort! We'd held. The British gave up the attack. We'd defended our city!

A lawyer named Francis Scott Key watched the battle from a ship. So moved by the flag's survival, he wrote a poem: "The Star-Spangled Banner." It captured our determination—battered but unbowed, our flag still waved. His poem became our national anthem.

The war ended with the Treaty of Ghent in December 1814. Nothing really changed—no territory exchanged, no major concessions. But we'd stood up to Britain again. We'd defended our sovereignty. This "Second War for Independence" proved America would survive.`,
        },
        {
          title: "The Burning of Washington",
          content: `August 1814 brought America's darkest moment in the war. A British force marched on Washington D.C., our nation's capital. Our militia tried to stop them at Bladensburg, Maryland, but we broke and ran—soldiers call it the "Bladensburg Races."

British troops entered Washington unopposed. They burned the Capitol building, where Congress meets. They burned the White House, forcing President and Dolley Madison to flee. Dolley saved important documents and a portrait of George Washington before escaping. The British burned the Treasury, War Department, and other government buildings.

My uncle was there. He described the horror: "The British took revenge for our burning of York in Canada. They methodically destroyed our government buildings. But they spared private homes and didn't loot. It was military destruction, not mob violence. Still, seeing our capital burn while our government fled was humiliating beyond words."

The burning of Washington shocked Americans. How could we let the enemy reach our capital? Where was our army? Some newspapers called for Madison's resignation. Federalists said the war was foolish from the start. But most Americans felt anger and determination—we would not surrender.

The British expected the burning to break American will. Instead, it strengthened our resolve. When they moved on Baltimore, they found us ready to fight. We wouldn't let them burn another city. The humiliation of Washington turned into the determination that saved Fort McHenry.`,
        },
        {
          title: "The Hartford Convention",
          content: `While we defended Baltimore, New England Federalists met in Hartford, Connecticut. They opposed the war from the beginning—it hurt their shipping trade with Britain. Some talked openly of New England leaving the Union.

The Hartford Convention proposed constitutional amendments to limit federal power: require two-thirds vote to declare war, admit new states, or restrict trade. They wanted to protect New England's interests against the South and West. Some delegates whispered about secession if their demands weren't met.

Father was furious. "The country's at war, and they're threatening to break apart? That's treason!" He saw the Convention as selfish New England merchants putting profits above patriotism.

But the Convention's timing proved disastrous. As they debated, news arrived: we'd defended Baltimore, defeated the British at Plattsburgh, New York, and—most incredibly—Andrew Jackson had crushed a British invasion at New Orleans! The war was ending in American victories.

Then came news of the Treaty of Ghent—peace! The Hartford Convention suddenly looked foolish and unpatriotic. They'd threatened secession just as America was winning. The Federalist Party never recovered. They appeared to be traitors who'd opposed a successful war. Within a few years, the Federalist Party died.`,
        },
        {
          title: "The Battle of New Orleans",
          content: `The war's strangest moment came in January 1815. Andrew Jackson, commanding American forces in New Orleans, faced a battle British army. On January 8, British troops in neat formations charged American positions behind cotton bales and earthworks.

It was a slaughter. American rifles and cannons cut down wave after wave of British soldiers. In 30 minutes, over 2,000 British were killed or wounded, including their commanding general. American casualties were fewer than 100. It was one of the most lopsided victories in military history.

Jackson became a national hero. The victory proved Americans could defeat British regulars in open battle. It erased the shame of earlier defeats and the burning of Washington. Americans celebrated wildly—we'd beaten Britain!

But there was a terrible irony: the battle was fought two weeks after the Treaty of Ghent ended the war. News traveled so slowly that neither side knew peace had been signed. Over 2,000 men died in a battle that didn't need to happen, fighting for a war that was already over.

The Battle of New Orleans didn't change the war's outcome—the treaty was already signed. But it changed American psychology. We'd ended the war with a spectacular victory, not a whimper. Andrew Jackson became a symbol of American toughness. The West had saved the nation where the East had failed. These shifts would reshape American politics for decades.`,
        },
        {
          title: "What the War Meant",
          content: `The War of 1812 ended where it began—no territory changed hands, no major concessions made. Historians sometimes call it a pointless war, achieving nothing at the cost of thousands of lives. But it changed America in profound ways.

First, it proved America's survival. We'd fought the world's most powerful empire to a draw. Britain would never again treat us as a minor nuisance. We'd earned respect as an independent nation.

Second, it killed the Federalist Party. Their opposition to the war, especially the Hartford Convention, destroyed them politically. The "Era of Good Feelings" followed, with Democratic-Republicans dominating and partisan divisions seemingly vanishing (though they'd return).

Third, it sparked American nationalism. Before 1812, many Americans identified primarily with their state—"I'm a Virginian" before "I'm an American." The war created shared national experiences and heroes. Francis Scott Key's anthem gave us a national song. Andrew Jackson gave us a national myth of frontier toughness defeating European aristocracy.

Fourth, it shifted attention westward. The East hadn't covered itself in glory—Washington burned, invasions of Canada failed. But the West produced Jackson's victory and a spirit of can-do determination. Political power would increasingly shift west.

Finally, it convinced Americans that we could stand alone, without European alliances. We'd fought Britain, the superpower, without France's help this time. This reinforced our sense that America was different, special, capable of going its own way.

Standing in Baltimore, looking at the flag over Fort McHenry, I understand what Key meant when he wrote our anthem. The flag is more than cloth—it's a symbol that we'll endure. We've been bombarded, invaded, our capital burned. But we're still here, still free, still independent. That flag still waves. And as long as it does, America survives.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc24-1",
        term: "War of 1812",
        definition: "War between U.S. and Britain (1812-1815) over impressment, trade restrictions, and expansion.",
      },
      {
        id: "fc24-2",
        term: "Impressment",
        definition: "British practice of forcing American sailors to serve in the British navy.",
      },
      {
        id: "fc24-3",
        term: "War Hawks",
        definition: "Congressional leaders who pushed for war with Britain, wanting to seize Canada and defend American honor.",
      },
      {
        id: "fc24-4",
        term: "Fort McHenry",
        definition: "Baltimore fort that withstood British bombardment in 1814, inspiring the Star-Spangled Banner.",
      },
      {
        id: "fc24-5",
        term: "Francis Scott Key",
        definition: "Lawyer who wrote 'The Star-Spangled Banner' after watching Fort McHenry's defense.",
      },
      {
        id: "fc24-6",
        term: "Treaty of Ghent",
        definition: "The 1814 treaty ending the War of 1812 with no major territorial changes.",
      },
      {
        id: "fc24-7",
        term: "Star-Spangled Banner",
        definition: "Poem by Francis Scott Key that became the U.S. national anthem, celebrating Fort McHenry's defense.",
      },
      {
        id: "fc24-8",
        term: "Burning of Washington",
        definition: "August 1814 British attack on Washington D.C., burning the Capitol and White House.",
      },
    ],
    quiz: [
      {
        id: "q24-1",
        question: "What caused the War of 1812?",
        options: [
          "American attacks on Britain",
          "British impressment of sailors, trade restrictions, and support for Native tribes fighting U.S. expansion",
          "Religious differences",
          "A misunderstanding",
        ],
        correctOptionIndex: 1,
        explanation: "The War of 1812 was caused by British impressment of American sailors, trade restrictions on American shipping, British support for Native tribes resisting American expansion, and American desire to seize Canada.",
      },
      {
        id: "q24-2",
        question: "What was impressment?",
        options: [
          "Making a good first impression",
          "British practice of forcing American sailors to serve in the British navy",
          "A printing technique",
          "A dance",
        ],
        correctOptionIndex: 1,
        explanation: "Impressment was the British practice of stopping American ships, searching them, and forcing American sailors into service in the British navy. This was a major cause of the War of 1812.",
      },
      {
        id: "q24-3",
        question: "What inspired Francis Scott Key to write 'The Star-Spangled Banner'?",
        options: [
          "A peaceful sunrise",
          "Seeing the American flag still flying over Fort McHenry after British bombardment",
          "A Fourth of July celebration",
          "A dream",
        ],
        correctOptionIndex: 1,
        explanation: "Francis Scott Key wrote 'The Star-Spangled Banner' after watching Fort McHenry withstand British bombardment all night. Seeing the American flag still flying at dawn inspired his famous poem.",
      },
      {
        id: "q24-4",
        question: "What happened to Washington D.C. in 1814?",
        options: [
          "Nothing",
          "British troops invaded and burned the Capitol and White House",
          "It became the permanent capital",
          "It was abandoned",
        ],
        correctOptionIndex: 1,
        explanation: "In August 1814, British troops invaded Washington D.C. and burned both the Capitol building and the White House in retaliation for American attacks in Canada.",
      },
      {
        id: "q24-5",
        question: "How did the War of 1812 end?",
        options: [
          "American victory with Canada annexed",
          "Treaty of Ghent ending the war with no major territorial changes",
          "British conquest of America",
          "It never ended",
        ],
        correctOptionIndex: 1,
        explanation: "The War of 1812 ended with the Treaty of Ghent in December 1814. The treaty restored pre-war boundaries with no major territorial changes, essentially a draw.",
      },
    ],
  },

  {
    id: "lesson-25",
    title: "The Monroe Doctrine",
    description: "American Foreign Policy (1823)",
    heroImage: "/images/hero-monroe-doctrine.jpg",
    story: {
      narrator: "Clara, age 15, daughter of a State Department clerk, 1823",
      chapters: [
        {
          title: "Europe and the Americas",
          content: `I'm Clara, fifteen, and my father works at the State Department in Washington. Today President Monroe announced a new foreign policy that will shape America's future: the Monroe Doctrine.

The situation is this: Spain's colonies in Latin America have been fighting for independence, inspired by our revolution. Spain wants to reconquer them with help from European powers. Russia is expanding down the Pacific coast from Alaska. European monarchies want to restore old empires.

President Monroe, advised by Secretary of State John Quincy Adams, declared that the Americas are closed to future European colonization. We won't interfere in European affairs, but Europe must not interfere in the Americas. The Western Hemisphere is now America's sphere of influence.

This is bold! We're a small nation compared to European powers. We don't have the military might to enforce this doctrine. But we're declaring that America will protect the independence of Western Hemisphere nations. Britain's navy will quietly support us—they want Latin American markets open for trade.`,
        },
        {
          title: "American Confidence",
          content: `The Monroe Doctrine shows how much America has changed since 1776. We've survived two wars with Britain. We've doubled our size. We're growing economically. We're confident enough to tell European powers to stay out of our hemisphere.

This doctrine will guide American foreign policy for decades. It says America is the dominant power in the Western Hemisphere. It reflects our belief in republicanism over monarchy. It shows our growing power and ambition.

But there are contradictions. We proclaim liberty for Latin America while enslaving people at home. We claim to protect sovereignty while pushing Native Americans off their land. We warn Europe against colonization while we expand westward. The gap between our ideals and our actions will haunt us.`,
        },
        {
          title: "The Holy Alliance Threat",
          content: `Father explains why the doctrine was necessary. After Napoleon's defeat, European monarchies formed the Holy Alliance—Russia, Prussia, Austria, and later France. They were committed to crushing republican and democratic movements, restoring monarchy and "legitimate" rule wherever revolutions occurred.

The Holy Alliance helped Spain suppress rebellions in Europe. Now they threatened to help Spain reconquer its American colonies. These newly independent republics—Argentina, Chile, Colombia, Mexico, and others—had thrown off Spanish rule inspired by American and French revolutionary ideals. The Holy Alliance viewed them as dangerous examples of republican government that had to be crushed.

Britain opposed this too, but for different reasons. They wanted to trade with independent Latin American nations, not see them return to Spanish mercantile control. So Britain's foreign secretary suggested a joint British-American declaration against European intervention.

John Quincy Adams argued against a joint declaration. "It would be more candid, as well as more dignified," he said, "to avow our principles explicitly to Russia and France, than to come in as a cock-boat in the wake of the British man-of-war." Adams wanted an independent American policy, not one hidden behind Britain's skirts. Monroe agreed, and the doctrine became purely American.`,
        },
        {
          title: "Latin American Independence",
          content: `I've learned about the revolutions sweeping Latin America. Leaders like Simón Bolívar in South America and Miguel Hidalgo in Mexico led wars for independence, inspired by America's example. They wrote constitutions modeled on ours, established republics, abolished many (though not all) aspects of colonial society.

These new nations looked to America for support. They hoped we'd recognize them as sister republics fighting for liberty against European tyranny. Some even imagined a hemisphere of republics standing together against European monarchy.

But America's support was limited. We recognized their independence and issued the Monroe Doctrine to protect them from reconquest. But we didn't offer military alliances or significant aid. Monroe warned Europe to stay out, but he also said we wouldn't interfere in existing European colonies or European affairs.

Father says this makes sense—we're too weak to fight European powers directly. The doctrine works because Britain's navy will quietly enforce it, protecting trade routes Britain needs. Without British naval power, the doctrine would be empty words. We're declaring principles we can't enforce alone, relying on Britain's self-interest to make them real.

Still, the doctrine expresses American ideals: republicanism over monarchy, independence over colonialism, the New World free from Old World control. It says America stands for liberty in the Western Hemisphere, even if we don't always live up to that promise at home.`,
        },
        {
          title: "Claiming the Hemisphere",
          content: `The Monroe Doctrine reveals American ambitions. We're not just protecting other nations' independence—we're claiming the Western Hemisphere as our sphere of influence. We're warning Europe that we'll be the dominant power here, that our interests matter most in the Americas.

This will shape American foreign policy for centuries. Future presidents will cite the Monroe Doctrine to justify interventions, occupations, and assertions of American power throughout Latin America and the Caribbean. The doctrine protecting independence will sometimes become justification for American imperialism.

I see this tension in conversations at Father's office. Some State Department officials genuinely want to protect Latin American republics from European reconquest. Others see the doctrine as securing American dominance, keeping European competitors out so America can expand its influence.

What about Latin Americans themselves? Do they want American "protection"? Or do they see us as potential rivals, another power claiming authority over them? Father admits these questions trouble him. "We mean well," he says. "We're protecting republican government from monarchical restoration. But protecting can become controlling. Helping can become dominating. Future generations will have to ensure the doctrine serves liberty, not just American interests."`,
        },
        {
          title: "A New American Role",
          content: `The Monroe Doctrine marks America's transition from struggling republic to confident power. Just forty years after our founding, we're declaring ourselves protector of an entire hemisphere. We're telling European empires—Britain, France, Spain, Russia—to stay out of Western Hemisphere affairs.

This confidence comes from surviving and thriving. We've won independence, weathered political divisions, fought Britain to a draw in 1812, doubled our size through the Louisiana Purchase, and are expanding westward. We've proven republican government can work on a large scale. We're economically growing and demographically exploding.

The doctrine also reveals American exceptionalism—our belief that we're different from other nations, that America has a special role in history. We see ourselves as the beacon of liberty, the model republic, the protector of freedom in the New World. This can inspire us to do good, but it can also blind us to our own flaws and justify our own expansion at others' expense.

Standing in the State Department as Monroe's message is copied and dispatched to European capitals, I feel the weight of what's happening. We're declaring American power and purpose. We're claiming responsibility for hemisphere's future. We're asserting that the age of European dominance in the Americas is over.

Whether this doctrine will protect liberty or serve empire, whether it will inspire or oppress, whether it will unite the hemisphere or divide it—only time will tell. But one thing is clear: America is no longer a weak nation begging for respect. We're a power making demands, claiming authority, shaping our hemisphere's destiny. For better or worse, the Americas will never be the same.`,
        },
      ],
    },
    flashcards: [
      {
        id: "fc25-1",
        term: "Monroe Doctrine",
        definition: "1823 policy declaring the Western Hemisphere closed to European colonization and interference.",
      },
      {
        id: "fc25-2",
        term: "James Monroe",
        definition: "Fifth President who issued the Monroe Doctrine establishing America's sphere of influence.",
      },
      {
        id: "fc25-3",
        term: "John Quincy Adams",
        definition: "Secretary of State who helped craft the Monroe Doctrine.",
      },
      {
        id: "fc25-4",
        term: "Sphere of Influence",
        definition: "A region where a nation has dominant power and influence.",
      },
      {
        id: "fc25-5",
        term: "Latin American Independence",
        definition: "The movement of Spanish colonies to gain independence, which the Monroe Doctrine aimed to protect.",
      },
      {
        id: "fc25-6",
        term: "Non-Colonization",
        definition: "The Monroe Doctrine principle that the Americas were closed to new European colonies.",
      },
      {
        id: "fc25-7",
        term: "Non-Intervention",
        definition: "The Monroe Doctrine principle that Europe shouldn't interfere in American affairs, and vice versa.",
      },
      {
        id: "fc25-8",
        term: "Western Hemisphere",
        definition: "The Americas—North, Central, and South America—which Monroe declared off-limits to European colonization.",
      },
    ],
    quiz: [
      {
        id: "q25-1",
        question: "What was the Monroe Doctrine?",
        options: [
          "A trade agreement",
          "A policy declaring the Western Hemisphere closed to European colonization and interference",
          "A declaration of war",
          "A treaty with Spain",
        ],
        correctOptionIndex: 1,
        explanation: "The Monroe Doctrine was President Monroe's 1823 declaration that the Western Hemisphere was closed to future European colonization and that European powers should not interfere in the Americas.",
      },
      {
        id: "q25-2",
        question: "Why was the Monroe Doctrine issued?",
        options: [
          "To conquer Latin America",
          "To protect Latin American independence and prevent European reconquest of former colonies",
          "To help Spain",
          "To start a war",
        ],
        correctOptionIndex: 1,
        explanation: "The doctrine was issued to protect newly independent Latin American nations from European attempts to reconquer them and to prevent further European colonization in the Americas.",
      },
      {
        id: "q25-3",
        question: "Who helped create the Monroe Doctrine?",
        options: [
          "Thomas Jefferson",
          "John Quincy Adams",
          "Alexander Hamilton",
          "Andrew Jackson",
        ],
        correctOptionIndex: 1,
        explanation: "Secretary of State John Quincy Adams was the primary architect of the Monroe Doctrine, advising President Monroe on its formulation.",
      },
      {
        id: "q25-4",
        question: "What did the Monroe Doctrine say about American interference in Europe?",
        options: [
          "America would conquer Europe",
          "America would not interfere in European affairs",
          "America would join European alliances",
          "America would colonize Europe",
        ],
        correctOptionIndex: 1,
        explanation: "The Monroe Doctrine stated that America would not interfere in European affairs or existing European colonies, in exchange for Europe staying out of the Western Hemisphere.",
      },
      {
        id: "q25-5",
        question: "What did the Monroe Doctrine reveal about America?",
        options: [
          "America was weak and afraid",
          "America had grown confident enough to claim the Western Hemisphere as its sphere of influence",
          "America wanted to return to British rule",
          "America had no foreign policy",
        ],
        correctOptionIndex: 1,
        explanation: "The Monroe Doctrine showed America's growing confidence and ambition. Despite being militarily weaker than European powers, America boldly claimed the Western Hemisphere as its sphere of influence.",
      },
    ],
  },

  // UNIT 4: JACKSONIAN ERA & REFORM (Lessons 26-31)

  {
    id: "lesson-26",
    title: "Jacksonian Democracy",
    description: "The Age of the Common Man (1828-1840)",
    heroImage: "/images/hero-jackson.jpg",
    story: {
      narrator: "Thomas, age 15, son of a western farmer, 1828",
      chapters: [
        {
          title: "A New Kind of President",
          content: `I'm Thomas, fifteen, from Tennessee. Today Andrew Jackson was inaugurated as President, and everything feels different. Jackson isn't from a wealthy Eastern family like previous presidents—he's from the frontier, like us. He's a war hero, a self-made man, someone who speaks for common people, not just the elite.

At his inauguration, thousands of ordinary people flooded Washington. They crowded into the White House, tracking mud on carpets, breaking china, standing on furniture to see "Old Hickory." The previous administration was horrified. But to us, it showed democracy in action—the people's President welcoming the people into the people's house.

Jackson believes in the "common man." He expanded voting rights—most states have dropped property requirements, so now most white men can vote regardless of wealth. Political power is spreading beyond the elite. This is "Jacksonian Democracy"—the idea that ordinary citizens should participate actively in government.`,
        },
        {
          title: "The Spoils System",
          content: `Jackson introduced the "spoils system"—rewarding political supporters with government jobs. "To the victor belong the spoils," his supporters said. He fired many federal employees and replaced them with his own people.

Critics called this corruption—giving jobs based on loyalty rather than merit. But Jackson argued that government jobs aren't so complicated that ordinary men can't do them. Why should positions be reserved for an educated elite? Rotation in office prevents bureaucrats from becoming too powerful.

I see both sides. Father got a postmaster job because he supported Jackson—he's proud to serve. But the previous postmaster, who was competent, lost his job for political reasons. Democracy is messy. Expanding participation means empowering people who might not always make wise choices. But isn't that better than rule by an elite few?`,
        },
        {
          title: "The Bank War",
          content: `Jackson's biggest battle was against the Second Bank of the United States. This national bank, chartered by Congress, controlled much of the nation's money and credit. Jackson saw it as a corrupt monopoly that favored wealthy Eastern elites over common farmers and workers.

The Bank's president, Nicholas Biddle, was everything Jackson hated—educated, aristocratic, powerful. Biddle used the Bank's financial power to influence politics, extending credit to supportive newspapers and politicians while denying it to opponents. Jackson called the Bank "a hydra of corruption" and vowed to destroy it.

When Congress re-chartered the Bank in 1832, Jackson vetoed it. His veto message was powerful: the Bank gave special privileges to the wealthy, foreign investors, and Eastern elites. It concentrated dangerous economic power in private hands. Jackson painted it as democracy versus aristocracy, the people versus privilege.

The Bank War became the central issue of the 1832 election. Jackson won overwhelmingly, taking it as a mandate to destroy the Bank. He withdrew federal deposits and placed them in state banks—his opponents called them "pet banks." By 1836, the Second Bank's charter expired. Jackson had killed it.

Father celebrated—we hated the Bank's power over western farmers like us. But some warned that destroying the Bank removed restraints on reckless state banks, leading to inflation and economic chaos. They were right—the Panic of 1837 devastated the economy. Jackson's democratic impulses had unintended consequences.`,
        },
        {
          title: "The Rise of the Common Man",
          content: `Jackson's presidency transformed American democracy. Before him, politics was dominated by wealthy, educated elites from established families. Jackson proved that a frontier-born, self-made man could become president. He spoke for farmers, workers, and western settlers—"the common man."

Voter participation exploded. In 1824, only about 27% of eligible voters participated in the presidential election. By 1840, it was over 80%. States eliminated property requirements for voting. Political parties held conventions where delegates nominated candidates, replacing the old system where party elites chose in secret caucuses.

Political campaigns became spectacles. There were parades, rallies, barbecues, and mass meetings. Politicians had to appeal directly to voters, not just to elite kingmakers. This made politics more democratic but also more populist—politicians told people what they wanted to hear, not always what they needed to hear.

I watched my father and his friends become politically engaged in ways their fathers never were. They attended rallies, debated policies, voted with pride. They felt that government finally represented them, not just the wealthy. This was Jacksonian Democracy in action—the political empowerment of ordinary white men.

But "common man" had limits. Women couldn't vote. Free Black men lost voting rights in many states. Enslaved people had no rights at all. Native Americans were being pushed westward. Jacksonian Democracy expanded political participation for white men while contracting it for others. The age of the common (white) man was built on exclusion as much as inclusion.`,
        },
        {
          title: "The Democratic Revolution",
          content: `Jackson's legacy is contradictory. He democratized American politics, making government more responsive to ordinary citizens. He fought economic elites and broke their monopoly on power. He proved that anyone—even a orphaned frontier boy—could rise to the presidency. He made Americans believe in themselves and their democratic system.

But he also concentrated power in the presidency, using vetoes and executive authority in unprecedented ways. He ignored Supreme Court decisions he disliked. He rewarded political loyalty over competence. His economic policies, while democratically popular, led to financial disaster. His Indian removal policy was genocidal.

Most troubling was what Jacksonian Democracy revealed about democracy itself. When "the people" rule, which people? The majority can oppress minorities. Popular policy isn't always wise policy. Charismatic leaders can manipulate democratic systems. Democracy requires more than majority rule—it needs protection for minority rights, limits on government power, and educated, engaged citizens.

Walking through Washington at Jackson's second inauguration, I saw America's democratic spirit unleashed. Thousands of ordinary people, dressed in their Sunday best, celebrated their president and their power. It was inspiring and a bit frightening. Democracy was no longer theoretical—it was real, messy, powerful, and unpredictable.

Father said it best: "Jackson proved government can serve common people, not just elites. But he also showed democracy's dangers—mob rule, demagoguery, majority tyranny. Future generations must take the good—political participation, opportunity, faith in common people—while avoiding the bad. That's the challenge of Jacksonian Democracy: harnessing the people's power without unleashing the people's worst impulses."

The age of the common man had arrived. America would never be the same. For better and worse, we'd proven that democracy could work on a large scale, that ordinary people could govern themselves. The world was watching, and we were showing them something new—government by the people, truly and messily.`,
        },
      ],
    },
    flashcards: [
      {id: "fc26-1", term: "Andrew Jackson", definition: "Seventh President (1829-1837), war hero who championed the 'common man' and expanded democratic participation."},
      {id: "fc26-2", term: "Jacksonian Democracy", definition: "The expansion of political participation to common white men and belief in majority rule."},
      {id: "fc26-3", term: "Spoils System", definition: "Practice of rewarding political supporters with government jobs, introduced by Jackson."},
      {id: "fc26-4", term: "Universal White Male Suffrage", definition: "The expansion of voting rights to all white men, regardless of property ownership."},
      {id: "fc26-5", term: "Old Hickory", definition: "Jackson's nickname, referring to his toughness like hickory wood."},
      {id: "fc26-6", term: "Common Man", definition: "Ordinary citizens, especially farmers and workers, who Jackson claimed to represent."},
      {id: "fc26-7", term: "Rotation in Office", definition: "Jackson's principle that government jobs should rotate among citizens rather than becoming permanent positions."},
      {id: "fc26-8", term: "Democratic Participation", definition: "Active involvement of citizens in political processes and government."},
    ],
    quiz: [
      {
        id: "q26-1",
        question: "What was Jacksonian Democracy?",
        options: ["Rule by wealthy elites", "Expansion of political participation to common white men and belief in majority rule", "Ending all elections", "Rule by kings"],
        correctOptionIndex: 1,
        explanation: "Jacksonian Democracy was the movement to expand political participation to ordinary white men (not just property owners) and trust in majority rule rather than elite governance."
      },
      {
        id: "q26-2",
        question: "What was the spoils system?",
        options: ["A farming technique", "Rewarding political supporters with government jobs", "A military strategy", "A trade policy"],
        correctOptionIndex: 1,
        explanation: "The spoils system was Jackson's practice of giving government jobs to political supporters as rewards for their loyalty, summarized by 'to the victor belong the spoils.'"
      },
      {
        id: "q26-3",
        question: "How did voting rights change during Jackson's era?",
        options: ["They became more restricted", "Property requirements were dropped, allowing most white men to vote", "Only the wealthy could vote", "Women gained the vote"],
        correctOptionIndex: 1,
        explanation: "During the Jacksonian era, most states dropped property requirements for voting, allowing nearly all white men to vote regardless of wealth—a major expansion of democracy."
      },
    ],
  },

  {
    id: "lesson-27",
    title: "Indian Removal",
    description: "The Trail of Tears (1830-1838)",
    heroImage: "/images/hero-trail-tears.jpg",
    story: {
      narrator: "Sarah, age 14, Cherokee girl, 1838",
      chapters: [
        {
          title: "Our Cherokee Life",
          content: `I'm Sarah, fourteen years old, Cherokee. My people have lived in these Georgia mountains for generations—longer than anyone can remember. We're not the "savages" white people imagine. We have farms, schools, a written language created by Sequoyah, our own newspaper. Many Cherokee are Christians. We live in houses, wear European-style clothing, govern ourselves with a constitution modeled on America's.

My father farms cotton and corn. My mother weaves. I attend mission school where I'm learning English alongside Cherokee. We thought if we adopted "civilization," Americans would let us stay. We believed that education, Christianity, and farming would prove we deserved our land.

But Georgia wants our land, especially since gold was discovered here. White settlers squat on Cherokee property. Georgia extends its laws over us, ignoring that we're a sovereign nation with treaties guaranteeing our territory. President Jackson won't defend our rights, even though we helped him fight the Creek in 1814.

Father says Jackson despises Indians. He sees us as obstacles to white expansion, no matter how "civilized" we become. Our adoption of European ways means nothing to him. He wants our land for white settlers, and he'll use any means to get it.`,
        },
        {
          title: "The Indian Removal Act",
          content: `In 1830, Congress passed the Indian Removal Act. President Jackson claims it's voluntary—tribes can choose to move west of the Mississippi to "Indian Territory" in exchange for their eastern lands. But everyone knows the truth: refuse, and you'll be forced out anyway.

Jackson argues removal benefits us. "Your Great Father," he calls himself patronizingly, says we'll be happier away from corrupting white influence. He promises land in the West will be ours forever, that we'll govern ourselves in peace. These are lies, and we know it.

Our leaders fight back through legal channels. Chief John Ross takes our case to the Supreme Court. In Worcester v. Georgia, the Court rules that we're a sovereign nation—Georgia has no authority over us. Chief Justice Marshall writes that our treaties are valid, our rights clear.

I remember Father's joy when news came: "The Supreme Court sided with us! American law recognizes our sovereignty!" But then Jackson supposedly said, "Marshall has made his decision; now let him enforce it." The President refuses to enforce the Court's ruling. Law means nothing when power opposes it. We've learned a terrible lesson: justice without enforcement is just words.`,
        },
        {
          title: "Soldiers Come",
          content: `Spring 1838. Soldiers arrive with guns and bayonets. General Winfield Scott commands 7,000 troops to round up Cherokee and force us west. They give us no time to gather belongings, to harvest crops, to bury our dead properly. We're herded like animals into stockades—temporary prison camps where we'll wait for the march west.

I watched soldiers drag families from homes. Old people, sick people, children—no one spared. Some whites who'd been waiting vultures descended on our property before we were even gone, claiming our houses, our fields, our livestock. Years of work, generations of home—stolen in moments.

In the stockades, conditions are terrible. Families crowded together, inadequate food and water, disease spreading. We wait through summer's heat in these camps. Some die before the journey even begins. The guards treat us like we're not human, like we're cargo to be shipped west.

Father tries to stay strong for us, but I see his despair. "We built everything Americans said to build," he says quietly. "We learned what they said to learn. We governed as they said to govern. And still they take everything." Mother holds us and prays, but I wonder if God hears Cherokee prayers.`,
        },
        {
          title: "The Trail Where We Cried",
          content: `October 1838. We begin the thousand-mile march to Oklahoma. Over 16,000 Cherokee forced west in groups. It's cold already, and we're not prepared. Many have no shoes, no warm clothing. Food rations are inadequate. Water often contaminated. Dysentery, measles, whooping cough spread through our column.

We walk twenty miles a day when we can walk at all. The old and sick ride in wagons, but there aren't enough. People die every day. We bury them in shallow graves by the trail, marking them with stones if we have time. Sometimes we don't even have time for burial.

Grandmother died in November. Just got too tired, too cold, too sick. We buried her somewhere in Tennessee—I don't even know exactly where. Then my baby sister died of whooping cough. She was three years old. Mother wrapped her body and we buried her by the trail. We never even finished grieving for grandmother.

The whites we pass sometimes throw stones, shout insults. Others look away, ashamed. Some show pity but don't help. We're a people being destroyed, and America watches it happen. This isn't relocation—it's genocide disguised as policy. We call it "The Trail Where They Cried." In Cherokee: Nunna daul Tsuny.`,
        },
        {
          title: "Oklahoma and After",
          content: `We reached Indian Territory in March 1839. Of 16,000 who started, only about 12,000 arrived. Over 4,000 dead—a quarter of our people. And we're not the only ones—Creek, Seminole, Chickasaw, Choctaw all suffered similar removals. Tens of thousands of Native peoples died in what Americans blandly call "Indian Removal."

The land here is different from our Georgia mountains. We must start over with nothing—no homes, no tools, barely any food. We're supposed to be grateful for this "new start." We're told this land is ours "as long as grass grows and water runs." But we learned that American promises mean nothing when they want something we have.

Father survived the journey but is broken. "We tried everything," he says. "We adopted their ways, their language, their religion, their government. We appealed to their laws, their courts, their God. None of it mattered. They wanted our land, so they took it. That's the only truth."

I think about what we lost. Not just land and homes, but graves of ancestors, sacred sites, the mountains that held our history. We lost a quarter of our people. We lost our faith that justice and civilization mean anything in America. We learned that America's fine words about rights and law apply only to whites.

Future Americans will debate whether removal was justified, whether it was necessary for America's growth, whether it was really that bad. But I was there. I watched my grandmother and baby sister die on that trail. I saw four thousand of my people perish because white settlers wanted gold and cotton land. I know the truth: this was evil. America knew it was evil. And they did it anyway.

The United States calls itself a beacon of liberty, a nation founded on equality and rights. But liberty doesn't extend to us. Rights don't protect us. We've learned that American ideals are selective—they apply when convenient, disappear when inconvenient. The Trail of Tears taught us that in America, power matters more than justice, and white land hunger matters more than Cherokee lives.`,
        },
      ],
    },
    flashcards: [
      {id: "fc27-1", term: "Indian Removal Act", definition: "1830 law authorizing removal of Native tribes from eastern lands to territory west of Mississippi."},
      {id: "fc27-2", term: "Trail of Tears", definition: "Forced 1,000-mile march of Cherokee to Oklahoma, killing over 4,000."},
      {id: "fc27-3", term: "Cherokee Nation", definition: "Native tribe that had adopted European customs but was still forcibly removed."},
      {id: "fc27-4", term: "Sequoyah", definition: "Cherokee scholar who created written Cherokee language."},
      {id: "fc27-5", term: "Worcester v. Georgia", definition: "Supreme Court case ruling for Cherokee—ignored by Jackson."},
      {id: "fc27-6", term: "Indian Territory", definition: "Land in present Oklahoma where tribes were forced to relocate."},
      {id: "fc27-7", term: "Five Civilized Tribes", definition: "Cherokee, Creek, Seminole, Chickasaw, Choctaw—called 'civilized' for adopting European ways."},
      {id: "fc27-8", term: "Removal", definition: "Forced relocation of Native Americans from ancestral lands."},
    ],
    quiz: [
      {id: "q27-1", question: "What was the Indian Removal Act?", options: ["Protection for Natives", "1830 law removing tribes to land west of Mississippi", "Peace treaty", "Trade agreement"], correctOptionIndex: 1, explanation: "The 1830 Indian Removal Act authorized removing Native tribes from eastern lands to territory west of the Mississippi River."},
      {id: "q27-2", question: "What was the Trail of Tears?", options: ["A celebration", "Forced march of Cherokee to Oklahoma killing thousands", "A road", "A river"], correctOptionIndex: 1, explanation: "The Trail of Tears was the brutal forced march of Cherokee 1,000 miles to Oklahoma. Over 4,000 of 16,000 Cherokee died."},
      {id: "q27-3", question: "Why couldn't the Cherokee keep their land?", options: ["They didn't want it", "Despite adopting European ways, whites wanted their land—especially after gold was found", "They lost a war", "They sold it"], correctOptionIndex: 1, explanation: "Despite having schools, farms, and written language, Cherokee were removed because whites wanted their land, especially after gold was discovered in Georgia."},
    ],
  },

  {
    id: "lesson-28",
    title: "The Nullification Crisis",
    description: "States' Rights vs Federal Power (1832)",
    heroImage: "/images/hero-nullification.jpg",
    story: {
      narrator: "James, age 16, from South Carolina, 1832",
      chapters: [
        {
          title: "The Tariff Crisis",
          content: `I'm James, sixteen, from South Carolina. Our state is in uproar over what we call the "Tariff of Abominations." This high protective tariff helps Northern manufacturers by making imported goods expensive, forcing Americans to buy Northern-made products. But we don't manufacture—we grow cotton.

The tariff devastates our economy. We sell cotton on the world market at world prices, but we must buy manufactured goods at inflated prices because of the tariff. Northern factories profit while Southern farmers suffer. Father says it's sectional tyranny—the North using its congressional majority to enrich itself at the South's expense.

Vice President John C. Calhoun—a South Carolina man—developed a theory called nullification. He argues that states, as sovereign entities that created the federal government, can declare federal laws unconstitutional and refuse to enforce them within their borders. If the federal government oversteps its constitutional authority, states have the right to resist.

South Carolina's legislature adopted an Ordinance of Nullification, declaring the tariff null and void within our state. We won't collect it, won't enforce it. The question now echoes through the nation: can states reject federal laws? Or does federal law reign supreme? Our answer will determine whether we stay one nation or fracture into pieces.`,
        },
        {
          title: "Calhoun's Theory",
          content: `Father explains Calhoun's logic: the Constitution is a compact among sovereign states. The states created the federal government and delegated it certain limited powers. When the federal government exceeds those powers, states have the right to judge and resist.

Calhoun argues that the tariff isn't a legitimate revenue measure—it's designed to protect one section's industry at another section's expense. This violates the compact. Therefore, states can nullify unconstitutional federal laws.

This sounds principled, but I see the deeper issue. Our South Carolina economy depends on slavery. We fear that if the federal government can impose tariffs against our will today, it might abolish slavery tomorrow. Nullification is about protecting slavery as much as protesting tariffs.

The theory has dangerous implications. If every state can nullify laws it dislikes, what holds the Union together? What stops complete fragmentation? If South Carolina can nullify tariffs, can Massachusetts nullify fugitive slave laws? Can any state reject any federal law by claiming it's unconstitutional? Calhoun's theory logically leads to disunion.`,
        },
        {
          title: "Jackson's Response",
          content: `President Jackson's reaction shocked us. Jackson is a Southerner, a states' rights advocate, a slave owner. We expected sympathy. Instead, he responded with fury.

Jackson issued a Proclamation to South Carolina: nullification is incompatible with the Constitution. No state can refuse to enforce federal law. "Disunion by armed force is treason," he declared. He threatened to personally lead an army to South Carolina to enforce federal law. He requested and received from Congress a "Force Bill" authorizing military action.

Jackson's position is clear: he supports states' rights within the constitutional framework, but nullification goes too far. It threatens the Union itself. He'll tolerate many things, but not disunion. "Our Federal Union—it must be preserved," he toasted pointedly at a dinner, staring at Calhoun.

The crisis escalated. South Carolina threatened to secede if Jackson used force. Jackson threatened to hang Calhoun for treason. We stockpiled weapons and drilled militia. The federal government prepared for war. The Union stood on a knife's edge—one wrong move, and we'd be in civil war thirty years before it actually happened.`,
        },
        {
          title: "Clay's Compromise",
          content: `Henry Clay, the "Great Compromiser," found a way out. He proposed gradually reducing the tariff over ten years while simultaneously passing Jackson's Force Bill. South Carolina could claim victory—the tariff would be lowered. Jackson could claim victory—federal supremacy was maintained. Both sides could back down without losing face.

The Compromise Tariff passed. South Carolina repealed its Nullification Ordinance. But in a final act of defiance, we "nullified" the Force Bill—asserting the principle even while accepting the compromise. It was symbolic, but symbols matter.

The crisis ended, but the fundamental questions remained unanswered. Does federal law trump state law absolutely? Can states resist federal power they consider tyrannical? What happens when majority rule tramples minority rights? We postponed these questions, didn't resolve them.

Father said the crisis taught us that we won't get our way through legal channels. "If Northern majority can impose tariffs against our will, they can impose anything. Abolition could be next. When that happens, we'll secede rather than submit." The nullification crisis was a warning: the South would fight—politically, legally, and if necessary militarily—to protect its interests, meaning slavery.`,
        },
        {
          title: "The Crisis's Meaning",
          content: `The Nullification Crisis revealed deep fractures in American unity. It showed that sectional loyalty can rival national loyalty, that states might choose disunion over submission to national majority rule.

It foreshadowed the Civil War. The arguments South Carolina made in 1832—states' rights, federal tyranny, right to resist—would echo in 1861 when Southern states seceded. The threat Jackson made—military force to preserve the Union—Lincoln would carry out. The Nullification Crisis was a dress rehearsal for a far bloodier conflict.

It also revealed contradictions in Southern ideology. South Carolina claimed to defend minority rights against majority tyranny. But what about the enslaved majority in South Carolina—who protected their rights? The South demanded federal restraint when it came to slavery but federal power when it came to capturing escaped slaves. States' rights was selectively applied.

Most troubling was what the crisis revealed about democracy: majority rule can be tyrannical. The North had more people, more representatives, more votes. They could impose their will on the South through democratic processes. But is democracy just majority rule, or must it protect minority rights? How do you balance these competing principles?

Standing in Charleston as the crisis subsided, I understood we'd only postponed the reckoning. The sectional divide—North vs. South, free labor vs. slave labor, manufacturing vs. agriculture—was widening. Compromises could delay the conflict but not prevent it. Some divides are too deep for political solutions.

My generation would see these questions answered, but the answers would come in blood. The Nullification Crisis showed that Americans were willing to fight each other over fundamental principles. Whether the Union was perpetual or dissolvable, whether federal or state power was supreme, whether slavery would spread or die—these questions couldn't be compromised forever. Eventually, we'd have to fight it out. And we would.`,
        },
      ],
    },
    flashcards: [
      {id: "fc28-1", term: "Nullification", definition: "Theory that states can refuse to enforce federal laws they consider unconstitutional."},
      {id: "fc28-2", term: "Tariff of Abominations", definition: "High protective tariff favored by North, opposed by South, triggering crisis."},
      {id: "fc28-3", term: "John C. Calhoun", definition: "SC politician who developed nullification theory."},
      {id: "fc28-4", term: "States' Rights", definition: "Idea that states retain significant sovereignty and can resist federal overreach."},
      {id: "fc28-5", term: "Force Bill", definition: "Law authorizing President to use military force to enforce federal law."},
      {id: "fc28-6", term: "Protective Tariff", definition: "Tax on imports to protect domestic industries from foreign competition."},
      {id: "fc28-7", term: "Federal Supremacy", definition: "Principle that federal law is supreme over state law in conflicts."},
      {id: "fc28-8", term: "Compromise Tariff", definition: "Clay's agreement to gradually reduce tariffs, ending the crisis."},
    ],
    quiz: [
      {id: "q28-1", question: "What is nullification?", options: ["Making nothing", "Theory that states can refuse to enforce federal laws", "A tariff", "A compromise"], correctOptionIndex: 1, explanation: "Nullification is the theory that states can declare federal laws unconstitutional and refuse to enforce them."},
      {id: "q28-2", question: "Why did South Carolina oppose the tariff?", options: ["They loved imports", "High tariffs helped North but hurt Southern agricultural economy", "They supported it", "No reason"], correctOptionIndex: 1, explanation: "High tariffs protected Northern manufacturing but made imports expensive for Southern agricultural states."},
      {id: "q28-3", question: "How did Jackson respond?", options: ["Supported nullification", "Declared federal law supreme and threatened force while accepting tariff compromise", "Did nothing", "Resigned"], correctOptionIndex: 1, explanation: "Jackson opposed nullification, declared federal supremacy, threatened military force, but accepted Clay's tariff compromise."},
    ],
  },

  {
    id: "lesson-29",
    title: "The Second Great Awakening",
    description: "Religious Revival and Reform (1800-1840)",
    heroImage: "/images/hero-second-awakening.jpg",
    story: {
      narrator: "Emily, age 15, from New York, 1831",
      chapters: [
        {
          title: "Religious Revival",
          content: `I'm Emily, fifteen, from Rochester, New York—part of what they call the "Burned-Over District" because religious revivals sweep through so often it's like the land has been burned over by spiritual fire. This year, 1831, Charles Finney held a six-month revival here that transformed our town. Thousands attended meetings, hundreds converted.

Finney's message differs from old Puritan theology. Puritans taught predestination—God chose who'd be saved before they were born, and humans couldn't change it. Finney preaches free will—you can choose salvation. You can decide to accept Christ, reform your life, be saved. This is revolutionary: salvation isn't predetermined but chosen.

The camp meetings are unlike anything traditional churches offer. Thousands gather in fields. Preachers shout and gesture dramatically. People cry, faint, speak in tongues. They call it being "slain in the Spirit." The emotional intensity is overwhelming—religion becomes personal, immediate, felt rather than merely believed.

New denominations flourish. Methodists and Baptists grow explosively because they emphasize personal conversion and emotional worship. Traditional churches like Congregationalists decline. Even stranger groups emerge—Mormons founded by Joseph Smith claim new scripture and prophecy. Seventh-Day Adventists predict Christ's imminent return. America's religious landscape is fragmenting and multiplying.`,
        },
        {
          title: "Perfectionism and Reform",
          content: `The Second Great Awakening teaches that people can be perfected through faith. This idea has explosive implications: if individuals can be perfected, why not perfect society? Religious enthusiasm spills into social activism. We call it creating the "Kingdom of God on Earth."

The temperance movement grows directly from revival fervor. Reformers argue alcohol destroys families, causes poverty and crime, prevents spiritual growth. They establish temperance societies, demand pledges of abstinence, push for laws restricting or banning alcohol sales. Mother joined the Women's Christian Temperance Union, believing drunkenness is the root of domestic violence and family suffering.

Education reform also emerges. Horace Mann argues all children deserve free public education, not just the wealthy. If democracy requires informed citizens, and salvation requires reading the Bible, then universal education becomes both politically and religiously necessary. New York and Massachusetts lead in establishing public schools.

Dorothea Dix investigates how society treats the mentally ill—she finds them chained in cellars, beaten, neglected. Her religious convictions drive her to demand reform: asylums instead of prisons, treatment instead of punishment, compassion instead of cruelty. She successfully lobbies states to establish mental hospitals.`,
        },
        {
          title: "The Abolition Movement",
          content: `The most radical reform inspired by the Awakening is abolition—the immediate end to slavery. William Lloyd Garrison publishes The Liberator, demanding emancipation now, without compensation to slaveholders, without colonization to Africa. His motto: "I will be heard!"

This position is far more extreme than earlier antislavery movements. Previously, antislavery meant gradual emancipation, compensating owners, perhaps sending freed people to Africa. Garrisonian abolition is uncompromising: slavery is sin, slaveholders are sinners, compromise with evil is itself evil.

The religious logic is clear: if all people are God's children with souls to be saved, slavery is a moral abomination. How can Christians enslave fellow Christians? How can America claim to value liberty while holding millions in bondage? The contradiction between American ideals and slavery becomes unbearable to revival-fired consciences.

Theodore Weld and the Grimké sisters—Sarah and Angelina—tour the North giving speeches against slavery. The Grimkés are especially powerful because they're Southern, from a slaveholding family, speaking from personal witness of slavery's evils. Their testimony converts thousands to the abolitionist cause.

But abolitionists face violent opposition. Mobs attack their meetings, burn their publications, tar and feather speakers. Even many Northerners view abolitionists as dangerous radicals threatening the Union and inciting slave rebellions. Reform isn't popular—it's divisive, dangerous work.`,
        },
        {
          title: "Women's Growing Role",
          content: `The Second Great Awakening empowers women in unexpected ways. Revivals welcome women's participation—they can testify, lead prayer groups, even sometimes preach. This challenges the traditional view that women should be silent in church and submissive at home.

Women dominate reform movements numerically. They organize temperance societies, education campaigns, poorhouse relief, and moral reform associations. They argue that women have special moral authority because of their role as mothers and moral guardians of families.

But public activism creates a dilemma. Women can't vote, can't hold political office, face legal restrictions on property ownership and education. The Grimké sisters, traveling to speak against slavery, are attacked not just for their abolitionism but for speaking publicly at all. Some clergy insist women speaking publicly violates biblical teaching.

This contradiction radicalizes some women reformers. If they can see slavery's injustice, why can't they see women's oppression? If they demand rights for enslaved people, why not demand rights for women? The connection between abolition and women's rights becomes clear: both challenge hierarchy, inequality, the idea that some people are naturally subordinate to others.`,
        },
        {
          title: "The Reform Legacy",
          content: `The Second Great Awakening transforms American society. It makes religion emotional and personal rather than formal and institutional. It empowers individuals to choose their salvation. It sparks hundreds of reform movements aimed at perfecting society.

But it also reveals deep divisions. Reform movements often conflict. Abolitionists split over whether to work within the political system or demand immediate, uncompromising change. Temperance advocates divide over whether to persuade individuals or pass prohibition laws. Women's rights activists clash with those who think women should reform society only within traditional roles.

The Awakening's optimism—that people and society can be perfected—will shape American culture for generations. Americans will believe they can solve any problem, fix any injustice, create heaven on Earth through enough effort and faith. This optimism drives American reform, American imperialism, American exceptionalism.

But the Awakening also intensifies sectional conflict. Northern revivals produce abolitionists. Southern revivals produce defenders of slavery who use the Bible to justify it. Both sides claim religious authority. When North and South finally fight, both will pray to the same God and claim His blessing. The religious energy that inspires reform also fuels the conflict that will tear the nation apart.

Standing in Rochester, watching reform movements multiply, I see America's future being shaped. We're learning that religious conviction can change the world. Whether that change brings freedom or conflict, unity or division, depends on which vision of God's kingdom prevails.`,
        },
      ],
    },
    flashcards: [
      {id: "fc29-1", term: "Second Great Awakening", definition: "Religious revival (1800-1840) emphasizing personal conversion and moral reform."},
      {id: "fc29-2", term: "Charles Finney", definition: "Leading revivalist preacher emphasizing free will."},
      {id: "fc29-3", term: "Burned-Over District", definition: "Western New York where intense revivals repeatedly occurred."},
      {id: "fc29-4", term: "Temperance Movement", definition: "Reform movement advocating limiting/banning alcohol."},
      {id: "fc29-5", term: "Abolition", definition: "Movement to end slavery immediately."},
      {id: "fc29-6", term: "Moral Reform", definition: "Belief society could be perfected through religious-inspired improvements."},
      {id: "fc29-7", term: "William Lloyd Garrison", definition: "Radical abolitionist demanding immediate end to slavery."},
      {id: "fc29-8", term: "Dorothea Dix", definition: "Reformer advocating humane treatment of mentally ill."},
    ],
    quiz: [
      {id: "q29-1", question: "What was the Second Great Awakening?", options: ["Political movement", "Religious revival emphasizing personal conversion and reform", "A war", "Trade agreement"], correctOptionIndex: 1, explanation: "Religious revival movement emphasizing personal conversion, free will in salvation, and moral reform of society."},
      {id: "q29-2", question: "How did it inspire social reform?", options: ["It didn't", "Led people to believe they could perfect society through moral improvements", "Opposed reform", "Only affected religion"], correctOptionIndex: 1, explanation: "If individuals could be perfected, reformers believed society could be perfected through moral improvements."},
      {id: "q29-3", question: "What was temperance?", options: ["Weather movement", "Reform advocating limiting/banning alcohol", "Political party", "Military strategy"], correctOptionIndex: 1, explanation: "Temperance movement advocated limiting or banning alcohol consumption, arguing drinking destroyed families."},
    ],
  },

  {
    id: "lesson-30",
    title: "Seneca Falls Convention",
    description: "Birth of Women's Rights Movement (1848)",
    heroImage: "/images/hero-seneca-falls.jpg",
    story: {
      narrator: "Charlotte, age 17, at the convention, 1848",
      chapters: [
        {
          title: "Declaration of Sentiments",
          content: `I'm Charlotte, seventeen, attending the first women's rights convention in Seneca Falls, New York. Elizabeth Cady Stanton and Lucretia Mott organized this gathering—about 300 people, including 40 men. Frederick Douglass, the great abolitionist, came to support us.

Stanton drafted a "Declaration of Sentiments" that mirrors the Declaration of Independence. She even uses its structure: "We hold these truths to be self-evident, that all men and women are created equal..." It's brilliant—she's using America's founding document to indict America's treatment of women.

The Declaration lists eighteen grievances against men's tyranny over women. We can't vote. Married women have no legal existence—their property, earnings, even their children belong to their husbands. We're denied access to higher education and most professions. We're paid less than men for the same work. We're excluded from participating in church governance despite being the majority of church members.

The most controversial resolution demands women's suffrage—the right to vote. Even many convention supporters think this goes too far. It will make us look ridiculous, they argue. We should focus on property rights and education first. But Stanton insists: without political power, we can't secure any other rights. Douglass speaks powerfully in favor, arguing that excluding women from voting is as unjust as excluding Black men. The suffrage resolution passes, but narrowly.`,
        },
        {
          title: "The Case for Women's Rights",
          content: `The convention challenges the doctrine of "separate spheres"—the idea that men naturally belong in public life (politics, business, the professions) while women naturally belong in domestic life (home, children, moral influence). This ideology claims women are too delicate, too emotional, too pure for the rough world of politics and commerce.

Stanton argues these aren't natural differences but social constructions. Women seem unsuited for public life because they're denied education, experience, and opportunity—not because they lack capability. If women appear weak, it's because society keeps them weak. If they seem ignorant of politics, it's because they're excluded from political participation.

The religious argument for women's subordination particularly angers Stanton. Clergy cite St. Paul's instruction that women should be silent in church and submissive to husbands. But Stanton points out that Jesus treated women as equals, that women were the first witnesses to the resurrection, that religious oppression of women contradicts Christian teachings about human dignity and worth.

I find these arguments liberating but frightening. I've been taught my whole life that women are naturally different from men, that our proper role is supportive not leading, that we find fulfillment in serving our families not pursuing our own ambitions. Now Stanton is saying these "natural" differences are artificial, these "proper" roles are imposed, this "fulfillment" is actually subordination. It's exhilarating and terrifying to imagine I could be more than I've been told I must be.`,
        },
        {
          title: "Immediate Backlash",
          content: `The convention concluded with 68 women and 32 men signing the Declaration of Sentiments. We left energized, hopeful, ready to change the world. Then the newspapers arrived.

The mockery is brutal. Papers call us "insane," "unwomanly," "ridiculous." One wrote that the convention was proof women lack the judgment to participate in politics. Another suggested we should focus on being better wives and mothers rather than demanding rights. Editorial cartoons depict us as mannish, ugly, unnatural.

The clergy is even harsher. Pastors preach sermons against us, citing biblical commands for female submission. They warn that women's rights will destroy the family, corrupt morals, bring God's judgment on America. Some congregations expel women who attended or supported the convention.

Even worse is the personal cost. Many women who signed the Declaration face social ostracism. Some husbands forbid their wives from further involvement. Several women actually withdrew their signatures under pressure. One told me through tears, "I believe in our cause, but I can't afford to be unmarriageable or unemployable. I have to live in this society."

Mother is horrified I attended. Father forbids me from further involvement. "You'll ruin your reputation," they warn. "No decent man will marry you. You'll be alone and scorned." Their concern is genuine—they're right that advocating for women's rights carries real social and economic costs. But their solution—silent submission to injustice—is unacceptable to me now.`,
        },
        {
          title: "The Long Road Ahead",
          content: `Despite the backlash, I'm not discouraged. Stanton predicted opposition. "We expect opposition," she said. "All great truths face resistance. But truth eventually prevails." She's right—every reform movement faces mockery before acceptance.

The suffrage fight will be particularly long. Some convention attendees will live to see women vote in a few western territories—Wyoming will grant women suffrage in 1869. But none of us will live to see full American women's suffrage. That won't come until 1920, 72 years after Seneca Falls. The teenagers at this convention will be dead before women win the vote they demanded.

But other changes will come faster. New York will pass the Married Women's Property Act in 1848, letting married women own property. More colleges will admit women. Professional opportunities will slowly open. Each victory builds on the ones before, creating momentum.

The connection between women's rights and abolition remains strong. Many women came to feminism through antislavery work—they saw slavery's injustice and recognized parallels to women's oppression. Both were defended as "natural" hierarchies ordained by God. Both limited human potential and dignity. Both relied on denying rights to a subordinated group.

But this connection will also cause problems. After the Civil War, when the nation debates giving Black men the vote, women's rights advocates will demand votes for women too. Some abolitionists will say "This is the Negro's hour"—we must focus on Black male suffrage and address women's suffrage later. This will split the movement and embitter many women who feel betrayed by former allies.`,
        },
        {
          title: "Planting Seeds",
          content: `Standing in Seneca Falls at the close of the convention, I understand we've started something that will outlive us all. We're not demanding immediate change—we know that's impossible. We're planting seeds that future generations will harvest.

The Declaration of Sentiments gives the women's rights movement its founding document, its statement of principles, its catalogue of grievances. Like the Declaration of Independence, it doesn't create immediate change but establishes ideals to strive toward. America didn't achieve the equality its Declaration proclaimed in 1776—and still hasn't fully achieved it. But having proclaimed those ideals made hypocrisy visible and change possible.

We're applying America's founding principles consistently. If "all men are created equal" and possess "inalienable rights," then either women aren't fully human, or they possess those rights too. America must either grant women equal rights or admit its founding principles are lies. We're forcing that choice.

I think about my future daughters and granddaughters. They'll grow up in a different America, one where women can vote, own property, pursue education and careers, participate fully in society. They'll take for granted rights we're ridiculed for demanding. They might not even know about Seneca Falls, might not remember the women who fought so they could be free.

But that's okay. We're not doing this for recognition. We're doing it because it's right, because current injustices are intolerable, because we believe in America's promise even when America doesn't. We're doing it so future women won't have to—so they'll inherit rights as their birthright rather than having to fight for them as we do.

The fight for women's rights has begun. It will take decades, face setbacks, divide allies, exact costs from its advocates. But it will succeed because its cause is just and its logic irrefutable. The question isn't if women will gain equal rights, but when. Today at Seneca Falls, we declared that "when" should be now. Our great-granddaughters will complete what we've started. And that's enough.`,
        },
      ],
    },
    flashcards: [
      {id: "fc30-1", term: "Seneca Falls Convention", definition: "1848 meeting launching organized women's rights movement."},
      {id: "fc30-2", term: "Declaration of Sentiments", definition: "Document declaring men and women created equal, modeled on Declaration of Independence."},
      {id: "fc30-3", term: "Elizabeth Cady Stanton", definition: "Key organizer of Seneca Falls and lifelong women's rights advocate."},
      {id: "fc30-4", term: "Lucretia Mott", definition: "Quaker abolitionist who helped organize Seneca Falls."},
      {id: "fc30-5", term: "Women's Suffrage", definition: "Right of women to vote—most controversial Seneca Falls demand."},
      {id: "fc30-6", term: "Separate Spheres", definition: "Ideology that men belong in public life, women in domestic life."},
      {id: "fc30-7", term: "Property Rights", definition: "Women's demand to control own property including after marriage."},
      {id: "fc30-8", term: "Frederick Douglass", definition: "Former slave who supported women's suffrage at Seneca Falls."},
    ],
    quiz: [
      {id: "q30-1", question: "What was Seneca Falls Convention?", options: ["Political rally", "First women's rights convention (1848)", "Religious meeting", "Trade fair"], correctOptionIndex: 1, explanation: "First organized meeting to discuss women's rights in America, launching the movement."},
      {id: "q30-2", question: "What was Declaration of Sentiments?", options: ["War declaration", "Document declaring men and women created equal", "Treaty", "Recipe book"], correctOptionIndex: 1, explanation: "Paralleled Declaration of Independence, stating 'all men and women are created equal' with list of grievances."},
      {id: "q30-3", question: "Most controversial demand?", options: ["Better food", "Voting rights for women", "More churches", "Lower taxes"], correctOptionIndex: 1, explanation: "Voting rights (suffrage) was most controversial. Even supporters thought it too radical."},
    ],
  },

  {
    id: "lesson-31",
    title: "Manifest Destiny",
    description: "Westward Expansion (1840s)",
    heroImage: "/images/hero-manifest-destiny.jpg",
    story: {
      narrator: "Samuel, age 16, on Oregon Trail, 1846",
      chapters: [
        {title: "Oregon Trail", content: `I'm Samuel, sixteen, on the Oregon Trail. Six months from Missouri, 2,000 miles of hardship. John O'Sullivan called it "Manifest Destiny"—God intended America to span the continent. But whose land? We're crossing Native territories. We see empty land ready for settlement. They see homeland being invaded. What we call progress, they call theft.`},
        {title: "54-40 or Fight", content: `America growing rapidly. Annexed Texas (1845). Conflict with Mexico over border. Negotiating with Britain over Oregon—some demand all Oregon to 54°40'. Polk compromised at 49th parallel. But pushed for war with Mexico. We've reached Oregon and claimed land. But costs are high. Natives displaced. Mexico will lose half its territory. Manifest Destiny brings us opportunity—but dispossession for those here first.`},
      ],
    },
    flashcards: [
      {id: "fc31-1", term: "Manifest Destiny", definition: "Belief America was destined by God to expand across North America."},
      {id: "fc31-2", term: "Oregon Trail", definition: "2,000-mile route from Missouri to Oregon used by westward migrants."},
      {id: "fc31-3", term: "James K. Polk", definition: "President pursuing aggressive westward expansion."},
      {id: "fc31-4", term: "Texas Annexation", definition: "1845 admission of Texas (former Mexican territory) as state."},
      {id: "fc31-5", term: "54-40 or Fight", definition: "Slogan demanding all Oregon to latitude 54°40'."},
      {id: "fc31-6", term: "49th Parallel", definition: "Compromise border between U.S. and Canada in Pacific Northwest."},
      {id: "fc31-7", term: "John O'Sullivan", definition: "Journalist who coined 'Manifest Destiny.'"},
      {id: "fc31-8", term: "Westward Expansion", definition: "Movement of American settlers across continent in 1800s."},
    ],
    quiz: [
      {id: "q31-1", question: "What was Manifest Destiny?", options: ["A person", "Belief America destined by God to expand across continent", "A wagon", "A treaty"], correctOptionIndex: 1, explanation: "Belief it was God's will for U.S. to expand across North America."},
      {id: "q31-2", question: "What was Oregon Trail?", options: ["State road", "2,000-mile route to Oregon used by migrants", "River", "Mountain"], correctOptionIndex: 1, explanation: "Roughly 2,000-mile route thousands traveled by wagon from Missouri to Oregon."},
      {id: "q31-3", question: "Conflicts from Manifest Destiny?", options: ["No conflicts", "Dispossession of Natives and war with Mexico", "Peace with all", "Friendship"], correctOptionIndex: 1, explanation: "Led to pushing Natives off lands and Mexican-American War over territory."},
    ],
  },

  // UNIT 5: SECTIONAL CRISIS (Lessons 32-36)

  {
    id: "lesson-32",
    title: "The Mexican-American War",
    description: "War and Territorial Gains (1846-1848)",
    heroImage: "/images/hero-mexican-war.jpg",
    story: {
      narrator: "Miguel, age 16, American soldier, 1847",
      chapters: [
        {title: "War with Mexico", content: `I'm Miguel, sixteen, fighting in Mexico. Texas annexation and border disputes led to war. Many support it as Manifest Destiny. Others—especially abolitionists—oppose it as war to expand slavery. We've won major battles. General Winfield Scott captured Mexico City. But victory feels hollow—we're taking half of Mexico's territory.`},
        {title: "Treaty of Guadalupe Hidalgo", content: `Treaty gives U.S. California, Nevada, Utah, Arizona, New Mexico, parts of Colorado and Wyoming. Mexico loses half its territory. Mexican citizens in these areas become Americans overnight—their property often seized despite treaty promises. We've gained vast land. But reopened slavery question: will these territories be slave or free? This territorial gain will tear the nation apart.`},
      ],
    },
    flashcards: [
      {id: "fc32-1", term: "Mexican-American War", definition: "1846-1848 war resulting in U.S. acquiring vast Mexican territory."},
      {id: "fc32-2", term: "Treaty of Guadalupe Hidalgo", definition: "1848 treaty ending war, Mexico ceding half its territory to U.S."},
      {id: "fc32-3", term: "Mexican Cession", definition: "Land Mexico gave up: California, Nevada, Utah, Arizona, New Mexico, parts of Colorado/Wyoming."},
      {id: "fc32-4", term: "Zachary Taylor", definition: "General who won key battles in Mexican War, later became President."},
      {id: "fc32-5", term: "Winfield Scott", definition: "General who captured Mexico City, ending the war."},
      {id: "fc32-6", term: "Bear Flag Revolt", definition: "American settlers' rebellion in California during Mexican War."},
      {id: "fc32-7", term: "Rio Grande", definition: "River that became disputed Texas-Mexico border."},
      {id: "fc32-8", term: "Wilmot Proviso", definition: "Failed proposal to ban slavery in territories acquired from Mexico."},
    ],
    quiz: [
      {id: "q32-1", question: "What caused Mexican-American War?", options: ["Religious differences", "Texas annexation and border disputes", "Trade disagreement", "Accident"], correctOptionIndex: 1, explanation: "War caused by Texas annexation and disputes over Texas-Mexico border."},
      {id: "q32-2", question: "What did U.S. gain?", options: ["Nothing", "California, Nevada, Utah, Arizona, New Mexico, parts of Colorado/Wyoming", "Only Texas", "Florida"], correctOptionIndex: 1, explanation: "Treaty of Guadalupe Hidalgo gave U.S. vast Mexican territory—about half of Mexico."},
      {id: "q32-3", question: "Why did abolitionists oppose war?", options: ["They supported Mexico", "They saw it as war to expand slavery into new territories", "They opposed all wars", "No reason"], correctOptionIndex: 1, explanation: "Abolitionists opposed the war as an attempt to expand slavery into new territories."},
    ],
  },

  {
    id: "lesson-33",
    title: "The Compromise of 1850",
    description: "Delaying the Inevitable (1850)",
    heroImage: "/images/hero-compromise-1850.jpg",
    story: {
      narrator: "Anna, age 15, from California, 1850",
      chapters: [
        {title: "Crisis Over Slavery", content: `I'm Anna from California. Gold Rush brought thousands here. We want statehood—as a free state. But this would upset the balance: 15 slave states, 15 free states. South threatens secession if we're admitted free. Henry Clay proposes compromise: admit California free, organize Utah/New Mexico territories without deciding slavery (popular sovereignty), stricter fugitive slave law, end DC slave trade.`},
        {title: "Uneasy Truce", content: `After fierce debate, compromise passes. California admitted free. But Fugitive Slave Act outrages North—requires Northerners to help catch runaways. Slave hunters can seize free Blacks with minimal evidence. Many refuse to comply. Compromise delayed conflict but solved nothing fundamental. Slavery question will explode again. This temporary peace won't last.`},
      ],
    },
    flashcards: [
      {id: "fc33-1", term: "Compromise of 1850", definition: "Agreement admitting California free while strengthening fugitive slave laws."},
      {id: "fc33-2", term: "Fugitive Slave Act", definition: "1850 law requiring Northerners to help capture escaped slaves."},
      {id: "fc33-3", term: "Popular Sovereignty", definition: "Letting territorial settlers vote whether to allow slavery."},
      {id: "fc33-4", term: "Henry Clay", definition: "The 'Great Compromiser' who brokered 1850 agreement."},
      {id: "fc33-5", term: "California Gold Rush", definition: "1849 migration to California after gold discovery."},
      {id: "fc33-6", term: "Sectional Balance", definition: "Equal number of free and slave states in Senate."},
      {id: "fc33-7", term: "Personal Liberty Laws", definition: "Northern state laws attempting to protect fugitive slaves."},
      {id: "fc33-8", term: "Stephen Douglas", definition: "Senator who helped pass Compromise of 1850."},
    ],
    quiz: [
      {id: "q33-1", question: "What was Compromise of 1850?", options: ["Tax agreement", "Admitted California free while strengthening fugitive slave laws", "Military pact", "Trade deal"], correctOptionIndex: 1, explanation: "Compromise admitted California as free state but included stricter Fugitive Slave Act."},
      {id: "q33-2", question: "What was Fugitive Slave Act?", options: ["Freed all slaves", "Required Northerners to help capture escaped slaves", "Banned slavery", "Protected runaways"], correctOptionIndex: 1, explanation: "Required Northern citizens to assist in capturing fugitive slaves, outraging many Northerners."},
      {id: "q33-3", question: "What was popular sovereignty?", options: ["Direct democracy", "Letting territorial settlers vote on allowing slavery", "Monarchy", "Dictatorship"], correctOptionIndex: 1, explanation: "Popular sovereignty let settlers in territories decide whether to allow slavery."},
    ],
  },

  {
    id: "lesson-34",
    title: "Uncle Tom's Cabin",
    description: "The Power of Literature (1852)",
    heroImage: "/images/hero-uncle-toms-cabin.jpg",
    story: {
      narrator: "Rebecca, age 14, Northern girl, 1852",
      chapters: [
        {title: "A Book That Changed America", content: `I'm Rebecca, fourteen. I just read Uncle Tom's Cabin by Harriet Beecher Stowe. It tells the story of enslaved people: Uncle Tom, sold away from his family; Eliza, fleeing across ice with her baby; cruel overseer Simon Legree beating slaves. Mother cried reading it. Father, who'd been indifferent to slavery, now calls it evil. The book makes slavery personal, human, impossible to ignore.`},
        {title: "Nation Divided", content: `The book sells 300,000 copies first year. Northerners who'd tolerated slavery now oppose it morally. Southerners furious—call it propaganda, lies. They publish pro-slavery novels defending the institution. When Lincoln later meets Stowe, he reportedly says, "So you're the little woman who wrote the book that started this great war." Literature has power. Stowe's words changed hearts, hardened divisions, made civil war more likely.`},
      ],
    },
    flashcards: [
      {id: "fc34-1", term: "Uncle Tom's Cabin", definition: "1852 anti-slavery novel by Harriet Beecher Stowe that influenced Northern opinion."},
      {id: "fc34-2", term: "Harriet Beecher Stowe", definition: "Author whose novel Uncle Tom's Cabin galvanized Northern opposition to slavery."},
      {id: "fc34-3", term: "Uncle Tom", definition: "Main character in Stowe's novel—faithful slave sold away from family."},
      {id: "fc34-4", term: "Simon Legree", definition: "Cruel slave owner in novel who became symbol of slavery's brutality."},
      {id: "fc34-5", term: "Eliza", definition: "Character who fled slavery by crossing icy Ohio River with her baby."},
      {id: "fc34-6", term: "Abolitionist Literature", definition: "Books and publications advocating end of slavery."},
      {id: "fc34-7", term: "Pro-Slavery Response", definition: "Southern novels defending slavery in response to Uncle Tom's Cabin."},
      {id: "fc34-8", term: "Moral Persuasion", definition: "Strategy of changing opinions through emotional appeal rather than politics."},
    ],
    quiz: [
      {id: "q34-1", question: "What was Uncle Tom's Cabin?", options: ["A house", "Anti-slavery novel by Stowe that influenced Northern opinion", "A restaurant", "A ship"], correctOptionIndex: 1, explanation: "1852 novel depicting slavery's horrors that profoundly influenced Northern attitudes."},
      {id: "q34-2", question: "How did it affect the nation?", options: ["No effect", "Galvanized Northern opposition to slavery while enraging South", "Everyone agreed", "Ended slavery"], correctOptionIndex: 1, explanation: "Galvanized Northern anti-slavery feeling while enraging South, deepening sectional divide."},
      {id: "q34-3", question: "Who was Harriet Beecher Stowe?", options: ["A slave", "Author who wrote Uncle Tom's Cabin", "British queen", "Southern plantation owner"], correctOptionIndex: 1, explanation: "Author whose anti-slavery novel became best-seller and changed Northern attitudes."},
    ],
  },

  {
    id: "lesson-35",
    title: "Kansas-Nebraska Act",
    description: "Bleeding Kansas (1854-1859)",
    heroImage: "/images/hero-bleeding-kansas.jpg",
    story: {
      narrator: "John, age 17, Kansas settler, 1856",
      chapters: [
        {title: "Popular Sovereignty Fails", content: `I'm John, seventeen, in Kansas Territory. Stephen Douglas's Kansas-Nebraska Act let us vote on slavery—popular sovereignty. Seemed democratic. But pro-slavery Missourians cross border to vote illegally. Abolitionists pour in from North. Both sides bring weapons. Elections rigged. Competing governments form. Kansas becomes battleground for nation's slavery conflict.`},
        {title: "Bleeding Kansas", content: `Violence erupts. Pro-slavery forces attack Lawrence. John Brown leads abolitionists in Pottawatomie Massacre, killing five. Guerrilla warfare. Over 200 dead. In Washington, Senator Brooks beats Senator Sumner with a cane for anti-slavery speech. Democracy fails when both sides refuse to accept votes, resort to violence. "Bleeding Kansas" shows slavery question won't be solved peacefully. War approaches.`},
      ],
    },
    flashcards: [
      {id: "fc35-1", term: "Kansas-Nebraska Act", definition: "1854 law allowing Kansas/Nebraska to decide slavery by popular sovereignty."},
      {id: "fc35-2", term: "Bleeding Kansas", definition: "Violent conflict in Kansas Territory over whether it would allow slavery."},
      {id: "fc35-3", term: "Stephen Douglas", definition: "Senator who proposed Kansas-Nebraska Act."},
      {id: "fc35-4", term: "Border Ruffians", definition: "Pro-slavery Missourians who illegally voted in Kansas."},
      {id: "fc35-5", term: "John Brown", definition: "Radical abolitionist who led violence in Kansas."},
      {id: "fc35-6", term: "Pottawatomie Massacre", definition: "John Brown's killing of five pro-slavery settlers."},
      {id: "fc35-7", term: "Sack of Lawrence", definition: "Pro-slavery attack on abolitionist town in Kansas."},
      {id: "fc35-8", term: "Sumner-Brooks Incident", definition: "Representative Brooks beating Senator Sumner with cane in Senate chamber."},
    ],
    quiz: [
      {id: "q35-1", question: "What was Kansas-Nebraska Act?", options: ["Tax law", "Law allowing Kansas/Nebraska to decide slavery by popular sovereignty", "Military law", "Trade agreement"], correctOptionIndex: 1, explanation: "1854 law letting Kansas and Nebraska settlers vote on allowing slavery."},
      {id: "q35-2", question: "What was Bleeding Kansas?", options: ["Medical crisis", "Violent conflict over whether Kansas would allow slavery", "Natural disaster", "Festival"], correctOptionIndex: 1, explanation: "Violent conflict as pro and anti-slavery forces fought for control of Kansas."},
      {id: "q35-3", question: "What did Bleeding Kansas demonstrate?", options: ["Democracy works", "Slavery question couldn't be solved peacefully—violence was approaching", "Everyone agreed", "Problem solved"], correctOptionIndex: 1, explanation: "Showed slavery question couldn't be solved peacefully when both sides refused to accept results and resorted to violence."},
    ],
  },

  {
    id: "lesson-36",
    title: "Dred Scott Decision",
    description: "The Supreme Court Fails (1857)",
    heroImage: "/images/hero-dred-scott.jpg",
    story: {
      narrator: "Frederick, age 16, free Black in Pennsylvania, 1857",
      chapters: [
        {title: "The Case", content: `I'm Frederick, sixteen, free Black in Pennsylvania. Today the Supreme Court ruled on Dred Scott v. Sandford. Scott, enslaved, lived in free territory then returned to slave state. He sued for freedom. We hoped the Court would free him. Instead, Chief Justice Taney ruled: Black people aren't citizens, have no rights whites must respect. Even free Blacks like me have no legal standing. Devastating.`},
        {title: "Constitutional Crisis", content: `Worse: Taney ruled Congress can't ban slavery in territories—Missouri Compromise unconstitutional. Popular sovereignty unconstitutional. No legal way to stop slavery's spread. Southerners celebrate. Northerners outraged. Republicans vow to ignore the decision if they win presidency. Supreme Court's credibility destroyed. Constitutional remedies exhausted. If law can't resolve this conflict, only war can.`},
      ],
    },
    flashcards: [
      {id: "fc36-1", term: "Dred Scott v. Sandford", definition: "1857 Supreme Court case ruling enslaved people weren't citizens and had no rights."},
      {id: "fc36-2", term: "Roger Taney", definition: "Chief Justice who wrote Dred Scott decision."},
      {id: "fc36-3", term: "Dred Scott", definition: "Enslaved man who sued for freedom after living in free territory."},
      {id: "fc36-4", term: "Citizenship", definition: "Legal status Court denied to all Black people, free or enslaved."},
      {id: "fc36-5", term: "Missouri Compromise", definition: "1820 agreement Court declared unconstitutional in Dred Scott."},
      {id: "fc36-6", term: "Territorial Slavery", definition: "Court ruled Congress couldn't ban slavery in territories."},
      {id: "fc36-7", term: "Republican Opposition", definition: "Party vowed to defy Dred Scott decision if they won presidency."},
      {id: "fc36-8", term: "Constitutional Crisis", definition: "Dred Scott created crisis by eliminating legal solutions to slavery question."},
    ],
    quiz: [
      {id: "q36-1", question: "What did Dred Scott decision rule?", options: ["Freed all slaves", "Black people weren't citizens and had no rights", "Banned slavery", "Gave everyone rights"], correctOptionIndex: 1, explanation: "Court ruled Black people weren't citizens and 'had no rights which white man was bound to respect.'"},
      {id: "q36-2", question: "What about territories?", options: ["States decide", "Congress couldn't ban slavery in territories—Missouri Compromise unconstitutional", "Slavery banned everywhere", "No rule made"], correctOptionIndex: 1, explanation: "Court ruled Congress had no power to ban slavery in territories, declaring Missouri Compromise unconstitutional."},
      {id: "q36-3", question: "Why was decision so divisive?", options: ["Everyone agreed", "Eliminated legal solutions to slavery, making war more likely", "It freed slaves", "It was fair"], correctOptionIndex: 1, explanation: "By ruling out legal solutions to slavery question, decision made war more likely as only remaining resolution."},
    ],
  },

  // UNIT 6: CIVIL WAR (Lessons 37-40)

  {
    id: "lesson-37",
    title: "Lincoln's Election & Secession",
    description: "The Union Breaks (1860-1861)",
    heroImage: "/images/hero-secession.jpg",
    story: {
      narrator: "William, age 15, from South Carolina, 1860",
      chapters: [
        {title: "Lincoln Wins", content: `I'm William from South Carolina. Abraham Lincoln won presidency without a single Southern electoral vote. Republicans oppose slavery's expansion. South sees this as existential threat. South Carolina secedes December 1860. Father and neighbors celebrate—we're independent! Then Mississippi, Florida, Alabama, Georgia, Louisiana, Texas follow. Confederate States of America formed. Jefferson Davis president. We've left the Union.`},
        {title: "Fort Sumter", content: `Federal Fort Sumter in Charleston harbor remains Union controlled. Lincoln says he'll resupply it. Confederate commander demands surrender. Lincoln won't abandon federal property. April 12, 1861, we bombard Fort Sumter. It surrenders after 34 hours. We've fired on the American flag. No turning back now. Lincoln calls for 75,000 troops. Virginia, North Carolina, Tennessee, Arkansas join Confederacy. War has begun.`},
      ],
    },
    flashcards: [
      {id: "fc37-1", term: "Abraham Lincoln", definition: "First Republican president whose election triggered Southern secession."},
      {id: "fc37-2", term: "Secession", definition: "Southern states leaving the Union to form the Confederacy."},
      {id: "fc37-3", term: "Confederate States of America", definition: "Nation formed by eleven seceding Southern states."},
      {id: "fc37-4", term: "Jefferson Davis", definition: "President of the Confederate States of America."},
      {id: "fc37-5", term: "Fort Sumter", definition: "Federal fort in Charleston where Civil War began with Confederate attack."},
      {id: "fc37-6", term: "Border States", definition: "Slave states (Delaware, Maryland, Kentucky, Missouri) that stayed in Union."},
      {id: "fc37-7", term: "Republican Party", definition: "Anti-slavery expansion party formed 1854, Lincoln's party."},
      {id: "fc37-8", term: "Deep South", definition: "First seven states to secede (SC, MS, FL, AL, GA, LA, TX)."},
    ],
    quiz: [
      {id: "q37-1", question: "Why did South secede?", options: ["No reason", "Lincoln's election—they saw Republican opposition to slavery expansion as existential threat", "Economic boom", "Religious differences"], correctOptionIndex: 1, explanation: "South seceded because Lincoln's Republican victory threatened slavery's expansion, which they saw as existential threat."},
      {id: "q37-2", question: "What was Fort Sumter?", options: ["Confederate capital", "Federal fort where Confederates fired first shots starting Civil War", "Northern city", "Railroad"], correctOptionIndex: 1, explanation: "Federal fort in Charleston harbor where Confederates fired first shots of Civil War in April 1861."},
      {id: "q37-3", question: "Who was Jefferson Davis?", options: ["Union general", "President of Confederate States of America", "British leader", "Northern senator"], correctOptionIndex: 1, explanation: "Jefferson Davis served as president of the Confederate States of America."},
    ],
  },

  {
    id: "lesson-38",
    title: "The Civil War Begins",
    description: "Bull Run to Antietam (1861-1862)",
    heroImage: "/images/hero-civil-war.jpg",
    story: {
      narrator: "Thomas, age 17, Union soldier, 1862",
      chapters: [
        {title: "First Bull Run", content: `I'm Thomas, seventeen, Union Army. We marched to Virginia confident—we'd crush the rebellion quickly. At Bull Run, reality hit. Confederate forces led by Stonewall Jackson stood firm. We broke and ran. Civilians who'd come from Washington to watch fled with us. Humiliating defeat. War won't be quick or easy. Both sides dig in for long fight.`},
        {title: "Antietam", content: `September 1862, bloodiest single day in American history. 23,000 killed or wounded at Antietam. I saw friends die. Saw more death in one day than imaginable. Tactically a draw. But Confederates retreat. Lincoln uses it to issue Emancipation Proclamation—freeing slaves in rebel states. War now about slavery, not just Union. Changes everything. Foreign powers won't support Confederacy. Gives war moral purpose.`},
      ],
    },
    flashcards: [
      {id: "fc38-1", term: "Battle of Bull Run", definition: "First major Civil War battle (July 1861), Confederate victory shocking the North."},
      {id: "fc38-2", term: "Stonewall Jackson", definition: "Confederate general who earned nickname at Bull Run for standing firm."},
      {id: "fc38-3", term: "Battle of Antietam", definition: "Bloodiest single day in American history (Sept. 1862), 23,000 casualties."},
      {id: "fc38-4", term: "Emancipation Proclamation", definition: "Lincoln's 1863 order freeing slaves in Confederate states."},
      {id: "fc38-5", term: "Robert E. Lee", definition: "Brilliant Confederate general who led Army of Northern Virginia."},
      {id: "fc38-6", term: "George McClellan", definition: "Cautious Union general who commanded at Antietam."},
      {id: "fc38-7", term: "Total War", definition: "Strategy of destroying enemy's economy and will to fight, not just defeating armies."},
      {id: "fc38-8", term: "Anaconda Plan", definition: "Union strategy to blockade South and control Mississippi River."},
    ],
    quiz: [
      {id: "q38-1", question: "What happened at Bull Run?", options: ["Union victory", "Confederate victory shocking North that war wouldn't be quick/easy", "Draw", "Nothing"], correctOptionIndex: 1, explanation: "First major battle was Confederate victory that shattered Northern expectations of quick war."},
      {id: "q38-2", question: "What was Antietam?", options: ["Confederate capital", "Bloodiest single day in American history with 23,000 casualties", "Union capital", "Peace treaty"], correctOptionIndex: 1, explanation: "September 1862 battle was bloodiest single day in U.S. history with 23,000 killed or wounded."},
      {id: "q38-3", question: "What was Emancipation Proclamation?", options: ["Tax law", "Lincoln's order freeing slaves in Confederate states", "Treaty ending war", "Military strategy"], correctOptionIndex: 1, explanation: "Lincoln's 1863 order freed slaves in rebel states, making war about ending slavery."},
    ],
  },

  {
    id: "lesson-39",
    title: "Gettysburg & Vicksburg",
    description: "Turning Point (1863)",
    heroImage: "/images/hero-gettysburg.jpg",
    story: {
      narrator: "Sarah, age 15, from Gettysburg, 1863",
      chapters: [
        {title: "Three Days of Hell", content: `I'm Sarah from Gettysburg, Pennsylvania. July 1-3, 1863, our town became battlefield. 160,000 soldiers fighting. Lee invaded North hoping for decisive victory to force peace. Union forces under Meade held high ground. Pickett's Charge—15,000 Confederates crossed open field into Union fire. Slaughter. Lee's army shattered, retreats. 51,000 killed, wounded, or missing in three days. Our town destroyed but Confederacy broken.`},
        {title: "Vicksburg Falls", content: `Same day Lee retreats, July 4, Vicksburg falls to Grant after long siege. Union controls Mississippi River. Confederacy split in half. Lincoln: "The Father of Waters again goes unvexed to the sea." These twin victories—Gettysburg and Vicksburg—mark war's turning point. Confederacy can't win now. Just matter of when they surrender. But war will grind on two more years.`},
      ],
    },
    flashcards: [
      {id: "fc39-1", term: "Battle of Gettysburg", definition: "July 1863 battle in Pennsylvania, turning point with 51,000 casualties."},
      {id: "fc39-2", term: "Pickett's Charge", definition: "Failed Confederate assault at Gettysburg resulting in massive casualties."},
      {id: "fc39-3", term: "Gettysburg Address", definition: "Lincoln's brief, powerful speech at battlefield dedication."},
      {id: "fc39-4", term: "Siege of Vicksburg", definition: "Grant's campaign capturing key Mississippi River fortress."},
      {id: "fc39-5", term: "Ulysses S. Grant", definition: "Union general who captured Vicksburg and later commanded all Union armies."},
      {id: "fc39-6", term: "George Meade", definition: "Union general who defeated Lee at Gettysburg."},
      {id: "fc39-7", term: "High Water Mark", definition: "Farthest point of Confederate advance at Gettysburg."},
      {id: "fc39-8", term: "Mississippi River", definition: "Key waterway Union controlled after capturing Vicksburg."},
    ],
    quiz: [
      {id: "q39-1", question: "What was Gettysburg?", options: ["Southern city", "July 1863 Pennsylvania battle, war's turning point with 51,000 casualties", "Peace conference", "Treaty"], correctOptionIndex: 1, explanation: "Three-day July 1863 battle in Pennsylvania was war's turning point, ending Lee's invasion of North."},
      {id: "q39-2", question: "What was significance of Vicksburg?", options: ["No importance", "Gave Union control of Mississippi River, splitting Confederacy", "Confederate victory", "Started the war"], correctOptionIndex: 1, explanation: "Vicksburg's fall gave Union complete control of Mississippi River, splitting Confederacy in half."},
      {id: "q39-3", question: "Why were these battles turning points?", options: ["They weren't", "Ended Confederate hopes of winning war—only question was when they'd surrender", "South won", "Started peace talks"], correctOptionIndex: 1, explanation: "Twin victories at Gettysburg and Vicksburg ended Confederate ability to win, though war continued two more years."},
    ],
  },

  {
    id: "lesson-40",
    title: "Appomattox & Lincoln's Assassination",
    description: "War's End (1865)",
    heroImage: "/images/hero-appomattox.jpg",
    story: {
      narrator: "Daniel, age 16, Union soldier, 1865",
      chapters: [
        {title: "Surrender at Appomattox", content: `I'm Daniel, Union soldier. April 9, 1865, Lee surrenders to Grant at Appomattox Court House. Four years, 620,000 dead, nation devastated. Grant's terms generous—Confederate soldiers can keep horses for spring planting, officers keep sidearms, no trials for treason. As they stack weapons, we don't cheer. Grant forbids it: "The war is over, the rebels are our countrymen again." Trying to heal nation.`},
        {title: "Lincoln Assassinated", content: `Five days later, April 14, President Lincoln shot at Ford's Theatre by John Wilkes Booth, Confederate sympathizer. Lincoln dies next morning. Nation mourns. The man who preserved the Union, freed the slaves, sought reconciliation—killed just as peace arrives. Vice President Andrew Johnson becomes president. He lacks Lincoln's vision. Reconstruction will be much harder without Lincoln's leadership and compassion.`},
      ],
    },
    flashcards: [
      {id: "fc40-1", term: "Appomattox Court House", definition: "Site where Lee surrendered to Grant, ending Civil War (April 9, 1865)."},
      {id: "fc40-2", term: "Ulysses S. Grant", definition: "Union general who accepted Lee's surrender."},
      {id: "fc40-3", term: "Robert E. Lee", definition: "Confederate general who surrendered at Appomattox."},
      {id: "fc40-4", term: "Generous Terms", definition: "Grant's lenient surrender terms allowing Confederates to keep horses/sidearms."},
      {id: "fc40-5", term: "Lincoln's Assassination", definition: "President Lincoln shot by John Wilkes Booth April 14, 1865."},
      {id: "fc40-6", term: "John Wilkes Booth", definition: "Confederate sympathizer who assassinated Lincoln."},
      {id: "fc40-7", term: "Andrew Johnson", definition: "Vice President who became president after Lincoln's death."},
      {id: "fc40-8", term: "620,000 Dead", definition: "Total American deaths in Civil War, more than all other U.S. wars combined until Vietnam."},
    ],
    quiz: [
      {id: "q40-1", question: "What happened at Appomattox?", options: ["War started", "Lee surrendered to Grant, ending Civil War", "Major battle", "Peace conference failed"], correctOptionIndex: 1, explanation: "April 9, 1865, Lee surrendered to Grant at Appomattox Court House, ending Civil War."},
      {id: "q40-2", question: "What were Grant's surrender terms?", options: ["Harsh punishments", "Generous—Confederates could keep horses/sidearms, no treason trials", "Everyone executed", "No terms"], correctOptionIndex: 1, explanation: "Grant offered generous terms: soldiers keep horses, officers keep sidearms, no trials for treason."},
      {id: "q40-3", question: "What happened to Lincoln?", options: ["Retired happily", "Assassinated by John Wilkes Booth five days after war ended", "Became king", "Lost election"], correctOptionIndex: 1, explanation: "Lincoln was shot by Confederate sympathizer John Wilkes Booth on April 14, 1865, dying the next morning."},
    ],
  },

  // UNIT 7: RECONSTRUCTION (Lessons 41-43)

  {
    id: "lesson-41",
    title: "Reconstruction Begins",
    description: "Rebuilding the South (1865-1867)",
    heroImage: "/images/hero-reconstruction.jpg",
    story: {
      narrator: "Marcus, age 15, freed slave in Georgia, 1865",
      chapters: [
        {title: "Freedom at Last", content: `I'm Marcus, fifteen, born enslaved in Georgia. The war's over. We're free! Thirteenth Amendment abolished slavery. But what does freedom mean? No land, no money, no education. Where do we go? What do we do? Freedmen's Bureau helps with food, schools, labor contracts. But most former slaves stay on plantations working for former masters. Freedom without resources isn't much freedom.`},
        {title: "Presidential Reconstruction", content: `President Johnson's Reconstruction lenient to South. Former Confederates return to power. They pass Black Codes restricting our freedom—can't vote, own guns, testify against whites. Sharecropping replaces slavery—we work land for share of crop but end up in debt. Almost like slavery again. Republicans in Congress furious. They'll take control of Reconstruction away from Johnson. Radical Reconstruction coming.`},
      ],
    },
    flashcards: [
      {id: "fc41-1", term: "Reconstruction", definition: "Period (1865-1877) of rebuilding South and integrating freed slaves into society."},
      {id: "fc41-2", term: "Thirteenth Amendment", definition: "1865 amendment abolishing slavery throughout the United States."},
      {id: "fc41-3", term: "Freedmen's Bureau", definition: "Federal agency helping freed slaves with food, education, and labor contracts."},
      {id: "fc41-4", term: "Black Codes", definition: "Southern laws restricting freed slaves' rights and movement."},
      {id: "fc41-5", term: "Sharecropping", definition: "System where freed slaves worked land for share of crop, often resulting in debt."},
      {id: "fc41-6", term: "Andrew Johnson", definition: "President whose lenient Reconstruction policies angered Republicans."},
      {id: "fc41-7", term: "Radical Republicans", definition: "Congressional group wanting harsh treatment of South and protection for freed slaves."},
      {id: "fc41-8", term: "Presidential Reconstruction", definition: "Johnson's lenient plan allowing quick Southern readmission with few protections for freed slaves."},
    ],
    quiz: [
      {id: "q41-1", question: "What was Reconstruction?", options: ["Rebuilding houses", "Period of rebuilding South and integrating freed slaves 1865-1877", "A war", "Economic boom"], correctOptionIndex: 1, explanation: "Reconstruction was the period after Civil War focused on rebuilding South and integrating freed slaves into society."},
      {id: "q41-2", question: "What were Black Codes?", options: ["Helpful laws", "Southern laws restricting freed slaves' rights and movement", "Federal protections", "Education programs"], correctOptionIndex: 1, explanation: "Black Codes were Southern laws restricting freed slaves' rights, movement, and opportunities."},
      {id: "q41-3", question: "What was sharecropping?", options: ["Generous gift program", "System where freed slaves worked land for crop share, often resulting in debt", "Fair wage system", "Land ownership"], correctOptionIndex: 1, explanation: "Sharecropping had freed slaves work land for share of crop but usually resulted in debt, resembling slavery."},
    ],
  },

  {
    id: "lesson-42",
    title: "Radical Reconstruction",
    description: "Congressional Control (1867-1870)",
    heroImage: "/images/hero-radical-reconstruction.jpg",
    story: {
      narrator: "Eliza, age 16, freed slave in South Carolina, 1868",
      chapters: [
        {title: "Congress Takes Over", content: `I'm Eliza, sixteen, freed slave in South Carolina. Congress passed Reconstruction Acts over Johnson's veto. Military governors control South until states write new constitutions guaranteeing Black male suffrage. Fourteenth Amendment makes us citizens with equal protection. Fifteenth Amendment protects voting rights. Black men voting! Serving in legislatures! This is real change.`},
        {title: "Backlash and Violence", content: `But white Southerners resist violently. Ku Klux Klan terrorizes Black voters and white Republicans. Murders, beatings, burnings. They want to restore white supremacy, undo Reconstruction. Federal troops protect us somewhat. We're building schools, churches, communities. Black politicians like Hiram Revels serve in Congress. But violence threatens everything we've gained. How long will Northern support last?`},
      ],
    },
    flashcards: [
      {id: "fc42-1", term: "Radical Reconstruction", definition: "Congressional plan (1867-1877) imposing harsh terms on South and protecting Black rights."},
      {id: "fc42-2", term: "Fourteenth Amendment", definition: "1868 amendment granting citizenship and equal protection to freed slaves."},
      {id: "fc42-3", term: "Fifteenth Amendment", definition: "1870 amendment protecting voting rights regardless of race."},
      {id: "fc42-4", term: "Reconstruction Acts", definition: "Laws placing South under military control until new constitutions guaranteeing Black voting rights."},
      {id: "fc42-5", term: "Ku Klux Klan", definition: "Terrorist organization using violence to restore white supremacy and intimidate Black voters."},
      {id: "fc42-6", term: "Hiram Revels", definition: "First Black U.S. Senator, representing Mississippi during Reconstruction."},
      {id: "fc42-7", term: "Carpetbaggers", definition: "Northern Republicans who moved South during Reconstruction."},
      {id: "fc42-8", term: "Scalawags", definition: "Southern whites who supported Reconstruction."},
    ],
    quiz: [
      {id: "q42-1", question: "What was Radical Reconstruction?", options: ["Lenient Southern policy", "Congressional plan with harsh Southern terms and Black rights protection", "No policy", "Confederate victory"], correctOptionIndex: 1, explanation: "Radical Reconstruction was Congress's plan imposing military control and protecting Black rights."},
      {id: "q42-2", question: "What did Fourteenth Amendment do?", options: ["Nothing", "Granted citizenship and equal protection to freed slaves", "Banned voting", "Started Civil War"], correctOptionIndex: 1, explanation: "Fourteenth Amendment made freed slaves citizens with equal protection under law."},
      {id: "q42-3", question: "What was the Ku Klux Klan?", options: ["Political party", "Terrorist organization using violence to restore white supremacy", "Education group", "Government agency"], correctOptionIndex: 1, explanation: "KKK was terrorist organization using murder, beatings, and intimidation to restore white supremacy and undo Reconstruction."},
    ],
  },

  {
    id: "lesson-43",
    title: "The End of Reconstruction",
    description: "Compromise of 1877",
    heroImage: "/images/hero-end-reconstruction.jpg",
    story: {
      narrator: "Samuel, age 17, Black voter in Mississippi, 1877",
      chapters: [
        {title: "Northern Commitment Fades", content: `I'm Samuel, seventeen, Black voter in Mississippi. Northern support for Reconstruction fading. Economic depression, political corruption scandals, war weariness. Northerners losing interest in protecting Southern Blacks. White Southerners systematically disenfranchising us through violence, intimidation, poll taxes, literacy tests. Federal troops no longer protect us. We're being abandoned.`},
        {title: "The Compromise", content: `1876 election disputed. Democrat Tilden vs Republican Hayes. Compromise of 1877: Hayes becomes president, federal troops withdraw from South. Reconstruction ends. Democrats "redeem" South, restore white rule. Jim Crow era begins—segregation, disenfranchisement, violence. Everything we fought for during Reconstruction—gone. Will take another century to achieve civil rights. Reconstruction failed us.`},
      ],
    },
    flashcards: [
      {id: "fc43-1", term: "Compromise of 1877", definition: "Agreement ending Reconstruction by withdrawing federal troops from South."},
      {id: "fc43-2", term: "End of Reconstruction", definition: "1877 withdrawal of federal troops, ending protections for Southern Blacks."},
      {id: "fc43-3", term: "Redemption", definition: "White Southerners' term for restoring Democratic control and white supremacy."},
      {id: "fc43-4", term: "Jim Crow", definition: "System of racial segregation and discrimination in the South (1877-1960s)."},
      {id: "fc43-5", term: "Disenfranchisement", definition: "Systematic denial of voting rights through violence, intimidation, and legal restrictions."},
      {id: "fc43-6", term: "Poll Tax", definition: "Fee required to vote, used to prevent poor Blacks from voting."},
      {id: "fc43-7", term: "Literacy Test", definition: "Reading requirement used to prevent Blacks from voting."},
      {id: "fc43-8", term: "Rutherford B. Hayes", definition: "President whose election led to end of Reconstruction."},
    ],
    quiz: [
      {id: "q43-1", question: "What was Compromise of 1877?", options: ["Started Reconstruction", "Ended Reconstruction by withdrawing federal troops from South", "Freed slaves", "Won Civil War"], correctOptionIndex: 1, explanation: "Compromise of 1877 ended Reconstruction by withdrawing federal troops, abandoning Southern Blacks."},
      {id: "q43-2", question: "What was Jim Crow?", options: ["A person", "System of racial segregation and discrimination in South", "Economic policy", "Military strategy"], correctOptionIndex: 1, explanation: "Jim Crow was system of racial segregation and discrimination that followed Reconstruction's end."},
      {id: "q43-3", question: "Why did Reconstruction end?", options: ["It succeeded", "Northern commitment faded due to depression, scandals, war weariness", "South reformed", "Blacks gained full equality"], correctOptionIndex: 1, explanation: "Northern support faded due to economic depression, political scandals, and war weariness, abandoning Southern Blacks."},
    ],
  },

  // UNIT 8: GILDED AGE (Lessons 44-47)

  {
    id: "lesson-44",
    title: "The Gilded Age",
    description: "Industry and Inequality (1870-1900)",
    heroImage: "/images/hero-gilded-age.jpg",
    story: {
      narrator: "Anna, age 15, factory worker in New York, 1890",
      chapters: [
        {title: "Industrial Revolution", content: `I'm Anna, fifteen, working in New York garment factory. America's industrializing rapidly. Railroads connect the nation. Factories mass-produce goods. Inventions like telephone, electric light transform life. Rockefeller controls oil. Carnegie controls steel. Morgan controls finance. Corporations grow enormous. But workers like me labor 12-hour days in dangerous conditions for low pay. Children work in mines and factories. No regulations, no safety, no unions allowed. Gilded Age: golden surface hiding poverty and exploitation.`},
        {title: "Robber Barons or Captains of Industry?", content: `Are industrial tycoons robber barons stealing wealth or captains of industry building America? They create jobs, make goods cheaper, build infrastructure. But they crush competitors, bribe politicians, exploit workers. Carnegie preaches "Gospel of Wealth"—rich should give back. He builds libraries. But he also breaks strikes with violence. Progress and exploitation intertwined. America becoming wealthy and powerful—but benefits don't reach us workers.`},
      ],
    },
    flashcards: [
      {id: "fc44-1", term: "Gilded Age", definition: "Period (1870-1900) of rapid industrialization, wealth inequality, and political corruption."},
      {id: "fc44-2", term: "Robber Barons", definition: "Wealthy industrialists accused of building fortunes through exploitation and corruption."},
      {id: "fc44-3", term: "Andrew Carnegie", definition: "Steel magnate who preached 'Gospel of Wealth.'"},
      {id: "fc44-4", term: "John D. Rockefeller", definition: "Oil industry monopolist who controlled Standard Oil."},
      {id: "fc44-5", term: "J.P. Morgan", definition: "Powerful banker who financed major corporations."},
      {id: "fc44-6", term: "Monopoly", definition: "When one company controls entire industry, eliminating competition."},
      {id: "fc44-7", term: "Gospel of Wealth", definition: "Carnegie's idea that rich should use wealth for public good."},
      {id: "fc44-8", term: "Child Labor", definition: "Children working in factories, mines, and farms instead of attending school."},
    ],
    quiz: [
      {id: "q44-1", question: "What was the Gilded Age?", options: ["Age of gold discovery", "Period of rapid industrialization with golden surface hiding poverty", "Colonial period", "Medieval times"], correctOptionIndex: 1, explanation: "Gilded Age (1870-1900) saw rapid industrialization and wealth, but 'gilded' means gold-covered surface hiding problems underneath."},
      {id: "q44-2", question: "Who were robber barons?", options: ["Medieval knights", "Wealthy industrialists who built fortunes through exploitation", "Government officials", "Foreign invaders"], correctOptionIndex: 1, explanation: "Robber barons were industrial tycoons like Rockefeller and Carnegie accused of exploiting workers and corrupting politics."},
      {id: "q44-3", question: "What was Gospel of Wealth?", options: ["Religious text", "Carnegie's idea that rich should use wealth for public good", "Economic policy", "Political party"], correctOptionIndex: 1, explanation: "Carnegie's philosophy that wealthy have responsibility to use fortunes to benefit society."},
    ],
  },

  {
    id: "lesson-45",
    title: "Immigration and Urbanization",
    description: "The New Colossus (1880-1920)",
    heroImage: "/images/hero-immigration.jpg",
    story: {
      narrator: "Giuseppe, age 14, Italian immigrant, 1892",
      chapters: [
        {title: "Ellis Island", content: `I'm Giuseppe, fourteen, from Italy. We just arrived at Ellis Island. Steamship brought us across Atlantic—three weeks in crowded steerage. Now inspectors examine us for disease, ask questions. Will they let us in? Lady Liberty's torch visible from island. "Give me your tired, your poor, your huddled masses," Emma Lazarus wrote. We're those huddled masses seeking opportunity. America promises freedom and work. We'll see if it delivers.`},
        {title: "Life in the Tenements", content: `We live in Lower Manhattan tenement—crowded, dark, no plumbing. Whole family shares two rooms with another family. I work in factory; Father in construction; Mother does piecework at home. Long hours, low pay. But it's better than Italy. We're saving money, learning English, building new life. America's a hard place for immigrants—discrimination, exploitation, dangerous work. But it's also land of opportunity. Our children will have chances we never had.`},
      ],
    },
    flashcards: [
      {id: "fc45-1", term: "Ellis Island", definition: "Immigration station in New York Harbor where millions entered America."},
      {id: "fc45-2", term: "New Immigration", definition: "Late 1800s wave of immigrants from Southern and Eastern Europe."},
      {id: "fc45-3", term: "Tenement", definition: "Crowded, often unsafe urban apartment building housing poor immigrants."},
      {id: "fc45-4", term: "Urbanization", definition: "Growth of cities as people moved from farms to urban areas."},
      {id: "fc45-5", term: "Statue of Liberty", definition: "Symbol of American welcome to immigrants, gifted by France."},
      {id: "fc45-6", term: "Steerage", definition: "Cheapest, most crowded section of ship used by poor immigrants."},
      {id: "fc45-7", term: "Nativism", definition: "Hostility toward immigrants by native-born Americans."},
      {id: "fc45-8", term: "Melting Pot", definition: "Idea that different cultures blend together in America."},
    ],
    quiz: [
      {id: "q45-1", question: "What was Ellis Island?", options: ["Resort island", "Immigration station where millions entered America", "Prison", "Military base"], correctOptionIndex: 1, explanation: "Ellis Island was immigration station in New York Harbor where millions of immigrants were processed entering America."},
      {id: "q45-2", question: "What were tenements?", options: ["Luxury apartments", "Crowded, often unsafe buildings housing poor immigrants", "Government housing", "Hotels"], correctOptionIndex: 1, explanation: "Tenements were crowded, often unsafe apartment buildings where poor immigrants lived in cramped, unhealthy conditions."},
      {id: "q45-3", question: "What was nativism?", options: ["Welcoming immigrants", "Hostility toward immigrants by native-born Americans", "Immigration policy", "Cultural program"], correctOptionIndex: 1, explanation: "Nativism was hostility and discrimination against immigrants by native-born Americans who feared job competition and cultural change."},
    ],
  },

  {
    id: "lesson-46",
    title: "Labor Movement",
    description: "Workers Unite (1877-1914)",
    heroImage: "/images/hero-labor.jpg",
    story: {
      narrator: "Michael, age 17, factory worker, 1886",
      chapters: [
        {title: "The Haymarket Affair", content: `I'm Michael, seventeen, Chicago factory worker. We're striking for 8-hour workday—we work 12-14 hours now. May 4, 1886, rally at Haymarket Square. Peaceful until someone throws bomb, killing police. Police fire into crowd. Eight anarchists arrested though no evidence they threw bomb. All convicted; four hanged. Labor movement takes huge setback. Employers call all unions dangerous anarchists. But we won't stop fighting for fair treatment.`},
        {title: "Unions Grow", content: `American Federation of Labor (AFL) under Samuel Gompers takes moderate approach—skilled workers only, focus on wages/hours, avoid radical politics. More successful than violent strikes. But excludes unskilled workers, women, minorities. Industrial Workers of the World (IWW) organizes everyone. Triangle Shirtwaist Fire (1911) kills 146 workers—doors locked, no fire escapes. Public outraged. Slowly, labor gaining rights through struggle and sacrifice.`},
      ],
    },
    flashcards: [
      {id: "fc46-1", term: "Haymarket Affair", definition: "1886 Chicago labor rally ending in bombing and violent repression of labor movement."},
      {id: "fc46-2", term: "American Federation of Labor", definition: "Moderate union organizing skilled workers, led by Samuel Gompers."},
      {id: "fc46-3", term: "Samuel Gompers", definition: "AFL leader who pursued moderate labor tactics."},
      {id: "fc46-4", term: "Strike", definition: "Workers refusing to work to pressure employers for better conditions."},
      {id: "fc46-5", term: "Eight-Hour Day", definition: "Labor movement goal to limit workday to eight hours."},
      {id: "fc46-6", term: "Triangle Shirtwaist Fire", definition: "1911 fire killing 146 workers, spurring labor reforms."},
      {id: "fc46-7", term: "Industrial Workers of the World", definition: "Radical union organizing all workers regardless of skill, race, or gender."},
      {id: "fc46-8", term: "Collective Bargaining", definition: "Negotiations between unions and employers over wages and conditions."},
    ],
    quiz: [
      {id: "q46-1", question: "What was Haymarket Affair?", options: ["Market opening", "1886 labor rally ending in bombing and repression", "Peace conference", "Trade agreement"], correctOptionIndex: 1, explanation: "1886 Chicago labor rally for 8-hour day ended with bomb killing police, leading to execution of labor leaders and setback for movement."},
      {id: "q46-2", question: "What was AFL?", options: ["Football league", "Moderate union organizing skilled workers", "Government agency", "Corporation"], correctOptionIndex: 1, explanation: "American Federation of Labor was moderate union focusing on skilled workers' wages and hours."},
      {id: "q46-3", question: "What was Triangle Shirtwaist Fire?", options: ["Arson attack", "1911 factory fire killing 146 workers, spurring labor reforms", "Controlled burn", "False alarm"], correctOptionIndex: 1, explanation: "1911 fire at garment factory killed 146 workers due to locked doors and no fire escapes, spurring labor reform."},
    ],
  },

  {
    id: "lesson-47",
    title: "The Populist Movement",
    description: "Farmers Organize (1890s)",
    heroImage: "/images/hero-populism.jpg",
    story: {
      narrator: "Emma, age 16, Kansas farm daughter, 1896",
      chapters: [
        {title: "Farmers' Struggles", content: `I'm Emma, sixteen, from Kansas farm. We're drowning in debt. Railroad monopolies charge high rates to ship our crops. Banks charge high interest. Farm prices keep falling. We work harder each year and get poorer. Farmers organizing—Farmers' Alliance, then People's Party (Populists). We demand government regulate railroads, graduated income tax, direct election of senators, unlimited silver coinage to increase money supply.`},
        {title: "Cross of Gold", content: `William Jennings Bryan runs for president on free silver platform. His "Cross of Gold" speech electrifies us: "You shall not crucify mankind upon a cross of gold!" We're the producing class being exploited by bankers and corporations. But Bryan loses to McKinley. Populist Party fades. Some reforms will come later—income tax, direct election of senators. But for now, corporate power wins. Working people lose.`},
      ],
    },
    flashcards: [
      {id: "fc47-1", term: "Populist Party", definition: "People's Party formed by farmers demanding economic reforms."},
      {id: "fc47-2", term: "William Jennings Bryan", definition: "Populist Democrat famous for 'Cross of Gold' speech."},
      {id: "fc47-3", term: "Cross of Gold Speech", definition: "Bryan's 1896 speech supporting free silver coinage."},
      {id: "fc47-4", term: "Free Silver", definition: "Populist demand to coin unlimited silver, increasing money supply."},
      {id: "fc47-5", term: "Farmers' Alliance", definition: "Organization of farmers fighting railroad and bank monopolies."},
      {id: "fc47-6", term: "Graduated Income Tax", definition: "Tax system where wealthy pay higher percentage—Populist demand."},
      {id: "fc47-7", term: "Direct Election of Senators", definition: "Populist demand (achieved 1913) that voters elect senators directly."},
      {id: "fc47-8", term: "Railroad Monopolies", definition: "Railroad companies that controlled shipping rates, exploiting farmers."},
    ],
    quiz: [
      {id: "q47-1", question: "Who were Populists?", options: ["City factory owners", "Farmers organizing against railroad/bank monopolies", "Foreign immigrants", "Government officials"], correctOptionIndex: 1, explanation: "Populists were farmers organizing through People's Party to fight railroad and bank exploitation."},
      {id: "q47-2", question: "What did Populists demand?", options: ["Lower farm prices", "Regulate railroads, income tax, direct senator election, free silver", "No government", "Return to monarchy"], correctOptionIndex: 1, explanation: "Populists demanded government regulation of railroads, graduated income tax, direct election of senators, and free silver coinage."},
      {id: "q47-3", question: "What was 'Cross of Gold'?", options: ["Jewelry", "Bryan's famous speech supporting free silver", "A building", "A book"], correctOptionIndex: 1, explanation: "Bryan's famous 1896 speech supporting free silver coinage to help farmers and working people."},
    ],
  },

  // UNIT 9: PROGRESSIVE ERA (Lessons 48-49)

  {
    id: "lesson-48",
    title: "The Progressive Era",
    description: "Reform Movements (1900-1920)",
    heroImage: "/images/hero-progressive.jpg",
    story: {
      narrator: "Catherine, age 15, settlement house worker, 1910",
      chapters: [
        {title: "Muckrakers and Reformers", content: `I'm Catherine, fifteen, volunteering at Hull House settlement house in Chicago. Progressive Era—reformers fighting corruption, poverty, inequality. Muckraking journalists expose problems: Upton Sinclair's "The Jungle" reveals meatpacking horrors; Jacob Riis photographs tenement poverty; Ida Tarbell exposes Standard Oil corruption. Reform movements everywhere: child labor laws, food safety, women's suffrage, direct democracy, trust-busting, conservation.`},
        {title: "Progressive Presidents", content: `Teddy Roosevelt "trust-busts" monopolies, protects consumers, conserves natural resources. Taft continues but more cautiously. Wilson passes Federal Reserve, antitrust laws, reduces tariffs. Seventeenth Amendment gives direct senator election. Eighteenth Amendment prohibits alcohol. Nineteenth Amendment grants women's suffrage! Progressive Era makes government more responsive, regulates business, protects workers/consumers. But also sees more segregation, imperialism. Mixed legacy.`},
      ],
    },
    flashcards: [
      {id: "fc48-1", term: "Progressive Era", definition: "Period (1900-1920) of political and social reform movements."},
      {id: "fc48-2", term: "Muckrakers", definition: "Journalists exposing corruption and social problems."},
      {id: "fc48-3", term: "Upton Sinclair", definition: "Author of 'The Jungle' exposing meatpacking industry horrors."},
      {id: "fc48-4", term: "Theodore Roosevelt", definition: "Progressive president who 'trust-busted' monopolies and conserved nature."},
      {id: "fc48-5", term: "Hull House", definition: "Settlement house founded by Jane Addams to help immigrants and poor."},
      {id: "fc48-6", term: "Seventeenth Amendment", definition: "1913 amendment providing direct election of senators."},
      {id: "fc48-7", term: "Nineteenth Amendment", definition: "1920 amendment granting women's suffrage."},
      {id: "fc48-8", term: "Trust-Busting", definition: "Breaking up monopolies to restore competition."},
    ],
    quiz: [
      {id: "q48-1", question: "What was Progressive Era?", options: ["Period of no change", "Period of political/social reform movements 1900-1920", "Colonial period", "Medieval times"], correctOptionIndex: 1, explanation: "Progressive Era saw reforms attacking corruption, regulating business, protecting consumers/workers, expanding democracy."},
      {id: "q48-2", question: "Who were muckrakers?", options: ["Farmers", "Journalists exposing corruption and social problems", "Politicians", "Factory owners"], correctOptionIndex: 1, explanation: "Muckrakers were investigative journalists exposing corruption, unsafe conditions, and social problems."},
      {id: "q48-3", question: "What was Nineteenth Amendment?", options: ["Banned alcohol", "Granted women's suffrage", "Direct senator election", "Income tax"], correctOptionIndex: 1, explanation: "Nineteenth Amendment (1920) granted women the right to vote after decades of struggle."},
    ],
  },

  {
    id: "lesson-49",
    title: "Women's Suffrage",
    description: "Winning the Vote (1848-1920)",
    heroImage: "/images/hero-suffrage.jpg",
    story: {
      narrator: "Alice, age 16, suffragist, 1920",
      chapters: [
        {title: "The Long Fight", content: `I'm Alice, sixteen, celebrating! After 72 years since Seneca Falls, women won the vote! Nineteenth Amendment ratified. Generations of women fought for this: Elizabeth Cady Stanton, Susan B. Anthony, Carrie Chapman Catt, Alice Paul. They endured ridicule, arrest, force-feeding in prison. Used different tactics: some lobbied legislators, others picketed White House, went on hunger strikes. Both approaches necessary. Today we voted for first time!`},
        {title: "Unfinished Business", content: `Victory sweet but incomplete. Many Black women in South still can't vote due to Jim Crow restrictions. Native Americans not citizens yet. Poor women face poll taxes. Suffrage was crucial fight but not the end. We need equal pay, property rights, educational opportunities, reproductive rights. The vote is a tool for achieving equality, not equality itself. We'll keep fighting. Our daughters will finish what we started.`},
      ],
    },
    flashcards: [
      {id: "fc49-1", term: "Women's Suffrage", definition: "The right of women to vote, achieved nationally in 1920."},
      {id: "fc49-2", term: "Nineteenth Amendment", definition: "1920 amendment granting women the right to vote."},
      {id: "fc49-3", term: "Susan B. Anthony", definition: "Leading suffragist who fought for decades for women's voting rights."},
      {id: "fc49-4", term: "Elizabeth Cady Stanton", definition: "Suffragist leader from Seneca Falls through late 1800s."},
      {id: "fc49-5", term: "Alice Paul", definition: "Militant suffragist who picketed White House and led hunger strikes."},
      {id: "fc49-6", term: "Carrie Chapman Catt", definition: "Suffragist leader whose state-by-state strategy helped win amendment."},
      {id: "fc49-7", term: "National American Woman Suffrage Association", definition: "Major organization fighting for women's voting rights."},
      {id: "fc49-8", term: "Silent Sentinels", definition: "Suffragists who picketed White House, facing arrest and force-feeding."},
    ],
    quiz: [
      {id: "q49-1", question: "When did women win national suffrage?", options: ["1776", "1920 with Nineteenth Amendment", "1865", "2000"], correctOptionIndex: 1, explanation: "Women won national voting rights in 1920 when Nineteenth Amendment was ratified, 72 years after Seneca Falls."},
      {id: "q49-2", question: "Who were key suffrage leaders?", options: ["Only men", "Stanton, Anthony, Catt, Paul among many women", "Foreign queens", "No leaders"], correctOptionIndex: 1, explanation: "Key leaders included Elizabeth Cady Stanton, Susan B. Anthony, Carrie Chapman Catt, and Alice Paul among many others."},
      {id: "q49-3", question: "Was victory complete?", options: ["Yes, fully equal", "No—many Black women, Native Americans, poor women still couldn't vote", "Women lost the vote", "Only in North"], correctOptionIndex: 1, explanation: "Victory incomplete: Jim Crow kept many Black women from voting, Native Americans weren't citizens, poll taxes blocked poor women."},
    ],
  },

  // UNIT 10: WORLD WAR I (Lesson 50)

  {
    id: "lesson-50",
    title: "World War I",
    description: "The Great War (1914-1918)",
    heroImage: "/images/hero-wwi.jpg",
    story: {
      narrator: "James, age 18, American soldier in France, 1918",
      chapters: [
        {title: "America Enters the War", content: `I'm James, eighteen, American soldier in France. War's been raging since 1914. European powers locked in brutal trench warfare. Wilson kept us neutral—"too proud to fight." But German submarine warfare, Zimmermann Telegram (Germany asking Mexico to attack U.S.), pulled us in. April 1917, we declared war. "War to end all wars," Wilson says. "Make world safe for democracy." I'm less idealistic seeing trenches, poison gas, machine guns. Modern warfare is hell.`},
        {title: "War's End and Wilson's Dream", content: `American troops tip balance. Germany surrenders November 11, 1918. Nine million dead. Wilson proposes Fourteen Points—self-determination for nations, freedom of seas, League of Nations to prevent future wars. But Versailles Treaty harsh on Germany. Senate rejects League of Nations—won't surrender sovereignty. Wilson's dream dies. War didn't end all wars—harsh peace terms plant seeds for World War II. But for now, we're coming home. Changed men returning to changed nation.`},
      ],
    },
    flashcards: [
      {id: "fc50-1", term: "World War I", definition: "Global conflict (1914-1918) between Allied and Central Powers."},
      {id: "fc50-2", term: "Trench Warfare", definition: "Brutal WWI combat from fortified trenches, causing massive casualties."},
      {id: "fc50-3", term: "Zimmermann Telegram", definition: "German message to Mexico proposing alliance against U.S., helping push America into war."},
      {id: "fc50-4", term: "Woodrow Wilson", definition: "President who led America in WWI and proposed League of Nations."},
      {id: "fc50-5", term: "Fourteen Points", definition: "Wilson's peace plan including self-determination and League of Nations."},
      {id: "fc50-6", term: "League of Nations", definition: "International organization Wilson proposed to prevent future wars—U.S. Senate rejected it."},
      {id: "fc50-7", term: "Treaty of Versailles", definition: "1919 peace treaty ending WWI, harsh on Germany."},
      {id: "fc50-8", term: "Armistice Day", definition: "November 11, 1918—day WWI fighting ended."},
    ],
    quiz: [
      {id: "q50-1", question: "Why did America enter WWI?", options: ["For fun", "German submarine warfare and Zimmermann Telegram", "Britain forced us", "No reason"], correctOptionIndex: 1, explanation: "America entered WWI due to unrestricted German submarine warfare and Zimmermann Telegram proposing German-Mexican alliance against U.S."},
      {id: "q50-2", question: "What were Wilson's Fourteen Points?", options: ["Math problems", "Peace plan including self-determination and League of Nations", "Battle strategies", "Economic policies"], correctOptionIndex: 1, explanation: "Fourteen Points were Wilson's idealistic peace plan including national self-determination, open diplomacy, and League of Nations."},
      {id: "q50-3", question: "Did U.S. join League of Nations?", options: ["Yes", "No—Senate rejected it, fearing loss of sovereignty", "Partially", "League never formed"], correctOptionIndex: 1, explanation: "Despite Wilson creating the League of Nations concept, U.S. Senate rejected membership, fearing it would compromise American sovereignty."},
    ],
  },
];
