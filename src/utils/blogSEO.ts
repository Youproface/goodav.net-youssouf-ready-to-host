import { BlogPost } from '@/data/blog';

/**
 * Generate dynamic SEO keywords for blog posts based on content analysis
 */
export const generateBlogKeywords = (blog: BlogPost): string => {
  const baseKeywords = [
    "GoodAV blog",
    "Africa creative industries", 
    "Rwanda audiovisual",
    blog.category.toLowerCase(),
    "African storytelling",
    "creative economy"
  ];
  
  const content = blog.content.toLowerCase();
  
  // Content-based keyword detection
  if (content.includes('kigali convention')) baseKeywords.push('Kigali Convention Center', 'Rwanda conferences');
  if (content.includes('kwita izina')) baseKeywords.push('Kwita Izina', 'gorilla naming', 'Rwanda tourism');
  if (content.includes('documentary')) baseKeywords.push('documentary production', 'African documentaries');
  if (content.includes('audiovisual')) baseKeywords.push('audiovisual production', 'video production Rwanda');
  if (content.includes('streaming')) baseKeywords.push('live streaming', 'streaming technology');
  if (content.includes('technology')) baseKeywords.push('media technology', 'creative technology');
  if (content.includes('innovation')) baseKeywords.push('creative innovation', 'technology innovation');
  if (content.includes('economic')) baseKeywords.push('economic development', 'creative economy');
  if (content.includes('entrepreneurship')) baseKeywords.push('creative entrepreneurship', 'African entrepreneurs');
  if (content.includes('education')) baseKeywords.push('creative education', 'media education');
  
  // Remove duplicates and join
  return [...new Set(baseKeywords)].join(', ');
};

/**
 * Generate optimized meta description for blog posts
 */
export const generateBlogDescription = (blog: BlogPost): string => {
  const baseDescription = blog.excerpt;
  
  // If excerpt is too short, enhance it
  if (baseDescription.length < 120) {
    return `${baseDescription} Read more insights on Africa's creative industries and Rwanda's audiovisual leadership on GoodAV Blog.`;
  }
  
  return baseDescription;
};

/**
 * Generate structured data for individual blog posts
 */
export const generateBlogStructuredData = (blog: BlogPost, blogImage: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blog.title,
  "description": blog.excerpt,
  "image": blogImage,
  "datePublished": blog.date,
  "author": {
    "@type": "Organization",
    "name": "GoodAV",
    "url": "https://goodav.net"
  },
  "publisher": {
    "@type": "Organization",
    "name": "GoodAV",
    "url": "https://goodav.net",
    "logo": "https://goodav.net/images/all_site_images/Assets/logo-full-color.svg"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://goodav.net/blog/${blog.slug}`
  },
  "articleSection": blog.category,
  "keywords": generateBlogKeywords(blog),
  "wordCount": blog.content.split(' ').length,
  "timeRequired": blog.readTime
});

/**
 * Generate SEO title for blog posts
 */
export const generateBlogTitle = (blog: BlogPost): string => {
  const baseTitle = blog.title;
  
  // Ensure title includes brand and context
  if (!baseTitle.includes('GoodAV') && !baseTitle.includes('Africa')) {
    return `${baseTitle} | GoodAV Blog - African Creative Industries`;
  }
  
  return `${baseTitle} | GoodAV Blog`;
};
