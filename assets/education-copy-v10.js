await import('./education-copy-v9.js?v=20260814x');

/* Rebuild the experience timeline only after v9 has fully finished. */
const list = document.querySelector('.experience-list');
if (list) {
  const row = (meta, institution, position, responsibilities, extraClass = '') => `
    <article class="exp-row ${extraClass}">
      <div class="exp-meta">${meta}</div>
      <div class="exp-main">
        <h3>${institution}</h3>
        ${position ? `<p class="exp-position">${position}</p>` : ''}
      </div>
      <ul class="exp-responsibilities">
        ${responsibilities.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </article>`;

  list.innerHTML = [
    row('现任', '旅人教育', '董事｜营业教育1部部长', [
      '共通考试 / EJU 物理',
      '理工科校内考与理科口试',
      '本科报考规划',
      '课程设计与教材开发',
      '官网与网页开发',
      '教育产品开发'
    ], 'exp-current'),
    row('约 4 年', '行知学园关西校', '', [
      'EJU 物理大班（基础班、冲刺班、刷题班）',
      '数学、物理一对一',
      '热门大学校内考班课与一对一',
      '志望理由、面试与口头试问指导'
    ]),
    row('2024–2026', '京都大学工学部', '時間雇用教職員', [
      '電気電子回路 OA',
      '留学生 Tutor'
    ])
  ].join('');
}

const hero = document.querySelector('.hero');
if (hero) {
  hero.style.setProperty('min-height', '0', 'important');
  hero.style.setProperty('align-items', 'start', 'important');
  hero.style.setProperty('align-content', 'start', 'important');
}

/* Feedback source setup happens before v11's final direct-image guard. */
const feedback = document.querySelector('[data-media="feedback"]');
if (feedback) {
  const shot = feedback.closest('.student-shot');
  if (shot) shot.classList.add('feedback-shot');
  feedback.loading = 'eager';
  feedback.decoding = 'async';
  feedback.alt = '学生课程反馈聊天记录';
  feedback.removeAttribute('srcset');
  feedback.removeAttribute('sizes');
  const sources = [
    '/assets/student-feedback-wechat.webp?v=20260814x',
    '/assets/student-feedback-wechat-v5.webp?v=20260814x',
    '/assets/student-record-wall-v4.webp?v=20260814x'
  ];
  let index = 0;
  feedback.onerror = () => {
    index += 1;
    if (index < sources.length) feedback.src = sources[index];
  };
  feedback.src = sources[0];
}

/* Native horizontal scrolling remains primary; buttons are only a desktop aid. */
const mediaGrid = document.querySelector('.student-media-grid');
if (mediaGrid && !document.querySelector('.student-slider-toolbar')) {
  const toolbar = document.createElement('div');
  toolbar.className = 'student-slider-toolbar';
  toolbar.innerHTML = `
    <span class="student-slider-hint"><i aria-hidden="true"></i>左右滑动查看</span>
    <span class="student-slider-actions">
      <button type="button" class="student-slider-prev" aria-label="查看上一条记录">←</button>
      <button type="button" class="student-slider-next" aria-label="查看下一条记录">→</button>
    </span>`;
  mediaGrid.insertAdjacentElement('afterend', toolbar);
  const prev = toolbar.querySelector('.student-slider-prev');
  const next = toolbar.querySelector('.student-slider-next');
  const scrollStep = () => Math.max(280, Math.min(mediaGrid.clientWidth * 0.72, 520));
  prev?.addEventListener('click', () => mediaGrid.scrollBy({ left: -scrollStep(), behavior: 'smooth' }));
  next?.addEventListener('click', () => mediaGrid.scrollBy({ left: scrollStep(), behavior: 'smooth' }));
  const syncButtons = () => {
    const max = Math.max(0, mediaGrid.scrollWidth - mediaGrid.clientWidth - 2);
    if (prev) prev.disabled = mediaGrid.scrollLeft <= 2;
    if (next) next.disabled = mediaGrid.scrollLeft >= max;
  };
  mediaGrid.addEventListener('scroll', syncButtons, { passive: true });
  window.addEventListener('resize', syncButtons, { passive: true });
  requestAnimationFrame(syncButtons);
}
