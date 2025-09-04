const { getFeaturedCaseStudies } = require('../src/data/featuredCaseStudies.cjs');

// Test the output of getFeaturedCaseStudies
console.log('Testing getFeaturedCaseStudies function...');
const featuredCaseStudies = getFeaturedCaseStudies();

if (featuredCaseStudies.length > 0) {
  console.log('Featured Case Studies:', featuredCaseStudies);
} else {
  console.error('Error: No featured case studies returned.');
}
