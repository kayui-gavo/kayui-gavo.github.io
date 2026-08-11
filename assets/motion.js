(()=>{
  const script=document.currentScript;
  if(script){
    const portraitBase=new URL('portrait-data/',script.src);
    const portraits=[...document.querySelectorAll('.portrait')];
    if(portraits.length){
      const parts=['p01.txt','p02.txt','p03.txt','p04.txt','p05.txt','p06.txt'];
      Promise.all(parts.map(name=>fetch(new URL(name,portraitBase)).then(r=>{if(!r.ok)throw new Error('portrait');return r.text()})))
        .then(chunks=>{const src=`data:image/webp;base64,${chunks.join('')}`;portraits.forEach(img=>{img.src=src})})
        .catch(()=>{});
    }

    const artBase=new URL('art-data/',script.src);
    const artImages=[...document.querySelectorAll('img[data-art]')];
    const cache=new Map();
    artImages.forEach(img=>{
      const key=img.dataset.art;
      if(!key)return;
      const file=key==='kyoto'?'kyoto01.txt':`${key}.txt`;
      if(!cache.has(key)){
        cache.set(key,
          fetch(new URL(file,artBase),{cache:'no-cache'})
            .then(r=>{if(!r.ok)throw new Error(key);return r.text()})
            .then(text=>`data:image/webp;base64,${text.trim()}`)
        );
      }
      cache.get(key)
        .then(src=>{
          img.addEventListener('load',()=>img.classList.add('is-loaded'),{once:true});
          img.src=src;
          if(img.complete&&img.naturalWidth>0)img.classList.add('is-loaded');
        })
        .catch(()=>{img.removeAttribute('src');img.classList.remove('is-loaded')});
    });
  }

  const shell=document.querySelector('.site-shell');
  const landing=document.querySelector('.landing');
  const frame=document.querySelector('.portrait-frame');
  const indexEl=document.querySelector('.section-index');
  const topics=[...document.querySelectorAll('.topic')];
  const panels=[...document.querySelectorAll('.detail-panel')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    btn.addEventListener('mouseenter',()=>renderTopic(btn.dataset.topic));
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
  indexEl?.addEventListener('mouseleave',()=>renderTopic(committed));
  renderTopic(committed);

  if(reduced||!shell||!landing||!frame)return;
  let tx=0,ty=0,x=0,y=0,raf=0;
  const render=()=>{
    x+=(tx-x)*.065;y+=(ty-y)*.065;
    shell.style.setProperty('--mx',x.toFixed(3));shell.style.setProperty('--my',y.toFixed(3));
    frame.style.transform=`perspective(1450px) rotateX(${(-y*.34).toFixed(2)}deg) rotateY(${(x*.46).toFixed(2)}deg) translate3d(${(-x*.9).toFixed(1)}px,${(-y*.7).toFixed(1)}px,0)`;
    if(Math.abs(tx-x)>.001||Math.abs(ty-y)>.001)raf=requestAnimationFrame(render);else raf=0;
  };
  const kick=()=>{if(!raf)raf=requestAnimationFrame(render)};
  landing.addEventListener('pointermove',e=>{
    if(e.pointerType==='touch')return;
    const r=landing.getBoundingClientRect();
    tx=((e.clientX-r.left)/r.width-.5)*2;ty=((e.clientY-r.top)/r.height-.5)*2;kick();
  },{passive:true});
  landing.addEventListener('pointerleave',()=>{tx=0;ty=0;kick()});
})();