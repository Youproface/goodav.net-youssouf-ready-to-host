import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';

interface PartnersLogosProps {
  title?: string;
  subtitle?: string;
  className?: string;
  showTrustedBadge?: boolean;
  showTitle?: boolean;
  showSubtitle?: boolean;
  gridCols?: string;
  containerPadding?: string;
}

export default function PartnersLogos({
  title = "Our Valued Partners",
  subtitle = "Building impactful relationships with leading organizations across Africa and beyond to create meaningful audiovisual experiences.",
  className = "",
  showTrustedBadge = true,
  showTitle = true,
  showSubtitle = true,
  gridCols = "grid-cols-2 md:grid-cols-4 lg:grid-cols-6",
  containerPadding = "py-4"
}: PartnersLogosProps) {

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <motion.section 
      className={`max-w-7xl mx-auto px-4 ${containerPadding} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {(showTrustedBadge || showTitle || showSubtitle) && (
        <motion.div className="text-center mb-8" variants={titleVariants}>
          {showTrustedBadge && (
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-300 px-6 py-3 rounded-full backdrop-blur-sm mb-6">
              <FaHandshake className="text-xl" />
              <span className="font-semibold">TRUSTED BY</span>
            </div>
          )}
          
          {showTitle && (
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h2>
          )}
          
          {showTitle && (
            <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
          )}
          
          {showSubtitle && (
            <p className="text-xl text-zinc-300 mt-6 max-w-4xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* Partner Logos Grid */}
      <motion.div 
        className={`grid ${gridCols} gap-6`}
        variants={containerVariants}
      >
        {[
          // Government & International Organizations
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-1.jpg", alt: "Government of Rwanda", category: "Government" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-2.jpg", alt: "USAID", category: "International" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-5.jpg", alt: "African Union", category: "International" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-12.jpg", alt: "UNDP", category: "UN System" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-16.jpg", alt: "UN Women", category: "UN System" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-21.jpg", alt: "United Nations", category: "UN System" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-22.jpg", alt: "UNFPA", category: "UN System" },
          
          // Corporate Partners
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-4.jpg", alt: "Bralirwa", category: "Corporate" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-10.jpg", alt: "MTN", category: "Corporate" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-3.jpg", alt: "Cimerwa", category: "Corporate" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-28.jpg", alt: "Heineken", category: "Corporate" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-19.jpg", alt: "Sonarwa", category: "Corporate" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-23.jpg", alt: "Rwanda Revenue Authority", category: "Government" },
          
          // Development & Financial Institutions
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-7.jpg", alt: "African Development Bank", category: "Financial" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-8.jpg", alt: "Afreximbank", category: "Financial" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-9.jpg", alt: "Challenges Group", category: "Development" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-27.jpg", alt: "Enabel", category: "Development" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-31.jpg", alt: "Zentrum für Fernstudien", category: "Educational" },
          
          // NGOs & Educational Institutions
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-11.jpg", alt: "World Vision", category: "NGO" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-17.jpg", alt: "AIMS", category: "Educational" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-18.jpg", alt: "TechnoServe", category: "NGO" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-29.jpg", alt: "Kepler", category: "Educational" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-30.jpg", alt: "Aegis", category: "Educational" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-6.jpg", alt: "Rwanda Bean", category: "Corporate" },
          
          // Media & Cultural Organizations
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-15.jpg", alt: "Jeune Afrique Media Group", category: "Media" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-24.jpg", alt: "Inyarwanda TV", category: "Media" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-26.jpg", alt: "Echoes of Tradition", category: "Cultural" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-20.jpg", alt: "Miss Rwanda", category: "Cultural" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-13.jpg", alt: "MOPAS", category: "Government" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-14.jpg", alt: "Rwanda Forensic Laboratory", category: "Government" },
          { src: "/images/all_site_images/Home/Partners/All/partner-logo-25.jpg", alt: "Partner Organization", category: "Partner" }
        ].map((partner, index) => (
          <motion.div
            key={partner.alt}
            className="group relative bg-white/5 border border-white/10 rounded-xl p-4 hover:border-orange-500/30 hover:bg-white/8 transition-all duration-300 overflow-hidden"
            variants={itemVariants}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.05 }}
          >
            <div className="relative w-full h-16 flex items-center justify-center">
              <img
                src={partner.src}
                alt={partner.alt}
                className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                loading="lazy"
              />
            </div>
            
            {/* Category Badge */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {partner.category}
              </span>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
