Aplique uma repaginação visual completa no projeto, trocando a paleta de cores, a tipografia e o arredondamento de cantos em todos os componentes (`Navbar.tsx`, `HeroSection.tsx`, `CatalogSection.tsx`, `StorySection.tsx`, `ReviewsAndFaqSection.tsx`, `SocialAndFooter.tsx`, `ToolcraftBuilder.tsx`), além de `src/index.css` e `index.html`. Não altere a estrutura, a lógica, os componentes ou os dados em `src/data/jpaData.ts` — só as classes/estilos visuais.

## 1. Paleta de cores — substitua cada cor hexadecimal antiga pela nova equivalente, em todos os arquivos:

| Uso | Cor antiga | Cor nova |
|---|---|---|
| Texto principal (ink) | `#181512` | `#1d2350` |
| Texto secundário | `#57514A` | `#4a5180` |
| Texto terciário/muted | `#78716C` | `#5f6590` |
| Bordas | `#E7E2DA`, `#DED8CE`, `#D6CFC3`, `#D6CFC5`, `#BDB4A8`, `#E5DFD3`, `#C8BFB0` | `#efe4cf` |
| Fundo principal | `#FAF8F5`, `#F3EEE6`, `#F3ECE1`, `#F2EDE4` | `#fffbf3` |
| Fundo secundário/soft | `#EFEAE1`, `#EFE8DC`, `#EFE5D5` | `#fff4dc` |
| Verde (CTA WhatsApp) | `#15803D` | `#25d366` |
| Verde (hover/dark) | `#166534` | `#1aa34f` |
| Amarelo/destaque | `#F59E0B`, `#FCD34D` | `#ffc83d` |
| Amarelo escuro | `#B45309`, `#92400E` | `#e0a512` |
| Laranja/accent (ex: ícone "Montar Minha Festa") | `#D97706` | `#ff8a3d` |
| Verde claro (indicador) | `#4ADE80` | `#14845a` |
| Variações escuras de texto/overlay (`#2E2823`, `#3A322B`, `#322C26`, `#231E1A`, `#332E29`, `#322B24`, `#26201B`, `#241F1A`, `#211D19`) | — | `#1d2350` |

## 2. Tipografia

- Troque as fontes atuais (Bricolage Grotesque + Plus Jakarta Sans) por **uma única fonte: Lexend** (Google Fonts), tanto para `--font-display` quanto `--font-sans` no `@theme` de `src/index.css`.
- No `index.html`, troque o `<link>` do Google Fonts para:
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

Visual mais vibrante e "brincalhão" (cores vivas sobre fundo creme quente, cantos bem arredondados, fonte Lexend única), mantendo a mesma estrutura, textos e funcionalidade do site — inspirado no estilo visual de referência de um site de aluguel de brinquedos (Tio Titi), mas com a identidade/conteúdo da JPA Eventos BA preservados.
