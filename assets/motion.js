(()=>{
  const shell=document.querySelector('.site-shell');
  const landing=document.querySelector('.landing');
  const tablist=document.querySelector('.section-index');
  const tabs=[...document.querySelectorAll('.topic[role="tab"]')];
  const panels=[...document.querySelectorAll('.detail-panel[role="tabpanel"]')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover=matchMedia('(hover:hover) and (pointer:fine)').matches;

  document.documentElement.classList.add('motion-ready');

  let activeTopic=tabs.find(tab=>tab.getAttribute('aria-selected')==='true')?.dataset.topic||tabs[0]?.dataset.topic;
  let switchToken=0;

  const panelFor=topic=>panels.find(panel=>panel.dataset.panel===topic);
  const activeTab=()=>tabs.find(tab=>tab.dataset.topic===activeTopic);

  const updateMarker=tab=>{
    if(!tablist||!tab||innerWidth<=600)return;
    const listRect=tablist.getBoundingClientRect();
    const tabRect=tab.getBoundingClientRect();
    tablist.style.setProperty('--marker-y',`${Math.round(tabRect.top-listRect.top)}px`);
    tablist.style.setProperty('--marker-h',`${Math.round(tabRect.height)}px`);
  };

  const setTabState=(topic,{focus=false}={})=>{
    tabs.forEach(tab=>{
      const selected=tab.dataset.topic===topic;
      tab.setAttribute('aria-selected',selected?'true':'false');
      tab.tabIndex=selected?0:-1;
      if(selected){
        updateMarker(tab);
        if(focus)tab.focus({preventScroll:true});
      }
    });
  };

  const showInstant=topic=>{
    panels.forEach(panel=>{
      const selected=panel.dataset.panel===topic;
      panel.getAnimations?.().forEach(animation=>animation.cancel());
      panel.hidden=!selected;
      panel.classList.toggle('is-active',selected);
      panel.setAttribute('aria-hidden',selected?'false':'true');
      panel.style.removeProperty('opacity');
      panel.style.removeProperty('transform');
      panel.style.removeProperty('clip-path');
    });
  };

  const transitionTo=async(topic,{focus=false}={})=>{
    if(!topic)return;
    if(topic===activeTopic){
      setTabState(topic,{focus});
      return;
    }

    const token=++switchToken;
    const previousTopic=activeTopic;
    const oldPanel=panelFor(previousTopic);
    const newPanel=panelFor(topic);
    activeTopic=topic;
    setTabState(topic,{focus});

    if(reduced||!oldPanel?.animate||!newPanel?.animate){
      showInstant(topic);
      return;
    }

    panels.forEach(panel=>panel.getAnimations?.().forEach(animation=>animation.cancel()));

    const out=oldPanel.animate(
      [{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-3px)'}],
      {duration:135,easing:'cubic-bezier(.4,0,.7,.2)',fill:'both'}
    );
    try{await out.finished}catch(_){}
    if(token!==switchToken)return;

    oldPanel.classList.remove('is-active');
    oldPanel.hidden=true;
    oldPanel.setAttribute('aria-hidden','true');

    newPanel.hidden=false;
    newPanel.classList.add('is-active');
    newPanel.setAttribute('aria-hidden','false');

    const incoming=newPanel.animate(
      [
        {opacity:0,transform:'translateY(6px)',clipPath:'inset(4% 0 0 0)'},
        {opacity:1,transform:'translateY(0)',clipPath:'inset(0 0 0 0)'}
      ],
      {duration:360,easing:'cubic-bezier(.22,.82,.24,1)',fill:'both'}
    );
    try{await incoming.finished}catch(_){}
    if(token!==switchToken)return;
    incoming.cancel();
  };

  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>transitionTo(tab.dataset.topic));
    tab.addEventListener('keydown',event=>{
      const keys=['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'];
      if(!keys.includes(event.key))return;
      event.preventDefault();
      let next=index;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;
      if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+tabs.length)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      transitionTo(tabs[next].dataset.topic,{focus:true});
    });
  });

  showInstant(activeTopic);
  setTabState(activeTopic);
  requestAnimationFrame(()=>updateMarker(activeTab()));
  addEventListener('resize',()=>updateMarker(activeTab()),{passive:true});

  if(reduced||!canHover||!landing||!shell)return;

  let targetX=0,targetY=0,currentX=0,currentY=0,raf=0;
  const draw=()=>{
    currentX+=(targetX-currentX)*.032;
    currentY+=(targetY-currentY)*.032;
    shell.style.setProperty('--mx',currentX.toFixed(3));
    shell.style.setProperty('--my',currentY.toFixed(3));
    if(Math.abs(targetX-currentX)>.002||Math.abs(targetY-currentY)>.002){
      raf=requestAnimationFrame(draw);
    }else{
      raf=0;
    }
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