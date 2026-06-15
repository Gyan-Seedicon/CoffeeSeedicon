import { useState, useEffect } from 'react';
import Image from 'next/image';
import QualityQAMobile from './QualityQAMobile';

const qcSteps = [
  {
    title: "Bean Grading",
    description: "Calibration of bean screen sizes (Screen 15+ to 18) and visual count checking under strict B2B export guidelines.",
    image: "/images/qc-grading.webp",
    alt: "Bean Grading Quality Control"
  },
  {
    title: "Moisture Testing",
    description: "Digital testing checked against multiple parameters to maintain moisture strictly below 12.5%, preventing transit damage.",
    image: "/images/qc-moisture.webp",
    alt: "Coffee Bean Moisture Testing"
  },
  {
    title: "Density Sorting",
    description: "Multi-stage gravity separation and optical sorting to remove physical defects, sour beans, and organic debris.",
    image: "/images/qc-sorting.webp",
    alt: "Optical and Density Bean Sorting"
  },
  {
    title: "Packaging Standards",
    description: "Heavy-duty GrainPro protective liners inside double-stitched 60kg jute bags to shield beans from moisture shifts.",
    image: "/images/qc-packaging.webp",
    alt: "Jute and GrainPro Coffee Packaging"
  },
  {
    title: "Pre-Shipment surveyor inspection",
    description: "Final phytosanitary audit and quality surveyor approval prior to container sealing and ocean transit.",
    image: "/images/qc-shipping.webp",
    alt: "B2B Cargo Pre-Shipment Inspection"
  }
];

const certifications = [
  {
    name: "FSSAI Certified",
    image: "/images/Certifications/Fssai.webp"
  },
  {
    name: "APEDA Licensed",
    image: "/images/Certifications/Apeda.webp"
  },
  {
    name: "Organic Certified",
    image: "/images/Certifications/Organic.webp"
  },
  {
    name: "Fair Trade",
    image: "/images/Certifications/Fairtrade.webp"
  },
  {
    name: "Rainforest Alliance",
    image: "/images/Certifications/Rainforest.webp"
  }
];

export default function QualityQA() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHoveredQc, setIsHoveredQc] = useState(false);

  useEffect(() => {
    if (isHoveredQc) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % qcSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHoveredQc]);

  return (
    <section id="quality" className="py-24 bg-warm-cream text-text-strong font-sans border-t border-black/4">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-coffee-roast tracking-wider uppercase mb-3 block">
            Strict B2B Compliance
          </span>
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-espresso-dark leading-[1.05] tracking-[-0.04em] mb-4">
            Quality & Certifications
          </h2>
          <p className="text-text-muted text-sm leading-relaxed max-w-xl mx-auto font-medium">
            Every batch is density-sorted, moisture-calibrated, and certified before container dispatch.
          </p>
        </div>

        {/* Mobile QA View */}
        <div className="block lg:hidden">
          <QualityQAMobile steps={qcSteps} />
        </div>

        {/* Desktop QA View */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

          {/* Left Column: Visual Laboratory QC Focus (Cross-fading slideshow) */}
          <div className="lg:col-span-5 relative self-stretch min-h-[450px] lg:min-h-0">
            <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-black/6 bg-ceramic-beige shadow-md">
              {qcSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                    idx === activeStep ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent pointer-events-none z-20" />
            </div>
          </div>

          {/* Right Column: QA Processes */}
          <div className="lg:col-span-7 flex flex-col justify-between py-1">

            {/* QA Timeline Steps */}
            <div
              className="space-y-4"
              onMouseEnter={() => setIsHoveredQc(true)}
              onMouseLeave={() => setIsHoveredQc(false)}
            >
              {qcSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 group cursor-pointer pl-6 py-2.5 relative transition-all duration-300 rounded-r-xl ${
                    idx === activeStep ? 'bg-coffee-roast/5' : 'hover:bg-black/2.5'
                  }`}
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  {/* Left Loader Bar Background */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/10 rounded-full" />
                  
                  {/* Left Loader Active Progress Bar */}
                  {activeStep === idx && (
                    <div
                      className="absolute left-0 top-0 w-[2.5px] bg-coffee-roast origin-top rounded-full"
                      style={{
                        height: '100%',
                        transformOrigin: 'top',
                        animation: isHoveredQc ? 'none' : 'load-progress 2s linear forwards',
                      }}
                    />
                  )}

                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      idx === activeStep ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                    }`}>
                      {idx + 1}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${
                      idx === activeStep ? 'text-espresso-dark font-bold' : 'text-espresso-dark/70'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed font-medium max-w-xl mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Certifications Section */}
        <div className="border-t border-black/6 pt-12 mt-16 text-center">
          <span className="text-xs font-bold text-coffee-roast uppercase tracking-widest block mb-8">
            Export Certifications & Credentials
          </span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 group">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white border border-black/6 shadow-sm flex items-center justify-center p-4 sm:p-5.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md relative">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      sizes="(max-width: 640px) 48px, 64px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <span className="text-[11px] sm:text-[13px] font-bold text-coffee-roast transition-colors duration-300 group-hover:text-espresso-dark">
                  {cert.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
