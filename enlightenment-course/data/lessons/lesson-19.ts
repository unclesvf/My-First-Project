import { Lesson } from "@/lib/types";

const lesson: Lesson = {
  id: "lesson-19",
  title: "Justice Reformed",
  description: "Cesare Beccaria and the Transformation of Criminal Law",
  heroImage: "/images/hero-beccaria.jpg",
  story: {
    narrator: "Marco, a 15-year-old law student in Milan, 1764",
    chapters: [
      {
        title: "The Horror of the Old Justice",
        content: `My name is Marco, and I am fifteen years old. I am studying law in Milan, and what I have witnessed in our courts has filled me with horror.

Last week, I watched a man accused of theft. He was not proven guilty—there was only suspicion. Yet the judge ordered him stretched on the rack, his joints slowly torn apart, until he confessed. Of course he confessed. Anyone would confess anything to end such agony. Was his confession true? No one knows. No one cares.

This is justice in Europe in the year 1764. Torture is routine. Punishments are barbaric—branding, mutilation, public execution by burning, breaking on the wheel. The severity of punishment depends not on the crime but on the criminal's social rank. A noble who murders a peasant may pay a fine; a peasant who steals from a noble may be hanged.

But something is changing. A young Milanese nobleman named Cesare Beccaria has just published a small book that is causing a sensation across Europe. It is called *Dei delitti e delle pene*—*On Crimes and Punishments*. And in its pages, Beccaria applies Enlightenment principles to the horror of criminal justice.

When I obtained a copy, I knew I was reading something that would change the world.`
      },
      {
        title: "The Purpose of Punishment",
        content: `Beccaria asks a simple question that no one before him had asked so clearly: What is the purpose of punishment?

The old answer was revenge—the criminal has done wrong and must suffer. Punishment was about making the offender pay, often in the most gruesome ways imaginable. The worse the suffering, people thought, the more justice was served.

Beccaria rejects this entirely. Punishment should not be about revenge but about prevention. The only legitimate purpose of punishment is to deter future crimes—to prevent the criminal from offending again and to discourage others from committing similar crimes.

If this is the purpose, then the form of punishment matters greatly. It must be severe enough to outweigh the pleasure or benefit of the crime, but no more severe than necessary. Excessive cruelty serves no purpose. It does not make people safer; it only brutalizes society.

"It is better to prevent crimes than to punish them," Beccaria writes. "This is the fundamental principle of good legislation." A wise government will address the causes of crime—poverty, ignorance, desperation—rather than simply punishing the results.

This was revolutionary. For centuries, governments had competed to devise the most horrific punishments, believing that terror would suppress crime. Beccaria showed that this approach was not only cruel but ineffective.`
      },
      {
        title: "Against Torture",
        content: `Beccaria's attack on torture is devastating. He shows, step by step, that torture is irrational as well as inhumane.

Torture, he points out, punishes before guilt is established. How can we call it justice to inflict agony on someone who might be innocent? The pain is the same whether the accused is guilty or not.

Worse, torture produces unreliable evidence. The strong and hardened criminal can endure pain and maintain a lie. The weak and sensitive innocent will confess to anything to make the suffering stop. Torture rewards the ability to endure pain, not truth-telling.

"By this method," Beccaria writes, "the robust will escape, and the feeble be condemned." The innocent man with a weak constitution is convicted; the guilty man with a strong one goes free. This is not justice—it is barbarism dressed in legal robes.

Beccaria also attacks the use of torture to extract the names of accomplices. Under torture, the accused will name anyone—friends, enemies, random acquaintances—hoping to satisfy the torturer. These names then become the basis for more arrests, more torture, more false confessions. Injustice multiplies.

My own professor, when he read this passage, fell silent for a long moment. "I have participated in such proceedings," he finally admitted. "I never questioned them. Beccaria has made me see what I was too blind to see."`
      },
      {
        title: "Proportionality and Certainty",
        content: `Beccaria establishes two principles that would reshape criminal justice everywhere.

First, proportionality: the punishment must fit the crime. Murder must be punished more severely than theft. Violence against persons more severely than property crimes. When all crimes are punished equally harshly—when a thief faces the same penalty as a murderer—the thief has no reason not to murder witnesses.

This seems obvious now, but in Beccaria's time, hundreds of offenses carried the death penalty, from murder to petty theft to sodomy to "speaking against the king." Beccaria argued that such a system was not only cruel but counterproductive.

Second, certainty: a moderate punishment that is certain to follow a crime deters more effectively than a severe punishment that might be escaped. If criminals know they will be caught and punished, even mild penalties deter. But if they believe they can escape justice, even the threat of death will not stop them.

This led Beccaria to emphasize the importance of effective law enforcement over spectacular punishments. Swift and certain punishment is more valuable than cruel and uncertain punishment.

These principles—proportionality and certainty—would later be embedded in the Eighth Amendment to the U.S. Constitution, which forbids "cruel and unusual punishments." The Founders had read Beccaria. Thomas Jefferson cited him. The Constitution's framers built his insights into American law.`
      },
      {
        title: "The Death Penalty",
        content: `Beccaria's most controversial position was his opposition to the death penalty. Even among reformers, this was considered extreme.

He argued that the state, which exists to protect life, contradicts itself by taking life. He argued that long imprisonment deters as effectively as execution—perhaps more so, since the ongoing suffering of imprisonment is more present to the imagination than a quick death. He argued that irreversible punishments risk killing the innocent, and no system of justice is perfect.

"Is it not absurd," Beccaria asked, "that the laws which detest and punish homicide should, in order to prevent murder, publicly commit murder themselves?"

Not everyone was convinced. Many argued that some crimes were so terrible that only death was proportionate. But Beccaria had opened a debate that continues to this day.

His influence spread rapidly. Within years, Voltaire had written a commentary on *On Crimes and Punishments*. Catherine the Great of Russia consulted it when reforming Russian law. Leopold of Tuscany, inspired by Beccaria, became the first European ruler to abolish the death penalty.

And in America, the Constitution's prohibition of cruel and unusual punishments, its guarantee of due process, its requirement of trial by jury—all reflect Beccaria's teachings. The presumption of innocence, the right to confront witnesses, the principle that punishment should fit the crime: these are Beccaria's gifts to justice.

I am still studying law. The courts of Milan still use torture, though less confidently now. Change will come slowly. But I have seen the future in Beccaria's pages, and I know that the barbarism of the present cannot endure forever. Reason has shown us a better way.`
      }
    ]
  },
  flashcards: [
    {
      id: "fc-1",
      term: "Cesare Beccaria",
      definition: "Italian philosopher (1738-1794) whose On Crimes and Punishments (1764) revolutionized criminal justice theory, influencing the U.S. Constitution's Eighth Amendment."
    },
    {
      id: "fc-2",
      term: "On Crimes and Punishments",
      definition: "Beccaria's 1764 treatise arguing against torture, for proportional punishment, and for criminal justice based on deterrence rather than revenge."
    },
    {
      id: "fc-3",
      term: "Purpose of Punishment",
      definition: "Beccaria argued punishment should deter future crime, not exact revenge. Punishment should be only severe enough to outweigh the benefit of crime."
    },
    {
      id: "fc-4",
      term: "Opposition to Torture",
      definition: "Beccaria showed torture was irrational: it punishes before guilt is proven, produces unreliable confessions, and rewards endurance rather than truth."
    },
    {
      id: "fc-5",
      term: "Proportionality",
      definition: "The principle that punishment should fit the crime—murder punished more severely than theft, etc. Without proportionality, criminals have no incentive to limit their crimes."
    },
    {
      id: "fc-6",
      term: "Certainty of Punishment",
      definition: "Beccaria's principle that swift, certain moderate punishment deters crime better than harsh punishment that might be escaped."
    },
    {
      id: "fc-7",
      term: "Eighth Amendment",
      definition: "The U.S. Constitutional amendment forbidding cruel and unusual punishments and excessive bail—directly influenced by Beccaria's writings."
    },
    {
      id: "fc-8",
      term: "Presumption of Innocence",
      definition: "The principle that accused persons should be treated as innocent until proven guilty—torture violated this by punishing before conviction."
    },
    {
      id: "fc-9",
      term: "Death Penalty Debate",
      definition: "Beccaria was among the first to argue against capital punishment, questioning whether the state has the right to take life and whether execution actually deters crime."
    },
    {
      id: "fc-10",
      term: "Prevention Over Punishment",
      definition: "Beccaria's principle that wise governments address causes of crime (poverty, ignorance) rather than simply punishing offenders after the fact."
    }
  ],
  quiz: [
    {
      id: "q-1",
      question: "According to Beccaria, what should be the purpose of punishment?",
      options: [
        "Revenge against the criminal",
        "Entertainment for the public",
        "Deterrence—preventing future crimes",
        "Enriching the government through fines"
      ],
      correctOptionIndex: 2,
      explanation: "Beccaria argued that punishment's only legitimate purpose is deterrence—preventing the criminal from reoffending and discouraging others from committing crimes. Revenge serves no useful purpose."
    },
    {
      id: "q-2",
      question: "Why did Beccaria argue that torture produces unreliable evidence?",
      options: [
        "Torture was too expensive",
        "The innocent confess to end the pain while the guilty endure it",
        "Judges didn't pay attention during torture",
        "Torture took too long"
      ],
      correctOptionIndex: 1,
      explanation: "Beccaria showed that torture rewards the ability to endure pain, not truth. Innocent people with low pain tolerance confess falsely, while hardened criminals maintain their lies."
    },
    {
      id: "q-3",
      question: "What is the principle of proportionality in punishment?",
      options: [
        "All crimes should receive the same punishment",
        "Only nobles should be punished",
        "Punishment should fit the severity of the crime",
        "Punishment should be as cruel as possible"
      ],
      correctOptionIndex: 2,
      explanation: "Proportionality means that more serious crimes receive more serious punishments. Murder should be punished more severely than theft. This gives criminals incentive to limit the harm they cause."
    },
    {
      id: "q-4",
      question: "According to Beccaria, what deters crime more effectively?",
      options: [
        "The most brutal punishments possible",
        "Swift, certain moderate punishment",
        "Public torture and execution",
        "No punishment at all"
      ],
      correctOptionIndex: 1,
      explanation: "Beccaria argued that criminals are deterred more by certainty than severity. A moderate punishment that definitely follows is more effective than a harsh punishment that might be escaped."
    },
    {
      id: "q-5",
      question: "How did Beccaria's ideas influence American law?",
      options: [
        "They had no influence",
        "The Eighth Amendment banning cruel and unusual punishment reflects his principles",
        "He wrote the Constitution himself",
        "His ideas were rejected by the Founders"
      ],
      correctOptionIndex: 1,
      explanation: "The Eighth Amendment's prohibition of cruel and unusual punishments reflects Beccaria's teachings. Jefferson and other Founders read and cited his work when designing American criminal justice."
    },
    {
      id: "q-6",
      question: "Why did Beccaria oppose torture as a method of determining guilt?",
      options: [
        "It was too quick",
        "It punished people before guilt was proven, violating presumption of innocence",
        "It was too merciful",
        "Only nobles should be tortured"
      ],
      correctOptionIndex: 1,
      explanation: "Beccaria argued that torture inflicts punishment before guilt is established. The accused, who might be innocent, suffers the same agony whether guilty or not. This violates basic justice."
    },
    {
      id: "q-7",
      question: "What was Beccaria's controversial position on the death penalty?",
      options: [
        "He wanted more executions",
        "He argued against it, questioning whether the state has the right to take life",
        "He thought only nobles should be executed",
        "He never discussed the death penalty"
      ],
      correctOptionIndex: 1,
      explanation: "Beccaria argued that the state contradicts its purpose of protecting life by taking life. He believed imprisonment deters as effectively and avoids the risk of executing the innocent."
    },
    {
      id: "q-8",
      question: "What did Beccaria mean by saying 'it is better to prevent crimes than to punish them'?",
      options: [
        "Punishment should be eliminated",
        "Wise governments address causes of crime (poverty, ignorance) rather than just punishing offenders",
        "Crime cannot be prevented",
        "Prevention is too expensive"
      ],
      correctOptionIndex: 1,
      explanation: "Beccaria believed that addressing root causes of crime—through education, reducing poverty, improving conditions—is more effective and humane than simply punishing people after they commit crimes."
    }
  ]
};

export default lesson;
