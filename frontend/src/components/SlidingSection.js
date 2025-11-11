
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SlidingSection({
  id,
  title,
  description,
  imgSrc,
  slideDirection,
  imgPos,
}) {
  const variants = {
    left: { x: '-100%', opacity: 0 },
    right: { x: '100%', opacity: 0 },
    top: { y: '-100%', opacity: 0 },
  };

  return (
    <section id={id} className="min-h-screen flex flex-col md:flex-row items-center px-6 py-10">
      {/* Image Section */}
      { imgPos === "left" &&
      <motion.div
        className={`w-full md:w-1/2 flex justify-center items-center`}
        initial={variants[slideDirection]}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
         <Image src={imgSrc} alt={title} width={600} height={400} className="rounded-xl shadow-lg max-w-full h-auto" />
      </motion.div> }

      {/* Text Section */}
      <motion.div
        className={`w-full md:w-1/2 mt-8 md:mt-0 ${
          slideDirection === 'right' ? 'md:pl-10' : 'md:pr-10'
        }`}
        initial={variants[slideDirection === 'right' ? 'left' : 'right']}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-300">{description}</p>
        {/* {(description)?.substring(0, 250) + '...'} */}
      </motion.div>

      { imgPos === "right" &&
      <motion.div
        className={`w-full md:w-1/2 flex justify-center items-center`}
        initial={variants[slideDirection]}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
         <Image src={imgSrc} alt={title} width={600} height={400} className="rounded-xl shadow-lg max-w-full h-auto" />
      </motion.div> }

    </section>
  );
}
