import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Award, Globe, Users, Calendar, Trophy, Handshake, Lightbulb, Heart, LucideIcon } from 'lucide-react';

interface ImpactStat {
  icon: LucideIcon;
  mainText: string;
  subTextBold: string;
  subTextItalic: string;
  ariaLabel: string;
}

interface Achievement {
  icon: LucideIcon;
  text: string;
  ariaLabel: string;
}

const GlobalImpact: React.FC = () => {
  // Memoize data for performance
  const impactStats: ImpactStat[] = useMemo(() => [
    {
      icon: Award,
      mainText: '500+',
      subTextBold: 'PROJECTS DELIVERED',
      subTextItalic: 'Award-winning productions',
      ariaLabel: 'Over 500 successful projects delivered'
    },
    {
      icon: Globe,
      mainText: '15+',
      subTextBold: 'AFRICAN COUNTRIES',
      subTextItalic: 'Continental presence',
      ariaLabel: 'Presence in over 15 African countries'
    },
    {
      icon: Users,
      mainText: '20+',
      subTextBold: 'PARTNERS',
      subTextItalic: 'Global audience impact',
      ariaLabel: 'Over 20 strategic partners worldwide'
    },
    {
      icon: Calendar,
      mainText: '10+',
      subTextBold: 'YEARS OF EXCELLENCE',
      subTextItalic: 'Excellence guaranteed',
      ariaLabel: 'Over 10 years of excellence in the industry'
    }
  ], []);

  const achievements: Achievement[] = useMemo(() => [
    {
      icon: Trophy,
      text: 'INDUSTRY RECOGNITION',
      ariaLabel: 'Industry recognition and awards'
    },
    {
      icon: Handshake,
      text: 'STRATEGIC PARTNERSHIPS',
      ariaLabel: 'Strategic partnerships with global organizations'
    },
    {
      icon: Lightbulb,
      text: 'INNOVATION LEADERSHIP',
      ariaLabel: 'Leadership in audiovisual innovation'
    },
    {
      icon: Heart,
      text: 'COMMUNITY IMPACT',
      ariaLabel: 'Positive impact on African communities'
    }
  ], []);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.6 }
    },
  };

  return (
    <motion.section
      className="bg-gradient-to-b from-background via-muted/30 to-background rounded-3xl p-8 max-w-7xl mx-auto font-sans border border-primary/20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      aria-labelledby="impact-heading"
      role="region"
    >
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        Skip to main content
      </a>

      {/* Badge and Heading Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-bold rounded-full px-6 py-3 text-sm uppercase tracking-wide shadow-glow"
          role="banner"
          aria-label="Measurable Impact section badge"
        >
          <Award className="w-5 h-5" aria-hidden="true" />
          MEASURABLE IMPACT
        </span>
      </motion.div>

      <motion.h2
        id="impact-heading"
        className="text-4xl md:text-5xl font-extrabold gradient-text mb-6 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Numbers that tell our story of growth and excellence
      </motion.h2>

      <motion.p
        className="text-muted-foreground max-w-4xl mx-auto mb-12 text-lg leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Transforming Africa's story through measurable excellence across continents, creating powerful narratives that
        inspire change and celebrate African innovation on the world stage.
      </motion.p>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        role="region"
        aria-labelledby="impact-heading"
      >
        {impactStats.map(({ icon: Icon, mainText, subTextBold, subTextItalic, ariaLabel }, idx) => (
          <motion.div
            key={idx}
            className="glass-card rounded-2xl p-8 hover-lift group"
            variants={item}
            whileHover={{
              y: -5,
              boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.3)',
              transition: { duration: 0.2 }
            }}
            role="article"
            aria-label={ariaLabel}
            tabIndex={0}
          >
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
              <Icon className="w-8 h-8 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="text-4xl font-extrabold gradient-text mb-3" aria-hidden="true">
              {mainText}
            </div>
            <div className="uppercase font-bold text-primary text-sm mb-2 tracking-wider">
              {subTextBold}
            </div>
            <div className="italic text-muted-foreground text-sm">{subTextItalic}</div>
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
        role="region"
        aria-label="Achievement highlights"
      >
        {achievements.map(({ icon: Icon, text, ariaLabel }, idx) => (
          <motion.button
            key={idx}
            className="glass-card rounded-xl py-4 px-6 text-sm font-bold uppercase tracking-wide hover-lift group transition-all duration-300 flex items-center justify-center gap-2"
            variants={item}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            aria-label={ariaLabel}
            tabIndex={0}
          >
            <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
            <span className="text-foreground group-hover:text-primary transition-colors">{text}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Structured Data for SEO - WebPage Schema for Impact Section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Measurable Impact - Our Achievements & Statistics",
            "description": "Discover GoodAV's measurable impact with 500+ projects across 15+ African countries, showcasing our growth and excellence in audiovisual production",
            "url": "https://goodav.net#impact",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Key Performance Indicators",
              "description": "Statistical achievements and measurable impact metrics",
              "numberOfItems": 4,
              "itemListElement": [
                {
                  "@type": "PropertyValue",
                  "name": "Projects Delivered",
                  "value": "500+",
                  "description": "Award-winning audiovisual productions completed"
                },
                {
                  "@type": "PropertyValue",
                  "name": "African Countries",
                  "value": "15+",
                  "description": "Continental presence across Africa"
                },
                {
                  "@type": "PropertyValue",
                  "name": "Strategic Partners",
                  "value": "20+",
                  "description": "Global partnerships and collaborations"
                },
                {
                  "@type": "PropertyValue",
                  "name": "Years of Excellence",
                  "value": "10+",
                  "description": "Years of industry excellence and innovation"
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
    </motion.section>
  );
};

export default GlobalImpact;
