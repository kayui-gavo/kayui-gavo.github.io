(() => {
  if (window.__educationFunctionalInteractions) return;
  window.__educationFunctionalInteractions = true;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* Always pull in the latest interactive course polish from versioned URLs. */
  if (!document.querySelector('link[data-education-course-interactive="v12"]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = '/assets/education-course-editorial-v12.css?v=20260823j';
    style.dataset.educationCourseInteractive = 'v12';
    document.head.appendChild(style);
  }
  if (!document.querySelector('link[data-education-course-reading="v13"]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = '/assets/education-course-editorial-v13.css?v=20260824a';
    style.dataset.educationCourseReading = 'v13';
    document.head.appendChild(style);
  }

  /* Winter curriculum: legacy enhancement remains guarded and only runs for
     the older stacked-card markup. The 2026 compact catalog has its own tabs. */
  const enhanceWinterCourses = () => {
    const section = document.querySelector('#course-2026');
    if (!section || section.dataset.interactiveEnhanced === 'true') return;

    const cards = [...section.querySelectorAll('.year-course-card')].slice(0, 3);
    const terms = [...section.querySelectorAll('.year-courses-status .year-term')].slice(0, 3);
    if (!cards.length) return;

    section.dataset.interactiveEnhanced = 'true';
    const ids = ['winter-course-system', 'winter-course-drill', 'winter-course-tokyo-science'];
    const labels = ['48h 系统冲刺', '24h 刷题实战', '20h 理工专项'];
    let courseFrame = 0;

    const jumpToCard = index => {
      const card = cards[index];
      if (!card) return;
      card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      try { history.replaceState(null, '', `#${card.id}`); } catch (_) {}
    };

    const requestCourseSync = () => {
      if (courseFrame) return;
      courseFrame = requestAnimationFrame(syncCourseState);
    };

    cards.forEach((card, index) => {
      card.id = card.id || ids[index];
      const detail = card.querySelector('.year-course-details');
      const summary = detail?.querySelector('summary');
      if (!detail || !summary) return;

      summary.setAttribute('aria-expanded', String(detail.open));

      if (!detail.querySelector('.course-syllabus-footer')) {
        const footer = document.createElement('div');
        footer.className = 'course-syllabus-footer';
        footer.innerHTML = `
          <small>COURSE ${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}</small>
          <button type="button" data-course-action="collapse">收起课表 ↑</button>
          <button type="button" data-course-action="top">返回课程标题 ↑</button>`;
        detail.appendChild(footer);

        footer.querySelector('[data-course-action="collapse"]')?.addEventListener('click', () => {
          detail.open = false;
          summary.focus({ preventScroll: true });
          card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        });
        footer.querySelector('[data-course-action="top"]')?.addEventListener('click', () => {
          card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        });
      }

      detail.addEventListener('toggle', () => {
        summary.setAttribute('aria-expanded', String(detail.open));
        requestAnimationFrame(requestCourseSync);
      });
    });

    terms.forEach((term, index) => {
      if (!cards[index]) return;
      term.setAttribute('role', 'button');
      term.setAttribute('tabindex', '0');
      term.setAttribute('aria-controls', cards[index].id);
      term.setAttribute('aria-label', `${labels[index]}，跳转到课程详情`);
      term.addEventListener('click', () => jumpToCard(index));
      term.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        jumpToCard(index);
      });
    });

    section.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      const openDetail = event.target.closest?.('.year-course-details[open]');
      if (!openDetail) return;
      event.preventDefault();
      openDetail.open = false;
      openDetail.querySelector('summary')?.focus({ preventScroll: true });
    });

    let floatNav = section.querySelector('.course-float-nav');
    if (!floatNav) {
      floatNav = document.createElement('nav');
      floatNav.className = 'course-float-nav';
      floatNav.setAttribute('aria-label', '冬学期物理课程快速导航');
      labels.forEach((label, index) => {
        if (!cards[index]) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-controls', cards[index].id);
        button.setAttribute('aria-label', label);
        button.innerHTML = `<span>${label}</span>`;
        button.addEventListener('click', () => jumpToCard(index));
        floatNav.appendChild(button);
      });
      section.appendChild(floatNav);
    }
    const floatButtons = [...floatNav.querySelectorAll('button')];

    if (!reduceMotion && 'IntersectionObserver' in window) {
      section.classList.add('has-course-motion');
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in-view');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: .06, rootMargin: '0px 0px -7% 0px' });
      cards.forEach(card => revealObserver.observe(card));
    } else {
      cards.forEach(card => card.classList.add('is-in-view'));
    }

    function syncCourseState() {
      courseFrame = 0;
      const sectionRect = section.getBoundingClientRect();
      const visible = sectionRect.top < window.innerHeight * .58 && sectionRect.bottom > window.innerHeight * .24;
      floatNav?.classList.toggle('is-visible', visible);

      if (window.innerWidth >= 768) {
        const start = Math.min(220, window.innerHeight * .28);
        const travel = Math.max(1, sectionRect.height - window.innerHeight * .56);
        const progressed = Math.min(travel, Math.max(0, start - sectionRect.top));
        const ratio = Math.min(1, Math.max(0, progressed / travel));
        section.style.setProperty('--course-progress', `${Math.max(6, ratio * 100).toFixed(2)}%`);
      }

      const anchor = Math.min(220, window.innerHeight * .28);
      let activeIndex = 0;
      let bestDistance = Infinity;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const centerBias = rect.top <= anchor && rect.bottom >= anchor
          ? 0
          : Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor));
        if (centerBias < bestDistance) {
          bestDistance = centerBias;
          activeIndex = index;
        }
      });

      cards.forEach((card, index) => card.classList.toggle('is-current', index === activeIndex && visible));
      terms.forEach((term, index) => {
        term.classList.toggle('is-current', index === activeIndex && visible);
        if (index === activeIndex && visible) term.setAttribute('aria-current', 'true');
        else term.removeAttribute('aria-current');
      });
      floatButtons.forEach((button, index) => {
        button.classList.toggle('is-current', index === activeIndex && visible);
        if (index === activeIndex && visible) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      });
    }

    window.addEventListener('scroll', requestCourseSync, { passive: true });
    window.addEventListener('resize', requestCourseSync, { passive: true });
    requestAnimationFrame(syncCourseState);
  };
  enhanceWinterCourses();
  window.addEventListener('education:copy-ready', enhanceWinterCourses, { once: true });

  /* Gallery: precise position indicator + mouse drag without opening a card by mistake. */
  const grid = document.querySelector('.student-media-grid');
  const toolbar = document.querySelector('.student-slider-toolbar');
  const cards = grid ? [...grid.querySelectorAll('.student-shot')] : [];

  if (grid && cards.length) {
    let status = toolbar?.querySelector('.student-slider-status');
    if (toolbar && !status) {
      status = document.createElement('span');
      status.className = 'student-slider-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.innerHTML = `
        <span class="student-slider-status__count">01 / ${String(cards.length).padStart(2, '0')}</span>
        <span class="student-slider-status__track" aria-hidden="true"><i></i></span>`;
      const actions = toolbar.querySelector('.student-slider-actions');
      toolbar.insertBefore(status, actions || null);
    }

    const count = status?.querySelector('.student-slider-status__count');
    const meter = status?.querySelector('.student-slider-status__track i');
    let galleryFrame = 0;

    const currentIndex = () => {
      const center = grid.scrollLeft + grid.clientWidth / 2;
      let best = 0;
      let distance = Infinity;
      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const d = Math.abs(cardCenter - center);
        if (d < distance) {
          distance = d;
          best = index;
        }
      });
      return best;
    };

    const syncGallery = () => {
      galleryFrame = 0;
      const index = currentIndex();
      if (count) count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      if (meter) meter.style.transform = `scaleX(${(index + 1) / cards.length})`;
      cards.forEach((card, i) => card.toggleAttribute('data-gallery-current', i === index));
    };

    const requestGallerySync = () => {
      if (galleryFrame) return;
      galleryFrame = requestAnimationFrame(syncGallery);
    };
    grid.addEventListener('scroll', requestGallerySync, { passive: true });
    window.addEventListener('resize', requestGallerySync, { passive: true });
    requestAnimationFrame(syncGallery);

    if (finePointer) {
      let pointerId = null;
      let startX = 0;
      let startScroll = 0;
      let dragged = false;
      let suppressClickUntil = 0;

      grid.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        pointerId = event.pointerId;
        startX = event.clientX;
        startScroll = grid.scrollLeft;
        dragged = false;
        grid.setPointerCapture?.(pointerId);
      });

      grid.addEventListener('pointermove', event => {
        if (pointerId !== event.pointerId) return;
        const dx = event.clientX - startX;
        if (!dragged && Math.abs(dx) > 5) {
          dragged = true;
          grid.classList.add('is-pointer-dragging');
        }
        if (!dragged) return;
        event.preventDefault();
        grid.scrollLeft = startScroll - dx;
      }, { passive: false });

      const endDrag = event => {
        if (pointerId !== event.pointerId) return;
        if (dragged) suppressClickUntil = performance.now() + 180;
        grid.classList.remove('is-pointer-dragging');
        try { grid.releasePointerCapture?.(pointerId); } catch (_) {}
        pointerId = null;
        dragged = false;
        requestGallerySync();
      };
      grid.addEventListener('pointerup', endDrag);
      grid.addEventListener('pointercancel', endDrag);
      grid.addEventListener('click', event => {
        if (performance.now() >= suppressClickUntil) return;
        event.preventDefault();
        event.stopImmediatePropagation();
      }, true);
    }
  }

  /* Graduate school details: keep one school open at a time. */
  const graduateDetails = [...document.querySelectorAll('.graduate-details details')];
  graduateDetails.forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      graduateDetails.forEach(other => {
        if (other !== detail && other.open) other.open = false;
      });
    });
  });

  /* Lightbox: add a count, focus containment and touch swipe. Works even if v23 creates it later. */
  const enhanceLightbox = box => {
    if (!box || box.dataset.functionalEnhanced) return;
    box.dataset.functionalEnhanced = 'true';

    const figure = box.querySelector('.education-lightbox__figure');
    const preview = box.querySelector('.education-lightbox__image');
    const prev = box.querySelector('.education-lightbox__prev');
    const next = box.querySelector('.education-lightbox__next');
    const sourceImages = [...document.querySelectorAll('.student-shot img')];
    if (!figure || !preview) return;

    let counter = figure.querySelector('.education-lightbox__count');
    if (!counter) {
      counter = document.createElement('span');
      counter.className = 'education-lightbox__count';
      counter.setAttribute('aria-hidden', 'true');
      figure.appendChild(counter);
    }

    const pathOf = src => {
      try { return new URL(src, location.href).pathname; } catch (_) { return src || ''; }
    };
    const syncCounter = () => {
      const shown = pathOf(preview.currentSrc || preview.src);
      let index = sourceImages.findIndex(img => pathOf(img.currentSrc || img.src) === shown);
      if (index < 0) index = 0;
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(sourceImages.length).padStart(2, '0')}`;
    };
    preview.addEventListener('load', syncCounter);
    new MutationObserver(syncCounter).observe(preview, { attributes: true, attributeFilter: ['src'] });
    syncCounter();

    let swipeX = null;
    figure.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse') return;
      swipeX = event.clientX;
    });
    figure.addEventListener('pointerup', event => {
      if (swipeX === null || event.pointerType === 'mouse') return;
      const dx = event.clientX - swipeX;
      swipeX = null;
      if (Math.abs(dx) < 48) return;
      (dx > 0 ? prev : next)?.click();
    });
    figure.addEventListener('pointercancel', () => { swipeX = null; });

    document.addEventListener('keydown', event => {
      if (!box.classList.contains('is-open') || event.key !== 'Tab') return;
      const focusables = [...box.querySelectorAll('button:not([disabled]),a[href]')].filter(node => node.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  };

  const existingBox = document.querySelector('.education-lightbox');
  if (existingBox) enhanceLightbox(existingBox);
  else {
    const observer = new MutationObserver(() => {
      const box = document.querySelector('.education-lightbox');
      if (!box) return;
      observer.disconnect();
      enhanceLightbox(box);
    });
    observer.observe(document.body, { childList: true });
  }

  /* Make in-page navigation land below the sticky header instead of underneath it. */
  document.querySelectorAll('.nav-links a[href^="#"],.mobile-jump-nav a[href^="#"],a.btn[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const id = link.getAttribute('href');
      if (!id || id === '#' || !id.startsWith('#')) return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });
})();