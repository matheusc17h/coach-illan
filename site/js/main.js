/* =========================================================
   Illan Evolution · main.js
   ========================================================= */

// Todos os CTAs de compra usam esta URL. Enquanto estiver vazia, os botões levam à seção de oferta.
const CHECKOUT_URL = ''; // [PREENCHER: URL do checkout]

// Pixel do Meta (só números, ex.: '123456789012345'). Vazio = nenhum pixel carrega.
// A compra (Purchase) quem dispara é a Kiwify: conecte o mesmo pixel no produto lá.
const META_PIXEL_ID = ''; // [PREENCHER: ID do pixel do Meta]

// Jogadores de campeonato que já tiveram o Illan como coach. Troque foto e texto só aqui.
// foto: PNG/WebP com fundo transparente dentro de site/ (ex.: 'assets/jogadores/nick.webp'). Vazio = silhueta.
// pos: posição horizontal do recorte da foto (0% = esquerda). retrato: true pra foto em pé (mostra da cabeça ao peito). inteira: true pra foto pequena de meio corpo (aparece inteira, sem zoom). titulos: um por linha.
const players = [
  { foto: 'assets/jogadores/mhenrique7.webp', pos: '18%', nick: '@mhenrique7_', nome: 'Matheus Henrique',
    titulos: ['Campeão Sul-Americano (EA FC 26)', 'Top 2 e-Libertadores (PY)', 'Top 2 Qualify 3'] },
  { foto: 'assets/jogadores/jogador-2.webp', retrato: true, nick: '@toniotti28',
    titulos: ['Pro player profissional de EA FC', 'Top 3 SA Qualify 2 (FIFA 23)', '#14 no ranking FIFA.gg SA (FIFA 23)'] },
  { foto: 'assets/jogadores/ze-rafael.webp', inteira: true, nick: '@ze_rafael04', nome: 'Zé Rafael',
    titulos: ['Jogador profissional de EA FC', 'Top 17 e-Libertadores 26 (BR)', 'Top 17 e-Nations (BR)', 'Campeão nacional Phygital 2025'] },
];

// Prints reais dos alunos. "hook" é um trecho copiado do próprio print, com a grafia original.
// destaque: true = arte do Illan com vários prints, mostrada grande no topo da seção (e primeira no lightbox).
const depoimentos = [
  // primeira do carrossel (é destaque e vem antes das outras destaques)
  { img: 'dep-13', destaque: true, w: 720, h: 1273, hook: 'Sai de um nível bem casual para um nível bem legal', alt: 'Arte "Feedback dos alunos EA FC 27" com print de WhatsApp do aluno Gabriel: "sai de um nível bem casual para um nível bem legal", venceu um jogador que estava 64-0 e fechou a Weekend League 10-1, com print da vitória por 5 a 6.' },
  { img: 'dep-01', w: 328, h: 541, hook: 'Seu trabalho é muito foda', alt: 'Conversa de WhatsApp. O aluno escreve: "Seu trabalho é muito foda", "Fácil de entender", "Quero ficar bom nesse joguinho".' },
  { img: 'dep-06', w: 329, h: 507, hook: 'Tava marcando igual uma porta', alt: 'Conversa de WhatsApp. O aluno escreve: "Tava marcando igual uma porta, agora tomo 1 gol max por partida, melhorei bastante nisso" e "parece até outra pessoa, principalmente a defesa".' },
  { img: 'dep-07', w: 178, h: 439, hook: 'Consegui subir da div 2 pra elite', alt: 'Print com a tela de Nova Divisão do jogo e a mensagem: "Pô teu coach é brabo! Melhora imediata na minha gameplay. Consegui subir da div 2 pra elite sem perder nenhum jogo e ganhando de dois pro players no meio do caminho."' },
  { img: 'dep-03', w: 361, h: 251, hook: 'Suas aulas mudaram minha forma de enxergar o jogo', alt: 'Mensagem do aluno: "Mano, nem tenho palavras pra agradecer o trabalho que fez comigo, suas aulas mudaram minha forma de enxergar o jogo, nunca pensei que ia consegui bater de frente com jogadores de alto nivel igual to hoje."' },
  { img: 'dep-08', w: 263, h: 340, hook: 'Mudar a gameplay da água pro vinho', alt: 'Print com a tela de Nova Divisão e a mensagem: "Quando te conheci estava na 2 divisão sem perpectiva nehuma e hoje cheguei no objetivo que era a ELITE. Você é fera e me ajudou a mudar a gameplay da água pro vinho."' },
  { img: 'dep-05', w: 348, h: 210, hook: 'É difícil eu perde uma bola', alt: 'Mensagem do aluno: "Cara já tive uma diferença grande nessa primeira aula, Eu tava marcando muito mau, depois dessas suas dicas é difícil eu perde uma bola, até me animei pra continuar jogando."' },
  { img: 'dep-10', w: 323, h: 542, hook: 'Veio as 10 vitória', alt: 'Conversa de WhatsApp. O aluno escreve: "Mano boa noite, veio as 10 vitória heim kkk suada, pra quem pegava só 8 máximo" e "Cara foi top; dei uma alinhada na marcação".' },
  { img: 'dep-02', w: 335, h: 450, hook: 'Tô batendo em vários', alt: 'Conversa de WhatsApp com print de vitória por 3 a 1. O aluno escreve: "Caralho illan tu é muito foda" e "Tô batendo em vários".' },
  { img: 'dep-09', w: 309, h: 479, hook: 'Marcação fechadinha', alt: 'Conversa de WhatsApp com vídeo de partida. O aluno escreve: "To sentindo a marcação mais encima", "To quase na Elite dnv" e "Marcação fechadinha, valeu msm man".' },
  { img: 'dep-04', w: 342, h: 354, hook: 'Sem suas dicas n ia avançar nesse jogo nunca', alt: 'Conversa de WhatsApp. O aluno escreve: "Valeu mano", "Sem suas dicas n ia avançar nesse jogo nunca", "Valeu demais mesmo".' },
  { img: 'dep-11', destaque: true, w: 720, h: 1280, hook: 'Melhorei muito parece até outra pessoa', alt: 'Arte do Illan com três prints de alunos: subida da 2ª divisão para a Elite, agradecimento pelas aulas e "tava marcando igual uma porta, agora tomo 1 gol max por partida".' },
  { img: 'dep-12', destaque: true, w: 900, h: 1125, hook: 'Pô teu coach é brabo!', alt: 'Arte "Feedback dos meus alunos" com três prints: subida da div 2 pra elite, "suas aulas mudaram minha forma de enxergar o jogo" e "depois dessas suas dicas é difícil eu perde uma bola".' },
];

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- CTAs → checkout ---------- */
if (CHECKOUT_URL) $$('.js-cta').forEach(a => { a.href = CHECKOUT_URL; });

