import React, { useState } from 'react';
import img22 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-27.jpg';
import img23 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-28.jpg';
import img24 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-29.jpg';
import img25 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-30.jpg';
import img26 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-31.jpg';
import img27 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-33.jpg';
import img28 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-34.jpg';
import img29 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-35.jpg';
import img30 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-39.jpg';
import img31 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-40.jpg';
import img32 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-41.jpg';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  // ...all logic and arrays above...
  return (
    <div>
      <SEO
        title="Portfolio - GoodAV | Award-Winning Audiovisual Projects"
        description="Explore GoodAV’s portfolio of award-winning audiovisual productions, documentaries, and event coverage across Africa."
        canonical="https://goodav.net/portfolio"
      />
      <div className="min-h-screen bg-black text-white">
        {/* ...rest of the page content... */}
      </div>
    </div>
  );
};

export default Portfolio;
import img22 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-27.jpg';
import img23 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-28.jpg';
import img24 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-29.jpg';
import img25 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-30.jpg';
import img26 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-31.jpg';
import img27 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-33.jpg';
import img28 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-34.jpg';
import img29 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-35.jpg';
import img30 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-39.jpg';
import img31 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-40.jpg';
import img32 from '../assets/images/all_site_images/Portfolio/Videos/Video-img-41.jpg';

// Array of all imported images
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, img31, img32];

import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  // ...all logic and arrays above...
  return (
    <div>
      <SEO
        title="Portfolio - GoodAV | Award-Winning Audiovisual Projects"
        description="Explore GoodAV’s portfolio of award-winning audiovisual productions, documentaries, and event coverage across Africa."
        canonical="https://goodav.net/portfolio"
      />
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "GoodAV Portfolio",
          "description": "Award-winning audiovisual productions, documentaries, and event coverage by GoodAV.",
          "creator": {
            "@type": "Organization",
            "name": "GoodAV"
          },
          "url": "https://goodav.net/portfolio",
          "image": "https://goodav.net/image/portfolio/ias2025-cover.jpg"
        }}
      />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        {/* ...rest of the page content... */}
      </div>
    </div>
  );
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "GoodAV Portfolio",
          "description": "Award-winning audiovisual productions, documentaries, and event coverage by GoodAV.",
          "creator": {
            "@type": "Organization",
            "name": "GoodAV"
          },
          "url": "https://goodav.net/portfolio",
          "image": "https://goodav.net/image/portfolio/ias2025-cover.jpg"
        }}
      />
      <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative mt-10 py-32 px-4 bg-transparent">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="About GoodAV"
            className="w-full h-full object-cover opacity-30"
          />
          
          {/* <div className="absolute inset-0 bg-gradient-to-b " /> */}
        </div>
        
        {/* Content */}
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r text-white bg-clip-text text-transparent">
            Our Extensive Portfolio
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Discover our creative journey through award-winning audiovisual productions that tell powerful stories across Africa
          <button className="flex mt-10 items-center mx-auto z-99 gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-200">
                <Rocket className="h-5 w-5" />
                Start Your Journey
       </button>
          </p>
        // ...all logic and arrays above...
        return (
          <div>
            <SEO
              title="Portfolio - GoodAV | Award-Winning Audiovisual Projects"
              description="Explore GoodAV’s portfolio of award-winning audiovisual productions, documentaries, and event coverage across Africa."
              canonical="https://goodav.net/portfolio"
            />
            <SchemaMarkup
              schema={{
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                "name": "GoodAV Portfolio",
                "description": "Award-winning audiovisual productions, documentaries, and event coverage by GoodAV.",
                "creator": {
                  "@type": "Organization",
                  "name": "GoodAV"
                },
                "url": "https://goodav.net/portfolio",
                "image": "https://goodav.net/image/portfolio/ias2025-cover.jpg"
              }}
            />
            <div className="min-h-screen bg-black text-white">
              {/* Hero Section */}
              {/* ...rest of the page content... */}
            </div>
          </div>
        );
        <span className="grid h-5 w-5 place-items-center rounded bg-white/10">🏢</span>
        Corporate <span className="text-zinc-400">(23+)</span>
      </button>

      <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-small text-zinc-200 hover:bg-white/10">
        <span className="grid h-5 w-5 place-items-center rounded bg-white/10">🎓</span>
        Education <span className="text-zinc-400">(24+)</span>
      </button>

      <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-small text-zinc-200 hover:bg-white/10">
        <span className="grid h-5 w-5 place-items-center rounded bg-white/10">🌍</span>
        International <span className="text-zinc-400">(29+)</span>
      </button>
    </div>

    {/* search + sort + view + advanced */}
    <div className="mt-5 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
      {/* search */}
      <div className="flex-1 md:max-w-xl">
        <div className="group relative">
          <input
            type="text"
            placeholder="Search our premium portfolio collection"
            className="w-full rounded-2xl bg-white/[0.06] px-4 py-3 pl-12 text-body text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-orange-400/60"
          />
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-orange-300">🔎</span>
        </div>
        <div className="mt-2 w-max rounded-full border border-white/10 bg-white/5 px-3 py-1 text-micro text-zinc-300">
          Powered by AI‑enhanced search
        </div>
      </div>

      {/* right controls */}
      <div className="flex items-center gap-3">
        {/* sort */}
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-small text-zinc-200 hover:bg-white/10">
          Newest First <span className="opacity-60">▾</span>
        </button>

        {/* view toggle */}
        <div className="flex overflow-hidden rounded-xl border border-white/10">
          <button className="grid h-10 w-10 place-items-center bg-white/5 text-zinc-200 hover:bg-white/10" title="Grid">
            ▧
          </button>
          <button className="grid h-10 w-10 place-items-center bg-gradient-to-r from-orange-500 to-amber-400 text-zinc-900 font-semibold" title="List">
            ≡
          </button>
          <button className="grid h-10 w-10 place-items-center bg-white/5 text-zinc-200 hover:bg-white/10" title="Compact">
            ⋮
          </button>
        </div>

        {/* Advanced */}
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-small text-zinc-200 hover:bg-white/10">
          <span className="text-orange-300">⚙</span>
          Advanced <span className="opacity-60">▾</span>
        </button>
        
      </div>
    </div>

    {/* footer row */}
    <div className="mt-5 flex items-center justify-between">
      <p className="text-small text-zinc-400">
        Showing 106 of 200+ projects
      </p>
      <a
        href="#all-projects"
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-small font-semibold text-white hover:bg-blue-500"
      >
        ▦ View All 200+ Projects
      </a>
    </div>
  </div>
  {/* Advanced filters (toggle this block when “Advanced” is clicked) */}
