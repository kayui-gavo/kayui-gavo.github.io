(()=>{
  const readabilityStyle=document.createElement('style');
  readabilityStyle.textContent=`
    .lede,.detail-panel h2,.detail-panel p,.proofs span,.proofs a,.school-lines span{line-break:strict;overflow-wrap:break-word;text-wrap:pretty}
    @media(min-width:1061px){
      .explore{grid-template-columns:172px minmax(0,1fr);gap:24px}
      .section-index{padding-left:13px;padding-right:14px}
      .detail-layout{grid-template-columns:minmax(0,1fr) 118px;gap:18px}
      .detail-panel h2,.detail-panel p,.proofs span,.proofs a,.interest-grid{max-width:none}
      html[lang="zh-CN"] .detail-panel h2,html[lang="zh-Hant-TW"] .detail-panel h2{font-size:clamp(23px,1.55vw,25.5px);white-space:nowrap;text-wrap:nowrap}
      .visual-cell{min-height:212px}
      .visual-research img:first-child{width:180px;height:120px;right:-12px;top:44px}
      .visual-research img.secondary{width:72px;height:48px;left:0;bottom:18px}
      .visual-education img,.visual-interests img{width:170px;height:113px;right:-2px;bottom:30px}
      .visual-internships::before{width:118px;right:0}
      .intern-year{font-size:41px}
    }
    @media(min-width:1240px){
      .nav,.landing{width:min(1240px,calc(100% - 64px))}
      .landing{grid-template-columns:minmax(350px,.76fr) minmax(0,1.24fr);gap:clamp(58px,5vw,76px)}
      .portrait-column{width:min(29vw,382px)}
      .editorial{max-width:820px}
      .explore{grid-template-columns:176px minmax(0,1fr);gap:26px}
      .detail-layout{grid-template-columns:minmax(0,1fr) 126px;gap:20px}
    }
    @media(max-width:1060px) and (min-width:601px){
      .detail-panel h2,.detail-panel p,.proofs span,.proofs a{max-width:none}
      .detail-layout{grid-template-columns:minmax(0,1fr) 154px;gap:20px}
      html[lang="zh-CN"] .detail-panel h2,html[lang="zh-Hant-TW"] .detail-panel h2{text-wrap:balance}
    }
  `;
  document.head.appendChild(readabilityStyle);

  const shell=document.querySelector('.site-shell');
  const landing=document.querySelector('.landing');
  const tablist=document.querySelector('.section-index');
  const tabs=[...document.querySelectorAll('.topic[role="tab"]')];
  const panels=[...document.querySelectorAll('.detail-panel[role="tabpanel"]')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover=matchMedia('(hover:hover) and (pointer:fine)').matches;
  document.documentElement.classList.add('motion-ready');

  let activeTopic=tabs.find(tab=>tab.getAttribute('aria-selected')==='true')?.dataset.topic||tabs[0]?.dataset.topic;
  let animating=false;

  const updateMarker=(tab)=>{
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
      if(active){updateMarker(tab);if(focus)tab.focus({preventScroll:true})}
    });
  };

  const panelFor=(topic)=>panels.find(panel=>panel.dataset.panel===topic);

  const revealPanel=(panel)=>{
    if(!panel)return;
    panel.hidden=false;
    panel.classList.add('is-active');
    panel.setAttribute('aria-hidden','false');
    if(reduced||!panel.animate)return;
    panel.animate([
      {opacity:0,transform:'translateY(9px)',clipPath:'inset(7% 0 0 0)'},
      {opacity:1,transform:'translateY(0)',clipPath:'inset(0 0 0 0)'}
    ],{duration:360,easing:'cubic-bezier(.22,.86,.25,1)',fill:'both'});
    const visual=panel.querySelector('.visual-cell');
    if(visual?.animate){
      visual.animate([
        {opacity:.2,transform:'translateX(10px) scale(.975)'},
        {opacity:1,transform:'translateX(0) scale(1)'}
      ],{duration:480,delay:45,easing:'cubic-bezier(.22,.86,.25,1)',fill:'both'});
    }
    const copy=panel.querySelector('.detail-copy');
    if(copy?.animate){
      copy.animate([
        {opacity:.25,transform:'translateY(6px)'},
        {opacity:1,transform:'translateY(0)'}
      ],{duration:390,delay:25,easing:'cubic-bezier(.22,.86,.25,1)',fill:'both'});
    }
  };

  const hidePanel=async(panel)=>{
    if(!panel)return;
    if(!reduced&&panel.animate){
      const anim=panel.animate([
        {opacity:1,transform:'translateY(0)'},
        {opacity:0,transform:'translateY(-5px)'}
      ],{duration:135,easing:'cubic-bezier(.4,0,.8,.2)',fill:'both'});
      try{await anim.finished}catch(_){ }
    }
    panel.classList.remove('is-active');
    panel.hidden=true;
    panel.setAttribute('aria-hidden','true');
  };

  const commitTopic=async(topic,{focus=false,instant=false}={})=>{
    if(!topic||topic===activeTopic&&panelFor(topic)?.classList.contains('is-active')){
      setTabState(topic,{focus});
      return;
    }
    if(animating&&!instant)return;
    animating=true;
    const oldPanel=panelFor(activeTopic);
    const newPanel=panelFor(topic);
    activeTopic=topic;
    setTabState(topic,{focus});
    if(instant){
      panels.forEach(panel=>{
        const active=panel===newPanel;
        panel.hidden=!active;
        panel.classList.toggle('is-active',active);
        panel.setAttribute('aria-hidden',active?'false':'true');
      });
    }else{
      await hidePanel(oldPanel);
      revealPanel(newPanel);
    }
    animating=false;
  };

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

  panels.forEach(panel=>{
    const active=panel.dataset.panel===activeTopic;
    panel.hidden=!active;
    panel.classList.toggle('is-active',active);
    panel.setAttribute('aria-hidden',active?'false':'true');
  });
  setTabState(activeTopic);
  requestAnimationFrame(()=>updateMarker(tabs.find(tab=>tab.dataset.topic===activeTopic)));
  addEventListener('resize',()=>updateMarker(tabs.find(tab=>tab.dataset.topic===activeTopic)),{passive:true});

  if(reduced||!canHover||!landing||!shell)return;
  let targetX=0,targetY=0,currentX=0,currentY=0,raf=0;
  const draw=()=>{
    currentX+=(targetX-currentX)*.045;
    currentY+=(targetY-currentY)*.045;
    shell.style.setProperty('--mx',currentX.toFixed(3));
    shell.style.setProperty('--my',currentY.toFixed(3));
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
