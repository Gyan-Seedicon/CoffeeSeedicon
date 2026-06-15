import { useEffect, useRef } from 'react';
import { scrollToSection } from '@/utils/scroll';

export default function Hero() {
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
      const wrapper = video.parentElement;

      if (duration > 0 && wrapper) {
        if (currentTime < 0.5) {
          wrapper.style.opacity = (currentTime / 0.5).toString();
        } else if (duration - currentTime < 0.5) {
          wrapper.style.opacity = Math.max(0, (duration - currentTime) / 0.5).toString();
        } else {
          wrapper.style.opacity = "1";
        }
      }
      animationFrameId = requestAnimationFrame(checkLoop);
    };

    const handleEnded = () => {
      const wrapper = video.parentElement;
      if (wrapper) wrapper.style.opacity = "0";
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

    // Let the browser load the video sources defined in HTML
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

  return (
    <section className="relative w-full h-screen overflow-hidden font-sans bg-espresso-dark">
      {/* Cinematic Video Background Wrapper */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="w-full h-full relative opacity-0 pointer-events-none transition-opacity duration-300">
          <video
            ref={videoRef}
            src="/videos/15381512_1920_1080_25fps.mp4"
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
          {/* Black low opacity overlay */}
          <div className="absolute inset-0 bg-black/45 pointer-events-none z-[1]" />
        </div>
      </div>

      {/* Hero Section Copy */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1
          className="font-normal leading-[0.95] text-5xl sm:text-6xl md:text-7xl max-w-7xl font-display text-white animate-fade-rise"
          style={{ letterSpacing: '-2.46px' }}
        >
          <span className="bg-linear-to-r from-white via-latte-accent to-white bg-clip-text text-transparent">
            Premium Indian Coffee
          </span>{' '}
          <span className="text-latte-accent italic">Connecting</span>
          <br className="hidden sm:block" />{' '}
          <span className="text-latte-accent italic">Global Markets</span>
        </h1>
        <p className="mt-8 text-text-white-soft text-base sm:text-lg leading-relaxed max-w-2xl animate-fade-rise-delay">
          Sourcing and exporting top-grade Arabica, Robusta, and specialty coffee beans directly from India's finest estates to global roasters.
        </p>
        <div>
          <a
            href="#rfq"
            onClick={(e) => scrollToSection(e, '#rfq')}
            className="bg-linear-to-br from-deep-forest via-export-green to-action-green hover:scale-103 hover:shadow-2xl text-white text-sm sm:text-base font-semibold px-6 py-2.5 sm:px-10 sm:py-3.5 rounded-xl transition-all duration-300 inline-block mt-12 animate-fade-rise-delay-2 shadow-lg shadow-black/35 shiny-gradient-border"
          >
             Get Pricing
          </a>
        </div>
      </div>
    </section>
  );
}
