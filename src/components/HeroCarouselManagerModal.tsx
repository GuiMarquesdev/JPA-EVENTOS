import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ImagePlus,
  Plus,
  RotateCcw,
  Trash2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BRAND_IMAGES, HERO_CAROUSEL_SLIDES } from '../data/jpaData';
import { SafeImage } from './SafeImage';

export interface HeroSlideOption {
  id: string;
  src: string;
  alt: string;
  objectPosition: string;
  label: string;
  isCustom?: boolean;
}

export const DEFAULT_HERO_SLIDES: HeroSlideOption[] = [
  {
    id: 'slide-animadoras-bolo',
    src: HERO_CAROUSEL_SLIDES[0].src,
    alt: HERO_CAROUSEL_SLIDES[0].alt,
    objectPosition: HERO_CAROUSEL_SLIDES[0].objectPosition,
    label: 'Animadoras & Bolo',
  },
  {
    id: 'slide-pipoca',
    src: HERO_CAROUSEL_SLIDES[1].src,
    alt: HERO_CAROUSEL_SLIDES[1].alt,
    objectPosition: HERO_CAROUSEL_SLIDES[1].objectPosition,
    label: 'Barraca de Pipoca',
  },
  {
    id: 'slide-estacao-frutas',
    src: HERO_CAROUSEL_SLIDES[2].src,
    alt: HERO_CAROUSEL_SLIDES[2].alt,
    objectPosition: HERO_CAROUSEL_SLIDES[2].objectPosition,
    label: 'Estação de Frutas',
  },
  {
    id: 'slide-toboga',
    src: HERO_CAROUSEL_SLIDES[3].src,
    alt: HERO_CAROUSEL_SLIDES[3].alt,
    objectPosition: HERO_CAROUSEL_SLIDES[3].objectPosition,
    label: 'Tobogã Inflável',
  },
];

const EXTRA_SITE_PHOTOS: HeroSlideOption[] = [
  {
    id: 'extra-chuva-espuma',
    src: '/src/assets/images/hero_slide_6.jpg',
    alt: 'Animadora da JPA Eventos BA conduzindo chuva de espuma com crianças se divertindo',
    objectPosition: 'object-center',
    label: 'Chuva de Espuma',
  },
  {
    id: 'extra-pintura',
    src: BRAND_IMAGES.animacao,
    alt: 'Animadora caracterizada da JPA Eventos BA fazendo pintura artística infantil',
    objectPosition: 'object-[50%_36%]',
    label: 'Pintura Artística',
  },
  {
    id: 'extra-pula-pula',
    src: BRAND_IMAGES.pulaPulaReal,
    alt: 'Pula-pula colorido da JPA Eventos BA montado para festa ao ar livre',
    objectPosition: 'object-[50%_52%]',
    label: 'Pula-Pula Colorido',
  },
  {
    id: 'extra-algodao',
    src: BRAND_IMAGES.lanchesReal1,
    alt: 'Operador da JPA Eventos BA preparando algodão doce azul ao vivo',
    objectPosition: 'object-[50%_30%]',
    label: 'Algodão Doce',
  },
  {
    id: 'extra-baloes',
    src: BRAND_IMAGES.baloes,
    alt: 'Arco de balões colorido em entrada de evento com carrinho de pipoca',
    objectPosition: 'object-[50%_38%]',
    label: 'Arco de Balões',
  },
  {
    id: 'extra-piscina',
    src: BRAND_IMAGES.piscinaBolinhasReal,
    alt: 'Piscina de bolinhas 1x1m alta com rede de proteção da JPA Eventos BA',
    objectPosition: 'object-center',
    label: 'Piscina de Bolinhas',
  },
  {
    id: 'extra-pipoca-close',
    src: BRAND_IMAGES.lanchesReal3,
    alt: 'Máquina de pipoca da JPA Eventos BA com saquinhos listrados rosa',
    objectPosition: 'object-[50%_60%]',
    label: 'Pipoca Quentinha',
  },
  {
    id: 'extra-crepe',
    src: BRAND_IMAGES.lanchesReal4,
    alt: 'Crepe suíço no palito assado na hora pela JPA Eventos BA',
    objectPosition: 'object-[50%_55%]',
    label: 'Crepe Suíço',
  },
  {
    id: 'extra-churros',
    src: BRAND_IMAGES.lanchesChurros,
    alt: 'Churros artesanais recheados com doce de leite em caixinhas',
    objectPosition: 'object-center',
    label: 'Churros Artesanais',
  },
  {
    id: 'extra-pastel',
    src: BRAND_IMAGES.lanchesPastel,
    alt: 'Pastel brasileiro frito na hora com massa dourada e crocante',
    objectPosition: 'object-center',
    label: 'Pastel Frito',
  },
  {
    id: 'extra-acai',
    src: BRAND_IMAGES.lanchesAcai,
    alt: 'Açaí cremoso servido com granola, banana, morango e leite em pó',
    objectPosition: 'object-center',
    label: 'Açaí na Hora',
  },
  {
    id: 'extra-equipe-1',
    src: BRAND_IMAGES.equipe1,
    alt: 'Equipe uniformizada da JPA Eventos BA com aventais rosa em salão decorado',
    objectPosition: 'object-[50%_35%]',
    label: 'Equipe Uniformizada',
  },
  {
    id: 'extra-equipe-2',
    src: BRAND_IMAGES.equipeAventalRosa2,
    alt: 'Equipe JPA Eventos BA sorrindo antes do início da festa',
    objectPosition: 'object-[50%_45%]',
    label: 'Equipe & Animadora',
  },
  {
    id: 'extra-churrasco',
    src: BRAND_IMAGES.equipeChurrasco,
    alt: 'Profissional da JPA Eventos BA preparando churrasco durante evento',
    objectPosition: 'object-[50%_42%]',
    label: 'Churrasco ao Vivo',
  },
];

