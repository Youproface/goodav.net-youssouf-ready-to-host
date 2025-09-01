import React from "react";
import { Rocket, Star, Trophy, Globe, Bolt, Play, Video } from "lucide-react";

const teamImages = [
  {
    src: "/images/Home/Team/Team_3.png",
    alt: "GoodAV Team in action - Creative collaboration in progress",
    captionTitle: "Creative Collaboration",
    captionText: "Teamwork brings visions to life"
  },
  {
    src: "/images/Home/Team/Team_2.png",
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

const TeamInAction: React.FC = () => (
  <section className="r-container py-20">
    {/* Header */}
    <header className="team-action-header text-center mb-10">
      <div className="section-badge flex items-center justify-center gap-2 mb-3">
        <Video className="w-5 h-5 text-primary" aria-hidden="true" />
        <span className="font-bold tracking-wide text-primary">CREATIVE EXCELLENCE</span>
      </div>
      <h2 className="section-title text-4xl md:text-5xl font-bold mb-2">Our Team in Action</h2>
      <p className="section-subtitle text-lg text-muted-foreground">Where Vision Meets Execution - Professional Audiovisual Excellence</p>
    </header>

    <div className="row justify-center">
      <div className="col-lg-8 mx-auto">
        <div className="content-wrapper">
          {/* Mission Card */}
          <div className="mission-card flex items-center gap-4 mb-8">
            <div className="card-icon bg-primary/10 rounded-full p-3">
              <Rocket className="w-7 h-7 text-primary" aria-hidden="true" />
            </div>
            <div className="card-content">
              <h4 className="font-bold text-xl mb-1">Our Mission</h4>
              <p className="text-muted-foreground">Transforming visions into cinematic realities through innovative storytelling and cutting-edge technology.</p>
            </div>
          </div>

          {/* First Team Image */}
          <div className="team-image-showcase mb-6">
            <div className="main-image relative">
              <img src={teamImages[0].src} alt={teamImages[0].alt} className="img-fluid rounded-xl w-full object-cover" loading="lazy" />
              <div className="image-caption absolute left-0 bottom-0 bg-black/60 text-white p-3 rounded-b-xl w-full">
                <h6 className="font-semibold text-base">{teamImages[0].captionTitle}</h6>
                <p className="text-sm">{teamImages[0].captionText}</p>
              </div>
            </div>
          </div>

          {/* Main Description */}
          <div className="main-description mb-8">
            <h3 className="content-title text-2xl md:text-3xl font-bold mb-3">Exceptional Results, Every Time</h3>
            <p className="lead-text text-lg mb-4">
              At <span className="highlight font-bold text-primary">GoodAV</span>, our expert team has successfully handled projects of all scales, delivering exceptional results with creativity and precision. From high-profile conferences and corporate events to impactful documentaries and live streams.
            </p>
            <div className="feature-highlight flex items-center gap-3 mb-4">
              <span className="highlight-badge bg-primary/10 rounded-full p-2">
                <Star className="w-5 h-5 text-primary" aria-hidden="true" />
              </span>
              <div className="highlight-content">
                <p className="text-muted-foreground">Each endeavor is a unique story waiting to be told, and we are dedicated to telling it with authenticity and flair. Whether capturing the energy of a live audience or the raw emotion of a documentary.</p>
              </div>
            </div>
            <p className="description-text text-base text-muted-foreground">
              Fueled by innovation and a commitment to excellence, our team thrives on transforming challenges into opportunities. With every frame we capture and every story we tell, we aim to inspire, connect, and leave a lasting impression.
            </p>
          </div>

          {/* Team Action Video Placeholder */}
          <div className="team-video-showcase mb-8">
            <div className="video-container relative rounded-xl overflow-hidden">
              <div className="video-placeholder bg-gradient-to-br from-primary/20 to-background h-64 flex items-center justify-center">
                <div className="video-overlay flex flex-col items-center justify-center gap-3">
                  <button className="play-button-large bg-primary text-white rounded-full p-4 shadow-lg" aria-label="Play Behind the Scenes Video">
                    <Play className="w-8 h-8" aria-hidden="true" />
                  </button>
                  <div className="video-info text-center">
                    <h5 className="video-title font-bold text-lg">Behind the Scenes</h5>
                    <p className="video-subtitle text-muted-foreground">Watch our team in action creating exceptional content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Team Image */}
          <div className="team-image-showcase mb-6">
            <div className="main-image relative">
              <img src={teamImages[1].src} alt={teamImages[1].alt} className="img-fluid rounded-xl w-full object-cover" loading="lazy" />
              <div className="image-caption absolute left-0 bottom-0 bg-black/60 text-white p-3 rounded-b-xl w-full">
                <h6 className="font-semibold text-base">{teamImages[1].captionTitle}</h6>
                <p className="text-sm">{teamImages[1].captionText}</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section bg-primary/10 rounded-xl p-6 mb-8 text-center">
            <h5 className="font-bold text-lg mb-2">Ready to Create Something Extraordinary?</h5>
            <p className="mb-4">Let's collaborate to turn your vision into a masterpiece and showcase your story to the world!</p>
            <button type="button" className="cta-button bg-primary text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto">
              <span>Start Your Project</span>
              <Play className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Statistics */}
          <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card bg-background/80 rounded-xl p-5 text-center shadow">
                <div className="stat-number text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="stat-label text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Expertise Cards */}
    <div className="expertise-section mt-12">
      <div className="section-header text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">What Sets Our Team Apart</h3>
        <p className="text-muted-foreground">Professional excellence in every aspect of production</p>
      </div>
      <div className="row g-4 flex flex-wrap justify-center">
        {expertise.map((item) => (
          <div key={item.title} className="expertise-card bg-background/80 rounded-xl p-6 m-2 flex flex-col items-center text-center shadow w-full md:w-1/3">
            <div className="card-icon mb-3">{item.icon}</div>
            <h5 className="font-bold text-lg mb-1">{item.title}</h5>
            <p className="text-muted-foreground text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamInAction;
