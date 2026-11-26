import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Navbar, type PageView } from './components/Navbar';
import { ServiceMarquee } from './components/ServiceMarquee';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { HeroSection } from './components/HeroSection';
import { GalleryStrip } from './components/GalleryStrip';
import { CatalogSection } from './components/CatalogSection';
import { StorySection } from './components/StorySection';
import { ReviewsAndFaqSection } from './components/ReviewsAndFaqSection';
import { ToolcraftBuilder } from './components/ToolcraftBuilder';
import { SocialAndFooter } from './components/SocialAndFooter';
import { ClickSpark } from './components/reactbits/ClickSpark';
import { SmoothScroll } from './components/SmoothScroll';
import { SOCIAL_LINKS } from './data/jpaData';

export default function App() {
  const [activeView, setActiveView] = useState<PageView>('inicio');
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({
    'animacao-infantil': 1,
    'piscina-bolinhas': 1,
    'algodao-doce': 1,
  });

  const selectedIds = useMemo(
    () => Object.keys(selectedQuantities).filter((id) => (selectedQuantities[id] ?? 0) > 0),
    [selectedQuantities]
  );

  const handleToggleItem = (id: string) => {
    setSelectedQuantities((prev) => {
      const next = { ...prev };
      if ((next[id] ?? 0) > 0) {
        delete next[id];
      } else {
        next[id] = 1;
      }
      return next;
    });
  };

  const handleSetQuantity = (id: string, qty: number) => {
    setSelectedQuantities((prev) => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[id];
      } else {
        next[id] = qty;
      }
      return next;
    });
  };

  const handleApplyPreset = (itemIds: string[]) => {
    const next: Record<string, number> = {};
    for (const id of itemIds) {
      next[id] = 1;
    }
    setSelectedQuantities(next);
  };

  const handleResetAll = () => {
    setSelectedQuantities({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbfa] text-[#241f2e]">
      <SmoothScroll viewKey={activeView} />
      <ClickSpark />
      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        selectedCount={selectedIds.length}
      />
      <ServiceMarquee />

      <main className="flex-1">
        {activeView !== 'inicio' && (
          <div className="bg-white border-b border-[#f3d9e6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setActiveView('inicio')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#5c5868] hover:text-[#241f2e] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Voltar para a página inicial
              </button>

              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#25d366] hover:text-[#1aa34f] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Solicitar orçamento direto no WhatsApp
              </a>
            </div>
          </div>
        )}

        {activeView === 'inicio' && (
          <>
            <HeroSection onNavigate={setActiveView} />
            <GalleryStrip />
            <CatalogSection
              selectedIds={selectedIds}
              onToggleItem={handleToggleItem}
              onNavigate={setActiveView}
            />
            <StorySection onNavigate={setActiveView} />
            <ReviewsAndFaqSection />
            <ToolcraftBuilder
              selectedQuantities={selectedQuantities}
              onSetQuantity={handleSetQuantity}
              onApplyPreset={handleApplyPreset}
              onResetAll={handleResetAll}
            />
          </>
        )}

        {activeView === 'catalogo' && (
          <CatalogSection
            selectedIds={selectedIds}
            onToggleItem={handleToggleItem}
            onNavigate={setActiveView}
            isStandalonePage
          />
        )}

        {activeView === 'historia' && <StorySection onNavigate={setActiveView} />}

        {activeView === 'avaliacoes' && <ReviewsAndFaqSection />}

        {activeView === 'toolcraft' && (
          <ToolcraftBuilder
            selectedQuantities={selectedQuantities}
            onSetQuantity={handleSetQuantity}
            onApplyPreset={handleApplyPreset}
            onResetAll={handleResetAll}
          />
        )}
      </main>

      <SocialAndFooter onNavigate={setActiveView} />
    </div>
  );
}
