# PROMPT: Landing page de vendas, Illan Evolution (EA FC 27)

> Cole este arquivo inteiro no Claude Code, na pasta `coach-illan`, com o MCP do Higgsfield conectado.

---

## 0. Contexto e regras gerais

Você vai criar a **página de vendas do curso "Illan Evolution"**, do **Coach Illan** (@coach__illan), coach de EA SPORTS FC campeão sul-americano. O curso ensina a jogar o **EA FC 27** com método: parar de tiltar na Weekend League, subir no Rivals e defender no manual.

A página tem um único objetivo: **fazer o visitante clicar no CTA de compra.** Todo bloco precisa empurrar para o próximo e terminar em CTA.

Antes de escrever qualquer coisa:
1. Carregue a skill **`copy-fc27`** (`.claude/skills/copy-fc27/SKILL.md`). Todo texto da página segue essa skill: fatos do FC 27 conferidos e copy sem cara de IA.
2. Carregue as skills de design:
   - **`frontend-design`** (`/frontend-design`): direção visual e o processo "planejar → revisar contra o briefing → construir → criticar com screenshot". A seção 2 deste prompt já é o resultado desse planejamento. Siga-a e use a skill na etapa de autocrítica.
   - **`ui-ux-pro-max`**: skill do projeto em `.claude/skills/ui-ux-pro-max/` (carregue pelo Skill tool). Use o buscador local pelo caminho:
     ```bash
     python .claude/skills/ui-ux-pro-max/scripts/search.py "<consulta>" --domain <domínio>
     ```
     Use para **regras de UX, acessibilidade, performance, animação GSAP e o checklist pré-entrega**. Consultas úteis:
     - `"landing page conversion cta" --domain landing`
     - `"focus visible keyboard" --domain ux`
     - `"video hero lcp performance" --domain ux`
     - `"scroll trigger reduced motion" --domain gsap`
     - `"cta touch target mobile" --domain ux`
     - `"html static site" --stack html-tailwind` (só a parte de implementação; o site é CSS puro, sem Tailwind)
     **Atenção:** o `--design-system` dessa skill sugere roxo neon + Russo One/Chakra Petch para "gaming". **Ignore paleta e fontes da skill**: a identidade é a da seção 2 (preto, vermelho, Big Shoulders + Barlow). Quando a skill e este prompt divergirem em cor, fonte ou estilo, **vale o prompt**. Em acessibilidade e usabilidade, vale a regra mais rígida das duas.
   - **`responsividade`**: mobile-first e revisão em 390px, 768px e 1440px.
3. Leia o PDF `Illan-Evolution-Guia-EA-FC-27.pdf` (`pdftotext -layout -enc UTF-8`). Ele é a fonte do conteúdo do curso: módulos, aulas, extras e o plano de 4 semanas.
4. Abra e olhe todas as imagens de `img/` antes de desenhar.

**Não invente** preço, número de alunos, faturamento, depoimento ou nome de jogador. O que faltar vira `[PREENCHER: ...]`, bem visível no código e listado no final da entrega.

---

## 1. Stack e estrutura

- HTML + CSS + JS puro, sem framework. GSAP + ScrollTrigger via CDN (cdnjs) só para o que está listado em "Movimento" (seção 2): a entrada do hero e o relógio da partida ligado ao scroll. Nada de fade-in por seção.
- Estrutura:
  ```
  site/
    index.html
    css/style.css
    js/main.js
    assets/  (imagens otimizadas em WebP + vídeo do hero)
  ```
- Copie e otimize as imagens de `img/` para `site/assets/` (WebP, largura máxima de 1920px, com `loading="lazy"` fora do hero).
- Respeite `prefers-reduced-motion`: sem vídeo em autoplay e sem animação, só o poster estático.
- Lighthouse mobile com Performance e Acessibilidade ≥ 90.

---

## 2. Direção visual

