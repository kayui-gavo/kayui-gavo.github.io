(() => {
  const setText = (selector, text) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
  };

  /* Hero / teaching copy: concrete classroom style, not abstract slogans. */
  setText('.hero-intro', '共通考试与 EJU 阶段，重点夯实基本规律、实验图表和典型模型；针对理工科校内考，再进一步训练近似、微积分、数列与三角变换等方法。面对陌生设问时，也要能够准确提取条件、组织推导并规范作答。');
  setText('.record-proof-strip .proof-quote strong', '每年结合目标校真题，更新课程重点、题目编排与记述训练。');

  setText('.editorial-head h2', '从物理图景出发，系统归纳题型与解法。');
  setText('.editorial-head > div > p:last-child', '基础阶段重视现象理解、公式条件和典型模型；进入校内考后，再围绕目标校真题，把不同章节中反复出现的结构集中归纳，并补充必要的数学工具。课程中会将同一知识点的典型变式连续安排，通过比较条件变化，逐步形成稳定的判断与解题思路。');
  setText('.editorial-side', '针对长题与综合题，重点训练条件提取、近似判断、推导步骤与书面表达，使解题思路能够完整落实到答卷上。');

  const principles = document.querySelectorAll('.principle-grid-specific .principle');
  const principleCopy = [
    ['公式结合物理图景讲解', '结合现象、图像与成立条件理解公式，再进入典型题训练，避免孤立记忆结论。'],
    ['同一知识点集中练变式', '把常见题型与条件变化连续安排，在对比中归纳稳定的处理方法，提高同类题的熟练度。'],
    ['校内考强化推导与记述', '结合目标校真题训练长文读解、近似处理、数学工具与规范书写，提高综合题完成度。']
  ];
  principles.forEach((item, i) => {
    if (!principleCopy[i]) return;
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');
    if (h3) h3.textContent = principleCopy[i][0];
    if (p) p.textContent = principleCopy[i][1];
  });

  const commonPanel = document.querySelector('[data-course-panel="common"]');
  if (commonPanel) {
    const h3 = commonPanel.querySelector('h3');
    const p = commonPanel.querySelector(':scope > p');
    if (h3) h3.textContent = '夯实基础，强化实验与图表题。';
    if (p) p.textContent = '共通考试与 EJU 课程以稳定得分为目标，系统梳理基本定律与典型模型，并集中训练实验、图表、单位、数量级及条件变化题。';
  }

  const schoolPanel = document.querySelector('[data-course-panel="school"]');
  if (schoolPanel) {
    const h3 = schoolPanel.querySelector('h3');
    const p = schoolPanel.querySelector(':scope > p');
    if (h3) h3.textContent = '围绕目标校真题，强化推导与记述。';
    if (p) p.textContent = '在高中物理框架上，根据目标大学历年真题补充近似、微积分、数列、三角变换等常用工具，并训练长文条件提取、推导组织与规范作答。';
  }

  setText('.material-feature > p', '按校内考中反复出现的数学工具、近似方法与推理结构编排专题，配合典型例题与变式训练，便于课堂讲解后继续巩固。');

  /* Admissions planning: teacher/service-provider perspective. */
  setText('.planning-head h2', '结合学生情况与院校选拔方式，制定个性化升学方案。');
  setText('.planning-head > p', '综合学生现有成绩、目标专业、可用考试成绩与备考时间，逐校比较书类审查、校内考、面试或口试，以及 EJU、共通考试和英语成绩的计分方式，确定更合适的出愿组合与准备顺序。');
  setText('.planning-strategy h3', '院校与选拔方式分析');
  setText('.planning-punch', '在符合志望方向的前提下，优先选择更能发挥学生优势的院校与选拔方式。');
  setText('.planning-interview h3', '志望理由、面试与口头试问统一准备');
  setText('.planning-interview > p', '从目标学部、学科的课程设置、研究室与教授信息入手，结合学生经历整理志望理由，再据此准备面试与专业追问，使书面材料和现场回答保持一致。');

  const interviewItems = document.querySelectorAll('.planning-interview .clean-list li');
  const interviewCopy = [
    '调查目标学部、学科、课程、研究室与教授',
    '梳理个人经历、兴趣与志望方向的具体联系',
    '精简文稿，删除套话、重复与无效信息',
    '围绕核心回答准备后续追问与口头试问'
  ];
  interviewItems.forEach((item, i) => {
    if (interviewCopy[i]) item.textContent = interviewCopy[i];
  });

  /* Graduate section wording. */
  const graduateIntro = document.querySelector('.graduate-copy > p:not(.kicker):not(.graduate-subjects)');
  if (graduateIntro) {
    graduateIntro.textContent = '本科就读京都大学工学部电气电子工程，现于东京大学大学院工学系研究科电气工程与信息系统专攻，从事信号处理相关研究。大学院咨询以本人实际备考、考试与研究经历为基础，主要覆盖电气电子、信息工程及相关交叉方向。';
  }

  /* Experience: use compact bullet lists for the two cram-school roles. */
  const experienceHead = document.querySelector('.experience-head > p');
  if (experienceHead) {
    experienceHead.textContent = '教学经历覆盖 EJU 大班、一对一、热门大学校内考、理科口试与面试指导。现于旅人教育负责本科入试物理，并参与课程设计与教材开发。';
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
      '理科口试',
      '本科入试报考规划',
      '课程设计与教材开发'
    ]);

    setBullets(gyouchi, [
      'EJU 物理大班（基础班、冲刺班、刷题班）',
      '数学、物理一对一',
      '热门大学校内考班课与一对一',
      '志望理由、面试与口头试问指导'
    ]);

    if (current) current.classList.add('experience-item--primary');
    if (kyoto) kyoto.classList.remove('experience-item--kyoto');
    if (current && gyouchi && current.nextElementSibling !== gyouchi) experienceList.insertBefore(gyouchi, kyoto || current.nextSibling);
  }

  /* Feedback image: it sits off-screen in a horizontal scroller, so load it eagerly and use a two-step fallback. */
  const feedback = document.querySelector('[data-media="feedback"]');
  if (feedback) {
    feedback.loading = 'eager';
    feedback.removeAttribute('loading');
    feedback.dataset.fallbackUsed = '';
    let stage = 0;
    feedback.onerror = () => {
      stage += 1;
      if (stage === 1) {
        feedback.src = '/assets/student-feedback-wechat.webp?v=20260813ac';
      } else {
        feedback.onerror = null;
        feedback.src = '/assets/student-record-wall-v4.webp?v=20260813ac';
      }
    };
    feedback.src = '/assets/student-feedback-wechat-v5.webp?v=20260813ac';
  }
})();