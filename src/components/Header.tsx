import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <motion.img 
          id="header-logo"
          src="/icons/Talentis Logo.png" 
          alt="Talentis - Click on Work!" 
          className="w-[150px] h-auto"
          layoutId="logo"
          transition={{ 
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        />
      </div>
    </header>
  );
};

export default Header; 