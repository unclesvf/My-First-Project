import { Lesson } from "@/lib/types";

const lesson: Lesson = {
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

But General Washington has a plan. British General Cornwallis has moved his army to Yorktown, Virginia, on the Chesapeake Bay. He expects British ships to supply and support him. Washington sees an opportunity—if we can trap Cornwallis with the French fleet blocking the bay, we might win a decisive victory.`
        },
        {
          title: "The Trap Closes",
          content: `Washington marches his army south, coordinating with French General Rochambeau. The French fleet under Admiral de Grasse sails into Chesapeake Bay, defeating the British navy and blocking Cornwallis's escape by sea. American and French forces surround Yorktown by land. Cornwallis is trapped.

For weeks, we bombard Yorktown. French artillery pounds British positions. We dig trenches closer and closer to their fortifications. I watch as my father and other soldiers storm British redoubts in night attacks. The British are running out of food, ammunition, and hope. Cornwallis tries to escape across the York River but is turned back by a storm.`
        },
        {
          title: "The Siege",
          content: `The siege of Yorktown lasts three weeks, and every day brings us closer to victory. Our artillery—American and French cannons positioned in carefully dug trenches—pounds the British positions day and night. The sound is constant, thunderous. I help carry ammunition, my ears ringing from the noise.

Washington and Rochambeau coordinate their forces with precision. We dig parallel trenches, each one closer to British fortifications. This is siege warfare—slow, methodical, deadly. British artillery fires back, and men die every day, but we keep advancing.

On October 14, Father participates in a night assault on British Redoubt Number 10. American troops, including Black soldiers like him, charge with bayonets fixed, taking the position in brutal hand-to-hand combat. The French simultaneously capture Redoubt Number 9. With these positions in American hands, our artillery can fire directly into Yorktown.

Cornwallis is desperate. He tries to evacuate across the York River to Gloucester Point, hoping to escape north. But a sudden storm scatters his boats. Even nature seems to favor American independence. By October 17, Cornwallis sends a drummer boy and an officer with a white flag. He's ready to discuss terms. After six years of war, the end is finally in sight.`
        },
        {
          title: "Surrender",
          content: `On October 19, 1781, Cornwallis surrenders. Over 7,000 British soldiers lay down their weapons. As they march out, their band plays "The World Turned Upside Down"—an appropriate song. We colonists have defeated the mighty British Empire.

I watch with my father as redcoats stack their muskets. Some British soldiers are crying. American and French soldiers stand at attention. Washington sits on his horse, dignified in victory. My father stands straight and proud—a free man who helped win freedom for a nation.

This doesn't end the war officially—that will take two more years of negotiations. But Yorktown is the decisive victory. Britain will give up. We've won. The United States of America will be independent.`
        },
        {
          title: "What Victory Means",
          content: `As I watch the British surrender, I think about what this victory means for different people. For General Washington and the Continental Army, it's vindication of over six years of sacrifice. For the French, it's revenge against their British rivals. For most Americans, it's the chance to govern themselves without kings or lords.

But for my father and other Black soldiers, the meaning is more complicated. Father fought for American freedom in exchange for his own freedom. Many enslaved men were promised liberty for their military service. Some will receive it; others will be betrayed, sent back to slavery despite their service.

I ask Father if he thinks America will live up to its promises of liberty and equality. He pauses, watching the British lay down their arms. "We've proven we can fight for freedom," he says quietly. "Now we must fight to make that freedom real for everyone. The war for independence is won, but the struggle for true equality is just beginning."

The victory is real—we've defeated the most powerful empire on Earth. Thirteen colonies have become a free nation. But Father's words remind me that independence is just the first step. The Declaration says all men are created equal, but we haven't made that true yet. That's the next battle, and it will take longer than this war.

Still, today is a day for celebration. The impossible has happened. Farmers and shopkeepers, French aristocrats and freed slaves, fighting together, have created a new nation based on the radical idea that people can govern themselves. Yorktown is more than a military victory—it's proof that ideals like liberty and self-government can triumph over tyranny and inherited power. The world has indeed turned upside down, and nothing will ever be the same.`
        }
      ]
    },
    flashcards: [
      {
        id: "fc17-1",
        term: "Battle of Yorktown",
        definition: "The decisive 1781 battle where Washington and French forces trapped and defeated British General Cornwallis, ending major fighting in the Revolutionary War."
      },
      {
        id: "fc17-2",
        term: "General Cornwallis",
        definition: "British general who surrendered at Yorktown, ending major combat in the Revolutionary War."
      },
      {
        id: "fc17-3",
        term: "Admiral de Grasse",
        definition: "French admiral whose fleet blocked Chesapeake Bay, preventing British escape by sea and enabling the Yorktown victory."
      },
      {
        id: "fc17-4",
        term: "Rochambeau",
        definition: "French general who commanded French forces fighting alongside Washington at Yorktown."
      },
      {
        id: "fc17-5",
        term: "Siege",
        definition: "A military tactic of surrounding and bombarding an enemy position to force surrender, used at Yorktown."
      },
      {
        id: "fc17-6",
        term: "Black Patriots",
        definition: "African Americans who fought for American independence, often in exchange for freedom from slavery."
      },
      {
        id: "fc17-7",
        term: "Treaty of Paris (1783)",
        definition: "The treaty that officially ended the Revolutionary War and recognized American independence."
      },
      {
        id: "fc17-8",
        term: "Redoubt",
        definition: "A small defensive fortification. American and French forces stormed British redoubts at Yorktown."
      },
      {
        id: "fc17-9",
        term: "Chesapeake Bay",
        definition: "Large bay in Virginia where French Admiral de Grasse's fleet blocked British naval support, trapping Cornwallis's army at Yorktown for the decisive siege."
      },
      {
        id: "fc17-10",
        term: "The World Turned Upside Down",
        definition: "Song reportedly played by British forces during their surrender at Yorktown, symbolizing the shocking defeat of the world's greatest empire by colonial rebels."
      }
    ],
    quiz: [
      {
        id: "q17-1",
        question: "What was the key to American victory at Yorktown?",
        options: [
          "Fighting alone without help",
          "Trapping Cornwallis between French naval blockade and American/French land forces",
          "Bribing British soldiers",
          "A surprise snowstorm"
        ],
        correctOptionIndex: 1,
        explanation: "The key was coordination: the French fleet blocked Chesapeake Bay while American and French land forces surrounded Yorktown, trapping Cornwallis with no escape route."
      },
      {
        id: "q17-2",
        question: "What role did France play at Yorktown?",
        options: [
          "None—Americans fought alone",
          "Crucial—French fleet blocked British ships and French troops fought alongside Americans",
          "France fought against America",
          "France only sent money"
        ],
        correctOptionIndex: 1,
        explanation: "France played a crucial role: Admiral de Grasse's fleet blocked British escape by sea, and French troops under Rochambeau fought alongside American forces on land."
      },
      {
        id: "q17-3",
        question: "What happened on October 19, 1781?",
        options: [
          "The war started",
          "Cornwallis surrendered at Yorktown, effectively ending major combat",
          "Washington was captured",
          "Britain won a great victory"
        ],
        correctOptionIndex: 1,
        explanation: "On October 19, 1781, British General Cornwallis surrendered over 7,000 troops at Yorktown. This was the decisive American victory that effectively ended major combat in the Revolutionary War."
      },
      {
        id: "q17-4",
        question: "Did the Battle of Yorktown immediately end the war?",
        options: [
          "Yes, Britain surrendered that day",
          "No, but it was the decisive victory; the war officially ended with the Treaty of Paris in 1783",
          "The war continued for ten more years",
          "Yorktown had no effect on the war"
        ],
        correctOptionIndex: 1,
        explanation: "While Yorktown was the decisive military victory, the war officially ended two years later with the Treaty of Paris in 1783, which recognized American independence."
      },
      {
        id: "q17-5",
        question: "Why did some African Americans fight for American independence?",
        options: [
          "They were forced to fight",
          "They were promised freedom from slavery in exchange for military service",
          "They had no reason to fight",
          "All enslaved people were automatically freed"
        ],
        correctOptionIndex: 1,
        explanation: "Some African Americans fought for American independence because they were promised freedom from slavery in exchange for their military service. However, many remained enslaved even after the war."
      },
      {
        id: "q17-6",
        question: "What was significant about the night assault on British redoubts at Yorktown?",
        options: [
          "It failed completely",
          "American troops, including Black soldiers, captured key positions in brutal hand-to-hand combat, allowing artillery to target Yorktown directly",
          "No one participated",
          "It was canceled"
        ],
        correctOptionIndex: 1,
        explanation: "On October 14, American forces including Black soldiers stormed British Redoubt Number 10 with bayonets in a night assault. The French simultaneously captured Redoubt Number 9. These positions allowed American artillery to fire directly into Yorktown, making Cornwallis's position untenable."
      },
      {
        id: "q17-7",
        question: "Why did Cornwallis's attempt to escape across the York River fail?",
        options: [
          "He never tried to escape",
          "A sudden storm scattered his boats, and even nature seemed to favor American independence",
          "American troops stopped him",
          "He changed his mind"
        ],
        correctOptionIndex: 1,
        explanation: "Cornwallis desperately tried to evacuate his troops across the York River to Gloucester Point on the night of October 16-17, hoping to escape north. But a sudden storm scattered his boats, making evacuation impossible. Even the weather seemed to conspire against British escape."
      },
      {
        id: "q17-8",
        question: "What does Marcus's father's statement about fighting for equality reveal about the Revolution's legacy?",
        options: [
          "The Revolution solved all problems",
          "Independence was won, but the struggle for true equality—especially for Black Americans—was just beginning",
          "Everyone gained equal rights immediately",
          "The Revolution failed completely"
        ],
        correctOptionIndex: 1,
        explanation: "Marcus's father observes that while they won independence, the promise of equality in the Declaration hadn't been fulfilled for everyone, especially enslaved people. His words reveal the Revolution's contradictions—proclaiming liberty while maintaining slavery—and foreshadow the long struggle for civil rights that would follow."
      }
    ]
  };

export default lesson;
