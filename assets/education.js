(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.querySelector('.scroll-progress span');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
  };
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; updateProgress(); });
  }, { passive: true });
  updateProgress();

  const tabs = [...document.querySelectorAll('[data-course-tab]')];
  const panels = [...document.querySelectorAll('[data-course-panel]')];
  const setCourse = key => {
    tabs.forEach(tab => {
      const active = tab.dataset.courseTab === key;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.coursePanel !== key; });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setCourse(tab.dataset.courseTab));
    tab.addEventListener('keydown', event => {
      let next = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      if (next === null) return;
      event.preventDefault();
      const target = tabs[next];
      setCourse(target.dataset.courseTab);
      target.focus();
    });
  });
  if (tabs.length) setCourse(tabs.find(t => t.getAttribute('aria-selected') === 'true')?.dataset.courseTab || tabs[0].dataset.courseTab);

  const rail = document.querySelector('.student-media-grid');
  document.querySelector('[data-slide="prev"]')?.addEventListener('click', () => rail?.scrollBy({ left: -350, behavior: reduceMotion ? 'auto' : 'smooth' }));
  document.querySelector('[data-slide="next"]')?.addEventListener('click', () => rail?.scrollBy({ left: 350, behavior: reduceMotion ? 'auto' : 'smooth' }));

  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"],.mobile-jump-nav a[href^="#"]')];
  const sections = [...new Set(navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean))];
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      const active = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      const href = `#${active.target.id}`;
      navLinks.forEach(link => link.toggleAttribute('aria-current', link.getAttribute('href') === href));
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [.05,.2,.45] });
    sections.forEach(section => navObserver.observe(section));
  }
})();