/* ---------- pixel do Meta ----------
   PageView na visita; CliqueCompra em qualquer botão de compra; AreaDoAluno no link de login.
   Quem dispara AreaDoAluno quase sempre já é aluno: use esse público como exclusão nas campanhas.
   (CliqueCompra é evento próprio pra não duplicar o InitiateCheckout que a Kiwify já dispara no checkout.) */
if (META_PIXEL_ID) {
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
  $$('.js-cta').forEach(a => a.addEventListener('click', () => fbq('trackCustom', 'CliqueCompra', { botao: a.textContent.trim() })));
  $$('.js-aluno').forEach(a => a.addEventListener('click', () => fbq('trackCustom', 'AreaDoAluno')));
}

/* ---------- ano no rodapé ---------- */
$('#ano').textContent = new Date().getFullYear();

/* ---------- header ganha fundo depois de rolar ---------- */
{
  const header = $('.header');
  const sync = () => header.classList.toggle('is-scrolled', scrollY > 12);
  sync();
  addEventListener('scroll', sync, { passive: true });
}

/* ---------- menu mobile ---------- */
{
  const burger = $('.burger');
  const nav = $('#menu');
  const set = open => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    $('.header').classList.toggle('is-scrolled', open || scrollY > 12);
  };
  burger.addEventListener('click', () => set(burger.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { set(false); burger.focus(); }
  });
  // Se a tela crescer até o layout desktop com o menu aberto, fecha.
  matchMedia('(min-width: 1100px)').addEventListener('change', e => { if (e.matches) set(false); });
}

