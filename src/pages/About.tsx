import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

// Hero background
const heroBackground = '/images/all_site_images/Home/Banner/Home_Video_Banner_Optimized.gif';

// Team images
const vincentImg = '/images/all_site_images/About/Team/Vincent.png';
const josueImg = '/images/all_site_images/About/Team/Josue.png';
const marieImg = '/images/all_site_images/About/Team/Marie.png';
const adelineImg = '/images/all_site_images/About/Team/Adeline.png';
const claudineImg = '/images/all_site_images/About/Team/Claudine.png';
const emmyImg = '/images/all_site_images/About/Team/Emmy.png';
const etienneImg = '/images/all_site_images/About/Team/Etienne.png';
const mediatriceImg = '/images/all_site_images/About/Team/Mediatrice.png';
const ngaboImg = '/images/all_site_images/About/Team/Ngabo.png';
const richmondImg = '/images/all_site_images/About/Team/Richmond.png';
const dodoImg = '/images/all_site_images/About/Team/dodo.png';
const gentilImg = '/images/all_site_images/About/Team/gentil.png';

// Founder timeline copied from components/FoundersVision
const founderStory = [
  {
    year: '2010',
    title: 'The Beginning',
    description:
      "Started with a powerful belief: every story deserves to be told with authenticity, impact, and precision.",
    images: [
      '/images/all_site_images/Home/TIMELINE/2010-The Beginning-1.jpg',
      '/images/all_site_images/Home/TIMELINE/2010-The-Beginning-2.jpg',
    ],
  },
  {
    year: '2015',
    title: 'Building Expertise',
    description:
      "Developed mastery across video production, photography, live streaming, and audio creation throughout Rwanda and East Africa.",
    images: [
      '/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-1.jpg',
      '/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-2.jpg',
      '/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-3.jpg',
      '/images/all_site_images/Home/TIMELINE/2015-Building-Expertise-4.jpg',
    ],
  },
  {
    year: '2019',
    title: 'GoodAV Founded',
    description:
      "Established GoodAV with the mission to showcase Africa's rich heritage while empowering clients to amplify their unique stories.",
    images: [
      '/images/all_site_images/Home/TIMELINE/2019-GoodAV Founded-1.jpg',
      '/images/all_site_images/Home/TIMELINE/2019-GoodAV Founded-2.jpg',
      '/images/all_site_images/Home/TIMELINE/2019-GoodAV Founded-3.jpg',
    ],
  },
  {
    year: '2025',
    title: 'Leading the Industry',
    description:
      "Recognized as Rwanda's premier audiovisual agency, creating content that inspires and transforms communities across Africa.",
    images: [
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-1.jpg',
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-2.jpg',
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-3.jpg',
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-4.jpg',
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-5.jpg',
      '/images/all_site_images/Home/TIMELINE/2025-Leading-the-Industry-6.webp',
    ],
  },
];

