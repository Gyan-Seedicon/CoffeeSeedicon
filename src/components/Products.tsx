import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { scrollToSection } from '@/utils/scroll';

const products = [
  {
    name: "Arabica Coffee",
    image: "/images/Arabica Coffee.webp",
    alt: "Arabica Coffee"
  },
  {
    name: "Robusta Coffee",
    image: "/images/Robusta.webp",
    alt: "Robusta Coffee"
  },
  {
    name: "Specialty Coffee",
    image: "/images/Specialty.webp",
    alt: "Specialty Coffee"
  },
  {
    name: "Green Beans",
    image: "/images/Green.webp",
    alt: "Green Coffee Beans"
  },
  {
    name: "Roasted Coffee",
    image: "/images/Roasted .webp",
    alt: "Roasted Coffee"
  }
];

export default function Products() {
  return (
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
        </div>

        {/* Cards Grid Layout: 5 Cards in a Row on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {products.map((product, idx) => (
            <a
              key={idx}
              href="#rfq"
              onClick={(e) => scrollToSection(e, '#rfq')}
              className="group block cursor-pointer"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-ceramic-beige border border-black/3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display font-normal text-xl sm:text-2xl text-espresso-dark group-hover:text-coffee-roast transition-colors tracking-tight">
                  {product.name}
                </h3>
                <ArrowRight className="w-4 h-4 text-espresso-dark/40 transform -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-coffee-roast" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
