"use client";

import { motion } from 'framer-motion';
import SectionCard from '@/components/SectionCard';
import QuotesCarousel from '@/components/QuotesCarousel';
import ImgCarousel from '@/components/ImgCarousel';



export default function Targaryen() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-800 text-white">
    
      <section className="relative bg-black py-20 px-5 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-5">
            Emilia Clarke: The Mother of Dragons
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Explore the life, career, and the iconic role of Daenerys Targaryen, played by the incredible Emilia Clarke.
          </p>
        </motion.div>
        <div className="w-full mt-10">
          <ImgCarousel images={['/em.jpg', '/e6.jpg', '/e7.jpg']} />
        </div>
      </section>

     
      <SectionCard
        title="Introduction"
        content="Emilia Clarke is a celebrated English actress known for her outstanding portrayal of Daenerys Targaryen in Game of Thrones. Born in London, she rose to global fame, captivating audiences with her powerful performance."
        images={['/milia.jpg', '/em.jpg']}
        points={['Born on October 23, 1986, in London, England.', 
'Emilia Clarke is a celebrated English actress known globally for her role as Daenerys Targaryen in HBO’s Game of Thrones (2011–2019).',
'Clarke journey began with a passion for theater, studying at the prestigious Drama Centre London.',
'She captivated audiences with her grace, resilience, and fierce portrayal of a woman destined for greatness.']}
      />

   
      <SectionCard
        title="A Star Beyond the Throne: From theater stages to Hollywood blockbusters. "
        content="Emilia Clarke has starred in a variety of film and television projects beyond Game of Thrones, including Me Before You, Solo: A Star Wars Story, and Last Christmas. Her journey from theater to global stardom is nothing short of inspiring."
        images={['/splash.jpg', '/ee2.jpg']}
        points={['2011–2019: Starred as Daenerys Targaryen in Game of Thrones, one of the most-watched TV shows in history.',
'2013: Debuted on Broadway in Breakfast at Tiffany’s, proving her versatility as an actress.',
'2015: Played Sarah Connor in Terminator Genisys, sharing the screen with Arnold Schwarzenegger.',
'2016: Stunned audiences with her role in Me Before You, a romantic drama that grossed over $208 million worldwide.',
'2018: Appeared in the Star Wars spinoff Solo: A Star Wars Story as Qi’ra, showcasing her sci-fi prowess.',
'2023: Cast in Marvel’s Secret Invasion, further cementing her place as a global star.']}
      />

      {/* Character Role */}
      <SectionCard
        title="A Queen born of Fire : Determined to break chains and claim the Iron Throne."
        content="As the 'Mother of Dragons,' Daenerys Targaryen was a beacon of hope, determination, and justice in Game of Thrones. Her journey across Essos and her fight for the Iron Throne showcased her resilience and moral dilemmas."
        images={['dragbehind.jpg', '/splash.jpg', '/ee2.jpg']}
        points={['Daenerys Targaryen, also called Khaleesi, is a complex character who evolves from a powerless exile to a fierce leader.',
`Her mission:
To free the oppressed, earning her the title Breaker of Chains.
To reclaim her family’s legacy as the rightful ruler of Westeros.`,

'Season 1: Marries Khal Drogo, grows into her role as Khaleesi, and births dragons from the funeral pyre.',
'Season 3–4: Liberates Astapor, Yunkai, and Meereen, fighting against slavery.',
'Season 7–8: Commands armies, dragons, and the allegiance of powerful houses in her quest for the Iron Throne.',

`Responsibilities: \n\
Lead armies, govern cities, and manage alliances.
Make morally complex decisions that often pit mercy against justice.`]}
      />

      {/* Quotes Section */}
      <section className="py-20 px-5 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-yellow-400">
            Memorable Quotes
          </h2>
          <QuotesCarousel
            quotes={[
              'I will take what is mine with fire and blood.',
              'Dracarys!',
              'I am not your little princess. I am Daenerys Stormborn of the House Targaryen.',
              'When my dragons are grown, we will take back what was stolen from me and destroy those who wronged me.'
            ]}
          />
        </div>
      </section>

      {/* Achievements Section */}
      <SectionCard
        title="Achievements: From Emmy nods to global acclaim."
        content="Emilia Clarke has received numerous accolades for her role as Daenerys Targaryen, including Emmy nominations and recognition as one of the most influential people by Time magazine."
        images={['/e1.jpg', '/e5.jpg']}
        points={['Nominated for 4 Primetime Emmy Awards for her portrayal of Daenerys.',
'Won 2019 BAFTA Britannia Award for British Artist of the Year.',

'Named one of Time magazine’s 100 most influential people in 2019.',
'Her charity work includes supporting survivors of brain injuries through her foundation, SameYou.',
`Legacy: \n\n\n\
Regarded as one of the most iconic TV characters of all time.
Game of Thrones is credited with redefining fantasy storytelling on screen.`]}
      />
    </div>
  );
}
