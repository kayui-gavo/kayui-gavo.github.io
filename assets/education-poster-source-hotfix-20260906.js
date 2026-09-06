(() => {
  const POSTER = '/assets/course-autumn-2026.jpg?v=20260906d';

  if (!document.querySelector('link[data-course-poster-viewer-hotfix]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = '/assets/education-poster-viewer-20260906.css?v=20260906d';
    style.dataset.coursePosterViewerHotfix = 'true';
    document.head.appendChild(style);
  }

  const repairPosterImages = () => {
    document.querySelectorAll('#featured-course img, #course-poster-lightbox img').forEach(img => {
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      if (img.getAttribute('src') !== POSTER) img.setAttribute('src', POSTER);
    });
  };

  repairPosterImages();
  const observer = new MutationObserver(repairPosterImages);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', repairPosterImages, { once: true });
})();
