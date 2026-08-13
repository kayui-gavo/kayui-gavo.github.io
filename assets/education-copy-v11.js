import('./education-copy-v10.js?v=20260814j').then(() => {
  /* Load the final QA layer after every legacy stylesheet. */
  if (!document.querySelector('link[data-education-qa="v17"]')) {
    const qa = document.createElement('link');
    qa.rel = 'stylesheet';
    qa.href = '/assets/education-qa-v13.css?v=20260814t';
    qa.dataset.educationQa = 'v17';
    document.head.appendChild(qa);
  }

  /* Permanent guard against the historical feedback-image hide rules. */
  if (!document.querySelector('style[data-feedback-direct="v17"]')) {
    const style = document.createElement('style');
    style.dataset.feedbackDirect = 'v17';
    style.textContent = `
      .student-media-grid .student-shot.feedback-direct-v17{height:auto!important;min-height:0!important;max-height:none!important;overflow:hidden!important;}
      .student-media-grid .student-shot.feedback-direct-v17::before{display:none!important;content:none!important;background:none!important;}
      .student-media-grid .student-shot.feedback-direct-v17>img[data-media="feedback"]{display:block!important;visibility:visible!important;opacity:1!important;position:relative!important;inset:auto!important;width:100%!important;height:490px!important;min-height:490px!important;max-height:490px!important;object-fit:contain!important;object-position:center top!important;background:#f7f7f7!important;}
      @media(max-width:767px){.student-media-grid .student-shot.feedback-direct-v17>img[data-media="feedback"]{height:min(118vw,520px)!important;min-height:min(118vw,520px)!important;max-height:min(118vw,520px)!important;}}
    `;
    document.head.appendChild(style);
  }

  const planningText = document.querySelector('.planning-head > p');
  if (planningText) planningText.textContent = '结合学生当前成绩、目标专业和备考时间，逐校比较材料审查、校内考、面试或口试，以及 EJU、共通考试和英语成绩的计分方式，再确定报考组合与备考重点。';

  const contactTitle = document.querySelector('.contact-copy h2');
  if (contactTitle) contactTitle.textContent = '日本学部留学咨询';

  /* Experience section: heading stays clean; the summary becomes the first block
     in the LEFT column, followed by the three experience rows. The RIGHT column
     is reserved exclusively for TABITO classroom / map / company information. */
  const experienceHead = document.querySelector('.experience-head');
  const experienceList = document.querySelector('.experience-list');
  if (experienceHead && experienceList) {
    const headSummary = experienceHead.querySelector(':scope > p');
    let summary = experienceList.querySelector('.experience-summary-inline');
    if (!summary) {
      summary = document.createElement('p');
      summary.className = 'experience-summary-inline';
      experienceList.prepend(summary);
    }
    summary.textContent = '现于旅人教育担任董事、营业教育1部部长，负责本科升学课程、报考指导、课程与教材开发，并参与官网和教育产品开发。此前在行知学园负责 EJU 物理大班、一对一及热门大学校内考等课程，也曾在京都大学工学部承担教学支持工作。';
    headSummary?.remove();

    /* Remove the accidental third grid item from the previous iteration. */
    document.querySelectorAll('.experience-company-note').forEach(node => node.remove());
  }

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
          <img class="tabito-logo-float" src="/assets/tabito-logo.webp?v=20260814t" alt="TABITO 中国旅人教育集团株式会社 Logo" loading="eager" decoding="async">
        </a>
      </div>
      <address>〒164-0001<br>東京都中野区中野1-55-3<br>フェリスビル 4F</address>
      <div class="tabito-links tabito-links--compact">
        <a href="https://www.tabitoedu.com" target="_blank" rel="noopener noreferrer">官方网站 ↗</a>
        <a href="https://xhslink.cn/m/4aasn2cOjVt" target="_blank" rel="noopener noreferrer">小红书官方号 ↗</a>
      </div>`;
  }

  /* Feedback card: use the standalone screenshot directly, no collage crop. */
  const feedbackImg = document.querySelector('[data-media="feedback"]');
  const feedbackShot = feedbackImg?.closest('.student-shot');
  if (feedbackShot) {
    feedbackShot.classList.remove('feedback-shot--wall-crop','feedback-direct-v16');
    feedbackShot.classList.add('feedback-shot', 'feedback-direct-v17');
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
      img.src = '/assets/student-feedback-wechat-v5.webp?v=20260814t';
    };
    img.src = '/assets/student-feedback-wechat.webp?v=20260814t';
    if (caption) caption.textContent = '学生课程反馈';
  }

  /* Consultation guidance belongs below the QR cards. */
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