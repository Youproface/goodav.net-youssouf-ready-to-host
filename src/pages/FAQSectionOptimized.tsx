const heroBackground = '/images/all_site_images/Home/BG/Home_BG.webp';
import { lazy, useState, useEffect, useMemo, useCallback } from 'react';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import './FAQSection.css';

// Performance optimization: Preload critical resources
if (typeof window !== 'undefined') {
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.href = heroBackground;
  preloadLink.as = 'image';
  document.head.appendChild(preloadLink);
}

interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  isExpanded?: boolean;
}

const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What services does GoodAV offer?',
    answer: (
      <>
        At GoodAV, we deliver professional audiovisual services tailored for diverse needs:
        <ul className="mt-3 space-y-1" role="list">
          <li role="listitem">
            <span className="font-semibold text-zinc-100">Video Production:</span> Documentaries, event coverage, interviews, and highlight reels.
          </li>
          <li role="listitem">
            <span className="font-semibold text-zinc-100">Photography:</span> Event photography, branding shoots, and photojournalism.
          </li>
          <li role="listitem">
            <span className="font-semibold text-zinc-100">Live Streaming:</span> Seamless multi‑camera streaming for venues and remote locations.
          </li>
          <li role="listitem">
            <span className="font-semibold text-zinc-100">Audio Production:</span> Podcast production, voiceovers, and mastering.
          </li>
        </ul>
        <p className="mt-3">
          Explore examples in our <a href="/portfolio" className="text-orange-300 underline underline-offset-4 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[#0f1012]" aria-label="View GoodAV portfolio of work">portfolio</a>.
        </p>
      </>
    ),
    isExpanded: true
  },
  {
    id: 'faq-2',
    question: 'How does GoodAV deliver high‑quality audiovisual results?',
    answer: 'A senior creative lead oversees each project, using cinematic cameras, calibrated audio chains, and color‑managed workflows. We combine on‑site specialists with streamlined post‑production pipelines for consistent, broadcast‑ready output that meets international standards.'
  },
  {
    id: 'faq-3',
    question: 'Can GoodAV provide services in remote areas?',
    answer: 'Yes. Mobile kits and reliable power/network redundancies enable production in rural and low‑infrastructure environments, with risk‑assessed logistics and local crew support. We have successfully delivered projects across East and Central Africa.'
  },
  {
    id: 'faq-4',
    question: 'What makes GoodAV different from other audiovisual companies?',
    answer: 'A storytelling‑first approach, multilingual crews, and fast turnarounds—supported by a quality bar aligned with international broadcast standards and NGO compliance. We specialize in African narratives with global appeal.'
  },
  {
    id: 'faq-5',
    question: 'Which countries do you serve?',
    answer: 'Primary operations across East and Central Africa with project experience in 5+ countries including Rwanda, Kenya, Uganda, Tanzania, and Democratic Republic of Congo. International assignments are supported on request with full logistics coordination.'
  },
  {
    id: 'faq-6',
    question: 'How can I start a project with GoodAV?',
    answer: 'Share your goals, timeline, and references via our contact form or book a strategy call. A tailored proposal with detailed scope, schedule, and budget will be provided within 24-48 hours. We offer flexible payment terms and milestone-based delivery.'
  },
  {
    id: 'faq-7',
    question: 'What is the typical turnaround time for video projects?',
    answer: 'Standard projects: 5-10 business days. Complex documentaries: 2-4 weeks. Rush projects: 24-72 hours with expedited service. Timeline depends on scope, length, and post-production requirements. We always confirm delivery dates upfront.'
  },
  {
    id: 'faq-8',
    question: 'Do you provide equipment rental services?',
    answer: 'Yes, we offer professional equipment rental including cameras, lighting, sound systems, and livestreaming setups. All equipment is maintained to broadcast standards with technical support and delivery/pickup services available.'
  }
];

const FAQItem: React.FC<{ item: FAQItem; index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(item.isExpanded || false);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  const ariaExpanded = isOpen ? 'true' : 'false';
  const ariaHidden = isOpen ? 'false' : 'true';

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur faq-item">
      <button
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-md font-semibold hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[#0f1012] text-left faq-question"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        {...(isOpen ? { 'aria-expanded': 'true' } : { 'aria-expanded': 'false' })}
        aria-controls={`${item.id}-answer`}
        id={`${item.id}-button`}
        type="button"
      >
        <span className="faq-text">{item.question}</span>
        <span 
          className={`text-orange-300 faq-arrow ${isOpen ? 'rotate-180' : ''}`} 
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      <div
        id={`${item.id}-answer`}
        className={`border-t border-white/10 px-4 py-4 text-body text-zinc-300 faq-content faq-text ${
          isOpen ? 'block' : 'hidden'
        }`}
        role="region"
        aria-labelledby={`${item.id}-button`}
        {...(isOpen ? { 'aria-hidden': 'false' } : { 'aria-hidden': 'true' })}
      >
        {typeof item.answer === 'string' ? item.answer : item.answer}
      </div>
    </div>
  );
};

