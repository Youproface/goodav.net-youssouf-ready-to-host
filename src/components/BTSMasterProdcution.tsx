interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

interface ArticleSectionProps {
  title: string;
  text: string;
}

interface ArticleBulletsProps {
  title: string;
  items: [string, string][];
}

interface ShareBtnProps {
  label: string;
}

interface GalleryImgProps {
  src: string;
  className?: string;
  alt?: string;
}

export default function BTSMasterProduction() {
    return (
      <main className="min-h-screen bg-[transparent] mt-10 text-zinc-100">
        {/* HERO */}
      
  
        {/* BTS GALLERY */}
        <section className="relative mx-auto max-w-6xl px-6 pb-16">
          {/* Header panel */}
          <div className="rounded-3xl text-center ring-1 ring-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
            <div className="mx-auto w-max rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-300/90">
              Behind the Scenes
            </div>
            <h3 className="mt-3 text-2xl font-extrabold">
              BTS: <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent drop-shadow">Masterful Productions</span>
            </h3>
            <p className="mt-3  text-xl text-zinc-300">
              Step into the creative process at GoodAV—setup, directing, capturing authentic moments, and collaborating with clients to bring bold visions to life through premium audiovisual excellence.
            </p>
          </div>
  
          {/* Grid gallery (balanced layout) */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { src: "/images/Home/BTS/GOODAV_BTS_1.jpg", className: "col-span-2 h-40" },
              { src: "/images/Home/BTS/GOODAV_BTS_2.jpg", className: "col-span-2 h-40" },
              { src: "/images/Home/BTS/GOODAV_BTS_3v.jpg", className: "col-span-1 row-span-2 h-full" },
              { src: "/images/Home/BTS/GOODAV_BTS_4v.jpg", className: "col-span-1 row-span-2 h-full" },
              { src: "/images/Home/BTS/GOODAV_BTS_5.jpg", className: "col-span-2 h-44" },
              { src: "/images/Home/BTS/GOODAV_BTS_6.jpg", className: "col-span-2 h-44" },
              { src: "/images/Home/BTS/GOODAV_BTS_7v.jpg", className: "col-span-2 h-44" },
              { src: "/images/Home/BTS/GOODAV_BTS_8v.jpg", className: "col-span-2 h-44" },
              { src: "/images/Home/BTS/GOODAV_BTS_9v.jpg", className: "col-span-2 h-44" },
              { src: "/images/Home/BTS/GOODAV_BTS_10v.jpg", className: "col-span-2 h-44" },
              { src: "/images/Home/BTS/GOODAV_BTS_11v.jpg", className: "col-span-2 h-44" },
              { src: "/images/Home/BTS/GOODAV_BTS_12v.jpg", className: "col-span-2 h-44" },
            ].map((img, index) => (
              <GalleryImg 
                key={index}
                src={img.src}
                className={img.className}
                alt={`Behind the scenes ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </main>
    );
  }
  
  /* ——— subcomponents ——— */
  
  
  function GalleryImg({ src, className = "", alt = "Behind the scenes" }: GalleryImgProps) {
    return (
      <div className={`group relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur ${className}`}>
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" 
        />
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/15" />
      </div>
    );
  }
  