import('/assets/education-copy-v7.js?v=20260814c').then(() => {
  const commonPanel = document.querySelector('[data-course-panel="common"]');
  if (commonPanel) {
    const p = commonPanel.querySelector(':scope > p');
    if (p) p.textContent = '共通考试与 EJU 课程以稳定得分为目标，系统梳理基本定律和典型题型，并集中训练实验与图表题、单位与数量级，以及常见变式和综合题。';
  }

  const principles = document.querySelectorAll('.principle-grid-specific .principle');
  if (principles[2]) {
    const h3 = principles[2].querySelector('h3');
    const p = principles[2].querySelector('p');
    if (h3) h3.textContent = '结合目标院校真题训练';
    if (p) p.textContent = '根据历年真题训练从题干中提取条件、处理近似、组织推导，并完成规范的书面作答。';
  }

  const tabito = [...document.querySelectorAll('.experience-item')].find(item => item.querySelector('strong')?.textContent.includes('旅人教育'));
  if (tabito) {
    const title = tabito.querySelector(':scope > strong');
    const role = tabito.querySelector('.experience-position');
    if (title && role && !tabito.querySelector('.experience-title-stack')) {
      const stack = document.createElement('div');
      stack.className = 'experience-title-stack';
      title.replaceWith(stack);
      stack.append(title, role);
    }
  }

  let style = document.getElementById('education-v8-detail-style');
  if (!style) {
    style = document.createElement('style');
    style.id = 'education-v8-detail-style';
    document.head.appendChild(style);
  }
  style.textContent = `
    .course-stage{grid-template-columns:252px minmax(0,1fr)!important}
    .course-tabs{background:#eeeae4!important;color:#242328!important}
    .course-tab{background:#f7f4ef!important;color:#242328!important;border-color:rgba(36,35,40,.14)!important;padding:16px 18px!important}
    .course-tab small{color:#706a66!important;opacity:1!important;font-weight:700!important;font-size:11px!important}
    .course-tab strong{color:#242328!important;opacity:1!important;font-weight:750!important;font-size:16px!important;line-height:1.35!important;text-shadow:none!important}
    .course-tab span{color:#76535d!important;opacity:1!important;font-weight:700!important}
    .course-tab[aria-selected="true"]{background:#eadde0!important;color:#4e333b!important;box-shadow:inset 4px 0 0 #6b4650!important}
    .course-tab[aria-selected="true"] small{color:#69545a!important}
    .course-tab[aria-selected="true"] strong{color:#4b3038!important}
    .course-tab[aria-selected="true"] span{color:#6b4650!important}

    .experience-grid{grid-template-columns:minmax(620px,.98fr) minmax(500px,1.02fr)!important;gap:38px!important}
    .experience-item,.experience-item--kyoto{grid-template-columns:96px 220px minmax(0,1fr)!important;grid-template-areas:"meta title copy"!important;column-gap:18px!important;align-items:start!important}
    .experience-title-stack{grid-area:title!important;display:grid!important;gap:6px!important;min-width:0!important}
    .experience-title-stack>strong{grid-area:auto!important;display:block!important;margin:0!important;font-size:17px!important;line-height:1.4!important;white-space:normal!important;word-break:keep-all!important}
    .experience-title-stack .experience-position{grid-area:auto!important;margin:0!important;max-width:100%!important;font-size:12.6px!important;line-height:1.55!important;font-weight:700!important;color:#67585c!important;white-space:normal!important;word-break:keep-all!important}
    .experience-copy-stack{grid-area:copy!important;display:block!important;min-width:0!important}
    .experience-copy-stack .experience-bullets{grid-area:auto!important;margin:0!important}
    .experience-item--university>strong{grid-area:title!important;font-size:17px!important;line-height:1.4!important;color:#1d2025!important}
    .experience-item--university .experience-role-lines{grid-area:copy!important;display:grid!important;gap:5px!important;margin:0!important}
    .experience-item--university .experience-role-lines .experience-role-title{margin-bottom:2px!important;font-size:14px!important;font-weight:750!important;color:#25282d!important}

    @media(max-width:1180px){.experience-grid{grid-template-columns:1fr!important}.experience-list{max-width:none!important}}
    @media(max-width:767px){
      .course-stage{display:block!important}.course-tabs{grid-template-columns:1fr 1fr!important;background:#eeeae4!important}.course-tab{min-height:76px!important;padding:12px 13px!important}.course-tab small{font-size:10.4px!important}.course-tab strong{font-size:14px!important}.course-tab[aria-selected="true"]{box-shadow:inset 0 4px 0 #6b4650!important}
      .experience-item,.experience-item--kyoto{grid-template-columns:74px minmax(0,1fr)!important;grid-template-areas:"meta title" "meta copy"!important;gap:4px 12px!important}.experience-title-stack{gap:3px!important}.experience-title-stack>strong,.experience-item--university>strong{font-size:15px!important}.experience-title-stack .experience-position{font-size:11.8px!important}
    }
  `;
});
