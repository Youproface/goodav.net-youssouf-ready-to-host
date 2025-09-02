import { FaPlay, FaTimes } from 'react-icons/fa';
import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// SEO and Performance: Memoize expensive computations
const useMemoizedVideos = (videos) => {
  return useMemo(() => videos, [videos]);
};

export default function RecentEvents() {
  const [playVideo, setPlayVideo] = useState<string | null>(null);
  
  const verticalVideos = [
    {
      id: "wpYU4WelU0Y",
      title: "IAS 2025 Day 1 Recap",
      client: "Plus Life Media",
    },
    {
      id: "CsdRr8Fvt2g",
      title: "Women Leading the Way: Innovation in the Fight Against HIV | #IAS2025",
      client: "Gilead Sciences",
    },
    {
      id: "HgPGMQuZMn0",
      title: "Why Partnership is Key to Ending the HIV Epidemic | Linda-Gail Bekker",
      client: "Gilead Sciences",
    },
    {
      id: "Ge26tZmJRQ0",
      title: "IAS 2025 Mid Conference Recap",
      client: "Plus Life Media",
    },
    {
      id: "uWzSA73tp9k",
      title: "IAS 2025 DAY 3 RECAP",
      client: "Plus Life Media",
    },
  ];

  const mainVideoId = "bPJlc3r6Mrw";
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const reelRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [playingInline, setPlayingInline] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  // Performance: Memoize gallery images with error handling
  const galleryImages = useMemo(() => [
    "/images/all_site_images/Home/Events/GOODAV_Event_1.jpg?v=" + Date.now(),
    "/images/all_site_images/Home/Events/GOODAV_Event_2.jpg?v=" + Date.now(),
    "/images/all_site_images/Home/Events/GOODAV_Event_3.jpg?v=" + Date.now(),
    "/images/all_site_images/Home/Events/GOODAV_Event_4.jpg?v=" + Date.now(),
    "/images/all_site_images/Home/Events/GOODAV_Event_5.jpg?v=" + Date.now(),
    "/images/all_site_images/Home/Events/GOODAV_Event_Master.jpg?v=" + Date.now(),
  ], []);

  // Debug: Check if images are loading
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Performance: Debounce hover state for better UX
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsHovered(true);
  }, [hoverTimeout]);

  const handleMouseLeave = useCallback(() => {
    const timeout = setTimeout(() => setIsHovered(false), 100);
    setHoverTimeout(timeout);
  }, []);

  // Performance: Cleanup timeout
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  const openLightbox = useCallback((i: number) => {
    setCurrentIndex(i);
    setImageLoading(true);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setIsOpen(false), []);

  const nextImage = useCallback(() => {
    setImageLoading(true);
    setCurrentIndex((i) => (i + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    setImageLoading(true);
    setCurrentIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeLightbox, nextImage, prevImage]);

    // Ultra-smooth auto-scroll for horizontal video reel (infinite loop)
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (!isHovered && !playingInline && reelRef.current) {
        const container = reelRef.current;
        const scrollAmount = window.innerWidth >= 768 ? 280 : window.innerWidth >= 640 ? 240 : 200; // Optimized scroll amounts

        // Check if we're near the end to create seamless loop
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 30) {
          // Instantly jump to start for seamless loop (no animation for the jump)
          container.scrollLeft = 0;
        } else {
          // Ultra-smooth scroll with optimized easing
          const startScroll = container.scrollLeft;
          const targetScroll = startScroll + scrollAmount;
          const duration = 1800; // Faster but smoother animation
          const startTime = performance.now();

          const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smoother easing function - easeOutQuart for better feel
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentScroll = startScroll + (scrollAmount * easeOutQuart);

            container.scrollLeft = currentScroll;

            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            }
          };

          requestAnimationFrame(animateScroll);
        }
      }
    }, 3500); // Auto-scroll every 3.5 seconds for better pacing

    return () => clearInterval(scrollInterval);
  }, [isHovered, playingInline]);

  return (
    <section 
      id="recent-event-section" 
      className="relative px-6 py-16 md:py-24 bg-zinc-900 text-zinc-100 overflow-hidden"
      itemScope 
      itemType="https://schema.org/CreativeWork"
      aria-labelledby="portfolio-title"
    >
      {/* SEO: Structured Data for Portfolio */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "Featured Projects Portfolio",
          "description": "Professional video production portfolio showcasing event coverage, corporate videos, and creative projects",
          "creator": {
            "@type": "Organization",
            "name": "Goodav Media",
            "url": "https://goodav.net"
          },
          "genre": ["Video Production", "Event Coverage", "Corporate Videos"],
          "hasPart": verticalVideos.map(video => ({
            "@type": "VideoObject",
            "name": video.title,
            "description": `Video production for ${video.client}`,
            "thumbnailUrl": `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
            "url": `https://www.youtube.com/watch?v=${video.id}`
          }))
        })}
      </script>

      <div className="r-container mx-auto max-w-7xl">
        {/* Background Effects */}
        <div className="recent-event-bg pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse [animation-delay:2s]" />
        </div>

        {/* Event Header */}
        <header className="event-header text-center relative z-10 mb-12 md:mb-16">
          <div className="event-badge mx-auto w-max rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-orange-300/90 backdrop-blur-sm flex items-center gap-2" role="banner">
            <i className="fas fa-clock" aria-hidden="true"></i>
            <span>Recent Projects</span>
          </div>
          <h2 id="portfolio-title" className="event-title text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 mt-4">
            Our Latest Work
          </h2>
          <p className="event-subtitle text-lg md:text-xl text-zinc-400 mt-2 max-w-3xl mx-auto">
            Explore our latest video productions and creative projects that bring stories to life.
          </p>
        </header>

        {/* Main Content Area */}
        <div className="space-y-16 md:space-y-24">
          
          {/* Part 1: Main Video & Description */}
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" itemScope itemType="https://schema.org/VideoObject">
            <div className="main-video-container relative">
              {playingInline === mainVideoId ? (
                <div className="video-player relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/10 ring-1 ring-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${mainVideoId}?autoplay=1`}
                    title="Featured Project Video: IAS 2025 Shape the future of the HIV response"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                  <button
                    className="absolute top-2 right-2 text-white text-2xl bg-black/60 rounded-full p-2 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    onClick={() => setPlayingInline(null)}
                    aria-label="Stop video playback"
                    type="button"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="video-thumbnail relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/10 ring-1 ring-white/10">
                  <img
                    src={`https://img.youtube.com/vi/${mainVideoId}/maxresdefault.jpg`}
                    alt="Featured Project Video Thumbnail: IAS 2025 Shape the future of the HIV response"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      console.log(`Main video thumbnail failed for ${mainVideoId}`);
                      // Fallback to lower quality
                      e.currentTarget.src = `https://img.youtube.com/vi/${mainVideoId}/hqdefault.jpg`;
                    }}
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 focus:bg-black/60 transition-all duration-300 rounded-2xl group focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onClick={() => setPlayingInline(mainVideoId)}
                    aria-label="Play video: IAS 2025 Shape the future of the HIV response"
                    type="button"
                  >
                    <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 group-hover:scale-110 group-focus:scale-110 transition-transform">
                      <FaPlay className="text-white text-4xl" aria-hidden="true" />
                    </div>
                  </button>
                </div>
              )}
              <div className="mt-4 text-center">
                <h3 className="font-bold text-zinc-100 text-xl" itemProp="name">IAS 2025: Shape the future of the HIV response</h3>
              </div>
            </div>
            <div className="event-details space-y-6">
              <p className="text-lg md:text-xl leading-relaxed text-zinc-300" itemProp="description">
                Discover our <span className="text-orange-400 font-semibold">video production services</span> we have provided in recent IAS 2025 Event in Kigali, Rwanda. From corporate videos to event coverage, we bring your vision to life with cinematic quality.
              </p>
              <div className="clients-deliveries space-y-4">
                <div>
                  <h4 className="font-bold text-zinc-100 mb-2 flex items-center gap-2">
                    <i className="fas fa-video text-orange-400" aria-hidden="true"></i>
                    <span>Services</span>
                  </h4>
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Services offered">
                    <span className="px-3 py-1 text-sm rounded-full bg-white/5 text-zinc-300 ring-1 ring-white/10" role="listitem">Event Coverage</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/5 text-zinc-300 ring-1 ring-white/10" role="listitem">Corporate Videos</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/5 text-zinc-300 ring-1 ring-white/10" role="listitem">Documentary</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/5 text-zinc-300 ring-1 ring-white/10" role="listitem">Live Streaming</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-100 mb-2 flex items-center gap-2">
                    <i className="fas fa-users text-orange-400" aria-hidden="true"></i>
                    <span>Clients</span>
                  </h4>
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Client portfolio">
                    <span className="px-3 py-1 text-sm rounded-full bg-white/5 text-zinc-300 ring-1 ring-white/10" role="listitem">Gilead Sciences</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/5 text-zinc-300 ring-1 ring-white/10" role="listitem">Plus Life Media</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/5 text-zinc-300 ring-1 ring-white/10" role="listitem">Various Brands</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Part 2: Vertical Video Showcase */}
          <section className="vertical-video-showcase animate-fade-in" aria-labelledby="project-highlights-title">
            <h3 id="project-highlights-title" className="text-3xl font-bold tracking-tight text-zinc-100 mb-6 text-center lg:text-left animate-slide-up">Project Highlights</h3>
            <div
              ref={reelRef}
              className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-4 px-4 sm:px-6 scrollbar-hide scroll-smooth smooth-scroll-container"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              role="region"
              aria-label="Video portfolio carousel"
              tabIndex={0}
            >
              {verticalVideos.map((video, index) => (
                <article
                  key={video.id}
                  className={`video-card flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] group hover:scale-105 transition-all duration-500 ease-out animate-fade-in animate-delay-${index}`}
                  itemScope
                  itemType="https://schema.org/VideoObject"
                >
                  {playingInline === video.id ? (
                    <div className="video-player relative w-[200px] sm:w-[240px] md:w-[280px] h-[300px] sm:h-[360px] md:h-[400px] lg:h-[498px] rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                        title={video.title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full"
                        loading="lazy"
                      />
                      <button
                        className="absolute top-2 right-2 text-white text-2xl bg-black/60 rounded-full p-2 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingInline(null);
                        }}
                        aria-label="Stop video playback"
                        type="button"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="thumbnail relative w-[200px] sm:w-[240px] md:w-[280px] h-[300px] sm:h-[360px] md:h-[400px] lg:h-[498px] rounded-2xl overflow-hidden shadow-lg cursor-pointer ring-1 ring-white/10 group-hover:ring-orange-400 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 block w-full h-full p-0 border-0 bg-transparent"
                      onClick={() => setPlayingInline(video.id)}
                      aria-label={`Play video: ${video.title}`}
                      type="button"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={`${video.title} video thumbnail`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        itemProp="thumbnailUrl"
                        onError={(e) => {
                          console.log(`YouTube thumbnail failed for ${video.id}`);
                          // Fallback to a placeholder or different quality
                          e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/default.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaPlay className="text-white text-5xl" aria-hidden="true" />
                      </div>
                    </button>
                  )}
                  <div className="mt-3">
                    <h4 className="font-semibold text-zinc-100 truncate" itemProp="name">{video.title}</h4>
                    <p className="text-sm text-zinc-400" itemProp="creator">{video.client}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Part 3: Stats & Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <section className="stats-and-closing space-y-8" aria-labelledby="project-impact-title">
              <h3 id="project-impact-title" className="text-3xl font-bold tracking-tight text-zinc-100">Project Impact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="region" aria-label="Project statistics">
                <article className="stat-card rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-lg flex flex-col items-start" itemScope itemType="https://schema.org/PropertyValue">
                  <div className="stat-icon mb-3 text-orange-400 text-4xl" aria-hidden="true"><i className="fas fa-video"></i></div>
                  <div className="stat-title text-2xl font-bold text-zinc-100" itemProp="value">10+</div>
                  <div className="stat-description text-zinc-300" itemProp="name">Professional Videos Delivered</div>
                </article>
                <article className="stat-card rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-lg flex flex-col items-start" itemScope itemType="https://schema.org/PropertyValue">
                  <div className="stat-icon mb-3 text-orange-400 text-4xl" aria-hidden="true"><i className="fas fa-camera"></i></div>
                  <div className="stat-title text-2xl font-bold text-zinc-100" itemProp="value">500+</div>
                  <div className="stat-description text-zinc-300" itemProp="name">High-Res Photos Captured</div>
                </article>
              </div>
              <blockquote className="event-closing text-lg font-medium text-zinc-300 border-l-4 border-orange-400 pl-6">
                Ready to bring your story to life? Let's create something amazing together.
              </blockquote>
            </section>
            <section className="bts-gallery" aria-labelledby="gallery-title">
              <h3 id="gallery-title" className="text-3xl font-bold tracking-tight text-zinc-100 mb-6">Project Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" role="region" aria-label="Project photo gallery">
                {galleryImages.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    className="bts-image-item relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-xl overflow-hidden"
                    onClick={() => openLightbox(i)}
                    aria-label={`View full size image ${i + 1} of ${galleryImages.length}`}
                    type="button"
                  >
                    <img
                      alt={`Behind the scenes project image ${i + 1}`}
                      src={img}
                      className="rounded-xl w-full h-full object-cover aspect-square"
                      loading="lazy"
                      onError={() => {
                        console.log(`Failed to load image: ${img}`);
                        setImageErrors(prev => new Set([...prev, i]));
                      }}
                      onLoad={() => {
                        console.log(`Successfully loaded image: ${img}`);
                        setImageErrors(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(i);
                          return newSet;
                        });
                      }}
                    />
                    {imageErrors.has(i) && (
                      <div className="absolute inset-0 bg-zinc-800 rounded-xl flex items-center justify-center">
                        <div className="text-center text-zinc-400">
                          <i className="fas fa-image text-2xl mb-2"></i>
                          <p className="text-sm">Image not found</p>
                        </div>
                      </div>
                    )}
                    <div className="bts-image-overlay absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition bg-black/50 rounded-xl">
                      <i className="fas fa-expand-alt text-white text-3xl" aria-hidden="true"></i>
                    </div>
                  </button>
                ))}
                <a 
                  href="https://flic.kr/s/aHBqjCn4wo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="more-images-card rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-4 flex flex-col items-center justify-center h-full text-center hover:bg-white/10 hover:ring-orange-400 focus:ring-orange-400 focus:outline-none transition-all group"
                  aria-label="View full project gallery on Flickr (opens in new tab)"
                >
                  <i className="fab fa-flickr text-orange-400 text-4xl mb-2 group-hover:scale-110 transition-transform" aria-hidden="true"></i>
                  <h6 className="font-bold text-zinc-100">View Full Gallery</h6>
                  <p className="text-sm text-zinc-300">on Flickr</p>
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* Lightbox Modal */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm" 
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            aria-describedby="lightbox-description"
          >
            <div id="lightbox-title" className="sr-only">Image Gallery Lightbox</div>
            <div id="lightbox-description" className="sr-only">View project images in full size. Use arrow keys to navigate, Escape to close.</div>
            
            <button 
              className="absolute top-4 right-4 text-white text-3xl z-20 bg-black/50 rounded-full p-2 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" 
              onClick={closeLightbox} 
              aria-label="Close gallery lightbox"
              type="button"
            >
              <FaTimes />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-20 bg-black/60 hover:bg-orange-500/80 active:bg-orange-600/90 rounded-full p-3 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 shadow-lg group" 
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="View previous image"
              type="button"
            >
              <span className="group-hover:text-zinc-900 transition-colors duration-200">&#10094;</span>
            </button>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-20 bg-black/60 hover:bg-orange-500/80 active:bg-orange-600/90 rounded-full p-3 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 shadow-lg group" 
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="View next image"
              type="button"
            >
              <span className="group-hover:text-zinc-900 transition-colors duration-200">&#10095;</span>
            </button>
            
            <div className="relative max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
                </div>
              )}
              <img 
                src={galleryImages[currentIndex]} 
                alt={`Project gallery image ${currentIndex + 1} of ${galleryImages.length}`} 
                className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                loading="lazy"
                key={currentIndex} // Force re-render for transition
                onLoad={() => {
                  console.log(`Lightbox image loaded: ${galleryImages[currentIndex]}`);
                  setImageLoading(false);
                }}
                onError={() => {
                  console.log(`Lightbox image failed to load: ${galleryImages[currentIndex]}`);
                  setImageLoading(false);
                }}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                {currentIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
