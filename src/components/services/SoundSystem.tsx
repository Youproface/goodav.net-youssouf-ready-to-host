import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const SoundSystem: React.FC = () => {
  const service = getServiceById('sound-systems');
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1012] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Sound System Service Not Available</h1>
          <p className="text-lg text-gray-300">Please check back later or contact us for sound system rental services.</p>
        </div>
      </div>
    );
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Sound System specific content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-2xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">Premium Sound System Solutions</h3>
          <p className="text-zinc-300 mb-6">
            Professional-grade audio equipment from leading international brands with experienced audio engineers. 
            We ensure crystal-clear sound that reaches every corner of your venue, from intimate gatherings to large-scale events.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">Conference Audio</h4>
              <p className="text-zinc-400 text-sm">Professional wireless microphones, speaker arrays, and mixing consoles for business events.</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">Event Sound</h4>
              <p className="text-zinc-400 text-sm">High-quality PA systems for weddings, celebrations, and social gatherings.</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">Concert Systems</h4>
              <p className="text-zinc-400 text-sm">Powerful line array systems for concerts, festivals, and large outdoor events.</p>
            </div>
          </div>
        </div>
      </section>
    </BaseServiceDetail>
  );
};

export default SoundSystem;
