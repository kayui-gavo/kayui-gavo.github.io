(() => {
  if (!document.querySelector('link[data-education-final="v20"]')) {
    const marker = document.createElement('link');
    marker.dataset.educationFinal = 'v20';
    document.head.appendChild(marker);
  }

  import('./education-copy-v11.js?v=20260814af').then(async () => {
    const kyoto = [...document.querySelectorAll('.hero-education > div')]
      .find(node => node.querySelector('strong')?.textContent.trim() === '京都大学');
    if (kyoto) {
      const detail = kyoto.querySelector('span');
      if (detail) detail.textContent = '工学部 电气电子工程';
    }

    /* Mobile-only content guard: old layers occasionally leave duplicate visible copy. */
    const cleanMobileDuplicates = () => {
      if (!window.matchMedia('(max-width:767px)').matches) return;
      const normalize = value => (value || '').replace(/\s+/g, '').trim();
      const removeExactDuplicates = (root, preferred) => {
        if (!root || !preferred) return;
        const target = normalize(preferred.textContent);
        if (!target) return;
        [...root.querySelectorAll('*')].forEach(node => {
          if (node === preferred || preferred.contains(node) || node.contains(preferred)) return;
          if (node.children.length) return;
          if (normalize(node.textContent) === target) node.remove();
        });
      };

      const hero = document.querySelector('.hero');
      const thesis = hero?.querySelector('.hero-thesis');
      removeExactDuplicates(hero, thesis);
      hero?.querySelectorAll('.hero-motto').forEach(node => node.remove());

      const contact = document.querySelector('.contact-section');
      const contactTitle = contact?.querySelector('.contact-copy h2');
      removeExactDuplicates(contact, contactTitle);
    };
    cleanMobileDuplicates();
    requestAnimationFrame(cleanMobileDuplicates);

    if (!document.querySelector('style[data-education-interactions="v23"]')) {
      try {
        const response = await fetch('/assets/education-interactions-v23.css.b64?v=20260814af', { cache: 'force-cache' });
        const encoded = await response.text();
        const style = document.createElement('style');
        style.dataset.educationInteractions = 'v23';
        style.textContent = atob(encoded.trim());
        document.head.appendChild(style);
      } catch (_) {}
    }

    if (!document.querySelector('script[data-education-interactions="v23"]')) {
      const script = document.createElement('script');
      script.src = '/assets/education-interactions-v23.js?v=20260814af';
      script.defer = true;
      script.dataset.educationInteractions = 'v23';
      document.head.appendChild(script);
    }

    if (!document.querySelector('script[data-education-interactions-functional]')) {
      const script = document.createElement('script');
      script.src = '/assets/education-interactions-functional.js?v=20260814ag';
      script.defer = true;
      script.dataset.educationInteractionsFunctional = 'true';
      document.head.appendChild(script);
    }
  });
})();
