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
  if (heroThesis) heroThesis.textContent = '物理课程・本科入试指导';
  setText('.hero-intro', '主要负责共通考试 / EJU 物理、理工科校内考和理科口试。共通考试 / EJU 课程包括基本规律、实验图表、典型题型和综合题；校内考根据目标院校真题补充近似、微积分、数列、三角变换等常用方法，并训练长题干、推导和书面作答。');
  setText('.editorial-head h2', '物理课程与训练内容');
  setText('.editorial-head > div > p:last-child', '共通考试 / EJU 课程以高中物理范围为主，包含基本定律、典型题型、实验与图表题、单位和数量级。理工科校内考根据目标院校真题增加近似处理、微积分、数列、三角变换等内容，并安排长题干、推导和记述训练。');
  setText('.editorial-side', '公式会结合现象、图像和实验说明适用条件；同一知识点的典型题与变式集中安排，便于比较题设变化对应的处理方法。');

  const principles = document.querySelectorAll('.principle-grid-specific .principle');
  const principleCopy = [
    ['公式与适用条件', '结合现象、图像和实验说明公式的含义、来源和适用条件。'],
    ['典型题与变式', '同一知识点的典型题和变式集中练习，比较题设变化对应的处理方法。'],
    ['推导与书面作答', '根据目标院校历年真题训练条件提取、近似处理、推导步骤和书面作答。']
  ];
  principles.forEach((item, i) => {
    if (!principleCopy[i]) return;
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');
    if (h3) h3.textContent = principleCopy[i][0];
    if (p) p.textContent = principleCopy[i][1];
  });

  setText('.planning-head h2', '本科报考与选拔方式');
  setText('.planning-head > p', '根据当前成绩、目标专业、可用考试成绩和备考时间，逐校整理材料审查、校内考、面试 / 口试，以及 EJU、共通考试和英语成绩的要求与计分方式。');
  setText('.planning-punch', '报考方案根据目标专业、现有成绩、考试日程和各项成绩的计分方式确定。');
  setText('.student-voices-head h2', '实际教学与录取反馈');
  setText('.student-voices-head > p', '以下为过往教学、考前准备与录取反馈节选。姓名、头像及其他可识别个人信息均已隐去；记录仅用于展示实际指导过程与反馈。');
  setText('.contact-copy > p', '咨询共通考试 / EJU 物理、理工科校内考、理科口试或报考规划时，请附上年级、目标校、目前成绩和希望解决的问题，便于判断适合的课程与准备顺序。');
  setText('.planning-strategy h3', '院校选拔方式与配点');
  setText('.planning-interview h3', '志望理由・面试・理科口试');
  setText('.planning-interview > p', '根据目标学部、学科、课程、研究室与教授信息整理志望理由，并结合本人经历准备面试追问和专业口试。书面材料与现场回答保持事实和志望方向一致。');

  const courseTabs = document.querySelectorAll('.course-tab');
  if (courseTabs[0]?.querySelector('strong')) courseTabs[0].querySelector('strong').textContent = '基础・实验・综合';
  if (courseTabs[1]?.querySelector('strong')) courseTabs[1].querySelector('strong').textContent = '数学方法・推导・记述';

  const commonPanel = document.querySelector('[data-course-panel="common"]');
  if (commonPanel) {
    setText('[data-course-panel="common"] h3', '共通考试 / EJU 物理');
    setText('[data-course-panel="common"] > p', '课程系统整理基本定律与典型题型，并训练实验、图表、单位、数量级、文字条件和常见综合题。');
  }
  const schoolPanel = document.querySelector('[data-course-panel="school"]');
  if (schoolPanel) {
    setText('[data-course-panel="school"] h3', '理工科校内考物理');
    setText('[data-course-panel="school"] > p', '根据目标院校历年真题补充近似处理、微积分、数列、三角变换等常用方法，并训练长题干、推导过程和规范书写。');
  }


  const installFeaturedCourse = () => {
    if (document.querySelector('#featured-course')) return;
    const hero = document.querySelector('#top');
    if (!hero) return;

    const section = document.createElement('section');
    section.className = 'featured-course section-shell';
    section.id = 'featured-course';
    section.setAttribute('aria-labelledby', 'featured-course-title');
    section.innerHTML = `
      <div class="featured-course-inner">
        <figure class="featured-course-poster">
          <button class="featured-course-poster-button" type="button" aria-haspopup="dialog" aria-controls="course-poster-lightbox" aria-label="查看 2026 秋季共通考试物理课程海报">
            <img src="/assets/course-autumn-2026.jpg?v=20260919d" alt="旅人教育 2026 秋季共通考试物理秋季强化课程海报" loading="eager" decoding="async">
            <span class="featured-course-poster-zoom">查看海报</span>
          </button>
          <figcaption class="featured-course-poster-hint">课程海报 · 点击查看</figcaption>
        </figure>

        <div class="featured-course-copy">
          <p class="kicker">2026 秋季课程</p>
          <h2 id="featured-course-title">共通考试物理｜秋季强化课程</h2>
          <p class="featured-course-lede">9 月开课，Yui 老师与 Kim 老师共同授课。讲座 44h、实战 25h，覆盖力学、波动、热学、电磁学・原子，并包含实验、资料题、专题训练和共通考试实战。</p>

          <div class="featured-course-metrics" aria-label="课程时数与开课时间">
            <span><strong>44h</strong><small>讲座</small></span>
            <span><strong>25h</strong><small>实战</small></span>
            <span><strong>9月</strong><small>开课</small></span>
          </div>

          <div class="featured-course-facts">
            <div><small>授课安排</small><strong>周四晚 · 周六下午</strong></div>
            <div><small>授课形式</small><strong>线下 + 线上同步</strong></div>
            <div><small>课程重点</small><strong>实验 · 资料题 · 专题训练 · 实战</strong></div>
          </div>

          <div class="featured-course-actions">
            <a class="btn btn-primary" href="#contact"><span>咨询秋季课程</span><i>↗</i></a>
            <button class="btn btn-ghost featured-course-detail-trigger" type="button"><span>查看完整课程信息</span><i>＋</i></button>
          </div>
        </div>
      </div>`;
    hero.insertAdjacentElement('afterend', section);

    const posterLightbox = document.createElement('div');
    posterLightbox.className = 'course-poster-lightbox';
    posterLightbox.id = 'course-poster-lightbox';
    posterLightbox.hidden = true;
    posterLightbox.setAttribute('role', 'dialog');
    posterLightbox.setAttribute('aria-modal', 'true');
    posterLightbox.setAttribute('aria-labelledby', 'course-poster-lightbox-title');
    posterLightbox.innerHTML = `
      <button class="course-poster-lightbox-backdrop" type="button" aria-label="关闭课程海报"></button>
      <div class="course-poster-lightbox-frame">
        <div class="course-poster-lightbox-toolbar">
          <span id="course-poster-lightbox-title">2026 秋季｜共通考试物理 秋季强化课程</span>
          <button class="course-poster-lightbox-close" type="button" aria-label="关闭课程海报">×</button>
        </div>
        <div class="course-poster-lightbox-scroll">
          <img src="/assets/course-autumn-2026.jpg?v=20260919d" alt="旅人教育 2026 秋季共通考试物理秋季强化课程海报">
        </div>
      </div>`;
    document.body.appendChild(posterLightbox);

    const dialog = document.createElement('div');
    dialog.className = 'course-detail-dialog';
    dialog.id = 'course-detail-dialog';
    dialog.hidden = true;
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'course-detail-dialog-title');
    dialog.innerHTML = `
      <button class="course-detail-backdrop" type="button" aria-label="关闭课程信息"></button>
      <div class="course-detail-frame">
        <div class="course-detail-toolbar">
          <span>2026 AUTUMN · PHYSICS</span>
          <button class="course-detail-close" type="button" aria-label="关闭课程信息">×</button>
        </div>
        <div class="course-detail-scroll">
          <article class="course-detail-sheet">
            <header class="course-detail-hero">
              <div>
                <p>旅人教育｜2026 秋季课程</p>
                <h2 id="course-detail-dialog-title">共通考试物理<br><strong>秋季强化课程</strong></h2>
              </div>
              <img src="/assets/tabito-brand-lockup.svg" alt="TABITO 旅人教育">
            </header>

            <div class="course-detail-stats" aria-label="课程核心信息">
              <div><strong>44h</strong><span>讲座</span></div>
              <div><strong>25h</strong><span>实战</span></div>
              <div><strong>9月</strong><span>开课</span></div>
            </div>

            <section class="course-detail-section">
              <p class="course-detail-label">COURSE</p>
              <h3>课程内容</h3>
              <p>课程覆盖力学、波动、热学、电磁学・原子。讲座负责把基本规律、典型模型和易混概念重新梳理清楚；实战部分集中处理实验、图表、资料题、专题训练与共通考试形式的综合设问。</p>
            </section>

            <div class="course-detail-curriculum" aria-label="课程覆盖">
              <div><span>01</span><strong>力学</strong></div>
              <div><span>02</span><strong>波动</strong></div>
              <div><span>03</span><strong>热学</strong></div>
              <div><span>04</span><strong>电磁学・原子</strong></div>
              <div><span>05</span><strong>实验・资料题</strong></div>
              <div><span>06</span><strong>共通考试实战</strong></div>
            </div>

            <div class="course-detail-info">
              <div><small>授课教师</small><strong>Yui 老师 × Kim 老师</strong></div>
              <div><small>授课时间</small><strong>周四晚 · 周六下午</strong></div>
              <div><small>授课形式</small><strong>线下 + 线上同步</strong></div>
            </div>

            <footer class="course-detail-footer">
              <p>具体班型、当前进度与报名方式可直接咨询。</p>
              <a class="btn btn-primary" href="#contact" data-close-course-dialog><span>前往课程咨询</span><i>↗</i></a>
            </footer>
          </article>
        </div>
      </div>`;
    document.body.appendChild(dialog);

    const triggers = [
      section.querySelector('.featured-course-detail-trigger')
    ].filter(Boolean);
    const closeButton = dialog.querySelector('.course-detail-close');
    const backdrop = dialog.querySelector('.course-detail-backdrop');
    const contactLink = dialog.querySelector('[data-close-course-dialog]');
    let previousFocus = null;

    const openDialog = () => {
      previousFocus = document.activeElement;
      dialog.hidden = false;
      body.classList.add('course-dialog-open');
      requestAnimationFrame(() => closeButton?.focus({ preventScroll: true }));
    };
    const closeDialog = () => {
      if (dialog.hidden) return;
      dialog.hidden = true;
      body.classList.remove('course-dialog-open');
      previousFocus?.focus?.({ preventScroll: true });
    };

    const posterTrigger = section.querySelector('.featured-course-poster-button');
    const posterClose = posterLightbox.querySelector('.course-poster-lightbox-close');
    const posterBackdrop = posterLightbox.querySelector('.course-poster-lightbox-backdrop');
    let posterPreviousFocus = null;
    const openPoster = () => {
      posterPreviousFocus = document.activeElement;
      posterLightbox.hidden = false;
      body.classList.add('course-poster-open');
      requestAnimationFrame(() => posterClose?.focus({ preventScroll: true }));
    };
    const closePoster = () => {
      if (posterLightbox.hidden) return;
      posterLightbox.hidden = true;
      body.classList.remove('course-poster-open');
      posterPreviousFocus?.focus?.({ preventScroll: true });
    };
    posterTrigger?.addEventListener('click', openPoster);
    posterClose?.addEventListener('click', closePoster);
    posterBackdrop?.addEventListener('click', closePoster);

    triggers.forEach(node => node.addEventListener('click', openDialog));
    closeButton?.addEventListener('click', closeDialog);
    backdrop?.addEventListener('click', closeDialog);
    contactLink?.addEventListener('click', closeDialog);
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      if (!posterLightbox.hidden) {
        event.preventDefault();
        closePoster();
        return;
      }
      if (!dialog.hidden) {
        event.preventDefault();
        closeDialog();
      }
    });

    const mobileNav = document.querySelector('.mobile-jump-nav');
    if (mobileNav && !mobileNav.querySelector('a[href="#featured-course"]')) {
      const link = document.createElement('a');
      link.href = '#featured-course';
      link.textContent = '秋季课';
      mobileNav.prepend(link);
    }
  };
  installFeaturedCourse();

  const installMobileConsult = () => {
    if (document.querySelector('.mobile-consult-bar')) return;
    const contact = document.querySelector('#contact');
    const bar = document.createElement('a');
    bar.className = 'mobile-consult-bar';
    bar.href = '#contact';
    bar.innerHTML = '<span><small>2026 秋季</small><strong>物理课程咨询</strong></span><i>↗</i>';
    document.body.appendChild(bar);

    let contactVisible = false;
    if ('IntersectionObserver' in window && contact) {
      const observer = new IntersectionObserver(entries => {
        contactVisible = entries.some(entry => entry.isIntersecting);
        bar.classList.toggle('is-hidden', contactVisible);
      }, { threshold: 0.08 });
      observer.observe(contact);
    }

    const update = () => {
      const show = window.scrollY > Math.min(520, window.innerHeight * 0.72) && !contactVisible;
      bar.classList.toggle('is-visible', show);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  };
  installMobileConsult();

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
    experienceHeadCopy.textContent = '现于旅人教育负责本科入试物理、报考指导、课程设计与教材开发。此前在行知学园负责 EJU 物理大班、一对一和热门大学校内考，也曾在京都大学工学部承担教学支持工作。';
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