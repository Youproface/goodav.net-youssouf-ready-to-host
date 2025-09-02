import { FaLightbulb, FaCalendarAlt, FaCamera, FaPen, FaImages, FaPlay } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function Excellence() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
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
      className="relative bg-[#0e0f10] text-zinc-100 overflow-hidden"
      aria-labelledby="excellence-heading"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      {/* SEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Our Creative Excellence Process",
          "description": "Professional audiovisual production workflow from concept to completion",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Concept Development",
              "text": "Innovative brainstorming and strategic planning of the creative vision with our clients"
            },
            {
              "@type": "HowToStep",
              "name": "Premium Pre-Production",
              "text": "Meticulous scheduling, location scouting, and professional equipment preparation"
            },
            {
              "@type": "HowToStep",
              "name": "Expert Production",
              "text": "Professional filming and photography with our world-class expert team"
            },
            {
              "@type": "HowToStep",
              "name": "Luxury Post-Production",
              "text": "Master-level editing, color grading, and premium final delivery"
            }
          ],
          "provider": {
            "@type": "Organization",
            "name": "GoodAV",
            "url": "https://goodav.net"
          }
        })}
      </script>

      {/* Enhanced Background Effects */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-10 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute right-10 bottom-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <motion.header
          className="text-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div
            className="mx-auto mb-3 h-[2px] w-24 rounded bg-gradient-to-r from-orange-500 to-amber-400"
            variants={itemVariants}
          />
          <motion.h2
            id="excellence-heading"
            className="text-2xl sm:text-3xl font-extrabold"
            variants={itemVariants}
            itemProp="name"
          >
            Our Creative Excellence Process
          </motion.h2>
          <motion.p
            className="mx-auto mt-2 max-w-2xl text-sm text-zinc-300"
            variants={itemVariants}
            itemProp="description"
          >
            From concept to completion, every project follows our proven premium workflow
          </motion.p>
        </motion.header>

        {/* Process Cards with Enhanced UX */}
        <motion.div
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          role="list"
          aria-label="Creative process steps"
        >
          <ProcessCard
            icon={<FaLightbulb className="h-5 w-5 text-zinc-900" />}
            title="Concept Development"
            body="Innovative brainstorming and strategic planning of the creative vision with our clients"
            step={1}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <ProcessCard
            icon={<FaCalendarAlt className="h-5 w-5 text-zinc-900" />}
            title="Premium Pre‑Production"
            body="Meticulous scheduling, location scouting, and professional equipment preparation"
            step={2}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <ProcessCard
            icon={<FaCamera className="h-5 w-5 text-zinc-900" />}
            title="Expert Production"
            body="Professional filming and photography with our world‑class expert team"
            step={3}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <ProcessCard
            icon={<FaPen className="h-5 w-5 text-zinc-900" />}
            title="Luxury Post‑Production"
            body="Master‑level editing, color grading, and premium final delivery"
            step={4}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>

        {/* Enhanced CTA Panel */}
        <motion.div
          className="mt-10 rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur px-6 py-8 sm:px-10 sm:py-10 shadow-[0_8px_40px_rgba(0,0,0,0.35)] relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Enhanced Panel Glow */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_80px_rgba(255,170,80,0.08)]" />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-4 left-10 h-16 w-56 rounded-full bg-orange-500/25 blur-2xl opacity-60"
            animate={{
              x: [-20, 20, -20],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="text-center">
            <motion.h3
              className="text-xl sm:text-2xl font-extrabold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Want to Experience More?
            </motion.h3>
            <motion.p
              className="mx-auto mt-2 max-w-3xl text-sm text-zinc-300"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Explore our complete behind‑the‑scenes photo gallery and discover the passion, precision,
              and premium craftsmanship behind every extraordinary project.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.flickr.com/photos/202425883@N07/sets/72177720327653270/"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3 text-sm font-semibold text-zinc-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#0e0f10]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Explore our full photo gallery on Flickr (opens in new tab)"
              >
                <motion.span
                  className="grid h-5 w-5 place-items-center rounded bg-orange-700/10 text-zinc-900"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaImages className="h-4 w-4"/>
                </motion.span>
                Explore Full Gallery
              </motion.a>

              <motion.a
                href="/portfolio"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 backdrop-blur hover:bg-white/10 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#0e0f10]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View our portfolio of premium work"
              >
                <motion.span
                  className="grid h-5 w-5 place-items-center rounded bg-orange-500/20 text-orange-300 ring-1 ring-white/10"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaPlay className="h-3 w-3"/>
                </motion.span>
                Explore Our Portfolio
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Enhanced Process Card Component */
function ProcessCard({ icon, title, body, step, variants, transition }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-sm backdrop-blur cursor-pointer"
      variants={variants}
      transition={transition}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      role="listitem"
      tabIndex={0}
      aria-label={`Step ${step}: ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Could add modal or expanded view here
        }
      }}
    >
      <motion.div
        className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-b from-orange-500 to-amber-400 text-zinc-900 ring-1 ring-white/20"
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-lg">{icon}</span>
      </motion.div>

      <motion.div
        className="mb-2 flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="rounded-full bg-orange-500/20 px-2 py-1 text-xs font-bold text-orange-300">
          {step}
        </span>
      </motion.div>

      <h3 className="text-sm font-extrabold" itemProp="step" itemScope itemType="https://schema.org/HowToStep">
        <span itemProp="name">{title}</span>
      </h3>
      <p className="mt-2 text-[12px] leading-5 text-zinc-300" itemProp="text">{body}</p>

      {/* Progress indicator */}
      <motion.div
        className="mt-4 h-1 w-full rounded-full bg-white/10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
          initial={{ width: 0 }}
          animate={isHovered ? { width: "100%" } : { width: "30%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
  