import('./education-copy-v9.js?v=20260814e').then(() => {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.setProperty('min-height','0','important');
  }
  const list = document.querySelector('.experience-item--primary .experience-bullets');
  if (list) {
    list.style.setProperty('grid-template-columns','1fr','important');
    list.style.setProperty('grid-template-rows','none','important');
    list.style.setProperty('grid-auto-flow','row','important');
    list.style.setProperty('row-gap','6px','important');
    list.style.setProperty('line-height','1.68','important');
  }
});
