import { useNavigate, useLocation } from 'react-router-dom';
import { CaseStudyData } from '../types/caseStudy';

// Default case study data in case none is passed
const defaultCaseStudy: CaseStudyData = {
  id: 'default',
  title: 'Project Title',
  description: 'A brief description of the project',
  content: {
    overview: 'Overview content goes here...',
    challenge: 'Challenge content goes here...',
    solution: 'Solution content goes here...',
    impact: 'Impact content goes here...',
  },
  image: '/src/assets/images/placeholder.svg',
  date: '2025',
  client: 'Client Name',
  category: 'Category',
};

interface LocationState {
  caseStudy?: CaseStudyData;
}

const CaseStudy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get case study data from location state or use default
  const state = location.state as LocationState;
  const caseStudy: CaseStudyData = state?.caseStudy || defaultCaseStudy;
  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen">
      {/* Hero Section with Project Header */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={caseStudy.image} 
          alt={caseStudy.title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
          <div className="max-w-6xl mx-auto">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              {caseStudy.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">{caseStudy.title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl">{caseStudy.description}</p>
            <div className="flex items-center mt-6 text-sm text-gray-400">
              <span className="mr-6">Client: {caseStudy.client}</span>
              <span>Year: {caseStudy.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header Navigation */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <div className="text-xl font-bold text-white flex items-center">
          <span className="mr-2">🔴</span> GoodAv
        </div>
        <nav className="hidden md:flex space-x-8">
          {['HOMEPAGE', 'ABOUT', 'PORTFOLIO', 'PARTNERSHIPS', 'BLOG', 'CONTACT'].map((item, index) => (
            <a 
              key={item} 
              href="#" 
              className={`text-sm font-medium transition-colors duration-300 ${
                item === 'PARTNERSHIPS' 
                  ? 'text-orange-500 border-b-2 border-orange-500 pb-1' 
                  : 'text-white hover:text-orange-500'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {caseStudy.testimonial && (
          <section className="mb-16">
            <div className="bg-gray-800 rounded-lg p-8">
              <div className="text-center">
                <span className="text-6xl text-gray-600">"</span>
                <p className="text-xl italic text-gray-300 mb-6">
                  {caseStudy.testimonial.text}
                </p>
                <div className="font-semibold">
                  <p className="text-white">{caseStudy.testimonial.author}</p>
                  <p className="text-orange-500">{caseStudy.testimonial.role}</p>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Project Overview */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <span className="text-orange-500 mr-3">🔍</span> Project Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-lg text-gray-300 mb-6">
                {caseStudy.content.overview}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-orange-500 font-semibold">CLIENT</h4>
                  <p>{caseStudy.client}</p>
                </div>
                <div>
                  <h4 className="text-orange-500 font-semibold">CATEGORY</h4>
                  <p>{caseStudy.category}</p>
                </div>
                <div>
                  <h4 className="text-orange-500 font-semibold">DATE</h4>
                  <p>{caseStudy.date}</p>
                </div>
                <div>
                  <h4 className="text-orange-500 font-semibold">STATUS</h4>
                  <p>Completed</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Project Highlights</h3>
              <ul className="space-y-3">
                {caseStudy.content.impact.split('.').filter(Boolean).map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    <span>{point.trim()}.</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="bg-gray-800 py-16 mt-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="text-orange-500 mr-3">💡</span> The Challenge
                </h3>
                <p className="text-gray-300">
                  {caseStudy.content.challenge}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="text-orange-500 mr-3">✨</span> Our Solution
                </h3>
                <p className="text-gray-300">
                  {caseStudy.content.solution}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Scope of Work Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <span className="text-orange-500 mr-3">🔧</span>Scope of Work
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video Production */}
            <div>
              <h4 className="font-semibold mb-4 text-orange-500 flex items-center">
                <span className="mr-2">🎥</span>Video Production
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Conference highlights and interviews
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Gilead booth footage
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Symposium sessions
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Street-style interview series
                </div>
              </div>
            </div>

            {/* Photography */}
            <div>
              <h4 className="font-semibold mb-4 text-orange-500 flex items-center">
                <span className="mr-2">📸</span>Photography
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Editorial portraits
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  LinkedIn-ready photos
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Booth activations
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Behind-the-scenes shots
                </div>
              </div>
            </div>

            {/* Drone Footage */}
            <div>
              <h4 className="font-semibold mb-4 text-orange-500 flex items-center">
                <span className="mr-2">🚁</span>Drone Footage
              </h4>
              <p className="text-sm text-gray-300">
                Aerial visuals capturing Kigali venues including Kimihurura, Kanyirya Hill, Mulamba, and the city center.
              </p>
            </div>

            {/* Sound Recording */}
            <div>
              <h4 className="font-semibold mb-4 text-orange-500 flex items-center">
                <span className="mr-2">🎵</span>Sound Recording
              </h4>
              <p className="text-sm text-gray-300">
                Clear audio capture for panel discussions, interviews, and voiceover elements.
              </p>
            </div>

            {/* Quick-Turn Editing */}
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-orange-500 flex items-center">
                <span className="mr-2">⚡</span>Quick-Turn Editing
              </h4>
              <p className="text-sm text-gray-300">
                Same-day delivery of edited content for use during the conference and on broadcast platforms.
              </p>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-orange-500 mr-3">📦</span>Deliverables
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-orange-500 mr-3">●</span>
                <span className="text-sm">3 Highlight Videos (Recaps & Cutdowns)</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-500 mr-3">●</span>
                <span className="text-sm">100+ High-Res Edited Photos</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-orange-500 mr-3">●</span>
                <span className="text-sm">2 "Street Style" Interview Films</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-500 mr-3">●</span>
                <span className="text-sm">Full Access to Raw Footage & Drone Assets</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-orange-500 mr-3">●</span>
                <span className="text-sm">1 Internal Sizzle Reel (No VO)</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-orange-500 mr-3">●</span>
                <span className="text-sm">Photography for CEO LinkedIn Feature</span>
              </div>
            </div>
          </div>
        </section>

        {/* What Made It Unique Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-orange-500 mr-3">⭐</span>What Made It Unique
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">🎯</span>
                <span>Local expertise combined with global production standards</span>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">🎬</span>
                <span>Filming across five high-traffic Kigali locations</span>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">📱</span>
                <span>Daily WhatsApp updates for international creative teams</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">🔬</span>
                <span>Pharmaceutical and regulatory compliance</span>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">🏨</span>
                <span>Additional client hospitality including Safari tour support</span>
              </div>
            </div>
          </div>
        </section>

       

        {/* Testimonials Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <span className="text-orange-500 mr-3">💬</span>What Our Partners Said
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <blockquote className="bg-gray-800 p-6 rounded-lg">
              <p className="text-sm text-gray-300 italic mb-4">
                "A huge thank you to you and the team, Yousouf! I've seen some of the initial edits — they're all so professional and beautiful!"
              </p>
              <footer className="text-xs">
                <div className="font-semibold text-orange-500">Michelle</div>
                <div className="text-gray-400">Creative Lead, Resilience Byrne</div>
              </footer>
            </blockquote>
            
            <blockquote className="bg-gray-800 p-6 rounded-lg">
              <p className="text-sm text-gray-300 italic mb-4">
                "Yes, thank you so much to everyone for all of your help! Really great work bringing this to life and all the content, photographs and the footage & photos are all looking really great."
              </p>
              <footer className="text-xs">
                <div className="font-semibold text-orange-500">Katie Link</div>
                <div className="text-gray-400">Producer, Resilience Byrne</div>
              </footer>
            </blockquote>
            
            <blockquote className="bg-gray-800 p-6 rounded-lg">
              <p className="text-sm text-gray-300 italic mb-4">
                "Just wanted to send a HUGE thank you to everyone for such an amazing experience in Kigali - I've never felt more looked after or thrilled."
              </p>
              <footer className="text-xs">
                <div className="font-semibold text-orange-500">Bonny Durie</div>
                <div className="text-gray-400">VP, Group Business Director, Resilience Byrne</div>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Outcome Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-orange-500 mr-3">🏆</span>Outcome
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            The resulting content was featured on broadcast platforms, used for Gilead's internal and public campaigns, and praised by both creative directors and clients. From drone visuals and live interviews to last-minute logistics and hospitality support, GoodAV delivered excellence with cultural fluency and technical precision.
          </p>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button onClick={() => navigate('/partner-with-us')} className="bg-gray-700 hover:bg-gray-600 py-3 px-6 rounded-md font-semibold text-sm transition-colors flex items-center">
            <span className="mr-2">←</span>BACK TO PARTNERSHIPS
          </button>
          <button onClick={() => navigate('/portfolio')} className="bg-gray-700 hover:bg-gray-600 py-3 px-6 rounded-md font-semibold text-sm transition-colors flex items-center">
            <span className="mr-2">📁</span>VIEW MORE PROJECTS
          </button>
          <button onClick={() => navigate('/contact')} className="bg-orange-500 hover:bg-orange-600 py-3 px-6 rounded-md font-semibold text-sm transition-colors flex items-center">
            <span className="mr-2">🚀</span>START YOUR PROJECT
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default CaseStudy;
