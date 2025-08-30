import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Video, Camera, Radio, Mic, Speaker, Lightbulb, ArrowRight, Handshake, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '@/data/services';

const ServicesSection = () => {
  // Using services data from the services.ts file

  const serviceStats = [
    { number: "6", label: "Core Services" },
    { number: "15+", label: "Countries" },
    { number: "200+", label: "Projects" }
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
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
    >
      <div className="container mx-auto px-4">
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
          >
            <motion.div
              initial={{ rotate: -30, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            >
              <Rocket />
            </motion.div>
            OUR SERVICES
          </motion.div>
          <motion.h2 
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

          {/* Service Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {serviceStats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={statItem(index)}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-black gradient-text mb-1">
                  {stat.number}
                </div>
                <div className="text-base lg:text-lg text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => {
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
              >
                {/* Icon */}
                <motion.div 
                  className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300"
                  whileHover={{ 
                    rotate: 10,
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                >
                  <IconComponent className="h-6 w-6 text-primary-foreground" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-base lg:text-lg text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <motion.ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: 0.2 + (featureIndex * 0.1),
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"
                        initial={{ scale: 0 }}
                        whileInView={{ 
                          scale: 1,
                          transition: { 
                            delay: 0.1 + (featureIndex * 0.1),
                            type: 'spring',
                            stiffness: 500,
                            damping: 20
                          }
                        }}
                        viewport={{ once: true }}
                      />
                      <span className="text-sm lg:text-base text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Learn More Button */}
                <Link to={`/services/${service.id}`}>
                  <Button variant="outline" size="lg" className="mt-4 group text-base">
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="flex items-center"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;