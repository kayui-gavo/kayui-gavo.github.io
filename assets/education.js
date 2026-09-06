(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  const setSourceWithFallback = (img, primary, fallback) => {
    if (!img) return;
    if (fallback) {
      img.addEventListener('error', () => {
        if (img.dataset.fallbackUsed) return;
        img.dataset.fallbackUsed = 'true';
        img.src = fallback;
      }, { once: true });
    }
    img.src = primary;
  };

  const setText = (selector, text) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
  };

  /* Copy pass: keep the page concise, concrete and natural in Chinese. */
  const heroThesis = document.querySelector('.hero-thesis');
  if (heroThesis) heroThesis.textContent = '从数学表达回到物理现象，从基本模型走向复杂问题。';
  setText('.hero-intro', '共通考试与 EJU 阶段，把基本规律、实验图表和典型模型练到稳定；进入理工科校内考后，再补充近似、微积分、数列与三角变换等工具。面对陌生设问时，要能从条件中识别模型，完成推导与记述。');
  setText('.editorial-head h2', '理解原理，识别模型，独立推导。');
  setText('.editorial-head > div > p:last-child', '基础阶段先讲清公式的物理意义、成立条件和典型模型；进入校内考后，再把不同章节里反复出现的结构串起来。弹簧、单摆、浮体与 LC 回路都可以归入简谐运动；驻波可以借助三角变换重新推导；重复过程常会落到数列与递推。');
  setText('.editorial-side', '难题考验的是条件提取、近似判断和推导组织。读懂题目后，还要明确研究对象与约束，选定定律，把中间步骤完整写出来。');

  const principles = document.querySelectorAll('.principle-grid-specific .principle');
  const principleCopy = [
    ['公式要有来路', '理解公式从哪里来、为什么成立，也要知道它在什么条件下才能使用。'],
    ['模型要能迁移', '看见不同章节、不同题面背后的共同结构，陌生题也能拆回熟悉的模型。'],
    ['推导要写得完整', '明确研究对象与约束，建立方程、处理近似，把每一步推理清楚地写出来。']
  ];
  principles.forEach((item, i) => {
    if (!principleCopy[i]) return;
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');
    if (h3) h3.textContent = principleCopy[i][0];
    if (p) p.textContent = principleCopy[i][1];
  });

  setText('.planning-head h2', '先看清怎么选拔，再决定怎么准备。');
  setText('.planning-head > p', '同一份 EJU、共通考试或英语成绩，在不同大学、不同选拔方式里的价值并不相同。先拆清哪些环节真正计分，再决定时间与精力放在哪里。');
  setText('.planning-punch', '把最有把握的部分，放到真正决定结果的评分环节上。');
  setText('.student-voices-head h2', '实际教学与录取反馈');
  setText('.student-voices-head > p', '以下为过往教学、考前准备与录取反馈节选。姓名、头像及其他可识别个人信息均已隐去；记录仅用于展示实际指导过程与反馈。');
  setText('.contact-copy > p', '咨询共通考试 / EJU 物理、理工科校内考、理科口试或报考规划时，请附上年级、目标校、目前成绩和希望解决的问题，便于判断适合的课程与准备顺序。');

  const portrait = document.querySelector('.portrait-frame img');
  if (portrait) {
    portrait.loading = 'eager';
    portrait.decoding = 'sync';
    setSourceWithFallback(portrait, '/assets/portrait.webp?v=20260813z');
  }

  const recordWall = document.querySelector('.student-record-collage');
  if (recordWall) {
    recordWall.removeAttribute('data-reveal');
    recordWall.innerHTML = `
      <div class="student-media-grid" aria-label="六组教学与录取记录">
        <figure class="student-shot"><img data-media="waseda-physics" alt="早稻田大学校内考物理班课相关聊天记录" loading="lazy" decoding="async"><figcaption>目标校真题与考点｜早稻田大学校内考物理</figcaption></figure>
        <figure class="student-shot"><img data-media="oral" alt="理科口试与口头试问准备相关聊天记录" loading="lazy" decoding="async"><figcaption>理科口试与口头试问准备</figcaption></figure>
        <figure class="student-shot"><img data-media="waseda" alt="早稻田大学录取反馈" loading="lazy" decoding="async"><figcaption>早稻田大学｜录取反馈</figcaption></figure>
        <figure class="student-shot"><img data-media="keio" alt="庆应义塾大学录取反馈" loading="lazy" decoding="async"><figcaption>庆应义塾大学｜录取反馈</figcaption></figure>
        <figure class="student-shot"><img data-media="kyoto" alt="京都大学药学部录取反馈" loading="lazy" decoding="async"><figcaption>京都大学药学部｜录取反馈</figcaption></figure>
        <figure class="student-shot"><img data-media="feedback" alt="学生课程反馈聊天记录" loading="lazy" decoding="async"><figcaption>学生课程反馈</figcaption></figure>
      </div>`;

    const media = {
      'waseda-physics': ['/assets/student-waseda-physics-v5.webp?v=20260813z', '/assets/student-waseda-physics.webp?v=20260813z'],
      oral: ['/assets/student-oral-reminder-v5.webp?v=20260813z', '/assets/student-oral-reminder.webp?v=20260813z'],
      waseda: ['/assets/student-waseda-admit-v5.webp?v=20260813z', '/assets/student-waseda-admit.webp?v=20260813z'],
      keio: ['/assets/student-keio-admit-v5.webp?v=20260813z', '/assets/student-keio-admit.webp?v=20260813z'],
      kyoto: ['/assets/student-kyoto-admit-v5.webp?v=20260813z', '/assets/student-kyoto-admit.webp?v=20260813z'],
      feedback: ['/assets/student-feedback-wechat-v5.webp?v=20260813z', '/assets/student-feedback-wechat.webp?v=20260813z']
    };
    recordWall.querySelectorAll('[data-media]').forEach(img => {
      const [primary, fallback] = media[img.dataset.media] || [];
      setSourceWithFallback(img, primary, fallback);
    });
  }

  const classroom = document.querySelector('.tabito-photo img');
  if (classroom) {
    classroom.loading = 'lazy';
    classroom.decoding = 'async';
    setSourceWithFallback(classroom, '/assets/tabito-classroom-v5.webp?v=20260813z', '/assets/tabito-classroom-v4.webp?v=20260813z');
  }

  const tabitoInfo = document.querySelector('.tabito-info');
  if (tabitoInfo) {
    let logo = tabitoInfo.querySelector('.tabito-logo-float');
    if (!logo) {
      logo = document.createElement('img');
      logo.className = 'tabito-logo-float';
      logo.alt = 'TABITO 中国旅人教育集团株式会社 Logo';
      logo.loading = 'lazy';
      logo.decoding = 'async';
      const link = tabitoInfo.querySelector('.tabito-logo-link');
      if (link) link.append(logo);
      else tabitoInfo.prepend(logo);
    }
    setSourceWithFallback(logo, '/assets/tabito-logo-official.jpg?v=20260813z', '/assets/tabito-logo-small.jpg?v=20260813z');
  }

  const experienceHeadCopy = document.querySelector('.experience-head > p');
  if (experienceHeadCopy) {
    experienceHeadCopy.textContent = '从 EJU 大班、一对一到热门大学校内考，也承担过京都大学的教学支持。现于旅人教育负责本科入试物理，并参与课程设计与教材开发。';
  }
  const experienceList = document.querySelector('.experience-list');
  if (experienceList) {
    const items = [...experienceList.querySelectorAll('.experience-item')];
    const current = items.find(item => item.classList.contains('experience-item--current'));
    const kyoto = items.find(item => item.classList.contains('experience-item--kyoto') || item.querySelector('strong')?.textContent.includes('時間雇用教職員'));
    const gyouchi = items.find(item => item.querySelector('strong')?.textContent.includes('行知学园'));

    if (current) {
      current.classList.add('experience-item--primary');
      const copy = current.querySelector('p');
      if (copy) copy.textContent = '共通考试 / EJU 物理、理工科校内考、理科口试，以及课程设计、教材开发与本科入试指导。';
    }
    if (gyouchi) {
      const copy = gyouchi.querySelector('p');
      if (copy) copy.textContent = 'EJU 物理大班（基础班、冲刺班、刷题班），数学、物理一对一，热门大学校内考班课与一对一，以及志望理由、面试与口头试问指导。';
    }
    if (kyoto) kyoto.classList.remove('experience-item--kyoto');
    if (gyouchi && kyoto) experienceList.insertBefore(gyouchi, kyoto);
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

  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"], .mobile-jump-nav a[href^="#"]')];
  const sectionById = new Map();
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const section = href ? document.querySelector(href) : null;
    if (section && section.id) sectionById.set(section.id, section);
  });
  const sections = [...sectionById.values()];
  if ('IntersectionObserver' in window && sections.length) {
    const activeObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible?.target?.id) return;
      const activeHref = `#${visible.target.id}`;
      navLinks.forEach(link => link.toggleAttribute('aria-current', link.getAttribute('href') === activeHref));
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0.05, 0.2, 0.45] });
    sections.forEach(section => activeObserver.observe(section));
  }
})();