import { useState, useEffect } from 'react';
import Image from 'next/image';
import { scrollToSection } from '@/utils/scroll';

const regions = [
  {
    name: "Coorg",
    subtitle: "Karnataka • Western Ghats",
    titleFull: "Coorg Terroir",
    image: "/images/origin-coorg.webp",
    alt: "Coorg region",
    elevation: "1,100 – 1,400m",
    varieties: "Arabica & Robusta",
    cupProfile: "Spicy & Mild",
    cta: "Request Coorg Sourcing"
  },
  {
    name: "Chikmagalur",
    subtitle: "Karnataka • Bababudangiri",
    titleFull: "Chikmagalur Terroir",
    image: "/images/origin-chikmagalur.webp",
    alt: "Chikmagalur region",
    elevation: "1,200 – 1,600m",
    varieties: "Arabica S.795",
    cupProfile: "Bright & Balanced",
    cta: "Request Chikmagalur Sourcing"
  },
  {
    name: "Wayanad",
    subtitle: "Kerala • Malabar Highlands",
    titleFull: "Wayanad Terroir",
    image: "/images/origin-wayanad.webp",
    alt: "Wayanad region",
    elevation: "700 – 900m",
    varieties: "Robusta Parchment",
    cupProfile: "Bold & Heavy Crema",
    cta: "Request Wayanad Sourcing"
  },
  {
    name: "Araku Valley",
    subtitle: "Andhra Pradesh • Eastern Ghats",
    titleFull: "Araku Terroir",
    image: "/images/origin-araku.webp",
    alt: "Araku Valley region",
    elevation: "900 – 1,100m",
    varieties: "Organic Arabica",
    cupProfile: "Rich & Spicy Aroma",
    cta: "Request Araku Sourcing"
  }
];

export default function SourcingOrigins() {
  const [activeSourcingCard, setActiveSourcingCard] = useState<number | null>(null);

  const handleSourcingCardClick = (e: React.MouseEvent, index: number) => {
    if (window.innerWidth < 768) {
      if (activeSourcingCard !== index) {
        e.preventDefault();
        setActiveSourcingCard(index);
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-sourcing-card]')) {
        setActiveSourcingCard(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <section id="sourcing" className="py-24 bg-ceramic-beige text-text-strong font-sans border-t border-black/4">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-coffee-roast tracking-wider uppercase mb-3 block">
            Origin Terroirs
          </span>
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-espresso-dark leading-[1.05] tracking-[-0.04em] mb-4">
            Sourcing & Origin
          </h2>
          <p className="text-text-muted text-sm leading-relaxed max-w-xl mx-auto font-medium">
            We source raw export-grade beans directly from India's four primary coffee-growing regions, preserving micro-climate and elevation characteristics.
          </p>
        </div>

        {/* Cards Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {regions.map((region, idx) => (
            <a
              key={idx}
              href="#rfq"
              data-sourcing-card
              onClick={(e) => {
                handleSourcingCardClick(e, idx);
                if (window.innerWidth >= 768) {
                  scrollToSection(e, '#rfq');
                }
              }}
              className={`group block cursor-pointer relative rounded-2xl overflow-hidden aspect-3/4 border border-black/3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 ${
                activeSourcingCard === idx
                  ? '-translate-y-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.08)]'
                  : 'hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]'
              }`}
            >
              {/* Region Image Container */}
              <div
                className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-out ${
                  activeSourcingCard === idx ? 'scale-105' : 'group-hover:scale-105'
                }`}
              >
                <Image
                  src={region.image}
                  alt={region.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 via-50% to-transparent pointer-events-none" />

              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                {/* Default Title State */}
                <div
                  className={`transform translate-y-0 opacity-100 transition-all duration-500 ease-out ${
                    activeSourcingCard === idx ? '-translate-y-8 opacity-0' : 'group-hover:-translate-y-8 group-hover:opacity-0'
                  }`}
                >
                  <span className="text-[10px] text-white/60 font-sans tracking-widest uppercase font-semibold">
                    {region.subtitle}
                  </span>
                  <h3 className="font-display font-normal text-3xl tracking-tight mt-1">
                    {region.name}
                  </h3>
                </div>

                {/* Hover Specs State */}
                <div
                  className={`absolute bottom-5 left-5 right-5 transform transition-all duration-500 ease-out flex flex-col ${
                    activeSourcingCard === idx
                      ? 'translate-y-0 opacity-100 pointer-events-auto'
                      : 'translate-y-8 opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto'
                  }`}
                >
                  <span className="text-[10px] text-white/50 font-sans tracking-widest uppercase font-semibold">
                    {region.subtitle}
                  </span>
                  <h4 className="font-display font-normal text-2xl tracking-tight text-white mb-2">
                    {region.titleFull}
                  </h4>
                  <div className="w-full h-px bg-white/20 my-1" />
                  <div className="flex flex-col gap-1.5 text-xs text-white/90 mb-3">
                    <div className="flex justify-between">
                      <span className="text-white/50">Elevation</span>
                      <span className="font-medium">{region.elevation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Varieties</span>
                      <span className="font-medium">{region.varieties}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Cup Profile</span>
                      <span className="font-medium text-soft-green">{region.cupProfile}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToSection(e, '#rfq');
                    }}
                    className="text-[10px] font-bold text-espresso-dark bg-white rounded-full py-2 text-center transition-colors hover:bg-soft-brown hover:text-coffee-roast cursor-pointer w-full"
                  >
                    {region.cta}
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
