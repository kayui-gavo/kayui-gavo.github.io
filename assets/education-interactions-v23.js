(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* Section micro-entry state. */
  const sections = [...document.querySelectorAll('[data-section]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-section-visible');
      });
    }, { threshold: .12 });
    sections.forEach(section => observer.observe(section));
  } else {
    sections.forEach(section => section.classList.add('is-section-visible'));
  }

  /* Pointer-following soft light on cards. */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.principle,.planning-card,.student-shot,.qr-item,.tabito-block').forEach(card => {
      card.classList.add('interaction-glow-host');
      if (!card.querySelector(':scope > .interaction-glow')) {
        const glow = document.createElement('span');
        glow.className = 'interaction-glow';
        glow.setAttribute('aria-hidden', 'true');
        card.prepend(glow);
      }
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
      });
    });

    const stage = document.querySelector('.portrait-stage');
    const frame = document.querySelector('.portrait-frame');
    if (stage && frame) {
      stage.addEventListener('pointermove', event => {
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        frame.style.setProperty('--portrait-ry', `${x * 1.5}deg`);
        frame.style.setProperty('--portrait-rx', `${y * -1.2}deg`);
      });
      stage.addEventListener('pointerleave', () => {
        frame.style.setProperty('--portrait-ry', '0deg');
        frame.style.setProperty('--portrait-rx', '0deg');
      });
    }
  }

  /* Gentle image-ready transition. */
  document.querySelectorAll('.student-shot img,.tabito-photo img,.portrait-frame img').forEach(img => {
    img.classList.add('js-image-awaiting');
    const ready = () => {
      img.classList.remove('js-image-awaiting');
      img.classList.add('js-image-ready');
    };
    if (img.complete) ready(); else img.addEventListener('load', ready, { once:true });
  });

  /* Screenshot lightbox with keyboard navigation. */
  const shots = [...document.querySelectorAll('.student-shot')];
  const shotImages = shots.map(shot => shot.querySelector('img')).filter(Boolean);
  if (shotImages.length) {
    const box = document.createElement('div');
    box.className = 'education-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', '教学与录取记录大图');
    box.innerHTML = '<button class="education-lightbox__close" type="button" aria-label="关闭">×</button><button class="education-lightbox__nav education-lightbox__prev" type="button" aria-label="上一张">←</button><figure class="education-lightbox__figure"><img class="education-lightbox__image" alt=""><figcaption class="education-lightbox__caption"></figcaption></figure><button class="education-lightbox__nav education-lightbox__next" type="button" aria-label="下一张">→</button>';
    document.body.appendChild(box);
    const preview = box.querySelector('.education-lightbox__image');
    const caption = box.querySelector('.education-lightbox__caption');
    let current = 0;
    let lastFocus = null;

    const render = index => {
      current = (index + shotImages.length) % shotImages.length;
      const source = shotImages[current];
      const shot = source.closest('.student-shot');
      preview.src = source.currentSrc || source.src;
      preview.alt = source.alt || '教学与录取记录';
      caption.textContent = shot?.querySelector('figcaption')?.textContent || preview.alt;
    };
    const open = index => {
      lastFocus = document.activeElement;
      render(index);
      box.classList.add('is-open');
      document.body.classList.add('education-lightbox-open');
      box.querySelector('.education-lightbox__close').focus({ preventScroll:true });
    };
    const close = () => {
      box.classList.remove('is-open');
      document.body.classList.remove('education-lightbox-open');
      if (lastFocus?.focus) lastFocus.focus({ preventScroll:true });
    };
    box.querySelector('.education-lightbox__close').addEventListener('click', close);
    box.querySelector('.education-lightbox__prev').addEventListener('click', () => render(current - 1));
    box.querySelector('.education-lightbox__next').addEventListener('click', () => render(current + 1));
    box.addEventListener('click', event => { if (event.target === box) close(); });
    document.addEventListener('keydown', event => {
      if (!box.classList.contains('is-open')) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') render(current - 1);
      if (event.key === 'ArrowRight') render(current + 1);
    });
    shots.forEach((shot, index) => {
      shot.tabIndex = 0;
      shot.setAttribute('role', 'button');
      shot.setAttribute('aria-label', `${shot.querySelector('figcaption')?.textContent || '教学记录'}，点击查看大图`);
      shot.addEventListener('click', () => open(index));
      shot.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(index); }
      });
    });
  }

  /* Copy QQ number with compact feedback. */
  const qq = [...document.querySelectorAll('.qr-item b')].find(node => /1024075295/.test(node.textContent));
  if (qq) {
    qq.classList.add('qq-copy-target');
    qq.dataset.copyState = '点击复制';
    qq.setAttribute('role', 'button');
    qq.tabIndex = 0;
    const copy = async () => {
      try {
        await navigator.clipboard.writeText('1024075295');
        qq.dataset.copyState = '已复制';
      } catch {
        qq.dataset.copyState = 'QQ 1024075295';
      }
      qq.dataset.copyVisible = 'true';
      window.setTimeout(() => { qq.dataset.copyVisible = 'false'; qq.dataset.copyState = '点击复制'; }, 1300);
    };
    qq.addEventListener('click', copy);
    qq.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); copy(); } });
  }

  /* Back to top appears only after the hero is well behind the visitor. */
  const topButton = document.createElement('button');
  topButton.className = 'education-to-top';
  topButton.type = 'button';
  topButton.setAttribute('aria-label', '返回页面顶部');
  document.body.appendChild(topButton);
  const updateTop = () => topButton.classList.toggle('is-visible', window.scrollY > Math.max(640, window.innerHeight * .75));
  window.addEventListener('scroll', updateTop, { passive:true });
  updateTop();
  topButton.addEventListener('click', () => window.scrollTo({ top:0, behavior:reduceMotion ? 'auto' : 'smooth' }));
})();
