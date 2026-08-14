(() => {
  if (window.__educationFunctionalInteractions) return;
  window.__educationFunctionalInteractions = true;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

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
