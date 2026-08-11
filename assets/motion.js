(()=>{
  const script=document.currentScript;
  const image=document.querySelector('.portrait');
  if(script&&image){
    const base=new URL('portrait-data/',script.src);
    const parts=['p01.txt','p02.txt','p03.txt','p04.txt','p05.txt','p06.txt'];
    Promise.all(parts.map(name=>fetch(new URL(name,base)).then(r=>{if(!r.ok)throw new Error('portrait');return r.text()})))
      .then(chunks=>{image.src=`data:image/webp;base64,${chunks.join('')}`})
      .catch(()=>{});
  }

  const shell=document.querySelector('.site-shell');
  const landing=document.querySelector('.landing');
  const frame=document.querySelector('.portrait-frame');
  const topics=[...document.querySelectorAll('.topic')];
  const panels=[...document.querySelectorAll('.detail-panel')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('motion-ready');

  const setTopic=(name,focusButton=false)=>{
    topics.forEach(btn=>{
      const active=btn.dataset.topic===name;
      btn.setAttribute('aria-selected',active?'true':'false');
      if(active&&focusButton)btn.focus({preventScroll:true});
    });
    panels.forEach(panel=>panel.classList.toggle('is-active',panel.dataset.panel===name));
  };

  topics.forEach((btn,index)=>{
    btn.addEventListener('mouseenter',()=>setTopic(btn.dataset.topic));
    btn.addEventListener('focus',()=>setTopic(btn.dataset.topic));
    btn.addEventListener('click',()=>setTopic(btn.dataset.topic));
    btn.addEventListener('keydown',e=>{
      if(!['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(e.key))return;
      e.preventDefault();
      let next=index;
      if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(index+1)%topics.length;
      if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(index-1+topics.length)%topics.length;
      if(e.key==='Home')next=0;
      if(e.key==='End')next=topics.length-1;
      setTopic(topics[next].dataset.topic,true);
    });
  });

  if(reduced||!shell||!landing||!frame)return;
  let tx=0,ty=0,x=0,y=0,raf=0;
  const render=()=>{
    x+=(tx-x)*.075;
    y+=(ty-y)*.075;
    frame.style.transform=`perspective(1300px) rotateX(${(-y*.55).toFixed(2)}deg) rotateY(${(x*.72).toFixed(2)}deg) translate3d(${(-x*1.5).toFixed(1)}px,${(-y*1.2).toFixed(1)}px,0)`;
    if(Math.abs(tx-x)>.001||Math.abs(ty-y)>.001)raf=requestAnimationFrame(render);else raf=0;
  };
  const kick=()=>{if(!raf)raf=requestAnimationFrame(render)};
  landing.addEventListener('pointermove',e=>{
    if(e.pointerType==='touch')return;
    const r=landing.getBoundingClientRect();
    tx=((e.clientX-r.left)/r.width-.5)*2;
    ty=((e.clientY-r.top)/r.height-.5)*2;
    kick();
  },{passive:true});
  landing.addEventListener('pointerleave',()=>{tx=0;ty=0;kick()});
})();
