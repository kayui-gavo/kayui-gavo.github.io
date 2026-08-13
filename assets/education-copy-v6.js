import('./education-copy-v11.js?v=20260814z');

(() => {
  const installAlignmentQA = () => {
    if (document.querySelector('style[data-education-alignment="v21"]')) return;
    const style = document.createElement('style');
    style.dataset.educationAlignment = 'v21';
    style.textContent = `
      @media (min-width:1051px){
        .graduate-grid.section-inner{
          width:calc(100% - 128px)!important;
          max-width:1792px!important;
          margin-left:auto!important;
          margin-right:auto!important;
          grid-template-columns:335px minmax(0,1fr)!important;
          gap:54px!important;
          align-items:start!important;
        }
        .graduate-score{width:100%!important;max-width:none!important;min-width:0!important}
        .graduate-copy{width:100%!important;max-width:none!important;min-width:0!important;justify-self:stretch!important}
        .graduate-copy>p,.graduate-copy>h2,.graduate-subjects,.graduate-details,.graduate-details details,.graduate-details summary,.graduate-link{
          width:100%!important;max-width:none!important;box-sizing:border-box!important;
        }
        .graduate-copy>p:not(.kicker):not(.graduate-subjects){max-width:none!important;padding-right:4px!important}
        .graduate-subjects{display:grid!important;grid-template-columns:118px minmax(0,1fr)!important;column-gap:8px!important;align-items:start!important}
        .graduate-subjects strong{white-space:nowrap!important}
        .graduate-details{border-top:1px solid rgba(215,229,238,.17)!important}
        .graduate-details details,.graduate-link{margin-left:0!important;margin-right:0!important}
      }

      @media (min-width:1350px){
        .experience-grid{grid-template-columns:minmax(0,1fr) 360px!important;gap:36px!important}
        .exp-row{grid-template-columns:88px 176px minmax(0,1fr)!important;gap:12px!important}
        .exp-responsibilities{width:100%!important;max-width:none!important;min-width:250px!important}
        .exp-responsibilities li{
          display:block!important;width:100%!important;max-width:none!important;min-width:0!important;
          white-space:nowrap!important;text-wrap:nowrap!important;word-break:keep-all!important;overflow-wrap:normal!important;
          font-size:12.9px!important;line-height:1.62!important;
        }
      }

      @media (min-width:1181px) and (max-width:1349px){
        .exp-row{grid-template-columns:82px 166px minmax(0,1fr)!important;gap:12px!important}
        .exp-responsibilities li{white-space:normal!important;text-wrap:pretty!important;word-break:auto-phrase!important;line-break:strict!important}
      }

      @media (max-width:1050px){
        .graduate-grid.section-inner{width:calc(100% - 48px)!important;max-width:none!important}
        .graduate-copy{width:100%!important;max-width:none!important}
      }
      @media (max-width:767px){
        .graduate-grid.section-inner{width:calc(100% - 30px)!important}
        .graduate-subjects{display:block!important}
        .exp-responsibilities{min-width:0!important}
        .exp-responsibilities li{white-space:normal!important;text-wrap:pretty!important;word-break:auto-phrase!important}
      }
    `;
    document.head.appendChild(style);
  };

  const finalLink = () => document.querySelector('link[data-education-final="v20"]');
  if (finalLink()) {
    installAlignmentQA();
  } else {
    const observer = new MutationObserver(() => {
      if (!finalLink()) return;
      observer.disconnect();
      installAlignmentQA();
    });
    observer.observe(document.head, { childList: true });
    window.addEventListener('load', () => setTimeout(installAlignmentQA, 0), { once: true });
  }
})();
