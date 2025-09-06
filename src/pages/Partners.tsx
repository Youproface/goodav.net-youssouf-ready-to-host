import React, { useState, useMemo, useCallback, Suspense } from 'react';
import BTSMasterProduction from '@/components/BTSMasterProdcution';
import Testimonials from '@/components/Testimonials';
const BookingModal = React.lazy(() => import('@/components/forms/BookingModal'));

// Lazy load components for better performance
const PartnersLogos = React.lazy(() => import('@/components/PartnersLogos'));
import { useNavigate, Link } from 'react-router-dom';
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
  FaEye,
  FaArrowRight,
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
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Get specific case studies for partnership success stories - only Gilead and Miss Rwanda
  const [featuredCaseStudies, setFeaturedCaseStudies] = useState([]);
  React.useEffect(() => {
    let mounted = true;
    import('@/data/caseStudies').then(mod => {
      const allCaseStudies = mod.getFeaturedCaseStudies();
      if (mounted) {
        setFeaturedCaseStudies(
          allCaseStudies.filter(caseStudy =>
            caseStudy.id === 'gilead-ias-2025' || caseStudy.id === 'miss-rwanda-inspiration-backup'
          )
        );
      }
    });
    return () => { mounted = false; };
  }, []);

  // Optimized animation variants for performance
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
        image="/images/all_site_images/Home/BG/Home_BG.png"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Strategic Partnerships', url: '/partners' }
        ]}
        alternateLanguages={[
          { hreflang: 'en', href: 'https://goodav.net/partners' },
          { hreflang: 'fr', href: 'https://goodav.net/fr/partenaires' },
          { hreflang: 'rw', href: 'https://goodav.net/rw/ubufatanye' }
        ]}
      />
      <SchemaMarkup
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "GoodAV",
            "alternateName": "GoodAV Rwanda",
            "url": "https://goodav.net",
            "logo": {
              "@type": "ImageObject",
              "url": "https://goodav.net/images/all_site_images/Assets/logo-full-color.svg",
              "width": 300,
              "height": 100
            },
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
              "availableLanguage": ["en", "fr", "rw"],
              "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
              }
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kigali",
              "addressCountry": "RW",
              "addressRegion": "Kigali City"
            },
            "founder": {
              "@type": "Person",
              "name": "Youssouf Hakizimana",
              "jobTitle": "Founder & CEO"
            },
            "numberOfEmployees": "15-50",
            "foundingDate": "2014",
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
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Partnership Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Strategic Alliance Partnership",
                    "description": "Long-term partnership with dedicated resources and preferential rates"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Project Partnership",
                    "description": "Event and campaign focused collaboration"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Retainer Partnership",
                    "description": "Ongoing audiovisual coverage with reserved capacity"
                  }
                }
              ]
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://goodav.net"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Strategic Partnerships",
                "item": "https://goodav.net/partners"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Strategic Partnership Services",
            "provider": {
              "@type": "Organization",
              "name": "GoodAV"
            },
            "description": "Comprehensive partnership solutions for audiovisual production and media services across Africa",
            "serviceType": "Media Production Partnership",
            "areaServed": [
              {
                "@type": "Country",
                "name": "Rwanda"
              },
              {
                "@type": "Continent",
                "name": "Africa"
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Partnership Packages",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "name": "Strategic Alliance",
                  "description": "Long-term partnership with dedicated resources and preferential rates",
                  "businessFunction": "Sell"
                },
                {
                  "@type": "Offer",
                  "name": "Project Partnership",
                  "description": "Flexible collaboration for specific events, campaigns, or documentary projects",
                  "businessFunction": "Sell"
                },
                {
                  "@type": "Offer",
                  "name": "Retainer Partnership",
                  "description": "Consistent audiovisual support with reserved capacity and guaranteed availability",
                  "businessFunction": "Sell"
                }
              ]
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What types of partnership does GoodAV offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "GoodAV offers three main partnership types: Strategic Alliance for long-term partnerships, Project Partnership for specific campaigns, and Retainer Partnership for ongoing audiovisual support."
                }
              },
              {
                "@type": "Question",
                "name": "Which countries does GoodAV serve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "GoodAV provides services across 5+ African countries with global reach, specializing in Rwanda and expanding throughout the African continent."
                }
              },
              {
                "@type": "Question",
                "name": "How many projects has GoodAV completed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "GoodAV has successfully delivered over 500 projects for 50+ trusted partner organizations over 10+ years of excellence in the audiovisual industry."
                }
              }
            ]
          }
        ]}
      />

      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-6 py-3 rounded-md z-50 focus:outline-none focus:ring-4 focus:ring-orange-300 font-semibold transition-all"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Skip to navigation link */}
      <a 
        href="#main-navigation" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-48 bg-orange-500 text-white px-6 py-3 rounded-md z-50 focus:outline-none focus:ring-4 focus:ring-orange-300 font-semibold transition-all"
        aria-label="Skip to navigation"
      >
        Skip to navigation
      </a>

      {/* Premium Hero Section */}
      <motion.header
        className="hero-section relative mt-6 py-32 px-4 -mx-4 sm:-mx-6 md:-mx-8 bg-transparent text-center mb-16 flex flex-col items-center justify-center min-h-[600px] rounded-b-2xl"
        role="banner"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        aria-labelledby="hero-heading"
        aria-describedby="hero-description"
      >
        <div className="hero-background absolute inset-0" aria-hidden="true">
          <img
            src="/images/all_site_images/Home/BG/Home_BG.webp"
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
          {/* Trust Badge */}
          <motion.div 
            className="mb-8 flex justify-center"
            variants={fadeInUpVariants}
            role="img"
            aria-label="Trust badge: Trusted by 500+ Global Organizations"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-300 px-6 py-3 rounded-full backdrop-blur-sm">
              <MdVerified className="text-xl" aria-hidden="true" />
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
            id="hero-description"
            variants={fadeInUpVariants}
            role="doc-subtitle"
          >
            Elevate Your Brand with Africa's Premier Audiovisual Production Partner
            <br />
            <span className="text-orange-300 font-semibold">Where Global Standards Meet African Authenticity</span>
          </motion.p>

          {/* Key Stats */}
          <motion.section
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
            variants={containerVariants}
            aria-labelledby="stats-heading"
            role="region"
          >
            <h2 id="stats-heading" className="sr-only">Partnership Statistics</h2>
            {[
              { number: '50+', label: 'Partners', description: 'Trusted organizations we collaborate with', icon: FaHandshake },
              { number: '5+', label: 'Countries', description: 'Global reach across African nations', icon: FaGlobe },
              { number: '500+', label: 'Projects', description: 'Successful collaborations delivered', icon: FaRocket },
              { number: '10+', label: 'Years of Excellence', description: 'Proven track record of success', icon: FaAward }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.3 } }}
                role="img"
                aria-label={`${stat.number} ${stat.label}: ${stat.description}`}
                tabIndex={0}
              >
                <stat.icon className="text-3xl text-orange-400 mx-auto mb-2" aria-hidden="true" />
                <div className="text-3xl md:text-4xl font-bold text-white" aria-label={`${stat.number} ${stat.label}`}>{stat.number}</div>
                <div className="text-sm text-zinc-300 font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-zinc-400 leading-tight">{stat.description}</div>
              </motion.div>
            ))}
          </motion.section>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={containerVariants}
            role="group"
            aria-label="Partnership action buttons"
          >
            <motion.button 
              className="px-10 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[#0f1012]"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(true)}
              aria-label="Start Partnership - Open booking consultation modal"
              type="button"
            >
              <FaHandshake className="inline mr-3" aria-hidden="true" />
              Start Partnership
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div id="main-content" className="scroll-mt-8" role="main" aria-label="Partnership information and services">

        {/* Why Partner With GoodAV - Premium Value Proposition */}
        <motion.section 
          className="max-w-7xl mx-auto px-4 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          aria-labelledby="why-partner-heading"
        >
          <motion.div className="text-center mb-16" variants={titleVariants}>
            <h2 id="why-partner-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Why Partner With 
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"> GoodAV</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full" aria-hidden="true"></div>
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
                    onClick={() => setIsBookingOpen(true)}
                  >
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Partnership Success Stories */}
        <motion.section 
          className="max-w-7xl mx-auto px-4 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          aria-labelledby="partnership-success-heading"
        >
          <motion.div className="text-center mb-16" variants={titleVariants}>
            <h2 id="partnership-success-heading" className="text-4xl md:text-5xl font-bold text-white mb-6">
              Partnership Success Stories
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full" aria-hidden="true"></div>
            <p className="text-xl text-zinc-300 mt-6 max-w-4xl mx-auto">
              Discover our real case studies and successful collaborations with global partners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            {featuredCaseStudies.map((caseStudy, index) => (
              <motion.article
                key={caseStudy.id}
                className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-300 group"
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={caseStudy.image || '/images/placeholder.svg'}
                    alt={`${caseStudy.title} case study`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {caseStudy.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {caseStudy.date}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-orange-300 mb-2">{caseStudy.client}</h3>
                  <h4 className="text-lg font-semibold text-white mb-3 line-clamp-2">{caseStudy.title}</h4>
                  <p className="text-zinc-300 mb-4 text-sm line-clamp-3">{caseStudy.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {caseStudy.tags.slice(0, 3).map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="bg-orange-500/10 text-orange-300 px-2 py-1 rounded text-xs border border-orange-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {caseStudy.testimonial && (
                    <blockquote className="text-zinc-400 italic text-sm border-l-4 border-orange-500/30 pl-4 mb-4">
                      "{caseStudy.testimonial.text.substring(0, 80)}..."
                      <footer className="text-orange-300 text-xs mt-1">
                        — {caseStudy.testimonial.author}
                      </footer>
                    </blockquote>
                  )}
                  
                  <Link
                    to={`/case-studies/${caseStudy.slug}`}
                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors group"
                  >
                    View Case Study 
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* See All Case Studies Button */}
          <motion.div 
            className="text-center"
            variants={fadeInUpVariants}
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[#0f1012]"
            >
              <FaEye className="text-xl" />
              See All Case Studies
              <FaArrowRight className="text-lg" />
            </Link>
          </motion.div>
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

        {/* Partner Logos Section - Using Reusable Component */}
        <Suspense fallback={null}>
          <PartnersLogos />
        </Suspense>

        {/* Testimonials from Home Page */}
        <Testimonials />

        {/* Booking Modal */}
        <Suspense fallback={null}>
          <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </Suspense>

      </div>

      <BTSMasterProduction />
    </main>
  );
}
