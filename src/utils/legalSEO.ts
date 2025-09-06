/**
 * Legal pages SEO utility functions for Privacy Policy, Terms of Service, and Cookie Policy
 */

export interface LegalPageInfo {
  id: string;
  title: string;
  description: string;
  path: string;
  lastModified: string;
  content?: string;
}

export const legalPages: LegalPageInfo[] = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'Comprehensive privacy policy detailing how GoodAV protects your personal data and complies with GDPR, CCPA, and Rwanda data protection laws.',
    path: '/privacy',
    lastModified: '2025-09-01'
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    description: 'Official terms of service outlining user rights, obligations, and legal agreements when using GoodAV services.',
    path: '/terms',
    lastModified: '2025-09-01'
  },
  {
    id: 'cookie-policy',
    title: 'Cookie Policy',
    description: 'Detailed cookie policy explaining how GoodAV uses cookies, tracking technologies, and user privacy protection measures.',
    path: '/cookie-policy',
    lastModified: '2025-09-01'
  }
];

/**
 * Generate legal page-specific keywords
 */
export function generateLegalKeywords(pageId: string): string {
  const baseKeywords = [
    'GoodAV legal',
    'Rwanda legal compliance',
    'audiovisual industry legal',
    'media company legal',
    'GDPR compliance',
    'data protection Rwanda',
    'professional services legal'
  ];

  const pageSpecificKeywords = {
    privacy: [
      'privacy policy',
      'GDPR compliance',
      'CCPA compliance',
      'data protection',
      'personal data security',
      'user privacy rights',
      'data processing',
      'Rwanda privacy law',
      'media privacy policy',
      'audiovisual data protection'
    ],
    terms: [
      'terms of service',
      'user agreement',
      'service terms',
      'legal terms',
      'user rights',
      'service obligations',
      'Rwanda terms of service',
      'media service terms',
      'audiovisual service agreement',
      'professional service terms'
    ],
    'cookie-policy': [
      'cookie policy',
      'cookie usage',
      'tracking technologies',
      'website cookies',
      'user tracking',
      'cookie consent',
      'digital privacy',
      'Rwanda cookie policy',
      'media website cookies',
      'audiovisual website privacy'
    ]
  };

  const specificKeywords = pageSpecificKeywords[pageId] || [];
  
  const allKeywords = [
    ...baseKeywords,
    ...specificKeywords,
    'Africa media legal',
    'East Africa compliance',
    'professional media services',
    'Rwanda business legal',
    'audiovisual agency legal'
  ];

  return [...new Set(allKeywords)].join(', ');
}

/**
 * Generate legal page-specific meta description
 */
export function generateLegalDescription(pageId: string): string {
  const baseCompany = 'GoodAV - Africa\'s premier audiovisual agency';
  
  const descriptions = {
    privacy: `Comprehensive privacy policy for ${baseCompany}. Learn how we protect your personal data, comply with GDPR and CCPA, and respect your privacy rights. Transparent data practices for Rwanda and international clients.`,
    terms: `Official terms of service for ${baseCompany}. Understand your rights and obligations when using our professional video production, photography, and media services in Rwanda and across Africa.`,
    'cookie-policy': `Cookie policy for ${baseCompany}. Detailed explanation of how we use cookies, tracking technologies, and protect your online privacy while providing exceptional audiovisual services.`
  };

  return descriptions[pageId] || `Legal information for ${baseCompany}. Professional audiovisual services with transparent legal practices and compliance.`;
}

/**
 * Generate enhanced legal page title for SEO
 */
export function generateLegalTitle(pageId: string): string {
  const titles = {
    privacy: 'Privacy Policy | GoodAV - Data Protection & GDPR Compliance Rwanda',
    terms: 'Terms of Service | GoodAV - Professional Audiovisual Services Agreement',
    'cookie-policy': 'Cookie Policy | GoodAV - Website Privacy & Cookie Usage Rwanda'
  };

  return titles[pageId] || 'Legal Information | GoodAV - Professional Audiovisual Services Rwanda';
}

/**
 * Generate legal page structured data for SEO
 */
