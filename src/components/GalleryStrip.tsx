import { SafeImage } from './SafeImage';
import { BRAND_IMAGES, SERVICE_CATEGORIES } from '../data/jpaData';

export function GalleryStrip() {
  // 'brinquedos' reusa BRAND_IMAGES.hero, que já aparece na foto do Hero acima — pular pra não repetir aqui.
  const photos = SERVICE_CATEGORIES.filter((category) => category.id !== 'brinquedos');

  return (
    <section className="py-10 sm:py-12 bg-white border-b border-[#f3d9e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {photos.map((category) => {
            const isAnimacao = category.id === 'animacao';
            const imgSrc = isAnimacao ? BRAND_IMAGES.heroReal4 : category.image;
            const imgAlt = isAnimacao
              ? 'Animadora da JPA Eventos BA conduzindo chuva de espuma com crianças se divertindo'
              : category.imageAlt;
            const imgPosition = isAnimacao ? 'object-[32%_45%]' : 'object-center';

            return (
              <div
                key={category.id}
                className="group relative aspect-[4/5] rounded-[22px] overflow-hidden border border-[#f3d9e6] bg-[#ffe6f0]"
              >
                <SafeImage
                  src={imgSrc}
                  alt={imgAlt}
                  className={`w-full h-full object-cover ${imgPosition} transition-transform duration-300 group-hover:scale-105`}
                  fallbackTitle={category.shortLabel}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"
                />
                <p className="absolute bottom-3 left-3 right-3 text-xs sm:text-sm font-semibold text-white">
                  {category.shortLabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
