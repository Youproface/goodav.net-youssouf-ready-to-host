// Simple test to check if the featured case studies are working
import { getFeaturedCaseStudies } from './src/data/featuredCaseStudies.ts';

console.log('Testing getFeaturedCaseStudies...');
try {
  const studies = getFeaturedCaseStudies();
  console.log('Success! Found', studies.length, 'case studies');
  console.log('First study:', studies[0]);
} catch (error) {
  console.error('Error loading case studies:', error);
}
