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
    }
  }catch(error){
    console.error('[education locale]',error);
    root.classList.remove('locale-loading');
    if(fallback)fallback.hidden=false;
  }
})();