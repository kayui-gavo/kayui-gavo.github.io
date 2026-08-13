(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  const mediaStyle = document.createElement('style');
  mediaStyle.textContent = `
    .hero-visual,.portrait-stage,.portrait-frame,.portrait-frame img{opacity:1!important;visibility:visible!important;display:block!important;filter:none!important}
    .portrait-frame img{width:100%!important;height:100%!important;object-fit:cover!important;object-position:center 42%!important;transform:none!important;animation:none!important}

    .student-record-collage{display:block!important;width:100%!important;max-width:1040px!important;margin:30px auto 0!important;background:none!important;border:0!important;box-shadow:none!important;overflow:visible!important}
    .student-media-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:14px!important;align-items:start!important}
    .student-media-grid .student-shot{display:block!important;grid-column:auto!important;margin:0!important;transform:none!important;background:#181a1e!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:8px!important;overflow:hidden!important;box-shadow:0 14px 32px rgba(0,0,0,.16)!important}
    .student-media-grid .student-shot img{display:block!important;width:100%!important;height:auto!important;max-height:none!important;object-fit:contain!important;opacity:1!important;visibility:visible!important;filter:none!important;background:#eee!important}
    .student-media-grid .student-shot figcaption{display:block!important;padding:9px 11px 10px!important;border-top:1px solid rgba(255,255,255,.08)!important;font-size:11.5px!important;line-height:1.5!important;color:#cbc7c0!important}

    .material-feature{background:#f8f4ee!important;border:1px solid rgba(116,72,81,.18)!important;color:#18191d!important;box-shadow:0 16px 34px rgba(38,28,29,.06)!important}
    .material-feature>div:first-child small{color:#80535d!important;font-weight:750!important;font-size:12px!important;letter-spacing:.08em!important}
    .material-feature>div:first-child strong{color:#241d20!important;font-size:22px!important;line-height:1.35!important}
    .material-feature>div:first-child span{color:#4e4948!important;font-size:13px!important;line-height:1.65!important}
    .material-feature>p{color:#4b4745!important;font-size:13.5px!important;line-height:1.78!important}
    .material-index{border-top-color:rgba(116,72,81,.18)!important}
    .material-index span{display:inline-flex!important;align-items:center!important;min-height:30px!important;padding:5px 10px!important;border:1px solid rgba(116,72,81,.15)!important;background:#fffaf5!important;border-radius:999px!important;color:#604d51!important;font-size:12px!important;font-weight:650!important}

    .tabito-photo{background:#dbe1e4!important}
    .tabito-photo>img{display:block!important;width:100%!important;height:100%!important;min-height:270px!important;object-fit:cover!important;object-position:center!important;opacity:1!important;visibility:visible!important;filter:none!important;transform:none!important;animation:none!important}
    .tabito-brand-lockup{display:block;width:min(100%,360px);margin:0 0 22px;border-radius:12px;box-shadow:0 13px 28px rgba(35,80,103,.13)}

    @media(max-width:900px){.student-media-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @media(max-width:600px){.student-media-grid{grid-template-columns:1fr!important;max-width:390px!important;margin-inline:auto!important}.student-record-collage{margin-top:22px!important}.student-media-grid .student-shot figcaption{font-size:12px!important}.tabito-photo>img{min-height:210px!important}.tabito-brand-lockup{width:min(100%,320px)}}
  `;
  document.head.appendChild(mediaStyle);

  const portrait = document.querySelector('.portrait-frame img');
  if (portrait) {
    portrait.src = '/assets/portrait.webp?v=20260813p';
    portrait.loading = 'eager';
    portrait.decoding = 'sync';
  }

  const recordWall = document.querySelector('.student-record-collage');
  if (recordWall) {
    recordWall.removeAttribute('data-reveal');
    recordWall.innerHTML = `
      <div class="student-media-grid" aria-label="六组教学与录取记录">
        <figure class="student-shot"><img src="/assets/student-waseda-physics-v5.webp?v=20260813p" data-fallback="/assets/student-waseda-physics.webp?v=20260813p" alt="早稻田大学校内考物理班课相关聊天记录" loading="eager" decoding="async"><figcaption>目标校真题与考点｜早稻田大学校内考物理</figcaption></figure>
        <figure class="student-shot"><img src="/assets/student-oral-reminder-v5.webp?v=20260813p" data-fallback="/assets/student-oral-reminder.webp?v=20260813p" alt="学生感谢提醒准备口头试问的聊天记录" loading="eager" decoding="async"><figcaption>理科口试与口头试问准备</figcaption></figure>
        <figure class="student-shot"><img src="/assets/student-waseda-admit-v5.webp?v=20260813p" data-fallback="/assets/student-waseda-admit.webp?v=20260813p" alt="早稻田大学录取反馈" loading="eager" decoding="async"><figcaption>早稻田大学｜录取反馈</figcaption></figure>
        <figure class="student-shot"><img src="/assets/student-keio-admit-v5.webp?v=20260813p" data-fallback="/assets/student-keio-admit.webp?v=20260813p" alt="庆应义塾大学录取反馈" loading="eager" decoding="async"><figcaption>庆应义塾大学｜录取反馈</figcaption></figure>
        <figure class="student-shot"><img src="/assets/student-kyoto-admit-v5.webp?v=20260813p" data-fallback="/assets/student-kyoto-admit.webp?v=20260813p" alt="京都大学药学部录取反馈" loading="eager" decoding="async"><figcaption>京都大学药学部｜录取反馈</figcaption></figure>
        <figure class="student-shot"><img src="/assets/student-feedback-wechat.webp?v=20260813p" data-fallback="/assets/student-feedback-wechat-v5.webp?v=20260813p" alt="学生感谢刘可惟老师的聊天记录" loading="eager" decoding="async"><figcaption>学生课程反馈</figcaption></figure>
      </div>`;

    recordWall.querySelectorAll('img[data-fallback]').forEach(img => {
      img.addEventListener('error', () => {
        const fallback = img.dataset.fallback;
        if (!fallback || img.dataset.fallbackUsed === '1') return;
        img.dataset.fallbackUsed = '1';
        img.src = fallback;
      }, { once: true });
    });
  }

  const classroom = document.querySelector('.tabito-photo img');
  if (classroom) {
    classroom.src = '/assets/tabito-classroom-v5.webp?v=20260813p';
    classroom.loading = 'eager';
    classroom.decoding = 'sync';
    classroom.addEventListener('error', () => {
      if (classroom.dataset.fallbackUsed === '1') return;
      classroom.dataset.fallbackUsed = '1';
      classroom.src = '/assets/tabito-classroom.webp?v=20260813p';
    }, { once: true });
  }

  const tabitoInfo = document.querySelector('.tabito-info');
  if (tabitoInfo && !tabitoInfo.querySelector('.tabito-brand-lockup')) {
    const logo = document.createElement('img');
    logo.className = 'tabito-brand-lockup';
    logo.src = '/assets/tabito-brand-lockup.svg?v=20260813p';
    logo.alt = '旅人学堂 TABITO EDUCATION 中国旅人教育集団株式会社';
    logo.loading = 'eager';
    logo.decoding = 'async';
    tabitoInfo.prepend(logo);
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
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach(node => revealObserver.observe(node));
  }

  const tabs = [...document.querySelectorAll('[data-course-tab]')];
  const panels = [...document.querySelectorAll('[data-course-panel]')];
  const setCourse = (key, { focus = false } = {}) => {
    const activeTab = tabs.find(tab => tab.dataset.courseTab === key) || tabs[0];
    const activePanel = panels.find(panel => panel.dataset.coursePanel === key) || panels[0];
    tabs.forEach(tab => {
      const active = tab === activeTab;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => panel.hidden = panel !== activePanel);
    if (focus) activeTab?.focus({ preventScroll: true });
    if (!reduceMotion && activePanel?.animate) {
      activePanel.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'cubic-bezier(.2,.7,.2,1)' });
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
  if (tabs.length) setCourse(tabs.find(tab => tab.getAttribute('aria-selected') === 'true')?.dataset.courseTab || tabs[0].dataset.courseTab);

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
