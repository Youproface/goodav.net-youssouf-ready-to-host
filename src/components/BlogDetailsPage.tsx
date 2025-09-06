
import React, { ReactNode, useState, Suspense } from 'react';
const heroBackground = '/images/all_site_images/Home/BG/Home_BG.png';
import { BlogPost } from '../data/blog';
import SEO from './SEO';
import { generateBlogKeywords, generateBlogDescription, generateBlogStructuredData, generateBlogTitle } from '../utils/blogSEO';

// Dynamic imports for heavy dependencies
const ReactMarkdown = React.lazy(() => import('react-markdown'));
const remarkGfmPromise = import('remark-gfm');
const rehypeRawPromise = import('rehype-raw');
const LucideReactPromise = import('lucide-react');
const ReactIconsFaPromise = import('react-icons/fa');

interface SidebarLinkProps {
  href: string;
  children: ReactNode;
  active?: boolean;
}

interface ShareIconProps {
  children: ReactNode;
}

interface ArticleSectionProps {
  title: string;
  text: string;
}

interface ArticleBulletsProps {
  title: string;
  items: [string, string][];
}

interface BlogDetailsPageProps {
  blog: BlogPost;
}

export default function BlogDetailsPage({ blog }: BlogDetailsPageProps) {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [remarkGfm, setRemarkGfm] = useState<any>(null);
  const [rehypeRaw, setRehypeRaw] = useState<any>(null);
  const [icons, setIcons] = useState<any>({});
  React.useEffect(() => {
    // Load markdown plugins and icons dynamically
    remarkGfmPromise.then((mod) => setRemarkGfm(() => mod.default || mod));
    rehypeRawPromise.then((mod) => setRehypeRaw(() => mod.default || mod));
    Promise.all([LucideReactPromise, ReactIconsFaPromise]).then(([lucide, fa]) => {
      setIcons({
        Facebook: lucide.Facebook,
        Twitter: lucide.Twitter,
        FaWhatsapp: fa.FaWhatsapp,
        FaDownload: fa.FaDownload,
      });
    });
  }, []);
  if (!blog) {
    return null;
  }
  // SEO and structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.image,
    "datePublished": blog.date,
    "author": {
      "@type": "Organization",
      "name": "GoodAV"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GoodAV"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://goodav.net/blog/${blog.slug}`
    }
  };
  // Use new image naming convention for blog images: blog-1.jpg, blog-2.jpg, ...
  const blogImage = `/images/all_site_images/Blog/blog-${blog.id}.jpg`;

  return (
    <main className="min-h-screen bg-[#0f1012] text-zinc-100" role="main" aria-label="Blog Post">
      <SEO
        title={generateBlogTitle(blog)}
        description={generateBlogDescription(blog)}
        keywords={generateBlogKeywords(blog)}
        canonical={`https://goodav.net/blog/${blog.slug}`}
        type="article"
        image={blogImage}
        article={{
          author: "GoodAV Team",
          publishedTime: blog.date,
          section: blog.category,
          tags: [blog.category, "Africa", "Rwanda", "Creative Industries", "Audiovisual"]
        }}
        schema={generateBlogStructuredData(blog, blogImage)}
      />
  {/* HERO */}
  <section className="relative mt-20" tabIndex={-1} aria-labelledby="blog-title">
        <div className="relative mt-10 py-28 px-4 bg-transparent">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={heroBackground}
              alt={blog?.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b" />
          </div>

          {/* Content */}
          <div className="relative max-w-6xl mx-auto text-center">
            <h1 id="blog-title" className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r text-white bg-clip-text text-transparent">
              {blog?.title}
            </h1>
            <p className="text-sm text-zinc-300">
              <span className="font-semibold text-orange-300">{blog?.category}</span>
              <span className="mx-2">•</span>
              <time dateTime={blog?.date}>{blog?.date}</time>
              <span className="mx-2">•</span>
              <span>{blog?.readTime}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ARTICLE + SIDEBAR */}
      <section className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* SIDEBAR */}
          <aside className="lg:col-span-3 space-y-5">
            <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
              <div className="rounded-t-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-zinc-900">
                Category
              </div>
              <ul className="p-4 space-y-2 text-sm">
                <li><SidebarLink href="/">Home</SidebarLink></li>
                <li><SidebarLink href="/about">About Us</SidebarLink></li>
                <li><SidebarLink href="/portfolio">Portfolio</SidebarLink></li>
                <li><SidebarLink href="/blog" active>Blog Archives</SidebarLink></li>
              </ul>
            </div>

            {/* CTA box */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-5 text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-orange-300">
                Have idea in your mind?
              </div>
              <p className="mt-2 text-lg font-extrabold">Let’s start your project</p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="/contact"
                  className="rounded-md bg-gradient-to-r from-orange-500 to-amber-400 px-3 py-2 text-xs font-semibold text-zinc-900 shadow hover:from-orange-400 hover:to-amber-300"
                >
                  Start Project
                </a>
                <a
                  href="/contact"
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/10"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* View Company Profile (Modal) */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-5 text-center">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                View Company Profile
              </div>
              <button
                onClick={() => setProfileModalOpen(true)}
                className="mt-3 inline-flex items-center gap-2 rounded bg-white/10 px-3 py-2 text-xs font-semibold text-orange-300 ring-1 ring-white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-orange-400"
                type="button"
                aria-label="View company profile PDF"
              >
                {icons.FaDownload ? <icons.FaDownload className="h-4 w-4" /> : null}
                <span>View Company Profile</span>
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

          {/* ARTICLE */}
          <article className="lg:col-span-9 space-y-8">
            <figure className="overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur shadow">
              <img 
                src={blogImage}
                alt={blog.title}
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[500px] object-cover rounded-lg opacity-0 transition-opacity duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/placeholder.svg';
                }}
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '1';
                }}
              />
            </figure>

            

            {/* Full content (Markdown-supported) */}
            <div className="prose prose-invert prose-zinc max-w-none text-zinc-300">
              <Suspense fallback={null}>
                {remarkGfm && rehypeRaw ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-orange-400 mt-8 mb-4" tabIndex={0} {...props} />, 
                      h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-orange-400 mt-8 mb-3" tabIndex={0} {...props} />, 
                      h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-orange-400 mt-6 mb-2" tabIndex={0} {...props} />, 
                      p: ({node, ...props}) => <p className="text-zinc-300 mb-4 leading-relaxed" tabIndex={0} {...props} />, 
                      a: ({node, ...props}) => <a className="text-orange-400 hover:text-orange-300 underline focus:outline focus:ring-2 focus:ring-orange-400" target="_blank" rel="noopener noreferrer" tabIndex={0} {...props} />, 
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />, 
                      ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />, 
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-orange-400 pl-4 italic my-4 text-zinc-300" tabIndex={0} {...props} />, 
                      code: ({node, ...props}) => <code className="bg-zinc-800 text-orange-300 px-1.5 py-0.5 rounded text-sm" tabIndex={0} {...props} />, 
                      pre: ({node, ...props}) => <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto my-4" tabIndex={0} {...props} />, 
                      img: ({node, ...props}) => <img className="rounded-lg my-6 w-full h-auto" loading="lazy" decoding="async" {...props} />
                    }}
                  >
                    {blog.content}
                  </ReactMarkdown>
                ) : null}
              </Suspense>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <span>Share:</span>
              <Suspense fallback={<span>...</span>}>
                <ShareBtn label="Twitter" icons={icons} />
                <ShareBtn label="Facebook" icons={icons} />
                <ShareBtn label="WhatsApp" icons={icons} />
              </Suspense>
            </div>
          </article>
        </div>

        {/* BAND CTA */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-orange-300">
              Still have a doubt?
            </h3>
            <p className="mt-2 text-2xl font-extrabold">Want to see our previous projects?</p>
          </div>
          <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-6 flex items-center justify-end">
            <a
              href="/portfolio"
              className="rounded-md bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 shadow hover:from-orange-400 hover:to-amber-300"
            >
              See all projects
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Subcomponents */

function SidebarLink({ href, children, active = false }: SidebarLinkProps) {
  return (
    <li>
      <a
        href={href}
        className={`block rounded px-2 py-1 ${
          active ? 'bg-white/10 text-orange-300 ring-1 ring-white/10' : 'text-zinc-300 hover:text-white'
        }`}
      >
        {children}
      </a>
    </li>
  );
}

function ShareBtn({ label, icons }: { label: string; icons: any }) {
  let Icon = null;
  if (label === 'Twitter') Icon = icons.Twitter;
  if (label === 'Facebook') Icon = icons.Facebook;
  if (label === 'WhatsApp') Icon = icons.FaWhatsapp;
  return (
    <button
      className="grid h-7 w-7 place-items-center rounded bg-white/10 text-zinc-200 ring-1 ring-white/10 hover:bg-white/15"
      aria-label={`Share on ${label}`}
      onClick={() => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const title = typeof document !== 'undefined' ? document.title : '';
        const text = encodeURIComponent(title);
        const map: Record<string, string> = {
          Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`,
          Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          WhatsApp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text}%0A%0A${url}`)}`,
        };
        const shareUrl = map[label] || '';
        if (shareUrl) window.open(shareUrl, '_blank', 'noopener,noreferrer');
      }}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
    </button>
  );
}
