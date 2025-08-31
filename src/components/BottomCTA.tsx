import { useState } from "react";
import PremiumProjectModal from "./forms/PremiumForm";
import { FaBolt, FaArrowRight } from 'react-icons/fa';

export default function BottomCTA() {
    const [open, setOpen] = useState(false);
    return (
      <section className="relative bg-[#0f1012]">
        {/* soft ambient glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-72 w-72 translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
        </div>
  
        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center text-zinc-100">
          {/* badge */}
          <div className="mx-auto w-max rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[1rem] font-semibold uppercase tracking-wider text-orange-300 backdrop-blur shadow">
            <span className="mr-1 inline-flex items-center"><FaBolt className="h-4 w-4 text-orange-300" /></span>
            Ready to start?
          </div>
  
          {/* headline */}
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight [text-shadow:0_2px_0_rgba(0,0,0,0.25)]">
            Have an idea in your mind?
            <span className="block mt-1">Let’s start your project with us</span>
          </h2>
  
          {/* tiny accent line */}
          <div className="mx-auto mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
  
          {/* glass blurb */}
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur px-6 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <p className="text-xl text-zinc-200">
              Transform your vision into reality with our professional audiovisual services.
              From concept to completion, we’re here to bring stories to life.
            </p>
          </div>
  
          {/* primary button */}
          <div className="mt-7">
            <PremiumProjectModal open={open} onClose={() => setOpen(false)} />
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg hover:from-orange-400 hover:to-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 transition"
            >
              <span className="grid h-5 w-5 place-items-center rounded bg-orange-700/10">
              <FaArrowRight className="h-4 w-4" />
              </span>
              Start the Project
            </button>
          </div>
        </div>
      </section>
    );
  }  