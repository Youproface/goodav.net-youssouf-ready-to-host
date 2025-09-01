import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Users, Globe, Briefcase, Award } from 'lucide-react';

// Import partner logos
const partnerLogos = Array.from({ length: 31 }, (_, i) => ({
  id: i + 1,
  logo: `/images/all_site_images/Home/Partners/All/partner-logo-${i + 1}.${i + 1 === 20 ? 'png' : 'jpg'}`,
  alt: `Partner Logo ${i + 1}`
}));

const PartnersSection = () => {
  const partners = partnerLogos;

  const partnershipStats = [
    { number: "20+", label: "Partners", icon: <Users className="h-6 w-6" /> },
    { number: "5+", label: "Countries", icon: <Globe className="h-6 w-6" /> },
    { number: "500+", label: "Projects", icon: <Briefcase className="h-6 w-6" /> },
    { number: "10+", label: "Years of Excellence", icon: <Award className="h-6 w-6" /> }
  ];

  return (
    <section id="partners" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] py-2 px-5 rounded-full text-white font-semibold inline-flex items-center gap-2 mb-5 shadow-[0_4px_15px_rgba(255,107,83,0.4)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Handshake className="h-5 w-5 text-white-500" />
            TRUSTED PARTNERSHIPS
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Strategic <span className="gradient-text">Partnerships</span><br />
            <span className="gradient-text">Driving Impact Together</span>  
          </motion.h2>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h3 
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Building Africa's Future Through Collaboration
            </motion.h3>
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              We partner with leading global organizations, international development agencies, and innovative African enterprises to amplify stories that matter. Our strategic alliances span healthcare, education, technology, and social impact sectors, creating powerful narratives that drive meaningful change across the continent and beyond.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Partnership Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
        >
          {partnershipStats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,107,83,0.12)]"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="text-[#ff6b35] mb-3"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Logo Rows */}
        <div className="space-y-8 mt-12">
          {/* First row - scrolls right */}
          <motion.div 
            className="relative overflow-hidden py-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex whitespace-nowrap"
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <motion.div 
                  key={`first-${partner.id}-${index}`}
                  className="inline-flex items-center justify-center px-6 mx-3 h-16 w-40 flex-shrink-0"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.img 
                    src={partner.logo} 
                    alt={partner.alt} 
                    className="h-full w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
            {/* <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black to-transparent z-10"></div> */}
          </motion.div>

          {/* Second row - scrolls left */}
          <motion.div 
            className="relative overflow-hidden py-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="flex whitespace-nowrap"
              animate={{
                x: ['-50%', '0%'],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...partners].reverse().map((partner, index) => (
                <motion.div 
                  key={`second-${partner.id}-${index}`}
                  className="inline-flex items-center justify-center px-6 mx-3 h-16 w-40 flex-shrink-0"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.img 
                    src={partner.logo} 
                    alt={partner.alt} 
                    className="h-full w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>
              ))}
              {[...partners].reverse().map((partner, index) => (
                <motion.div 
                  key={`second-dupe-${partner.id}-${index}`}
                  className="inline-flex items-center justify-center px-6 mx-3 h-16 w-40 flex-shrink-0"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.img 
                    src={partner.logo} 
                    alt={partner.alt} 
                    className="h-full w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
            {/* <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black to-transparent z-10"></div> */}
          </motion.div>
        </div>

        {/* Partnership Duration */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-6 py-3 glass-card rounded-full">
            <span className="text-2xl font-bold gradient-text mr-2">5+</span>
            <span className="text-muted-foreground">Years Average Partnership</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;