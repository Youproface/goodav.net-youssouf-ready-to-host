import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceType } from '@/data/services';

interface BaseServiceDetailProps {
  service: ServiceType;
  children?: React.ReactNode;
}

const BaseServiceDetail: React.FC<BaseServiceDetailProps> = ({ service, children }) => {
  const navigate = useNavigate();
  const { title, details, features } = service;
  const {
    heroTitle,
    heroDescription,
    overview,
    stats = [],
    excellencePoints = [],
    services: serviceList = [],
    process = [],
    benefits = [],
    faqs = []
  } = details;
  return (
    <div className="bg-black text-white font-sans min-h-screen">
      {/* Header Navigation */}
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white flex items-center">
          <span className="mr-2">🔴</span> GoodAv
        </div>
        <nav className="hidden md:flex space-x-8">
          {['HOMEPAGE', 'PORTFOLIO', 'ABOUT US', 'PARTNERS', 'BLOG', 'CONTACT'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-white hover:text-orange-500 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
        <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full text-sm font-semibold transition-colors">
          FREE CONSULTATION
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-orange-400 mb-4 uppercase tracking-wider font-medium">
            {title}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {heroTitle}
          </h1>

          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            {heroDescription}
          </p>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="flex justify-center gap-8 md:gap-12 mb-12 flex-wrap">
              {stats.map((stat, index) => (
                <div key={index} className="text-center px-4 py-2">
                  <div className="text-2xl md:text-3xl font-bold text-orange-500">{stat.number}</div>
                  <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-semibold transition-colors">
              🎬 Start Your Project
            </button>
            <button className="border border-gray-600 hover:border-gray-500 px-8 py-3 rounded-full font-semibold transition-colors">
              📁 View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="bg-gray-900 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                About Our {title}
              </h2>
              <p className="text-gray-300 mb-8">
                {overview}
              </p>

              {/* Excellence Points */}
              {excellencePoints.length > 0 && (
                <div className="space-y-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Why Choose Us</h3>
                  {excellencePoints.map((point, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-500">{point.title}</h4>
                      <p className="text-sm text-gray-300 mt-1">{point.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Process Steps */}
              {process.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Our Process</h3>
                  {process.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:pl-12">
              <div className="space-y-6">
                {benefits.length > 0 && (
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4">💡 Key Benefits</h4>
                    <div className="space-y-3 text-sm">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {features.length > 0 && (
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4">✨ What's Included</h4>
                    <ul className="space-y-2 text-sm">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      {serviceList.length > 0 && (
        <section className="px-6 py-16 bg-gray-950">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our {title} Services</h2>
              <p className="text-gray-400">Comprehensive solutions tailored to your specific needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceList.map((service, index) => (
                <div key={index} className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-xl">
                      {['📹', '📸', '🎥', '🎙️', '🔊', '💡'][index % 6]}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5 text-sm text-gray-300">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* Contact Form Section */}
      <section className="bg-gray-900 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to start your <span className="lowercase">{title} </span> project?</h2>
            <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="+1 (___) ___-____"
                />
              </div>
              <div>
                <label htmlFor="event-type" className="block text-sm font-medium text-gray-300 mb-2">Event Type</label>
                <select
                  id="event-type"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-300"
                  required
                >
                  <option value="">Select event type</option>
                  {service.id === 'video-production' && (
                    <>

                      <option value="">Project Type</option>
                      <option value="documentary">Documentary</option>
                      <option value="corporate">Corporate Video</option>
                      <option value="promotional">Promotional Content</option>
                      <option value="event">Event Coverage</option>
                      <option value="educational">Educational Content</option>
                      <option value="music">Music Video</option>

                    </>
                  )}
                  {service.id === 'photography' && (
                    <>
                      <option value="">Photography Type</option>
                      <option value="portrait">Portrait Photography</option>
                      <option value="event">Event Photography</option>
                      <option value="commercial">Commercial Photography</option>
                      <option value="wedding">Wedding Photography</option>
                      <option value="corporate">Corporate Photography</option>
                    </>
                  )}
                  {service.id === 'audio-production' && (
                    <>
                      <option value="">Service Type</option>
                      <option value="podcast">Podcast Production</option>
                      <option value="music">Music Production</option>
                      <option value="voiceover">Voice Over</option>
                      <option value="mixing">Audio Mixing/Mastering</option>
                    </>
                  )}
                  {service.id === 'lighting' && (
                    <>
                      <option value="">Event Type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="concert">Concert/Performance</option>
                      <option value="party">Private Party</option>
                      <option value="other">Other</option>
                    </>
                  )}
                  {service.id === 'sound-system' && (
                    <>
                      <option value="">Event Type</option>
                      <option value="conference">Conference</option>
                      <option value="wedding">Wedding</option>
                      <option value="concert">Concert</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="other">Other</option>
                    </>
                  )}
                  {service.id === 'live-streaming' && (
                    <>
                      <option value="">Event Type</option>
                      <option value="conference">Conference</option>
                      <option value="concert">Concert/Show</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="educational">Educational</option>
                      <option value="sports">Sports Event</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Tell us about your {title.toLowerCase()} needs</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Please provide details about your event and requirements..."
                required
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-700 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                I agree to the <a href="/terms" className="text-orange-500 hover:text-orange-400">Terms of Service</a> and <a href="/privacy" className="text-orange-500 hover:text-orange-400">Privacy Policy</a>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Request Free Quote
              </button>
            </div>
          </form>
        </div>
      </section>


    </div>
  );
};

export default BaseServiceDetail;
