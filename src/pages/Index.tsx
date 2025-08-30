import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PartnersSection from '@/components/PartnersSection';
import ServicesSection from '@/components/ServicesSection';
import MissionSection from '@/components/MissionSection';
import Footer from '@/components/Footer';
import AboutUs from '../components/AboutSection';
import OurJourney from '@/components/OurJourney';
import FeaturedProjects from '@/components/FeaturedProjects';
import FoundersVision from '@/components/FoundersVision';
import CreativeExcellence from '@/components/CreativeExcellence';
import RecentEvents from '@/components/RecentEvents';
import Testimonials from '@/components/Testimonials';
import Blogs from '@/components/BlogsSection';
import BTSMasterProdcution from '@/components/BTSMasterProdcution';
import Excellence from '@/components/Excellence';
import GlobalImpact from '@/components/GlobalImpact';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="GoodAV - Africa's Premier Audiovisual Agency | Kigali, Rwanda"
        description="Africa's premier audiovisual agency transforming ideas into impactful visual stories. GoodAV empowers African narratives through cinematic production, live streaming, photography, and strategic media coverage."
        keywords="audiovisual production Rwanda, video production Kigali, African storytelling, event media coverage, cinematic campaigns, live streaming services, photography for events, NGO storytelling, corporate video production, conference tourism Africa, creative economy Africa, digital media Africa, multilingual video production, documentary filmmaking Rwanda, social media video content, branding through video, testimonials video editing, lighting and sound systems, virtual event production, e-learning video solutions, audiovisual services for NGOs, African creative industries, youth empowerment through media, cultural preservation via film, pan-African media agency, impact storytelling Africa, professional media coverage, YouTube content creation Africa, Instagram reels production, TikTok video strategy Africa, cinematic drone footage Rwanda, visual storytelling for brands, high-quality video editing, media production for development, creative direction Africa, audiovisual innovation Africa"
        canonical="https://goodav.net/"
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
        <PartnersSection />
        <ServicesSection />
        <MissionSection />
        <GlobalImpact />
        <AboutUs />
        <OurJourney />
        <FeaturedProjects />
        <FoundersVision />
        <CreativeExcellence />
        <RecentEvents />
        <Testimonials />
        <Blogs />
        <BTSMasterProdcution /> 
        <Excellence/>
      </main>
      <Footer role="contentinfo" />
    </div>
  );
};

export default Index;
