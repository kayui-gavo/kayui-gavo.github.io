(() => {
  const POSTER = '/assets/course-autumn-2026.jpg?v=20260906c';

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
