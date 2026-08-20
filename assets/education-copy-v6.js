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

    /* Keep the 2026 course preview compact while making the course design accurate. */
    const courseCards = [...document.querySelectorAll('#course-2026 .year-course-card')];

    const practiceCard = courseCards.find(card =>
      card.querySelector('h4')?.textContent.includes('刷题班')
    );
    if (practiceCard) {
      const copy = practiceCard.querySelector('.year-course-copy');
      if (copy) {
        copy.textContent = '12 回 × 2h。前半按高频题型集中训练，后半安排 5 年份真题精讲与整套考试训练。';
      }

      const track = practiceCard.querySelector('.year-course-track');
      if (track) {
        track.innerHTML = '<li><b>题型训练</b><span>14h</span></li><li><b>5 年份真题</b><span>10h</span></li>';
        track.setAttribute('aria-label', '24小时刷题班构成');
      }

      const units = [...practiceCard.querySelectorAll('.year-course-unit')];
      if (units[2]) {
        const label = units[2].querySelector('b');
        const detail = units[2].querySelector('span');
        if (label) label.textContent = '第8–12回';
        if (detail) detail.textContent = '5 年份真题精讲：以完整试卷为单位复盘考点组合、实验与图表处理、时间分配和易错判断。';
      }
    }

    const scienceTokyoCard = courseCards.find(card =>
      card.querySelector('h4')?.textContent.includes('东京科学大学')
    );
    if (scienceTokyoCard) {
      const copy = scienceTokyoCard.querySelector('.year-course-copy');
      if (copy) {
        copy.textContent = '不按知识章节重新讲解，而是按理工学系校内考的题型与设问风格归类训练。重点补强 EJU / 共通考试中较少接触的模型，以及从基本原理出发的推导。';
      }

      const track = scienceTokyoCard.querySelector('.year-course-track');
      if (track) {
        track.innerHTML = '<li><b>陌生模型</b></li><li><b>原理推导</b></li><li><b>近似与数学工具</b></li><li><b>长文记述</b></li>';
        track.setAttribute('aria-label', '东京科学大学理工学系课程训练重点');
      }

      const summary = scienceTokyoCard.querySelector('.year-course-details summary');
      if (summary) summary.textContent = '题型风格预览';

      const syllabus = scienceTokyoCard.querySelector('.year-course-syllabus');
      if (syllabus) {
        syllabus.innerHTML = `
          <div class="year-course-unit"><b>陌生模型</b><span>EJU / 共通考试中较少出现的复合模型与新颖设定。先判断研究对象、约束和可用定律，再把陌生题拆回熟悉的物理结构。</span></div>
          <div class="year-course-unit"><b>原理推导</b><span>强化从定义、基本定律和已知关系出发自行导出结论的能力，适应题目不给现成公式、要求逐步推出关系式的设问。</span></div>
          <div class="year-course-unit"><b>数学与近似</b><span>微小量、一次近似、极限、微积分与三角变换等不单独成章，而是在对应题型中作为推导工具反复使用。</span></div>
          <div class="year-course-unit"><b>长文记述</b><span>训练长条件题的读取顺序、分阶段建模和答案组织，把中间判断与推导写成能够被评分的完整过程。</span></div>
          <p class="year-course-note">20h 的具体课次将按历年题的出题结构与难点分组，不按力学、波动、热学、电磁学的普通章节顺序推进。</p>
        `;
      }
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

    if (!document.querySelector('script[data-education-language-switch]')) {
      const script = document.createElement('script');
      script.src = '/assets/education-language-switch.js?v=20260814ao';
      script.defer = true;
      script.dataset.educationLanguageSwitch = 'true';
      document.head.appendChild(script);
    }

    window.__educationCopyReady = true;
    window.dispatchEvent(new CustomEvent('education:copy-ready'));
  });
})();
