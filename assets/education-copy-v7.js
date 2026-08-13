(() => {
  const setText = (selector, text) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
  };

  /* Final copy pass: natural Chinese, concrete classroom/service descriptions. */
  setText('.hero-intro', '共通考试与 EJU 阶段，重点打牢基本规律、实验图表和典型题型；针对理工科校内考，再补充近似处理、微积分、数列与三角变换等方法。遇到陌生设问时，也要能够准确提取条件，完成推导并规范作答。');
  setText('.record-proof-strip .proof-quote strong', '每年根据目标院校真题，调整课程重点、练习顺序和书面作答训练。');

  const heroHighlights = document.querySelectorAll('.hero-highlight');
  const heroHighlightCopy = [
    ['共通考试 / EJU', '基本规律・实验图表・典型题型'],
    ['理工科校内考', '题干分析・近似处理・推导・书面作答'],
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
  setText('.editorial-side', '理工科校内考中的长题干和综合题，还需要专门训练信息提取、近似处理、推导步骤和书面表达，让会做的题真正落实到答卷上。');

  const principles = document.querySelectorAll('.principle-grid-specific .principle');
  const principleCopy = [
    ['结合现象讲清公式', '通过现象、图像和实验说明公式的含义与适用条件，再进入典型题训练。'],
    ['同类题型集中归纳', '把同一知识点的常见题型与变式放在一起练，在对比中掌握稳定的处理方法。'],
    ['按目标院校专项训练', '结合历年真题训练题干信息提取、近似处理、数学方法、推导过程和书面作答。']
  ];
  principles.forEach((item, i) => {
    if (!principleCopy[i]) return;
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');
    if (h3) h3.textContent = principleCopy[i][0];
    if (p) p.textContent = principleCopy[i][1];
  });

  const tabs = document.querySelectorAll('.course-tab');
  if (tabs[0]?.querySelector('strong')) tabs[0].querySelector('strong').textContent = '夯实基础';
  if (tabs[1]?.querySelector('strong')) tabs[1].querySelector('strong').textContent = '推导与书面作答';

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
    if (p) p.textContent = '在高中物理范围内，根据目标院校历年真题补充近似处理、微积分、数列、三角变换等常用方法，并训练题干信息提取、推导过程和规范书写。';
  }

  setText('.material-feature > p', '按照校内考中经常出现的数学方法、近似处理和综合题型编排专题，配合典型例题与变式练习，方便课堂讲解后继续巩固。');
  const materialIndex = document.querySelectorAll('.material-index span');
  if (materialIndex[2]) materialIndex[2].textContent = '校内考常用数学方法';

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
    '梳理个人经历、兴趣与专业方向的具体联系',
    '精简文稿，删除套话、重复和无效信息',
    '围绕核心回答准备后续追问与专业口试'
  ];
  interviewItems.forEach((item, i) => {
    if (interviewCopy[i]) item.textContent = interviewCopy[i];
  });

  const graduateIntro = document.querySelector('.graduate-copy > p:not(.kicker):not(.graduate-subjects)');
  if (graduateIntro) graduateIntro.textContent = '本科毕业于京都大学工学部电气电子工程，现就读东京大学大学院工学系研究科电气工程与信息系统专攻，从事信号处理相关研究。可结合本人实际备考、考试和研究经历，提供电气电子、信息工程及相关方向的大学院报考咨询。';
  setText('.graduate-score > span', '当年最低合格分 410，高出 213 分');
  setText('.graduate-score > small', '本人实际参加该年度考试');

  /* Experience: TABITO responsibilities, Gyouchi teaching, Kyoto University support. */
  const experienceHead = document.querySelector('.experience-head > p');
  if (experienceHead) experienceHead.textContent = '现于旅人教育担任董事、营业教育1部部长，负责本科升学课程与报考指导，并参与课程、教材、网页及教育产品开发。此前曾在行知学园负责 EJU 物理大班、一对一及热门大学校内考等课程。';

  const experienceList = document.querySelector('.experience-list');
  if (experienceList) {
    const items = [...experienceList.querySelectorAll('.experience-item')];
    const tabito = items.find(item => item.querySelector('strong')?.textContent.includes('旅人教育'));
    const gyouchi = items.find(item => item.querySelector('strong')?.textContent.includes('行知学园'));
    const kyoto = items.find(item => item.querySelector('strong')?.textContent.includes('時間雇用教職員') || item.querySelector('strong')?.textContent.includes('京都大学'));

    if (tabito) {
      const old = tabito.querySelector('p, ul.experience-bullets, .experience-copy-stack');
      const wrap = document.createElement('div');
      wrap.className = 'experience-copy-stack';
      const role = document.createElement('p');
      role.className = 'experience-position';
      role.textContent = '董事・营业教育1部部长';
      const ul = document.createElement('ul');
      ul.className = 'experience-bullets';
      [
        '共通考试 / EJU 物理',
        '理工科校内考、理科口试',
        '本科报考规划',
        '课程设计与教材开发',
        '官网维护与网页开发',
        '教育产品开发'
      ].forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);
      });
      wrap.append(role, ul);
      if (old) old.replaceWith(wrap); else tabito.appendChild(wrap);
      tabito.classList.add('experience-item--primary');
    }

    if (gyouchi) {
      const old = gyouchi.querySelector('p, ul.experience-bullets');
      const ul = document.createElement('ul');
      ul.className = 'experience-bullets';
      [
        'EJU 物理大班（基础班、冲刺班、刷题班）',
        '数学、物理一对一',
        '热门大学校内考班课与一对一',
        '志望理由、面试与口头试问指导'
      ].forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);
      });
      if (old) old.replaceWith(ul); else gyouchi.appendChild(ul);
    }

    if (kyoto) {
      kyoto.classList.remove('experience-item--kyoto');
      kyoto.classList.add('experience-item--university');
      const meta = kyoto.querySelector('small');
      const title = kyoto.querySelector('strong');
      if (meta) meta.textContent = '2024–2026';
      if (title) title.textContent = '京都大学工学部';
      let roles = kyoto.querySelector('.experience-role-lines');
      if (!roles) {
        roles = document.createElement('p');
        roles.className = 'experience-role-lines';
        kyoto.appendChild(roles);
      }
      roles.innerHTML = '<span class="experience-role-title">時間雇用教職員</span><span>電気電子回路 OA</span><span>留学生 Tutor</span>';
    }

    if (tabito && gyouchi && tabito.nextElementSibling !== gyouchi) experienceList.insertBefore(gyouchi, kyoto || tabito.nextSibling);
  }

  /* Feedback card: keep the horizontal gallery, but do not rely on image lazy-loading. */
  const feedback = document.querySelector('[data-media="feedback"]');
  if (feedback) {
    const shot = feedback.closest('.student-shot');
    if (shot) shot.classList.add('feedback-shot');
    feedback.removeAttribute('src');
    feedback.removeAttribute('loading');
    feedback.alt = '学生课程反馈聊天记录';
  }

  /* Detail styling injected last, so legacy CSS cannot reduce contrast or squeeze labels. */
  let style = document.getElementById('education-v7-detail-style');
  if (!style) {
    style = document.createElement('style');
    style.id = 'education-v7-detail-style';
    document.head.appendChild(style);
  }
  style.textContent = `
    .course-tabs{background:#12161b!important;color:#fff!important}
    .course-tab{background:#12161b!important;color:#fff!important;border-color:rgba(255,255,255,.24)!important}
    .course-tab small{color:#d9dfe5!important;font-weight:750!important;opacity:1!important}
    .course-tab strong{color:#fff!important;font-weight:750!important;text-shadow:0 1px 0 rgba(0,0,0,.18)!important}
    .course-tab span{color:#f0dcae!important;opacity:1!important}
    .course-tab[aria-selected="true"]{background:#2f7599!important}
    .course-tab[aria-selected="true"] small{color:#f4f8fb!important}
    .course-tab[aria-selected="true"] strong{color:#fff!important}

    .experience-copy-stack{grid-area:copy!important;display:grid!important;gap:7px!important;min-width:0!important}
    .experience-position{margin:0!important;font-size:13.2px!important;line-height:1.5!important;font-weight:750!important;color:#3e3336!important}
    .experience-copy-stack .experience-bullets{grid-area:auto!important}
    .experience-item--university strong{font-size:16.5px!important;line-height:1.35!important;color:#171a1f!important}
    .experience-item--university small{font-size:11.5px!important;color:#7f746b!important}
    .experience-item--university .experience-role-lines{grid-area:copy!important;display:grid!important;gap:4px!important;margin-top:2px!important}
    .experience-item--university .experience-role-lines span{display:block!important;white-space:nowrap!important;font-size:12.7px!important;line-height:1.55!important;color:#625d57!important}
    .experience-item--university .experience-role-lines .experience-role-title{font-size:13.2px!important;font-weight:750!important;color:#34383d!important}

    .graduate-score strong{display:flex!important;align-items:baseline!important;flex-wrap:nowrap!important;gap:8px!important;white-space:nowrap!important;font-size:clamp(60px,5vw,74px)!important;line-height:.96!important;letter-spacing:-.065em!important}
    .graduate-score strong small{display:inline-block!important;flex:0 0 auto!important;margin:0!important;font-size:22px!important;line-height:1!important;font-weight:700!important;letter-spacing:-.02em!important;color:#d7e5ee!important;opacity:1!important;white-space:nowrap!important}

    .student-media-grid .student-shot.feedback-shot img{display:block!important;width:100%!important;height:248px!important;object-fit:contain!important;background:#ececec url('/assets/student-feedback-wechat.webp?v=20260814b') center/contain no-repeat!important;visibility:visible!important;opacity:1!important}
    .student-media-grid .student-shot.feedback-shot::before{display:none!important;content:none!important}

    @media(max-width:767px){
      .course-tab small{font-size:11px!important}
      .course-tab strong{font-size:14px!important;line-height:1.35!important}
      .experience-position{font-size:12.5px!important}
      .experience-item--university .experience-role-lines span{white-space:normal!important;font-size:12.1px!important}
      .experience-item--university .experience-role-lines .experience-role-title{font-size:12.6px!important}
      .graduate-score strong{font-size:56px!important;gap:6px!important}
      .graduate-score strong small{font-size:19px!important}
      .student-media-grid .student-shot.feedback-shot img{height:230px!important}
    }
  `;
})();