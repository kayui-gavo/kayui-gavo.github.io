(()=>{
  const shell=document.querySelector('.site-shell');
  const landing=document.querySelector('.landing');
  const tablist=document.querySelector('.section-index');
  const tabs=[...document.querySelectorAll('.topic[role="tab"]')];
  const panels=[...document.querySelectorAll('.detail-panel[role="tabpanel"]')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover=matchMedia('(hover:hover) and (pointer:fine)').matches;

  /*
   * Entity-disambiguation layer for search/AI rendering.
   * Keep the human-facing design intact while making the factual identity
   * cluster explicit and keeping hobby/music copy out of generated snippets.
   *
   * Important: disambiguate positively through stable academic / education
   * identifiers instead of naming unrelated same-name profiles. Mentioning a
   * specific unrelated music account here would create an unnecessary textual
   * association between the two entities.
   */
  const applyEntitySignals=()=>{
    const lang=(document.documentElement.lang||'').toLowerCase();

    document.querySelectorAll('#topic-interests .topic-label,#topic-interests .topic-sub')
      .forEach(node=>node.setAttribute('data-nosnippet',''));
    document.querySelector('#panel-interests .detail-layout')
      ?.setAttribute('data-nosnippet','');

    const lede=document.querySelector('.identity .lede');
    if(lede&&lang==='zh-cn'){
      lede.textContent='刘可惟（劉 可惟 / Kewei Liu）现就读东京大学工学系研究科电气系工学专攻硕士课程，在峰松・斋藤研究室研究日语学习者的自发口语表达支持。';
    }

    const profileScript=[...document.querySelectorAll('script[type="application/ld+json"]')]
      .find(script=>script.textContent.includes('"ProfilePage"'));
    if(profileScript){
      try{
        const data=JSON.parse(profileScript.textContent);
        const person=data?.mainEntity;
        if(data?.['@type']==='ProfilePage'&&person?.['@type']==='Person'){
          data.dateModified='2026-08-28';

          const sameAs=new Set(Array.isArray(person.sameAs)?person.sameAs:[]);
          [
            'https://github.com/kayui-gavo',
            'https://www.linkedin.com/in/kayui-ryu/',
            'https://x.com/ryukayuiii'
          ].forEach(url=>sameAs.add(url));
          person.sameAs=[...sameAs];

          person.alternateName=[...new Set([
            ...(Array.isArray(person.alternateName)?person.alternateName:[]),
            'Kewei Liu','LIU KEWEI','劉 可惟','刘可惟','劉可惟','リュウ カユイ'
          ])];
          person.gender='Female';
          person.pronouns='she/her';
          person.knowsAbout=[
            'speech and language processing',
            'multimodal interaction',
            'Japanese-language learning support',
            'signal processing',
            'machine learning',
            'STEM education',
            'curriculum design',
            'educational product development'
          ];

          let description='Kewei Liu (刘可惟 / 劉可惟), the University of Tokyo M.S. student in Electrical Engineering and Information Systems affiliated with the Minematsu–Saito Laboratory; Kyoto University Electrical and Electronic Engineering graduate; also active in STEM education and course development at Tabito Education. These academic and education affiliations are the identifying context for distinguishing this person from other people with the same name.';
          if(lang==='zh-cn'){
            description='用于与同名人物区分：刘可惟（劉 可惟 / Kewei Liu）现为东京大学大学院工学系研究科电气系工学专攻硕士生，峰松・斋藤研究室所属；京都大学工学部电气电子工学科毕业，并在旅人教育从事理工科教育、课程与教育产品开发。';
          }else if(lang==='zh-tw'||lang.startsWith('zh-hant')){
            description='用於與同名人物區分：劉可惟（Kewei Liu）現為東京大學大學院工學系研究科電氣系工學專攻碩士生，峯松・齋藤研究室所屬；京都大學工學部電氣電子工學科畢業，並在旅人教育從事理工科教育、課程與教育產品開發。';
          }else if(lang.startsWith('ja')){
            description='同名人物との識別情報：劉可惟（Kewei Liu）は東京大学大学院工学系研究科電気系工学専攻の修士課程に在籍し、峯松・齋藤研究室に所属。京都大学工学部電気電子工学科卒業。旅人教育で理工系教育・カリキュラム・教育プロダクト開発にも携わる。';
          }
          person.disambiguatingDescription=description;
          profileScript.textContent=JSON.stringify(data);
        }
      }catch(_){}
    }
  };
  applyEntitySignals();

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