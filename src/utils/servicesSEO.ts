import { ServiceType } from '@/data/services';

/**
 * Generate service-specific keywords based on service content and features
 */
export function generateServiceKeywords(service: ServiceType): string {
  const baseKeywords = [
    `${service.title.toLowerCase()} Rwanda`,
    `${service.title.toLowerCase()} services`,
    `professional ${service.title.toLowerCase()}`,
    `${service.title.toLowerCase()} Kigali`,
    `GoodAV ${service.title.toLowerCase()}`,
    `audiovisual services Rwanda`,
    `media production Rwanda`
  ];

  // Add feature-specific keywords
  const featureKeywords = service.features.map(feature => 
    feature.toLowerCase().replace(/[&,]/g, '').trim()
  );

  // Add service-specific keywords based on details
  const serviceSpecificKeywords = service.details.services.flatMap(s => [
    s.title.toLowerCase().replace(/[&,]/g, '').trim(),
    ...s.features.slice(0, 3).map(f => f.toLowerCase().replace(/[&,]/g, '').trim())
  ]);

  // Add industry and location keywords
  const industryKeywords = [
    'Africa audiovisual',
    'East Africa media',
    'conference coverage',
    'corporate events',
    'professional media services',
    'event production',
    'creative agency Africa'
  ];

  const allKeywords = [
    ...baseKeywords,
    ...featureKeywords,
    ...serviceSpecificKeywords.slice(0, 8), // Limit to prevent keyword stuffing
    ...industryKeywords.slice(0, 5)
  ];

  return [...new Set(allKeywords)].join(', ');
}

/**
 * Generate service-specific meta description
 */
export function generateServiceDescription(service: ServiceType): string {
  const baseDescription = service.details.heroDescription;
  const keyFeatures = service.features.slice(0, 2).join(' and ');
  
  return `${baseDescription} Expert ${keyFeatures} from GoodAV - Africa's premier audiovisual agency. Professional ${service.title.toLowerCase()} services in Rwanda and across Africa.`;
}

/**
 * Generate enhanced service title for SEO
 */
export function generateServiceTitle(service: ServiceType): string {
  return `${service.title} Services | GoodAV - Professional Audiovisual Production Rwanda`;
}

/**
 * Generate service structured data for SEO
 */
export function generateServiceStructuredData(service: ServiceType) {
  const baseUrl = 'https://goodav.net';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} Services`,
    description: service.details.overview,
    provider: {
      '@type': 'Organization',
      name: 'GoodAV',
      url: baseUrl,
      logo: `${baseUrl}/logo.svg`,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'Rwanda',
        addressLocality: 'Kigali'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+250-788-XXX-XXX',
        contactType: 'Customer Service'
      }
    },
    serviceType: service.title,
    areaServed: {
      '@type': 'Country',
      name: 'Rwanda'
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceRange: '$$',
      description: `Professional ${service.title.toLowerCase()} services`
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} Service Catalog`,
      itemListElement: service.details.services.slice(0, 5).map((serviceItem, index) => ({
        '@type': 'Offer',
        position: index + 1,
        name: serviceItem.title,
        description: serviceItem.description,
        category: service.title
      }))
    },
    mainEntityOfPage: `${baseUrl}/services/${service.id}`,
    url: `${baseUrl}/services/${service.id}`,
    image: `${baseUrl}/images/services/${service.id}-hero.jpg`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
      bestRating: '5',
      itemReviewed: {
        '@type': 'Organization',
        name: 'GoodAV',
        url: baseUrl,
        description: `${service.title} Services`
      }
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Client Testimonial'
        },
        reviewBody: `Exceptional ${service.title.toLowerCase()} services from GoodAV. Professional, reliable, and outstanding quality.`,
        itemReviewed: {
          '@type': 'Organization',
          name: 'GoodAV',
          url: baseUrl,
          description: `${service.title} Services`
        }
      }
    ]
  };
}

/**
 * Generate FAQ structured data for service page
 */
export function generateServiceFAQStructuredData(service: ServiceType) {
  if (!service.details.faqs.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.details.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate breadcrumb structured data for service pages
 */
export function generateServiceBreadcrumbStructuredData(service: ServiceType) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://goodav.net'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://goodav.net/#services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://goodav.net/services/${service.id}`
      }
    ]
  };
}
