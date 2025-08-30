import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Search, X } from "lucide-react";
import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * Infinite marquee powered by Framer Motion.
 * - Measures the width of ONE copy of your row (cards laid out horizontally).
 * - Renders enough copies to cover the viewport (>=2) + one extra for safety.
 * - Animates x in px at 'speed' (px/s). Wraps exactly at one-copy width for a seamless loop.
 */
function useInfiniteMarquee(opts: {
  direction?: "left" | "right";
  speed?: number;           // px per second
  pauseOnHover?: boolean;
}) {
  const { direction = "left", speed = 80, pauseOnHover = true } = opts;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const baseXRef = useRef(0);
  const widthRef = useRef(0);          // width of ONE copy
  const containerWRef = useRef(0);     // container width
  const [copies, setCopies] = useState(2);
  const pausedRef = useRef(false);
  const initRef = useRef(false);

  // Reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReducedMotion(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  // Measure widths and decide how many copies we need to cover the container.
  useEffect(() => {
    const measure = () => {
      if (!copyRef.current || !containerRef.current) return;
      const W = copyRef.current.getBoundingClientRect().width;
      const CW = containerRef.current.getBoundingClientRect().width;
      widthRef.current = W;
      containerWRef.current = CW;

      // We need enough repeats so there's never a gap when we wrap.
      // At least 2, but if the row is shorter than the container, add more.
      const needed = Math.max(2, Math.ceil((CW + W) / Math.max(1, W)));
      setCopies(needed);

      // Initialize starting offset for rightward motion so we don't "snap" at the start.
      if (!initRef.current) {
        if (direction === "right") {
          baseXRef.current = -W;
          x.set(-W);
        } else {
          baseXRef.current = 0;
          x.set(0);
        }
        initRef.current = true;
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (copyRef.current) ro.observe(copyRef.current);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [direction, x]);

  // Animate every frame
  useAnimationFrame((_, delta) => {
    if (reducedMotion || pausedRef.current) return;
    const sign = direction === "left" ? -1 : 1;
    const dt = delta / 1000; // s
    const dist = speed * dt * sign;

    baseXRef.current += dist;
    const W = widthRef.current;

    // Wrap when we've shifted by one-copy width.
    if (sign < 0 && baseXRef.current <= -W) baseXRef.current += W;
    if (sign > 0 && baseXRef.current >= 0) baseXRef.current -= W;

    x.set(baseXRef.current);
  });

  const pauseHandlers = useMemo(
    () =>
      pauseOnHover
        ? {
            onMouseEnter: () => (pausedRef.current = true),
            onMouseLeave: () => (pausedRef.current = false),
            onFocus: () => (pausedRef.current = true),
            onBlur: () => (pausedRef.current = false),
          }
        : {},
    [pauseOnHover]
  );

  return { x, containerRef, copyRef, copies, pauseHandlers };
}

export default function FeaturedProjects() {
  const categories = ["All Projects", "Documentary", "Corporate", "Events", "International"];

  const [activeCategory, setActiveCategory] = useState("All Projects");
  const navigate = useNavigate();

  // NOTE: Some of your items used category "Event" (singular) which would not match "Events" during filtering.
  // To keep behavior consistent with your UI, I've normalized "Event" to "Events" below.
  const projects = [
    {
      id: 1,
      title: "Africa's Business Heroes (ABH) 2023 RECAP VIDEO",
      category: "Corporate",
      video: "https://www.youtube.com/embed/5Cjbze8jBIA",
      thumbnail: "https://img.youtube.com/vi/5Cjbze8jBIA/hqdefault.jpg",
    },
    {
      id: 2,
      title: "#Kwibuka30: 4K video : Rwanda from Despair to Hope",
      category: "Documentary",
      video: "https://www.youtube.com/embed/ydWaP0-Bi_8",
      thumbnail: "https://img.youtube.com/vi/ydWaP0-Bi_8/hqdefault.jpg",
    },
    {
      id: 3,
      title: "COP28: The Impossible Dream: lets act now",
      category: "International",
      video: "https://www.youtube.com/embed/NxLQiDbXxUk",
      thumbnail: "https://img.youtube.com/vi/NxLQiDbXxUk/hqdefault.jpg",
    },
    {
      id: 4,
      title: "NEF Global Gathering highlight reel",
      category: "Events",
      video: "https://www.youtube.com/embed/jFWAgnAkD8k",
      thumbnail: "https://img.youtube.com/vi/jFWAgnAkD8k/hqdefault.jpg",
    },
    {
      id: 5,
      title: "BUBR AFRICA 2024 - Rwanda (Full Film)",
      category: "Documentary",
      video: "https://www.youtube.com/embed/DrT8QQoSJi4",
      thumbnail: "https://img.youtube.com/vi/DrT8QQoSJi4/hqdefault.jpg",
    },
    {
      id: 6,
      title: "Ibere rya Bigogwe The Ultimate Cow Experience in Rwanda",
      category: "Documentary",
      video: "https://www.youtube.com/embed/25MQcKjepJo",
      thumbnail: "https://img.youtube.com/vi/25MQcKjepJo/hqdefault.jpg",
    },
    {
      id: 7,
      title: "Rwanda Rising: The Cimerwa Documentary",
      category: "Documentary",
      video: "https://www.youtube.com/embed/ekaDY3S7bIk",
      thumbnail: "https://img.youtube.com/vi/ekaDY3S7bIk/hqdefault.jpg",
    },
    {
      id: 8,
      title: "UNDP GOMERA MAXWELL on SDG",
      category: "International",
      video: "https://www.youtube.com/embed/U3xPDLQvzrE",
      thumbnail: "https://img.youtube.com/vi/U3xPDLQvzrE/hqdefault.jpg",
    },
    {
      id: 9,
      title:
        "USAID Kungahara Wagura Amasoko \n Flag-off by Igire Continental Trading",
      category: "International",
      video: "https://www.youtube.com/embed/X9QGsDfCLDA",
      thumbnail: "https://img.youtube.com/vi/X9QGsDfCLDA/hqdefault.jpg",
    },
    {
      id: 10,
      title: "ICPD25 in Rwanda a story of change through Inanga",
      category: "Documentary",
      video: "https://www.youtube.com/embed/GaT9R1Dkuhs",
      thumbnail: "https://img.youtube.com/vi/GaT9R1Dkuhs/hqdefault.jpg",
    },
    {
      id: 11,
      title: "DBB's Pioneer Order Inauguration in Rwanda \n Bralirwa",
      category: "Corporate",
      video: "https://www.youtube.com/embed/QN1YAEUKyIE",
      thumbnail: "https://img.youtube.com/vi/QN1YAEUKyIE/hqdefault.jpg",
    },
    {
      id: 12,
      title: "Kepler Gym video",
      category: "Corporate",
      video: "https://www.youtube.com/embed/OjDScdrYm8w",
      thumbnail: "https://img.youtube.com/vi/OjDScdrYm8w/hqdefault.jpg",
    },
    {
      id: 13,
      title: "Coffee Market Building for People and Prosperity",
      category: "Documentary",
      video: "https://www.youtube.com/embed/EQdb0uKpg8A",
      thumbnail: "https://img.youtube.com/vi/EQdb0uKpg8A/hqdefault.jpg",
    },
    {
      id: 14,
      title: "Rwanda NgurizaNshore USAID Funded Project",
      category: "Corporate",
      video: "https://www.youtube.com/embed/FCV0DRRpV4w",
      thumbnail: "https://img.youtube.com/vi/FCV0DRRpV4w/hqdefault.jpg",
    },
    {
      id: 15,
      title: "Work Integrated Learning (WIL) Institute \n AIMS",
      category: "Events",
      video: "https://www.youtube.com/embed/_bB0IXCcIvI",
      thumbnail: "https://img.youtube.com/vi/_bB0IXCcIvI/hqdefault.jpg",
    },
    {
      id: 16,
      title: "Just MOMO The Gift - MTN",
      category: "Corporate",
      video: "https://www.youtube.com/embed/MEeSUlN4PbA",
      thumbnail: "https://img.youtube.com/vi/MEeSUlN4PbA/hqdefault.jpg",
    },
  ];

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const firstRow = filteredProjects.slice(0, Math.ceil(filteredProjects.length / 2));
  const secondRow = filteredProjects.slice(Math.ceil(filteredProjects.length / 2));
  
  // Video modal state
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Two marquee controllers: row A (left), row B (right)
  const marqueeA = useInfiniteMarquee({ direction: "left", speed: 90, pauseOnHover: true });
  const marqueeB = useInfiniteMarquee({ direction: "right", speed: 70, pauseOnHover: true });

  return (
    <section className="relative bg-gradient-to-b from-[#1a0f0a] to-[#0d0d0d] text-white py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1 rounded-full border border-orange-500 text-xs uppercase tracking-wider text-orange-400 font-medium">
            Portfolio
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">Featured Projects</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Discover our most impactful audiovisual productions that have transformed brands, told
          compelling stories, and captivated audiences across Africa and beyond.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search projects, categories, or keywords..."
            className="w-full px-4 py-2 rounded-full bg-[#1e1e1e] text-gray-300 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="absolute right-4 top-2.5 w-5 h-5 text-gray-500" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-[#2a2a2a] text-gray-400 hover:bg-orange-500/20 hover:text-orange-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Marquee Rows */}
        <div className="space-y-6 mb-12 overflow-hidden">
          {/* Row 1 — scroll left */}
          <div
            className="relative w-full overflow-hidden group"
            ref={marqueeA.containerRef}
            {...marqueeA.pauseHandlers}
          >
            <motion.div className="flex w-max will-change-transform" style={{ x: marqueeA.x }}>
              {/* The ONE measured copy */}
              <div ref={marqueeA.copyRef} className="flex gap-5">
                {firstRow.map((project) => (
                  <Card key={`row1-${project.id}`} project={project} setSelectedVideo={setSelectedVideo} />
                ))}
              </div>
              {/* Extra copies to cover the container and enable seamless wrap */}
              {Array.from({ length: marqueeA.copies - 1 }).map((_, i) => (
                <div key={`row1-copy-${i}`} className="flex gap-5" aria-hidden="true">
                  {firstRow.map((project) => (
                    <Card key={`row1-${project.id}-dup-${i}`} project={project} setSelectedVideo={setSelectedVideo} />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 — scroll right */}
          <div
            className="relative w-full overflow-hidden group"
            ref={marqueeB.containerRef}
            {...marqueeB.pauseHandlers}
          >
            <motion.div className="flex w-max will-change-transform" style={{ x: marqueeB.x }}>
              <div ref={marqueeB.copyRef} className="flex gap-5">
                {secondRow.map((project) => (
                  <Card key={`row2-${project.id}`} project={project} setSelectedVideo={setSelectedVideo} />
                ))}
              </div>
              {Array.from({ length: marqueeB.copies - 1 }).map((_, i) => (
                <div key={`row2-copy-${i}`} className="flex gap-5" aria-hidden="true">
                  {secondRow.map((project) => (
                    <Card key={`row2-${project.id}-dup-${i}`} project={project} setSelectedVideo={setSelectedVideo} />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => navigate("/portfolio")}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow transition"
            title="More Projects"
          >
            More Projects
          </button>
          <button className="px-6 py-3 border border-gray-600 hover:border-orange-500 text-gray-300 hover:text-orange-400 font-medium rounded-lg transition" title="Start The Project">
            Start The Project →
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVideo(null);
              }}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div 
              className="w-full max-w-4xl aspect-video bg-black"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`${selectedVideo}?autoplay=1`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Project Video"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/** Small presentational card, unchanged visually */
function Card({ project, setSelectedVideo }: { project: { id: number; title: string; thumbnail: string; video: string }; setSelectedVideo: (video: string | null) => void }) {
  return (
    <div className="relative group rounded-lg overflow-hidden bg-black shadow-md hover:shadow-lg transition flex-shrink-0 w-64 h-40">
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        loading="lazy"
      />
      <button 
        className="absolute inset-0 flex items-center justify-center"
        aria-label={`Play video: ${project.title}`}
        title={`Play video: ${project.title}`}
        onClick={() => setSelectedVideo(project.video)}
      >
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-600/80 hover:bg-orange-600 transition">
          <Play className="w-6 h-6 text-white" />
        </span>
      </button>
    </div>
  );
}