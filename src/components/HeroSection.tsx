import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Maximize2,
  SlidersHorizontal,
  Star,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BRAND_IMAGES, HERO_CAROUSEL_SLIDES, SOCIAL_LINKS } from '../data/jpaData';
import { SafeImage } from './SafeImage';
import { ImageLightbox } from './ImageLightbox';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BlurText } from './reactbits/BlurText';
import { RotatingText } from './reactbits/RotatingText';
import { CountUp } from './reactbits/CountUp';
import { TiltedCard } from './reactbits/TiltedCard';
import { Magnet } from './reactbits/Magnet';
import { gsap } from '../lib/gsap';
import type { PageView } from './Navbar';

interface HeroSectionProps {
  onNavigate: (view: PageView) => void;
}

const HERO_ROTATING_HIGHLIGHTS = [
  'barracas de lanches ao vivo',
  'animação e pintura artística',
  'pula-pula e piscina de bolinhas',
  'arcos de balões orgânicos',
  'equipe de garçons e copeiras',
];

const HERO_STAGE_ACTS = [
  {
    id: 'ato-1',
    step: '01',
    label: 'Chegada & Alegria',
    badge: 'Ato 01 · Animação & Magia',
    caption: 'Recreação conduzida com carinho há 7 anos para encantar crianças e envolver os pais.',
    slideIndex: 0,
  },
  {
    id: 'ato-2',
    step: '02',
    label: 'Lanches & Brinquedos',
    badge: 'Ato 02 · Sabor & Brincadeira',
    caption: 'Pipoca, algodão doce, churros na hora e brinquedos higienizados montados no horário.',
    slideIndex: 2,
  },
  {
    id: 'ato-3',
    step: '03',
    label: 'Equipe & Eventos',
    badge: 'Ato 03 · Confiança Completa',
    caption: 'Equipe uniformizada de quintais em casa a grandes hotéis e ações comerciais em Salvador.',
    slideIndex: 1,
  },
] as const;

const heroSlideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 28,
    scale: 1.03,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: -dir * 28,
    scale: 0.99,
  }),
};

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const balloonPinkRef = useRef<HTMLDivElement>(null);
  const balloonBlueRef = useRef<HTMLDivElement>(null);
  const balloonMiniRef = useRef<HTMLDivElement>(null);
  const kidConfettiLeftRef = useRef<HTMLDivElement>(null);
  const kidConfettiTopRef = useRef<HTMLDivElement>(null);
  const confettiBurstLeftRef = useRef<HTMLDivElement>(null);
  const confettiBurstRightRef = useRef<HTMLDivElement>(null);
  const floatChipTopRef = useRef<HTMLDivElement>(null);
  const floatChipBottomRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const [slideIdx, setSlideIdx] = useState(0);
  const [slideDir, setSlideDir] = useState(1);
  const [activeActIdx, setActiveActIdx] = useState(0);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const manualOverrideRef = useRef(false);
  const activeActRef = useRef(0);

  const safeSlideIdx = slideIdx % HERO_CAROUSEL_SLIDES.length;
  const currentSlide = HERO_CAROUSEL_SLIDES[safeSlideIdx];
  const currentAct = HERO_STAGE_ACTS[activeActIdx] ?? HERO_STAGE_ACTS[0];

  useEffect(() => {
    HERO_CAROUSEL_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  useEffect(() => {
    if (isCarouselPaused || isLightboxOpen || prefersReducedMotion || isManualOverride) return;
    const timer = window.setTimeout(() => {
      setSlideDir(1);
      setSlideIdx((prev) => (prev + 1) % HERO_CAROUSEL_SLIDES.length);
    }, 5500);
    return () => window.clearTimeout(timer);
  }, [slideIdx, isCarouselPaused, isLightboxOpen, prefersReducedMotion, isManualOverride]);

  const handleSelectAct = (actIndex: number) => {
    const act = HERO_STAGE_ACTS[actIndex];
    if (!act) return;
    manualOverrideRef.current = true;
    setIsManualOverride(true);
    activeActRef.current = actIndex;
    setActiveActIdx(actIndex);
    setSlideDir(act.slideIndex >= safeSlideIdx ? 1 : -1);
    setSlideIdx(act.slideIndex);
  };

  const handleLightboxIndexChange = (nextIdx: number) => {
    setSlideDir(nextIdx > safeSlideIdx ? 1 : -1);
    setSlideIdx(nextIdx);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Continuous Duolingo-style character animation: anticipation, squash & stretch, eye blink, follow-through & confetti throw
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const buildThrowLoop = (
          prefix: 'kid1' | 'kid2',
          origins: {
            body: string;
            head: string;
            arm: string;
            forearm: string;
            leftArm: string;
            pouch: string;
            eyes: string;
            brows: string;
            follow: string;
          },
          startProgress: number
        ) => {
          const arm = `[data-${prefix}-arm]`;
          const forearm = `[data-${prefix}-forearm]`;
          const leftArm = `[data-${prefix}-left-arm]`;
          const body = `[data-${prefix}-body]`;
          const head = `[data-${prefix}-head]`;
          const eyes = `[data-${prefix}-eyes]`;
          const brows = `[data-${prefix}-brows]`;
          const hatOrPuffs = `[data-${prefix}-follow]`;
          const pouch = `[data-${prefix}-pouch]`;
          const particles = gsap.utils.toArray<SVGGraphicsElement>(`[data-${prefix}-confetti]`);

          // Lock exact SVG user-space pivot points in GSAP so limbs never drift from joints
          gsap.set(body, { svgOrigin: origins.body });
          gsap.set(head, { svgOrigin: origins.head });
          gsap.set(arm, { svgOrigin: origins.arm });
          gsap.set(forearm, { svgOrigin: origins.forearm });
          gsap.set(leftArm, { svgOrigin: origins.leftArm });
          gsap.set(pouch, { svgOrigin: origins.pouch });
          gsap.set(eyes, { svgOrigin: origins.eyes });
          gsap.set(brows, { svgOrigin: origins.brows });
          gsap.set(hatOrPuffs, { svgOrigin: origins.follow });
          particles.forEach((el) => {
            gsap.set(el, { transformOrigin: '50% 50%' });
          });

          const loop = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.45,
          });

          // 1. Anticipation: squish down & bend elbow across toward the bolsinha
          loop
            .to(body, {
              y: 3.5,
              scaleX: 1.07,
              scaleY: 0.91,
              rotation: -3.5,
              duration: 0.34,
              ease: 'power2.inOut',
            }, 0)
            .to(head, {
              y: 1.5,
              rotation: -5,
              duration: 0.34,
              ease: 'power2.inOut',
            }, 0)
            .to(hatOrPuffs, {
              rotation: 6,
              duration: 0.36,
              ease: 'power2.inOut',
            }, 0.04)
            .to(arm, {
              rotation: 22,
              duration: 0.34,
              ease: 'power2.inOut',
            }, 0)
            .to(forearm, {
              rotation: -94,
              duration: 0.34,
              ease: 'power2.inOut',
            }, 0)
            .to(leftArm, {
              rotation: -6,
              duration: 0.32,
              ease: 'power2.inOut',
            }, 0.02)
            .to(pouch, {
              rotation: -7,
              scaleX: 1.08,
              scaleY: 0.9,
              duration: 0.3,
              ease: 'power2.inOut',
            }, 0.06);

          // 2. Stretch & Launch: snappy jump upward and whip arm up to toss confetti
          loop
            .to(body, {
              y: -7,
              scaleX: 0.94,
              scaleY: 1.08,
              rotation: 3.5,
              duration: 0.28,
              ease: 'power3.out',
            }, 0.38)
            .to(head, {
              y: -2,
              rotation: 4.5,
              duration: 0.28,
              ease: 'back.out(1.8)',
            }, 0.4)
            .to(brows, {
              y: -2.2,
              duration: 0.22,
              ease: 'power2.out',
            }, 0.4)
            .to(hatOrPuffs, {
              rotation: -8,
              y: -1.5,
              duration: 0.3,
              ease: 'back.out(2)',
            }, 0.44)
            .to(arm, {
              rotation: -56,
              duration: 0.28,
              ease: 'back.out(2.1)',
            }, 0.38)
            .to(forearm, {
              rotation: 30,
              duration: 0.28,
              ease: 'back.out(2)',
            }, 0.4)
            .to(leftArm, {
              rotation: 5,
              duration: 0.26,
              ease: 'power2.out',
            }, 0.38)
            .to(pouch, {
              rotation: 6,
              scaleX: 0.94,
              scaleY: 1.06,
              duration: 0.26,
              ease: 'power2.out',
            }, 0.38);

          // 3. Confetti burst out of the throwing hand
          particles.forEach((el, i) => {
            const dx = Number(el.dataset.dx ?? 0);
            const dy = Number(el.dataset.dy ?? -44);
            const rot = Number(el.dataset.rot ?? 200);
            const delay = 0.5 + i * 0.03;

            loop.fromTo(
              el,
              {
                x: 0,
                y: 8,
                scale: 0.2,
                rotation: 0,
                opacity: 0,
              },
              {
                keyframes: [
                  {
                    x: dx * 0.48,
                    y: dy * 0.78,
                    scale: 1.22,
                    rotation: rot * 0.45,
                    opacity: 1,
                    duration: 0.32,
                    ease: 'power3.out',
                  },
                  {
                    x: dx,
                    y: dy + 14,
                    scale: 0.95,
                    rotation: rot,
                    opacity: 0.95,
                    duration: 0.5,
                    ease: 'sine.out',
                  },
                  {
                    x: dx * 1.14,
                    y: dy + 32,
                    scale: 0.55,
                    rotation: rot * 1.35,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power1.in',
                  },
                ],
              },
              delay
            );
          });

          // 4. Squash landing & elastic settle (Duolingo bounce!)
          loop
            .to(body, {
              y: 1.5,
              scaleX: 1.04,
              scaleY: 0.96,
              rotation: 0,
              duration: 0.22,
              ease: 'power2.in',
            }, 0.72)
            .to(body, {
              y: 0,
              scaleX: 1,
              scaleY: 1,
              rotation: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.55)',
            }, 0.94)
            .to(head, {
              y: 0,
              rotation: 0,
              duration: 0.48,
              ease: 'elastic.out(1, 0.6)',
            }, 0.78)
            .to(brows, {
              y: 0,
              duration: 0.35,
              ease: 'sine.inOut',
            }, 0.85)
            .to(hatOrPuffs, {
              rotation: 0,
              y: 0,
              duration: 0.52,
              ease: 'elastic.out(1, 0.5)',
            }, 0.82)
            .to(arm, {
              rotation: -4,
              duration: 0.48,
              ease: 'elastic.out(1, 0.65)',
            }, 0.82)
            .to(forearm, {
              rotation: 6,
              duration: 0.48,
              ease: 'elastic.out(1, 0.65)',
            }, 0.84)
            .to(leftArm, {
              rotation: 0,
              duration: 0.46,
              ease: 'elastic.out(1, 0.65)',
            }, 0.82)
            .to(pouch, {
              rotation: 0,
              scaleX: 1,
              scaleY: 1,
              duration: 0.46,
              ease: 'elastic.out(1, 0.6)',
            }, 0.82);

          // 5. Expressive quick eye blink during settle
          loop.to(
            eyes,
            {
              keyframes: [
                { scaleY: 0.08, duration: 0.07, ease: 'power1.in' },
                { scaleY: 1, duration: 0.09, ease: 'power1.out' },
              ],
            },
            1.28
          );

          loop.progress(startProgress);
        };

        buildThrowLoop(
          'kid1',
          {
            body: '64 134',
            head: '64 68',
            arm: '77 81',
            forearm: '87 93',
            leftArm: '49 81',
            pouch: '40 100',
            eyes: '64 51',
            brows: '64 44',
            follow: '64 31',
          },
          0.12
        );

        // Kid #2: Continuous Duolingo-style trampoline bounce (impact squash -> snappy takeoff -> apex kick -> fall)
        const buildTrampolineLoop = () => {
          const body = '[data-kid2-body]';
          const head = '[data-kid2-head]';
          const eyes = '[data-kid2-eyes]';
          const brows = '[data-kid2-brows]';
          const puffs = '[data-kid2-follow]';
          const leftArm = '[data-kid2-left-arm]';
          const rightArm = '[data-kid2-arm]';
          const leftLeg = '[data-kid2-leg-left]';
          const rightLeg = '[data-kid2-leg-right]';
          const trampMat = '[data-kid2-tramp-mat]';
          const trampRim = '[data-kid2-tramp-rim]';
          const shadow = '[data-kid2-shadow]';
          const airLines = '[data-kid2-air-lines]';

          gsap.set(body, { svgOrigin: '78 142' });
          gsap.set(head, { svgOrigin: '78 78' });
          gsap.set(eyes, { svgOrigin: '78 62' });
          gsap.set(brows, { svgOrigin: '78 55' });
          gsap.set(puffs, { svgOrigin: '78 55' });
          gsap.set(leftArm, { svgOrigin: '65 90' });
          gsap.set(rightArm, { svgOrigin: '91 90' });
          gsap.set(leftLeg, { svgOrigin: '70 124' });
          gsap.set(rightLeg, { svgOrigin: '86 124' });
          gsap.set(trampMat, { svgOrigin: '78 146' });
          gsap.set(trampRim, { svgOrigin: '78 146' });
          gsap.set(shadow, { svgOrigin: '78 178' });
          gsap.set(airLines, { svgOrigin: '78 96', opacity: 0 });

          const bounce = gsap.timeline({ repeat: -1 });

          // 1. Impact & mat compression (0.00s -> 0.24s)
          bounce
            .to(body, {
              y: 7,
              scaleX: 1.11,
              scaleY: 0.87,
              rotation: 0,
              duration: 0.22,
              ease: 'power2.out',
            }, 0)
            .to(trampMat, {
              y: 5.5,
              scaleX: 1.03,
              scaleY: 1.24,
              duration: 0.22,
              ease: 'power2.out',
            }, 0)
            .to(trampRim, {
              y: 2,
              scaleX: 1.02,
              scaleY: 0.96,
              duration: 0.22,
              ease: 'power2.out',
            }, 0)
            .to(shadow, {
              scaleX: 1.08,
              opacity: 0.2,
              duration: 0.22,
              ease: 'power2.out',
            }, 0)
            .to(leftArm, {
              rotation: -32,
              duration: 0.22,
              ease: 'power2.out',
            }, 0)
            .to(rightArm, {
              rotation: 32,
              duration: 0.22,
              ease: 'power2.out',
            }, 0)
            .to(leftLeg, {
              rotation: 8,
              duration: 0.22,
              ease: 'power2.out',
            }, 0)
            .to(rightLeg, {
              rotation: -8,
              duration: 0.22,
              ease: 'power2.out',
            }, 0)
            .to(puffs, {
              y: 2.5,
              rotation: -4,
              duration: 0.24,
              ease: 'power2.out',
            }, 0.02);

          // 2. Trampoline rebound & snappy jump up into the air (0.22s -> 0.56s)
          bounce
            .to(trampMat, {
              y: 0,
              scaleX: 1,
              scaleY: 1,
              duration: 0.55,
              ease: 'elastic.out(1.15, 0.42)',
            }, 0.22)
            .to(trampRim, {
              y: 0,
              scaleX: 1,
              scaleY: 1,
              duration: 0.52,
              ease: 'elastic.out(1.05, 0.48)',
            }, 0.22)
            .to(shadow, {
              scaleX: 0.72,
              opacity: 0.1,
              duration: 0.34,
              ease: 'power2.out',
            }, 0.22)
            .to(body, {
              keyframes: [
                {
                  y: -16,
                  scaleX: 0.92,
                  scaleY: 1.09,
                  rotation: -2.5,
                  duration: 0.16,
                  ease: 'power2.out',
                },
                {
                  y: -24,
                  scaleX: 1,
                  scaleY: 1,
                  rotation: 2,
                  duration: 0.18,
                  ease: 'sine.out',
                },
              ],
            }, 0.22)
            .to(head, {
              y: -2,
              rotation: 3,
              duration: 0.3,
              ease: 'back.out(1.8)',
            }, 0.24)
            .to(brows, {
              y: -2.4,
              duration: 0.22,
              ease: 'power2.out',
            }, 0.24)
            .to(puffs, {
              y: -3,
              rotation: 5,
              duration: 0.32,
              ease: 'back.out(2)',
            }, 0.28)
            .to(leftArm, {
              rotation: 26,
              duration: 0.3,
              ease: 'back.out(1.9)',
            }, 0.22)
            .to(rightArm, {
              rotation: -26,
              duration: 0.3,
              ease: 'back.out(1.9)',
            }, 0.22)
            .to(leftLeg, {
              rotation: 20,
              duration: 0.28,
              ease: 'back.out(1.8)',
            }, 0.24)
            .to(rightLeg, {
              rotation: -20,
              duration: 0.28,
              ease: 'back.out(1.8)',
            }, 0.24)
            .fromTo(
              airLines,
              { opacity: 0, y: 6, scale: 0.88 },
              {
                keyframes: [
                  { opacity: 0.9, y: -2, scale: 1.04, duration: 0.16, ease: 'power2.out' },
                  { opacity: 0, y: -10, scale: 1.08, duration: 0.2, ease: 'power1.in' },
                ],
              },
              0.26
            );

          // 3. Fall back down to mat with natural stretch & eye blink (0.56s -> 0.88s)
          bounce
            .to(body, {
              y: 0,
              scaleX: 0.95,
              scaleY: 1.06,
              rotation: 0,
              duration: 0.32,
              ease: 'power2.in',
            }, 0.56)
            .to(shadow, {
              scaleX: 1,
              opacity: 0.16,
              duration: 0.32,
              ease: 'power2.in',
            }, 0.56)
            .to(head, {
              y: 0,
              rotation: 0,
              duration: 0.3,
              ease: 'sine.inOut',
            }, 0.58)
            .to(brows, {
              y: 0,
              duration: 0.24,
              ease: 'sine.inOut',
            }, 0.6)
            .to(puffs, {
              y: 0,
              rotation: 0,
              duration: 0.3,
              ease: 'sine.inOut',
            }, 0.6)
            .to(leftArm, {
              rotation: 0,
              duration: 0.3,
              ease: 'power2.in',
            }, 0.58)
            .to(rightArm, {
              rotation: 0,
              duration: 0.3,
              ease: 'power2.in',
            }, 0.58)
            .to(leftLeg, {
              rotation: 0,
              duration: 0.28,
              ease: 'power2.in',
            }, 0.58)
            .to(rightLeg, {
              rotation: 0,
              duration: 0.28,
              ease: 'power2.in',
            }, 0.58)
            .to(
              eyes,
              {
                keyframes: [
                  { scaleY: 0.08, duration: 0.06, ease: 'power1.in' },
                  { scaleY: 1, duration: 0.08, ease: 'power1.out' },
                ],
              },
              0.52
            );
        };

        buildTrampolineLoop();
      }, sectionRef);

      return () => ctx.revert();
    });

    // Desktop: Pinned 3-Act Stage synchronized with Lenis + GSAP ScrollTrigger
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const triggerEl = pinStageRef.current;
        if (!triggerEl) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top 64px',
            end: '+=115%',
            pin: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const nextAct = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
              if (nextAct !== activeActRef.current) {
                const prevAct = activeActRef.current;
                activeActRef.current = nextAct;
                setActiveActIdx(nextAct);
                manualOverrideRef.current = false;
                setIsManualOverride(false);
                setSlideDir(nextAct > prevAct ? 1 : -1);
                setSlideIdx(HERO_STAGE_ACTS[nextAct].slideIndex);
              }
            },
          },
        });

        // Progress bar across the 3 acts
        if (progressBarRef.current) {
          tl.fromTo(
            progressBarRef.current,
            { scaleX: 0.08 },
            { scaleX: 1, ease: 'none', duration: 1 },
            0
          );
        }

        // Playful layered balloons floating at different speeds
        if (balloonPinkRef.current) {
          tl.fromTo(
            balloonPinkRef.current,
            { y: 26, rotation: -6, scale: 0.94 },
            { y: -42, rotation: 8, scale: 1.06, ease: 'none', duration: 1 },
            0
          );
        }
        if (balloonBlueRef.current) {
          tl.fromTo(
            balloonBlueRef.current,
            { y: 38, rotation: 7, scale: 0.92 },
            { y: -56, rotation: -7, scale: 1.05, ease: 'none', duration: 1 },
            0
          );
        }
        if (balloonMiniRef.current) {
          tl.fromTo(
            balloonMiniRef.current,
            { y: 18, x: -6, rotation: 4 },
            { y: -34, x: 10, rotation: -8, ease: 'none', duration: 1 },
            0
          );
        }

        // Joyful kids throwing confetti & celebrating on scroll
        if (kidConfettiLeftRef.current) {
          tl.fromTo(
            kidConfettiLeftRef.current,
            { y: 20, rotation: -5, scale: 0.94 },
            { y: -20, rotation: 4, scale: 1.05, ease: 'none', duration: 1 },
            0
          );
        }
        if (kidConfettiTopRef.current) {
          tl.fromTo(
            kidConfettiTopRef.current,
            { y: 14, rotation: 4, scale: 0.95 },
            { y: -18, rotation: -4, scale: 1.04, ease: 'none', duration: 1 },
            0
          );
        }
        if (confettiBurstLeftRef.current) {
          tl.fromTo(
            confettiBurstLeftRef.current,
            { y: 24, x: 6, rotation: -14, scale: 0.9 },
            { y: -44, x: -12, rotation: 24, scale: 1.12, ease: 'none', duration: 1 },
            0
          );
        }
        if (confettiBurstRightRef.current) {
          tl.fromTo(
            confettiBurstRightRef.current,
            { y: 18, x: -8, rotation: 12, scale: 0.92 },
            { y: -48, x: 14, rotation: -22, scale: 1.1, ease: 'none', duration: 1 },
            0
          );
        }

        // Opposing floating photo chips for 3D party depth
        if (floatChipTopRef.current) {
          tl.fromTo(
            floatChipTopRef.current,
            { y: 16, rotation: -3 },
            { y: -22, rotation: 2, ease: 'none', duration: 1 },
            0
          );
        }
        if (floatChipBottomRef.current) {
          tl.fromTo(
            floatChipBottomRef.current,
            { y: -12, rotation: 2 },
            { y: 20, rotation: -2, ease: 'none', duration: 1 },
            0
          );
        }

        // Subtle stage zoom & depth inside the main photo frame
        if (heroParallaxRef.current) {
          tl.fromTo(
            heroParallaxRef.current,
            { scale: 1.06, yPercent: -2 },
            { scale: 1.11, yPercent: 2, ease: 'none', duration: 1 },
            0
          );
        }

        // Quantitative proof strip locks in cleanly on Scene 3
        tl.fromTo(
          '[data-gsap="hero-stat"]',
          { y: 8, opacity: 0.72 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.35, ease: 'power2.out' },
          0.55
        );
      }, sectionRef);

      return () => ctx.revert();
    });

    // Mobile & Tablet: Lightweight non-pinned scrub parallax + reveal
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        if (balloonPinkRef.current) {
          gsap.fromTo(
            balloonPinkRef.current,
            { y: 14, rotation: -4 },
            {
              y: -26,
              rotation: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }

        if (balloonBlueRef.current) {
          gsap.fromTo(
            balloonBlueRef.current,
            { y: 20, rotation: 5 },
            {
              y: -30,
              rotation: -5,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }

        if (kidConfettiLeftRef.current) {
          gsap.fromTo(
            kidConfettiLeftRef.current,
            { y: 14, rotation: -4 },
            {
              y: -18,
              rotation: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }

        if (confettiBurstLeftRef.current) {
          gsap.fromTo(
            confettiBurstLeftRef.current,
            { y: 16, rotation: -10 },
            {
              y: -28,
              rotation: 18,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }

        if (heroParallaxRef.current) {
          gsap.fromTo(
            heroParallaxRef.current,
            { yPercent: -3 },
            {
              yPercent: 3,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }

        gsap.from('[data-gsap="hero-stat"]', {
          y: 16,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '[data-gsap="hero-stats"]',
            start: 'top 92%',
            once: true,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#fffbfa] border-b border-[#f3d9e6] overflow-x-clip"
    >
      <div
        ref={pinStageRef}
        className="pt-6 pb-8 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 2-Column Split Grid with items-stretch */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between py-1">
              <div>
                {/* Clean unboxed metadata kicker (Zero-Pill Rule) */}
                <p className="text-xs sm:text-sm font-medium text-[#8b8691] tracking-wide">
                  Salvador, Bahia <span aria-hidden="true">·</span> 13 anos de mercado{' '}
                  <span aria-hidden="true">·</span> De festas em casa a grandes hotéis
                </p>

                <BlurText
                  as="h1"
                  text="Festas feitas com raiz, alegria e cuidado em cada detalhe."
                  className="mt-3.5 font-display font-bold text-[#241f2e] tracking-tight leading-[1.06] text-balance"
                  style={{ fontSize: 'clamp(2.15rem, 3.85vw, 3.5rem)' }}
                  stepDelay={0.045}
                />

                <p className="mt-4 text-base sm:text-lg text-[#5c5868] leading-relaxed max-w-xl">
                  Da primeira máquina de algodão doce em casa até grandes eventos em hotéis de
                  Salvador: levamos brinquedos seguros, barracas de lanches ao vivo, animação, equipe
                  de garçons e arcos de balões sob medida.
                </p>

                <p className="mt-2.5 text-sm sm:text-base text-[#5c5868]">
                  Em destaque hoje:{' '}
                  <RotatingText
                    texts={HERO_ROTATING_HIGHLIGHTS}
                    className="font-semibold text-[#f26b9e] underline decoration-[#6ec6e3] decoration-2 underline-offset-4"
                  />
                </p>

                {/* Primary CTA + Toolcraft Entry */}
                <div className="mt-6 flex flex-wrap items-center gap-3.5">
                  <Magnet strength={0.14}>
                    <a
                      href={SOCIAL_LINKS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[22px] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] focus-visible:ring-offset-2"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      Solicitar Orçamento no WhatsApp
                    </a>
                  </Magnet>

                  <Magnet strength={0.12}>
                    <button
                      type="button"
                      onClick={() => onNavigate('toolcraft')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-[#241f2e] bg-white border border-[#f3d9e6] hover:border-[#241f2e] rounded-[22px] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58fc0]"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-[#6ec6e3]" aria-hidden="true" />
                      Montar Minha Festa
                    </button>
                  </Magnet>
                </div>

                {/* 3-Act Interactive Scroll Stage Stepper */}
                <div className="mt-6 pt-4 border-t border-[#f3d9e6]">
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#f26b9e]">
                      Palco da Festa · Role ou clique para explorar
                    </span>
                    <span className="font-mono text-[11px] text-[#8b8691] tabular-nums">
                      {currentAct.step}/03
                    </span>
                  </div>

                  <div className="relative h-1 w-full bg-[#ffe6f0] rounded-full overflow-hidden mb-3">
                    <div
                      ref={progressBarRef}
                      className="h-full w-full bg-gradient-to-r from-[#f58fc0] to-[#6ec6e3] origin-left rounded-full"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {HERO_STAGE_ACTS.map((act, idx) => {
                      const isActive = activeActIdx === idx;
                      return (
                        <button
                          key={act.id}
                          type="button"
                          onClick={() => handleSelectAct(idx)}
                          className={`text-left px-2.5 py-2 rounded-[12px] border transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#ffe6f0]/75 border-[#f58fc0] text-[#241f2e]'
                              : 'bg-white border-[#f3d9e6] text-[#5c5868] hover:border-[#f58fc0]/60'
                          }`}
                        >
                          <p className="font-mono text-[10px] font-semibold text-[#f26b9e]">
                            Ato {act.step}
                          </p>
                          <p className="text-xs font-semibold truncate">{act.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quiet Navigation & Social Access */}
              <div className="mt-6 pt-4 border-t border-[#f3d9e6] flex flex-wrap items-center justify-between gap-4 text-sm text-[#5c5868]">
                <button
                  type="button"
                  onClick={() => onNavigate('historia')}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#241f2e] hover:text-[#f26b9e] transition-colors cursor-pointer"
                >
                  Conheça a história de mãe e filho por trás da JPA
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <div className="flex items-center gap-4 text-xs font-medium text-[#8b8691]">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#241f2e] underline underline-offset-4 transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#241f2e] underline underline-offset-4 transition-colors"
                  >
                    TikTok
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#241f2e] underline underline-offset-4 transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href={SOCIAL_LINKS.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#241f2e] underline underline-offset-4 transition-colors"
                  >
                    Google
                  </a>
                </div>
              </div>
            </div>

            {/* Right Layered Party Stage */}
            <div
              className="lg:col-span-6 relative"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onFocusCapture={() => setIsCarouselPaused(true)}
              onBlurCapture={() => setIsCarouselPaused(false)}
            >
              {/* Floating Party Balloons in Scroll Parallax */}
              <div
                ref={balloonPinkRef}
                aria-hidden="true"
                className="pointer-events-none hidden sm:block absolute -top-5 -left-4 z-20 will-change-transform"
              >
                <svg width="54" height="78" viewBox="0 0 54 78" fill="none">
                  <ellipse cx="27" cy="25" rx="20" ry="23" fill="#f58fc0" fillOpacity="0.92" />
                  <ellipse cx="20" cy="18" rx="5.5" ry="9" transform="rotate(-18 20 18)" fill="#fffbfa" fillOpacity="0.45" />
                  <path d="M24 47L30 47L27 51Z" fill="#f26b9e" />
                  <path d="M27 51C25 58 31 64 26 76" stroke="#f26b9e" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
                </svg>
              </div>

              <div
                ref={balloonBlueRef}
                aria-hidden="true"
                className="pointer-events-none hidden sm:block absolute -bottom-6 -right-3 z-20 will-change-transform"
              >
                <svg width="50" height="74" viewBox="0 0 50 74" fill="none">
                  <ellipse cx="25" cy="23" rx="18" ry="21" fill="#6ec6e3" fillOpacity="0.92" />
                  <ellipse cx="19" cy="17" rx="5" ry="8" transform="rotate(-18 19 17)" fill="#fffbfa" fillOpacity="0.45" />
                  <path d="M22 43L28 43L25 47Z" fill="#46a9cc" />
                  <path d="M25 47C27 54 21 62 25 72" stroke="#46a9cc" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
                </svg>
              </div>

              <div
                ref={balloonMiniRef}
                aria-hidden="true"
                className="pointer-events-none hidden md:block absolute top-14 -right-5 z-20 will-change-transform"
              >
                <svg width="36" height="54" viewBox="0 0 36 54" fill="none">
                  <ellipse cx="18" cy="17" rx="13" ry="15" fill="#ffe6f0" stroke="#f58fc0" strokeWidth="1.5" />
                  <ellipse cx="14" cy="12" rx="3.5" ry="5.5" transform="rotate(-18 14 12)" fill="#fffbfa" fillOpacity="0.8" />
                  <path d="M18 32C16 38 20 44 17 52" stroke="#f58fc0" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.65" />
                </svg>
              </div>

              {/* Confetti Bursts & Party Streamers */}
              <div
                ref={confettiBurstLeftRef}
                aria-hidden="true"
                className="pointer-events-none hidden sm:block absolute bottom-16 -left-10 z-20 will-change-transform"
              >
                <svg width="68" height="72" viewBox="0 0 68 72" fill="none">
                  <rect x="8" y="22" width="8" height="5" rx="2" transform="rotate(-24 8 22)" fill="#f58fc0" />
                  <rect x="34" y="8" width="9" height="5" rx="2" transform="rotate(18 34 8)" fill="#6ec6e3" />
                  <circle cx="22" cy="12" r="3.5" fill="#fbbf24" />
                  <circle cx="52" cy="24" r="3" fill="#f26b9e" />
                  <path d="M14 48C18 40 28 42 30 34" stroke="#6ec6e3" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M40 56C44 48 52 50 56 40" stroke="#f58fc0" strokeWidth="2.4" strokeLinecap="round" />
                  <polygon points="48,10 51,16 57,17 52,21 53,27 48,24 43,27 44,21 39,17 45,16" fill="#fbbf24" />
                </svg>
              </div>

              <div
                ref={confettiBurstRightRef}
                aria-hidden="true"
                className="pointer-events-none hidden md:block absolute -top-6 right-16 z-20 will-change-transform"
              >
                <svg width="74" height="62" viewBox="0 0 74 62" fill="none">
                  <rect x="10" y="18" width="8" height="4.5" rx="2" transform="rotate(28 10 18)" fill="#6ec6e3" />
                  <rect x="46" y="12" width="8" height="4.5" rx="2" transform="rotate(-20 46 12)" fill="#f58fc0" />
                  <circle cx="32" cy="10" r="3.5" fill="#fbbf24" />
                  <circle cx="60" cy="28" r="3" fill="#6ec6e3" />
                  <path d="M18 42C24 34 32 38 38 28" stroke="#f58fc0" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M48 48C54 40 60 44 66 36" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Kid #1: Duolingo-style boy with party hat & bolsinha de confete */}
              <div
                ref={kidConfettiLeftRef}
                aria-hidden="true"
                className="pointer-events-none hidden sm:block absolute -bottom-5 -left-11 z-20 will-change-transform drop-shadow-md"
              >
                <svg width="136" height="146" viewBox="0 0 136 146" fill="none">
                  {/* Confetti launching from the bolsinha/hand */}
                  <g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} data-kid1-confetti data-dx="-28" data-dy="-46" data-rot="-240">
                    <circle cx="90" cy="60" r="4" fill="#f58fc0" stroke="#241f2e" strokeWidth="1.2" />
                  </g>
                  <g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} data-kid1-confetti data-dx="-8" data-dy="-54" data-rot="270">
                    <rect x="85" y="56" width="9.5" height="5.5" rx="2.5" fill="#fbbf24" stroke="#241f2e" strokeWidth="1.1" />
                  </g>
                  <g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} data-kid1-confetti data-dx="16" data-dy="-48" data-rot="210">
                    <circle cx="92" cy="58" r="3.8" fill="#6ec6e3" stroke="#241f2e" strokeWidth="1.2" />
                  </g>
                  <g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} data-kid1-confetti data-dx="28" data-dy="-38" data-rot="-190">
                    <rect x="90" y="60" width="9" height="5" rx="2" fill="#f26b9e" stroke="#241f2e" strokeWidth="1.1" />
                  </g>
                  <g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} data-kid1-confetti data-dx="-18" data-dy="-36" data-rot="320">
                    <polygon points="89,52 91.5,57 96.5,58 93,61.5 94,66.5 89,64 84,66.5 85,61.5 81.5,58 86.5,57" fill="#fbbf24" stroke="#241f2e" strokeWidth="1" />
                  </g>
                  <g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} data-kid1-confetti data-dx="5" data-dy="-42" data-rot="-250">
                    <path d="M86 62C90 55 96 57 99 51" stroke="#6ec6e3" strokeWidth="3" strokeLinecap="round" />
                  </g>
                  <g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} data-kid1-confetti data-dx="22" data-dy="-52" data-rot="200">
                    <path d="M87 60C92 54 96 58 100 52" stroke="#f58fc0" strokeWidth="3" strokeLinecap="round" />
                  </g>

                  <g data-kid1-body>
                    {/* Ground shadow */}
                    <ellipse cx="64" cy="138" rx="22" ry="4" fill="#241f2e" fillOpacity="0.16" />

                    {/* Chunky legs & sneakers */}
                    <path d="M54 114L49 131" stroke="#241f2e" strokeWidth="9.5" strokeLinecap="round" />
                    <path d="M74 114L80 130" stroke="#241f2e" strokeWidth="9.5" strokeLinecap="round" />
                    <rect x="39" y="128" width="16" height="8.5" rx="4.2" fill="#f58fc0" stroke="#241f2e" strokeWidth="2" />
                    <path d="M41 134H53" stroke="#fffbfa" strokeWidth="2" strokeLinecap="round" />
                    <rect x="74" y="127" width="16" height="8.5" rx="4.2" fill="#f58fc0" stroke="#241f2e" strokeWidth="2" />
                    <path d="M76 133H88" stroke="#fffbfa" strokeWidth="2" strokeLinecap="round" />

                    {/* Left arm tucked into left sleeve & holding the bolsinha */}
                    <g data-kid1-left-arm>
                      <path d="M51 81L40 91L43 99" stroke="#241f2e" strokeWidth="11.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M51 81L40 91L43 99" stroke="#9b5c34" strokeWidth="7.3" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="43" cy="99" r="4.6" fill="#9b5c34" stroke="#241f2e" strokeWidth="1.9" />
                    </g>

                    {/* Rounded Duolingo-style t-shirt torso */}
                    <path
                      d="M44 82C44 74 51 70 64 70C77 70 84 74 84 82L86 110C86 115 81 118 64 118C47 118 42 115 42 110L44 82Z"
                      fill="#6ec6e3"
                      stroke="#241f2e"
                      strokeWidth="2.2"
                    />
                    {/* Soft cel shading on bottom of shirt */}
                    <path
                      d="M43 104C47 109 81 109 85 104L86 110C86 115 81 118 64 118C47 118 42 115 42 110L43 104Z"
                      fill="#46a9cc"
                    />
                    {/* Crisp collar & crossbody strap */}
                    <path d="M55 71C59 76 69 76 73 71" fill="#fffbfa" stroke="#241f2e" strokeWidth="2" strokeLinecap="round" />
                    <path d="M74 73L43 102" stroke="#f26b9e" strokeWidth="3.2" strokeLinecap="round" />

                    {/* Left T-shirt sleeve cap */}
                    <path
                      d="M48 73C41 74 37 79 38 86C42 87 47 87 51 85Z"
                      fill="#6ec6e3"
                      stroke="#241f2e"
                      strokeWidth="2.1"
                      strokeLinejoin="round"
                    />

                    {/* Chunky Bolsinha de Confete at front-left hip */}
                    <g data-kid1-pouch>
                      <circle cx="35" cy="94" r="3" fill="#fbbf24" stroke="#241f2e" strokeWidth="1.2" />
                      <circle cx="43" cy="92" r="3" fill="#6ec6e3" stroke="#241f2e" strokeWidth="1.2" />
                      <rect x="38" y="90" width="6" height="4" rx="1.5" fill="#fffbfa" stroke="#241f2e" strokeWidth="1.1" />
                      <path
                        d="M28 98C28 95.5 31 94.5 40 94.5C49 94.5 52 95.5 52 98L53.5 115C53.5 118.5 48.5 120.5 40 120.5C31.5 120.5 26.5 118.5 26.5 115L28 98Z"
                        fill="#f58fc0"
                        stroke="#241f2e"
                        strokeWidth="2.2"
                      />
                      <path d="M28 102.5H52" stroke="#f26b9e" strokeWidth="3.2" />
                      <polygon points="40,98 41.7,101.5 45.5,102 42.8,104.5 43.5,108.2 40,106.4 36.5,108.2 37.2,104.5 34.5,102 38.3,101.5" fill="#fbbf24" stroke="#241f2e" strokeWidth="1.1" />
                    </g>

                    {/* Articulated Throwing Arm (Upper Arm + Elbow + Forearm + Hand) */}
                    <g data-kid1-arm>
                      <path d="M75 81L87 93" stroke="#241f2e" strokeWidth="12" strokeLinecap="round" />
                      <path d="M75 81L87 93" stroke="#9b5c34" strokeWidth="7.6" strokeLinecap="round" />
                      <g data-kid1-forearm>
                        <path d="M87 93L95 75" stroke="#241f2e" strokeWidth="11.5" strokeLinecap="round" />
                        <path d="M87 93L95 75" stroke="#9b5c34" strokeWidth="7.3" strokeLinecap="round" />
                        <circle cx="95" cy="74" r="5" fill="#9b5c34" stroke="#241f2e" strokeWidth="1.9" />
                        <circle cx="93" cy="69" r="2.4" fill="#fbbf24" />
                        <circle cx="98" cy="70" r="2.3" fill="#f58fc0" />
                      </g>
                    </g>

                    {/* Right T-shirt sleeve cap overlapping shoulder joint (77, 81) */}
                    <path
                      d="M78 73C85 74 89 79 88 86C84 87 79 87 75 85Z"
                      fill="#6ec6e3"
                      stroke="#241f2e"
                      strokeWidth="2.1"
                      strokeLinejoin="round"
                    />

                    {/* Expressive Duolingo-style Head */}
                    <g data-kid1-head>
                      {/* Curly hair silhouette */}
                      <circle cx="64" cy="46" r="22" fill="#241f2e" />
                      <circle cx="48" cy="39" r="9.5" fill="#241f2e" />
                      <circle cx="80" cy="39" r="9.5" fill="#241f2e" />
                      <circle cx="56" cy="29" r="9" fill="#241f2e" />
                      <circle cx="72" cy="29" r="9" fill="#241f2e" />
                      {/* Ears */}
                      <circle cx="43" cy="53" r="4.5" fill="#9b5c34" stroke="#241f2e" strokeWidth="2" />
                      <circle cx="85" cy="53" r="4.5" fill="#9b5c34" stroke="#241f2e" strokeWidth="2" />
                      {/* Warm rounded face */}
                      <rect x="44" y="34" width="40" height="38" rx="19" fill="#9b5c34" stroke="#241f2e" strokeWidth="2.2" />
                      {/* Hairline fringe */}
                      <path d="M46 42C51 35 77 35 82 42C75 39 53 39 46 42Z" fill="#241f2e" />

                      {/* Expressive Eyebrows */}
                      <g data-kid1-brows>
                        <path d="M52 44.5C54 42.5 57.5 42.5 59.5 44" stroke="#241f2e" strokeWidth="2.4" strokeLinecap="round" />
                        <path d="M68.5 44C70.5 42.5 74 42.5 76 44.5" stroke="#241f2e" strokeWidth="2.4" strokeLinecap="round" />
                      </g>

                      {/* Big Duolingo Eyes with white shine + blink */}
                      <g data-kid1-eyes>
                        <ellipse cx="56" cy="51" rx="4.3" ry="5" fill="#fffbfa" stroke="#241f2e" strokeWidth="1.5" />
                        <ellipse cx="72" cy="51" rx="4.3" ry="5" fill="#fffbfa" stroke="#241f2e" strokeWidth="1.5" />
                        <circle cx="56.8" cy="51.3" r="2.6" fill="#241f2e" />
                        <circle cx="72.8" cy="51.3" r="2.6" fill="#241f2e" />
                        <circle cx="57.8" cy="49.7" r="1.1" fill="#fffbfa" />
                        <circle cx="73.8" cy="49.7" r="1.1" fill="#fffbfa" />
                      </g>

                      {/* Rosy cheeks */}
                      <ellipse cx="49" cy="57" rx="3.2" ry="1.8" fill="#f26b9e" fillOpacity="0.45" />
                      <ellipse cx="79" cy="57" rx="3.2" ry="1.8" fill="#f26b9e" fillOpacity="0.45" />

                      {/* Big joyful Duolingo open smile */}
                      <path d="M56 59.5C58 66.5 70 66.5 72 59.5Z" fill="#241f2e" stroke="#241f2e" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M58 60.5H70C69 62.3 59 62.3 58 60.5Z" fill="#fffbfa" />
                      <ellipse cx="64" cy="64" rx="3.8" ry="1.8" fill="#f58fc0" />

                      {/* Party Hat with Follow-Through */}
                      <g data-kid1-follow>
                        <path d="M53 31L64 8L75 31Z" fill="#f58fc0" stroke="#241f2e" strokeWidth="2.1" strokeLinejoin="round" />
                        <path d="M56.5 24L69.5 19.5" stroke="#6ec6e3" strokeWidth="3" strokeLinecap="round" />
                        <path d="M59.5 17L67 14" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="64" cy="7" r="4.2" fill="#fbbf24" stroke="#241f2e" strokeWidth="1.8" />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>

              {/* Kid #2: Duolingo-style girl joyfully jumping on a pula-pula (trampoline) */}
              <div
                ref={kidConfettiTopRef}
                aria-hidden="true"
                className="pointer-events-none hidden md:block absolute -top-14 left-1/2 -translate-x-1/2 z-20 will-change-transform drop-shadow-md"
              >
                <svg width="138" height="162" viewBox="0 0 156 184" fill="none">
                  {/* Ground shadow beneath the trampoline */}
                  <ellipse
                    data-kid2-shadow
                    cx="78"
                    cy="178"
                    rx="48"
                    ry="4.5"
                    fill="#241f2e"
                    fillOpacity="0.16"
                  />

                  {/* Trampoline safety legs */}
                  <path d="M38 152L35 173" stroke="#241f2e" strokeWidth="5.5" strokeLinecap="round" />
                  <path d="M78 156V176" stroke="#241f2e" strokeWidth="5.5" strokeLinecap="round" />
                  <path d="M118 152L121 173" stroke="#241f2e" strokeWidth="5.5" strokeLinecap="round" />

                  {/* Trampoline outer frame & colorful JPA safety pad */}
                  <g data-kid2-tramp-rim>
                    <ellipse cx="78" cy="147" rx="54" ry="11.5" fill="#241f2e" />
                    <ellipse cx="78" cy="145" rx="54" ry="11" fill="#6ec6e3" stroke="#241f2e" strokeWidth="2.2" />
                    {/* Pink & yellow safety pad accents */}
                    <path
                      d="M31 149C42 155.5 60 157.5 78 157.5C96 157.5 114 155.5 125 149"
                      stroke="#f58fc0"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M58 157C65 157.8 91 157.8 98 157"
                      stroke="#fbbf24"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                    <ellipse cx="78" cy="145" rx="54" ry="11" stroke="#241f2e" strokeWidth="2.2" />
                  </g>

                  {/* Bouncy black trampoline jumping mat */}
                  <g data-kid2-tramp-mat>
                    <ellipse cx="78" cy="145" rx="41" ry="7.5" fill="#241f2e" />
                    <ellipse cx="78" cy="144.5" rx="34" ry="4.5" fill="#3a3347" />
                  </g>

                  {/* Subtle cartoon "boing" air arcs */}
                  <g data-kid2-air-lines>
                    <path d="M26 108C22 100 22 90 26 82" stroke="#6ec6e3" strokeWidth="2.6" strokeLinecap="round" />
                    <path d="M130 108C134 100 134 90 130 82" stroke="#f58fc0" strokeWidth="2.6" strokeLinecap="round" />
                    <circle cx="24" cy="74" r="2.6" fill="#fbbf24" />
                    <circle cx="132" cy="74" r="2.6" fill="#fbbf24" />
                  </g>

                  {/* Jumping Duolingo-style Girl */}
                  <g data-kid2-body>
                    {/* Chunky legs & sneakers pivoting cleanly from hips */}
                    <g data-kid2-leg-left>
                      <path d="M70 124L66 139" stroke="#241f2e" strokeWidth="9" strokeLinecap="round" />
                      <rect x="57" y="136" width="14.5" height="8" rx="4" fill="#6ec6e3" stroke="#241f2e" strokeWidth="1.9" />
                      <path d="M59 141.5H70" stroke="#fffbfa" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                    <g data-kid2-leg-right>
                      <path d="M86 124L90 139" stroke="#241f2e" strokeWidth="9" strokeLinecap="round" />
                      <rect x="84.5" y="136" width="14.5" height="8" rx="4" fill="#6ec6e3" stroke="#241f2e" strokeWidth="1.9" />
                      <path d="M86.5 141.5H97" stroke="#fffbfa" strokeWidth="1.8" strokeLinecap="round" />
                    </g>

                    {/* Left & Right arms tucked inside sleeves */}
                    <g data-kid2-left-arm>
                      <path d="M65 90C54 84 48 74 46 64" stroke="#241f2e" strokeWidth="11.2" strokeLinecap="round" />
                      <path d="M65 90C54 84 48 74 46 64" stroke="#a56943" strokeWidth="7" strokeLinecap="round" />
                      <circle cx="46" cy="63" r="4.6" fill="#a56943" stroke="#241f2e" strokeWidth="1.9" />
                    </g>
                    <g data-kid2-arm>
                      <path d="M91 90C102 84 108 74 110 64" stroke="#241f2e" strokeWidth="11.2" strokeLinecap="round" />
                      <path d="M91 90C102 84 108 74 110 64" stroke="#a56943" strokeWidth="7" strokeLinecap="round" />
                      <circle cx="110" cy="63" r="4.6" fill="#a56943" stroke="#241f2e" strokeWidth="1.9" />
                    </g>

                    {/* Pink party top + sky-blue party skirt/shorts */}
                    <path
                      d="M58 90C58 82 65 78 78 78C91 78 98 82 98 90L100 115C100 119 95 121 78 121C61 121 56 119 56 115L58 90Z"
                      fill="#f58fc0"
                      stroke="#241f2e"
                      strokeWidth="2.2"
                    />
                    <path
                      d="M57 109C62 113 94 113 99 109L100 115C100 119 95 121 78 121C61 121 56 119 56 115L57 109Z"
                      fill="#f26b9e"
                    />
                    <path
                      d="M57 115C62 118 94 118 99 115L103 125C95 128 61 128 53 125Z"
                      fill="#6ec6e3"
                      stroke="#241f2e"
                      strokeWidth="2.1"
                      strokeLinejoin="round"
                    />
                    <path d="M69 79C73 84 83 84 87 79" fill="#fffbfa" stroke="#241f2e" strokeWidth="2" strokeLinecap="round" />

                    {/* Left & Right T-shirt sleeve caps covering shoulder joints */}
                    <path
                      d="M62 81C55 82 51 87 52 94C56 95 61 95 65 93Z"
                      fill="#f58fc0"
                      stroke="#241f2e"
                      strokeWidth="2.1"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M94 81C101 82 105 87 104 94C100 95 95 95 91 93Z"
                      fill="#f58fc0"
                      stroke="#241f2e"
                      strokeWidth="2.1"
                      strokeLinejoin="round"
                    />

                    {/* Expressive Duolingo-style Head */}
                    <g data-kid2-head>
                      {/* Twin afro puffs with Follow-Through */}
                      <g data-kid2-follow>
                        <circle cx="55" cy="43" r="10.5" fill="#241f2e" />
                        <circle cx="101" cy="43" r="10.5" fill="#241f2e" />
                        <circle cx="52" cy="40" r="3" fill="#474056" />
                        <circle cx="98" cy="40" r="3" fill="#474056" />
                        {/* Cute party bows */}
                        <path d="M58 48L54 52L61 54Z" fill="#6ec6e3" stroke="#241f2e" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M98 48L102 52L95 54Z" fill="#6ec6e3" stroke="#241f2e" strokeWidth="1.5" strokeLinejoin="round" />
                        <circle cx="60" cy="50" r="3" fill="#fbbf24" stroke="#241f2e" strokeWidth="1.4" />
                        <circle cx="96" cy="50" r="3" fill="#fbbf24" stroke="#241f2e" strokeWidth="1.4" />
                      </g>

                      {/* Hair base & ears */}
                      <circle cx="78" cy="57" r="21" fill="#241f2e" />
                      <circle cx="57" cy="64" r="4.3" fill="#a56943" stroke="#241f2e" strokeWidth="2" />
                      <circle cx="99" cy="64" r="4.3" fill="#a56943" stroke="#241f2e" strokeWidth="2" />

                      {/* Warm rounded face */}
                      <rect x="58" y="46" width="40" height="37" rx="18.5" fill="#a56943" stroke="#241f2e" strokeWidth="2.2" />
                      <path d="M60 54C67 47 89 47 96 54C88 51 68 51 60 54Z" fill="#241f2e" />

                      {/* Expressive Eyebrows */}
                      <g data-kid2-brows>
                        <path d="M66 56.5C68 54.5 71.5 54.5 73.5 56" stroke="#241f2e" strokeWidth="2.3" strokeLinecap="round" />
                        <path d="M82.5 56C84.5 54.5 88 54.5 90 56.5" stroke="#241f2e" strokeWidth="2.3" strokeLinecap="round" />
                      </g>

                      {/* Big Duolingo Eyes with white shine + blink */}
                      <g data-kid2-eyes>
                        <ellipse cx="70" cy="63" rx="4.3" ry="5" fill="#fffbfa" stroke="#241f2e" strokeWidth="1.5" />
                        <ellipse cx="86" cy="63" rx="4.3" ry="5" fill="#fffbfa" stroke="#241f2e" strokeWidth="1.5" />
                        <circle cx="70.8" cy="63.3" r="2.6" fill="#241f2e" />
                        <circle cx="86.8" cy="63.3" r="2.6" fill="#241f2e" />
                        <circle cx="71.8" cy="61.7" r="1.1" fill="#fffbfa" />
                        <circle cx="87.8" cy="61.7" r="1.1" fill="#fffbfa" />
                      </g>

                      {/* Rosy cheeks */}
                      <ellipse cx="63" cy="69" rx="3.2" ry="1.8" fill="#f26b9e" fillOpacity="0.5" />
                      <ellipse cx="93" cy="69" rx="3.2" ry="1.8" fill="#f26b9e" fillOpacity="0.5" />

                      {/* Big joyful Duolingo open smile */}
                      <path d="M70 71.5C72 78.5 84 78.5 86 71.5Z" fill="#241f2e" stroke="#241f2e" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M72 72.5H84C83 74.3 73 74.3 72 72.5Z" fill="#fffbfa" />
                      <ellipse cx="78" cy="76" rx="3.8" ry="1.8" fill="#f58fc0" />
                    </g>
                  </g>
                </svg>
              </div>

              {/* Opposing Floating Photo Chips for 3D Depth */}
              <div
                ref={floatChipTopRef}
                className="hidden md:flex flex-col absolute top-8 -left-8 z-20 w-[152px] lg:w-[168px] p-2 bg-white/95 backdrop-blur-xs border border-[#f3d9e6] rounded-[20px] shadow-lg will-change-transform"
              >
                <div className="w-full h-24 lg:h-28 rounded-[14px] overflow-hidden shrink-0 border border-[#f3d9e6]">
                  <SafeImage
                    src={BRAND_IMAGES.heroReal4}
                    alt="Animadora fazendo chuva de espuma com crianças"
                    className="w-full h-full object-cover object-[50%_38%]"
                    fallbackTitle="Animação & Espuma"
                  />
                </div>
                <div className="mt-1.5 px-0.5 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#f26b9e] truncate">
                    Animação & Recreação
                  </p>
                  <p className="text-xs font-bold text-[#241f2e] truncate">
                    Chuva de Espuma
                  </p>
                </div>
              </div>

              <div
                ref={floatChipBottomRef}
                className="hidden md:flex flex-col absolute bottom-16 -right-6 z-20 w-[152px] lg:w-[168px] p-2 bg-white/95 backdrop-blur-xs border border-[#f3d9e6] rounded-[20px] shadow-lg will-change-transform"
              >
                <div className="w-full h-24 lg:h-28 rounded-[14px] overflow-hidden shrink-0 border border-[#f3d9e6]">
                  <SafeImage
                    src={BRAND_IMAGES.lanchesReal3}
                    alt="Pipoca quentinha na hora em saquinhos rosa da JPA"
                    className="w-full h-full object-cover object-[50%_62%]"
                    fallbackTitle="Lanches ao Vivo"
                  />
                </div>
                <div className="mt-1.5 px-0.5 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#46a9cc] truncate">
                    Feito na Hora
                  </p>
                  <p className="text-xs font-bold text-[#241f2e] truncate">
                    Pipoca & Lanches
                  </p>
                </div>
              </div>

              <TiltedCard
                maxTilt={3.5}
                scaleOnHover={1.01}
                className="relative h-full min-h-[340px] sm:min-h-[400px] lg:min-h-[430px] rounded-[32px] overflow-hidden border border-[#f3d9e6] bg-[#ffe6f0]"
              >
                <div
                  ref={heroParallaxRef}
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute inset-0 w-full h-full scale-[1.06] will-change-transform cursor-zoom-in"
                >
                  <AnimatePresence initial={false} custom={slideDir} mode="popLayout">
                    <motion.div
                      key={currentSlide.src}
                      custom={slideDir}
                      variants={prefersReducedMotion ? undefined : heroSlideVariants}
                      initial={prefersReducedMotion ? { opacity: 0 } : 'enter'}
                      animate={prefersReducedMotion ? { opacity: 1 } : 'center'}
                      exit={prefersReducedMotion ? { opacity: 0 } : 'exit'}
                      transition={{
                        duration: prefersReducedMotion ? 0.15 : 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-0 w-full h-full will-change-[transform,opacity]"
                    >
                      <SafeImage
                        src={currentSlide.src}
                        alt={currentSlide.alt}
                        className={`w-full h-full object-cover ${currentSlide.objectPosition}`}
                        fallbackTitle="JPA Eventos BA · Salvador, Bahia"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none"
                />

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-4 right-4 z-10 flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    aria-label="Expandir foto em tela cheia"
                    title="Ver foto inteira"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#241f2e]/85 hover:bg-[#241f2e] backdrop-blur-xs text-white text-[11px] font-medium rounded-[10px] border border-white/15 transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">Expandir</span>
                  </button>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white pointer-events-none">
                  <p className="text-xs font-semibold text-[#f58fc0]">
                    {currentAct.badge}
                  </p>
                  <p className="mt-1 font-display text-base sm:text-lg font-semibold leading-snug">
                    {currentAct.caption}
                  </p>
                </div>
              </TiltedCard>
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative Proof Strip Below Hero Split */}
          <div
            data-gsap="hero-stats"
            className="mt-7 pt-6 border-t border-[#f3d9e6] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            <div data-gsap="hero-stat">
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#241f2e] tabular-nums">
                <CountUp from={2000} to={2013} />
              </p>
              <p className="mt-1 text-sm text-[#5c5868]">
                De história e festas realizadas em Salvador e região
              </p>
            </div>
            <div data-gsap="hero-stat">
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#241f2e] tabular-nums">
                <CountUp to={7} /> anos
              </p>
              <p className="mt-1 text-sm text-[#5c5868]">
                Com a animadora
              </p>
            </div>
            <div data-gsap="hero-stat">
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#241f2e] tabular-nums">
                <CountUp to={27} /> itens
              </p>
              <p className="mt-1 text-sm text-[#5c5868]">
                Entre brinquedos, lanches ao vivo, equipe e balões
              </p>
            </div>
            <div data-gsap="hero-stat">
              <div className="flex items-center gap-1.5">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#241f2e] tabular-nums">
                  <CountUp to={5} decimals={1} />
                </p>
                <div className="flex items-center text-[#f58fc0]" aria-label="5 de 5 estrelas no Google">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <p className="mt-1 text-sm text-[#5c5868]">
                Avaliação máxima de clientes verificados no Google
              </p>
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={isLightboxOpen}
        images={[...HERO_CAROUSEL_SLIDES]}
        currentIndex={safeSlideIdx}
        onClose={() => setIsLightboxOpen(false)}
        onChangeIndex={handleLightboxIndexChange}
        title="Eventos JPA Eventos BA · Salvador"
      />
    </section>
  );
}
