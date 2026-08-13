import('./education-copy-v9.js?v=20260814h').then(() => {
  /* Rebuild the experience timeline from scratch so old injected nodes/styles cannot overlap. */
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

  /* Keep the hero compact even if an older stylesheet is cached. */
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.setProperty('min-height', '0', 'important');
    hero.style.setProperty('align-items', 'start', 'important');
    hero.style.setProperty('align-content', 'start', 'important');
  }

  /* Feedback image: explicit source and fallbacks while preserving horizontal scrolling. */
  const feedback = document.querySelector('[data-media="feedback"]');
  if (feedback) {
    feedback.loading = 'eager';
    feedback.alt = '学生课程反馈聊天记录';
    const sources = [
      '/assets/student-feedback-wechat-v5.webp?v=20260814f',
      '/assets/student-feedback-wechat.webp?v=20260814f',
      '/assets/student-record-wall-v4.webp?v=20260814f'
    ];
    let index = 0;
    feedback.onerror = () => {
      index += 1;
      if (index < sources.length) feedback.src = sources[index];
    };
    feedback.src = sources[0];
  }
});
