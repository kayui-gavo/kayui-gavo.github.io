/* Interactions only. All biography and course copy lives in HTML. */
(() => {
  'use strict';
  const tabs = [...document.querySelectorAll('[data-course-tab]')];
  const panels = [...document.querySelectorAll('[data-course-panel]')];
  function selectCourse(index, focus = false) {
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

  const gallery = document.querySelector('.student-media-grid');
  const prev = document.querySelector('[data-gallery-prev]');
  const next = document.querySelector('[data-gallery-next]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (gallery && prev && next) {
    const sync = () => {
      prev.disabled = gallery.scrollLeft <= 2;
      next.disabled = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 2;
    };
    const advance = direction => {
      const card = gallery.querySelector('.student-shot');
      const gap = parseFloat(getComputedStyle(gallery).columnGap) || 0;
      gallery.scrollBy({left: direction * ((card?.getBoundingClientRect().width || 280) + gap), behavior: reduceMotion.matches ? 'auto' : 'smooth'});
    };
    prev.addEventListener('click', () => advance(-1));
    next.addEventListener('click', () => advance(1));
    gallery.addEventListener('scroll', sync, {passive: true});
    window.addEventListener('resize', sync, {passive: true});
    sync();
  }

  const dialog = document.querySelector('.image-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    let trigger = null;
    let previousOverflow = '';
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
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialog.showModal();
      });
    });
    dialog.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow;
      trigger?.focus({preventScroll: true});
    });
  }
})();
