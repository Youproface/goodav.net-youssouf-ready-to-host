import { useState } from 'react';

// Home videos with custom thumbnails
const HOME_VIDEOS = [
  {
    id: 'HyHigPOWxYs',
    title: "GoodAV: Impactful Storytelling\nOur journey and vision for the future",
    // No custom thumb, will use YouTube default
  },
  {
    id: 'QuQ_TyWyFUs',
    title: "Epic Behind-the-Scenes Cinematic | GoodAV Field Team in Action",
    // No custom thumb, will use YouTube default
  },
  {
    id: 'e8DZQifSpcY',
    title: "AI-Powered Visual Marketing\nShowcasing our cutting-edge innovation capabilities",
    // No custom thumb, will use YouTube default
  },
  // Recent project videos from home page
  { id: 'CsdRr8Fvt2g', title: 'Women Leading the Way: Innovation in the Fight Against HIV | #IAS2025' },
  { id: 'HgPGMQuZMn0', title: 'Why Partnership is Key to Ending the HIV Epidemic | Linda-Gail Bekker' },
  { id: 'Ge26tZmJRQ0', title: 'IAS 2025 Mid Conference Recap' },
  { id: 'uWzSA73tp9k', title: 'IAS 2025 DAY 3 RECAP' },
  { id: 'wpYU4WelU0Y', title: 'IAS 2025 Day 1 Recap' },
];

// Vertical videos (YouTube Shorts)
const VERTICAL_VIDEOS = [
  { id: 'n6p2M5KXPxg', title: "Project Highlights" },
  { id: 'u1pQSzJ-X2E', title: "Vertical Highlight" },
  { id: 'yqonSrYkOqw', title: "Vertical Highlight" },
  { id: '08-jnMACIxQ', title: "Vertical Highlight" },
  { id: 'w8CiO2tAZCA', title: "Vertical Highlight" },
  { id: 'FJbRwQBkFQo', title: "Vertical Highlight" },
  { id: 'zNpcZ3etmJE', title: "Vertical Highlight" },
  { id: 'pfNUJeuFQNw', title: "Vertical Highlight" },
  { id: 'GzhLLtxdwiw', title: "Vertical Highlight" },
];

