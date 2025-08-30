export default function Testimonials() {
  return (
    <section className="relative bg-[#0e0f10] text-zinc-100">
      {/* background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-10 bottom-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        {/* badge */}
        <div className="mx-auto w-max rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[1rem] font-semibold uppercase tracking-wider text-orange-300/90 backdrop-blur">
          <span className="text-xl sm:text-lg md:text-xl text-orange-300/90 leading-6 text-zinc-200">"</span>
          Client Testimonials
        </div>

        {/* heading */}
        <header className="mt-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            What They Say About
            <span className="block">GoodAV</span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm sm:text-base md:text-lg text-zinc-300">
            Discover how we’ve helped organizations across Africa tell their stories through powerful audiovisual experiences and professional event production.
          </p>
        </header>

        {/* KPI row */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <KPI value="200" label="Happy Clients" />
          <KPI value="500" label="Events Delivered" />
          <KPI value="15" label="Countries Served" />
          <KPI value="98" label="Satisfaction Rate" />
        </div>

        {/* testimonials grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Testimonial
            stars={5}
            quote={`"Thanks everyone for your hard work, professionalism. It’s been a pleasure working with you all. Thanks for helping Plus Life produce some great content."`}
            initials="KS"
            name="Karl Schmid"
            role="Co‑Founder"
            org="Plus Life Media"
          />
          <Testimonial
            stars={5}
            quote={`"Just wanted to send a HUGE thanks to everyone for such an amazing experience in Kigali. The work was great and clients are thrilled."`}
            initials="WD"
            name="Will Dell"
            role="VP, Group Business Director"
            org="Bensimon Byrne"
          />
          <Testimonial
            stars={5}
            quote={`"I like the storytelling and the shooting angles as well as the well‑organized and performed interviews — very professional!"`}
            initials="TS"
            name="Tina Simon"
            role="Marketing and Social Media"
            org="BioMex"
          />
          <Testimonial
            stars={5}
            quote={`"Their video and photography redefined our brand. The team is reliable, innovative, and simply outstanding."`}
            initials="MV"
            name="Mangesh Verma Kumar"
            role="CEO"
            org="CIMERWA PLC"
          />
          <Testimonial
            stars={5}
            quote={`"Our live‑streamed event was flawless—zero frame drops and crystal‑clear quality. GoodAV delivered beyond expectations."`}
            initials="DI"
            name="Dieudonne Ishimwe"
            role="Miss Rwanda"
            org="Founder and CEO"
          />
          <Testimonial
            stars={5}
            quote={`"The voiceovers and audio work were exceptional. They understood our vision and executed it brilliantly."`}
            initials="GM"
            name="Gloria Mutamba"
            role="Procurement Coordinator"
            org="SOS Children's Villages"
          />
          <Testimonial
            stars={5}
            quote={`"The final film was exactly what we envisioned—clear, moving, and professional. GoodAV delivered with both technical expertise and cultural sensitivity."`}
            initials="CR"
            name="Carine Rutari"
            role="Communications Team"
            org="Aegis Trust"
          />
          <Testimonial
            stars={5}
            quote={`"We had an absolutely wonderful experience working with Youssof and his local film production team in Rwanda. From start to finish, they were extremely professional, well-organized, and detail-oriented. Communication was clear and easy, and they went out of their way to ensure everything ran smoothly.
Beyond their professionalism, they were truly kind and genuine people — a pleasure to spend time with on set. Their creativity and technical skill showed in the final product, which exceeded our expectations.
I would highly recommend this team to anyone looking for top-quality film production support in Rwanda. They deliver excellent work and make the entire process enjoyable."`}
            initials="MP"
            name="Michelle Pilling"
            role="Director of Production Services "
            org="Bensimon Byrne"
          />
        </div>
      </div>
    </section>
  );
}

/* subcomponents */

function KPI({ value, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center shadow-sm backdrop-blur">
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-300">{value}</div>
      <div className="mt-1 text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wide text-zinc-300">
        {label}
      </div>
      
    </div>
  );
}

function Testimonial({ stars = 5, quote, initials, name, role, org }) {
  return (
    <figure className="relative rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      {/* corner quotes */}
      <span className="pointer-events-none absolute left-4 top-3 select-none text-xl text-orange-300/60">“</span>
      <span className="pointer-events-none absolute right-4 bottom-3 select-none text-xl text-orange-300/60">”</span>

      {/* stars */}
      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: stars }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className="h-4 w-4 text-amber-400"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.02 3.145a1 1 0 0 0 .95.69h3.305c.966 0 1.368 1.24.588 1.81l-2.674 1.943a1 1 0 0 0-.364 1.118l1.02 3.145c.3.921-.755 1.688-1.54 1.118l-2.675-1.943a1 1 0 0 0-1.176 0l-2.675 1.943c-.784.57-1.838-.197-1.539-1.118l1.02-3.145a1 1 0 0 0-.364-1.118L2.186 8.572c-.78-.57-.378-1.81.588-1.81h3.305a1 1 0 0 0 .95-.69l1.02-3.145Z" />
          </svg>
        ))}
      </div>

      {/* quote with clipping */}
      <blockquote className="text-sm sm:text-base md:text-lg leading-6 text-zinc-200 line-clamp-3">
        {quote}
      </blockquote>

      {/* author */}
      <figcaption className="mt-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-orange-500/15 text-[12px] sm:text-sm md:text-base font-bold text-orange-300 ring-1 ring-white/10">
          {initials}
        </div>
        <div className="text-[13px] sm:text-sm md:text-base leading-tight">
          <div className="font-semibold text-zinc-100">{name}</div>
          <div className="text-zinc-300">{role}</div>
          {org && <div className="text-zinc-400">{org}</div>}
        </div>
      </figcaption>
    </figure>
  );
}
