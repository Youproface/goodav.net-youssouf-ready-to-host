import React from 'react';
import { motion, Variants } from 'framer-motion';

const GlobalImpact: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.8 }
    },
  };

  return (
    <motion.div 
      className="bg-gray-900 rounded-3xl p-8 max-w-7xl mx-auto text-center text-white font-sans border border-orange-700/30"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      {/* Badge and Heading Section */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold rounded-full px-6 py-3 text-sm uppercase tracking-wide shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          GLOBAL IMPACT
        </span>
      </motion.div>

      <motion.h2 
        className="text-4xl font-extrabold text-orange-500 mb-6 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        TRANSFORMING AFRICA&apos;S STORY
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 max-w-4xl mx-auto mb-12 text-lg leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Measurable excellence across continents, creating powerful narratives that 
        inspire change and celebrate African innovation on the world stage.
      </motion.p>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {[
          {
            icon: (
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            ),
            mainText: '500+',
            subTextBold: 'PROJECTS DELIVERED',
            subTextItalic: 'Award-winning productions'
          },
          {
            icon: (
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            ),
            mainText: '5+',
            subTextBold: 'AFRICAN COUNTRIES',
            subTextItalic: 'Continental presence'
          },
          {
            icon: (
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            ),
            mainText: '20+',
            subTextBold: 'PARTNERS',
            subTextItalic: 'Global audience impact'
          },
          {
            icon: (
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
            ),
            mainText: '10+',
            subTextBold: 'YEARS',
            subTextItalic: 'Excellence guaranteed'
          }
        ].map(({ icon, mainText, subTextBold, subTextItalic }, idx) => (
          <motion.div 
            key={idx} 
            className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 hover:border-orange-500/50 transition-all duration-300"
            variants={item}
            whileHover={{ 
              y: -5,
              boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.3)',
              transition: { duration: 0.2 }
            }}
          >
            {icon}
            <div className="text-4xl font-extrabold text-orange-500 mb-3">
              {mainText}
            </div>
            <div className="uppercase font-bold text-orange-400 text-sm mb-2 tracking-wider">
              {subTextBold}
            </div>
            <div className="italic text-gray-400 text-sm">{subTextItalic}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Achievement Buttons */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {[
          { 
            icon: (
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25H16.5v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744z" />
              </svg>
            ),
            text: 'INDUSTRY RECOGNITION' 
          },
          { 
            icon: (
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
              </svg>
            ),
            text: 'STRATEGIC PARTNERSHIPS' 
          },
          { 
            icon: (
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" />
              </svg>
            ),
            text: 'INNOVATION LEADERSHIP' 
          },
          { 
            icon: (
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ),
            text: 'COMMUNITY IMPACT' 
          }
        ].map(({ icon, text }, idx) => (
          <motion.button
            key={idx}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl py-4 px-6 text-sm font-bold uppercase tracking-wide border border-gray-700/30 hover:bg-orange-600 hover:border-orange-500 transition-all duration-300 flex items-center justify-center gap-2"
            variants={item}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {icon}
            <span className="text-white">{text}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default GlobalImpact;
