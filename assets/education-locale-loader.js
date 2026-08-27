(() => {
  const html = document.documentElement;
  const locale = html.dataset.educationLocale || 'zh-CN';
  const isTraditional = /^zh-(TW|Hant)/i.test(locale);

  const loadScript = src => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const waitCopyReady = () => new Promise(resolve => {
    if (window.__educationCopyReady) return resolve();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.removeEventListener('education:copy-ready', finish);
      resolve();
    };
    window.addEventListener('education:copy-ready', finish, { once:true });
    window.setTimeout(finish, 1800);
  });

  const boot = async () => {
    try {
      const response = await fetch('/education/?localeSource=20260828f', { cache:'no-cache' });
      if (!response.ok) throw new Error(`education source ${response.status}`);
      const source = await response.text();
      const parsed = new DOMParser().parseFromString(source, 'text/html');
      if (!parsed.body?.innerHTML) throw new Error('education source body missing');

      document.body.innerHTML = parsed.body.innerHTML;
      if (parsed.body.className) document.body.className = parsed.body.className;

      await loadScript('/assets/education.js?v=20260813r');
      const ready = waitCopyReady();
      await loadScript('/assets/education-copy-v6.js?v=20260828d');
      await ready;
      await loadScript('/assets/education-language-switch.js?v=20260821a');
      if (isTraditional) {
        await loadScript('/assets/education-locale-zh-tw.js?v=20260828f');
        window.applyEducationZhTW?.();
        requestAnimationFrame(() => window.applyEducationZhTW?.());
        window.setTimeout(() => window.applyEducationZhTW?.(), 600);
        window.setTimeout(() => window.applyEducationZhTW?.(), 2200);
      }
    } catch (error) {
      console.error('[education locale]', error);
      const fallback = document.querySelector('.locale-fallback');
      if (fallback) fallback.hidden = false;
    } finally {
      html.classList.remove('locale-loading');
      html.classList.replace('no-js','js');
    }
  };

  boot();
})();
