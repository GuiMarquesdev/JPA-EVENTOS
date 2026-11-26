import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface SmoothScrollProps {
  viewKey: string;
}

export function SmoothScroll({ viewKey }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let tickerFn: ((time: number) => void) | null = null;

    const cleanup = () => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const initLenis = () => {
      if (mediaQuery.matches) {
        cleanup();
        return;
      }

      if (!lenisRef.current) {
        const lenis = new Lenis({
          lerp: 0.1,
          smoothWheel: true,
          anchors: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        tickerFn = (time: number) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);
        lenisRef.current = lenis;
      }
    };

    initLenis();
    mediaQuery.addEventListener('change', initLenis);

    return () => {
      mediaQuery.removeEventListener('change', initLenis);
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0.65 });
    } else {
      window.scrollTo(0, 0);
    }

    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [viewKey]);

  return null;
}
