import { Expand } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function RecentEvents() {
  // NEW: lightbox state
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // NEW: central list of gallery image sources (from your JSX below)
  const galleryImages = [
  "/images/Home/Events/GOODAV_Event_1.jpg",
  "/images/Home/Events/GOODAV_Event_2.jpg",
  "/images/Home/Events/GOODAV_Event_3.jpg",
  "/images/Home/Events/GOODAV_Event_4.jpg",
  "/images/Home/Events/GOODAV_Event_5.jpg",
  "/images/Home/Events/GOODAV_Event_Master.jpg",
  ];

  // NEW: open/close and navigation
  const openLightbox = useCallback((i) => {
    setCurrentIndex(i);
    setIsOpen(true);
  }, []);
  const closeLightbox = useCallback(() => setIsOpen(false), []);
  const nextImage = useCallback(
    () => setCurrentIndex((i) => (i + 1) % galleryImages.length),
    [galleryImages.length]
  );
  const prevImage = useCallback(
    () => setCurrentIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length),
    [galleryImages.length]
  );

  // NEW: keyboard support when open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeLightbox, nextImage, prevImage]);

  return (
    <section className="relative px-6 py-12 md:py-16">
      {/* background glow accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 left-8 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* badge */}
        <div className="mx-auto w-max rounded-full border border-white/10 bg-white/5 px-3 py-1 text-md font-semibold uppercase tracking-wider text-orange-300/90 backdrop-blur">
          Recent Event
        </div>

        {/* title */}
        <header className="mt-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
            IAS 2025
          </h1>
          <p className="mt-1  text-md text-zinc-300">
            The 13th IAS Conference on HIV Science
          </p>
        </header>

        {/* grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* left column text card */}
          <article className="md:col-span-6 rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.25)] backdrop-blur p-5">
            <p className="text-xl leading-7 text-zinc-200">
               GoodAV had the <span className="font-bold text-orange-400">honor of covering </span> 
              the 13th IAS Conference on HIV Science (IAS 2025),
               held in <span className="font-bold text-orange-400">Kigali</span>. Partnering with Baniamor Bnys, Global Sciences, and Pulsà Life Media, 
               our team provided <span className="font-bold text-orange-400">comprehensive production services</span> including video, photography, drone footage, 
               and live stream across key locations in Kigali over multiple days with the main venue at Kigali 
               Convention Centre.
            </p>
            <p className="mt-3 text-xl leading-7 text-zinc-200">
            Our work supported both internal and public-facing storytelling,
             with deliverables ranging from <span className="font-bold text-orange-400">cinematic recap videos</span> and street-style interviews to high-resolution photography for social media and LinkedIn. 
            Selected content was also used by Plus Life Media for <span className="font-bold text-orange-400">global advocacy</span>, including broadcast segments aired on ABC News
            </p>

            {/* deliveries + clients */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                
            <ul className="space-y-3">
            <h2 className="text-md text-center font-semibold text-zinc-200">Deliveries</h2>
            {[
                "Full-length recap and highlight videos",
                "Street-style interviews and cinematic b-roll",
                "Event photography for internal and external communications",
                "Fast-turnaround edits to meet real-time content needs",
            ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-orange-500/15 ring-1 ring-white/10">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5 text-orange-400"
                    aria-hidden="true"
                    >
                    <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.01 7.06a1 1 0 0 1-1.423.01L3.29 8.773a1 1 0 1 1 1.418-1.41l3.07 3.09 6.3-6.34a1 1 0 0 1 1.426.176Z"
                        clipRule="evenodd"
                    />
                    </svg>
                </span>
                <span className=" text-md leading-6 text-zinc-200">{item}</span>
                </li>
            ))}
            </ul>


            <ul className=" space-y-4">
            <h2 className="text-sm text-center font-semibold text-zinc-200">Clients</h2>
            {["Gilead Sciences", "Plus Life Media"].map((client) => (
                <li key={client} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-orange-500/15 ring-1 ring-white/10">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5 text-orange-400"
                    aria-hidden="true"
                    >
                    <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.01 7.06a1 1 0 0 1-1.423.01L3.29 8.773a1 1 0 1 1 1.418-1.41l3.07 3.09 6.3-6.34a1 1 0 0 1 1.426.176Z"
                        clipRule="evenodd"
                    />
                    </svg>
                </span>
                <span className="text-md leading-6 text-zinc-200">{client}</span>
                </li>
            ))}
            </ul>

            </div>

            {/* note */}
            <div className="relative mt-4 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
  {/* left accent rail */}
  <span
    aria-hidden
    className="pointer-events-none absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-gradient-to-b from-orange-400 via-amber-400 to-orange-500"
  />
  {/* subtle glow along the rail */}
  <span
    aria-hidden
    className="pointer-events-none absolute -left-2 top-1/2 h-16 w-10 -translate-y-1/2 rounded-full bg-orange-500/20 blur-xl"
  />

  {/* opening quote mark */}
  <span className="absolute left-4 top-2 select-none text-4xl leading-none text-orange-300/60">“</span>

  {/* content */}
  <blockquote className="pl-2">
    <p className="text-sm sm:text-base font-semibold text-zinc-100">
      We’re proud to have contributed to showcasing Rwanda’s vibrant presence on
      the global health stage through this impactful collaboration.
    </p>
  </blockquote>

  {/* soft vignette to match reference depth */}
  <span
    aria-hidden
    className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 [box-shadow:inset_0_0_40px_rgba(0,0,0,0.25)]"
  />
</div>

            {/* services inset for extra space */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MiniServiceCard
                icon="🎥"
                title="Professional Videos"
                body="Cinematic coverage and highlights"
            />
            <MiniServiceCard
                icon="📷"
                title="Photography"
                body="High‑resolution event documentation"
            />
            <MiniServiceCard
                icon="📡"
                title="Live Coverage"
                body="Real‑time content delivery"
            />
            </div>

          </article>

          {/* right column media stack */}
          <div className="md:col-span-6 flex flex-col gap-5">
            {/* hero image with caption panel */}
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur shadow-[0_8px_30px_rgb(0,0,0,0.25)]">
              <div className="relative aspect-[16/9]">
                <img
                  src="src/assets/images/all_site_images/Home/Events/GOODAV_Event_Master.jpg"
                  alt="IAS 2025 stage and crew"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute left-4 bottom-3">
                  <h3 className="text-lg font-extrabold text-white drop-shadow">
                    Behind the Scenes
                  </h3>
                  <p className="text-xs text-zinc-200">
                    Select moments from multi-day coverage
                  </p>
                </div>
              </div>
            </div>

            {/* text card “Behind the Scenes” */}
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-5">
              <div className="mb-2 flex items-center gap-2 text-orange-300">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-orange-400/20">🎬</span>
                <h3 className="text-lg font-extrabold text-zinc-100">
                  Behind the Scenes
                </h3>
              </div>
              <p className="text-sm leading-6 text-zinc-300">
                A few handpicked photos from the event. Visit our Flickr gallery for more BTS moments and extended highlights.
              </p>
            </div>

            {/* media grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* gallery row */}
              <div className="col-span-3 grid grid-cols-3 gap-4">
                {/* pass index and click handler */}
                <GalleryTile
                  index={0}
                  onClick={() => openLightbox(0)}
                  src="src/assets/images/all_site_images/Home/Events/GOODAV_Event_1.jpg"
                />
                <GalleryTile
                  index={1}
                  onClick={() => openLightbox(1)}
                  src="src/assets/images/all_site_images/Home/Events/GOODAV_Event_2.jpg"
                />
                <GalleryTile
                  index={2}
                  onClick={() => openLightbox(2)}
                  src="src/assets/images/all_site_images/Home/Events/GOODAV_Event_3.jpg"
                />
              </div>

              {/* video highlight */}
              <div className="col-span-3 opacity-50 rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 backdrop-blur relative">
                <img
                  src="src/assets/images/all_site_images/Home/Events/GOODAV_Event_Master.jpg"
                  alt="IAS 2025 conference highlights"
                  className="aspect-[16/9] w-full object-cover"
                />
                <button
                  type="button"
                  className="group absolute inset-0 grid place-items-center"
                  aria-label="Play highlights"
                >
                  <span className="grid place-items-center h-14 w-14 rounded-full bg-white/90 text-orange-600 transition group-hover:bg-white">
                    ▶
                  </span>
                </button>
                <div className="absolute left-4 bottom-3">
                  <div className="rounded bg-black/60 px-3 py-1 text-[11px] text-white">
                    IAS 2025 Conference Highlights
                  </div>
                </div>
              </div>

              {/* more gallery */}
              <GalleryTile
                className="col-span-1"
                index={3}
                onClick={() => openLightbox(3)}
                src="src/assets/images/all_site_images/Home/Events/GOODAV_Event_4.jpg"
              />
              <GalleryTile
                className="col-span-1"
                index={4}
                onClick={() => openLightbox(4)}
                src="src/assets/images/all_site_images/Home/Events/GOODAV_Event_5.jpg"
              />
              <GalleryTile
                className="col-span-1"
                index={5}
                onClick={() => openLightbox(5)}
                src="src/assets/images/all_site_images/Home/Events/GOODAV_Event_Master.jpg"
              />
            </div>

            {/* CTA card */}
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-5 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-zinc-100">
                  View More
                </h4>
                <p className="text-xs text-zinc-300">
                  Explore the complete gallery on Flickr
                </p>
              </div>
              <a
                target="_blank"
                href="https://www.flickr.com/photos/202425883@N07/albums/72177720327653270/"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-xs font-semibold text-zinc-900 shadow hover:from-orange-400 hover:to-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60"
              >
                View Gallery →
              </a>
            </div>
          </div>
        </div>

        {/* service icons row */}
        {/* <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ServiceCard
            icon="🎞"
            title="Professional Videos"
            body="Cinematic coverage and highlights"
          />
          <ServiceCard
            icon="📷"
            title="Photography"
            body="High‑resolution event documentation"
          />
          <ServiceCard
            icon="📡"
            title="Live Coverage"
            body="Real‑time content delivery"
          />
        </div> */}
      </div>

      {/* NEW: Lightbox modal, appended at the end so it doesn't affect your layout */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* backdrop click to close */}
          <button
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            aria-label="Close"
            onClick={closeLightbox}
          />
          {/* viewer */}
          <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
            <img
              src={galleryImages[currentIndex]}
              alt={galleryImages[currentIndex] ?? ""}
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
            />
            {/* controls */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25"
              aria-label="Close"
            >
              ✕
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25"
              aria-label="Next image"
            >
              ›
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-black/60 px-3 py-1 text-[11px] text-white">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* helper subcomponents (unchanged in appearance) */
function ServiceCard({ icon, title, body }) {
  return (
    <div className="group rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-4 shadow hover:shadow-lg transition-shadow">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/15 text-lg">
        {icon}
      </div>
      <h3 className="text-xs font-extrabold tracking-wide text-zinc-100">
        {title}
      </h3>
      <p className="mt-1 text-[12px] text-zinc-300">{body}</p>
    </div>
  );
}

// UPDATED: adds optional onClick and index, but keeps your original structure and styling
function GalleryTile({ src, className = '', onClick, index }) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={index !== undefined ? `Open image ${index + 1}` : 'Open image'}
        className={`group relative overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur ${className}`}
      >
        <img
          src={src}
          alt="recent"
          className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
  
        {/* subtle hover veil */}
        <span className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/15" />
  
        {/* expand icon button */}
        <span
          className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white/95 ring-1 ring-white/30 backdrop-blur
                     opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
          aria-hidden="true"
        >
          {/* “expand” SVG (arrows out) */}
          <Expand />
        </span>
      </button>
    );
  }
  
function MiniServiceCard({ icon, title, body }) {
    return (
      <div className="relative rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        {/* subtle glow halo */}
        <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-orange-500/15 blur-md" />
        <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 text-lg text-orange-300 ring-1 ring-white/10">
          {icon}
        </div>
        <h4 className="text-base font-extrabold text-zinc-100">
          {title}
        </h4>
        <p className="mt-2 text-[12px] leading-5 text-zinc-300 italic">
          {body}
        </p>
      </div>
    );
  }
  