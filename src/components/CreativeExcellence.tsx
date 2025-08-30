import { Flag, Star } from "lucide-react";

export default function CreativeExcellence() {
  return (
    <section className="relative bg-gradient-to-b from-[#1a0f0a] to-[#0d0d0d] text-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="flex items-center gap-2 px-4 py-1 rounded-full border border-orange-500 text-xs uppercase tracking-wider text-orange-400 font-medium">
            <Flag className="w-4 h-4 text-orange-400" />
            Creative Excellence
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 relative inline-block">
          Our Team in Action
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-1 bg-orange-500 rounded"></span>
        </h2>

        <p className="text-gray-300 text-base md:text-lg lg:text-xl xl:text-2xl max-w-3xl mx-auto mb-12 lg:mb-16 leading-relaxed">
          Where Vision Meets Execution – Professional Audiovisual Excellence
        </p>

        {/* Mission */}
        <div className="bg-[#1f1f1f] border border-gray-800 rounded-xl p-6 md:p-8 lg:p-10 flex items-start gap-4 lg:gap-6 mb-12 lg:mb-16 shadow-lg max-w-6xl mx-auto">
          <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl bg-orange-600/80 flex-shrink-0">
            <Flag className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-white mb-2">Our Mission</h3>
            <p className="text-gray-300 text-base lg:text-lg xl:text-xl leading-relaxed">
              Transforming visions into cinematic realities through innovative
              storytelling and cutting-edge technology.
            </p>
          </div>
        </div>

        {/* Image Strip */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-10">
          <img
          src="/images/Home/Team/Team_3.png"
          alt="Creative team 1"
          className="rounded-lg object-cover w-full h-auto"
          loading="lazy"
          decoding="async"
        />
        </div>

        {/* Results */}
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Exceptional Results, Every Time
        </h3>
        <p className="text-gray-300 max-w-4xl mx-auto mb-8 text-base lg:text-lg xl:text-xl leading-relaxed">
          At <span className="text-orange-400 font-semibold">GoodAV</span>, our
          expert team has successfully handled projects of all scales, delivering
          exceptional results with creativity and precision. From high-profile
          conferences and corporate events to impactful documentaries and live
          streams.
        </p>

        {/* Highlight Box */}
        <div className="bg-[#1f1f1f] border border-gray-800 rounded-xl p-5 flex items-start gap-3 mb-10 shadow-lg">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-600/80 flex-shrink-0">
            <Star className="w-5 h-5 text-white" />
          </div>
          <p className="text-gray-400 text-xl lg:text-2xl xl:text-3xl text-left">
            Each endeavor is a unique story waiting to be told, and we are
            dedicated to telling it with authenticity and flair. Whether capturing
            the energy of a live audience or the raw emotion of a documentary.
          </p>
        </div>

        {/* Closing */}
        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Fueled by innovation and a commitment to excellence, our team thrives on
          transforming challenges into opportunities. With every frame we capture
          and every story we tell, we aim to inspire, connect, and leave a lasting
          impression.
        </p>
      </div>
    </section>
  );
}
