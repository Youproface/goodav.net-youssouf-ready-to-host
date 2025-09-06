import React from 'react';
import BaseServiceDetail from './BaseServiceDetail';
import { getServiceById } from '@/data/services';

const VideoProduction: React.FC = () => {
  const service = getServiceById('video-production');
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1012] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Video Production Service Not Available</h1>
          <p className="text-lg text-gray-300">Please check back later or contact us for video production services.</p>
        </div>
      </div>
    );
  }

  return (
    <BaseServiceDetail service={service}>
      {/* Video Production specific content can be added here */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-2xl p-8 border border-orange-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">Why Choose Our Video Production?</h3>
          <p className="text-zinc-300 mb-6">
            From award-winning documentaries to compelling corporate videos, our video production team delivers 
            exceptional storytelling that captures authentic African narratives and resonates with global audiences.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-orange-300 mb-2">Documentary Excellence</h4>
              <p className="text-zinc-400 text-sm">Professional documentary production with authentic storytelling and cinematic quality.</p>
            </div>
            <div>
              <h4 className="font-semibold text-orange-300 mb-2">Corporate Storytelling</h4>
              <p className="text-zinc-400 text-sm">Engaging corporate videos that effectively communicate your brand message and values.</p>
            </div>
          </div>
        </div>
      </section>
    </BaseServiceDetail>
  );
};

export default VideoProduction;
