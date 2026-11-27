import {
  OWNER_WHATSAPP_DIGITS,
  buildWhatsAppUrl,
  openWhatsAppWithMessage,
} from '../config/whatsapp';

export { OWNER_WHATSAPP_DIGITS, buildWhatsAppUrl, openWhatsAppWithMessage };

export type ServiceCategoryId =
  | 'animacao'
  | 'brinquedos'
  | 'lanches'
  | 'equipe'
  | 'baloes';

export interface ServiceImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface ServiceItem {
  id: string;
  category: ServiceCategoryId;
  name: string;
  subtitle: string;
  priceInfo?: string;
  description: string;
  highlights: string[];
  idealFor: string;
  needsPower?: boolean;
  isHistoricSymbol?: boolean;
  unitLabel: string;
  images?: ServiceImage[];
}

export interface CategoryMeta {
  id: ServiceCategoryId;
  index: string;
  label: string;
  shortLabel: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  gallery?: {
    src: string;
    alt: string;
    objectPosition?: string;
  }[];
}

export interface GoogleReview {
  id: string;
  author: string;
  neighborhood: string;
  eventType: string;
  dateLabel: string;
  rating: number;
  text: string;
  highlightService: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface StoryChapter {
  index: string;
  period: string;
  title: string;
  body: string;
}

export interface EventPreset {
  id: string;
  title: string;
  subtitle: string;
  priceInfo?: string;
  eventType: string;
  guests: number;
  hours: number;
  itemIds: string[];
}

export const BRAND_IMAGES = {
  hero: '/src/assets/images/hero_salvador_festa_1795453350038.jpg',
  heroReal1: '/assets/aistudio/a9512c70-e0a3-4ec8-9bc7-05dfc9d3bc93_c2e9d462.jpg',
  heroReal2: '/assets/aistudio/61228622-c3bf-4d0d-b5a2-e342233b1e7d_9b697387.jpg',
  heroReal3: '/assets/aistudio/e69088ad-7edf-4f8a-8ad3-3790fb566240_f90b7ff2.jpg',
  heroReal4: '/assets/aistudio/afebed11-fd4d-4f3d-9639-3b11ca948e49_8e0d8915.jpg',
  heroReal5: '/assets/aistudio/ae7d3723-b6a8-4732-bb04-9c84a6ccc2a0_f98690ad.jpg',
  story: '/src/assets/images/story_sem_marca.jpg',
  lanches: '/src/assets/images/lanches_ao_vivo_barraca_1795453350371.jpg',
  lanchesReal1: '/src/assets/images/lanches_algodao_natural.jpg',
  lanchesReal2: '/assets/aistudio/WhatsApp_Image_2026-11-24_at_09.37.31_455ccb67.jpeg',
  lanchesReal3: '/assets/aistudio/WhatsApp_Image_2026-11-24_at_10.10.55_6b47cd37.jpeg',
  lanchesReal4: '/src/assets/images/crepe_sem_marca.jpg',
  lanchesTapioca: '/assets/aistudio/images__1__0c0a57e9.jpg',
  lanchesHotDog: '/assets/aistudio/images_9e21a35b.jpg',
  lanchesChurros: '/src/assets/images/churros_sem_marca_1795702069812.jpg',
  lanchesPastel: '/src/assets/images/pastel_frito_real.jpg',
  lanchesAcai: '/src/assets/images/acai_real_foto.jpg',
  animacao: '/src/assets/images/pintura_artistica_natural_1795700243663.jpg',
  pulaPulaReal: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_13.38.43__1__78b0bc4d.jpeg',
  piscinaBolinhasReal: '/src/assets/images/piscina_bolinhas_limpa_v2.jpg',
  baloes: '/src/assets/images/baloes_entrada_sem_marca.jpg',
  arcoSimples: '/assets/arcos/arco-simples.jpg',
  arcoEspiral: '/assets/arcos/arco-espiral.jpg',
  arcoBlocos: '/assets/arcos/arco-blocos.jpg',
  arcoOrganico: '/assets/arcos/arco-organico.jpg',
  paredaoBaloes: '/assets/arcos/paredao-baloes.jpg',
  equipe1: '/src/assets/images/equipe_principal_natural.jpg',
  equipe2: '/assets/aistudio/WhatsApp_Image_2026-11-24_at_09.17.25_ec5003d6.jpeg',
  equipeSalao: '/src/assets/images/equipe_salao_sem_marca.jpg',
  equipeSelfieSalao: '/src/assets/images/equipe_selfie_sem_marca.jpg',
  equipeAventalRosa1: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_13.38.42__2__a58cca99.jpeg',
  equipeAventalRosa2: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_13.38.43_60433261.jpeg',
  equipeChurrasco: '/src/assets/images/equipe_churrasco_sem_marca.jpg',
  acaoLoja: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_13.38.42_fdf0f4de.jpeg',
  barracaMadeiraTiaK1: '/src/assets/images/barraca_madeira_tia_k1_clean.jpg',
  pastelCestinha: '/src/assets/images/pastel_cestinha_v2.jpg',
  pizzaBaby: '/src/assets/images/pizza_baby_clean.jpg',
  crepeSuicoFolha: '/src/assets/images/crepe_suico_folha_v2.jpg',
  algodaoCoposEntrega: '/src/assets/images/algodao_copos_entrega_clean.jpg',
  algodaoCopoLiso: '/src/assets/images/algodao_copo_liso_clean.jpg',
  algodaoSacoColorido: '/src/assets/images/algodao_saco_colorido_clean.jpg',
  algodaoCopoBolha: '/src/assets/images/algodao_copo_bolha_clean.jpg',
  operadoraPipocaAlgodao: '/src/assets/images/operadora_pipoca_algodao_clean.jpg',
  batataFritaFritadeira: '/src/assets/images/batata_frita_fritadeira_clean.jpg',
  acaiCarrinho: '/src/assets/images/acai_carrinho_clean.jpg',
  pulaPulaEstrutura: '/src/assets/images/pula_pula_estrutura_clean.jpg',
  piscinaRedeBolinhas: '/src/assets/images/piscina_rede_bolinhas_clean.jpg',
  escorregadorGramado: '/src/assets/images/escorregador_gramado_clean.jpg',
  enchimentoBaloes: '/src/assets/images/enchimento_baloes_clean.jpg',
  arcoLego: '/src/assets/images/arco_lego_clean.jpg',
  arcoHalloween: '/src/assets/images/arco_halloween_clean.jpg',
  arcoVerdeBranco: '/src/assets/images/arco_verde_branco_clean.jpg',
  equipeGarconsGravata: '/src/assets/images/equipe_garcons_gravata_clean.jpg',
  equipeFestaStitch: '/src/assets/images/equipe_festa_stitch_v2.jpg',
  frutasEsculpidas: '/src/assets/images/frutas_esculpidas_rosqueiro_v2.jpg',
  mocktailsDrinks: '/src/assets/images/mocktails_drinks_v2.jpg',
} as const;

export const HERO_CAROUSEL_SLIDES = [
  {
    src: '/src/assets/images/hero_slide_1.jpg',
    alt: 'Recreadoras e animadoras da JPA Eventos BA caracterizadas ao lado da mesa do bolo com balões rosa em Salvador',
    objectPosition: 'object-[50%_42%]',
  },
  {
    src: '/src/assets/images/hero_slide_3.jpg',
    alt: 'Profissional da JPA Eventos BA operando barraca de pipoca com placa #JPAEventos e cenário temático infantil',
    objectPosition: 'object-[50%_34%]',
  },
  {
    src: BRAND_IMAGES.lanchesReal2,
    alt: 'Estação ao vivo da JPA Eventos BA montada com frutas frescas decoradas, canudos coloridos e coqueteleiras',
    objectPosition: 'object-center',
  },
  {
    src: '/src/assets/images/hero_slide_8.jpg',
    alt: 'Crianças se divertindo na fila do tobogã inflável da JPA Eventos BA em festa comunitária em Salvador',
    objectPosition: 'object-[50%_48%]',
  },
] as const;

export const SOCIAL_LINKS = {
  whatsapp: buildWhatsAppUrl(
    'Olá! Vim pelo site da JPA Eventos BA e gostaria de solicitar um orçamento para meu evento em Salvador.'
  ),
  instagram: 'https://www.instagram.com/jpaeventosba',
  estripuliaInstagram: 'https://www.instagram.com/estripuliadaskas?fqnt=ZDdvMXFrbDhzdDA2',
  facebook: 'https://www.facebook.com/jpaeventosba',
  tiktok: 'https://www.tiktok.com/@jpaeventosba',
  google: 'https://www.google.com/search?q=JPA+Eventos+BA+Salvador+avaliacoes',
};

export function getProductWhatsAppUrl(productName: string, categoryLabel?: string): string {
  const categoryPart = categoryLabel ? ` (${categoryLabel})` : '';
  return buildWhatsAppUrl(
    `Olá, equipe JPA Eventos BA! Gostaria de solicitar um orçamento para: *${productName}*${categoryPart}. Poderia me passar disponibilidade e valores?`
  );
}

export const SERVICE_CATEGORIES: CategoryMeta[] = [
  {
    id: 'animacao',
    index: '01',
    label: 'Animação e Recreação',
    shortLabel: 'Animação',
    headline: 'Alegria conduzida por quem entende de criança há 7 anos',
    description:
      'Parceria consolidada há sete anos com a Estripulia das Kas (@estripuliadaskas), comandada pela Tia K1 em Salvador: pacotes de 2h a 3h30 com Fit Dance Kids, pintura artística hipoalergênica, esculturas de balões e chuva de espuma/neve.',
    image: '/src/assets/images/recreacao_pintura_externa.jpg',
    imageAlt: 'Recreadora caracterizada realizando pintura facial infantil ao ar livre em mesa colorida',
    gallery: [
      {
        src: '/src/assets/images/recreacao_pintura_externa.jpg',
        alt: 'Recreadora caracterizada realizando pintura facial infantil ao ar livre em mesa colorida',
        objectPosition: 'object-[50%_22%]',
      },
      {
        src: BRAND_IMAGES.barracaMadeiraTiaK1,
        alt: 'Tia K1 da Estripulia das Kas e operadora da JPA Eventos BA atrás das barracas ripadas de madeira',
        objectPosition: 'object-[50%_28%]',
      },
      {
        src: BRAND_IMAGES.equipeFestaStitch,
        alt: 'Tia K1 animando festa temática com a equipe de apoio da JPA Eventos BA atrás da mesa decorada',
        objectPosition: 'object-[50%_38%]',
      },
    ],
  },
  {
    id: 'brinquedos',
    index: '02',
    label: 'Brinquedos',
    shortLabel: 'Brinquedos',
    headline: 'Diversão segura do nosso xodó 1x1m aos kits completos',
    description:
      'Brinquedos higienizados, montados e acompanhados por monitor em períodos de 4 horas. Do nosso símbolo piscina 1x1m às camas elásticas (2,40m a 3,05m) e kits prontos para bebês e crianças.',
    image: '/src/assets/images/brinquedos_mar_bolinhas.jpg',
    imageAlt: 'Área recreativa infantil com piscina cheia de bolinhas coloridas e escorregadores',
    gallery: [
      {
        src: '/src/assets/images/brinquedos_mar_bolinhas.jpg',
        alt: 'Área recreativa infantil com piscina cheia de bolinhas coloridas e escorregadores',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.piscinaRedeBolinhas,
        alt: 'Bolinhas coloridas higienizadas dentro da piscina com rede amarela de proteção',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.pulaPulaEstrutura,
        alt: 'Camas elásticas montadas lado a lado com rede de proteção colorida',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.escorregadorGramado,
        alt: 'Escorregador infantil laranja e azul com gangorra sobre o gramado',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'lanches',
    index: '03',
    label: 'Barracas de Lanches ao Vivo & Gourmet',
    shortLabel: 'Lanches',
    headline: 'Sabor quentinho preparado na hora diante dos convidados',
    description:
      'Barracas padronizadas ao vivo (127V, mínimo 100 unid. podendo combinar 2 tipos da mesma classe), linha Gourmet servida em louça com garfo e faca, além de algodão doce e kits congelados para entrega.',
    image: BRAND_IMAGES.lanchesReal1,
    imageAlt: 'Operador da JPA Eventos BA preparando algodão doce azul ao vivo na máquina sobre barraca de madeira',
    gallery: [
      {
        src: BRAND_IMAGES.lanches,
        alt: 'Barracas de madeira da JPA Eventos BA servindo crepes, churros artesanais, pipoca e algodão doce ao vivo',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.operadoraPipocaAlgodao,
        alt: 'Operadora sorrindo na estação combinada de pipoqueira e algodão doce em evento',
        objectPosition: 'object-[50%_26%]',
      },
      {
        src: BRAND_IMAGES.barracaMadeiraTiaK1,
        alt: 'Estação ripada #JPA Eventos montada em salão de festas com Tia K1 e operadora',
        objectPosition: 'object-[50%_30%]',
      },
      {
        src: BRAND_IMAGES.acaiCarrinho,
        alt: 'Carrinho de açaí na hora montado com complementos e atendente uniformizada',
        objectPosition: 'object-[50%_28%]',
      },
    ],
  },
  {
    id: 'equipe',
    index: '04',
    label: 'Profissionais & Equipe de Eventos',
    shortLabel: 'Equipe',
    headline: 'Equipe uniformizada e acolhedora para você curtir a festa sem preocupações',
    description:
      'Garçons, copeiros, fritadeiras, rosqueiros com mesa de frutas, churrasqueiro, barman (mocktails), recepcionista, fotógrafo e segurança treinados para eventos familiares e corporativos.',
    image: BRAND_IMAGES.equipe1,
    imageAlt: 'Equipe uniformizada da JPA Eventos BA com aventais rosa da marca em festa infantil decorada em Salvador',
    gallery: [
      {
        src: BRAND_IMAGES.equipeGarconsGravata,
        alt: 'Garçons de camisa social branca e gravata ao lado da recepcionista em festa decorada',
        objectPosition: 'object-[50%_26%]',
      },
      {
        src: BRAND_IMAGES.equipeAventalRosa1,
        alt: 'Equipe completa da JPA Eventos BA com aventais rosa e animadora em evento ao ar livre em Salvador',
        objectPosition: 'object-[50%_45%]',
      },
      {
        src: BRAND_IMAGES.equipeSelfieSalao,
        alt: 'Fundadora e equipe de garçonete, copeira e apoio uniformizados em salão decorado com máquina de algodão doce ao fundo',
        objectPosition: 'object-[50%_25%]',
      },
      {
        src: BRAND_IMAGES.frutasEsculpidas,
        alt: 'Mesa com frutas esculpidas artesanalmente para estação de rosqueiro e drinks',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.equipeChurrasco,
        alt: 'Profissional da equipe JPA Eventos BA com avental rosa preparando churrasco na churrasqueira durante evento',
        objectPosition: 'object-[50%_45%]',
      },
      {
        src: BRAND_IMAGES.equipeSalao,
        alt: 'Equipe de serviço da JPA Eventos BA com uniforme social, camisas azuis da empresa e avental de copeira em salão',
        objectPosition: 'object-[50%_38%]',
      },
    ],
  },
  {
    id: 'baloes',
    index: '05',
    label: 'Arco e Enchimento de Balões',
    shortLabel: 'Balões',
    headline: 'Enchimento e ornamentação que transformam a entrada e o painel',
    description:
      'Serviço de enchimento (a cada 250 balões) e arcos simples, espiral, em blocos, orgânicos, temáticos e paredões completos para festas, lojas e hotéis em Salvador.',
    image: BRAND_IMAGES.baloes,
    imageAlt: 'Arco de balões colorido em entrada de clínica em Salvador com carrinho de pipoca da JPA Eventos BA',
    gallery: [
      {
        src: '/src/assets/images/baloes_arco_colorido_real.jpg',
        alt: 'Arco colorido com balões vibrantes montado ao ar livre para entrada de evento',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.enchimentoBaloes,
        alt: 'Profissional realizando enchimento rápido de balões com inflador elétrico para montagem de arco',
        objectPosition: 'object-[50%_42%]',
      },
      {
        src: BRAND_IMAGES.arcoLego,
        alt: 'Arco orgânico colorido montado ao redor de painel temático infantil',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.arcoHalloween,
        alt: 'Arco temático de balões laranja, preto, roxo e verde com detalhes esculpidos',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.arcoVerdeBranco,
        alt: 'Arco de balões orgânico verde, branco, vermelho e azul em parede amadeirada',
        objectPosition: 'object-center',
      },
    ],
  },
];

export const SERVICES_CATALOG: ServiceItem[] = [
  // 01. Animação e Recreação
  {
    id: 'animacao-infantil',
    category: 'animacao',
    name: 'Animação de Festa Infantil (Pacotes Oficiais)',
    subtitle: 'Estripulia das Kas (Tia K1) · 1 animadora + 1 auxiliar',
    priceInfo: 'Pacotes Amarelo (R$ 340), Azul (R$ 409), Rosa (R$ 480) e Lilás (R$ 550)',
    description:
      'Pacotes de 2h00 a 3h30 para 15 a 30 crianças com Fit Dance Kids, chuva de neve/espuma, chuva de confete, pintura artística, escultura de balões, recepção e playlist kids (som adicional: R$ 100).',
    highlights: [
      'Amarelo (2h / 15 kids) · Azul (2h30 / 20 kids + 20 balões)',
      'Rosa (3h / 25 kids) · Lilás (3h30 / 30 kids + chuva de confete)',
      'Pintura artística hipoalergênica, Fit Dance Kids e gincanas',
    ],
    idealFor: 'Aniversários em casa, condomínios, escolas e hotéis',
    unitLabel: 'pacote',
    images: [
      {
        src: '/src/assets/images/hero_slide_6.jpg',
        alt: 'Animadora da JPA Eventos BA conduzindo brincadeira com chuva de espuma e crianças se divertindo em festa infantil',
        objectPosition: 'object-[32%_45%]',
      },
      {
        src: BRAND_IMAGES.equipeFestaStitch,
        alt: 'Tia K1 animando festa temática ao lado da equipe da JPA Eventos BA',
        objectPosition: 'object-[50%_36%]',
      },
      {
        src: BRAND_IMAGES.barracaMadeiraTiaK1,
        alt: 'Tia K1 e equipe JPA Eventos BA atrás das estações ripadas de madeira',
        objectPosition: 'object-[50%_30%]',
      },
    ],
  },
  {
    id: 'pintura-artistica',
    category: 'animacao',
    name: 'Pintura Artística',
    subtitle: 'Estripulia das Kas · Tintas hipoalergênicas na hora',
    priceInfo: 'Inclusa nos pacotes de animação ou avulsa',
    description:
      'Transformação mágica com borboletas, super-heróis, flores e personagens feitos com pincel fino e tintas seguras para a pele infantil.',
    highlights: ['Tinta antialérgica lavável', 'Modelos rápidos para filas fluírem', 'Atendimento paciente e carinhoso'],
    idealFor: 'Festas infantis e ações promocionais para famílias',
    unitLabel: 'serviço',
    images: [
      {
        src: BRAND_IMAGES.animacao,
        alt: 'Animadora caracterizada da JPA Eventos BA fazendo pintura artística no rosto de uma criança em festa ao ar livre',
        objectPosition: 'object-[50%_38%]',
      },
    ],
  },
  {
    id: 'interacao-pais-criancas',
    category: 'animacao',
    name: 'Interação com Pais e Crianças',
    subtitle: 'Integração familiar · Recepção e hora do parabéns',
    description:
      'Dinâmicas pensadas especialmente para tirar os adultos da cadeira, além de recepção de convidados e etiquetagem de presentes (nos pacotes Rosa e Lilás).',
    highlights: ['Desafios em dupla pai e filho', 'Linguagem acolhedora e inclusiva', 'Clima leve sem constrangimentos'],
    idealFor: 'Festas familiares, Dia das Crianças e confraternizações',
    unitLabel: 'bloco',
    images: [
      {
        src: '/src/assets/images/interacao_pais_costas_1795781659870.jpg',
        alt: 'Pais e crianças vistos de costas de mãos dadas em brincadeira de roda em festa infantil no quintal',
        objectPosition: 'object-[50%_46%]',
      },
    ],
  },
  {
    id: 'gincanas',
    category: 'animacao',
    name: 'Gincanas e Brincadeiras',
    subtitle: 'Competição saudável · Materiais lúdicos inclusos',
    description:
      'Circuito de jogos cooperativos, corrida de saco, caça ao tesouro, bambolês e dinâmicas em grupo adaptadas ao espaço disponível.',
    highlights: ['Materiais próprios higienizados', 'Seguro para espaços abertos ou salões', 'Desafios lúdicos por faixa etária'],
    idealFor: 'Crianças de 4 a 12 anos, colônias e eventos escolares',
    unitLabel: 'bloco',
    images: [
      {
        src: '/src/assets/images/gincanas_equipamentos_1795781618939.jpg',
        alt: 'Bambolês coloridos, cones, sacos de corrida de saco e corda preparados no gramado para gincanas infantis',
        objectPosition: 'object-[50%_58%]',
      },
    ],
  },

  // 02. Brinquedos
  {
    id: 'pula-pula',
    category: 'brinquedos',
    name: 'Pula-Pula (Camas Elásticas 2,40m a 3,05m)',
    subtitle: 'Redonda 2,40m, Redonda 3,00m e Oitavada 3,05m · 4h com montagem',
    priceInfo: '2,40m: R$ 230 · 3,00m: R$ 250 · Oitavada 3,05m: R$ 280',
    description:
      'Clássico indispensável em três tamanhos para adaptar perfeitamente ao seu salão ou quintal, sempre com rede de proteção reforçada, molas cobertas e escadinha.',
    highlights: [
      'Tamanhos: 2,40m, 3,00m e Oitavada 3,05m',
      'Período padrão de 4h com montagem inclusa',
      'Lona tensionada e higienizada antes de cada evento',
    ],
    idealFor: 'Quintais, áreas gourmet, playgrounds e salões',
    unitLabel: 'unidade',
    images: [
      {
        src: BRAND_IMAGES.pulaPulaReal,
        alt: 'Pula-pula colorido com rede de proteção da JPA Eventos BA montado para evento em Salvador',
        objectPosition: 'object-[50%_52%]',
      },
      {
        src: BRAND_IMAGES.pulaPulaEstrutura,
        alt: 'Camas elásticas coloridas com rede de segurança montadas pela equipe JPA Eventos BA',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'piscina-bolinhas',
    category: 'brinquedos',
    name: 'Piscina de Bolinhas (1x1m e Modelo Lua)',
    subtitle: '1x1m Baixa, 1x1m Alta e Lua 1,25x2,51m · Símbolo da JPA',
    priceInfo: '1x1m Baixa: R$ 230 · 1x1m Alta: R$ 240 · Lua: R$ 280',
    description:
      'Nossa piscina de bolinhas 1x1m alta é o símbolo histórico que iniciou nossa trajetória de locação — disponível também na versão baixa e no modelo Lua ampla para festas maiores.',
    highlights: [
      'Modelos: 1x1m Baixa, 1x1m Alta e Lua 1,25x2,51m',
      'Bolinhas higienizadas a cada festa',
      'Ideal para apartamentos, salas e espaços baby',
    ],
    idealFor: 'Primeiros aninhos, espaços compactos e áreas baby',
    isHistoricSymbol: true,
    unitLabel: 'unidade',
    images: [
      {
        src: BRAND_IMAGES.piscinaBolinhasReal,
        alt: 'Piscina de bolinhas 1x1m alta colorida com rede de proteção da JPA Eventos BA',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.piscinaRedeBolinhas,
        alt: 'Detalhe das bolinhas coloridas limpas dentro da piscina de proteção amarela',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'escorregador',
    category: 'brinquedos',
    name: 'Escorregador Infantil',
    subtitle: 'Rampa anatômica · Cantos arredondados · Período 4h',
    priceInfo: 'R$ 100 (4 horas)',
    description:
      'Escorregador resistente em cores alegres com degraus antiderrapantes, ideal para compor o cantinho da primeira infância com segurança.',
    highlights: ['Material plástico atóxico firme', 'Fácil posicionamento interno ou externo', 'Combina com a piscina de bolinhas e tatame'],
    idealFor: 'Crianças de 1 a 6 anos',
    unitLabel: 'unidade',
    images: [
      {
        src: BRAND_IMAGES.escorregadorGramado,
        alt: 'Escorregador infantil laranja e azul com gangorra sobre o gramado em festa',
        objectPosition: 'object-center',
      },
      {
        src: '/src/assets/images/escorregador_real.jpg',
        alt: 'Escorregador infantil amarelo e azul com rede de proteção',
        objectPosition: 'object-[50%_48%]',
      },
    ],
  },
  {
    id: 'gangorra',
    category: 'brinquedos',
    name: 'Gangorra Infantil (1 ou 2 Lugares)',
    subtitle: 'Equilíbrio e risadas · Período 4h',
    priceInfo: '1 lugar: R$ 80 · 2 lugares: R$ 100',
    description:
      'Gangorras ergonômicas individuais ou duplas com pegadores firmes e base estável para brincadeiras seguras sobre tatame ou gramado.',
    highlights: ['Opções de 1 lugar ou 2 lugares', 'Higienização antes da entrega', 'Perfeita para áreas baby e combos'],
    idealFor: 'Área baby em aniversários e creches',
    unitLabel: 'unidade',
    images: [
      {
        src: '/src/assets/images/gangorra_real.jpg',
        alt: 'Gangorra infantil dupla colorida com pegadores ergonômicos sobre grama',
        objectPosition: 'object-[50%_46%]',
      },
    ],
  },
  {
    id: 'kits-brinquedos',
    category: 'brinquedos',
    name: 'Kits Prontos de Brinquedos (4h c/ Monitor)',
    subtitle: 'Flu Flu Baby · Éfata · Jesus · Feliz · Cristal · Festão',
    priceInfo: 'De R$ 350 (Flu Flu / Éfata) a R$ 550 (Kit Festão)',
    description:
      'Combinações prontas com montagem e monitor inclusos: Kit Flu Flu Baby (tatame, escorregador e gangorras), Éfata (cama 2,30m + piscina 1x1m), Jesus (cama 3m + piscina), Feliz, Cristal e Festão completo.',
    highlights: [
      'Flu Flu Baby ou Éfata: R$ 350 · Kit Jesus: R$ 399',
      'Kit Feliz: R$ 440 · Kit Cristal: R$ 450 · Kit Festão: R$ 550',
      'Todos os kits incluem montagem e monitor no local',
    ],
    idealFor: 'Quem busca pacote fechado de brinquedos com economia',
    unitLabel: 'kit',
    images: [
      {
        src: '/src/assets/images/brinquedos_mar_bolinhas.jpg',
        alt: 'Combinação completa de piscina de bolinhas e brinquedos infantis montados pela JPA Eventos BA',
        objectPosition: 'object-center',
      },
    ],
  },

  // 03. Barracas de Lanches ao Vivo, Gourmet & Entrega
  {
    id: 'crepe-suico-frances',
    category: 'lanches',
    name: 'Crepe Suíço e Crepe Francês',
    subtitle: 'Na chapa ao vivo (127V) · Linha Tradicional ou Gourmet em louça',
    priceInfo: 'Suíço: 50 unid R$ 269,99 / 100 unid R$ 509,99 · Francês Gourmet: 30 unid R$ 749 / 60 unid R$ 1.499',
    description:
      'Preparado na hora com massa artesanal no palito (suíço) ou versão Crepe Francês / Suíço Especial Gourmet servido em prato de louça com garfo, faca, calda doce ou opção de salada.',
    highlights: [
      'Crepe Suíço Tradicional, Especial ou Francês Gourmet',
      'Operador, guardanapos e embalagens/louças inclusos',
      'Equipamento 127V (consulte transformador caso necessário)',
    ],
    idealFor: 'Aniversários, 15 anos e eventos corporativos',
    needsPower: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.crepeSuicoFolha,
        alt: 'Crepes suíços no palito dourados assados na hora pela JPA Eventos BA',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.lanchesReal4,
        alt: 'Estação de crepe suíço no palito preparado na frente dos convidados',
        objectPosition: 'object-[50%_56%]',
      },
    ],
  },
  {
    id: 'tapioca',
    category: 'lanches',
    name: 'Tapioca Gourmet ao Vivo',
    subtitle: 'Servida em prato de louça com garfo e faca · 127V',
    priceInfo: '30 unid: R$ 749 · 60 unid: R$ 1.499',
    description:
      'Tapioca macia e hidratada feita na hora na chapa dentro da linha Gourmet, servida em louça com recheios doces (com calda) e salgados (com 1 opção de salada).',
    highlights: ['Feita sob encomenda e servida em prato de louça', 'Opção naturalmente sem glúten', 'Equipe treinada para fazer e servir'],
    idealFor: 'Eventos familiares, cafés corporativos e hotéis',
    needsPower: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.lanchesTapioca,
        alt: 'Tapioca artesanal preparada na hora pela JPA Eventos BA com recheio cremoso de queijo',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'churros',
    category: 'lanches',
    name: 'Churros Artesanais',
    subtitle: 'Crocantes por fora · Doce de leite e chocolate · 127V',
    priceInfo: '50 unid: R$ 269,99 · 100 unid: R$ 509,99',
    description:
      'Fritos na hora na barraca ao vivo, passados no açúcar e canela e generosamente recheados na frente do convidado (disponível também em kit congelado para casa).',
    highlights: ['Massa crocante frita na hora', 'Recheios cremosos fartos', 'Pode combinar 2 sabores na contratação de 100 unid.'],
    idealFor: 'Festas infantis, festas juninas e formaturas',
    needsPower: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.lanchesChurros,
        alt: 'Churros artesanais crocantes com cobertura generosa de doce de leite em caixinhas individuais da JPA Eventos BA',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'algodao-doce',
    category: 'lanches',
    name: 'Algodão Doce ao Vivo',
    subtitle: 'Nossa primeira máquina · Palito colorido na hora · 127V',
    priceInfo: '50 unid: R$ 269,99 · 100 unid: R$ 409,99',
    description:
      'O doce que deu origem à JPA Eventos BA: nuvens coloridas no palito feitas ao vivo na barraca padronizada com operador e materiais inclusos.',
    highlights: ['Feito ao vivo diante dos convidados', 'Cores combinando com o tema da festa', 'Coração da nossa história desde o primeiro dia'],
    idealFor: 'Todas as idades, festas e inaugurações',
    needsPower: true,
    isHistoricSymbol: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.lanchesReal1,
        alt: 'Operador da JPA Eventos BA preparando algodão doce azul ao vivo na máquina sobre barraca de madeira',
        objectPosition: 'object-[50%_30%]',
      },
      {
        src: BRAND_IMAGES.operadoraPipocaAlgodao,
        alt: 'Operadora sorrindo na barraca com máquina de algodão doce e pipoqueira',
        objectPosition: 'object-[50%_26%]',
      },
    ],
  },
  {
    id: 'pipoca',
    category: 'lanches',
    name: 'Pipoca Quentinha ao Vivo',
    subtitle: 'Estourada na hora · Doce ou salgada · 127V',
    priceInfo: '50 unid: R$ 269,99 · 100 unid: R$ 409,99',
    description:
      'Pipoca crocante e perfumada estourada durante a festa e servida em saquinhos individuais na barraca padronizada.',
    highlights: ['Sabores doce e salgado disponíveis', 'Saquinhos higiênicos e operador incluso', 'Mínimo 100 unid. combináveis entre 2 lanches'],
    idealFor: 'Aniversários, ações em lojas e eventos escolares',
    needsPower: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.lanchesReal3,
        alt: 'Máquina de pipoca da JPA Eventos BA com pipoca estourada na hora e saquinhos listrados rosa e branco',
        objectPosition: 'object-[50%_60%]',
      },
      {
        src: BRAND_IMAGES.barracaMadeiraTiaK1,
        alt: 'Barraca ripada de madeira #JPA Eventos preparada com máquinas de lanches ao vivo',
        objectPosition: 'object-[50%_30%]',
      },
    ],
  },
  {
    id: 'pizza-baby-artesanal',
    category: 'lanches',
    name: 'Pizza Baby & Pizza Artesanal Gourmet',
    subtitle: 'Mini pizzas na barraca ou versão artesanal em prato de louça',
    priceInfo: 'Baby: 50 unid R$ 269,99 / 100 unid R$ 499,99 · Artesanal: 30 unid R$ 749 / 60 unid R$ 1.499',
    description:
      'Escolha entre a prática Pizza Baby quentinha para retirar na barraca ou a Pizza Artesanal Gourmet feita ao vivo e servida com talheres em prato de louça.',
    highlights: [
      'Versão Baby (50 ou 100 unid.) ou Gourmet (30 ou 60 unid.)',
      'Massa macia e recheios variados na hora',
      'Equipamento elétrico 127V com operador dedicado',
    ],
    idealFor: 'Festas infantis, adolescentes e recepções',
    needsPower: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.pizzaBaby,
        alt: 'Mini pizzas e massas artesanais variadas preparadas pela equipe da JPA Eventos BA',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'batata-frita',
    category: 'lanches',
    name: 'Batata Frita na Hora',
    subtitle: 'Fritadeira elétrica 127V · Porções quentinhas e crocantes',
    priceInfo: '50 unid: R$ 429,99 · 100 unid: R$ 749,99',
    description:
      'Batatas fritas na hora em fritadeira elétrica profissional, servidas sequinhas em embalagens individuais direto da barraca.',
    highlights: ['Frita no momento do pedido', 'Embalagens descartáveis e guardanapos inclusos', 'Combina com pastel, hot dog e crepe'],
    idealFor: 'Aniversários infantis, adolescentes e confraternizações',
    needsPower: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.batataFritaFritadeira,
        alt: 'Batatas fritas dourando na cestinha da fritadeira elétrica da JPA Eventos BA',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'pastel',
    category: 'lanches',
    name: 'Pastel Frito na Hora',
    subtitle: 'Massa sequinha e crocante · Recheios tradicionais · 127V',
    priceInfo: '50 unid: R$ 349,99 · 100 unid: R$ 649,99',
    description:
      'Pastéis dourados fritos na cestinha na hora do evento com recheios bem temperados de queijo, carne ou frango.',
    highlights: ['Óleo sempre limpo e temperatura controlada', 'Frito sob demanda para sair crocante', 'Sustenta adultos e crianças'],
    idealFor: 'Aniversários completos e confraternizações',
    needsPower: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.pastelCestinha,
        alt: 'Pastéis douradinhos saindo da cestinha inox da fritadeira durante evento',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.lanchesPastel,
        alt: 'Pastel brasileiro frito na hora com massa dourada, sequinha e crocante',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'hot-dog',
    category: 'lanches',
    name: 'Hot Dog (P, G ou Gourmet)',
    subtitle: 'Tradicional P/G na barraca ou Gourmet em louça · 127V',
    priceInfo: 'P: R$ 349 / R$ 499 · G: R$ 459 / R$ 859 · Gourmet: 50 unid R$ 749,99 / 100 unid R$ 1.449,99',
    description:
      'Disponível nos tamanhos P e G montados ao vivo na barraca com molho caseiro e complementos, ou na versão Gourmet especial servida em louça.',
    highlights: ['Tamanhos P, G e linha Gourmet', 'Molho caseiro temperado na medida', 'Favorito garantido em qualquer faixa etária'],
    idealFor: 'Festas infantis, escolas e eventos comunitários',
    needsPower: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.lanchesHotDog,
        alt: 'Cachorros-quentes montados e embalados com batata palha crocante para festa pela JPA Eventos BA',
        objectPosition: 'object-[50%_58%]',
      },
    ],
  },
  {
    id: 'hamburguer-artesanal',
    category: 'lanches',
    name: 'Hambúrguer Artesanal Gourmet',
    subtitle: 'Chapa ao vivo (127V) · Servido em prato de louça com salada',
    priceInfo: '30 unid: R$ 749 · 60 unid: R$ 1.499',
    description:
      'Da nossa experiência original na chapa diretamente para a linha Gourmet: hambúrguer artesanal preparado na hora e servido em louça com garfo, faca e opção de salada.',
    highlights: ['Produzido ao vivo durante a festa', 'Servido em prato de louça com talheres', 'Equipe treinada para preparo e serviço'],
    idealFor: 'Aniversários teens, adultos e eventos corporativos',
    needsPower: true,
    unitLabel: 'barraca',
  },
  {
    id: 'picole',
    category: 'lanches',
    name: 'Picolé & Estação de Sorvete',
    subtitle: 'Sabores tropicais e cremosos · Sorvete com 4 recheios e caldas',
    priceInfo: 'Picolé: 50 unid R$ 249 / 100 unid R$ 399,99 · Sorvete: 50 unid R$ 399 / 100 unid R$ 699,99',
    description:
      'Escolha entre o carrinho de picolés refrescantes ou a estação completa de sorvete servido na hora com 4 opções de recheios e caldas deliciosas.',
    highlights: ['Picolés de frutas e ao leite', 'Opção de Sorvete c/ 4 recheios e caldas', 'Perfeito para tardes e piscinas em Salvador'],
    idealFor: 'Festas ao ar livre, condomínios e verão baiano',
    unitLabel: 'carrinho',
    images: [
      {
        src: BRAND_IMAGES.heroReal3,
        alt: 'Atendimento da JPA Eventos BA servindo sorvetes em evento em Salvador',
        objectPosition: 'object-[50%_38%]',
      },
    ],
  },
  {
    id: 'acai',
    category: 'lanches',
    name: 'Açaí na Hora (c/ 4 Recheios e 4 Caldas)',
    subtitle: 'Carrinho completo · Granola, frutas, leite em pó e caldas',
    priceInfo: '50 unid: R$ 449 · 100 unid: R$ 799,99',
    description:
      'Estação em carrinho temático com açaí cremoso servido em copos na hora acompanhado de 4 recheios e 4 caldas escolhidos pelos convidados.',
    highlights: ['Acompanha 4 recheios e 4 caldas', 'Carrinho organizado com atendente uniformizado', 'Alto destaque visual e refrescância'],
    idealFor: 'Festas jovens, eventos esportivos e recepções em hotéis',
    needsPower: true,
    unitLabel: 'estação',
    images: [
      {
        src: BRAND_IMAGES.acaiCarrinho,
        alt: 'Carrinho de açaí montado com potes de acompanhamentos e operadora de avental rosa da JPA Eventos BA',
        objectPosition: 'object-[50%_26%]',
      },
      {
        src: BRAND_IMAGES.lanchesAcai,
        alt: 'Açaí cremoso servido com granola, banana em rodelas, morango e leite em pó',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'lanches-entrega-congelados',
    category: 'lanches',
    name: 'Lanches Individuais p/ Entrega & Kits Congelados',
    subtitle: 'Algodão doce em copos/sacos/cone · Kit 10 Churros ou Crepes',
    priceInfo: 'Algodão Doce: de R$ 2,49 a R$ 5,99/unid · Kit 10 Congelados: Churros R$ 59,99 / Crepe R$ 99,99',
    description:
      'Encomende algodão doce pronto para entrega e lembrancinhas (copo liso, copão, cone, saco, copo bolha ou versões personalizadas com o tema) ou kits congelados com 10 unidades para preparar em casa.',
    highlights: [
      'Copo liso (R$ 2,49), Copão (R$ 3,49), Cone (R$ 3,99), Saco (R$ 4,49)',
      'Personalizados: Copo liso (R$ 4,50), Saco (R$ 5,99) e Copo bolha (R$ 5,49)',
      'Kits congelados c/ 10 unid.: Churros (R$ 59,99) e Crepe Suíço (R$ 99,99)',
    ],
    idealFor: 'Lembrancinhas escolares, kits festa em casa e revenda',
    unitLabel: 'encomenda',
    images: [
      {
        src: BRAND_IMAGES.algodaoCopoLiso,
        alt: 'Copos lisos fechados de algodão doce rosa e azul prontos para entrega',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.algodaoCopoBolha,
        alt: 'Copos bolha com algodão doce colorido em tons pastel rosa e azul',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.algodaoSacoColorido,
        alt: 'Saquinhos individuais de algodão doce em diversas cores prontos para entrega',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.algodaoCoposEntrega,
        alt: 'Copos lacrados de algodão doce verde e rosa organizados para entrega de eventos',
        objectPosition: 'object-center',
      },
    ],
  },

  // 04. Profissionais de Eventos & Equipe de Serviço
  {
    id: 'garcom',
    category: 'equipe',
    name: 'Garçom',
    subtitle: 'Uniformizado · Período padrão 4 horas',
    priceInfo: 'R$ 169,99 por profissional (4h)',
    description:
      'Atendimento atencioso às mesas e convidados volantes para que os anfitriões curtam cada momento sem preocupação.',
    highlights: ['Postura profissional e cordial', 'Controle de reposição nas mesas', 'Experiência em festas e hotéis'],
    idealFor: 'Festas familiares, corporativas e recepções',
    unitLabel: 'profissional',
    images: [
      {
        src: BRAND_IMAGES.equipeGarconsGravata,
        alt: 'Garçons uniformizados com camisa social branca e gravata em evento em Salvador',
        objectPosition: 'object-[50%_26%]',
      },
    ],
  },
  {
    id: 'garconete',
    category: 'equipe',
    name: 'Garçonete',
    subtitle: 'Cuidado nos detalhes · Período padrão 4 horas',
    priceInfo: 'R$ 169,99 por profissional (4h)',
    description:
      'Serviço dedicado de salgados, doces e bebidas com atenção especial às famílias, idosos e crianças.',
    highlights: ['Apresentação impecável', 'Agilidade na circulação', 'Apoio na hora do bolo e parabéns'],
    idealFor: 'Aniversários, chás de bebê e eventos sociais',
    unitLabel: 'profissional',
  },
  {
    id: 'copeira',
    category: 'equipe',
    name: 'Copeira / Copeiro',
    subtitle: 'Organização de cozinha e taças · Período 4 horas',
    priceInfo: 'R$ 169,99 por profissional (4h)',
    description:
      'Responsável pela organização de pratos, copos, reposição de travessas, bebidas e limpeza contínua da copa durante o evento.',
    highlights: ['Cozinha sempre limpa e fluida', 'Controle de bebidas e gelo', 'Apoio direto aos garçons'],
    idealFor: 'Eventos em casa, salões de festa e chácaras',
    unitLabel: 'profissional',
  },
  {
    id: 'fritadeira',
    category: 'equipe',
    name: 'Fritadeira de Salgados (500 a 1.500 unid.)',
    subtitle: 'Fritura ágil na hora · Período 4 horas',
    priceInfo: 'Até 500 unid: R$ 189,99 · Até 1.500 unid: R$ 249,99',
    description:
      'Profissional dedicada a fritar salgados do seu buffet no ponto certo durante 4 horas, garantindo que tudo chegue quentinho e crocante às bandejas.',
    highlights: ['Até 500 unid. (R$ 189,99) ou até 1.500 unid. (R$ 249,99)', 'Ritmo contínuo sem acúmulo na cozinha', 'Boas práticas de higiene e temperatura'],
    idealFor: 'Aniversários, formaturas e eventos com salgados próprios',
    unitLabel: 'profissional',
  },
  {
    id: 'rosqueiro',
    category: 'equipe',
    name: 'Rosqueiro & Mesa de Frutas / Drinks',
    subtitle: 'Frutas esculpidas · Opção material acrílico ou vidro',
    priceInfo: 'Material acrílico: R$ 349,99 · Material vidro: R$ 449,99',
    description:
      'Profissional especializado no preparo e montagem estética da mesa de frutas esculpidas e coquetéis para encantar os convidados logo na recepção.',
    highlights: [
      'Montagem completa com frutas esculpidas na hora',
      'Escolha entre louça/estrutura em acrílico ou vidro',
      'Forte apelo visual para mesas principais e hotéis',
    ],
    idealFor: 'Festas de 15 anos, casamentos, eventos adultos e hotéis',
    unitLabel: 'serviço',
    images: [
      {
        src: BRAND_IMAGES.frutasEsculpidas,
        alt: 'Mesa montada com melancia, abacaxi e mamão esculpidos artesanalmente para estação de rosqueiro e drinks',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'churrasqueiro',
    category: 'equipe',
    name: 'Churrasqueiro (Espetinho ou Tradicional)',
    subtitle: 'Preparo na brasa com organização e pontualidade',
    priceInfo: 'Espetinho: R$ 349,99 · Tradicional: R$ 399,99',
    description:
      'Profissional experiente para comandar a churrasqueira do seu evento — seja na praticidade dos espetinhos ou no corte tradicional de carnes.',
    highlights: ['Modalidade Espetinho ou Tradicional', 'Uniformizado e com ritmo constante na brasa', 'Ideal para áreas gourmet, sítios e condomínios'],
    idealFor: 'Churrascos em condomínios, chácaras e aniversários adultos',
    unitLabel: 'profissional',
    images: [
      {
        src: BRAND_IMAGES.equipeChurrasco,
        alt: 'Profissional da equipe JPA Eventos BA com avental rosa preparando churrasco na churrasqueira durante evento',
        objectPosition: 'object-[50%_45%]',
      },
    ],
  },
  {
    id: 'barman-mocktail',
    category: 'equipe',
    name: 'Barman / Drinks e Mocktails',
    subtitle: 'Coquetel infantil sem álcool e drinks refrescantes de frutas',
    priceInfo: 'R$ 399,99',
    description:
      'Estação de drinks preparados na hora com frutas frescas, hortelã, caldas coloridas e apresentação vibrante — inclusive mocktails divertidos para o público infantil.',
    highlights: ['Opções 100% sem álcool para crianças (Mocktails)', 'Drinks clássicos de frutas tropicais', 'Preparo ao vivo com visual refrescante'],
    idealFor: 'Aniversários, 15 anos, piscina e festas temáticas',
    unitLabel: 'serviço',
    images: [
      {
        src: BRAND_IMAGES.mocktailsDrinks,
        alt: 'Dois copos de drinks naturais de maracujá e limão com hortelã preparados pela equipe JPA Eventos BA',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'recepcionista',
    category: 'equipe',
    name: 'Recepcionista de Eventos',
    subtitle: 'Acolhimento na entrada · Lista de convidados e presentes',
    priceInfo: 'R$ 349,99',
    description:
      'Profissional cordial dedicada a dar as boas-vindas aos convidados, conferir lista de presença e orientar o fluxo logo na chegada.',
    highlights: ['Boa apresentação e cordialidade', 'Organização de lista na portaria/salão', 'Facilita o controle de convidados em salões'],
    idealFor: 'Salões de festas, 15 anos e eventos empresariais',
    unitLabel: 'profissional',
  },
  {
    id: 'fotografo',
    category: 'equipe',
    name: 'Fotógrafo (Festa Completa)',
    subtitle: 'Registro profissional de todos os momentos do evento',
    priceInfo: 'R$ 849,99',
    description:
      'Cobertura fotográfica completa para eternizar decoração, chegada dos convidados, brincadeiras com a criançada e a hora do parabéns.',
    highlights: ['Cobertura integral da festa', 'Olhar atento à família e aos detalhes', 'Complementa o pacote de festa completa'],
    idealFor: 'Aniversários infantis, batizados e eventos corporativos',
    unitLabel: 'cobertura',
  },
  {
    id: 'seguranca',
    category: 'equipe',
    name: 'Segurança de Eventos',
    subtitle: 'Controle de acesso · Tranquilidade para convidados',
    priceInfo: 'R$ 449,99',
    description:
      'Profissional para portaria, controle de entrada e apoio preventivo em salões, casas de festa e eventos com grande circulação.',
    highlights: ['Presença discreta e firme na portaria', 'Controle de fluxo de entrada e saída', 'Tranquilidade para os anfitriões'],
    idealFor: 'Festas noturnas, 15 anos e eventos em espaços amplos',
    unitLabel: 'profissional',
  },

  // 05. Arco e Enchimento de Balões
  {
    id: 'enchimento-baloes',
    category: 'baloes',
    name: 'Enchimento e Instalação de Balões',
    subtitle: 'Serviço ágil com infladores elétricos · A cada 250 balões',
    priceInfo: 'R$ 149,99 a cada 250 balões',
    description:
      'Já comprou seus balões ou precisa apenas do serviço de enchimento e fixação no local? Nossa equipe faz todo o enchimento e instalação rápida para você.',
    highlights: ['Valor calculado a cada 250 balões', 'Infladores elétricos profissionais de alta velocidade', 'Instalação segura no painel ou fachada'],
    idealFor: 'Quem já tem os balões e precisa de mão de obra ágil',
    unitLabel: 'bloco 250 unid.',
    images: [
      {
        src: BRAND_IMAGES.enchimentoBaloes,
        alt: 'Atendente da JPA Eventos BA enchendo balões rosa e azul com inflador elétrico sobre mesa',
        objectPosition: 'object-[50%_42%]',
      },
    ],
  },
  {
    id: 'arco-simples',
    category: 'baloes',
    name: 'Arco Simples',
    subtitle: 'Enchimento e montagem · Paleta do seu tema',
    description:
      'Arco clássico com acabamento uniforme para emoldurar a mesa do bolo ou entrada da festa sem pesar no orçamento.',
    highlights: ['Cores personalizadas ao tema', 'Balões de alta durabilidade', 'Montagem rápida no local'],
    idealFor: 'Festas em casa e salas de apartamento',
    unitLabel: 'projeto',
    images: [
      {
        src: BRAND_IMAGES.arcoSimples,
        alt: 'Arco de balões simples clássico azul e branco emoldurando entrada de sala de evento',
        objectPosition: 'object-[50%_38%]',
      },
    ],
  },
  {
    id: 'arco-espiral',
    category: 'baloes',
    name: 'Arco Espiral',
    subtitle: 'Movimento clássico · Destaque visual imediato',
    description:
      'Trançado em espiral com duas ou mais cores que cria ritmo alegre e tradicional para festas e eventos escolares.',
    highlights: ['Combinação de 2 a 4 cores', 'Estrutura firme e simétrica', 'Ótimo custo-benefício'],
    idealFor: 'Escolas, festas temáticas e eventos comunitários',
    unitLabel: 'projeto',
    images: [
      {
        src: BRAND_IMAGES.arcoEspiral,
        alt: 'Arco de balões em espiral trançado nas cores roxo e branco montado em salão',
        objectPosition: 'object-[50%_32%]',
      },
    ],
  },
  {
    id: 'arco-blocos',
    category: 'baloes',
    name: 'Arco em Blocos',
    subtitle: 'Geometria limpa · Cores segmentadas',
    description:
      'Construção em blocos de cores sólidas com impacto gráfico moderno, muito usado em eventos corporativos e temas coloridos.',
    highlights: ['Visual contemporâneo e limpo', 'Ideal para identidade visual de marcas', 'Acabamento preciso'],
    idealFor: 'Empresas, vereadores, ações e festas modernas',
    unitLabel: 'projeto',
    images: [
      {
        src: BRAND_IMAGES.arcoBlocos,
        alt: 'Arco de balões em blocos com segmentação de cores sólidas verde, vermelho e azul',
        objectPosition: 'object-[50%_38%]',
      },
    ],
  },
  {
    id: 'entrada-loja',
    category: 'baloes',
    name: 'Entrada de Loja',
    subtitle: 'Chamada de atenção · Inaugurações e promoções',
    description:
      'Ornamentação estratégica para fachadas comerciais em Salvador, atraindo olhares de quem passa na rua para sua loja.',
    highlights: ['Cores alinhadas à sua marca', 'Resistência para áreas externas', 'Montagem cedo antes da abertura'],
    idealFor: 'Lojas, farmácias, mercados e reinaugurações',
    unitLabel: 'fachada',
    images: [
      {
        src: BRAND_IMAGES.baloes,
        alt: 'Arco de balões colorido em entrada de clínica em Salvador com carrinho de pipoca da JPA Eventos BA',
        objectPosition: 'object-[50%_38%]',
      },
    ],
  },
  {
    id: 'arco-organico',
    category: 'baloes',
    name: 'Arco Orgânico & Temático',
    subtitle: 'Desconstruído · Tamanhos variados e temas como Lego e Halloween',
    description:
      'Mistura balões de diferentes diâmetros com apliques modelados criando volume fluido para painéis infantis, temas sazonais e recepções em hotéis.',
    highlights: ['Composição orgânica assimétrica', 'Efeito sofisticado para fotos', 'Cores foscas, pastel, neon ou temáticas'],
    idealFor: 'Aniversários personalizados, painéis e hotéis',
    unitLabel: 'projeto',
    images: [
      {
        src: BRAND_IMAGES.arcoOrganico,
        alt: 'Arco orgânico desconstruído com balões de tamanhos variados em tons de azul marinho, azul claro e branco',
        objectPosition: 'object-[50%_38%]',
      },
      {
        src: BRAND_IMAGES.arcoLego,
        alt: 'Arco orgânico colorido emoldurando painel temático estilo blocos',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.arcoHalloween,
        alt: 'Arco orgânico temático de Halloween com balões laranja, preto, roxo e verde',
        objectPosition: 'object-center',
      },
      {
        src: BRAND_IMAGES.arcoVerdeBranco,
        alt: 'Arco orgânico em tons de verde, branco, vermelho e azul montado em parede amadeirada',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'paredao-baloes',
    category: 'baloes',
    name: 'Paredão de Balões',
    subtitle: 'Cenário completo · Impacto máximo para fotos',
    description:
      'Painel inteiro preenchido com balões para criar um fundo cenográfico memorável atrás da mesa principal ou área de fotos.',
    highlights: ['Cobertura total de fundo', 'Textura rica e fotogênica', 'Personalizável com letreiros ou flores'],
    idealFor: 'Festas de destaque, 15 anos e ativações de marca',
    unitLabel: 'painel',
    images: [
      {
        src: BRAND_IMAGES.paredaoBaloes,
        alt: 'Paredão completo de balões coloridos em rosa e amarelo decorando painel cenográfico para fotos',
        objectPosition: 'object-center',
      },
    ],
  },
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    index: 'Capítulo 01',
    period: 'O Começo · Coragem em Outra Cidade',
    title: 'Três meses longe de Salvador para aprender um ofício com as próprias mãos',
    body: 'Mãe solo de uma criança pequena, recém-separada e sem recursos, ela deixou o filho Paulo sob os cuidados da avó em Salvador e viajou para trabalhar em uma estrutura itinerante por outras cidades. Ali aprendeu na prática o ritmo da chapa: hambúrgueres, pizzas, batatas artesanais e algodão doce.',
  },
  {
    index: 'Capítulo 02',
    period: 'De Volta a Casa · A Primeira Máquina',
    title: 'Algodão doce em copos, sacos e potes divulgados no Facebook',
    body: 'Ao voltar para Salvador, investiu tudo na primeira máquina de algodão doce. Dentro de casa nasceu a JPE Eventos — que se tornaria a JPA Eventos BA — produzindo copos, sacos e potes personalizados que conquistavam os primeiros clientes pelas redes sociais.',
  },
  {
    index: 'Capítulo 03',
    period: 'A Piscina 1x1m & Paulo · Sem Transporte Próprio',
    title: 'De equipamento usado comprado de escola ao transporte na parceria e confiança',
    body: 'Ouvindo os clientes pedirem mais atrações, adquiriu de uma escola uma piscina de bolinhas 1x1m alta — equipamento que preserva até hoje como símbolo vivo da empresa. Sem carro, moto ou bicicleta, fechou parceria com um motorista para levar os brinquedos enquanto Paulo crescia nos eventos ao seu lado, tornando-se hoje um especialista na operação.',
  },
  {
    index: 'Capítulo 04',
    period: '13 Anos · Superação na Pandemia e Grandes Hotéis',
    title: 'Queda total, reconstrução e a alegria de servir de quintais a grandes hotéis',
    body: 'Com sete anos de parceria fiel com a turma da Estripulia das Kas (@estripuliadaskas), comandada pela animadora Tia K1, a empresa enfrentou dois anos duríssimos fechada na pandemia. Mesmo após perdas severas, reergueu-se com novos clientes que viraram amigos — hoje atendendo aniversários em casa, corporações, vereadores e grandes hotéis de Salvador. Porque viver de festa é um desafio todo santo dia.',
  },
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    author: 'Carla Nascimento',
    neighborhood: 'Pituba, Salvador',
    eventType: 'Aniversário de 5 anos em condomínio',
    dateLabel: 'Avaliação no Google · 2 meses atrás',
    rating: 5,
    text: 'Contratei o combo de pula-pula, piscina de bolinhas e as barracas de crepe e algodão doce. Chegaram antes do horário combinado, tudo muito limpo e a equipe super educada com as crianças. Meu filho não saiu dos brinquedos!',
    highlightService: 'Pula-Pula · Crepe · Algodão Doce',
  },
  {
    id: 'rev-2',
    author: 'Patrícia Oliveira',
    neighborhood: 'Imbuí, Salvador',
    eventType: 'Festa infantil em salão',
    dateLabel: 'Avaliação no Google · 1 mês atrás',
    rating: 5,
    text: 'A animação com a Estripulia das Kas (Tia K1) foi a alma da festa! Fez pintura artística lindíssima, Fit Dance Kids e envolveu até os pais nas gincanas. Só elogios dos convidados pelo carinho e energia do início ao parabéns.',
    highlightService: 'Animação · Fit Dance Kids · Pintura Artística',
  },
  {
    id: 'rev-3',
    author: 'Roberto Santana',
    neighborhood: 'Ondina, Salvador',
    eventType: 'Evento corporativo em hotel',
    dateLabel: 'Avaliação no Google · 3 semanas atrás',
    rating: 5,
    text: 'Já contratamos a JPA Eventos BA três vezes para eventos familiares em hotel aqui em Salvador. Arco orgânico impecável na entrada, garçons muito atenciosos e tapioca na hora que impressionou toda a diretoria.',
    highlightService: 'Arco Orgânico · Equipe de Garçons · Tapioca',
  },
  {
    id: 'rev-4',
    author: 'Fernanda Costa',
    neighborhood: 'Brotas, Salvador',
    eventType: 'Aniversário de 1 ano em casa',
    dateLabel: 'Avaliação no Google · 3 meses atrás',
    rating: 5,
    text: 'Espaço pequeno em casa e eles resolveram tudo com perfeição: a piscina de bolinhas 1x1m, o escorregador e o paredão de balões deixaram nossa sala parecendo buffet! Sem contar a história linda da dona, um amor de pessoa.',
    highlightService: 'Piscina 1x1m · Escorregador · Paredão de Balões',
  },
  {
    id: 'rev-5',
    author: 'Marcos Vinícius Almeida',
    neighborhood: 'Caminho das Árvores, Salvador',
    eventType: 'Inauguração comercial',
    dateLabel: 'Avaliação no Google · 1 mês atrás',
    rating: 5,
    text: 'Fizeram o arco de entrada de loja e a estação de pipoca e algodão doce para nossa reinauguração. Pontualidade às 7h30 da manhã, acabamento perfeito nos balões e atendimento impecável durante todo o sábado.',
    highlightService: 'Entrada de Loja · Pipoca · Algodão Doce',
  },
  {
    id: 'rev-6',
    author: 'Juliana Souza',
    neighborhood: 'Itapuã, Salvador',
    eventType: 'Festa infantil completa',
    dateLabel: 'Avaliação no Google · 2 semanas atrás',
    rating: 5,
    text: 'Contratamos garçonete, copeira, churros, pastel e hot dog ao vivo. Eu e meu marido conseguimos finalmente sentar, conversar e curtir o aniversário da nossa filha sem estresse. Recomendo de olhos fechados!',
    highlightService: 'Garçonete · Copeira · Churros · Pastel · Hot Dog',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Atendimento',
    question: 'Quais bairros de Salvador a JPA Eventos BA atende e como funciona o frete?',
    answer:
      'Atendemos toda Salvador e região metropolitana — de residências e condomínios em Pituba, Brotas, Imbuí, Cabula, Cajazeiras e Itapuã a grandes hotéis da orla. Consulte nossa equipe sobre a taxa de deslocamento/frete para endereços acima de 8 km.',
  },
  {
    id: 'faq-pagamento',
    category: 'Pagamento e Contrato',
    question: 'Quais formas de pagamento vocês aceitam? Emitem contrato e Nota Fiscal?',
    answer:
      'Aceitamos Pix, Cartão de Crédito, Débito, pagamento em espécie e Boleto Bancário mensal (para empresas e contratos recorrentes). Trabalhamos com formalização completa: fazemos contrato de prestação de serviços e emitimos Nota Fiscal.',
  },
  {
    id: 'faq-3',
    category: 'Estrutura',
    question: 'Como funcionam as barracas de lanches ao vivo e a voltagem 127V?',
    answer:
      'Todos os nossos equipamentos elétricos são 127V (caso o local só possua 220V, disponibilizamos ou alugamos transformador à parte). A contratação mínima padrão é de 100 unidades, podendo variar entre 2 tipos de lanches da mesma classe (ou 50 unidades por item nos combos promocionais). A retirada ocorre na barraca e já inclui operador, máquinas, guardanapos e embalagens descartáveis.',
  },
  {
    id: 'faq-gourmet',
    category: 'Estrutura',
    question: 'Qual a diferença das barracas de Lanches Gourmet?',
    answer:
      'Na linha Gourmet (como Crepe Francês, Tapioca, Pizza Artesanal, Hambúrguer Artesanal e Hot Dog Gourmet), os lanches são preparados ao vivo com equipe treinada para fazer e servir diretamente em prato de louça com garfo e faca, incluindo guardanapo, 1 opção de salada para pratos salgados e calda para os doces.',
  },
  {
    id: 'faq-2',
    category: 'Reserva',
    question: 'Com quanto tempo de antecedência devo fechar meu orçamento?',
    answer:
      'Recomendamos reservar com 15 a 30 dias de antecedência, especialmente para finais de semana e datas comemorativas (como Dia das Crianças e confraternizações). Mas para datas próximas, chame no WhatsApp para verificarmos encaixe imediato na agenda.',
  },
  {
    id: 'faq-4',
    category: 'Brinquedos',
    question: 'Os brinquedos servem para apartamento ou quintal pequeno?',
    answer:
      'Sim! Nossa piscina de bolinhas 1x1m alta ou baixa, o escorregador e as gangorras encaixam facilmente em salas, varandas e áreas gourmet compactas. Já os pula-pulas têm versões de 2,40m, 3,00m e Oitavada 3,05m com período padrão de 4 horas, montagem e monitor inclusos.',
  },
  {
    id: 'faq-5',
    category: 'Recreação',
    question: 'Como funciona a animação infantil com a Estripulia das Kas (@estripuliadaskas)?',
    answer:
      'Temos 7 anos de parceria com a Estripulia das Kas, liderada pela Tia K1 em Salvador. Contamos com 4 pacotes oficiais (Amarelo 2h, Azul 2h30, Rosa 3h e Lilás 3h30 para 15 a 30 crianças) incluindo 1 animadora + 1 auxiliar, pintura artística hipoalergênica, Fit Dance Kids, chuva de neve/espuma, esculturas de balões e playlist kids.',
  },
  {
    id: 'faq-6',
    category: 'Balões',
    question: 'Posso contratar apenas o enchimento de balões ou escolher as cores do arco?',
    answer:
      'Com certeza. Você pode contratar desde o serviço de enchimento e instalação (a partir de R$ 149,99 a cada 250 balões) até arcos simples, espiral, em blocos, entrada de loja, arco orgânico temático e paredão completo seguindo fielmente a paleta da sua festa ou marca.',
  },
  {
    id: 'faq-7',
    category: 'Equipe',
    question: 'Posso contratar apenas a equipe de garçons, churrasqueiro ou fotógrafo?',
    answer:
      'Sim! Todos os profissionais podem ser contratados de forma avulsa ou em combo: garçom, garçonete, copeiro, fritadeira (até 500 ou 1.500 salgados), rosqueiro com mesa de frutas, churrasqueiro, barman/mocktails, recepcionista, segurança e fotógrafo.',
  },
  {
    id: 'faq-8',
    category: 'Corporativo',
    question: 'Vocês atendem empresas, ações em lojas e grandes hotéis?',
    answer:
      'Sim. Atendemos desde pequenas celebrações familiares até ações promocionais em entradas de lojas, eventos de vereadores, confraternizações corporativas e recepções em grandes hotéis de Salvador com emissão de Nota Fiscal e boleto mensal.',
  },
];

export const TOOLCRAFT_PRESETS: EventPreset[] = [
  {
    id: 'preset-promo-fest',
    title: 'Combo Promo Fest',
    subtitle: 'Pula-pula M, piscina de bolinhas 1x1m, gangorra P, monitor e montagem',
    priceInfo: 'R$ 349,99',
    eventType: 'Aniversário em Casa',
    guests: 30,
    hours: 4,
    itemIds: ['pula-pula', 'piscina-bolinhas', 'gangorra'],
  },
  {
    id: 'preset-fest-kas',
    title: 'Combo Fest Kas',
    subtitle: 'Animação 2h (pintura, brincadeiras, chuva de neve, parabéns) + 50 algodão doce + 20 pipoca copo',
    priceInfo: 'R$ 529,99',
    eventType: 'Aniversário em Casa',
    guests: 40,
    hours: 4,
    itemIds: ['animacao-infantil', 'pintura-artistica', 'algodao-doce', 'pipoca'],
  },
  {
    id: 'preset-alegria',
    title: 'Pacote Alegria',
    subtitle: 'Barraca de algodão doce e pipoca com operador + Animação das Kas 2h30 com escultura de balões',
    priceInfo: 'R$ 899,99',
    eventType: 'Salão ou Condomínio',
    guests: 60,
    hours: 4,
    itemIds: ['animacao-infantil', 'pintura-artistica', 'algodao-doce', 'pipoca'],
  },
  {
    id: 'preset-promo-servi',
    title: 'Combo Promo Servi (Equipe)',
    subtitle: '3 garçons + 1 fritadeira + 1 copeiro uniformizados por 4 horas para servir seu evento',
    priceInfo: 'R$ 789,99',
    eventType: 'Salão ou Condomínio',
    guests: 80,
    hours: 4,
    itemIds: ['garcom', 'fritadeira', 'copeira'],
  },
  {
    id: 'preset-mega-festin',
    title: 'Combo Mega Festin',
    subtitle: 'Crepe + algodão doce + pipoca + Animação 2h + pula-pula + piscina + gangorra + monitor e operador',
    priceInfo: 'R$ 1.299,99',
    eventType: 'Salão ou Condomínio',
    guests: 80,
    hours: 4,
    itemIds: [
      'animacao-infantil',
      'pula-pula',
      'piscina-bolinhas',
      'gangorra',
      'crepe-suico-frances',
      'algodao-doce',
      'pipoca',
    ],
  },
  {
    id: 'preset-super-adelle',
    title: 'Combo Super Adelle (Completo)',
    subtitle: 'Crepe + pizza baby + algodão doce + pipoca livre + Animação 2h + brinquedos + 2 garçons + fritadeira',
    priceInfo: 'R$ 2.030,99',
    eventType: 'Hotel ou Corporativo',
    guests: 120,
    hours: 4,
    itemIds: [
      'animacao-infantil',
      'pula-pula',
      'piscina-bolinhas',
      'crepe-suico-frances',
      'pizza-baby-artesanal',
      'algodao-doce',
      'pipoca',
      'garcom',
      'fritadeira',
    ],
  },
];

export const SALVADOR_NEIGHBORHOODS = [
  'Pituba',
  'Imbuí',
  'Brotas',
  'Caminho das Árvores',
  'Itapuã',
  'Ondina',
  'Barra',
  'Cabula',
  'Paralela',
  'Cajazeiras',
  'Graça',
  'Lauro de Freitas / Região',
];
