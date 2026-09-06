(()=>{
  if(!document.querySelector('link[data-home-mobile-refine="20260906"]')){
    const style=document.createElement('link');
    style.rel='stylesheet';
    style.href='/assets/home-mobile-refine-20260906.css?v=20260906a';
    style.dataset.homeMobileRefine='20260906';
    document.head.appendChild(style);
  }

  if(!document.querySelector('script[data-home-motion-base="20260828"]')){
    const script=document.createElement('script');
    script.src='/assets/motion-base-20260828.js?v=20260906a';
    script.async=false;
    script.dataset.homeMotionBase='20260828';
    document.body.appendChild(script);
  }
})();