<section className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur text-zinc-100">
  <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
    {/* Client Type */}
    <div className="md:col-span-4">
      <h4 className="text-small font-semibold uppercase tracking-wider text-zinc-300">
        Client Type
      </h4>
      <div className="mt-3 space-y-3">
        {[
          "Government Organizations",
          "NGOs & Non-profits",
          "Private Companies",
          "International Organizations",
        ].map((label, i) => (
          <label
            key={label}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/0 px-3 py-2 hover:bg-white/5"
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-transparent text-orange-400 focus:ring-orange-400/60"
              defaultChecked={false}
              aria-labelledby={`client-${i}`}
            />
            <span id={`client-${i}`} className="text-body">
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Year Range */}
    <div className="md:col-span-4">
      <h4 className="text-small font-semibold uppercase tracking-wider text-zinc-300">
        Year Range
      </h4>

      {/* slider mockup (replace with real range input if needed) */}
      <div className="mt-4">
        <div className="relative">
          <div className="h-2 w-full rounded-full bg-white/10" />
          {/* thumb */}
          <div className="absolute -top-2 right-0 h-6 w-6 rounded-full border-2 border-black/40 bg-orange-500 shadow" />
        </div>
        <div className="mt-2 flex items-center justify-between text-small text-zinc-400">
          <span>2018</span>
          <span className="text-zinc-100 font-semibold">2024</span>
          <span>2024</span>
        </div>
      </div>

      {/* actions */}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-small font-semibold text-white hover:bg-emerald-500"
        >
          ✓ Apply Filters
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-small text-zinc-200 hover:bg-white/10"
        >
          ✕ Clear All
        </button>
      </div>
    </div>

    {/* Content Focus */}
    <div className="md:col-span-4">
      <h4 className="text-small font-semibold uppercase tracking-wider text-zinc-300">
        Content Focus
      </h4>
      <div className="mt-3 flex flex-wrap gap-3">
        {[
          "Innovation",
          "Development",
          "Culture",
          "Technology",
          "Healthcare",
          "Environment",
          "Business",
          "Youth",
        ].map((tag) => (
          <button
            key={tag}
            type="button"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-small text-zinc-200 hover:bg-white/10"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  </div>
</section>

</section>


      {/* Portfolio Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <span className="text-sm text-gray-400">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
              Load More Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;