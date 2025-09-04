import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaCamera, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaBuilding, 
  FaHandshake,
  FaEye,
  FaTasks,
  FaVideo,
  FaPhotoVideo,
  FaHelicopter,
  FaMicrophone,
  FaBolt,
  FaBox,
  FaCheckCircle,
  FaStar,
  FaGlobe,
  FaMapMarkedAlt,
  FaMobile,
  FaShieldAlt,
  FaPaw,
  FaQuoteLeft,
  FaTrophy,
  FaArrowLeft,
  FaCheck
} from 'react-icons/fa';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import YouTubeModal from '../../components/YouTubeModal';
import { caseStudies } from '../../data/caseStudies';

const GileadCaseStudy: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const testimonials = [
    {
      quote: "A huge thank you to you and the team, Youssouf. I've seen some of the initial edits — they are fantastic. Clients are thrilled.",
      author: "Michelle",
      role: "Creative Lead, Bensimon Byrne"
    },
    {
      quote: "Yes, thank you so much to everyone for all of your help! Really great working with all of you. Thank you for being so adaptable — the footage & photos are all looking really great.",
      author: "Katie Link",
      role: "Producer, Bensimon Byrne"
    },
    {
      quote: "Just wanted to send a HUGE thank you to everyone for such an amazing experience in Kigali. The work was great and clients are thrilled.",
      author: "Will Dell",
      role: "VP, Group Business Director, Bensimon Byrne"
    }
  ];

  return (
    <main className="bg-[#0f1012] text-zinc-100 min-h-screen">
      <SEO
        title="Gilead IAS 2025 Case Study - GoodAV | International Conference Media Coverage"
        description="Comprehensive case study of GoodAV's full media coverage for Gilead Sciences at the 13th International AIDS Society Conference on HIV Science (IAS 2025) in Kigali, Rwanda."
        keywords="Gilead Sciences, IAS 2025, HIV conference, Kigali Convention Centre, international conference coverage, pharmaceutical media, medical conference video production, Rwanda events"
        canonical="https://goodav.net/case-studies/gilead-ias-2025"
        type="article"
        image="/images/all_site_images/Portfolio/gilead-ias-2025.jpg"
      />
      
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Full Media Coverage of IAS 2025 - Gilead Sciences Case Study",
          "description": "Comprehensive case study showcasing GoodAV's audiovisual production for the 13th International AIDS Society Conference on HIV Science",
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
          "datePublished": "2025-07-17",
          "dateModified": "2025-07-17",
          "mainEntityOfPage": "https://goodav.net/case-studies/gilead-ias-2025",
          "image": "https://goodav.net/images/all_site_images/Portfolio/gilead-ias-2025.jpg"
        }}
      />

      {/* Hero Section */}
      <motion.section 
        className="relative py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <FaCamera className="inline mr-4 text-orange-400" />
              Full Media Coverage of IAS 2025
            </h1>
            <h2 className="text-2xl md:text-3xl text-orange-400 font-bold mb-8">
              13th International AIDS Society Conference on HIV Science
            </h2>
            
            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <FaMapMarkerAlt className="text-orange-400 inline mr-2" />
                <span className="font-semibold">Kigali, Rwanda</span>
              </div>
              <div className="text-center">
                <FaCalendarAlt className="text-orange-400 inline mr-2" />
                <span className="font-semibold">July 13–17, 2025</span>
              </div>
              <div className="text-center">
                <FaBuilding className="text-orange-400 inline mr-2" />
                <span className="font-semibold">Kigali Convention Centre</span>
              </div>
              <div className="text-center">
                <FaHandshake className="text-orange-400 inline mr-2" />
                <span className="font-semibold">Gilead Sciences</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div className="flex justify-center" variants={itemVariants}>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-zinc-700 max-w-4xl">
              <img 
                src="/images/all_site_images/case-study/case-study-1.jpg" 
                alt="Full Media Coverage of IAS 2025" 
                className="w-full h-96 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Overview */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-orange-400 mb-6 flex items-center">
              <FaEye className="mr-3" />
              Overview
            </h3>
            <div className="bg-zinc-800/50 p-8 rounded-xl">
              <p className="text-lg mb-4 leading-relaxed">
                GoodAV had the honor of covering the 13th IAS Conference on HIV Science (IAS 2025) — one of the most prominent global events in HIV research and public health. Hosted in Kigali by the Government of Rwanda, the conference brought together world leaders in science, policy, and advocacy.
              </p>
              <p className="text-lg leading-relaxed">
                In strategic partnership with <strong className="text-orange-300">Bensimon Byrne</strong> and <strong className="text-orange-300">Gilead Sciences</strong>, GoodAV led the full-scale audiovisual production — managing a dynamic schedule across the Kigali Convention Centre and other key sites around the city. Our team ensured real-time coordination with international creative teams, delivering high-impact content for social, news, and internal platforms.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Scope of Work */}
      <motion.section 
        className="py-16 bg-zinc-900/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-orange-400 mb-8 flex items-center">
              <FaTasks className="mr-3" />
              Scope of Work
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-zinc-800/50 p-6 rounded-xl h-full">
                <h5 className="text-xl font-bold text-orange-300 mb-4 flex items-center">
                  <FaVideo className="mr-3" />
                  Video Production
                </h5>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <FaCheck className="text-orange-400 mr-3 flex-shrink-0" />
                    Conference highlights and interviews
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-orange-400 mr-3 flex-shrink-0" />
                    Gilead booth footage
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-orange-400 mr-3 flex-shrink-0" />
                    Symposium sessions
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-orange-400 mr-3 flex-shrink-0" />
                    Street-style interview series
                  </li>
                </ul>
              </div>
              
              <div className="bg-zinc-800/50 p-6 rounded-xl h-full">
                <h5 className="text-xl font-bold text-orange-300 mb-4 flex items-center">
                  <FaPhotoVideo className="mr-3" />
                  Photography
                </h5>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <FaCheck className="text-orange-400 mr-3 flex-shrink-0" />
                    Editorial portraits
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-orange-400 mr-3 flex-shrink-0" />
                    LinkedIn-ready photos
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-orange-400 mr-3 flex-shrink-0" />
                    Booth activations
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-orange-400 mr-3 flex-shrink-0" />
                    Behind-the-scenes shots
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-zinc-800/50 p-6 rounded-xl h-full">
                <h5 className="text-xl font-bold text-orange-300 mb-4 flex items-center">
                  <FaHelicopter className="mr-3" />
                  Drone Footage
                </h5>
                <p>Aerial visuals covering iconic Kigali zones including Kimihurura, Kanyinya Hill, Kisimenti, and the city center.</p>
              </div>
              
              <div className="bg-zinc-800/50 p-6 rounded-xl h-full">
                <h5 className="text-xl font-bold text-orange-300 mb-4 flex items-center">
                  <FaMicrophone className="mr-3" />
                  Sound Recording
                </h5>
                <p>Clean audio capture for panel discussions, interviews, and voiceover elements.</p>
              </div>
              
              <div className="bg-zinc-800/50 p-6 rounded-xl h-full">
                <h5 className="text-xl font-bold text-orange-300 mb-4 flex items-center">
                  <FaBolt className="mr-3" />
                  Quick-Turn Editing
                </h5>
                <p>Fast delivery of edited content for use during the conference and on broadcast platforms.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Deliverables */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-orange-400 mb-8 flex items-center">
              <FaBox className="mr-3" />
              Deliverables
            </h3>
            <div className="bg-zinc-800/50 p-8 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "3 Highlight Videos (Recaps & Cutdowns)",
                  "2 \"Street Style\" Interview Films",
                  "1 Internal Sizzle Reel (No VO)",
                  "100+ High-Res Edited Photos",
                  "Full Access to Raw Footage & Drone Assets",
                  "Photography for CEO LinkedIn Feature"
                ].map((deliverable, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center"
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FaCheckCircle className="text-orange-400 mr-3 flex-shrink-0" />
                    <span>{deliverable}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* What Made It Unique */}
      <motion.section 
        className="py-16 bg-zinc-900/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-orange-400 mb-8 flex items-center">
              <FaStar className="mr-3" />
              What Made It Unique
            </h3>
            <div className="bg-zinc-800/50 p-8 rounded-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <FaGlobe className="text-orange-400 mr-3 flex-shrink-0" />
                      Local expertise combined with global production standards
                    </li>
                    <li className="flex items-center">
                      <FaMapMarkedAlt className="text-orange-400 mr-3 flex-shrink-0" />
                      Filming across five high-traffic Kigali locations
                    </li>
                    <li className="flex items-center">
                      <FaMobile className="text-orange-400 mr-3 flex-shrink-0" />
                      Daily WhatsApp updates for international creative teams
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <FaShieldAlt className="text-orange-400 mr-3 flex-shrink-0" />
                      Pharmaceutical and regulatory compliance
                    </li>
                    <li className="flex items-center">
                      <FaPaw className="text-orange-400 mr-3 flex-shrink-0" />
                      Additional client hospitality including Safari tour support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Videos Section */}
      <motion.section 
        className="py-16 bg-zinc-900/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-orange-400 mb-4 flex items-center justify-center">
              <FaVideo className="mr-3" />
              Featured Project Videos
            </h3>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              Watch the highlights from our comprehensive coverage of the IAS 2025 Conference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {caseStudies['gilead-ias-2025']?.videos?.map((video, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ delay: index * 0.2 }}
                className="flex justify-center"
              >
                <YouTubeModal
                  videoId={video.url}
                  title={video.title}
                  className="w-full max-w-sm"
                  containerClassName="h-48 md:h-56"
                  buttonClassName="w-12 h-12"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-orange-400 mb-8 text-center flex items-center justify-center">
              <FaQuoteLeft className="mr-3" />
              What Our Partners Said
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-zinc-800/50 p-6 rounded-xl text-center h-full flex flex-col"
                  variants={itemVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  <blockquote className="text-lg italic mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <h6 className="text-orange-300 font-bold mb-1">{testimonial.author}</h6>
                    <span className="text-zinc-400 text-sm">{testimonial.role}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Outcome */}
      <motion.section 
        className="py-16 bg-zinc-900/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-orange-400 mb-8 flex items-center">
              <FaTrophy className="mr-3" />
              Outcome
            </h3>
            <div className="bg-zinc-800/50 p-8 rounded-xl">
              <p className="text-lg leading-relaxed">
                The resulting content was featured on broadcast platforms, used for Gilead's internal and public campaigns, and praised by both creative directors and clients. From drone visuals and live interviews to last-minute logistics and hospitality support, GoodAV delivered excellence with cultural fluency and technical precision.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-6">Ready to Create Your Success Story?</h3>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Let us help you deliver exceptional audiovisual experiences for your next event or campaign.
            </p>
            <motion.button
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default GileadCaseStudy;
