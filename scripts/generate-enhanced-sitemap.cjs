const fs = require('fs');
const path = require('path');

// Import case studies and services data
const { caseStudies, getFeaturedCaseStudies } = require('../src/data/caseStudies.cjs');
const { services } = require('../src/data/services.ts');
const { blogPosts } = require('../src/data/blog.ts');

// Base URL
const BASE_URL = 'https://goodav.net';

// Generate current date in ISO format
const getCurrentDate = () => new Date().toISOString();

// Main pages with their priorities and sections
const mainPages = [
  {
    url: '/',
    priority: '1.0',
    changefreq: 'weekly',
    sections: [
      'hero',
      'partners', 
      'services',
      'mission',
      'global-impact',
      'about',
      'journey',
      'featured-projects',
      'founders-vision',
      'creative-excellence',
      'recent-events',
      'blog',
      'contact'
    ]
  },
  {
    url: '/about-us',
    priority: '0.9',
    changefreq: 'monthly',
    sections: [
      'founder',
      'timeline',
      'about-us',
      'story',
      'services',
      'values',
      'impact',
      'team-heading'
    ]
  },
  {
    url: '/faq',
    priority: '0.8',
    changefreq: 'monthly',
    sections: []
  },
  {
    url: '/portfolio',
    priority: '0.9',
    changefreq: 'weekly',
    sections: []
  },
  {
    url: '/partner',
    priority: '0.8',
    changefreq: 'monthly',
    sections: []
  },
  {
    url: '/blog',
    priority: '0.8',
    changefreq: 'weekly',
    sections: []
  },
  {
    url: '/case-studies',
    priority: '0.9',
    changefreq: 'weekly',
    sections: []
  },
  {
    url: '/contact',
    priority: '0.8',
    changefreq: 'monthly',
    sections: []
  }
];

// Service pages
const servicePages = [
  'video-production',
  'photography', 
  'live-streaming',
  'audio-production',
  'sound-systems',
  'lighting'
];

// Generate XML sitemap
const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  const currentDate = getCurrentDate();

  // Add main pages
  mainPages.forEach(page => {
    // Add main page URL
    sitemap += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;

    // Add section-based URLs for main pages
    page.sections.forEach(section => {
      sitemap += `  <url>
    <loc>${BASE_URL}${page.url}#${section}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${(parseFloat(page.priority) - 0.1).toFixed(1)}</priority>
  </url>
`;
    });
  });

  // Add service pages
  servicePages.forEach(serviceId => {
    sitemap += `  <url>
    <loc>${BASE_URL}/services/${serviceId}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  // Add case study pages (get all case studies from the data)
  const allCaseStudies = Object.values(caseStudies);
  allCaseStudies.forEach(study => {
    if (study && study.slug) {
      sitemap += `  <url>
    <loc>${BASE_URL}/case-study/${study.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }
  });

  // Add blog posts
  if (typeof blogPosts !== 'undefined' && Array.isArray(blogPosts)) {
    blogPosts.forEach(post => {
      if (post && post.slug) {
        sitemap += `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
      }
    });
  }

  // Add legal pages
  const legalPages = [
    { url: '/privacy', priority: '0.3' },
    { url: '/terms', priority: '0.3' },
    { url: '/cookie-policy', priority: '0.3' }
  ];

  legalPages.forEach(page => {
    sitemap += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  sitemap += '</urlset>';
  return sitemap;
};

// Write sitemap to file
const sitemapContent = generateSitemap();
const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log('✅ Enhanced sitemap.xml generated successfully with canonical URLs and sections!');
console.log(`📍 Sitemap location: ${sitemapPath}`);
console.log(`🔗 Total URLs: ${(sitemapContent.match(/<loc>/g) || []).length}`);

module.exports = { generateSitemap };
