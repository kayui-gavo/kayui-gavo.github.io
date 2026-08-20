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

    /* 2026 course preview: compact, differentiated, and useful at a glance. */
    const coursePreview = document.querySelector('#course-2026');
    const courseCards = [...document.querySelectorAll('#course-2026 .year-course-card')];

    if (coursePreview) {
      const intro = coursePreview.querySelector('.year-courses-intro');
      if (intro) {
        intro.textContent = '上半期课程已结课。下半期预计开设 48h 系统课、24h 刷题课与 20h 东京科学大学理工学系专项课。';
      }
    }

    const systemCard = courseCards.find(card => {
      const title = card.querySelector('h4')?.textContent || '';
      return title.includes('共通考试物理') && !title.includes('刷题班');
    });
    if (systemCard) {
      const eyebrow = systemCard.querySelector('.year-course-card-head small');
      if (eyebrow) eyebrow.textContent = '下半期｜系统课程';

      const copy = systemCard.querySelector('.year-course-copy');
      if (copy) {
        copy.textContent = '24 回 × 2h。按力学、波动、热学、电磁学建立完整体系，并在对应章节穿插实验、图表与综合题训练。';
      }
    }

    const practiceCard = courseCards.find(card =>
      card.querySelector('h4')?.textContent.includes('刷题班')
    );
    if (practiceCard) {
      const eyebrow = practiceCard.querySelector('.year-course-card-head small');
      if (eyebrow) eyebrow.textContent = '下半期｜考前实战';

      const copy = practiceCard.querySelector('.year-course-copy');
      if (copy) {
        copy.textContent = '12 回 × 2h。前半集中训练高频题型与实验资料题，后半以 5 年份真题精讲进入整卷演习，训练答题顺序、时间分配与易错判断。';
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
        if (detail) detail.textContent = '力学：抛体、刚体、动量与冲量、圆周运动、简谐振动、万有引力等高频题型。';
      }
      if (units[1]) {
        const detail = units[1].querySelector('span');
        if (detail) detail.textContent = '波动・热学・电磁学・原子：重点处理实验、图表、条件变化和综合设问。';
      }
      if (units[2]) {
        const label = units[2].querySelector('b');
        const detail = units[2].querySelector('span');
        if (label) label.textContent = '第8–12回';
        if (detail) detail.textContent = '5 年份真题精讲：以整套试卷为单位复盘考点组合、实验图表、答题顺序、时间分配和易错点。';
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
        copy.textContent = '不按章节重复复习，而是按校内考的题型与设问风格重新组织。重点补强 EJU / 共通考试较少训练的陌生模型、原理推导和长文建模。';
      }

      let exclusive = scienceTokyoCard.querySelector('.year-course-exclusive');
      if (!exclusive) {
        exclusive = document.createElement('div');
        exclusive.className = 'year-course-exclusive';
        const track = scienceTokyoCard.querySelector('.year-course-track');
        if (track) track.insertAdjacentElement('beforebegin', exclusive);
      }
      exclusive.innerHTML = '<span>ORIGINAL</span><strong>独家原创模拟题</strong><small>基于历年题型与设问结构自主命制</small>';

      const track = scienceTokyoCard.querySelector('.year-course-track');
      if (track) {
        track.innerHTML = '<li><b>题型归类</b></li><li><b>陌生模型</b></li><li><b>原理推导</b></li><li><b>原创模拟</b></li>';
        track.setAttribute('aria-label', '东京科学大学理工学系课程训练重点');
      }

      const summary = scienceTokyoCard.querySelector('.year-course-details summary');
      if (summary) summary.textContent = '专项训练内容';

      const syllabus = scienceTokyoCard.querySelector('.year-course-syllabus');
      if (syllabus) {
        syllabus.innerHTML = `
          <div class="year-course-unit"><b>题型归类</b><span>从历年题中提炼反复出现的设问结构、信息组织方式与解题入口，按“怎么考、先判断什么”重新组织训练。</span></div>
          <div class="year-course-unit"><b>陌生模型</b><span>集中处理 EJU / 共通考试较少出现的复合模型与新颖设定，训练从研究对象、约束和基本定律出发现场建模。</span></div>
          <div class="year-course-unit"><b>原理推导</b><span>强化从定义、基本定律和已知关系自行推出结论的能力，适应题目不给现成公式、需要连续完成中间推导的设问。</span></div>
          <div class="year-course-unit"><b>数学工具</b><span>微小量、一次近似、极限、微积分、数列与三角变换不单独讲成一章，而是在对应题型中作为推导工具反复使用。</span></div>
          <div class="year-course-unit"><b>原创模拟</b><span>配置本课程独家原创模拟题，基于历年题型、设问链与能力要求自主命制，用于检验面对未见过的综合模型时，能否独立完成判断、推导和记述。</span></div>
          <p class="year-course-note">20h 按题型结构与难点分组推进，并结合原创模拟题演习；不按力学、波动、热学、电磁学的普通章节顺序重复讲解。</p>
        `;
      }
    }

    /* Keep the block compact: opening one syllabus closes the others. */
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