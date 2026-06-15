import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProcessStep {
  title: string;
  description: string;
  image: string;
  details?: { label: string; value: string; }[];
}

interface ExportProcessMobileProps {
  steps: ProcessStep[];
}

export default function ExportProcessMobile({ steps }: ExportProcessMobileProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, steps.length]);

  return (
    <div 
      className="flex flex-col gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {steps.map((step, idx) => {
        const isActive = activeStep === idx;
        return (
          <div
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`flex flex-col gap-3 p-5 transition-all duration-300 cursor-pointer ${
              isActive 
                ? 'pl-6 relative' 
                : 'hover:bg-black/2.5 pl-6 relative'
            }`}
          >
            {/* Left Loader / Indicator Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-300 ${
              isActive ? 'bg-coffee-roast' : 'bg-black/10'
            }`} />

            {/* Left Loader Active Progress Bar Overlay */}
            {isActive && (
              <div
                className="absolute left-0 top-0 w-[3px] bg-action-green origin-top rounded-full"
                style={{
                  height: '100%',
                  transformOrigin: 'top',
                  animation: isHovered ? 'none' : 'load-progress 3s linear forwards',
                }}
              />
            )}

            {/* Step Header */}
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                isActive ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
              }`}>
                {idx + 1}
              </div>
              <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${
                isActive ? 'text-espresso-dark font-bold' : 'text-espresso-dark/70'
              }`}>
                {step.title}
              </h4>
            </div>

            {/* Description */}
            <p className="text-xs text-text-muted leading-relaxed font-medium">
              {step.description}
            </p>

            {/* Image (Visible only for the active step) */}
            {isActive && (
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-black/10 bg-ceramic-beige shadow-xs mt-2 transition-all duration-500 animate-fade-rise">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
