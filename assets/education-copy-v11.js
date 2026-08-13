import('./education-copy-v10.js?v=20260814j').then(() => {
  const planningText = document.querySelector('.planning-head > p');
  if (planningText) {
    planningText.textContent = '结合学生当前成绩、目标专业和备考时间，逐校比较材料审查、校内考、面试或口试，以及 EJU、共通考试和英语成绩的计分方式，再确定报考组合与备考重点。';
  }

  /* Contact wording. */
  const contactTitle = document.querySelector('.contact-copy h2');
  if (contactTitle) contactTitle.textContent = '日本学部留学咨询';

  /* Keep the experience summary directly beneath the section title. */
  const experienceSummary = document.querySelector('.experience-head > p');
  if (experienceSummary) {
    experienceSummary.textContent = '现于旅人教育担任董事、营业教育1部部长，负责本科升学课程、报考指导、课程与教材开发，并参与官网和教育产品开发。此前在行知学园负责 EJU 物理大班、一对一及热门大学校内考等课程，也曾在京都大学工学部承担教学支持工作。';
  }

  const sizeEvidenceMedia = (forcedHeight = null) => {
    document.querySelectorAll('.student-media-grid .student-shot').forEach(card => {
      const width = card.clientWidth || 350;
      const targetHeight = forcedHeight || Math.round(Math.min(500, Math.max(420, width * 1.36)));
      const img = card.querySelector(':scope > img');
      if (img) {
        img.style.setProperty('height', `${targetHeight}px`, 'important');
        img.style.setProperty('min-height', `${targetHeight}px`, 'important');
        img.style.setProperty('max-height', `${targetHeight}px`, 'important');
        img.style.setProperty('object-fit', 'contain', 'important');
        img.style.setProperty('object-position', 'center top', 'important');
      }
    });
  };
  sizeEvidenceMedia();

  /* The individual feedback crop has repeatedly rendered incorrectly in browsers.
     Use a real IMG of the original 3×2 evidence wall and crop its bottom-right cell
     geometrically from the image's actual natural dimensions. */
  const feedbackImg = document.querySelector('[data-media="feedback"]');
  const feedbackShot = feedbackImg?.closest('.student-shot');
  if (feedbackShot) {
    feedbackShot.classList.add('feedback-shot', 'feedback-shot--wall-crop');

    let media = feedbackShot.querySelector('.feedback-media');
    if (!media) {
      media = document.createElement('div');
      media.className = 'feedback-media';
      media.setAttribute('role', 'img');
      media.setAttribute('aria-label', '学生课程反馈聊天记录');
      feedbackImg.replaceWith(media);
    } else {
      media.innerHTML = '';
    }

    const wall = document.createElement('img');
    wall.className = 'feedback-wall-image';
    wall.alt = '';
    wall.setAttribute('aria-hidden', 'true');
    wall.decoding = 'async';
    wall.loading = 'eager';
    media.appendChild(wall);

    const applyCrop = () => {
      if (!wall.naturalWidth || !wall.naturalHeight) return;
      const cellWidth = media.clientWidth || feedbackShot.clientWidth || 350;
      const wallRenderedWidth = cellWidth * 3;
      const wallRenderedHeight = wallRenderedWidth * wall.naturalHeight / wall.naturalWidth;
      const cellHeight = wallRenderedHeight / 2;

      media.style.setProperty('height', `${cellHeight}px`, 'important');
      media.style.setProperty('min-height', `${cellHeight}px`, 'important');
      media.style.setProperty('max-height', `${cellHeight}px`, 'important');

      wall.style.setProperty('position', 'absolute', 'important');
      wall.style.setProperty('right', '0', 'important');
      wall.style.setProperty('bottom', '0', 'important');
      wall.style.setProperty('width', `${wallRenderedWidth}px`, 'important');
      wall.style.setProperty('height', `${wallRenderedHeight}px`, 'important');
      wall.style.setProperty('max-width', 'none', 'important');
      wall.style.setProperty('object-fit', 'fill', 'important');

      /* Give the other five cards the same visual stage height. */
      sizeEvidenceMedia(cellHeight);
    };

    wall.addEventListener('load', applyCrop, { once: true });
    wall.src = '/assets/student-record-wall-v4.webp?v=20260814p';

    window.addEventListener('resize', () => {
      requestAnimationFrame(applyCrop);
    }, { passive: true });

    const caption = feedbackShot.querySelector('figcaption');
    if (caption) caption.textContent = '学生课程反馈';
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
