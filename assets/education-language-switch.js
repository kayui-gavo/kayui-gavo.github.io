(() => {
  const current = location.pathname.includes('/education/zh-tw/') ? 'zh-tw' : 'zh-cn';
  const links = () => `
    <a href="/education/zh-cn/"${current === 'zh-cn' ? ' aria-current="page"' : ''}>简中</a>
    <a href="/education/zh-tw/"${current === 'zh-tw' ? ' aria-current="page"' : ''}>繁中</a>`;

  const navLinks = document.querySelector('.nav-links');
  if (navLinks && !navLinks.querySelector('.education-languages')) {
    const wrap = document.createElement('span');
    wrap.className = 'education-languages';
    wrap.setAttribute('aria-label', '语言');
    wrap.innerHTML = links();
    const cta = navLinks.querySelector('.header-cta');
    if (cta) navLinks.insertBefore(wrap, cta); else navLinks.appendChild(wrap);
  }

  const mobileNav = document.querySelector('.mobile-jump-nav');
  if (mobileNav && !mobileNav.querySelector('.education-languages-mobile')) {
    const wrap = document.createElement('span');
    wrap.className = 'education-languages-mobile';
    wrap.setAttribute('aria-label', '语言');
    wrap.innerHTML = links();
    mobileNav.appendChild(wrap);
  }

  const footer = document.querySelector('footer');
  if (footer && !footer.querySelector('.footer-language-links')) {
    const wrap = document.createElement('span');
    wrap.className = 'footer-language-links';
    wrap.setAttribute('aria-label', '语言');
    wrap.innerHTML = `<a href="/education/zh-cn/"${current === 'zh-cn' ? ' aria-current="page"' : ''}>简中</a><i>·</i><a href="/education/zh-tw/"${current === 'zh-tw' ? ' aria-current="page"' : ''}>繁中</a>`;
    footer.appendChild(wrap);
  }
})();
