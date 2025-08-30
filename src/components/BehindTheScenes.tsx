import { Play, ArrowRight } from "lucide-react";

const BehindTheScenes = () => {
  const stats = [
    { number: 500, label: "PROJECTS COMPLETED" },
    { number: 15, label: "COUNTRIES COVERED" },
    { number: 24, label: "SUPPORT AVAILABLE" },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">

        {/* Video Thumbnail */}
        {/* <div className="bg-gradient-to-br from-orange-600 to-orange-400 rounded-2xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <button className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition">
              <Play size={32} className="text-orange-400" />
            </button>
          </div>
          <h3 className="text-2xl font-bold">Behind the Scenes</h3>
          <p className="text-neutral-300 mt-2">
            Watch our team in action creating exceptional content
          </p>
        </div> */}
        <div className="relative group max-w-lg mx-auto">
            {/* Card Background */}
            <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl shadow-xl overflow-hidden p-10 text-center">
                
                {/* Glare Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                </div>

                {/* Play Button */}
                <button className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 transition mb-6 mx-auto">
                <Play size={32} className="text-white" />
                </button>

                {/* Title */}
                <h3 className="text-xl font-bold">Behind the Scenes</h3>
                <p className="text-neutral-400 text-sm mt-1">
                Watch our team in action creating exceptional content
                </p>
            </div>
            </div>
        {/* Image Row */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
  <div className="group relative overflow-hidden rounded-xl">
    <img
      src="src/assets/images/all_site_images/Home/Team/Team_2.png"
      alt="Behind the scenes 1"
      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
    />

    {/* gradient + text overlay (hidden until hover) */}
    <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div className="p-4">
        <h3 className="text-white text-sm sm:text-base font-extrabold">
          Professional Excellence
        </h3>
        <p className="text-zinc-200/90 text-[11px] sm:text-xs">
          Quality equipment for outstanding results
        </p>
      </div>
    </div>
  </div>
</div>


        {/* Call to Action */}
        <div className="bg-neutral-900 border border-orange-500 rounded-xl shadow-lg p-8 text-center">
          <h4 className="text-xl font-semibold mb-2">
            Ready to Create Something Extraordinary?
          </h4>
          <p className="text-neutral-400 mb-6">
            Let’s collaborate to turn your vision into a masterpiece and
            showcase your story to the world!
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2 mx-auto hover:from-orange-600 hover:to-orange-700 transition">
            Start Your Project <ArrowRight size={18} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-neutral-800 rounded-xl shadow-md text-center py-6"
            >
              <h3 className="text-3xl font-bold text-orange-500">
                {stat.number}+
              </h3>
              <p className="text-neutral-400 mt-1 text-sm tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
      <section className="bg-[#0f0f0f] text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Heading */}
        <header className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            What Sets Our Team Apart
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Professional excellence in every aspect of production
          </p>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-orange-500/15">
              <span className="text-[18px] leading-none">🏆</span>
            </div>
            <h3 className="text-xs font-extrabold tracking-wide">
              Award‑Winning Quality
            </h3>
            <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
              Recognized excellence in audiovisual production across Africa
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-orange-500/15">
              <span className="text-[18px] leading-none">🌐</span>
            </div>
            <h3 className="text-xs font-extrabold tracking-wide">
              Global Standards
            </h3>
            <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
              International‑level production capabilities with local expertise
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-orange-500/15">
              <span className="text-[18px] leading-none">⚡️</span>
            </div>
            <h3 className="text-xs font-extrabold tracking-wide">
              Rapid Deployment
            </h3>
            <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
              Quick response times with professional execution
            </p>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
};

export default BehindTheScenes;
