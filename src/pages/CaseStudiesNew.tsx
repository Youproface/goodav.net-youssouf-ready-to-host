import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaArrowRight } from 'react-icons/fa';
import { getFeaturedCaseStudies } from '@/data/featuredCaseStudies';
import SEOEnhanced from '@/components/SEOEnhanced';
import SchemaMarkup from '@/components/SchemaMarkup';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const CaseStudiesNew: React.FC = () => {
  console.log('CaseStudiesNew component is rendering - FULL COMPONENT');
  
  const featuredCaseStudies = getFeaturedCaseStudies();
  console.log('Loaded case studies:', featuredCaseStudies?.length);
  console.log('Featured case studies data:', featuredCaseStudies);
  
  // Assign images in chronological order - Updated to include all 12 images
  const caseStudyImages = [
    '/images/all_site_images/case-study/case-study-1.jpg',
    '/images/all_site_images/case-study/case-study-2.png',
    '/images/all_site_images/case-study/case-study-3.jpg',
    '/images/all_site_images/case-study/case-study-4.jpeg',
    '/images/all_site_images/case-study/case-study-5.jpeg',
    '/images/all_site_images/case-study/case-study-6.png',
    '/images/all_site_images/case-study/case-study-7.jpg',
    '/images/all_site_images/case-study/case-study-8.jpg',
    '/images/all_site_images/case-study/case-study-9.jpg',
    '/images/all_site_images/case-study/case-study-10.jpg',
    '/images/all_site_images/case-study/case-study-11.jpg',
    '/images/all_site_images/case-study/case-study-12.jpg'
  ];
  
  // Debug each case study
  featuredCaseStudies.forEach((study, index) => {
    console.log(`Case study ${index}:`, {
      id: study.id,
      title: study.title,
      image: study.image,
      hasContent: !!study.content,
      overview: study.content?.overview?.substring(0, 50) + '...',
      tags: study.tags
    });
  });

  return (
    <>
      <SEOEnhanced
        title="Case Studies - GoodAV | Success Stories & Client Projects"
        description="Explore GoodAV's portfolio of successful audiovisual projects, from international conferences to digital campaigns. See our impact across various industries."
        keywords="GoodAV case studies, client success stories, audiovisual projects, conference coverage, video production portfolio, photography portfolio, Rwanda video production, African storytelling, documentary production, live streaming services"
        canonical="https://goodav.net/case-studies"
        type="website"
        sections={featuredCaseStudies.slice(0, 6).map((study, index) => ({
          id: study.slug,
          title: study.title,
          description: study.description,
          keywords: study.tags ? study.tags.slice(0, 4) : []
        }))}
      />
      
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "GoodAV Case Studies",
          "description": "Portfolio of successful audiovisual projects and client success stories",
          "url": "https://goodav.net/case-studies",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": featuredCaseStudies.map((study, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Article",
                "name": study.title,
                "description": study.content.overview,
                "url": `https://goodav.net/case-studies/${study.id}`,
                "image": study.image,
                "author": {
                  "@type": "Organization",
                  "name": "GoodAV"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "GoodAV",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://goodav.net/images/all_site_images/Assets/logo-full-color.svg"
                  }
                },
                "datePublished": study.date,
                "dateModified": study.date
              }
            }))
          }
        }}
      />

      <main className="min-h-screen bg-[#0f1012] text-white">
        {/* Hero Section */}
        <motion.header
          id="case-studies-hero"
          className="hero-section relative mt-6 py-32 px-4 -mx-4 sm:-mx-6 md:-mx-8 bg-transparent text-center mb-16 flex flex-col items-center justify-center min-h-[420px] rounded-b-2xl"
          role="banner"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          aria-labelledby="hero-heading"
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
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0f1012]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <motion.div variants={itemVariants}>
              <h1 id="hero-heading" className="text-5xl md:text-6xl font-bold mb-6">
                Our <span className="text-orange-400">Success Stories</span>
              </h1>
              <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
                Discover how GoodAV has delivered exceptional audiovisual experiences for clients across the globe. From international conferences to digital campaigns, see our impact in action.
              </p>
            </motion.div>
          </div>
        </motion.header>

        {/* Featured Case Studies */}
        <section id="featured-projects" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-orange-400 mb-4">Featured Projects</h2>
              <p className="text-lg text-zinc-300">
                Highlighting our most impactful and innovative audiovisual productions
              </p>
            </div>

            {featuredCaseStudies.length === 0 && (
              <p className="text-center text-red-500">No case studies available.</p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredCaseStudies.map((study, index) => {
                console.log(`Rendering case study ${index}:`, study.title);
                // Use chronological image assignment
                const studyImage = caseStudyImages[index] || caseStudyImages[0];
                
                return (
                <div
                  key={study.id}
                  className="bg-zinc-800/30 rounded-xl overflow-hidden hover:bg-zinc-800/50 transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={studyImage} 
                      alt={study.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-orange-400" />
                        {study.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-orange-400" />
                        {study.location}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                      {study.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
                      <FaBuilding className="text-orange-400" />
                      <span>{study.client}</span>
                    </div>
                    
                    <p className="text-zinc-300 text-sm mb-6 line-clamp-3">
                      {study.content?.overview}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-orange-400/10 text-orange-400 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link
                      to={study.id === 'gilead-ias-2025' ? '/case-studies/gilead-ias-2025' : `/case-study/${study.slug ?? study.id}`}
                      className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-semibold"
                    >
                      View Full Case Study
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-zinc-900/30">
          <div className="container mx-auto px-4 text-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Ready to Create Your Success Story?</h3>
              <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
                Join our growing list of satisfied clients who have experienced the GoodAV difference.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CaseStudiesNew;
