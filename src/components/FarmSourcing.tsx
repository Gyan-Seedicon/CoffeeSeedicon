import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const farmSlides = [
  {
    step: "01",
    tag: "Plucking",
    title: "Hand-Plucking Peak Ripeness",
    description: "Selective hand-plucking is a labor of patience and precision. Skilled farmers selectively harvest only the cherry-red coffee fruit under forest canopies, ensuring the foundation of our green coffee meets premium specifications.",
    video: "/videos/plukingcoffee.mp4"
  },
  {
    step: "02",
    tag: "Processing",
    title: "Locking In Pure Terroir Profiles",
    description: "After plucking, cherries are washed or naturally processed to separate the beans from the fruit. Meticulous sorting and moisture control ensure the green beans retain their distinct regional characteristics prior to container shipping.",
    video: "/videos/processing-coffee.mp4"
  },
  {
    step: "03",
    tag: "Transport",
    title: "Guarded Transit and Sourcing Integrity",
    description: "From estate gates to container freight, green coffee is packed in protective multi-layer GrainPro liners and stenciled jute sacks. We safeguard humidity levels to guarantee freshness for international roasters.",
    video: "/videos/transport-coffee.mp4"
  }
];

export default function FarmSourcing() {
  const [activeFarmSlide, setActiveFarmSlide] = useState(0);

  // Auto change the video every 2 seconds and reset interval on slide changes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFarmSlide((prev) => (prev + 1) % farmSlides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [activeFarmSlide]);

  return (
    <section className="bg-espresso-dark text-white font-sans overflow-hidden border-t border-b border-white/5 relative w-full grid lg:grid-cols-12 items-stretch">

      {/* Left Column: Interactive Storytelling */}
      <div className="lg:col-span-6 flex flex-col justify-center py-20 px-4 lg:px-14 order-2 lg:order-1">

        {/* Section Header */}
        <div className="mb-6">
          <span className="text-[10px] font-bold text-latte-accent tracking-wider uppercase mb-1 block">
            The Seed to Container Journey
          </span>
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-white tracking-[-0.02em] leading-tight">
            Farming & Processing Story
          </h2>
        </div>

        {/* Step Selector Tab Interface */}
        <div className="flex gap-4 sm:gap-6 mb-6 border-b border-white/10 pb-4">
          {farmSlides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFarmSlide(idx)}
              className={`text-xs sm:text-sm font-semibold tracking-wider uppercase pb-2 transition-all duration-300 relative cursor-pointer ${
                idx === activeFarmSlide ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {slide.step} / {slide.tag}
              {idx === activeFarmSlide && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-latte-accent animate-shimmer" />
              )}
            </button>
          ))}
        </div>

        {/* Text Container with Transitions */}
        <div className="min-h-[220px] sm:min-h-[180px] flex flex-col justify-center">
          {farmSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 transform ${
                idx === activeFarmSlide
                  ? 'opacity-100 translate-y-0 relative'
                  : 'opacity-0 translate-y-4 absolute pointer-events-none'
              }`}
            >
              <h3 className="font-display font-normal text-3xl sm:text-4xl italic text-latte-accent mb-4 leading-tight">
                "{slide.title}"
              </h3>
              <p className="text-white/70 text-sm leading-relaxed font-light font-sans">
                {slide.description}
              </p>
            </div>
          ))}
        </div>

        {/* Slider Arrow Controls (More Prominent) */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setActiveFarmSlide((prev) => (prev - 1 + farmSlides.length) % farmSlides.length)}
            className="w-11 h-11 rounded-full border border-white/30 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-espresso-dark hover:border-white transition-all duration-300 cursor-pointer"
            aria-label="Previous slide"
          >
            <ArrowRight className="w-5 h-5 rotate-180" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => setActiveFarmSlide((prev) => (prev + 1) % farmSlides.length)}
            className="w-11 h-11 rounded-full border border-white/30 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-espresso-dark hover:border-white transition-all duration-300 cursor-pointer"
            aria-label="Next slide"
          >
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

      </div>

      {/* Right Column: Large Video Player */}
      <div className="lg:col-span-6 order-1 lg:order-2 self-stretch min-h-[350px] lg:min-h-[500px] xl:min-h-[600px] relative">
        <div className="w-full h-full absolute inset-0 bg-[#0e0a08]">
          {farmSlides.map((slide, idx) => (
            <video
              key={idx}
              src={slide.video}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                idx === activeFarmSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          ))}
          {/* Subtle vignette/overlay overlaying the video */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
        </div>
      </div>

    </section>
  );
}
