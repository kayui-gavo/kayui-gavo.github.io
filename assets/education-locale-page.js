/* Locale alias loader for the static education page.
   No legacy content/copy passes; the canonical HTML remains the single source. */
(async()=>{
  const root=document.documentElement;
  const fallback=document.querySelector('.locale-fallback');
  const isTraditional=/^zh-(?:TW|Hant)/i.test(root.dataset.educationLocale||root.lang||'');
  const loadScript=src=>new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    script.src=src;
    script.onload=resolve;
    script.onerror=reject;
    document.head.appendChild(script);
  });
  try{
    const response=await fetch('/education/index.html',{cache:'no-cache'});
    if(!response.ok)throw Error('education source HTTP '+response.status);
    const source=new DOMParser().parseFromString(await response.text(),'text/html');
    if(!source.querySelector('main#missing')&&!source.querySelector('#teaching'))throw Error('Education content not found');
    // Static, factual content first; interactions load only after DOM exists.
    document.body.innerHTML=source.body.innerHTML;
    root.classList.remove('locale-loading');
    root.classList.replace('no-js','js');
    await loadScript('/assets/education-page.js?v=20261013a');
    if(isTraditional){
      await loadScript('/assets/education-locale-zh-tw.js?v=20260828g');
      window.applyEducationZhTW?.();
      // Fill gaps in the original traditional converter without touching the shared script.
      const missingTraditional = {"义":"義","于":"於","会":"會","传":"傳","册":"冊","击":"擊","删":"刪","动":"動","区":"區","单":"單","参":"參","号":"號","头":"頭","学":"學","审":"審","庆":"慶","强":"強","当":"當","战":"戰","扫":"掃","报":"報","担":"擔","拟":"擬","择":"擇","据":"據","断":"斷","无":"無","旧":"舊","槛":"檻","点":"點","环":"環","盖":"蓋","码":"碼","笔":"筆","约":"約","级":"級","织":"織","终":"終","继":"繼","续":"續","综":"綜","节":"節","范":"範","药":"藥","营":"營","见":"見","训":"訓","识":"識","话":"話","询":"詢","详":"詳","语":"語","请":"請","诺":"諾","负":"負","责":"責","费":"費","输":"輸","进":"進","连":"連","适":"適","钮":"鈕","际":"際","隐":"隱","难":"難","馈":"饋"};
      const toTraditional = text => (text || '').replaceAll('題干','題幹').replace(/[\u4e00-\u9fff]/g, char => missingTraditional[char] || char);
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let textNode;
      while ((textNode = walker.nextNode())) {
        if (textNode.parentElement?.closest('style,script,textarea')) continue;
        const updated = toTraditional(textNode.nodeValue);
        if (updated !== textNode.nodeValue) textNode.nodeValue = updated;
      }
      document.querySelectorAll('[alt],[aria-label],[title]').forEach(element => {
        ['alt','aria-label','title'].forEach(attr => {
          if(element.hasAttribute(attr)) element.setAttribute(attr,toTraditional(element.getAttribute(attr)));
        });
      });
    }
  }catch(error){
    console.error('[education locale]',error);
    root.classList.remove('locale-loading');
    if(fallback)fallback.hidden=false;
  }
})();