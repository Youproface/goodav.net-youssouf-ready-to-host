import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const AudioProduction: React.FC = () => {
  const service = getServiceById('audio-production');
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1012] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Audio Production Service Not Available</h1>
          <p className="text-lg text-gray-300">Please check back later or contact us for audio production services.</p>
        </div>
      </div>
    );
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Audio Production specific content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-2xl p-8 border border-green-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">Crystal-Clear Audio Production</h3>
          <p className="text-zinc-300 mb-6">
            Professional audio solutions from recording to final master, delivering studio-quality sound that captures 
            the authentic voice of Africa. Our state-of-the-art facilities ensure every project meets broadcast standards.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-green-300 mb-2">Studio Recording</h4>
              <p className="text-zinc-400 text-sm">State-of-the-art recording facilities with professional-grade equipment and acoustics.</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-300 mb-2">Podcast Production</h4>
              <p className="text-zinc-400 text-sm">Complete podcast production from recording to distribution setup and optimization.</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-300 mb-2">Music Production</h4>
              <p className="text-zinc-400 text-sm">Professional music recording, mixing, and mastering services for artists and labels.</p>
            </div>
          </div>
        </div>
      </section>
    </BaseServiceDetail>
  );
};

export default AudioProduction;
