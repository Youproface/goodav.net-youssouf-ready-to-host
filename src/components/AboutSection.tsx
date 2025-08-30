import React from "react";
import { motion, easeInOut } from "framer-motion";
import { Heart, Award, Globe2, Lightbulb, Play } from "lucide-react";
import { useState } from "react";

export default function AboutUsSection() {
  const [play, setPlay] = useState(false);
  const videoId = "HyHigPOWxYs";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut
      }
    }
  };

  return (
    <motion.section 
      className="relative bg-gradient-to-b from-[#1a0f0a] to-[#0d0d0d] text-white py-16 px-6 md:px-12 lg:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Section Tag */}
      <motion.div 
        className="flex justify-center mb-6"
        variants={itemVariants}
      >
        <span className="bg-[#ff5722] text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
          <Heart className="w-4 h-4" /> ABOUT US
        </span>
      </motion.div>

      {/* Title */}
      <motion.div 
        className="text-center max-w-3xl mx-auto"
        variants={itemVariants}
      >
        <p className="uppercase text-sm tracking-widest text-gray-400">CRAFTING</p>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-2 text-orange-500 drop-shadow-[0\_0\_15px\_rgba(255,87,34,0.8)]">
          AUTHENTIC STORIES
        </h2>
        <p className="text-gray-400 text-sm mb-6">SINCE 2019</p>
        <p className="text-gray-300 leading-relaxed">
          We are Africa&apos;s premier audiovisual storytellers, transforming authentic narratives into 
          compelling visual experiences that resonate globally while honoring our continental heritage.
        </p>
      </motion.div>

      {/* Feature Buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mt-8"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3
            }
          }
        }}
      >
        <motion.div 
          className="flex items-center gap-2 px-5 py-3 border border-gray-700 rounded-md hover:border-orange-500 transition"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.4 }
            }
          }}
          whileHover={{ scale: 1.05 }}
        >
          <Award className="text-orange-500 w-5 h-5" /> <span>Award-Winning</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2 px-5 py-3 border border-gray-700 rounded-md hover:border-orange-500 transition"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.4 }
            }
          }}
          whileHover={{ scale: 1.05 }}
        >
          <Globe2 className="text-orange-500 w-5 h-5" /> <span>Pan-African</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2 px-5 py-3 border border-gray-700 rounded-md hover:border-orange-500 transition"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.4 }
            }
          }}
          whileHover={{ scale: 1.05 }}
        >
          <Lightbulb className="text-orange-500 w-5 h-5" /> <span>Innovation-Driven</span>
        </motion.div>
      </motion.div>

      {/* Video Section */}
      <motion.div 
        className="flex justify-center mt-12"
        variants={itemVariants}
      >
        <div className="relative w-full md:w-3/4 lg:w-2/3 bg-black rounded-xl overflow-hidden shadow-lg">
          {/* Play Button */}
          <div className="flex items-center justify-center h-64 md:h-96 bg-gradient-to-b from-gray-800 to-black">
            <motion.button 
              className="w-16 h-16 flex items-center justify-center bg-orange-500 rounded-full hover:scale-105 transition shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.button>
          </div>
    {!play ? (
        <>
          {/* Thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Video Thumbnail"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0  flex items-center justify-center">
            <motion.button
              className="w-16 h-16 flex items-center justify-center bg-orange-500 rounded-full hover:scale-105 transition shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              onClick={() => setPlay(true)}
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.button>
          </div>
        </>
      ) : (
        // YouTube iframe replaces thumbnail
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
          {/* Caption */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold">GoodAV: Impactful Storytelling</h3>
            <p className="text-gray-300 text-sm">Our journey and vision for the future</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
