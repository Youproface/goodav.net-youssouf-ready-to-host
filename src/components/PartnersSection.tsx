import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Handshake, Users, Globe, Briefcase, Award } from 'lucide-react';

// Import partner logos with meaningful names
const partnerLogos = [
  { id: 1, name: "GOVERNMENT OF RWANDA", logo: "/images/all_site_images/Home/Partners/All/partner-logo-1.jpg", category: "Government Institutions" },
  { id: 2, name: "USAID", logo: "/images/all_site_images/Home/Partners/All/partner-logo-2.jpg", category: "Global Health & Development" },
  { id: 3, name: "CIMERWA", logo: "/images/all_site_images/Home/Partners/All/partner-logo-3.jpg", category: "Private Sector & Corporate" },
  { id: 4, name: "BRALIRWA", logo: "/images/all_site_images/Home/Partners/All/partner-logo-4.jpg", category: "Private Sector & Corporate" },
  { id: 5, name: "AFRICA UNION", logo: "/images/all_site_images/Home/Partners/All/partner-logo-5.jpg", category: "Multilateral Organization" },
  { id: 6, name: "RWANDA BEAN", logo: "/images/all_site_images/Home/Partners/All/partner-logo-6.jpg", category: "Technology Partner" },
  { id: 7, name: "AFRICAN DEVELOPMENT BANK GROUP", logo: "/images/all_site_images/Home/Partners/All/partner-logo-7.jpg", category: "Financial Institutions" },
  { id: 8, name: "AFREXIMBANK", logo: "/images/all_site_images/Home/Partners/All/partner-logo-8.jpg", category: "Government Organization" },
  { id: 9, name: "CHALLENGES GROUP", logo: "/images/all_site_images/Home/Partners/All/partner-logo-9.jpg", category: "Private Sector & Corporate" },
  { id: 10, name: "MTN", logo: "/images/all_site_images/Home/Partners/All/partner-logo-10.jpg", category: "Network & Technology" },
  { id: 11, name: "WORLD VISION", logo: "/images/all_site_images/Home/Partners/All/partner-logo-11.jpg", category: "Global Health & Development" },
  { id: 12, name: "UNDP", logo: "/images/all_site_images/Home/Partners/All/partner-logo-12.jpg", category: "Global Health & Development" },
  { id: 13, name: "MOPAS", logo: "/images/all_site_images/Home/Partners/All/partner-logo-13.jpg", category: "Media &  Communication" },
  { id: 14, name: "RWANDA FORENSIC LABORATORY", logo: "/images/all_site_images/Home/Partners/All/partner-logo-14.jpg", category: "Government Institutions" },
  { id: 15, name: "JEUNE AFRIQUE MEDIA GROUP", logo: "/images/all_site_images/Home/Partners/All/partner-logo-15.jpg", category: "Media & Technology" },
  { id: 16, name: "UN WOMEN", logo: "/images/all_site_images/Home/Partners/All/partner-logo-16.jpg", category: "Global Health & Development" },
  { id: 17, name: "AIMS", logo: "/images/all_site_images/Home/Partners/All/partner-logo-17.jpg", category: "Academic & Research" },
  { id: 18, name: "SMART AFRICA", logo: "/images/all_site_images/Home/Partners/All/partner-logo-18.jpg", category: "Network & Technology" },
  { id: 19, name: "SONARWA", logo: "/images/all_site_images/Home/Partners/All/partner-logo-19.jpg", category: "Insurance company" },
  { id: 20, name: "MISS RWANDA", logo: "/images/all_site_images/Home/Partners/All/partner-logo-20.png", category: "Research Institution" },
  { id: 21, name: "TECHNOSERVE", logo: "/images/all_site_images/Home/Partners/All/partner-logo-21.jpg", category: "Global Health & Development" },
  { id: 22, name: "UN", logo: "/images/all_site_images/Home/Partners/All/partner-logo-22.jpg", category: "Global Health & Development" },
  { id: 23, name: "UNFPA", logo: "/images/all_site_images/Home/Partners/All/partner-logo-23.jpg", category: "Global Health & Development" },
  { id: 24, name: "RWANDA REVENUE AUTHORITY", logo: "/images/all_site_images/Home/Partners/All/partner-logo-24.jpg", category: "Media & Technology" },
  { id: 25, name: "INYARWANDA TV", logo: "/images/all_site_images/Home/Partners/All/partner-logo-25.jpg", category: "Youth Development" },
  { id: 26, name: "Echoes of Tradition", logo: "/images/all_site_images/Home/Partners/All/partner-logo-26.jpg", category: "Culture and Tourism company" },
  { id: 27, name: "ENABEL", logo: "/images/all_site_images/Home/Partners/All/partner-logo-27.jpg", category: "Global Health & Development" },
  { id: 28, name: "HEINEKEN", logo: "/images/all_site_images/Home/Partners/All/partner-logo-28.jpg", category: "Private Sector & Corporate" },
  { id: 29, name: "KEPLER", logo: "/images/all_site_images/Home/Partners/All/partner-logo-29.jpg", category: "Academic & Research" },
  { id: 30, name: "AAEGIS", logo: "/images/all_site_images/Home/Partners/All/partner-logo-30.jpg", category: "History preservation Institution" },
  { id: 31, name: "Zentrum für Fernstudien im Hochschulverhund", logo: "/images/all_site_images/Home/Partners/All/partner-logo-31.jpg", category: "Academic & Research" }
];

