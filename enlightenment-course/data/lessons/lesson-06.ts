import { Lesson } from "@/lib/types";

const lesson: Lesson = {
  id: "lesson-6",
  title: "The American Philosopher",
  description: "Benjamin Franklin: Bringing the Enlightenment to America",
  heroImage: "/images/hero-franklin.jpg",
  story: {
    narrator: "William, a 15-year-old printer's apprentice in Philadelphia, 1752",
    chapters: [
      {
        title: "A Curious Master",
        content: `My name is William, and I am fifteen years old. I have the extraordinary good fortune to work as an apprentice in the printing house of Benjamin Franklin in Philadelphia. And I can tell you this: there is no man in all the American colonies quite like my master.

Mr. Franklin is forty-six years old this year of 1752, and he is already the most famous man in America. He publishes the *Pennsylvania Gazette*, the finest newspaper in the colonies. His *Poor Richard's Almanack* is read by farmers and merchants from New Hampshire to Georgia. He has founded a library, a fire company, an academy that will become a university, and a philosophical society.

But what truly sets Mr. Franklin apart is his insatiable curiosity. He asks questions about everything—why does lightning strike? How do ships sail faster? Why do some rooms stay warmer than others? And then he conducts experiments to find answers.

"William," he told me once, "the universe is a book written in the language of nature. We philosophers are merely learning to read it."

I did not fully understand him then, but I was beginning to learn that this way of thinking—questioning everything, testing ideas through experiments, refusing to accept tradition without evidence—was called the Enlightenment. And Mr. Franklin was its greatest American champion.`
      },
      {
        title: "The Lightning Experiment",
        content: `This June, I helped Mr. Franklin prepare for an experiment that all Philadelphia is still buzzing about. For years, he had wondered whether lightning was the same thing as the electrical fire that philosophers had studied in their laboratories. He believed it was—but how to prove it?

His answer was elegantly simple: fly a kite into a thunderstorm.

We constructed a kite from a silk handkerchief stretched over a cedar cross. At the top, Mr. Franklin fixed a pointed wire. A silk ribbon connected the kite to a key, which would collect any electrical charge.

On a stormy day, we walked to an open field outside town. Mr. Franklin flew the kite into the clouds while I watched in a mixture of terror and fascination. Would the lightning strike him dead?

Then—I saw it happen. The fibers of the hemp string stood up, electrified. Mr. Franklin touched his knuckle to the key and drew a spark. Lightning and electricity were indeed the same force!

"This changes everything, William," Mr. Franklin said, his eyes bright with excitement. "Now that we understand what lightning is, we can protect against it."

Within months, he had invented the lightning rod—a simple pointed metal rod that could draw lightning safely into the ground, protecting buildings from fire. Churches, barns, and houses across the colonies soon sported Franklin's invention. One man's curiosity had saved countless lives.`
      },
      {
        title: "Reading the Philosophers",
        content: `Mr. Franklin's printing shop was a school for the mind. During slow hours, he encouraged me to read from his extensive library—works by John Locke, Isaac Newton, Francis Bacon, and dozens of other European philosophers and scientists.

"These are the authors who taught me to think," Mr. Franklin said. "They showed me that we need not accept the world as it is, but can use reason to understand it and improve it."

He was particularly passionate about Locke's writings on government. "Locke tells us that all people have natural rights—life, liberty, and property—that no king can rightfully take away. He says governments exist only by the consent of the governed. These ideas are revolutionary, William. Someday they may change the world."

Mr. Franklin often corresponded with philosophers in Europe. His scientific papers were read in London and Paris. He was, in truth, a transatlantic figure—as comfortable discussing ideas with French philosophers as with Philadelphia merchants.

But he always believed that philosophy must be practical. "What good is knowledge," he asked me once, "if it doesn't improve human life? The purpose of understanding is not merely to admire the universe but to make it better for everyone."`
      },
      {
        title: "Civic Virtue and Public Good",
        content: `Beyond his scientific experiments, Mr. Franklin devoted enormous energy to improving Philadelphia and the colonies. He believed that enlightened citizens had a duty to serve the common good—what he called "civic virtue."

The library he founded, the Library Company of Philadelphia, was based on a revolutionary idea: ordinary citizens, pooling their resources, could access knowledge that had previously been available only to the wealthy. "Books are the best investment a society can make," he said.

His fire company, the Union Fire Company, was the first volunteer fire brigade in America. His idea of paving and lighting the streets made Philadelphia the cleanest and safest city in the colonies. His Philadelphia Academy would grow into the University of Pennsylvania.

And his American Philosophical Society brought together the brightest minds in the colonies to share knowledge and conduct experiments. "We must learn from each other," Mr. Franklin insisted. "No one person, no matter how brilliant, can understand everything alone."

All of these institutions reflected Enlightenment principles: that reason could improve society, that education was essential to freedom, that citizens working together could accomplish what individuals could not.`
      },
      {
        title: "Seeds of a New Nation",
        content: `I did not know it then, but Mr. Franklin's Enlightenment principles would soon help shape a new nation.

In 1754, just two years after the lightning experiment, Mr. Franklin would propose the Albany Plan of Union—an early attempt to unite the colonies. Though it failed, it planted seeds that would bear fruit decades later.

By the 1760s, tensions with Britain were growing. The same principles Mr. Franklin had learned from Locke—natural rights, government by consent—led colonists to question whether Parliament had the right to tax them without representation. Mr. Franklin would travel to London to argue the colonial cause, becoming the voice of American grievances.

And in 1776, Benjamin Franklin would sit in Independence Hall—just blocks from where I now stand at his printing press—helping to edit Thomas Jefferson's Declaration of Independence. That document would proclaim Enlightenment principles to the world: that all men are created equal, endowed with unalienable rights, and that governments derive their just powers from the consent of the governed.

Mr. Franklin would help negotiate the alliance with France that won the war. He would help write the Constitution that established the new government. He would become the embodiment of the American Enlightenment—the curious, practical, public-spirited philosopher who helped turn European ideas into American reality.

All of that was in the future. But already in 1752, standing in his printing shop, watching him puzzle over an experiment or draft an essay, I could sense that something extraordinary was taking shape. The Enlightenment had crossed the Atlantic and taken root in American soil. And Benjamin Franklin was its gardener.`
      }
    ]
  },
  flashcards: [
    {
      id: "fc-1",
      term: "Benjamin Franklin",
      definition: "American polymath (1706-1790) who embodied Enlightenment ideals: scientist, inventor, writer, printer, and statesman who helped draft the Declaration of Independence and the Constitution."
    },
    {
      id: "fc-2",
      term: "Lightning Rod",
      definition: "Franklin's invention (1752) that protects buildings from lightning strikes by conducting electricity safely into the ground—a practical application of scientific discovery."
    },
    {
      id: "fc-3",
      term: "Poor Richard's Almanack",
      definition: "Franklin's annual publication (1732-1758) containing weather forecasts, practical advice, and witty sayings promoting industry, thrift, and self-improvement."
    },
    {
      id: "fc-4",
      term: "American Philosophical Society",
      definition: "Scholarly organization founded by Franklin in 1743 to promote useful knowledge through scientific inquiry and learned discussion—still active today."
    },
    {
      id: "fc-5",
      term: "Civic Virtue",
      definition: "The idea that citizens have a duty to serve the public good, not just their private interests. Franklin founded many institutions based on this Enlightenment principle."
    },
    {
      id: "fc-6",
      term: "Library Company of Philadelphia",
      definition: "America's first lending library, founded by Franklin in 1731, based on the idea that ordinary citizens pooling resources could access knowledge previously reserved for the wealthy."
    },
    {
      id: "fc-7",
      term: "Albany Plan of Union",
      definition: "Franklin's 1754 proposal to unite the American colonies under a central government—an early step toward the eventual formation of the United States."
    },
    {
      id: "fc-8",
      term: "Practical Philosophy",
      definition: "Franklin's belief that knowledge should improve human life, not just satisfy curiosity. He sought to apply Enlightenment ideas to solve real problems."
    },
    {
      id: "fc-9",
      term: "Experimentation",
      definition: "The scientific method of testing ideas through controlled observation—central to Franklin's approach and to Enlightenment thinking generally."
    },
    {
      id: "fc-10",
      term: "Pennsylvania Gazette",
      definition: "The newspaper Franklin published, which became one of the most influential in colonial America and helped spread Enlightenment ideas."
    }
  ],
  quiz: [
    {
      id: "q-1",
      question: "What did Benjamin Franklin's famous kite experiment prove?",
      options: [
        "That kites could fly in storms",
        "That lightning and electricity are the same force",
        "That silk is waterproof",
        "That Philadelphia had the worst weather in the colonies"
      ],
      correctOptionIndex: 1,
      explanation: "Franklin's 1752 experiment demonstrated that lightning was electrical in nature—the same force scientists had studied in laboratories. This understanding led directly to his invention of the lightning rod."
    },
    {
      id: "q-2",
      question: "How did Franklin apply Enlightenment principles to everyday life?",
      options: [
        "He became a hermit to study philosophy",
        "He founded practical institutions like libraries, fire companies, and schools to improve society",
        "He rejected European ideas entirely",
        "He focused only on making money"
      ],
      correctOptionIndex: 1,
      explanation: "Franklin believed philosophy should be practical. He founded the first lending library, volunteer fire company, and civic improvement societies in America, applying Enlightenment ideals of reason and public service to real problems."
    },
    {
      id: "q-3",
      question: "What was the purpose of the American Philosophical Society?",
      options: [
        "To promote religious doctrine",
        "To share knowledge and conduct scientific experiments for the public good",
        "To train soldiers",
        "To collect taxes"
      ],
      correctOptionIndex: 1,
      explanation: "Franklin founded the American Philosophical Society in 1743 to bring together scholars and scientists to share discoveries and promote useful knowledge—a perfect expression of Enlightenment values."
    },
    {
      id: "q-4",
      question: "What Enlightenment philosopher particularly influenced Franklin's political thinking?",
      options: [
        "Machiavelli",
        "John Locke",
        "Karl Marx",
        "Confucius"
      ],
      correctOptionIndex: 1,
      explanation: "Franklin was deeply influenced by Locke's ideas about natural rights, government by consent, and the social contract. These principles would later shape his contributions to the Declaration of Independence and Constitution."
    },
    {
      id: "q-5",
      question: "What is 'civic virtue' and how did Franklin demonstrate it?",
      options: [
        "Religious piety; he built churches",
        "The duty to serve the public good; he founded libraries, schools, and fire companies",
        "Military bravery; he led armies",
        "Personal wealth; he became rich"
      ],
      correctOptionIndex: 1,
      explanation: "Civic virtue is the principle that citizens should contribute to the common good. Franklin demonstrated this by founding institutions that served all citizens—libraries, fire companies, academies—rather than just pursuing private gain."
    },
    {
      id: "q-6",
      question: "How was the Library Company of Philadelphia revolutionary?",
      options: [
        "It was the largest building in America",
        "It allowed ordinary citizens to access books previously available only to the wealthy",
        "It only contained religious texts",
        "It was open only to women"
      ],
      correctOptionIndex: 1,
      explanation: "Before Franklin's library, books were expensive and available mainly to the rich. The Library Company allowed ordinary citizens to pool resources and share books, democratizing access to knowledge."
    },
    {
      id: "q-7",
      question: "What was the Albany Plan of Union, and why is it historically significant?",
      options: [
        "A trade agreement with France",
        "An early proposal to unite the colonies that foreshadowed the later United States",
        "A plan to build roads",
        "A military alliance with Native Americans"
      ],
      correctOptionIndex: 1,
      explanation: "Franklin's 1754 Albany Plan proposed uniting the colonies under a central government. Though it was rejected, it planted the idea of colonial unity that would bear fruit in the Revolution and Constitution."
    },
    {
      id: "q-8",
      question: "How did Franklin's career embody the Enlightenment ideal of practical philosophy?",
      options: [
        "He wrote only theoretical works",
        "He applied scientific discoveries to solve real problems, like protecting buildings from lightning",
        "He rejected all European ideas",
        "He focused only on political theory"
      ],
      correctOptionIndex: 1,
      explanation: "Franklin believed knowledge should improve human life. His lightning rod, efficient stove, bifocal glasses, and civic institutions all applied scientific understanding to practical problems—the essence of Enlightenment practicality."
    }
  ]
};

export default lesson;