### Referências (abra e estude)
| Arquivo | Para que serve |
|---|---|
| `img/00-raw/Redesigned website.jpg` | **Referência principal de layout.** Uma landing "Turn YouTube into your business" em preto e vermelho. Copie a estrutura e a hierarquia, não o conteúdo. |
| `img/02-fundos/background-1.png` | Textura de vidro/cristal estilhaçado vermelho e preto. É a assinatura visual e o fundo de seções-chave. |
| `img/02-fundos/section-1.png` | **Imagem do hero**: Illan de blazer preto, sorrindo, com um controle de PS5 flutuando sobre a mão, fundo estilhaçado vermelho. |
| `img/01-perfil/illan-1.png` | Illan de braços cruzados, camiseta preta, fundo removido. Use na seção "Quem é o Illan". |
| `img/00-raw/whatsapp_image_...-removebg-preview.png` | Illan com os dedos nas têmporas (pose de "foco/mentalidade"), fundo removido. Use na seção de mentalidade/tilt. |
| `img/00-raw/campeao.png` | Print do post "CAMPEÕES – CASH CUP DEZEMBRO" (Illan + MH). Veja a seção 3.6. |
| `img/00-raw/infos.png` | Print do perfil do Instagram com as conquistas. Veja a seção 3.6. |

**Não use** nada de `img/04-ilustracoes/`.

### Conceito: "a página é uma partida de Weekend League"
O visitante entra no apito inicial (hero) e sai no apito final (oferta + CTA). O vocabulário visual vem do **mundo do jogo**, não de landing de infoproduto: placar de transmissão (scorebug), relógio de partida, carta de FUT, botão ✕ do controle e vidro estilhaçado (a "pressão" que quebra). O "Redesigned website" dá a **hierarquia** (headline gigante em 2 linhas, foto à direita, faixa de prova, grid de cards, bloco do produto). A **pele** é do FC.

**Público:** jogador brasileiro de Ultimate Team, de 16 a 30 anos, travado no Rivals e frustrado na WL, que vê a página no celular, de noite, depois de perder.
**Trabalho da página:** levar ao clique no checkout.

### O que manter do "Redesigned website"
- Headline gigante condensada em caixa alta, em 2 linhas: **linha 1 branca, linha 2 inteira vermelha** (a linha inteira, nunca uma palavra solta).
- Palavra gigante em outline atrás da foto: **"FC 27"**.
- Foto à direita e texto à esquerda, alinhado à esquerda.
- Logo-caixa vermelha ("EVOLUTION" dentro de um retângulo vermelho).
- Grid de 6 cards ao lado de um bloco de texto; mockup do produto com lista de checks.
- Glow vermelho vazando das bordas sobre preto puro.

### O que trocar (e por quê)
| Na referência | Aqui | Por quê |
|---|---|---|
| Faixa de 4 números com ícone | **Scorebug de transmissão**: `ILLAN EVOLUTION 22 · NÍVEIS 5 · SEMANAS 4` no formato do placar do FC (blocos retos, nome em caixa, número em destaque, "relógio" à direita mostrando `90+2'`) | Número grande com legenda pequena é o padrão de qualquer landing. O placar é o objeto que esse público lê todo dia. |
| Títulos de seção em serif | **Uma família condensada esportiva** para tudo que é display | Serif chique é visual de "mentor de negócios". Aqui o mundo é estádio e transmissão. |
| Eyebrow vermelho em caixa alta acima de toda seção | **Minuto da partida** à esquerda de cada seção (`00'`, `15'`, `30'`, `45'`, `60'`, `75'`, `90'`, `90+2'`), em vermelho, na fonte display | Encaixa no conceito, e aqui a numeração é uma sequência real: o scroll é o tempo de jogo. |
| CTA com seta → | CTA com o **glifo ✕ do controle** num círculo à esquerda do texto: `(✕) QUERO PARAR DE TILTAR` | "Aperta X pra confirmar" é a linguagem do jogador. A seta é o padrão de template. |
| Cards com o mesmo raio | **Cantos cortados em diagonal** (`clip-path`) como cacos de vidro: cards grandes com 1 canto cortado, botões com 2 cantos opostos, nenhum `border-radius` | Ecoa o `background-1.png`. A forma vem do material da marca, não de um kit. |
| Mini-benefícios com ícone em círculo | **3 "chips" de tática** no estilo das instruções do FC (barrinha vermelha à esquerda + texto) | Mesmo motivo do scorebug. |

