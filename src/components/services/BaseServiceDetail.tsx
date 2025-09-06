
import React, { useMemo } from 'react';
import { FaRocket, FaFolderOpen, FaLightbulb, FaVideo, FaCamera, FaFilm, FaMicrophone, FaVolumeUp, FaCircle, FaCheckCircle } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ServiceType } from '@/data/services';
import SEO from '@/components/SEO';
import { 
  generateServiceKeywords,
  generateServiceDescription,
  generateServiceTitle,
  generateServiceStructuredData,
  generateServiceFAQStructuredData,
  generateServiceBreadcrumbStructuredData
} from '@/utils/servicesSEO';

interface BaseServiceDetailProps {
  service: ServiceType;
  children?: React.ReactNode;
}


const BaseServiceDetail: React.FC<BaseServiceDetailProps> = ({ service, children }) => {
  const navigate = useNavigate();
  const { title, details, features } = service;
  const {
    heroTitle,
    heroDescription,
    overview,
    stats = [],
    excellencePoints = [],
    services: serviceList = [],
    process = [],
    benefits = [],
    faqs = []
  } = details;

  // Generate dynamic SEO data
  const serviceTitle = generateServiceTitle(service);
  const serviceDescription = generateServiceDescription(service);
  const serviceKeywords = generateServiceKeywords(service);
  const serviceStructuredData = generateServiceStructuredData(service);
  const faqStructuredData = generateServiceFAQStructuredData(service);
  const breadcrumbStructuredData = generateServiceBreadcrumbStructuredData(service);

  // Combine structured data
  const combinedStructuredData = [
    serviceStructuredData,
    breadcrumbStructuredData,
    ...(faqStructuredData ? [faqStructuredData] : [])
  ];

  // Animation variants (from Partners page)
  const animationVariants = useMemo(() => ({
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      },
    },
    titleVariants: {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8 },
      },
    },
    cardVariants: {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7 },
      },
    },
    fadeInUpVariants: {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      },
    },
  }), []);
  const { containerVariants, itemVariants, titleVariants, cardVariants, fadeInUpVariants } = animationVariants;

  return (
    <main className="bg-[#0f1012] text-zinc-100 min-h-screen">
      <SEO
        title={serviceTitle}
        description={serviceDescription}
        keywords={serviceKeywords}
        canonical={`https://goodav.net/services/${service.id}`}
        schema={combinedStructuredData}
        openGraph={{
          title: serviceTitle,
          description: serviceDescription,
          type: 'website',
          url: `https://goodav.net/services/${service.id}`,
          images: [{
            url: `https://goodav.net/images/services/${service.id}-hero.jpg`,
            width: 1200,
            height: 630,
            alt: `${service.title} Services by GoodAV`
          }]
        }}
        twitter={{
          card: 'summary_large_image',
          title: serviceTitle,
          description: serviceDescription,
          image: `https://goodav.net/images/services/${service.id}-hero.jpg`
        }}
      />
      
      {/* Animated Hero Section */}
      <motion.header
        className="relative mt-6 py-32 px-4 -mx-4 sm:-mx-6 md:-mx-8 bg-transparent text-center mb-16 flex flex-col items-center justify-center min-h-[500px] rounded-b-2xl"
        role="banner"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        aria-labelledby="hero-heading"
        aria-describedby="hero-description"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="/images/all_site_images/Home/BG/Home_BG.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
            loading="eager"
            role="presentation"
            width="1920"
            height="1080"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0f1012]" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="mb-8 flex justify-center"
            variants={fadeInUpVariants}
            role="img"
            aria-label="Trust badge: Trusted by 50+ International Clients"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-300 px-6 py-3 rounded-full backdrop-blur-sm">
              <MdVerified className="text-xl" aria-hidden="true" />
              <span className="font-semibold">Trusted by 50+ International Clients</span>
            </div>
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent tracking-tight mb-8"
            id="hero-heading"
            variants={titleVariants}
          >
            {heroTitle}
          </motion.h1>
          <motion.p 
            className="text-zinc-200 text-2xl md:text-3xl font-medium max-w-4xl mx-auto leading-relaxed mb-12"
            id="hero-description"
            variants={fadeInUpVariants}
            role="doc-subtitle"
          >
            {heroDescription}
          </motion.p>
          {/* Animated Stats and CTA Buttons removed as requested */}
        </div>
      </motion.header>

      {/* Service Overview & Benefits */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        aria-labelledby="overview-heading"
      >
        <motion.div className="text-center mb-16" variants={titleVariants}>
          <h2 id="overview-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Our <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">{title}</span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full" aria-hidden="true"></div>
          <p className="text-xl text-zinc-300 mt-6 max-w-4xl mx-auto">
            {overview}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Excellence Points */}
          {excellencePoints.length > 0 && (
            <motion.div className="space-y-6" variants={cardVariants}>
              <h3 className="text-2xl font-bold text-white mb-4">Why Choose Us</h3>
              {excellencePoints.map((point, index) => (
                <div key={index} className="bg-gradient-to-br from-white/5 to-white/2 p-6 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300">
                  <h4 className="font-semibold text-orange-500 text-lg">{point.title}</h4>
                  <p className="text-zinc-300 mt-1">{point.description}</p>
                </div>
              ))}
            </motion.div>
          )}
          {/* Benefits */}
          {benefits.length > 0 && (
            <motion.div className="space-y-6" variants={cardVariants}>
              <h3 className="text-2xl font-bold text-white mb-4"><FaLightbulb className="inline mr-2" aria-hidden /> Key Benefits</h3>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                  <FaCheckCircle className="text-orange-400 text-lg flex-shrink-0" />
                  <span className="text-zinc-300 text-base">{benefit}</span>
                </div>
              ))}
            </motion.div>
          )}
          {/* Features */}
          {features.length > 0 && (
            <motion.div className="space-y-6" variants={cardVariants}>
              <h3 className="text-2xl font-bold text-white mb-4">What's Included</h3>
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                  <FaCircle className="text-orange-500 mr-2" aria-hidden />
                  <span className="text-zinc-300 text-base">{feature}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Service Solutions (Service List) */}
      {serviceList.length > 0 && (
        <motion.section 
          className="bg-gradient-to-br from-gray-900/50 to-black/50 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div className="text-center mb-16" variants={titleVariants}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our {title} Services</h2>
              <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
              <p className="text-xl text-zinc-300 mt-6">Comprehensive solutions tailored to your specific needs</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceList.map((service, index) => (
                <motion.div
                  key={service.title}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 bg-white/5 border-white/10 hover:border-orange-500/20`}
                  variants={cardVariants}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                    {([
                      <FaVideo className="text-2xl text-white" aria-hidden />, 
                      <FaCamera className="text-2xl text-white" aria-hidden />, 
                      <FaFilm className="text-2xl text-white" aria-hidden />, 
                      <FaMicrophone className="text-2xl text-white" aria-hidden />, 
                      <FaVolumeUp className="text-2xl text-white" aria-hidden />, 
                      <FaLightbulb className="text-2xl text-white" aria-hidden />
                    ][index % 6])}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-zinc-300 text-base mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <FaCheckCircle className="text-orange-400 text-sm flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}



      {/* Main site footer will be used; removed custom contact form for consistency */}
    </main>
  );
};

export default BaseServiceDetail;
