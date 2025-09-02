import React from "react";

// Subcomponents
function KPI({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="group rounded-2xl border border-white/10 bg-white/5 px-6 py-6 text-center shadow-lg backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-orange-500/30 hover:shadow-orange-500/10 hover:scale-105"
      itemScope
      itemType="https://schema.org/PropertyValue"
    >
      <div
        className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400"
        itemProp="value"
      >
        {value}
      </div>
      <div
        className="mt-2 text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-300 group-hover:text-zinc-200 transition-colors"
        itemProp="name"
      >
        {label}
      </div>
    </div>
  );
}

function Testimonial({
  stars = 5,
  quote,
  initials,
  name,
  role,
  org,
  featured = false,
  size = "normal",
}: {
  stars?: number;
  quote: string;
  initials: string;
  name: string;
  role: string;
  org: string;
  featured?: boolean;
  size?: "normal" | "large" | "xl";
}) {
  const sizeClasses = {
    normal: "max-w-sm mx-auto",
    large: "max-w-2xl mx-auto",
    xl: "max-w-5xl mx-auto",
  } as const;

  const textSizeClasses = {
    normal: "text-sm md:text-base",
    large: "text-base md:text-lg",
    xl: "text-lg md:text-xl",
  } as const;

  const paddingClasses = {
    normal: "p-6 md:p-7",
    large: "p-8 md:p-10",
    xl: "p-10 md:p-12",
  } as const;

  return (
    <figure
  className={`testimonial-card relative h-full flex flex-col rounded-3xl bg-white/5 ${paddingClasses[size]} ring-1 ring-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-500 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:scale-[1.03] hover:ring-orange-500/30 ${
        featured
          ? "border-2 border-orange-500/30 shadow-orange-500/20 bg-gradient-to-br from-orange-500/5 via-white/5 to-zinc-900/50"
          : "hover:bg-white/10"
      } ${sizeClasses[size]}`}
      itemScope
      itemType="https://schema.org/Review"
    >
      {featured && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-bold text-white shadow-lg ring-2 ring-white/20"
          aria-label="Featured testimonial"
        >
          <i className="fas fa-crown mr-2" aria-hidden="true"></i>
          FEATURED CLIENT
        </div>
      )}

      <span
        className="pointer-events-none absolute left-6 top-6 select-none text-4xl text-orange-300/40"
        aria-hidden="true"
      >
        "
      </span>
      <span
        className="pointer-events-none absolute right-6 bottom-6 select-none text-4xl text-orange-300/40 rotate-180"
        aria-hidden="true"
      >
        "
      </span>

      <div
        className="mb-6 flex items-center justify-center gap-1"
        role="img"
        aria-label={`Rating: ${stars} out of 5 stars`}
      >
        {Array.from({ length: stars }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`text-amber-400 drop-shadow-sm ${size === "xl" ? "h-6 w-6" : "h-5 w-5"}`}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.02 3.145a1 1 0 0 0 .95.69h3.305c.966 0 1.368 1.24.588 1.81l-2.674 1.943a1 1 0 0 0-.364 1.118l1.02 3.145c.3.921-.755 1.688-1.54 1.118l-2.675-1.943a1 1 0 0 0-1.176 0l-2.675 1.943c-.784.57-1.838-.197-1.539-1.118l1.02-3.145a1 1 0 0 0-.364-1.118L2.186 8.572c-.78-.57-.378-1.81.588-1.81h3.305a1 1 0 0 0 .95-.69l1.02-3.145Z" />
          </svg>
        ))}
      </div>

      <div
        itemProp="reviewRating"
        itemScope
        itemType="https://schema.org/Rating"
        className="sr-only"
      >
        <span itemProp="ratingValue">{stars}</span>
        <span itemProp="bestRating">5</span>
      </div>

      <blockquote
        className={`${textSizeClasses[size]} font-medium text-zinc-100 mt-4 mb-6 flex-grow`}
        itemProp="reviewBody"
      >
        {quote}
      </blockquote>

      <figcaption
        className="flex flex-col items-center gap-2 mt-2"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-white text-xl font-bold shadow-md ring-1 ring-white/10">
          {initials}
        </span>
        <span className="font-bold text-orange-400" itemProp="name">
          {name}
        </span>
        <span className="text-sm text-zinc-400">{role}</span>
        <span className="text-xs text-zinc-500">{org}</span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section
      className="relative bg-[#0e0f10] text-zinc-100 py-16 md:py-24"
      aria-labelledby="testimonials-heading"
      itemScope
      itemType="https://schema.org/Review"
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "GoodAV",
          review: [
            {
              "@type": "Review",
              author: { "@type": "Person", name: "Karl Schmid" },
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
              reviewBody:
                "Thanks everyone for your hard work, professionalism. It's been a pleasure working with you all. Thanks for helping Plus Life produce some great content.",
            },
          ],
          aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "200" },
        })}
      </script>
  <div className="mx-auto max-w-7xl px-4 md:px-6">
  <header className="mt-6 text-center">
        <h2
          id="testimonials-heading"
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400"
        >
          See what our clients say about working with GoodAV's professional audiovisual services
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-zinc-300 leading-relaxed">
          Ready to work with Africa's premier AV agency?
          <a href="#contact" className="block mt-2 font-bold text-orange-400 hover:text-orange-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded" onClick={(e) => {
            const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const target = document.getElementById('contact');
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
              // Move focus for accessibility after scrolling
              (target as HTMLElement).setAttribute('tabindex', '-1');
              (target as HTMLElement).focus({ preventScroll: true });
            }
          }}>
            Get Started Today
          </a>
        </p>
      </header>

      <div
        className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4"
        role="region"
        aria-label="Company statistics"
      >
        <KPI value="50+" label="Partners" />
        <KPI value="5+" label="Countries" />
        <KPI value="500+" label="Projects" />
        <KPI value="10+" label="Years of Excellence" />
      </div>

  {/* Trustpilot CTA moved to bottom */}

  <div
        className="mt-16 grid grid-cols-12 gap-8 items-stretch content-stretch"
        role="region"
        aria-label="Client testimonials"
      >
        {/* Featured + stacked side column */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-8 h-full" data-aos="fade-up">
          <Testimonial
            stars={5}
            quote={`We had an absolutely wonderful experience working with Youssof and his local film production team in Rwanda. From start to finish, they were extremely professional, well-organized, and detail-oriented. Communication was clear and easy, and they went out of their way to ensure everything ran smoothly.\n\nBeyond their professionalism, they were truly kind and genuine people — a pleasure to spend time with on set. Their creativity and technical skill showed in the final product, which exceeded our expectations.\n\nI would highly recommend this team to anyone looking for top-quality film production support in Rwanda. They deliver excellent work and make the entire process enjoyable.`}
            initials="MP"
            name="Michelle Pilling"
            role="Director of Production Services"
            org="Bensimon Byrne"
            featured
            size="xl"
          />
        </div>

        <div className="col-span-12 lg:col-span-5 xl:col-span-4 grid grid-rows-2 gap-8 h-full" data-aos="fade-up" data-aos-delay="100">
          <div className="h-full flex">
            <Testimonial
              stars={5}
              quote="Just wanted to send a HUGE thanks to everyone for such an amazing experience in Kigali. The work was great and clients are thrilled."
              initials="WD"
              name="Will Dell"
              role="VP, Group Business Director"
              org="HiFi, a division of Tadiem"
            />
          </div>
          <div className="h-full flex">
            <Testimonial
              stars={5}
              quote="I like the storytelling and the shooting angles as well as the well-organized and performed interviews — very professional!"
              initials="TS"
              name="Tina Simon"
              role="Marketing and Social Media"
              org="BioMex"
            />
          </div>
        </div>

        {/* Four-up row below */}
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          <div data-aos="fade-up" data-aos-delay="200" className="flex h-full">
            <Testimonial
              stars={5}
              quote="Their video and photography redefined our brand. The team is reliable, innovative, and simply outstanding."
              initials="MV"
              name="Mangesh Verma Kumar"
              role="CEO"
              org="CIMERWA PLC"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="250" className="flex h-full">
            <Testimonial
              stars={5}
              quote="Our live-streamed event was flawless—zero frame drops and crystal-clear quality. GoodAV delivered beyond expectations."
              initials="DI"
              name="Dieudonne Ishimwe"
              role="Miss Rwanda"
              org="Founder and CEO"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="300" className="flex h-full">
            <Testimonial
              stars={5}
              quote="The voiceovers and audio work were exceptional. They understood our vision and executed it brilliantly."
              initials="GM"
              name="Gloria Mutamba"
              role="Procurement Coordinator"
              org="SOS Children's Villages"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="350" className="flex h-full">
            <Testimonial
              stars={5}
              quote="The final film was exactly what we envisioned—clear, moving, and professional. GoodAV delivered with both technical expertise and cultural sensitivity."
              initials="CR"
              name="Carine Rutari"
              role="Communications Team"
              org="Aegis Trust"
            />
          </div>
        </div>
      </div>

    <div className="mt-16 flex justify-center" role="region" aria-label="Customer reviews on Trustpilot">
        <a
          href="https://www.trustpilot.com/review/goodav.net"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-bold text-white shadow-lg ring-2 ring-orange-500/30 transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-500/40"
      aria-label="View GoodAV reviews on Trustpilot (opens in a new tab)"
        >
          <span className="inline-flex items-center gap-2">
            <i className="fab fa-trustpilot text-2xl text-white" aria-hidden="true"></i>
            View reviews on Trustpilot
          </span>
        </a>
      </div>
  </div>
    </section>
  );
}
