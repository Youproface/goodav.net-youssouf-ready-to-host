import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        {/* Rotating & Scaling Logo Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="relative flex items-center justify-center"
            style={{
              transformOrigin: 'center center',
              willChange: 'transform'
            }}
          >
            <svg
              id="goodav-bimi.svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 390.2 387.4"
              className="w-48 h-auto"
            >
              <defs>
                <style>
                  {`.cls-1{fill:#f6953a;}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5{stroke-width:0px;}.cls-2{fill:#010101;}.cls-3{fill:#fff;}.cls-4{fill:#41964c;}.cls-5{fill:#f04f44;}`}
                </style>
              </defs>
              <ellipse className="cls-2" cx="195.1" cy="193.7" rx="195.1" ry="193.7"/>
              <path className="cls-5" d="M198,27.7c31.5,0,57.1,26.2,57.1,58.4,0,32.1-25.8,58.1-57.4,58-31.3-.1-56.8-26.2-56.8-58.1,0-32.2,25.6-58.3,57.2-58.3Z"/>
              <path className="cls-3" d="M140.8,193.8c0,32.1-25.7,58.1-57.2,58.1-31.5,0-57.1-26.2-57-58.3,0-32.1,25.7-58.1,57.2-58.1,31.5,0,57,26.2,57,58.3Z"/>
              <path className="cls-1" d="M246.4,193.2c.2-32.1,26.1-58,57.7-57.7,31.4.2,56.8,26.7,56.5,59-.2,31.8-26.1,57.6-57.5,57.5-31.5-.1-56.9-26.5-56.8-58.7Z"/>
              <path className="cls-4" d="M140.8,304.4c0-32,25.9-58,57.6-57.9,31.4.1,56.8,26.5,56.7,58.8-.2,31.7-25.9,57.7-57.3,57.6-31.5,0-57-26.3-56.9-58.5Z"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Loading Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <motion.p
            className="text-xl font-semibold text-gray-800"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading GoodAV Experience
          </motion.p>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-orange-400 to-green-500 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Enhanced Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8"
        >
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-400 via-red-500 to-green-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.div
            className="mt-2 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Preparing your experience...
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
