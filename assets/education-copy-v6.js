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

    /* Keep the 2026 course preview compact while making each course role distinct. */
    const coursePreview = document.querySelector('#course-2026');
    const courseCards = [...document.querySelectorAll('#course-2026 .year-course-card')];

    if (coursePreview) {
      const intro = coursePreview.querySelector('.year-courses-intro');
      if (intro) {
        intro.textContent = '上半期课程已结课。下半期预计开设 48h 系统课、24h 刷题课与 20h 东京科学大学理工学系专项课；以下为课程结构预览，具体日程以最终开班安排为准。';
      }
    }

    const systemCard = courseCards.find(card => {
      const title = card.querySelector('h4')?.textContent || '';
      return title.includes('共通考试物理') && !title.includes('刷题班');
    });
    if (systemCard) {
      const copy = systemCard.querySelector('.year-course-copy');
      if (copy) {
        copy.textContent = '24 回 × 2h。按力学、波动、热学、电磁学建立完整知识体系，并把实验、图表与综合题穿插进对应章节。';
      }
    }

    const practiceCard = courseCards.find(card =>
      card.querySelector('h4')?.textContent.includes('刷题班')
    );
    if (practiceCard) {
      const copy = practiceCard.querySelector('.year-course-copy');
      if (copy) {
        copy.textContent = '12 回 × 2h。前半按高频题型与实验资料题集中训练，后半用 5 年份真题做整卷精讲，练习取舍、节奏与易错判断。';
      }

      const track = practiceCard.querySelector('.year-course-track');
      if (track) {
        track.innerHTML = '<li><b>题型演习</b><span>14h</span></li><li><b>5 年份真题精讲</b><span>10h</span></li>';
        track.setAttribute('aria-label', '24小时刷题班构成');
      }

      const summary = practiceCard.querySelector('.year-course-details summary');
      if (summary) summary.textContent = '12 回课程预览';

      const units = [...practiceCard.querySelectorAll('.year-course-unit')];
      if (units[0]) {
        const detail = units[0].querySelector('span');
        if (detail) detail.textContent = '力学题型：抛体、刚体、动量与冲量、圆周运动、简谐振动、万有引力等高频模型。';
      }
      if (units[1]) {
        const detail = units[1].querySelector('span');
        if (detail) detail.textContent = '波动・热学・电磁学・原子题型：实验、图表、条件变化与综合设问を重点训练。';
      }
      if (units[2]) {
        const label = units[2].querySelector('b');
        const detail = units[2].querySelector('span');
        if (label) label.textContent = '第8–12回';
        if (detail) detail.textContent = '5 年份真题精讲：以完整试卷为单位复盘考点组合、实验与图表处理、答题顺序、时间分配与易错判断。';
      }
    }

    const scienceTokyoCard = courseCards.find(card =>
      card.querySelector('h4')?.textContent.includes('东京科学大学')
    );
    if (scienceTokyoCard) {
      const eyebrow = scienceTokyoCard.querySelector('.year-course-card-head small');
      if (eyebrow) eyebrow.textContent = '下半期｜理工学系专项';

      const copy = scienceTokyoCard.querySelector('.year-course-copy');
      if (copy) {
        copy.textContent = '不按章节复习，而是把校内考题按题型与设问风格归类。重点训练 EJU / 共通考试中较少接触的陌生模型、从基本原理自行推导，以及长文条件下的建模与记述。';
      }

      let exclusive = scienceTokyoCard.querySelector('.year-course-exclusive');
      if (!exclusive) {
        exclusive = document.createElement('div');
        exclusive.className = 'year-course-exclusive';
        const track = scienceTokyoCard.querySelector('.year-course-track');
        if (track) track.insertAdjacentElement('beforebegin', exclusive);
      }
      exclusive.innerHTML = '<span>COURSE ORIGINAL</span><strong>独家原创模拟题</strong><small>按历年出题风格与能力要求重新设计</small>';

      const track = scienceTokyoCard.querySelector('.year-course-track');
      if (track) {
        track.innerHTML = '<li><b>陌生模型</b></li><li><b>原理推导</b></li><li><b>长文建模</b></li><li><b>原创模拟题</b></li>';
        track.setAttribute('aria-label', '东京科学大学理工学系课程训练重点');
      }

      const summary = scienceTokyoCard.querySelector('.year-course-details summary');
      if (summary) summary.textContent = '题型风格预览';

      const syllabus = scienceTokyoCard.querySelector('.year-course-syllabus');
      if (syllabus) {
        syllabus.innerHTML = `
          <div class="year-course-unit"><b>题型归类</b><span>不沿用普通教材章节顺序，而是从历年题中抽取反复出现的设问结构、信息组织方式与解题入口，按“怎么考”重新组织课程。</span></div>
          <div class="year-course-unit"><b>陌生模型</b><span>集中处理 EJU / 共通考试较少出现的复合模型与新颖设定。先判断研究对象、约束与可用定律，再把陌生题拆回熟悉的物理结构。</span></div>
          <div class="year-course-unit"><b>原理推导</b><span>强化从定义、基本定律与已知关系自行导出结论的能力，适应不给现成公式、需要逐步推出中间关系的设问。</span></div>
          <div class="year-course-unit"><b>数学工具</b><span>微小量、一次近似、极限、微积分、数列与三角变换不单独成章，而是在具体题型中作为推导工具反复使用。</span></div>
          <div class="year-course-unit"><b>模拟演习</b><span>配置本课程独家原创模拟题，依据历年题的命题风格重新设计条件与模型，用来检验学生是否真正能处理“第一次见”的综合设问。</span></div>
          <p class="year-course-note">20h 的课次按历年题的出题结构与难点分组，并结合原创模拟题推进；不按力学、波动、热学、电磁学的普通章节顺序重复讲解。</p>
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
