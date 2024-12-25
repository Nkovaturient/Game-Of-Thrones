"use client";
import { motion } from 'framer-motion';
import  ImgCarousel  from './ImgCarousel';
import QuotesCarousel from './QuotesCarousel';

export default function SectionCard({ title, content, images, points }) {
  return (
    <section className="py-20 px-5 bg-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">{title}</h2>
        <p className="text-lg text-gray-300 mb-10">{content}</p>
        <QuotesCarousel quotes={points}/>
        <ImgCarousel images={images} />
      </motion.div>
    </section>
  );
}
