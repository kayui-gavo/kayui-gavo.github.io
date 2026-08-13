import('./education-copy-v11.js?v=20260814aa');

(() => {
  const installPolish = () => {
    if (document.querySelector('link[data-education-polish="v21"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/education-polish-v21.css?v=20260814ab';
    link.dataset.educationPolish = 'v21';
    document.head.appendChild(link);
  };

  const finalReady = () => document.querySelector('link[data-education-final="v20"]');
  if (finalReady()) {
    installPolish();
    return;
  }

  const observer = new MutationObserver(() => {
    if (!finalReady()) return;
    observer.disconnect();
    installPolish();
  });
  observer.observe(document.head, { childList: true });
  window.addEventListener('load', () => setTimeout(installPolish, 0), { once: true });
})();
