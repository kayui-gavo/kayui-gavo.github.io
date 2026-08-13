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

  /* Final composition rule for the experience section. Keeping this after the
     historical CSS chain prevents old grid rules from sending TABITO to a new row. */
  if (!document.querySelector('style[data-experience-layout="v17"]')) {
    const style = document.createElement('style');
    style.dataset.experienceLayout = 'v17';
    style.textContent = `
      .experience-head{display:block!important;margin-bottom:0!important}.experience-head>div{max-width:840px!important}.experience-head>p{display:none!important}
      .experience-grid{display:grid!important;grid-template-columns:minmax(0,1.42fr) minmax(360px,.58fr)!important;gap:44px!important;align-items:start!important;margin-top:26px!important}.experience-list{display:block!important;min-width:0!important;border-top:0!important}.experience-company-note{display:none!important}
      .experience-summary-inline{position:relative!important;max-width:880px!important;margin:0 0 22px!important;padding:0 0 0 17px!important;color:#625d57!important;font-size:13.5px!important;line-height:1.82!important;text-wrap:pretty!important}.experience-summary-inline::before{content:"";position:absolute;left:0;top:4px;bottom:4px;width:2px;border-radius:999px;background:linear-gradient(180deg,#604047,#c3a878);opacity:.55}
      .exp-row{display:grid!important;grid-template-columns:92px 218px minmax(0,1fr)!important;gap:18px!important;align-items:start!important;padding:17px 0 18px!important;border-top:1px solid rgba(17,19,23,.115)!important;border-bottom:0!important;border-radius:0!important;background:transparent!important}.exp-row:last-child{border-bottom:1px solid rgba(17,19,23,.115)!important}.exp-row.exp-current{padding-left:10px!important;padding-right:8px!important;border-radius:11px!important;background:linear-gradient(90deg,rgba(96,64,71,.045),rgba(255,255,255,0) 72%)!important}.exp-responsibilities{grid-template-columns:1fr!important}
      .tabito-block{grid-column:2!important;grid-row:1!important;align-self:start!important;min-width:0!important;margin:0!important;border:1px solid rgba(57,117,150,.10)!important;border-radius:16px!important;overflow:hidden!important;background:#fbfcfc!important;box-shadow:0 18px 42px rgba(31,37,42,.085)!important}.tabito-media-stage{display:grid!important;grid-template-columns:minmax(0,1.52fr) minmax(135px,.48fr)!important;width:100%!important;min-height:228px!important;margin:0!important;background:#edf2f4!important}.tabito-photo,.tabito-photo img,.tabito-map,.tabito-map iframe{display:block!important;width:100%!important;height:228px!important;min-height:228px!important;margin:0!important;border:0!important}.tabito-photo img{object-fit:cover!important;object-position:center!important}.tabito-map{overflow:hidden!important;border-left:1px solid rgba(57,117,150,.12)!important}
      .tabito-info{display:block!important;min-height:0!important;padding:20px 21px 21px!important;text-align:left!important;background:radial-gradient(circle at 94% 88%,rgba(57,117,150,.055),transparent 27%),#fbfcfc!important}.tabito-info>*{position:static!important;grid-column:auto!important;grid-row:auto!important}.tabito-info-head{display:grid!important;grid-template-columns:minmax(0,1fr) 112px!important;gap:16px!important;align-items:start!important}.tabito-info-copy .kicker{margin:0 0 7px!important;color:#397596!important;font-size:10px!important}.tabito-info h3{margin:0!important;font-family:serif!important;font-size:21px!important;line-height:1.35!important;color:#22303a!important}.tabito-info .company-name{margin:8px 0 0!important;font-size:11.7px!important;line-height:1.5!important;color:#39444b!important;font-weight:700!important}.tabito-logo-link--compact,.tabito-info .tabito-logo-link{display:block!important;width:112px!important;margin:0!important;padding:6px!important;border:1px solid rgba(57,117,150,.10)!important;border-radius:9px!important;background:#fff!important;box-shadow:0 7px 18px rgba(41,83,105,.07)!important}.tabito-info .tabito-logo-float{display:block!important;position:static!important;width:100%!important;height:auto!important;margin:0!important;object-fit:contain!important;background:#fff!important;box-shadow:none!important}.tabito-info address{margin:15px 0 0!important;padding-top:13px!important;border-top:1px solid rgba(17,19,23,.08)!important;color:#746f69!important;font-size:11.5px!important;line-height:1.65!important;font-style:normal!important}.tabito-links--compact,.tabito-info .tabito-links{display:flex!important;flex-wrap:wrap!important;gap:7px 15px!important;margin:12px 0 0!important;padding:11px 0 0!important;border-top:1px solid rgba(17,19,23,.08)!important}.tabito-links--compact a,.tabito-info .tabito-links a{color:#397596!important;font-size:11.2px!important;text-decoration:none!important;white-space:nowrap!important}
      @media(max-width:1180px){.experience-grid{grid-template-columns:minmax(0,1.2fr) minmax(340px,.8fr)!important;gap:30px!important}.exp-row{grid-template-columns:84px 190px minmax(0,1fr)!important;gap:15px!important}}
      @media(max-width:1050px){.experience-grid{grid-template-columns:1fr!important;gap:26px!important}.tabito-block{grid-column:1!important;grid-row:auto!important;max-width:760px!important}}
      @media(max-width:767px){.experience-summary-inline{font-size:12.4px!important;line-height:1.74!important}.exp-row{grid-template-columns:72px minmax(0,1fr)!important;grid-template-areas:"meta main" "meta responsibilities"!important;gap:4px 11px!important}.exp-meta{grid-area:meta!important}.exp-main{grid-area:main!important}.exp-responsibilities{grid-area:responsibilities!important}.tabito-media-stage{grid-template-columns:1.3fr .7fr!important}.tabito-info-head{grid-template-columns:minmax(0,1fr) 92px!important}.tabito-logo-link--compact,.tabito-info .tabito-logo-link{width:92px!important}}
    `;
    document.head.appendChild(style);
  }

  const planningText = document.querySelector('.planning-head > p');
  if (planningText) planningText.textContent = '结合学生当前成绩、目标专业和备考时间，逐校比较材料审查、校内考、面试或口试，以及 EJU、共通考试和英语成绩的计分方式，再确定报考组合与备考重点。';

  const contactTitle = document.querySelector('.contact-copy h2');
  if (contactTitle) contactTitle.textContent = '日本学部留学咨询';

  /* LEFT column = summary + three experience rows. RIGHT column = TABITO only. */
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
          <img class="tabito-logo-float" src="/assets/tabito-logo.webp?v=20260814u" alt="TABITO 中国旅人教育集团株式会社 Logo" loading="eager" decoding="async">
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
      img.src = '/assets/student-feedback-wechat-v5.webp?v=20260814u';
    };
    img.src = '/assets/student-feedback-wechat.webp?v=20260814u';
    if (caption) caption.textContent = '学生课程反馈';
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