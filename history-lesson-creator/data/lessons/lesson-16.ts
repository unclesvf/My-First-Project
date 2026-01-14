import { Lesson } from "@/lib/types";

const lesson: Lesson = {
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

We've been defeated at Brandywine and Germantown. The British sit warm in Philadelphia while we're headed to a frozen hillside with inadequate food, clothing, and shelter. Congress hasn't sent supplies or paid us. Some men are deserting. Others are too sick to walk. I wonder if we'll survive this winter, let alone win this war.`
        },
        {
          title: "Trials of Valley Forge",
          content: `Valley Forge is hell on earth. We build crude log huts, twelve men crammed in each. The cold seeps through every crack. We have little food—sometimes just "firecake" (flour and water baked on stones) and watery soup. Men are dying of typhus, dysentery, and pneumonia. Of 12,000 men, 2,500 will die here.

I'm hungry all the time. My feet are wrapped in rags. I share a thin blanket with two others. At night, I hear men coughing, praying, weeping. Some give up and go home. Others steal from nearby farms. Washington struggles to hold the army together.

But we don't give up. We're fighting for something greater than ourselves—for liberty, for our families, for the idea that we can govern ourselves. Washington shares our suffering, refusing to stay in a warm house while his men freeze. His example keeps us going.`
        },
        {
          title: "Baron von Steuben",
          content: `In February, Baron von Steuben arrives—a Prussian military officer who volunteers to train us. He doesn't speak English well, but he teaches us to march in formation, load muskets quickly, use bayonets effectively. He makes us into real soldiers.

Before von Steuben, we were farmers with guns. Now we drill every day, learning professional military tactics. It's hard work, but it gives us pride and purpose. We're becoming an army that can stand against British regulars.

By spring, we've survived. We're hardened, trained, disciplined. News arrives of a French alliance—France will support our cause with money, ships, and soldiers. The war isn't over, but we have hope now. Valley Forge didn't break us. It made us stronger.`
        },
        {
          title: "Daily Survival",
          content: `Every day at Valley Forge is a battle for survival. We wake before dawn to the sound of drums. Those healthy enough for duty drill or stand guard. The sick—and there are always hundreds sick—lie in the huts, shivering with fever. Our surgeon does what he can with almost no medicine or equipment.

Food is our constant obsession. On good days, we get meat and bread. On bad days—and there are many bad days—we get nothing but firecake. I've learned to catch rats to supplement our rations. I'm not proud of it, but I'll eat anything to stay alive.

The worst part is watching friends die. My bunkmate Samuel died last week from pneumonia. We buried him in a shallow grave on the hillside with dozens of others. There was no time for proper funerals. His parents will never know where he's buried or that he died fighting for liberty.

Yet somehow we endure. We tell stories around fires, sing songs, write letters home. We gamble with worthless Continental currency. We complain bitterly about Congress, about officers, about the cold, the hunger, everything. Complaining keeps us human. And through it all, we see Washington—he could be in a warm house, but he visits our huts, checks on the sick, shares our hardships. If he hasn't given up on us, we can't give up on ourselves.`
        },
        {
          title: "Transformation",
          content: `When we marched into Valley Forge in December, we were a defeated, disorganized rabble. When we marched out in June, we were an army. The transformation wasn't just about von Steuben's training, though that mattered. It was about what we endured together and what we became.

We learned that we could survive anything. British regulars might have better equipment, better supplies, better training. But they've never endured what we've endured. They fight for pay and duty. We fight for our homes, our freedom, our future. That difference makes us dangerous.

Von Steuben gave us the skills, but Valley Forge gave us the spirit. We're not fighting as separate colonies anymore—we're Americans, united by shared suffering and shared purpose. Men from Massachusetts and Virginia, farmers and merchants, immigrants and native-born, we've forged a brotherhood in this frozen camp.

The spring of 1778 brings new energy. The French alliance means we're not alone against Britain anymore. Supplies finally arrive. The weather warms. We drill with precision, our formations crisp, our movements coordinated. British General Howe decides to abandon Philadelphia and retreat to New York. For the first time, they're retreating from us.

As we prepared to leave Valley Forge, Washington addressed us. He thanked us for our sacrifice and endurance. He said history would remember what we accomplished here. I looked around at my fellow soldiers—thin, scarred, hardened—and I knew he was right. We'd been tested in the crucible of Valley Forge, and we'd passed the test. We'd become an army worthy of independence. The war was far from over, but we'd proven we could win it.`
        }
      ]
    },
    flashcards: [
      {
        id: "fc16-1",
        term: "Valley Forge",
        definition: "The site where Washington's army spent the brutal winter of 1777-1778, enduring terrible conditions but emerging stronger."
      },
      {
        id: "fc16-2",
        term: "Baron von Steuben",
        definition: "Prussian military officer who trained the Continental Army at Valley Forge, teaching professional military tactics."
      },
      {
        id: "fc16-3",
        term: "Continental Army",
        definition: "The American military force led by George Washington during the Revolutionary War."
      },
      {
        id: "fc16-4",
        term: "French Alliance",
        definition: "France's decision to support America with money, military supplies, and troops after the Battle of Saratoga."
      },
      {
        id: "fc16-5",
        term: "George Washington",
        definition: "Commander of the Continental Army who held his troops together through terrible hardships at Valley Forge."
      },
      {
        id: "fc16-6",
        term: "Desertion",
        definition: "When soldiers abandon their military service. Many Continental soldiers deserted due to harsh conditions."
      },
      {
        id: "fc16-7",
        term: "Drill",
        definition: "Military training and practice in formations, tactics, and discipline."
      },
      {
        id: "fc16-8",
        term: "Bayonet",
        definition: "A blade attached to the end of a musket, used in close combat. Von Steuben trained Americans in bayonet fighting."
      },
      {
        id: "fc16-9",
        term: "Typhus",
        definition: "A deadly disease spread by lice and poor sanitation that killed many Continental soldiers at Valley Forge during the harsh winter encampment."
      },
      {
        id: "fc16-10",
        term: "Continental Currency",
        definition: "Paper money issued by Congress to pay soldiers and buy supplies, but it rapidly lost value, becoming nearly worthless and making survival difficult."
      }
    ],
    quiz: [
      {
        id: "q16-1",
        question: "Why did Washington's army go to Valley Forge?",
        options: [
          "For a vacation",
          "To set up winter camp after losing Philadelphia to the British",
          "To attack the British",
          "To celebrate victory"
        ],
        correctOptionIndex: 1,
        explanation: "After being defeated and losing Philadelphia to the British, Washington's army retreated to Valley Forge, Pennsylvania, for winter camp in December 1777."
      },
      {
        id: "q16-2",
        question: "What were conditions like at Valley Forge?",
        options: [
          "Comfortable and warm",
          "Terrible—cold, hunger, disease, inadequate shelter, causing 2,500 deaths",
          "Perfectly supplied",
          "No different from summer camp"
        ],
        correctOptionIndex: 1,
        explanation: "Valley Forge was brutal: freezing cold, little food, inadequate clothing and shelter, and disease. About 2,500 of 12,000 soldiers died there during the winter."
      },
      {
        id: "q16-3",
        question: "Who was Baron von Steuben and what did he do?",
        options: [
          "A British general who attacked Valley Forge",
          "A Prussian officer who trained the Continental Army in professional military tactics",
          "A French king",
          "An American politician"
        ],
        correctOptionIndex: 1,
        explanation: "Baron von Steuben was a Prussian military officer who volunteered to train the Continental Army. He taught them professional military tactics, drill, and discipline, transforming them into an effective fighting force."
      },
      {
        id: "q16-4",
        question: "What good news arrived by spring 1778?",
        options: [
          "The war was over",
          "France had formed an alliance and would support America",
          "Britain surrendered",
          "Congress sent unlimited supplies"
        ],
        correctOptionIndex: 1,
        explanation: "France formally allied with America, agreeing to provide money, military supplies, ships, and troops. This alliance was crucial to eventual American victory."
      },
      {
        id: "q16-5",
        question: "What was the ultimate significance of Valley Forge?",
        options: [
          "It destroyed the Continental Army",
          "Though brutal, it strengthened the army through survival, training, and renewed commitment",
          "Nothing significant happened",
          "The British won the war there"
        ],
        correctOptionIndex: 1,
        explanation: "Valley Forge, though devastating, ultimately strengthened the Continental Army. Survivors were toughened, von Steuben's training made them professional soldiers, and they proved their commitment to the cause."
      },
      {
        id: "q16-6",
        question: "How did Washington's leadership at Valley Forge inspire his troops?",
        options: [
          "He stayed in a warm house away from camp",
          "He shared his men's suffering, refusing comfort while they froze, visiting their huts and checking on the sick",
          "He abandoned the army",
          "He threatened to execute deserters"
        ],
        correctOptionIndex: 1,
        explanation: "Washington could have stayed in a warm house but chose to remain with his troops, visiting their crude huts, checking on the sick, and sharing their hardships. His personal example of sacrifice and commitment kept the army from dissolving during the terrible winter."
      },
      {
        id: "q16-7",
        question: "What was firecake, and why did soldiers eat it?",
        options: [
          "A delicious dessert",
          "Flour and water baked on stones—it was all they had when rations ran out",
          "A type of firewood",
          "A celebratory food"
        ],
        correctOptionIndex: 1,
        explanation: "Firecake was a crude bread made by mixing flour and water and baking it on hot stones. Soldiers ate it because they had nothing else—sometimes not even this meager food. It symbolized the extreme deprivation at Valley Forge."
      },
      {
        id: "q16-8",
        question: "How many soldiers died at Valley Forge, and what does this reveal about the Revolution?",
        options: [
          "No one died",
          "About 2,500 out of 12,000—showing the Revolution was won through tremendous sacrifice, not just battlefield victories",
          "Only 10 soldiers died",
          "Everyone died"
        ],
        correctOptionIndex: 1,
        explanation: "About 2,500 of 12,000 soldiers died at Valley Forge from disease, cold, and starvation—more than died in most battles. This reveals that the Revolution was won not just through military victories but through the soldiers' willingness to endure unimaginable suffering for the cause of independence."
      }
    ]
  };

export default lesson;