const SITE_GALLERY_OPTIONS: HeroSlideOption[] = [
  ...DEFAULT_HERO_SLIDES,
  ...EXTRA_SITE_PHOTOS,
];

const POSITION_PRESETS = [
  { label: 'Topo', value: 'object-[50%_22%]' },
  { label: 'Centro', value: 'object-center' },
  { label: 'Baixo', value: 'object-[50%_72%]' },
] as const;

async function compressImageFile(file: File): Promise<string> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Falha ao ler imagem'));
      image.src = objectUrl;
    });

    const maxEdge = 1600;
    const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
    const targetW = Math.max(1, Math.round(img.width * scale));
    const targetH = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas indisponível');
    ctx.drawImage(img, 0, 0, targetW, targetH);

    return canvas.toDataURL('image/jpeg', 0.84);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

interface HeroCarouselManagerModalProps {
  isOpen: boolean;
  slides: HeroSlideOption[];
  activeIndex: number;
  storageWarning: string | null;
  onUpdateSlides: (nextSlides: HeroSlideOption[]) => void;
  onPreviewSlide: (index: number) => void;
  onResetDefault: () => void;
  onClose: () => void;
}

export function HeroCarouselManagerModal({
  isOpen,
  slides,
  activeIndex,
  storageWarning,
  onUpdateSlides,
  onPreviewSlide,
  onResetDefault,
  onClose,
}: HeroCarouselManagerModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  const isSelected = (src: string) => slides.some((s) => s.src === src);

  const handleToggleOption = (option: HeroSlideOption) => {
    setUploadError(null);
    const existingIdx = slides.findIndex((s) => s.src === option.src);
    if (existingIdx >= 0) {
      if (slides.length <= 1) return;
      onUpdateSlides(slides.filter((_, idx) => idx !== existingIdx));
    } else {
      const next = [...slides, option];
      onUpdateSlides(next);
      onPreviewSlide(next.length - 1);
    }
  };

  const handleMove = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= slides.length) return;
    const next = [...slides];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onUpdateSlides(next);
    onPreviewSlide(target);
  };

  const handleRemove = (index: number) => {
    if (slides.length <= 1) return;
    const next = slides.filter((_, idx) => idx !== index);
    onUpdateSlides(next);
    if (activeIndex >= next.length) {
      onPreviewSlide(Math.max(0, next.length - 1));
    }
  };

  const handleChangePosition = (index: number, objectPosition: string) => {
    const next = slides.map((slide, idx) =>
      idx === index ? { ...slide, objectPosition } : slide
    );
    onUpdateSlides(next);
  };

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const newSlides: HeroSlideOption[] = [];
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        const dataUrl = await compressImageFile(file);
        const cleanName = file.name.replace(/\.[^.]+$/, '').slice(0, 28) || 'Foto enviada';
        newSlides.push({
          id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          src: dataUrl,
          alt: `${cleanName} · Evento JPA Eventos BA`,
          objectPosition: 'object-center',
          label: cleanName,
          isCustom: true,
        });
      }

      if (newSlides.length > 0) {
        const next = [...slides, ...newSlides];
        onUpdateSlides(next);
        onPreviewSlide(slides.length);
      }
    } catch {
      setUploadError('Não foi possível carregar uma das imagens selecionadas.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Escolher fotos do carrossel principal"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.12 : 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[105] flex items-center justify-center bg-[#241f2e]/75 backdrop-blur-sm p-3 sm:p-6"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] bg-[#fffbfa] border border-[#f3d9e6] rounded-[28px] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 sm:px-7 py-4 sm:py-5 bg-white border-b border-[#f3d9e6] flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-[#241f2e]">
                  Escolher fotos do carrossel
                </h2>
                <p className="mt-0.5 text-xs sm:text-sm text-[#5c5868]">
                  Adicione fotos do seu dispositivo, reordene a sequência ou escolha da galeria do site.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar janela de seleção"
                className="p-2 rounded-[12px] border border-[#f3d9e6] text-[#241f2e] hover:bg-[#ffe6f0] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7">
              {(uploadError || storageWarning) && (
                <div className="p-3.5 rounded-[14px] border border-[#f58fc0] bg-[#ffe6f0]/70 text-xs sm:text-sm text-[#241f2e]">
                  {uploadError ?? storageWarning}
                </div>
              )}

              {/* Active Carousel Sequence */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-[#241f2e]">
                      Ordem no carrossel ({slides.length}{' '}
                      {slides.length === 1 ? 'foto' : 'fotos'})
                    </h3>
                    <p className="text-xs text-[#5c5868]">
                      Ajuste a ordem de exibição e o enquadramento de cada foto.
                    </p>
                  </div>

                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFilesSelected}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#241f2e] hover:bg-[#3a334a] disabled:opacity-60 rounded-[14px] transition-colors cursor-pointer"
                    >
                      <ImagePlus className="w-4 h-4 text-[#f58fc0]" aria-hidden="true" />
                      {isUploading ? 'Carregando...' : 'Enviar do computador ou celular'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {slides.map((slide, idx) => {
                    const isCurrent = idx === activeIndex % slides.length;
                    return (
                      <div
                        key={`${slide.id}-${idx}`}
                        className={`p-2.5 rounded-[18px] border bg-white transition-colors ${
                          isCurrent ? 'border-[#f26b9e] ring-2 ring-[#f58fc0]/25' : 'border-[#f3d9e6]'
                        }`}
                      >
                        <div className="relative h-32 rounded-[12px] overflow-hidden bg-[#ffe6f0]">
                          <SafeImage
                            src={slide.src}
                            alt={slide.alt}
                            className={`w-full h-full object-cover ${slide.objectPosition}`}
                            fallbackTitle={slide.label}
                          />
                          <button
                            type="button"
                            onClick={() => onPreviewSlide(idx)}
                            className="absolute top-2 left-2 px-2 py-0.5 text-[11px] font-bold bg-[#241f2e]/85 text-white rounded-[8px] cursor-pointer hover:bg-[#241f2e]"
                            title="Mostrar esta foto agora no carrossel"
                          >
                            #{idx + 1} · Ver
                          </button>
                          {slides.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemove(idx)}
                              aria-label={`Remover ${slide.label}`}
                              title="Remover do carrossel"
                              className="absolute top-2 right-2 p-1.5 rounded-[8px] bg-white/90 hover:bg-[#ffe6f0] text-[#241f2e] border border-[#f3d9e6] transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          )}
                        </div>

                        <div className="mt-2.5 flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-[#241f2e] truncate">
                            {slide.label}
                          </p>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMove(idx, -1)}
                              aria-label="Mover para antes"
                              className="p-1 rounded-[8px] border border-[#f3d9e6] text-[#241f2e] hover:bg-[#ffe6f0] disabled:opacity-35 cursor-pointer disabled:cursor-default"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === slides.length - 1}
                              onClick={() => handleMove(idx, 1)}
                              aria-label="Mover para depois"
                              className="p-1 rounded-[8px] border border-[#f3d9e6] text-[#241f2e] hover:bg-[#ffe6f0] disabled:opacity-35 cursor-pointer disabled:cursor-default"
                            >
                              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-2 flex items-center gap-1">
                          <span className="text-[10px] text-[#8b8691] mr-1">Foco:</span>
                          {POSITION_PRESETS.map((preset) => {
                            const activePos =
                              slide.objectPosition === preset.value ||
                              (preset.value === 'object-[50%_22%]' &&
                                (slide.objectPosition.includes('28%') ||
                                  slide.objectPosition.includes('34%') ||
                                  slide.objectPosition.includes('38%'))) ||
                              (preset.value === 'object-center' &&
                                (slide.objectPosition.includes('42%') ||
                                  slide.objectPosition.includes('45%') ||
                                  slide.objectPosition.includes('48%')));

                            return (
                              <button
                                key={preset.label}
                                type="button"
                                onClick={() => handleChangePosition(idx, preset.value)}
                                className={`px-2 py-0.5 text-[10px] font-medium rounded-[7px] border transition-colors cursor-pointer ${
                                  activePos
                                    ? 'bg-[#241f2e] text-white border-[#241f2e]'
                                    : 'bg-[#fffbfa] text-[#5c5868] border-[#f3d9e6] hover:border-[#241f2e]'
                                }`}
                              >
                                {preset.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Site Gallery Picker */}
              <div>
                <h3 className="font-display text-base font-bold text-[#241f2e]">
                  Galeria de fotos do site
                </h3>
                <p className="text-xs text-[#5c5868] mb-3">
                  Clique em qualquer foto para incluir ou remover do carrossel.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {SITE_GALLERY_OPTIONS.map((option) => {
                    const selected = isSelected(option.src);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleToggleOption(option)}
                        className={`group text-left p-2 rounded-[16px] border transition-colors cursor-pointer ${
                          selected
                            ? 'bg-[#ffe6f0]/60 border-[#f26b9e]'
                            : 'bg-white border-[#f3d9e6] hover:border-[#241f2e]'
                        }`}
                      >
                        <div className="relative h-24 rounded-[10px] overflow-hidden bg-[#ffe6f0]">
                          <SafeImage
                            src={option.src}
                            alt={option.alt}
                            className={`w-full h-full object-cover ${option.objectPosition}`}
                            fallbackTitle={option.label}
                          />
                          <span
                            className={`absolute top-1.5 right-1.5 w-6 h-6 inline-flex items-center justify-center rounded-[8px] border text-white ${
                              selected
                                ? 'bg-[#f26b9e] border-[#f26b9e]'
                                : 'bg-[#241f2e]/75 border-white/25'
                            }`}
                          >
                            {selected ? (
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            )}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs font-medium text-[#241f2e] truncate">
                          {option.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-7 py-4 bg-white border-t border-[#f3d9e6] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={onResetDefault}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#5c5868] hover:text-[#241f2e] bg-[#fffbfa] border border-[#f3d9e6] hover:border-[#241f2e] rounded-[12px] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Restaurar padrão
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#241f2e] hover:bg-[#3a334a] rounded-[12px] transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#6ec6e3]" aria-hidden="true" />
                Pronto
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
