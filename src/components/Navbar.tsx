import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/jpaData';

export type PageView = 'inicio' | 'catalogo' | 'historia' | 'avaliacoes' | 'toolcraft';

interface NavbarProps {
  activeView: PageView;
  onSelectView: (view: PageView) => void;
  selectedCount: number;
}

const NAV_ITEMS: { id: PageView; label: string }[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'historia', label: 'Nossa História' },
  { id: 'avaliacoes', label: 'Avaliações e FAQ' },
  { id: 'toolcraft', label: 'Monte Sua Festa' },
];

export function Navbar({ activeView, onSelectView, selectedCount }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (view: PageView) => {
    if (view === activeView) {
      window.scrollTo(0, 0);
    }
    onSelectView(view);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fffbfa]/95 backdrop-blur-sm border-b border-[#f3d9e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('inicio');
          }}
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#241f2e] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58fc0] rounded"
        >
          JPA Eventos BA
        </a>

        {/* Zone 2: 5 single-line nav links */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5c5868]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58fc0] rounded ${
                  isActive
                    ? 'text-[#241f2e] font-semibold'
                    : 'text-[#5c5868] hover:text-[#241f2e]'
                }`}
              >
                {item.id === 'toolcraft' && selectedCount > 0
                  ? `${item.label} (${selectedCount})`
                  : item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[21px] h-0.5 bg-[#f58fc0]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[12px] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] focus-visible:ring-offset-2"
          >
            Pedir Orçamento
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[12px] border border-[#f3d9e6] text-[#241f2e] hover:bg-[#fffbfa] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#f3d9e6] bg-[#fffbfa] px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-3 rounded-[12px] text-base font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#ffe6f0] text-[#241f2e] font-semibold'
                    : 'text-[#5c5868] hover:bg-[#fffbfa]'
                }`}
              >
                {item.id === 'toolcraft' && selectedCount > 0
                  ? `${item.label} (${selectedCount})`
                  : item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#f3d9e6]">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[12px] transition-colors"
            >
              Pedir Orçamento no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
