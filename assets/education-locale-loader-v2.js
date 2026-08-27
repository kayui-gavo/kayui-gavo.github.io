(() => {
  const html = document.documentElement;
  const locale = html.dataset.educationLocale || 'zh-CN';
  const isTraditional = /^zh-(TW|Hant)/i.test(locale);
  const HERO_TRAD = '從數學表達回到物理現象，<br>從基本模型走向複雜問題。';

  const forceTraditionalHero = () => {
    if (!isTraditional) return;
    const thesis = document.querySelector('.hero-thesis');
    if (!thesis) return;
    thesis.innerHTML = HERO_TRAD;
  };

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
    window.setTimeout(finish, 2000);
  });

  const keepHeroTraditional = () => {
    if (!isTraditional) return () => {};
    forceTraditionalHero();
    const observer = new MutationObserver(() => forceTraditionalHero());
    observer.observe(document.documentElement, { childList:true, subtree:true, characterData:true });
    const timer = window.setInterval(forceTraditionalHero, 350);
    window.setTimeout(() => {
      window.clearInterval(timer);
      observer.disconnect();
      forceTraditionalHero();
    }, 15000);
    return forceTraditionalHero;
  };

  const boot = async () => {
    const enforce = keepHeroTraditional();
    try {
      const response = await fetch('/education/?localeSource=20260828g', { cache:'no-store' });
      if (!response.ok) throw new Error(`education source ${response.status}`);
      const source = await response.text();
      const parsed = new DOMParser().parseFromString(source, 'text/html');
      if (!parsed.body?.innerHTML) throw new Error('education source body missing');

      document.body.innerHTML = parsed.body.innerHTML;
      if (parsed.body.className) document.body.className = parsed.body.className;
      enforce();

      await loadScript('/assets/education.js?v=20260828g');
      enforce();
      const ready = waitCopyReady();
      await loadScript('/assets/education-copy-v6.js?v=20260828g');
      await ready;
      enforce();
      await loadScript('/assets/education-language-switch.js?v=20260828g');
      enforce();

      if (isTraditional) {
        await loadScript('/assets/education-locale-zh-tw.js?v=20260828g');
        window.applyEducationZhTW?.();
        enforce();
        requestAnimationFrame(() => { window.applyEducationZhTW?.(); enforce(); });
        [250, 700, 1500, 3000, 6000, 10000].forEach(delay => {
          window.setTimeout(() => { window.applyEducationZhTW?.(); enforce(); }, delay);
        });
      }
    } catch (error) {
      console.error('[education locale v2]', error);
      const fallback = document.querySelector('.locale-fallback');
      if (fallback) fallback.hidden = false;
    } finally {
      enforce();
      html.classList.remove('locale-loading');
      html.classList.replace('no-js','js');
    }
  };

  boot();
})();
