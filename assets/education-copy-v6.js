import('./education-copy-v11.js?v=20260814aa').then(() => {
  const kyotoEducation = [...document.querySelectorAll('.hero-education > div')].find(node => node.querySelector('strong')?.textContent.trim() === '京都大学');
  if (kyotoEducation) {
    const detail = kyotoEducation.querySelector('span');
    if (detail) detail.textContent = '工学部 电气电子工程';
  }
});

(() => {
  const installPolish = () => {
    [['v21','/assets/education-polish-v21.css?v=20260814ab'],['v22','/assets/education-polish-v22.css?v=20260814ac']].forEach(([version,href]) => {
      if (document.querySelector(`link[data-education-polish="${version}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.educationPolish = version;
      document.head.appendChild(link);
    });

    if (!document.querySelector('style[data-education-interactions="v23"]')) {
      fetch('/assets/education-interactions-v23.css.b64?v=20260814ad')
        .then(response => response.text())
        .then(encoded => {
          const style = document.createElement('style');
          style.dataset.educationInteractions = 'v23';
          style.textContent = atob(encoded.trim());
          document.head.appendChild(style);
        })
        .catch(() => {});
    }

    if (!document.querySelector('script[data-education-interactions="v23"]')) {
      const script = document.createElement('script');
      script.src = '/assets/education-interactions-v23.js?v=20260814ad';
      script.defer = true;
      script.dataset.educationInteractions = 'v23';
      document.head.appendChild(script);
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
  observer.observe(document.head, { childList:true });
  window.addEventListener('load', () => setTimeout(installPolish, 0), { once:true });
})();