### Tokens
Cores tiradas do `background-1.png` e da `section-1.png`:
```css
:root{
  --preto:     #000000;   /* base: preto de verdade, como o vidro escuro do fundo */
  --vinho:     #1a0406;   /* superfícies e cards: preto puxado pro sangue do vidro */
  --vermelho:  #e10600;   /* CTA, linha 2 da headline, minuto da partida */
  --brasa:     #ff3d2e;   /* hover e reflexo do vidro, uso mínimo */
  --sangue:    #5c0008;   /* bordas, cortes, gradientes */
  --osso:      #f3ede8;   /* texto principal */
  --cinza:     #9b908c;   /* texto secundário (contraste ≥ 4.5:1 sobre --preto) */
  --ouro:      #e8b84a;   /* só no troféu e no selo de campeão */
}
```
**Tipografia** (Google Fonts, só duas famílias):
- **Big Shoulders Display** (800–900): headlines, scorebug, minutos e números das aulas. É condensada e nasceu de sinalização urbana/estádio. Headline do hero com `clamp(56px, 9vw, 132px)`, `line-height: .88`, `letter-spacing: -.01em`.
- **Barlow** (400/600) e **Barlow Semi Condensed** (600) em botões e chips: corpo de 17–18px, `line-height: 1.55`, linhas com no máximo 70 caracteres.
- Escala: 14 / 17 / 22 / 30 / 44 / 64 / 132. **Não use** Inter, Anton, Bebas, Fraunces nem Playfair.
- Caixa alta só no display (headline, scorebug, CTA). Texto corrido e títulos de card em sentence case.

### Layout (wireframes)
```
HERO (desktop)                                   HERO (mobile)
┌────────────────────────────────────────────┐   ┌──────────────┐
│ ILLAN[EVOLUTION]     links      (✕) ENTRAR │   │ logo     ☰  │
│ 00'                                        │   │ [vídeo 9:16 ]│
│ PARE DE PERDER NA WL        ░FC 27░ [Illan │   │ [  Illan    ]│
│ COMECE A JOGAR NO MANUAL     + vídeo, terço│   │ 00'          │
│ subtítulo (≤ 2 linhas)       direito ]     │   │ PARE DE...   │
│ ▌chip ▌chip ▌chip                          │   │ COMECE...    │
│ (✕) QUERO PARAR DE TILTAR                  │   │ (✕) CTA 100% │
├────────────────────────────────────────────┤   ├──────────────┤
│▐ILLAN EVOLUTION│22 AULAS│5 NÍVEIS│4 SEM│90+2'▌│   │scorebug 2×2  │
└────────────────────────────────────────────┘   └──────────────┘

SEÇÃO PADRÃO: minuto na margem esquerda, conteúdo alinhado à esquerda
┌───┬────────────────────────────────────────┐
│15'│ Título condensado                      │
│   │ texto ≤ 70 caracteres por linha        │
│   │ [conteúdo da seção]                    │
└───┴────────────────────────────────────────┘
```
- Alinhamento à **esquerda** em quase tudo. **Centralizado** só no card de oferta (90') e no CTA final (90+2').
- Grid de 12 colunas, com máximo de 1240px e gutter de 16px no mobile.

### Movimento (pouco, e cada um com função)
1. **Único momento orquestrado:** o carregamento do hero. O vídeo entra, as duas linhas da headline sobem com um corte diagonal (máscara em forma de caco), e o scorebug aparece com o número "rolando" uma vez. É tudo. As outras seções **não** têm fade-in de entrada.
2. **Relógio da partida** no header, ligado ao scroll (`00'` → `90+2'`). Responde a uma ação do usuário, então pode.
3. **Tilt 3D** só nas 6 cartas de jogador (é o gesto do FUT). Os outros cards não têm hover animado, só mudança de borda no foco.
4. Accordion dos níveis e FAQ com abrir/fechar suave (responde a clique).
5. `prefers-reduced-motion`: tudo estático, poster no lugar do vídeo.

### Onde gastar a ousadia
**No hero.** Vídeo + headline gigante + "FC 27" em outline + scorebug. Daí para baixo, a página fica disciplinada: preto, texto osso, vermelho só em CTA, minuto e corte. Antes de entregar, siga o conselho da Chanel: tire **um** enfeite.

