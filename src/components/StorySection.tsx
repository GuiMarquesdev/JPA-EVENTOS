import { useEffect, useRef } from 'react';
import { HeartHandshake, SlidersHorizontal } from 'lucide-react';
import { BRAND_IMAGES, SOCIAL_LINKS, STORY_CHAPTERS } from '../data/jpaData';
import { SafeImage } from './SafeImage';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TiltedCard } from './reactbits/TiltedCard';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { Magnet } from './reactbits/Magnet';
import { gsap } from '../lib/gsap';
import type { PageView } from './Navbar';

interface StorySectionProps {
  onNavigate: (view: PageView) => void;
}

export function StorySection({ onNavigate }: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const storyParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        if (storyParallaxRef.current) {
          gsap.fromTo(
            storyParallaxRef.current,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: storyParallaxRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }

        gsap.from('[data-gsap="story-milestone"]', {
          y: 18,
          opacity: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '[data-gsap="story-milestones"]',
            start: 'top 88%',
            once: true,
          },
        });

        gsap.fromTo(
          '[data-gsap="story-progress"]',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-gsap="story-chapters"]',
              start: 'top 85%',
              end: 'bottom 65%',
              scrub: 0.5,
            },
          }
        );

        gsap.from('[data-gsap="story-chapter"]', {
          y: 24,
          opacity: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '[data-gsap="story-chapters"]',
            start: 'top 86%',
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
      id="historia"
      className="py-16 sm:py-24 bg-[#241f2e] text-[#fffbfa] border-b border-[#241f2e]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#f58fc0] tracking-wide">
                Nossa História <span aria-hidden="true">·</span> 13 anos de resistência e alegria em Salvador
              </p>

              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.1] text-white text-balance">
                “Viver de festa é um desafio todo santo dia — e cada sorriso faz valer a pena.”
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[#f3d9e6] leading-relaxed">
                Por trás da JPA Eventos BA existe uma história real de coragem: a de uma mãe preta,
                solo em Salvador, que começou sem transporte e sem recursos, vendendo algodão doce
                feito em casa para criar seu filho Paulo — que cresceu nos eventos e hoje é um
                especialista ao seu lado.
              </p>
            </div>

            {/* Milestones Summary Without Slop Borders */}
            <div
              data-gsap="story-milestones"
              className="mt-8 pt-8 border-t border-[#f3d9e6]/20 grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div data-gsap="story-milestone">
                <p className="font-display text-xl font-bold text-[#f58fc0]">Piscina 1x1m</p>
                <p className="mt-1 text-xs sm:text-sm text-[#f3d9e6]">
                  Comprada usada de uma escola no início e preservada até hoje como nosso símbolo
                </p>
              </div>
              <div data-gsap="story-milestone">
                <p className="font-display text-xl font-bold text-[#f58fc0]">Paulo</p>
                <p className="mt-1 text-xs sm:text-sm text-[#f3d9e6]">
                  Acompanhava a mãe em cada evento desde pequeno e hoje domina toda a operação
                </p>
              </div>
              <div data-gsap="story-milestone">
                <p className="font-display text-xl font-bold text-[#f58fc0]">Ascais</p>
                <p className="mt-1 text-xs sm:text-sm text-[#f3d9e6]">
                  Estrepolia das Cais anima nossas festas há 7 anos com o mesmo carinho
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <TiltedCard
              maxTilt={3.5}
              scaleOnHover={1.01}
              className="relative h-full min-h-[320px] sm:min-h-[420px] rounded-[32px] overflow-hidden border border-[#f3d9e6]/25 bg-[#241f2e]"
            >
              <div ref={storyParallaxRef} className="w-full h-full scale-[1.08] will-change-transform">
                <SafeImage
                  src={BRAND_IMAGES.story}
                  alt="Fundadora da JPA Eventos BA ao lado de seu filho Paulo e da equipe uniformizada em frente à piscina de bolinhas"
                  className="w-full h-full object-cover object-[50%_22%]"
                  fallbackTitle="Mãe e filho · JPA Eventos BA"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#241f2e]/85 via-[#241f2e]/20 to-transparent"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                <p className="text-xs font-medium text-[#f58fc0]">
                  Da JPE Eventos em casa aos grandes hotéis de Salvador
                </p>
                <p className="mt-1 font-display text-base sm:text-lg font-semibold text-white">
                  Cada equipamento conquistado aos poucos, com trabalho honesto e clientes que viraram amigos.
                </p>
              </div>
            </TiltedCard>
          </div>
        </div>

        {/* 4 Chapters Narrative Grid */}
        <div className="relative mt-14 pt-12 border-t border-[#f3d9e6]/20">
          <div
            data-gsap="story-progress"
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#f58fc0] to-[#6ec6e3] origin-left"
          />
          <div
            data-gsap="story-chapters"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {STORY_CHAPTERS.map((chapter, idx) => (
              <div key={chapter.index} data-gsap="story-chapter">
                <SpotlightCard
                  as="article"
                  spotlightColor={
                    idx % 2 === 0 ? 'rgba(245, 143, 192, 0.14)' : 'rgba(110, 198, 227, 0.14)'
                  }
                  className="h-full bg-[#241f2e] border border-[#f3d9e6]/25 rounded-[22px] p-6 sm:p-7"
                >
                  <div>
                    <p className="text-xs font-medium text-[#f58fc0]">
                      {chapter.index} <span aria-hidden="true">·</span> {chapter.period}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-white leading-snug">
                      {chapter.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-[#f3d9e6] leading-relaxed">
                      {chapter.body}
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>

        {/* Emotional Conversion Callout */}
        <div className="mt-12 p-6 sm:p-8 bg-[#241f2e] border border-[#f3d9e6]/30 rounded-[32px] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <HeartHandshake className="w-7 h-7 text-[#f58fc0] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Quando você contrata a JPA Eventos BA, você apoia uma história real da nossa cidade
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-[#f3d9e6]">
                Atendemos desde aniversários íntimos em casa até empresas, vereadores e grandes
                hotéis de Salvador — sempre com o mesmo respeito e dedicação do primeiro dia.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Magnet strength={0.14}>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[22px] transition-colors whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Falar Conosco e Pedir Orçamento
              </a>
            </Magnet>
            <button
              type="button"
              onClick={() => onNavigate('toolcraft')}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#241f2e] bg-[#fffbfa] hover:bg-white rounded-[22px] transition-colors whitespace-nowrap cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#6ec6e3]" aria-hidden="true" />
              Monte Sua Festa
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
