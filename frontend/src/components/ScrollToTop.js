// app/tribute/components/ScrollTop.jsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 left-8 bg-sky-600 text-white p-3 rounded-full shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🔝
      </motion.button>
    )
  );
}
