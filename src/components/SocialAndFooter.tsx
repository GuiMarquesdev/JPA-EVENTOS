import { ExternalLink, MapPin } from 'lucide-react';
import { SOCIAL_LINKS, WHATSAPP_DISPLAY } from '../data/jpaData';
import { WhatsAppIcon } from './WhatsAppIcon';
import type { PageView } from './Navbar';

interface SocialAndFooterProps {
  onNavigate: (view: PageView) => void;
}

export function SocialAndFooter({ onNavigate }: SocialAndFooterProps) {
  const handleLink = (view: PageView) => {
    onNavigate(view);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-white border-t border-[#f3d9e6] text-[#241f2e]">
      {/* Final Conversion & Social Links Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-[#f3d9e6]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <p className="text-xs sm:text-sm font-medium text-[#8b8691]">
              Atendimento em Salvador, Bahia <span aria-hidden="true">·</span> {WHATSAPP_DISPLAY}
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#241f2e] text-balance">
              Pronto para reservar a sua data com a JPA Eventos BA?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5c5868] max-w-xl leading-relaxed">
              Fale diretamente pelo WhatsApp para receber seu orçamento personalizado ou acompanhe
              nosso trabalho diário nas redes sociais e avaliações no Google.
            </p>

            <div className="mt-6">
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[22px] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Solicitar Orçamento no WhatsApp
              </a>
            </div>
          </div>

          {/* 5 Required Social Channels */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold text-[#8b8691] mb-3">
              Nossos Canais Oficiais (WhatsApp, Instagram, Facebook, Google e TikTok)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-[#fffbfa] border border-[#f3d9e6] hover:border-[#25d366] rounded-[22px] transition-colors"
              >
                <div>
                  <p className="font-display text-sm font-bold text-[#241f2e]">WhatsApp</p>
                  <p className="text-xs text-[#5c5868]">{WHATSAPP_DISPLAY} · Orçamento imediato</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#25d366]" aria-hidden="true" />
              </a>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-[#fffbfa] border border-[#f3d9e6] hover:border-[#241f2e] rounded-[22px] transition-colors"
              >
                <div>
                  <p className="font-display text-sm font-bold text-[#241f2e]">Instagram</p>
                  <p className="text-xs text-[#5c5868]">@jpaeventosba · Fotos e bastidores</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#8b8691]" aria-hidden="true" />
              </a>

              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-[#fffbfa] border border-[#f3d9e6] hover:border-[#241f2e] rounded-[22px] transition-colors"
              >
                <div>
                  <p className="font-display text-sm font-bold text-[#241f2e]">Facebook</p>
                  <p className="text-xs text-[#5c5868]">JPA Eventos BA · Onde tudo começou</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#8b8691]" aria-hidden="true" />
              </a>

              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-[#fffbfa] border border-[#f3d9e6] hover:border-[#241f2e] rounded-[22px] transition-colors"
              >
                <div>
                  <p className="font-display text-sm font-bold text-[#241f2e]">TikTok</p>
                  <p className="text-xs text-[#5c5868]">@jpaeventosba · Lanches e animação</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#8b8691]" aria-hidden="true" />
              </a>

              <a
                href={SOCIAL_LINKS.google}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:col-span-2 flex items-center justify-between p-4 bg-[#fffbfa] border border-[#f3d9e6] hover:border-[#6ec6e3] rounded-[22px] transition-colors"
              >
                <div>
                  <p className="font-display text-sm font-bold text-[#241f2e]">
                    Perfil e Avaliações no Google
                  </p>
                  <p className="text-xs text-[#5c5868]">
                    Veja nossas avaliações 5 estrelas e localização em Salvador, BA
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#6ec6e3]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Footer Mirror */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8b8691]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-sm font-bold text-[#241f2e]">JPA Eventos BA</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            Salvador, Bahia · 13 anos de mercado
          </span>
        </div>

        <nav aria-label="Links do rodapé" className="flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={() => handleLink('inicio')}
            className="hover:text-[#241f2e] transition-colors cursor-pointer"
          >
            Início
          </button>
          <button
            type="button"
            onClick={() => handleLink('catalogo')}
            className="hover:text-[#241f2e] transition-colors cursor-pointer"
          >
            Catálogo
          </button>
          <button
            type="button"
            onClick={() => handleLink('historia')}
            className="hover:text-[#241f2e] transition-colors cursor-pointer"
          >
            Nossa História
          </button>
          <button
            type="button"
            onClick={() => handleLink('avaliacoes')}
            className="hover:text-[#241f2e] transition-colors cursor-pointer"
          >
            Avaliações e FAQ
          </button>
          <button
            type="button"
            onClick={() => handleLink('toolcraft')}
            className="hover:text-[#241f2e] transition-colors cursor-pointer"
          >
            Monte Sua Festa
          </button>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#25d366] hover:underline"
          >
            Orçamento
          </a>
        </nav>
      </div>
    </footer>
  );
}
