import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const Streaming: React.FC = () => {
  const service = getServiceById('live-streaming');
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1012] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Live Streaming Service Not Available</h1>
          <p className="text-lg text-gray-300">Please check back later or contact us for live streaming services.</p>
        </div>
      </div>
    );
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Live Streaming specific content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl p-8 border border-red-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">Professional Live Streaming Solutions</h3>
          <p className="text-zinc-300 mb-6">
            Connect with global audiences through seamless live streaming. Our professional broadcasting solutions 
            transcend borders and bring your events to the world with crystal-clear quality and reliability.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-red-300 mb-2">Multi-Platform Broadcasting</h4>
              <p className="text-zinc-400 text-sm">Simultaneous streaming to YouTube, Facebook, LinkedIn, and custom platforms for maximum reach.</p>
            </div>
            <div>
              <h4 className="font-semibold text-red-300 mb-2">Technical Excellence</h4>
              <p className="text-zinc-400 text-sm">Professional equipment and experienced crew ensure flawless live production with 99.9% uptime.</p>
            </div>
          </div>
        </div>
      </section>
    </BaseServiceDetail>
  );
};

export default Streaming;
