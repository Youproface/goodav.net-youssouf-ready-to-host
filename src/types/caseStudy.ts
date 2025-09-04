export interface CaseStudyData {
  id: string;
  title: string;
  description: string;
  content: {
    overview: string;
    challenge: string;
    solution: string;
    impact: string;
  };
  image: string;
  date: string;
  client: string;
  category: string;
  location?: string;
  tags?: string[];
  slug?: string;
  youtubeUrl?: string;
  youtubeUrls?: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}
