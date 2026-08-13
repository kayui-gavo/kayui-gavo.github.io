import('./education-copy-v10.js?v=20260814j').then(() => {
  /* Recover the final student-feedback screenshot directly from the bottom-right
     cell of the original 3×2 evidence wall. This avoids the previously broken
     individual crop while preserving the horizontal gallery. */
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
      media.style.backgroundImage = "url('/assets/student-record-wall-v4.webp?v=20260814k')";
      feedbackImg.replaceWith(media);
    }

    const caption = feedbackShot.querySelector('figcaption');
    if (caption) caption.textContent = '学生课程反馈';
  }

  /* Move consultation guidance underneath the two QR cards, where the desktop
     composition previously had unused space. */
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

  /* Avoid ugly one- or two-character wrap fragments in the long route list by
     treating each selection route as one typographic unit. */
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
