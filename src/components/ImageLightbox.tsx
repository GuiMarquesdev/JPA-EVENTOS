import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SafeImage } from './SafeImage';

export interface LightboxImageItem {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  images: LightboxImageItem[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex?: (idx: number) => void;
  title?: string;
}

export function ImageLightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onChangeIndex,
  title,
}: ImageLightboxProps) {
  const prefersReducedMotion = useReducedMotion();
  const safeIndex = images.length > 0 ? ((currentIndex % images.length) + images.length) % images.length : 0;
  const current = images[safeIndex];
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (hasMultiple && onChangeIndex && e.key === 'ArrowLeft') {
        onChangeIndex((safeIndex - 1 + images.length) % images.length);
      } else if (hasMultiple && onChangeIndex && e.key === 'ArrowRight') {
        onChangeIndex((safeIndex + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, hasMultiple, images.length, onChangeIndex, onClose, safeIndex]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title ? `Visualizar foto: ${title}` : 'Visualizar foto ampliada'}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.12 : 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#241f2e]/92 backdrop-blur-md p-4 sm:p-6"
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between gap-4 text-white max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0 flex items-center gap-3">
              {title && (
                <p className="font-display text-sm sm:text-base font-semibold truncate">
                  {title}
                </p>
              )}
              {hasMultiple && (
                <span className="px-2 py-0.5 font-mono text-xs bg-white/10 border border-white/15 rounded-[8px] tabular-nums shrink-0">
                  {safeIndex + 1}/{images.length}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar imagem ampliada"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-[12px] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Fechar</span>
            </button>
          </div>

          {/* Center Image Stage */}
          <div className="relative flex-1 flex items-center justify-center my-3 sm:my-4 max-w-6xl w-full mx-auto min-h-0">
            {hasMultiple && onChangeIndex && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeIndex((safeIndex - 1 + images.length) % images.length);
                }}
                aria-label="Foto anterior"
                className="absolute left-0 sm:left-2 z-10 w-10 h-10 sm:w-11 sm:h-11 inline-flex items-center justify-center rounded-[12px] bg-[#241f2e]/80 hover:bg-[#241f2e] text-white border border-white/20 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
            )}

            <motion.div
              key={current.src}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: prefersReducedMotion ? 0.12 : 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex items-center justify-center max-w-full max-h-full"
            >
              <SafeImage
                src={current.src}
                alt={current.alt}
                className="max-w-[90vw] sm:max-w-[82vw] max-h-[76vh] w-auto h-auto object-contain rounded-[18px] border border-white/15 bg-[#1b1724] shadow-2xl"
                fallbackTitle={title ?? 'JPA Eventos BA'}
              />
            </motion.div>

            {hasMultiple && onChangeIndex && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeIndex((safeIndex + 1) % images.length);
                }}
                aria-label="Próxima foto"
                className="absolute right-0 sm:right-2 z-10 w-10 h-10 sm:w-11 sm:h-11 inline-flex items-center justify-center rounded-[12px] bg-[#241f2e]/80 hover:bg-[#241f2e] text-white border border-white/20 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Bottom Caption */}
          <div
            className="max-w-3xl w-full mx-auto text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">{current.alt}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
