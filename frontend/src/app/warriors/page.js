'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';


const WARRIORS = [
  {
    name: 'Daenerys Targaryen',
    actor: '/dt.jpg',
    character: '/e2.jpg',
  },
  {
    name: 'Jon Snow',
    actor: '/kit.jpg', 
    character: '/jon.jpg',
  },
  {
    name: 'Arya Stark',
    actor: '/arya.jpg',
    character: '/arya_stark.jpg',
  },
 
  {
    name: 'Tyrion Lannister',
    actor: '/peter.webp',
    character: '/tyrion.jpg',
  },
  {
    name: 'Sansa Stark',
    actor: '/sansa.jpg',
    character: '/sansa_stark.jpg',
  },
  {
    name: 'Khal Drogo',
    actor: '/jason.jpg',
    character: '/Khal_drogo.jpg',
  },
  {
    name: 'Ygritte',
    actor: '/rose.jpg',
    character: '/ygritte.jpg',
  },
];

export default function WarriorsPage() {
  const [hoveredWarrior, setHoveredWarrior] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <header className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">
          Game of Thrones Warriors
        </h1>
        <p className="text-gray-300 mt-2">Unforgettable characters, unyielding strength.</p>
      </header>

 
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {WARRIORS.map((warrior, index) => (
          <motion.div
            key={index}
            onHoverStart={() => setHoveredWarrior(index)}
            onHoverEnd={() => setHoveredWarrior(null)}
            className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: hoveredWarrior === index ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={hoveredWarrior === index ? warrior.character : warrior.actor}
                alt={warrior.name}
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-end opacity-0"
              animate={{ opacity: hoveredWarrior === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-yellow-400">{warrior.name}</h3>
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* Description Section */}
      <section className="py-16 px-6 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-yellow-400 mb-10">
          Commendable Acts and Most-Loved Moments
        </h2>

        {/* Warrior Descriptions */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Jon Snow */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-yellow-400">Jon Snow</h3>
            <ul className="mt-4 text-gray-300 space-y-2">
              <li>Revealed as the true heir to the Iron Throne: Aegon Targaryen.</li>
              <li>Led the defense at the **Battle of the Bastards** against Ramsay Bolton.</li>
              <li>United the Night’s Watch and the Free Folk to fight the White Walkers.</li>
              <li>Stabbed Daenerys to prevent her reign of terror.</li>
            </ul>
          </div>

          {/* Arya Stark */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-yellow-400">Arya Stark</h3>
            <ul className="mt-4 text-gray-300 space-y-2">
              <li>Executed the ultimate revenge by killing Walder Frey and his sons.</li>
              <li>Trained with the Faceless Men to become a deadly assassin.</li>
              <li>Killed the Night King in the **Battle of Winterfell**.</li>
              <li>{'Delivered justice to the House of Frey with her iconic line: *"The North remembers."*'}</li>
            </ul>
          </div>

          {/* Daenerys Targaryen */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-yellow-400">Daenerys Targaryen</h3>
            <ul className="mt-4 text-gray-300 space-y-2">
              <li>Mother of Dragons: Commanded Drogon, Rhaegal, and Viserion.</li>
              <li>Freed the Unsullied in Astapor and eliminated the slave masters.</li>
              <li>Brought her dragons to Westeros to challenge the Lannisters.</li>
              <li>{"Destroyed King’s Landing in her quest for the Iron Throne."}</li>
            </ul>
          </div>

          {/* Tyrion Lannister */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-yellow-400">Tyrion Lannister</h3>
            <ul className="mt-4 text-gray-300 space-y-2">
              <li>{'Saved King’s Landing during the Battle of Blackwater Bay.'}</li>
              <li>{"Spoke the truth and won hearts during his trial for Joffrey's murder."}</li>
              <li>Served as Hand of the Queen to Daenerys Targaryen.</li>
              <li>{"Survived against all odds despite his family's betrayals."}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
