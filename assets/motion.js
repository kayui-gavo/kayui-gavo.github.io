(()=>{
  const script=document.currentScript;
  if(script){
    const portraitBase=new URL('portrait-data/',script.src);
    const portraits=[...document.querySelectorAll('.portrait')];
    if(portraits.length){
      const parts=['p01.txt','p02.txt','p03.txt','p04.txt','p05.txt','p06.txt'];
      Promise.all(parts.map(name=>fetch(new URL(name,portraitBase)).then(r=>{if(!r.ok)throw new Error('portrait');return r.text()})))
        .then(chunks=>{
          const clean=chunks.join('').replace(/\s+/g,'');
          const src=`data:image/webp;base64,${clean}`;
          portraits.forEach(img=>{img.src=src});
        })
        .catch(()=>{});
    }
  }

  const shell=document.querySelector('.site-shell');
  const landing=document.querySelector('.landing');
  const frame=document.querySelector('.portrait-frame');
  const indexEl=document.querySelector('.section-index');
  const topics=[...document.querySelectorAll('.topic')];
  const panels=[...document.querySelectorAll('.detail-panel')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover=matchMedia('(hover:hover) and (pointer:fine)').matches;
  document.documentElement.classList.add('motion-ready');

  let committed=topics.find(btn=>btn.getAttribute('aria-selected')==='true')?.dataset.topic || topics[0]?.dataset.topic || 'research';

  const renderTopic=(name,{focusButton=false,commit=false}={})=>{
    if(!name)return;
    if(commit)committed=name;
    if(shell)shell.dataset.topic=name;
    topics.forEach(btn=>{
      const active=btn.dataset.topic===name;
      btn.setAttribute('aria-selected',active?'true':'false');
      btn.tabIndex=active?0:-1;
      if(active&&focusButton)btn.focus({preventScroll:true});
    });
    panels.forEach(panel=>{
      const active=panel.dataset.panel===name;
      panel.classList.toggle('is-active',active);
      panel.setAttribute('aria-hidden',active?'false':'true');
    });
  };

  topics.forEach((btn,index)=>{
    if(canHover)btn.addEventListener('mouseenter',()=>renderTopic(btn.dataset.topic));
    btn.addEventListener('focus',()=>renderTopic(btn.dataset.topic));
    btn.addEventListener('click',()=>renderTopic(btn.dataset.topic,{commit:true}));
    btn.addEventListener('keydown',e=>{
      if(!['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(e.key))return;
      e.preventDefault();
      let next=index;
      if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(index+1)%topics.length;
      if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(index-1+topics.length)%topics.length;
      if(e.key==='Home')next=0;
      if(e.key==='End')next=topics.length-1;
      renderTopic(topics[next].dataset.topic,{focusButton:true,commit:true});
    });
  });
  if(canHover)indexEl?.addEventListener('mouseleave',()=>renderTopic(committed));
  renderTopic(committed);

  if(reduced||!shell||!landing||!frame||!canHover)return;
  let tx=0,ty=0,x=0,y=0,raf=0;
  const render=()=>{
    x+=(tx-x)*.055;
    y+=(ty-y)*.055;
    shell.style.setProperty('--mx',x.toFixed(3));
    shell.style.setProperty('--my',y.toFixed(3));
    frame.style.transform=`perspective(1550px) rotateX(${(-y*.18).toFixed(2)}deg) rotateY(${(x*.24).toFixed(2)}deg) translate3d(${(-x*.38).toFixed(1)}px,${(-y*.30).toFixed(1)}px,0)`;
    if(Math.abs(tx-x)>.001||Math.abs(ty-y)>.001)raf=requestAnimationFrame(render);else raf=0;
  };
  const kick=()=>{if(!raf)raf=requestAnimationFrame(render)};
  landing.addEventListener('pointermove',e=>{
    const r=landing.getBoundingClientRect();
    tx=((e.clientX-r.left)/r.width-.5)*2;
    ty=((e.clientY-r.top)/r.height-.5)*2;
    kick();
  },{passive:true});
  landing.addEventListener('pointerleave',()=>{tx=0;ty=0;kick()});
})();