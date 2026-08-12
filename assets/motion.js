(()=>{
  const shell=document.querySelector('.site-shell');
  const landing=document.querySelector('.landing');
  const frame=document.querySelector('.portrait-frame');
  const tabs=[...document.querySelectorAll('.topic[role="tab"]')];
  const panels=[...document.querySelectorAll('.detail-panel[role="tabpanel"]')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover=matchMedia('(hover:hover) and (pointer:fine)').matches;
  document.documentElement.classList.add('motion-ready');

  const showPanel=(topic)=>{
    if(!topic)return;
    panels.forEach(panel=>{
      const active=panel.dataset.panel===topic;
      panel.classList.toggle('is-active',active);
      panel.hidden=!active;
      panel.setAttribute('aria-hidden',active?'false':'true');
    });
  };

  const commitTopic=(topic,{focus=false}={})=>{
    if(!topic)return;
    tabs.forEach(tab=>{
      const active=tab.dataset.topic===topic;
      tab.setAttribute('aria-selected',active?'true':'false');
      tab.tabIndex=active?0:-1;
      if(active&&focus)tab.focus({preventScroll:true});
    });
    showPanel(topic);
  };

  const initial=tabs.find(tab=>tab.getAttribute('aria-selected')==='true')?.dataset.topic||tabs[0]?.dataset.topic;
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>commitTopic(tab.dataset.topic));
    tab.addEventListener('keydown',event=>{
      const keys=['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'];
      if(!keys.includes(event.key))return;
      event.preventDefault();
      let next=index;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;
      if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+tabs.length)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      commitTopic(tabs[next].dataset.topic,{focus:true});
    });
  });
  commitTopic(initial);

  if(reduced||!canHover||!landing||!frame)return;
  let targetX=0,targetY=0,currentX=0,currentY=0,raf=0;
  const draw=()=>{
    currentX+=(targetX-currentX)*.05;
    currentY+=(targetY-currentY)*.05;
    if(shell){
      shell.style.setProperty('--mx',currentX.toFixed(3));
      shell.style.setProperty('--my',currentY.toFixed(3));
    }
    frame.style.transform=`perspective(1800px) rotateX(${(-currentY*.08).toFixed(2)}deg) rotateY(${(currentX*.11).toFixed(2)}deg) translate3d(${(-currentX*.16).toFixed(1)}px,${(-currentY*.12).toFixed(1)}px,0)`;
    if(Math.abs(targetX-currentX)>.001||Math.abs(targetY-currentY)>.001)raf=requestAnimationFrame(draw);else raf=0;
  };
  const requestDraw=()=>{if(!raf)raf=requestAnimationFrame(draw)};
  landing.addEventListener('pointermove',event=>{
    const rect=landing.getBoundingClientRect();
    targetX=((event.clientX-rect.left)/rect.width-.5)*2;
    targetY=((event.clientY-rect.top)/rect.height-.5)*2;
    requestDraw();
  },{passive:true});
  landing.addEventListener('pointerleave',()=>{targetX=0;targetY=0;requestDraw()});
})();
