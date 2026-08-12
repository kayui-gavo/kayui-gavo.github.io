(() => {
  const tabs = Array.from(document.querySelectorAll('[data-guide-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-guide-panel]'));

  const activate = (tab, focus = false) => {
    const key = tab.dataset.guideTab;
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      const selected = panel.dataset.guidePanel === key;
      panel.hidden = !selected;
      panel.classList.toggle('is-active', selected);
    });
    if (focus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      let next = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs[tabs.length - 1];
      if (!next) return;
      event.preventDefault();
      activate(next, true);
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -28px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const portrait = document.querySelector('[data-portrait]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (portrait && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    portrait.addEventListener('pointermove', (event) => {
      const rect = portrait.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      portrait.style.transform = `perspective(900px) rotateY(${x * 1.7}deg) rotateX(${-y * 1.4}deg) translateY(-2px)`;
      portrait.style.boxShadow = '0 28px 58px rgba(28,41,69,.14)';
    });
    portrait.addEventListener('pointerleave', () => {
      portrait.style.transform = '';
      portrait.style.boxShadow = '';
    });
  }
})();