import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ExternalLink, Star } from 'lucide-react';
import { FAQ_ITEMS, GOOGLE_REVIEWS, SOCIAL_LINKS } from '../data/jpaData';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { CountUp } from './reactbits/CountUp';
import { WhatsAppIcon } from './WhatsAppIcon';
import { gsap } from '../lib/gsap';

export function ReviewsAndFaqSection() {
  const reviewsSectionRef = useRef<HTMLElement>(null);
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [faqCategory, setFaqCategory] = useState<string>('Todas');

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('[data-gsap="review-card"]', {
          y: 22,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '[data-gsap="reviews-grid"]',
            start: 'top 88%',
            once: true,
          },
        });
      }, reviewsSectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const faqCategories = useMemo(
    () => ['Todas', ...Array.from(new Set(FAQ_ITEMS.map((item) => item.category)))],
    []
  );

  const visibleFaqs = useMemo(() => {
    if (faqCategory === 'Todas') return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) => item.category === faqCategory);
  }, [faqCategory]);

  return (
    <div className="bg-[#fffbfa]">
      {/* Selected Top Google Reviews */}
      <section
        ref={reviewsSectionRef}
        id="avaliacoes"
        className="py-14 sm:py-20 border-b border-[#f3d9e6]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-medium text-[#8b8691]">
                Avaliações no Google <span aria-hidden="true">·</span> Clientes reais em Salvador, BA
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#241f2e] text-balance">
                O que as famílias e empresas de Salvador dizem sobre nós
              </h2>
              <p className="mt-3 text-base text-[#5c5868] leading-relaxed">
                Selecionamos algumas das melhores avaliações 5 estrelas registradas no Google por
                pais, mães, lojistas e organizadores que viveram um dia especial com a nossa equipe.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0 bg-white border border-[#f3d9e6] rounded-[22px] px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-bold text-[#241f2e] tabular-nums">
                    <CountUp to={5} decimals={1} />
                  </span>
                  <div className="flex items-center text-[#f58fc0]" aria-label="Nota 5 de 5 estrelas">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <p className="text-xs text-[#8b8691] mt-0.5">Perfil verificado no Google</p>
              </div>
              <a
                href={SOCIAL_LINKS.google}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#241f2e] bg-[#fffbfa] border border-[#f3d9e6] hover:border-[#241f2e] rounded-[12px] transition-colors whitespace-nowrap"
              >
                Ver no Google
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* 3-Column Reviews Grid */}
          <div
            data-gsap="reviews-grid"
            className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {GOOGLE_REVIEWS.map((review, idx) => (
              <div key={review.id} data-gsap="review-card">
                <SpotlightCard
                  as="article"
                  spotlightColor={
                    idx % 2 === 0 ? 'rgba(245, 143, 192, 0.16)' : 'rgba(110, 198, 227, 0.16)'
                  }
                  className="h-full bg-white border border-[#f3d9e6] rounded-[22px] p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className="flex items-center gap-0.5 text-[#f58fc0]"
                        aria-label={`${review.rating} de 5 estrelas`}
                      >
                        {Array.from({ length: review.rating }).map((_, starIdx) => (
                          <Star key={starIdx} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-[#8b8691]">{review.dateLabel}</span>
                    </div>

                    <p className="mt-4 text-sm sm:text-[15px] text-[#241f2e] leading-relaxed">
                      “{review.text}”
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#ffe6f0]">
                    <p className="font-display text-base font-bold text-[#241f2e]">
                      {review.author}
                    </p>
                    <p className="mt-0.5 text-xs text-[#8b8691]">
                      {review.neighborhood} <span aria-hidden="true">·</span> {review.eventType}
                    </p>
                    <p className="mt-1.5 text-xs font-medium text-[#f26b9e]">
                      {review.highlightService}
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perguntas e Respostas (FAQ) */}
      <section id="duvidas" className="py-14 sm:py-20 border-b border-[#f3d9e6] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Sticky Intro & Quote CTA */}
            <div className="lg:col-span-4">
              <p className="text-xs sm:text-sm font-medium text-[#8b8691]">
                Perguntas e Respostas <span aria-hidden="true">·</span> Tire suas dúvidas
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#241f2e] text-balance">
                Tudo explicado com transparência antes da festa
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#5c5868] leading-relaxed">
                Confira as respostas para as principais dúvidas sobre montagem em apartamentos,
                tomadas para barracas, bairros atendidos em Salvador e reserva de data.
              </p>

              <div className="mt-6 p-5 bg-[#fffbfa] border border-[#f3d9e6] rounded-[22px]">
                <p className="font-display text-base font-bold text-[#241f2e]">
                  Ficou com alguma dúvida específica?
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#5c5868]">
                  Fale direto com a nossa equipe para avaliarmos seu espaço e montarmos seu orçamento.
                </p>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[12px] transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Tirar Dúvida e Pedir Orçamento
                </a>
              </div>
            </div>

            {/* Right Interactive FAQ Accordion */}
            <div className="lg:col-span-8">
              <div
                role="tablist"
                aria-label="Filtrar perguntas por assunto"
                className="flex flex-wrap items-center gap-1.5 mb-6"
              >
                {faqCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={faqCategory === cat}
                    onClick={() => setFaqCategory(cat)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-[12px] border transition-colors cursor-pointer ${
                      faqCategory === cat
                        ? 'bg-[#241f2e] text-white border-[#241f2e]'
                        : 'bg-[#fffbfa] text-[#5c5868] border-[#f3d9e6] hover:text-[#241f2e]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="divide-y divide-[#f3d9e6] border-t border-b border-[#f3d9e6]">
                {visibleFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="py-1">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                        className="w-full py-4 sm:py-5 flex items-start justify-between gap-4 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58fc0] rounded"
                      >
                        <div>
                          <span className="block text-xs font-medium text-[#f26b9e]">
                            {faq.category}
                          </span>
                          <span className="mt-1 block font-display text-base sm:text-lg font-semibold text-[#241f2e] group-hover:text-[#f26b9e] transition-colors">
                            {faq.question}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-[#8b8691] shrink-0 mt-1 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#241f2e]' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {isOpen && (
                        <div className="pb-5 pr-8 text-sm sm:text-base text-[#5c5868] leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
