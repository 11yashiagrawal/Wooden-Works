import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[60vh] sm:h-[70vh] min-h-[400px] sm:min-h-[500px] overflow-hidden">
      {/* Background Image with subtle zoom animation */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <img 
          src="https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Wooden craftsmanship" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 to-amber-800/30"></div>
      </motion.div>
      
      {/* Content with fade-in and slide-up animations */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
        <motion.div 
          className="max-w-3xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="font-cursive text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-amber-100 leading-tight px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Handcrafted Wooden Treasures for Your Home
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg sm:text-xl md:text-2xl text-amber-100 font-serif px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover unique wooden products crafted with passion and precision,
            bringing the warmth of nature into your everyday life.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Wood texture overlay with subtle floating animation */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-16 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-amber-800/30"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{ 
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </section>
  );
};

export default Hero;