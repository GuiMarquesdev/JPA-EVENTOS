Aplique uma repaginação visual completa no projeto, trocando a paleta de cores, a tipografia e o arredondamento de cantos em todos os componentes (`Navbar.tsx`, `HeroSection.tsx`, `CatalogSection.tsx`, `StorySection.tsx`, `ReviewsAndFaqSection.tsx`, `SocialAndFooter.tsx`, `ToolcraftBuilder.tsx`), além de `src/index.css` e `index.html`. Não altere a estrutura, a lógica, os componentes ou os dados em `src/data/jpaData.ts` — só as classes/estilos visuais.

A nova paleta é baseada na logo oficial da JPA Eventos BA (personagens rosa e azul pastel, tipo "candy colors").

## 1. Paleta de cores — substitua cada cor hexadecimal antiga pela nova equivalente, em todos os arquivos:

| Uso | Cor(es) antiga(s) | Cor nova |
|---|---|---|
| Texto principal | `#181512` | `#241f2e` |
| Texto secundário | `#57514A` | `#5c5868` |
| Texto terciário/muted | `#78716C` | `#8b8691` |
| Bordas | `#E7E2DA`, `#DED8CE`, `#D6CFC3`, `#D6CFC5`, `#BDB4A8`, `#E5DFD3`, `#C8BFB0` | `#f3d9e6` |
| Fundo principal | `#FAF8F5`, `#F3EEE6`, `#F3ECE1`, `#F2EDE4` | `#fffbfa` |
| Fundo secundário/soft | `#EFEAE1`, `#EFE8DC`, `#EFE5D5` | `#ffe6f0` |
| Verde (CTA WhatsApp — mantém a cor da marca do WhatsApp, não muda) | `#15803D` | `#25d366` |
| Verde (hover/dark do CTA WhatsApp) | `#166534` | `#1aa34f` |
| **Rosa** (destaque/accent principal, da logo) | `#F59E0B`, `#FCD34D`, `#D97706`* | `#f58fc0` |
| **Rosa escuro** (hover do rosa) | `#B45309`, `#92400E` | `#f26b9e` |
| **Azul** (destaque/accent secundário, da logo) | `#4ADE80`* | `#6ec6e3` |
| Variações escuras de texto/overlay (`#2E2823`, `#3A322B`, `#322C26`, `#231E1A`, `#332E29`, `#322B24`, `#26201B`, `#241F1A`, `#211D19`) | — | `#241f2e` |

\* Observação: `#D97706` (laranja) era usado como ícone de destaque — vira **azul** `#6ec6e3`. `#4ADE80` (verde-claro indicador) também vira azul `#6ec6e3`, já que o verde na paleta nova fica reservado só pro botão do WhatsApp.

## 2. Tipografia

- Uma única fonte: **Lexend** (Google Fonts), tanto para `--font-display` quanto `--font-sans` no `@theme` de `src/index.css`.
- No `index.html`, o `<link>` do Google Fonts deve ser:
  ```
  https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap
  ```

## 3. Cantos arredondados

Em todos os componentes, aumente o arredondamento:
- `rounded-lg` → `rounded-[12px]`
- `rounded-xl` → `rounded-[22px]`
- `rounded-2xl` → `rounded-[32px]`

(Não altere `rounded-full` se existir — isso é só pra elementos circulares.)

## Resultado esperado

Visual alegre e "candy" (rosa e azul pastel sobre fundo creme claro, cantos bem arredondados, fonte Lexend única, texto em cinza-chumbo quase preto), **consistente com a identidade visual da própria logo da JPA Eventos BA** (personagens rosa/azul), mantendo a mesma estrutura, textos e funcionalidade do site. O botão de WhatsApp continua verde (cor oficial do WhatsApp), não rosa/azul.