/* ---------- cartas dos jogadores ---------- */
{
  const grid = $('#fut-grid');
  const silhouette = '<svg viewBox="0 0 100 110" aria-hidden="true"><circle cx="50" cy="32" r="22" fill="currentColor"/><path d="M8 110c0-26 19-44 42-44s42 18 42 44z" fill="currentColor"/></svg>';
  const fill = t => (t.startsWith('[') ? `<mark class="fill">${t}</mark>` : t);
  grid.innerHTML = players.map(p => `
    <li>
      <article class="fut-card" tabindex="0" aria-label="${p.nick}${p.nome ? ` (${p.nome})` : ''}, já teve o Illan como coach. ${p.titulos.join('. ')}">
        <div class="fut-card__media">
          ${p.foto
            ? `<img class="fut-card__img${p.retrato ? ' fut-card__img--retrato' : ''}${p.inteira ? ' fut-card__img--inteira' : ''}" src="${p.foto}" alt="" loading="lazy" decoding="async" style="--pos:${p.pos || '50%'}">`
            : `<span class="fut-card__ph">${silhouette}</span>`}
        </div>
        <div class="fut-card__body">
          <p class="fut-card__coach">Illan foi coach dele</p>
          <h3 class="fut-card__nick">${fill(p.nick)}</h3>
          <ul class="fut-card__info">${p.titulos.map(t => `<li>${fill(t)}</li>`).join('')}</ul>
        </div>
      </article>
    </li>`).join('');

  // Tilt 3D leve, só com mouse e sem movimento reduzido.
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  $$('.fut-card', grid).forEach(card => {
    card.addEventListener('pointermove', e => {
      if (!fine.matches || reduced.matches) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.classList.add('is-tilting');
      card.style.setProperty('--ry', `${(x - .5) * 12}deg`);
      card.style.setProperty('--rx', `${(.5 - y) * 12}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

/* ---------- depoimentos + lightbox ---------- */
{
  // destaques (as artes do Illan) primeiro: são os primeiros cards do carrossel e do lightbox
  depoimentos.sort((a, b) => !!b.destaque - !!a.destaque);
  const n = depoimentos.length;
  const box = $('#lightbox');
  const img = $('#lightbox-img');
  const cap = $('#lightbox-cap');

  /* Carrossel em profundidade: DepthCarousel do React Bits portado pra JS puro (GSAP já vem da CDN).
     O print da frente fica inteiro; os seguintes recuam em fila pra direita, escurecendo e desfocando.
     Arrastar, setas, pontos e teclado (← →) trocam o print; tocar no da frente abre o lightbox.
     Roda sozinho e para com o mouse em cima, com foco dentro, fora da tela ou logo depois de mexer. */
  const root = $('#deps-depth');
  const stage = $('.depth__stage', root);
  const hookEl = $('#deps-hook');
  const dotsEl = $('#deps-dots');
  const wide = matchMedia('(min-width: 768px)');
  const C = { depth: 220, tilt: 22, visible: 4, falloff: .2, blur: 6, duration: .7, delay: 3200 };
  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
  const wrapD = d => { d = ((d % n) + n) % n; return d > n / 2 ? d - n : d; };
  stage.innerHTML = depoimentos.map((d, i) => `
    <div class="depth__card" data-i="${i}" aria-roledescription="slide" aria-label="${i + 1} de ${n}">
      <img src="assets/depoimentos/${d.img}.webp" width="${d.w}" height="${d.h}" alt="${d.alt.replace(/"/g, '&quot;')}" loading="${i < 4 ? 'eager' : 'lazy'}" decoding="async" draggable="false">
      <span class="depth__tint"></span>
    </div>`).join('');
  dotsEl.innerHTML = depoimentos.map((d, i) => `<button class="depth__dot" type="button" role="tab" data-i="${i}" aria-label="Ver print ${i + 1}"></button>`).join('');
  const cards = $$('.depth__card', stage);
  const tints = $$('.depth__tint', stage);
  const dots = $$('.depth__dot', dotsEl);
  let pos = 0, focus = -1, scale = 1, tween = null, drag = null, dragged = false, wheelT = 0;
  let hovered = false, focusedIn = false, onScreen = false, touchedAt = 0;
  const spread = () => (wide.matches ? 90 : 46);
  const stepPx = () => Math.max(cards[0].offsetWidth * .55 * scale, 40);

  const layout = p => {
    const sp = spread();
    cards.forEach((el, i) => {
      const d = wrapD(i - p);
      const back = Math.max(0, d);
      const shown = Math.abs(d) <= C.visible + .5;
      const op = !shown ? 0 : d < 0 ? Math.max(0, 1 + d) : 1;
      el.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${(sp * d).toFixed(2)}px) translateZ(${(-C.depth * d).toFixed(2)}px) rotateY(${(C.tilt * clamp(d, 0, 1)).toFixed(3)}deg)`;
      el.style.opacity = op.toFixed(3);
      el.style.filter = `brightness(${Math.max(.15, 1 - back * C.falloff).toFixed(3)}) blur(${Math.min(C.blur, back / C.visible * C.blur).toFixed(2)}px)`;
      el.style.zIndex = String(Math.round(2000 - d * 20));
      el.style.pointerEvents = shown && op > .05 ? 'auto' : 'none';
      tints[i].style.opacity = clamp(back * C.falloff * 1.25, 0, .86).toFixed(3);
    });
  };
  const select = i => {
    focus = i;
    hookEl.textContent = depoimentos[i].hook;
    dots.forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
    cards.forEach((c, k) => c.setAttribute('aria-hidden', String(k !== i)));
  };
  const goTo = (raw, animate = true) => {
    const idx = ((raw % n) + n) % n;
    const target = pos + wrapD(idx - pos);
    const settle = () => { pos = ((pos % n) + n) % n; layout(pos); };
    if (tween) tween.kill();
    if (!animate || reduced.matches || !window.gsap) { pos = target; settle(); }
    else {
      const proxy = { p: pos };
      tween = gsap.to(proxy, { p: target, duration: C.duration, ease: 'power3.out', onUpdate: () => { pos = proxy.p; layout(pos); }, onComplete: settle });
    }
    if (idx !== focus) select(idx);
  };
  const touch = () => { touchedAt = performance.now(); };

  const openBox = i => { show(i); box.showModal(); };
  stage.addEventListener('click', e => {
    const c = e.target.closest('.depth__card');
    if (!c || dragged) return;
    const i = +c.dataset.i;
    if (i === focus) openBox(i); else goTo(i);
  });
  $$('[data-depth]', root).forEach(b => b.addEventListener('click', () => { touch(); goTo(focus + +b.dataset.depth); }));
  dotsEl.addEventListener('click', e => {
    const b = e.target.closest('.depth__dot');
    if (b) { touch(); goTo(+b.dataset.i); }
  });
  root.addEventListener('keydown', e => {
    if (e.target !== root) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); touch(); goTo(focus + (e.key === 'ArrowLeft' ? -1 : 1)); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBox(focus); }
  });

  // arrastar (mouse ou dedo); rolar a página na vertical continua livre (touch-action: pan-y)
  root.addEventListener('pointerdown', e => {
    if (e.button > 0 || e.target.closest('button')) return;
    touch();
    drag = { x: e.clientX, start: pos, lastX: e.clientX, lastT: performance.now(), v: 0, moved: false, id: e.pointerId };
  });
  root.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 6) {
      drag.moved = true;
      if (tween) tween.kill();
      root.setPointerCapture(drag.id);
    }
    if (!drag.moved) return;
    const now = performance.now();
    drag.v = (e.clientX - drag.lastX) / Math.max(now - drag.lastT, 1);
    drag.lastX = e.clientX;
    drag.lastT = now;
    pos = drag.start - dx / stepPx();
    layout(pos);
  });
  const endDrag = () => {
    const d = drag;
    drag = null;
    if (!d || !d.moved) return;
    touch();
    dragged = true;
    setTimeout(() => { dragged = false; }, 0);
    goTo(Math.round(pos - d.v * 180 / stepPx()));
  };
  root.addEventListener('pointerup', endDrag);
  root.addEventListener('pointercancel', endDrag);
  // só a rolagem horizontal (trackpad) mexe no carrossel; a vertical rola a página normalmente
  root.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    touch();
    if (tween) tween.kill();
    pos += clamp((e.deltaMode === 1 ? e.deltaX * 24 : e.deltaX) / (cards[0].offsetWidth * .9), -.6, .6);
    layout(pos);
    clearTimeout(wheelT);
    wheelT = setTimeout(() => goTo(Math.round(pos)), 130);
  }, { passive: false });

  root.addEventListener('mouseenter', () => { hovered = true; });
  root.addEventListener('mouseleave', () => { hovered = false; });
  root.addEventListener('focusin', () => { focusedIn = true; });
  root.addEventListener('focusout', () => { focusedIn = false; });
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }).observe(root);
  setInterval(() => {
    const idle = performance.now() - touchedAt > 6000;
    if (idle && onScreen && !hovered && !focusedIn && !drag && !box.open && !document.hidden && !reduced.matches) goTo(focus + 1);
  }, C.delay);

  new ResizeObserver(([e]) => {
    scale = clamp(e.contentRect.width / (cards[0].offsetWidth + spread() * 2 + 120), .4, 1);
    layout(pos);
  }).observe(root);
  select(0);
  layout(0);

  let cur = 0;
  const show = i => {
    cur = (i + n) % n;
    const d = depoimentos[cur];
    img.src = `assets/depoimentos/${d.img}.webp`;
    img.width = d.w; img.height = d.h;
    img.alt = d.alt;
    cap.textContent = `Print ${cur + 1} de ${n}`;
  };
  // fechando o lightbox, o carrossel para no último print visto
  box.addEventListener('close', () => { touch(); goTo(cur, false); root.focus({ preventScroll: true }); });
  $('.lightbox__close').addEventListener('click', () => box.close());
  $('.lightbox__prev').addEventListener('click', () => show(cur - 1));
  $('.lightbox__next').addEventListener('click', () => show(cur + 1));
  box.addEventListener('click', e => { if (e.target === box) box.close(); });
  box.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
}

