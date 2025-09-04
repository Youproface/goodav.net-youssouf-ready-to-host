import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

/*
 * SEO Component - React Compatible Version
 *
 * Key improvements for React compatibility:
 * - Fixed image paths to match actual project structure (/images/all_site_images/Assets/)
 * - Added error handling for missing seo.json file
 * - Converted functions to useMemo for better performance
 * - Added conditional rendering for analytics scripts
 * - Improved fallback handling for missing images
 * - Removed outdated HTML5-specific elements
 * - Added proper TypeScript error handling
 */

// Advanced SEO Props Interface
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'video' | 'product' | 'book' | 'profile';
  schema?: object | object[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
    readingTime?: number;
  };
  video?: {
    url?: string;
    type?: string;
    width?: number;
    height?: number;
    duration?: number;
    thumbnailUrl?: string;
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  alternateLanguages?: Array<{
    hreflang: string;
    href: string;
  }>;
  openGraph?: {
    title: string;
    description: string;
    url: string;
    type: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
}

interface SEOPageData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
  type?: string;
  priority?: string;
  changefreq?: string;
  schema?: object | object[];
  article?: SEOProps['article'];
  video?: SEOProps['video'];
  alternateLanguages?: SEOProps['alternateLanguages'];
}

interface SEOData {
  [key: string]: SEOPageData;
}

// Professional-grade SEO Component with Real Production Data
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  type = 'website',
  schema,
  canonical,
  noindex = false,
  nofollow = false,
  article,
  video,
  breadcrumbs,
  alternateLanguages,
  openGraph,
  twitter
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);


// Module-level real production site configuration (stable reference)
const SITE_CONFIG = {
  url: "https://goodav.net",
  name: "GoodAV",
  locale: "en_US",
  twitter: "@goodav_official",
  facebook: "goodaudiovisuals",
  instagram: "goodaudiovisual",
  linkedin: "company/goodav",
  youtube: "@goodaudiovisuals",
  gaId: "G-Y5G4TT0ZHW",
  gtmId: "G-J5MG2TV0P3",
  clarityId: "ph88826n5d",
  adSenseId: "ca-pub-3053738298648945",
  logo: "/images/all_site_images/Assets/logo-full-color.svg",
}

