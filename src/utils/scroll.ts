import React from 'react';

export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
  e.preventDefault();
  const lenis = (window as any).lenis;
  if (lenis) {
    lenis.scrollTo(id);
  } else {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
