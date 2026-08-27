(() => {
  if (window.__educationWinterCatalogV2) return;
  window.__educationWinterCatalogV2 = true;

  const STYLE_HREF = '/assets/education-winter-catalog-v1.css?v=20260828c';
  if (!document.querySelector('link[data-education-winter-catalog="v2"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = STYLE_HREF;
    link.dataset.educationWinterCatalog = 'v2';
    document.head.appendChild(link);
  }

  const materialBase = 'https://raw.githubusercontent.com/kayui-gavo/tabitoedu-website/gh-pages/site/images/tokyo-science-2026';
  const material = file => `${materialBase}/${file}`;

  const buildCatalog = () => {
    const root = document.querySelector('#course-2026');
    if (!root || root.dataset.winterCatalog === 'v2') return;

    const legacyCards = [...root.querySelectorAll('.year-course-card')].slice(0, 3);
    if (legacyCards.length < 3) return;

    const captureDetails = card => {
      const syllabus = card.querySelector('.year-course-syllabus');
      const note = card.querySelector('.year-course-note');
      return `${syllabus ? syllabus.innerHTML : ''}${note ? note.outerHTML : ''}`;
    };
    const legacyDetails = legacyCards.map(captureDetails);

    root.dataset.winterCatalog = 'v2';
    root.className = 'year-courses winter-catalog';
    root.innerHTML = `
      <header class="winter-catalog-head">
        <h3>课程</h3>
        <p><strong>2026 冬学期｜2026.9–2027.2</strong>先按目标校确认需要参加的考试，再选择课程。共通考试、EJU 与校内考可按实际日程组合准备。</p>
      </header>

      <div class="winter-catalog-body">
        <nav class="winter-course-nav" role="tablist" aria-label="2026冬学期物理课程">
          <button class="winter-course-tab" type="button" role="tab" id="winter-tab-1" aria-controls="winter-view-1" aria-selected="true" data-winter-index="0">
            <span class="winter-tab-no">01</span>
            <span><strong>共通考试物理冲刺</strong><small>24 回 × 2h｜48h 系统课程</small></span>
          </button>
          <button class="winter-course-tab" type="button" role="tab" id="winter-tab-2" aria-controls="winter-view-2" aria-selected="false" tabindex="-1" data-winter-index="1">
            <span class="winter-tab-no">02</span>
            <span><strong>共通考试物理刷题</strong><small>12 回 × 2h｜24h 考前实战</small></span>
          </button>
          <button class="winter-course-tab" type="button" role="tab" id="winter-tab-3" aria-controls="winter-view-3" aria-selected="false" tabindex="-1" data-winter-index="2">
            <span class="winter-tab-no">03</span>
            <span><strong>东京科学大学（理工学系）</strong><small>20h｜校内考物理对策</small></span>
          </button>
        </nav>

        <div class="winter-course-stage">
          <article class="winter-course-view" id="winter-view-1" role="tabpanel" aria-labelledby="winter-tab-1" data-winter-view="0">
            <div class="winter-course-copy">
              <p class="winter-course-index"><b>01</b> / 03</p>
              <h4>共通考试物理冲刺</h4>
              <p class="winter-course-kicker">48h 系统复习｜24 回 × 2h</p>
              <p class="winter-course-lead">按力学 → 波动 → 热学 → 电磁学推进，从基本规律、典型模型到实验资料与综合设问逐层复习。每个模块都安排实验・综合专题，把知识理解、图表判读与考场判断连成完整训练链。</p>
              <ul class="winter-focus-list"><li>基本规律</li><li>典型模型</li><li>实验・图表</li><li>综合设问</li></ul>
              <div class="winter-course-meta"><span>48h</span><span>24 回 × 2h</span><span>2026.9–2027.2</span></div>
              <details class="winter-detail winter-detail--overlay">
                <summary>查看完整 24 回课表</summary>
                <div class="winter-detail-scroll">${legacyDetails[0]}</div>
              </details>
            </div>
            <div class="winter-course-visual">
              <div class="winter-visual-board winter-system-map">
                <p class="winter-visual-label">48H · CURRICULUM MAP</p>
                <div class="winter-visual-intro"><h5>四大模块，按考试顺序推进</h5><p>知识复习与实验・综合专题穿插进行，不把实验题留到最后突击。</p></div>
                <div class="winter-map-grid" aria-label="课程模块课时">
                  <div class="winter-map-unit"><b>力学</b><span>14h</span></div>
                  <div class="winter-map-unit"><b>波动</b><span>10h</span></div>
                  <div class="winter-map-unit"><b>热学</b><span>8h</span></div>
                  <div class="winter-map-unit"><b>电磁学</b><span>16h</span></div>
                </div>
                <div class="winter-map-caption"><span>基本规律<br>→ 模型</span><span>波形・声音<br>→ 光</span><span>状态变化<br>→ 热力学</span><span>静电・电路<br>→ 感应</span></div>
              </div>
            </div>
          </article>

          <article class="winter-course-view" id="winter-view-2" role="tabpanel" aria-labelledby="winter-tab-2" data-winter-view="1" hidden>
            <div class="winter-course-copy">
              <p class="winter-course-index"><b>02</b> / 03</p>
              <h4>共通考试物理刷题班</h4>
              <p class="winter-course-kicker">24h 考前实战｜12 回 × 2h</p>
              <p class="winter-course-lead">前 7 回按模块集中训练高频模型、实验与资料题；第 8–12 回进入 5 份真题整卷限时演练。每份试卷逐题复盘失分原因，同时调整答题顺序、时间分配与考场取舍。</p>
              <ul class="winter-focus-list"><li>高频题型</li><li>实验资料题</li><li>5 份真题</li><li>时间分配</li></ul>
              <div class="winter-course-meta"><span>24h</span><span>12 回 × 2h</span><span>考前实战</span></div>
              <details class="winter-detail winter-detail--overlay">
                <summary>查看完整 12 回课表</summary>
                <div class="winter-detail-scroll">${legacyDetails[1]}</div>
              </details>
            </div>
            <div class="winter-course-visual">
              <div class="winter-visual-board winter-drill-board">
                <p class="winter-visual-label">24H · EXAM PRACTICE</p>
                <div class="winter-visual-intro"><h5>先专题，再进入整卷</h5><p>把“会做单题”和“能在规定时间内完成整卷”分成两个阶段训练。</p></div>
                <div class="winter-drill-sequence">
                  <div class="winter-drill-phase"><div><small>PHASE 01</small><strong>专题演习</strong></div><b>7</b><span>力学・波动・热学・电磁学・原子<br>高频模型 / 实验资料题</span></div>
                  <div class="winter-drill-phase"><div><small>PHASE 02</small><strong>真题整卷</strong></div><b>5</b><span>限时作答 → 精讲 → 错因归类<br>答题顺序 / 时间分配</span></div>
                </div>
              </div>
            </div>
          </article>

          <article class="winter-course-view winter-course-view--tokyo" id="winter-view-3" role="tabpanel" aria-labelledby="winter-tab-3" data-winter-view="2" hidden>
            <div class="winter-course-copy winter-course-copy--tokyo">
              <p class="winter-course-index"><b>03</b> / 03</p>
              <h4>东京科学大学（理工学系）<br><span>校内考物理对策</span></h4>
              <p class="winter-course-kicker">理工学系专项｜20h</p>
              <p class="winter-course-lead">围绕理工学系校内考常见的题型与设问结构重新组织训练，不按普通高中章节重复复习。重点补强陌生模型、原理推导、近似处理、数学工具、长文建模与书面记述。</p>
              <ul class="winter-focus-list"><li>题型归类</li><li>陌生模型</li><li>原理推导</li><li>数学工具</li><li>原创模拟</li></ul>
              <div class="winter-course-meta"><span>20h</span><span>校内考专项</span><span>原创模拟题</span></div>
              <details class="winter-detail winter-detail--overlay">
                <summary>查看专项训练结构</summary>
                <div class="winter-detail-scroll">${legacyDetails[2]}</div>
              </details>
            </div>
            <div class="winter-course-visual winter-course-visual--tokyo">
              <div class="winter-material-shell">
                <div class="winter-material-heading"><small>REAL COURSE MATERIALS</small><span>2026 · 东京科学大学（理工学系）</span></div>
                <div class="winter-material-collage winter-material-collage--tokyo" aria-label="东京科学大学理工学系课程真实资料">
                  <a class="winter-material-shot winter-material-shot--hero" href="${material('tokyo-science-2026-original-mock-exam-cover.webp')}" target="_blank" rel="noopener noreferrer">
                    <span class="winter-material-image"><img src="${material('tokyo-science-2026-original-mock-exam-cover.webp')}" alt="东京科学大学理工学系原创模拟试验封面" loading="lazy" decoding="async"></span>
                    <span class="winter-material-caption"><b>原创模拟试验</b><small>物理问题册・原创命题</small><i>↗</i></span>
                  </a>
                  <a class="winter-material-shot" href="${material('tokyo-science-2026-interview-training-cover.webp')}" target="_blank" rel="noopener noreferrer">
                    <span class="winter-material-image"><img src="${material('tokyo-science-2026-interview-training-cover.webp')}" alt="东京科学大学理工学系面试对策资料封面" loading="lazy" decoding="async"></span>
                    <span class="winter-material-caption"><b>面试对策资料</b><small>口头试问・面试准备</small><i>↗</i></span>
                  </a>
                  <a class="winter-material-shot" href="${material('tokyo-science-2026-original-physics-q2-part2.webp')}" target="_blank" rel="noopener noreferrer">
                    <span class="winter-material-image"><img src="${material('tokyo-science-2026-original-physics-q2-part2.webp')}" alt="东京科学大学理工学系原创物理模拟题内页" loading="lazy" decoding="async"></span>
                    <span class="winter-material-caption"><b>原创物理模拟题</b><small>电容器・LC 回路</small><i>↗</i></span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>`;

    const tabs = [...root.querySelectorAll('.winter-course-tab')];
    const views = [...root.querySelectorAll('.winter-course-view')];
    let currentIndex = 0;

    const activate = (index, focus = false) => {
      if (!tabs[index] || !views[index]) return;
      currentIndex = index;
      root.querySelectorAll('.winter-detail[open]').forEach(detail => { detail.open = false; });
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      views.forEach((view, i) => {
        const active = i === index;
        view.hidden = !active;
        view.classList.remove('is-entering');
        if (active) requestAnimationFrame(() => view.classList.add('is-entering'));
      });
      if (focus) tabs[index].focus({ preventScroll: true });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index));
      tab.addEventListener('keydown', event => {
        if (!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
        event.preventDefault();
        let next = currentIndex;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (currentIndex + 1) % tabs.length;
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (currentIndex - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        activate(next, true);
      });
    });

    root.querySelectorAll('.winter-detail').forEach(detail => {
      detail.addEventListener('toggle', () => {
        if (!detail.open) return;
        root.querySelectorAll('.winter-detail[open]').forEach(other => {
          if (other !== detail) other.open = false;
        });
      });
    });

    document.querySelectorAll('.tokyo-science-material-visual').forEach(node => node.remove());
  };

  const scheduleBuild = () => requestAnimationFrame(buildCatalog);
  if (window.__educationCopyReady) scheduleBuild();
  window.addEventListener('education:copy-ready', scheduleBuild);
  document.addEventListener('DOMContentLoaded', () => {
    if (window.__educationCopyReady) scheduleBuild();
  }, { once: true });
})();
