
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById } from '@/data/services';
import SEO from '@/components/SEO';
import { ArrowLeft } from 'lucide-react';

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = getServiceById(id || '');

  if (!service) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0f1012] text-white">
        <SEO title="Service Not Found | GoodAV" description="Requested service could not be found." canonical="https://goodav.net/services" />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service not found</h1>
          <button
            onClick={() => navigate('/#services')}
            className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-4 focus:ring-orange-400"
            aria-label="Back to Services"
          >
            <ArrowLeft className="w-5 h-5 mr-2 inline" /> Back to Services
          </button>
        </div>
      </main>
    );
  }

  return (
  <div className="bg-black text-white min-h-screen">
      <SEO
        title={`${service.title} | GoodAV - Rwanda, Kigali Convention Center, Visit Rwanda, Gorilla Naming`}
        description={`${service.details.heroDescription} GoodAV is your trusted audiovisual partner for conferences, events, and tourism in Rwanda. We support Kigali Convention Center, Visit Rwanda, Kwita Izina gorilla naming, Rwanda visa, national parks, and more.`}
        keywords="Rwanda, Kigali Convention Center, Visit Rwanda, conference in Rwanda, Kwita Izina, gorilla naming, Rwanda visa, Rwandan national park, Rwanda Convention Bureau, audiovisual industry Rwanda, Trust Partner Rwanda, event media coverage, video production Rwanda, live streaming Rwanda, tourism Rwanda, international conference Rwanda, creative economy Rwanda, NGO storytelling Rwanda, African creative industries, cultural preservation Rwanda, pan-African media agency, impact storytelling Rwanda, professional media coverage, global events Rwanda, tourism investment Rwanda, e-learning Rwanda, documentary filmmaking Rwanda, branding Rwanda, high-quality video editing, media production Rwanda, creative direction Rwanda, audiovisual innovation Rwanda"
        canonical={`https://goodav.net/services/${service.id}`}
      />

      {/* Top Bar */}
  <div className="sticky top-0 z-30 max-w-7xl mx-auto px-2 py-3 flex items-center justify-between bg-black/90 border-b border-white/5">
        <button
          onClick={() => navigate('/#services')}
          className="inline-flex items-center text-orange-400 hover:text-orange-200 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 rounded px-3 py-2"
        >
          <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
          <span>Back to Services</span>
        </button>
        <div className="flex items-center gap-3 text-sm">
          <a href="/" className="hover:text-orange-300 transition-colors">Home</a>
          <a href="/portfolio" className="hover:text-orange-300 transition-colors">Portfolio</a>
          <a href="/about-us" className="hover:text-orange-300 transition-colors">About</a>
          <a href="/partners" className="hover:text-orange-300 transition-colors">Partners</a>
          <a href="/blog" className="hover:text-orange-300 transition-colors">Blog</a>
          <a href="/contact" className="hover:text-orange-300 transition-colors">Contact</a>
        </div>
      </div>

      {/* Hero */}
  <div className="py-20 px-4 bg-black text-center rounded-b-2xl shadow-lg mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent tracking-tight mb-6">
          {service.details.heroTitle}
        </h1>
        <p className="text-2xl text-orange-100 mb-8 max-w-2xl mx-auto">
          {service.details.heroDescription}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" aria-hidden="true"></span>
            Premium Service
          </span>
          <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-orange-400 rounded-full" aria-hidden="true"></span>
            Trusted by 500+ clients
          </span>
        </div>
      </div>

      {/* Overview, Process, Benefits */}
  <div className="py-16 px-4 bg-[#18181b] rounded-2xl max-w-5xl mx-auto mb-10 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Service Overview</h2>
        <p className="text-lg text-orange-100 mb-8">{service.details.overview}</p>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-orange-200">Our Process</h3>
            <div className="space-y-6">
              {service.details.process.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-orange-500/20 text-orange-500 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-white">{step.title}</h4>
                    <p className="text-orange-100">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-orange-200">Key Benefits</h3>
            <ul className="space-y-3">
              {service.details.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0">✔️</span>
                  <span className="text-orange-100">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ */}
      {service.details.faqs.length > 0 && (
        <div className="py-16 px-4 bg-[#18181b] rounded-2xl max-w-5xl mx-auto mb-10 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {service.details.faqs.map((faq, index) => (
              <div key={index} className="bg-[#232326] p-6 rounded-lg border border-orange-500/10 shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-orange-200">{faq.question}</h3>
                <p className="text-orange-100">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="py-20 px-4 bg-black rounded-2xl max-w-5xl mx-auto text-center shadow-xl mb-10 border border-white/10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to get started?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Let's discuss how our {service.title.toLowerCase()} services can help you achieve your goals.
        </p>
        <a
          href="/contact"
          className="inline-block px-10 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-4 focus:ring-orange-600 transition-all"
        >
          Contact Us Today
        </a>
      </div>
    </div>
  );
};

export default ServiceDetails;
