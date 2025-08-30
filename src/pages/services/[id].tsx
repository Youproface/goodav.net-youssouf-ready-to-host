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
    return <div>Service not found</div>;
  }

  return (
    <>
      <SEO
        title={`${service.title} | Our Services`}
        description={service.details.heroDescription}
        canonical={`https://goodav.net/services/${service.id}`}
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <button
              onClick={() => navigate('/#services')}
              className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service.details.heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {service.details.heroDescription}
            </p>
          </div>
        </div>
      </section>
      {/* Overview Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Service Overview</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {service.details.overview}
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Process</h3>
                <div className="space-y-6">
                  {service.details.process.map((step, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 bg-orange-500/10 text-orange-500 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{step.title}</h4>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {service.details.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{benefit}</span>
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
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {service.details.faqs.map((faq, index) => (
                  <div key={index} className="bg-background p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how our {service.title.toLowerCase()} services can help you achieve your goals.
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90">
            Contact Us Today
          </Button>
        </div>
      </section>
    </>
  );
};

export default ServiceDetails;
