import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost, blogPosts } from '../data/blog';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

// Helper function to get correct blog image path
const getBlogImagePath = (blog: BlogPost): string => {
  // If the image already has the correct path, use it
  if (blog.image.includes('/blog-')) {
    return blog.image;
  }
  // Otherwise, map to the correct blog-{id}.jpg format
  return `/images/all_site_images/Blog/blog-${blog.id}.jpg`;
};

export default function BlogsSection() {
    const navigate = useNavigate();
    
    const filteredPosts = blogPosts.slice(0, 3);
    
    const handleBlogClick = (post: BlogPost) => {
      navigate(`/blog/${post.slug}`, { state: { post } });
    };
    
    return (
      <motion.section id="blogs-section" className="relative bg-[#0e0f10] text-zinc-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} aria-labelledby="our-stories-heading">
        {/* soft background glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute right-10 bottom-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        </div>
  
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          {/* top badge */}
          <div className="mx-auto w-max rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-orange-300/90 backdrop-blur">
            Explore
          </div>
  
          {/* heading */}
          <header className="mt-4 text-center">
            <h2 id="our-stories-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Our Stories</h2>
            <p className="mx-auto mt-2 max-w-3xl text-sm sm:text-base md:text-lg sm:text-xl md:text-2xl text-zinc-300">
              Discover impactful stories, groundbreaking documentaries, and transformative projects from Rwanda and across Africa. Dive into the world of visual storytelling powered by GoodAV and see how narratives come to life.
            </p>
          </header>
  
          {/* cards */}
          <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Story cards">
            {filteredPosts.map((post) => (
              <li key={post.id} className="contents">
                <StoryCard
                  onClick={() => handleBlogClick(post)}
                  category={post.category}
                  image={getBlogImagePath(post)}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  read={post.readTime}
                  cta="Read More"
                />
              </li>
            ))}
            {/* <li className="contents"><StoryCard
              category="Events"
              image="/images/stories/events.jpg"
              title="From conferences to cultural festivals, cutting‑edge audiovisual technology is transforming African events."
              excerpt="Behind the scenes of large‑scale productions and seamless attendee experiences."
              date="March 6, 2024"
              read="6 min read"
              cta="Explore: Event Transformations"
            /></li> */}
          </ul>
  
          {/* bottom actions */}
          <div className="mt-6 flex items-center justify-center">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-5 py-3 text-[11px] sm:text-sm md:text-base font-semibold uppercase tracking-wide text-orange-300 backdrop-blur hover:bg-white/10"
            >
              <span className="grid h-5 w-5 place-items-center rounded bg-orange-500/20 text-orange-300 ring-1 ring-white/10">▣</span>
              Explore All Stories
            </a>
          </div>
        </div>
      </motion.section>
    );
  }
  
  /* Subcomponents */
  
  function FilterChip({ 
    children, 
    active = false, 
    onClick = () => {}
  }: { 
    children: React.ReactNode; 
    active?: boolean;
    onClick?: () => void;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={[
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] sm:text-sm md:text-base font-semibold backdrop-blur transition-colors duration-200",
          active
            ? "bg-gradient-to-r from-orange-500 to-amber-400 text-zinc-900"
            : "border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10",
        ].join(" ")}
      >
        <span className={active ? "hidden" : "text-orange-300"}>▤</span>
        {children}
      </button>
    );
  }
  
  interface StoryCardProps {
  category: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  cta: string;
  onClick?: () => void;
}

function StoryCard({ category, image, title, excerpt, date, read, cta, onClick }: StoryCardProps) {
    return (
  <article
        className="group rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.25)] overflow-hidden hover:ring-white/20 transition-all duration-300 focus-within:ring-white/30"
        
      >
        {/* image with category ribbon */}
        <div className="relative">
          <img src={image} alt={`${category} story image`} className="h-44 w-full object-cover" loading="lazy" />
          {/* category badge with small underline bar */}
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-2.5 py-1 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wide text-orange-200 ring-1 ring-white/10">
              <span className="grid h-5 w-5 place-items-center rounded bg-orange-500/25 text-orange-300 ring-1 ring-white/10">▣</span>
              {category}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-orange-500 to-amber-400" />
        </div>
  
        {/* body */}
  <div className="p-4">
          <h3 className="line-clamp-2 text-[13px] sm:text-sm md:text-base font-semibold text-zinc-100">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[12px] sm:text-sm md:text-base leading-5 text-zinc-300">
            {excerpt}
          </p>
  
          {/* meta */}
          <div className="mt-4 flex items-center justify-between text-[11px] sm:text-sm md:text-base text-zinc-400">
            <span className="inline-flex items-center gap-2">
              <span className="grid h-4 w-4 place-items-center rounded bg-white/5 text-orange-300 ring-1 ring-white/10"><FaCalendarAlt className="h-3 w-3" /></span>
              {date}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="grid h-4 w-4 place-items-center rounded bg-white/5 text-orange-300 ring-1 ring-white/10"><FaClock className="h-3 w-3" /></span>
              {read}
            </span>
          </div>
  
          {/* CTA pill */}
          <button
            className="mt-4 w-full rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-[12px] sm:text-sm md:text-base font-semibold text-zinc-900 shadow hover:from-orange-400 hover:to-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            onClick={onClick}
            aria-label={`${cta}: ${title}`}
          >
            {cta} →
          </button>
        </div>
      </article>
    );
  }
