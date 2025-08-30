import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';

const Portfolio = () => {
  return (
    <div>
      <SEO
        title="Portfolio - GoodAV | Award-Winning Audiovisual Projects"
        description="Explore GoodAV’s portfolio of award-winning audiovisual productions, documentaries, and event coverage across Africa."
        canonical="https://goodav.net/portfolio"
      />
      <SchemaMarkup
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: 'GoodAV Portfolio',
          description: 'Award-winning audiovisual productions, documentaries, and event coverage by GoodAV.',
          creator: {
            '@type': 'Organization',
            name: 'GoodAV',
          },
          url: 'https://goodav.net/portfolio',
          image: 'https://goodav.net/image/portfolio/ias2025-cover.jpg',
        }}
      />
      <div className="min-h-screen bg-black text-white">
        {/* Portfolio content goes here. Add images and markup as needed. */}
      </div>
    </div>
  );
};
export default Portfolio;
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "GoodAV Portfolio",
          "description": "Award-winning audiovisual productions, documentaries, and event coverage by GoodAV.",
          "creator": {
            "@type": "Organization",
            "name": "GoodAV"
          },
          "url": "https://goodav.net/portfolio",
          "image": "https://goodav.net/image/portfolio/ias2025-cover.jpg"
        }}
      />
      <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative mt-10 py-32 px-4 bg-transparent">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="About GoodAV"
            className="w-full h-full object-cover opacity-30"
          />
          
          {/* <div className="absolute inset-0 bg-gradient-to-b " /> */}
        </div>
        
        {/* Content */}
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r text-white bg-clip-text text-transparent">
            export default Portfolio;


      {/* Portfolio Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <span className="text-sm text-gray-400">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
              Load More Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;