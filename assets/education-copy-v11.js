import('./education-copy-v10.js?v=20260814j').then(() => {
  const planningText = document.querySelector('.planning-head > p');
  if (planningText) {
    planningText.textContent = '结合学生当前成绩、目标专业和备考时间，逐校比较材料审查、校内考、面试或口试，以及 EJU、共通考试和英语成绩的计分方式，再确定报考组合与备考重点。';
  }

  const contactTitle = document.querySelector('.contact-copy h2');
  if (contactTitle) contactTitle.textContent = '日本学部留学咨询';

  /* Experience summary belongs immediately under the section title. */
  const experienceSummary = document.querySelector('.experience-head > p');
  if (experienceSummary) {
    experienceSummary.textContent = '现于旅人教育担任董事、营业教育1部部长，负责本科升学课程、报考指导、课程与教材开发，并参与官网和教育产品开发。此前在行知学园负责 EJU 物理大班、一对一及热门大学校内考等课程，也曾在京都大学工学部承担教学支持工作。';
  }

  /* Student feedback: stop cropping the collage. The repository already contains
     a complete 560×863 feedback screenshot, so use that file directly. */
  const feedbackShot = document.querySelector('.student-media-grid .student-shot:last-child');
  if (feedbackShot) {
    feedbackShot.classList.add('feedback-shot');
    feedbackShot.classList.remove('feedback-shot--wall-crop');
    feedbackShot.querySelectorAll('.feedback-media,.feedback-wall-image,.feedback-wall-crop').forEach(node => node.remove());

    const caption = feedbackShot.querySelector('figcaption');
    let img = feedbackShot.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      if (caption) feedbackShot.insertBefore(img, caption);
      else feedbackShot.prepend(img);
    }
    img.dataset.media = 'feedback';
    img.alt = '学生课程反馈聊天记录';
    img.loading = 'eager';
    img.decoding = 'async';
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.style.removeProperty('display');
    img.style.removeProperty('visibility');
    img.style.removeProperty('opacity');

    let fallbackUsed = false;
    img.onerror = () => {
      if (fallbackUsed) return;
      fallbackUsed = true;
      img.src = '/assets/student-feedback-wechat-v5.webp?v=20260814q';
    };
    img.src = '/assets/student-feedback-wechat.webp?v=20260814q';
    if (caption) caption.textContent = '学生课程反馈';
  }

  /* Put company details on the left. The right column becomes a focused TABITO
     visual card: classroom, map, logo, and one official-site link. */
  const experienceList = document.querySelector('.experience-list');
  if (experienceList && !document.querySelector('.experience-company-note')) {
    const note = document.createElement('div');
    note.className = 'experience-company-note';
    note.innerHTML = `
      <div class="experience-company-copy">
        <small>旅人教育｜东京・中野</small>
        <strong>中国旅人教育集团株式会社</strong>
        <span>〒164-0001 东京都中野区中野1-55-3 フェリスビル 4F</span>
      </div>
      <div class="experience-company-links">
        <a href="https://www.tabitoedu.com" target="_blank" rel="noopener noreferrer">官方网站 ↗</a>
        <a href="https://xhslink.cn/m/4aasn2cOjVt" target="_blank" rel="noopener noreferrer">小红书官方号 ↗</a>
      </div>`;
    experienceList.insertAdjacentElement('afterend', note);
  }

  const tabitoInfo = document.querySelector('.tabito-info');
  if (tabitoInfo) {
    tabitoInfo.innerHTML = `
      <a class="tabito-logo-link tabito-logo-link--simple" href="https://www.tabitoedu.com" target="_blank" rel="noopener noreferrer" aria-label="旅人教育官方网站">
        <img class="tabito-logo-float" src="/assets/tabito-logo.webp?v=20260814q" alt="TABITO 中国旅人教育集团株式会社 Logo" loading="eager" decoding="async">
      </a>
      <p class="tabito-brand-caption">旅人教育｜东京・中野</p>
      <a class="tabito-brand-site" href="https://www.tabitoedu.com" target="_blank" rel="noopener noreferrer">官方网站 ↗</a>`;
  }

  /* Move consultation guidance underneath the two QR cards. */
  const contactCopy = document.querySelector('.contact-copy');
  const qrGrid = document.querySelector('.qr-grid');
  if (contactCopy && qrGrid) {
    const kicker = contactCopy.querySelector('.kicker');
    if (kicker) kicker.textContent = '旅人教育';
    let note = contactCopy.querySelector(':scope > p:not(.kicker)');
    if (!note) {
      note = document.createElement('p');
      note.textContent = '咨询共通考试 / EJU 物理、理工科校内考、理科口试或报考规划时，请附上学生年级、目标校、目前成绩和希望解决的问题，便于初步判断适合的课程与准备顺序。';
    }
    note.className = 'contact-note';
    qrGrid.appendChild(note);
  }

  /* Treat each admissions route as one typographic unit. */
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
