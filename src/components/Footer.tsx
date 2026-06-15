import Image from 'next/image';
import { scrollToSection } from '@/utils/scroll';

export default function Footer() {
  return (
    <footer className="bg-espresso-dark text-white/90 py-16 border-t border-white/10 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <div className="bg-white px-1 py-1 rounded-sm border border-black/5 self-start">
              <Image
                src="/images/wordmark.webp"
                alt="Seedicon Coffee Exports"
                width={180}
                height={24}
                className="h-6 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-medium">
              Direct B2B estate-to-roaster supply chain pipelines for premium Indian Arabica, Robusta, and specialty coffee beans.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 text-xs text-white/60 font-medium">
              <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-white transition-colors">About Sourcing</a>
              <a href="#products" onClick={(e) => scrollToSection(e, '#products')} className="hover:text-white transition-colors">Our Coffee Inventory</a>
              <a href="#sourcing" onClick={(e) => scrollToSection(e, '#sourcing')} className="hover:text-white transition-colors">Origin Terroirs</a>
              <a href="#quality" onClick={(e) => scrollToSection(e, '#quality')} className="hover:text-white transition-colors">Quality Assurance</a>
              <a href="#process" onClick={(e) => scrollToSection(e, '#process')} className="hover:text-white transition-colors">Export Process Flow</a>
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
          <span>© {new Date().getFullYear()} Seedicon Coffee</span>
          <div className="flex gap-6">
            <a href="#terms" className="hover:text-white/60 transition-colors">Terms of Trade</a>
            <a href="#privacy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
