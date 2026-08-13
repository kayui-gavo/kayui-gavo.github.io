import('./education-copy-v10.js?v=20260814j').then(() => {
  /* Load the final QA layer after every legacy stylesheet. */
  if (!document.querySelector('link[data-education-qa="v16"]')) {
    const qa = document.createElement('link');
    qa.rel = 'stylesheet';
    qa.href = '/assets/education-qa-v13.css?v=20260814s';
    qa.dataset.educationQa = 'v16';
    document.head.appendChild(qa);
  }

  /* A tiny inline rule is intentional here: it sits after the historical CSS chain
     and permanently neutralizes the old feedback pseudo-element/hide rules. */
  if (!document.querySelector('style[data-feedback-direct="v16"]')) {
    const style = document.createElement('style');
    style.dataset.feedbackDirect = 'v16';
    style.textContent = `
      .student-media-grid .student-shot.feedback-direct-v16{height:auto!important;min-height:0!important;max-height:none!important;overflow:hidden!important;}
      .student-media-grid .student-shot.feedback-direct-v16::before{display:none!important;content:none!important;background:none!important;}
      .student-media-grid .student-shot.feedback-direct-v16>img[data-media="feedback"]{display:block!important;visibility:visible!important;opacity:1!important;position:relative!important;inset:auto!important;width:100%!important;height:490px!important;min-height:490px!important;max-height:490px!important;object-fit:contain!important;object-position:center top!important;background:#f7f7f7!important;}
      .student-media-grid .student-shot.feedback-direct-v16>figcaption{display:flex!important;min-height:48px!important;}
      @media(max-width:767px){.student-media-grid .student-shot.feedback-direct-v16>img[data-media="feedback"]{height:min(118vw,520px)!important;min-height:min(118vw,520px)!important;max-height:min(118vw,520px)!important;}}
    `;
    document.head.appendChild(style);
  }

  const planningText = document.querySelector('.planning-head > p');
  if (planningText) {
    planningText.textContent = '结合学生当前成绩、目标专业和备考时间，逐校比较材料审查、校内考、面试或口试，以及 EJU、共通考试和英语成绩的计分方式，再确定报考组合与备考重点。';
  }

  const contactTitle = document.querySelector('.contact-copy h2');
  if (contactTitle) contactTitle.textContent = '日本学部留学咨询';

  const experienceSummary = document.querySelector('.experience-head > p');
  if (experienceSummary) {
    experienceSummary.textContent = '现于旅人教育担任董事、营业教育1部部长，负责本科升学课程、报考指导、课程与教材开发，并参与官网和教育产品开发。此前在行知学园负责 EJU 物理大班、一对一及热门大学校内考等课程，也曾在京都大学工学部承担教学支持工作。';
  }

  /* Feedback card: use the real standalone 560×863 screenshot directly. */
  const feedbackImg = document.querySelector('[data-media="feedback"]');
  const feedbackShot = feedbackImg?.closest('.student-shot');
  if (feedbackShot) {
    feedbackShot.classList.remove('feedback-shot--wall-crop');
    feedbackShot.classList.add('feedback-shot', 'feedback-direct-v16');
    feedbackShot.querySelectorAll('.feedback-media,.feedback-wall-image,.feedback-wall-crop').forEach(node => node.remove());

    let img = feedbackShot.querySelector('img[data-media="feedback"]');
    const caption = feedbackShot.querySelector('figcaption');
    if (!img) {
      img = document.createElement('img');
      img.dataset.media = 'feedback';
      if (caption) feedbackShot.insertBefore(img, caption); else feedbackShot.prepend(img);
    }
    img.alt = '学生课程反馈聊天记录';
    img.loading = 'eager';
    img.decoding = 'async';
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.style.setProperty('display', 'block', 'important');
    img.style.setProperty('visibility', 'visible', 'important');
    img.style.setProperty('opacity', '1', 'important');
    img.style.setProperty('width', '100%', 'important');
    img.style.setProperty('height', '490px', 'important');
    img.style.setProperty('min-height', '490px', 'important');
    img.style.setProperty('max-height', '490px', 'important');
    img.style.setProperty('object-fit', 'contain', 'important');
    img.style.setProperty('object-position', 'center top', 'important');

    let fallbackUsed = false;
    img.onerror = () => {
      if (fallbackUsed) return;
      fallbackUsed = true;
      img.src = '/assets/student-feedback-wechat-v5.webp?v=20260814s';
    };
    img.src = '/assets/student-feedback-wechat.webp?v=20260814s';
    if (caption) caption.textContent = '学生课程反馈';
  }

  /* Left = text/history, right = TABITO visual only. */
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
        <img class="tabito-logo-float" src="/assets/tabito-logo.webp?v=20260814s" alt="TABITO 中国旅人教育集团株式会社 Logo" loading="eager" decoding="async">
      </a>
      <p class="tabito-brand-caption">旅人教育｜东京・中野</p>
      <a class="tabito-brand-site" href="https://www.tabitoedu.com" target="_blank" rel="noopener noreferrer">官方网站 ↗</a>`;
  }

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