import React, { Suspense, lazy } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero'; // Import Hero directly instead of lazy loading
const PartnersSection = lazy(() => import('@/components/PartnersSection')); // Make PartnersSection lazy
const ServicesSection = lazy(() => import('@/components/ServicesSection')); // Make ServicesSection lazy
const MissionSection = lazy(() => import('@/components/MissionSection')); // Make MissionSection lazy
const AboutUs = lazy(() => import('../components/AboutSection'));
const OurJourney = lazy(() => import('@/components/OurJourney'));
const FeaturedProjects = lazy(() => import('@/components/FeaturedProjects'));
const FoundersVision = lazy(() => import('@/components/FoundersVision'));
const CreativeExcellence = lazy(() => import('@/components/CreativeExcellence'));
const RecentEvents = lazy(() => import('@/components/RecentEvents'));
const PartnersLogos = lazy(() => import('@/components/PartnersLogos'));
// Remove duplicate Testimonials component since BottomCTA contains testimonials
const Blogs = lazy(() => import('@/components/BlogsSection'));
const BTSMasterProdcution = lazy(() => import('@/components/BTSMasterProdcution'));
const Excellence = lazy(() => import('@/components/Excellence'));
const BottomCTA = lazy(() => import('@/components/BottomCTA'));
const GlobalImpact = lazy(() => import('@/components/GlobalImpact'));
import SEO from '@/components/SEOEnhanced';
import SchemaMarkup from '@/components/SchemaMarkup';

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="GoodAV - Africa's Premier Audiovisual Agency | Transforming Ideas into Visual Stories"
        description="Africa's premier audiovisual agency transforming ideas into impactful visual stories. Award-winning video production, documentary, live streaming, and creative services where African creativity meets global excellence."
        keywords="Africa's premier audiovisual agency, video production Rwanda, documentary filmmaking Africa, live streaming services, audiovisual excellence, African creativity, global impact, transforming ideas visual stories, creative agency Africa, event media coverage Rwanda, cinematography Africa, storytelling through film"
        canonical="https://goodav.net/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "GoodAV - Africa's Premier Audiovisual Agency",
          "description": "Africa's premier audiovisual agency transforming ideas into impactful visual stories",
          "url": "https://goodav.net/",
          "mainEntity": {
            "@type": "Organization",
            "name": "GoodAV",
            "url": "https://goodav.net"
          },
          "hasPart": [
            {
              "@type": "WebPageElement",
              "@id": "https://goodav.net/#hero",
              "name": "Hero Section",
              "description": "Africa's Premier Audiovisual Agency introduction",
              "url": "https://goodav.net/#hero"
            },
            {
              "@type": "WebPageElement", 
              "@id": "https://goodav.net/#featured-projects",
              "name": "Featured Projects",
              "description": "Showcase of award-winning audiovisual productions",
              "url": "https://goodav.net/#featured-projects"
            },
            {
              "@type": "WebPageElement",
              "@id": "https://goodav.net/#services", 
              "name": "Services",
              "description": "Professional audiovisual services offered",
              "url": "https://goodav.net/#services"
            },
            {
              "@type": "WebPageElement",
              "@id": "https://goodav.net/#mission",
              "name": "Mission",
              "description": "Our mission to empower African narratives",
              "url": "https://goodav.net/#mission"
            },
            {
              "@type": "WebPageElement",
              "@id": "https://goodav.net/#about",
              "name": "About",
              "description": "About GoodAV and our creative excellence",
              "url": "https://goodav.net/#about"
            }
          ]
        }}
        sections={[
          {
            id: "hero",
            title: "Africa's Premier Audiovisual Agency",
            description: "Transforming ideas into impactful visual stories across Africa and beyond",
            keywords: ["audiovisual agency", "Africa premier", "visual storytelling", "creative excellence"]
          },
          {
            id: "featured-projects",
            title: "Featured Projects - World-Class Audiovisual Productions",
            description: "Showcase of our award-winning documentaries, conferences, and creative productions",
            keywords: ["featured projects", "documentaries", "conference coverage", "creative productions", "Rwanda projects"]
          },
          {
            id: "services",
            title: "Professional Audiovisual Services",
            description: "Comprehensive video production, live streaming, photography, and media services",
            keywords: ["video production", "live streaming", "photography", "media services", "professional audiovisual"]
          },
          {
            id: "mission",
            title: "Our Mission - Empowering African Narratives",
            description: "Dedicated to showcasing African excellence through powerful visual storytelling",
            keywords: ["mission", "African narratives", "storytelling", "cultural empowerment", "visual excellence"]
          },
          {
            id: "about",
            title: "About GoodAV - Creative Excellence Since 2014",
            description: "Leading audiovisual agency with over a decade of experience in Africa",
            keywords: ["about goodav", "creative excellence", "audiovisual experience", "African creativity"]
          }
        ]}
      />
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "GoodAV",
          "url": "https://goodav.net",
          "logo": "/src/assets/images/Assets/logo-fav.png",
          "description": "Africa's premier audiovisual agency transforming ideas into impactful visual stories. GoodAV empowers African narratives through cinematic production, live streaming, photography, and strategic media coverage.",
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
            "contactType": "Customer Support",
            "areaServed": ["Rwanda", "Africa", "International"],
            "availableLanguage": ["en", "fr"]
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
          "keywords": [
            "audiovisual production Rwanda",
            "video production Kigali",
            "African storytelling",
            "event media coverage",
            "cinematic campaigns",
            "live streaming services",
            "photography for events",
            "NGO storytelling",
            "corporate video production",
            "conference tourism Africa",
            "creative economy Africa",
            "digital media Africa",
            "multilingual video production",
            "documentary filmmaking Rwanda",
            "social media video content",
            "branding through video",
            "testimonials video editing",
            "lighting and sound systems",
            "virtual event production",
            "e-learning video solutions",
            "audiovisual services for NGOs",
            "African creative industries",
            "youth empowerment through media",
            "cultural preservation via film",
            "pan-African media agency",
            "impact storytelling Africa",
            "professional media coverage",
            "YouTube content creation Africa",
            "Instagram reels production",
            "TikTok video strategy Africa",
            "cinematic drone footage Rwanda",
            "visual storytelling for brands",
            "high-quality video editing",
            "media production for development",
            "creative direction Africa",
            "audiovisual innovation Africa"
          ]
        }}
      />
      <main>
        <Hero />
        <Suspense fallback={null}><PartnersSection /></Suspense>
        <Suspense fallback={null}><ServicesSection /></Suspense>
        <Suspense fallback={null}><MissionSection /></Suspense>
        <Suspense fallback={null}><GlobalImpact /></Suspense>
        <Suspense fallback={null}><AboutUs /></Suspense>
        <Suspense fallback={null}><OurJourney /></Suspense>
        <Suspense fallback={null}><FeaturedProjects /></Suspense>
        <Suspense fallback={null}><FoundersVision /></Suspense>
        <Suspense fallback={null}><CreativeExcellence /></Suspense>
        <Suspense fallback={null}><RecentEvents /></Suspense>
        <Suspense fallback={null}>
          <PartnersLogos 
            title="Our Valued Partners"
            subtitle="Building impactful relationships with leading organizations across Africa and beyond to create meaningful audiovisual experiences."
            showTrustedBadge={true}
            showTitle={true}
            showSubtitle={true}
            containerPadding="py-20"
          />
        </Suspense>
        <Suspense fallback={null}><Blogs /></Suspense>
        <Suspense fallback={null}><BTSMasterProdcution /></Suspense>
        <Suspense fallback={null}><Excellence /></Suspense>
        <Suspense fallback={null}><BottomCTA /></Suspense>
      </main>
    </div>
  );
};

export default Index;
