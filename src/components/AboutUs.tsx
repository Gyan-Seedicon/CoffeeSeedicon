import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AboutUs() {
  const [aboutSlide, setAboutSlide] = useState(1);

  // Autoplay timer sequence for About Us carousel: Video (7s) -> Image (3s) -> Video...
  useEffect(() => {
    const delay = aboutSlide === 1 ? 7000 : 3000;
    const timer = setTimeout(() => {
      setAboutSlide(aboutSlide === 1 ? 0 : 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [aboutSlide]);

  return (
    <section id="about" className="py-24 bg-ceramic-beige text-text-strong font-sans border-t border-black/4">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-12 gap-16 items-center">

        {/* Column 1: Sourcing info & text layout */}
        <div className="lg:col-span-7 flex flex-col">
          <span className="text-xs font-bold text-coffee-roast tracking-wider uppercase mb-3 block">
            Indian Coffee Origins
          </span>
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-espresso-dark leading-[1.05] tracking-[-0.04em] mb-4">
            Traceability & Sourcing Integrity
          </h2>
          <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-xl font-medium">
            Our journey begins in the shaded hills of the Western Ghats. Seedicon was built on a singular vision: to connect historic South Indian coffee estates directly to the global B2B trade route.
          </p>
          <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-xl font-medium">
            By partnering directly with multi-generational farmer and estate networks in Coorg and Chikmagalur, we enforce direct-trade transparency that respects local growers at the farmgate, fostering long-term ethical sustainability.
          </p>
          <p className="text-text-muted text-sm leading-relaxed max-w-xl font-medium">
            Through strict in-house moisture checks, screen grading, and complete handling of phytosanitary container shipping logistics, we turn these premium estate harvests into a reliable sourcing capability that international buyers can trust.
          </p>
        </div>

        {/* Column 2: Coffee estate photo/video panel carousel */}
        <div className="lg:col-span-5">
          <div className="relative group">
            <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden border border-black/6 bg-ceramic-beige">

              {/* Slide 1: Image */}
              <div
                className={`absolute inset-0 w-full h-full transition-all duration-700 ${
                  aboutSlide === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <Image
                  src="/images/about-plantation.webp"
                  alt="Lush coffee estate under forest canopy in Coorg, India"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Slide 2: Video */}
              <div
                className={`absolute inset-0 w-full h-full transition-all duration-700 ${
                  aboutSlide === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <video
                  src="/videos/collecting-coffee.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

              {/* Carousel Navigation Dots */}
              <div className="absolute top-4 right-4 flex gap-1.5 z-10 bg-black/40 backdrop-blur-md px-2.5 py-2 rounded-full border border-white/10 shadow-sm">
                <button
                  onClick={() => setAboutSlide(0)}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                    aboutSlide === 0 ? 'bg-white w-3.5' : 'bg-white/45 hover:bg-white/70'
                  }`}
                  aria-label="Show image"
                />
                <button
                  onClick={() => setAboutSlide(1)}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                    aboutSlide === 1 ? 'bg-white w-3.5' : 'bg-white/45 hover:bg-white/70'
                  }`}
                  aria-label="Show video"
                />
              </div>

              {/* Floating overlay badge on image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/40 flex items-center justify-between shadow-sm z-10">
                <div>
                  <span className="text-[10px] font-bold text-export-green tracking-wider uppercase block">Sourcing Origin</span>
                  <span className="text-base font-bold text-deep-forest block">
                    {aboutSlide === 0 ? 'Coorg, Karnataka' : 'Estate Harvesting'}
                  </span>
                  <span className="text-xs text-text-muted block">
                    {aboutSlide === 0 ? 'Western Ghats • India' : 'Collecting Coffee Cherries'}
                  </span>
                </div>
                <div className="bg-soft-green text-export-green text-xs font-bold px-3 py-1.5 rounded-full">
                  {aboutSlide === 0 ? '1,100m Altitude' : 'Actual Footage'}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