const PartnersSection = () => {
  const partners = React.useMemo(() => partnerLogos, []);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const [isHovered, setIsHovered] = useState(false);
  
  const partnershipStats = React.useMemo(() => [
    { 
  number: "50+", 
      label: "Partners", 
      icon: <Users className="h-6 w-6" aria-hidden="true" />, 
      ariaLabel: "Over 20 strategic partners",
      description: "Trusted organizations we collaborate with"
    },
    { 
      number: "5+", 
      label: "Countries", 
      icon: <Globe className="h-6 w-6" aria-hidden="true" />, 
      ariaLabel: "Partnerships across 5+ countries",
      description: "Global reach across African nations"
    },
    { 
      number: "500+", 
      label: "Projects", 
      icon: <Briefcase className="h-6 w-6" aria-hidden="true" />, 
      ariaLabel: "Completed over 500 projects",
      description: "Successful collaborations delivered"
    },
    { 
      number: "10+", 
      label: "Years of Excellence", 
      icon: <Award className="h-6 w-6" aria-hidden="true" />, 
      ariaLabel: "10+ years of excellence in partnerships",
      description: "Proven track record of success"
    }
  ], []);
  
  // Debug: Log when component mounts
  useEffect(() => {
    console.log('PartnersSection mounted, stats:', partnershipStats.length);

    // Fallback: Ensure stats are visible after 2 seconds if viewport detection fails
    const fallbackTimer = setTimeout(() => {
      console.log('Fallback: Ensuring stats visibility');
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, [partnershipStats.length]);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Preload critical partner images
  useEffect(() => {
    const preloadImages = async () => {
      const criticalPartners = partners.slice(0, 8); // Preload first 8 images
      const promises = criticalPartners.map((partner) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = partner.logo;
          img.onload = () => {
            setImagesLoaded(prev => new Set([...prev, partner.id]));
            resolve();
          };
          img.onerror = () => resolve(); // Continue even if image fails
        });
      });
      await Promise.all(promises);
    };
    
    preloadImages();
  }, [partners]);

  

  return (
    <section 
      id="partners-section" 
      className="py-20 bg-gradient-hero"
      aria-labelledby="partners-heading"
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
        <header 
          className="text-center mb-16"
          role="banner"
        >
          <motion.div 
            className="text-center mb-16"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] py-2 px-5 rounded-full text-white font-semibold inline-flex items-center gap-2 mb-5 shadow-[0_4px_15px_rgba(255,107,83,0.4)]"
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2, duration: 0.6 }}
              role="banner"
              aria-label="Trusted partnerships section badge"
            >
              <Handshake className="h-5 w-5 text-white-500" aria-hidden="true" />
              TRUSTED PARTNERSHIPS
            </motion.div>
            
            <motion.h2 
              id="partners-heading"
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Strategic <span className="gradient-text">Partnerships</span><br />
              <span className="gradient-text">Driving Impact Together</span>  
            </motion.h2>
            
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h3 
                className="text-xl font-bold mb-4"
                initial={prefersReducedMotion ? { opacity: 1, y: 10 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5, duration: 0.6 }}
              >
                Building Africa's Future Through Collaboration
              </motion.h3>
              <motion.p 
                className="text-lg text-muted-foreground leading-relaxed"
                initial={prefersReducedMotion ? { opacity: 1, y: 10 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.6, duration: 0.6 }}
              >
                We partner with leading global organizations, international development agencies, and innovative African enterprises to amplify stories that matter. Our strategic alliances span healthcare, education, technology, and social impact sectors, creating powerful narratives that drive meaningful change across the continent and beyond.
              </motion.p>
            </motion.div>
          </motion.div>
        </header>

        {/* Partnership Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={prefersReducedMotion ? "show" : "hidden"}
          animate="show"
          whileInView="show"
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
          variants={prefersReducedMotion ? {
            hidden: { opacity: 1 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0,
                delayChildren: 0
              }
            }
          } : {
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
          role="region"
          aria-labelledby="stats-heading"
        >
          <h3 id="stats-heading" className="sr-only">Partnership Statistics</h3>
          {partnershipStats.map((stat, index) => (
            <motion.article 
              key={index} 
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,107,83,0.12)] min-h-[140px] flex flex-col items-center justify-center"
              variants={prefersReducedMotion ? {
                hidden: { opacity: 1, y: 0 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              } : {
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
              whileHover={prefersReducedMotion ? {} : { 
                y: -5,
                transition: { duration: 0.2 }
              }}
              role="article"
              aria-label={stat.ariaLabel}
            >
              <motion.div 
                className="text-[#ff6b35] mb-3 flex justify-center"
                initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5 + (index * 0.1), duration: 0.5 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div 
                className="text-4xl font-bold text-white mb-2 text-center"
                initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.7 + (index * 0.1), duration: 0.5 }}
                aria-label={`${stat.number} ${stat.label}`}
              >
                {stat.number}
              </motion.div>
              <motion.div 
                className="text-sm text-gray-300 font-medium text-center"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.9 + (index * 0.1), duration: 0.4 }}
              >
                {stat.label}
              </motion.div>
              <motion.div 
                className="text-xs text-gray-400 text-center mt-1"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.1 + (index * 0.1), duration: 0.4 }}
              >
                {stat.description}
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        {/* Partner Logos Section */}
        <section 
          className="space-y-8 mt-12"
          aria-labelledby="partners-logos-heading"
          role="region"
        >
          <h3 id="partners-logos-heading" className="sr-only">Our Trusted Partners - Scrolling Gallery</h3>
          
          {/* Screen Reader Instructions */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Partner logos are scrolling automatically. Hover over the carousel to pause the animation.
          </div>
          
          {/* First row - scrolls right */}
          <motion.div 
            className="relative overflow-hidden py-4 w-full"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
            role="group"
            aria-label="Scrolling partner logos carousel - first row"
            tabIndex={0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            <motion.div 
              className="flex whitespace-nowrap gap-6"
              animate={prefersReducedMotion || isHovered ? {} : {
                x: [0, -100 * partners.length],
              }}
              transition={prefersReducedMotion || isHovered ? {} : {
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ width: `${200 * partners.length * 2}%` }}
              aria-hidden="true" // Hide from screen readers as content is duplicated
            >
              {[...partners, ...partners].map((partner, index) => (
                <motion.div 
                  key={`first-${partner.id}-${index}`}
                  className="inline-flex items-center justify-center h-16 w-40 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
                  role="img"
                  tabIndex={0}
                  aria-label={`${partner.name} - ${partner.category} collaborating with Goodav AV Agency on video production and media projects`}
                  aria-describedby={`partner-desc-${partner.id}`}
                >
                  <motion.img 
                    src={partner.logo} 
                    alt={`${partner.name} logo - Strategic partnership with Goodav AV Agency for professional video production and media services`} 
                    className="h-full w-full object-contain opacity-70 hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
                    loading={index < 8 ? "eager" : "lazy"}
                    decoding="async"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    onLoad={() => setImagesLoaded(prev => new Set([...prev, partner.id]))}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      console.warn(`Failed to load partner logo ${partner.id}`);
                    }}
                    aria-hidden="false"
                  />
                  {/* Hidden description for screen readers */}
                  <div 
                    id={`partner-desc-${partner.id}`} 
                    className="sr-only"
                  >
                    {partner.name} is a {partner.category.toLowerCase()} that partners with Goodav AV Agency for professional video production, media services, and creative collaborations across Africa and beyond.
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Second row - scrolls left */}
          <motion.div 
            className="relative overflow-hidden py-4 w-full"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            role="group"
            aria-label="Scrolling partner logos carousel - second row"
            tabIndex={0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            <motion.div 
              className="flex whitespace-nowrap gap-6"
              animate={prefersReducedMotion || isHovered ? {} : {
                x: [-100 * partners.length, 0],
              }}
              transition={prefersReducedMotion || isHovered ? {} : {
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ width: `${200 * partners.length * 2}%` }}
              aria-hidden="true" // Hide from screen readers as content is duplicated
            >
              {[...partners].reverse().map((partner, index) => (
                <motion.div 
                  key={`second-${partner.id}-${index}`}
                  className="inline-flex items-center justify-center h-16 w-40 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
                  role="img"
                  tabIndex={0}
                  aria-label={`${partner.name} - ${partner.category} collaborating with Goodav AV Agency on video production and media projects`}
                  aria-describedby={`partner-desc-second-${partner.id}`}
                >
                  <motion.img 
                    src={partner.logo} 
                    alt={`${partner.name} logo - Strategic partnership with Goodav AV Agency for professional video production and media services`} 
                    className="h-full w-full object-contain opacity-70 hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
                    loading={index < 8 ? "eager" : "lazy"}
                    decoding="async"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    onLoad={() => setImagesLoaded(prev => new Set([...prev, partner.id]))}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      console.warn(`Failed to load partner logo ${partner.id}`);
                    }}
                    aria-hidden="false"
                  />
                  {/* Hidden description for screen readers */}
                  <div 
                    id={`partner-desc-second-${partner.id}`} 
                    className="sr-only"
                  >
                    {partner.name} is a {partner.category.toLowerCase()} that partners with Goodav AV Agency for professional video production, media services, and creative collaborations across Africa and beyond.
                  </div>
                </motion.div>
              ))}
              {[...partners].reverse().map((partner, index) => (
                <motion.div 
                  key={`second-dupe-${partner.id}-${index}`}
                  className="inline-flex items-center justify-center h-16 w-40 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
                  role="img"
                  tabIndex={0}
                  aria-label={`${partner.name} - ${partner.category} collaborating with Goodav AV Agency on video production and media projects`}
                  aria-describedby={`partner-desc-second-dupe-${partner.id}`}
                >
                  <motion.img 
                    src={partner.logo} 
                    alt={`${partner.name} logo - Strategic partnership with Goodav AV Agency for professional video production and media services`} 
                    className="h-full w-full object-contain opacity-70 hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    decoding="async"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    onLoad={() => setImagesLoaded(prev => new Set([...prev, partner.id]))}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      console.warn(`Failed to load partner logo ${partner.id}`);
                    }}
                    aria-hidden="false"
                  />
                  {/* Hidden description for screen readers */}
                  <div 
                    id={`partner-desc-second-dupe-${partner.id}`} 
                    className="sr-only"
                  >
                    {partner.name} is a {partner.category.toLowerCase()} that partners with Goodav AV Agency for professional video production, media services, and creative collaborations across Africa and beyond.
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Partnership Duration */}
        <motion.footer 
          className="text-center mt-16"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
          role="contentinfo"
        >
          <div 
            className="inline-flex items-center px-6 py-3 glass-card rounded-full"
            role="text"
            aria-label="Average partnership duration of 5 plus years"
          >
            <span className="text-2xl font-bold gradient-text mr-2" aria-hidden="true">5+</span>
            <span className="text-muted-foreground">Years Average Partnership</span>
          </div>
        </motion.footer>
      </div>
      
      {/* Structured Data for SEO - WebPage Schema for Partners Section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Our Partners - Strategic Partnerships & Collaborations",
            "description": "Discover GoodAV's strategic partnerships and long-term collaborations with global organizations and African enterprises",
            "url": "https://goodav.net#partners-section",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Strategic Partners",
              "description": "Trusted partnerships with global organizations and African enterprises",
              "numberOfItems": "50+",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Documentary Production",
                    "description": "Professional documentary filmmaking services"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Live Event Coverage",
                    "description": "Comprehensive live event video production"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Corporate Video Production",
                    "description": "High-quality corporate video content creation"
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
    </section>
  );
};

export default PartnersSection;