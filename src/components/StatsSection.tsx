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
    <section id="stats-section" className="py-20 bg-gradient-section">
        {/* SEO Meta Tags & Structured Data for Stats Section */}
        <head>
          <title>GoodAV Impact Stats | Rwanda Africa Documentary Video Production</title>
          <meta name="description" content="Discover GoodAV's impact: years of excellence, global reach, and hundreds of success stories in Rwanda, Africa, and worldwide. Trusted for documentary, conversion, and creative services." />
          <meta name="keywords" content="Rwanda, Africa, documentary, video production, impact, success stories, global reach, excellence, conversion, creative agency" />
          <meta name="author" content="GoodAV" />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <link rel="canonical" href="https://goodav.net/#stats-section" />
          <meta name="geo.region" content="RW" />
          <meta name="geo.placename" content="Kigali, Rwanda" />
          <meta name="language" content="English" />
          <meta name="industry" content="Media Production, Audiovisual Services" />
          <meta name="category" content="Professional Services, Creative Agency" />
          {/* Schema.org WebPage structured data for Stats section */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "GoodAV Impact Stats",
              "description": "Discover GoodAV's impact: years of excellence, global reach, and hundreds of success stories in Rwanda, Africa, and worldwide.",
              "url": "https://goodav.net/#stats-section",
              "mainEntity": {
                "@type": "Organization",
                "name": "GoodAV",
                "url": "https://goodav.net",
                "keywords": [
                  "impact stats",
                  "years of excellence",
                  "global reach",
                  "success stories",
                  "Rwanda documentary",
                  "Africa video production"
                ]
              }
            })}
          </script>
        </head>
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