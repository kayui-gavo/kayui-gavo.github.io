(() => {
  const tabs = [...document.querySelectorAll('[data-guide-tab]')];
  const panels = [...document.querySelectorAll('[data-guide-panel]')];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0];
  let transitionToken = 0;
  let outAnimation = null;
  let inAnimation = null;

  const panelFor = tab => panels.find(panel => panel.dataset.guidePanel === tab?.dataset.guideTab);

  const setState = (tab, { focus = false } = {}) => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    if (focus) tab.focus({ preventScroll: true });
  };

  const showInstant = tab => {
    const target = panelFor(tab);
    panels.forEach(panel => {
      const selected = panel === target;
      panel.hidden = !selected;
      panel.classList.toggle('is-active', selected);
    });
  };

  const activate = async (tab, { focus = false, updateHash = false } = {}) => {
    if (!tab) return;
    if (tab === active) {
      setState(tab, { focus });
      return;
    }

    const token = ++transitionToken;
    const oldPanel = panelFor(active);
    const newPanel = panelFor(tab);
    active = tab;
    setState(tab, { focus });

    if (updateHash && history.replaceState) history.replaceState(null, '', `#${tab.dataset.guideTab}`);

    outAnimation?.cancel();
    inAnimation?.cancel();

    if (reduceMotion || !oldPanel?.animate || !newPanel?.animate) {
      showInstant(tab);
      return;
    }

    outAnimation = oldPanel.animate(
      [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-3px)' }],
      { duration: 115, easing: 'ease-out', fill: 'both' }
    );
    try { await outAnimation.finished; } catch (_) {}
    if (token !== transitionToken) return;

    oldPanel.hidden = true;
    oldPanel.classList.remove('is-active');
    newPanel.hidden = false;
    newPanel.classList.add('is-active');

    inAnimation = newPanel.animate(
      [{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 220, easing: 'cubic-bezier(.22,.82,.24,1)', fill: 'both' }
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
  setState(active);
  showInstant(active);

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
    }, { threshold: .1, rootMargin: '0px 0px -3% 0px' });
    revealTargets.forEach(node => observer.observe(node));
  }
})();