### Checagem final de design
- [ ] Nenhuma palavra solta colorida em headline (só a linha 2 inteira em vermelho).
- [ ] Nenhuma seta → em botão ou link.
- [ ] Nenhum eyebrow em caixa alta além dos minutos da partida.
- [ ] Números (01, 02...) só onde a ordem é real: aulas, níveis, semanas, minutos.
- [ ] Foco de teclado visível (outline `--brasa` de 2px com offset).
- [ ] Contraste AA em todo texto sobre o vídeo (gradiente preto da esquerda para a direita).

---

## 3. Seções (nesta ordem)

### 3.1 Header fixo
Logo em texto, "ILLAN" em branco + "EVOLUTION" em caixa vermelha (como o "THE ART OF YOUTUBE" da referência). Links âncora: Método · O que mudou no FC 27 · Aulas · Alunos · Depoimentos · FAQ. No centro-direita fica o **relógio da partida** (`00'` → `90+2'`, ligado ao scroll). À direita, o botão vermelho com glifo ✕: **"ENTRAR"**. No mobile vira hambúrguer, e o CTA continua visível.

### 3.2 Hero, com a `section-1.png` e o vídeo do Higgsfield
- Desktop: texto à esquerda e o Illan à direita (como o homem de braços cruzados na referência). Mobile: imagem em cima, texto embaixo.
- O fundo do hero é o **vídeo gerado no Higgsfield** (seção 4), com a `section-1.png` como `poster`.
- Atrás do Illan, a palavra "FC 27" gigante em outline.
- Headline (2 linhas, Anton): linha 1 branca, linha 2 vermelha. Gere 3 opções com a skill e escolha a melhor. Direção:
  > **PARE DE PERDER NA WL**
  > **COMECE A JOGAR NO MANUAL**
- Subtítulo: o FC 27 tirou a defesa da IA e passou para a sua mão; o método de um campeão sul-americano te ensina a jogar assim.
- 3 chips de tática (barrinha vermelha à esquerda, sem ícone): **Defesa manual**, **Fim do tilt**, **Weekend League planejada**.
- CTA principal + microlinha de risco + avatares com "Alunos de [PREENCHER] países/estados já treinam com o método".

### 3.3 Scorebug (colado na base do hero)
Placar no formato da transmissão do FC: blocos retos encostados, fundo `--vinho`, o nome do time num bloco vermelho e os números em Big Shoulders. Só números verdadeiros:
`ILLAN EVOLUTION` | `22` AULAS | `5` NÍVEIS | `+2` EXTRAS | `4` SEMANAS | relógio `90+2'`
Logo abaixo, uma linha menor com troféu dourado: **Campeão Sul-Americano · Cash Cup Dezembro**.
Os números rolam uma vez, junto com a entrada do hero (é o mesmo momento orquestrado). No mobile, vira grade 2×3.

### 3.4 Dor: "Por que você trava"
Fundo `background-1.png` escurecido. Lista de sintomas tirada do Capítulo A do PDF (toma gol nos últimos 10 minutos, contra-ataque com zagueiros que "somem", monta time pelo overall, tilta depois de um gol...). Fecho em destaque: **"Marcou três ou mais? O problema não é talento. É método."** + CTA.

### 3.5 "O FC 27 mudou. Você mudou junto?" (layout 2 colunas + 6 cards)
Esquerda: minuto da partida, título condensado ("O FC 27 tirou a defesa da IA"), texto e botão secundário (contorno vermelho, cantos cortados) "VER AS 22 AULAS".
Direita: **6 cards** com as mudanças do Capítulo B (bote automático da IA zerado, pressão inútil no terço defensivo, passe que vai onde você mira, cobertura 100% manual, escanteio manual com Evasão, atributo > PlayStyle). Cada card tem um canto cortado, um mini "antes → depois" (FC 26 riscado em cinza e FC 27 em osso), título em sentence case e uma linha de "o que isso significa pra você". Sem ícone genérico e sem número (não é sequência).

### 3.6 Quem é o Illan (autoridade)
- Esquerda: `illan-1.png` sobre glow vermelho.
- Direita: minuto da partida, título condensado "Do controle ao título", um parágrafo curto na voz dele (gratidão, trabalho, "voltar ao topo") e a lista de conquistas tirada do `infos.png`, em formato de linha de súmula (competição à esquerda, colocação à direita em Big Shoulders):
  - **Campeão Sul-Americano** (Cash Cup Dezembro), com troféu em SVG dourado (nada de emoji como ícone)
  - **Top 8 Pro Open**
  - **Top 8 Cash Cup**
  - **Top 17 e-Libertadores**
