import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

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
  { id: 'n6p2M5KXPxg', title: "GOA Festival trailer 2025" },
  { id: 'u1pQSzJ-X2E', title: "Graduation photo shoot" },
  { id: 'yqonSrYkOqw', title: "Ikiganiro na Amb. Mathilde Mukantabana " },
  { id: '08-jnMACIxQ', title: "M23 and the DR Congo " },
  { id: 'w8CiO2tAZCA', title: "Kepler Women Basketball Club" },
  { id: 'FJbRwQBkFQo', title: "Thank You Paul Kagame!" },
  { id: 'zNpcZ3etmJE', title: "colourful dowry giving traditional" },
  { id: 'pfNUJeuFQNw', title: " Miss Iradukunda Elsa Wedding" },
  { id: 'GzhLLtxdwiw', title: "The Ultimate Cow Experience in Rwanda" },
];

// Portfolio videos (with fixed links and new video added)
const PORTFOLIO_VIDEOS = [
  { id: 'X9QGsDfCLDA', title: "USAID | BIASHARA AFRICA GTI2 LAUNCH" },
  { id: 'mPg62W1k0GM', title: "AIMS Graduation" },
    { id: 'k0yiRBYhfdU', title: "SNV: How Clean Cooking Is Transforming Lives, Climate & Communities in Rwanda" },
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
  { id: 'IQE3ZDIsV-4', title: "4th quarter income TAX" },
  { id: 'r1LgmIiq2Cs', title: "Completion of NYUNGWE CLUSTER, World Vision Achievements" },
  { id: 'RklfarDKsvY', title: "NGENDA API Achievements." },
  { id: 'cHF-r2_o4dk', title: "TechnoServe Works in Rwanda" },
  { id: 'a0GyLzJrVTM', title: "UNDP | Youth Cafe 1st Edition" },
  { id: 'XeYldO4e2KU', title: "Kanura Tv Series Official Trailer" },
  { id: 'KLUq0pgZG-8', title: "MFA PROMO Video (film school academy tv promo)" },
  { id: 'FwL-RSkEi8Y', title: "STROMAE LIVE IN KIGALI highlights" },
  { id: 'rzHSv_z6GT0', title: "SEBURIKOKO Tv Series official Trailler" },
  { id: 'GYxmhTgCWMA', title: "Nyange Village challenges" },
  { id: 'qo4NPjCtSQk', title: "THE JOAN TALK SHOW" },
  { id: 'jFWAgnAkD8k', title: "NEF Global Gathering highlight reel" },
  { id: 'fTwvL8FLnL8', title: "Two Decades of Empowering Youth | Kepler" },
  { id: 'gPiMpj2BpxE', title: "#AEC DAY 3 HIGHLIGHT" },
  { id: 'TuuuO-WfD3s', title: "The catalyst Workshop" },
  { id: 'ZNJHy-JcWzI', title: "UUNDP KWIBUKA 28" },
  { id: '55yTPL1o-_M', title: "NEF Corporate video" },
  { id: 'Ja36-ZFELg8', title: "AIMS Corporate Video" },
  { id: 'L8h9cLK94D0', title: "The Connected GirlsHub" },
  { id: '_bB0IXCcIvI', title: "Work Integrated Learning (WIL) Institute | AIMS" },
  { id: 'kyGXssz7OVU', title: "Uko uhugurirwa kuba Ofisiye muto muri Polisi y'u Rwanda ategurwa" },
  { id: 'O-bQXQctLJk', title: "RSSB signed an MoU with the Ministry of Health, IRCAD AFRICA and King Faisal Hospital Rwanda." },
  { id: 'Chdk4A-kgIA', title: "Bralirwa Digital Back Bone | DBB GO Live Event" },
  { id: 'fTwvL8FLnL8', title: "Two Decades of Empowering Youth | Kepler" },
  { id: 'HX_BA5zkOgo', title: "Kigali International Financial Centre Sustainable Finance Roadmap" },
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
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileClient, setProfileClient] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  // Set selectedVideo to null by default so preview is hidden until a video is clicked
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [category, setCategory] = useState<'All' | 'Featured' | 'Event' | 'Documentary' | 'Shorts'>('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'relevance' | 'title-asc' | 'title-desc'>('relevance');
  const PAGE_SIZE = 8;
  const [page, setPage] = useState(1);
  const playerRef = useRef<HTMLDivElement | null>(null);

  function getThumbnail(video) {
    if (video.thumb) return video.thumb;
    // Shorts and normal videos use YouTube default thumbnail
    return `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
  }

  // Deterministic, varied views count based on ID; keeps numbers stable across renders
  function deterministicViews(id: string, base = 500, spread = 50000) {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
    const v = base + (h % spread);
    return Math.max(100, v);
  }

  // Auto-label videos by type
  function autoLabel(video, source) {
    const t = video.title.toLowerCase();
    const brands = [
      'mtn', 'kepler', 'aims', 'usaid', 'undp', 'sonarwa', 'bralirwa', 'rssb', 'rra', 'mobisol', 'abhi', 'sida', 'world vision', 'partners in health', 'nef', 'aln', 'paul kagame', 'gender summit', 'miss rwanda', 'cop28', 'afcfta', 'bubr', 'aspire', 'cimerwa', 'agcci', 'aec', 'kanura', 'seburekoko', 'stromae', 'joan talk show', 'smart class room', 'ngenda api', 'technoserve', 'cafrica', 'inanga', 'muhanga', 'rubavu', 'nyamata', 'nyungwe', 'coffee', 'biashara', 'hiv', 'ias', 'un women', 'rcic', 'gashora', 'mariya yohana', 'icpd', 'mobisol', 'holiday', 'festival', 'gala', 'ceremony', 'summit', 'conference', 'event', 'launch', 'opening', 'closing', 'recap', 'highlight', 'feature', 'behind-the-scenes', 'client', 'company', 'brand', 'business', 'commercial', 'promo', 'ceo'
    ];
    if (source === 'Shorts') return 'Short';
    if (source === 'Featured') return 'Featured';
    for (const b of brands) {
      if (t.includes(b)) return 'Corporate';
    }
    if (/event|summit|conference|ceremony|festival|gala|performance|show|talk show|launch|opening|closing|day|week|session|recap|highlight|feature|behind-the-scenes/.test(t)) return 'Event';
    return 'Documentary';
  }

  // Assign real client names and varied views for portfolio videos
  const portfolioMetaMap = {
  'X9QGsDfCLDA': { client: 'USAID', views: 18900, duration: '5:12' },
  'mPg62W1k0GM': { client: 'AIMS', views: 12400, duration: '6:03' },
  'k0yiRBYhfdU': { client: 'SNV', views: 35600, duration: '7:45' },
  '5Cjbze8jBIA': { client: 'African Leadership University', views: 28500, duration: '4:58' },
  'a0GyLzJrVTM': { client: 'UNDP', views: deterministicViews('a0GyLzJrVTM', 3000, 15000), duration: '6:45' },
  'ydWaP0-Bi_8': { client: 'Ministry of National Unity & Civic Engagement', views: 9800, duration: '6:22' },
  'jFWAgnAkD8k': { client: 'Next Einsten Forum', views: 11200, duration: '5:40' },
  'QMRA7bNMi1k': { client: 'UNDP', views: 15400, duration: '6:10' },
  'NxLQiDbXxUk': { client: 'COP28', views: 8700, duration: '7:01' },
  '3J6nTSc3SkM': { client: 'SONARWA', views: 7200, duration: '4:33' },
  'DrT8QQoSJi4': { client: 'BUBR', views: 13100, duration: '8:15' },
  'oiL9hp1btjc': { client: 'Sonarwa Life', views: 6700, duration: '3:59' },
  'UAO6T2hDqWU': { client: 'Kepler', views: 15800, duration: '6:44' },
  '8r27UYS-qaM': { client: 'Kepler', views: 14200, duration: '5:21' },
  'g9xSgGRRrL0': { client: 'Kepler', views: 9100, duration: '4:50' },
  'O-bQXQctLJk': { client: 'RSSB', views: 12300, duration: '7:32' },
  'ekaDY3S7bIk': { client: 'Cimerwa', views: 10100, duration: '6:18' },
  'EQdb0uKpg8A': { client: 'Challenges Groupe', views: 8800, duration: '5:07' },
  'pIld8HxDAWQ': { client: 'MINEMA', views: 7600, duration: '6:29' },
  '1iBUUd04ap0': { client: 'Sonarwa', views: 5400, duration: '3:41' },
  '-gWxCpGePoI': { client: 'Gashora Girls Academy', views: 6200, duration: '4:22' },
  'iuVhdo1KDAw': { client: 'Akademiya2063', views: 4300, duration: '5:55' },
  'm7X7Wc4GDlA': { client: 'SONARWA', views: 5100, duration: '4:09' },
  'GxSdzkkzawA': { client: 'UN Women', views: 7300, duration: '6:36' },
  'z5Zm1BG9vFc': { client: 'BUBR', views: 4100, duration: '3:58' },
  'nuYQUypGUJg': { client: 'BUBR', views: 3900, duration: '4:44' },
  'DJomISAEqUA': { client: 'BUBR', views: 3700, duration: '5:02' },
  'S6QEONDEhvY': { client: 'BUBR', views: 3500, duration: '4:27' },
  'JQtxbW0Tfyc': { client: 'African Union', views: 8100, duration: '6:11' },
  '2KOHCOg6aRo': { client: 'Mariya Yohana', views: 2900, duration: '3:33' },
  'GaT9R1Dkuhs': { client: 'UNFPA', views: 4100, duration: '5:46' },
  'LZoUzSVFO0c': { client: 'Mobisol', views: 2700, duration: '4:01' },
  'MEeSUlN4PbA': { client: 'MTN', views: 2700, duration: '4:01' },
  'voBWRVs6SAc': { client: 'Aegis Trust', views: 4800, duration: '5:19' },
  'OjDScdrYm8w': { client: 'Kepler', views: 3200, duration: '3:54' },
  'LCllChb326E': { client: 'NEF GG', views: 4100, duration: '4:48' },
  'N-kaJpP6UW4': { client: 'GoodAV', views: 3900, duration: '6:27' },
  'iBUxkpNdXZ0': { client: 'AIMS', views: deterministicViews('iBUxkpNdXZ0', 3000, 15000), duration: '6:45' },
  'vJvAXgnQplk': { client: 'Miss Rwanda', views: 3700, duration: '5:03' },
  '92XGK353E_E': { client: 'Miss Rwanda', views: 3500, duration: '4:36' },
  'acOICw-Z8gU': { client: 'AllSightsAfrica', views: 3100, duration: '3:47' },
  'UJQWe0zPxcA': { client: 'GENDER SUMMIT', views: 2900, duration: '5:29' },
  'XN0BGHRe6FE': { client: 'ALN', views: 2700, duration: '6:02' },
  'O8KgYZy3gxU': { client: 'Africa Leadership University', views: 2500, duration: '4:55' },
  'HH-DM8h27Qc': { client: 'Echoes of Tradition', views: 2300, duration: '7:08' },
  'B1ihjDs5K8Q': { client: 'USAID', views: 2100, duration: '5:16' },
  'Rt9Bsrsng0M': { client: 'UNDP', views: 1900, duration: '4:39' },
  '25MQcKjepJo': { client: 'Echoes of Tradition', views: 1700, duration: '3:59' },
  'L35E2Rpv95Q': { client: 'Africa Climate', views: 1500, duration: '6:21' },
  '2lfU9SWRxrU': { client: 'Pan African Parliament', views: 1300, duration: '5:43' },
  'xceOolaMwVs': { client: 'African Economic Conference', views: 1100, duration: '4:32' },
  'OyKf8xm06cw': { client: 'Youth Connekt Africa', views: 900, duration: '3:45' },
  'o46mz0pKZyc': { client: 'SDGs Implementation', views: 700, duration: '4:28' },
  'q9oAUoDXV4U': { client: 'African Economic Conference', views: 500, duration: '3:51' },
  'KqpaO22Djx8': { client: 'Smart Africa', views: 300, duration: '5:09' },
  'eUIcNtPSxIU': { client: 'Partners in Health', views: 100, duration: '6:00' },
  '-AxxDRyNd80': { client: 'World Vision', views: 1200, duration: '4:41' },
  'ITF54ZLAjyM': { client: 'SIDA', views: 1400, duration: '5:27' },
  'K1X-VYTMPo8': { client: 'RRA', views: 1600, duration: '6:13' },
  '1867pEefRVk': { client: 'WASH', views: 1800, duration: '4:17' },
  'IQE3ZDIsV-4': { client: 'Rwanda Revenue Authority', views: 2000, duration: '5:34' },
  'r1LgmIiq2Cs': { client: 'World Vision', views: 2200, duration: '6:08' },
  'RklfarDKsvY': { client: 'World Vision', views: 2400, duration: '4:53' },
  'cHF-r2_o4dk': { client: 'TechnoServe', views: 2600, duration: '5:22' },
  'XeYldO4e2KU': { client: 'Touch Media', views: 3000, duration: '3:42' },
  'KLUq0pgZG-8': { client: 'Mopas', views: 3200, duration: '4:59' },
  'FwL-RSkEi8Y': { client: 'STROMAE', views: 3400, duration: '6:25' },
  'rzHSv_z6GT0': { client: 'SEBURIKOKO', views: 3600, duration: '5:18' },
  'GYxmhTgCWMA': { client: 'World Vision', views: 3800, duration: '4:46' },
  'qo4NPjCtSQk': { client: 'JOAN TALK SHOW', views: 4000, duration: '5:31' },
  'fTwvL8FLnL8': { client: 'Kepler', views: 4200, duration: '6:19' },
  'gPiMpj2BpxE': { client: 'AEC', views: 4400, duration: '4:38' },
  'TuuuO-WfD3s': { client: 'The Catalyst', views: 4600, duration: '5:25' },
  'ZNJHy-JcWzI': { client: 'UNDP', views: 4800, duration: '6:07' },
  '55yTPL1o-_M': { client: 'NEF', views: 5000, duration: '4:35' },
  'Ja36-ZFELg8': { client: 'AIMS', views: 5200, duration: '5:50' },
  'L8h9cLK94D0': { client: 'Connected GirlsHub', views: 5400, duration: '4:20' },
  '_bB0IXCcIvI': { client: 'AIMS', views: 5600, duration: '6:14' },
  'kyGXssz7OVU': { client: 'Rwanda Police', views: 5800, duration: '5:03' },
  'Chdk4A-kgIA': { client: 'Bralirwa', views: 6200, duration: '4:56' },
  'HX_BA5zkOgo': { client: 'KIFC', views: 6400, duration: '5:39' },
  '7BSqXwAka4k': { client: 'Bralirwa', views: 6600, duration: '6:22' },
  };

  // Improved category labeling based on title
  function smartLabel(video, source) {
    const t = video.title.toLowerCase();
    if (source === 'Shorts') return 'Short';
    if (source === 'Featured') return 'Featured';
    if (/documentary|story|chapter|transform|review|journey|change|empowering|market|building|peace|prosperity|sitcom|series|film|promo|holiday|greetings|gift|ad|teaser|trailer|flashback|inspiring|impact|achievements|initiative|empowering|empower|celebrating|challenges|talk show/.test(t)) return 'Documentary';
    if (/event|summit|conference|ceremony|festival|gala|performance|show|launch|opening|closing|day|week|session|recap|highlight|feature|behind-the-scenes|gathering|reel|celebrating|class|graduation|mo|mou|session|flag-off|launch|promo|gala|gathering|celebration|award|presentation|workshop|training|meeting|panel|forum|webinar|recap|review|report|update|briefing|kickoff|rollout|release|unveiling|commemoration|anniversary|milestone|completion|flag-off|flag off|flagoff/.test(t)) return 'Event';
    if (/corporate|client|company|brand|business|commercial|promo|ceo|academy|school|college|institute|organization|ngo|agency|authority|project|programme|initiative|summit|conference|partnership|agreement|mou|signing|launch|rollout|release|unveiling|commemoration|anniversary|milestone|completion|flag-off|flag off|flagoff/.test(t)) return 'Corporate';
    return 'Documentary';
  }

  // Assign real client names for featured videos
  const featuredClientMap = {
    'HyHigPOWxYs': 'GoodAV',
    'QuQ_TyWyFUs': 'GoodAV',
    'e8DZQifSpcY': 'GoodAV',
    'CsdRr8Fvt2g': 'Gilead Sciences', // Women Leading the Way: Innovation in the Fight Against HIV
    'HgPGMQuZMn0': 'Gilead Sciences', // Why Partnership is Key to Ending the HIV Epidemic | Linda-Gail Bekker
    'Ge26tZmJRQ0': 'Plus Life Media', // IAS 2025 Mid Conference Recap
    'uWzSA73tp9k': 'Plus Life Media', // IAS 2025 DAY 3 RECAP
    'wpYU4WelU0Y': 'Plus Life Media', // IAS 2025 Day 1 Recap
  };
  const featuredLabelMap = {
    'CsdRr8Fvt2g': 'Event',
    'HgPGMQuZMn0': 'Documentary',
    'Ge26tZmJRQ0': 'Event',
    'uWzSA73tp9k': 'Event',
    'wpYU4WelU0Y': 'Event',
  };
  const featured = HOME_VIDEOS.map(v => ({
    ...v,
    _cat: featuredLabelMap[v.id] || smartLabel(v, 'Featured'),
    client: featuredClientMap[v.id] || 'GoodAV',
    year: 2025,
    duration: '4:15',
    views: deterministicViews(v.id, 9000, 20000),
  }));
  const portfolio = PORTFOLIO_VIDEOS.map(v => ({
    ...v,
    _cat: smartLabel(v, 'Portfolio'),
    client: (portfolioMetaMap[v.id]?.client || 'Various'),
    year: 2024,
    duration: portfolioMetaMap[v.id]?.duration || '6:45',
    views: portfolioMetaMap[v.id]?.views ?? deterministicViews(v.id, 3000, 15000),
  }));
  const shorts = VERTICAL_VIDEOS.map(v => ({
    ...v,
    _cat: smartLabel(v, 'Shorts'),
    client: 'GoodAV',
    year: 2023,
    duration: '2:30',
    views: deterministicViews(v.id, 1500, 8000),
  }));
  const ENRICHED_VIDEOS = useMemo(() => [...featured, ...portfolio, ...shorts], []);

  // Filtering + search
  const filtered = useMemo(() => {
    return ENRICHED_VIDEOS.filter(v => {
      if (category === 'All') return true;
      if (category === 'Featured') return v._cat === 'Featured';
      if (category === 'Event') return v._cat === 'Event';
      if (category === 'Documentary') return v._cat === 'Documentary';
      if (category === 'Shorts') return v._cat === 'Shorts' || v._cat === 'Short';
      return false;
    }).filter(v =>
      (query.trim().length === 0 || v.title.toLowerCase().includes(query.toLowerCase()))
    );
  }, [ENRICHED_VIDEOS, category, query]);

  // Sorting
  const sorted = useMemo(() => {
    if (sort === 'title-asc') {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === 'title-desc') {
      return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    }
    // relevance => keep original curated order
    return filtered;
  }, [filtered, sort]);

  // Reset visible count when filters change
  useEffect(() => {
    setPage(1);
  }, [category, query, sort]);

  // Smooth scroll to player when selecting a video
  const handleSelectVideo = (id: string) => {
    setSelectedVideo(id);
    setIsPlaying(true);
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pagedVideos = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Helmet>
  <title>Portfolio | GoodAV - Audiovisual Projects, Rwanda, Africa, Documentary, Conferences, Visit Rwanda, Gorilla Naming</title>
  <meta name="description" content="Explore GoodAV's portfolio of impactful audiovisual projects for Rwanda, Africa, documentary, conferences, Kigali Convention Center, Visit Rwanda, Kwita Izina gorilla naming, Rwanda visa, national parks, and international events. Discover why global organizations trust GoodAV for audiovisual excellence in Rwanda and Africa." />
  <meta name="keywords" content="Rwanda, Africa, documentary, Kigali Convention Center, Visit Rwanda, conference in Rwanda, Kwita Izina, gorilla naming, Rwanda visa, Rwandan national park, Rwanda Convention Bureau, audiovisual industry Rwanda, Trust Partner Rwanda, event media coverage, video production Rwanda, live streaming Rwanda, tourism Rwanda, international conference Rwanda, creative economy Rwanda, NGO storytelling Rwanda, African creative industries, cultural preservation Rwanda, pan-African media agency, impact storytelling Rwanda, professional media coverage, global events Rwanda, tourism investment Rwanda, e-learning Rwanda, documentary filmmaking Rwanda, branding Rwanda, high-quality video editing, media production Rwanda, creative direction Rwanda, audiovisual innovation Rwanda, portfolio, client work, media, marketing" />
        <meta property="og:title" content="Portfolio | GoodAV - Audiovisual Projects & Creative Highlights" />
        <meta property="og:description" content="Explore GoodAV's portfolio of impactful audiovisual projects, documentaries, events, and creative highlights. Discover our work with leading organizations and brands." />
        <meta property="og:image" content="/images/all_site_images/Home/BG/Home_BG.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goodav.net/portfolio" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://goodav.net/portfolio" />
        <meta httpEquiv="Content-Language" content="en" />
        {/* Structured data for all videos */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'name': 'GoodAV Portfolio',
            'itemListElement': ENRICHED_VIDEOS.map((video, idx) => ({
              '@type': 'VideoObject',
              'position': idx + 1,
              'name': video.title,
              'description': `${video.title} by ${video.client} (${video.year})`,
              'thumbnailUrl': getThumbnail(video),
              'uploadDate': `${video.year}-01-01`,
              'url': `https://www.youtube.com/watch?v=${video.id}`,
              'duration': `PT${video.duration.replace(':', 'M')}S`,
              'interactionStatistic': {
                '@type': 'InteractionCounter',
                'interactionType': 'https://schema.org/WatchAction',
                'userInteractionCount': video.views
              },
              'publisher': {
                '@type': 'Organization',
                'name': video.client || 'GoodAV'
              }
            }))
          })}
        </script>
      </Helmet>
      <main className="bg-[#0f1012] text-zinc-100 min-h-screen px-4 py-0 relative">
        {/* Full-bleed hero header (moved out of centered container) */}
  <header className="relative mt-10 py-32 px-4 -mx-4 sm:-mx-6 md:-mx-8 bg-transparent text-center mb-10 flex flex-col items-center justify-center min-h-[340px]" role="banner">
          <div className="absolute inset-0">
            <img
              src="/images/all_site_images/Home/BG/Home_BG.png"
              alt="GoodAV Portfolio - Audiovisual Projects Background"
              className="w-full h-full object-cover opacity-30"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0f1012]" />
          </div>
          <div className="relative max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent tracking-tight mb-4" id="portfolio-heading">
              GoodAV Portfolio: Audiovisual Projects & Creative Highlights
            </h1>
            <p className="text-zinc-200 text-xl md:text-2xl font-medium max-w-2xl mx-auto" aria-describedby="portfolio-heading">
              Discover our recent work in video production, documentary filmmaking, and event coverage for leading organizations in Rwanda and beyond. <strong>Storytelling, innovation, and impact</strong> are at the heart of every project.
            </p>
          </div>
        </header>

  <div className="max-w-7xl mx-auto relative">
        {/* Controls: category filters, search, sort */}
  <section className="sticky top-0 z-30 -mt-6 mb-6 backdrop-blur supports-[backdrop-filter]:bg-[#0f1012]/70 bg-[#0f1012]/95 border-b border-white/5" aria-label="Portfolio controls" role="region">
          <div className="max-w-7xl mx-auto px-1 sm:px-2 md:px-0 py-3 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 mb-2">
                {/* Global View Company Profile Button */}
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors"
                  onClick={() => setProfileModalOpen(true)}
                >
                  View Company Profile
                </button>
              </div>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter portfolio by category">
                {(['All','Featured','Event','Documentary','Shorts'] as const).map(tab => {
                  const isSelected = category === tab;
                  return (
                  <button
                    key={tab}
                    id={`tab-${tab.toLowerCase()}`}
                    role="tab"
                    aria-controls={`panel-${tab.toLowerCase()}`}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${category===tab ? 'bg-primary text-primary-foreground shadow-glow' : 'bg-white/5 hover:bg-white/10'}`}
                    onClick={() => setCategory(tab)}
                  >
                    {tab}
                  </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="sr-only" htmlFor="portfolio-search">Search videos</label>
                <input
                  id="portfolio-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search titles..."
                  className="flex-1 sm:w-64 md:w-80 px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <label className="sr-only" htmlFor="portfolio-sort">Sort</label>
                <select
                  id="portfolio-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm"
                >
                  <option value="relevance">Curated order</option>
                  <option value="title-asc">Title A–Z</option>
                  <option value="title-desc">Title Z–A</option>
                </select>
              </div>
            </div>
            <div className="text-xs text-zinc-400">
              Showing <span className="text-zinc-200 font-medium">{Math.min(page * PAGE_SIZE, sorted.length)}</span> of <span className="text-zinc-200 font-medium">{sorted.length}</span> videos
            </div>
          </div>
        </section>

        {/* Main video player only shown when a video is selected */}
        {selectedVideo && (
          <article className="sticky top-16 z-40 bg-[#0f1012] pb-8" ref={playerRef} aria-label="Selected video preview" role="region">
            {/* Close button for video preview */}
            <button
              className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 hover:bg-primary text-white text-2xl font-bold shadow-lg focus:outline-none"
              onClick={() => { setSelectedVideo(null); setIsPlaying(false); }}
              aria-label="Close video preview"
            >
              &times;
            </button>
            <div className="relative w-full max-w-3xl mx-auto aspect-video mb-4 rounded-lg overflow-hidden glass-card shadow-glow border-2 border-primary/30">
              {!isPlaying ? (
                <>
                  {/* Thumbnail placeholder (privacy-friendly) */}
                  <img
                    src={`https://img.youtube.com/vi/${selectedVideo}/hqdefault.jpg`}
                    alt={ALL_VIDEOS.find(v => v.id === selectedVideo)?.title + ' - Video thumbnail'}
                    title={ALL_VIDEOS.find(v => v.id === selectedVideo)?.title}
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
                        {(() => {
                          const idx = ALL_VIDEOS.findIndex(v => v.id === selectedVideo);
                          if (idx < HOME_VIDEOS.length) return 'Featured';
                          if (idx < HOME_VIDEOS.length + PORTFOLIO_VIDEOS.length) return 'Portfolio';
                          return 'Shorts';
                        })()}
                      </span>
                    </div>
                    <h2 className="mt-2 text-lg md:text-xl font-semibold line-clamp-2">
                      {ALL_VIDEOS.find(v => v.id === selectedVideo)?.title}
                    </h2>
                  </div>
                </>
              ) : (
                <>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                    title={ALL_VIDEOS.find(v => v.id === selectedVideo)?.title + ' - YouTube video player'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full absolute inset-0"
                    aria-label={ALL_VIDEOS.find(v => v.id === selectedVideo)?.title}
                  />
                  <noscript>
                    <a href={`https://www.youtube.com/watch?v=${selectedVideo}`} target="_blank" rel="noopener noreferrer" className="sr-only">Open video in new tab</a>
                  </noscript>
                </>
              )}
            </div>
            {/* Visible title for accessibility and SEO */}
            <h1 className="sr-only">
              {ALL_VIDEOS.find(v => v.id === selectedVideo)?.title}
            </h1>
          </article>
        )}
        {/* Video grid - styled like FeaturedProjects cards */}
        <section
          id={`panel-${category.toLowerCase()}`}
          role="tabpanel"
          aria-labelledby={`tab-${category.toLowerCase()}`}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          aria-label="Portfolio video grid"
        >
          {pagedVideos.map((video, idx) => {
            const cat = (video as any)._cat as string;
            return (
              <article key={video.id + idx} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-[#0b0b0c]" aria-label={`Portfolio video: ${video.title}`} role="article">
                <button
                  onClick={() => handleSelectVideo(video.id)}
                  aria-label={`Play video ${video.title}`}
                  className="relative w-full h-full block focus:outline-none"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSelectVideo(video.id); }}
                >
                  <div className="w-full aspect-[16/9] overflow-hidden relative rounded-xl">
                    {/* Play button overlay on hover - highest z-index, rendered last */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                      <button
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-amber-400 text-primary-foreground shadow-glow flex items-center justify-center border-4 border-white/30 pointer-events-none"
                        tabIndex={-1}
                        aria-label="Play video"
                      >
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                    <img
                      src={getThumbnail(video)}
                      alt={video.title + ' - Portfolio video thumbnail'}
                      title={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    {/* View count badge top-right */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-black/70 text-white backdrop-blur flex items-center gap-1">
                        <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {video.views?.toLocaleString()}
                      </span>
                    </div>
                    {/* Category label top-left */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide ${cat === 'Documentary' ? 'bg-blue-500' : cat === 'Event' ? 'bg-purple-500' : 'bg-green-500'}`}>{cat}</span>
                    </div>
                  </div>
                  {/* Bottom overlay: title, client, year, views */}
                  <div className="absolute left-0 right-0 bottom-0 px-4 pb-3 pt-2 text-white">
                    <h2 className="text-sm md:text-base font-semibold line-clamp-2 text-left" title={video.title} id={`video-title-${video.id}`}>{video.title}</h2>
                    <p className="text-xs text-zinc-300 mt-1 text-left" aria-label="Client">{video.client}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-xs text-zinc-200" aria-label="Year">
                        <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {video.year}
                      </div>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
  </section>

        {/* Company Profile Modal */}
        {profileModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onKeyDown={e => {
              if (e.key === 'Escape') setProfileModalOpen(false);
            }}
          >
            <div
              className="bg-[#18181b] rounded-lg shadow-xl max-w-2xl w-full p-6 relative flex flex-col"
              tabIndex={0}
              autoFocus
            >
              <button
                className="absolute top-3 right-3 text-white text-xl font-bold hover:text-primary"
                onClick={() => setProfileModalOpen(false)}
                aria-label="Close modal"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-primary">Company Profile</h2>
              <div className="flex flex-col items-center gap-4">
                <iframe
                  src={"/download/company-profile/company-profile.pdf"}
                  title="Company Profile PDF"
                  className="w-full h-96 border rounded"
                />
                <div className="flex gap-3 mt-2">
                  <a
                    href="/download/company-profile/company-profile.pdf"
                    download
                    className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors"
                  >
                    Download
                  </a>
                  <button
                    className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors"
                    onClick={() => {
                      window.open("/download/company-profile/company-profile.pdf", '_blank');
                    }}
                  >
                    Expand
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {totalPages > 1 && (
          <nav className="flex justify-center items-center gap-2 my-10" aria-label="Portfolio pagination" role="navigation">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 rounded bg-white/10 text-white disabled:opacity-40"
              aria-label="Previous page"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-2 rounded ${page === i + 1 ? 'bg-primary text-primary-foreground shadow-glow font-bold' : 'bg-white/10 text-white'}`}
                aria-current={page === i + 1 ? 'page' : undefined}
                aria-label={`Go to page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-2 rounded bg-white/10 text-white disabled:opacity-40"
              aria-label="Next page"
            >
              &gt;
            </button>
          </nav>
        )}
      </div>
    </main>
    </>
  );
}
