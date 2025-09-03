import { ReactNode } from 'react';
const heroBackground = '/images/all_site_images/Home/BG/Home_BG.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { BlogPost } from '../data/blog';
import { Facebook, Twitter } from 'lucide-react';
import { FaWhatsapp, FaDownload } from 'react-icons/fa';

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
  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0f1012] flex items-center justify-center">
        <p className="text-zinc-300">Loading blog post...</p>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-[#0f1012] text-zinc-100">
      {/* SEO Meta Tags */}
      <head>
        <title>{`${blog.title} | GoodAV - Rwanda, Africa, Documentary, Gorilla Naming, Kigali Convention Center, Visit Rwanda`}</title>
        <meta name="description" content={`Read about ${blog.title} - ${blog.excerpt} | GoodAV is your trusted audiovisual partner for Rwanda, Africa, documentary, conferences, tourism, Kigali Convention Center, Visit Rwanda, Kwita Izina, gorilla naming, Rwanda visa, national parks, and more.`} />
        <meta name="keywords" content="Rwanda, Africa, documentary, Kigali Convention Center, Visit Rwanda, conference in Rwanda, Kwita Izina, gorilla naming, Rwanda visa, Rwandan national park, Rwanda Convention Bureau, audiovisual industry Rwanda, Trust Partner Rwanda, event media coverage, video production Rwanda, live streaming Rwanda, tourism Rwanda, international conference Rwanda, creative economy Rwanda, NGO storytelling Rwanda, African creative industries, cultural preservation Rwanda, pan-African media agency, impact storytelling Rwanda, professional media coverage, global events Rwanda, tourism investment Rwanda, e-learning Rwanda, documentary filmmaking Rwanda, branding Rwanda, high-quality video editing, media production Rwanda, creative direction Rwanda, audiovisual innovation Rwanda, blog, article, engagement, customer conversion" />
        <meta property="og:title" content={`${blog.title} | GoodAV - Rwanda, Africa, Documentary`} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://goodav.net/blog/${blog.slug}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://goodav.net/blog/${blog.slug}`} />
        <meta httpEquiv="Content-Language" content="en" />
      </head>
      {/* HERO */}
      <section className="relative mt-20">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r text-white bg-clip-text text-transparent">
              {blog?.title}
            </h1>

            <p className="text-sm text-zinc-300">
              <span className="font-semibold text-orange-300">{blog?.category}</span>
              <span className="mx-2">•</span>
              <time>{blog?.date}</time>
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
                <SidebarLink href="/">Home</SidebarLink>
                <SidebarLink href="/about">About Us</SidebarLink>
                <SidebarLink href="/portfolio">Portfolio</SidebarLink>
                <SidebarLink href="/blog" active>Blog Archives</SidebarLink>
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

            {/* Download */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                Download Company Profile
              </div>
              <a
                href="/Download/Company_Profile/Company_Profile.pdf"
                className="mt-3 inline-flex items-center gap-2 rounded bg-white/10 px-3 py-2 text-xs font-semibold text-orange-300 ring-1 ring-white/10 hover:bg-white/15"
                rel="noopener"
              >
                <FaDownload className="h-4 w-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </aside>

          {/* ARTICLE */}
          <article className="lg:col-span-9 space-y-8">
            {blog?.image && (
              <figure className="overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur shadow">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-auto max-h-[500px] object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/placeholder.svg';
                  }}
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.opacity = '1';
                  }}
                  style={{ opacity: 0 }}
                />
              </figure>
            )}

            

            {/* Full content (Markdown-supported) */}
            <div className="prose prose-invert prose-zinc max-w-none text-zinc-300">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-orange-400 mt-8 mb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-orange-400 mt-8 mb-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-orange-400 mt-6 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="text-zinc-300 mb-4 leading-relaxed" {...props} />,
                  a: ({node, ...props}) => <a className="text-orange-400 hover:text-orange-300 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="text-zinc-300" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-orange-400 pl-4 italic my-4 text-zinc-300" {...props} />,
                  code: ({node, ...props}) => <code className="bg-zinc-800 text-orange-300 px-1.5 py-0.5 rounded text-sm" {...props} />,
                  pre: ({node, ...props}) => <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto my-4" {...props} />,
                  img: ({node, ...props}) => <img className="rounded-lg my-6 w-full h-auto" {...props} />
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <span>Share:</span>
              <ShareBtn label="Twitter" />
              <ShareBtn label="Facebook" />
              <ShareBtn label="WhatsApp" />
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

function ShareBtn({ label }: { label: string }) {
  let Icon = null;
  if (label === 'Twitter') Icon = Twitter;
  if (label === 'Facebook') Icon = Facebook;
  
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
      {label !== 'WhatsApp' ? <Icon className="h-4 w-4" /> : <span className="h-4 w-4"><i className="fab fa-whatsapp h-4 w-4"></i></span>}
    </button>
  );
}