export default function FAQSection() {
  // Performance monitoring for Core Web Vitals
  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      // Monitor LCP (Largest Contentful Paint)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            // Send to analytics if needed
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as any; // Type assertion for Web API
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          }
        }
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID might not be supported in all browsers
        console.log('FID monitoring not supported');
      }

      // Monitor CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as any; // Type assertion for Web API
          if (entry.entryType === 'layout-shift' && !clsEntry.hadRecentInput) {
            console.log('CLS:', clsEntry.value);
          }
        }
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // CLS might not be supported in all browsers
        console.log('CLS monitoring not supported');
      }

      return () => {
        observer.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  // Optimize FAQ schema for better search engine understanding
  const faqSchema = useMemo(() => 
    faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof item.answer === 'string' ? item.answer : 
          item.question.includes('services') ? 
            'GoodAV delivers professional audiovisual services including video production, photography, live streaming, and audio production across Rwanda and Africa.' :
            'Contact GoodAV for detailed information about our professional audiovisual services.'
      }
    })), []);

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <SEO
        title="FAQ - GoodAV Audiovisual Services | Video Production Rwanda & Africa Expert Answers"
        description="Get expert answers to frequently asked questions about GoodAV's professional audiovisual services. Learn about video production, live streaming, photography, pricing, timelines, and coverage areas across Rwanda and Africa. Find solutions for events, documentaries, corporate videos, and NGO projects."
        keywords="GoodAV FAQ, audiovisual services questions, video production FAQ Rwanda, live streaming FAQ Africa, photography services questions, professional video production answers, audiovisual pricing Rwanda, event coverage questions, documentary production FAQ, corporate video questions, NGO video services FAQ, production timeline questions, equipment rental FAQ, professional lighting questions, sound system FAQ, video editing services questions, Rwanda production company FAQ, African audiovisual services, professional media coverage FAQ, conference video FAQ, wedding videography questions"
        canonical="https://goodav.net/faq"
        type="website"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" }
        ]}
        alternateLanguages={[
          { hreflang: "en", href: "https://goodav.net/faq" },
          { hreflang: "fr", href: "https://goodav.net/fr/faq" }
        ]}
      />
      <SchemaMarkup
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqSchema
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Frequently Asked Questions - GoodAV",
            "description": "Expert answers to common questions about GoodAV's professional audiovisual services in Rwanda and Africa.",
            "url": "https://goodav.net/faq",
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "name": "GoodAV",
              "url": "https://goodav.net"
            },
            "about": {
              "@type": "Organization",
              "name": "GoodAV"
            },
            "breadcrumb": {
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
                  "name": "FAQ",
                  "item": "https://goodav.net/faq"
                }
              ]
            }
          }
        ]}
      />
      <main id="main-content" className="min-h-screen bg-[#0f1012] text-zinc-100 faq-page" role="main">
        {/* Hero */}
        <section className="relative mt-10 py-32 px-4 bg-transparent faq-hero" aria-labelledby="hero-heading">
          {/* Background Image with Overlay - Optimized for LCP */}
          <div className="absolute inset-0" aria-hidden="true">
            <img
              src={heroBackground}
              alt=""
              className="w-full h-full object-cover opacity-30 faq-hero-image"
              loading="eager"
              decoding="sync"
              width="1920"
              height="1080"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b" />
          </div>
          
          {/* Content */}
          <div className="relative max-w-6xl mx-auto text-center">
            <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r text-white bg-clip-text text-transparent faq-text">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto faq-text">
              Bringing African Stories to Life with Digital Excellence 
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="relative mx-auto max-w-4xl px-6 py-10 faq-container faq-lazy-section" aria-labelledby="faq-heading">
          <div className="text-3xl text-center font-extrabold uppercase tracking-wider text-orange-300" aria-hidden="true">
            Frequently Asked Questions
          </div>
          <h2 id="faq-heading" className="mt-2 text-h2 md:text-display leading-tight text-center faq-question faq-text">
            The Most Questions We Had
          </h2>
          <p className="mt-2 max-w-3xl mx-auto text-body text-zinc-300 faq-content faq-text">
            Answers to the most common questions about GoodAV's services to help make informed decisions.
          </p>

          {/* Accordion group */}
          <div className="mt-6 space-y-3" role="region" aria-labelledby="faq-heading">
            {faqData.map((item, index) => (
              <FAQItem key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Help CTA */}
          <aside className="mt-8 rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-5 flex items-center justify-between flex-col gap-3 sm:flex-row" aria-labelledby="help-cta-heading">
            <div>
              <h3 id="help-cta-heading" className="sr-only">Need Additional Help</h3>
              <p className="text-body text-zinc-300 faq-content faq-text">
                Didn't find an answer? Get support from the team.
              </p>
            </div>
            <div className="flex items-center gap-3" role="group" aria-label="Contact options">
              <a
                href="/contact"
                className="rounded-md bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-md font-semibold text-zinc-900 shadow hover:from-orange-400 hover:to-amber-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[#0f1012] faq-cta-button"
                aria-label="Contact GoodAV for support"
              >
                Contact Us
              </a>
              <a
                href="/portfolio"
                className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-md text-zinc-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[#0f1012] faq-cta-button"
                aria-label="Explore GoodAV portfolio of work"
              >
                Explore Portfolio
              </a>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
