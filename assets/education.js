(() => {
  const tabs = Array.from(document.querySelectorAll('[data-guide-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-guide-panel]'));
  const tablist = document.querySelector('.track-tabs');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeKey = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true')?.dataset.guideTab || tabs[0]?.dataset.guideTab;
  let animating = false;

  document.documentElement.classList.add('motion-ready');

  const updateIndicator = (tab) => {
    if (!tablist || !tab || window.innerWidth <= 680) return;
    const listRect = tablist.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    tablist.style.setProperty('--indicator-left', `${Math.round(tabRect.left - listRect.left)}px`);
    tablist.style.setProperty('--indicator-width', `${Math.round(tabRect.width)}px`);
  };

  const panelFor = (key) => panels.find((panel) => panel.dataset.guidePanel === key);

  const setTabState = (tab, { focus = false } = {}) => {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    updateIndicator(tab);
    if (focus) tab.focus({ preventScroll: true });
  };

  const hidePanel = async (panel) => {
    if (!panel) return;
    if (!reduceMotion && panel.animate) {
      const animation = panel.animate([
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-5px)' }
      ], { duration: 125, easing: 'cubic-bezier(.4,0,.8,.2)', fill: 'both' });
      try { await animation.finished; } catch (_) {}
    }
    panel.hidden = true;
    panel.classList.remove('is-active');
  };

  const showPanel = (panel) => {
    if (!panel) return;
    panel.hidden = false;
    panel.classList.add('is-active');
    if (reduceMotion || !panel.animate) return;

    panel.animate([
      { opacity: 0, transform: 'translateY(8px)', clipPath: 'inset(7% 0 0 0)' },
      { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' }
    ], { duration: 350, easing: 'cubic-bezier(.22,.86,.25,1)', fill: 'both' });

    const main = panel.querySelector('.panel-main');
    const list = panel.querySelector('.topic-list');
    if (main?.animate) {
      main.animate([
        { opacity: .25, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 370, delay: 20, easing: 'cubic-bezier(.22,.86,.25,1)', fill: 'both' });
    }
    if (list?.animate) {
      list.animate([
        { opacity: .18, transform: 'translateX(8px)' },
        { opacity: 1, transform: 'translateX(0)' }
      ], { duration: 430, delay: 45, easing: 'cubic-bezier(.22,.86,.25,1)', fill: 'both' });
    }
  };

  const activate = async (tab, { focus = false, updateHash = false, instant = false } = {}) => {
    if (!tab) return;
    const key = tab.dataset.guideTab;
    if (key === activeKey && panelFor(key)?.classList.contains('is-active')) {
      setTabState(tab, { focus });
      return;
    }
    if (animating && !instant) return;
    animating = true;

    const oldPanel = panelFor(activeKey);
    const newPanel = panelFor(key);
    activeKey = key;
    setTabState(tab, { focus });

    if (instant) {
      panels.forEach((panel) => {
        const selected = panel === newPanel;
        panel.hidden = !selected;
        panel.classList.toggle('is-active', selected);
      });
    } else {
      await hidePanel(oldPanel);
      showPanel(newPanel);
    }

    if (updateHash && history.replaceState) history.replaceState(null, '', `#${key}`);
    animating = false;
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab, { updateHash: true }));
    tab.addEventListener('keydown', (event) => {
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

  const selectFromHash = () => {
    const key = location.hash.replace('#', '');
    const matchingTab = tabs.find((tab) => tab.dataset.guideTab === key);
    if (matchingTab) {
      activeKey = key;
      setTabState(matchingTab);
      panels.forEach((panel) => {
        const selected = panel.dataset.guidePanel === key;
        panel.hidden = !selected;
        panel.classList.toggle('is-active', selected);
      });
    }
  };

  if (location.hash) selectFromHash();
  else {
    const initial = tabs.find((tab) => tab.dataset.guideTab === activeKey);
    setTabState(initial);
    panels.forEach((panel) => {
      const selected = panel.dataset.guidePanel === activeKey;
      panel.hidden = !selected;
      panel.classList.toggle('is-active', selected);
    });
  }

  requestAnimationFrame(() => updateIndicator(tabs.find((tab) => tab.dataset.guideTab === activeKey)));
  window.addEventListener('resize', () => updateIndicator(tabs.find((tab) => tab.dataset.guideTab === activeKey)), { passive: true });
  window.addEventListener('hashchange', selectFromHash);

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const sections = document.querySelectorAll('.record,.guide,.experience,.page-links');
    sections.forEach((section) => section.classList.add('reveal-section'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });
    sections.forEach((section) => observer.observe(section));
  }
})();
