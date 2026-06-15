import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '@/utils/scroll';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  // Prevent background scroll when mobile menu is open
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

  // Handle smart show/hide on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If mobile menu is open, keep the navigation bar visible
      if (menuOpen) {
        setNavVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Hide or show navbar based on scroll direction
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY) {
          setNavVisible(false);
        } else {
          setNavVisible(true);
        }
      } else {
        setNavVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  return (
    <>
      {/* Navigation Bar Container (Beige Background) */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-ceramic-beige/95 backdrop-blur-md border-b border-black/5 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className="px-8 h-16 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/wordmark.webp"
              alt="Seedicon Coffee Exports"
              width={180}
              height={24}
              priority
              className="h-6 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                const lenis = (window as any).lenis; 
                if (lenis) lenis.scrollTo(0); 
                else window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }} 
              className="text-sm font-semibold text-espresso-dark transition-colors hover:text-espresso-dark/80"
            >
              Trade
            </a>
            <a 
              href="https://www.seedicon.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-semibold text-espresso-dark/70 transition-colors hover:text-espresso-dark"
            >
              Capital
            </a>
            <a 
              href="https://www.deckwale.com/?type=Presentation" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-semibold text-espresso-dark/70 transition-colors hover:text-espresso-dark"
            >
              Deckwale
            </a>
            <a 
              href="https://watch.seedicon.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-semibold text-espresso-dark/70 transition-colors hover:text-espresso-dark"
            >
              Watch
            </a>
            <a 
              href="https://www.seedicon.com/partners" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-semibold text-espresso-dark/70 transition-colors hover:text-espresso-dark"
            >
              Partner with us
            </a>
            <a 
              href="https://www.seedicon.com/insights" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-semibold text-espresso-dark/70 transition-colors hover:text-espresso-dark"
            >
              Insights
            </a>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <a href="#rfq" onClick={(e) => scrollToSection(e, '#rfq')} className="bg-linear-to-br from-deep-forest via-export-green to-action-green hover:scale-103 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-300 inline-block shadow-md shadow-black/35 shiny-gradient-border">Get Pricing</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-full border border-espresso-dark/20 bg-transparent text-espresso-dark hover:bg-espresso-dark/5 hover:border-espresso-dark/20 transition-all duration-300 cursor-pointer"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <Menu
              className={`w-[18px] h-[18px] absolute transition-all duration-300 ${menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
            />
            <X
              className={`w-[18px] h-[18px] absolute transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-20 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full pt-16 px-8 pb-8">
          <div className="flex flex-col gap-1">
            <a 
              href="#" 
              onClick={(e) => { 
                setMenuOpen(false); 
                e.preventDefault(); 
                const lenis = (window as any).lenis; 
                if (lenis) lenis.scrollTo(0); 
                else window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }} 
              className="text-xl font-normal text-black py-4 border-b border-black/5 transition-colors"
            >
              Trade
            </a>
            <a 
              href="https://www.seedicon.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="text-xl font-normal text-[#6F6F6F] hover:text-black py-4 border-b border-black/5 transition-colors"
            >
              Capital
            </a>
            <a 
              href="https://www.deckwale.com/?type=Presentation" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="text-xl font-normal text-[#6F6F6F] hover:text-black py-4 border-b border-black/5 transition-colors"
            >
              Deckwale
            </a>
            <a 
              href="https://watch.seedicon.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="text-xl font-normal text-[#6F6F6F] hover:text-black py-4 border-b border-black/5 transition-colors"
            >
              Watch
            </a>
            <a 
              href="https://www.seedicon.com/partners" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="text-xl font-normal text-[#6F6F6F] hover:text-black py-4 border-b border-black/5 transition-colors"
            >
              Partner with us
            </a>
            <a 
              href="https://www.seedicon.com/insights" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="text-xl font-normal text-[#6F6F6F] hover:text-black py-4 border-b border-black/5 transition-colors"
            >
              Insights
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <a href="#rfq" onClick={(e) => { setMenuOpen(false); scrollToSection(e, '#rfq'); }} className="text-center bg-linear-to-br from-deep-forest via-export-green to-action-green hover:scale-103 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-black/35 shiny-gradient-border">
              Get Pricing
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
