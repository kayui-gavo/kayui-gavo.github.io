/* Education v6. Progressive navigation; facts remain in static HTML.
   No analytics, remote form submission, storage or framework dependencies. */
(() => {
 'use strict';
 const root=document.documentElement;
 const trad=root.lang.startsWith('zh-Hant');
 const t=(cn,tw)=>trad?tw:cn;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const behavior=()=>motion.matches?'instant':'smooth';
 const browser=document.querySelector('.education-browser');
 const views=[...document.querySelectorAll('[data-view]')];
 const viewTabs=[...document.querySelectorAll('[data-view-tab]')];
 const header=document.querySelector('.site-header');
 const bar=document.querySelector('.explore-bar');
 let active='teaching',headerHeight=0,handledHash=location.hash;
 const quickMenu=document.querySelector('.quick-menu');
 if(!browser || !viewTabs.length) return;
 const setHash=hash=>{if(location.hash!==hash) history.pushState(null,'',hash);handledHash=hash;};
 function measure(){
  headerHeight=Math.ceil(header?.getBoundingClientRect().height || 0);
  root.style.setProperty('--header-height',headerHeight+'px');
  root.style.setProperty('--explore-height',Math.ceil(bar?.getBoundingClientRect().height || 0)+'px');
 }
 function alignBrowser(){requestAnimationFrame(()=>window.scrollTo({top:Math.max(0,browser.getBoundingClientRect().top+scrollY-headerHeight),behavior:behavior()}));}
 function selectView(key,{scroll=false,focus=false}={}){
  if(!views.some(v=>v.dataset.view===key)) return;
  active=key;
  document.querySelectorAll('.quick-menu-panel a').forEach(a=>{
   if(a.hash==='#'+key)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
  });
  views.forEach(v=>{v.hidden=v.dataset.view!==key;});
  viewTabs.forEach(a=>{
   const selected=a.dataset.viewTab===key;
   a.setAttribute('aria-selected',String(selected)); a.tabIndex=selected?0:-1;
   if(selected && focus) a.focus({preventScroll:true});
  });
  document.querySelectorAll('.site-footer a[lang]').forEach(a=>{a.hash=location.hash;});
  browser.dispatchEvent(new CustomEvent('education:view',{detail:key}));
  if(scroll) alignBrowser();
 }
 viewTabs.forEach((a,i)=>{
  a.setAttribute('role','tab'); a.setAttribute('aria-controls','view-'+a.dataset.viewTab);
  a.addEventListener('keydown',e=>{
   let n;
   if(e.key===' '){e.preventDefault();a.click();return;}
   if(e.key==='ArrowRight') n=(i+1)%viewTabs.length;
   if(e.key==='ArrowLeft') n=(i+viewTabs.length-1)%viewTabs.length;
   if(e.key==='Home') n=0;
   if(e.key==='End') n=viewTabs.length-1;
   if(n===undefined) return;
   e.preventDefault(); setHash(viewTabs[n].hash); selectView(viewTabs[n].dataset.viewTab,{scroll:true,focus:true});
  });
 });
 document.querySelector('.explore-tabs').setAttribute('role','tablist');
 views.forEach(v=>{v.setAttribute('role','tabpanel');v.tabIndex=0;v.setAttribute('aria-labelledby','view-tab-'+v.dataset.view);});
 // Inner course tabs are independent of the outer view navigation.
 const courses=[...document.querySelectorAll('[data-course-tab]')];
 const coursePanels=[...document.querySelectorAll('[data-course-panel]')];
 function selectCourse(key,focus=false){
  if(!coursePanels.some(p=>p.dataset.coursePanel===key))return;
  courses.forEach(a=>{const yes=a.dataset.courseTab===key;a.setAttribute('aria-selected',String(yes));a.tabIndex=yes?0:-1;if(yes&&focus)a.focus({preventScroll:true});});
  coursePanels.forEach(p=>{p.hidden=p.dataset.coursePanel!==key;});
 }
 courses.forEach((a,i)=>{
  a.addEventListener('click',()=>{selectCourse(a.dataset.courseTab);setHash('#course-'+a.dataset.courseTab);syncLocale();});
  a.addEventListener('keydown',e=>{
   let n;
   if(e.key==='ArrowRight')n=(i+1)%courses.length;
   if(e.key==='ArrowLeft')n=(i+courses.length-1)%courses.length;
   if(e.key==='Home')n=0;
   if(e.key==='End')n=courses.length-1;
   if(n===undefined)return;
   e.preventDefault();selectCourse(courses[n].dataset.courseTab,true);setHash('#course-'+courses[n].dataset.courseTab);syncLocale();
  });
 });
 selectCourse('common');
 // Stacked native dialogs: closing a QR image must not unlock the contact dialog behind it.
 const locks=new Set();let savedBodyStyle='',savedScroll={x:0,y:0};
 function lock(d){
  if(!locks.size){
   savedScroll={x:scrollX,y:scrollY};savedBodyStyle=document.body.style.cssText;
   document.body.style.position='fixed';document.body.style.top=-savedScroll.y+'px';
   document.body.style.left='0';document.body.style.right='0';document.body.style.overflow='hidden';
  }
  locks.add(d);
 }
 function unlock(d){
  if(d.open||!locks.has(d))return;locks.delete(d);
  if(!locks.size){document.body.style.cssText=savedBodyStyle;window.scrollTo({left:savedScroll.x,top:savedScroll.y,behavior:'instant'});}
 }
 function bindClose(d,button,onClose){
  const finish=()=>{if(d.open||!locks.has(d))return;unlock(d);onClose?.();};
  const close=()=>{d.close();finish();};
  button.addEventListener('click',close);
  d.addEventListener('cancel',e=>{e.preventDefault();close();});
  d.addEventListener('click',e=>{if(e.target!==d)return;const b=d.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)close();});
  d.addEventListener('close',finish);
 }
 const contact=document.getElementById('contact');
 let contactDialog=null,contactTrigger=null;
 if(contact && typeof HTMLDialogElement!=='undefined' && typeof HTMLDialogElement.prototype.showModal==='function'){
  contactDialog=document.createElement('dialog');contactDialog.className='contact-dialog';contactDialog.setAttribute('aria-labelledby','contact-dialog-title');
  const toolbar=document.createElement('div');toolbar.className='contact-toolbar';
  const title=document.createElement('h2');title.id='contact-dialog-title';title.textContent=t('课程咨询','課程諮詢');
  const close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label',t('关闭咨询窗口','關閉諮詢視窗'));
  toolbar.append(title,close);contactDialog.append(toolbar,contact);document.body.append(contactDialog);
  const status=document.createElement('p');status.className='copy-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');contactDialog.append(status);
  bindClose(contactDialog,close,()=>{
   if(location.hash==='#contact')history.replaceState(null,'','#'+active);
   if(contactTrigger?.isConnected && contactTrigger.getClientRects().length)contactTrigger.focus({preventScroll:true});
  });
 }
 const topic=document.getElementById('inquiry-topic');
 const template=document.getElementById('inquiry-template');
 function updateTemplate(){
  if(!template)return;
  template.value=t('想咨询：','想諮詢：')+(topic?.value||'')+'\n'+t('年级 / 入学年份：\n目标校：\n目前成绩（EJU / 共通 / 英语）：\n最想解决的问题：','年級 / 入學年份：\n目標校：\n目前成績（EJU / 共通 / 英語）：\n最想解決的問題：');
 }
 topic?.addEventListener('change',updateTemplate);updateTemplate();
 function openContact(trigger){
  if(!contactDialog){contact?.scrollIntoView({behavior:behavior()});return;}
  contactTrigger=trigger||document.activeElement;
  const subject=trigger?.dataset.inquiry;
  if(subject && [...topic.options].some(o=>o.value===subject))topic.value=subject;
  updateTemplate();
  if(!contactDialog.open){lock(contactDialog);contactDialog.showModal();contactDialog.scrollTop=0;}
 }
 function syncLocale(){document.querySelectorAll('.site-footer a[lang]').forEach(a=>{a.hash=location.hash;});}
 function route(hash,{scroll=false}={}){
  let id;try{id=decodeURIComponent(hash.slice(1));}catch(_){return;}
  if(id==='contact'){openContact();return;}
  if(!id||id==='top'||id==='main'){if(scroll)window.scrollTo({top:0,behavior:behavior()});return;}
  if(id==='explore'){if(scroll)alignBrowser();return;}
  const target=document.getElementById(id);const view=target?.closest('[data-view]');
  if(!view)return;
  selectView(view.dataset.view,{scroll});
  if(target.dataset.coursePanel)selectCourse(target.dataset.coursePanel);
  if(scroll && (id==='physics-lab'||id==='feedback'))requestAnimationFrame(()=>target.scrollIntoView({behavior:behavior(),block:'start'}));
  syncLocale();
 }
 document.addEventListener('click',e=>{
  if(e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  const a=e.target.closest('a[href^="#"]');if(!a)return;
  const fromMenu=!!a.closest('.quick-menu');
  if(quickMenu)quickMenu.open=false;
  if(fromMenu)requestAnimationFrame(()=>document.querySelector('[data-view]:not([hidden])')?.focus({preventScroll:true}));
  if(a.hash==='#contact'){e.preventDefault();openContact(a);return;}
  const target=document.getElementById(a.hash.slice(1));if(!target)return;
  if(a.hash==='#main')return; // preserve the native skip-link semantics
  e.preventDefault();setHash(a.hash);route(a.hash,{scroll:true});
 });
 function historyRoute(){
  if(handledHash===location.hash)return;handledHash=location.hash;
  if(contactDialog?.open && location.hash!=='#contact')contactDialog.close();
  if(!location.hash){selectView('teaching');selectCourse('common');window.scrollTo({top:0,behavior:behavior()});}
  else route(location.hash,{scroll:true});
 }
 window.addEventListener('popstate',historyRoute);
 window.addEventListener('hashchange',historyRoute);
 // Dismiss the shortcut menu without trapping focus or blocking page scrolling.
 document.addEventListener('click',e=>{if(quickMenu?.open&&!quickMenu.contains(e.target))quickMenu.open=false;});
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&quickMenu?.open){e.preventDefault();quickMenu.open=false;quickMenu.querySelector('summary').focus();}
 });
 // Copy with visible feedback, and a selectable-text fallback when clipboard permission is unavailable.
 async function copy(text,button){
  const status=button.closest('.contact-dialog')?.querySelector('.copy-status')||document.querySelector('.browse-footer .copy-status');
  let done=false;
  try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);done=true;}}catch(_){}
  if(!done){
   const holder=button.closest('.contact-dialog')||document.body;
   const area=document.createElement('textarea');area.value=text;area.style.cssText='position:fixed;opacity:0;top:0;left:0';holder.append(area);area.select();
   try{done=document.execCommand('copy');}catch(_){}
   area.remove();button.focus({preventScroll:true});
  }
  if(done){
   const original=button.dataset.originalLabel||button.textContent;button.dataset.originalLabel=original;button.textContent=t('已复制 ✓','已複製 ✓');
   if(status)status.textContent=t('已复制，可以粘贴到聊天中。','已複製，可以貼到聊天中。');
   clearTimeout(button._labelTimer);button._labelTimer=setTimeout(()=>{button.textContent=original;},2200);
  }else{
   let area=button.parentElement.querySelector('.copy-manual');
   if(!area){area=document.createElement('textarea');area.className='copy-manual';area.readOnly=true;area.setAttribute('aria-label',t('请手动复制以下内容','請手動複製以下內容'));button.after(area);}
   area.value=text;area.focus();area.select();if(status)status.textContent=t('浏览器未允许自动复制，请选中下方文字复制。','瀏覽器未允許自動複製，請選取下方文字複製。');
  }
 }
 document.querySelector('[data-copy-inquiry]')?.addEventListener('click',e=>copy(template.value,e.currentTarget));
 document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copy(b.dataset.copy,b)));
 document.querySelector('.share-section')?.addEventListener('click',e=>{
  const url=new URL(document.querySelector('link[rel="canonical"]').href);url.hash=location.hash && location.hash!=='#top'?location.hash:'#'+active;copy(url.href,e.currentTarget);
 });
 // Swipeable feedback gallery, with button and keyboard alternatives.
 const gallery=document.querySelector('.student-media-grid');
 const prev=document.querySelector('[data-gallery-prev]'),next=document.querySelector('[data-gallery-next]'),position=document.querySelector('[data-gallery-position]');
 if(gallery&&prev&&next){
  const cards=[...gallery.querySelectorAll('.student-shot')];
  const step=()=> (cards[0]?.getBoundingClientRect().width||280)+(parseFloat(getComputedStyle(gallery).columnGap)||0);
  const sync=()=>{if(!gallery.clientWidth)return;const max=Math.max(0,gallery.scrollWidth-gallery.clientWidth);prev.disabled=gallery.scrollLeft<=2;next.disabled=gallery.scrollLeft>=max-2;const first=Math.min(cards.length,Math.round(gallery.scrollLeft/step())+1);const visible=Math.max(1,Math.floor((gallery.clientWidth+20)/step()));const last=Math.min(cards.length,first+visible-1);position.textContent=(first===last?first:first+'–'+last)+' / '+cards.length;};
  const advance=d=>gallery.scrollBy({left:d*step(),behavior:behavior()});
  prev.addEventListener('click',()=>advance(-1));next.addEventListener('click',()=>advance(1));
  gallery.addEventListener('scroll',sync,{passive:true});
  gallery.addEventListener('keydown',e=>{if(e.target!==gallery)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();advance(e.key==='ArrowRight'?1:-1);}});
  browser.addEventListener('education:view',()=>requestAnimationFrame(sync));
  if('ResizeObserver'in window)new ResizeObserver(sync).observe(gallery);
 }
 const imageDialog=document.querySelector('.image-dialog');
 if(imageDialog&&typeof imageDialog.showModal==='function'){
  const links=[...document.querySelectorAll('.student-media-grid [data-lightbox]')];
  const image=imageDialog.querySelector('.dialog-image'),title=imageDialog.querySelector('#image-dialog-title');
  let trigger=null,index=-1;
  const controls=document.createElement('div');controls.className='dialog-controls';
  const counter=document.createElement('span');counter.className='dialog-counter';counter.setAttribute('aria-live','polite');
  const left=document.createElement('button'),right=document.createElement('button'),zoom=document.createElement('button');
  [left,right,zoom].forEach(b=>b.type='button');left.textContent='←';right.textContent='→';left.setAttribute('aria-label',t('上一条记录','上一條記錄'));right.setAttribute('aria-label',t('下一条记录','下一條記錄'));
  controls.append(counter,left,right,zoom);imageDialog.querySelector('.dialog-toolbar').after(controls);
  const canvas=document.createElement('div');canvas.className='dialog-canvas';image.before(canvas);canvas.append(image);
  function display(link){
   const thumb=link.querySelector('img');index=links.indexOf(link);image.src=link.href;image.alt=thumb?.alt||'';title.textContent=image.alt;
   imageDialog.classList.toggle('is-qr',link.classList.contains('qr-image-link'));imageDialog.classList.remove('is-zoomed');
   controls.hidden=index<0;counter.textContent=(index+1)+' / '+links.length;left.disabled=index<=0;right.disabled=index>=links.length-1;
   zoom.textContent=t('放大阅读','放大閱讀');zoom.setAttribute('aria-pressed','false');canvas.scrollTo(0,0);
  }
  document.querySelectorAll('[data-lightbox]').forEach(link=>link.addEventListener('click',e=>{
   if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();trigger=link;display(link);lock(imageDialog);if(!imageDialog.open)imageDialog.showModal();
  }));
  function change(d){if(index+d<0||index+d>=links.length)return;display(links[index+d]);}
  left.addEventListener('click',()=>change(-1));right.addEventListener('click',()=>change(1));
  zoom.addEventListener('click',()=>{const yes=imageDialog.classList.toggle('is-zoomed');imageDialog.style.setProperty('--zoom-width',Math.max(image.naturalWidth,canvas.clientWidth*1.6)+'px');zoom.textContent=yes?t('适应窗口','適應視窗'):t('放大阅读','放大閱讀');zoom.setAttribute('aria-pressed',String(yes));});
  imageDialog.addEventListener('keydown',e=>{if(index<0)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();change(e.key==='ArrowRight'?1:-1);}});
  bindClose(imageDialog,imageDialog.querySelector('[data-dialog-close]'),()=>{if(trigger?.isConnected)trigger.focus({preventScroll:true});});
 }
 // A small illustrative travelling wave; paused outside the viewport and in reduced-motion mode.
 const wave=document.querySelector('[data-wave-preview]');
 if(wave){
  const curve=wave.querySelector('.wave-curve'),marker=wave.querySelector('.wave-marker');
  const range=wave.querySelector('input'),toggle=wave.querySelector('.wave-toggle');
  let playing=!motion.matches,visible=false,frame=0,time=0,last=0;
  const draw=()=>{
   const amplitude=Number(range.value)||18;
   const y=x=>60-amplitude*Math.sin(x/320*4*Math.PI-time);
   const points=Array.from({length:81},(_,i)=>(i?'L':'M')+(i*4)+','+y(i*4).toFixed(2));
   curve.setAttribute('d',points.join(' '));marker.setAttribute('cy',y(80).toFixed(2));
  };
  const tick=now=>{
   frame=0;
   if(!playing||!visible||document.hidden){last=0;return;}
   if(last)time+=Math.min(now-last,60)/1000*1.5;
   last=now;draw();frame=requestAnimationFrame(tick);
  };
  const sync=()=>{
   toggle.textContent=playing?t('暂停','暫停'):t('播放','播放');
   toggle.setAttribute('aria-pressed',String(playing));
   toggle.setAttribute('aria-label',playing?t('暂停波形动画','暫停波形動畫'):t('播放波形动画','播放波形動畫'));
   if(frame)cancelAnimationFrame(frame);frame=0;last=0;
   if(playing&&visible&&!document.hidden)frame=requestAnimationFrame(tick);
  };
  toggle.addEventListener('click',()=>{playing=!playing;sync();});
  range.addEventListener('input',draw);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.15}).observe(wave);
  else{visible=true;sync();}
  document.addEventListener('visibilitychange',sync);
  motion.addEventListener?.('change',()=>{if(motion.matches){playing=false;sync();}});
  draw();sync();
 }
 const back=document.querySelector('.back-top');
 const updateBack=()=>{if(back)back.hidden=scrollY<600;};
 back?.addEventListener('click',()=>window.scrollTo({top:0,behavior:behavior()}));
 window.addEventListener('scroll',updateBack,{passive:true});
 // A printed/saved copy contains all content, including collapsed details.
 let printDetails=[];
 window.addEventListener('beforeprint',()=>{printDetails=[...document.querySelectorAll('details')].map(d=>[d,d.open]);printDetails.forEach(([d])=>d.open=true);});
 window.addEventListener('afterprint',()=>printDetails.forEach(([d,o])=>d.open=o));
 if('ResizeObserver'in window){const observer=new ResizeObserver(measure);if(header)observer.observe(header);if(bar)observer.observe(bar);}
 window.addEventListener('resize',measure,{passive:true});
 root.classList.replace('no-js','js');root.classList.add('is-tabbed');
 measure();selectView('teaching');
 if(location.hash)route(location.hash,{scroll:true});
 updateBack();
})();
