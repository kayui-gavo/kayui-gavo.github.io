(() => {
  if (!document.querySelector('link[data-education-final="v22"]')) {
    const marker = document.createElement('link');
    marker.dataset.educationFinal = 'v22';
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

        data.dateModified = '2026-08-23';
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

    /* Load the latest course art direction even when an older imported copy is cached. */
    if (!document.querySelector('link[data-education-course-2026="v3"]')) {
      const courseStyle = document.createElement('link');
      courseStyle.rel = 'stylesheet';
      courseStyle.href = '/assets/education-course-2026.css?v=20260823a';
      courseStyle.dataset.educationCourse2026 = 'v3';
      document.head.appendChild(courseStyle);
    }

    const applyWinterCourseSchedule = () => {
      const coursePreview = document.querySelector('#course-2026');
      if (!coursePreview) return;

      const systemRows = [
        ['01','力学','运动的描述','位置与位移；速度与加速度；x–t / v–t 图像；匀变速直线运动；自由落体；平抛与斜抛。'],
        ['02','力学','力与运动','常见力与受力分析；共点力平衡；牛顿运动定律；摩擦；连接体；力矩与刚体平衡。'],
        ['03','力学','功・能量・动量','功与功率；动能定理；重力势能与弹性势能；机械能守恒；冲量与动量；动量守恒与碰撞。'],
        ['04','力学','实验・综合专题 I','运动学图像；加速度、摩擦、能量与动量相关实验；数据处理、图表判读与条件判断。'],
        ['05','力学','圆周运动・天体运动','圆周运动与向心力；惯性力与离心力；万有引力；卫星与行星运动；开普勒定律；天体的机械能。'],
        ['06','力学','简谐运动','回复力；弹簧振子；单摆的小角近似；周期；能量；位移、速度与加速度之间的关系。'],
        ['07','力学','实验・综合专题 II','圆周运动与简谐运动的实验、图表与综合设问；多阶段运动；跨章节条件提取与建模。'],
        ['08','波动','波的基本性质','简谐振动与正弦波；振幅、周期、频率与波长；波速；横波与纵波；叠加、反射与驻波。'],
        ['09','波动','波面・射线・干涉','波面与射线；惠更斯原理；反射与折射；相位差与路程差；干涉与衍射。'],
        ['10','波动','声音','声波的干涉与拍频；弦的振动；气柱共鸣；多普勒效应。'],
        ['11','波动','光','光的反射与折射；全反射；透镜成像；杨氏双缝、薄膜干涉与衍射光栅。'],
        ['12','波动','综合专题','波形与图表；驻波；声音实验；透镜与光干涉实验；波动跨单元综合。'],
        ['13','热学','理想气体的状态变化','热量与内能；气体压强；绝对温度；玻意耳定律与查理定律；理想气体状态方程；气体密度；p–V 图。'],
        ['14','热学','分子运动论','分子热运动；气体压强的微观解释；平均平动动能与绝对温度；单原子分子理想气体的内能。'],
        ['15','热学','热力学第一定律','热量、内能与气体做功的关系；摩尔比热；定积、定压、等温与绝热变化；热循环与热机。'],
        ['16','热学','实验・综合专题','p–V 图与热过程判定；热量、功和内能的计算；气体实验与资料题；分子运动论与热机综合。'],
        ['17','电磁学','静电场・点电荷','库仑定律；点电荷产生的电场与电势；叠加原理；电场线与等势面；电势能。'],
        ['18','电磁学','电容器','电容（静电容量）；平行板电容器；串联与并联；储存的能量；介质、极板间距与开关操作后的状态变化。'],
        ['19','电磁学','实验・综合专题 I','电场与电势图；电容器实验；电荷—电压关系；开关操作前后的状态判断；图表与条件变化。'],
        ['20','电磁学','直流电路','电流与电阻；欧姆定律；串并联；基尔霍夫定律；电功率；电源内部电阻；半导体与二极管。'],
        ['21','电磁学','电流与磁场','直线电流、圆形电流与螺线管的磁场；电流在磁场中受到的力；洛伦兹力；带电粒子的运动。'],
        ['22','电磁学','实验・综合专题 II','电流与电压的测量；电表与电路实验；磁场及安培力、洛伦兹力相关图表与综合题。'],
        ['23','电磁学','电磁感应','磁通量；法拉第电磁感应定律与楞次定律；磁场中运动的导体棒；自感与互感。'],
        ['24','电磁学','实验・综合专题 III','电磁感应与电路的综合；开关与时间变化；实验数据、图表及多阶段条件判断。']
      ];

      const drillRows = [
        ['01','力学','抛体・刚体・动量专题','平抛与斜抛；力矩与刚体平衡；冲量、动量守恒与碰撞。'],
        ['02','力学','圆周・简谐・万有引力专题','圆周运动；惯性力；简谐运动；万有引力；卫星与天体运动。'],
        ['03','波动','正弦波・声音・光专题','波形与驻波；弦与气柱；多普勒效应；透镜；光的干涉与衍射。'],
        ['04','热学','热学综合专题','理想气体的状态变化；分子运动论；热力学第一定律；p–V 图与热机。'],
        ['05','电磁学','静电・电容・直流电路专题','点电荷与电场、电势；电容器；开关操作；基尔霍夫定律与直流电路。'],
        ['06','电磁学','磁场・电磁感应专题','电流与磁场；洛伦兹力；带电粒子；电磁感应；导体棒与线圈。'],
        ['07','原子','原子物理综合演习','光子与光电效应；X 射线；氢原子；原子核与放射线；质量亏损与核能。'],
        ['08','真题演练','整卷演练 I','1 份共通考试物理真题：限时作答 → 逐题精讲 → 错因归类；重点确认答题顺序与时间分配。'],
        ['09','真题演练','整卷演练 II','1 份共通考试物理真题：限时作答 → 逐题精讲 → 错因归类；重点复盘实验与资料题。'],
        ['10','真题演练','整卷演练 III','1 份共通考试物理真题：限时作答 → 逐题精讲 → 错因归类；重点复盘图表与条件变化题。'],
        ['11','真题演练','整卷演练 IV','1 份共通考试物理真题：限时作答 → 逐题精讲 → 错因归类；重点复盘跨章节综合与高频误判。'],
        ['12','真题演练','整卷演练 V','1 份共通考试物理真题：限时作答 → 逐题精讲 → 错因归类；完成最终弱点整理与考前调整。']
      ];

      const domainKey = domain => {
        if (domain === '力学') return 'mechanics';
        if (domain === '波动') return 'waves';
        if (domain === '热学') return 'thermal';
        if (domain === '电磁学') return 'em';
        if (domain === '原子') return 'atomic';
        return 'exam';
      };
      const renderRows = rows => rows.map(([session, domain, title, copy]) => `
        <div class="course-schedule-row" data-domain="${domainKey(domain)}" role="listitem">
          <span class="course-session">第${session}回</span>
          <span class="course-domain">${domain}</span>
          <strong>${title}</strong>
          <p>${copy}</p>
        </div>`).join('');
      const schedule = rows => `
        <div class="course-schedule" role="list">
          <div class="course-schedule-head" aria-hidden="true"><span>回次</span><span>模块</span><span>主题</span><span>学习内容</span></div>
          ${renderRows(rows)}
        </div>`;

      coursePreview.innerHTML = `
        <div class="year-courses-head">
          <div class="year-courses-title"><small>2026 WINTER · PHYSICS</small><h3>2026 冬学期｜开设课程</h3></div>
          <div class="year-courses-status" aria-label="2026冬学期课程信息">
            <span class="year-term"><span>冲刺课</span><b>48h</b></span>
            <span class="year-term"><span>刷题班</span><b>24h</b></span>
            <span class="year-term year-term--next"><span>专项课</span><b>20h</b></span>
          </div>
        </div>
        <p class="year-courses-intro">冬学期以共通考试物理为主线：48h 冲刺课程负责系统复习、实验图表与综合专题，24h 刷题班负责高频题型与整卷真题训练；另设 20h 东京科学大学理工学系专项课程。</p>

        <div class="year-course-grid">
          <article class="year-course-card year-course-card--wide year-course-card--primary">
            <div class="year-course-card-head">
              <div><small>2026 冬学期｜共通考试</small><h4>共通考试物理冲刺课程</h4></div>
              <div class="year-course-hours"><strong>48</strong><span>h</span><small>24 回 × 2h</small></div>
            </div>
            <p class="year-course-copy">按照力学 → 波动 → 热学 → 电磁学的学习顺序完成系统复习。每个模块安排实验・综合专题，把知识点、图表、实验资料与跨章节设问放回同一套解题框架中。</p>
            <div class="year-course-flow" aria-label="课程顺序"><span>力学 · 14h</span><span>波动 · 10h</span><span>热学 · 8h</span><span>电磁学 · 16h</span></div>
            <ul class="year-course-track" aria-label="课程训练重点"><li><b>基本规律</b></li><li><b>典型模型</b></li><li><b>实验・图表</b></li><li><b>综合设问</b></li></ul>
            <details class="year-course-details">
              <summary>查看完整 24 回课表</summary>
              <div class="year-course-syllabus">${schedule(systemRows)}</div>
              <p class="year-course-note"><strong>录播补充：</strong>交流电与原子物理不安排同步班课，统一通过录播学习；两部分均分别提供讲义课与习题课录播。</p>
            </details>
          </article>

          <article class="year-course-card year-course-card--wide">
            <div class="year-course-card-head">
              <div><small>2026 冬学期｜共通考试</small><h4>共通考试物理刷题班</h4></div>
              <div class="year-course-hours"><strong>24</strong><span>h</span><small>12 回 × 2h</small></div>
            </div>
            <p class="year-course-copy">前 7 回按模块集中处理高频题型，第 8–12 回进行 5 份真题整卷演练。每份真题均按“限时作答 → 逐题精讲 → 错因归类 → 补弱”完成复盘。</p>
            <div class="year-course-flow" aria-label="课程顺序"><span>专题演习 · 14h</span><span>真题 I · 2h</span><span>真题 II–III · 4h</span><span>真题 IV–V · 4h</span></div>
            <ul class="year-course-track" aria-label="刷题班训练重点"><li><b>高频题型</b></li><li><b>实验资料题</b></li><li><b>5 份真题</b></li><li><b>时间分配</b></li></ul>
            <details class="year-course-details">
              <summary>查看完整 12 回课表</summary>
              <div class="year-course-syllabus">${schedule(drillRows)}</div>
            </details>
          </article>

          <article class="year-course-card year-course-card--wide year-course-card--target">
            <div class="year-course-card-head">
              <div><small>2026 年度｜理工学系专项</small><h4>东京科学大学 理工学系</h4></div>
              <div class="year-course-hours"><strong>20</strong><span>h</span><small>10 回 × 2h</small></div>
            </div>
            <p class="year-course-copy">按照校内考的题型与设问结构重新组织训练，集中补强 EJU / 共通考试较少覆盖的陌生模型、原理推导、近似处理与长文建模。</p>
            <div class="year-course-exclusive"><span>ORIGINAL</span><strong>原创模拟题</strong><small>基于历年题型与设问结构自主命制</small></div>
            <ul class="year-course-track" aria-label="东京科学大学理工学系课程训练重点"><li><b>题型归类</b></li><li><b>陌生模型</b></li><li><b>原理推导</b></li><li><b>数学工具</b></li><li><b>原创模拟</b></li></ul>
            <details class="year-course-details">
              <summary>查看专项训练结构</summary>
              <div class="year-course-syllabus year-course-syllabus--compact">
                <div class="year-course-unit"><b>题型归类</b><span>从历年题中提炼反复出现的设问结构、信息组织方式与解题入口，按“先判断什么、如何展开”重新组织训练。</span></div>
                <div class="year-course-unit"><b>陌生模型</b><span>处理 EJU / 共通考试较少出现的复合模型与新颖设定，从研究对象、约束和基本定律出发现场建模。</span></div>
                <div class="year-course-unit"><b>原理推导</b><span>从定义、基本定律和已知关系连续推出中间结论，适应题目不给现成公式的长链条设问。</span></div>
                <div class="year-course-unit"><b>数学工具</b><span>微小量、一次近似、极限、微积分、数列与三角变换放入对应物理题型中使用。</span></div>
                <div class="year-course-unit"><b>原创模拟</b><span>以历年题型、设问链与能力要求为约束自主命制，用于检验面对未见综合模型时的判断、推导与记述。</span></div>
              </div>
            </details>
          </article>
        </div>`;
    };
    applyWinterCourseSchedule();

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
