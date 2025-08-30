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
          image: '/src/assets/images/all_site_images/Portfolio/ias2025-cover.jpg',
        }}
      />
      <div className="min-h-screen bg-black text-white">
        {/* Portfolio content goes here. Add images and markup as needed. */}
      </div>
    </div>
  );
};

export default Portfolio;