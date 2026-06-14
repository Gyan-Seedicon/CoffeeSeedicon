"use client";

import { useState, useEffect, useRef } from 'react';
import { LogIn, UserPlus, Play, Sparkles, Menu, X, ArrowRight, Globe, Sprout, Zap, Award, Flame, Check } from 'lucide-react';
import Lenis from 'lenis';

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

const processSteps = [
  {
    title: "Buyer Inquiry",
    description: "Submit your coffee specifications, target pricing, and destination port. Our export desk replies with a preliminary quote within 24 hours.",
    image: "/images/process-inquiry.png",
    details: [
      { label: "Response Time", value: "< 24 Hours" },
      { label: "Pricing Model", value: "FOB, CIF, CFR" },
      { label: "Inquiry Desk", value: "Direct B2B Routing" }
    ]
  },
  {
    title: "Sample Approval",
    description: "We dispatch physical green and roasted bean samples for your physical, visual, and sensory cupping evaluation prior to signing.",
    image: "/images/process-sample.png",
    details: [
      { label: "Sample Size", value: "300g – 500g" },
      { label: "Dispatch Method", value: "DHL Express Air" },
      { label: "Turnaround", value: "3 – 5 Business Days" }
    ]
  },
  {
    title: "Contract Finalization",
    description: "Align on custom contract volumes, delivery schedules, B2B payment terms (L/C or T/T), and sign the official trade agreement.",
    image: "/images/process-contract.png",
    details: [
      { label: "Payment Options", value: "L/C, T/T, Escrow" },
      { label: "Standard terms", value: "IncoTerms 2020" },
      { label: "Contract Basis", value: "FOB / CIF / CFR" }
    ]
  },
  {
    title: "Production & Quality",
    description: "Beans are processed, graded to screen specifications, density sorted, and checked for moisture compliance.",
    image: "/images/process-production.png",
    details: [
      { label: "Milling Screen", value: "Screens 15+ to 18" },
      { label: "Moisture Level", value: "< 12.5% strictly" },
      { label: "Quality Audit", value: "Every batch checked" }
    ]
  },
  {
    title: "Export Documentation",
    description: "We handle all certificate creations, including Phytosanitary Certificates, Certificates of Origin, Bill of Lading, and Customs clearances.",
    image: "/images/process-docs.png",
    details: [
      { label: "Docs Lead Time", value: "3 – 5 Days" },
      { label: "Custom Clearance", value: "100% compliant documents" },
      { label: "Audit Body", value: "APEDA / Customs Board" }
    ]
  },
  {
    title: "International Shipping",
    description: "Secure loading into sea containers with protective GrainPro liners, and ocean vessel dispatch to your global destination port.",
    image: "/images/process-shipping.png",
    details: [
      { label: "Container Cargo", value: "20ft (20 MT net)" },
      { label: "Packaging Type", value: "GrainPro + 60kg Jute" },
      { label: "Carrier Partners", value: "Maersk, MSC, CMA CGM" }
    ]
  }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;
    let delayTimeoutId: NodeJS.Timeout;

    const checkLoop = () => {
      if (!video) return;
      const currentTime = video.currentTime;
      const duration = video.duration;

      if (duration > 0) {
        if (currentTime < 0.5) {
          video.style.opacity = (currentTime / 0.5).toString();
        } else if (duration - currentTime < 0.5) {
          video.style.opacity = Math.max(0, (duration - currentTime) / 0.5).toString();
        } else {
          video.style.opacity = "1";
        }
      }
      animationFrameId = requestAnimationFrame(checkLoop);
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      video.pause();
      delayTimeoutId = setTimeout(() => {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => console.log("Video replay prevented:", err));
        }
      }, 100);
    };

    video.addEventListener('ended', handleEnded);

    video.src = BG_VIDEO;
    video.load();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => console.log("Video play prevented:", err));
    }

    animationFrameId = requestAnimationFrame(checkLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(delayTimeoutId);
      if (video) {
        video.removeEventListener('ended', handleEnded);
        video.pause();
      }
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const [activeStep, setActiveStep] = useState(0);
  const [isHoveredQc, setIsHoveredQc] = useState(false);

  useEffect(() => {
    if (isHoveredQc) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHoveredQc]);

  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [isHoveredProcess, setIsHoveredProcess] = useState(false);

  useEffect(() => {
    if (isHoveredProcess) return;
    const interval = setInterval(() => {
      setActiveProcessStep((prev) => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHoveredProcess]);

  // RFQ Form States
  const [rfqName, setRfqName] = useState('');
  const [rfqEmail, setRfqEmail] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqLocation, setRfqLocation] = useState('');
  const [rfqCoffeeType, setRfqCoffeeType] = useState('');
  const [rfqQuantity, setRfqQuantity] = useState('');
  const [rfqCountry, setRfqCountry] = useState('');
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  // Sourcing mobile toggle state
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

  const navLinks = [
    { href: '#sourcing', label: 'Sourcing' },
    { href: '#products', label: 'Coffee Products' },
    { href: '#quality', label: 'Quality QA' },
    { href: '#process', label: 'Export Process' },
  ];

  return (
    <div className="min-h-screen bg-warm-cream selection:bg-soft-green selection:text-deep-forest">
      {/* Hero Section (Full Screen) */}
      <section className="relative w-full h-screen overflow-hidden font-sans bg-white">
        {/* Cinematic Video Background */}
        <div className="absolute inset-x-0 bottom-0 top-[300px] z-0 overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-0 pointer-events-none"
            muted
            playsInline
            preload="auto"
          />
          {/* Top blend gradient to match white background */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-white to-transparent z-10 pointer-events-none" />
          {/* Bottom blend gradient to match next section background (ceramic-beige) */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-ceramic-beige to-transparent z-10 pointer-events-none" />
        </div>

        {/* Navigation Bar */}
        <nav className="relative z-10 px-8 py-6 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-black">
            <img 
              src="/images/wordmark.png" 
              alt="Seedicon Coffee Exports" 
              className="h-6 w-auto object-contain" 
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-black transition-colors hover:text-black">
              Sourcing
            </a>
            <a href="#products" className="text-sm font-medium text-[#6F6F6F] transition-colors hover:text-black">
              Coffee Products
            </a>
            <a href="#quality" className="text-sm font-medium text-[#6F6F6F] transition-colors hover:text-black">
              Quality QA
            </a>
            <a href="#process" className="text-sm font-medium text-[#6F6F6F] transition-colors hover:text-black">
              Export Process
            </a>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <a
              href="#rfq"
              className="bg-linear-to-r from-deep-forest to-export-green hover:scale-103 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 inline-block shadow-sm shadow-deep-forest/10"
            >
              Get Pricing
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-transparent text-black hover:bg-black/5 hover:border-black/20 transition-all duration-300 cursor-pointer"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <Menu
              className={`w-[18px] h-[18px] absolute transition-all duration-300 ${menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                }`}
            />
            <X
              className={`w-[18px] h-[18px] absolute transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                }`}
            />
          </button>
        </nav>

        {/* Mobile menu overlay */}
        <div
          className={`md:hidden fixed inset-0 z-20 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          onClick={() => setMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>

        {/* Mobile menu drawer */}
        <div
          className={`md:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col h-full pt-16 px-8 pb-8">
            <div className="flex flex-col gap-1">
              <a href="#about" onClick={() => setMenuOpen(false)} className="text-xl font-normal text-black py-4 border-b border-black/5 transition-colors">
                Sourcing
              </a>
              <a href="#products" onClick={() => setMenuOpen(false)} className="text-xl font-normal text-[#6F6F6F] hover:text-black py-4 border-b border-black/5 transition-colors">
                Coffee Products
              </a>
              <a href="#quality" onClick={() => setMenuOpen(false)} className="text-xl font-normal text-[#6F6F6F] hover:text-black py-4 border-b border-black/5 transition-colors">
                Quality QA
              </a>
              <a href="#process" onClick={() => setMenuOpen(false)} className="text-xl font-normal text-[#6F6F6F] hover:text-black py-4 border-b border-black/5 transition-colors">
                Export Process
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <a href="#rfq" onClick={() => setMenuOpen(false)} className="text-center bg-linear-to-r from-deep-forest to-export-green hover:scale-103 text-white text-sm font-semibold px-5 py-3 rounded-full transition-all duration-300 shadow-sm shadow-deep-forest/10">
                Get Pricing
              </a>
            </div>
          </div>
        </div>

        {/* Hero Section Copy */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ paddingTop: 'calc(8rem - 75px)', paddingBottom: '10rem' }}
        >
          <h1
            className="font-normal leading-[0.95] text-5xl sm:text-6xl md:text-7xl max-w-7xl font-display text-black animate-fade-rise"
            style={{ letterSpacing: '-2.46px' }}
          >
            <span className="bg-linear-to-r from-coffee-roast via-latte-accent to-espresso-dark bg-clip-text text-transparent">
              Premium Indian Coffee
            </span>{' '}
            <span className="text-[#6F6F6F] italic">Connecting</span>
            <br className="hidden sm:block" />{' '}
            <span className="text-[#6F6F6F] italic">Global Markets</span>
          </h1>
          <p className="mt-8 text-[#6F6F6F] text-base sm:text-lg leading-relaxed max-w-2xl animate-fade-rise-delay">
            Sourcing and exporting top-grade Arabica, Robusta, and specialty coffee beans directly from India's finest estates to global roasters.
          </p>
          <div>
            <a
              href="#rfq"
              className="bg-linear-to-r from-deep-forest to-export-green hover:scale-103 hover:shadow-lg text-white text-sm sm:text-base font-semibold px-8 py-3.5 sm:px-14 sm:py-5 rounded-full transition-all duration-300 inline-block mt-12 animate-fade-rise-delay-2 shadow-md shadow-deep-forest/20"
            >
              Get Export Pricing
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-ceramic-beige text-text-strong font-sans border-t border-black/4">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-12 gap-16 items-center">

          {/* Column 1: Sourcing info & grid highlight */}
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

          {/* Column 2: Coffee estate photo panel */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden border border-black/6 bg-ceramic-beige">
                <img
                  src="/images/about-plantation.png"
                  alt="Lush coffee estate under forest canopy in Coorg, India"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

                {/* Floating overlay badge on image */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/40 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold text-export-green tracking-wider uppercase block">Sourcing Origin</span>
                    <span className="text-base font-bold text-deep-forest block">Coorg, Karnataka</span>
                    <span className="text-xs text-text-muted block">Western Ghats • India</span>
                  </div>
                  <div className="bg-soft-green text-export-green text-xs font-bold px-3 py-1.5 rounded-full">
                    1,100m Altitude
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Coffee Products Section */}
      <section id="products" className="py-24 bg-warm-cream text-text-strong font-sans border-t border-black/4">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">

          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-coffee-roast tracking-wider uppercase mb-3 block">
              B2B Export Inventory
            </span>
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-espresso-dark leading-[1.05] tracking-[-0.04em] mb-4">
              Premium Coffee Selections
            </h2>
            <p className="text-text-muted text-sm leading-relaxed max-w-xl mx-auto font-medium">
              We export premium Indian coffee varieties, graded and sorted in bulk containers to meet global roasting requirements.
            </p>
          </div>          {/* Cards Grid Layout: 5 Cards in a Row on Desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">

            {/* Product 1: Arabica Coffee */}
            <a
              href="#rfq"
              className="group block cursor-pointer"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-ceramic-beige border border-black/3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <img
                  src="/images/Arabica Coffee.png"
                  alt="Arabica Coffee"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display font-normal text-xl sm:text-2xl text-espresso-dark group-hover:text-coffee-roast transition-colors tracking-tight">
                  Arabica Coffee
                </h3>
                <ArrowRight className="w-4 h-4 text-espresso-dark/40 transform -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-coffee-roast" />
              </div>
            </a>

            {/* Product 2: Robusta Coffee */}
            <a
              href="#rfq"
              className="group block cursor-pointer"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-ceramic-beige border border-black/3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <img
                  src="/images/Robusta.png"
                  alt="Robusta Coffee"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display font-normal text-xl sm:text-2xl text-espresso-dark group-hover:text-coffee-roast transition-colors tracking-tight">
                  Robusta Coffee
                </h3>
                <ArrowRight className="w-4 h-4 text-espresso-dark/40 transform -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-coffee-roast" />
              </div>
            </a>

            {/* Product 3: Specialty Coffee */}
            <a
              href="#rfq"
              className="group block cursor-pointer"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-ceramic-beige border border-black/3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <img
                  src="/images/Specialty.png"
                  alt="Specialty Coffee"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display font-normal text-xl sm:text-2xl text-espresso-dark group-hover:text-coffee-roast transition-colors tracking-tight">
                  Specialty Coffee
                </h3>
                <ArrowRight className="w-4 h-4 text-espresso-dark/40 transform -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-coffee-roast" />
              </div>
            </a>

            {/* Product 4: Green Coffee Beans */}
            <a
              href="#rfq"
              className="group block cursor-pointer"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-ceramic-beige border border-black/3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <img
                  src="/images/Green.png"
                  alt="Green Coffee Beans"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display font-normal text-xl sm:text-2xl text-espresso-dark group-hover:text-coffee-roast transition-colors tracking-tight">
                  Green Beans
                </h3>
                <ArrowRight className="w-4 h-4 text-espresso-dark/40 transform -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-coffee-roast" />
              </div>
            </a>

            {/* Product 5: Roasted Coffee */}
            <a
              href="#rfq"
              className="group block cursor-pointer"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-ceramic-beige border border-black/3 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <img
                  src="/images/Roasted .png"
                  alt="Roasted Coffee"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display font-normal text-xl sm:text-2xl text-espresso-dark group-hover:text-coffee-roast transition-colors tracking-tight">
                  Roasted Coffee
                </h3>
                <ArrowRight className="w-4 h-4 text-espresso-dark/40 transform -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-coffee-roast" />
              </div>
            </a>

          </div>

        </div>
      </section>

      {/* 4. Sourcing & Origin Section */}
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

            {/* Region 1: Coorg */}
            <a
              href="#rfq"
              data-sourcing-card
              onClick={(e) => handleSourcingCardClick(e, 0)}
              className={`group block cursor-pointer relative rounded-2xl overflow-hidden aspect-3/4 border border-black/3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 ${activeSourcingCard === 0 ? '-translate-y-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.08)]' : 'hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]'
                }`}
            >
              <img
                src="/images/origin-coorg.png"
                alt="Coorg region"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${activeSourcingCard === 0 ? 'scale-105' : 'group-hover:scale-105'}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 via-50% to-transparent pointer-events-none" />

              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                {/* Default Title State */}
                <div className={`transform translate-y-0 opacity-100 transition-all duration-500 ease-out ${activeSourcingCard === 0 ? '-translate-y-8 opacity-0' : 'group-hover:-translate-y-8 group-hover:opacity-0'}`}>
                  <span className="text-[10px] text-white/60 font-sans tracking-widest uppercase font-semibold">
                    Karnataka • Western Ghats
                  </span>
                  <h3 className="font-display font-normal text-3xl tracking-tight mt-1">
                    Coorg
                  </h3>
                </div>

                {/* Hover Specs State */}
                <div className={`absolute bottom-5 left-5 right-5 transform transition-all duration-500 ease-out flex flex-col ${activeSourcingCard === 0 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto'}`}>
                  <span className="text-[10px] text-white/50 font-sans tracking-widest uppercase font-semibold">
                    Karnataka • Western Ghats
                  </span>
                  <h4 className="font-display font-normal text-2xl tracking-tight text-white mb-2">
                    Coorg Terroir
                  </h4>
                  <div className="w-full h-px bg-white/20 my-1" />
                  <div className="flex flex-col gap-1.5 text-xs text-white/90 mb-3">
                    <div className="flex justify-between">
                      <span className="text-white/50">Elevation</span>
                      <span className="font-medium">1,100 – 1,400m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Varieties</span>
                      <span className="font-medium">Arabica & Robusta</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Cup Profile</span>
                      <span className="font-medium text-soft-green">Spicy & Mild</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-espresso-dark bg-white rounded-full py-2 text-center transition-colors hover:bg-soft-brown hover:text-coffee-roast">
                    Request Coorg Sourcing
                  </div>
                </div>
              </div>
            </a>

            {/* Region 2: Chikmagalur */}
            <a
              href="#rfq"
              data-sourcing-card
              onClick={(e) => handleSourcingCardClick(e, 1)}
              className={`group block cursor-pointer relative rounded-2xl overflow-hidden aspect-3/4 border border-black/3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 ${activeSourcingCard === 1 ? '-translate-y-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.08)]' : 'hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]'
                }`}
            >
              <img
                src="/images/origin-chikmagalur.png"
                alt="Chikmagalur region"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${activeSourcingCard === 1 ? 'scale-105' : 'group-hover:scale-105'}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 via-50% to-transparent pointer-events-none" />

              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                {/* Default Title State */}
                <div className={`transform translate-y-0 opacity-100 transition-all duration-500 ease-out ${activeSourcingCard === 1 ? '-translate-y-8 opacity-0' : 'group-hover:-translate-y-8 group-hover:opacity-0'}`}>
                  <span className="text-[10px] text-white/60 font-sans tracking-widest uppercase font-semibold">
                    Karnataka • Bababudangiri
                  </span>
                  <h3 className="font-display font-normal text-3xl tracking-tight mt-1">
                    Chikmagalur
                  </h3>
                </div>

                {/* Hover Specs State */}
                <div className={`absolute bottom-5 left-5 right-5 transform transition-all duration-500 ease-out flex flex-col ${activeSourcingCard === 1 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto'}`}>
                  <span className="text-[10px] text-white/50 font-sans tracking-widest uppercase font-semibold">
                    Karnataka • Bababudangiri
                  </span>
                  <h4 className="font-display font-normal text-2xl tracking-tight text-white mb-2">
                    Chikmagalur Terroir
                  </h4>
                  <div className="w-full h-px bg-white/20 my-1" />
                  <div className="flex flex-col gap-1.5 text-xs text-white/90 mb-3">
                    <div className="flex justify-between">
                      <span className="text-white/50">Elevation</span>
                      <span className="font-medium">1,200 – 1,600m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Varieties</span>
                      <span className="font-medium">Arabica S.795</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Cup Profile</span>
                      <span className="font-medium text-soft-green">Bright & Balanced</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-espresso-dark bg-white rounded-full py-2 text-center transition-colors hover:bg-soft-brown hover:text-coffee-roast">
                    Request Chikmagalur Sourcing
                  </div>
                </div>
              </div>
            </a>

            {/* Region 3: Wayanad */}
            <a
              href="#rfq"
              data-sourcing-card
              onClick={(e) => handleSourcingCardClick(e, 2)}
              className={`group block cursor-pointer relative rounded-2xl overflow-hidden aspect-3/4 border border-black/3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 ${activeSourcingCard === 2 ? '-translate-y-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.08)]' : 'hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]'
                }`}
            >
              <img
                src="/images/origin-wayanad.png"
                alt="Wayanad region"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${activeSourcingCard === 2 ? 'scale-105' : 'group-hover:scale-105'}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 via-50% to-transparent pointer-events-none" />

              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                {/* Default Title State */}
                <div className={`transform translate-y-0 opacity-100 transition-all duration-500 ease-out ${activeSourcingCard === 2 ? '-translate-y-8 opacity-0' : 'group-hover:-translate-y-8 group-hover:opacity-0'}`}>
                  <span className="text-[10px] text-white/60 font-sans tracking-widest uppercase font-semibold">
                    Kerala • Malabar Highlands
                  </span>
                  <h3 className="font-display font-normal text-3xl tracking-tight mt-1">
                    Wayanad
                  </h3>
                </div>

                {/* Hover Specs State */}
                <div className={`absolute bottom-5 left-5 right-5 transform transition-all duration-500 ease-out flex flex-col ${activeSourcingCard === 2 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto'}`}>
                  <span className="text-[10px] text-white/50 font-sans tracking-widest uppercase font-semibold">
                    Kerala • Malabar Highlands
                  </span>
                  <h4 className="font-display font-normal text-2xl tracking-tight text-white mb-2">
                    Wayanad Terroir
                  </h4>
                  <div className="w-full h-px bg-white/20 my-1" />
                  <div className="flex flex-col gap-1.5 text-xs text-white/90 mb-3">
                    <div className="flex justify-between">
                      <span className="text-white/50">Elevation</span>
                      <span className="font-medium">700 – 900m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Varieties</span>
                      <span className="font-medium">Robusta Parchment</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Cup Profile</span>
                      <span className="font-medium text-soft-green">Bold & Heavy Crema</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-espresso-dark bg-white rounded-full py-2 text-center transition-colors hover:bg-soft-brown hover:text-coffee-roast">
                    Request Wayanad Sourcing
                  </div>
                </div>
              </div>
            </a>

            {/* Region 4: Araku Valley */}
            <a
              href="#rfq"
              data-sourcing-card
              onClick={(e) => handleSourcingCardClick(e, 3)}
              className={`group block cursor-pointer relative rounded-2xl overflow-hidden aspect-3/4 border border-black/3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 ${activeSourcingCard === 3 ? '-translate-y-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.08)]' : 'hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]'
                }`}
            >
              <img
                src="/images/origin-araku.png"
                alt="Araku Valley region"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${activeSourcingCard === 3 ? 'scale-105' : 'group-hover:scale-105'}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 via-50% to-transparent pointer-events-none" />

              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                {/* Default Title State */}
                <div className={`transform translate-y-0 opacity-100 transition-all duration-500 ease-out ${activeSourcingCard === 3 ? '-translate-y-8 opacity-0' : 'group-hover:-translate-y-8 group-hover:opacity-0'}`}>
                  <span className="text-[10px] text-white/60 font-sans tracking-widest uppercase font-semibold">
                    Andhra Pradesh • Eastern Ghats
                  </span>
                  <h3 className="font-display font-normal text-3xl tracking-tight mt-1">
                    Araku Valley
                  </h3>
                </div>

                {/* Hover Specs State */}
                <div className={`absolute bottom-5 left-5 right-5 transform transition-all duration-500 ease-out flex flex-col ${activeSourcingCard === 3 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto'}`}>
                  <span className="text-[10px] text-white/50 font-sans tracking-widest uppercase font-semibold">
                    Andhra Pradesh • Eastern Ghats
                  </span>
                  <h4 className="font-display font-normal text-2xl tracking-tight text-white mb-2">
                    Araku Terroir
                  </h4>
                  <div className="w-full h-px bg-white/20 my-1" />
                  <div className="flex flex-col gap-1.5 text-xs text-white/90 mb-3">
                    <div className="flex justify-between">
                      <span className="text-white/50">Elevation</span>
                      <span className="font-medium">900 – 1,100m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Varieties</span>
                      <span className="font-medium">Organic Arabica</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Cup Profile</span>
                      <span className="font-medium text-soft-green">Rich & Spicy Aroma</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-espresso-dark bg-white rounded-full py-2 text-center transition-colors hover:bg-soft-brown hover:text-coffee-roast">
                    Request Araku Sourcing
                  </div>
                </div>
              </div>
            </a>

          </div>

        </div>
      </section>

      {/* 5. Quality & Certifications Section */}
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

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

            {/* Left Column: Visual Laboratory QC Focus (Cross-fading slideshow) */}
            <div className="lg:col-span-5 relative self-stretch min-h-[450px] lg:min-h-0">
              <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-black/6 bg-ceramic-beige shadow-md">
                {/* Step 1: Grading */}
                <img
                  src="/images/qc-grading.png"
                  alt="Bean Grading"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeStep === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                />
                {/* Step 2: Moisture */}
                <img
                  src="/images/qc-moisture.png"
                  alt="Moisture Testing"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeStep === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                />
                {/* Step 3: Sorting */}
                <img
                  src="/images/qc-sorting.png"
                  alt="Density Sorting"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeStep === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                />
                {/* Step 4: Packaging */}
                <img
                  src="/images/qc-packaging.png"
                  alt="Packaging Standards"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeStep === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                />
                {/* Step 5: Surveyor */}
                <img
                  src="/images/qc-shipping.png"
                  alt="Surveyor Inspection"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeStep === 4 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                />
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
                {/* Step 1 */}
                <div
                  className={`flex gap-4 group cursor-pointer border-l-2 pl-4 py-2 transition-all duration-300 ${activeStep === 0 ? 'border-coffee-roast bg-coffee-roast/5' : 'border-transparent hover:border-black/10'
                    }`}
                  onMouseEnter={() => setActiveStep(0)}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${activeStep === 0 ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                      }`}>
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${activeStep === 0 ? 'text-espresso-dark font-bold' : 'text-espresso-dark/70'
                      }`}>
                      Bean Grading
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed font-medium max-w-xl mt-0.5">
                      Calibration of bean screen sizes (Screen 15+ to 18) and visual count checking under strict B2B export guidelines.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  className={`flex gap-4 group cursor-pointer border-l-2 pl-4 py-2 transition-all duration-300 ${activeStep === 1 ? 'border-coffee-roast bg-coffee-roast/5' : 'border-transparent hover:border-black/10'
                    }`}
                  onMouseEnter={() => setActiveStep(1)}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${activeStep === 1 ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                      }`}>
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${activeStep === 1 ? 'text-espresso-dark font-bold' : 'text-espresso-dark/70'
                      }`}>
                      Moisture Testing
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed font-medium max-w-xl mt-0.5">
                      Digital testing checked against multiple parameters to maintain moisture strictly below 12.5%, preventing transit damage.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  className={`flex gap-4 group cursor-pointer border-l-2 pl-4 py-2 transition-all duration-300 ${activeStep === 2 ? 'border-coffee-roast bg-coffee-roast/5' : 'border-transparent hover:border-black/10'
                    }`}
                  onMouseEnter={() => setActiveStep(2)}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${activeStep === 2 ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                      }`}>
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${activeStep === 2 ? 'text-espresso-dark font-bold' : 'text-espresso-dark/70'
                      }`}>
                      Density Sorting
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed font-medium max-w-xl mt-0.5">
                      Multi-stage gravity separation and optical sorting to remove physical defects, sour beans, and organic debris.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div
                  className={`flex gap-4 group cursor-pointer border-l-2 pl-4 py-2 transition-all duration-300 ${activeStep === 3 ? 'border-coffee-roast bg-coffee-roast/5' : 'border-transparent hover:border-black/10'
                    }`}
                  onMouseEnter={() => setActiveStep(3)}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${activeStep === 3 ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                      }`}>
                      4
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${activeStep === 3 ? 'text-espresso-dark font-bold' : 'text-espresso-dark/70'
                      }`}>
                      Packaging Standards
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed font-medium max-w-xl mt-0.5">
                      Heavy-duty GrainPro protective liners inside double-stitched 60kg jute bags to shield beans from moisture shifts.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div
                  className={`flex gap-4 group cursor-pointer border-l-2 pl-4 py-2 transition-all duration-300 ${activeStep === 4 ? 'border-coffee-roast bg-coffee-roast/5' : 'border-transparent hover:border-black/10'
                    }`}
                  onMouseEnter={() => setActiveStep(4)}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${activeStep === 4 ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                      }`}>
                      5
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${activeStep === 4 ? 'text-espresso-dark font-bold' : 'text-espresso-dark/70'
                      }`}>
                      Pre-Shipment surveyor inspection
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed font-medium max-w-xl mt-0.5">
                      Final phytosanitary audit and quality surveyor approval prior to container sealing and ocean transit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Certifications Section */}
          <div className="border-t border-black/6 pt-12 mt-16 text-center">
            <span className="text-xs font-bold text-coffee-roast uppercase tracking-widest block mb-8">
              Export Certifications & Credentials
            </span>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {/* FSSAI */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white border border-black/6 shadow-sm flex items-center justify-center p-4 sm:p-5.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                  <img
                    src="/images/Certifications/Fssai.webp"
                    alt="FSSAI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] sm:text-[13px] font-bold text-coffee-roast transition-colors duration-300 group-hover:text-espresso-dark">
                  FSSAI Certified
                </span>
              </div>

              {/* APEDA */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white border border-black/6 shadow-sm flex items-center justify-center p-4 sm:p-5.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                  <img
                    src="/images/Certifications/Apeda.webp"
                    alt="APEDA"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] sm:text-[13px] font-bold text-coffee-roast transition-colors duration-300 group-hover:text-espresso-dark">
                  APEDA Licensed
                </span>
              </div>

              {/* Organic */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white border border-black/6 shadow-sm flex items-center justify-center p-4 sm:p-5.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                  <img
                    src="/images/Certifications/Organic.webp"
                    alt="Organic Certification"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] sm:text-[13px] font-bold text-coffee-roast transition-colors duration-300 group-hover:text-espresso-dark">
                  Organic Certified
                </span>
              </div>

              {/* Fair Trade */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white border border-black/6 shadow-sm flex items-center justify-center p-4 sm:p-5.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                  <img
                    src="/images/Certifications/Fairtrade.png"
                    alt="Fair Trade"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] sm:text-[13px] font-bold text-coffee-roast transition-colors duration-300 group-hover:text-espresso-dark">
                  Fair Trade
                </span>
              </div>

              {/* Rainforest Alliance */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white border border-black/6 shadow-sm flex items-center justify-center p-4 sm:p-5.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                  <img
                    src="/images/Certifications/Rainforest.webp"
                    alt="Rainforest Alliance"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] sm:text-[13px] font-bold text-coffee-roast transition-colors duration-300 group-hover:text-espresso-dark">
                  Rainforest Alliance
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Export Process Section */}
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

            {/* Left Column: QA Processes (Timeline Steps) */}
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
                    className={`flex gap-4 group cursor-pointer border-l-2 pl-4 py-2 transition-all duration-300 ${activeProcessStep === idx ? 'border-coffee-roast bg-coffee-roast/5' : 'border-transparent hover:border-black/10'
                      }`}
                    onMouseEnter={() => setActiveProcessStep(idx)}
                  >
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${activeProcessStep === idx ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                        }`}>
                        {idx + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${activeProcessStep === idx ? 'text-espresso-dark font-bold' : 'text-espresso-dark/70'
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
                  <img
                    key={idx}
                    src={step.image}
                    alt={step.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeProcessStep === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                  />
                ))}
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent pointer-events-none z-20" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Contact / RFQ Section */}
      <section id="rfq" className="py-24 bg-warm-cream text-text-strong font-sans border-t border-black/4">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Sourcing Desk Copy */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-bold text-coffee-roast tracking-wider uppercase mb-3 block font-sans">
              Direct Export Desk
            </span>
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-espresso-dark leading-[1.05] tracking-[-0.04em] mb-4">
              Partner with Seedicon
            </h2>
            <p className="text-text-muted text-sm leading-relaxed mb-8 font-medium">
              We build B2B trade supply chains. Submit your parameters, and our trade officers will compile pricing and logistics details within 24 hours.
            </p>

            <div className="border-t border-black/6 pt-6 text-xs text-text-muted space-y-1">
              <div>Email sourcing desk: <strong className="text-espresso-dark">export@seedicon.com</strong></div>
              <div>B2B trade hotline: <strong className="text-espresso-dark">+91 (80) 4920-5830</strong></div>
            </div>
          </div>

          {/* Right Column: Premium RFQ Form Card */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white rounded-2xl border border-black/6 p-6 sm:p-8 md:p-10 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] min-h-[420px] flex flex-col justify-center transition-all duration-500">
              {rfqSubmitted ? (
                /* Success Screen */
                <div className="text-center py-6 flex flex-col items-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-soft-green flex items-center justify-center mb-6 shadow-sm">
                    <Check className="w-8 h-8 text-export-green stroke-[3px]" />
                  </div>
                  <h3 className="font-display font-normal text-3xl text-espresso-dark mb-4">
                    RFQ submitted
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed max-w-md mx-auto mb-8 font-medium">
                    Thank you! Our B2B export desk has received your sourcing specifications. A trade officer will compile customized container pricing specs and reach out via email or your phone number within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setRfqName('');
                      setRfqEmail('');
                      setRfqPhone('');
                      setRfqLocation('');
                      setRfqCoffeeType('');
                      setRfqQuantity('');
                      setRfqCountry('');
                      setRfqSubmitted(false);
                    }}
                    className="bg-deep-forest hover:bg-export-green text-white text-xs font-bold px-6 py-3 rounded-full transition-all duration-300 transform active:scale-97 cursor-pointer"
                  >
                    Submit another sourcing RFQ
                  </button>
                </div>
              ) : (
                /* RFQ Form */
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRfqSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <h3 className="text-base font-bold text-coffee-roast uppercase tracking-wider mb-2 font-sans">
                    Request sourcing quote
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Contact Person */}
                    <div>
                      <label className="text-[10px] font-bold text-coffee-roast block mb-1.5 uppercase tracking-wider">
                        Contact person
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqName}
                        onChange={(e) => setRfqName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white border border-black/14 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-coffee-roast focus:ring-2 focus:ring-latte-accent/20 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] font-bold text-coffee-roast block mb-1.5 uppercase tracking-wider">
                        Email address
                      </label>
                      <input
                        type="email"
                        required
                        value={rfqEmail}
                        onChange={(e) => setRfqEmail(e.target.value)}
                        placeholder="buyer@roaster.com"
                        className="w-full bg-white border border-black/14 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-coffee-roast focus:ring-2 focus:ring-latte-accent/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone Number */}
                    <div>
                      <label className="text-[10px] font-bold text-coffee-roast block mb-1.5 uppercase tracking-wider">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        required
                        value={rfqPhone}
                        onChange={(e) => setRfqPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full bg-white border border-black/14 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-coffee-roast focus:ring-2 focus:ring-latte-accent/20 transition-all"
                      />
                    </div>

                    {/* Your country */}
                    <div>
                      <label className="text-[10px] font-bold text-coffee-roast block mb-1.5 uppercase tracking-wider">
                        Your country
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={rfqLocation}
                          onChange={(e) => setRfqLocation(e.target.value)}
                          className="w-full bg-white border border-black/14 rounded-xl pl-4 pr-10 py-3 text-xs font-sans appearance-none focus:outline-none focus:border-coffee-roast focus:ring-2 focus:ring-latte-accent/20 transition-all cursor-pointer"
                        >
                          <option value="" disabled>Select your country...</option>
                          <option value="United States">United States</option>
                          <option value="Germany">Germany</option>
                          <option value="Japan">Japan</option>
                          <option value="Italy">Italy</option>
                          <option value="Belgium">Belgium</option>
                          <option value="South Korea">South Korea</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="India">India</option>
                          <option value="Other">Other / International</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-coffee-roast/60">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Coffee Type */}
                    <div>
                      <label className="text-[10px] font-bold text-coffee-roast block mb-1.5 uppercase tracking-wider">
                        Coffee type
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={rfqCoffeeType}
                          onChange={(e) => setRfqCoffeeType(e.target.value)}
                          className="w-full bg-white border border-black/14 rounded-xl pl-4 pr-10 py-3 text-xs font-sans appearance-none focus:outline-none focus:border-coffee-roast focus:ring-2 focus:ring-latte-accent/20 transition-all cursor-pointer"
                        >
                          <option value="" disabled>Select coffee type...</option>
                          <option value="Arabica Coffee">Arabica Coffee</option>
                          <option value="Robusta Coffee">Robusta Coffee</option>
                          <option value="Specialty Coffee">Specialty Coffee</option>
                          <option value="Green Coffee Beans">Green Coffee Beans</option>
                          <option value="Roasted Coffee">Roasted Coffee</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-coffee-roast/60">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Required */}
                    <div>
                      <label className="text-[10px] font-bold text-coffee-roast block mb-1.5 uppercase tracking-wider">
                        Quantity required
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={rfqQuantity}
                          onChange={(e) => setRfqQuantity(e.target.value)}
                          className="w-full bg-white border border-black/14 rounded-xl pl-4 pr-10 py-3 text-xs font-sans appearance-none focus:outline-none focus:border-coffee-roast focus:ring-2 focus:ring-latte-accent/20 transition-all cursor-pointer"
                        >
                          <option value="" disabled>Select target volume...</option>
                          <option value="Trial Batch (300kg - 1 MT)">Trial Batch (300kg - 1 MT)</option>
                          <option value="LCL Cargo (1 MT - 5 MT)">LCL Cargo (1 MT - 5 MT)</option>
                          <option value="5 MT - 10 MT">5 MT - 10 MT</option>
                          <option value="FCL 20ft Container (20 MT)">FCL 20ft Container (20 MT)</option>
                          <option value="Multi-Container Supply">Multi-Container Supply</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-coffee-roast/60">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Destination country */}
                  <div>
                    <label className="text-[10px] font-bold text-coffee-roast block mb-1.5 uppercase tracking-wider">
                      Destination country
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={rfqCountry}
                        onChange={(e) => setRfqCountry(e.target.value)}
                        className="w-full bg-white border border-black/14 rounded-xl pl-4 pr-10 py-3 text-xs font-sans appearance-none focus:outline-none focus:border-coffee-roast focus:ring-2 focus:ring-latte-accent/20 transition-all cursor-pointer"
                      >
                        <option value="" disabled>Select destination country...</option>
                        <option value="United States">United States</option>
                        <option value="Germany">Germany</option>
                        <option value="Japan">Japan</option>
                        <option value="Italy">Italy</option>
                        <option value="Belgium">Belgium</option>
                        <option value="South Korea">South Korea</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Other">Other / International</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-coffee-roast/60">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-linear-to-r from-deep-forest to-export-green hover:to-action-green text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-97 cursor-pointer shadow-sm shadow-deep-forest/10"
                    >
                      Submit RFQ
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-espresso-dark text-white/90 py-16 border-t border-white/10 font-sans">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

            {/* Col 1: Brand */}
            <div className="flex flex-col gap-4">
              <img 
                src="/images/wordmark.png" 
                alt="Seedicon Coffee Exports" 
                className="h-6 w-auto object-contain brightness-0 invert opacity-80 self-start" 
              />
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                Direct B2B estate-to-roaster supply chain pipelines for premium Indian Arabica, Robusta, and specialty coffee beans.
              </p>
            </div>

            {/* Col 2: Navigation */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">B2B Navigation</span>
              <div className="flex flex-col gap-2 text-xs text-white/60 font-medium">
                <a href="#about" className="hover:text-white transition-colors">About Sourcing</a>
                <a href="#products" className="hover:text-white transition-colors">Our Coffee Inventory</a>
                <a href="#sourcing" className="hover:text-white transition-colors">Origin Terroirs</a>
                <a href="#quality" className="hover:text-white transition-colors">Quality Assurance</a>
                <a href="#process" className="hover:text-white transition-colors">Export Process Flow</a>
              </div>
            </div>

            {/* Col 3: Export Desk */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Export Desk</span>
              <div className="flex flex-col gap-2 text-xs text-white/60 font-medium">
                <span>Direct Line: +91 (80) 4920-5830</span>
                <span>Office: Bengaluru, Karnataka, India</span>
                <span>Email: export@seedicon.com</span>
              </div>
            </div>

            {/* Col 4: Trust Credentials */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">B2B Compliance</span>
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                Licensed under APEDA, registered with FSSAI, and fully certified for organic and fair trade international cargo clearance.
              </p>
            </div>

          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <span>© {new Date().getFullYear()} Seedicon Coffee Exports. All B2B rights reserved.</span>
            <div className="flex gap-6">
              <a href="#terms" className="hover:text-white/60 transition-colors">Terms of Trade</a>
              <a href="#privacy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
