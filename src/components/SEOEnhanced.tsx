import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOSection {
  id: string;
  title: string;
  description: string;
  keywords?: string[];
}

interface EnhancedSEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  sections?: SEOSection[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: Record<string, any>;
}

const SEOEnhanced: React.FC<EnhancedSEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  image = '/images/goodav-og-image.jpg',
  type = 'website',
  sections = [],
  author,
  publishedTime,
  modifiedTime,
  structuredData
}) => {
  const siteUrl = 'https://goodav.net';
  const fullCanonical = canonical?.startsWith('http') ? canonical : `${siteUrl}${canonical || ''}`;
  const fullImage = image?.startsWith('http') ? image : `${siteUrl}${image}`;

  // Generate section-based meta tags for main page sections
  const sectionMetaTags = sections.map((section, index) => (
    <React.Fragment key={section.id}>
      <meta property={`og:section:${index}:id`} content={section.id} />
      <meta property={`og:section:${index}:title`} content={section.title} />
      <meta property={`og:section:${index}:description`} content={section.description} />
      <meta property={`og:section:${index}:url`} content={`${fullCanonical}#${section.id}`} />
      {section.keywords && (
        <meta property={`og:section:${index}:keywords`} content={section.keywords.join(', ')} />
      )}
    </React.Fragment>
  ));

  // Generate structured data for sections
  const sectionStructuredData = sections.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": fullCanonical,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": sections.map((section, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebPageElement",
          "name": section.title,
          "description": section.description,
          "url": `${fullCanonical}#${section.id}`,
          ...(section.keywords && { "keywords": section.keywords.join(', ') })
        }
      }))
    }
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="GoodAV" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@goodaudiovisual" />
      
      {/* Article Meta (for blog posts and case studies) */}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      
      {/* Section-based meta tags */}
      {sectionMetaTags}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Section Structured Data */}
      {sectionStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(sectionStructuredData)}
        </script>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Geo Tags for Rwanda-based business */}
      <meta name="geo.region" content="RW" />
      <meta name="geo.placename" content="Kigali" />
      <meta name="geo.position" content="-1.9441;30.0619" />
      <meta name="ICBM" content="-1.9441, 30.0619" />
      
      {/* Language and Region */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="fr_FR" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#f97316" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOEnhanced;
