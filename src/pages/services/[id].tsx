import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services, getServiceById } from '@/data/services';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';

interface ServiceDetailsProps {
  service: {
    id: string;
    title: string;
    description: string;
    details: {
      heroTitle: string;
      heroDescription: string;
      overview: string;
      process: Array<{
        title: string;
        description: string;
      }>;
      benefits: string[];
      faqs: Array<{
        question: string;
        answer: string;
      }>;
    };
  };
}

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = getServiceById(id || '');

  if (!service) {
    return (
      <main role="main" aria-label="Service Not Found" className="min-h-screen flex items-center justify-center">
        <SEO title="Service Not Found | GoodAV" description="Requested service could not be found." canonical="https://goodav.net/services" />
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" tabIndex={0}>Service not found</h1>
          <Button onClick={() => navigate('/#services')} aria-label="Back to Services" className="mt-4">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Services
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main role="main" aria-label={`Service Details for ${service.title}`}> 
      <SEO
        title={`${service.title} | Our Services | GoodAV`}
        description={service.details.heroDescription}
        canonical={`https://goodav.net/services/${service.id}`}
        meta={[{ name: 'keywords', content: `${service.title}, AV services, GoodAV, professional audio visual, ${service.details.heroTitle}` }]}
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-background/90" aria-labelledby="service-hero-title">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <button
              onClick={() => navigate('/#services')}
              className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Back to Services"
            >
              <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
              <span>Back to Services</span>
            </button>
            <h1 id="service-hero-title" className="text-4xl md:text-5xl font-bold mb-6" tabIndex={0} aria-label={service.details.heroTitle}>
              {service.details.heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8" tabIndex={0} aria-label={service.details.heroDescription}>
              {service.details.heroDescription}
            </p>
          </div>
        </div>
      </section>
      {/* Overview Section */}
      <section className="py-16 bg-background" aria-labelledby="service-overview-title">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="service-overview-title" className="text-3xl font-bold mb-6" tabIndex={0}>Service Overview</h2>
            <p className="text-lg text-muted-foreground mb-8" tabIndex={0} aria-label={service.details.overview}>
              {service.details.overview}
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4" tabIndex={0}>Our Process</h3>
                <div className="space-y-6">
                  {service.details.process.map((step, index) => (
                    <div key={index} className="flex" aria-label={`Process step ${index + 1}: ${step.title}`}> 
                      <div className="flex-shrink-0 bg-orange-500/10 text-orange-500 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4" aria-hidden="true">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg" tabIndex={0}>{step.title}</h4>
                        <p className="text-muted-foreground" tabIndex={0}>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4" tabIndex={0}>Key Benefits</h3>
                <ul className="space-y-3" aria-label="Key Benefits">
                  {service.details.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start" aria-label={`Benefit ${index + 1}: ${benefit}`}> 
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span tabIndex={0}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      {service.details.faqs.length > 0 && (
        <section className="py-16 bg-muted/50" aria-labelledby="faq-title">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 id="faq-title" className="text-3xl font-bold mb-12 text-center" tabIndex={0}>Frequently Asked Questions</h2>
              <div className="space-y-6">
                {service.details.faqs.map((faq, index) => (
                  <div key={index} className="bg-background p-6 rounded-lg shadow-sm" aria-label={`FAQ ${index + 1}: ${faq.question}`}> 
                    <h3 className="text-lg font-semibold mb-2" tabIndex={0}>{faq.question}</h3>
                    <p className="text-muted-foreground" tabIndex={0}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500" aria-labelledby="cta-title">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-title" className="text-3xl md:text-4xl font-bold text-white mb-6" tabIndex={0}>Ready to get started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" tabIndex={0}>
            Let's discuss how our {service.title.toLowerCase()} services can help you achieve your goals.
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-600" aria-label="Contact Us Today">
            Contact Us Today
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetails;
