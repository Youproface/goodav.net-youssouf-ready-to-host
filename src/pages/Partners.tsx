import BTSMasterProduction from '@/components/BTSMasterProdcution';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';

export default function Partners() {
  const navigate = useNavigate();
  return (
    <>
      <SEO
        title="Partners - GoodAV | Trusted Audiovisual Collaborators"
        description="Meet GoodAV’s partners and collaborators. Discover why global organizations trust GoodAV for audiovisual production in Rwanda and Africa."
        canonical="https://goodav.net/partner"
      />
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "GoodAV",
          "url": "https://goodav.net",
          "logo": "https://goodav.net/image/Assets/logo-fav.png",
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
            return (
              <div>
                <SEO
                  title="Partners - GoodAV | Trusted Audiovisual Collaborators"
                  description="Meet GoodAV’s partners and collaborators. Discover why global organizations trust GoodAV for audiovisual production in Rwanda and Africa."
                  canonical="https://goodav.net/partner"
                />
                <SchemaMarkup
                  schema={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "GoodAV",
                    "url": "https://goodav.net",
                    "logo": "https://goodav.net/image/Assets/logo-fav.png",
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
                    }
                  }}
                />
                <div className="bg-gray-900 text-white font-sans">
                  {/* ...existing code... */}
                </div>
              </div>
            );
        </div>

        {/* Award Recognition */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-gray-800 h-16 w-32 rounded-md flex items-center justify-center text-gray-400 text-xs">
              🏆 Recent Award Recognition
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="bg-orange-600 p-4 rounded text-xs max-w-sm mx-auto">
          <strong>TRUSTED BY GLOBAL ORGANIZATIONS</strong>
          <br />
          GIZ, Gilead Sciences, SNV, AMC, Keping, and many more trust us for their audiovisual needs.
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-orange-500 uppercase tracking-wide">
              ABOUT GOODAV
            </h3>
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-white">
              YOUR KIGALI-BASED<br />AUDIOVISUAL PARTNER
            </h4>
            <p className="text-base sm:text-lg text-gray-300 mb-8">
              GoodAv is a Kigali-based audiovisual production company specializing in end-to-end storytelling services
              for global partners operating in Rwanda and East Africa. We support international NGOs, institutions,
              and media agencies by providing cinematic filming, drone permits, multilingual teams,
              cloud-based delivery, and behind-the-scenes content -- all under one trusted roof.
            </p>
            
            <div className="mb-6">
              <h5 className="font-semibold text-white text-lg mb-3">WHY PARTNER WITH GOODAV?</h5>
              <p className="text-base text-gray-300">
                International teams often struggle with permits, compliance, logistics, and time zones.
                GoodAv handles it all -- production, post, compliance, and delivery.
                Our local expertise combined with global standards ensures your projects run smoothly from concept to delivery.
              </p>
            </div>

            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">20+</p>
                <p className="text-xs text-gray-400 uppercase">Global Partners</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">500+</p>
                <p className="text-xs text-gray-400 uppercase">Projects Delivered</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">10+</p>
                <p className="text-xs text-gray-400 uppercase">Years</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">5+</p>
                <p className="text-xs text-gray-400 uppercase">Countries</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 h-64 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">▶</span>
                </div>
                <p className="text-sm text-gray-300">Watch Our Story</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="bg-gray-900 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">WHY PARTNER WITH US</h2>
            <div className="w-24 h-1.5 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Benefit 1 */}
            <div className="bg-gray-800 p-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-4">END-TO-END PRODUCTION</h3>
              <p className="text-gray-300 text-center text-base md:text-lg">Full-service production from concept to delivery, ensuring seamless execution and high-quality results for every project.</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-gray-800 p-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">GLOBAL REACH</h3>
              <p className="text-gray-300 text-center">Extensive network and experience working with international clients, ensuring your content resonates globally.</p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-gray-800 p-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">FAST TURNAROUND</h3>
              <p className="text-gray-300 text-center">Efficient workflows and dedicated teams that deliver exceptional results on time, every time.</p>
            </div>
            
            {/* Benefit 4 */}
            <div className="bg-gray-800 p-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">SECURE DELIVERY</h3>
              <p className="text-gray-300 text-center">Secure cloud-based delivery with 90-day backup and multiple format options for your convenience.</p>
            </div>
            
            {/* Benefit 5 */}
            <div className="bg-gray-800 p-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">MULTILINGUAL SUPPORT</h3>
              <p className="text-gray-300 text-center">Bilingual and multilingual capabilities for seamless communication and content localization.</p>
            </div>
            
            {/* Benefit 6 */}
            <div className="bg-gray-800 p-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">COMPLIANCE EXPERTISE</h3>
              <p className="text-gray-300 text-center">Full handling of government permits, drone authorizations, and all legal requirements.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              START YOUR PROJECT TODAY
            </button>
          </div>
        </div>
      </section>

      {/* Types of Partnerships Section */}
      <section className="bg-gray-800 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">TYPES OF PARTNERSHIPS</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Strategic Alliances */}
            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Strategic Alliances</h3>
              <p className="text-gray-300 mb-6">
                Long-term partnerships for ongoing audiovisual needs across multiple projects and regions.
              </p>
            </div>
            
            {/* Project-Based Engagements */}
            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Project-Based Engagements</h3>
              <p className="text-gray-300 mb-6">
                Dedicated support for specific events, documentaries, or campaigns with full-service coverage.
              </p>
            </div>
            
            {/* Retainer / Ongoing AV Coverage */}
            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Retainer / Ongoing AV Coverage</h3>
              <p className="text-gray-300 mb-6">
                Monthly or quarterly service agreements for consistent audiovisual support and rapid deployment.
              </p>
            </div>
            
            {/* Compliance & Permits */}
            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">COMPLIANCE & PERMITS</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Government filming clearance</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Drone authorization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Location scouting</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Legal compliance and insurance coverage</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              DOWNLOAD DECK
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              BOOK A CALL
            </button>
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center">FEATURED PROJECTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Project 1 */}
          <div className="group relative h-64 rounded-lg overflow-hidden cursor-pointer">
            <img 
              src="/src/assets/images/all_site_images/Home/Feature_Video/Feature_Video_01.jpg" 
              alt="Featured Project 1"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                <span className="text-2xl">▶</span>
              </div>
            </div>
          </div>
          
          {/* Project 2 */}
          <div className="group relative h-64 rounded-lg overflow-hidden cursor-pointer">
            <img 
              src="/src/assets/images/all_site_images/Home/Feature_Video/Feature_Video_02.jpg" 
              alt="Featured Project 2"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                <span className="text-2xl">▶</span>
              </div>
            </div>
          </div>
          
          {/* Project 3 */}
          <div className="group relative h-64 rounded-lg overflow-hidden cursor-pointer">
            <img 
              src="/src/assets/images/all_site_images/Home/Feature_Video/Feature_Video_03.jpg" 
              alt="Featured Project 3"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                <span className="text-2xl">▶</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-base text-gray-300 mb-6 max-w-4xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lectus velit, iaculis quis mauris sit amet, gravida placerat nisl.
          Nullam ut facilisis neque aliquet, rhoncus commodo ligula lobortis eget, tincidunt lectus eu nisl.
          Ullamcorper lacus dui fermentum dignissim maximus. Nullam congue diam nulla, vitae sagittis lorem bibendum eu.
          Curabitur eu eu pulvinar massa convalis ornare.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 py-3 px-6 rounded-md font-semibold text-sm transition-colors">
            SEE ALL PROJECTS
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 py-3 px-6 rounded-md font-semibold text-sm transition-colors">
            START THE PROJECT
          </button>
        </div>
      </section>

      {/* Successful Partnerships Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl md:text-4xl font-bold mb-10 text-white">SUCCESSFUL PARTNERSHIPS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <div className="h-32 mb-4 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">▶</span>
            </div>
            <h4 className="text-lg font-semibold mb-4 text-white">GILEAD SCIENCES - IAS 2025 KIGALI</h4>
            <p className="text-base text-gray-300 mb-4">
              5-day event coverage including b-roll, BTS, interviews, and live edits for one of the world's largest HIV conferences.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded text-xs font-semibold transition-colors">
              VIEW CASE STUDY
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <div className="h-32 mb-4 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">▶</span>
            </div>
            <h4 className="text-lg font-semibold mb-4 text-white">GIZ - BIOMEX & UVU-BIO PROJECT</h4>
            <p className="text-base text-gray-300 mb-4">
              Discover how biotechs, in partnership with UVU-Bio, are strengthening Rwanda's biotechnology sector by training the
              next generation of skilled professionals through hands-on lab experience.
            </p>
            <button 
              onClick={() => navigate('/case-study/biomex-uuvio-project', { 
                state: { 
                  caseStudy: {
                    id: 'biomex-uuvio-project',
                    title: 'Biomex UVU-Bio Project',
                    description: 'Strengthening Rwanda\'s biotechnology sector through hands-on training',
                    content: {
                      overview: 'The Biomex UVU-Bio Project is a collaborative initiative aimed at enhancing Rwanda\'s biotechnology capabilities by providing practical, hands-on training to the next generation of skilled professionals.',
                      challenge: 'Rwanda faced a significant skills gap in the biotechnology sector, with limited opportunities for practical, hands-on training in modern laboratory techniques and technologies.',
                      solution: 'Through a partnership with UVU-Bio, we developed a comprehensive training program that provides students with real-world laboratory experience, mentorship from industry professionals, and access to state-of-the-art equipment.',
                      impact: 'The program has successfully trained over 200 students, with 85% securing employment in the biotechnology sector within six months of completing the program.'
                    },
                    image: '/src/assets/images/all_site_images/Blog/Goodav_in_Action.jpg',
                    date: '2024',
                    client: 'UVU-Bio',
                    category: 'Education & Training',
                    testimonial: {
                      text: 'The Biomex program transformed our students from theory-focused learners to competent laboratory professionals ready to tackle real-world challenges.',
                      author: 'Dr. Jane Doe',
                      role: 'Director, UVU-Bio'
                    }
                  }
                } 
              })} 
              className="bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded text-xs font-semibold transition-colors"
            >
              VIEW CASE STUDY
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <div className="h-32 mb-4 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">▶</span>
            </div>
            <h4 className="text-lg font-semibold mb-4 text-white">SNV - HOW CLEAN COOKING IS TRANSFORMING LIVES</h4>
            <p className="text-base text-gray-300 mb-4">
              Climate & Communities in Rwanda RCE, a 5-year initiative led by GIZ, SNV, and funded by the EU, distributed 44,000 clean cookstoves,
              achieving 77% energy savings and empowering women, youth, and local entrepreneurs across Rwanda.
            </p>
            <button 
              onClick={() => navigate('/case-study/clean-cooking-transformation', { 
                state: { 
                  caseStudy: {
                    id: 'clean-cooking-transformation',
                    title: 'Clean Cooking Transformation',
                    description: 'Empowering communities through sustainable cooking solutions',
                    content: {
                      overview: 'The Clean Cooking Transformation initiative, led by SNV and funded by the EU, has successfully distributed 44,000 clean cookstoves across Rwanda, significantly improving living conditions and reducing environmental impact.',
                      challenge: 'Traditional cooking methods in Rwanda were causing severe health issues, environmental degradation, and consuming large amounts of firewood. Women and children were particularly affected by indoor air pollution.',
                      solution: 'We implemented a large-scale distribution of energy-efficient cookstoves, coupled with comprehensive training programs on their use and maintenance. The initiative also included creating local business opportunities for stove production and distribution.',
                      impact: 'The project achieved 77% energy savings, reduced indoor air pollution by 60%, and created over 200 local businesses. It has directly benefited more than 200,000 people across Rwanda.'
                    },
                    image: '/src/assets/images/all_site_images/Blog/Goodav_Rural_Team_in_action.jpg',
                    date: '2023-2024',
                    client: 'SNV / GIZ / EU',
                    category: 'Sustainable Development',
                    testimonial: {
                      text: 'This initiative has transformed lives in our community. The clean cookstoves have reduced our firewood consumption and improved our family\'s health significantly.',
                      author: 'Marie Uwamahoro',
                      role: 'Community Leader, Nyaruguru District'
                    }
                  }
                } 
              })}
              className="bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded text-xs font-semibold transition-colors"
            >
              VIEW CASE STUDY
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl md:text-4xl font-bold mb-12 text-white">WHAT OUR PARTNERS SAY</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <blockquote className="bg-gray-800 p-8 rounded-lg">
            <div className="text-yellow-400 mb-4">★★★★★</div>
            <p className="text-gray-300 mb-4 italic">
              "The GoodAv team delivered high-quality production across multiple days, professionally, securely, and beautifully."
            </p>
            <footer className="text-sm font-semibold text-white">
              - Project Lead, Gilead Sciences
            </footer>
          </blockquote>
          
          <blockquote className="bg-gray-800 p-8 rounded-lg">
            <div className="text-yellow-400 mb-4">★★★★★</div>
            <p className="text-gray-300 mb-4 italic">
              "GoodAv's storytelling expertise brought our biotech training program to life, showcasing the real impact of our partnership
              in developing Rwanda's future workforce."
            </p>
            <footer className="text-sm font-semibold text-white">
              - Project Manager, GIZ Biotech Program
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Ready to Collaborate Section */}
      <section className="bg-gray-800 px-6 py-16 mb-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">🎬 READY TO FILM IN RWANDA?</h3>
          <p className="text-gray-300 text-xl md:text-2xl mb-10">Let's collaborate on your next production - cinematic, compliant, and globally ready.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button className="bg-orange-500 hover:bg-orange-600 py-3 px-6 rounded-md font-semibold text-sm transition-colors">
              WATCH REEL
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 py-3 px-6 rounded-md font-semibold text-sm transition-colors">
              DOWNLOAD DECK
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 py-3 px-6 rounded-md font-semibold text-sm transition-colors">
              BOOK CALL
            </button>
          </div>
          <p className="text-xl text-gray-400">Contact us: yousouf@goodav.net</p>
        </div>
      </section>

      <BTSMasterProduction />

      {/* Previous Projects Section */}
      <section className="bg-gray-800 text-white px-6 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-base text-gray-400 mb-3">STILL HAVE A DOUBT?</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-6">WANT TO SEE OUR PREVIOUS PROJECTS?</h3>
          <p className="text-gray-300 text-lg mb-8">GoodAv experts team has successfully handled projects of all scales</p>
          <button onClick={() => navigate('/portfolio')} className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-md font-semibold text-sm transition-colors">
            ALL PROJECTS
          </button>
        </div>
      </section>
    </div>
      </div>
    </>
  );
}
