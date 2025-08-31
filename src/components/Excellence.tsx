import { FaLightbulb, FaCalendarAlt, FaCamera, FaPen, FaImages, FaPlay } from 'react-icons/fa';

export default function Excellence() {
    return (
      <section className="relative bg-[#0e0f10] text-zinc-100">
        {/* soft background glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute right-10 bottom-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        </div>
  
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          {/* heading */}
          <header className="text-center">
            <div className="mx-auto mb-3 h-[2px] w-24 rounded bg-gradient-to-r from-orange-500 to-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Our Creative Excellence Process
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-300">
              From concept to completion, every project follows our proven premium workflow
            </p>
          </header>
  
          {/* process cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ProcessCard
              icon={<FaLightbulb className="h-5 w-5 text-zinc-900" />}
              title="Concept Development"
              body="Innovative brainstorming and strategic planning of the creative vision with our clients"
            />
            <ProcessCard
              icon={<FaCalendarAlt className="h-5 w-5 text-zinc-900" />}
              title="Premium Pre‑Production"
              body="Meticulous scheduling, location scouting, and professional equipment preparation"
            />
            <ProcessCard
              icon={<FaCamera className="h-5 w-5 text-zinc-900" />}
              title="Expert Production"
              body="Professional filming and photography with our world‑class expert team"
            />
            <ProcessCard
              icon={<FaPen className="h-5 w-5 text-zinc-900" />}
              title="Luxury Post‑Production"
              body="Master‑level editing, color grading, and premium final delivery"
            />
          </div>
  
          {/* big CTA panel */}
          <div className="mt-10 rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur px-6 py-8 sm:px-10 sm:py-10 shadow-[0_8px_40px_rgba(0,0,0,0.35)] relative">
            {/* panel glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_80px_rgba(255,170,80,0.08)]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-4 left-10 h-16 w-56 rounded-full bg-orange-500/25 blur-2xl opacity-60" />
  
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-extrabold">Want to Experience More?</h3>
              <p className="mx-auto mt-2 max-w-3xl text-sm text-zinc-300">
                Explore our complete behind‑the‑scenes photo gallery and discover the passion, precision,
                and premium craftsmanship behind every extraordinary project.
              </p>
  
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  target="_blank"
                  href="https://www.flickr.com/photos/202425883@N07/sets/72177720327653270/"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3 text-sm font-semibold text-zinc-900 shadow hover:from-orange-400 hover:to-amber-300"
                >
                  <span className="grid h-5 w-5 place-items-center rounded bg-orange-700/10 text-zinc-900"><FaImages className="h-4 w-4"/></span>
                  Explore Full Gallery
                </a>
  
                <a
                  href="/portfolio"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 backdrop-blur hover:bg-white/10"
                >
                  <span className="grid h-5 w-5 place-items-center rounded bg-orange-500/20 text-orange-300 ring-1 ring-white/10"><FaPlay className="h-3 w-3"/></span>
                  Watch Our Premium Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  /* subcomponents */
  
  function ProcessCard({ icon, title, body }) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-sm backdrop-blur">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-b from-orange-500 to-amber-400 text-zinc-900 ring-1 ring-white/20">
          <span className="text-lg"><i className={icon}></i></span>
        </div>
        <h3 className="text-sm font-extrabold">{title}</h3>
        <p className="mt-2 text-[12px] leading-5 text-zinc-300">{body}</p>
      </div>
    );
  }
  