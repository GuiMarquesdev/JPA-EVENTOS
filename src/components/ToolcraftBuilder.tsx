import { type FormEvent, useMemo, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  SALVADOR_NEIGHBORHOODS,
  SERVICE_CATEGORIES,
  SERVICES_CATALOG,
  TOOLCRAFT_PRESETS,
  buildWhatsAppUrl,
  openWhatsAppWithMessage,
  type ServiceCategoryId,
} from '../data/jpaData';

interface ToolcraftBuilderProps {
  selectedQuantities: Record<string, number>;
  onSetQuantity: (id: string, qty: number) => void;
  onApplyPreset: (itemIds: string[]) => void;
  onResetAll: () => void;
}

const BALLOON_PALETTES = [
  'Dourado, Branco e Rosa Pastel',
  'Azul Royal, Amarelo e Vermelho',
  'Terracota, Areia e Laranja Solar',
  'Verde Folha, Dourado e Branco',
  'Cores da Marca / Tema Personalizado',
];

export function ToolcraftBuilder({
  selectedQuantities,
  onSetQuantity,
  onApplyPreset,
  onResetAll,
}: ToolcraftBuilderProps) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventType, setEventType] = useState('Aniversário Infantil');
  const [neighborhood, setNeighborhood] = useState(SALVADOR_NEIGHBORHOODS[0]);
  const [eventDate, setEventDate] = useState('');
  const [guests, setGuests] = useState(50);
  const [hours, setHours] = useState(4);
  const [balloonColors, setBalloonColors] = useState(BALLOON_PALETTES[0]);
  const [notes, setNotes] = useState('');
  const [activeCatTab, setActiveCatTab] = useState<ServiceCategoryId>('animacao');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedItems = useMemo(() => {
    return SERVICES_CATALOG.filter((item) => (selectedQuantities[item.id] ?? 0) > 0).map(
      (item) => ({
        ...item,
        qty: selectedQuantities[item.id],
      })
    );
  }, [selectedQuantities]);

  const hasBalloonSelected = useMemo(
    () => selectedItems.some((item) => item.category === 'baloes'),
    [selectedItems]
  );

  const needsPowerCount = useMemo(
    () => selectedItems.filter((item) => item.needsPower).length,
    [selectedItems]
  );

  const activeCategoryItems = useMemo(
    () => SERVICES_CATALOG.filter((item) => item.category === activeCatTab),
    [activeCatTab]
  );

  const whatsappSummaryText = useMemo(() => {
    const selectedServiceLabels = selectedItems.map((item) => `${item.qty}x ${item.name}`);

    return [
      '*NOVO ROTEIRO DE FESTA / ORÇAMENTO*',
      '',
      `- Nome ou empresa: ${clientName.trim() || '-'}`,
      `- WhatsApp: ${clientPhone.trim() || '-'}`,
      `- Formato do evento: ${eventType || '-'}`,
      `- Bairro em Salvador / Região: ${neighborhood || '-'}`,
      `- Data pretendida: ${eventDate || '-'}`,
      `- Convidados estimados: ${guests} pessoas`,
      `- Duração da festa: ${hours} horas`,
      `- Serviços selecionados: ${selectedServiceLabels.length ? selectedServiceLabels.join(', ') : '-'}`,
      `- Paleta dos balões: ${hasBalloonSelected ? balloonColors : '-'}`,
      `- Observações: ${notes.trim() || '-'}`,
    ].join('\n');
  }, [
    balloonColors,
    clientName,
    clientPhone,
    eventDate,
    eventType,
    guests,
    hours,
    hasBalloonSelected,
    neighborhood,
    notes,
    selectedItems,
  ]);

  const activeMessage = submitted ? submittedMessage : whatsappSummaryText;

  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(activeMessage),
    [activeMessage]
  );

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(activeMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !clientPhone.trim()) {
      setFormError('Preencha seu nome e WhatsApp para enviarmos o roteiro.');
      return;
    }

    setFormError(null);
    openWhatsAppWithMessage(whatsappSummaryText);
    setSubmittedMessage(whatsappSummaryText);
    setSubmitted(true);
    setCopied(false);
  };

  const handlePresetClick = (preset: (typeof TOOLCRAFT_PRESETS)[number]) => {
    setEventType(preset.eventType);
    setGuests(preset.guests);
    setHours(preset.hours);
    setSubmitted(false);
    onApplyPreset(preset.itemIds);
  };

  return (
    <section
      id="monte-sua-festa"
      className="py-14 sm:py-20 bg-[#fffbfa] border-b border-[#f3d9e6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#f3d9e6]">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-[#f26b9e]">
              Toolcraft Interativa <span aria-hidden="true">·</span> Estúdio de Orçamento JPA
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#241f2e] text-balance">
              Monte Sua Festa e gere o orçamento pronto para o WhatsApp
            </h2>
            <p className="mt-3 text-base text-[#5c5868] leading-relaxed">
              Combine brinquedos, barracas ao vivo, animação, equipe e balões ou comece por um
              roteiro pronto. O resumo já vai organizado com todas as informações do seu evento.
            </p>
          </div>

          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#5c5868] hover:text-[#241f2e] bg-white border border-[#f3d9e6] rounded-[12px] transition-colors self-start lg:self-auto cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Limpar Seleção
          </button>
        </div>

        {/* Presets Row */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-[#8b8691] mb-3">
            Comece rápido com um modelo sugerido (opcional):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TOOLCRAFT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="text-left p-4 bg-white border border-[#f3d9e6] hover:border-[#f58fc0] rounded-[22px] transition-colors cursor-pointer group"
              >
                <p className="font-display text-sm sm:text-base font-bold text-[#241f2e] group-hover:text-[#f26b9e] transition-colors">
                  {preset.title}
                </p>
                <p className="mt-1 text-xs text-[#5c5868] leading-relaxed">
                  {preset.subtitle}
                </p>
                <p className="mt-2.5 text-xs font-medium text-[#8b8691] tabular-nums">
                  {preset.itemIds.length} itens <span aria-hidden="true">·</span> {preset.guests}{' '}
                  pessoas <span aria-hidden="true">·</span> {preset.hours}h
                  {preset.priceInfo && (
                    <span className="text-[#f26b9e] font-semibold"> · {preset.priceInfo}</span>
                  )}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Main 12-Col Toolcraft Workspace Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left 7 Cols: Step 1 Event Info + Step 2 Service Selector */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 01: Dados do Evento */}
            <div className="bg-white border border-[#f3d9e6] rounded-[32px] p-5 sm:p-7">
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#241f2e]">
                01. Dados básicos do seu evento em Salvador
              </h3>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="tc-name"
                    className="block text-xs font-semibold text-[#5c5868] mb-1.5"
                  >
                    Seu nome ou empresa <span className="text-[#f26b9e]">*</span>
                  </label>
                  <input
                    id="tc-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (formError) setFormError(null);
                      if (submitted) setSubmitted(false);
                    }}
                    placeholder="Ex: Maria Clara / Hotel Orla"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#fffbfa] border border-[#f3d9e6] rounded-[12px] text-[#241f2e] focus:outline-none focus:ring-2 focus:ring-[#f58fc0]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tc-phone"
                    className="block text-xs font-semibold text-[#5c5868] mb-1.5"
                  >
                    Seu WhatsApp (com DDD) <span className="text-[#f26b9e]">*</span>
                  </label>
                  <input
                    id="tc-phone"
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => {
                      setClientPhone(e.target.value);
                      if (formError) setFormError(null);
                      if (submitted) setSubmitted(false);
                    }}
                    placeholder="Ex: (71) 99999-9999"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#fffbfa] border border-[#f3d9e6] rounded-[12px] text-[#241f2e] focus:outline-none focus:ring-2 focus:ring-[#f58fc0]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tc-type"
                    className="block text-xs font-semibold text-[#5c5868] mb-1.5"
                  >
                    Formato do evento
                  </label>
                  <select
                    id="tc-type"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#fffbfa] border border-[#f3d9e6] rounded-[12px] text-[#241f2e] focus:outline-none focus:ring-2 focus:ring-[#f58fc0]"
                  >
                    <option>Aniversário Infantil</option>
                    <option>Aniversário em Casa</option>
                    <option>Salão ou Condomínio</option>
                    <option>Comercial / Inauguração de Loja</option>
                    <option>Hotel ou Corporativo</option>
                    <option>Evento Comunitário / Escola</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tc-bairro"
                    className="block text-xs font-semibold text-[#5c5868] mb-1.5"
                  >
                    Bairro em Salvador / Região
                  </label>
                  <select
                    id="tc-bairro"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#fffbfa] border border-[#f3d9e6] rounded-[12px] text-[#241f2e] focus:outline-none focus:ring-2 focus:ring-[#f58fc0]"
                  >
                    {SALVADOR_NEIGHBORHOODS.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tc-date"
                    className="block text-xs font-semibold text-[#5c5868] mb-1.5"
                  >
                    Data pretendida
                  </label>
                  <input
                    id="tc-date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#fffbfa] border border-[#f3d9e6] rounded-[12px] text-[#241f2e] focus:outline-none focus:ring-2 focus:ring-[#f58fc0]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#5c5868] mb-1.5">
                    <label htmlFor="tc-guests">Convidados estimados</label>
                    <span className="font-mono text-[#241f2e] tabular-nums">{guests} pessoas</span>
                  </div>
                  <input
                    id="tc-guests"
                    type="range"
                    min={15}
                    max={250}
                    step={5}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full accent-[#f58fc0] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#5c5868] mb-1.5">
                    <label htmlFor="tc-hours">Duração da festa</label>
                    <span className="font-mono text-[#241f2e] tabular-nums">{hours} horas</span>
                  </div>
                  <input
                    id="tc-hours"
                    type="range"
                    min={2}
                    max={8}
                    step={1}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full accent-[#f58fc0] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Step 02: Seletor de Serviços por Categoria */}
            <div className="bg-white border border-[#f3d9e6] rounded-[32px] p-5 sm:p-7">
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#241f2e]">
                02. Escolha brinquedos, lanches, equipe e decoração
              </h3>

              {/* Category Segmented Control */}
              <div
                role="tablist"
                aria-label="Categorias do montador de festa"
                className="mt-4 flex items-center gap-1.5 p-1 bg-[#ffe6f0] rounded-[22px] overflow-x-auto"
              >
                {SERVICE_CATEGORIES.map((cat) => {
                  const countInCat = SERVICES_CATALOG.filter(
                    (i) => i.category === cat.id && (selectedQuantities[i.id] ?? 0) > 0
                  ).length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={activeCatTab === cat.id}
                      onClick={() => setActiveCatTab(cat.id)}
                      className={`px-3 py-2 text-xs font-medium rounded-[12px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        activeCatTab === cat.id
                          ? 'bg-white text-[#241f2e] shadow-xs font-semibold'
                          : 'text-[#5c5868] hover:text-[#241f2e]'
                      }`}
                    >
                      {cat.shortLabel}
                      {countInCat > 0 ? ` (${countInCat})` : ''}
                    </button>
                  );
                })}
              </div>

              {/* Category Item Rows */}
              <div className="mt-5 divide-y divide-[#ffe6f0]">
                {activeCategoryItems.map((item) => {
                  const qty = selectedQuantities[item.id] ?? 0;
                  const isActive = qty > 0;

                  return (
                    <div
                      key={item.id}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-display text-base font-bold text-[#241f2e]">
                            {item.name}
                          </p>
                          {item.needsPower && (
                            <span
                              title="Requer tomada próxima no local"
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#f26b9e]"
                            >
                              <Zap className="w-3 h-3" aria-hidden="true" />
                              Ponto elétrico
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#8b8691] mt-0.5">{item.subtitle}</p>
                        {item.priceInfo && (
                          <p className="text-[11px] font-medium text-[#f26b9e] mt-0.5">
                            {item.priceInfo}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isActive ? (
                          <div className="inline-flex items-center border border-[#241f2e] rounded-[12px] overflow-hidden bg-white">
                            <button
                              type="button"
                              aria-label={`Diminuir quantidade de ${item.name}`}
                              onClick={() => onSetQuantity(item.id, Math.max(0, qty - 1))}
                              className="w-9 h-9 flex items-center justify-center text-[#241f2e] hover:bg-[#fffbfa] cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-9 text-center font-mono text-sm font-semibold text-[#241f2e] tabular-nums">
                              {qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Aumentar quantidade de ${item.name}`}
                              onClick={() => onSetQuantity(item.id, Math.min(10, qty + 1))}
                              className="w-9 h-9 flex items-center justify-center text-[#241f2e] hover:bg-[#fffbfa] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onSetQuantity(item.id, 1)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#241f2e] bg-[#fffbfa] border border-[#f3d9e6] hover:border-[#241f2e] rounded-[12px] transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            Adicionar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Balloon Color Palette Selector when balloons active */}
              {hasBalloonSelected && (
                <div className="mt-5 pt-5 border-t border-[#f3d9e6]">
                  <label
                    htmlFor="tc-balloon-colors"
                    className="block text-xs font-semibold text-[#241f2e] mb-2"
                  >
                    Paleta de cores para o seu Arco / Paredão de Balões:
                  </label>
                  <select
                    id="tc-balloon-colors"
                    value={balloonColors}
                    onChange={(e) => setBalloonColors(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#fffbfa] border border-[#f3d9e6] rounded-[12px] text-[#241f2e] focus:outline-none focus:ring-2 focus:ring-[#f58fc0]"
                  >
                    {BALLOON_PALETTES.map((pal) => (
                      <option key={pal}>{pal}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Additional Notes */}
              <div className="mt-5 pt-5 border-t border-[#f3d9e6]">
                <label
                  htmlFor="tc-notes"
                  className="block text-xs font-semibold text-[#5c5868] mb-1.5"
                >
                  Tema da festa ou observações sobre o espaço (opcional)
                </label>
                <textarea
                  id="tc-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Tema Fundo do Mar, salão no 2º andar sem elevador, incluir Fit Dance Kids com a Estripulia das Kas..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#fffbfa] border border-[#f3d9e6] rounded-[12px] text-[#241f2e] focus:outline-none focus:ring-2 focus:ring-[#f58fc0]"
                />
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Live Party Blueprint & WhatsApp Export */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 bg-[#241f2e] text-[#fffbfa] rounded-[32px] p-6 sm:p-7 border border-[#241f2e]">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#f3d9e6]/20">
              <div>
                <p className="text-xs font-medium text-[#f58fc0]">Roteiro da Sua Festa</p>
                <h3 className="font-display text-xl font-bold text-white mt-0.5">
                  Resumo para Orçamento
                </h3>
              </div>
              <span className="font-mono text-sm font-semibold text-[#f58fc0] tabular-nums">
                {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'itens'}
              </span>
            </div>

            {/* Event Meta Summary */}
            <div className="mt-4 text-xs sm:text-sm text-[#f3d9e6] space-y-1">
              <p>
                <span className="text-[#f3d9e6]/75">Formato:</span> {eventType}
              </p>
              <p>
                <span className="text-[#f3d9e6]/75">Local:</span> {neighborhood}, Salvador
              </p>
              <p className="tabular-nums">
                <span className="text-[#f3d9e6]/75">Porte:</span> {guests} convidados · {hours} horas
                {eventDate ? ` · ${eventDate}` : ''}
              </p>
            </div>

            {/* Selected Items List */}
            <div className="mt-5 pt-4 border-t border-[#f3d9e6]/20">
              {selectedItems.length === 0 ? (
                <div className="py-6 text-center text-sm text-[#f3d9e6]/80">
                  <Sparkles className="w-5 h-5 text-[#6ec6e3] mx-auto mb-2" aria-hidden="true" />
                  Selecione serviços ao lado ou clique em um dos modelos prontos acima.
                </div>
              ) : (
                <ul
                  data-lenis-prevent
                  className="space-y-2.5 max-h-64 overflow-y-auto pr-1"
                >
                  {selectedItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="text-white truncate">
                        <span className="font-mono text-[#f58fc0] tabular-nums mr-2">
                          {item.qty}x
                        </span>
                        {item.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSetQuantity(item.id, 0)}
                        className="text-xs text-[#f3d9e6]/80 hover:text-white shrink-0 cursor-pointer"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Operational Readiness Helper */}
            {(needsPowerCount > 0 || guests >= 60) && (
              <div className="mt-5 p-4 rounded-[22px] bg-[#241f2e] border border-[#f3d9e6]/25 text-xs text-[#f3d9e6] space-y-1.5">
                <p className="font-semibold text-[#f58fc0]">Checklist técnico do evento:</p>
                {needsPowerCount > 0 && (
                  <p>
                    · {needsPowerCount}{' '}
                    {needsPowerCount === 1 ? 'estação selecionada exige' : 'estações selecionadas exigem'}{' '}
                    tomada elétrica 127V próxima ao local de montagem (ou transformador sob consulta).
                  </p>
                )}
                {guests >= 60 && (
                  <p>
                    · Para {guests} convidados, recomendamos incluir ao menos 1 garçom/garçonete ou
                    copeira para manter a fluidez.
                  </p>
                )}
              </div>
            )}

            {/* Primary Actions / Confirmation State */}
            <div className="mt-6 space-y-3">
              {formError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 p-3 rounded-[14px] bg-[#f26b9e]/15 border border-[#f26b9e]/50 text-xs text-[#ffe6f0]"
                >
                  <AlertCircle className="w-4 h-4 text-[#f58fc0] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{formError}</span>
                </div>
              )}

              {submitted ? (
                <div className="p-4 rounded-[22px] bg-[#25d366]/12 border border-[#25d366]/40 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#25d366] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-bold text-white">
                        WhatsApp aberto com os dados preenchidos
                      </p>
                      <p className="mt-1 text-xs text-[#f3d9e6] leading-relaxed">
                        Caso a janela do WhatsApp não tenha aberto automaticamente no seu navegador,
                        use os botões abaixo para concluir ou copiar suas respostas.
                      </p>
                    </div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[22px] transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Enviar no WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#fffbfa] bg-[#241f2e] hover:bg-[#241f2e]/80 border border-[#f3d9e6]/30 rounded-[22px] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#6ec6e3]" aria-hidden="true" />
                        Respostas copiadas!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        Copiar Respostas
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="w-full text-center text-xs text-[#f3d9e6]/80 hover:text-white underline underline-offset-2 pt-1 cursor-pointer"
                  >
                    Alterar dados do roteiro
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#25d366] hover:bg-[#1aa34f] rounded-[22px] transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Enviar Roteiro no WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#fffbfa] bg-[#241f2e] hover:bg-[#241f2e]/80 border border-[#f3d9e6]/30 rounded-[22px] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#6ec6e3]" aria-hidden="true" />
                        Respostas copiadas!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        Copiar Respostas
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
