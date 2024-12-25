'use client';

import { motion } from 'framer-motion';

export default function QuotesCarousel({ quotes }) {
  return (
    <div className="flex flex-col gap-6">
      {quotes.map((quote, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 bg-gray-700 p-5 mb-2 rounded-lg shadow-lg hover:bg-emerald-500"
        >
          {quote}
        </motion.div>
      ))}
    </div>
  );
}
