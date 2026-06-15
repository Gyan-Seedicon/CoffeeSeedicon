import { useState, useEffect } from 'react';
import Image from 'next/image';

const processSteps = [
  {
    title: "Buyer Inquiry",
    description: "Submit your coffee specifications, target pricing, and destination port. Our export desk replies with a preliminary quote within 24 hours.",
    image: "/images/process-inquiry.webp",
    details: [
      { label: "Response Time", value: "< 24 Hours" },
      { label: "Pricing Model", value: "FOB, CIF, CFR" },
      { label: "Inquiry Desk", value: "Direct B2B Routing" }
    ]
  },
  {
    title: "Sample Approval",
    description: "We dispatch physical green and roasted bean samples for your physical, visual, and sensory cupping evaluation prior to signing.",
    image: "/images/process-sample.webp",
    details: [
      { label: "Sample Size", value: "300g – 500g" },
      { label: "Dispatch Method", value: "DHL Express Air" },
      { label: "Turnaround", value: "3 – 5 Business Days" }
    ]
  },
  {
    title: "Contract Finalization",
    description: "Align on custom contract volumes, delivery schedules, B2B payment terms (L/C or T/T), and sign the official trade agreement.",
    image: "/images/process-contract.webp",
    details: [
      { label: "Payment Options", value: "L/C, T/T, Escrow" },
      { label: "Standard terms", value: "IncoTerms 2020" },
      { label: "Contract Basis", value: "FOB / CIF / CFR" }
    ]
  },
  {
    title: "Production & Quality",
    description: "Beans are processed, graded to screen specifications, density sorted, and checked for moisture compliance.",
    image: "/images/process-production.webp",
    details: [
      { label: "Milling Screen", value: "Screens 15+ to 18" },
      { label: "Moisture Level", value: "< 12.5% strictly" },
      { label: "Quality Audit", value: "Every batch checked" }
    ]
  },
  {
    title: "Export Documentation",
    description: "We handle all certificate creations, including Phytosanitary Certificates, Certificates of Origin, Bill of Lading, and Customs clearances.",
    image: "/images/process-docs.webp",
    details: [
      { label: "Docs Lead Time", value: "3 – 5 Days" },
      { label: "Custom Clearance", value: "100% compliant documents" },
      { label: "Audit Body", value: "APEDA / Customs Board" }
    ]
  },
  {
    title: "International Shipping",
    description: "Secure loading into sea containers with protective GrainPro liners, and ocean vessel dispatch to your global destination port.",
    image: "/images/process-shipping.webp",
    details: [
      { label: "Container Cargo", value: "20ft (20 MT net)" },
      { label: "Packaging Type", value: "GrainPro + 60kg Jute" },
      { label: "Carrier Partners", value: "Maersk, MSC, CMA CGM" }
    ]
  }
];

export default function ExportProcess() {
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [isHoveredProcess, setIsHoveredProcess] = useState(false);

  useEffect(() => {
    if (isHoveredProcess) return;
    const interval = setInterval(() => {
      setActiveProcessStep((prev) => (prev + 1) % processSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHoveredProcess]);

  return (
    <section id="process" className="py-24 bg-ceramic-beige text-text-strong font-sans border-t border-black/4">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-coffee-roast tracking-wider uppercase mb-3 block">
            B2B Sourcing Route
          </span>
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-espresso-dark leading-[1.05] tracking-[-0.04em] mb-4">
            Export Process Flow
          </h2>
          <p className="text-text-muted text-sm leading-relaxed max-w-xl mx-auto font-medium">
            A transparent, step-by-step export workflow from specifications audit to final ocean freight container dispatch.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

          {/* Left Column: Timeline Steps */}
          <div className="lg:col-span-7 flex flex-col justify-between py-1">

            {/* QA Timeline Steps */}
            <div
              className="space-y-4"
              onMouseEnter={() => setIsHoveredProcess(true)}
              onMouseLeave={() => setIsHoveredProcess(false)}
            >
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 group cursor-pointer pl-6 py-2.5 relative transition-all duration-300 rounded-r-xl ${
                    activeProcessStep === idx ? 'bg-coffee-roast/5' : 'hover:bg-black/2.5'
                  }`}
                  onMouseEnter={() => setActiveProcessStep(idx)}
                >
                  {/* Left Loader Bar Background */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/10 rounded-full" />
                  
                  {/* Left Loader Active Progress Bar */}
                  {activeProcessStep === idx && (
                    <div
                      className="absolute left-0 top-0 w-[2.5px] bg-coffee-roast origin-top rounded-full"
                      style={{
                        height: '100%',
                        transformOrigin: 'top',
                        animation: isHoveredProcess ? 'none' : 'load-progress 2s linear forwards',
                      }}
                    />
                  )}

                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      activeProcessStep === idx ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                    }`}>
                      {idx + 1}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${
                      activeProcessStep === idx ? 'text-espresso-dark font-bold' : 'text-espresso-dark/70'
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

          {/* Right Column: Visual Sourcing Route Focus (Cross-fading slideshow) */}
          <div className="lg:col-span-5 relative self-stretch min-h-[450px] lg:min-h-0">
            <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-black/6 bg-ceramic-beige shadow-md">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                    activeProcessStep === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent pointer-events-none z-20" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
