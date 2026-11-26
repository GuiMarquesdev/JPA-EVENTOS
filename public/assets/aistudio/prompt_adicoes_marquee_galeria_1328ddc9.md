Faça exatamente estas 3 alterações no projeto, sem mudar mais nada (não altere jpaData.ts, cores, fontes, nem os componentes Hero/Catalog/Story/Reviews/Toolcraft já existentes):

## 1. Em `src/index.css`, adicione este bloco logo ANTES do `@media (prefers-reduced-motion: reduce) {` existente:

```css
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 26s linear infinite;
}
```

## 2. Crie o arquivo `src/components/ServiceMarquee.tsx` com este conteúdo:

```tsx
import { Sparkle } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/jpaData';

export function ServiceMarquee() {
  const items = SERVICE_CATEGORIES.map((category) => category.label);
  const track = [...items, ...items];

  return (
    <div
      className="overflow-hidden bg-[#ffe6f0] border-b border-[#f3d9e6] py-2.5"
      role="presentation"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {track.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="flex items-center gap-2 px-4 text-xs sm:text-sm font-semibold text-[#f26b9e] whitespace-nowrap"
          >
            {label}
            <Sparkle className="w-3.5 h-3.5 text-[#6ec6e3]" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
```

## 3. Crie o arquivo `src/components/GalleryStrip.tsx` com este conteúdo:

```tsx
import { SafeImage } from './SafeImage';
import { SERVICE_CATEGORIES } from '../data/jpaData';

export function GalleryStrip() {
  // 'brinquedos' reusa BRAND_IMAGES.hero, que já aparece na foto do Hero acima — pular pra não repetir aqui.
  const photos = SERVICE_CATEGORIES.filter((category) => category.id !== 'brinquedos');

  return (
    <section className="py-10 sm:py-12 bg-white border-b border-[#f3d9e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {photos.map((category) => (
            <div
              key={category.id}
              className="group relative aspect-[4/5] rounded-[22px] overflow-hidden border border-[#f3d9e6] bg-[#ffe6f0]"
            >
              <SafeImage
                src={category.image}
                alt={category.imageAlt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
          ))}
        </div>
      </div>
    </section>
  );
}
```

## 4. Em `src/App.tsx`, faça estes 3 ajustes:

a) Nos imports, adicione:
```tsx
import { ServiceMarquee } from './components/ServiceMarquee';
import { GalleryStrip } from './components/GalleryStrip';
```
(ServiceMarquee logo após o import do Navbar; GalleryStrip logo após o import do HeroSection)

b) Logo depois do componente `<Navbar ... />` (antes de `<main className="flex-1">`), adicione:
```tsx
<ServiceMarquee />
```

c) Dentro do bloco `{activeView === 'inicio' && (...)}`, logo depois de `<HeroSection onNavigate={setActiveView} />` e antes de `<CatalogSection`, adicione:
```tsx
<GalleryStrip />
```

---

Resultado esperado: na página inicial, a ordem passa a ser Navbar → faixa de texto animada com os serviços (ServiceMarquee) → Hero → galeria de 4 fotos reais dos serviços (GalleryStrip) → Catálogo → resto da página como já estava.
