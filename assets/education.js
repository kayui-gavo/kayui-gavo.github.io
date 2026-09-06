(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  const setSourceWithFallback = (img, primary, fallback) => {
    if (!img) return;
    if (fallback) {
      img.addEventListener('error', () => {
        if (img.dataset.fallbackUsed) return;
        img.dataset.fallbackUsed = 'true';
        img.src = fallback;
      }, { once: true });
    }
    img.src = primary;
  };

  const setText = (selector, text) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
  };

  /* Copy pass: keep the page concise, concrete and natural in Chinese. */
  const heroThesis = document.querySelector('.hero-thesis');
  if (heroThesis) heroThesis.textContent = '从数学表达回到物理现象，从基本模型走向复杂问题。';
  setText('.hero-intro', '共通考试与 EJU 阶段，把基本规律、实验图表和典型模型练到稳定；进入理工科校内考后，再补充近似、微积分、数列与三角变换等工具。面对陌生设问时，要能从条件中识别模型，完成推导与记述。');
  setText('.editorial-head h2', '理解原理，识别模型，独立推导。');
  setText('.editorial-head > div > p:last-child', '基础阶段先讲清公式的物理意义、成立条件和典型模型；进入校内考后，再把不同章节里反复出现的结构串起来。弹簧、单摆、浮体与 LC 回路都可以归入简谐运动；驻波可以借助三角变换重新推导；重复过程常会落到数列与递推。');
  setText('.editorial-side', '难题考验的是条件提取、近似判断和推导组织。读懂题目后，还要明确研究对象与约束，选定定律，把中间步骤完整写出来。');

  const principles = document.querySelectorAll('.principle-grid-specific .principle');
  const principleCopy = [
    ['公式要有来路', '理解公式从哪里来、为什么成立，也要知道它在什么条件下才能使用。'],
    ['模型要能迁移', '看见不同章节、不同题面背后的共同结构，陌生题也能拆回熟悉的模型。'],
    ['推导要写得完整', '明确研究对象与约束，建立方程、处理近似，把每一步推理清楚地写出来。']
  ];
  principles.forEach((item, i) => {
    if (!principleCopy[i]) return;
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');
    if (h3) h3.textContent = principleCopy[i][0];
    if (p) p.textContent = principleCopy[i][1];
  });

  setText('.planning-head h2', '先看清怎么选拔，再决定怎么准备。');
  setText('.planning-head > p', '同一份 EJU、共通考试或英语成绩，在不同大学、不同选拔方式里的价值并不相同。先拆清哪些环节真正计分，再决定时间与精力放在哪里。');
  setText('.planning-punch', '把最有把握的部分，放到真正决定结果的评分环节上。');
  setText('.student-voices-head h2', '实际教学与录取反馈');
  setText('.student-voices-head > p', '以下为过往教学、考前准备与录取反馈节选。姓名、头像及其他可识别个人信息均已隐去；记录仅用于展示实际指导过程与反馈。');
  setText('.contact-copy > p', '咨询共通考试 / EJU 物理、理工科校内考、理科口试或报考规划时，请附上年级、目标校、目前成绩和希望解决的问题，便于判断适合的课程与准备顺序。');

  /* Current offer: keep it immediately after the teacher hero so the mobile scan is
     identity -> current course -> proof -> teaching approach. */
  const installFeaturedCourse = () => {
    if (document.querySelector('#featured-course')) return;
    const hero = document.querySelector('#top');
    if (!hero) return;

    const poster = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0