// Portfolio videos (with fixed links and new video added)
const PORTFOLIO_VIDEOS = [
  { id: 'X9QGsDfCLDA', title: "USAID | BIASHARA AFRICA GTI2 LAUNCH" },
  { id: 'mPg62W1k0GM', title: "AIMS Graduation" },
  { id: 'k0yiRBYhfdU', title: "ReCIC: How Clean Cooking Is Transforming Lives, Climate & Communities in Rwanda" },
  { id: '5Cjbze8jBIA', title: "Africa's Business Heroes (ABH) 2023 RECAP VIDEO" },
  { id: 'ydWaP0-Bi_8', title: "Rwanda from Despair to Hope" },
  { id: 'jFWAgnAkD8k', title: "NEF Global Gathering highlight reel" },
  { id: 'QMRA7bNMi1k', title: "The #AfCFTA is #Africa's best chance at accelerating development" },
  { id: 'NxLQiDbXxUk', title: "COP28: The Impossible Dream: lets act now" },
  { id: 'a0GyLzJrVTM', title: "The Youth Cafe | UNDP" },
  { id: '3J6nTSc3SkM', title: "SONARWA LABOR DAY" },
  { id: 'DrT8QQoSJi4', title: "BUBR Documentary Chapter 2 Rwanda" },
  { id: 'oiL9hp1btjc', title: "Sonarwa Life Dusangire Launch" },
  { id: 'UAO6T2hDqWU', title: "#KeplerGrad | Class of 2024 Celebrating Achievements & Impact | 01 November 2024 Kepler" },
  { id: '8r27UYS-qaM', title: "Year in Review and Holiday Greetings from Kepler's CEO Nathalie Munyampenda | 2023 Kepler" },
  { id: 'g9xSgGRRrL0', title: "INTERNATIONAL STUDENTS AT KEPLER COLLEGE Kepler" },
  { id: 'O-bQXQctLJk', title: "RSSB signed an MoU with the Ministry of Health, IRCAD AFRICA and King Faisal Hospital Rwanda." },
  { id: 'ekaDY3S7bIk', title: "Cimerwa Documentary" },
  { id: 'EQdb0uKpg8A', title: "Rwanda Coffee Project - The Coffee Market Building for Peace and Prosperity Project" },
  { id: 'pIld8HxDAWQ', title: "The risk Governance in Rwanda| MINEMA" },
  { id: '1iBUUd04ap0', title: "Customer Centric Culture Main Video for Customer Service Week" },
  { id: '-gWxCpGePoI', title: "Gashora GirlsAcademy Igitaramo" },
  { id: 'iuVhdo1KDAw', title: "ReSAKSS" },
  { id: 'm7X7Wc4GDlA', title: "SONARWA LABOR DAY 1" },
  { id: 'GxSdzkkzawA', title: "AGCCI Cohort 2 Short" },
  { id: 'z5Zm1BG9vFc', title: "DAY 6 Kigali Muhanga" },
  { id: 'nuYQUypGUJg', title: "DAY 5 Rubavu KGL" },
  { id: 'DJomISAEqUA', title: "DAY 4 KIGALI Musanze" },
  { id: 'S6QEONDEhvY', title: "DAY 1 KIGALI NYAMATA" },
  { id: 'JQtxbW0Tfyc', title: "#AEC  HIGHLIGHT" },
  { id: '2KOHCOg6aRo', title: "Mariya Yohana: Twongere Twibuke Perfomance" },
  { id: 'GaT9R1Dkuhs', title: "Celebrating ICPD25 in Rwanda a story of change through Inanga" },
  { id: 'LZoUzSVFO0c', title: "Mobisol Noheli Iwacu Tv AD" },
  { id: 'MEeSUlN4PbA', title: "Just MOMO The Gift - MTN" },
  { id: 'voBWRVs6SAc', title: "Achievements of the ASPIRE Programme" },
  { id: 'OjDScdrYm8w', title: "Kepler Gym" },
  { id: 'LCllChb326E', title: "Teaser We made for NEF GG" },
  { id: 'N-kaJpP6UW4', title: "M23 and the DR Congo The origins of a complicated conflict" },
  { id: 'vJvAXgnQplk', title: "Miss Rwanda Talent Show┃created by Goodav┃ Flashback" },
  { id: '92XGK353E_E', title: "All highlights of Miss Rwanda Flashback Combined┃created by Goodav" },
  { id: 'iBUxkpNdXZ0', title: "Smart Class Room Launch Rwanda AIMS" },
  { id: 'acOICw-Z8gU', title: "ASAFR AllSightsAfrica" },
  { id: 'UJQWe0zPxcA', title: "GENDER SUMMIT highlight" },
  { id: 'XN0BGHRe6FE', title: "ALN beats of boldness Day three including Bruce Melody and Patoranking" },
  { id: 'O8KgYZy3gxU', title: "ALN beats of boldness" },
  { id: 'HH-DM8h27Qc', title: "Paul Kagame's Inspiring Journey ( the President of the Republic of Rwanda)" },
  { id: 'B1ihjDs5K8Q', title: "The Power of USAID HANGA AKAZI: Changing Lives Fast" },
  { id: 'Rt9Bsrsng0M', title: "UNDP work-life balance" },
  { id: '25MQcKjepJo', title: "Ibere rya Bigogwe The Ultimate Cow Experience in Rwanda" },
  { id: 'L35E2Rpv95Q', title: "Africa's share of climate change responsibility remains minute but the burden is shared" },
  { id: '2lfU9SWRxrU', title: "1st Ordinary Session of the 5th Pan African Parliament" },
  { id: 'xceOolaMwVs', title: "African Economic Conference highlight" },
  { id: 'OyKf8xm06cw', title: "Youth Connekt Africa Summit opening ceremony highlights" },
  { id: 'o46mz0pKZyc', title: "SDGs Implementation in Africa Reflections on a Three-Year Journey day 1 highlight" },
  { id: 'q9oAUoDXV4U', title: "African Economic Conference highlight" },
  { id: 'KqpaO22Djx8', title: "Transform Africa Summit Preparation" },
  { id: 'eUIcNtPSxIU', title: "Impact of Partners in health - Rwanda" },
  { id: '-AxxDRyNd80', title: "Completion of NYUNGWE CLUSTER, World Vision Achievements" },
  { id: 'ITF54ZLAjyM', title: "SIDA Joint Project Key Achievements" },
  { id: 'K1X-VYTMPo8', title: "EO SPOT ENG Rwanda Revenue Authority - RRA" },
  { id: '1867pEefRVk', title: "WASH VIDEO" },
  { id: 'IQE3ZDIsV-4', title: "Completion of NYUNGWE CLUSTER, World Vision Achievements" },
  { id: 'r1LgmIiq2Cs', title: "Completion of NYUNGWE CLUSTER, World Vision Achievements" },
  { id: 'RklfarDKsvY', title: "NGENDA API Achievements." },
  { id: 'cHF-r2_o4dk', title: "TechnoServe Works in Rwanda" },
  { id: 'a0GyLzJrVTM', title: "InshutiFriends S02E01 RWANDAN SITCOM" },
  { id: 'XeYldO4e2KU', title: "Kanura Tv Series Official Trailer" },
  { id: 'KLUq0pgZG-8', title: "MFA PROMO Video (film school academy tv promo)" },
  { id: 'FwL-RSkEi8Y', title: "STROMAE LIVE IN KIGALI highlights" },
  { id: 'rzHSv_z6GT0', title: "SEBURIKOKO Tv Series official Trailler" },
  { id: 'GYxmhTgCWMA', title: "Nyange Village challenges" },
  { id: 'qo4NPjCtSQk', title: "THE JOAN TALK SHOW" },
  { id: 'jFWAgnAkD8k', title: "NEF Global Gathering highlight reel" },
  { id: 'fTwvL8FLnL8', title: "Two Decades of Empowering Youth | Kepler" },
  { id: 'gPiMpj2BpxE', title: "#AEC DAY 3 HIGHLIGHT" },
  { id: 'TuuuO-WfD3s', title: "#AEC DAY 3 HIGHLIGHT" },
  { id: 'ZNJHy-JcWzI', title: "UNDP GOMERA MAXWELL on SDG" },
  { id: '55yTPL1o-_M', title: "NEF Corporate video" },
  { id: 'Ja36-ZFELg8', title: "AIMS Corporate Video" },
  { id: 'L8h9cLK94D0', title: "The Connected GirlsHub" },
  { id: '_bB0IXCcIvI', title: "Work Integrated Learning (WIL) Institute | AIMS" },
  { id: 'kyGXssz7OVU', title: "Uko uhugurirwa kuba Ofisiye muto muri Polisi y'u Rwanda ategurwa" },
  { id: 'O-bQXQctLJk', title: "RSSB signed an MoU with the Ministry of Health, IRCAD AFRICA and King Faisal Hospital Rwanda." },
  { id: 'Chdk4A-kgIA', title: "Bralirwa Digital Back Bone | DBB GO Live Event" },
  { id: 'fTwvL8FLnL8', title: "Two Decades of Empowering Youth | Kepler" },
  { id: 'HX_BA5zkOgo', title: "SONARWA | DusangireLunch no Gutera Ibiti muri GS Rushubi" },
  { id: '7BSqXwAka4k', title: "Bralirwa Launch New Production Line" },
  { id: 'GxSdzkkzawA', title: "CAfrican Girls Can Code Initiative (AGCCI) Cohort 2 | UN Women" },
  { id: 'O-bQXQctLJk', title: "RSSB signed an MoU with the Ministry of Health, IRCAD AFRICA and King Faisal Hospital Rwanda." }
];

