const heroBackground = '/images/all_site_images/Home/BG/Home_BG.webp';
import BlogsSection from './BlogsSection';
import { blogPosts, BlogPost } from '@/data/blog';
import { useState, useMemo } from 'react';
export default function BlogArchive() {
  // Modal state for company profile (not visible in render)
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Build category list dynamically
  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    blogPosts.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return blogPosts;
    return blogPosts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Use new image naming convention for blog images: blog-1.jpg, blog-2.jpg, ...
  const getCoverImage = (post: BlogPost) => `/images/all_site_images/Blog/blog-${post.id}.jpg`;

  return (
    <div className="min-h-screen bg-black text-zinc-200">
             {/* Hero */}
             <div className="relative mt-10 py-32 px-4 bg-transparent">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="About GoodAV"
            className="w-full h-full object-cover opacity-30"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b " />
        </div>
        
        {/* Content */}
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r text-white bg-clip-text text-transparent">
          Blog Archives
          </h1>
        </div>
      
      </div>
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        {/* Page Heading */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Category Box */}
            <div className="bg-[#111112] border border-zinc-800/60 rounded-sm overflow-hidden">
              <div className="border-b border-zinc-800/60 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                  Category
                </div>
              </div>
              <ul className="p-4 space-y-2 text-sm">
                {categories.map((c) => {
                  const active = selectedCategory === c;
                  return (
                    <li key={c}>
                      <button
                        onClick={() => setSelectedCategory(c)}
                        className={`w-full text-left inline-flex items-center gap-2 transition ${
                          active ? "text-white" : "text-zinc-300 hover:text-white"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            active ? "bg-orange-500" : "bg-orange-500/60"
                          }`}
                        />
                        {c}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* CTA card */}
            <div className="relative overflow-hidden bg-[#111112] border border-zinc-800/60 rounded-sm p-5 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="text-[11px] uppercase tracking-[0.25em] text-orange-500 font-bold">
                Have idea in your mind?
              </div>
              <div className="mt-2 text-[10px] tracking-wider text-zinc-400">
                Let’s start your project
              </div>
              <a
                href="#contact"
                className="mt-4 inline-block border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-bold transition"
              >
                Contact us
              </a>
            </div>

            {/* View Company Profile (Modal) */}
            <div className="bg-[#111112] border border-zinc-800/60 rounded-sm p-5 text-center">
              <div className="text-[11px] uppercase tracking-[0.25em] font-bold text-zinc-400">
                View company profile
              </div>
              <button
                onClick={() => setProfileModalOpen(true)}
                className="mt-3 inline-flex items-center gap-2 text-[12px] text-orange-500 hover:text-white border border-orange-500 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                type="button"
                aria-label="View company profile PDF"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
                View Company Profile
              </button>
            </div>
      {/* Company Profile Modal (same as Portfolio) */}
      {profileModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setProfileModalOpen(false);
          }}
        >
          <div
            className="bg-[#18181b] rounded-lg shadow-xl max-w-2xl w-full p-6 relative flex flex-col"
            tabIndex={0}
            autoFocus
          >
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
                <a
                  href="/download/company-profile/company-profile.pdf"
                  download
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors"
                >
                  Download
                </a>
                <button
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors"
                  onClick={() => {
                    window.open('/download/company-profile/company-profile.pdf', '_blank');
                  }}
                >
                  Expand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
          </aside>

          {/* Main List */}
          <main className="lg:col-span-9 space-y-10">
            {filtered.map((post) => {
              const imageSrc = getCoverImage(post);
              const isVideo = !!post.ytThumbnail;
              return (
                <article
                  key={post.id}
                  className="group relative overflow-hidden bg-[#0b0b0b] border border-zinc-800/60 rounded-sm"
                >
                  {/* Top accent */}
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-orange-500/90" />

                  {/* Image */}
                  <a href={`/blog/${post.slug}`} className="block relative">
                    <img
                      src={imageSrc}
                      alt={post.title}
                      loading="lazy"
                      className="w-full aspect-[16/9] object-cover object-center brightness-95 transition duration-300 group-hover:brightness-100"
                    />
                    {isVideo && (
                      <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 border border-white/20">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-white/90"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    )}
                  </a>

                  {/* Content */}
                  <div className="p-4 sm:p-5 lg:p-6">
                    <div className="mb-2 md:mb-3 flex flex-wrap items-center gap-2 md:gap-3">
                      <span className="text-xs md:text-sm lg:text-base uppercase tracking-widest text-orange-500/90 font-semibold">
                        {post.category}
                      </span>
                      <span className="text-xs md:text-sm text-zinc-500">•</span>
                      <span className="text-xs md:text-sm text-zinc-400">{post.date}</span>
                      <span className="text-xs md:text-sm text-zinc-500">•</span>
                      <span className="text-xs md:text-sm text-zinc-400">{post.readTime}</span>
                    </div>

                    <h3 className="text-sm md:text-base lg:text-lg leading-snug md:leading-relaxed uppercase tracking-wide font-semibold text-zinc-200 group-hover:text-white">
                      <a
                        href={`/blog/${post.slug}`}
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70"
                      >
                        {post.title}
                      </a>
                    </h3>

                    <p className="mt-2 md:mt-3 text-xs md:text-sm lg:text-base leading-relaxed text-zinc-400">
                      {post.excerpt}
                    </p>

                    <a
                      href={`/blog/${post.slug}`}
                      className="mt-3 inline-block border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black transition-colors px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold"
                    >
                      Read more
                    </a>
                  </div>
                </article>
              );
            })}
          </main>
        </div>
      </div>
    </div>
  );
}