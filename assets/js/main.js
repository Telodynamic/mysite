(() => {
  'use strict';
  const qs = (s, c = document) => c.querySelector(s), qsa = (s, c = document) => [...c.querySelectorAll(s)];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const menu = qs('.nav-toggle'), nav = qs('.nav-links');
  function closeMenu() {
    nav?.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Open navigation'); if (menu) menu.textContent = '☰';
    document.body.classList.remove('menu-open');
  }
  menu?.addEventListener('click', () => {
    const open = !nav.classList.contains('open'); closeMenu();
    if (open) { nav.classList.add('open'); menu.setAttribute('aria-expanded', 'true'); menu.setAttribute('aria-label', 'Close navigation'); menu.textContent = '✕'; document.body.classList.add('menu-open'); }
  });
  qsa('a', nav || document).forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('open')) { closeMenu(); menu.focus(); } });
  matchMedia('(min-width: 981px)').addEventListener('change', closeMenu);
  qsa('[data-nav]').forEach(a => { if (a.dataset.nav === document.body.dataset.page) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); } });
  const slides = qsa('.hero-slide'), dots = qsa('.hero-dot'), pause = qs('.hero-pause');
  let index = 0, timer, paused = motion.matches;
  function showHero(i) {
    if (!slides.length) return; index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('active', n === index));
    dots.forEach((d, n) => { d.classList.toggle('active', n === index); d.setAttribute('aria-pressed', String(n === index)); });
  }
  function scheduleHero() {
    clearInterval(timer);
    if (!paused && !motion.matches && !document.hidden && slides.length > 1) timer = setInterval(() => showHero(index + 1), 6500);
    if (pause) { pause.textContent = paused || motion.matches ? 'Play scenes' : 'Pause scenes'; pause.setAttribute('aria-pressed', String(paused || motion.matches)); }
  }
  dots.forEach((d, i) => d.addEventListener('click', () => { showHero(i); scheduleHero(); }));
  pause?.addEventListener('click', () => { paused = !paused; scheduleHero(); });
  motion.addEventListener('change', () => { paused = motion.matches; scheduleHero(); });
  document.addEventListener('visibilitychange', scheduleHero); showHero(0); scheduleHero();
  if ('IntersectionObserver' in window && !motion.matches) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } }), { threshold: .08 });
    qsa('.reveal').forEach(el => observer.observe(el));
  }
  const tabs = qsa('[data-service-tab]');
  function selectTab(tab) {
    tabs.forEach(t => { const active = t === tab; t.classList.toggle('active', active); t.setAttribute('aria-selected', String(active)); t.tabIndex = active ? 0 : -1; });
    qsa('.service-panel').forEach(p => { const active = p.id === tab.getAttribute('aria-controls'); p.hidden = !active; p.classList.toggle('active', active); });
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', e => {
      const next = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
      if (next !== undefined) { e.preventDefault(); selectTab(tabs[next]); tabs[next].focus(); }
    });
  });
  function serviceHash() { const key = { '#telemanipulators': 'tele', '#hotcells': 'hot', '#windows': 'window' }[location.hash]; const tab = tabs.find(t => t.dataset.serviceTab === key); if (tab) selectTab(tab); }
  serviceHash(); addEventListener('hashchange', serviceHash);
  const hotData = {
    window: ['01', 'Viewing Window', 'A shielded viewing window allows operators to observe work inside the enclosure while remaining outside the work area.'],
    manipulator: ['02', 'Telemanipulator', 'Remote mechanical handling lets operators work through the barrier while remaining physically separated from the task area.'],
    shielding: ['03', 'Shielding', 'Shielding forms a barrier intended to reduce radiation exposure outside the enclosure. Its design depends on the application.'],
    air: ['04', 'Air Handling', 'Airflow and filtration are part of the enclosure systems considered for the operating environment.'],
    service: ['05', 'Service / Access Systems', 'Access and transfer systems support maintenance, equipment servicing and material movement.']
  };
  function setDetail(selector, number, title, copy) { const box = qs(selector); if (!box) return; qs('.eyebrow', box).textContent = number; qs('h3', box).textContent = title; qs('p', box).textContent = copy; }
  function pressGroup(selector, selected) { qsa(selector).forEach(b => { const active = b === selected; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); }); }
  qsa('.marker').forEach(m => m.addEventListener('click', () => { pressGroup('.marker', m); setDetail('#hotcell-detail', ...hotData[m.dataset.hotcell]); }));
  qsa('[data-filter]').forEach(b => b.addEventListener('click', () => {
    pressGroup('[data-filter]', b); let count = 0;
    qsa('.product').forEach(p => { const visible = b.dataset.filter === 'all' || p.dataset.category === b.dataset.filter; p.classList.toggle('hidden', !visible); if (visible) { count++; p.classList.add('in'); } });
    qs('#product-count').textContent = `Showing ${count} ${count === 1 ? 'product' : 'products'}`;
  }));
  const stages = {
    inspect: ['Inspect', 'Assess equipment condition, symptoms, service history and the operating context.'],
    diagnose: ['Diagnose', 'Identify likely causes and discuss the technical path forward.'],
    engineer: ['Engineer', 'Define the repair, modification, replacement or custom solution required.'],
    service: ['Service', 'Carry out the agreed maintenance, repair, installation or modification work.'],
    verify: ['Verify', 'Discuss the checks and documentation needed for the equipment and its intended use.']
  };
  qsa('.stage').forEach(b => b.addEventListener('click', () => { pressGroup('.stage', b); setDetail('#process-detail', 'Process stage', ...stages[b.dataset.stage]); }));
  const select = qs('#inquiryType');
  function syncInquiry() { qsa('.challenge').forEach(b => { const active = b.dataset.challenge === select?.value; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); }); }
  qsa('.challenge').forEach(b => b.addEventListener('click', () => { if (select) select.value = b.dataset.challenge; syncInquiry(); }));
  select?.addEventListener('change', syncInquiry);
  const params = new URLSearchParams(location.search), requested = params.get('type');
  if (select && requested) { const value = { maintenance: 'Maintenance', failure: 'Failure', custom: 'Custom', product: 'Product' }[requested.toLowerCase()]; if (value) select.value = value; }
  syncInquiry();
  const product = params.get('product'), message = qs('#message');
  const productNames = ['Ball Tong Manipulators', 'Portable Shielding', 'Shielded Totes', 'Portable Shielding with Leaded-Glass Window', 'Micro Manipulators'];
  if (message && productNames.includes(product)) message.value = `Product enquiry: ${product}\n\nApplication / requirements: `;
  const form = qs('form'), status = qs('#form-status');
  form?.addEventListener('submit', async e => {
    e.preventDefault(); const button = qs('[type="submit"]', form); if (button.disabled) return; const original = button.textContent;
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 20000);
    button.disabled = true; button.textContent = 'Sending enquiry…'; status.textContent = '';
    try {
      const response = await fetch(form.action, { method: 'POST', signal: controller.signal, body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Delivery failed');
      form.reset(); syncInquiry(); status.textContent = 'Thank you. Your enquiry has been sent to Telodynamic.';
    } catch { status.textContent = 'Your enquiry could not be sent. Your details are still here. Please try again, or contact Telodynamic by email or phone.'; }
    finally { clearTimeout(timeout); button.disabled = false; button.textContent = original; status.focus(); }
  });
})();
