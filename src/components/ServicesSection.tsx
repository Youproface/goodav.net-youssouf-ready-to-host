import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Video, Camera, Radio, Mic, Speaker, Lightbulb, ArrowRight, Handshake, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '@/data/services';

const ServicesSection = () => {
  // Memoize services data to prevent unnecessary re-renders
  const memoizedServices = useMemo(() => services, []);
  
  const serviceStats = useMemo(() => [
    { number: "6", label: "Core Services" },
    { number: "15+", label: "Countries" },
    { number: "200+", label: "Projects" }
  ], []);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const statItem = (i: number): Variants => ({
    hidden: { scale: 0.8, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  });

  return (
    <motion.section 
      className="py-20 bg-gradient-hero"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        show: { 
          opacity: 1,
          transition: { duration: 0.6 }
        }
      }}
      id="services-section"
      aria-labelledby="services-heading"
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
            className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] py-2 px-5 rounded-full text-white font-semibold inline-flex items-center gap-2 mb-5 shadow-[0_4px_15px_rgba(255,107,83,0.4)]"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            role="banner"
            aria-label="Our Services section badge"
          >
            <motion.div
              initial={{ rotate: -30, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
              aria-hidden="true"
            >
              <Rocket />
            </motion.div>
            OUR SERVICES
          </motion.div>
          <motion.h2 
            id="services-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="gradient-text">WHAT WE OFFER</span>
          </motion.h2>
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            From storytelling to technical excellence, we deliver comprehensive audiovisual solutions
            that bring your vision to life with African authenticity and global standards.
          </motion.p>

          {/* Service Stats Removed as requested */}
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          role="grid"
          aria-labelledby="services-grid-heading"
        >
          <h3 id="services-grid-heading" className="sr-only">Our Service Offerings</h3>
          {memoizedServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div 
                key={index}
                className="p-6 glass-card rounded-xl hover-lift group"
                variants={item}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                role="article"
                aria-labelledby={`service-${service.id}-title`}
                aria-describedby={`service-${service.id}-description`}
                tabIndex={0}
              >
                {/* Icon */}
                <motion.div 
                  className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300"
                  whileHover={{ 
                    rotate: 5,
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  aria-hidden="true"
                >
                  <IconComponent className="h-6 w-6 text-primary-foreground" />
                </motion.div>

                {/* Title */}
                <h3 
                  id={`service-${service.id}-title`}
                  className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary transition-colors"
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p 
                  id={`service-${service.id}-description`}
                  className="text-base lg:text-lg text-muted-foreground mb-4 leading-relaxed"
                >
                  {service.description}
                </p>

                {/* Features */}
                <motion.ul 
                  className="space-y-2 mb-6"
                  role="list"
                  aria-label={`Key features of ${service.title}`}
                >
                  {service.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: 0.1 + (featureIndex * 0.05),
                          duration: 0.3
                        }
                      }}
                      viewport={{ once: true }}
                      role="listitem"
                    >
                      <motion.div 
                        className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"
                        initial={{ scale: 0 }}
                        whileInView={{ 
                          scale: 1,
                          transition: { 
                            delay: 0.05 + (featureIndex * 0.05),
                            type: 'spring',
                            stiffness: 300,
                            damping: 15
                          }
                        }}
                        viewport={{ once: true }}
                        aria-hidden="true"
                      />
                      <span className="text-sm lg:text-base text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Learn More Button */}
                <Link 
                  to={`/services/${service.id}`}
                  aria-label={`Learn more about ${service.title} service`}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="mt-4 group text-base"
                    aria-describedby={`service-${service.id}-title`}
                  >
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="flex items-center"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Structured Data for SEO - WebPage Schema for Services Section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Our Services - Professional Audiovisual Production",
            "description": "Comprehensive audiovisual services including video production, photography, live streaming, audio production, sound systems, and lighting services",
            "url": "https://goodav.net#services-section",
            "mainEntity": {
              "@type": "OfferCatalog",
              "name": "Audiovisual Services",
              "description": "Professional audiovisual production services across Africa",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Video Production",
                    "description": "Professional video production services including documentaries, corporate videos, and event coverage"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Photography",
                    "description": "Professional photography services for events, portraits, and commercial projects"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Live Streaming",
                    "description": "Professional live streaming services for conferences, events, and online broadcasts"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Audio Production",
                    "description": "Professional audio production including voice-over, sound design, and podcast production"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Sound System Rental",
                    "description": "Professional sound system rental and audio engineering for events"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Lighting Services",
                    "description": "Professional lighting design and rental for events and productions"
                  }
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

export default ServicesSection;