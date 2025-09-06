import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const Photography: React.FC = () => {
  const service = getServiceById('photography');
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1012] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Photography Service Not Available</h1>
          <p className="text-lg text-gray-300">Please check back later or contact us for photography services.</p>
        </div>
      </div>
    );
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Photography specific content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">Professional Photography Excellence</h3>
          <p className="text-zinc-300 mb-6">
            Our photography captures the authentic essence of African stories with emotional depth and visual brilliance. 
            From intimate portraits to large-scale events, we create images that resonate and inspire.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">Portrait Mastery</h4>
              <p className="text-zinc-400 text-sm">Professional portraits that capture personality and character with stunning clarity.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">Event Coverage</h4>
              <p className="text-zinc-400 text-sm">Comprehensive event photography that captures every important moment and emotion.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">Commercial Photography</h4>
              <p className="text-zinc-400 text-sm">High-quality commercial imagery for businesses and marketing materials.</p>
            </div>
          </div>
        </div>
      </section>
    </BaseServiceDetail>
  );
};

export default Photography;
