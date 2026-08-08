(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  root.classList.add('motion');

  const hero = document.querySelector('.hero');
  const portrait = document.querySelector('.portrait-wrap');
  const profile = document.querySelector('.profile');
  const facts = [...document.querySelectorAll('.facts li')];
  const cvButton = document.querySelector('.cv-button');

  requestAnimationFrame(() => root.classList.add('motion-ready'));

  if (reduceMotion || !hero) {
    root.classList.add('motion-reduced');
    return;
  }

  let tx = 0, ty = 0, x = 0, y = 0, raf = 0;

  const render = () => {
    x += (tx - x) * 0.075;
    y += (ty - y) * 0.075;
    hero.style.setProperty('--mx', x.toFixed(4));
    hero.style.setProperty('--my', y.toFixed(4));
    if (Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001) {
      raf = requestAnimationFrame(render);
    } else {
      raf = 0;
    }
  };

  const kick = () => {
    if (!raf) raf = requestAnimationFrame(render);
  };

  hero.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const rect = hero.getBoundingClientRect();
    tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    kick();
  }, { passive: true });

  hero.addEventListener('pointerleave', () => {
    tx = 0;
    ty = 0;
    kick();
  });

  facts.forEach((item, index) => {
    item.addEventListener('pointerenter', () => {
      profile?.classList.remove('focus-research', 'focus-education');
      if (index === 2) profile?.classList.add('focus-research');
      if (index === 3) profile?.classList.add('focus-education');
    });
    item.addEventListener('pointerleave', () => {
      profile?.classList.remove('focus-research', 'focus-education');
    });
  });

  if (portrait) {
    portrait.addEventListener('pointerenter', () => portrait.classList.add('is-hovered'));
    portrait.addEventListener('pointerleave', () => portrait.classList.remove('is-hovered'));
  }

  if (cvButton) {
    cvButton.addEventListener('pointermove', (event) => {
      const r = cvButton.getBoundingClientRect();
      const dx = (event.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (event.clientY - (r.top + r.height / 2)) / r.height;
      cvButton.style.setProperty('--bx', `${(dx * 5).toFixed(2)}px`);
      cvButton.style.setProperty('--by', `${(dy * 4).toFixed(2)}px`);
    });
    cvButton.addEventListener('pointerleave', () => {
      cvButton.style.setProperty('--bx', '0px');
      cvButton.style.setProperty('--by', '0px');
    });
  }
})();
