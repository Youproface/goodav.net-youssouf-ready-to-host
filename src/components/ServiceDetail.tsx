import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Check } from 'lucide-react';
import { ServiceType } from '@/data/services';

interface ServiceDetailProps {
  service: ServiceType;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service }) => {
  const navigate = useNavigate();
  const { title, details, features } = service;
  const { heroTitle, heroDescription, overview, process, benefits, faqs } = details;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Button
              variant="ghost"
              className="mb-8 text-orange-400 hover:text-white hover:bg-orange-400/10 transition-colors"
              onClick={() => navigate('/#services')}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </Button>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-orange-500/20 text-orange-400 text-sm font-medium px-4 py-1 rounded-full mb-4">
                  {title}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  {heroTitle}
                </h1>
                <p className="text-lg text-gray-300 mb-8 max-w-lg">
                  {heroDescription}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-medium rounded-lg transition-all">
                    Get Started
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg font-medium rounded-lg group">
                    <Play className="w-5 h-5 mr-2 group-hover:text-orange-400 transition-colors" />
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-purple-600 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group cursor-pointer hover:bg-orange-500/30 transition-all">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About Our {title} Service</h2>
            <p className="text-lg text-gray-600 mb-12">
              {overview}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Why Choose Us</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-orange-500 w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our {title} Process</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We follow a proven process to ensure your project is executed flawlessly from concept to final delivery.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-12">
                {process.map((step, index) => (
                  <div key={index} className="relative pl-10">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="relative">
                <div className="sticky top-8 p-8 bg-white rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-6">Why Choose Us</h3>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-green-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about our {title.toLowerCase()} services.
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-6">Still have questions?</h3>
              <p className="text-lg text-gray-600 mb-8">
                We're here to help. Contact our team and we'll get back to you as soon as possible.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-medium rounded-lg transition-all">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Get in touch with us today to discuss your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg font-medium rounded-lg transition-all">
              Get a Free Quote
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium rounded-lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
