(() => {
  const setText = (selector, text) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
  };

  /* 全页文案：保留现有模块，只调整为更自然、明确的中文。 */
  setText('.hero-intro', '共通考试与 EJU 阶段，重点打牢基本规律、实验图表和典型题型；针对理工科校内考，再补充近似处理、微积分、数列与三角变换等方法。遇到陌生设问时，也要能够准确提取条件，完成推导并规范作答。');
  setText('.record-proof-strip .proof-quote strong', '每年根据目标院校真题，调整课程重点、练习顺序和书面作答训练。');

  const heroHighlights = document.querySelectorAll('.hero-highlight');
  const heroHighlightCopy = [
    ['共通考试 / EJU', '基本规律・实验图表・典型题型'],
    ['理工科校内考', '长题分析・近似处理・推导・书面作答'],
    ['目标院校专项', '历年真题・理科口试・报考规划']
  ];
  heroHighlights.forEach((item, i) => {
    if (!heroHighlightCopy[i]) return;
    const small = item.querySelector('small');
    const strong = item.querySelector('strong');
    if (small) small.textContent = heroHighlightCopy[i][0];
    if (strong) strong.textContent = heroHighlightCopy[i][1];
  });

  setText('.editorial-head h2', '从现象理解公式，把同类题型练透。');
  setText('.editorial-head > div > p:last-child', '基础阶段先结合实际现象、图像和实验理解公式，再通过典型题掌握常见用法；进入校内考后，会把同一知识点的常见题型和变式集中安排，比较条件变化带来的解法差异，并根据目标院校真题补充必要的数学方法。');
  setText('.editorial-side', '理工科校内考中的长题和综合题，还需要专门训练条件提取、近似处理、推导步骤和书面表达，让会做的题真正落实到答卷上。');

  const principles = document.querySelectorAll('.principle-grid-specific .principle');
  const principleCopy = [
    ['结合现象讲清公式', '通过现象、图像和实验说明公式的含义与适用条件，再进入典型题训练。'],
    ['同类题型集中归纳', '把同一知识点的常见题型与变式放在一起练，在对比中掌握稳定的处理方法。'],
    ['校内考按目标院校专项训练', '结合历年真题训练长文读题、近似处理、数学方法、推导过程和书面作答。']
  ];
  principles.forEach((item, i) => {
    if (!principleCopy[i]) return;
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');
    if (h3) h3.textContent = principleCopy[i][0];
    if (p) p.textContent = principleCopy[i][1];
  });

  const tabs = document.querySelectorAll('.course-tab');
  if (tabs[0]) {
    const strong = tabs[0].querySelector('strong');
    if (strong) strong.textContent = '夯实基础';
  }
  if (tabs[1]) {
    const strong = tabs[1].querySelector('strong');
    if (strong) strong.textContent = '推导与书面作答';
  }

  const commonPanel = document.querySelector('[data-course-panel="common"]');
  if (commonPanel) {
    const h3 = commonPanel.querySelector('h3');
    const p = commonPanel.querySelector(':scope > p');
    if (h3) h3.textContent = '打牢基础，强化实验与图表题。';
    if (p) p.textContent = '共通考试与 EJU 课程以稳定得分为目标，系统梳理基本定律和典型题型，并集中训练实验、图表、单位、数量级以及条件变化题。';
  }

  const schoolPanel = document.querySelector('[data-course-panel="school"]');
  if (schoolPanel) {
    const h3 = schoolPanel.querySelector('h3');
    const p = schoolPanel.querySelector(':scope > p');
    if (h3) h3.textContent = '按目标院校真题训练推导与书面作答。';
    if (p) p.textContent = '在高中物理范围内，根据目标院校历年真题补充近似处理、微积分、数列、三角变换等常用方法，并训练长文读题、推导过程和规范书写。';
  }

  setText('.material-feature > p', '按照校内考中经常出现的数学方法、近似处理和综合题型编排专题，配合典型例题与变式练习，方便课堂讲解后继续巩固。');
  const materialIndex = document.querySelectorAll('.material-index span');
  if (materialIndex[2]) materialIndex[2].textContent = '校内考常用数学方法';

  /* 报考规划：明确由老师根据学生情况提供方案。 */
  setText('.planning-head h2', '根据学生情况与院校选拔方式，定制专属升学方案。');
  setText('.planning-head > p', '结合学生现有成绩、目标专业、可用考试成绩和备考时间，逐校分析材料审查、校内考、面试或口试，以及 EJU、共通考试和英语成绩的计分方式，确定更合适的报考组合与备考重点。');
  setText('.planning-strategy h3', '院校选拔方式与报考方案');
  setText('.planning-punch', '在符合目标专业与发展方向的前提下，优先选择更能发挥学生优势的院校和报考方式。');
  setText('.planning-interview h3', '志望理由、面试与口试一体准备');
  setText('.planning-interview > p', '从目标学部、学科的课程设置、研究室和教授信息入手，结合学生经历整理志望理由，再据此准备面试与专业问答，使书面材料与现场回答保持一致。');

  const selectionItems = document.querySelectorAll('.planning-strategy .selection-list li');
  const selectionCopy = [
    ['材料审查', '高中成绩、语言成绩、志望理由等，哪些只是报名条件，哪些会计入最终评价'],
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
    '梳理个人经历、兴趣与志望方向的具体联系',
    '精简文稿，删除套话、重复和无效信息',
    '围绕核心回答准备后续追问与专业口试'
  ];
  interviewItems.forEach((item, i) => {
    if (interviewCopy[i]) item.textContent = interviewCopy[i];
  });

  const graduateIntro = document.querySelector('.graduate-copy > p:not(.kicker):not(.graduate-subjects)');
  if (graduateIntro) {
    graduateIntro.textContent = '本科毕业于京都大学工学部电气电子工程，现就读东京大学大学院工学系研究科电气工程与信息系统专攻，从事信号处理相关研究。可结合本人实际备考、考试和研究经历，提供电气电子、信息工程及相关方向的大学院报考咨询。';
  }
  setText('.graduate-score > span', '当年最低合格分 410，高出 213 分');
  setText('.graduate-score > small', '本人实际参加该年度考试');

  /* 教学经历：旅人、行知采用条目式；京都大学去掉日期。 */
  const experienceHead = document.querySelector('.experience-head > p');
  if (experienceHead) {
    experienceHead.textContent = '曾负责 EJU 物理大班、数学与物理一对一、热门大学校内考、志望理由、面试及理科口试等课程与指导。现于旅人教育负责本科入试物理，并参与课程设计与教材开发。';
  }

  const experienceList = document.querySelector('.experience-list');
  if (experienceList) {
    const items = [...experienceList.querySelectorAll('.experience-item')];
    const current = items.find(item => item.classList.contains('experience-item--current') || item.querySelector('strong')?.textContent.includes('旅人教育'));
    const gyouchi = items.find(item => item.querySelector('strong')?.textContent.includes('行知学园'));
    const kyoto = items.find(item => item.querySelector('strong')?.textContent.includes('時間雇用教職員'));

    const setBullets = (item, bullets) => {
      if (!item) return;
      const old = item.querySelector('p, ul.experience-bullets');
      const ul = document.createElement('ul');
      ul.className = 'experience-bullets';
      bullets.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);
      });
      if (old) old.replaceWith(ul); else item.appendChild(ul);
    };

    setBullets(current, [
      '共通考试 / EJU 物理',
      '理工科校内考',
      '理科口试与专业问答',
      '本科报考规划',
      '课程设计与教材开发'
    ]);

    setBullets(gyouchi, [
      'EJU 物理大班（基础班、冲刺班、刷题班）',
      '数学、物理一对一',
      '热门大学校内考班课与一对一',
      '志望理由、面试与口头试问指导'
    ]);

    if (kyoto) {
      kyoto.classList.remove('experience-item--kyoto');
      const roles = kyoto.querySelector('.experience-role-lines');
      if (roles) roles.innerHTML = '<span>電気電子回路 OA</span><span>留学生 Tutor</span>';
    }
    if (current) current.classList.add('experience-item--primary');
    if (current && gyouchi && current.nextElementSibling !== gyouchi) experienceList.insertBefore(gyouchi, kyoto || current.nextSibling);
  }

  /* 学生课程反馈：改用稳定的旧版单图作为卡片背景，保留横向滑动布局。 */
  const feedbackImg = document.querySelector('[data-media="feedback"]');
  if (feedbackImg) {
    const shot = feedbackImg.closest('.student-shot');
    if (shot) shot.classList.add('feedback-shot');
    feedbackImg.alt = '学生课程反馈聊天记录';
  }
})();