export function generateLegalStructuredData(pageId: string) {
  const baseUrl = 'https://goodav.net';
  const page = legalPages.find(p => p.id === pageId);
  
  if (!page) return null;

  return {
    '@context': 'https://schema.org',
    '@type': ['WebPage', 'LegalService'],
    name: page.title,
    description: page.description,
    url: `${baseUrl}${page.path}`,
    datePublished: page.lastModified,
    dateModified: page.lastModified,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'GoodAV',
      url: baseUrl
    },
    provider: {
      '@type': 'Organization',
      name: 'GoodAV',
      legalName: 'GOODAV Ltd',
      url: baseUrl,
      logo: `${baseUrl}/logo.svg`,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'Rwanda',
        addressLocality: 'Kigali'
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Legal',
          email: 'legal@goodav.net'
        },
        {
          '@type': 'ContactPoint',
          contactType: 'Privacy',
          email: 'privacy@goodav.net'
        }
      ]
    },
    areaServed: {
      '@type': 'Country',
      name: 'Rwanda'
    },
    mainEntityOfPage: `${baseUrl}${page.path}`,
    about: {
      '@type': 'Thing',
      name: `${page.title} for Audiovisual Services`,
      description: `Legal information regarding ${page.title.toLowerCase()} for professional audiovisual and media services`
    }
  };
}

/**
 * Generate organization structured data for legal pages
 */
export function generateLegalOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GoodAV',
    legalName: 'GOODAV Ltd',
    url: 'https://goodav.net',
    logo: 'https://goodav.net/logo.svg',
    foundingDate: '2019-08-26',
    numberOfEmployees: '10-50',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Rwanda',
      addressLocality: 'Kigali'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Legal Department',
        email: 'legal@goodav.net',
        availableLanguage: ['English', 'French', 'Kinyarwanda']
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Privacy Officer',
        email: 'privacy@goodav.net',
        availableLanguage: ['English', 'French']
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'support@goodav.net',
        availableLanguage: ['English', 'French', 'Kinyarwanda']
      }
    ],
    sameAs: [
      'https://www.linkedin.com/company/goodav',
      'https://www.youtube.com/@goodav',
      'https://www.instagram.com/goodav'
    ],
    industry: 'Audiovisual Production',
    description: 'Africa\'s premier audiovisual agency providing professional video production, photography, live streaming, and media services.',
    knowsAbout: [
      'Video Production',
      'Photography',
      'Live Streaming',
      'Audio Production',
      'Media Services',
      'Documentary Filmmaking'
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'Rwanda'
      },
      {
        '@type': 'Continent',
        name: 'Africa'
      }
    ]
  };
}

/**
 * Generate breadcrumb structured data for legal pages
 */
export function generateLegalBreadcrumbStructuredData(pageId: string) {
  const page = legalPages.find(p => p.id === pageId);
  if (!page) return null;

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
        name: 'Legal',
        item: 'https://goodav.net/legal'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title,
        item: `https://goodav.net${page.path}`
      }
    ]
  };
}

/**
 * Generate FAQ structured data for legal pages
 */
export function generateLegalFAQStructuredData(pageId: string) {
  const faqs = {
    privacy: [
      {
        question: 'What personal data does GoodAV collect?',
        answer: 'We collect personal information that you voluntarily provide, such as your name, email address, and any details submitted through our website forms, communications, or project requests.'
      },
      {
        question: 'How does GoodAV protect my personal data?',
        answer: 'We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, or destruction. All data is stored securely and accessed only by authorized personnel.'
      },
      {
        question: 'Does GoodAV share my data with third parties?',
        answer: 'We do not sell, rent, or share your personal data with third parties except as required by law or with your explicit consent.'
      },
      {
        question: 'What are my rights regarding my personal data?',
        answer: 'You have the right to access, correct, or delete your personal information, object to or restrict certain processing, withdraw consent at any time, and lodge a complaint with a supervisory authority.'
      }
    ],
    terms: [
      {
        question: 'What services are covered by these terms?',
        answer: 'These terms cover all GoodAV audiovisual services including video production, photography, live streaming, audio production, sound systems, and lighting services.'
      },
      {
        question: 'How can I contact GoodAV for legal matters?',
        answer: 'For legal matters, you can contact us at legal@goodav.net or through our general contact information at info@goodav.net.'
      },
      {
        question: 'Are these terms compliant with Rwanda law?',
        answer: 'Yes, our terms of service are designed to comply with Rwanda law and applicable international regulations for our services.'
      }
    ],
    'cookie-policy': [
      {
        question: 'What types of cookies does GoodAV use?',
        answer: 'We use essential cookies for website functionality, analytics cookies to understand user behavior, and preference cookies to remember your settings.'
      },
      {
        question: 'Can I disable cookies on the GoodAV website?',
        answer: 'Yes, you can control and disable cookies through your browser settings, though this may affect website functionality and user experience.'
      },
      {
        question: 'How long do cookies remain on my device?',
        answer: 'Cookie duration varies by type - session cookies are deleted when you close your browser, while persistent cookies remain for specific periods as outlined in our cookie policy.'
      }
    ]
  };

  const pageFAQs = faqs[pageId];
  if (!pageFAQs) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageFAQs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
