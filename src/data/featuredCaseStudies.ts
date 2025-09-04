import { CaseStudyData } from '../types/caseStudy';
import { caseStudies } from './caseStudies';

export const getFeaturedCaseStudies = (): CaseStudyData[] => {
  const featuredIds = [
    // International Partnerships & High-Profile Projects
    'gilead-ias-2025',
    'plus-life-media-ias-2025',
    
    // Major National Events & Government Projects
    'miss-rwanda-inspiration-backup',
    'kwibuka30-rwanda-despair-to-hope',
    'rssb-mou-signing',
    
    // Educational & Research Institutions
    'alu-africa-business-heroes-2023',
    'aims-research-innovation-centre',
    'biomex-uvu-bio',
    'undp-youth-cafe',
    
    // Corporate & Industrial Projects
    'rwanda-rising-cimerwa-documentary',
    'aspire-programme-year-three',
    'snv-clean-cooking'
  ];

  return featuredIds.map(id => caseStudies[id]).filter(Boolean) as CaseStudyData[];
};
