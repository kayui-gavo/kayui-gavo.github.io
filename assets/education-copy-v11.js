import('./education-copy-v10.js?v=20260814j').then(() => {
  const planningText = document.querySelector('.planning-head > p');
  if (planningText) {
    planningText.textContent = '结合学生当前成绩、目标专业和备考时间，逐校比较材料审查、校内考、面试或口试，以及 EJU、共通考试和英语成绩的计分方式，再确定报考组合与备考重点。';
  }

  /* Keep all evidence cards at one readable media height. */
  const mediaGrid = document.querySelector('.student-media-grid');
  const sizeEvidenceMedia = () => {
    document.querySelectorAll('.student-media-grid .student-shot').forEach(card => {
      const width = card.clientWidth || 350;
      const targetHeight = Math.round(Math.min(470, Math.max(410, width * 1.3)));
      const img = card.querySelector('img');
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

  /* Recover the final screenshot from the sixth cell of the original 3×2 wall.
     The crop is calculated from the source dimensions so the image is not stretched. */
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
    }
    let crop = media.querySelector('.feedback-wall-crop');
    if (!crop) {
      crop = document.createElement('div');
      crop.className = 'feedback-wall-crop';
      media.appendChild(crop);
    }

    const sizeFeedback = () => {
      const cardWidth = feedbackShot.clientWidth || 350;
      const height = Math.round(Math.min(470, Math.max(410, cardWidth * 1.3)));
      const scaledWallWidth = 1118 * ((height * 2) / 1090);
      const cellWidth = scaledWallWidth / 3;
      media.style.cssText = `display:block;position:relative;width:100%;height:${height}px;min-height:${height}px;max-height:${height}px;overflow:hidden;background:#f7f7f7;`;
      crop.style.cssText = `position:absolute;top:0;bottom:0;width:${cellWidth}px;left:50%;transform:translateX(-50%);background-image:url('/assets/student-record-wall-v4.webp?v=20260814n');background-repeat:no-repeat;background-size:auto ${height * 2}px;background-position:right bottom;background-color:#f7f7f7;`;
    };
    sizeFeedback();
    window.addEventListener('resize', () => { sizeEvidenceMedia(); sizeFeedback(); }, { passive:true });

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

  /* Treat each route as one typographic unit. */
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
