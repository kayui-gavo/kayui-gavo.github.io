/* Education interactions, v2. Profile and course facts remain static HTML. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const tabs = [...document.querySelectorAll('[data-course-tab]')];
  const panels = [...document.querySelectorAll('[data-course-panel]')];
  function selectCourse(index, focus = false) {
    if (!tabs[index]) return;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.coursePanel !== tabs[index].dataset.courseTab; });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectCourse(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (index + 1) % tabs.length;
      if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectCourse(next, true);
    });
  });
  if (tabs.length) selectCourse(0);
  document.documentElement.classList.replace('no-js', 'js');

  // Keep anchor offsets correct when the header wraps or text is enlarged.
  const header = document.querySelector('.site-header');
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"], .mobile-jump-nav a[href^="#"]')];
  const targets = [...new Set(navLinks.map(link => link.hash))]
    .map(hash => document.getElementById(hash.slice(1))).filter(Boolean);
  let headerHeight = 0;
  let pending = false;
  let previousSection = '';
  function syncNav() {
    pending = false;
    const threshold = headerHeight + 48;
    let current = '';
    let closestTop = -Infinity;
    targets.forEach(target => {
      const top = target.getBoundingClientRect().top;
      if (top <= threshold && top > closestTop) { current = '#' + target.id; closestTop = top; }
    });
    // Sections without a navigation entry must not leave a misleading highlight.
    const feedback = document.querySelector('.student-voices-section');
    const contact = document.getElementById('contact');
    const containsLine = node => node && node.getBoundingClientRect().top <= threshold && node.getBoundingClientRect().bottom > threshold;
    if (containsLine(feedback) || containsLine(contact)) current = '';
    if (current === previousSection) return;
    previousSection = current;
    navLinks.forEach(link => {
      const desktopLab = current === '#physics-lab' && link.closest('.nav-links') && link.hash === '#teaching';
      if (link.hash === current || desktopLab) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function requestNavSync() {
    if (!pending) { pending = true; requestAnimationFrame(syncNav); }
  }
  function measureHeader() {
    if (!header) return;
    headerHeight = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
    requestNavSync();
  }
  if (header) {
    measureHeader();
    if ('ResizeObserver' in window) new ResizeObserver(measureHeader).observe(header);
    window.addEventListener('resize', measureHeader, {passive:true});
    window.addEventListener('scroll', requestNavSync, {passive:true});
    window.addEventListener('load', measureHeader, {once:true});
  }

  const gallery = document.querySelector('.student-media-grid');
  const prev = document.querySelector('[data-gallery-prev]');
  const next = document.querySelector('[data-gallery-next]');
  const position = document.querySelector('[data-gallery-position]');
  if (gallery && prev && next) {
    const cards = [...gallery.querySelectorAll('.student-shot')];
    const step = () => (cards[0]?.getBoundingClientRect().width || 280) + (parseFloat(getComputedStyle(gallery).columnGap) || 0);
    const sync = () => {
      const max = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      prev.disabled = gallery.scrollLeft <= 2;
      next.disabled = gallery.scrollLeft >= max - 2;
      const bounds = gallery.getBoundingClientRect();
      const visible = cards.map((card, i) => ({i, r:card.getBoundingClientRect()}))
        .filter(({r}) => r.left >= bounds.left - 2 && r.right <= bounds.right + 2);
      const fallback = Math.min(cards.length, Math.max(1, Math.round(gallery.scrollLeft / step()) + 1));
      const first = visible.length ? visible[0].i + 1 : fallback;
      const last = visible.length ? visible[visible.length - 1].i + 1 : fallback;
      const value = `${first === last ? first : first + '–' + last} / ${cards.length}`;
      if (position && position.textContent !== value) position.textContent = value;
    };
    const advance = direction => gallery.scrollBy({left: direction * step(), behavior: reduceMotion.matches ? 'auto' : 'smooth'});
    prev.addEventListener('click', () => advance(-1));
    next.addEventListener('click', () => advance(1));
    gallery.addEventListener('scroll', sync, {passive:true});
    window.addEventListener('resize', sync, {passive:true});
    gallery.addEventListener('keydown', event => {
      if (event.target !== gallery || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'ArrowLeft') advance(-1);
      else if (event.key === 'ArrowRight') advance(1);
      else gallery.scrollTo({left:event.key === 'Home' ? 0 : gallery.scrollWidth, behavior:reduceMotion.matches ? 'auto' : 'smooth'});
    });
    if ('ResizeObserver' in window) new ResizeObserver(sync).observe(gallery);
    sync();
  }

  const dialog = document.querySelector('.image-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    let trigger = null;
    let previousOverflow = '';
    let scrollLocked = false;
    const image = dialog.querySelector('.dialog-image');
    const title = dialog.querySelector('#image-dialog-title');
    document.querySelectorAll('[data-lightbox]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        trigger = link;
        const thumbnail = link.querySelector('img');
        image.src = link.href;
        image.alt = thumbnail?.alt || '';
        title.textContent = thumbnail?.alt || '';
        dialog.classList.toggle('is-qr', link.classList.contains('qr-image-link'));
        if (!scrollLocked) previousOverflow = document.body.style.overflow;
        scrollLocked = true;
        document.body.style.overflow = 'hidden';
        dialog.showModal();
        dialog.scrollTop = 0;
      });
    });
    const restorePage = () => {
      if (dialog.open || !scrollLocked) return;
      document.body.style.overflow = previousOverflow;
      scrollLocked = false;
      trigger?.focus({preventScroll:true});
    };
    const closeImage = () => {
      dialog.close();
      restorePage();
    };
    dialog.querySelector('[data-dialog-close]')?.addEventListener('click', closeImage);
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeImage(); });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeImage();
    });
    dialog.addEventListener('close', restorePage);
  }
})();
