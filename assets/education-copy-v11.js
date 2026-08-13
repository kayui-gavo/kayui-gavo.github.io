import('./education-copy-v10.js?v=20260814x').then(() => {
  /* One final stylesheet, loaded last. No more stacked inline layout patches. */
  if (!document.querySelector('link[data-education-final="v19"]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/assets/education-final-v19.css?v=20260814x';
    css.dataset.educationFinal = 'v19';
    document.head.appendChild(css);
  }

  /* Planning copy is a normal block below the heading. */
  const planningText = document.querySelector('.planning-head > p');
  if (planningText) {
    planningText.textContent = '综合学生当前成绩、目标专业、可用考试成绩和备考时间，逐校比较材料审查、校内考、面试或口试，以及 EJU、共通考试和英语成绩的计分方式，确定更合适的报考组合与备考重点。';
  }

  /* Experience: intro + three rows on the LEFT. TABITO is exclusively the RIGHT card. */
  const experienceHead = document.querySelector('.experience-head');
  const experienceList = document.querySelector('.experience-list');
  if (experienceHead && experienceList) {
    experienceHead.querySelector(':scope > p')?.remove();
    experienceList.querySelectorAll('.experience-summary-inline').forEach((node, i) => { if (i > 0) node.remove(); });
    let summary = experienceList.querySelector('.experience-summary-inline');
    if (!summary) {
      summary = document.createElement('p');
      summary.className = 'experience-summary-inline';
      experienceList.prepend(summary);
    }
    summary.textContent = '现于旅人教育担任董事、营业教育1部部长，负责本科升学课程、报考指导、课程与教材开发，并参与官网和教育产品开发。此前在行知学园负责 EJU 物理大班、一对一及热门大学校内考等课程，也曾在京都大学工学部承担教学支持工作。';
    document.querySelectorAll('.experience-company-note').forEach(node => node.remove());
  }

  /* Restore the complete TABITO company card and logo after all older scripts have finished. */
  const tabitoInfo = document.querySelector('.tabito-info');
  if (tabitoInfo) {
    tabitoInfo.innerHTML = `
      <div class="tabito-info-head">
        <div class="tabito-info-copy">
          <p class="kicker">TABITO EDUCATION</p>
          <h3>旅人教育｜东京・中野</h3>
          <p class="company-name">中国旅人教育集团株式会社</p>
        </div>
        <a class="tabito-logo-link tabito-logo-link--compact" href="https://www.tabitoedu.com" target="_blank" rel="noopener noreferrer" aria-label="旅人教育官方网站">
          <img class="tabito-logo-float" src="/assets/tabito-logo.webp?v=20260814x" alt="TABITO 中国旅人教育集团株式会社 Logo" loading="eager" decoding="async">
        </a>
      </div>
      <address>〒164-0001<br>東京都中野区中野1-55-3<br>フェリスビル 4F</address>
      <div class="tabito-links tabito-links--compact">
        <a href="https://www.tabitoedu.com" target="_blank" rel="noopener noreferrer">官方网站 ↗</a>
        <a href="https://xhslink.cn/m/4aasn2cOjVt" target="_blank" rel="noopener noreferrer">小红书官方号 ↗</a>
      </div>`;
  }

  /* Feedback: always use the real standalone screenshot, never a pseudo-element crop. */
  const feedback = document.querySelector('[data-media="feedback"]');
  const feedbackShot = feedback?.closest('.student-shot');
  if (feedback && feedbackShot) {
    feedbackShot.classList.remove('feedback-shot--wall-crop','feedback-direct-v16','feedback-direct-v17','feedback-direct-v18');
    feedbackShot.classList.add('feedback-shot');
    feedbackShot.querySelectorAll('.feedback-media,.feedback-wall-image,.feedback-wall-crop').forEach(node => node.remove());
    feedback.alt = '学生课程反馈聊天记录';
    feedback.loading = 'eager';
    feedback.decoding = 'async';
    feedback.removeAttribute('srcset');
    feedback.removeAttribute('sizes');
    feedback.style.setProperty('display','block','important');
    feedback.style.setProperty('visibility','visible','important');
    feedback.style.setProperty('opacity','1','important');
    feedback.style.setProperty('width','100%','important');
    feedback.style.setProperty('height','490px','important');
    feedback.style.setProperty('object-fit','contain','important');
    feedback.style.setProperty('object-position','center top','important');
    let fallback = false;
    feedback.onerror = () => {
      if (fallback) return;
      fallback = true;
      feedback.src = '/assets/student-feedback-wechat-v5.webp?v=20260814x';
    };
    feedback.src = '/assets/student-feedback-wechat.webp?v=20260814x';
    const caption = feedbackShot.querySelector('figcaption');
    if (caption) caption.textContent = '学生课程反馈';
  }

  /* Contact title + note under QR cards. */
  const contactTitle = document.querySelector('.contact-copy h2');
  if (contactTitle) contactTitle.textContent = '日本学部留学咨询';
  const contactCopy = document.querySelector('.contact-copy');
  const qrGrid = document.querySelector('.qr-grid');
  if (contactCopy && qrGrid) {
    const kicker = contactCopy.querySelector('.kicker');
    if (kicker) kicker.textContent = '旅人教育';
    let note = qrGrid.querySelector('.contact-note');
    if (!note) {
      note = contactCopy.querySelector(':scope > p:not(.kicker)') || document.createElement('p');
      note.className = 'contact-note';
      qrGrid.appendChild(note);
    }
    note.textContent = '咨询共通考试 / EJU 物理、理工科校内考、理科口试或报考规划时，请附上学生年级、目标校、目前成绩和希望解决的问题，便于初步判断适合的课程与准备顺序。';
  }

  const routeTags = document.querySelector('.route-tags');
  if (routeTags && !routeTags.querySelector('span')) {
    const items = routeTags.textContent.split('/').map(item => item.trim()).filter(Boolean);
    routeTags.textContent = '';
    items.forEach(item => {
      const span = document.createElement('span');
      span.textContent = item;
      routeTags.appendChild(span);
    });
  }
});
