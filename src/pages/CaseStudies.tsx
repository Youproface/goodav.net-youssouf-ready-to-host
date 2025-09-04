import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import { getCaseStudyById, getFeaturedCaseStudies } from '@/data/caseStudies';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';

const CaseStudies: React.FC = () => {
  const featuredCaseStudies = getFeaturedCaseStudies();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="bg-[#0f1012] text-zinc-100 min-h-screen pt-24">
      <SEO
        title="Case Studies - GoodAV | Success Stories & Client Projects"
        description="Explore GoodAV's portfolio of successful audiovisual projects, from international conferences to digital campaigns. See our impact across various industries."
        keywords="GoodAV case studies, client success stories, audiovisual projects, conference coverage, video production portfolio, photography portfolio"
        canonical="https://goodav.net/case-studies"
        type="website"
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
                "image": study.image
              }
            }))
          }
        }}
      />

      {/* Hero Section */}
      <motion.section 
        className="py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-orange-400">Success Stories</span>
            </h1>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Discover how GoodAV has delivered exceptional audiovisual experiences for clients across the globe. From international conferences to digital campaigns, see our impact in action.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Case Studies */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-orange-400 mb-4">Featured Projects</h2>
            <p className="text-lg text-zinc-300">
              Highlighting our most impactful and innovative audiovisual productions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredCaseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                className="bg-zinc-800/30 rounded-xl overflow-hidden hover:bg-zinc-800/50 transition-all duration-300 group"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={study.image} 
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
                    {study.overview}
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
                  
                  {study.slug === 'gilead-ias-2025' ? (
                    <Link
                      to={`/case-studies/${study.slug}`}
                      className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-semibold"
                    >
                      View Full Case Study
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="text-sm">Coming Soon</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-zinc-900/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={itemVariants}>
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
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default CaseStudies;