- **Post de campeão:** recorte o post de `img/00-raw/campeao.png` e tire o navegador, a legenda e a lateral do Instagram. A arte fica aproximadamente em **x 370→1063, y 132→998** (confira visualmente e ajuste). Depois melhore a imagem: upscale com o Higgsfield (`upscale_image`) ou, no mínimo, nitidez + leve contraste com Pillow. Salve como `site/assets/campeao.webp` e mostre em formato de card 4:5, com borda vermelha fina, leve rotação (-2°) e um selo dourado "CAMPEÕES".
- CTA: **"QUERO APRENDER COM UM CAMPEÃO"**.

### 3.7 O que tem dentro (produto)
- Mockup do guia/curso com glow vermelho (pode ser uma capa gerada em CSS com "ILLAN EVOLUTION · EA FC 27" ou uma imagem do Higgsfield) + botão de play.
- **Accordion dos 5 níveis**, com as aulas exatas do PDF:
  - **Antes de tudo:** A Por que você trava · B FC 26 → FC 27 · C O novo competitivo do Ultimate Team
  - **Nível 1, Pré-jogo:** 01 a 05
  - **Nível 2, Sem a bola:** 06 a 09 (destaque: "o nível mais importante do curso")
  - **Nível 3, Com a bola:** 10 a 15
  - **Nível 4, Momentos decisivos:** 16 a 18
  - **Nível 5, Alta performance:** 19 a 22
  - **Extras:** O terror da Weekend League · Rivals sem estresse · Plano de 4 semanas + diário de partidas
- Lista de checks vermelhos com o que o aluno leva.

### 3.8 Plano de 4 semanas (timeline)
Quatro etapas horizontais (verticais no mobile), tiradas do PDF: Defesa manual → Construção → Finalização e bola parada → Simulação de WL, cada uma com sua meta (ex.: "menos de 1,5 gol sofrido por jogo no Rivals"). CTA: **"COMEÇAR O PLANO DE 4 SEMANAS"**.

### 3.9 Jogadores acompanhados pelo Illan (6 cards)
Título: "Quem joga com o Illan". **6 cards** em estilo carta de FUT (proporção ~3:4, borda vermelha, brilho no hover com tilt 3D leve). Cada card tem:
- foto (`[PREENCHER: foto-jogador-N.webp]`), com placeholder de silhueta escura com gradiente vermelho até a foto chegar
- nick/@ (`[PREENCHER]`)
- conquista ou divisão (`[PREENCHER]`)

Deixe os 6 dados num array no `main.js` (`const players = [...]`), para trocar foto e texto num lugar só. Grid: 3×2 no desktop, 2×3 no tablet, carrossel com scroll-snap no mobile.

### 3.10 Depoimentos (perto do fim)
Título: **"Aluno de verdade. Print de verdade."**
Use os **12 prints** de `img/03-depoimentos/` (10 capturas + 2 fotos do WhatsApp) como prova real, sem reescrever o texto:
- Layout masonry com 3 colunas no desktop e carrossel arrastável no mobile.
- Cada print fica dentro de uma moldura de celular escura, com borda vermelha sutil. Clique abre um lightbox.
- Por cima, uma frase-gancho extraída do próprio print (ex.: "Seu trabalho é muito foda", "Fácil de entender"). Leia cada imagem e extraia frases reais. Não invente.
- Segunda linha de marquee com trechos dos comentários do post de campeão (phzinchaves, coach_rafa10, caiofleischmann...).

### 3.11 Oferta + garantia
Card central grande com glow: nome do curso, o que inclui (checks), preço `[PREENCHER: de R$ X por R$ Y / 12x de ...]`, CTA gigante **"ENTRAR NO ILLAN EVOLUTION"**, selos (pagamento seguro, acesso imediato) e o bloco de garantia `[PREENCHER: dias]`. Link do checkout: `[PREENCHER: URL]`.