/* ---------- capa do guia e post do título: inclinam seguindo o mouse ----------
   TiltedCard do React Bits portado pra JS puro. As molas imitam as do motion (rigidez, amortecimento, massa);
   a etiqueta segue o cursor e balança com a velocidade vertical. Só com mouse e com movimento permitido. */
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  $$('.tilt').forEach(fig => {
    const inner = $('.tilt__inner', fig);
    const tip = $('.tilt__tip', fig);
    const AMP = 12, SCALE = 1.06;
    const spring = (x, k, c, m) => ({ x, t: x, v: 0, k, c, m });
    const rx = spring(0, 100, 30, 2), ry = spring(0, 100, 30, 2), sc = spring(1, 100, 30, 2);
    const op = spring(0, 100, 10, 1), rot = spring(0, 350, 30, 1);
    const all = [rx, ry, sc, op, rot];
    let raf = 0, last = 0, lastY = 0, tx = 0, ty = 0;
    const paint = () => {
      inner.style.transform = `rotateX(${rx.x.toFixed(3)}deg) rotateY(${ry.x.toFixed(3)}deg) scale(${sc.x.toFixed(4)})`;
      tip.style.opacity = Math.min(1, Math.max(0, op.x)).toFixed(3);
      tip.style.transform = `translate(${tx + 14}px, ${ty + 14}px) rotate(${rot.x.toFixed(2)}deg)`;
    };
    const tick = now => {
      const dt = Math.min((now - last) / 1000, .05);
      last = now;
      let moving = false;
      all.forEach(s => {
        for (let h = dt; h > 0; h -= .004) {
          const st = Math.min(h, .004);
          s.v += (-s.k * (s.x - s.t) - s.c * s.v) / s.m * st;
          s.x += s.v * st;
        }
        if (Math.abs(s.x - s.t) > .0005 || Math.abs(s.v) > .0005) moving = true;
        else { s.x = s.t; s.v = 0; }
      });
      paint();
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    fig.addEventListener('mouseenter', e => {
      if (reduced.matches) return;
      sc.t = SCALE; op.t = 1;
      lastY = e.clientY - fig.getBoundingClientRect().top - fig.offsetHeight / 2;
      kick();
    });
    fig.addEventListener('mousemove', e => {
      if (reduced.matches) return;
      const r = fig.getBoundingClientRect();
      const ox = e.clientX - r.left - r.width / 2;
      const oy = e.clientY - r.top - r.height / 2;
      rx.t = (oy / (r.height / 2)) * -AMP;
      ry.t = (ox / (r.width / 2)) * AMP;
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      rot.t = Math.max(-12, Math.min(12, -(oy - lastY) * .6));
      lastY = oy;
      kick();
    });
    fig.addEventListener('mouseleave', () => {
      rx.t = ry.t = rot.t = op.t = 0; sc.t = 1;
      kick();
    });
  });
}

/* ---------- marquee: para fora da tela ---------- */
{
  const m = $('.marquee');
  // fora da tela a faixa para de andar: menos trabalho pro navegador durante a rolagem
  new IntersectionObserver(([e]) => m.classList.toggle('is-off', !e.isIntersecting)).observe(m);
}

/* ---------- hero: fundo em vídeo ----------
   Com movimento reduzido ou economia de dados, fica só o poster.
   No celular carrega a versão vertical (720×1280, recorte da esquerda). Fora da tela, pausa. */
{
  const v = $('.hero__video');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData;
  if (v && !still) {
    const small = matchMedia('(max-width: 959px)').matches;
    $$('source', v).forEach(s => {
      s.src = small ? s.dataset.src.replace('hero-bg.', 'hero-bg-mobile.').replace('v=2', 'v=3') : s.dataset.src;
    });
    if (small) v.poster = 'assets/hero-bg-poster-mobile.jpg?v=3';
    v.addEventListener('playing', () => v.classList.add('is-on'), { once: true });
    // o vídeo só baixa depois que a página terminou de carregar: texto e imagens chegam primeiro
    // (até lá aparece o poster, que é o primeiro quadro do vídeo, então o visual não muda)
    const liga = () => {
      v.preload = 'auto';
      v.autoplay = true;
      v.load();
      new IntersectionObserver(([e]) => { e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }).observe(v);
    };
    const depois = () => (window.requestIdleCallback ? requestIdleCallback(liga, { timeout: 1500 }) : setTimeout(liga, 300));
    document.readyState === 'complete' ? depois() : addEventListener('load', depois, { once: true });
  }
}

