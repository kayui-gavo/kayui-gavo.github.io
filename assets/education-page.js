/* Education page interaction enhancement.
   All informational content is rendered in education/index.html. */
(() => {
  'use strict';
  document.documentElement.classList.replace('no-js','js');
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton = $('.menu-button');
  const nav = $('#education-navigation');
  const contact = $('#contact');
  const heroConsult = $('.hero-actions .btn-primary');
  const mobileConsult = $('.mobile-consult-bar');
  const topButton = $('.education-to-top');
  const courseTabs = $$('.course-tab');
  const coursePanels = $$('.course-panel');
  let menuOpen = false;
  let contactVisible = false;
  let heroVisible = true;

  const setMenu = value => {
    menuOpen = !!value;
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', String(menuOpen));
    nav.classList.toggle('is-open', menuOpen);
    if (menuOpen) nav.querySelector('a')?.focus({preventScroll:true});
    updateFloating();
  };
  menuButton?.addEventListener('click', () => setMenu(!menuOpen));
  nav?.addEventListener('click', event => {if(event.target.closest('a[href^="#"]'))setMenu(false)});
  document.addEventListener('click', event => {
    if (menuOpen && !nav?.contains(event.target) && !menuButton?.contains(event.target)) setMenu(false);
  });

  function setCourse(index, focus=false){
    courseTabs.forEach((tab,i)=>{
      const selected=i===index;
      tab.setAttribute('aria-selected',String(selected));
      tab.tabIndex=selected?0:-1;
      const panel=coursePanels[i];
      if(panel)panel.hidden=!selected;
    });
    if(focus)courseTabs[index]?.focus({preventScroll:true});
  }
  courseTabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>setCourse(index));
    tab.addEventListener('keydown',event=>{
      let next=index;
      if(event.key==='ArrowRight'||event.key==='ArrowDown') next=(index+1)%courseTabs.length;
      else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+courseTabs.length)%courseTabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=courseTabs.length-1;
      else return;
      event.preventDefault();setCourse(next,true);
    });
  });
  if(courseTabs.length)setCourse(0);

  // Native dialog provides focus containment and background inertness.
  const dialogs=$$('dialog');
  const openModal=(dialog,trigger)=>{
    if(!dialog)return;
    if(dialog.open)return;
    dialog.dataset.returnFocus=trigger?.id||'';
    dialog._returnFocus=trigger||document.activeElement;
    setMenu(false);
    dialog.showModal();
    $('.dialog-toolbar button',dialog)?.focus({preventScroll:true});
    updateFloating();
  };
  const closeModal=dialog=>{
    if(!dialog?.open)return;
    dialog.close();
  };
  dialogs.forEach(dialog=>{
    $$('[data-close-dialog]',dialog).forEach(button=>button.addEventListener('click',()=>closeModal(dialog)));
    dialog.addEventListener('click',event=>{
      if(event.target===dialog)closeModal(dialog);
    });
    dialog.addEventListener('close',()=>{
      dialog._returnFocus?.focus?.({preventScroll:true});
      updateFloating();
    });
  });
  $$('[data-open-dialog]').forEach(trigger=>{
    trigger.addEventListener('click',()=>{
      const dialog=document.getElementById(trigger.dataset.openDialog);
      openModal(dialog,trigger);
    });
  });

  // Existing six original, anonymized screenshot files; no data is recreated.
  const gallery=$('.student-media-grid');
  const cards=$$('.student-shot',gallery||document);
  const galleryDialog=$('#student-gallery-dialog');
  const galleryImg=$('#student-gallery-image');
  const galleryCaption=$('#student-gallery-caption');
  const galleryCount=$('#student-gallery-count');
  const sliderCount=$('#student-slider-count');
  let galleryIndex=0;
  const formatCount=(index,length)=>String(index+1).padStart(2,'0')+' / '+String(length).padStart(2,'0');
  const renderGallery=index=>{
    if(!cards.length)return;
    galleryIndex=(index+cards.length)%cards.length;
    const card=cards[galleryIndex];
    const source=$('img',card);
    if(galleryImg&&source){
      galleryImg.src=source.currentSrc||source.src;
      galleryImg.alt=source.alt||'教学与录取记录';
    }
    if(galleryCaption)galleryCaption.textContent=$('figcaption',card)?.textContent||'教学与录取记录';
    if(galleryCount)galleryCount.textContent=formatCount(galleryIndex,cards.length);
    if(sliderCount)sliderCount.textContent=formatCount(galleryIndex,cards.length);
  };
  cards.forEach((card,index)=>{
    const trigger=$('button[data-gallery-open]',card);
    trigger?.addEventListener('click',()=>{renderGallery(index);openModal(galleryDialog,trigger)});
  });
  $('#gallery-prev')?.addEventListener('click',()=>renderGallery(galleryIndex-1));
  $('#gallery-next')?.addEventListener('click',()=>renderGallery(galleryIndex+1));
  galleryDialog?.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();renderGallery(galleryIndex-1)}
    if(event.key==='ArrowRight'){event.preventDefault();renderGallery(galleryIndex+1)}
  });
  const scrollGallery=(direction)=>{
    if(!gallery||!cards.length)return;
    const width=cards[0].getBoundingClientRect().width+12;
    gallery.scrollBy({left:direction*width,behavior:reduceMotion?'instant':'smooth'});
  };
  $('#gallery-scroll-prev')?.addEventListener('click',()=>scrollGallery(-1));
  $('#gallery-scroll-next')?.addEventListener('click',()=>scrollGallery(1));
  if(gallery&&cards.length){
    let frame=0;
    const sync=()=>{
      frame=0;
      const gridRect=gallery.getBoundingClientRect();
      let closest=0,distance=Infinity;
      cards.forEach((card,index)=>{
        const rect=card.getBoundingClientRect();
        const delta=Math.abs(rect.left-gridRect.left);
        if(delta<distance){distance=delta;closest=index}
      });
      if(sliderCount)sliderCount.textContent=formatCount(closest,cards.length);
    };
    gallery.addEventListener('scroll',()=>{
      if(!frame)frame=requestAnimationFrame(sync);
    },{passive:true});
    sync();
  }

  const qq='1024075295';
  const copyButton=$('#copy-qq');
  const copyStatus=$('#qq-copy-status');
  copyButton?.addEventListener('click',async()=>{
    let success=false;
    try{
      if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(qq);success=true}
      else {
        const field=document.createElement('textarea');
        field.value=qq;field.setAttribute('readonly','');field.style.position='fixed';
        field.style.left='-9999px';document.body.appendChild(field);
        field.select();success=document.execCommand('copy');field.remove();
      }
    }catch(_){}
    if(copyStatus)copyStatus.textContent=success?'已复制 QQ 号：'+qq:'无法自动复制，请手动复制：'+qq;
    copyButton.textContent=success?'复制成功':'复制 QQ 号';
  });

  // Keep the existing mobile consultation entry but suppress it in modals,
  // while viewing contact, or while the mobile navigation panel is open.
  function updateFloating(){
    const dialogOpen=dialogs.some(dialog=>dialog.open);
    const showMobile=!heroVisible&&!contactVisible&&!menuOpen&&!dialogOpen;
    mobileConsult?.classList.toggle('is-visible',showMobile);
    const showTop=window.scrollY>650&&!dialogOpen&&!menuOpen;
    topButton?.classList.toggle('is-visible',showTop);
  }
  if('IntersectionObserver' in window){
    if(heroConsult)new IntersectionObserver(entries=>{
      heroVisible=entries[0]?.isIntersecting??true;updateFloating();
    },{threshold:0.02}).observe(heroConsult);
    if(contact)new IntersectionObserver(entries=>{
      contactVisible=entries[0]?.isIntersecting??false;updateFloating();
    },{threshold:0.03}).observe(contact);
  }else{
    const calc=()=>{
      heroVisible=heroConsult?heroConsult.getBoundingClientRect().bottom>70:false;
      contactVisible=contact?contact.getBoundingClientRect().top<innerHeight&&contact.getBoundingClientRect().bottom>0:false;
      updateFloating();
    };
    window.addEventListener('scroll',calc,{passive:true});calc();
  }
  window.addEventListener('scroll',updateFloating,{passive:true});
  window.addEventListener('resize',()=>{
    if(innerWidth>767&&menuOpen)setMenu(false);
    updateFloating();
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&menuOpen)setMenu(false);
  });
  topButton?.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'}));

  // Native hash navigation stays intact: back/forward, reload and anchors work.
  const tracked=['teaching','record','planning','graduate','experience','contact'];
  const trackedLinks=$$('.nav-links a[href^="#"]');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        trackedLinks.forEach(link=>{
          if(link.getAttribute('href')==='#'+entry.target.id)link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      });
    },{rootMargin:'-18% 0px -68% 0px'});
    tracked.forEach(id=>{const section=document.getElementById(id);if(section)observer.observe(section)});
  }
  // Browser jumps after loading images; do not intercept page scroll.
  updateFloating();
})();
