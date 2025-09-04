import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import './About.css';

// Team images
const vincentImg = '/images/all_site_images/About/Team/Vincent.png';
const josueImg = '/images/all_site_images/About/Team/Josue.png';
const marieImg = '/images/all_site_images/About/Team/Marie.png';
const adelineImg = '/images/all_site_images/About/Team/Adeline.png';
const claudineImg = '/images/all_site_images/About/Team/Claudine.png';
const emmyImg = '/images/all_site_images/About/Team/Emmy.png';
const etienneImg = '/images/all_site_images/About/Team/Etienne.png';
const mediatriceImg = '/images/all_site_images/About/Team/Mediatrice.png';
const ngaboImg = '/images/all_site_images/About/Team/Ngabo.png';
const richmondImg = '/images/all_site_images/About/Team/Richmond.png';
const dodoImg = '/images/all_site_images/About/Team/dodo.png';
const gentilImg = '/images/all_site_images/About/Team/gentil.png';

// Founder timeline
const founderStory = [
  {
    year: '2010',
    title: 'The Beginning',
    description:
      "Started with a powerful belief: every story deserves to be told with authenticity, impact, and precision.",
    images: [
      '/images/all_site_images/Home/TIMELINE/2010-The Beginning-1.jpg',
      '/images/all_site_images/Home/TIMELINE/2010-The-Beginning-2.jpg',
    ],
  },
  {
    year: '2015',
    title: 'Building Expertise',
    description:
      "Developed mastery across video production, photography, live streaming, and audio creation throughout Rwanda and East Africa.",
    images: [
      '/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-1.jpg',
      '/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-2.jpg',
      '/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-3.jpg',
      '/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-4.jpg',
    ],
  },
  {
    year: '2019',
    title: 'GoodAV Founded',
    description:
      "Established GoodAV with the mission to showcase Africa's rich heritage while empowering clients to amplify their unique stories.",
    images: [
      '/images/all_site_images/Home/TIMELINE/2019-GoodAV Founded-1.jpg',
      '/images/all_site_images/Home/TIMELINE/2019-GoodAV Founded-2.jpg',
      '/images/all_site_images/Home/TIMELINE/2019-GoodAV Founded-3.jpg',
    ],
  },
  {
    year: '2025',
    title: 'Leading the Industry',
    description:
      "Recognized as Rwanda's premier audiovisual agency, creating content that inspires and transforms communities across Africa.",
    images: [
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-1.jpg',
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-2.jpg',
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-3.jpg',
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-4.jpg',
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-5.jpg',
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-6.webp',
    ],
  },
];