/* ---------- CTA flutuante (mobile): aparece depois do hero, some na oferta e na faixa final ---------- */
{
  const dock = $('#dock');
  const link = $('a', dock);
  let pastHero = false, onOffer = false, onFinal = false;
  const sync = () => {
    const on = pastHero && !onOffer && !onFinal;
    dock.classList.toggle('is-on', on);
    dock.setAttribute('aria-hidden', String(!on));
    link.tabIndex = on ? 0 : -1;
  };
  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe($('.hero'));
  new IntersectionObserver(([e]) => { onOffer = e.isIntersecting; sync(); }, { threshold: .15 }).observe($('#oferta'));
  // some na faixa final e no rodapé (o rodapé não guarda espaço embaixo pra ele)
  const fim = new Set();
  const fimIo = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? fim.add(e.target) : fim.delete(e.target)); onFinal = fim.size > 0; sync(); });
  fimIo.observe($('.final')); fimIo.observe($('.footer'));
}

/* =========================================================
   Movimento (GSAP + ScrollTrigger)
   Um momento orquestrado (a entrada do hero) e, no resto, só movimento com função:
   progresso do plano, carta de FUT que vira, post do título caindo na foto.
   Sem GSAP ou com movimento reduzido, a página fica estática e completa.
   ========================================================= */
addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) return;
  const hasSplit = !!window.SplitText;
  gsap.registerPlugin(ScrollTrigger, ...(hasSplit ? [SplitText] : []));
  // no celular a barra de endereço some/aparece ao rolar: sem isso cada vez recalcula tudo e dá tranco
  ScrollTrigger.config({ ignoreMobileResize: true });
  const mm = gsap.matchMedia();

  mm.add({ motion: '(prefers-reduced-motion: no-preference)', desk: '(min-width: 960px)', side: '(min-width: 800px)', hover: '(hover: hover) and (min-width: 700px)', cols: '(min-width: 1000px)' }, ctx => {
    const { motion, desk, side, hover, cols } = ctx.conditions;
    if (!motion) return;
    const reveal = (targets, from, opts = {}) => ScrollTrigger.batch(targets, {
      start: 'top 88%', once: true,
      onEnter: els => gsap.fromTo(els, from, { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0, rotateY: 0, duration: .8, ease: 'power3.out', stagger: .12, overwrite: true, ...opts }),
    });
    // estado inicial antes de entrar na tela
    const prep = (targets, from) => gsap.set(targets, from);
    // presa à barra de rolagem (scrub): descendo aparece, subindo some de novo
    const rola = (alvo, de, start, end) => gsap.fromTo(alvo, de, { opacity: 1, y: 0, scale: 1, ease: 'none',
      scrollTrigger: { trigger: alvo, start, end, scrub: .4 } });

    /* celular: "o que mudou no FC 27": cada card aparece um de cada vez, seguindo a rolagem */
    if (!desk) $$('.mudancas .card').forEach(c => rola(c, { opacity: 0, y: 60, scale: .95 }, 'top 95%', 'top 70%'));

    /* controle: tamanho e posição de base (menor e mais perto da mão que no recorte) */
    gsap.set('.hero__controle', { transformOrigin: '49.5% 55%', x: 0, y: 0, yPercent: 3.5, scale: .72, transformPerspective: 900 });
    /* celular: títulos do Illan aparecem um de cada vez conforme a tela desce */
    if (!desk) {
      prep('.proof li', { opacity: 0, y: 24 });
      reveal('.proof li', { opacity: 0, y: 24 }, { stagger: .3, duration: .7 });
    }
    /* hero: entrada única */
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    // o H1 é o LCP: ele só desliza, sem fade, pra pintar na hora
    // com data-letters o H1 usa só a revelação de letras
    if ($('.hero__title:not([data-letters])')) heroTl.from('.hero__title', { y: 28, duration: .8 }, 0);
    heroTl
      // no celular os títulos (.proof) ficam de fora: entram um por um com a rolagem, logo abaixo
      .from(desk ? '.hero__text > :not(.hero__title)' : '.hero__text > :not(.hero__title):not(.proof)', { opacity: 0, y: 24, duration: .7, stagger: .08 }, 0)
      .from('.hero__glow', { opacity: 0, scale: .6, duration: 1.2 }, 0)
      // o controle cai de leve na mão, girando em 3D, e começa a flutuar
      .from('.hero__controle', { y: -20, rotationY: -50, opacity: 0, duration: 1.1, ease: 'back.out(1.4)' }, .45)
      .add(() => ctx.add(() => {
        // ritmos diferentes pra o movimento nunca repetir igual; cada eixo chega suave ao ponto de partida, sem pulo.
        // Sobe no máx. 3% da altura da figura: o controle nunca chega na altura do rosto.
        const c = '.hero__controle', ease = 'sine.inOut', loop = { ease, yoyo: true, repeat: -1 };
        const sobe = $('.hero__figure').offsetHeight * .03;
        const voo = [
          gsap.to(c, { y: -sobe, duration: 1.8, ...loop }),
          gsap.to(c, { scale: .75, duration: 2.2, ...loop }),
          gsap.timeline().to(c, { rotation: -6, duration: 1.2, ease }).to(c, { rotation: 6, duration: 2.4, ...loop }),
          gsap.timeline().to(c, { x: -10, duration: 1.5, ease }).to(c, { x: 10, duration: 3, ...loop }),
          // volume 3D: gira em perspectiva nos dois eixos
          gsap.timeline().to(c, { rotationY: -18, duration: 1.6, ease }).to(c, { rotationY: 18, duration: 3.2, ...loop }),
          gsap.timeline().to(c, { rotationX: 10, duration: 1.3, ease }).to(c, { rotationX: -10, duration: 2.6, ...loop }),
        ];
        // com o hero fora da tela o controle para de flutuar (e retoma de onde parou ao voltar)
        const io = new IntersectionObserver(([e]) => voo.forEach(t => e.isIntersecting ? t.resume() : t.pause()));
        io.observe($('.hero'));
        return () => io.disconnect();
      }));

    if (desk) {
      heroTl
        .from('.hero__img', { opacity: 0, y: 40, scale: .96, duration: 1 }, .1)
        .from('.float', { opacity: 0, y: 20, scale: .9, duration: .6, stagger: .15 }, .55);
    } else {
      /* celular: a foto fica abaixo da primeira tela. Conforme a pessoa desce, o Illan (com o controle)
         sobe de baixo até a posição dele; só depois entram "Nova divisão: Elite" e "Aluno do Illan",
         um de cada vez. Tudo preso à rolagem: subindo a tela, volta e some. */
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        trigger: '.hero__media', start: 'top 92%', endTrigger: '.float--a', end: 'bottom 88%', scrub: .5 } })
        .fromTo('.hero__img', { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 1, ease: 'power1.out' })
        .fromTo('.float--a', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: .45 }, '+=.08')
        .fromTo('.float--b', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: .45 }, '+=.12');
    }

    /* controle: no desktop, inclina em 3D na direção do mouse (no wrap, pra não brigar com a flutuação) */
    if (desk) {
      const wrap = $('.hero__controle-wrap'), hero = $('.hero');
      gsap.set(wrap, { transformOrigin: '49.5% 55%', transformPerspective: 900 });
      const rx = gsap.quickTo(wrap, 'rotationX', { duration: .6, ease: 'power3.out' });
      const ry = gsap.quickTo(wrap, 'rotationY', { duration: .6, ease: 'power3.out' });
      const move = e => {
        const r = wrap.getBoundingClientRect();
        const nx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width * .495)) / (r.width / 2));
        const ny = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height * .55)) / (r.height / 2));
        ry(nx * 16); rx(-ny * 12);
      };
      const leave = () => { rx(0); ry(0); };
      hero.addEventListener('pointermove', move);
      hero.addEventListener('pointerleave', leave);
      ctx.add(() => () => { hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave); });
    }

    /* hero: o Illan sobe mais devagar que a página */
    // no celular os cards ficam numa linha abaixo da foto: sem parallax na foto nem nos cards, senão eles se encostam
    if (side) {
      gsap.to('.hero__img', { yPercent: desk ? 10 : 6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.float--a', { y: -60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.float--b', { y: -110, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }

    /* faixa: números contam uma vez */
    $$('.strip__stats b').forEach(b => {
      const end = +b.textContent; const o = { v: 0 };
      gsap.to(o, { v: end, duration: 1.2, ease: 'power2.out', onUpdate: () => { b.textContent = Math.round(o.v); },
        scrollTrigger: { trigger: '.strip', start: 'top 92%', once: true } });
    });

    /* pra quem é: o card grande vem da esquerda, os dois da direita vêm da direita (um depois do outro)
       e todos param onde já estão. No celular (uma coluna) cada card entra quando chega na tela. */
    const pvCards = $$('.pv__card');
    const pvDe = (card, i, dist) => ({ x: i === 0 ? -dist : dist, opacity: 0 });
    if (matchMedia('(min-width: 700px)').matches) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.pv', start: 'top 75%', once: true }, defaults: { duration: 1, ease: 'power3.out' } });
      pvCards.forEach((card, i) => tl.from(card, pvDe(card, i, 140), i === 0 ? 0 : .15 + (i - 1) * .2));
    } else {
      // celular: uma foto de cada vez, presa à rolagem. 1ª vem da esquerda, 2ª da direita, 3ª de baixo pra cima
      const pvMob = [{ x: -120 }, { x: 120 }, { y: 120 }];
      pvCards.forEach((card, i) => gsap.fromTo(card, { opacity: 0, x: 0, y: 0, ...pvMob[i % 3] }, {
        opacity: 1, x: 0, y: 0, ease: 'power1.out', scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 55%', scrub: .5 } }));
    }

    /* Daqui pra baixo, nada de "sobe e aparece" genérico em todo bloco: o texto já está lá quando a
       pessoa chega. Só fica o movimento que conta algo do mundo do Illan: o post do título caindo
       sobre a foto, a capa do guia, a linha do tempo do plano e a carta de FUT virando. */

    /* sobre: as duas colunas chegam de lados opostos e param onde se encontram:
       foto + post vêm da esquerda, texto vem da direita (a seção tem overflow:hidden, sem rolagem lateral) */
    if (desk) {
      gsap.timeline({ scrollTrigger: { trigger: '.about', start: 'top 75%', once: true }, defaults: { duration: 1.1, ease: 'power3.out' } })
        .from('.about__media', { x: -140, opacity: 0 }, 0)
        .from('.about__text', { x: 140, opacity: 0 }, .1);
    } else {
      /* celular: a seção inteira segue a barra de rolagem (scrub). Descendo, cada parte aparece;
         subindo, ela some de novo. Começa quando a parte está ~30% acima da base da tela. */
      // foto + post sobem de baixo
      rola('.about__media', { opacity: 0, y: 120, scale: .94 }, 'top 85%', 'top 40%');
      // texto embaixo da foto: cada bloco sobe conforme passa pela tela
      $$('.about__text > :not(.trofeus):not(.about__title):not(.cta)').forEach(el => rola(el, { opacity: 0, y: 40 }, 'top 92%', 'top 68%'));
      /* conquistas em sequência, presas à rolagem: o Campeão (invisível, bem menor) cresce e acende
         primeiro; só depois entram Top 8 Pro Open, Top 8 Cash Cup e Top 17 e-Libertadores, um a um.
         O botão "Quero aprender com um campeão" é o último passo: só aparece depois das conquistas. */
      const topo = $('.trofeus__top'), resto = $$('.trofeus li:not(.trofeus__top)'), cta = $('.about__text .cta');
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.trofeus', start: 'top 85%', endTrigger: cta, end: 'top 62%', scrub: .4 } })
        .fromTo(topo, { opacity: 0, y: 50, scale: .8 }, { opacity: 1, y: 0, scale: 1, duration: 1 })
        .fromTo(resto, { opacity: 0, y: 40, scale: .9 }, { opacity: 1, y: 0, scale: 1, duration: .7, stagger: .45 }, '+=.15')
        .fromTo(cta, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .8 }, '+=.2');
    }

    /* celular: conquistas por etapa. O "Campeão Sul-Americano" fica invisível e surge quando chega
       no meio da tela; só depois que ele termina, os três de baixo entram (um a um) ao chegarem
       mais ou menos na mesma altura. Se a pessoa rolar rápido, os de baixo esperam o de cima acabar. */

    /* sobre: o post do título 'cai' sobre a foto conforme a colagem entra na tela */
    gsap.fromTo('.post', { rotate: 8, y: 80, x: 20 }, { rotate: -3, y: 0, x: 0, ease: 'none', scrollTrigger: { trigger: '.about__media', start: 'top 90%', end: 'center 55%', scrub: true } });

    /* prova rápida: os balões de WhatsApp começam invisíveis e sobem um de cada vez ao chegar na tela */
    prep('.quotes__list li', { opacity: 0, y: 50 });
    reveal('.quotes__list li', { opacity: 0, y: 50 }, { stagger: .25, duration: .8, ease: 'power3.out' });

    /* aulas: entra por etapas, uma depois da outra: texto → capa → itens da lista um a um →
       níveis um a um → botão. Com duas colunas é uma sequência só; no celular (empilhado)
       cada etapa espera chegar na tela, pra nada animar fora da vista. */
    const passosAulas = [
      ['#aulas .lead', { y: 24, opacity: 0, duration: .6 }],
      ['.capa', { rotate: -6, y: 60, opacity: 0, duration: .9 }],
      ['#aulas .checks li', { x: -28, opacity: 0, duration: .5, stagger: .12 }],
      ['#aulas .niveis__dica, #aulas .nivel', { x: 48, opacity: 0, duration: .55, stagger: .12 }],
      ['#aulas .niveis .cta', { y: 24, opacity: 0, duration: .6 }],
    ];
    if (cols) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.produto', start: 'top 70%', once: true }, defaults: { ease: 'power3.out' } });
      passosAulas.forEach(([alvo, de], i) => tl.from(alvo, de, i ? '-=.25' : 0));
    } else {
      // celular: a seção inteira fica invisível e surge quando o topo dela chega a ~60% da tela;
      // título e etapas disparam um pouco depois, pra não animarem com a seção ainda escondida
      if (!desk) {
        gsap.set('.produto', { opacity: 0, y: 40 });
        gsap.to('.produto', { opacity: 1, y: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.produto', start: 'top 60%', once: true } });
        $('#aulas-title').dataset.letters = 'top 58%';
      }
      passosAulas.forEach(([alvo, de]) => gsap.from(alvo, { ...de, ease: 'power3.out', scrollTrigger: { trigger: alvo, start: desk ? 'top 88%' : 'top 70%', once: true } }));
    }

    /* plano: linha do tempo. A linha enche com o scroll; o ponto de cada semana
       acende quando a ponta da linha chega nele (os dois usam a marca de 60% da tela). */
    const plano = $('.plano');
    plano.classList.add('is-anim');
    const semanas = $$('.semana');
    // cada ponto acende quando a ponta vermelha da linha (o que está desenhado na tela) passa por ele
    const barra = $('.plano__bar i');
    const acender = () => {
      const r = barra.parentElement.getBoundingClientRect();
      const ponta = r.top + r.height * gsap.getProperty(barra, 'scaleY');
      let mudou = false;
      semanas.forEach(s => {
        const d = $('.semana__dot', s).getBoundingClientRect();
        const on = d.top + d.height / 2 <= ponta + 1;
        if (on !== s.classList.contains('is-on')) { s.classList.toggle('is-on', on); mudou = true; }
      });
      if (mudou) ativar();
    };
    gsap.fromTo(barra, { scaleY: 0 }, {
      scaleY: 1, ease: 'none', onUpdate: acender,
      scrollTrigger: { trigger: '.plano__bar', start: 'top 60%', end: 'bottom 60%', scrub: .3 },
    });
    // semana ativa = a última que a linha alcançou: o card dela cresce e flutua; ao trocar, o efeito passa adiante
    let ativa = null, boia = null, planoNaTela = true;
    // a flutuação do card ativo só roda com o plano na tela
    const planoIo = new IntersectionObserver(([e]) => { planoNaTela = e.isIntersecting; boia && (planoNaTela ? boia.resume() : boia.pause()); });
    planoIo.observe(plano);
    const ativar = () => {
      const nova = semanas.filter(s => s.classList.contains('is-on')).pop() || null;
      if (nova === ativa) return;
      if (ativa) {
        ativa.classList.remove('is-active');
        boia && boia.kill();
        gsap.to($('.semana__card', ativa), { scale: 1, y: 0, duration: .5, ease: 'power2.out', overwrite: 'auto' });
      }
      ativa = nova;
      if (!ativa) return;
      ativa.classList.add('is-active');
      const card = $('.semana__card', ativa);
      gsap.to(card, { scale: 1.04, duration: .5, ease: 'power2.out', overwrite: 'auto' });
      boia = gsap.to(card, { y: -8, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: .2 });
      if (!planoNaTela) boia.pause();
    };
    semanas.forEach(s => {
      // título chega da esquerda e o card da direita; no celular os dois sobem
      gsap.timeline({ scrollTrigger: { trigger: s, start: 'top 82%', once: true } })
        .from($('.semana__head', s), side ? { x: -48, opacity: 0, duration: .8 } : { y: 28, opacity: 0, duration: .7 })
        .from($('.semana__card', s), side ? { x: 48, opacity: 0, duration: .8 } : { y: 28, opacity: 0, duration: .7 }, .12)
        .from($('.semana__dot', s), { opacity: 0, duration: .4 }, 0);
    });
    ctx.add(() => () => {
      planoIo.disconnect();
      boia && boia.kill();
      plano.classList.remove('is-anim');
      semanas.forEach(s => s.classList.remove('is-active'));
      gsap.set($$('.semana__card'), { clearProps: 'transform' });
    });

    /* pra quem é: no desktop com mouse, o card sobe e fica flutuando enquanto o mouse está em cima */
    if (hover) $$('.pv__card').forEach(card => {
      let boia = null;
      card.addEventListener('mouseenter', () => {
        boia && boia.kill();
        boia = gsap.timeline()
          .to(card, { y: -10, duration: .45, ease: 'power2.out' })
          .to(card, { y: -16, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });
      card.addEventListener('mouseleave', () => {
        boia && boia.kill();
        boia = gsap.to(card, { y: 0, duration: .5, ease: 'power2.out' });
      });
    });

    /* jogadores: as cartas sobem de baixo pra cima, uma de cada vez, cada uma no seu tempo */
    // anima o <li> (não a carta) pra não brigar com o tilt do mouse, que usa o transform da carta
    prep('.fut > li', { opacity: 0, y: 90 });
    reveal('.fut > li', { opacity: 0, y: 90 }, { stagger: .22, duration: .9, ease: 'power3.out' });

    /* oferta: card cresce ao entrar, brilho aumenta */
    // só escala: o card da oferta nunca aparece apagado
    gsap.fromTo('.oferta', { scale: .93 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.oferta', start: 'top 95%', end: 'top 55%', scrub: true } });

    /* faixa final: as duas linhas chegam de lados opostos */
    if ($('.final__title:not([data-letters])')) {
      gsap.fromTo('.final__title', { xPercent: -8 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'top 40%', scrub: true } });
      gsap.fromTo('.final__title span', { xPercent: 10 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'top 40%', scrub: true } });
    }

    /* títulos [data-letters]: as letras acendem em ordem aleatória, uma vez só.
       Sem SplitText o título fica como está; ele só some depois de quebrado. */
    // o título some só quando o SplitText existe; espera as fontes (no máx. 3s) antes de quebrar
    if (hasSplit) gsap.set('[data-letters]', { opacity: 0 });
    const fontsReady = document.fonts ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 3000))]) : Promise.resolve();
    // cada título só é quebrado em letras quando chega perto da tela (não todos no carregamento):
    // menos trabalho pro celular enquanto a página abre
    let lettersIo = null;
    if (hasSplit) fontsReady.then(() => {
      lettersIo = new IntersectionObserver(entries => entries.forEach(e => {
        if (!e.isIntersecting) return;
        lettersIo.unobserve(e.target);
        ctx.add(() => splitLetters(e.target));
      }), { rootMargin: '0px 0px 50% 0px' });
      $$('[data-letters]').forEach(el => lettersIo.observe(el));
    });
    ctx.add(() => () => { lettersIo && lettersIo.disconnect(); $$('[data-letters]').forEach(el => el.classList.remove('is-split')); });
    const splitLetters = el => {
        const split = SplitText.create(el, { type: 'words,chars', wordsClass: 'lt-word', charsClass: 'lt-char' });
        // o gradiente do .hl é recortado no texto do pai: passa pra cada letra, alinhado ao span original
        el.classList.add('is-split');
        // mede todas as letras primeiro e só depois escreve: um cálculo de layout por título, não um por letra
        $$('.hl', el).forEach(hl => {
          const box = hl.getBoundingClientRect();
          const chars = $$('.lt-char', hl);
          const lefts = chars.map(c => c.getBoundingClientRect().left);
          chars.forEach((c, i) => {
            c.style.backgroundSize = `${box.width}px 100%`;
            c.style.backgroundPosition = `${box.left - lefts[i]}px 0`;
          });
        });
        gsap.set(split.chars, { opacity: 0 });
        gsap.set(el, { opacity: 1 });
        gsap.to(split.chars, {
          opacity: 1, duration: .5, ease: 'power1.out',
          stagger: { amount: 1.4, from: 'random' },
          // data-letters="top 60%" troca o ponto de disparo só daquele título
          scrollTrigger: { trigger: el, start: el.dataset.letters || 'top 82%', once: true },
          // devolve o HTML original: gradiente contínuo e quebra de linha livre no resize
          onComplete: () => { split.revert(); el.classList.remove('is-split'); },
        });
    };

    // fontes assíncronas e imagens mudam alturas: recalcula os gatilhos UMA vez, quando as duas terminarem
    const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise(r => addEventListener('load', r, { once: true }));
    Promise.all([loaded, fontsReady]).then(() => ScrollTrigger.refresh());
  });
});
