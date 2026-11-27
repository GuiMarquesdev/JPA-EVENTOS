import { type FormEvent, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import {
  SERVICE_CATEGORIES,
  SOCIAL_LINKS,
  buildWhatsAppUrl,
  openWhatsAppWithMessage,
} from '../data/jpaData';
import { WhatsAppIcon } from './WhatsAppIcon';
import type { PageView } from './Navbar';

interface SocialAndFooterProps {
  onNavigate: (view: PageView) => void;
}

export function SocialAndFooter({ onNavigate }: SocialAndFooterProps) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [servicos, setServicos] = useState<string[]>([]);
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [mensagemEnviada, setMensagemEnviada] = useState('');
  const [copiado, setCopiado] = useState(false);

  const handleLink = (view: PageView) => {
    onNavigate(view);
    window.scrollTo(0, 0);
  };

  const handleToggleServico = (label: string) => {
    setServicos((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !telefone.trim()) {
      setErro('Preencha nome e telefone antes de enviar.');
      return;
    }

    setErro(null);

    const mensagem = [
      '*NOVO CONTATO / FORMULÁRIO DO SITE*',
      '',
      `- Nome: ${nome.trim() || '-'}`,
      `- WhatsApp: ${telefone.trim() || '-'}`,
      `- E-mail: ${email.trim() || '-'}`,
      `- Serviços selecionados: ${servicos.length ? servicos.join(', ') : '-'}`,
      `- Mensagem: ${observacoes.trim() || '-'}`,
    ].join('\n');

    openWhatsAppWithMessage(mensagem);
    setMensagemEnviada(mensagem);
    setEnviado(true);
    setCopiado(false);
  };

  const handleCopyAnswers = async () => {
    try {
      await navigator.clipboard.writeText(mensagemEnviada);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <footer id="contato" className="bg-white border-t border-[#f3d9e6] text-[#241f2e]">
      {/* Final Conversion, Contact Form & Social Links Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-[#f3d9e6]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-6">
            <p className="text-xs sm:text-sm font-medium text-[#8b8691]">
              Atendimento em Salvador, Bahia <span aria-hidden="true">·</span> Falar pelo WhatsApp
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#241f2e] text-balance">
              Pronto para reservar a sua data com a JPA Eventos BA?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5c5868] max-w-xl leading-relaxed">
              Preencha seus dados abaixo para abrir o WhatsApp com tudo organizado ou fale direto
              pelos nossos canais oficiais.
            </p>

            {/* Quick Contact Form */}
            <div className="mt-6 p-5 sm:p-6 bg-[#fffbfa] border border-[#f3d9e6] rounded-[24px]">
              {enviado ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#25d366] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-display text-base font-bold text-[#241f2e]">
                        WhatsApp aberto com os dados preenchidos
                      </p>
                      <p className="mt-1 text-xs sm:text-sm text-[#5c5868] leading-relaxed">
                        Se o WhatsApp não abriu automaticamente, clique em enviar abaixo ou copie
                        suas respostas para colar na conversa.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={buildWhatsAppUrl(mensagemEnviada)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[14px] transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      Enviar no WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyAnswers}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-[#241f2e] bg-white border border-[#f3d9e6] hover:border-[#241f2e] rounded-[14px] transition-colors cursor-pointer"
                    >
                      {copiado ? (
                        <>
                          <Check className="w-4 h-4 text-[#25d366]" aria-hidden="true" />
                          Respostas copiadas!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          Copiar Respostas
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEnviado(false)}
                    className="text-xs font-medium text-[#5c5868] hover:text-[#241f2e] underline underline-offset-2 cursor-pointer"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {erro && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 p-3 rounded-[12px] bg-[#ffe6f0] border border-[#f58fc0] text-xs font-medium text-[#241f2e]"
                    >
                      <AlertCircle className="w-4 h-4 text-[#f26b9e] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{erro}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label
                        htmlFor="footer-nome"
                        className="block text-xs font-semibold text-[#5c5868] mb-1"
                      >
                        Nome <span className="text-[#f26b9e]">*</span>
                      </label>
                      <input
                        id="footer-nome"
                        type="text"
                        required
                        value={nome}
                        onChange={(e) => {
                          setNome(e.target.value);
                          if (erro) setErro(null);
                        }}
                        placeholder="Seu nome completo"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#f3d9e6] rounded-[12px] text-[#241f2e] focus:outline-none focus:ring-2 focus:ring-[#f58fc0]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="footer-whatsapp"
                        className="block text-xs font-semibold text-[#5c5868] mb-1"
                      >
                        WhatsApp <span className="text-[#f26b9e]">*</span>
                      </label>
                      <input
                        id="footer-whatsapp"
                        type="tel"
                        required
                        value={telefone}
                        onChange={(e) => {
                          setTelefone(e.target.value);
                          if (erro) setErro(null);
                        }}
                        placeholder="(71) 99999-9999"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#f3d9e6] rounded-[12px] text-[#241f2e] focus:outline-none focus:ring-2 focus:ring-[#f58fc0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="footer-email"
                      className="block text-xs font-semibold text-[#5c5868] mb-1"
                    >
                      E-mail (opcional)
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@exemplo.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#f3d9e6] rounded-[12px] text-[#241f2e] focus:outline-none focus:ring-2 focus:ring-[#f58fc0]"
                    />
                  </div>

                  <div>
                    <p className="block text-xs font-semibold text-[#5c5868] mb-2">
                      Serviços de interesse
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_CATEGORIES.map((cat) => {
                        const checked = servicos.includes(cat.label);
                        return (
                          <label
                            key={cat.id}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[10px] border transition-colors cursor-pointer ${
                              checked
                                ? 'bg-[#ffe6f0] border-[#f26b9e] text-[#241f2e]'
                                : 'bg-white border-[#f3d9e6] text-[#5c5868] hover:border-[#241f2e]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleToggleServico(cat.label)}
                              className="accent-[#f26b9e] rounded"
                            />
                            <span>{cat.shortLabel}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="footer-mensagem"
                      className="block text-xs font-semibold text-[#5c5868] mb-1"
                    >
                      Mensagem / Detalhes do evento
                    </label>
                    <textarea
                      id="footer-mensagem"
                      rows={2}
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      placeholder="Data prevista, bairro em Salvador, número de convidados..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#f3d9e6] rounded-[12px] text-[#241f2e] focus:outline-none focus:ring-2 focus:ring-[#f58fc0]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[14px] transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Enviar no WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 5 Required Social Channels */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold text-[#8b8691] mb-3">
              Nossos Canais Oficiais &amp; Animação Parceira
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
                  <p className="text-xs text-[#5c5868]">Falar pelo WhatsApp · Orçamento imediato</p>
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
                  <p className="font-display text-sm font-bold text-[#241f2e]">Instagram JPA</p>
                  <p className="text-xs text-[#5c5868]">@jpaeventosba · Fotos e bastidores</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#8b8691]" aria-hidden="true" />
              </a>

              <a
                href={SOCIAL_LINKS.estripuliaInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:col-span-2 flex items-center justify-between p-4 bg-[#fffbfa] border border-[#f3d9e6] hover:border-[#f26b9e] rounded-[22px] transition-colors"
              >
                <div>
                  <p className="font-display text-sm font-bold text-[#241f2e]">
                    Estripulia das Kas · Instagram Oficial
                  </p>
                  <p className="text-xs text-[#5c5868]">
                    @estripuliadaskas · Tia K1, Fit Dance Kids, pintura artística e chuva de espuma
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#f26b9e]" aria-hidden="true" />
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