const ALL_VIDEOS = [
  ...HOME_VIDEOS,
  ...PORTFOLIO_VIDEOS,
  ...VERTICAL_VIDEOS,
];

export default function PortFolio() {
  const [selectedVideo, setSelectedVideo] = useState(HOME_VIDEOS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);

  function getThumbnail(video) {
    if (video.thumb) return video.thumb;
    // Shorts and normal videos use YouTube default thumbnail
    return `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
  }

  return (
    <main className="bg-[#0f1012] text-zinc-100 min-h-screen px-4 py-0 relative">
      {/* Full-bleed hero header (moved out of centered container) */}
  <header className="relative mt-10 py-32 px-4 -mx-4 sm:-mx-6 md:-mx-8 bg-transparent text-center mb-10 flex flex-col items-center justify-center min-h-[340px]">
        <div className="absolute inset-0">
          <img
            src="/images/all_site_images/Home/BG/Home_BG.png"
            alt="Portfolio Hero Background"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0f1012]" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent tracking-tight mb-4">
            PORTFOLIO
          </h1>
          <p className="text-zinc-200 text-xl md:text-2xl font-medium max-w-2xl mx-auto">
            Ready to bring your vision to life? Explore our recent audiovisual projects and creative highlights. Let's create something extraordinary together.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto relative">
        {/* Main video player always visible (styled like FeaturedProjects) */}
  <div className="sticky top-16 z-40 bg-[#0f1012] pb-8"> 
          <div className="relative w-full max-w-3xl mx-auto aspect-video mb-4 rounded-lg overflow-hidden glass-card shadow-glow border-2 border-primary/30">
            {!isPlaying ? (
              <>
                {/* Thumbnail placeholder (privacy-friendly) */}
                <img
                  src={`https://img.youtube.com/vi/${selectedVideo}/hqdefault.jpg`}
                  alt={ALL_VIDEOS.find(v => v.id === selectedVideo)?.title || 'Video thumbnail'}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Play button (no dark overlay so thumbnail shows at 100%) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="z-30 w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground shadow-glow flex items-center justify-center"
                    aria-label="Play video"
                  >
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                      {ALL_VIDEOS.findIndex(v => v.id === selectedVideo) < HOME_VIDEOS.length ? 'Featured' : 'Portfolio'}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg md:text-xl font-semibold line-clamp-2">
                    {ALL_VIDEOS.find(v => v.id === selectedVideo)?.title}
                  </h3>
                </div>
              </>
            ) : (
              <>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                  title={ALL_VIDEOS.find(v => v.id === selectedVideo)?.title || 'YouTube video player'}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full absolute inset-0"
                />
                <noscript>
                  <a href={`https://www.youtube.com/watch?v=${selectedVideo}`} target="_blank" rel="noopener noreferrer" className="sr-only">Open video in new tab</a>
                </noscript>
              </>
            )}
          </div>

          {/* Visible title kept for accessibility but hidden visually to avoid duplication */}
          <h2 className="sr-only">
            {ALL_VIDEOS.find(v => v.id === selectedVideo)?.title}
          </h2>
        </div>
        {/* Video grid - styled like FeaturedProjects cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {ALL_VIDEOS.map((video, idx) => {
            const isHome = idx < HOME_VIDEOS.length;
            const isPortfolio = idx >= HOME_VIDEOS.length && idx < HOME_VIDEOS.length + PORTFOLIO_VIDEOS.length;
            const category = isHome ? 'Featured' : isPortfolio ? 'Portfolio' : 'Short';

            return (
              <div key={video.id + idx} className="group relative rounded-lg overflow-hidden glass-card shadow-md hover:shadow-xl transition-all duration-300">
                <button
                  onClick={() => { setSelectedVideo(video.id); setIsPlaying(true); }}
                  aria-label={`Play video ${video.title}`}
                  className={`relative w-full h-full block focus:outline-none`}
                >
                  <div className="w-full aspect-video overflow-hidden relative">
                    <img
                      src={getThumbnail(video)}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                      loading="lazy"
                    />
                    {/* darker overlay by default, much darker on hover */}
                    {/* removed dark overlay so thumbnails are fully visible */}
                  </div>

                  {/* Keep thumbnail clear by default. Show a bottom gradient on hover and a small pill for the title */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* subtle overall tint on hover only */}
                    {/* keep hover tint removed so thumbnails stay clear */}
                    {/* bottom gradient that appears on hover to improve caption contrast */}
                    {/* bottom gradient removed to keep full visibility */}
                  </div>

                  {/* Bottom title pill - readable without darkening the whole thumbnail */}
                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                    <div className="inline-block bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md group-hover:bg-black/60 transition-colors duration-200">
                      <h3 className="text-sm font-semibold line-clamp-2" title={video.title}>{video.title}</h3>
                    </div>
                  </div>

                </button>

                {/* Decorative border */}
                <div className="absolute inset-0 rounded-lg pointer-events-none" aria-hidden>
                  <div className={`absolute inset-0 rounded-lg border-2 border-primary/40`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
