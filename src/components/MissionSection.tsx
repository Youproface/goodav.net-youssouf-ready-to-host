import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Award, Globe, Heart, Target, Users, Zap, LucideIcon } from 'lucide-react';
import OurFoundationSection from './OurFoundationSection';

interface CoreValue {
  title: string;
  description: string;
}

interface WhyChooseUs {
  icon: LucideIcon;
  title: string;
  description: string;
}

const MissionSection: React.FC = () => {
  // Memoize data to prevent unnecessary re-renders
  const coreValues: CoreValue[] = useMemo(() => [
    {
      title: "Pan-African Unity",
      description: "Fostering collaboration across Africa's 54 nations, celebrating our diversity while strengthening our collective narrative through unified storytelling excellence."
    },
    {
      title: "Authentic Representation",
      description: "Preserving and presenting Africa's rich heritage with integrity, ensuring every story honors our traditions while embracing contemporary innovation."
    },
    {
      title: "Innovation Leadership",
      description: "Pioneering cutting-edge audiovisual technologies and creative methodologies that set new standards for storytelling excellence across the continent."
    }
  ], []);

  const whyChooseUs: WhyChooseUs[] = useMemo(() => [
    {
      icon: Award,
      title: "Award-Winning Portfolio",
      description: "Internationally recognized excellence with 500+ successful projects across 15+ African countries, delivering measurable impact and client satisfaction."
    },
    {
      icon: Heart,
      title: "Cultural Intelligence",
      description: "Deep understanding of African contexts combined with global expertise, ensuring content that resonates authentically across diverse audiences worldwide."
    },
    {
      icon: Zap,
      title: "Future-Ready Solutions",
      description: "State-of-the-art technology and innovative approaches delivering powerful, future-proof content that drives engagement and creates lasting impact."
    }
  ], []);

  const impactBadges = useMemo(() => [
    { icon: Award, text: "Award-Winning Excellence", ariaLabel: "Award-winning excellence in audiovisual production" },
    { icon: Globe, text: "Global Reach", ariaLabel: "Global reach across multiple continents" },
    { icon: Heart, text: "Cultural Authenticity", ariaLabel: "Authentic representation of African culture" }
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
      id="mission-section"
      className="py-20 bg-background"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      aria-labelledby="mission-heading"
      role="region"
    >
      <div className="container mx-auto px-4">
        {/* Skip Link for Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          Skip to main content
        </a>
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-primary font-semibold text-sm uppercase tracking-wider mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            role="banner"
            aria-label="African Creators section badge"
          >
            AFRICAN CREATORS
          </motion.div>
          <motion.h2
            id="mission-heading"
            className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.span
              className="gradient-text block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              TRANSFORMING
            </motion.span>
            <motion.span
              className="gradient-text block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              AFRICA'S NARRATIVE
            </motion.span>
            <motion.span
              className="gradient-text block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              GLOBALLY
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We are more than storytellers—we are cultural ambassadors crafting authentic African narratives
            that command global attention and drive meaningful change across continents.
          </motion.p>
        </motion.div>

        {/* Impact Badges */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          role="region"
          aria-labelledby="impact-badges-heading"
        >
          <h3 id="impact-badges-heading" className="sr-only">Our Impact Highlights</h3>
          {impactBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                className="text-center p-6 glass-card rounded-xl hover-lift"
                variants={item}
                whileHover={{
                  y: -3,
                  transition: { duration: 0.15 }
                }}
                role="article"
                aria-label={badge.ariaLabel}
                tabIndex={0}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: 0.1 + (index * 0.08),
                      type: 'spring',
                      stiffness: 250,
                      damping: 20
                    }
                  }}
                  viewport={{ once: true }}
                  aria-hidden="true"
                >
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                </motion.div>
                <div className="font-bold text-foreground">{badge.text}</div>
              </motion.div>
            );
          })}
        </motion.div>
        <OurFoundationSection/>
        {/* Core Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.h3
              id="core-values-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="gradient-text">OUR CORE VALUES</span>
            </motion.h3>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              The pillars that guide our work and define who we are
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            role="region"
            aria-labelledby="core-values-heading"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="p-6 glass-card rounded-xl hover-lift"
                variants={item}
                whileHover={{
                  y: -3,
                  transition: { duration: 0.15 }
                }}
                role="article"
                aria-labelledby={`core-value-${index}-title`}
                tabIndex={0}
              >
                <h4 
                  id={`core-value-${index}-title`}
                  className="text-xl font-bold mb-3 text-primary"
                >
                  {value.title}
                </h4>
                <p 
                  className="text-muted-foreground"
                  aria-describedby={`core-value-${index}-title`}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.h3
              id="why-choose-us-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="gradient-text">WHY CHOOSE US</span>
            </motion.h3>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Unmatched expertise and dedication to excellence
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            role="region"
            aria-labelledby="why-choose-us-heading"
          >
            {whyChooseUs.map((choiceItem, index) => {
              const Icon = choiceItem.icon;
              return (
                <motion.div
                  key={index}
                  className="p-6 glass-card rounded-xl hover-lift group"
                  variants={item}
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.15 }
                  }}
                  role="article"
                  aria-labelledby={`why-choose-${index}-title`}
                  tabIndex={0}
                >
                  <div 
                    className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300"
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 
                    id={`why-choose-${index}-title`}
                    className="text-xl font-bold mb-3 group-hover:text-primary transition-colors"
                  >
                    {choiceItem.title}
                  </h4>
                  <p 
                    className="text-muted-foreground"
                    aria-describedby={`why-choose-${index}-title`}
                  >
                    {choiceItem.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Structured Data for SEO - WebPage Schema for Mission Section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Our Mission - Transforming Africa's Narrative Globally",
            "description": "Learn about GoodAV's mission to transform Africa's narrative through authentic storytelling and cultural excellence",
            "url": "https://goodav.net#mission-section",
            "mainEntity": {
              "@type": "Organization",
              "name": "GoodAV",
              "description": "African audiovisual production agency transforming narratives globally through authentic storytelling and cultural excellence",
              "url": "https://goodav.net",
              "foundingDate": "2014",
              "slogan": "Transforming Africa's Narrative Globally",
              "areaServed": [
                {
                  "@type": "Continent",
                  "name": "Africa"
                },
                {
                  "@type": "Country",
                  "name": "Rwanda"
                }
              ],
              "knowsAbout": [
                "African Storytelling",
                "Audiovisual Production",
                "Cultural Preservation",
                "Digital Media",
                "Documentary Filmmaking",
                "Event Coverage",
                "Video Production",
                "Photography",
                "Live Streaming",
                "Audio Production",
                "Sound Engineering",
                "Lighting Design"
              ],
              "value": [
                {
                  "@type": "Thing",
                  "name": "Pan-African Unity",
                  "description": "Fostering collaboration across Africa's 54 nations"
                },
                {
                  "@type": "Thing",
                  "name": "Authentic Representation",
                  "description": "Preserving and presenting Africa's rich heritage with integrity"
                },
                {
                  "@type": "Thing",
                  "name": "Innovation Leadership",
                  "description": "Pioneering cutting-edge audiovisual technologies"
                }
              ],
              "award": [
                "Award-Winning Portfolio",
                "International Recognition",
                "Cultural Excellence Awards"
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

export default MissionSection;
