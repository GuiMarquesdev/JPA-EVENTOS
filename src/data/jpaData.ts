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
      'Parceria consolidada há sete anos com a Estripulia das Kas (@estripuliadaskas), comandada pela Tia K1 em Salvador: recreação infantil, Fit Dance Kids, pintura artística e chuva de espuma unindo pais e filhos.',
    image: '/src/assets/images/recreacao_pintura_externa.jpg',
    imageAlt: 'Recreadora caracterizada realizando pintura facial infantil ao ar livre em mesa colorida',
    gallery: [
      {
        src: '/src/assets/images/recreacao_pintura_externa.jpg',
        alt: 'Recreadora caracterizada realizando pintura facial infantil ao ar livre em mesa colorida',
        objectPosition: 'object-[50%_22%]',
      },
    ],
  },
  {
    id: 'brinquedos',
    index: '02',
    label: 'Brinquedos',
    shortLabel: 'Brinquedos',
    headline: 'Diversão segura do nosso xodó 1x1m ao pula-pula',
    description:
      'Brinquedos higienizados, revisados e montados com pontualidade. Nossa piscina de bolinhas 1x1m alta acompanha a história da JPA desde os primeiros eventos.',
    image: '/src/assets/images/brinquedos_mar_bolinhas.jpg',
    imageAlt: 'Área recreativa infantil com piscina cheia de bolinhas coloridas e escorregadores',
    gallery: [
      {
        src: '/src/assets/images/brinquedos_mar_bolinhas.jpg',
        alt: 'Área recreativa infantil com piscina cheia de bolinhas coloridas e escorregadores',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'lanches',
    index: '03',
    label: 'Barracas de Lanches ao Vivo',
    shortLabel: 'Lanches ao Vivo',
    headline: 'Sabor quentinho preparado na hora diante dos convidados',
    description:
      'Onde tudo começou: desde o algodão doce artesanal até crepes, tapioca, churros, pipoca, pastel, açaí, picolé e hot dog servidos com higiene e agilidade.',
    image: BRAND_IMAGES.lanchesReal1,
    imageAlt: 'Operador da JPA Eventos BA preparando algodão doce azul ao vivo na máquina sobre barraca de madeira',
    gallery: [
      {
        src: BRAND_IMAGES.lanches,
        alt: 'Barracas de madeira da JPA Eventos BA servindo crepes, churros artesanais, pipoca e algodão doce ao vivo',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'equipe',
    index: '04',
    label: 'Equipe de Serviço',
    shortLabel: 'Equipe',
    headline: 'Equipe uniformizada e acolhedora para você curtir a festa sem preocupações',
    description:
      'Profissionais treinados, uniformizados e cordiais para servir convidados, organizar a cozinha e manter o ritmo do evento do início ao parabéns.',
    image: BRAND_IMAGES.equipe1,
    imageAlt: 'Equipe uniformizada da JPA Eventos BA com aventais rosa da marca em festa infantil decorada em Salvador',
    gallery: [
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
        src: BRAND_IMAGES.equipeSalao,
        alt: 'Equipe de serviço da JPA Eventos BA com uniforme social, camisas azuis da empresa e avental de copeira em salão',
        objectPosition: 'object-[50%_38%]',
      },
      {
        src: BRAND_IMAGES.equipeAventalRosa2,
        alt: 'Equipe JPA Eventos BA com aventais rosa sorrindo junto à animadora antes do início da festa',
        objectPosition: 'object-[50%_46%]',
      },
      {
        src: BRAND_IMAGES.equipeChurrasco,
        alt: 'Profissional da equipe JPA Eventos BA com avental rosa preparando churrasco na churrasqueira durante evento',
        objectPosition: 'object-[50%_45%]',
      },
      {
        src: BRAND_IMAGES.equipe2,
        alt: 'Profissionais da equipe JPA Eventos BA sorrindo uniformizados antes de iniciar o atendimento em festa em Salvador',
        objectPosition: 'object-[50%_28%]',
      },
    ],
  },
  {
    id: 'baloes',
    index: '05',
    label: 'Arco de Balões',
    shortLabel: 'Balões',
    headline: 'Enchimento e ornamentação que transformam a entrada e o painel',
    description:
      'Projetos sob medida para festas em casa, salões, fachadas de lojas, inaugurações comerciais e eventos corporativos em hotéis de Salvador.',
    image: BRAND_IMAGES.baloes,
    imageAlt: 'Arco de balões colorido em entrada de clínica em Salvador com carrinho de pipoca da JPA Eventos BA',
    gallery: [
      {
        src: '/src/assets/images/baloes_arco_colorido_real.jpg',
        alt: 'Arco colorido com balões vibrantes montado ao ar livre para entrada de evento',
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
    name: 'Animação de Festa Infantil',
    subtitle: 'Com Estripulia das Kas (Tia K1) · 7 anos de parceria',
    description:
      'Condução completa da festa com a equipe da @estripuliadaskas: Fit Dance Kids, coreografias musicais, chuva de espuma/neve, comandos divertidos e hora do parabéns cheia de energia.',
    highlights: [
      'Fit Dance Kids e coreografias animadas',
      'Chuva de espuma / neve e brincadeiras',
      'Equipe de animadores e recreadores há 7 anos',
    ],
    idealFor: 'Aniversários em casa, condomínios, escolas e hotéis',
    unitLabel: 'equipe',
    images: [
      {
        src: '/src/assets/images/hero_slide_6.jpg',
        alt: 'Animadora da JPA Eventos BA conduzindo brincadeira com chuva de espuma e crianças se divertindo em festa infantil',
        objectPosition: 'object-[32%_45%]',
      },
    ],
  },
  {
    id: 'pintura-artistica',
    category: 'animacao',
    name: 'Pintura Artística',
    subtitle: 'Estripulia das Kas · Tintas hipoalergênicas na hora',
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
    subtitle: 'Integração familiar · Memórias compartilhadas',
    description:
      'Dinâmicas pensadas especialmente para tirar os adultos da cadeira e criar momentos de riso e cumplicidade entre pais, avós e crianças.',
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
    highlights: ['Materiais próprios higienizados', 'Seguro para espaços abertos ou salões', 'Premiação simbólica divertida'],
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
    name: 'Pula-Pula (Cama Elástica)',
    subtitle: 'Rede de proteção reforçada · Montagem inclusa',
    description:
      'Clássico indispensável que garante horas de salto e alegria com proteção lateral, molas cobertas e escadinha segura.',
    highlights: ['Lona tensionada e higienizada', 'Proteção completa em tela', 'Transporte e montagem em Salvador'],
    idealFor: 'Quintais, áreas gourmet, playgrounds e salões',
    unitLabel: 'unidade',
    images: [
      {
        src: BRAND_IMAGES.pulaPulaReal,
        alt: 'Pula-pula colorido com rede de proteção da JPA Eventos BA montado para evento em Salvador',
        objectPosition: 'object-[50%_52%]',
      },
    ],
  },
  {
    id: 'piscina-bolinhas',
    category: 'brinquedos',
    name: 'Piscina de Bolinhas (1x1m Alta)',
    subtitle: 'Símbolo da JPA Eventos BA · Ideal para os pequenos',
    description:
      'Nossa piscina de bolinhas 1x1m alta é o símbolo histórico que iniciou nossa trajetória de locação — perfeita e segura para bebês e crianças menores.',
    highlights: ['Bolinhas lavadas a cada evento', 'Estrutura compacta para apartamentos e casas', 'Símbolo afetivo dos nossos 13 anos'],
    idealFor: 'Primeiros aninhos, espaços compactos e áreas baby',
    isHistoricSymbol: true,
    unitLabel: 'unidade',
    images: [
      {
        src: BRAND_IMAGES.piscinaBolinhasReal,
        alt: 'Piscina de bolinhas 1x1m alta colorida com rede de proteção da JPA Eventos BA',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'escorregador',
    category: 'brinquedos',
    name: 'Escorregador Infantil',
    subtitle: 'Rampa anatômica · Cantos arredondados',
    description:
      'Escorregador resistente em cores alegres com degraus antiderrapantes, ideal para compor o cantinho da primeira infância com segurança.',
    highlights: ['Material plástico atóxico firme', 'Fácil posicionamento interno ou externo', 'Combina com a piscina de bolinhas'],
    idealFor: 'Crianças de 1 a 6 anos',
    unitLabel: 'unidade',
    images: [
      {
        src: '/src/assets/images/escorregador_real.jpg',
        alt: 'Criança pronta para descer em escorregador infantil amarelo e azul com rede de proteção',
        objectPosition: 'object-[50%_48%]',
      },
    ],
  },
  {
    id: 'gangorra',
    category: 'brinquedos',
    name: 'Gangorra Infantil',
    subtitle: 'Equilíbrio e risadas em dupla',
    description:
      'Gangorra ergonômica com pegadores firmes e base estável para brincadeiras seguras entre irmãos e amiguinhos.',
    highlights: ['Pegadores anatômicos seguros', 'Higienização antes da entrega', 'Perfeita para combos baby'],
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

  // 03. Barracas de Lanches ao Vivo
  {
    id: 'crepe-suico-frances',
    category: 'lanches',
    name: 'Crepe Suíço e Crepe Francês',
    subtitle: 'Massa leve na chapa · Recheios doces e salgados',
    description:
      'Preparado na frente dos convidados com massa artesanal fresquinha no palito (suíço) ou dobrado na chapa (francês), servido quentinho.',
    highlights: ['Sabores salgados e doces variados', 'Operador dedicado durante a festa', 'Sucesso absoluto entre adultos e crianças'],
    idealFor: 'Aniversários, 15 anos e eventos corporativos',
    needsPower: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.lanchesReal4,
        alt: 'Crepe suíço no palito assado na hora pela equipe da JPA Eventos BA',
        objectPosition: 'object-[50%_56%]',
      },
    ],
  },
  {
    id: 'tapioca',
    category: 'lanches',
    name: 'Tapioca ao Vivo',
    subtitle: 'Goma hidratada na hora · Sabor da Bahia',
    description:
      'Tapioca macia e sequinha feita na hora na chapa com opções tradicionais e doces como queijo coalho, coco, carne seca ou chocolate.',
    highlights: ['Feita sob encomenda para cada convidado', 'Opção naturalmente sem glúten', 'Aroma irresistível na estação'],
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
    subtitle: 'Crocantes por fora · Doce de leite e chocolate',
    description:
      'Fritos na hora, passados no açúcar e canela e generosamente recheados na frente do convidado.',
    highlights: ['Massa crocante frita na hora', 'Recheios cremosos fartos', 'Embalagem prática para comer circulando'],
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
    name: 'Algodão Doce',
    subtitle: 'Nossa primeira máquina · Palito, copo ou pote personalizado',
    description:
      'O doce que deu origem à JPA Eventos BA há 13 anos: nuvens coloridas feitas ao vivo ou embaladas com capricho em copos e potes.',
    highlights: ['Feito ao vivo ou em potes personalizados', 'Cores combinando com o tema da festa', 'Coração da nossa história desde o primeiro dia'],
    idealFor: 'Todas as idades, lembrancinhas e inaugurações',
    needsPower: true,
    isHistoricSymbol: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.lanchesReal1,
        alt: 'Operador da JPA Eventos BA preparando algodão doce azul ao vivo na máquina sobre barraca de madeira',
        objectPosition: 'object-[50%_30%]',
      },
    ],
  },
  {
    id: 'pipoca',
    category: 'lanches',
    name: 'Pipoca Quentinha',
    subtitle: 'Estourada na hora · Doce ou salgada',
    description:
      'Pipoca crocante e perfumada servida em saquinhos individuais durante todo o período contratado.',
    highlights: ['Milho selecionado e crocante', 'Saquinhos higiênicos', 'Atendimento contínuo sem filas longas'],
    idealFor: 'Aniversários, ações em lojas e eventos escolares',
    needsPower: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.lanchesReal3,
        alt: 'Máquina de pipoca da JPA Eventos BA com pipoca estourada na hora e saquinhos listrados rosa e branco',
        objectPosition: 'object-[50%_60%]',
      },
    ],
  },
  {
    id: 'picole',
    category: 'lanches',
    name: 'Picolé Refrescante',
    subtitle: 'Sabores de frutas e cremosos · Ideal para o calor de Salvador',
    description:
      'Carrinho conservado na temperatura certa com variedade de sabores tropicais e tradicionais que refrescam a criançada.',
    highlights: ['Variedade de frutas e ao leite', 'Mantido gelado durante todo o evento', 'Perfeito para festas de tarde ou piscina'],
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
    name: 'Açaí na Hora',
    subtitle: 'Cremoso · Acompanhamentos variados',
    description:
      'Açaí gelado servido em copos com complementos escolhidos pelo convidado como granola, leite em pó, banana e caldas.',
    highlights: ['Textura cremosa selecionada', 'Acompanhamentos organizados com higiene', 'Alto valor percebido pelos convidados'],
    idealFor: 'Festas jovens, eventos esportivos e recepções em hotéis',
    needsPower: true,
    unitLabel: 'estação',
    images: [
      {
        src: BRAND_IMAGES.lanchesAcai,
        alt: 'Açaí cremoso servido com granola, banana em rodelas, morango e leite em pó',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'pastel',
    category: 'lanches',
    name: 'Pastel Frito na Hora',
    subtitle: 'Massa sequinha e crocante · Recheios tradicionais',
    description:
      'Pastéis dourados fritos na hora com recheios bem temperados de queijo, carne ou frango para matar a fome de verdade.',
    highlights: ['Óleo sempre limpo e temperatura controlada', 'Frito sob demanda para sair crocante', 'Sustenta adultos e crianças'],
    idealFor: 'Aniversários completos e confraternizações',
    needsPower: true,
    unitLabel: 'barraca',
    images: [
      {
        src: BRAND_IMAGES.lanchesPastel,
        alt: 'Pastel brasileiro frito na hora com massa dourada, sequinha e crocante servido no prato',
        objectPosition: 'object-center',
      },
    ],
  },
  {
    id: 'hot-dog',
    category: 'lanches',
    name: 'Hot Dog (Cachorro-Quente)',
    subtitle: 'Pão macio · Molho caseiro e complementos',
    description:
      'O clássico lanche de festa infantil montado na hora com molho saboroso, salsicha selecionada, milho, ervilha e batata palha crocante.',
    highlights: ['Montagem rápida e higiênica', 'Molho caseiro temperado na medida', 'Favorito garantido das crianças'],
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

  // 04. Equipe de Serviço
  {
    id: 'garcom',
    category: 'equipe',
    name: 'Garçom',
    subtitle: 'Uniformizado · Serviço ágil de bebidas e salgados',
    description:
      'Atendimento atencioso às mesas e convidados volantes para que os anfitriões curtam cada momento sem preocupação.',
    highlights: ['Postura profissional e cordial', 'Controle de reposição nas mesas', 'Experiência em festas e hotéis'],
    idealFor: 'Festas familiares, corporativas e recepções',
    unitLabel: 'profissional',
  },
  {
    id: 'garconete',
    category: 'equipe',
    name: 'Garçonete',
    subtitle: 'Cuidado nos detalhes · Atendimento acolhedor',
    description:
      'Serviço dedicado de salgados, doces e bebidas com atenção especial às famílias, idosos e crianças.',
    highlights: ['Apresentação impecável', 'Agilidade na circulação', 'Apoio na hora do bolo e parabéns'],
    idealFor: 'Aniversários, chás de bebê e eventos sociais',
    unitLabel: 'profissional',
  },
  {
    id: 'copeira',
    category: 'equipe',
    name: 'Copeira',
    subtitle: 'Organização de cozinha · Higiene contínua',
    description:
      'Responsável pelo preparo e organização de pratos, copos, reposição de travessas, sucos e limpeza da copa durante o evento.',
    highlights: ['Cozinha sempre limpa e fluida', 'Controle de bebidas e gelo', 'Apoio direto aos garçons'],
    idealFor: 'Eventos em casa, salões de festa e chácaras',
    unitLabel: 'profissional',
  },
  {
    id: 'rosqueiro',
    category: 'equipe',
    name: 'Rosqueiro e Apoio de Fritura',
    subtitle: 'Especialista no ponto certo · Produção ágil',
    description:
      'Profissional treinado para fritura de salgados, preparo de massas e apoio operacional em eventos com grande fluxo de convidados.',
    highlights: ['Ritmo constante para servir quente', 'Boas práticas de cozinha', 'Integração com equipe de garçons'],
    idealFor: 'Festas com buffet próprio e grandes recepções',
    unitLabel: 'profissional',
  },

  // 05. Arco de Balões
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
    name: 'Arco Orgânico',
    subtitle: 'Desconstruído · Tamanhos variados e volume editorial',
    description:
      'Tendência atual em festas infantis e eventos de hotéis: mistura balões de diferentes diâmetros criando volume fluido e fotogênico.',
    highlights: ['Composição orgânica assimétrica', 'Efeito sofisticado para fotos', 'Cores foscas, pastel ou vibrantes'],
    idealFor: 'Aniversários personalizados, painéis e hotéis',
    unitLabel: 'projeto',
    images: [
      {
        src: BRAND_IMAGES.arcoOrganico,
        alt: 'Arco orgânico desconstruído com balões de tamanhos variados em tons de azul marinho, azul claro e branco',
        objectPosition: 'object-[50%_38%]',
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
    question: 'Quais bairros de Salvador a JPA Eventos BA atende?',
    answer:
      'Atendemos toda Salvador e região metropolitana — desde aniversários em residências e condomínios em bairros como Brotas, Pituba, Imbuí, Cabula, Cajazeiras, Itapuã e Subúrbio até eventos corporativos em grandes hotéis da orla e centro.',
  },
  {
    id: 'faq-2',
    category: 'Reserva',
    question: 'Com quanto tempo de antecedência devo fechar meu orçamento?',
    answer:
      'Recomendamos reservar com 15 a 30 dias de antecedência, especialmente para finais de semana e datas comemorativas (como Dia das Crianças e confraternizações). Mas para datas próximas, chame no WhatsApp para verificarmos encaixe imediato na agenda.',
  },
  {
    id: 'faq-3',
    category: 'Estrutura',
    question: 'O que preciso ter no local para as barracas de lanches ao vivo?',
    answer:
      'Para estações como crepe, churros, pipoca, algodão doce, tapioca, pastel ou hot dog, precisamos apenas de um ponto de energia próximo (tomada 110v ou 220v compatível, que confirmamos no orçamento) e um espaço coberto ou abrigado de chuva direta.',
  },
  {
    id: 'faq-4',
    category: 'Brinquedos',
    question: 'Os brinquedos servem para apartamento ou quintal pequeno?',
    answer:
      'Sim! Nossa piscina de bolinhas 1x1m alta, o escorregador e a gangorra encaixam facilmente em salas, varandas e áreas gourmet compactas. Já para o pula-pula, confirmamos as medidas do espaço com você antes do evento para garantir segurança total.',
  },
  {
    id: 'faq-5',
    category: 'Recreação',
    question: 'Como funciona a animação infantil com a Estripulia das Kas (@estripuliadaskas)?',
    answer:
      'Temos 7 anos de parceria com a Estripulia das Kas, grupo liderado pela Tia K1 em Salvador com animadores, atores e recreadores. O pacote pode incluir Fit Dance Kids, coreografias musicais, pintura artística, gincanas, chuva de espuma/neve, interação com pais e condução animada da hora do parabéns.',
  },
  {
    id: 'faq-6',
    category: 'Balões',
    question: 'Posso escolher exatamente as cores do meu arco ou paredão de balões?',
    answer:
      'Com certeza. Trabalhamos com arcos simples, espiral, em blocos, entrada de loja, arco orgânico e paredão completo seguindo fielmente a paleta do tema da sua festa ou as cores da sua marca.',
  },
  {
    id: 'faq-7',
    category: 'Equipe',
    question: 'Posso contratar apenas a equipe de garçons ou só os brinquedos?',
    answer:
      'Sim! Você pode contratar itens avulsos — como só a equipe de garçom, garçonete, copeira e rosqueiro, ou apenas um brinquedo ou arco de balões — ou montar um combo completo personalizado no nosso estúdio Monte Sua Festa.',
  },
  {
    id: 'faq-8',
    category: 'Corporativo',
    question: 'Vocês atendem empresas, ações em lojas e grandes hotéis?',
    answer:
      'Sim. Atendemos desde pequenas celebrações familiares até ações promocionais em entradas de lojas, eventos de vereadores, confraternizações corporativas e recepções em grandes hotéis de Salvador com pontualidade rigorosa.',
  },
];

export const TOOLCRAFT_PRESETS: EventPreset[] = [
  {
    id: 'preset-casa',
    title: 'Aniversário em Casa (Compacto)',
    subtitle: 'Ideal para sala, varanda ou quintal com área baby e doce na hora',
    eventType: 'Aniversário em Casa',
    guests: 35,
    hours: 4,
    itemIds: ['piscina-bolinhas', 'escorregador', 'algodao-doce', 'pipoca', 'arco-simples'],
  },
  {
    id: 'preset-completo',
    title: 'Festa Infantil Completa',
    subtitle: 'Animação com Estripulia das Kas, Fit Dance Kids, brinquedos, lanches, garçom e arco orgânico',
    eventType: 'Salão ou Condomínio',
    guests: 70,
    hours: 4,
    itemIds: [
      'animacao-infantil',
      'pintura-artistica',
      'pula-pula',
      'piscina-bolinhas',
      'crepe-suico-frances',
      'churros',
      'algodao-doce',
      'garconete',
      'arco-organico',
    ],
  },
  {
    id: 'preset-loja',
    title: 'Ação / Entrada de Loja',
    subtitle: 'Atrativo comercial de alto impacto na fachada com pipoca e algodão doce',
    eventType: 'Comercial / Inauguração',
    guests: 120,
    hours: 5,
    itemIds: ['entrada-loja', 'arco-blocos', 'algodao-doce', 'pipoca', 'pintura-artistica'],
  },
  {
    id: 'preset-hotel',
    title: 'Corporativo / Grande Hotel',
    subtitle: 'Paredão de balões, tapioca e crepe ao vivo com equipe completa de serviço',
    eventType: 'Hotel ou Corporativo',
    guests: 100,
    hours: 5,
    itemIds: [
      'paredao-baloes',
      'tapioca',
      'crepe-suico-frances',
      'acai',
      'garcom',
      'garconete',
      'copeira',
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