### 3.12 FAQ (accordion)
6 a 8 perguntas reais de jogador: "Serve pra quem é Div 8?", "Preciso de time caro?", "Funciona no PS5/Xbox/PC?", "Quanto tempo por dia?", "E se a EA mudar o jogo?" (responda com o fato de que a EA não fará grandes mudanças logo após o lançamento), "Tem boost/compra de moedas?" (não, nunca). Escreva com a skill.

### 3.13 CTA final + footer
Fundo `background-1.png` com o Illan e uma headline curta + CTA. No footer: @coach__illan, link do Instagram, linktr.ee/CoachEAFC e o **aviso legal**: "EA SPORTS FC é marca registrada da Electronic Arts Inc. Este curso é independente e não possui afiliação, patrocínio ou endosso da Electronic Arts."

### CTA flutuante no mobile
Barra fixa no rodapé com o botão vermelho, que aparece depois do hero e some na seção de oferta.

---

## 4. Vídeo do hero com o Higgsfield (MCP)

Objetivo: um loop curto e cinematográfico para o fundo do hero, feito a partir da `section-1.png`.

1. **Upload:** envie `img/02-fundos/section-1.png` com `media_upload`.
2. **Enquadramento:** a imagem original é vertical (1856×2304). Para o desktop, gere uma versão **16:9** com `outpaint_image`/`reframe`, mantendo o Illan no **terço direito** e estendendo o fundo de vidro estilhaçado vermelho e preto à esquerda, onde vai ficar o texto. A área da esquerda precisa ser **escura e limpa**, para dar leitura à headline. Para o mobile, use a vertical original (ou 9:16).
3. **Vídeo:** `generate_video` (image-to-video) a partir de cada enquadramento. Antes, chame `get_workflow_instructions` e `models_explore` para escolher o melhor modelo. Prompt de movimento sugerido:
   > Slow cinematic push-in. The white PS5 controller floats and slowly rotates a few degrees above his open palm, hovering gently. Red and black glass shards in the background drift and parallax slowly, with subtle red light flickers and floating dust particles. He keeps a confident, natural smile with a subtle blink. Camera locked, very slow dolly in. Dark, high-contrast, red rim light. No text, no morphing face, no extra hands.
   Duração de 5 a 8s, pensada para **loop**: início e fim parecidos, sem corte brusco.
4. Escolha o melhor take (gere 2 variações em batch), faça `upscale_video` se precisar e baixe para `site/assets/hero-16x9.mp4` e `hero-9x16.mp4`. Gere também uma versão `.webm`.
5. No HTML: `<video autoplay muted loop playsinline preload="metadata" poster="assets/section-1.webp">` com `<source media>` para mobile/desktop. Coloque um overlay em gradiente (preto da esquerda → transparente) por cima do vídeo, para garantir o contraste do texto.
6. Se o rosto deformar ou o controle "derreter", descarte o take e gere de novo, com menos movimento.

---

## 5. Copy: regras rápidas (detalhes na skill `copy-fc27`)
- Português do Brasil, segunda pessoa, vocabulário de jogador (WL, Rivals, tiltar, jockey, bote, "script").
- Todo CTA tem verbo + resultado. Sem "Saiba mais" ou "Clique aqui".
- Pelo menos **6 CTAs** ao longo da página: hero, dor, autoridade, plano, oferta, final, além da barra mobile.
- Nada da lista proibida da skill ("desbloqueie", "jornada", "potencial máximo"...).
- Não prometa resultado garantido (divisão, vitórias).

---

## 6. Entrega
1. Site funcionando em `site/`. Sirva localmente (`npx serve site` ou `python -m http.server`) e tire screenshots em 1440px, 768px e 390px.
2. Confira: nenhum scroll horizontal no mobile, vídeo com fallback, todos os CTAs apontando para a mesma variável `CHECKOUT_URL` no JS.
3. Rode o checklist pré-entrega da `ui-ux-pro-max` (`.claude/skills/ui-ux-pro-max/references/pro-rules.md`) e a "Checagem final de design" da seção 2. Corrija o que falhar antes de entregar.
4. No final, liste:
   - todos os `[PREENCHER]` que ficaram (preço, garantia, checkout, fotos e nomes dos 6 jogadores, contagem de alunos);
   - os prompts e os IDs das gerações do Higgsfield usadas;
   - as 3 opções de headline que você considerou.
