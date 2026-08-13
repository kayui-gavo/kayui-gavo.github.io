(() => {
  const setText = (selector, text) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
  };

  /* Hero / results */
  setText('.hero-intro', '共通考试与 EJU 阶段，重点打牢基本规律、实验图表和典型题型；进入理工科校内考后，再根据目标院校真题补充近似处理、微积分、数列与三角变换等方法，训练从题干中提取条件、组织推导并规范作答。');
  setText('.record-proof-strip .proof-quote strong', '每年根据目标院校真题，调整课程重点、练习顺序和书面作答训练。');

  /* Teaching copy: describe the actual class style, not abstract slogans. */
  setText('.editorial-head h2', '从现象理解公式，把同类题型练透。');
  setText('.editorial-head > div > p:last-child', '基础阶段会结合现象、图像和实验说明公式的含义与使用条件，再通过典型题掌握常见用法。同一知识点的典型题和变式会集中安排，让学生在对比中看清条件变化会怎样影响解法；进入校内考后，再根据目标院校真题补充必要的数学方法。');
  setText('.editorial-side', '理工科校内考的长题干和综合题，还需要专门训练读题、近似处理、推导步骤和书面表达，把会做的题完整、清楚地写在答卷上。');

  const principles = document.querySelectorAll('.principle-grid-specific .principle');
  const principleCopy = [
    ['公式结合现象与图像讲解', '先结合现象、图像和实验说明公式的含义与使用条件，再进入例题和练习。'],
    ['同一知识点集中练变式', '把常见题型和变式放在一起练，比较条件变化对解法的影响，形成稳定的解题思路。'],
    ['结合目标院校真题训练', '根据历年真题训练读题、近似处理、推导过程和书面作答，并补充必要的数学方法。']
  ];
  principles.forEach((item, i) => {
    if (!principleCopy[i]) return;
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');
    if (h3) h3.textContent = principleCopy[i][0];
    if (p) p.textContent = principleCopy[i][1];
  });

  const tabs = document.querySelectorAll('.course-tab');
  if (tabs[0]?.querySelector('strong')) tabs[0].querySelector('strong').textContent = '基础与实验题训练';
  if (tabs[1]?.querySelector('strong')) tabs[1].querySelector('strong').textContent = '推导与书面作答';

  const commonPanel = document.querySelector('[data-course-panel="common"]');
  if (commonPanel) {
    const h3 = commonPanel.querySelector('h3');
    const p = commonPanel.querySelector(':scope > p');
    if (h3) h3.textContent = '打牢基础，重点训练实验与图表题。';
    if (p) p.textContent = '共通考试与 EJU 课程以稳定得分为目标，系统梳理基本定律和典型题型，并重点训练实验与图表题、单位与数量级，以及常见变式和综合题。';
    const items = commonPanel.querySelectorAll('.course-list li');
    const copy = ['基本定律与典型题型','实验与图表题','单位与数量级','常见变式与综合题'];
    items.forEach((item, i) => { if (copy[i]) item.textContent = copy[i]; });
  }

  const schoolPanel = document.querySelector('[data-course-panel="school"]');
  if (schoolPanel) {
    const h3 = schoolPanel.querySelector('h3');
    const p = schoolPanel.querySelector(':scope > p');
    if (h3) h3.textContent = '结合目标院校真题，训练推导与书面作答。';
    if (p) p.textContent = '以高中物理为起点，根据目标院校历年真题补充近似处理、微积分、数列、三角变换等常用方法，并训练长题干的读题、推导过程和规范书写。';
  }
  setText('.material-feature > p', '按校内考常见的数学方法、近似方法和综合题型编排专题，配合典型例题与变式练习，方便课堂讲解后继续巩固。');
  const materialIndex = document.querySelectorAll('.material-index span');
  if (materialIndex[2]) materialIndex[2].textContent = '校内考常用数学方法';

  /* Admissions planning */
  setText('.planning-head h2', '结合学生情况与院校选拔方式，制定针对性的升学方案。');
  setText('.planning-head > p', '综合学生当前成绩、目标专业、可用考试成绩和备考时间，逐校比较材料审查、校内考、面试或口试，以及 EJU、共通考试和英语成绩的计分方式，确定更合适的报考组合与备考重点。');
  setText('.planning-strategy h3', '院校选拔方式与报考方案');
  setText('.planning-punch', '结合目标专业和学生优势，确定更合适的院校、选拔方式与备考顺序。');
  setText('.planning-interview h3', '志望理由、面试与口试准备');
  setText('.planning-interview > p', '从目标学部、学科的课程设置、研究室和教授信息入手，结合学生经历整理志望理由，再据此准备面试与专业问答，使书面材料与现场回答保持一致。');

  const selectionItems = document.querySelectorAll('.planning-strategy .selection-list li');
  const selectionCopy = [
    ['材料审查', '高中成绩、语言成绩、志望理由等，哪些属于报名要求，哪些会计入最终评价'],
    ['校内考', '考试科目、分值占比、题型与难度，以及能否成为主要得分来源'],
    ['面试 / 口试', '面试与专业问答考到什么程度，在最终评价中占多大比重'],
    ['EJU / 共通 / 英语', '最低要求、成绩换算方式、可用科目，以及是否计入最终成绩']
  ];
  selectionItems.forEach((item, i) => {
    if (!selectionCopy[i]) return;
    const strong = item.querySelector('strong');
    const span = item.querySelector('span');
    if (strong) strong.textContent = selectionCopy[i][0];
    if (span) span.textContent = selectionCopy[i][1];
  });

  const interviewItems = document.querySelectorAll('.planning-interview .clean-list li');
  const interviewCopy = [
    '调查目标学部、学科、课程、研究室与教授',
    '梳理个人经历、兴趣与专业方向的具体联系',
    '精简文稿，删除套话、重复和无效信息',
    '围绕核心回答准备后续追问与专业口试'
  ];
  interviewItems.forEach((item, i) => { if (interviewCopy[i]) item.textContent = interviewCopy[i]; });

  /* Graduate consultation */
  setText('.graduate-copy h2', '电气电子・信息通信・AI');
  const graduateIntro = document.querySelector('.graduate-copy > p:not(.kicker):not(.graduate-subjects)');
  if (graduateIntro) graduateIntro.textContent = '本科阶段完整修读京都大学电气电子工学科的专业课程，现于东京大学大学院从事信号处理相关研究。大学院方向咨询不局限于本人当前课题，可围绕电气、电子、通信、控制、信号处理、信息工程、AI / 机器学习等电气电子工学相关方向，结合学生的本科背景、兴趣、目标研究室与入试科目，协助梳理报考方向和研究室选择。';
  const graduateSubjects = document.querySelectorAll('.graduate-subjects');
  if (graduateSubjects[1]) graduateSubjects[1].innerHTML = '<strong>研究方向咨询</strong>电气 · 电子 · 通信 · 控制 · 信号处理 · 信息工程 · AI / 机器学习等';
  const graduateLink = document.querySelector('.graduate-link');
  if (graduateLink) graduateLink.textContent = '大学院｜电气电子・信息通信方向咨询｜小红书 でんでん🐌⚡ ↗';
  setText('.graduate-score > span', '当年最低合格分 410，高出 213 分');
  setText('.graduate-score > small', '本人实际参加该年度考试');

  /* Experience: same structure for all institutions. */
  const experienceHead = document.querySelector('.experience-head > p');
  if (experienceHead) experienceHead.textContent = '现于旅人教育担任董事、营业教育1部部长，负责本科升学课程、报考指导、课程与教材开发，并参与官网和教育产品开发。此前在行知学园负责 EJU 物理大班、一对一及热门大学校内考等课程，也曾在京都大学工学部承担教学支持工作。';

  const experienceList = document.querySelector('.experience-list');
  if (experienceList) {
    const items = [...experienceList.querySelectorAll('.experience-item')];
    const tabito = items.find(item => item.querySelector('strong')?.textContent.includes('旅人教育'));
    const gyouchi = items.find(item => item.querySelector('strong')?.textContent.includes('行知学园'));
    const kyoto = items.find(item => item.querySelector('strong')?.textContent.includes('京都大学') || item.textContent.includes('時間雇用教職員'));

    const makeTitleStack = (item, institution, position = '') => {
      if (!item) return;
      let stack = item.querySelector('.experience-title-stack');
      let title = item.querySelector(':scope > strong') || stack?.querySelector('strong');
      if (!stack) {
        stack = document.createElement('div');
        stack.className = 'experience-title-stack';
        if (title) title.replaceWith(stack);
        if (title) stack.appendChild(title);
      }
      if (!title) {
        title = document.createElement('strong');
        stack.prepend(title);
      }
      title.textContent = institution;
      let role = stack.querySelector('.experience-position');
      if (position) {
        if (!role) { role = document.createElement('p'); role.className = 'experience-position'; stack.appendChild(role); }
        role.textContent = position;
      } else if (role) role.remove();
    };

    const setBullets = (item, bullets) => {
      if (!item) return;
      let holder = item.querySelector('.experience-copy-stack');
      if (!holder) {
        holder = document.createElement('div');
        holder.className = 'experience-copy-stack';
        const old = item.querySelector(':scope > p, :scope > ul.experience-bullets, :scope > .experience-role-lines');
        if (old) old.replaceWith(holder); else item.appendChild(holder);
      }
      holder.innerHTML = '';
      const ul = document.createElement('ul');
      ul.className = 'experience-bullets';
      bullets.forEach(text => { const li = document.createElement('li'); li.textContent = text; ul.appendChild(li); });
      holder.appendChild(ul);
    };

    if (tabito) {
      const meta = tabito.querySelector('small');
      if (meta) meta.textContent = '现任';
      makeTitleStack(tabito, '旅人教育', '董事｜营业教育1部部长');
      setBullets(tabito, ['共通考试 / EJU 物理','理工科校内考与理科口试','本科报考规划','课程设计与教材开发','官网与网页开发','教育产品开发']);
      tabito.classList.add('experience-item--primary');
    }

    if (gyouchi) {
      const meta = gyouchi.querySelector('small');
      if (meta) meta.textContent = '约 4 年';
      makeTitleStack(gyouchi, '行知学园关西校');
      setBullets(gyouchi, ['EJU 物理大班（基础班、冲刺班、刷题班）','数学、物理一对一','热门大学校内考班课与一对一','志望理由、面试与口头试问指导']);
    }

    if (kyoto) {
      const meta = kyoto.querySelector('small');
      if (meta) meta.textContent = '2024–2026';
      makeTitleStack(kyoto, '京都大学工学部', '時間雇用教職員');
      setBullets(kyoto, ['電気電子回路 OA','留学生 Tutor']);
      kyoto.classList.remove('experience-item--kyoto');
      kyoto.classList.add('experience-item--university');
    }

    if (tabito && gyouchi && tabito.nextElementSibling !== gyouchi) experienceList.insertBefore(gyouchi, kyoto || tabito.nextSibling);
  }

  /* Student feedback: explicit source + fallbacks; keep horizontal gallery. */
  const feedback = document.querySelector('[data-media="feedback"]');
  if (feedback) {
    const shot = feedback.closest('.student-shot');
    if (shot) shot.classList.add('feedback-shot');
    feedback.alt = '学生课程反馈聊天记录';
    feedback.loading = 'eager';
    const sources = ['/assets/student-feedback-wechat-v5.webp?v=20260814e','/assets/student-feedback-wechat.webp?v=20260814e','/assets/student-record-wall-v4.webp?v=20260814e'];
    let i = 0;
    feedback.onerror = () => { i += 1; if (i < sources.length) feedback.src = sources[i]; };
    feedback.src = sources[0];
  }
})();
