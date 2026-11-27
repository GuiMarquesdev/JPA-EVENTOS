import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, ExternalLink, Maximize2, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  SERVICE_CATEGORIES,
  SERVICES_CATALOG,
  SOCIAL_LINKS,
  getProductWhatsAppUrl,
  type ServiceCategoryId,
} from '../data/jpaData';
import { SafeImage } from './SafeImage';
import { ImageLightbox } from './ImageLightbox';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SpotlightCard } from './reactbits/SpotlightCard';
import type { PageView } from './Navbar';

interface CatalogSectionProps {
  selectedIds: string[];
  onToggleItem: (id: string) => void;
  onNavigate: (view: PageView) => void;
  isStandalonePage?: boolean;
}

export function CatalogSection({
  selectedIds,
  onToggleItem,
  onNavigate,
  isStandalonePage = false,
}: CatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SERVICES_CATALOG.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const activeCategoryMeta = useMemo(
    () => SERVICE_CATEGORIES.find((cat) => cat.id === activeCategory),
    [activeCategory]
  );

  const visibleCategories = useMemo(() => {
    if (activeCategory === 'all') {
      return SERVICE_CATEGORIES.filter((cat) =>
        filteredItems.some((item) => item.category === cat.id)
      );
    }
    return SERVICE_CATEGORIES.filter((cat) => cat.id === activeCategory);
  }, [activeCategory, filteredItems]);

  return (
    <section
      id="catalogo"
      className="py-14 sm:py-20 bg-[#fffbfa] border-b border-[#f3d9e6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-[#8b8691]">
              Catálogo Completo <span aria-hidden="true">·</span> Orçamento direto por item no WhatsApp
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#241f2e] text-balance">
              Tudo o que sua festa precisa em um só lugar
            </h2>
            <p className="mt-3 text-base text-[#5c5868] leading-relaxed">
              Cada serviço e produto abaixo conta com botão direto para orçamento imediato no
              WhatsApp, ou você pode ir adicionando ao seu roteiro personalizado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[12px] transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Orçamento Geral no WhatsApp
            </a>
            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={() => onNavigate('toolcraft')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#241f2e] bg-white border border-[#f3d9e6] hover:border-[#241f2e] rounded-[12px] transition-colors whitespace-nowrap cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#6ec6e3]" aria-hidden="true" />
                Ver Roteiro ({selectedIds.length})
              </button>
            )}
          </div>
        </div>

        {/* Interactive Filter Tabs + Search */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#f3d9e6]">
          <div
            role="tablist"
            aria-label="Filtrar serviços por categoria"
            className="flex items-center gap-1.5 p-1 bg-[#ffe6f0] rounded-[22px] overflow-x-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-[12px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-[#241f2e] shadow-xs font-semibold'
                  : 'text-[#5c5868] hover:text-[#241f2e]'
              }`}
            >
              Todos (27)
            </button>
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-[12px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white text-[#241f2e] shadow-xs font-semibold'
                    : 'text-[#5c5868] hover:text-[#241f2e]'
                }`}
              >
                {cat.shortLabel}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search
              className="w-4 h-4 text-[#8b8691] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar crepe, pula-pula, balões..."
              aria-label="Buscar no catálogo de serviços"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#f3d9e6] rounded-[12px] text-[#241f2e] placeholder:text-[#8b8691] focus:outline-none focus:ring-2 focus:ring-[#f58fc0] focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Visual Spotlight when filtered to 1 category */}
        {activeCategoryMeta && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-white border border-[#f3d9e6] rounded-[32px] overflow-hidden">
            <div className="lg:col-span-5 min-h-[300px] lg:min-h-[340px]">
              <CategoryPhotoFrame
                key={activeCategoryMeta.id}
                image={activeCategoryMeta.image}
                imageAlt={activeCategoryMeta.imageAlt}
                gallery={activeCategoryMeta.gallery}
                fallbackTitle={activeCategoryMeta.label}
              />
            </div>
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
              <p className="text-xs font-medium text-[#f26b9e]">
                {activeCategoryMeta.index}. {activeCategoryMeta.label}
              </p>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#241f2e]">
                {activeCategoryMeta.headline}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#5c5868] leading-relaxed">
                {activeCategoryMeta.description}
              </p>
              {activeCategoryMeta.id === 'animacao' && (
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <a
                    href={SOCIAL_LINKS.estripuliaInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f26b9e] hover:text-[#241f2e] transition-colors"
                  >
                    Ver @estripuliadaskas no Instagram
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <span className="text-xs text-[#8b8691]">
                    Tia K1 · Fit Dance Kids · Pintura Artística · Chuva de Espuma
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty Search State */}
        {filteredItems.length === 0 ? (
          <div className="mt-10 bg-white border border-[#f3d9e6] rounded-[32px] p-10 text-center">
            <p className="font-display text-xl font-semibold text-[#241f2e]">
              Nenhum item encontrado para "{searchQuery}"
            </p>
            <p className="mt-2 text-sm text-[#5c5868]">
              Limpe a busca ou fale diretamente no WhatsApp para montarmos uma opção sob medida.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 text-sm font-medium bg-[#ffe6f0] text-[#241f2e] rounded-[12px] hover:bg-[#f3d9e6] transition-colors cursor-pointer"
              >
                Mostrar todos os itens
              </button>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-semibold bg-[#25d366] text-white rounded-[12px] hover:bg-[#1aa34f] transition-colors"
              >
                Consultar no WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-14">
            {visibleCategories.map((cat) => {
              const items = filteredItems.filter((item) => item.category === cat.id);
              if (items.length === 0) return null;

              return (
                <div key={cat.id}>
                  {/* Category Sub-header with Editorial Numbering + Visual Banner Preview on "all" */}
                  {activeCategory === 'all' && (
                    <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#f3d9e6]">
                      <div className="max-w-2xl">
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#241f2e]">
                          {cat.index}. {cat.label}
                        </h3>
                        <p className="mt-1.5 text-sm sm:text-base text-[#5c5868]">
                          {cat.description}
                        </p>
                        {cat.id === 'animacao' && (
                          <a
                            href={SOCIAL_LINKS.estripuliaInstagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#f26b9e] hover:text-[#241f2e] transition-colors"
                          >
                            Acompanhar @estripuliadaskas no Instagram (Tia K1 · Fit Dance Kids)
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className="text-sm font-semibold text-[#f26b9e] hover:text-[#f26b9e] whitespace-nowrap shrink-0 cursor-pointer text-left md:text-right"
                      >
                        Focar em {cat.shortLabel} ({items.length})
                      </button>
                    </div>
                  )}

                  {/* Category Photo Strip: For Lanches ao Vivo, photos are linked directly on top of each card */}
                  {activeCategory === 'all' && cat.id === 'lanches' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {items.map((item) => (
                        <ServiceProductCard
                          key={item.id}
                          item={item}
                          categoryLabel={cat.label}
                          isSelected={selectedIds.includes(item.id)}
                          onToggle={() => onToggleItem(item.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      {activeCategory === 'all' && (
                        <div className="mb-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                          <div className="lg:col-span-4 rounded-[22px] overflow-hidden border border-[#f3d9e6] bg-white min-h-[260px]">
                            <CategoryPhotoFrame
                              image={cat.image}
                              imageAlt={cat.imageAlt}
                              gallery={cat.gallery}
                              fallbackTitle={cat.label}
                            />
                          </div>

                          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {items.slice(0, 2).map((item) => (
                              <ServiceProductCard
                                key={item.id}
                                item={item}
                                categoryLabel={cat.label}
                                isSelected={selectedIds.includes(item.id)}
                                onToggle={() => onToggleItem(item.id)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Remaining items in clean grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {(activeCategory === 'all' ? items.slice(2) : items).map((item) => (
                          <ServiceProductCard
                            key={item.id}
                            item={item}
                            categoryLabel={cat.label}
                            isSelected={selectedIds.includes(item.id)}
                            onToggle={() => onToggleItem(item.id)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Standalone Page Conversion Footer Banner */}
        {isStandalonePage && (
          <div className="mt-14 p-6 sm:p-8 bg-white border border-[#f3d9e6] rounded-[32px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#241f2e]">
                Quer combinar vários itens em um único pacote?
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-[#5c5868]">
                Use o nosso estúdio interativo Monte Sua Festa ou envie sua lista direta pelo WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('toolcraft')}
                className="px-5 py-3 text-sm font-semibold text-[#241f2e] bg-[#fffbfa] border border-[#f3d9e6] hover:border-[#241f2e] rounded-[22px] transition-colors cursor-pointer"
              >
                Abrir Monte Sua Festa
              </button>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[22px] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Pedir Orçamento Agora
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

interface ServiceProductCardProps {
  item: (typeof SERVICES_CATALOG)[number];
  categoryLabel: string;
  isSelected: boolean;
  onToggle: () => void;
}

function ServiceProductCard({
  item,
  categoryLabel,
  isSelected,
  onToggle,
}: ServiceProductCardProps) {
  const hasImages = Boolean(item.images && item.images.length > 0);

  return (
    <SpotlightCard
      as="article"
      spotlightColor={
        isSelected ? 'rgba(110, 198, 227, 0.22)' : 'rgba(245, 143, 192, 0.18)'
      }
      className={`bg-white border border-[#f3d9e6] rounded-[22px] transition-colors duration-150 hover:border-[#241f2e] ${
        hasImages ? 'overflow-hidden' : 'p-5 sm:p-6'
      }`}
    >
      <div>
        {hasImages && item.images && (
          <CategoryPhotoFrame
            image={item.images[0].src}
            imageAlt={item.images[0].alt}
            gallery={item.images}
            fallbackTitle={item.name}
            containerClassName="h-52 sm:h-56 border-b border-[#f3d9e6]"
          />
        )}

        <div className={hasImages ? 'px-5 pt-5 sm:px-6 sm:pt-5' : ''}>
          {/* Zero-Pill Metadata Line */}
          <p className="text-xs font-medium text-[#8b8691] truncate">
            {item.subtitle}
          </p>

          <h4 className="mt-2 font-display text-lg sm:text-xl font-bold text-[#241f2e] leading-snug">
            {item.name}
          </h4>

          <p className="mt-2.5 text-sm text-[#5c5868] leading-relaxed">
            {item.description}
          </p>

          <ul className="mt-4 space-y-1.5 text-xs text-[#5c5868]">
            {item.highlights.map((hl) => (
              <li key={hl} className="flex items-start gap-2">
                <span aria-hidden="true" className="text-[#f58fc0] font-bold">
                  ·
                </span>
                <span>{hl}</span>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-xs text-[#8b8691]">
            Indicado para: <span className="text-[#241f2e] font-medium">{item.idealFor}</span>
          </p>
        </div>
      </div>

      {/* Product Action Footer: Direct WhatsApp Quote per Product + Add to Studio */}
      <div
        className={`mt-5 pt-4 border-t border-[#ffe6f0] flex flex-wrap items-stretch gap-2 ${
          hasImages ? 'px-5 pb-5 sm:px-6 sm:pb-6' : ''
        }`}
      >
        <a
          href={getProductWhatsAppUrl(item.name, categoryLabel)}
          target="_blank"
          rel="noopener noreferrer"
          className="grow-[2] basis-[155px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs sm:text-[13px] font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[12px] transition-colors whitespace-nowrap"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
          Orçar no WhatsApp
        </a>

        <button
          type="button"
          onClick={onToggle}
          aria-pressed={isSelected}
          title={isSelected ? 'Remover do roteiro de festa' : 'Adicionar ao roteiro Monte Sua Festa'}
          className={`grow basis-[100px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-[12px] border transition-colors whitespace-nowrap cursor-pointer ${
            isSelected
              ? 'bg-[#241f2e] text-white border-[#241f2e]'
              : 'bg-[#fffbfa] text-[#241f2e] border-[#f3d9e6] hover:border-[#241f2e]'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              No roteiro
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              Incluir
            </>
          )}
        </button>
      </div>
    </SpotlightCard>
  );
}

interface CategoryPhotoFrameProps {
  image: string;
  imageAlt: string;
  gallery?: { src: string; alt: string; objectPosition?: string }[];
  fallbackTitle: string;
  containerClassName?: string;
}

const photoVariants = {
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

function CategoryPhotoFrame({
  image,
  imageAlt,
  gallery,
  fallbackTitle,
  containerClassName = 'h-full min-h-[260px]',
}: CategoryPhotoFrameProps) {
  const photos =
    gallery && gallery.length > 0 ? gallery : [{ src: image, alt: imageAlt }];
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const safeIdx = activeIdx % photos.length;
  const currentPhoto = photos[safeIdx];
  const hasMultiple = photos.length > 1;

  useEffect(() => {
    if (photos.length <= 1) return;
    photos.forEach((photo) => {
      const preloader = new Image();
      preloader.src = photo.src;
    });
  }, [photos]);

  useEffect(() => {
    if (!hasMultiple || isPaused || isLightboxOpen || prefersReducedMotion) return;
    const timer = window.setTimeout(() => {
      setDirection(1);
      setActiveIdx((prev) => (prev + 1) % photos.length);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [activeIdx, hasMultiple, isPaused, isLightboxOpen, photos.length, prefersReducedMotion]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % photos.length);
  };

  const handleLightboxIndexChange = (nextIdx: number) => {
    setDirection(nextIdx > safeIdx ? 1 : -1);
    setActiveIdx(nextIdx);
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
        className={`group relative w-full overflow-hidden bg-[#ffe6f0] ${containerClassName}`}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentPhoto.src}
            custom={direction}
            variants={prefersReducedMotion ? undefined : photoVariants}
            initial={prefersReducedMotion ? { opacity: 0 } : 'enter'}
            animate={prefersReducedMotion ? { opacity: 1 } : 'center'}
            exit={prefersReducedMotion ? { opacity: 0 } : 'exit'}
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => setIsLightboxOpen(true)}
            className="absolute inset-0 w-full h-full will-change-[transform,opacity] cursor-zoom-in"
          >
            <SafeImage
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              className={`w-full h-full object-cover ${currentPhoto.objectPosition ?? 'object-center'}`}
              fallbackTitle={fallbackTitle}
            />
          </motion.div>
        </AnimatePresence>

        {/* Expand button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
          aria-label={`Expandir foto de ${fallbackTitle}`}
          title="Ver foto inteira"
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#241f2e]/85 hover:bg-[#241f2e] backdrop-blur-xs text-white text-[11px] font-medium rounded-[10px] border border-white/15 transition-colors cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Expandir</span>
        </button>

        {hasMultiple && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 p-1 bg-[#241f2e]/85 backdrop-blur-xs text-white rounded-[12px] border border-white/15"
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Foto anterior"
              className="w-7 h-7 inline-flex items-center justify-center rounded-[8px] hover:bg-white/15 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <span className="px-1.5 font-mono text-[11px] font-medium tabular-nums">
              {safeIdx + 1}/{photos.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Próxima foto"
              className="w-7 h-7 inline-flex items-center justify-center rounded-[8px] hover:bg-white/15 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <ImageLightbox
        isOpen={isLightboxOpen}
        images={photos}
        currentIndex={safeIdx}
        onClose={() => setIsLightboxOpen(false)}
        onChangeIndex={handleLightboxIndexChange}
        title={fallbackTitle}
      />
    </>
  );
}

