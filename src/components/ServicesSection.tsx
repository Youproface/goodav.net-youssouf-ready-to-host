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
            className="text-lg lg:text-xl text-gray-200 max-w-4xl mx-auto mb-12"
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

        {/* Services List */}
        <h3 id="services-grid-heading" className="sr-only">Our Service Offerings</h3>
        <motion.ul 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          aria-labelledby="services-grid-heading"
        >
          {memoizedServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <li
                key={index}
                aria-labelledby={`service-${service.id}-title`}
                aria-describedby={`service-${service.id}-description`}
              >
                <motion.div 
                  className="p-6 glass-card rounded-xl hover-lift group"
                  variants={item}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
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
                    className="text-base lg:text-lg text-gray-200 mb-4 leading-relaxed"
                  >
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul 
                    className="space-y-2 mb-6"
                    role="list"
                    aria-label={`Key features of ${service.title}`}
                  >
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-start"
                        role="listitem"
                      >
                        <motion.div 
                          className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"
                          initial={{ scale: 0 }}
                          whileInView={{ 
                            scale: 1,
                            transition: { delay: 0.2, duration: 0.3 }
                          }}
                          aria-hidden="true"
                        />
                        <span className="text-gray-100 text-sm lg:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <a
                    href={service.link}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded transition-all duration-200"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
};

export default ServicesSection;