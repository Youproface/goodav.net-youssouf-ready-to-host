import React, { useMemo, useState } from "react";
import VideoPlaceholder from './VideoPlaceholder';
import { motion, Variants } from "framer-motion";
import { BookOpen, Globe2, Award, Handshake, Lightbulb, CheckCircle2, Play, Rocket, Film, Users, Eye, Calendar, LucideIcon } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  ariaLabel: string;
}

interface StatItem {
  icon: LucideIcon;
  value: string;
  title: string;
  desc: string;
  ariaLabel: string;
}

interface HighlightItem {
  text: string;
  ariaLabel: string;
}

const OurJourney: React.FC = () => {
  const timelineItems: TimelineItem[] = useMemo(() => [
    {
      year: "2019",
      title: "Founded with a vision",
      description: "Established with revolutionary vision to elevate African storytelling"
    },
    {
      year: "2021",
      title: "Pan-African expansion",
      description: "Expanded operations across multiple African countries"
    },
    {
      year: "2024",
      title: "AI integration pioneer",
      description: "Became pioneer in AI-powered content creation"
    }
  ], []);

  const featureCards: FeatureCard[] = useMemo(() => [
    {
      icon: Globe2,
      title: "Continental Reach",
      description: "Operating across 15+ African countries with deep cultural understanding",
      ariaLabel: "Continental reach across 15+ African countries"
    },
    {
      icon: Award,
      title: "Excellence Recognized",
      description: "Award-winning productions that have garnered international acclaim",
      ariaLabel: "Award-winning productions with international recognition"
    },
    {
      icon: Handshake,
      title: "Trusted Partnerships",
      description: "Collaborating with leading organizations and international bodies",
      ariaLabel: "Trusted partnerships with leading organizations"
    },
    {
      icon: Lightbulb,
      title: "Innovation Pioneer",
      description: "Leading AI-powered content creation and cutting-edge technology adoption",
      ariaLabel: "Innovation pioneer in AI-powered content creation"
    }
  ], []);

  const stats: StatItem[] = useMemo(() => [
    {
      icon: Film,
      value: "500+",
      title: "Projects Delivered",
      desc: "Across multiple industries",
      ariaLabel: "Over 500 projects delivered across multiple industries"
    },
    {
      icon: Users,
      value: "50+",
      title: "Partners",
      desc: "Long-term partnerships",
      ariaLabel: "Over 20 long-term strategic partners"
    },
    {
      icon: Globe2,
      value: "15+",
      title: "Countries",
      desc: "Continental presence",
      ariaLabel: "Presence in over 15 African countries"
    },
    {
      icon: Calendar,
      value: "10+",
      title: "Years of Experience",
      desc: "In the industry",
      ariaLabel: "Over 10 years of industry experience"
    }
  ], []);
  const [play, setPlay] = useState(false);
  const videoId = "e8DZQifSpcY";

  // Memoize data for performance
  // ...existing code...

  const highlights: HighlightItem[] = useMemo(() => [
    {
      text: "Customer-centric approach with cultural sensitivity",
      ariaLabel: "Customer-centric approach with cultural sensitivity"
    },
    {
      text: "Quality & reliability through proven methodologies",
      ariaLabel: "Quality and reliability through proven methodologies"
    },
    {
      text: "Diversity & inclusion as core business values",
      ariaLabel: "Diversity and inclusion as core business values"
    },
    {
      text: "Impact-driven solutions that create lasting change",
      ariaLabel: "Impact-driven solutions that create lasting change"
    }
  ], []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  };

  return (
    <>
      {/* Our Journey Section */}
      <motion.section
        className="relative bg-gradient-to-b from-background via-muted/30 to-background text-foreground py-16 px-6 md:px-12 lg:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        aria-labelledby="journey-heading"
        role="region"
      >
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Skip to main content
        </a>

        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={itemVariants}
        >
          {/* Left Content */}
          <motion.div variants={itemVariants}>
            {/* Section Tag */}
            <motion.div
              className="flex items-center gap-2 mb-4"
              variants={itemVariants}
            >
              <span
                className="flex items-center gap-2 bg-gradient-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium shadow-glow"
                role="banner"
                aria-label="Our Journey section badge"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" /> OUR JOURNEY
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              id="journey-heading"
              className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
              variants={itemVariants}
            >
              From Vision to Continental Impact
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              className="text-muted-foreground mb-4"
              variants={itemVariants}
            >
              <span className="text-primary font-semibold">GOODAV</span> emerged
              from a revolutionary vision: to elevate African storytelling to global
              standards while preserving cultural authenticity. Founded by passionate
              creators who understood the power of visual narrative, we've transformed
              from a local production house into Africa's most trusted audiovisual
              partner.
            </motion.p>

            <motion.p
              className="text-muted-foreground"
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
              variants={containerVariants}
              role="region"
              aria-label="Company timeline milestones"
            >
              {timelineItems.map(({ year, title, description }, idx) => (
                <motion.div
                  key={idx}
                  className="glass-card rounded-lg px-5 py-4 text-center hover-lift group transition-all duration-300"
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  role="article"
                  aria-label={`Milestone ${year}: ${title}`}
                  tabIndex={0}
                >
                  <h3 className="text-primary text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {year}
                  </h3>
                  <p className="text-foreground font-semibold text-sm mb-1">{title}</p>
                  <p className="text-muted-foreground text-xs">{description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Feature Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            role="region"
            aria-label="Company achievements and capabilities"
          >
            {featureCards.map(({ icon: Icon, title, description, ariaLabel }, idx) => (
              <motion.div
                key={idx}
                className="glass-card p-6 hover-lift group transition-all duration-300"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                role="article"
                aria-label={ariaLabel}
                tabIndex={0}
              >
                <Icon className="text-primary w-6 h-6 mb-3 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <h4 className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                  {title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Measurable Impact Section */}
      <motion.section
        className="relative bg-gradient-to-b from-background via-muted/30 to-background text-foreground py-16 px-6 md:px-12 lg:px-20 mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        aria-labelledby="impact-heading"
        role="region"
      >
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={itemVariants}
        >
          {/* Heading */}
          <motion.h2
            id="impact-heading"
            className="text-2xl md:text-3xl font-bold tracking-wide gradient-text mb-2"
            variants={itemVariants}
          >
            MEASURABLE IMPACT
          </motion.h2>
          <motion.p
            className="text-muted-foreground mt-2 mb-10"
            variants={itemVariants}
          >
            Numbers that tell our story of growth and excellence
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            role="region"
            aria-label="Company performance statistics"
          >
            {stats.map(({ icon: Icon, value, title, desc, ariaLabel }, idx) => (
              <motion.div
                key={idx}
                className="glass-card flex flex-col items-center justify-center p-6 hover-lift group transition-all duration-300"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.3)",
                  transition: { duration: 0.2 }
                }}
                role="article"
                aria-label={ariaLabel}
                tabIndex={0}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
                  {value}
                </h3>
                <p className="font-semibold text-foreground mt-1">{title}</p>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Future Innovation Section */}
      <motion.section
        className="relative bg-gradient-to-b from-background via-muted/30 to-background text-foreground py-16 px-6 md:px-12 lg:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        aria-labelledby="innovation-heading"
        role="region"
      >
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          variants={itemVariants}
        >
          {/* Left: Video Section */}
          <motion.div
            className="relative rounded-2xl glass-card overflow-hidden flex items-center justify-center aspect-video shadow-glow"
            variants={itemVariants}
          >
            <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-glow">
              AI-POWERED
            </span>

            <VideoPlaceholder
              videoId={videoId}
              title="AI-Powered Visual Marketing"
              subtitle="Showcasing our cutting-edge innovation capabilities"
              // provide an explicit high-res thumbnail to ensure the image is visible
              thumbnail={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              className="rounded-2xl"
            />
          </motion.div>

          {/* Right: Text + Highlights */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="flex items-center gap-3 mb-4"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Rocket className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h2
                id="innovation-heading"
                className="text-2xl md:text-3xl font-bold gradient-text"
              >
                Pioneering the Future of Storytelling
              </h2>
            </motion.div>

            <motion.p
              className="text-muted-foreground mb-6"
              variants={itemVariants}
            >
              Our commitment to innovation drives us to explore emerging technologies,
              from AI-powered content creation to immersive storytelling experiences.
              We're not just keeping pace with the future—we're creating it.
            </motion.p>

            {/* Highlights */}
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              role="list"
              aria-label="Innovation highlights and commitments"
            >
              {highlights.map(({ text, ariaLabel }, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-2"
                  variants={itemVariants}
                  role="listitem"
                  aria-label={ariaLabel}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-foreground">{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Structured Data for SEO - Journey Page Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Our Journey - From Vision to Continental Impact",
            "description": "Discover GoodAV's journey from vision to continental impact, showcasing our evolution, achievements, and commitment to African storytelling excellence",
            "url": "https://goodav.net/journey",
            "mainEntity": {
              "@type": "Organization",
              "name": "GoodAV",
              "description": "Africa's premier audiovisual storytelling company on a journey of innovation and impact",
              "foundingDate": "2019",
              "url": "https://goodav.net",
              "areaServed": {
                "@type": "Continent",
                "name": "Africa"
              },
              "numberOfEmployees": "50+",
              "knowsAbout": [
                "Audiovisual Production",
                "African Storytelling",
                "Documentary Filmmaking",
                "Video Production",
                "Cultural Preservation",
                "Digital Media",
                "Event Coverage",
                "Photography",
                "AI-Powered Content Creation",
                "Live Streaming Technologies"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Audiovisual Services",
                "description": "Comprehensive audiovisual production services with African authenticity"
              },
              "founder": {
                "@type": "Person",
                "name": "Youssouf Hakizimana",
                "jobTitle": "Founder & CEO"
              },
              "milestone": [
                {
                  "@type": "Event",
                  "name": "Company Founding",
                  "startDate": "2019",
                  "description": "Founded with revolutionary vision to elevate African storytelling"
                },
                {
                  "@type": "Event",
                  "name": "Pan-African Expansion",
                  "startDate": "2021",
                  "description": "Expanded operations across multiple African countries"
                },
                {
                  "@type": "Event",
                  "name": "AI Integration Pioneer",
                  "startDate": "2024",
                  "description": "Became pioneer in AI-powered content creation"
                }
              ]
            },
            "isPartOf": {
              "@type": "WebSite",
              "name": "GoodAV",
              "url": "https://goodav.net"
            }
          })
        }}
      />
    </>
  );
}

export default OurJourney;
