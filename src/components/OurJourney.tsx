import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Globe2, Award, Handshake, Lightbulb, CheckCircle2, Play, Rocket } from "lucide-react";
import { Film, Users, Eye } from "lucide-react";
import { useState } from "react";

export default function OurJourney() {
  const [play, setPlay] = useState(false);
  const videoId = "e8DZQifSpcY"; 
  const highlights = [
    "Customer-centric approach with cultural sensitivity",
    "Quality & reliability through proven methodologies",
    "Diversity & inclusion as core business values",
    "Impact-driven solutions that create lasting change",
  ];

  const stats = [
    {
      icon: <Film className="w-6 h-6 text-orange-500" />,
      value: "500+",
      title: "Projects Delivered",
      desc: "Across multiple industries",
    },
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      value: "20+",
      title: "Partners",
      desc: "Long-term partnerships",
    },
    {
      icon: <Globe2 className="w-6 h-6 text-orange-500" />,
      value: "5+",
      title: "Countries",
      desc: "Continental presence",
    },
    {
      icon: <Eye className="w-6 h-6 text-orange-500" />,
      value: "10+",
      title: "Years of Experience",
      desc: "In the industry",
    },
  ];

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
        ease: [0.22, 1, 0.36, 1]
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
      <motion.div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12" variants={itemVariants}>
        {/* Left Content */}
        <motion.div variants={itemVariants}>
          {/* Section Tag */}
          <motion.div 
            className="flex items-center gap-2 mb-4"
            variants={itemVariants}
          >
            <span className="flex items-center gap-2 bg-[#ff5722] text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg">
              <BookOpen className="w-4 h-4" /> OUR JOURNEY
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            From Vision to Continental Impact
          </motion.h2>

          {/* Paragraph */}
          <motion.p 
            className="text-gray-300 mb-4"
            variants={itemVariants}
          >
            <span className="text-orange-500 font-semibold">GOODAV</span> emerged
            from a revolutionary vision: to elevate African storytelling to global
            standards while preserving cultural authenticity. Founded by passionate
            creators who understood the power of visual narrative, we've transformed
            from a local production house into Africa&apos;s most trusted audiovisual
            partner.
          </motion.p>

          <motion.p 
            className="text-gray-300"
            variants={itemVariants}
          >
            Our evolution spans documenting grassroots communities to capturing
            international conferences, producing award-winning documentaries, and
            pioneering live streaming technologies across the continent—always with
            African authenticity at our core.
          </motion.p>

          {/* Timeline */}
          <motion.div 
            className="flex flex-wrap gap-4 mt-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4
                }
              }
            }}
          >
            <motion.div 
              className="bg-[#1e1e1e] border border-gray-700 rounded-lg px-5 py-4 text-center hover:border-orange-500 transition"
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
              <h3 className="text-orange-500 text-xl font-bold">2019</h3>
              <p className="text-gray-300 text-sm">Founded with a vision</p>
            </motion.div>
            <motion.div 
              className="bg-[#1e1e1e] border border-gray-700 rounded-lg px-5 py-4 text-center hover:border-orange-500 transition"
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
              <h3 className="text-orange-500 text-xl font-bold">2021</h3>
              <p className="text-gray-300 text-sm">Pan-African expansion</p>
            </motion.div>
            <motion.div 
              className="bg-[#1e1e1e] border border-gray-700 rounded-lg px-5 py-4 text-center hover:border-orange-500 transition"
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
              <h3 className="text-orange-500 text-xl font-bold">2024</h3>
              <p className="text-gray-300 text-sm">AI integration pioneer</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
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
            className="p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition bg-[#1e1e1e]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Globe2 className="text-orange-500 w-6 h-6 mb-3" />
            <h4 className="font-semibold mb-1">Continental Reach</h4>
            <p className="text-gray-400 text-sm">
              Operating across 15+ African countries with deep cultural understanding
            </p>
          </motion.div>
          <motion.div 
            className="p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition bg-[#1e1e1e]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Award className="text-orange-500 w-6 h-6 mb-3" />
            <h4 className="font-semibold mb-1">Excellence Recognized</h4>
            <p className="text-gray-400 text-sm">
              Award-winning productions that have garnered international acclaim
            </p>
          </motion.div>
          <motion.div 
            className="p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition bg-[#1e1e1e]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Handshake className="text-orange-500 w-6 h-6 mb-3" />
            <h4 className="font-semibold mb-1">Trusted Partnerships</h4>
            <p className="text-gray-400 text-sm">
              Collaborating with leading organizations and international bodies
            </p>
          </motion.div>
          <motion.div 
            className="p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition bg-[#1e1e1e]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Lightbulb className="text-orange-500 w-6 h-6 mb-3" />
            <h4 className="font-semibold mb-1">Innovation Pioneer</h4>
            <p className="text-gray-400 text-sm">
              Leading AI-powered content creation and cutting-edge technology adoption
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.section 
        className="relative bg-gradient-to-b from-[#1a0f0a] to-[#0d0d0d] text-white py-16 px-6 md:px-12 lg:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="max-w-7xl mx-auto text-center" variants={itemVariants}>
          {/* Heading */}
          <motion.h2 
            className="text-2xl md:text-3xl font-bold tracking-wide text-gray-200"
            variants={itemVariants}
          >
            MEASURABLE IMPACT
          </motion.h2>
          <motion.p 
            className="text-gray-400 mt-2 mb-10"
            variants={itemVariants}
          >
            Numbers that tell our story of growth and excellence
          </motion.p>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {stats.map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-yellow-600/30 bg-[#1e1e1e] hover:border-orange-500 transition"
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 30 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.5 }
                  }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.3)"
                }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-orange-500">{item.value}</h3>
                <p className="font-semibold text-white mt-1">{item.title}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section 
        className="relative bg-gradient-to-b from-[#1a0f0a] to-[#0d0d0d] text-white py-16 px-6 md:px-12 lg:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
         <motion.div
      className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left: Video Placeholder */}
      <motion.div
        className="relative rounded-2xl bg-[#1e1e1e] overflow-hidden flex items-center justify-center aspect-video"
        variants={itemVariants}
      >
        <span className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full z-10">
          AI-POWERED
        </span>

        {!play ? (
          <>
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="Video Thumbnail"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Play Button Overlay */}
            <motion.button
              className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-orange-500 bg-orange-600/80 hover:bg-orange-600 transition z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              onClick={() => setPlay(true)}
            >
              <Play className="w-6 h-6 text-white" />
            </motion.button>

            {/* Caption */}
            <motion.div
              className="absolute bottom-4 left-0 right-0 text-center text-white px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h4 className="font-[900] text-lg">AI-Powered Visual Marketing</h4>
              <p className="text-gray-300 text-sm">
                Showcasing our cutting-edge innovation capabilities
              </p>
            </motion.div>
          </>
        ) : (
          // Video iframe
          <iframe
            className="absolute inset-0 w-full h-full rounded-2xl"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </motion.div>

      {/* Right: Text + Highlights */}
      <motion.div variants={itemVariants}>
        <motion.div className="flex items-center gap-3 mb-4" variants={itemVariants}>
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10">
            <Rocket className="w-6 h-6 text-orange-500" />
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">
            Pioneering the Future of Storytelling
          </h2>
        </motion.div>

        <motion.p className="text-gray-300 mb-6" variants={itemVariants}>
          Our commitment to innovation drives us to explore emerging technologies,
          from AI-powered content creation to immersive storytelling experiences.
          We're not just keeping pace with the future—we're creating it.
        </motion.p>

        {/* Highlights */}
        <motion.ul
          className="space-y-3"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
        >
          {highlights.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5" />
              <span className="text-gray-200">{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
      </motion.section>
    </motion.section>
  );
}
