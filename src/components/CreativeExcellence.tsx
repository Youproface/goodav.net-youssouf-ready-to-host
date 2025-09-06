
import { Flag, Star, Rocket, Trophy, Globe, Bolt, Play, X } from "lucide-react";
import VideoPlaceholder from './VideoPlaceholder';
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const teamImages = [
  {
    src: "/images/all_site_images/Home/Team/Team_3.png",
    alt: "GoodAV Team in action - Creative collaboration in progress",
    captionTitle: "Creative Collaboration",
    captionText: "Teamwork brings visions to life"
  },
  {
    src: "/images/all_site_images/Home/Team/Team_2.png",
    alt: "GoodAV Team in action - Professional equipment and setup",
    captionTitle: "Professional Excellence",
    captionText: "Quality equipment for outstanding results"
  }
];

const stats = [
  { number: "500+", label: "Projects Completed" },
  { number: "15+", label: "Countries Covered" },
  { number: "24/7", label: "Support Available" }
];

const expertise = [
  { icon: <Trophy className="w-6 h-6 text-primary" />, title: "Award-Winning Quality", desc: "Recognized excellence in audiovisual production across Africa" },
  { icon: <Globe className="w-6 h-6 text-primary" />, title: "Global Standards", desc: "International-level production capabilities with local expertise" },
  { icon: <Bolt className="w-6 h-6 text-primary" />, title: "Rapid Deployment", desc: "Quick response times with professional execution" }
];

export default function CreativeExcellence() {
  const [play, setPlay] = useState(false);
  const videoId = "QuQ_TyWyFUs";

  return (
    <section className="relative bg-gradient-to-b from-[#1a0f0a] to-[#0d0d0d] text-white py-20 px-6 md:px-12 lg:px-20" role="region" aria-label="Creative Excellence Team Section">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge & Header */}
        <div className="flex justify-center mb-6">
          <span className="flex items-center gap-2 px-4 py-1 rounded-full border border-orange-500 text-xs uppercase tracking-wider text-orange-400 font-medium">
            <Flag className="w-4 h-4 text-orange-400" />
            Creative Excellence
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 relative inline-block">
          Our Team in Action
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-1 bg-orange-500 rounded"></span>
        </h2>
        <p className="text-gray-300 text-base md:text-lg lg:text-xl xl:text-2xl max-w-3xl mx-auto mb-12 lg:mb-16 leading-relaxed">
          Where Vision Meets Execution – Professional Audiovisual Excellence
        </p>

        {/* Mission Card */}
        <div className="bg-[#1f1f1f] border border-gray-800 rounded-xl p-6 md:p-8 lg:p-10 flex items-center gap-4 mb-12 lg:mb-16 shadow-lg max-w-6xl mx-auto">
          <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl bg-orange-600/80 flex-shrink-0">
            <Rocket className="w-7 h-7 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-white mb-2">Our Mission</h3>
            <p className="text-gray-300 text-base lg:text-lg xl:text-xl leading-relaxed">
              Transforming visions into cinematic realities through innovative storytelling and cutting-edge technology.
            </p>
          </div>
        </div>

        {/* First Team Image - Creative Collaboration */}
        <div className="team-image-showcase mb-6">
          <div className="main-image relative">
            <picture>
              <source srcSet="/images/all_site_images/Home/Team/Team_3.avif" type="image/avif" />
              <source srcSet="/images/all_site_images/Home/Team/Team_3.webp" type="image/webp" />
              <img
                src="/images/all_site_images/Home/Team/Team_3.png"
                alt="GoodAV Team in action - Creative collaboration in progress"
                className="img-fluid rounded-xl w-full object-cover"
                loading="lazy"
                decoding="async"
                width="800"
                height="533"
              />
            </picture>
            <div className="image-caption absolute left-0 bottom-0 bg-black/60 text-white p-3 rounded-b-xl w-full">
              <h6 className="font-semibold text-base">Creative Collaboration</h6>
              <p className="text-sm">Teamwork brings visions to life</p>
            </div>
          </div>
        </div>

        {/* Results & Description */}
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Exceptional Results, Every Time</h3>
        <p className="text-gray-300 max-w-4xl mx-auto mb-8 text-base lg:text-lg xl:text-xl leading-relaxed">
          At <span className="text-orange-400 font-semibold">GoodAV</span>, our expert team has successfully handled projects of all scales, delivering exceptional results with creativity and precision. From high-profile conferences and corporate events to impactful documentaries and live streams.
        </p>
        <div className="bg-[#1f1f1f] border border-gray-800 rounded-xl p-5 flex items-center gap-3 mb-10 shadow-lg">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-600/80 flex-shrink-0">
            <Star className="w-5 h-5 text-white" />
          </div>
          <p className="text-gray-400 text-xl lg:text-2xl xl:text-3xl text-left">
            Each endeavor is a unique story waiting to be told, and we are dedicated to telling it with authenticity and flair. Whether capturing the energy of a live audience or the raw emotion of a documentary.
          </p>
        </div>
        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
          Fueled by innovation and a commitment to excellence, our team thrives on transforming challenges into opportunities. With every frame we capture and every story we tell, we aim to inspire, connect, and leave a lasting impression.
        </p>

        {/* Team Action Video & Control Room Image - Modern Responsive Layout */}
        <div className="flex flex-col md:flex-row gap-8 mb-8 items-stretch">
          {/* Vertical Control Room Image */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <picture>
                <source srcSet="/images/all_site_images/Home/Team/Team_1.avif" type="image/avif" />
                <source srcSet="/images/all_site_images/Home/Team/Team_1.webp" type="image/webp" />
                <img
                  src="/images/all_site_images/Home/Team/Team_1.png"
                  alt="GoodAV production team in control room"
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="533"
                />
              </picture>
              <div className="absolute left-0 bottom-0 bg-black/60 text-white p-4 w-full rounded-b-xl">
                <h6 className="font-semibold text-base">Live Production Control</h6>
                <p className="text-sm">Delivering seamless event coverage</p>
              </div>
            </div>
          </div>
          {/* Team Action Video */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="video-container relative rounded-xl overflow-hidden group h-[400px] bg-black shadow-lg">
              <VideoPlaceholder
                videoId={videoId}
                thumbnail="/images/all_site_images/Home/BTS/GOODAV_BTS_2.jpg"
                title="Epic Behind-the-Scenes Cinematic | GoodAV Field Team in Action"
                subtitle="Watch our team in action creating exceptional content"
                className="rounded-xl"
                aspectClass="h-[400px]"
              />
            </div>
          </div>
        </div>

        {/* Second Team Image - Added at the bottom as requested */}
        <div className="team-image-showcase mb-6">
          <div className="main-image relative">
            <picture>
              <source srcSet="/images/all_site_images/Home/Team/Team_2.avif" type="image/avif" />
              <source srcSet="/images/all_site_images/Home/Team/Team_2.webp" type="image/webp" />
              <img
                src="/images/all_site_images/Home/Team/Team_2.png"
                alt="GoodAV Team in action - Professional equipment and setup"
                className="img-fluid rounded-xl w-full object-cover"
                loading="lazy"
                decoding="async"
                width="800"
                height="533"
              />
            </picture>
            <div className="image-caption absolute left-0 bottom-0 bg-black/60 text-white p-3 rounded-b-xl w-full">
              <h6 className="font-semibold text-base">Professional Excellence</h6>
              <p className="text-sm">Quality equipment for outstanding results</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
