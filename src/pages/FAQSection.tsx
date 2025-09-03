const heroBackground = '/images/all_site_images/Home/BG/Home_BG.png';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
export default function FAQSection() {
    return (
      <>
        <SEO
          title="Frequently Asked Questions - GoodAV"
          description="Find answers to the most common questions about GoodAV’s audiovisual services, production, and support."
          canonical="https://goodav.net/faq"
        />
        <SchemaMarkup
          schema={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What services does GoodAV offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "GoodAV delivers professional audiovisual services including video production (documentaries, event coverage, interviews, highlight reels), photography (event, branding, photojournalism), live streaming (multi-camera, remote), and audio production (podcasts, voiceovers, mastering)."
                }
              },
              {
                "@type": "Question",
                "name": "How does GoodAV deliver high-quality audiovisual results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A senior creative lead oversees each project, using cinematic cameras, calibrated audio chains, and color-managed workflows. We combine on-site specialists with streamlined post-production pipelines for consistent, broadcast-ready output."
                }
              },
              {
                "@type": "Question",
                "name": "Can GoodAV provide services in remote areas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Mobile kits and reliable power/network redundancies enable production in rural and low-infrastructure environments, with risk-assessed logistics and local crew support."
                }
              },
              {
                "@type": "Question",
                "name": "What makes GoodAV different from other audiovisual companies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A storytelling-first approach, multilingual crews, and fast turnarounds—supported by a quality bar aligned with international broadcast standards and NGO compliance."
                }
              }
            ]
          }}
        />
        <main className="min-h-screen bg-[#0f1012] text-zinc-100">
        {/* Hero */}
        <div className="relative mt-10 py-32 px-4 bg-transparent">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="About GoodAV"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b " />
        </div>
        
        {/* Content */}
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r text-white bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Bringing African Stories to Life with Digital Excellence 
          </p>
        </div>
      </div>
  
        {/* Content */}
        <section className="relative mx-auto max-w-4xl px-6 py-10">
          <div className="text-3xl text-center font-extrabold uppercase tracking-wider text-orange-300">
            Frequently Asked Questions
          </div>
          <h2 className="mt-2 text-h2 md:text-display leading-tight text-center">
            The Most Questions We Had
          </h2>
          <p className="mt-2 max-w-3xl mx-auto text-body text-zinc-300 ">
            Answers to the most common questions about GoodAV’s services to help make informed decisions.
          </p>
  
          {/* Accordion group */}
          <div className="mt-6 space-y-3">
            {/* Item 1 (expanded example) */}
            <details open className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-md font-semibold hover:bg-white/5">
                <span>What services does GoodAV offer?</span>
                <span className="text-orange-300">▾</span>
              </summary>
              <div className="border-t border-white/10 px-4 py-4 text-body text-zinc-300">
                At GoodAV, we deliver professional audiovisual services tailored for diverse needs:
                <ul className="mt-3 space-y-1">
                  <li>
                    <span className="font-semibold text-zinc-100">Video Production:</span> Documentaries, event coverage, interviews, and highlight reels.
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-100">Photography:</span> Event photography, branding shoots, and photojournalism.
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-100">Live Streaming:</span> Seamless multi‑camera streaming for venues and remote locations.
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-100">Audio Production:</span> Podcast production, voiceovers, and mastering.
                  </li>
                </ul>
                <p className="mt-3">
                  Explore examples in our <a href="/portfolio" className="text-orange-300 underline underline-offset-4">portfolio</a>.
                </p>
              </div>
            </details>
  
            {/* Item 2 */}
            <details className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-md font-semibold hover:bg-white/5">
                <span>How does GoodAV deliver high‑quality audiovisual results?</span>
                <span className="text-orange-300">▾</span>
              </summary>
              <div className="border-t border-white/10 px-4 py-4 text-body text-zinc-300">
                A senior creative lead oversees each project, using cinematic cameras, calibrated audio
                chains, and color‑managed workflows. We combine on‑site specialists with streamlined
                post‑production pipelines for consistent, broadcast‑ready output.
              </div>
            </details>
  
            {/* Item 3 */}
            <details className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-md font-semibold hover:bg-white/5">
                <span>Can GoodAV provide services in remote areas?</span>
                <span className="text-orange-300">▾</span>
              </summary>
              <div className="border-t border-white/10 px-4 py-4 text-body text-zinc-300">
                Yes. Mobile kits and reliable power/network redundancies enable production in rural and
                low‑infrastructure environments, with risk‑assessed logistics and local crew support.
              </div>
            </details>
  
            {/* Item 4 */}
            <details className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-md font-semibold hover:bg-white/5">
                <span>What makes GoodAV different from other audiovisual companies?</span>
                <span className="text-orange-300">▾</span>
              </summary>
              <div className="border-t border-white/10 px-4 py-4 text-body text-zinc-300">
                A storytelling‑first approach, multilingual crews, and fast turnarounds—supported by
                a quality bar aligned with international broadcast standards and NGO compliance.
              </div>
            </details>
  
            {/* Item 5 */}
            <details className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-md font-semibold hover:bg-white/5">
                <span>Which countries do you serve?</span>
                <span className="text-orange-300">▾</span>
              </summary>
              <div className="border-t border-white/10 px-4 py-4 text-body text-zinc-300">
                Primary operations across East and Central Africa with project experience in 5+ countries.
                International assignments are supported on request.
              </div>
            </details>
  
            {/* Item 6 */}
            <details className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-md font-semibold hover:bg-white/5">
                <span>How can I start a project with GoodAV?</span>
                <span className="text-orange-300">▾</span>
              </summary>
              <div className="border-t border-white/10 px-4 py-4 text-body text-zinc-300">
                Share goals, timeline, and references via the contact form or book a strategy call.
                A tailored proposal with scope, schedule, and budget will be provided.
              </div>
            </details>
          </div>
  
          {/* Help CTA */}
          <div className="mt-8 rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-5 flex items-center justify-between flex-col gap-3 sm:flex-row">
            <p className="text-body text-zinc-300">
              Didn’t find an answer? Get support from the team.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="/contact"
                className="rounded-md bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-mdall font-semibold text-zinc-900 shadow hover:from-orange-400 hover:to-amber-300"
              >
                Contact Us
              </a>
              <a
                href="/portfolio"
                className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-mdall text-zinc-200 hover:bg-white/10"
              >
                Explore Portfolio
              </a>
            </div>
          </div>
        </section>
      </main>
      </>
    );
  }
  