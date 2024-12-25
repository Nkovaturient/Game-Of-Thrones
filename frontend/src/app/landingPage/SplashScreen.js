// app/tribute/components/SplashScreen.jsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 10000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    isVisible && (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-gray-800 to-black text-white z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.5, duration: 10 }}
      >
         {/* Background Video */}
         <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-fit "
          >
            <source src="/ddt.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className=" relative z-10 text-center"
        >
          <h1 className="text-4xl font-bold mb-3">Winter is Coming ;))</h1>
          <p className="text-lg">Keep your coat on!</p>
        </motion.div>
      </motion.div>
    )
  );
}