export default function AboutUs() {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [play, setPlay] = useState(false);
  const videoId = 'HyHigPOWxYs';

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <SEO
        title="About GoodAV - Professional Audiovisual Services in Rwanda"
        description="Learn about GoodAV, Rwanda's leading provider of video production, live streaming, and photography services. Discover our mission, values, and the team behind the work."
        canonical="/about-us"
      />
      <SchemaMarkup
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'GoodAV',
          url: 'https://goodav.net',
          logo: '/images/all_site_images/Assets/logo-fav.png',
          description:
            "Professional audiovisual production services in Rwanda and Africa. Bringing African stories to life with quality video, photography and live streaming.",
          sameAs: [
            'https://www.instagram.com/goodaudiovisual',
            'https://www.youtube.com/@goodaudiovisuals',
            'https://www.facebook.com/goodaudiovisuals',
            'https://www.linkedin.com/company/goodav',
          ],
        }}
      />

      <main className="bg-[#0f1012] text-zinc-100 min-h-screen about-grayscale">
        {/* Full-bleed hero matching Portfolio style */}
        <header
          className="relative mt-6 py-28 px-4 -mx-4 sm:-mx-6 md:-mx-8 bg-transparent text-center mb-10 flex flex-col items-center justify-center min-h-[320px] rounded-b-2xl"
          role="banner"
        >
          <div className="absolute inset-0">
            <img
              src="/images/all_site_images/Home/BG/Home_BG.png"
              alt="GoodAV hero background"
              className="w-full h-full object-cover opacity-30"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0f1012]" />
          </div>
          <div className="relative max-w-6xl mx-auto">
            <h1 className={`text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent tracking-tight mb-4`} id="about-heading">
              About GoodAV
            </h1>
            <p className={`text-zinc-200 text-xl md:text-2xl font-medium max-w-2xl mx-auto`} aria-describedby="about-heading">
              Bringing African Stories to Life with Digital Excellence
            </p>
            {/* Header CTAs removed here per layout change; primary CTAs moved to bottom */}
          </div>
        </header>

        {/* Engagement bar similar to Portfolio controls (simplified) */}
        <section className="sticky top-4 z-30 mx-auto max-w-7xl px-2 sm:px-4 md:px-0 py-3 backdrop-blur bg-[#0f1012]/90 border-b border-white/5 flex items-center justify-end gap-3" role="region" aria-label="About actions">
          <div className="flex items-center gap-3">
            {/* social links only; company profile button moved near Meet the Team */}
            <a href="https://www.instagram.com/goodaudiovisual" aria-label="Instagram" className="text-zinc-200 hover:text-orange-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm8 4a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@goodaudiovisuals" aria-label="YouTube" className="text-zinc-200 hover:text-orange-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M10 15l5-3-5-3v6zM21 7s-.2-1.4-1-2c-.8-.6-1.7-.6-2.1-.7C14.9 4 12 4 12 4s-2.9 0-5.9.3c-.4.1-1.3.1-2.1.7-.8.6-1 2-1 2S2 8.6 2 10.2v3.6C2 15.4 2.2 17 3 17.6c.8.6 1.9.6 2.4.7 1.8.2 7.6.3 7.6.3s2.9 0 5.9-.3c.4-.1 1.3-.1 2.1-.7.8-.6 1-2 1-2s.2-1.6.2-3.2v-3.6C21 8.6 21 7 21 7z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/goodav" aria-label="LinkedIn" className="text-zinc-200 hover:text-orange-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.75v2.2h.05c.52-.98 1.8-2.02 3.7-2.02 3.96 0 4.69 2.6 4.69 5.98V24h-4V15.5c0-2.01-.04-4.6-2.8-4.6-2.82 0-3.25 2.2-3.25 4.43V24h-4V8z" />
              </svg>
            </a>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="px-4 sm:px-6 md:px-8 py-8">
            {/* Video Section */}
            <motion.div
              className="flex justify-center mt-12"
              variants={itemVariants}
            >
              <div className="relative w-full md:w-3/4 lg:w-2/3 glass-card rounded-xl overflow-hidden shadow-glow">
                {/* Video Container - show full-bright thumbnail, play button centered */}
                <div className="flex items-center justify-center h-64 md:h-96 bg-transparent">
                  {!play ? (
                    <>
                      {/* Thumbnail at full visibility */}
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="GoodAV: Crafting Authentic Stories - Video Thumbnail"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />

                      {/* Play button only (no dark overlay) */}
                      <motion.button
                        className="absolute z-20 w-16 h-16 flex items-center justify-center bg-gradient-primary rounded-full hover-lift shadow-glow group"
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                        onClick={() => setPlay(true)}
                        aria-label="Play video: GoodAV Impactful Storytelling"
                        tabIndex={0}
                      >
                        <Play className="w-8 h-8 text-primary-foreground ml-1 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                      </motion.button>
                    </>
                  ) : (
                    // YouTube iframe replaces thumbnail
                    <>
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
                        title="GoodAV: Crafting Authentic Stories - Our Journey and Vision"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                      <noscript>
                        <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="sr-only">Open video in new tab</a>
                      </noscript>
                    </>
                  )}
                </div>

                {/* Caption pill (non-blocking) */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-white pointer-events-none"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">Featured</span>
                  </div>
                  <h3 className="mt-2 text-lg md:text-xl font-semibold line-clamp-2">GoodAV: Impactful Storytelling</h3>
                  <p className="text-gray-300 text-sm">Our journey and vision for the future</p>
                </motion.div>
              </div>
            </motion.div>

            <div className="mt-6 max-w-4xl mx-auto">
              {/* Detailed timeline (copied from FoundersVision) */}
              <div className="mt-8">
                <div className="grid grid-cols-[9rem_1px_1fr] md:grid-cols-[10rem_1px_1fr] lg:grid-cols-[12rem_1px_1fr]">
                  <div className="col-start-2 row-span-full w-px bg-gradient-to-b from-transparent via-orange-500/60 to-transparent pointer-events-none" />

                  {founderStory.map((event) => (
                    <React.Fragment key={event.year}>
                      <div className="col-start-1 pr-4 md:pr-6 py-7 flex items-start justify-end">
                        <div className="flex items-center gap-2 text-base md:text-lg lg:text-xl text-gray-300">
                          <span className="tabular-nums font-medium">{event.year}</span>
                        </div>
                      </div>

                      <div className="col-start-2 relative py-7">
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-orange-500/40" />
                        <div className="absolute left-1/2 -translate-x-1/2 top-8">
                          <span className="block h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 rounded-full bg-orange-500 ring-4 ring-orange-500/20" />
                        </div>
                      </div>

                      <div className="col-start-3 py-7 pl-6">
                        <div className="rounded-lg border border-white/10 bg-white/5 p-5 md:p-6 lg:p-7 hover:bg-white/7 transition">
                          <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-snug mb-4">{event.title}</h4>
                          <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">{event.description}</p>
                          {event.images.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                              {event.images.map((image) => (
                                <div key={image} className="aspect-square overflow-hidden rounded-lg bg-black/20">
                                  <img src={image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
              
            {/* Founder Section */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 mt-8">
                <div className="flex-shrink-0 rounded-lg overflow-hidden w-40 md:w-56 lg:w-64">
                  <img
                    src="/images/all_site_images/About/Founder/Youssouf_Hakizimana_CEO_GoodAV.jpg"
                    alt="Youssouf Hakizimana, Founder and CEO of GoodAV"
                    className="w-full h-auto max-h-[640px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-semibold">Youssouf Hakizimana</h3>
                  <p className="text-orange-300/90 mt-1">Founder &amp; CEO</p>
                  <p className="mt-3 text-zinc-300 leading-relaxed">“Our mission is to empower others to tell their stories, their way—because every story matters.”</p>
                  <p className="mt-4 text-zinc-400 text-sm">Youssouf Hakizimana — CEO OF GoodAV</p>
                </div>
              </div>
        </section>

        {/* About Us Section */}
        <section aria-labelledby="mission" className="mt-12 mx-auto max-w-6xl px-4">
          <div className="rounded-2xl p-6">
            <h2 id="mission" className="text-2xl font-semibold text-center text-orange-300">About Us</h2>

            <p className="mt-3 text-zinc-300">
              <strong>GOODAV</strong> is a pioneering and market-leading provider of digital consulting services,
              including audio-visual content production and photography. We have extensive experience in the
              development of digital content — from concise summaries to full documentaries and high-quality
              photography coverage. Our work also includes live streaming, branding and marketing to tell a
              visual story about a variety of events using integrated techniques that deliver to the utmost
              satisfaction of our customers.
            </p>

            <p className="mt-4 text-zinc-300">
              Our approach is founded on clear principles: customer-centricity, quality & reliability,
              diversity & inclusion, and an impact-driven mindset. We use our know-how and experience to assess
              customers’ needs, discuss expectations, and achieve goals in a factual, results-oriented way.
              Rooted in the belief that Africa’s stories are best told by those who understand its essence,
              culture, and communities, GoodAV combines deep local knowledge with world-class videography,
              photography, and documentation expertise to support organizations across the continent.
            </p>

            <p className="mt-4 text-zinc-300 font-semibold">EMPOWERING STORIES, CREATING CONNECTIONS</p>
            <p className="mt-2 text-zinc-300">
              GOODAV’s strength lies in its team and our ongoing investment in skills development. We embrace
              storytelling because it stimulates imagination and builds a sense of community between tellers and
              listeners. Storytelling helps us understand our environment and personal experience; that is why we
              always strive to help customers tell the story of their work and the impact they make in an articulated
              and engaging way.
            </p>

            {/* Optional homepage intro copy copied for context */}
            <p className="mt-4 text-zinc-300 italic">We are Africa's premier audiovisual storytellers, transforming authentic narratives into compelling visual experiences that resonate globally while honoring our continental heritage.</p>
          </div>
        </section>

  <section aria-labelledby="story" className="mt-8 mx-auto max-w-6xl px-4">
          <div className="rounded-2xl p-6">
            <h2 id="story" className="text-2xl font-semibold text-center text-orange-300">Story behind GoodAV</h2>

            <p className="mt-3 text-zinc-300">
              At the core of GoodAV is a vision inspired by its founder and CEO, <strong>Youssouf Hakizimana</strong>,
              a multimedia artist with over a decade of experience in the audiovisual industry. Driven by a passion
              for storytelling, innovation, and cultural preservation, Youssouf established GoodAV to be more than a
              media company — it’s a catalyst for Africa’s transformation through the art of media.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-orange-300">A Vision Born from Experience</h3>
            <p className="mt-3 text-zinc-300">
              Youssouf’s journey began with a powerful belief: every story deserves to be told with authenticity,
              impact, and precision. His expertise spans video production, photography, live streaming, and audio
              creation, complemented by a strong foundation in digital communication and continuous learning. Over
              the years, he identified a gap in the market for high-quality, client-focused content production
              tailored to diverse audiences. GoodAV started as a small initiative but quickly grew into a trusted
              partner for businesses, individuals, and organizations. Under Youssouf’s leadership, the company
              delivers exceptional services by blending creativity, cutting-edge technology, and a commitment to
              excellence.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-orange-300">From Idea to Impact</h3>
            <p className="mt-3 text-zinc-300">
              One of Youssouf’s standout projects is “Echoes of Tradition,” a heartfelt initiative that captures the
              beauty, resilience, and spirit of Rwanda through photography and videography. This project reflects
              GoodAV’s deeper mission: to showcase Africa’s rich heritage while empowering clients to amplify their
              unique stories. Youssouf connects with diverse communities, ensuring GoodAV’s work resonates across
              cultures. As advancements in Machine Learning and Artificial Intelligence reshape the creative
              landscape, GoodAV is at the forefront, integrating these innovations to enhance its storytelling
              capabilities.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-orange-300">The Driving Philosophy</h3>
            <p className="mt-3 text-zinc-300">
              For Youssouf Hakizimana, storytelling isn’t just about creating visuals — it’s about building
              connections, evoking emotions, and leaving a lasting legacy. This philosophy is woven into every
              project at GoodAV, where the focus is on empowering clients to share their stories authentically and
              powerfully.
            </p>


            {/* Services and Organizational Blocks */}
            <div className="mt-6 rounded-lg border border-white/10 bg-white/3 p-6">
              <h3 className="text-lg font-semibold text-orange-300">Services we provide</h3>
              <p className="mt-3 text-zinc-300">VIDEO PRODUCTION, PHOTOGRAPHY, LIVE STREAMING, AUDIO PRODUCTION, SOUND SYSTEM, LIGHTING</p>

              <h4 className="mt-6 text-sm font-semibold text-zinc-200">OUR FOUNDATION</h4>
              <p className="text-zinc-300 mt-2">Built on purpose, driven by passion, defined by excellence</p>

              <h4 className="mt-4 text-sm font-semibold text-zinc-200">MISSION</h4>
              <p className="text-zinc-300 mt-2"><strong>EMPOWERING AFRICAN VOICES</strong></p>
              <p className="text-zinc-300 mt-2">We elevate African narratives through world-class audiovisual excellence, authentically showcasing our continent's rich cultures and transformative stories with unparalleled creativity and technical mastery.</p>

              <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                <li className="text-zinc-300"><strong>Cultural Authenticity</strong><div className="text-sm text-zinc-400">Preserving Africa's rich heritage through genuine storytelling</div></li>
                <li className="text-zinc-300"><strong>Technical Excellence</strong><div className="text-sm text-zinc-400">World-class production standards and cutting-edge technology</div></li>
                <li className="text-zinc-300"><strong>Global Standards</strong><div className="text-sm text-zinc-400">Meeting international benchmarks while honoring local contexts</div></li>
              </ul>

              <h4 className="mt-6 text-sm font-semibold text-zinc-200">VISION</h4>
              <p className="text-zinc-300 mt-2"><strong>AFRICA'S PREMIER STORYTELLERS</strong></p>
              <p className="text-zinc-300 mt-2">To become Africa's most trusted audiovisual partner, inspiring global audiences with authentic, impactful narratives that celebrate our continent's diversity and drive meaningful change worldwide.</p>

              <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                <li className="text-zinc-300"><strong>Industry Leadership</strong><div className="text-sm text-zinc-400">Setting new standards for African audiovisual excellence</div></li>
                <li className="text-zinc-300"><strong>Global Impact</strong><div className="text-sm text-zinc-400">Creating content that resonates worldwide and drives change</div></li>
                <li className="text-zinc-300"><strong>Cultural Bridge</strong><div className="text-sm text-zinc-400">Connecting African stories with global audiences authentically</div></li>
              </ul>

              <h4 className="mt-6 text-sm font-semibold text-zinc-200">OUR CORE VALUES</h4>
              <p className="text-zinc-300 mt-2">The pillars that guide our work and define who we are</p>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                <li className="bg-white/3 p-3 rounded"> <strong>Pan-African Unity</strong><div className="text-sm text-zinc-400">Fostering collaboration across Africa's 54 nations, celebrating our diversity while strengthening our collective narrative through unified storytelling excellence.</div></li>
                <li className="bg-white/3 p-3 rounded"> <strong>Authentic Representation</strong><div className="text-sm text-zinc-400">Preserving and presenting Africa's rich heritage with integrity, ensuring every story honors our traditions while embracing contemporary innovation.</div></li>
                <li className="bg-white/3 p-3 rounded"> <strong>Innovation Leadership</strong><div className="text-sm text-zinc-400">Pioneering cutting-edge audiovisual technologies and creative methodologies that set new standards for storytelling excellence across the continent.</div></li>
              </ul>

              <h4 className="mt-6 text-sm font-semibold text-zinc-200">From Vision to Continental Impact</h4>
              <p className="text-zinc-300 mt-2">GOODAV emerged from a revolutionary vision: to elevate African storytelling to global standards while preserving cultural authenticity. Founded by passionate creators who understood the power of visual narrative, we've transformed from a local production house into Africa's most trusted audiovisual partner.</p>

              <p className="mt-4 text-zinc-300">Our evolution spans documenting grassroots communities to capturing international conferences, producing award-winning documentaries, and pioneering live streaming technologies across the continent—always with African authenticity at our core.</p>

              <div className="mt-6">
                <h5 className="text-sm font-semibold text-orange-300">Milestones</h5>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="glass-card p-4 rounded"> <div className="text-lg font-bold">2019</div><div className="text-sm text-zinc-400">Founded with a vision — Established with revolutionary vision to elevate African storytelling</div></div>
                  <div className="glass-card p-4 rounded"> <div className="text-lg font-bold">2021</div><div className="text-sm text-zinc-400">Pan-African expansion — Expanded operations across multiple African countries</div></div>
                  <div className="glass-card p-4 rounded"> <div className="text-lg font-bold">2024</div><div className="text-sm text-zinc-400">AI integration pioneer — Became pioneer in AI-powered content creation</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="team" className="mt-10 mx-auto max-w-6xl px-4">
          <div className="rounded-2xl p-6">
            <div className="flex items-center justify-center">
              <h2 id="team" className="text-2xl font-semibold text-center text-orange-300">Meet the Team</h2>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
              <TeamCard src={vincentImg} name="Vincent Niyibizi" role="Chief Operating Officer" />
              <TeamCard src={josueImg} name="Josue Ishimwe" role="Chief Creative Officer" />
              <TeamCard src={marieImg} name="Marie Noella Mugisha" role="Sales and Partnership" />
              <TeamCard src={adelineImg} name="Adeline Iradukunda" role="Social Media Manager" />
              <TeamCard src={claudineImg} name="Claudine Musabende" role="Chief Finance Officer" />
              <TeamCard src={emmyImg} name="Emmanuel Irumva" role="Schedule and Meeting" />
              <TeamCard src={etienneImg} name="Etienne Manirakiza" role="Head of Operations and Logistics" />
              <TeamCard src={mediatriceImg} name="Mediatrice Mahoro" role="Client Relations" />
              <TeamCard src={ngaboImg} name="Blaise Ngabo" role="Chief Technology Officer" />
              <TeamCard src={richmondImg} name="Richmond Runanira" role="Producer" />
              <TeamCard src={dodoImg} name="Donatien Hitiyise" role="Human Resources" />
              <TeamCard src={gentilImg} name="Ibrahim Niyibizi" role="Head of Marketing" />
            </div>
          </div>
        </section>

        {/* Bottom CTA block: Start project + See our work (moved from header) */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl p-6 flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="px-6 py-3 rounded-md border border-white/10 text-sm text-zinc-200 hover:bg-white/5 transition">Start Your Project</a>
              <a href="/portfolio" className="px-6 py-3 rounded-md border border-white/10 text-sm text-zinc-200 hover:bg-white/5 transition">See our Work</a>
              <button onClick={() => setProfileModalOpen(true)} aria-label="View company profile" className="px-6 py-3 rounded-md border border-white/10 text-sm text-zinc-200 hover:bg-white/5 transition">View Company Profile</button>
            </div>
          </div>
        </section>

  {/* Contact section removed per request */}
      </main>
      {/* Company Profile Modal */}
      {profileModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          onKeyDown={(e: any) => {
            if (e.key === 'Escape') setProfileModalOpen(false);
          }}
        >
          <div className="bg-[#18181b] rounded-lg shadow-xl max-w-2xl w-full p-6 relative flex flex-col" tabIndex={0}>
            <button
              className="absolute top-3 right-3 text-white text-xl font-bold hover:text-primary"
              onClick={() => setProfileModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-primary">Company Profile</h2>
            <div className="flex flex-col items-center gap-4">
              <iframe
                src={'/download/company-profile/company-profile.pdf'}
                title="Company Profile PDF"
                className="w-full h-96 border rounded"
              />
              <div className="flex gap-3 mt-2">
                <a href="/download/company-profile/company-profile.pdf" download className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors">Download</a>
                <button
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors"
                  onClick={() => window.open('/download/company-profile/company-profile.pdf', '_blank')}
                >
                  Expand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* --- subcomponents --- */

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl px-4 py-5 text-center">
      <div className="text-2xl font-extrabold text-orange-300 leading-none">{value}</div>
      <div className="mt-1 text-sm text-zinc-400">{label}</div>
    </div>
  );
}

function TeamCard({ src, name, role }: { src: string; name: string; role: string }) {
  return (
    <article
      className="rounded-lg overflow-hidden bg-white/3 border border-white/6 hover:shadow-glow transform-gpu transition hover:-translate-y-1 focus-within:-translate-y-1 flex flex-col"
      tabIndex={0}
      aria-label={`${name} - ${role}`}
    >
      <div className="h-28 bg-zinc-800 overflow-hidden flex-shrink-0">
        <img src={src} alt={name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="mt-3 p-3 flex-1 flex items-start">
        <div className="w-full">
          <h3 className="text-sm md:text-base font-semibold leading-snug break-words">{name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs px-2 py-1 rounded bg-orange-500/15 text-orange-300 border border-orange-500/10">{role}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl px-4 py-3 bg-transparent">
      <div className="text-sm text-zinc-400">{label}</div>
      <div className="font-semibold text-zinc-100">{value}</div>
    </div>
  );
}
