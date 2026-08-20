(() => {
  if (!document.querySelector('link[data-education-final="v20"]')) {
    const marker = document.createElement('link');
    marker.dataset.educationFinal = 'v20';
    document.head.appendChild(marker);
  }

  import('./education-copy-v11.js?v=20260814af').then(async () => {
    /* Keep the visible page unchanged while making the person entity explicit. */
    const applyEducationEntitySignals = () => {
      const alternates = [
        ['zh-CN', 'https://kayui-gavo.github.io/education/'],
        ['zh-TW', 'https://kayui-gavo.github.io/education/zh-tw/'],
        ['x-default', 'https://kayui-gavo.github.io/education/']
      ];
      alternates.forEach(([hreflang, href]) => {
        if (document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)) return;
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        link.href = href;
        document.head.appendChild(link);
      });

      const profileScript = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .find(script => script.textContent.includes('"ProfilePage"'));
      if (!profileScript) return;
      try {
        const data = JSON.parse(profileScript.textContent);
        const person = data?.mainEntity;
        if (data?.['@type'] !== 'ProfilePage' || person?.['@type'] !== 'Person') return;

        data.dateModified = '2026-08-21';
        person.alternateName = ['刘可惟', '劉可惟', '劉 可惟', 'Kewei Liu', 'LIU KEWEI', 'リュウ カユイ'];
        person.disambiguatingDescription = '旅人教育理工科讲师。京都大学工学部电气电子工程毕业，现就读东京大学大学院工学系研究科电气工程与信息系统专攻；主要指导共通考试／EJU物理、理工科校内考与理科口试。';

        const sameAs = new Set(Array.isArray(person.sameAs) ? person.sameAs : []);
        [
          'https://github.com/kayui-gavo',
          'https://www.linkedin.com/in/kayui-ryu/',
          'https://x.com/ryukayuiii'
        ].forEach(url => sameAs.add(url));
        person.sameAs = [...sameAs];

        profileScript.textContent = JSON.stringify(data);
      } catch (_) {}
    };
    applyEducationEntitySignals();

    /*
     * The 2026 course copy now lives in education/index.html as the single
     * source of truth. Keep JS responsible only for interaction, so the
     * first paint, crawled HTML and final rendered copy stay identical.
     */
    const coursePreview = document.querySelector('#course-2026');
    if (coursePreview) {
      const details = [...coursePreview.querySelectorAll('.year-course-details')];
      details.forEach(current => {
        current.addEventListener('toggle', () => {
          if (!current.open) return;
          details.forEach(other => {
            if (other !== current) other.open = false;
          });
        });
      });
    }

    /* Mobile-only guard for legacy duplicate copy left by older layers. */
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

    if (!document.querySelector('script[data-education-language-switch]')) {
      const script = document.createElement('script');
      script.src = '/assets/education-language-switch.js?v=20260821a';
      script.defer = true;
      script.dataset.educationLanguageSwitch = 'true';
      document.head.appendChild(script);
    }

    window.__educationCopyReady = true;
    window.dispatchEvent(new CustomEvent('education:copy-ready'));
  });
})();
