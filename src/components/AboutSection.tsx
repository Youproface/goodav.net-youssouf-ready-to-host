import React, { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Heart, Award, Globe2, Lightbulb, Play, Calendar, Users, Star, LucideIcon } from "lucide-react";

interface FeatureItem {
  icon: LucideIcon;
  text: string;
  ariaLabel: string;
}

const AboutSection: React.FC = () => {
  const [play, setPlay] = useState(false);
  const videoId = "HyHigPOWxYs";

  // Memoize data for performance
  const features: FeatureItem[] = useMemo(() => [
    {
      icon: Award,
      text: 'Award-Winning',
      ariaLabel: 'Award-winning audiovisual production company'
    },
    {
      icon: Globe2,
      text: 'Pan-African',
      ariaLabel: 'Pan-African presence across the continent'
    },
    {
      icon: Lightbulb,
      text: 'Innovation-Driven',
      ariaLabel: 'Innovation-driven approach to storytelling'
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

  const buttonVariants: Variants = {
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
    <motion.section
      className="relative bg-gradient-to-b from-background via-muted/30 to-background text-foreground py-16 px-6 md:px-12 lg:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      aria-labelledby="about-heading"
      role="region"
    >
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        Skip to main content
      </a>

      {/* Section Tag */}
      <motion.div
        className="flex justify-center mb-6"
        variants={itemVariants}
      >
        <span
          className="bg-gradient-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-glow"
          role="banner"
          aria-label="About Us section badge"
        >
          <Heart className="w-4 h-4" aria-hidden="true" /> ABOUT US
        </span>
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center max-w-3xl mx-auto"
        variants={itemVariants}
      >
        <p className="uppercase text-sm tracking-widest text-muted-foreground mb-2">CRAFTING</p>
        <h2
          id="about-heading"
          className="text-3xl md:text-5xl font-extrabold mb-2 gradient-text"
        >
          AUTHENTIC STORIES
        </h2>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
          <p className="text-muted-foreground text-sm">SINCE 2019</p>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          We are Africa's premier audiovisual storytellers, transforming authentic narratives into
          compelling visual experiences that resonate globally while honoring our continental heritage.
        </p>
      </motion.div>

      {/* Feature Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-8"
        variants={containerVariants}
        role="region"
        aria-label="Company features and achievements"
      >
        {features.map(({ icon: Icon, text, ariaLabel }, idx) => (
          <motion.button
            key={idx}
            className="glass-card flex items-center gap-2 px-5 py-3 hover-lift group transition-all duration-300"
            variants={buttonVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            aria-label={ariaLabel}
            tabIndex={0}
          >
            <Icon className="text-primary w-5 h-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
            <span className="text-foreground group-hover:text-primary transition-colors">{text}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Video Section */}
      <motion.div
        className="flex justify-center mt-12"
        variants={itemVariants}
      >
        <div className="relative w-full md:w-3/4 lg:w-2/3 glass-card rounded-xl overflow-hidden shadow-glow">
          {/* Video Container */}
          <div className="flex items-center justify-center h-64 md:h-96 bg-gradient-to-b from-muted to-background">
            {!play ? (
              <>
                {/* Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="GoodAV: Crafting Authentic Stories - Video Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.button
                    className="w-16 h-16 flex items-center justify-center bg-gradient-primary rounded-full hover-lift shadow-glow group"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    onClick={() => setPlay(true)}
                    aria-label="Play video: GoodAV Impactful Storytelling"
                    tabIndex={0}
                  >
                    <Play className="w-8 h-8 text-primary-foreground ml-1 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  </motion.button>
                </div>
              </>
            ) : (
              // YouTube iframe replaces thumbnail
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="GoodAV: Crafting Authentic Stories - Our Journey and Vision"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>

          {/* Caption */}
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-white">GoodAV: Impactful Storytelling</h3>
            <p className="text-gray-300 text-sm">Our journey and vision for the future</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Structured Data for SEO - About Page Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About GoodAV - Crafting Authentic Stories",
            "description": "Learn about GoodAV, Africa's premier audiovisual storytelling company since 2019, crafting authentic narratives that resonate globally",
            "url": "https://goodav.net/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "GoodAV",
              "description": "Africa's premier audiovisual storytellers, transforming authentic narratives into compelling visual experiences",
              "foundingDate": "2019",
              "url": "https://goodav.net",
              "areaServed": {
                "@type": "Continent",
                "name": "Africa"
              },
              "knowsAbout": [
                "Audiovisual Production",
                "African Storytelling",
                "Documentary Filmmaking",
                "Video Production",
                "Cultural Preservation",
                "Digital Media",
                "Event Coverage",
                "Photography"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Audiovisual Services",
                "description": "Comprehensive audiovisual production services with African authenticity"
              }
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

export default AboutSection;
