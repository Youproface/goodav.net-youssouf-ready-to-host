import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const Lighting: React.FC = () => {
  const service = getServiceById('lighting');
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1012] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Lighting Service Not Available</h1>
          <p className="text-lg text-gray-300">Please check back later or contact us for professional lighting services.</p>
        </div>
      </div>
    );
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Lighting specific content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-8 border border-yellow-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">Stunning Lighting Design</h3>
          <p className="text-zinc-300 mb-6">
            Transform your event with professional lighting design that creates the perfect ambiance. From elegant 
            weddings to dynamic concerts, our lighting solutions enhance every moment and create unforgettable experiences.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">Wedding Lighting</h4>
              <p className="text-zinc-400 text-sm">Romantic and elegant lighting design for ceremonies, receptions, and celebrations.</p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">Corporate Events</h4>
              <p className="text-zinc-400 text-sm">Professional stage lighting, brand color themes, and architectural illumination.</p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">Concert Lighting</h4>
              <p className="text-zinc-400 text-sm">Dynamic lighting systems with moving heads, lasers, and special effects for performances.</p>
            </div>
          </div>
        </div>
      </section>
    </BaseServiceDetail>
  );
};

export default Lighting;
