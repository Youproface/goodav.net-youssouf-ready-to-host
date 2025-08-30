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

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
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
    </div>
  );
};

export default Index;