export default function AboutUs() {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [play, setPlay] = useState(false);
  const videoId = 'HyHigPOWxYs';

  // Optimized animation variants with useMemo for performance
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
    subtitleVariants: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: 0.2,
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

  // Destructure for cleaner code
  const {
    containerVariants,
    itemVariants,
    titleVariants,
    subtitleVariants,
    cardVariants,
    slideInLeftVariants,
    slideInRightVariants,
    fadeInUpVariants,
  } = animationVariants;

  // Optimized play button handler
  const handlePlayVideo = useCallback(() => {
    setPlay(true);
  }, []);

  // Performance hint for critical resources
  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = '/images/all_site_images/About/Founder/Youssouf_Hakizimana_CEO_GoodAV.jpg';
    link.as = 'image';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <SEO
        title="About GoodAV | Award-Winning Audiovisual Production Company | Rwanda's Premier Media Agency | African Storytelling Experts"
        description="Discover GoodAV, Rwanda's #1 audiovisual production company founded by Youssouf Hakizimana. Award-winning video production, photography, live streaming across Africa. 10+ years experience serving 500+ clients including UN, Gilead Sciences, USAID. Expert African storytellers transforming narratives through cinematic excellence."
        keywords="GoodAV about, audiovisual company Rwanda, video production Kigali, African storytelling agency, Youssouf Hakizimana CEO, professional media services Africa, documentary production Rwanda, live streaming experts, corporate video production, NGO media partners, conference coverage Africa, creative agency Kigali, award-winning production house, multicultural team Rwanda, Pan-African media company"
        canonical="/about-us"
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about-us' }
        ]}
      />
      <SchemaMarkup
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'GoodAV',
            alternateName: 'Good AudioVisual',
            url: 'https://goodav.net',
            logo: {
              '@type': 'ImageObject',
              url: 'https://goodav.net/images/all_site_images/Assets/logo-full-color.svg',
              width: 400,
              height: 200
            },
            description: "Rwanda's premier audiovisual production company specializing in video production, photography, live streaming, and documentary filmmaking across Africa. Founded by multimedia artist Youssouf Hakizimana with 10+ years experience.",
            foundingDate: '2019',
            founders: [
              {
                '@type': 'Person',
                name: 'Youssouf Hakizimana',
                jobTitle: 'Founder & CEO',
                description: 'Multimedia artist with 10+ years experience in audiovisual production',
                image: 'https://goodav.net/images/all_site_images/About/Founder/Youssouf_Hakizimana_CEO_GoodAV.jpg'
              }
            ],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kigali',
              addressCountry: 'RW',
              addressRegion: 'Kigali City'
            },
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: '+250788613332',
                email: 'info@goodav.net',
                contactType: 'Customer Service',
                areaServed: ['Rwanda', 'Africa', 'International'],
                availableLanguage: ['English', 'French', 'Kinyarwanda']
              }
            ],
            sameAs: [
              'https://www.instagram.com/goodaudiovisual',
              'https://www.youtube.com/@goodaudiovisuals',
              'https://www.facebook.com/goodaudiovisuals',
              'https://www.linkedin.com/company/goodav',
              'https://www.behance.net/goodav',
              'https://vimeo.com/goodav'
            ],
            serviceArea: {
              '@type': 'GeoCircle',
              geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: -1.9441,
                longitude: 30.0619
              },
              geoRadius: 'Global'
            },
            knowsAbout: [
              'Video Production',
              'Documentary Filmmaking',
              'Live Streaming',
              'Photography',
              'Sound Systems',
              'Lighting Design',
              'Post-Production',
              'Animation',
              'African Storytelling',
              'Corporate Communications',
              'Event Coverage',
              'NGO Documentation'
            ],
            awards: [
              'Rwanda\'s Leading Audiovisual Production Company 2024',
              'Best Creative Agency East Africa 2023',
              'Excellence in African Storytelling 2022'
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '127',
              bestRating: '5',
              worstRating: '1'
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: 'GoodAV: Crafting Authentic Stories - Our Journey and Vision',
            description: 'Discover the story behind GoodAV, Rwanda\'s premier audiovisual production company, and our mission to transform African narratives through world-class video production.',
            thumbnailUrl: `https://img.youtube.com/vi/HyHigPOWxYs/maxresdefault.jpg`,
            uploadDate: '2024-01-15T00:00:00Z',
            duration: 'PT3M45S',
            contentUrl: `https://www.youtube.com/watch?v=HyHigPOWxYs`,
            embedUrl: `https://www.youtube-nocookie.com/embed/HyHigPOWxYs`,
            publisher: {
              '@type': 'Organization',
              name: 'GoodAV',
              logo: {
                '@type': 'ImageObject',
                url: 'https://goodav.net/images/all_site_images/Assets/logo-full-color.svg'
              }
            },
            creator: {
              '@type': 'Organization',
              name: 'GoodAV'
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://goodav.net'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'About Us',
                item: 'https://goodav.net/about-us'
              }
            ]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What makes GoodAV different from other production companies?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'GoodAV specializes in authentic African storytelling with deep cultural understanding. Our team combines 15+ years of local expertise with international production standards, serving 500+ clients including UN, USAID, and major corporations across Africa.'
                }
              },
              {
                '@type': 'Question',
                name: 'What services does GoodAV offer?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We provide comprehensive audiovisual services including video production, documentary filmmaking, live streaming, professional photography, sound systems, lighting design, post-production, animation, and social media content creation.'
                }
              },
              {
                '@type': 'Question',
                name: 'Do you work with international clients?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, we regularly collaborate with international organizations, NGOs, corporations, and media companies. We\'ve produced content for global audiences while maintaining authentic African perspectives and cultural sensitivity.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is your production process?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our process begins with understanding your story and objectives, followed by creative concept development, pre-production planning, professional filming/recording, post-production, and final delivery. We maintain close collaboration throughout to ensure your vision is realized.'
                }
              },
              {
                '@type': 'Question',
                name: 'How long does a typical project take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Project timelines vary based on scope and complexity. Simple videos can be completed in 1-2 weeks, while documentaries and large productions may take 1-3 months. We provide detailed timelines during planning and keep you updated throughout.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can you handle projects across Africa?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely. Based in Rwanda, we have extensive experience working across East Africa and the continent. Our team is equipped for international travel and has established networks in major African cities.'
                }
              }
            ]
          }
        ]}
      />

      <main className="bg-[#0f1012] text-zinc-100 min-h-screen about-grayscale about-page" role="main">
        {/* Skip to content link for screen readers */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-6 py-3 rounded-md z-50 focus:outline-none focus:ring-4 focus:ring-orange-300 font-semibold transition-all"
        >
          Skip to main content
        </a>

        {/* Hero Section */}
        <motion.header
          className="hero-section relative mt-6 py-28 px-4 -mx-4 sm:-mx-6 md:-mx-8 bg-transparent text-center mb-10 flex flex-col items-center justify-center min-h-[420px] rounded-b-2xl"
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
              className="w-full h-full object-cover opacity-30"
              loading="eager"
              role="presentation"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0f1012]" />
          </div>
          <div className="relative max-w-6xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent tracking-tight mb-6" 
              id="hero-heading"
              variants={titleVariants}
            >
              About GoodAV
            </motion.h1>
            <motion.p 
              className="text-zinc-200 text-xl md:text-2xl lg:text-3xl font-medium max-w-4xl mx-auto leading-relaxed" 
              variants={subtitleVariants}
              role="doc-subtitle"
            >
              Rwanda's Premier Audiovisual Storytellers – Transforming African Narratives Through Cinematic Excellence
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              variants={containerVariants}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium"
                variants={itemVariants}
              >
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" aria-hidden="true"></span>
                Founded 2019 • 10+ Years Experience
              </motion.div>
              <motion.div 
                className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium"
                variants={itemVariants}
              >
                <span className="w-2 h-2 bg-orange-400 rounded-full" aria-hidden="true"></span>
                500+ Projects Delivered
              </motion.div>
              <motion.div 
                className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium"
                variants={itemVariants}
              >
                <span className="w-2 h-2 bg-orange-400 rounded-full" aria-hidden="true"></span>
                Award-Winning Team
              </motion.div>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content Wrapper */}
        <div id="main-content" className="scroll-mt-8">

        {/* Engagement bar */}
        <section className="sticky top-4 z-30 mx-auto max-w-7xl px-2 sm:px-4 md:px-0 py-3 backdrop-blur bg-[#0f1012]/90 border-b border-white/5 flex items-center justify-end gap-3" role="navigation" aria-label="Social media links">
          <div className="flex items-center gap-3">
            <a 
              href="https://www.instagram.com/goodaudiovisual" 
              aria-label="Follow GoodAV on Instagram (opens in new window)" 
              className="text-zinc-200 hover:text-orange-300 focus:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded p-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm8 4a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/@goodaudiovisuals" 
              aria-label="Subscribe to GoodAV on YouTube (opens in new window)" 
              className="text-zinc-200 hover:text-orange-300 focus:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded p-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M10 15l5-3-5-3v6zM21 7s-.2-1.4-1-2c-.8-.6-1.7-.6-2.1-.7C14.9 4 12 4 12 4s-2.9 0-5.9.3c-.4.1-1.3.1-2.1.7-.8.6-1 2-1 2S2 8.6 2 10.2v3.6C2 15.4 2.2 17 3 17.6c.8.6 1.9.6 2.4.7 1.8.2 7.6.3 7.6.3s2.9 0 5.9-.3c.4-.1 1.3-.1-2.1-.7-.8-.6-1-2-1-2s-.2-1.6-.2-3.2v-3.6C21 8.6 21 7 21 7z" />
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/goodav" 
              aria-label="Connect with GoodAV on LinkedIn (opens in new window)" 
              className="text-zinc-200 hover:text-orange-300 focus:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded p-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.75v2.2h.05c.52-.98 1.8-2.02 3.7-2.02 3.96 0 4.69 2.6 4.69 5.98V24h-4V15.5c0-2.01-.04-4.6-2.8-4.6-2.82 0-3.25 2.2-3.25 4.43V24h-4V8z" />
              </svg>
            </a>
          </div>
        </section>

        {/* Founder Section */}
        <motion.section 
          aria-labelledby="founder-heading" 
          className="mt-12 mx-auto max-w-6xl px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div 
            className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <motion.div 
              className="flex-shrink-0 rounded-lg overflow-hidden w-40 md:w-56 lg:w-64"
              variants={slideInLeftVariants}
            >
              <img
                src="/images/all_site_images/About/Founder/Youssouf_Hakizimana_CEO_GoodAV.jpg"
                alt="Professional headshot of Youssouf Hakizimana, Founder and CEO of GoodAV, multimedia artist with 10+ years experience in audiovisual production"
                className="w-full h-auto max-h-[640px] object-cover"
                loading="lazy"
                width="256"
                height="320"
              />
            </motion.div>
            <motion.div 
              className="text-center md:text-left"
              variants={slideInRightVariants}
            >
              <motion.h2 
                id="founder-heading"
                className="text-2xl md:text-3xl lg:text-4xl font-semibold"
                variants={titleVariants}
              >
                Youssouf Hakizimana
              </motion.h2>
              <motion.p 
                className="text-orange-300/90 mt-1 text-lg font-medium"
                variants={subtitleVariants}
              >
                Founder &amp; CEO • Multimedia Artist • 10+ Years Experience
              </motion.p>
              <motion.blockquote 
                className="mt-4 text-zinc-300 leading-relaxed text-lg italic"
                variants={fadeInUpVariants}
                cite="https://goodav.net/about-us"
              >
                "We are committed to enabling our clients to authentically share their distinctive narratives, recognizing that every story holds the power to inspire and transform communities across Africa and beyond."
              </motion.blockquote>
              <motion.footer 
                className="mt-4 text-zinc-400 text-sm"
                variants={fadeInUpVariants}
              >
                <cite>— Youssouf Hakizimana, Founder &amp; CEO of GoodAV</cite>
              </motion.footer>
              <motion.div
                className="mt-6 flex flex-wrap gap-2"
                variants={containerVariants}
              >
                <span className="inline-flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm">
                  <span className="w-2 h-2 bg-orange-400 rounded-full" aria-hidden="true"></span>
                  Video Production Expert
                </span>
                <span className="inline-flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full" aria-hidden="true"></span>
                  Documentary Filmmaker
                </span>
                <span className="inline-flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm">
                  <span className="w-2 h-2 bg-orange-400 rounded-full" aria-hidden="true"></span>
                  African Storyteller
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Company Timeline Section */}
        <motion.section 
          aria-labelledby="timeline-heading" 
          className="mt-8 mx-auto max-w-6xl px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-12" variants={titleVariants}>
            <h2 id="timeline-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">Our Journey Through Time</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
            <p className="text-zinc-300 mt-4 text-lg max-w-2xl mx-auto">
              From humble beginnings to becoming Rwanda's premier audiovisual production company
            </p>
          </motion.div>

          <div className="grid grid-cols-[9rem_1px_1fr] md:grid-cols-[10rem_1px_1fr] lg:grid-cols-[12rem_1px_1fr]" role="presentation" aria-label="Company timeline">
            <div className="col-start-2 row-span-full w-px bg-gradient-to-b from-transparent via-orange-500/60 to-transparent pointer-events-none" aria-hidden="true" />
            {founderStory.map((event, index) => (
              <React.Fragment key={event.year}>
                <motion.div 
                  className="col-start-1 pr-4 md:pr-6 py-7 flex items-start justify-end"
                  variants={slideInLeftVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex items-center gap-2 text-base md:text-lg lg:text-xl text-gray-300">
                    <time className="tabular-nums font-medium" dateTime={event.year}>{event.year}</time>
                  </div>
                </motion.div>
                <motion.div 
                  className="col-start-2 relative py-7"
                  variants={itemVariants}
                  transition={{ delay: index * 0.2 + 0.1 }}
                  aria-hidden="true"
                >
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-orange-500/40" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-8">
                    <motion.span 
                      className="block h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 rounded-full bg-orange-500 ring-4 ring-orange-500/20"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="col-start-3 py-7 pl-6"
                  variants={slideInRightVariants}
                  transition={{ delay: index * 0.2 + 0.2 }}
                >
                  <motion.article 
                    className="rounded-lg border border-white/10 bg-white/5 p-5 md:p-6 lg:p-7 hover:bg-white/7 transition-colors"
                    whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.3 } }}
                  >
                    <motion.h3 
                      className="text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-snug mb-4"
                      variants={titleVariants}
                      id={`milestone-${event.year}`}
                    >
                      {event.title}
                    </motion.h3>
                    <motion.p 
                      className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6"
                      variants={subtitleVariants}
                      aria-describedby={`milestone-${event.year}`}
                    >
                      {event.description}
                    </motion.p>
                    {event.images.length > 0 && (
                      <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
                        variants={containerVariants}
                        role="group"
                        aria-label={`Images from ${event.title}`}
                      >
                        {event.images.map((image, imgIndex) => (
                          <motion.div 
                            key={image} 
                            className="aspect-square overflow-hidden rounded-lg bg-black/20"
                            variants={itemVariants}
                            transition={{ delay: imgIndex * 0.1 }}
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                          >
                            <img 
                              src={image} 
                              alt={`${event.title} milestone - Image ${imgIndex + 1} showing GoodAV's growth and achievements during ${event.year}`} 
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                              loading="lazy" 
                              width="300"
                              height="300"
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </motion.article>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </motion.section>

        {/* Video Section */}
        <motion.section 
          aria-labelledby="video-heading" 
          className="mt-12 mx-auto max-w-6xl px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-8" variants={titleVariants}>
            <h2 id="video-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">Our Story in Motion</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
            <p className="text-zinc-300 mt-4 text-lg max-w-2xl mx-auto">
              Watch the journey of GoodAV and discover our passion for authentic African storytelling
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            variants={itemVariants}
          >
            <motion.div 
              className="video-container relative w-full md:w-4/5 lg:w-3/4 xl:w-2/3 glass-card rounded-xl overflow-hidden shadow-glow"
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center justify-center h-64 md:h-96 lg:h-[28rem] bg-transparent">
                {!play ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt="Video thumbnail: GoodAV - Crafting Authentic Stories - Our Journey and Vision. Click to play video about our mission and team."
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      width="1280"
                      height="720"
                    />
                    <motion.button
                      className="absolute z-20 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-primary rounded-full hover-lift shadow-glow group focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black"
                      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                      onClick={handlePlayVideo}
                      aria-label="Play video: GoodAV - Crafting Authentic Stories - Our Journey and Vision. Duration: 3 minutes 45 seconds"
                      type="button"
                    >
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                      <span className="sr-only">Play video</span>
                    </motion.button>
                  </>
                ) : (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title="GoodAV: Crafting Authentic Stories - Our Journey and Vision"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    aria-describedby="video-description"
                  />
                )}
              </div>
              <motion.div
                className="absolute bottom-4 left-4 right-4 text-white pointer-events-none"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: play ? 0 : 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                id="video-description"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">Featured Video</span>
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-xs rounded">3:45</span>
                </div>
                <h3 className="mt-2 text-lg md:text-xl lg:text-2xl font-semibold line-clamp-2">GoodAV: Impactful Storytelling</h3>
                <p className="text-gray-300 text-sm md:text-base">Our journey, mission, and vision for transforming African narratives</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* About Us Section */}
        <motion.section 
          aria-labelledby="about-us" 
          className="mt-12 mx-auto max-w-6xl px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div 
            className="rounded-2xl border border-white/10 bg-white/3 p-8"
            variants={cardVariants}
            whileHover={{ y: -3, transition: { duration: 0.3 } }}
          >
            <motion.div 
              className="text-center mb-8"
              variants={titleVariants}
            >
              <motion.h2 
                id="about-us" 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                variants={titleVariants}
              >
                About Us
              </motion.h2>
              <motion.div 
                className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>

            <motion.div 
              className="prose prose-lg prose-invert max-w-none"
              variants={containerVariants}
            >
              <motion.p 
                className="text-zinc-300 text-lg leading-relaxed"
                variants={fadeInUpVariants}
              >
                <strong className="text-orange-300">GOODAV</strong> is a pioneering and market-leading provider of digital consulting services,
                including audio-visual content production and photography. We have extensive experience in the
                development of digital content — from concise summaries to full documentaries and high-quality
                photography coverage. Our work also includes live streaming, branding and marketing to tell a
                visual story about a variety of events using integrated techniques that deliver to the utmost
                satisfaction of our customers.
              </motion.p>

              <motion.p 
                className="mt-6 text-zinc-300 text-lg leading-relaxed"
                variants={fadeInUpVariants}
              >
                Our approach is founded on clear principles: customer-centricity, quality & reliability,
                diversity & inclusion, and an impact-driven mindset. We use our know-how and experience to assess
                customers' needs, discuss expectations, and achieve goals in a factual, results-oriented way.
                Rooted in the belief that Africa's stories are best told by those who understand its essence,
                culture, and communities, GoodAV combines deep local knowledge with world-class videography,
                photography, and documentation expertise to support organizations across the continent.
              </motion.p>

              <motion.div 
                className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-amber-400/10 rounded-xl border border-orange-500/20"
                variants={cardVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <motion.h3 
                  className="text-xl font-bold text-orange-300 mb-3"
                  variants={titleVariants}
                >
                  EMPOWERING STORIES, CREATING CONNECTIONS
                </motion.h3>
                <motion.p 
                  className="text-zinc-300 leading-relaxed"
                  variants={subtitleVariants}
                >
                  GOODAV's strength lies in its team and our ongoing investment in skills development. We embrace
                  storytelling because it stimulates imagination and builds a sense of community between tellers and
                  listeners. Storytelling helps us understand our environment and personal experience; that is why we
                  always strive to help customers tell the story of their work and the impact they make in an articulated
                  and engaging way.
                </motion.p>
              </motion.div>

              <motion.blockquote 
                className="mt-8 text-center"
                variants={fadeInUpVariants}
              >
                <motion.p 
                  className="text-xl md:text-2xl font-medium text-orange-200 italic leading-relaxed"
                  variants={titleVariants}
                >
                  "We are Africa's premier audiovisual storytellers, transforming authentic narratives into compelling visual experiences that resonate globally while honoring our continental heritage."
                </motion.p>
              </motion.blockquote>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Story behind GoodAV Section */}
        <section aria-labelledby="story" className="mt-8 mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-8">
            <div className="text-center mb-8">
              <h2 id="story" className="text-3xl md:text-4xl font-bold text-white mb-4">Story behind GoodAV</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-zinc-300 text-lg leading-relaxed">
                At the core of GoodAV is a vision inspired by its founder and CEO, <strong className="text-orange-300">Youssouf Hakizimana</strong>,
                a multimedia artist with over a decade of experience in the audiovisual industry. Driven by a passion
                for storytelling, innovation, and cultural preservation, Youssouf established GoodAV to be more than a
                media company — it's a catalyst for Africa's transformation through the art of media.
              </p>

              <h3 className="mt-8 text-2xl font-bold text-orange-300">A Vision Born from Experience</h3>
              <p className="mt-4 text-zinc-300 text-lg leading-relaxed">
                Youssouf's journey began with a powerful belief: every story deserves to be told with authenticity,
                impact, and precision. His expertise spans video production, photography, live streaming, and audio
                creation, complemented by a strong foundation in digital communication and continuous learning. Over
                the years, he identified a gap in the market for high-quality, client-focused content production
                tailored to diverse audiences. GoodAV started as a small initiative but quickly grew into a trusted
                partner for businesses, individuals, and organizations. Under Youssouf's leadership, the company
                delivers exceptional services by blending creativity, cutting-edge technology, and a commitment to
                excellence.
              </p>

              <h3 className="mt-8 text-2xl font-bold text-orange-300">From Idea to Impact</h3>
              <p className="mt-4 text-zinc-300 text-lg leading-relaxed">
                One of Youssouf's standout projects is "Echoes of Tradition," a heartfelt initiative that captures the
                beauty, resilience, and spirit of Rwanda through photography and videography. This project reflects
                GoodAV's deeper mission: to showcase Africa's rich heritage while empowering clients to amplify their
                unique stories. Youssouf connects with diverse communities, ensuring GoodAV's work resonates across
                cultures. As advancements in Machine Learning and Artificial Intelligence reshape the creative
                landscape, GoodAV is at the forefront, integrating these innovations to enhance its storytelling
                capabilities.
              </p>

              <h3 className="mt-8 text-2xl font-bold text-orange-300">The Driving Philosophy</h3>
              <p className="mt-4 text-zinc-300 text-lg leading-relaxed">
                For Youssouf Hakizimana, storytelling isn't just about creating visuals — it's about building
                connections, evoking emotions, and leaving a lasting legacy. This philosophy is woven into every
                project at GoodAV, where the focus is on empowering clients to share their stories authentically and
                powerfully.
              </p>
            </div>
          </div>
        </section>

        {/* Services and Mission Section */}
        <motion.section 
          aria-labelledby="services" 
          className="mt-8 mx-auto max-w-6xl px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div 
            className="rounded-2xl border border-white/10 bg-white/3 p-8"
            variants={cardVariants}
            whileHover={{ y: -3, transition: { duration: 0.3 } }}
          >
            <motion.div 
              className="text-center mb-8"
              variants={titleVariants}
            >
              <motion.h2 
                id="services" 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                variants={titleVariants}
              >
                Our Services & Mission
              </motion.h2>
              <motion.div 
                className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
            >
              {/* Services */}
              <motion.div 
                className="bg-white/5 p-6 rounded-xl"
                variants={slideInLeftVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <motion.h3 
                  className="text-xl font-bold text-orange-300 mb-4"
                  variants={titleVariants}
                >
                  Services we provide
                </motion.h3>
                <motion.div 
                  className="grid grid-cols-2 gap-3 text-sm"
                  variants={containerVariants}
                >
                  {['VIDEO PRODUCTION', 'PHOTOGRAPHY', 'LIVE STREAMING', 'AUDIO PRODUCTION', 'SOUND SYSTEM', 'LIGHTING'].map((service, index) => (
                    <motion.div 
                      key={service}
                      className="bg-orange-500/10 p-3 rounded text-center border border-orange-500/20"
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    >
                      {service}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Foundation */}
              <motion.div 
                className="bg-white/5 p-6 rounded-xl"
                variants={slideInRightVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <motion.h3 
                  className="text-xl font-bold text-orange-300 mb-4"
                  variants={titleVariants}
                >
                  Our Foundation
                </motion.h3>
                <motion.p 
                  className="text-zinc-300 mb-4 italic"
                  variants={subtitleVariants}
                >
                  Built on purpose, driven by passion, defined by excellence
                </motion.p>
                <motion.div 
                  className="space-y-3"
                  variants={containerVariants}
                >
                  {[
                    { title: 'Cultural Authenticity', desc: 'Preserving Africa\'s rich heritage through genuine storytelling' },
                    { title: 'Technical Excellence', desc: 'World-class production standards and cutting-edge technology' },
                    { title: 'Global Standards', desc: 'Meeting international benchmarks while honoring local contexts' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="font-semibold text-orange-200">{item.title}</h4>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Mission & Vision */}
            <motion.div 
              className="mt-8 space-y-8"
              variants={containerVariants}
            >
              <motion.div 
                className="bg-gradient-to-r from-orange-500/10 to-amber-400/10 p-8 rounded-xl border border-orange-500/20"
                variants={cardVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-orange-300 mb-4"
                  variants={titleVariants}
                >
                  MISSION - EMPOWERING AFRICAN VOICES
                </motion.h3>
                <motion.p 
                  className="text-zinc-300 text-lg leading-relaxed mb-6"
                  variants={fadeInUpVariants}
                >
                  We elevate African narratives through world-class audiovisual excellence, authentically showcasing our continent's rich cultures and transformative stories with unparalleled creativity and technical mastery.
                </motion.p>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-r from-amber-500/10 to-orange-400/10 p-8 rounded-xl border border-amber-500/20"
                variants={cardVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-amber-300 mb-4"
                  variants={titleVariants}
                >
                  VISION - AFRICA'S PREMIER STORYTELLERS
                </motion.h3>
                <motion.p 
                  className="text-zinc-300 text-lg leading-relaxed mb-6"
                  variants={fadeInUpVariants}
                >
                  To become Africa's most trusted audiovisual partner, inspiring global audiences with authentic, impactful narratives that celebrate our continent's diversity and drive meaningful change worldwide.
                </motion.p>
                <motion.div 
                  className="grid md:grid-cols-3 gap-4 mt-6"
                  variants={containerVariants}
                >
                  {[
                    { title: 'Industry Leadership', desc: 'Setting new standards for African audiovisual excellence' },
                    { title: 'Global Impact', desc: 'Creating content that resonates worldwide and drives change' },
                    { title: 'Cultural Bridge', desc: 'Connecting African stories with global audiences authentically' }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.title}
                      className="text-center"
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="font-bold text-amber-200">{item.title}</h4>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Core Values Section */}
        <section aria-labelledby="values" className="mt-8 mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-8">
            <div className="text-center mb-8">
              <h2 id="values" className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
              <p className="text-zinc-300 mt-4">The pillars that guide our work and define who we are</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-bold text-orange-300 mb-4">Pan-African Unity</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Fostering collaboration across Africa's 54 nations, celebrating our diversity while strengthening our collective narrative through unified storytelling excellence.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-bold text-orange-300 mb-4">Authentic Representation</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Preserving and presenting Africa's rich heritage with integrity, ensuring every story honors our traditions while embracing contemporary innovation.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-bold text-orange-300 mb-4">Innovation Leadership</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Pioneering cutting-edge audiovisual technologies and creative methodologies that set new standards for storytelling excellence across the continent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact & Milestones Section */}
        <section aria-labelledby="impact" className="mt-8 mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-8">
            <div className="text-center mb-8">
              <h2 id="impact" className="text-3xl md:text-4xl font-bold text-white mb-4">From Vision to Continental Impact</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
            </div>

            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <p className="text-zinc-300 text-lg leading-relaxed">
                GOODAV emerged from a revolutionary vision: to elevate African storytelling to global standards while preserving cultural authenticity. Founded by passionate creators who understood the power of visual narrative, we've transformed from a local production house into Africa's most trusted audiovisual partner.
              </p>
              <p className="mt-6 text-zinc-300 text-lg leading-relaxed">
                Our evolution spans documenting grassroots communities to capturing international conferences, producing award-winning documentaries, and pioneering live streaming technologies across the continent—always with African authenticity at our core.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-orange-300 mb-6 text-center">Key Milestones</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/10 p-6 rounded-xl border border-orange-500/30">
                  <div className="text-3xl font-bold text-orange-300 mb-2">2019</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Founded with a Vision</h4>
                  <p className="text-zinc-300 text-sm">Established with revolutionary vision to elevate African storytelling to global standards</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/10 p-6 rounded-xl border border-amber-500/30">
                  <div className="text-3xl font-bold text-amber-300 mb-2">2021</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Pan-African Expansion</h4>
                  <p className="text-zinc-300 text-sm">Expanded operations across multiple African countries, building continental partnerships</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 p-6 rounded-xl border border-orange-500/30">
                  <div className="text-3xl font-bold text-orange-300 mb-2">2024</div>
                  <h4 className="text-lg font-semibold text-white mb-2">AI Integration Pioneer</h4>
                  <p className="text-zinc-300 text-sm">Became pioneer in AI-powered content creation while maintaining authentic storytelling</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <motion.section 
          aria-labelledby="team-heading" 
          className="mt-10 mx-auto max-w-6xl px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div 
            className="rounded-2xl border border-white/10 bg-white/3 p-8"
            variants={cardVariants}
            whileHover={{ y: -3, transition: { duration: 0.3 } }}
          >
            <motion.div 
              className="text-center mb-8"
              variants={titleVariants}
            >
              <motion.h2 
                id="team-heading" 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                variants={titleVariants}
              >
                Meet Our Expert Team
              </motion.h2>
              <motion.div 
                className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
              <motion.p 
                className="text-zinc-300 mt-4 text-lg max-w-3xl mx-auto"
                variants={subtitleVariants}
              >
                Our diverse team of creative professionals brings together expertise from across Africa to deliver world-class audiovisual solutions
              </motion.p>
            </motion.div>

            <motion.div 
              className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6"
              variants={containerVariants}
              role="group"
              aria-label="GoodAV team members"
            >
              {[
                { src: vincentImg, name: "Vincent Niyibizi", role: "Chief Operating Officer", expertise: "Operations Management" },
                { src: josueImg, name: "Josue Ishimwe", role: "Chief Creative Officer", expertise: "Creative Direction" },
                { src: marieImg, name: "Marie Noella Mugisha", role: "Sales and Partnership", expertise: "Business Development" },
                { src: adelineImg, name: "Adeline Iradukunda", role: "Social Media Manager", expertise: "Digital Marketing" },
                { src: claudineImg, name: "Claudine Musabende", role: "Chief Finance Officer", expertise: "Financial Management" },
                { src: emmyImg, name: "Emmanuel Irumva", role: "Schedule and Meeting", expertise: "Project Coordination" },
                { src: etienneImg, name: "Etienne Manirakiza", role: "Head of Operations and Logistics", expertise: "Logistics Management" },
                { src: mediatriceImg, name: "Mediatrice Mahoro", role: "Client Relations", expertise: "Customer Experience" },
                { src: ngaboImg, name: "Blaise Ngabo", role: "Chief Technology Officer", expertise: "Technology Innovation" },
                { src: richmondImg, name: "Richmond Runanira", role: "Producer", expertise: "Content Production" },
                { src: dodoImg, name: "Donatien Hitiyise", role: "Human Resources", expertise: "People Management" },
                { src: gentilImg, name: "Ibrahim Niyibizi", role: "Head of Marketing", expertise: "Marketing Strategy" }
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <TeamCard 
                    src={member.src} 
                    name={member.name} 
                    role={member.role}
                    expertise={member.expertise}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          aria-labelledby="faq-heading" 
          className="mt-12 mx-auto max-w-6xl px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div 
            className="rounded-2xl border border-white/10 bg-white/3 p-8"
            variants={cardVariants}
            whileHover={{ y: -3, transition: { duration: 0.3 } }}
          >
            <motion.div 
              className="text-center mb-8"
              variants={titleVariants}
            >
              <motion.h2 
                id="faq-heading" 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                variants={titleVariants}
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.div 
                className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
              <motion.p 
                className="text-zinc-300 mt-4 text-lg max-w-3xl mx-auto"
                variants={subtitleVariants}
              >
                Get answers to common questions about our services, process, and expertise
              </motion.p>
            </motion.div>

            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              role="region"
              aria-label="Frequently asked questions"
            >
              {[
                {
                  question: "What makes GoodAV different from other production companies?",
                  answer: "GoodAV specializes in authentic African storytelling with deep cultural understanding. Our team combines 15+ years of local expertise with international production standards, serving 500+ clients including UN, USAID, and major corporations across Africa."
                },
                {
                  question: "What services does GoodAV offer?",
                  answer: "We provide comprehensive audiovisual services including video production, documentary filmmaking, live streaming, professional photography, sound systems, lighting design, post-production, animation, and social media content creation."
                },
                {
                  question: "Do you work with international clients?",
                  answer: "Yes, we regularly collaborate with international organizations, NGOs, corporations, and media companies. We've produced content for global audiences while maintaining authentic African perspectives and cultural sensitivity."
                },
                {
                  question: "What is your production process?",
                  answer: "Our process begins with understanding your story and objectives, followed by creative concept development, pre-production planning, professional filming/recording, post-production, and final delivery. We maintain close collaboration throughout to ensure your vision is realized."
                },
                {
                  question: "How long does a typical project take?",
                  answer: "Project timelines vary based on scope and complexity. Simple videos can be completed in 1-2 weeks, while documentaries and large productions may take 1-3 months. We provide detailed timelines during planning and keep you updated throughout."
                },
                {
                  question: "Can you handle projects across Africa?",
                  answer: "Absolutely. Based in Rwanda, we have extensive experience working across East Africa and the continent. Our team is equipped for international travel and has established networks in major African cities."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/8 transition-colors"
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <h3 className="text-lg md:text-xl font-semibold text-orange-300 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Enhanced Bottom CTA Section */}
        <motion.section 
          className="mx-auto max-w-6xl px-4 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          aria-labelledby="cta-heading"
        >
          <motion.div 
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-orange-600/10 p-8 text-center"
            variants={cardVariants}
            whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <motion.h2 
              id="cta-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              variants={titleVariants}
            >
              Ready to Tell Your Story?
            </motion.h2>
            <motion.p 
              className="text-zinc-300 text-lg md:text-xl max-w-3xl mx-auto mb-8"
              variants={subtitleVariants}
            >
              Join 500+ satisfied clients who have trusted GoodAV to bring their stories to life through professional audiovisual production. Let's create something extraordinary together.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={containerVariants}
            >
              <motion.a 
                href="/contact" 
                className="px-10 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                aria-describedby="contact-description"
              >
                Start Your Project Today
              </motion.a>
              <motion.a 
                href="/portfolio" 
                className="px-10 py-4 rounded-lg border-2 border-white/20 text-zinc-200 hover:bg-white/5 hover:border-white/30 transition-all font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-white/20"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                aria-describedby="portfolio-description"
              >
                View Our Portfolio
              </motion.a>
              <motion.button 
                onClick={() => setProfileModalOpen(true)} 
                aria-label="Download company profile PDF" 
                className="px-10 py-4 rounded-lg border-2 border-white/20 text-zinc-200 hover:bg-white/5 hover:border-white/30 transition-all font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-white/20"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                aria-describedby="profile-description"
              >
                Company Profile
              </motion.button>
            </motion.div>
            
            {/* Hidden descriptions for screen readers */}
            <div className="sr-only">
              <p id="contact-description">Start a new project with GoodAV's professional audiovisual services</p>
              <p id="portfolio-description">Browse our award-winning portfolio of video production work</p>
              <p id="profile-description">Download our comprehensive company profile and capabilities</p>
            </div>

            {/* Trust indicators */}
            <motion.div 
              className="mt-12 flex flex-wrap justify-center items-center gap-8 text-zinc-400 text-sm"
              variants={containerVariants}
            >
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <span className="w-2 h-2 bg-yellow-400 rounded-full" aria-hidden="true"></span>
                500+ Projects Delivered
              </motion.div>
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <span className="w-2 h-2 bg-yellow-400 rounded-full" aria-hidden="true"></span>
                10+ Years Experience
              </motion.div>
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <span className="w-2 h-2 bg-orange-400 rounded-full" aria-hidden="true"></span>
                Award-Winning Team
              </motion.div>
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <span className="w-2 h-2 bg-orange-400 rounded-full" aria-hidden="true"></span>
                Pan-African Reach
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>
        
        </div> {/* End of main-content wrapper */}
      </main>

      {/* Company Profile Modal */}
      {profileModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          onKeyDown={(e: any) => {
            if (e.key === 'Escape') setProfileModalOpen(false);
          }}
        >
          <div className="bg-[#18181b] rounded-lg shadow-xl max-w-2xl w-full p-6 relative flex flex-col" tabIndex={0}>
            <button
              className="absolute top-3 right-3 text-white text-xl font-bold hover:text-primary"
              onClick={() => setProfileModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-primary">Company Profile</h2>
            <div className="flex flex-col items-center gap-4">
              <iframe
                src={'/download/company-profile/company-profile.pdf'}
                title="Company Profile PDF"
                className="w-full h-96 border rounded"
              />
              <div className="flex gap-3 mt-2">
                <a href="/download/company-profile/company-profile.pdf" download className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors">Download</a>
                <button
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors"
                  onClick={() => window.open('/download/company-profile/company-profile.pdf', '_blank')}
                >
                  Expand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* --- Subcomponents --- */

function TeamCard({ src, name, role, expertise, index }: { src: string; name: string; role: string; expertise?: string; index?: number }) {
  return (
    <motion.article
      className="rounded-lg overflow-hidden bg-white/3 border border-white/6 hover:shadow-glow transform-gpu transition hover:-translate-y-1 focus-within:-translate-y-1 flex flex-col h-card"
      tabIndex={0}
      aria-label={`${name} - ${role} at GoodAV`}
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index || 0) * 0.1 }}
    >
      <motion.div 
        className="h-28 bg-zinc-800 overflow-hidden flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img 
          src={src} 
          alt={`Professional headshot of ${name}, ${role} at GoodAV`}
          className="w-full h-full object-cover u-photo" 
          loading="lazy"
          width="200"
          height="112"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <motion.div 
        className="mt-3 p-3 flex-1 flex items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="w-full">
          <motion.h3 
            className="text-sm md:text-base font-semibold leading-snug break-words p-name"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {name}
          </motion.h3>
          <div className="mt-2 flex flex-col gap-1">
            <motion.span 
              className="text-xs px-2 py-1 rounded bg-orange-500/15 text-orange-300 border border-orange-500/10 p-job-title"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
            >
              {role}
            </motion.span>
            {expertise && (
              <motion.span 
                className="text-xs text-zinc-400 p-skill"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {expertise}
              </motion.span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
