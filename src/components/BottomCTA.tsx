import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import ProjectStartingModal from "./forms/ProjectStartingModal";
import { FaBolt, FaArrowRight, FaStar, FaRocket, FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa';

export default function BottomCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      controls.start("visible");
    }
  }, [isInView, controls]);

  const [open, setOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0f1012] overflow-hidden"
      aria-labelledby="cta-heading"
      itemScope
      itemType="https://schema.org/Action"
      role="region"
    >
      {/* Structured data (JSON-LD) — keeps SEO benefits without incorrectly placing meta tags in body */}
      <script type="application/ld+json" aria-hidden="true">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Action",
          "name": "Start Your Audiovisual Project",
          "description": "Begin your professional audiovisual production project with GoodAV. From concept to completion, transform your vision into reality.",
          "image": "https://goodav.net/images/cta-banner.jpg",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://goodav.net/contact?project=start",
            "inLanguage": "en-US"
          },
          "agent": {
            "@type": "Organization",
            "name": "GoodAV",
            "url": "https://goodav.net",
            "logo": "https://goodav.net/logo.svg"
          }
        })}
      </script>

  {/* Skip Link for Accessibility */}
      <a
        href="#cta-main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
      >
        Skip to main content
      </a>

      {/* Enhanced Background Effects */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl"
          animate={shouldReduceMotion ? undefined : {
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.22, 0.15]
          }}
          transition={shouldReduceMotion ? undefined : {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-0 h-72 w-72 translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl"
          animate={shouldReduceMotion ? undefined : {
            scale: [1.15, 1, 1.15],
            opacity: [0.12, 0.16, 0.12]
          }}
          transition={shouldReduceMotion ? undefined : {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Floating particles (reduced count for performance) */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/20 rounded-full"
            style={{
              left: `${18 + i * 18}%`,
              top: `${30 + (i % 2) * 36}%`
            }}
            animate={shouldReduceMotion ? undefined : {
              y: [0, -14, 0],
              opacity: [0.18, 0.45, 0.18]
            }}
            transition={shouldReduceMotion ? undefined : {
              duration: 3 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div id="cta-main-content" className="relative mx-auto max-w-5xl px-6 py-20 text-center text-zinc-100">
        <motion.div
          className="mx-auto w-max rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-orange-300 backdrop-blur shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="mr-2 inline-flex items-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaBolt className="h-4 w-4 text-orange-300" />
          </motion.span>
          Ready to start?
        </motion.div>

        <motion.h2
          id="cta-heading"
          className="mt-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          itemProp="name"
        >
          <motion.span
            className="block bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Have an idea in your mind?
          </motion.span>
          <motion.span
            className="block mt-2 text-4xl sm:text-5xl md:text-7xl"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Let's start your project with us
          </motion.span>
        </motion.h2>

        <p className="mt-4 text-sm text-zinc-400 max-w-2xl mx-auto" id="cta-subheading">
          See what our clients say about working with GoodAV's professional audiovisual services.
        </p>

        <motion.div
          className="mx-auto mt-6 h-[4px] w-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
          initial={{ width: 0 }}
          animate={isVisible ? { width: 80 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        <motion.div
          className="mx-auto mt-8 max-w-4xl rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur px-8 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.4)] relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Inner glow effect */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_100px_rgba(255,170,80,0.1)]"
          />

          <motion.p
            className="text-xl sm:text-2xl text-zinc-200 font-medium leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            itemProp="description"
          >
            Transform your vision into reality with our professional audiovisual services.
            From concept to completion, we're here to bring stories to life.
          </motion.p>

          {/* Client testimonial (lightweight, accessible) */}
          <blockquote className="mt-6 border-l-2 border-orange-500/30 pl-4 text-left text-zinc-300" aria-label="Client testimonial">
            <p className="text-base italic">“GoodAV took our event from a concept to a show-stopping production. Professional team and on-time delivery.”</p>
            <cite className="block mt-2 text-sm text-zinc-400">— Amina K., Event Producer</cite>
          </blockquote>

          {/* Feature highlights */}
          <motion.div
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <FaStar className="text-orange-400 h-4 w-4" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <FaRocket className="text-orange-400 h-4 w-4" />
              <span>Fast Turnaround</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <FaBolt className="text-orange-400 h-4 w-4" />
              <span>Expert Team</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <ProjectStartingModal open={open} onClose={() => setOpen(false)} />
          <motion.button
            onClick={() => setOpen(true)}
            className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-4 text-lg font-bold text-zinc-900 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400/50 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            aria-haspopup="dialog"
            aria-controls="project-starting-modal"
            aria-label="Get started with GoodAV — Open project form"
            disabled={false}
          >
            {/* Button glow effect */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            />

            <motion.span
              className="grid h-6 w-6 place-items-center rounded-full bg-orange-700/20"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <FaArrowRight className="h-4 w-4" />
            </motion.span>

            <span className="relative z-10">Get Started Today</span>

            {/* Animated sparkles */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${32 + i * 22}%`,
                    top: `${24 + (i % 2) * 56}%`
                  }}
                  aria-hidden="true"
                  animate={shouldReduceMotion ? undefined : {
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={shouldReduceMotion ? undefined : {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.25
                  }}
                />
              ))}
            </motion.div>
          </motion.button>

          {/* Loading indicator when modal is opening */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-hidden="true"
              >
                <motion.div
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <motion.div
                    className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-sm text-white">Loading...</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Trust indicators */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
            role="list"
            aria-label="Trust indicators"
          >
            <motion.div
              className="flex items-center gap-2 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              role="listitem"
              tabIndex={0}
              aria-label="24/7 customer support available"
            >
              <motion.div
                className="w-2 h-2 bg-orange-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="group-hover:text-orange-400 transition-colors duration-200">24/7 Support</span>
              <FaCheckCircle className="w-3 h-3 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.div>

            <motion.div
              className="flex items-center gap-2 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              role="listitem"
              tabIndex={0}
              aria-label="Free initial consultation offered"
            >
              <motion.div
                className="w-2 h-2 bg-orange-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <span className="group-hover:text-orange-400 transition-colors duration-200">Free Consultation</span>
              <FaCheckCircle className="w-3 h-3 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.div>

            <motion.div
              className="flex items-center gap-2 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              role="listitem"
              tabIndex={0}
              aria-label="Expert team with years of experience"
            >
              <motion.div
                className="w-2 h-2 bg-orange-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <span className="group-hover:text-orange-400 transition-colors duration-200">Expert Team</span>
              <FaUsers className="w-3 h-3 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.div>
          </motion.div>

          {/* Additional Social Proof */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-4 text-xs text-zinc-500"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <div className="flex items-center gap-1">
              <FaClock className="w-3 h-3" />
              <span>Avg. Response: 2 hours</span>
            </div>
            <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
            <div className="flex items-center gap-1">
              <FaCheckCircle className="w-3 h-3" />
              <span>500+ Projects Completed</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}  