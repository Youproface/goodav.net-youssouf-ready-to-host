import { motion, useAnimation, useInView } from 'framer-motion';
import { Play, Video, Camera, Mic, Users, Trophy, Eye, Handshake } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import './Hero.css';
import { Helmet } from 'react-helmet-async';

// Animated counter component
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2, 
  prefix = '', 
  suffix = '' 
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  
  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const increment = end / (duration * 60); // 60fps
      
      const updateCounter = () => {
        start += increment;
        if (start < end) {
          setDisplayValue(Math.round(start));
          requestAnimationFrame(updateCounter);
        } else {
          setDisplayValue(end);
        }
      };
      
      updateCounter();
    }
  }, [isInView, value, duration]);

  return (
    <motion.span ref={ref}>
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
};
const heroBackground = '/images/all_site_images/Home/Banner/Home_Video_Banner_Optimized.gif';
import { useNavigate } from 'react-router-dom';
import ProjectStartingModal from './forms/ProjectStartingModal';
const Hero = () => {
  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Preload background image for better performance
  useEffect(() => {
    const img = new Image();
    img.src = heroBackground;
    img.onload = () => setImageLoaded(true);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>GoodAV | Rwanda Africa Documentary Video Production Agency</title>
        <meta name="description" content="Africa's premier audiovisual agency. Award-winning video production, documentary, live streaming, and creative services for Rwanda, Africa, and global impact." />
        <meta name="keywords" content="Rwanda, Africa, documentary, video production, audiovisual, creative agency, global impact, live streaming, event media, Africa branding, Rwanda tourism, Africa storytelling, conversion, excellence" />
        <meta name="author" content="GoodAV" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://goodav.net/" />
        <meta name="geo.region" content="RW" />
        <meta name="geo.placename" content="Kigali, Rwanda" />
        <meta name="language" content="English" />
        <meta name="industry" content="Media Production, Audiovisual Services" />
        <meta name="category" content="Professional Services, Creative Agency" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "GoodAV Hero Section",
            "description": "Africa's premier audiovisual agency. Award-winning video production, documentary, live streaming, and creative services for Rwanda, Africa, and global impact.",
            "url": "https://goodav.net/",
            "mainEntity": {
              "@type": "Organization",
              "name": "GoodAV",
              "url": "https://goodav.net",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+250788613332",
                "email": "info@goodav.net",
                "contactType": "Customer Support",
                "areaServed": ["Rwanda", "Africa", "International"],
                "availableLanguage": ["en", "fr"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kigali",
                "addressCountry": "RW"
              },
              "keywords": [
                "Rwanda documentary",
                "Africa video production",
                "global impact",
                "event media coverage",
                "customer conversion",
                "creative excellence"
              ]
            }
          })}
        </script>
      </Helmet>
      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
      >
        Skip to main content
      </a>
      
      <section 
        className="relative" 
        role="banner" 
        aria-labelledby="hero-heading"
      >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 1 }}
      >
        <img 
          src={heroBackground} 
          alt="Dynamic video production background showcasing African creativity and global excellence at Goodav AV Agency" 
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-hero"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={prefersReducedMotion ? "show" : "hidden"}
          animate="show"
          variants={prefersReducedMotion ? {
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0,
                delayChildren: 0
              }
            }
          } : {
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
        >
          <motion.div 
            className="mb-8 flex justify-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }
            }}
          >
            <div className="px-8 py-6 rounded-lg bg-black/10 border border-orange-500 flex flex-col items-center min-w-[340px] max-w-full mt-5">
              <motion.div 
                className="text-white text-base font-semibold tracking-wide mb-2 uppercase"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >WELCOME TO</motion.div>
              <motion.div 
                className="text-orange-500 text-2xl font-bold mb-2 uppercase tracking-wide"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
                }}
              >AFRICA'S PREMIER</motion.div>
              <motion.div 
                className="text-white text-lg font-bold mb-2 uppercase tracking-wide"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
                }}
              >AV AGENCY GOODAV</motion.div>
              <motion.div 
                className="w-16 h-0.5 bg-orange-500 mt-2 mb-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>

          <motion.div 
            className="mb-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.8
                }
              }
            }}
          >
            <h1 id="hero-heading" className="text-2xl md:text-4xl font-bold mb-4">
              <motion.span 
                className="gradient-text inline-block mr-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >Transforming</motion.span>
              <motion.span 
                className="text-foreground inline-block mr-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
                }}
              >Ideas</motion.span>
              <motion.span 
                className="text-foreground inline-block mr-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
                }}
              >Into</motion.span>
              <motion.span 
                className="gradient-text inline-block"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }
                }}
              >Impactful</motion.span>
            </h1>
            <motion.h2 
              className="text-2xl md:text-4xl font-bold mb-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.6, 
                    delay: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  } 
                }
              }}
            >
              <span className="gradient-text">Visual Stories</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground italic max-w-2xl mx-auto"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.8, 
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  } 
                }
              }}
            >
              Where African creativity meets global excellence
            </motion.p>
          </motion.div>

          {/* Service Icons */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 1
                }
              }
            }}
          >
            {[
              { icon: <Video className="h-8 w-8 text-primary mb-2" aria-hidden="true" />, text: 'Documentaries', ariaLabel: 'Documentary film production services' },
              { icon: <Users className="h-8 w-8 text-primary mb-2" aria-hidden="true" />, text: 'Live Events', ariaLabel: 'Live event video production services' },
              { icon: <Camera className="h-8 w-8 text-primary mb-2" aria-hidden="true" />, text: 'Corporate Films', ariaLabel: 'Corporate video production services' },
              { icon: <Mic className="h-8 w-8 text-primary mb-2" aria-hidden="true" />, text: 'International', ariaLabel: 'International video production services' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4 glass-card rounded-lg hover-lift"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }
                }}
                whileHover={{ 
                  y: -5,
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                role="article"
                aria-label={item.ariaLabel}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: 1.2,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
          >
            <div className="flex flex-col sm:flex-row gap-8 px-2 py-2 rounded-2xl card-bg">
              <motion.button 
                onClick={()=>navigate('/portfolio')}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-200"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                whileTap={{ scale: 0.98 }}
                aria-label="View our portfolio of video production work"
                role="button"
              >
                <Play className="h-5 w-5" aria-hidden="true" />
                Experience Our Portfolio
              </motion.button>
              <motion.button 
                onClick={()=>setOpen(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-200"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                whileTap={{ scale: 0.98 }}
                aria-label="Start your video production project with Goodav"
                role="button"
              >
                <Video className="h-5 w-5" aria-hidden="true" />
                Start Your Journey
              </motion.button>
            </div>
          </motion.div>
          <ProjectStartingModal open={open} onClose={() => setOpen(false)} />
          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-4 mb-2">
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl card-bg">
              <span className="text-white font-medium text-base"><span className="font-bold">Trusted by 50+</span> Organizations</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl card-bg">
              <span className="text-orange-500"><Play className="h-5 w-5" /></span>
              <span className="text-white font-medium text-base"><span className="font-bold">Award-Winning Excellence</span></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Hero;