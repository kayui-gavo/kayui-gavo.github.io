(() => {
  const tabs = [...document.querySelectorAll('[data-guide-tab]')];
  const panels = [...document.querySelectorAll('[data-guide-panel]')];
  const tablist = document.querySelector('.track-tabs');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateIndicator = (tab) => {
    if (!tablist || !tab || innerWidth <= 700) return;
    const listRect = tablist.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    tablist.style.setProperty('--indicator-left', `${Math.round(tabRect.left - listRect.left)}px`);
    tablist.style.setProperty('--indicator-width', `${Math.round(tabRect.width)}px`);
  };

  let active = tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0];

  const setState = (tab, { focus = false } = {}) => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    if (focus) tab.focus({ preventScroll: true });
    updateIndicator(tab);
  };

  const panelFor = tab => panels.find(panel => panel.dataset.guidePanel === tab?.dataset.guideTab);

  const activate = async (tab, { focus = false, updateHash = false } = {}) => {
    if (!tab) return;
    const oldPanel = panelFor(active);
    const newPanel = panelFor(tab);

    if (tab === active) {
      setState(tab, { focus });
      return;
    }

    active = tab;
    setState(tab, { focus });

    if (updateHash && history.replaceState) {
      history.replaceState(null, '', `#${tab.dataset.guideTab}`);
    }

    if (reduceMotion || !oldPanel?.animate || !newPanel?.animate) {
      panels.forEach(panel => {
        const selected = panel === newPanel;
        panel.hidden = !selected;
        panel.classList.toggle('is-active', selected);
      });
      return;
    }

    const out = oldPanel.animate(
      [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-4px)' }],
      { duration: 145, easing: 'cubic-bezier(.4,0,.7,.2)', fill: 'both' }
    );
    try { await out.finished; } catch (_) {}

    oldPanel.hidden = true;
    oldPanel.classList.remove('is-active');
    newPanel.hidden = false;
    newPanel.classList.add('is-active');

    newPanel.animate(
      [
        { opacity: 0, transform: 'translateY(7px)', clipPath: 'inset(5% 0 0 0)' },
        { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' }
      ],
      { duration: 360, easing: 'cubic-bezier(.22,.8,.24,1)', fill: 'both' }
    );
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab, { updateHash: true }));
    tab.addEventListener('keydown', event => {
      let next = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs[tabs.length - 1];
      if (!next) return;
      event.preventDefault();
      activate(next, { focus: true, updateHash: true });
    });
  });

  const hashKey = location.hash.replace('#', '');
  const hashTab = tabs.find(tab => tab.dataset.guideTab === hashKey);
  if (hashTab) active = hashTab;

  panels.forEach(panel => {
    const selected = panel === panelFor(active);
    panel.hidden = !selected;
    panel.classList.toggle('is-active', selected);
  });
  setState(active);
  requestAnimationFrame(() => updateIndicator(active));
  addEventListener('resize', () => updateIndicator(active), { passive: true });

  const revealTargets = [
    document.querySelector('.record'),
    document.querySelector('.guide'),
    document.querySelector('.experience'),
    document.querySelector('.page-links')
  ].filter(Boolean);

  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach(node => node.classList.add('reveal-section'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -4% 0px' });
    revealTargets.forEach(node => observer.observe(node));
  }
})();