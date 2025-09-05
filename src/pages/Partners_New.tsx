import BTSMasterProduction from '@/components/BTSMasterProdcution';
import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaPlay, 
  FaFilm, 
  FaGlobe, 
  FaBolt, 
  FaLock, 
  FaClipboardList,
  FaCheckCircle,
  FaStar,
  FaHandshake,
  FaAward,
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaPhone,
  FaDownload
} from 'react-icons/fa';
import { MdVerified, MdSecurity, MdTrendingUp, MdLanguage } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function Partners() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Optimized animation variants
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
        transition: {
          duration: 0.6,
        },
      },
    },
    titleVariants: {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
        },
      },
    },
    cardVariants: {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.7,
        },
      },
    },
    slideInLeftVariants: {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.7,
        },
      },
    },
    slideInRightVariants: {
      hidden: { opacity: 0, x: 30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.7,
        },
      },
    },
    fadeInUpVariants: {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
        },
      },
    },
  }), []);

  const {
    containerVariants,
    itemVariants,
    titleVariants,
    cardVariants,
    slideInLeftVariants,
    slideInRightVariants,
    fadeInUpVariants,
  } = animationVariants;

  return (
    <main className="bg-[#0f1012] text-zinc-100 min-h-screen">
      <SEO
        title="Strategic Partnerships - GoodAV | Premium Audiovisual Collaboration | Rwanda's Leading Production Partner"
        description="Partner with GoodAV, Rwanda's premier audiovisual production company. Trusted by global organizations including UN, Gilead Sciences, GIZ, and SNV. Discover our comprehensive partnership solutions for conferences, documentaries, and international events across Africa."
        keywords="GoodAV partnerships, audiovisual collaboration Rwanda, production partnerships Africa, corporate media partnerships, NGO video partnerships, international conference partners, documentary production partners, strategic media alliances, premium audiovisual services, professional video partnerships, Rwanda media partnerships, African storytelling partners, global production partners, media agency collaborations"
        canonical="https://goodav.net/partners"
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Strategic Partnerships', url: '/partners' }
        ]}
      />
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "GoodAV",
          "url": "https://goodav.net",
          "logo": "/images/all_site_images/Assets/logo-full-color.svg",
          "description": "Africa's premier audiovisual agency offering strategic partnerships for global organizations. Specialized in premium production services, compliance management, and authentic African storytelling.",
          "sameAs": [
            "https://www.instagram.com/goodaudiovisual",
            "https://www.youtube.com/@goodaudiovisuals",
            "https://www.facebook.com/goodaudiovisuals",
            "https://www.linkedin.com/company/goodav"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+250788613332",
            "email": "info@goodav.net",
            "contactType": "Partnership Inquiries",
            "areaServed": ["Rwanda", "Africa", "International"],
            "availableLanguage": ["en", "fr", "rw"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kigali",
            "addressCountry": "RW"
          },
          "founder": {
            "@type": "Person",
            "name": "Youssouf Hakizimana"
          },
          "awards": [
            "Rwanda's Leading Audiovisual Production Company 2024",
            "Best Creative Agency East Africa 2023",
            "Excellence in African Storytelling 2022"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
          }
        }}
      />

      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-6 py-3 rounded-md z-50 focus:outline-none focus:ring-4 focus:ring-orange-300 font-semibold transition-all"
      >
        Skip to main content
      </a>

      {/* Premium Hero Section */}
      <motion.header
        className="hero-section relative mt-6 py-32 px-4 -mx-4 sm:-mx-6 md:-mx-8 bg-transparent text-center mb-16 flex flex-col items-center justify-center min-h-[600px] rounded-b-2xl"
        role="banner"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        aria-labelledby="hero-heading"
      >
        <div className="hero-background absolute inset-0" aria-hidden="true">
          <img
            src="/images/all_site_images/Home/BG/Home_BG.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
            loading="eager"
            role="presentation"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0f1012]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Trust Badge */}
          <motion.div 
            className="mb-8 flex justify-center"
            variants={fadeInUpVariants}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-300 px-6 py-3 rounded-full backdrop-blur-sm">
              <MdVerified className="text-xl" />
              <span className="font-semibold">Trusted by 500+ Global Organizations</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent tracking-tight mb-8" 
            id="hero-heading"
            variants={titleVariants}
          >
            Strategic
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Partnerships
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-zinc-200 text-xl md:text-2xl lg:text-3xl font-medium max-w-5xl mx-auto leading-relaxed mb-12" 
            variants={fadeInUpVariants}
            role="doc-subtitle"
          >
            Elevate Your Brand with Africa's Premier Audiovisual Production Partner
            <br />
            <span className="text-orange-300 font-semibold">Where Global Standards Meet African Authenticity</span>
          </motion.p>

          {/* Key Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
            variants={containerVariants}
          >
            {[
              { number: '500+', label: 'Global Partners', icon: FaHandshake },
              { number: '1000+', label: 'Projects Delivered', icon: FaRocket },
              { number: '15+', label: 'Years Experience', icon: FaAward },
              { number: '25+', label: 'Countries Served', icon: FaGlobe }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.3 } }}
              >
                <stat.icon className="text-3xl text-orange-400 mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-zinc-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={containerVariants}
          >
            <motion.button 
              className="px-10 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
            >
              <FaHandshake className="inline mr-3" />
              Start Partnership
            </motion.button>
            <motion.button 
              className="px-10 py-4 rounded-lg border-2 border-white/20 text-zinc-200 hover:bg-white/5 hover:border-white/30 transition-all font-semibold text-lg flex items-center gap-3"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              Partnership Deck
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div id="main-content" className="scroll-mt-8">

        {/* Why Partner With GoodAV - Premium Value Proposition */}
        <motion.section 
          className="max-w-7xl mx-auto px-4 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={titleVariants}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Why Partner With 
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"> GoodAV</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
            <p className="text-xl text-zinc-300 mt-6 max-w-4xl mx-auto">
              Experience the difference of working with Africa's most trusted audiovisual production partner
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaShieldAlt,
                title: "Unmatched Reliability",
                description: "100% project delivery rate with enterprise-grade security and compliance standards",
                features: ["24/7 Support", "Guaranteed Delivery", "ISO Certified"]
              },
              {
                icon: FaGlobe,
                title: "Global Reach, Local Expertise",
                description: "Pan-African operations with deep cultural understanding and international standards",
                features: ["25+ Countries", "Multilingual Teams", "Cultural Sensitivity"]
              },
              {
                icon: MdTrendingUp,
                title: "Premium Production Quality",
                description: "Award-winning content that elevates your brand and drives measurable results",
                features: ["4K/8K Production", "Cinematic Quality", "Brand Enhancement"]
              },
              {
                icon: FaBolt,
                title: "Rapid Turnaround",
                description: "Industry-leading delivery times without compromising on quality",
                features: ["Fast Delivery", "Agile Workflow", "Real-time Updates"]
              },
              {
                icon: MdSecurity,
                title: "Complete Compliance",
                description: "Full regulatory compliance and permit management across all African markets",
                features: ["Legal Compliance", "Permit Handling", "Risk Management"]
              },
              {
                icon: FaUsers,
                title: "Dedicated Partnership Team",
                description: "Dedicated account management with direct access to senior leadership",
                features: ["Account Manager", "Senior Access", "Priority Support"]
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-gradient-to-br from-white/5 to-white/2 p-8 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                  <benefit.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-zinc-300 text-lg leading-relaxed mb-6">{benefit.description}</p>
                <div className="space-y-2">
                  {benefit.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <FaCheckCircle className="text-orange-400 text-sm" />
                      <span className="text-zinc-400 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Partnership Solutions */}
        <motion.section 
          className="bg-gradient-to-br from-gray-900/50 to-black/50 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div className="text-center mb-16" variants={titleVariants}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Partnership Solutions</h2>
              <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
              <p className="text-xl text-zinc-300 mt-6">Tailored collaboration models designed for your success</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Strategic Alliance",
                  subtitle: "Long-term Partnership",
                  price: "Custom",
                  description: "Comprehensive partnership with dedicated resources and preferential rates",
                  features: [
                    "Dedicated production team",
                    "Priority booking & scheduling",
                    "Volume discounts up to 40%",
                    "Quarterly strategy sessions",
                    "Custom SLA agreements",
                    "Brand co-marketing opportunities"
                  ],
                  highlight: true
                },
                {
                  title: "Project Partnership",
                  subtitle: "Event & Campaign Focused",
                  price: "Per Project",
                  description: "Flexible collaboration for specific events, campaigns, or documentary projects",
                  features: [
                    "Full-service production",
                    "End-to-end project management",
                    "Multi-format delivery",
                    "Post-production support",
                    "Distribution assistance",
                    "Performance analytics"
                  ]
                },
                {
                  title: "Retainer Partnership",
                  subtitle: "Ongoing AV Coverage",
                  price: "Monthly",
                  description: "Consistent audiovisual support with reserved capacity and guaranteed availability",
                  features: [
                    "Reserved monthly hours",
                    "Emergency coverage",
                    "Equipment access",
                    "Regular content creation",
                    "Social media support",
                    "Training sessions"
                  ]
                }
              ].map((solution, index) => (
                <motion.div
                  key={solution.title}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                    solution.highlight 
                      ? 'bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/30 scale-105' 
                      : 'bg-white/5 border-white/10 hover:border-orange-500/20'
                  }`}
                  variants={cardVariants}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: solution.highlight ? 1.05 : 1.02 }}
                >
                  {solution.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{solution.title}</h3>
                    <p className="text-orange-300 font-medium mb-4">{solution.subtitle}</p>
                    <div className="text-3xl font-bold text-orange-400 mb-4">{solution.price}</div>
                    <p className="text-zinc-300">{solution.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <FaCheckCircle className="text-orange-400 text-sm flex-shrink-0" />
                        <span className="text-zinc-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      solution.highlight
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600'
                        : 'border-2 border-orange-500/20 text-orange-300 hover:bg-orange-500/10 hover:border-orange-500/40'
                    }`}
                    onClick={() => navigate('/contact')}
                  >
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Success Stories */}
        <motion.section 
          className="max-w-7xl mx-auto px-4 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={titleVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Partnership Success Stories</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
            <p className="text-xl text-zinc-300 mt-6">Real results from our global partnerships</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                client: "Gilead Sciences",
                project: "IAS 2025 Conference Coverage",
                result: "5-day comprehensive coverage for 15,000+ attendees",
                impact: "Global reach of 2M+ viewers",
                image: "/images/all_site_images/Home/Feature_Video/Feature_Video_01.webp",
                testimonial: "GoodAV delivered exceptional quality across multiple days with professionalism and precision."
              },
              {
                client: "GIZ & SNV",
                project: "Clean Cooking Initiative",
                result: "Documentary series showcasing 44,000 cookstove distribution",
                impact: "77% energy savings demonstrated",
                image: "/images/all_site_images/Home/Feature_Video/Feature_Video_02.webp",
                testimonial: "Their storytelling brought our environmental impact to life beautifully."
              },
              {
                client: "UN & Development Partners",
                project: "Pan-African Development Summit",
                result: "Multi-country production across 5 African nations",
                impact: "Policy changes in 3 countries",
                image: "/images/all_site_images/Home/Feature_Video/Feature_Video_03.webp",
                testimonial: "GoodAV's cultural understanding made all the difference in authentic storytelling."
              }
            ].map((story, index) => (
              <motion.article
                key={story.client}
                className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={`${story.project} case study`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Success Story
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-orange-300 mb-2">{story.client}</h3>
                  <h4 className="text-lg font-semibold text-white mb-3">{story.project}</h4>
                  <p className="text-zinc-300 mb-4">{story.result}</p>
                  
                  <div className="mb-4 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <span className="text-orange-300 font-semibold">Impact: </span>
                    <span className="text-white">{story.impact}</span>
                  </div>
                  
                  <blockquote className="text-zinc-400 italic text-sm border-l-4 border-orange-500/30 pl-4">
                    "{story.testimonial}"
                  </blockquote>
                  
                  <button 
                    className="mt-4 text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-2 transition-colors"
                    onClick={() => navigate('/portfolio')}
                  >
                    View Full Case Study <FaPlay className="text-sm" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Partnership Process */}
        <motion.section 
          className="bg-gradient-to-br from-gray-900/50 to-black/50 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div className="text-center mb-16" variants={titleVariants}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How We Partner</h2>
              <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
              <p className="text-xl text-zinc-300 mt-6">A streamlined process designed for your success</p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery Call",
                  description: "Deep dive into your needs, objectives, and vision",
                  icon: FaPhone
                },
                {
                  step: "02", 
                  title: "Strategy Development",
                  description: "Custom partnership framework and solution design",
                  icon: FaChartLine
                },
                {
                  step: "03",
                  title: "Agreement & Onboarding",
                  description: "Formal partnership agreement and team integration",
                  icon: FaHandshake
                },
                {
                  step: "04",
                  title: "Execution & Growth",
                  description: "Ongoing collaboration with continuous optimization",
                  icon: FaRocket
                }
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  className="relative text-center"
                  variants={itemVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <process.icon className="text-2xl text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{process.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{process.title}</h3>
                  <p className="text-zinc-300">{process.description}</p>
                  
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full">
                      <div className="w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Trust Indicators */}
        <motion.section 
          className="max-w-7xl mx-auto px-4 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={titleVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Trusted by Global Leaders</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16"
            variants={containerVariants}
          >
            {[
              "UN", "USAID", "GIZ", "SNV", "Gilead Sciences", "World Bank",
              "African Union", "EU", "DFID", "Gates Foundation", "Mastercard Foundation", "AFD"
            ].map((org, index) => (
              <motion.div
                key={org}
                className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:border-orange-500/30 transition-all"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-zinc-300 font-semibold">{org}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {[
              {
                quote: "GoodAV's partnership has been transformational for our African operations. Their deep cultural understanding combined with international production standards makes them irreplaceable.",
                author: "Regional Director",
                company: "Major International NGO",
                rating: 5
              },
              {
                quote: "Working with GoodAV feels like having an extension of our own team. Their responsiveness, quality, and cultural sensitivity consistently exceed our expectations.",
                author: "Communications Lead",
                company: "Global Health Organization", 
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.blockquote
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/2 p-8 rounded-2xl border border-white/10"
                variants={cardVariants}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-orange-400" />
                  ))}
                </div>
                <p className="text-zinc-300 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <footer className="text-orange-300 font-semibold">
                  {testimonial.author}
                  <br />
                  <span className="text-zinc-400 text-sm">{testimonial.company}</span>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section 
          className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-t border-orange-500/20 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              variants={titleVariants}
            >
              Ready to Elevate Your Impact?
            </motion.h2>
            <motion.p 
              className="text-xl text-zinc-300 mb-8 leading-relaxed"
              variants={fadeInUpVariants}
            >
              Join 500+ organizations who trust GoodAV to transform their stories into powerful visual narratives that drive real change across Africa and beyond.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
              variants={containerVariants}
            >
              <motion.button 
                className="px-12 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xl hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
              >
                Start Your Partnership Journey
              </motion.button>
              <motion.button 
                className="px-8 py-4 rounded-lg border-2 border-white/20 text-zinc-200 hover:bg-white/5 hover:border-white/30 transition-all font-semibold text-lg flex items-center gap-3"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhone />
                Schedule Discovery Call
              </motion.button>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center items-center gap-8 text-zinc-400 text-sm"
              variants={containerVariants}
            >
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <FaCheckCircle className="text-orange-400" />
                No Setup Fees
              </motion.div>
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <FaCheckCircle className="text-orange-400" />
                Flexible Terms
              </motion.div>
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <FaCheckCircle className="text-orange-400" />
                Proven Results
              </motion.div>
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <FaCheckCircle className="text-orange-400" />
                24/7 Support
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

      </div>

      <BTSMasterProduction />
    </main>
  );
}
