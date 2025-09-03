import React from 'react';
import './StatsSection.css';
import { Trophy, Eye, Handshake } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      number: "10+",
      label: "Years of Excellence",
      icon: <Trophy className="h-10 w-10 text-orange-500" />,
    },
    {
      number: <><span>95+</span><span className="text-orange-500">M</span></>,
      label: "Global Reach",
      icon: <Eye className="h-10 w-10 text-orange-500" />,
    },
    {
      number: "500+",
      label: "Success Stories",
      icon: <Handshake className="h-10 w-10 text-orange-500" />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-center text-orange-300 stats-header">
            Our Impact Speaks Volumes
          </h2>
          <div className="flex justify-center mb-2">
            <div className="w-16 h-1 bg-orange-500 rounded-full" />
          </div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Numbers that tell our story of excellence
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={"flex flex-col items-center justify-center text-center p-10 rounded-2xl border border-orange-300 bg-black/40 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_32px_8px_rgba(255,122,0,0.35)] hover:border-orange-500 hover:bg-orange-900/30 stats-card"}
            >
              <div className="mb-6 flex items-center justify-center">
                <div className="bg-orange-900/30 rounded-xl p-4 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 flex items-center justify-center">
                {stat.number}
              </div>
              <div className="text-lg text-white/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;