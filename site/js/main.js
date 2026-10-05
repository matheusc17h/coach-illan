/* =========================================================
   Illan Evolution · main.js
   ========================================================= */

// Todos os CTAs de compra usam esta URL. Enquanto estiver vazia, os botões levam à seção de oferta.
const CHECKOUT_URL = ''; // [PREENCHER: URL do checkout]

// Os 6 jogadores da seção "Quem joga com o Illan". Troque foto e texto só aqui.
// foto: caminho dentro de site/ (ex.: 'assets/jogadores/foto-jogador-1.webp'). Vazio = silhueta.
const players = [
  { foto: '', nick: '[PREENCHER: @jogador 1]', info: '[PREENCHER: conquista ou divisão]' },
  { foto: '', nick: '[PREENCHER: @jogador 2]', info: '[PREENCHER: conquista ou divisão]' },
  { foto: '', nick: '[PREENCHER: @jogador 3]', info: '[PREENCHER: conquista ou divisão]' },
];

// Prints reais dos alunos. "hook" é um trecho copiado do próprio print, com a grafia original.
const depoimentos = [
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
  { img: 'dep-11', w: 720, h: 1280, hook: 'Melhorei muito parece até outra pessoa', alt: 'Arte do Illan com três prints de alunos: subida da 2ª divisão para a Elite, agradecimento pelas aulas e "tava marcando igual uma porta, agora tomo 1 gol max por partida".' },
  { img: 'dep-12', w: 900, h: 1125, hook: 'Pô teu coach é brabo!', alt: 'Arte "Feedback dos meus alunos" com três prints: subida da div 2 pra elite, "suas aulas mudaram minha forma de enxergar o jogo" e "depois dessas suas dicas é difícil eu perde uma bola".' },
];

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- CTAs → checkout ---------- */
if (CHECKOUT_URL) $$('.js-cta').forEach(a => { a.href = CHECKOUT_URL; });

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
  grid.innerHTML = players.map((p, i) => `
    <li>
      <article class="fut-card" tabindex="0" aria-label="${p.nick}, ${p.info}">
        ${p.foto
          ? `<img class="fut-card__img" src="${p.foto}" alt="" loading="lazy" decoding="async">`
          : `<span class="fut-card__ph">${silhouette}</span>`}
        <h3 class="fut-card__nick">${fill(p.nick)}</h3>
        <p class="fut-card__info">${fill(p.info)}</p>
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
      card.style.setProperty('--gx', `${x * 100}%`);
      card.style.setProperty('--gy', `${y * 100}%`);
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
  const list = $('#deps');
  list.innerHTML = depoimentos.map((d, i) => `
    <li>
      <button class="dep" type="button" data-i="${i}" aria-label="Ampliar print: ${d.hook}">
        <span class="dep__hook">${d.hook}</span>
        <span class="dep__phone"><img src="assets/depoimentos/${d.img}.webp" width="${d.w}" height="${d.h}" alt="${d.alt.replace(/"/g, '&quot;')}" loading="lazy" decoding="async"></span>
      </button>
    </li>`).join('');

  $$('[data-scroll="deps"]').forEach(btn => btn.addEventListener('click', () => {
    list.scrollBy({ left: +btn.dataset.dir * list.clientWidth * .8, behavior: reduced.matches ? 'auto' : 'smooth' });
  }));

  const box = $('#lightbox');
  const img = $('#lightbox-img');
  const cap = $('#lightbox-cap');
  let cur = 0;
  const show = i => {
    cur = (i + depoimentos.length) % depoimentos.length;
    const d = depoimentos[cur];
    img.src = `assets/depoimentos/${d.img}.webp`;
    img.width = d.w; img.height = d.h;
    img.alt = d.alt;
    cap.textContent = `Print ${cur + 1} de ${depoimentos.length}`;
  };
  list.addEventListener('click', e => {
    const b = e.target.closest('.dep');
    if (!b) return;
    show(+b.dataset.i);
    box.showModal();
  });
  $('.lightbox__close').addEventListener('click', () => box.close());
  $('.lightbox__prev').addEventListener('click', () => show(cur - 1));
  $('.lightbox__next').addEventListener('click', () => show(cur + 1));
  box.addEventListener('click', e => { if (e.target === box) box.close(); });
  box.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
  box.addEventListener('close', () => { const b = $(`.dep[data-i="${cur}"]`); if (b) b.focus(); });
}

/* ---------- marquee: botão de pausa ---------- */
{
  const m = $('.marquee');
  const t = $('.marquee__toggle');
  t.addEventListener('click', () => {
    const on = !m.classList.contains('is-paused');
    m.classList.toggle('is-paused', on);
    t.setAttribute('aria-pressed', String(on));
    t.setAttribute('aria-label', on ? 'Tocar comentários' : 'Pausar comentários');
    $('use', t).setAttribute('href', on ? '#i-play' : '#i-pause');
  });
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
    v.preload = 'auto';
    v.autoplay = true;
    v.addEventListener('playing', () => v.classList.add('is-on'), { once: true });
    v.load();
    new IntersectionObserver(([e]) => { e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }).observe(v);
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
  new IntersectionObserver(([e]) => { onFinal = e.isIntersecting; sync(); }).observe($('.final'));
}

/* =========================================================
   Movimento (GSAP + ScrollTrigger)
   Cada animação responde ao scroll e tem função: entrada do hero,
   cards que chegam em sequência, progresso do plano, carta que vira.
   Sem GSAP ou com movimento reduzido, a página fica estática e completa.
   ========================================================= */
addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) return;
  const hasSplit = !!window.SplitText;
  gsap.registerPlugin(ScrollTrigger, ...(hasSplit ? [SplitText] : []));
  const mm = gsap.matchMedia();

  mm.add({ motion: '(prefers-reduced-motion: no-preference)', desk: '(min-width: 960px)', side: '(min-width: 800px)' }, ctx => {
    const { motion, desk, side } = ctx.conditions;
    if (!motion) return;
    const up = { opacity: 0, y: 48 };
    const reveal = (targets, from, opts = {}) => ScrollTrigger.batch(targets, {
      start: 'top 88%', once: true,
      onEnter: els => gsap.fromTo(els, from, { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0, rotateY: 0, duration: .8, ease: 'power3.out', stagger: .12, overwrite: true, ...opts }),
    });
    // estado inicial antes de entrar na tela
    const prep = (targets, from) => gsap.set(targets, from);

    /* controle: tamanho e posição de base (menor e mais perto da mão que no recorte) */
    gsap.set('.hero__controle', { transformOrigin: '49.5% 55%', x: 0, y: 0, yPercent: 3.5, scale: .72, transformPerspective: 900 });
    /* hero: entrada única */
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    // o H1 é o LCP: ele só desliza, sem fade, pra pintar na hora
    // com data-letters o H1 usa só a revelação de letras
    if ($('.hero__title:not([data-letters])')) heroTl.from('.hero__title', { y: 28, duration: .8 }, 0);
    heroTl
      .from('.hero__text > :not(.hero__title)', { opacity: 0, y: 24, duration: .7, stagger: .08 }, 0)
      .from('.hero__img', { opacity: 0, y: 40, scale: .96, duration: 1 }, .1)
      .from('.hero__glow', { opacity: 0, scale: .6, duration: 1.2 }, 0)
      .from('.float', { opacity: 0, y: 20, scale: .9, duration: .6, stagger: .15 }, .55)
      // o controle cai de leve na mão, girando em 3D, e começa a flutuar
      .from('.hero__controle', { y: -20, rotationY: -50, opacity: 0, duration: 1.1, ease: 'back.out(1.4)' }, .45)
      .add(() => ctx.add(() => {
        // ritmos diferentes pra o movimento nunca repetir igual; cada eixo chega suave ao ponto de partida, sem pulo.
        // Sobe no máx. 3% da altura da figura: o controle nunca chega na altura do rosto.
        const c = '.hero__controle', ease = 'sine.inOut', loop = { ease, yoyo: true, repeat: -1 };
        const sobe = $('.hero__figure').offsetHeight * .03;
        gsap.to(c, { y: -sobe, duration: 1.8, ...loop });
        gsap.to(c, { scale: .75, duration: 2.2, ...loop });
        gsap.timeline().to(c, { rotation: -6, duration: 1.2, ease }).to(c, { rotation: 6, duration: 2.4, ...loop });
        gsap.timeline().to(c, { x: -10, duration: 1.5, ease }).to(c, { x: 10, duration: 3, ...loop });
        // volume 3D: gira em perspectiva nos dois eixos
        gsap.timeline().to(c, { rotationY: -18, duration: 1.6, ease }).to(c, { rotationY: 18, duration: 3.2, ...loop });
        gsap.timeline().to(c, { rotationX: 10, duration: 1.3, ease }).to(c, { rotationX: -10, duration: 2.6, ...loop });
      }));

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
    gsap.to('.hero__img', { yPercent: desk ? 10 : 6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    // no celular os cards ficam numa linha abaixo da foto: sem parallax, pra não subirem sobre a figura
    if (side) {
      gsap.to('.float--a', { y: -60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.float--b', { y: -110, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }

    /* faixa: números contam uma vez */
    $$('.strip__stats b').forEach(b => {
      const end = +b.textContent; const o = { v: 0 };
      gsap.to(o, { v: end, duration: 1.2, ease: 'power2.out', onUpdate: () => { b.textContent = Math.round(o.v); },
        scrollTrigger: { trigger: '.strip', start: 'top 92%', once: true } });
    });

    /* títulos de seção */
    // títulos com data-letters ganham só a revelação de letras (mais abaixo)
    const heads = '.sec .h2:not([data-letters]), .sec__head .lead, .about__title:not([data-letters])';
    prep(heads, { opacity: 0, y: 32 });
    reveal(heads, { opacity: 0, y: 32 });

    /* pra quem é: cards sobem em sequência; a foto faz parallax dentro do card */
    prep('.pv__card', { opacity: 0, y: 80, rotate: (i) => (i - 1) * 2 });
    reveal('.pv__card', { opacity: 0, y: 80, rotate: (i) => (i - 1) * 2 }, { stagger: .15, duration: .9 });
    $$('.pv__img img').forEach(img => gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: 'none',
      scrollTrigger: { trigger: img.closest('.pv__card'), start: 'top bottom', end: 'bottom top', scrub: true } }));

    /* o que mudou: 6 cards em cascata */
    prep('.mudancas .card', up);
    reveal('.mudancas .card', up, { stagger: .09 });

    /* sobre: foto em parallax, troféus um a um, post gira com o scroll */
    gsap.fromTo('.about__photo img', { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.about__media', start: 'top bottom', end: 'bottom top', scrub: true } });
    prep('.trofeus li, .quote', { opacity: 0, y: 24 });
    reveal('.trofeus li, .quote', { opacity: 0, y: 24 }, { stagger: .1 });
    prep('.quotes__list li', up);
    reveal('.quotes__list li', up, { stagger: .12 });
    // o post 'cai' sobre a foto conforme a colagem entra na tela
    gsap.fromTo('.post', { rotate: 8, y: 80, x: 20 }, { rotate: -3, y: 0, x: 0, ease: 'none', scrollTrigger: { trigger: '.about__media', start: 'top 90%', end: 'center 55%', scrub: true } });

    /* aulas: capa entra com leve giro, níveis em cascata */
    gsap.from('.capa', { rotate: -6, y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.capa', start: 'top 85%', once: true } });
    prep('.nivel, .produto .checks li', { opacity: 0, y: 28 });
    reveal('.nivel, .produto .checks li', { opacity: 0, y: 28 }, { stagger: .07, duration: .6 });

    /* plano: linha do tempo. A linha enche com o scroll; o ponto de cada semana
       acende quando a ponta da linha chega nele (os dois usam a marca de 60% da tela). */
    const plano = $('.plano');
    plano.classList.add('is-anim');
    gsap.fromTo('.plano__bar i', { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.plano__bar', start: 'top 60%', end: 'bottom 60%', scrub: .3 },
    });
    // semana ativa = a última que a linha alcançou: o card dela cresce e flutua; ao trocar, o efeito passa adiante
    const semanas = $$('.semana');
    let ativa = null, boia = null;
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
    };
    semanas.forEach(s => {
      ScrollTrigger.create({
        trigger: $('.semana__dot', s), start: 'center 60%',
        onEnter: () => { s.classList.add('is-on'); ativar(); },
        onLeaveBack: () => { s.classList.remove('is-on'); ativar(); },
      });
      // título chega da esquerda e o card da direita; no celular os dois sobem
      gsap.timeline({ scrollTrigger: { trigger: s, start: 'top 82%', once: true } })
        .from($('.semana__head', s), side ? { x: -48, opacity: 0, duration: .8 } : { y: 28, opacity: 0, duration: .7 })
        .from($('.semana__card', s), side ? { x: 48, opacity: 0, duration: .8 } : { y: 28, opacity: 0, duration: .7 }, .12)
        .from($('.semana__dot', s), { opacity: 0, duration: .4 }, 0);
    });
    ctx.add(() => () => {
      boia && boia.kill();
      plano.classList.remove('is-anim');
      semanas.forEach(s => s.classList.remove('is-active'));
      gsap.set($$('.semana__card'), { clearProps: 'transform' });
    });

    /* jogadores: a carta vira como revelação de pack */
    // gira o <li> (não a carta) pra não brigar com o tilt do mouse, que usa o transform da carta
    prep('.fut > li', { opacity: 0, rotateY: -70, y: 30, transformPerspective: 900 });
    reveal('.fut > li', { opacity: 0, rotateY: -70, y: 30 }, { stagger: .1, duration: 1, ease: 'back.out(1.4)' });

    /* depoimentos: prints sobem em sequência */
    if (desk || matchMedia('(min-width: 768px)').matches) {
      prep('.deps > li', { opacity: 0, y: 60 });
      reveal('.deps > li', { opacity: 0, y: 60 }, { stagger: .08 });
    }

    /* oferta: card cresce ao entrar, brilho aumenta */
    // só escala: o card da oferta nunca aparece apagado
    gsap.fromTo('.oferta', { scale: .93 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.oferta', start: 'top 95%', end: 'top 55%', scrub: true } });
    prep('.oferta .checks li', { opacity: 0, x: -20 });
    reveal('.oferta .checks li', { opacity: 0, x: -20 }, { stagger: .08, duration: .5 });

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
    if (hasSplit) fontsReady.then(() => ctx.add(() => {
      $$('[data-letters]').forEach(el => {
        const split = SplitText.create(el, { type: 'words,chars', wordsClass: 'lt-word', charsClass: 'lt-char' });
        // o gradiente do .hl é recortado no texto do pai: passa pra cada letra, alinhado ao span original
        el.classList.add('is-split');
        $$('.hl', el).forEach(hl => {
          const box = hl.getBoundingClientRect();
          $$('.lt-char', hl).forEach(c => {
            c.style.backgroundSize = `${box.width}px 100%`;
            c.style.backgroundPosition = `${box.left - c.getBoundingClientRect().left}px 0`;
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
      });
      ScrollTrigger.refresh();
      return () => $$('[data-letters]').forEach(el => el.classList.remove('is-split'));
    }));

    // fontes assíncronas e imagens mudam alturas: recalcula os gatilhos
    addEventListener('load', () => ScrollTrigger.refresh());
    if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
  });
});
