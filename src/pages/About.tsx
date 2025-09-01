const heroBackground = '/images/all_site_images/Home/Banner/Home_Video_Banner_Optimized.gif';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';

// Import team member images
const vincentImg = '/images/all_site_images/About/Team/Vincent.png';
const josueImg = '/images/all_site_images/About/Team/Josue.png';
const marieImg = '/images/all_site_images/About/Team/Marie.png';
const adelineImg = '/images/all_site_images/About/Team/Adeline.png';
const claudineImg = '/images/all_site_images/About/Team/Claudine.png';
const emmyImg = '/images/all_site_images/About/Team/Emmy.png';
const etienneImg = '/images/all_site_images/About/Team/Etienne.png';
const mediatriceImg = '/images/all_site_images/About/Team/Mediatrice.png';
const ngaboImg = '/images/all_site_images/About/Team/Ngabo.png';
const richmondImg = '/images/all_site_images/About/Team/Richmond.png';
const dodoImg = '/images/all_site_images/About/Team/dodo.png';
const gentilImg = '/images/all_site_images/About/Team/gentil.png';
export default function AboutUs() {
    return (
      <>
        <SEO
          title="About GoodAV - Africa's Premier Audiovisual Agency"
          description="Learn about GoodAV, Africa's leading audiovisual agency based in Kigali, Rwanda. Discover our mission, team, and story."
          canonical="https://goodav.net/about-us"
        />
        <SchemaMarkup
          schema={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "GoodAV",
            "url": "https://goodav.net",
            "logo": "/images/all_site_images/Assets/logo-fav.png",
            "description": "Africa's premier audiovisual agency transforming ideas into impactful visual stories. GoodAV empowers African narratives through cinematic production, live streaming, photography, and strategic media coverage.",
            "sameAs": [
              "https://www.instagram.com/goodaudiovisual",
              "https://www.youtube.com/@goodaudiovisuals",
              "https://www.facebook.com/goodaudiovisuals",
              "https://www.linkedin.com/company/goodav"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+250788613332",
              "email": "info@goodav.net",
              "contactType": "Customer Support",
              "areaServed": ["Rwanda", "Africa", "International"],
              "availableLanguage": ["en", "fr"]
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kigali",
              "addressCountry": "RW"
            },
            "founder": {
              "@type": "Person",
              "name": "Youssouf Hakizimana"
            }
          }}
        />
        <main className="min-h-screen bg-transparent text-zinc-100">
        {/* Hero */}
       <div className="relative mt-10 py-32 px-4 bg-transparent">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="About GoodAV"
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b " />
        </div>
        
        {/* Content */}
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r text-white bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Bringing African Stories to Life with Digital Excellence 
          </p>
        </div>
      </div>
  
        {/* Mission */}
        <section className="relative mx-auto mt-10 max-w-6xl px-6">
          <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-6 shadow">
            <h2 className="text-h2 text-center text-orange-300">Our Mission</h2>
            <p className="mt-3 text-body text-zinc-300">
              GOODAV is a digital-first creative studio providing documentaries, high‑quality photography,
              live streaming, branding, and marketing content across a wide variety of events.
              The approach is customer‑centric, quality‑driven, and impact‑focused—combining deep local
              knowledge with world‑class expertise to support organizations across Africa.
            </p>
       
          </div>
     
        </section>
  
        {/* Story */}
        <section className="relative mx-auto mt-6 max-w-6xl px-6">
          <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-6 shadow">
            <h2 className="text-h2 text-center text-orange-300">Our Story</h2>
            <p className="mt-3 text-body text-zinc-300">
              Founded by Youssouf Hakizimana, a multimedia artist with over a decade of experience,
              GoodAV began as a catalyst for Africa’s transformation through the art of media.
              The mission is to empower others to tell their stories, their way—because every story matters.
            </p>
  
            <figure className="mt-5 overflow-hidden rounded-2xl ring-1 ring-white/10">
              <div className="relative w-full h-[500px] overflow-hidden">
                <img
                  src="/images/all_site_images/Home/founder/Founder&CEO.jpeg"
                  alt="Founder portrait"
                  className="w-full h-full object-cover object-[center_30%]"
                />
              </div>
              <figcaption className="px-4 py-2 text-center font-bold text-small text-white-400">
                “Our mission is to empower others to tell their stories, their way—because every story matters.” — Youssouf Hakizimana
              </figcaption>
            </figure>
          </div>
        </section>
  
        {/* Metrics + Team */}
        <section className="relative mx-auto mt-8 max-w-6xl px-6">
          <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-6 shadow">
            <h3 className="text-h2 text-center text-orange-300">Meet the Team</h3>
  
            {/* Metrics */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Metric value="500+" label="Projects Delivered" />
              <Metric value="5+" label="Countries Served" />
              <Metric value="10+" label="Years Experience" />
            </div>
  
            {/* Team grid */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
              <TeamCard
                src={vincentImg}
                name="Vincent Niyibizi"
                role="Chief Operating Officer"
              />
              <TeamCard
                src={josueImg}
                name="Josue Ishimwe"
                role="Chief Creative Officer"
              />
              <TeamCard
                src={marieImg}
                name="Marie Noella Magadha"
                role="Sales and Partnerships"
              />
              <TeamCard
                src={adelineImg}
                name="Adeline Uwineza"
                role="Project Manager"
              />
              <TeamCard
                src={claudineImg}
                name="Claudine Uwamahoro"
                role="Video Editor"
              />
              <TeamCard
                src={emmyImg}
                name="Emmy Niyibizi"
                role="Drone Operator"
              />
              <TeamCard
                src={etienneImg}
                name="Etienne Nsanzabaganwa"
                role="Photographer"
              />
              <TeamCard
                src={mediatriceImg}
                name="Mediatrice Uwamahoro"
                role="Graphic Designer"
              />
              <TeamCard
                src={ngaboImg}
                name="Ngabo Patrick"
                role="Videographer"
              />
              <TeamCard
                src={richmondImg}
                name="Richmond Asare"
                role="Audio Engineer"
              />
              <TeamCard
                src={dodoImg}
                name="Dodo Niyonshuti"
                role="Production Assistant"
              />
              <TeamCard
                src={gentilImg}
                name="Gentil Niyibizi"
                role="IT Support"
              />
            </div>
          </div>
        </section>
  
        {/* Contact Us CTA */}
        <section className="relative mx-auto mt-8 max-w-6xl pb-10 px-6">
          <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-6 text-center shadow">
            <h3 className="text-h2 text-orange-300">Contact Us</h3>
            <p className="mt-2 text-body text-zinc-300">Ready to start your project?</p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2.5 text-small font-semibold text-zinc-900 shadow hover:from-orange-400 hover:to-amber-300"
            >
              Contact GoodAV →
            </a>
          </div>
        </section>
  
     
      </main>
      </>
    );
  }
  
  /* ——— subcomponents ——— */
  
  function Metric({ value, label }: { value: string; label: string }) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur">
        <div className="text-2xl font-extrabold text-orange-300 leading-none">{value}</div>
        <div className="mt-1 text-micro">{label}</div>
      </div>
    );
  }
  
  function TeamCard({
    src,
    name,
    role,
  }: {
    src: string;
    name: string;
    role: string;
  }) {
    return (
      <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-4">
        <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
          <img src={src} alt={name} className="h-56 w-full object-cover" />
        </div>
        <div className="mt-3">
          <div className="text-h3">{name}</div>
          <div className="text-small text-zinc-400">{role}</div>
        </div>
      </div>
    );
  }
  
  function Label({ children }: { children: React.ReactNode }) {
    return <label className="block text-small font-medium text-zinc-300">{children}</label>;
  }
  
  function Input({
    label,
    name,
    type = "text",
    placeholder,
  }: {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
  }) {
    return (
      <div>
        <Label>{label}</Label>
        <input
          type={type}
          name={name}
          placeholder={placeholder ?? label}
          className="mt-2 w-full rounded-xl bg-white/[0.06] px-3 py-2 text-body text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60"
        />
      </div>
    );
  }
  
  function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange-500/15 text-lg text-orange-300 ring-1 ring-white/10">
            {icon}
          </span>
          <div>
            <div className="text-small text-zinc-400">{label}</div>
            <div className="text-body font-semibold text-zinc-100">{value}</div>
          </div>
        </div>
      </div>
    );
  }
