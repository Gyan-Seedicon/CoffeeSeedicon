"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

// Dynamically import below-the-fold components to reduce initial bundle size and speed up page load
const AboutUs = dynamic(() => import('@/components/AboutUs'), {
  loading: () => <div className="min-h-[400px] bg-ceramic-beige animate-pulse" />,
  ssr: false
});

const FarmSourcing = dynamic(() => import('@/components/FarmSourcing'), {
  loading: () => <div className="min-h-[500px] bg-espresso-dark animate-pulse" />,
  ssr: false
});

const Products = dynamic(() => import('@/components/Products'), {
  loading: () => <div className="min-h-[400px] bg-warm-cream animate-pulse" />,
  ssr: false
});

const SourcingOrigins = dynamic(() => import('@/components/SourcingOrigins'), {
  loading: () => <div className="min-h-[400px] bg-ceramic-beige animate-pulse" />,
  ssr: false
});

const QualityQA = dynamic(() => import('@/components/QualityQA'), {
  loading: () => <div className="min-h-[500px] bg-warm-cream animate-pulse" />,
  ssr: false
});

const ExportProcess = dynamic(() => import('@/components/ExportProcess'), {
  loading: () => <div className="min-h-[500px] bg-ceramic-beige animate-pulse" />,
  ssr: false
});

const RFQForm = dynamic(() => import('@/components/RFQForm'), {
  loading: () => <div className="min-h-[400px] bg-warm-cream animate-pulse" />,
  ssr: false
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="min-h-[200px] bg-espresso-dark animate-pulse" />,
  ssr: false
});

export default function Home() {
  // Initialize global Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-warm-cream selection:bg-soft-green selection:text-deep-forest">
      <Navbar />
      <Hero />
      <AboutUs />
      <FarmSourcing />
      <Products />
      <SourcingOrigins />
      <QualityQA />
      <ExportProcess />
      <RFQForm />
      <Footer />
    </div>
  );
}
