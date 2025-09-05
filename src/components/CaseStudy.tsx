// ...existing code...
import { motion } from 'framer-motion';
import { useParams, Navigate, useNavigate, Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { getCaseStudyById } from '@/data/caseStudies';
import { getFeaturedCaseStudies } from '@/data/featuredCaseStudies';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import React, { Suspense } from 'react';
const YouTubeModal = React.lazy(() => import('./YouTubeModal'));

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.12, delayChildren: 0.15 } } };
const itemVariants = { hidden: { opacity: 0, y: 24, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } } };
const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const heroVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) return <Navigate to="/case-studies" replace />;

  const caseStudy: any = getCaseStudyById(slug);
  if (!caseStudy) return <Navigate to="/case-studies" replace />;

  // Get chronological images array (same as in CaseStudiesNew)
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

  // Get the featured case studies to find the index of current case study
  const featuredCaseStudies = getFeaturedCaseStudies();
  const caseStudyIndex = featuredCaseStudies.findIndex(study => study.id === caseStudy.id || study.slug === slug);
  
  // Use chronological image or fallback to original image
  const heroImage = caseStudyIndex >= 0 && caseStudyIndex < caseStudyImages.length 
    ? caseStudyImages[caseStudyIndex] 
    : (caseStudy.image || caseStudyImages[0]);

  return (
    <motion.main initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen bg-zinc-900 text-zinc-100 pb-24">
      <SEO title={`${caseStudy.title} — Case Study`} description={caseStudy.description} />
      <SchemaMarkup schema={caseStudy.schema || {}} />

      <motion.section variants={heroVariants} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 -top-24 w-96 h-96 bg-gradient-to-br from-orange-500 to-amber-400 opacity-10 rounded-full blur-3xl" />
          <div className="absolute right-24 -bottom-24 w-72 h-72 bg-gradient-to-br from-emerald-400 to-teal-400 opacity-8 rounded-full blur-2xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <span className="inline-block text-sm font-medium text-amber-400 bg-amber-900/10 px-3 py-1 rounded-md">{caseStudy.category}</span>
              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400">{caseStudy.title}</h1>
              <p className="mt-4 text-zinc-300 max-w-3xl">{caseStudy.description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {caseStudy.tags?.map((t: string) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700 text-zinc-200">{t}</span>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <Link to="/contact" className="px-4 py-2 rounded-md bg-amber-500 text-zinc-900 font-semibold">Start a project</Link>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="hidden lg:block">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-zinc-700">
                <img src={heroImage} alt={caseStudy.title} className="w-full h-56 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="max-w-6xl mx-auto px-6 mt-12 grid lg:grid-cols-3 gap-8">
        <motion.section variants={containerVariants} className="lg:col-span-2 space-y-8">
          <motion.article variants={cardVariants} className="bg-zinc-900/60 rounded-2xl p-8 border border-zinc-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <p className="text-zinc-300 leading-relaxed">{caseStudy.content?.overview}</p>
          </motion.article>

          <motion.div variants={cardVariants} className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-700">
              <h3 className="font-semibold mb-3">The Challenge</h3>
              <p className="text-zinc-300">{caseStudy.content?.challenge}</p>
            </div>
            <div className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-700">
              <h3 className="font-semibold mb-3">Our Solution</h3>
              <p className="text-zinc-300">{caseStudy.content?.solution}</p>
            </div>
          </motion.div>

          {caseStudy.content?.metrics && (
            <motion.div variants={cardVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.content.metrics.map((m: any, idx: number) => (
                <motion.div key={idx} variants={itemVariants} className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-700 text-center">
                  <div className="text-3xl font-bold text-amber-400">{m.value}</div>

                  <div className="text-3xl font-bold text-amber-400">{m.value}</div>
                  <div className="text-sm text-zinc-300 mt-2">{m.label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {caseStudy.testimonial && (
            <motion.blockquote variants={cardVariants} className="bg-zinc-900/60 rounded-2xl p-8 border border-zinc-700">
              <p className="text-zinc-200 italic">“{caseStudy.testimonial.text}”</p>
              <cite className="mt-4 block text-sm text-zinc-400">— {caseStudy.testimonial.author}, {caseStudy.testimonial.role}</cite>
            </motion.blockquote>
          )}

          {caseStudy.youtubeUrl && (
            <motion.div variants={cardVariants} className="bg-zinc-900/60 rounded-2xl overflow-hidden p-6 border border-zinc-700">
              <h3 className="font-semibold mb-4">Project Video</h3>
              <div className="flex justify-center">
                <Suspense fallback={null}>
                  <YouTubeModal
                  videoId={caseStudy.youtubeUrl}
                  title={`${caseStudy.title} - Project Video`}
                  className="w-full max-w-2xl"
                  containerClassName="aspect-video"
                  />
                </Suspense>
              </div>
            </motion.div>
          )}

          {caseStudy.videos && caseStudy.videos.length > 0 && (
            <motion.div variants={cardVariants} className="bg-zinc-900/60 rounded-2xl overflow-hidden p-6 border border-zinc-700">
              <h3 className="font-semibold mb-6">Featured Videos</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudy.videos.map((video: any, i: number) => (
                  <motion.div key={i} variants={itemVariants} className="space-y-3">
                    <Suspense fallback={null}>
                      <YouTubeModal
                      videoId={video.url}
                      title={video.title}
                      className="w-full"
                      containerClassName="aspect-video"
                      buttonClassName="w-12 h-12"
                      />
                    </Suspense>
                    <h4 className="text-zinc-200 font-semibold">{video.title}</h4>
                    {video.description && <p className="text-zinc-400 text-sm">{video.description}</p>}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {caseStudy.youtubeUrls && caseStudy.youtubeUrls.length > 0 && (
            <motion.div variants={cardVariants} className="bg-zinc-900/60 rounded-2xl overflow-hidden p-6 border border-zinc-700">
              <h3 className="font-semibold mb-6">Project Videos</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {caseStudy.youtubeUrls.map((v: any, i: number) => (
                  <motion.div key={i} variants={itemVariants} className="space-y-3">
                    <Suspense fallback={null}>
                      <YouTubeModal
                      videoId={v.url}
                      title={v.title}
                      className="w-full"
                      containerClassName="aspect-video"
                      buttonClassName="w-12 h-12"
                      />
                    </Suspense>
                    <h4 className="text-zinc-200 font-semibold">{v.title}</h4>
                    {v.description && <p className="text-zinc-400 text-sm">{v.description}</p>}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.section>

        <motion.aside variants={containerVariants} className="space-y-6">
          <motion.div variants={cardVariants} className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-700">
            <h4 className="font-semibold mb-3">Project Details</h4>
            <div className="text-sm text-zinc-300 space-y-2">
              <div>
                <div className="text-xs text-zinc-400">Client</div>
                <div className="font-medium">{caseStudy.client}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-400">Date</div>
                <div className="font-medium">{caseStudy.date}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-400">Location</div>
                <div className="font-medium">{caseStudy.location}</div>
              </div>
            </div>
          </motion.div>

          {caseStudy.content?.deliverables && (
            <motion.div variants={cardVariants} className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-700">
              <h4 className="font-semibold mb-3">Deliverables</h4>
              <ul className="text-sm space-y-2">
                {caseStudy.content.deliverables.map((d: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <FaCheckCircle className="text-emerald-400 mt-1" />
                    <span className="text-zinc-300">{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div variants={cardVariants} className="bg-amber-600/10 rounded-2xl p-6 border border-amber-400/20">
            <h4 className="font-semibold mb-2">Start a project</h4>
            <p className="text-sm text-zinc-300 mb-4">Want results like this? Let's talk about your next project.</p>
            <Link to="/contact" className="block text-center bg-amber-500 text-zinc-900 font-semibold px-4 py-2 rounded-md">Get in touch</Link>
          </motion.div>
        </motion.aside>
      </div>
    </motion.main>
  );
};

export default CaseStudy;