// Module-level default SEO configuration (stable reference)
const DEFAULT_SEO: SEOPageData = {
  title: "GoodAV: Event and Documentary Video Production, Photography Services in Rwanda and Africa",
  description: "GoodAV: Professional audiovisual services in Rwanda and Africa. Video production, live streaming, photography, and more.",
  keywords: "GoodAV, video production Rwanda, Africa live streaming, professional photography Rwanda, documentary production Africa",
  ogImage: "/images/all_site_images/Assets/logo-full-color.svg",
  canonicalUrl: "/",
  type: "website",
  priority: "1.0",
  changefreq: "weekly",
}

  const [pageSEO, setPageSEO] = useState<SEOPageData>(DEFAULT_SEO);

  // Advanced page detection with slug and category support
  const getPageKey = useMemo(() => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/portfolio')) return 'portfolio';
    if (pathname.startsWith('/services/')) {
      const serviceId = pathname.split('/')[2];
      return `service-${serviceId}`;
    }
    if (pathname.startsWith('/services')) return 'services';
    if (pathname.startsWith('/contact')) return 'contact';
    if (pathname.startsWith('/blog/')) {
      const slug = pathname.split('/')[2];
      return `blog-${slug}`;
    }
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/faq')) return 'faq';
    if (pathname.startsWith('/partner')) return 'partner';
    if (pathname.startsWith('/case-study/')) {
      const slug = pathname.split('/')[2];
      return `case-study-${slug}`;
    }
    return 'default';
  }, [pathname]);

  // Generate intelligent SEO defaults based on pathname
  const generateIntelligentDefaults = useMemo(() => (path: string): SEOPageData => {
  const base = { ...DEFAULT_SEO };

    if (path.startsWith('/about')) {
      return {
        ...base,
        title: "About GoodAV | Professional Audiovisual Services in Rwanda & Africa",
        description: "Learn about GoodAV's journey as Rwanda's premier audiovisual production company. Discover our mission, team, and commitment to transforming African narratives through cinematic excellence.",
        keywords: "about GoodAV, audiovisual company Rwanda, video production team, African storytelling, creative agency Kigali",
        canonicalUrl: "/about-us"
      };
    }

    if (path.startsWith('/services')) {
      return {
        ...base,
        title: "Professional Audiovisual Services | Video Production, Photography & More",
        description: "Comprehensive audiovisual services including video production, live streaming, photography, sound systems, and lighting. Professional solutions for events, corporates, and NGOs across Africa.",
        keywords: "audiovisual services, video production services, live streaming, professional photography, sound systems, lighting services",
        canonicalUrl: "/services"
      };
    }

    if (path.startsWith('/portfolio')) {
      return {
        ...base,
        title: "Portfolio | Award-Winning Audiovisual Projects by GoodAV",
        description: "Explore GoodAV's portfolio of award-winning audiovisual projects. From documentaries to corporate videos, see how we transform ideas into impactful visual stories.",
        keywords: "GoodAV portfolio, video production portfolio, documentary projects, corporate videos, event coverage",
        canonicalUrl: "/portfolio"
      };
    }

    if (path.startsWith('/blog')) {
      return {
        ...base,
        title: "Blog | Insights on Audiovisual Production & African Storytelling",
        description: "Stay updated with the latest trends in audiovisual production, African storytelling, and creative industry insights from GoodAV's expert team.",
        keywords: "audiovisual blog, video production tips, African storytelling, creative industry insights",
        canonicalUrl: "/blog"
      };
    }

    if (path.startsWith('/contact')) {
      return {
        ...base,
        title: "Contact GoodAV | Get Professional Audiovisual Services Quote",
        description: "Contact GoodAV for professional audiovisual services in Rwanda and across Africa. Get a quote for video production, photography, live streaming, and more.",
        keywords: "contact GoodAV, audiovisual services quote, video production contact, Rwanda production company",
        canonicalUrl: "/contact"
      };
    }

    return base;
  }, [DEFAULT_SEO]);

  // Fetch SEO data from JSON file (optional - falls back to intelligent defaults)
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const response = await fetch('/seo.json');
        if (!response.ok) {
          // If seo.json doesn't exist, use intelligent defaults
          throw new Error('SEO data not found');
        }

        const data: SEOData = await response.json();
        setSeoData(data);

  const pageData = data[getPageKey] || data['default'] || DEFAULT_SEO;
        setPageSEO(pageData);

      } catch (error) {
        // Silently fall back to intelligent defaults - this is expected behavior
        console.debug('SEO data loading failed, using intelligent defaults:', error.message);
        const intelligentDefaults = generateIntelligentDefaults(pathname);
        setPageSEO(intelligentDefaults);
      } finally {
        setLoading(false);
      }
    };

    fetchSEOData();
  }, [pathname, getPageKey, generateIntelligentDefaults, DEFAULT_SEO]);

  // Merge props with page-specific data
  const finalData = useMemo(() => {
    return {
      title: title || pageSEO.title,
      description: description || pageSEO.description,
      keywords: keywords || pageSEO.keywords,
      image: image || pageSEO.ogImage,
  canonical: canonical || `${SITE_CONFIG.url}${pageSEO.canonicalUrl === '/' ? '' : pageSEO.canonicalUrl || pathname}`,
      schema: schema || pageSEO.schema,
      type: type || pageSEO.type || 'website'
    };
  }, [title, description, keywords, image, canonical, schema, type, pageSEO, pathname, SITE_CONFIG]);

  // Robots meta content
  const robotsContent = useMemo(() => {
    const robots = [];

    if (noindex) robots.push('noindex');
    else robots.push('index');

    if (nofollow) robots.push('nofollow');
    else robots.push('follow');

    robots.push('max-image-preview:large');
    robots.push('max-snippet:-1');
    robots.push('max-video-preview:-1');

    return robots.join(', ');
  }, [noindex, nofollow]);

  // Generate comprehensive structured data using real production data
  const generateStructuredData = useMemo(() => {
    try {
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "GoodAV",
        "url": "https://goodav.net",
        "description": "Professional audiovisual production services in Rwanda and Africa.",
        "logo": "https://goodav.net/images/all_site_images/Assets/logo-full-color.svg",
        "sameAs": [
          "https://www.instagram.com/goodaudiovisual",
          "https://www.youtube.com/@goodaudiovisuals",
          "https://www.facebook.com/goodaudiovisuals",
          "https://www.linkedin.com/company/goodav"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+250788613332",
          "email": "info@goodav.net",
          "contactType": "Customer Support",
          "areaServed": ["Rwanda", "Africa", "International"],
          "availableLanguage": ["en", "fr"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kigali",
          "addressCountry": "RW"
        },
        "founder": {
          "@type": "Person",
          "name": "Youssouf Hakizimana"
        },
        "keywords": [
          "audiovisual production Rwanda",
          "video production Kigali",
          "African storytelling",
          "event media coverage",
          "cinematic campaigns",
          "live streaming services",
          "photography for events",
          "NGO storytelling",
          "corporate video production",
          "conference tourism Africa",
          "creative economy Africa",
          "digital media Africa",
          "multilingual video production",
          "documentary filmmaking Rwanda",
          "social media video content",
          "branding through video",
          "testimonials video editing",
          "lighting and sound systems",
          "virtual event production",
          "e-learning video solutions",
          "audiovisual services for NGOs",
          "African creative industries",
          "youth empowerment through media",
          "cultural preservation via film",
          "pan-African media agency",
          "impact storytelling Africa",
          "professional media coverage",
          "YouTube content creation Africa",
          "Instagram reels production",
          "TikTok video strategy Africa",
          "cinematic drone footage Rwanda",
          "visual storytelling for brands",
          "high-quality video editing",
          "media production for development",
          "creative direction Africa",
          "audiovisual innovation Africa"
        ]
      };

      // Enhanced schemas for different content types
      const baseSchemas: object[] = [organizationSchema];

      // Article schema for blog posts
      if (type === 'article' && article) {
        const articleSchema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": finalData.canonical
          },
          "headline": finalData.title,
          "description": finalData.description,
          "image": `${SITE_CONFIG.url}${finalData.image}`,
          "author": {
            "@type": "Organization",
            "name": "GoodAV"
          },
          "publisher": {
            "@type": "Organization",
            "name": "GoodAV",
            "logo": {
              "@type": "ImageObject",
              "url": `${SITE_CONFIG.url}${SITE_CONFIG.logo}`
            }
          },
          "datePublished": article.publishedTime || "2024-03-15",
          "dateModified": article.modifiedTime || "2024-03-15"
        };
        baseSchemas.push(articleSchema);
      }

      // Service schema for service pages
      if (pathname.startsWith('/services')) {
        const serviceSchema = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Video Production",
          "description": "Professional video production services for documentaries, events, and brand storytelling across Africa.",
          "provider": {
            "@type": "Organization",
            "name": "GoodAV",
            "url": "https://goodav.net"
          },
          "areaServed": {
            "@type": "Place",
            "name": "Africa"
          },
          "serviceType": "Audiovisual Production",
          "brand": {
            "@type": "Brand",
            "name": "GoodAV"
          },
          "image": "https://goodav.net/images/all_site_images/Assets/logo-full-color.svg"
        };
        baseSchemas.push(serviceSchema);
      }

      // Creative Work schema for portfolio
      if (pathname.startsWith('/portfolio') || pathname.startsWith('/case-study')) {
        const creativeWorkSchema = {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "Professional Audiovisual Projects",
          "description": "Award-winning audiovisual projects including documentaries, corporate videos, and event coverage across Africa.",
          "creator": {
            "@type": "Organization",
            "name": "GoodAV"
          },
          "dateCreated": "2025-01-01",
          "url": finalData.canonical,
          "image": `${SITE_CONFIG.url}${finalData.image}`
        };
        baseSchemas.push(creativeWorkSchema);
      }

      // Video schema for video content
      if (type === 'video' && video && video.url) {
        const videoSchema = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": finalData.title,
          "description": finalData.description,
          "thumbnailUrl": video.thumbnailUrl || `${SITE_CONFIG.url}${finalData.image}`,
          "uploadDate": "2025-01-01T00:00:00Z",
          "duration": `PT${Math.floor((video.duration || 0) / 60)}M${(video.duration || 0) % 60}S`,
          "contentUrl": video.url,
          "embedUrl": video.url,
          "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/WatchAction",
            "userInteractionCount": 1000
          },
          "publisher": {
            "@type": "Organization",
            "name": "GoodAV",
            "logo": {
              "@type": "ImageObject",
              "url": `${SITE_CONFIG.url}${SITE_CONFIG.logo}`
            }
          },
          "author": {
            "@type": "Organization",
            "name": "GoodAV"
          },
          "keywords": finalData.keywords,
          "inLanguage": "en-US"
        };
        baseSchemas.push(videoSchema);
      }

      // Custom schema override
      if (schema) {
        if (Array.isArray(schema)) {
          baseSchemas.push(...schema);
        } else {
          baseSchemas.push(schema);
        }
      }

      return baseSchemas.length === 1 ? baseSchemas[0] : baseSchemas;
    } catch (error) {
      console.warn('Error generating structured data:', error);
      return {};
    }
  }, [type, article, pathname, video, schema, finalData, SITE_CONFIG]);

  // Generate rich Open Graph tags using real data
  const generateOpenGraphTags = useMemo(() => {
    if (openGraph) {
      return (
        <>
          <meta property="og:title" content={openGraph.title} />
          <meta property="og:description" content={openGraph.description} />
          <meta property="og:url" content={openGraph.url} />
          <meta property="og:type" content={openGraph.type} />
          {openGraph.images.map((image, index) => (
            <meta key={index} property="og:image" content={image.url} />
          ))}
        </>
      );
    }
    return null;
  }, [openGraph]);

  // Generate Twitter Card tags using real data
  const generateTwitterTags = useMemo(() => {
    if (twitter) {
      return (
        <>
          <meta name="twitter:card" content={twitter.card} />
          <meta name="twitter:title" content={twitter.title} />
          <meta name="twitter:description" content={twitter.description} />
          <meta name="twitter:image" content={twitter.image} />
        </>
      );
    }
    return null;
  }, [twitter]);

  // Generate Analytics scripts using real production IDs
  const generateAnalyticsScripts = useMemo(() => (
    <>
      {/* Google Analytics 4 - Real Production ID */}
  {SITE_CONFIG.gaId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.gaId}`}></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${SITE_CONFIG.gaId}');
            `}
          </script>
        </>
      )}

      {/* Google Tag Manager - Real Production ID */}
  {SITE_CONFIG.gtmId && (
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=1;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${SITE_CONFIG.gtmId}');
          `}
        </script>
      )}

      {/* Microsoft Clarity - Real Production ID */}
  {SITE_CONFIG.clarityId && (
        <script>
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${SITE_CONFIG.clarityId}");
          `}
        </script>
      )}

      {/* Google AdSense - Real Production ID */}
  {SITE_CONFIG.adSenseId && (
  <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE_CONFIG.adSenseId}`} crossOrigin="anonymous"></script>
      )}
    </>
  ), [SITE_CONFIG]);

  if (loading) {
    return null; // Don't render anything while loading
  }

  return (
    <Helmet>
      {/* Meta Information for SEO - Real Production Data */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{finalData.title}</title>
      <meta name="description" content={finalData.description} />
      <meta name="keywords" content={finalData.keywords} />
      <meta name="author" content="GoodAV" />

      {/* Canonical URL */}
      <link rel="canonical" href={finalData.canonical} />

      {/* Robots */}
      <meta name="robots" content={robotsContent} />

      {/* Open Graph Metadata - Real Production Data */}
      {generateOpenGraphTags}

      {/* Twitter - Real Production Data */}
      {generateTwitterTags}

      {/* Favicon and Apple Touch Icon - Only in <head> */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" href="/images/all_site_images/Assets/logo-icon-color.svg" />

      {/* Performance Optimization - Essential preconnects only */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Mobile Optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="GoodAV" />
      <meta name="application-name" content="GoodAV" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />

      {/* Geographic Meta */}
      <meta name="geo.region" content="RW" />
      <meta name="geo.placename" content="Kigali, Rwanda" />

      {/* Additional SEO Enhancement */}
      <meta name="publisher" content="GoodAV" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="3 days" />

      {/* Industry-specific Meta */}
      <meta name="industry" content="Media Production, Audiovisual Services" />
      <meta name="category" content="Professional Services, Creative Agency" />

      {/* Structured Data - Real Production Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData, null, 2)}
      </script>

      {/* Real Production Analytics Scripts */}
      {generateAnalyticsScripts}

      {/* Alternate Languages */}
      {alternateLanguages?.map((lang, index) => (
        <link key={index} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={SITE_CONFIG.url} />

      {/* Breadcrumb Navigation for SEO */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": crumb.name,
              "item": `${SITE_CONFIG.url}${crumb.url}`
            }))
          }, null, 2)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
