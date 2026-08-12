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

  const panelFor=topic=>panels.find(panel=>panel.dataset.panel===topic);

  const updateMarker=tab=>{
    if(!tablist||!tab||innerWidth<=600)return;
    const listRect=tablist.getBoundingClientRect();
    const tabRect=tab.getBoundingClientRect();
    tablist.style.setProperty('--marker-y',`${Math.round(tabRect.top-listRect.top)}px`);
    tablist.style.setProperty('--marker-h',`${Math.round(tabRect.height)}px`);
  };

  const setTabState=(topic,{focus=false}={})=>{
    tabs.forEach(tab=>{
      const active=tab.dataset.topic===topic;
      tab.setAttribute('aria-selected',active?'true':'false');
      tab.tabIndex=active?0:-1;
      if(active){
        updateMarker(tab);
        if(focus)tab.focus({preventScroll:true});
      }
    });
  };

  const showInstant=topic=>{
    panels.forEach(panel=>{
      const active=panel.dataset.panel===topic;
      panel.hidden=!active;
      panel.classList.toggle('is-active',active);
      panel.setAttribute('aria-hidden',active?'false':'true');
    });
  };

  const transitionTo=async(topic,{focus=false}={})=>{
    if(!topic||topic===activeTopic){
      setTabState(topic,{focus});
      return;
    }
    const oldPanel=panelFor(activeTopic);
    const newPanel=panelFor(topic);
    activeTopic=topic;
    setTabState(topic,{focus});

    if(reduced||!oldPanel?.animate||!newPanel?.animate){
      showInstant(topic);
      return;
    }

    const out=oldPanel.animate(
      [{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-4px)'}],
      {duration:150,easing:'cubic-bezier(.4,0,.7,.2)',fill:'both'}
    );
    try{await out.finished}catch(_){}

    oldPanel.classList.remove('is-active');
    oldPanel.hidden=true;
    oldPanel.setAttribute('aria-hidden','true');

    newPanel.hidden=false;
    newPanel.classList.add('is-active');
    newPanel.setAttribute('aria-hidden','false');
    newPanel.animate(
      [
        {opacity:0,transform:'translateY(7px)',clipPath:'inset(5% 0 0 0)'},
        {opacity:1,transform:'translateY(0)',clipPath:'inset(0 0 0 0)'}
      ],
      {duration:380,easing:'cubic-bezier(.22,.8,.24,1)',fill:'both'}
    );
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
  requestAnimationFrame(()=>updateMarker(tabs.find(tab=>tab.dataset.topic===activeTopic)));
  addEventListener('resize',()=>updateMarker(tabs.find(tab=>tab.dataset.topic===activeTopic)),{passive:true});

  if(reduced||!canHover||!landing||!shell)return;

  let targetX=0,targetY=0,currentX=0,currentY=0,raf=0;
  const draw=()=>{
    currentX+=(targetX-currentX)*.035;
    currentY+=(targetY-currentY)*.035;
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
  landing.addEventListener('pointerleave',()=>{
    targetX=0;targetY=0;requestDraw();
  });
})();