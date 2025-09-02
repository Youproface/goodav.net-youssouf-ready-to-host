
import React from "react";
import { motion, Variants } from "framer-motion";
import { Rocket, Target, Lightbulb, Award, Calendar } from "lucide-react";

interface StoryItem {
  year: string;
  title: string;
  description: string;
  images?: string[];
}

const founderStory: StoryItem[] = [
  {
    year: "2010",
    title: "The Beginning",
    description:
      "Started with a powerful belief: every story deserves to be told with authenticity, impact, and precision.",
    images: [
  "/images/all_site_images/Home/TIMELINE/2010-The Beginning-1.jpg",
  "/images/all_site_images/Home/TIMELINE/2010-The-Beginning-2.jpg",
    ],
  },
  {
    year: "2015",
    title: "Building Expertise",
    description:
      "Developed mastery across video production, photography, live streaming, and audio creation throughout Rwanda and East Africa.",
    images: [
  "/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-1.jpg",
  "/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-2.jpg",
  "/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-3.jpg",
  "/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-4.jpg",
    ],
  },
  {
    year: "2019",
    title: "GoodAV Founded",
    description:
      "Established GoodAV with the mission to showcase Africa's rich heritage while empowering clients to amplify their unique stories.",
    images: [
      "/images/all_site_images/Home/TIMELINE/2019-GoodAV Founded-1.jpg",
      "/images/all_site_images/Home/TIMELINE/2019-GoodAV Founded-2.jpg",
      "/images/all_site_images/Home/TIMELINE/2019-GoodAV Founded-3.jpg",
    ],
  },
  {
    year: "2025",
    title: "Leading the Industry",
    description:
      "Recognized as Rwanda's premier audiovisual agency, creating content that inspires and transforms communities across Africa.",
    images: [
  "/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-1.jpg",
  "/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-2.jpg",
  "/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-3.jpg",
  "/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-4.jpg",
  "/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-5.jpg",
  "/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-6.webp",
    ],
  },
];

/** Motion variants */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function FoundersVision() {
  return (
    <section className="relative bg-gradient-to-b from-[#0e0e0e] to-black text-white py-20 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-4 flex justify-center">
            "/images/all_site_images/Home/TIMELINE/2010-The Beginning-1.jpg",
            "/images/all_site_images/Home/TIMELINE/2010-The-Beginning-2.jpg",
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-orange-400"
          >
            Our Founder’s Vision
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg md:text-xl lg:text-2xl xl:text-[28px] text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Transforming Africa’s narrative through authentic storytelling and cutting-edge
            innovation.
          </motion.p>
        </motion.header>

        {/* Founder Card */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mt-12"
          aria-labelledby="founder-heading"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 lg:p-10"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              {/* Avatar / Image placeholder */}
              <div className="relative h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded-full overflow-hidden">
                <img
                  src="/images/all_site_images/Home/founder/Founder&CEO.jpeg"
                  alt="Founder"
                  className="object-cover"
                />
                <span className="sr-only">Photo of Founder</span>
              </div>
              {/* Text */}
              <div className="text-center md:text-left">
                <h3 id="founder-heading" className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                  Youssouf Hakizimana
                </h3>
                <p className="text-orange-300/90 text-base md:text-lg lg:text-xl">Founder &amp; CEO</p>
                <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl leading-relaxed">
                  A visionary multimedia artist with over a decade of experience transforming
                  Africa&apos;s audiovisual landscape through authentic storytelling and
                  innovative technology.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="relative mt-16"
          aria-labelledby="timeline-heading"
        >
          <h3 id="timeline-heading" className="sr-only">
            Journey Timeline
          </h3>

          {/* Grid: [Year] [Line] [Content] */}
          <div className="grid grid-cols-[9rem_1px_1fr] md:grid-cols-[10rem_1px_1fr] lg:grid-cols-[12rem_1px_1fr]">
            {/* Global vertical line */}
            <div className="col-start-2 row-span-full w-px bg-gradient-to-b from-transparent via-orange-500/60 to-transparent pointer-events-none" />

            {founderStory.map((event) => (
              <React.Fragment key={`${event.year}-${event.title}`}>
                {/* Year */}
                <motion.div
                  variants={itemVariants}
                  className="col-start-1 pr-4 md:pr-6 py-7 flex items-start justify-end"
                >
                  <div className="flex items-center gap-2 text-base md:text-lg lg:text-xl text-gray-300">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-orange-400" aria-hidden="true" />
                    <span className="tabular-nums font-medium">{event.year}</span>
                  </div>
                </motion.div>

                {/* Line + dot */}
                <div className="col-start-2 relative py-7">
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-orange-500/40" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-8">
                    <span className="block h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 rounded-full bg-orange-500 ring-4 ring-orange-500/20" />
                  </div>
                </div>

                {/* Content */}
                <motion.div variants={itemVariants} className="col-start-3 py-7 pl-6">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-5 md:p-6 lg:p-7 hover:bg-white/7 transition">
                    <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-snug mb-4">
                      {event.title}
                    </h4>
                    <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
                      {event.description}
                    </p>
                    {event.images.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {event.images.map((image) => (
                          <div key={image} className="aspect-square overflow-hidden rounded-lg bg-black/20">
                            <img 
                              src={image} 
                              alt={event.title} 
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mt-16"
          aria-labelledby="values-heading"
        >
          <h3 id="values-heading" className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-orange-400 tracking-tight">
          Ethical Standards
          </h3>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ValueCard
              icon={<Lightbulb className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />}
              title="Innovation"
              description="Continuously embracing new technologies to deliver meaningful visual stories that inspire."
            />
            <ValueCard
              icon={<Target className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />}
              title="Authenticity"
              description="Rooted in truth, ensuring our stories reflect the voices and realities of our communities."
            />
            <ValueCard
              icon={<Rocket className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />}
              title="Impact"
              description="Creating stories that drive positive change and amplify underrepresented voices worldwide."
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm md:text-base lg:text-lg text-gray-400">
            <span className="inline-flex items-center gap-2">
              <Award className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-orange-400" />
              Recognized Creative Excellence
            </span>
            <span className="inline-flex items-center gap-2">
              <Rocket className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-orange-400" />
              Innovation-led Production
            </span>
          </div>
        </motion.section>
      </div>
    </section>
  );
}

/** Small card for values */
function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
      }}
      className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-7 lg:p-8"
    >
      <div className="flex items-center gap-3 text-orange-300">
        <span className="grid h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 place-items-center rounded-full bg-orange-500/15 text-orange-400">
          {icon}
        </span>
        <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">{title}</h4>
      </div>
      <p className="mt-3 text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}