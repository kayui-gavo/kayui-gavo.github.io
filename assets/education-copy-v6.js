import('./education-copy-v11.js?v=20260814aa').then(() => {
  const kyotoEducation = [...document.querySelectorAll('.hero-education > div')]
    .find(node => node.querySelector('strong')?.textContent.trim() === '京都大学');
  if (kyotoEducation) {
    const detail = kyotoEducation.querySelector('span');
    if (detail) detail.textContent = '工学部 电气电子工程';
  }
});

(() => {
  const installPolish = () => {
    if (!document.querySelector('link[data-education-polish="v21"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/assets/education-polish-v21.css?v=20260814ab';
      link.dataset.educationPolish = 'v21';
      document.head.appendChild(link);
    }
    if (!document.querySelector('link[data-education-polish="v22"]')) {
      const detail = document.createElement('link');
      detail.rel = 'stylesheet';
      detail.href = '/assets/education-polish-v22.css?v=20260814ac';
      detail.dataset.educationPolish = 'v22';
      document.head.appendChild(detail);
    }
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
