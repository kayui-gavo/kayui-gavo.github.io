(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  const setSourceWithFallback = (img, primary, fallback) => {
    if (!img) return;
    img.src = primary;
    if (fallback) {
      img.addEventListener('error', () => {
        if (img.dataset.fallbackUsed) return;
        img.dataset.fallbackUsed = 'true';
        img.src = fallback;
      }, { once: true });
    }
  };

  const portrait = document.querySelector('.portrait-frame img');
  if (portrait) {
    portrait.loading = 'eager';
    portrait.decoding = 'sync';
    setSourceWithFallback(portrait, '/assets/portrait.webp?v=20260813p');
  }

  const recordWall = document.querySelector('.student-record-collage');
  if (recordWall) {
    recordWall.removeAttribute('data-reveal');
    recordWall.innerHTML = `
      <div class="student-media-grid" aria-label="六组教学与录取记录">
        <figure class="student-shot"><img data-media="waseda-physics" alt="早稻田大学校内考物理班课相关聊天记录" loading="lazy" decoding="async"><figcaption>目标校真题与考点｜早稻田大学校内考物理</figcaption></figure>
        <figure class="student-shot"><img data-media="oral" alt="学生感谢提醒准备口头试问的聊天记录" loading="lazy" decoding="async"><figcaption>理科口试与口头试问准备</figcaption></figure>
        <figure class="student-shot"><img data-media="waseda" alt="早稻田大学录取反馈" loading="lazy" decoding="async"><figcaption>早稻田大学｜录取反馈</figcaption></figure>
        <figure class="student-shot"><img data-media="keio" alt="庆应义塾大学录取反馈" loading="lazy" decoding="async"><figcaption>庆应义塾大学｜录取反馈</figcaption></figure>
        <figure class="student-shot"><img data-media="kyoto" alt="京都大学药学部录取反馈" loading="lazy" decoding="async"><figcaption>京都大学药学部｜录取反馈</figcaption></figure>
        <figure class="student-shot"><img data-media="feedback" alt="学生感谢刘可惟老师的聊天记录" loading="lazy" decoding="async"><figcaption>学生课程反馈</figcaption></figure>
      </div>`;

    const media = {
      'waseda-physics': ['/assets/student-waseda-physics-v5.webp?v=20260813p', '/assets/student-waseda-physics.webp?v=20260813p'],
      oral: ['/assets/student-oral-reminder-v5.webp?v=20260813p', '/assets/student-oral-reminder.webp?v=20260813p'],
      waseda: ['/assets/student-waseda-admit-v5.webp?v=20260813p', '/assets/student-waseda-admit.webp?v=20260813p'],
      keio: ['/assets/student-keio-admit-v5.webp?v=20260813p', '/assets/student-keio-admit.webp?v=20260813p'],
      kyoto: ['/assets/student-kyoto-admit-v5.webp?v=20260813p', '/assets/student-kyoto-admit.webp?v=20260813p'],
      feedback: ['/assets/student-feedback-wechat.webp?v=20260813p', '/assets/student-feedback-wechat-v5.webp?v=20260813p']
    };
    recordWall.querySelectorAll('[data-media]').forEach(img => {
      const [primary, fallback] = media[img.dataset.media] || [];
      setSourceWithFallback(img, primary, fallback);
    });
  }

  const classroom = document.querySelector('.tabito-photo img');
  if (classroom) {
    classroom.loading = 'eager';
    classroom.decoding = 'async';
    setSourceWithFallback(classroom, '/assets/tabito-classroom-v5.webp?v=20260813p', '/assets/tabito-classroom-v4.webp?v=20260813p');
  }

  const tabitoInfo = document.querySelector('.tabito-info');
  if (tabitoInfo) {
    let logo = tabitoInfo.querySelector('.tabito-logo-float');
    if (!logo) {
      logo = document.createElement('img');
      logo.className = 'tabito-logo-float';
      logo.alt = 'TABITO 中国旅人教育集団株式会社 ロゴ';
      logo.loading = 'lazy';
      logo.decoding = 'async';
      tabitoInfo.prepend(logo);
    }
    setSourceWithFallback(logo, '/assets/tabito-logo-official.jpg?v=20260813p', '/assets/tabito-logo.webp?v=20260813p');
  }

  requestAnimationFrame(() => body.classList.add('is-ready'));

  const progressBar = document.querySelector('.scroll-progress span');
  let ticking = false;
  const updateProgress = () => {
    ticking = false;
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progressBar.style.transform = `scaleX(${ratio})`;
  };
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateProgress);
  }, { passive: true });
  updateProgress();

  const revealTargets = [...document.querySelectorAll('[data-reveal]')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(node => node.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    revealTargets.forEach(node => revealObserver.observe(node));
  }

  const tabs = [...document.querySelectorAll('[data-course-tab]')];
  const panels = [...document.querySelectorAll('[data-course-panel]')];
  const setCourse = (key, { focus = false } = {}) => {
    const activeTab = tabs.find(tab => tab.dataset.courseTab === key) || tabs[0];
    const activePanel = panels.find(panel => panel.dataset.coursePanel === key) || panels[0];
    if (!activeTab || !activePanel) return;
    tabs.forEach(tab => {
      const active = tab === activeTab;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel !== activePanel; });
    if (focus) activeTab.focus({ preventScroll: true });
    if (!reduceMotion && activePanel.animate) {
      activePanel.animate([
        { opacity: 0, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 230, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setCourse(tab.dataset.courseTab));
    tab.addEventListener('keydown', event => {
      let nextIndex = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      setCourse(tabs[nextIndex].dataset.courseTab, { focus: true });
    });
  });
  if (tabs.length) {
    setCourse(tabs.find(tab => tab.getAttribute('aria-selected') === 'true')?.dataset.courseTab || tabs[0].dataset.courseTab);
  }

  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sectionMap = navLinks.map(link => ({ link, section: document.querySelector(link.getAttribute('href')) })).filter(item => item.section);
  if ('IntersectionObserver' in window && sectionMap.length) {
    const activeObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const match = sectionMap.find(item => item.section === visible.target);
      if (!match) return;
      sectionMap.forEach(item => item.link.toggleAttribute('aria-current', item === match));
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0.05, 0.2, 0.45] });
    sectionMap.forEach(item => activeObserver.observe(item.section));
  }
})();