"use client";

import { useState, useEffect } from 'react';
import { LogIn, UserPlus, Play, Sparkles, Menu, X, ArrowRight, Globe, Sprout, Zap, Award, Flame, Check } from 'lucide-react';
import BoomerangVideoBg from '@/components/BoomerangVideoBg';
import Lenis from 'lenis';

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';

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

  const navLinks = [
    { href: '#sourcing', label: 'Sourcing' },
    { href: '#products', label: 'Coffee Products' },
    { href: '#quality', label: 'Quality QA' },
    { href: '#process', label: 'Export Process' },
  ];

  return (
    <div className="min-h-screen bg-warm-cream selection:bg-soft-green selection:text-deep-forest">
      {/* Hero Section (Full Screen) */}
      <section className="relative w-full h-screen overflow-hidden font-sans">
        {/* Boomerang Video Background */}
        <BoomerangVideoBg src={BG_VIDEO} className="absolute inset-0 w-full h-full" />
        
        {/* Dark overlay to ensure contrast for text and controls */}
        <div className="absolute inset-0 bg-black/10 z-0" />

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6">
          <div className="flex items-center gap-2 text-deep-forest">
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight font-sans">
              Seedicon<sup className="text-[10px] sm:text-xs font-semibold">TM</sup>
            </span>
          </div>

          {/* Desktop Navigation Link Pill (Absolutely Centered) */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/60">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-2 transition-colors ${
                  i === 0 ? 'font-bold text-deep-forest' : 'font-medium text-export-green hover:text-deep-forest'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#rfq"
              className="ml-2 bg-action-green hover:bg-export-green text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Get Pricing
            </a>
          </div>

          {/* Top Right Quick Actions */}
          <div className="flex items-center gap-3 sm:gap-6 text-deep-forest">
            <a href="#sample" className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity">
              <UserPlus className="w-4 h-4" />
              Request Sample
            </a>
            <a href="#rfq" className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity">
              <Globe className="w-4 h-4" />
              Submit RFQ
            </a>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-deep-forest transition-all duration-300 hover:bg-white/90 cursor-pointer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <Menu
                className={`w-5 h-5 absolute transition-all duration-300 ${
                  menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`w-5 h-5 absolute transition-all duration-300 ${
                  menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
            menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-deep-forest/40 backdrop-blur-sm" />
        </div>

        {/* Mobile menu drawer */}
        <div
          className={`lg:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-8 pb-8">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl font-bold text-deep-forest py-4 border-b border-deep-forest/10 transition-all duration-500 ${
                    menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : '0ms' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div
              className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
                menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
            >
              <a href="#sample" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-deep-forest sm:hidden">
                <UserPlus className="w-4 h-4" />
                Request Sample
              </a>
              <a href="#rfq" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-deep-forest sm:hidden">
                <Globe className="w-4 h-4" />
                Submit RFQ
              </a>
              <a href="#rfq" onClick={() => setMenuOpen(false)} className="mt-2 text-center bg-action-green hover:bg-export-green text-white text-sm font-bold px-5 py-3 rounded-full transition-colors">
                Get Export Pricing
              </a>
            </div>
          </div>
        </div>

        {/* Hero Copy (Centered) */}
        <div className="relative z-10 flex flex-col items-center text-center pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6">
          <h1
            className="font-normal leading-[0.95] text-[2rem] sm:text-3xl md:text-4xl lg:text-[3.75rem] xl:text-[4.25rem] max-w-5xl font-display text-deep-forest"
            style={{ letterSpacing: '-0.04em' }}
          >
            Premium Indian Coffee{' '}
            <span className="bg-gradient-to-r from-export-green via-action-green via-[#85AB8B] to-export-green bg-clip-text text-transparent animate-shimmer">
              Connecting
              <br className="hidden sm:block" /> Global Markets
            </span>
          </h1>
          <p className="mt-6 sm:mt-8 text-text-muted text-sm sm:text-base md:text-lg leading-relaxed max-w-lg px-2 font-medium">
            Sourcing and exporting top-grade Arabica, Robusta, and specialty coffee beans directly from India's finest estates to global roasters.
          </p>
        </div>

        {/* Bottom-left B2B Info Card */}
        <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-6 sm:bottom-8 md:bottom-10 z-10 max-w-sm">
          <div className="flex items-center gap-2 text-deep-forest sm:text-white mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold sm:font-semibold">
              Export Desk<sup className="text-[10px]">TM</sup>
            </span>
          </div>
          <p className="text-text-muted sm:text-text-white-soft text-xs leading-relaxed mb-6 max-w-xs font-semibold sm:font-normal">
            Seedicon smoothly coordinates farm sourcing with international container loading, handling moisture testing, custom sorting, and all phytosanitary documentation.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#rfq" className="bg-action-green sm:bg-white hover:bg-export-green sm:hover:bg-white/90 text-white sm:text-deep-forest text-sm font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors shadow-sm">
              Get Export Pricing
            </a>
            <a href="#sample" className="text-deep-forest sm:text-white text-sm font-bold sm:font-semibold hover:opacity-80 transition-opacity">
              Request Sample.
            </a>
          </div>
        </div>

        {/* Bottom-right video link */}
        <div className="hidden sm:flex absolute right-6 md:right-10 bottom-8 md:bottom-10 z-10 items-center gap-2 text-white/90 text-sm">
          <button className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors cursor-pointer">
            <Play className="w-3 h-3 fill-white text-white ml-0.5" />
          </button>
          <span className="font-semibold">Sourcing & Sacks</span>
          <span className="text-white/60">1:35</span>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-ceramic-beige text-text-strong font-sans border-t border-black/[0.04]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Column 1: Sourcing info & grid highlight */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="text-xs font-bold text-export-green tracking-wider uppercase mb-3 block">
              Indian Coffee Origins
            </span>
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-deep-forest leading-[1.05] tracking-[-0.04em] mb-4">
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
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-black/[0.06] bg-ceramic-beige">
                <img
                  src="/images/about-plantation.png"
                  alt="Lush coffee estate under forest canopy in Coorg, India"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />
                
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
      <section id="products" className="py-24 bg-warm-cream text-text-strong font-sans border-t border-black/[0.04]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-export-green tracking-wider uppercase mb-3 block">
              B2B Export Inventory
            </span>
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-deep-forest leading-[1.05] tracking-[-0.04em] mb-4">
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
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ceramic-beige border border-black/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <img
                  src="/images/Arabica Coffee.png"
                  alt="Arabica Coffee"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display font-normal text-xl sm:text-2xl text-deep-forest group-hover:text-action-green transition-colors tracking-tight">
                  Arabica Coffee
                </h3>
                <ArrowRight className="w-4 h-4 text-deep-forest/40 transform -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-action-green" />
              </div>
            </a>

            {/* Product 2: Robusta Coffee */}
            <a
              href="#rfq"
              className="group block cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ceramic-beige border border-black/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <img
                  src="/images/Robusta.png"
                  alt="Robusta Coffee"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display font-normal text-xl sm:text-2xl text-deep-forest group-hover:text-action-green transition-colors tracking-tight">
                  Robusta Coffee
                </h3>
                <ArrowRight className="w-4 h-4 text-deep-forest/40 transform -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-action-green" />
              </div>
            </a>

            {/* Product 3: Specialty Coffee */}
            <a
              href="#rfq"
              className="group block cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ceramic-beige border border-black/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <img
                  src="/images/Specialty.png"
                  alt="Specialty Coffee"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display font-normal text-xl sm:text-2xl text-deep-forest group-hover:text-action-green transition-colors tracking-tight">
                  Specialty Coffee
                </h3>
                <ArrowRight className="w-4 h-4 text-deep-forest/40 transform -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-action-green" />
              </div>
            </a>

            {/* Product 4: Green Coffee Beans */}
            <a
              href="#rfq"
              className="group block cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ceramic-beige border border-black/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <img
                  src="/images/Green.png"
                  alt="Green Coffee Beans"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display font-normal text-xl sm:text-2xl text-deep-forest group-hover:text-action-green transition-colors tracking-tight">
                  Green Beans
                </h3>
                <ArrowRight className="w-4 h-4 text-deep-forest/40 transform -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-action-green" />
              </div>
            </a>

            {/* Product 5: Roasted Coffee */}
            <a
              href="#rfq"
              className="group block cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ceramic-beige border border-black/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <img
                  src="/images/Roasted .png"
                  alt="Roasted Coffee"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display font-normal text-xl sm:text-2xl text-deep-forest group-hover:text-action-green transition-colors tracking-tight">
                  Roasted Coffee
                </h3>
                <ArrowRight className="w-4 h-4 text-deep-forest/40 transform -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-action-green" />
              </div>
            </a>

          </div>

        </div>
      </section>

      {/* 4. Sourcing & Origin Section */}
      <section id="sourcing" className="py-24 bg-ceramic-beige text-text-strong font-sans border-t border-black/[0.04]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-export-green tracking-wider uppercase mb-3 block">
              Origin Terroirs
            </span>
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-deep-forest leading-[1.05] tracking-[-0.04em] mb-4">
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
              className="group block cursor-pointer relative rounded-2xl overflow-hidden aspect-[3/4] border border-black/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <img
                src="/images/origin-coorg.png"
                alt="Coorg region"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-50% to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                {/* Default Title State */}
                <div className="transform translate-y-0 opacity-100 transition-all duration-500 ease-out group-hover:-translate-y-8 group-hover:opacity-0">
                  <span className="text-[10px] text-white/60 font-sans tracking-widest uppercase font-semibold">
                    Karnataka • Western Ghats
                  </span>
                  <h3 className="font-display font-normal text-3xl tracking-tight mt-1">
                    Coorg
                  </h3>
                </div>

                {/* Hover Specs State */}
                <div className="absolute bottom-5 left-5 right-5 transform translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto flex flex-col">
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
                  <div className="text-[10px] font-bold text-deep-forest bg-white rounded-full py-2 text-center transition-colors hover:bg-soft-green">
                    Request Coorg Sourcing
                  </div>
                </div>
              </div>
            </a>

            {/* Region 2: Chikmagalur */}
            <a
              href="#rfq"
              className="group block cursor-pointer relative rounded-2xl overflow-hidden aspect-[3/4] border border-black/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <img
                src="/images/origin-chikmagalur.png"
                alt="Chikmagalur region"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-50% to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                {/* Default Title State */}
                <div className="transform translate-y-0 opacity-100 transition-all duration-500 ease-out group-hover:-translate-y-8 group-hover:opacity-0">
                  <span className="text-[10px] text-white/60 font-sans tracking-widest uppercase font-semibold">
                    Karnataka • Bababudangiri
                  </span>
                  <h3 className="font-display font-normal text-3xl tracking-tight mt-1">
                    Chikmagalur
                  </h3>
                </div>

                {/* Hover Specs State */}
                <div className="absolute bottom-5 left-5 right-5 transform translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto flex flex-col">
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
                  <div className="text-[10px] font-bold text-deep-forest bg-white rounded-full py-2 text-center transition-colors hover:bg-soft-green">
                    Request Chikmagalur Sourcing
                  </div>
                </div>
              </div>
            </a>

            {/* Region 3: Wayanad */}
            <a
              href="#rfq"
              className="group block cursor-pointer relative rounded-2xl overflow-hidden aspect-[3/4] border border-black/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <img
                src="/images/origin-wayanad.png"
                alt="Wayanad region"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-50% to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                {/* Default Title State */}
                <div className="transform translate-y-0 opacity-100 transition-all duration-500 ease-out group-hover:-translate-y-8 group-hover:opacity-0">
                  <span className="text-[10px] text-white/60 font-sans tracking-widest uppercase font-semibold">
                    Kerala • Malabar Highlands
                  </span>
                  <h3 className="font-display font-normal text-3xl tracking-tight mt-1">
                    Wayanad
                  </h3>
                </div>

                {/* Hover Specs State */}
                <div className="absolute bottom-5 left-5 right-5 transform translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto flex flex-col">
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
                  <div className="text-[10px] font-bold text-deep-forest bg-white rounded-full py-2 text-center transition-colors hover:bg-soft-green">
                    Request Wayanad Sourcing
                  </div>
                </div>
              </div>
            </a>

            {/* Region 4: Araku Valley */}
            <a
              href="#rfq"
              className="group block cursor-pointer relative rounded-2xl overflow-hidden aspect-[3/4] border border-black/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <img
                src="/images/origin-araku.png"
                alt="Araku Valley region"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-50% to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                {/* Default Title State */}
                <div className="transform translate-y-0 opacity-100 transition-all duration-500 ease-out group-hover:-translate-y-8 group-hover:opacity-0">
                  <span className="text-[10px] text-white/60 font-sans tracking-widest uppercase font-semibold">
                    Andhra Pradesh • Eastern Ghats
                  </span>
                  <h3 className="font-display font-normal text-3xl tracking-tight mt-1">
                    Araku Valley
                  </h3>
                </div>

                {/* Hover Specs State */}
                <div className="absolute bottom-5 left-5 right-5 transform translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto flex flex-col">
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
                  <div className="text-[10px] font-bold text-deep-forest bg-white rounded-full py-2 text-center transition-colors hover:bg-soft-green">
                    Request Araku Sourcing
                  </div>
                </div>
              </div>
            </a>

          </div>

        </div>
      </section>

      {/* 5. Quality & Certifications Section */}
      <section id="quality" className="py-24 bg-warm-cream text-text-strong font-sans border-t border-black/[0.04]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-export-green tracking-wider uppercase mb-3 block">
              Strict B2B Compliance
            </span>
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-deep-forest leading-[1.05] tracking-[-0.04em] mb-4">
              Quality & Certifications
            </h2>
            <p className="text-text-muted text-sm leading-relaxed max-w-xl mx-auto font-medium">
              Every batch is density-sorted, moisture-calibrated, and certified before container dispatch.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Left Column: Visual Laboratory QC Focus (Cross-fading slideshow) */}
            <div className="lg:col-span-5 relative self-stretch min-h-[450px] lg:min-h-0">
              <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-black/[0.06] bg-ceramic-beige shadow-md">
                {/* Step 1: Grading */}
                <img
                  src="/images/qc-grading.png"
                  alt="Bean Grading"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    activeStep === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
                {/* Step 2: Moisture */}
                <img
                  src="/images/qc-moisture.png"
                  alt="Moisture Testing"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    activeStep === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
                {/* Step 3: Sorting */}
                <img
                  src="/images/qc-sorting.png"
                  alt="Density Sorting"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    activeStep === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
                {/* Step 4: Packaging */}
                <img
                  src="/images/qc-packaging.png"
                  alt="Packaging Standards"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    activeStep === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
                {/* Step 5: Surveyor */}
                <img
                  src="/images/qc-shipping.png"
                  alt="Surveyor Inspection"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    activeStep === 4 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-20" />
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
                  className={`flex gap-4 group cursor-pointer border-l-2 pl-4 py-2 transition-all duration-300 ${
                    activeStep === 0 ? 'border-action-green bg-action-green/[0.02]' : 'border-transparent hover:border-black/10'
                  }`}
                  onMouseEnter={() => setActiveStep(0)}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      activeStep === 0 ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                    }`}>
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${
                      activeStep === 0 ? 'text-deep-forest font-bold' : 'text-deep-forest/70'
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
                  className={`flex gap-4 group cursor-pointer border-l-2 pl-4 py-2 transition-all duration-300 ${
                    activeStep === 1 ? 'border-action-green bg-action-green/[0.02]' : 'border-transparent hover:border-black/10'
                  }`}
                  onMouseEnter={() => setActiveStep(1)}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      activeStep === 1 ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                    }`}>
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${
                      activeStep === 1 ? 'text-deep-forest font-bold' : 'text-deep-forest/70'
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
                  className={`flex gap-4 group cursor-pointer border-l-2 pl-4 py-2 transition-all duration-300 ${
                    activeStep === 2 ? 'border-action-green bg-action-green/[0.02]' : 'border-transparent hover:border-black/10'
                  }`}
                  onMouseEnter={() => setActiveStep(2)}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      activeStep === 2 ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                    }`}>
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${
                      activeStep === 2 ? 'text-deep-forest font-bold' : 'text-deep-forest/70'
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
                  className={`flex gap-4 group cursor-pointer border-l-2 pl-4 py-2 transition-all duration-300 ${
                    activeStep === 3 ? 'border-action-green bg-action-green/[0.02]' : 'border-transparent hover:border-black/10'
                  }`}
                  onMouseEnter={() => setActiveStep(3)}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      activeStep === 3 ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                    }`}>
                      4
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${
                      activeStep === 3 ? 'text-deep-forest font-bold' : 'text-deep-forest/70'
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
                  className={`flex gap-4 group cursor-pointer border-l-2 pl-4 py-2 transition-all duration-300 ${
                    activeStep === 4 ? 'border-action-green bg-action-green/[0.02]' : 'border-transparent hover:border-black/10'
                  }`}
                  onMouseEnter={() => setActiveStep(4)}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      activeStep === 4 ? 'bg-action-green text-white scale-105' : 'bg-soft-green/60 text-export-green'
                    }`}>
                      5
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-sans font-semibold text-base transition-colors duration-300 ${
                      activeStep === 4 ? 'text-deep-forest font-bold' : 'text-deep-forest/70'
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
          <div className="border-t border-black/[0.06] pt-8 mt-12">
            <span className="text-xs font-bold text-deep-forest uppercase tracking-wider block mb-3">
              Export Certifications & Credentials
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="border border-quality-gold/25 bg-gold-wash text-quality-gold text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-0.5">
                FSSAI Certified
              </span>
              <span className="border border-quality-gold/25 bg-gold-wash text-quality-gold text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-0.5">
                APEDA Licensed
              </span>
              <span className="border border-quality-gold/25 bg-gold-wash text-quality-gold text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-0.5">
                Organic Certified
              </span>
              <span className="border border-quality-gold/25 bg-gold-wash text-quality-gold text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-0.5">
                Fair Trade
              </span>
              <span className="border border-quality-gold/25 bg-gold-wash text-quality-gold text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-0.5">
                Rainforest Alliance
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Export Process Section */}
      <section id="process" className="py-24 bg-ceramic-beige text-text-strong font-sans border-t border-black/[0.04]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-export-green tracking-wider uppercase mb-3 block">
              B2B Sourcing Route
            </span>
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-deep-forest leading-[1.05] tracking-[-0.04em] mb-4">
              Export Process Flow
            </h2>
            <p className="text-text-muted text-sm leading-relaxed max-w-xl mx-auto font-medium">
              A transparent, step-by-step export workflow from specifications audit to final ocean freight container dispatch.
            </p>
          </div>

          {/* Linear Horizontal/Vertical Stepper Progress */}
          <div 
            className="mb-16 relative"
            onMouseEnter={() => setIsHoveredProcess(true)}
            onMouseLeave={() => setIsHoveredProcess(false)}
          >
            {/* Desktop Horizontal Stepper */}
            <div className="hidden md:block relative py-8">
              {/* Stepper Line Track (Gray background) */}
              <div className="absolute left-[3%] right-[3%] top-1/2 -translate-y-1/2 h-0.5 bg-black/[0.06] z-0" />
              
              {/* Stepper Progress Fill Line (Animated Gradient) */}
              <div 
                className="absolute left-[3%] top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-export-green to-action-green transition-all duration-700 ease-out z-0"
                style={{ 
                  width: `${(activeProcessStep / 5) * 94}%` 
                }}
              />

              {/* Stepper Nodes */}
              <div className="relative flex justify-between items-center z-10 px-0">
                {processSteps.map((step, idx) => {
                  const isCompleted = idx < activeProcessStep;
                  const isActive = idx === activeProcessStep;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveProcessStep(idx)}
                      className="flex flex-col items-center focus:outline-none group cursor-pointer w-[16%]"
                    >
                      {/* Node Circle */}
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-sans text-xs font-bold transition-all duration-500 shadow-sm ${
                        isCompleted 
                          ? "bg-action-green border-action-green text-white scale-100" 
                          : isActive 
                            ? "bg-white border-action-green text-action-green scale-110 ring-2 ring-soft-green" 
                            : "bg-white border-black/[0.08] text-text-muted hover:border-black/20"
                      }`}>
                        {isCompleted ? (
                          <Check className="w-4 h-4 text-white stroke-[3px]" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>
                      
                      {/* Node Label */}
                      <span className={`text-[11px] font-sans font-bold mt-3 transition-colors duration-300 text-center px-1 truncate w-full ${
                        isActive ? "text-action-green" : "text-deep-forest/70 group-hover:text-deep-forest"
                      }`}>
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Vertical Stepper */}
            <div className="md:hidden relative pl-8 py-4">
              {/* Vertical line track */}
              <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-black/[0.06] z-0" />
              
              {/* Vertical progress fill */}
              <div 
                className="absolute left-[15px] top-4 w-0.5 bg-gradient-to-b from-export-green to-action-green transition-all duration-700 ease-out z-0"
                style={{ 
                  height: `${(activeProcessStep / 5) * 100}%` 
                }}
              />

              {/* Nodes List */}
              <div className="flex flex-col gap-6 relative z-10">
                {processSteps.map((step, idx) => {
                  const isCompleted = idx < activeProcessStep;
                  const isActive = idx === activeProcessStep;

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveProcessStep(idx)}
                      className="flex items-center gap-4 text-left focus:outline-none w-full"
                    >
                      {/* Circle */}
                      <div className={`w-8 h-8 rounded-full border shrink-0 flex items-center justify-center font-sans text-xs font-bold transition-all duration-500 shadow-sm ${
                        isCompleted 
                          ? "bg-action-green border-action-green text-white" 
                          : isActive 
                            ? "bg-white border-action-green text-action-green scale-105 ring-2 ring-soft-green" 
                            : "bg-white border-black/[0.08] text-text-muted"
                      }`}>
                        {isCompleted ? (
                          <Check className="w-4 h-4 text-white stroke-[3px]" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>
                      
                      {/* Label */}
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold transition-colors duration-300 ${
                          isActive ? "text-action-green" : "text-deep-forest/70"
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Step Panel (Grid Content) */}
          <div 
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-black/[0.06] rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.06)]"
            onMouseEnter={() => setIsHoveredProcess(true)}
            onMouseLeave={() => setIsHoveredProcess(false)}
          >
            {/* Active Left: Detailed specs card */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Step indicator */}
              <span className="text-[10px] font-bold text-action-green tracking-wider uppercase mb-2 block">
                Process Stage 0{activeProcessStep + 1} of 06
              </span>
              
              <h3 className="font-display font-normal text-3xl sm:text-4xl text-deep-forest leading-[1.1] tracking-tight mb-4">
                {processSteps[activeProcessStep].title}
              </h3>
              
              <p className="text-text-muted text-sm leading-relaxed mb-6 font-medium max-w-xl">
                {processSteps[activeProcessStep].description}
              </p>

              {/* Specs Table */}
              <div className="border-t border-black/[0.06] pt-4">
                <span className="text-[10px] font-bold text-deep-forest uppercase tracking-wider block mb-3">
                  B2B Specifications
                </span>
                <div className="grid grid-cols-3 gap-4">
                  {processSteps[activeProcessStep].details.map((detail, dIdx) => (
                    <div key={dIdx} className="bg-ceramic-beige/45 rounded-xl p-3 border border-black/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                      <span className="text-[9px] font-semibold text-text-muted block uppercase tracking-wider mb-1">
                        {detail.label}
                      </span>
                      <span className="text-xs font-bold text-deep-forest block">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Right: Clean image display */}
            <div className="lg:col-span-5 relative h-[280px] sm:h-[320px] rounded-xl overflow-hidden border border-black/[0.06] bg-ceramic-beige shadow-inner">
              {processSteps.map((step, idx) => (
                <img
                  key={idx}
                  src={step.image}
                  alt={step.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    idx === activeProcessStep ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-95 pointer-events-none"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none z-20" />
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
