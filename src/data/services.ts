import { Video, Camera, Radio, Mic, Speaker, Lightbulb } from 'lucide-react';
import React from 'react';

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  features: string[];
  link?: string; // Optional link property for navigation
  details: {
    heroTitle: string;
    heroDescription: string;
    overview: string;
    stats: Array<{
      number: string;
      label: string;
    }>;
    excellencePoints: Array<{
      title: string;
      description: string;
    }>;
    services: Array<{
      title: string;
      description: string;
      features: string[];
    }>;
    process: Array<{
      title: string;
      description: string;
    }>;
    benefits: string[];
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export const services: ServiceType[] = [
 
  {
    id: 'video-production',
    title: 'VIDEO PRODUCTION',
    description: 'From compelling documentaries to high-energy event coverage, expert editing ensures every frame delivers maximum visual impact.',
    icon: Video,
    features: [
      'Professional documentaries',
      'Event coverage & highlight reels',
      'Corporate & promotional videos'
    ],
    details: {
      heroTitle: 'Video Production',
      heroDescription: 'Transforming ideas into compelling visual narratives that captivate, inspire, and drive action across Africa and beyond.',
      overview: 'From concept to final cut, we deliver exceptional video content that tells your story with authenticity and impact. Our team combines technical expertise with creative vision to produce videos that resonate with your audience and achieve your objectives.',
      stats: [
        { number: '150+', label: 'Videos Produced' },
        { number: '50+', label: 'Documentaries' },
        { number: '10M+', label: 'Views Generated' }
      ],
      excellencePoints: [
        {
          title: 'Documentary Excellence',
          description: 'Award-winning documentaries that capture real stories with emotional depth and visual brilliance.'
        },
        {
          title: 'Corporate Storytelling',
          description: 'Professional corporate videos that effectively communicate your brand message and values.'
        },
        {
          title: 'Event Coverage',
          description: 'Comprehensive event documentation that captures every important moment and emotion.'
        }
      ],
      services: [
        {
          title: 'Documentary Production',
          description: 'Comprehensive documentary services from research and scripting to filming and post-production.',
          features: [
            'Research & Development',
            'Scriptwriting & Storyboarding',
            'Multi-camera Filming',
            'Professional Editing',
            'Color Grading & Sound Design'
          ]
        },
        {
          title: 'Corporate Videos',
          description: 'Professional corporate content that enhances your brand image and communicates effectively.',
          features: [
            'Company Profiles',
            'Training Videos',
            'Product Demonstrations',
            'Executive Interviews',
            'Annual Reports'
          ]
        },
        {
          title: 'Promotional Content',
          description: 'Engaging promotional videos that drive awareness and convert viewers into customers.',
          features: [
            'Brand Commercials',
            'Social Media Content',
            'Product Launches',
            'Campaign Videos',
            'Testimonial Videos'
          ]
        },
        {
          title: 'Event Coverage',
          description: 'Complete event documentation with multiple camera angles and professional editing.',
          features: [
            'Conference Coverage',
            'Wedding Cinematography',
            'Concert Recording',
            'Awards Ceremonies',
            'Cultural Events'
          ]
        },
        {
          title: 'Educational Content',
          description: 'Informative and engaging educational videos for institutions and organizations.',
          features: [
            'Training Materials',
            'E-learning Content',
            'Instructional Videos',
            'Academic Documentaries',
            'Online Courses'
          ]
        },
        {
          title: 'Music Videos',
          description: 'Creative music video production that brings artistic vision to life with style and impact.',
          features: [
            'Concept Development',
            'Location Scouting',
            'Performance Filming',
            'Special Effects',
            'Creative Editing'
          ]
        }
      ],
      process: [
        {
          title: 'Discovery & Planning',
          description: 'We start by understanding your vision, objectives, and target audience to create a comprehensive production plan.'
        },
        {
          title: 'Pre-Production',
          description: 'Scriptwriting, storyboarding, casting, location scouting, and all logistical preparations.'
        },
        {
          title: 'Production',
          description: 'Professional filming with state-of-the-art equipment and experienced crew members.'
        },
        {
          title: 'Post-Production',
          description: 'Expert editing, color correction, sound design, and visual effects to perfect your video.'
        },
        {
          title: 'Delivery & Distribution',
          description: 'Final delivery in your preferred formats and assistance with distribution strategy.'
        }
      ],
      benefits: [
        'High-quality production values',
        'Professional equipment and crew',
        'Creative storytelling approach',
        'Fast turnaround times',
        'Competitive pricing'
      ],
      faqs: [
        {
          question: 'How long does video production take?',
          answer: 'The timeline varies depending on project complexity, but most projects are completed within 2-6 weeks from pre-production to final delivery.'
        },
        {
          question: 'What equipment do you use?',
          answer: 'We use professional-grade 4K cameras, cinema lenses, professional audio equipment, and industry-standard editing software.'
        }
      ]
    }
  },
  
  {
    id: 'photography',
    title: 'PHOTOGRAPHY',
    description: 'Capturing emotion, identity, and purpose in every shot with authentic African perspective from field to studio.',
    icon: Camera,
    features: [
      'Photojournalism & storytelling',
      'Event & conference coverage',
      'Studio portraits & branding'
    ],
    details: {
      heroTitle: 'Photography',
      heroDescription: 'Capturing authentic African stories through powerful imagery that speaks to hearts and minds across cultures and continents.',
      overview: 'Our photography captures the essence of African stories with emotional depth and visual brilliance. From intimate portraits to large-scale events, we create images that resonate and inspire.',
      stats: [
        { number: '5000+', label: 'Photos Captured' },
        { number: '100+', label: 'Events Covered' },
        { number: '50+', label: 'Corporate Clients' }
      ],
      excellencePoints: [
        {
          title: 'Portrait Excellence',
          description: 'Professional portraits that capture personality and character with stunning clarity.'
        },
        {
          title: 'Event Photography',
          description: 'Comprehensive event coverage that captures every important moment and emotion.'
        },
        {
          title: 'Photojournalism',
          description: 'Authentic storytelling through documentary-style photography.'
        }
      ],
      services: [
        {
          title: 'Portrait Photography',
          description: 'Professional portraits for individuals, families, and corporate executives.',
          features: [
            'Executive Portraits',
            'Family Photography',
            'Individual Sessions',
            'Corporate Headshots',
            'Personal Branding'
          ]
        },
        {
          title: 'Event Photography',
          description: 'Complete event coverage from intimate gatherings to large conferences.',
          features: [
            'Wedding Photography',
            'Corporate Events',
            'Conferences & Seminars',
            'Cultural Celebrations',
            'Award Ceremonies'
          ]
        },
        {
          title: 'Commercial Photography',
          description: 'Professional commercial imagery for businesses and organizations.',
          features: [
            'Product Photography',
            'Corporate Photography',
            'Architectural Shoots',
            'Industrial Photography',
            'Marketing Materials'
          ]
        }
      ],
      process: [
        {
          title: 'Consultation',
          description: 'We discuss your vision, goals, and specific requirements for the photoshoot.'
        },
        {
          title: 'Planning',
          description: 'Location scouting, equipment preparation, and shot list creation.'
        },
        {
          title: 'Shooting',
          description: 'Professional photography session with attention to lighting, composition, and detail.'
        },
        {
          title: 'Editing',
          description: 'Professional retouching and color correction to ensure the highest quality final images.'
        }
      ],
      benefits: [
        'High-resolution images',
        'Professional lighting and composition',
        'Quick turnaround on edits',
        'Multiple format delivery options',
        'Commercial usage rights'
      ],
      faqs: [
        {
          question: 'How many photos will I receive?',
          answer: 'The number varies by package, but we typically deliver 30-50 edited images per hour of shooting.'
        },
        {
          question: 'Do you provide prints?',
          answer: 'Yes, we offer professional printing services with various paper and finish options.'
        }
      ]
    }
  },
  {
    id: 'live-streaming',
    title: 'LIVE STREAMING',
    description: 'Professional live event production and technical support.',
    icon: Speaker,
    features: [
      'Live event streaming',
      'Technical direction',
      'Equipment rental'
    ],
    details: {
      heroTitle: 'Live Streaming',
      heroDescription: 'Connect with global audiences through seamless live streaming. Professional broadcasting that transcends borders and brings your events to the world.',
      overview: 'Professional broadcasting for every platform and audience with reliable technical support and crystal-clear streaming quality.',
      stats: [
  { number: '500+', label: 'Live Events' },
        { number: '50M+', label: 'Viewers Reached' },
        { number: '99.9%', label: 'Uptime Record' }
      ],
      excellencePoints: [
        {
          title: 'Multi-Platform Broadcasting',
          description: 'Simultaneous streaming to multiple platforms for maximum reach and engagement.'
        },
        {
          title: 'Technical Excellence',
          description: 'Professional equipment and experienced crew ensure flawless live production.'
        },
        {
          title: 'Interactive Features',
          description: 'Real-time chat, Q&A, and audience engagement tools for immersive experiences.'
        }
      ],
      services: [
        {
          title: 'Conference Streaming',
          description: 'Professional live streaming for conferences, seminars, and corporate events.',
          features: [
            'Multi-camera Setup',
            'Interactive Q&A',
            'Screen Sharing',
            'Recording Options',
            'Global Distribution'
          ]
        },
        {
          title: 'Event Broadcasting',
          description: 'Live streaming for concerts, festivals, and entertainment events.',
          features: [
            'Concert Streaming',
            'Festival Coverage',
            'Awards Shows',
            'Cultural Events',
            'Sports Events'
          ]
        },
        {
          title: 'Educational Streaming',
          description: 'Live streaming solutions for educational institutions and training programs.',
          features: [
            'Virtual Classrooms',
            'Webinar Hosting',
            'Training Sessions',
            'Lecture Capture',
            'Student Interaction'
          ]
        }
      ],
      process: [
        {
          title: 'Pre-event Planning',
          description: 'Technical consultation and streaming setup planning based on your requirements.'
        },
        {
          title: 'Equipment Setup',
          description: 'Installation and testing of cameras, audio equipment, and streaming infrastructure.'
        },
        {
          title: 'Live Production',
          description: 'Real-time streaming management with technical support and quality monitoring.'
        },
        {
          title: 'Post-Event Services',
          description: 'Recording delivery and analytics reporting for your live event.'
        }
      ],
      benefits: [
        'Multi-platform streaming',
        'Real-time technical support',
        'HD/4K quality streaming',
        'Interactive audience features',
        'Recording and archival services'
      ],
      faqs: [
        {
          question: 'Can you stream to multiple platforms simultaneously?',
          answer: 'Yes, we can broadcast to YouTube, Facebook, LinkedIn, and other platforms simultaneously.'
        },
        {
          question: 'What happens if there are technical issues during the stream?',
          answer: 'Our technical team monitors the stream in real-time and has backup systems ready to ensure minimal disruption.'
        }
      ]
    }
  },
  {
    id: 'audio-production',
    title: 'AUDIO PRODUCTION',
    description: 'Crystal clear sound design and audio production for all your media needs.',
    icon: Mic,
    features: [
      'Voice-over recording',
      'Sound design & mixing',
      'Podcast production'
    ],
    details: {
      heroTitle: 'Audio Production',
      heroDescription: 'Crystal-clear audio production that captures the authentic voice of Africa. Professional recording, mixing, and mastering services.',
      overview: 'Professional audio solutions from recording to final master, delivering studio-quality sound for all your projects.',
      stats: [
        { number: '500+', label: 'Audio Projects' },
        { number: '100+', label: 'Podcasts Produced' },
        { number: '50+', label: 'Music Tracks' }
      ],
      excellencePoints: [
        {
          title: 'Studio Quality Recording',
          description: 'State-of-the-art recording facilities with professional-grade equipment.'
        },
        {
          title: 'Expert Sound Design',
          description: 'Creative audio solutions that enhance your content and engage your audience.'
        },
        {
          title: 'Multi-format Delivery',
          description: 'Audio delivered in all required formats for various platforms and uses.'
        }
      ],
      services: [
        {
          title: 'Podcast Production',
          description: 'Complete podcast production from recording to distribution.',
          features: [
            'Recording Sessions',
            'Audio Editing',
            'Sound Design',
            'Mastering',
            'Distribution Setup'
          ]
        },
        {
          title: 'Music Production',
          description: 'Professional music recording, mixing, and mastering services.',
          features: [
            'Multi-track Recording',
            'Mixing & Mastering',
            'Instrument Recording',
            'Vocal Production',
            'Beat Making'
          ]
        },
        {
          title: 'Voice Over Services',
          description: 'Professional voice over recording for commercials and narrations.',
          features: [
            'Commercial Voice Overs',
            'Documentary Narration',
            'E-learning Audio',
            'IVR Recordings',
            'Audio Book Production'
          ]
        }
      ],
      process: [
        {
          title: 'Pre-Production Planning',
          description: 'Script review, talent selection, and technical preparation for your audio project.'
        },
        {
          title: 'Recording Session',
          description: 'Professional recording in our studio or on-location with high-quality equipment.'
        },
        {
          title: 'Post-Production',
          description: 'Audio editing, mixing, sound design, and mastering to broadcast standards.'
        },
        {
          title: 'Final Delivery',
          description: 'Delivery of final audio files in your preferred formats and specifications.'
        }
      ],
      benefits: [
        'Professional studio facilities',
        'Experienced audio engineers',
        'Custom sound design',
        'Fast turnaround times',
        'Multi-format delivery'
      ],
      faqs: [
        {
          question: 'Do you offer remote recording services?',
          answer: 'Yes, we can provide remote recording solutions and work with talent anywhere in the world.'
        },
        {
          question: 'What audio formats do you deliver?',
          answer: 'We deliver in all standard formats including WAV, MP3, AIFF, and others based on your requirements.'
        }
      ]
    }
  },
  {
    id: 'sound-systems',
    title: 'SOUND SYSTEM',
    description: 'Professional sound equipment and audio engineering for events of all sizes.',
    icon: Speaker,
    features: [
      'Sound system rental',
      'Audio engineering',
      'Event technical support'
    ],
    details: {
      heroTitle: 'Sound System Rental',
      heroDescription: 'Premium sound equipment and professional audio engineering for events of all sizes. Crystal-clear audio that reaches every corner.',
      overview: 'Professional-grade audio equipment from leading brands with experienced audio engineers to ensure perfect sound for your event.',
      stats: [
        { number: '300+', label: 'Events Powered' },
        { number: '50K+', label: 'Attendees Reached' },
        { number: '100%', label: 'Audio Clarity' }
      ],
      excellencePoints: [
        {
          title: 'Premium Equipment',
          description: 'Professional-grade audio equipment from leading international brands.'
        },
        {
          title: 'Expert Engineering',
          description: 'Experienced audio engineers ensure optimal sound quality for every event.'
        },
        {
          title: 'Complete Solutions',
          description: 'Full-service audio solutions from setup to breakdown with technical support.'
        }
      ],
      services: [
        {
          title: 'Conference Audio',
          description: 'Professional audio systems for conferences and business events.',
          features: [
            'Wireless Microphones',
            'Speaker Arrays',
            'Mixing Consoles',
            'Recording Systems',
            'Technical Support'
          ]
        },
        {
          title: 'Event Audio',
          description: 'High-quality sound systems for weddings and celebrations.',
          features: [
            'PA Systems',
            'Background Music',
            'DJ Equipment',
            'Dance Floor Audio',
            'Ceremony Sound'
          ]
        },
        {
          title: 'Concert Systems',
          description: 'Powerful audio systems for concerts and large gatherings.',
          features: [
            'Line Array Systems',
            'Stage Monitors',
            'Digital Mixing',
            'Effects Processing',
            'Audio Engineering'
          ]
        }
      ],
      process: [
        {
          title: 'Consultation & Planning',
          description: 'We assess your venue and audio requirements to design the optimal sound system.'
        },
        {
          title: 'Equipment Setup',
          description: 'Professional installation and testing of all audio equipment before your event.'
        },
        {
          title: 'Event Support',
          description: 'On-site audio engineering and technical support throughout your event.'
        },
        {
          title: 'Breakdown & Collection',
          description: 'Professional equipment removal and breakdown after your event concludes.'
        }
      ],
      benefits: [
        'Professional-grade equipment',
        'Experienced audio engineers',
        'Complete setup and support',
        'Flexible rental packages',
        'Emergency backup systems'
      ],
      faqs: [
        {
          question: 'Do you provide audio engineers for events?',
          answer: 'Yes, all our sound system rentals include experienced audio engineers for setup and operation.'
        },
        {
          question: 'What size events can you handle?',
          answer: 'We provide sound systems for events ranging from 50 to 50,000+ attendees.'
        }
      ]
    }
  },
  {
    id: 'lighting',
    title: 'LIGHTING',
    description: 'Transform your event with stunning lighting design. From intimate gatherings to grand celebrations, we create the perfect ambiance.',
    icon: Lightbulb,
    features: [
      'Wedding lighting',
      'Corporate event lighting',
      'Concert lighting',
      'Custom lighting design'
    ],
    details: {
      heroTitle: 'Professional Lighting',
      heroDescription: 'Transform your event with stunning lighting design. From intimate gatherings to grand celebrations, we create the perfect ambiance.',
      overview: 'Professional lighting solutions that set the perfect mood for any occasion, from elegant weddings to high-energy concerts.',
      stats: [
        { number: '400+', label: 'Events Illuminated' },
        { number: '50+', label: 'Lighting Designs' },
        { number: '100%', label: 'Custom Solutions' }
      ],
      excellencePoints: [
        {
          title: 'Design Consultation',
          description: 'We understand your vision and create a custom lighting plan'
        },
        {
          title: 'Equipment Setup',
          description: 'Professional installation of all lighting equipment and systems'
        },
        {
          title: 'Live Operation',
          description: 'Skilled technicians operate lighting throughout your event'
        }
      ],
      services: [
        {
          title: 'Wedding Lighting',
          description: 'Romantic and elegant lighting for your special day.',
          features: [
            'Ceremony Lighting',
            'Reception Ambiance',
            'Dance Floor Effects',
            'Uplighting',
            'String Lights'
          ]
        },
        {
          title: 'Corporate Events',
          description: 'Professional lighting for business events and conferences.',
          features: [
            'Stage Lighting',
            'Presentation Setup',
            'Brand Color Themes',
            'Architectural Lighting',
            'LED Displays'
          ]
        },
        {
          title: 'Concert Lighting',
          description: 'Dynamic lighting systems for concerts and performances.',
          features: [
            'Moving Head Lights',
            'Laser Effects',
            'Strobe Systems',
            'Color Changing LEDs',
            'Fog Machines'
          ]
        }
      ],
      process: [
        {
          title: 'Design Consultation',
          description: 'We understand your vision and create a custom lighting plan'
        },
        {
          title: 'Equipment Setup',
          description: 'Professional installation of all lighting equipment and systems'
        },
        {
          title: 'Live Operation',
          description: 'Skilled technicians operate lighting throughout your event'
        },
        {
          title: 'Complete Support',
          description: 'Full technical support and equipment removal after your event'
        }
      ],
      benefits: [
        'Professional-grade lighting equipment',
        'Custom lighting designs',
        'Experienced lighting technicians',
        'Flexible rental packages',
        'Full setup and teardown'
      ],
      faqs: [
        {
          question: 'What types of events do you provide lighting for?',
          answer: 'We provide lighting solutions for all types of events including weddings, corporate events, concerts, private parties, and more.'
        },
        {
          question: 'Do you provide lighting design services?',
          answer: 'Yes, our team of lighting designers will work with you to create a custom lighting plan that matches your vision and venue requirements.'
        }
      ]
    }
  },
];

export const getServiceById = (id: string) => {
  return services.find(service => service.id === id);
};
