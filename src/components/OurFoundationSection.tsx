import React from 'react';

const OurFoundationSection = () => {
  return (
    <div className="bg-gradient-to-b  rounded-xl via-gray-800  min-h-screen p-8 text-white font-sans">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-orange-500 mb-4">OUR FOUNDATION</h1>
        <p className="text-gray-300 italic text-lg font-medium">
          Built on purpose, driven by passion, defined by excellence
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Mission Card */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 flex-1 border border-gray-700/50">
          {/* Mission Header */}
          <div className="flex items-center mb-8">
            <div className="bg-orange-500 rounded-full p-3 mr-4 shadow-lg">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-white rounded-full relative">
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            </div>
            <span className="bg-orange-600 text-white text-xs font-bold tracking-wider rounded-full px-4 py-2">
              MISSION
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-white">
            EMPOWERING AFRICAN VOICES
          </h2>
          
          <p className="text-gray-300 mb-8 text-base leading-relaxed">
            We elevate African narratives through world-class audiovisual 
            excellence, authentically showcasing our continent's rich cultures and 
            transformative stories with unparalleled creativity and technical mastery.
          </p>

          {/* Mission Items */}
          <div className="space-y-4">
            {[
              'Cultural Authenticity',
              'Technical Excellence', 
              'Global Standards'
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-700/50 rounded-lg p-4 flex items-center border-l-4 border-orange-500"
              >
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                  <svg 
                    className="w-4 h-4 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <span className="text-white font-semibold text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Card */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 flex-1 border border-gray-700/50">
          {/* Vision Header */}
          <div className="flex items-center mb-8">
            <div className="bg-orange-500 rounded-full p-3 mr-4 shadow-lg">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg 
                  className="w-7 h-7 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4.5c-5 0-9 4.5-9 7.5s4 7.5 9 7.5 9-4.5 9-7.5-4-7.5-9-7.5z" />
                  <circle cx="12" cy="12" r="2.5" fill="white" />
                </svg>
              </div>
            </div>
            <span className="bg-orange-600 text-white text-xs font-bold tracking-wider rounded-full px-4 py-2">
              VISION
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-white">
            AFRICA'S PREMIER STORYTELLERS
          </h2>
          
          <p className="text-gray-300 mb-8 text-base leading-relaxed">
            To become Africa's most trusted audiovisual partner, inspiring global 
            audiences with authentic, impactful narratives that celebrate our 
            continent's diversity and drive meaningful change worldwide.
          </p>

          {/* Vision Items */}
          <div className="space-y-4">
            {[
              'Industry Leadership',
              'Global Impact',
              'Cultural Bridge'
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-700/50 rounded-lg p-4 flex items-center border-l-4 border-orange-500"
              >
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                  <svg 
                    className="w-3 h-3 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span className="text-white font-semibold text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFoundationSection;
