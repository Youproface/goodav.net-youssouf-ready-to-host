// Dynamic sitemap generator for GoodAV
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { dirname, join } = require('path');

const routes = [
  '/',
  '/about-us',
  '/faq',
  '/portfolio',
  '/partner',
  '/blog',
  '/contact',
  // Services
  '/services/video-production',
  '/services/photography',
  '/services/live-streaming',
  '/services/audio-production',
  '/services/sound-systems',
  '/services/lighting',
  // Blog Articles
  '/blog/the-rise-of-africas-creative-economy',
  '/blog/africa-audiovisual-innovation-frontier',
  '/blog/5-ways-audiovisuals-transform-african-events',
  '/blog/goodav-supports-african-entrepreneurs',
  '/blog/audiovisual-storytelling-for-ngos-and-international-orgs',
  '/blog/unlocking-rural-africa-stories',
  '/blog/top-10-african-conference-tourism-destinations',
  '/blog/africa-audiovisual-investment-opportunities',
  '/blog/enhancing-event-storytelling-with-audiovisuals',
  '/blog/audiovisual-solutions-for-african-education',
  '/blog/top-5-video-production-companies-rwanda',
  // Legal Pages
  '/privacy',
  '/terms',
  '/cookie-policy',
];

const sitemap = new SitemapStream({ hostname: 'https://goodav.net' });
const writeStream = createWriteStream(join(__dirname, '../sitemap.xml'));

routes.forEach(route => {
  sitemap.write({
    url: route,
    changefreq: 'weekly',
    priority: route === '/' ? 1.0 : 0.8,
    lastmod: new Date().toISOString()
  });
});

sitemap.end();
streamToPromise(sitemap).then(sm => {
  writeStream.write(sm.toString());
  writeStream.end();
  console.log('✅ Sitemap generated successfully at sitemap.xml');
}).catch(err => {
  console.error('❌ Error generating sitemap:', err);
});
