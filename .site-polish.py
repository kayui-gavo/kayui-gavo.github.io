from pathlib import Path
import json, re
from PIL import Image, ImageDraw, ImageFont, ImageOps

BASE = 'https://kayui-gavo.github.io/'
PORTRAIT = BASE + 'assets/portrait.webp'
OG = BASE + 'assets/og-cover.png'

def replace_once(text, old, new, label):
    if old not in text:
        raise RuntimeError(f'missing replacement target: {label}')
    return text.replace(old, new, 1)

pages = {
    'index.html': {
        'canonical': BASE,
        'lang': 'en',
        'title': 'Kewei Liu | Speech, Multimodal Interaction & Education',
        'description': 'Kewei Liu is an M.S. student at The University of Tokyo studying speech, language, and multimodal interaction for Japanese-language learning, and works on education R&D and product development.',
        'lede_old': 'M.S. student at The University of Tokyo, researching speaking support for Japanese learners through speech, language, and multimodal interaction.',
        'lede_new': 'M.S. student at The University of Tokyo studying speech, language, and multimodal interaction for Japanese-language learning.',
        'research_old': 'I study speaking support for Japanese learners through speech and language processing and multimodal interaction. My undergraduate work on emotion-transition-controllable video summarization was accepted at APSIPA ASC 2026.',
        'research_new': 'I study how speech, language, and visual context can support spontaneous speaking by Japanese learners. My undergraduate work on emotion-transition-controllable video summarization was accepted at APSIPA ASC 2026.',
        'education_old': 'At China Tabito Education Group, I work on education R&D, curriculum and learning design, teaching materials, educational content, and education product development. My work draws on four years of mathematics and physics teaching and admissions advising, plus teaching-support roles at Kyoto University.',
        'education_new': 'At China Tabito Education Group, I work on education R&D, curriculum and learning design, teaching materials, educational content, and education product development. This work draws on four years of mathematics and physics teaching and admissions advising, together with teaching-support roles at Kyoto University.',
        'intern_old': '<span>Sony · AI / Creator Cloud Services · 2026</span><span>Rakuten · Summer Internship · 2026</span>',
        'intern_new': '<span>Sony · 2026</span><span>Rakuten · 2026</span>',
        'cv_old': '<a class="cv-link" href="./cv/">View CV <span>→</span></a>',
        'cv_new': '<a class="cv-link" href="./cv/">View CV <span>→</span></a><a class="cv-pdf-link" href="./cv/kewei-liu-cv.pdf" download>PDF <span>↓</span></a>',
    },
    'ja/index.html': {
        'canonical': BASE + 'ja/',
        'lang': 'ja',
        'title': '劉 可惟 | 音声言語処理・マルチモーダルインタラクション・教育',
        'description': '東京大学大学院工学系研究科電気系工学専攻の修士課程で、日本語学習者の発話支援、音声・言語処理、マルチモーダルインタラクションを研究する劉可惟の個人サイト。中国旅人教育集团株式会社では教育研究、カリキュラム設計、教材・教育プロダクト開発にも携わる。',
        'lede_old': '東京大学大学院工学系研究科の修士課程で、峯松・齋藤研究室に所属し、日本語学習者の発話支援を中心に研究しています。',
        'lede_new': '東京大学大学院工学系研究科の修士課程で、峯松・齋藤研究室に所属し、音声・言語処理とマルチモーダルインタラクションを用いた日本語学習者の発話支援を研究しています。',
        'research_old': '現在は、日本語学習者の発話支援をテーマに、音声・言語処理とマルチモーダルインタラクションを研究しています。学部で取り組んだ情動遷移を制御可能な映像要約の研究は、APSIPA ASC 2026 に採択されました。',
        'research_new': '現在は、音声・言語情報と視覚的な状況理解を組み合わせ、日本語学習者の自発的な発話を支援する研究に取り組んでいます。学部で取り組んだ情動遷移を制御可能な映像要約の研究は、APSIPA ASC 2026 に採択されました。',
        'education_old': '中国旅人教育集团株式会社（旅人教育）の株主として、教育研究、カリキュラム・学習設計、教材・教育コンテンツ、教育プロダクト開発に携わっています。行知学園関西校での4年間の数学・物理指導と進学指導、京都大学でのOA・留学生チューター経験を実務に生かしています。',
        'education_new': '中国旅人教育集团株式会社（旅人教育）の株主として、教育研究、カリキュラム・学習設計、教材開発、教育コンテンツ・プロダクトの企画開発に携わっています。行知学園関西校での4年間の数学・物理指導と進学指導、京都大学でのOA・留学生チューター経験を実務に生かしています。',
        'intern_old': '<span>ソニー · AI活用・クリエイター向けクラウドサービス · 2026</span><span>楽天 · 夏の陣 · 2026</span>',
        'intern_new': '<span>ソニー · 2026</span><span>楽天「夏の陣」· 2026</span>',
        'cv_old': '<a class="cv-link" href="../cv/">CVを見る <span>→</span></a>',
        'cv_new': '<a class="cv-link" href="../cv/">CVを見る <span>→</span></a><a class="cv-pdf-link" href="../cv/kewei-liu-cv.pdf" download>PDF <span>↓</span></a>',
    },
    'zh-cn/index.html': {
        'canonical': BASE + 'zh-cn/',
        'lang': 'zh-CN',
        'title': '刘可惟 | 语音语言处理、多模态交互与教育',
        'description': '刘可惟，东京大学工学系研究科电气系工学专攻硕士生，研究日语学习者口语表达支持、语音语言处理与多模态交互，并在中国旅人教育集团株式会社参与教研、课程设计、教材与教育产品开发。',
        'lede_old': '现就读于东京大学工学系研究科电气系工学专攻硕士课程，在峯松・齋藤研究室研究日语学习者的口语表达支持。',
        'lede_new': '现就读于东京大学工学系研究科电气系工学专攻硕士课程，在峯松・齋藤研究室研究日语学习者的自发口语表达支持。',
        'research_old': '目前围绕日语学习者的口语表达支持，研究语音语言处理与多模态交互。本科阶段完成的可控制情绪变化过程的视频摘要研究已被 APSIPA ASC 2026 录用。',
        'research_new': '目前结合语音、语言与视觉情境理解，研究如何支持日语学习者的自发口语表达。本科阶段完成的情绪变化轨迹可控视频摘要研究已被 APSIPA ASC 2026 录用。',
        'education_old': '目前作为中国旅人教育集团株式会社股东，参与教研、课程与学习设计、教材与教育内容开发，以及教育产品开发。此前在行知学园关西校有4年数学、物理教学与升学指导经验，也曾在京都大学担任电气电子回路 OA 和留学生辅导员。',
        'education_new': '目前作为中国旅人教育集团株式会社股东，参与教研、课程与学习设计、教材与教育内容开发，以及教育产品开发。此前在行知学园关西校有4年数学、物理教学与升学指导经验，并曾在京都大学担任电气电子回路 OA 和留学生辅导员。',
        'intern_old': '<span>索尼 · AI × 创作者云服务 · 2026</span><span>乐天 · 夏之阵 · 2026</span>',
        'intern_new': '<span>索尼 · 2026</span><span>乐天「夏之阵」· 2026</span>',
        'cv_old': '<a class="cv-link" href="../cv/">查看 CV <span>→</span></a>',
        'cv_new': '<a class="cv-link" href="../cv/">查看 CV <span>→</span></a><a class="cv-pdf-link" href="../cv/kewei-liu-cv.pdf" download>PDF <span>↓</span></a>',
    },
    'zh-tw/index.html': {
        'canonical': BASE + 'zh-tw/',
        'lang': 'zh-TW',
        'title': '劉可惟｜語音語言處理、多模態互動與教育',
        'description': '劉可惟，東京大學工學系研究科電氣系工學專攻碩士生，研究日語學習者的口語表達支援、語音語言處理與多模態互動，並在中国旅人教育集团株式会社參與教育研究、課程設計、教材與教育產品開發。',
        'lede_old': '目前就讀東京大學工學系研究科電氣系工學專攻碩士班，在峯松・齋藤研究室研究日語學習者的口語表達支援。',
        'lede_new': '目前就讀東京大學工學系研究科電氣系工學專攻碩士班，在峯松・齋藤研究室研究日語學習者的自發口語表達支援。',
        'research_old': '目前以日語學習者的口語表達支援為主題，研究語音語言處理與多模態互動。大學期間完成的可控制情緒變化歷程之影片摘要研究，已獲 APSIPA ASC 2026 接受。',
        'research_new': '目前結合語音、語言與視覺情境理解，研究如何支援日語學習者的自發口語表達。大學期間完成的情緒變化軌跡可控影片摘要研究，已獲 APSIPA ASC 2026 接受發表。',
        'education_old': '目前以中国旅人教育集团株式会社股東身分，參與教育研究、課程與學習設計、教材與教育內容開發，以及教育產品開發。過去曾在行知學園關西校累積4年數學、物理教學與升學輔導經驗，也曾在京都大學擔任電氣電子回路 OA 與國際學生輔導員。',
        'education_new': '目前為中国旅人教育集团株式会社股東，參與教育研究、課程與學習設計、教材與教學內容開發，以及教育產品規劃與開發。過去曾在行知學園關西校累積4年數學、物理教學與升學輔導經驗，也曾在京都大學擔任電氣電子回路 OA 與國際學生輔導員。',
        'intern_old': '<span>Sony · AI × 創作者雲端服務 · 2026</span><span>樂天 · 夏之陣 · 2026</span>',
        'intern_new': '<span>Sony · 2026</span><span>樂天「夏之陣」· 2026</span>',
        'cv_old': '<a class="cv-link" href="../cv/">查看 CV <span>→</span></a>',
        'cv_new': '<a class="cv-link" href="../cv/">查看 CV <span>→</span></a><a class="cv-pdf-link" href="../cv/kewei-liu-cv.pdf" download>PDF <span>↓</span></a>',
    },
}

for path_str, cfg in pages.items():
    p = Path(path_str)
    text = p.read_text(encoding='utf-8')
    text = text.replace('hreflang="zh-Hans"', 'hreflang="zh-CN"')
    text = text.replace('hreflang="zh-Hant-TW"', 'hreflang="zh-TW"')
    text = text.replace(' aria-live="polite"', '')
    text = replace_once(text, cfg['lede_old'], cfg['lede_new'], path_str + ' lede')
    text = replace_once(text, cfg['research_old'], cfg['research_new'], path_str + ' research')
    text = replace_once(text, cfg['education_old'], cfg['education_new'], path_str + ' education')
    text = replace_once(text, cfg['intern_old'], cfg['intern_new'], path_str + ' internship')
    text = replace_once(text, cfg['cv_old'], cfg['cv_new'], path_str + ' cv pdf')
    text = re.sub(r'<meta property="og:image" content="[^"]+">', f'<meta property="og:image" content="{OG}">', text, count=1)
    head_block = f'''<meta property="og:site_name" content="Kewei Liu">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:alt" content="Kewei Liu personal website">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="{OG}">\n<meta name="author" content="Kewei Liu">\n<meta name="theme-color" content="#f7f2e9">\n<link rel="icon" href="/favicon.ico" sizes="any">\n<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">\n<link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48.png">\n<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">\n'''
    style_match = re.search(r'<link rel="stylesheet" href="[^"]+">', text)
    if not style_match:
        raise RuntimeError('stylesheet marker missing: ' + path_str)
    text = text[:style_match.start()] + head_block + text[style_match.start():]
    person = {
        '@type': 'Person', '@id': BASE + '#person', 'name': 'Kewei Liu',
        'alternateName': ['劉 可惟', '刘可惟', '劉可惟'], 'url': BASE,
        'image': PORTRAIT, 'description': cfg['description'], 'email': 'mailto:ryukayuiii@gmail.com',
        'affiliation': {'@type': 'CollegeOrUniversity', 'name': 'The University of Tokyo'},
        'alumniOf': {'@type': 'CollegeOrUniversity', 'name': 'Kyoto University'},
        'worksFor': {'@type': 'Organization', 'name': 'China Tabito Education Group', 'url': 'https://www.tabitoedu.com'},
        'sameAs': ['https://github.com/kayui-gavo','https://www.linkedin.com/in/kayui-ryu/','https://x.com/ryukayuiii']
    }
    graph = {'@context':'https://schema.org','@type':'ProfilePage','@id':cfg['canonical']+'#profile','url':cfg['canonical'],'name':cfg['title'],'inLanguage':cfg['lang'],'mainEntity':person}
    script = '<script type="application/ld+json">' + json.dumps(graph, ensure_ascii=False, separators=(',', ':')) + '</script>'
    text, n = re.subn(r'<script type="application/ld\+json">.*?</script>', script, text, count=1, flags=re.S)
    if n != 1:
        raise RuntimeError('JSON-LD replacement failed: ' + path_str)
    p.write_text(text, encoding='utf-8')

css_path = Path('assets/style.css')
css = css_path.read_text(encoding='utf-8')
css = replace_once(css, '  --rose:#b66f72;\n  --gold:#b59660;', '  --rose:#b66f72;\n  --rose-text:#a15b5e;\n  --gold:#b59660;\n  --gold-text:#87683b;', 'color tokens')
css = css.replace('  --muted-light:#938a81;', '  --muted-light:#736a62;')
css = css.replace('color:var(--gold)', 'color:var(--gold-text)')
css = css.replace('color:var(--rose)', 'color:var(--rose-text)')
css = css.replace('font-size:12.45px;line-height:1.68', 'font-size:13.1px;line-height:1.7')
css = css.replace('margin-top:11px;color:#66605a;font-size:11px', 'margin-top:11px;color:#625d58;font-size:11.6px')
css = css.replace('font-size:9.25px;line-height:1.35', 'font-size:9.7px;line-height:1.4')
css = css.replace('font-size:11.6px;line-height:1.72', 'font-size:12.4px;line-height:1.72')
css = css.replace('margin-top:13px;font-size:10.15px', 'margin-top:13px;font-size:10.9px')
css = css.replace('margin-top:18px;gap:10px;font-size:10.7px', 'margin-top:18px;gap:10px;font-size:11.1px')
css = css.replace('font-size:10.6px;color:#625d58', 'font-size:11.2px;color:#625d58')
css = css.replace('font-size:8.1px;letter-spacing:.17em;text-transform:uppercase;color:#988b79', 'font-size:8.8px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted-light)')
css = css.replace('color:#a58f69;padding-top:2px', 'color:var(--gold-text);padding-top:2px')
css = css.replace('transform:scale(1.006)', 'transform:none')
css = replace_once(css, '.cv-link span{transition:transform .18s ease}.cv-link:hover span{transform:translateX(3px)}', '.cv-link span{transition:transform .18s ease}.cv-link:hover span{transform:translateX(3px)}\n.cv-pdf-link{display:inline-flex;align-items:center;gap:6px;font-family:var(--serif);font-size:10.8px;color:var(--muted);padding-bottom:3px}\n.cv-pdf-link span{color:var(--gold-text);transition:transform .18s ease}.cv-pdf-link:hover{color:var(--navy)}.cv-pdf-link:hover span{transform:translateY(2px)}', 'pdf link style')
css = css.replace('  .lede{font-size:12px;line-height:1.65}', '  .lede{font-size:12.6px;line-height:1.68}')
css = css.replace('  .detail-panel p{max-width:none;font-size:11.7px;line-height:1.72}', '  .detail-panel p{max-width:none;font-size:12.3px;line-height:1.72}')
css = css.replace('  .proofs{font-size:10.35px;gap:7px;margin-top:14px}', '  .proofs{font-size:10.8px;gap:7px;margin-top:14px}')
css = css.replace('  .portrait-column{width:min(82vw,365px);margin-left:3vw;padding-left:17px}', '  .portrait-column{grid-row:2;width:min(72vw,288px);justify-self:center;margin-left:0;padding-left:15px}')
css = css.replace('  .portrait-column{width:min(86vw,348px);margin-left:1vw}', '  .portrait-column{width:min(74vw,280px);margin-left:0}')
css = css.replace('  .portrait-column{width:88vw;padding-left:15px}', '  .portrait-column{width:min(78vw,258px);padding-left:14px}')
css = replace_once(css, '  .landing{width:calc(100% - 28px);padding:26px 0 42px;gap:34px}\n  .portrait-column{grid-row:2;', '  .landing{width:calc(100% - 28px);padding:24px 0 42px;gap:29px}\n  .editorial{display:contents}\n  .identity{grid-row:1}\n  .portrait-column{grid-row:2;', 'mobile display contents')
css = replace_once(css, '  .explore{display:block;padding-top:17px}', '  .explore{grid-row:3;display:block;padding-top:7px}', 'mobile explore row')
css = replace_once(css, '  .utility{display:block;margin-top:18px}', '  .utility{grid-row:4;display:block;margin-top:10px}', 'mobile utility row')
css = re.sub(r'^\s*html\[lang="en"\] \.topic\[data-topic="internships"\] \.topic-label\{font-size:[^}]+\}\n?', '', css, flags=re.M)
css = css.replace('  .topic-label{display:block;font-size:12.4px;line-height:1.1}', '  .topic-label{display:block;font-size:12.1px;line-height:1.1}')
css = css.replace('  .topic-label{font-size:11.7px}', '  .topic-label{font-size:11.4px}')
css_path.write_text(css, encoding='utf-8')

Path('assets/motion.js').write_text(r'''(()=>{
  const shell=document.querySelector('.site-shell');
  const landing=document.querySelector('.landing');
  const frame=document.querySelector('.portrait-frame');
  const tablist=document.querySelector('.section-index');
  const tabs=[...document.querySelectorAll('.topic[role="tab"]')];
  const panels=[...document.querySelectorAll('.detail-panel[role="tabpanel"]')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover=matchMedia('(hover:hover) and (pointer:fine)').matches;
  document.documentElement.classList.add('motion-ready');
  let committed=tabs.find(tab=>tab.getAttribute('aria-selected')==='true')?.dataset.topic || tabs[0]?.dataset.topic;
  const showPanel=(topic)=>{if(!topic)return;if(shell)shell.dataset.topic=topic;panels.forEach(panel=>{const active=panel.dataset.panel===topic;panel.classList.toggle('is-active',active);panel.hidden=!active;panel.setAttribute('aria-hidden',active?'false':'true')})};
  const commitTopic=(topic,{focus=false}={})=>{if(!topic)return;committed=topic;tabs.forEach(tab=>{const active=tab.dataset.topic===topic;tab.setAttribute('aria-selected',active?'true':'false');tab.tabIndex=active?0:-1;if(active&&focus)tab.focus({preventScroll:true})});showPanel(topic)};
  tabs.forEach((tab,index)=>{if(canHover)tab.addEventListener('mouseenter',()=>showPanel(tab.dataset.topic));tab.addEventListener('click',()=>commitTopic(tab.dataset.topic));tab.addEventListener('keydown',event=>{const keys=['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'];if(!keys.includes(event.key))return;event.preventDefault();let next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+tabs.length)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;commitTopic(tabs[next].dataset.topic,{focus:true})})});
  if(canHover)tablist?.addEventListener('mouseleave',()=>showPanel(committed));commitTopic(committed);
  if(reduced||!canHover||!landing||!frame)return;
  let targetX=0,targetY=0,currentX=0,currentY=0,raf=0;
  const draw=()=>{currentX+=(targetX-currentX)*.055;currentY+=(targetY-currentY)*.055;if(shell){shell.style.setProperty('--mx',currentX.toFixed(3));shell.style.setProperty('--my',currentY.toFixed(3))}frame.style.transform=`perspective(1550px) rotateX(${(-currentY*.18).toFixed(2)}deg) rotateY(${(currentX*.24).toFixed(2)}deg) translate3d(${(-currentX*.38).toFixed(1)}px,${(-currentY*.30).toFixed(1)}px,0)`;if(Math.abs(targetX-currentX)>.001||Math.abs(targetY-currentY)>.001)raf=requestAnimationFrame(draw);else raf=0};
  const requestDraw=()=>{if(!raf)raf=requestAnimationFrame(draw)};
  landing.addEventListener('pointermove',event=>{const rect=landing.getBoundingClientRect();targetX=((event.clientX-rect.left)/rect.width-.5)*2;targetY=((event.clientY-rect.top)/rect.height-.5)*2;requestDraw()},{passive:true});
  landing.addEventListener('pointerleave',()=>{targetX=0;targetY=0;requestDraw()});
})();
''', encoding='utf-8')

Path('cv/index.html').write_text('''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kewei Liu — CV</title>
<meta name="description" content="Curriculum vitae of Kewei Liu, M.S. student at The University of Tokyo working on speech and language processing, multimodal interaction, and education R&D and product development.">
<meta name="robots" content="index,follow">
<meta name="author" content="Kewei Liu">
<meta name="theme-color" content="#f7f2e9">
<link rel="canonical" href="https://kayui-gavo.github.io/cv/">
<meta property="og:type" content="profile"><meta property="og:url" content="https://kayui-gavo.github.io/cv/"><meta property="og:title" content="Kewei Liu — CV"><meta property="og:description" content="Curriculum vitae of Kewei Liu: speech, multimodal interaction, research, and education R&D."><meta property="og:image" content="https://kayui-gavo.github.io/assets/og-cover.png"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
<link rel="stylesheet" href="./cv.css">
</head>
<body><div class="wrap"><div class="top"><a href="../">← Home</a><div class="top-right"><span>Curriculum Vitae</span><a class="pdf" href="./kewei-liu-cv.pdf" download>PDF ↓</a></div></div><main class="sheet">
<header class="cv-head"><div><h1>Kewei Liu</h1><p class="native">劉 可惟</p><p class="subtitle">Speech &amp; Language · Multimodal Interaction · Education R&amp;D</p></div><p class="contact">Tokyo, Japan<br><a href="mailto:liu-kewei@gavo.t.u-tokyo.ac.jp">liu-kewei@gavo.t.u-tokyo.ac.jp</a><br><a href="https://kayui-gavo.github.io/">Website</a> · <a href="https://github.com/kayui-gavo">GitHub</a> · <a href="https://www.linkedin.com/in/kayui-ryu/">LinkedIn</a> · <a href="https://x.com/ryukayuiii">X</a></p></header>
<section class="section"><h2>Education</h2><div class="entry"><div class="entry-head"><h3>The University of Tokyo</h3><span class="date">Apr. 2026 – Mar. 2028 expected</span></div><p class="meta">M.S., Electrical Engineering and Information Systems, Graduate School of Engineering</p><p>Minematsu–Saito Laboratory. Research on speaking support for Japanese learners, speech and language processing, and multimodal interaction.</p></div><div class="entry"><div class="entry-head"><h3>Kyoto University</h3><span class="date">Apr. 2022 – Mar. 2026</span></div><p class="meta">B.Eng., Electrical and Electronic Engineering, Faculty of Engineering</p><p>Yoshii Laboratory. Bachelor's thesis on emotion-transition-controllable video summarization using multimodal emotional features.</p></div></section>
<section class="section"><h2>Current Research</h2><div class="entry"><div class="entry-head"><h3>Speaking Support for Japanese Learners</h3><span class="date">Apr. 2026 – Present</span></div><p class="meta">The University of Tokyo · Minematsu–Saito Laboratory</p><ul><li>Study spontaneous speaking support for Japanese learners using speech, language, and multimodal context.</li><li>Develop multidimensional Japanese pronunciation evaluation covering pronunciation, rhythm, fluency, pitch-related cues, mora timing, and pauses.</li><li>Separate learner-facing feedback from diagnostic logs, suppress scoring when evidence is unreliable, and refine behavior through structured logs, automated tests, and failure review.</li></ul></div></section>
<section class="section"><h2>Publications</h2><div class="entry publication"><p><span class="pub-author">Kewei Liu</span>, Kazuyoshi Yoshii. “Emotion Transition-Controllable Video Summarization Based on Multimodal Emotional Features.” <i>APSIPA Annual Summit and Conference (APSIPA ASC)</i>, 2026. <b>Accepted for presentation.</b></p></div></section>
<section class="section"><h2>Selected Research</h2><div class="entry"><div class="entry-head"><h3>Emotion-Transition-Controllable Video Summarization</h3><span class="date">Undergraduate research</span></div><ul><li>Proposed a video-summarization method that follows a user-specified emotional trajectory while retaining important scenes.</li><li>Integrated visual, audio, and text cues with reliability-aware multimodal fusion and selected scenes in temporal order using dynamic programming.</li><li>Led experiment design, preprocessing, implementation, evaluation, analysis, and manuscript preparation on TVSum.</li></ul></div></section>
<section class="section"><h2>Education &amp; Product</h2><div class="entry"><div class="entry-head"><h3>China Tabito Education Group — Shareholder · Education R&amp;D &amp; Product Development</h3><span class="date">Current</span></div><p class="meta"><a href="https://www.tabitoedu.com">tabitoedu.com</a></p><ul><li>Work on education research, curriculum and learning design, teaching materials, educational content, and education product development for students preparing for Japanese university admissions.</li><li>Design physics curricula and materials for EJU, the Common Test, and university entrance examinations, informed by classroom practice and recurring learner difficulties.</li><li>Continue physics instruction for international students as part of the broader curriculum, content, and product-development work.</li></ul></div></section>
<section class="section"><h2>Experience</h2><div class="entry"><div class="entry-head"><h3>Coach Academy — Former Instructor &amp; Admissions Advisor</h3><span class="date">4 years</span></div><p class="meta">行知学園関西校 · Kansai, Japan</p><ul><li>Taught mathematics and physics in large-group classes and one-to-one lessons for international students.</li><li>Advised on personal statements (志望理由書), oral examinations, interviews, school selection, application schedules, and application planning.</li></ul></div><div class="entry"><div class="entry-head"><h3>Kyoto University — Electrical &amp; Electronic Circuits OA</h3><span class="date">Oct. 2024 – Mar. 2025</span></div><p>Supported circuit-theory coursework and student exercises.</p></div><div class="entry"><div class="entry-head"><h3>Kyoto University — International Student Tutor</h3><span class="date">Apr. 2025 – Mar. 2026</span></div><p>Supported international students with coursework, academic communication, course planning, and university life.</p></div></section>
<section class="section"><h2>Recognition &amp; Activities</h2><div class="entry compact"><p><b>Scholarships:</b> Ichikawa International Scholarship Foundation Scholar (2023–2024); MEXT/JASSO Honors Scholarship (2022–2023).</p><p><b>Award:</b> Excellence Award, Electrical and Electronic Circuits Poster Presentation, Kyoto University (2023).</p><p><b>Kyoto University activities:</b> Karaoke Club; COLORS! (fashion club).</p></div></section>
<section class="section"><h2>Skills &amp; Languages</h2><div class="skills"><b>Programming</b><span>Python, PyTorch, NumPy, pandas, scikit-learn, MATLAB</span><b>Research</b><span>Multimodal learning, experiment design, cross-validation, ablation studies, statistical evaluation, failure analysis</span><b>Speech / Audio</b><span>MFCC-DTW, F0, rhythm, pause, and mora-timing analysis</span><b>Development</b><span>Git/GitHub, Linux, Docker, pytest, structured logging, HTML/CSS, LaTeX</span><b>Languages</b><span>Chinese · Japanese (JLPT N1) · English (TOEFL iBT 81) · French (basic)</span></div></section>
</main></div></body></html>
''', encoding='utf-8')

Path('cv/cv.css').write_text(''':root{--ivory:#f7f2e9;--ink:#202127;--navy:#1b2a46;--rose:#b86f70;--rose-text:#a15b5e;--gold:#b79862;--gold-text:#87683b;--muted:#665f58;--line:rgba(32,33,39,.12);--serif:"Iowan Old Style","Baskerville","Times New Roman","Hiragino Mincho ProN","Yu Mincho",serif;--sans:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans","Noto Sans JP",sans-serif}
*{box-sizing:border-box}html{background:var(--ivory)}body{margin:0;background:linear-gradient(180deg,#fcfaf5,var(--ivory));color:var(--ink);font-family:var(--sans);line-height:1.58;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}a{color:inherit;text-decoration:none}a:focus-visible{outline:2px solid rgba(135,104,59,.55);outline-offset:3px}.wrap{width:min(940px,calc(100% - 48px));margin:0 auto;padding:28px 0 72px}.top{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:34px;color:var(--muted);font-family:var(--serif);font-size:10.8px;letter-spacing:.1em;text-transform:uppercase}.top a{position:relative}.top a::after{content:"";position:absolute;left:0;right:0;bottom:-4px;height:1px;background:linear-gradient(90deg,var(--gold),transparent)}.top-right{display:flex;align-items:center;gap:17px}.top .pdf{color:var(--gold-text)}.sheet{position:relative;padding-left:24px;border-left:1px solid rgba(183,152,98,.3)}.cv-head{display:flex;justify-content:space-between;gap:46px;align-items:flex-start;padding-bottom:25px;border-bottom:1px solid var(--line)}h1{margin:0;font-family:var(--serif);font-size:58px;font-weight:400;letter-spacing:-.046em;line-height:.92;color:var(--navy)}.native{margin:8px 0 0;font-family:var(--serif);font-size:16px;letter-spacing:.15em;color:#5f584f}.subtitle{margin:12px 0 0;color:var(--rose-text);font-family:var(--serif);font-size:17.3px;line-height:1.35}.contact{margin:1px 0 0;text-align:right;color:var(--muted);font-size:12px;line-height:1.8;white-space:nowrap}.contact a:hover{color:var(--rose-text)}.section{display:grid;grid-template-columns:132px minmax(0,1fr);gap:31px;margin-top:29px}.section h2{margin:0;padding-top:2px;font-family:var(--serif);font-size:12.9px;font-weight:400;color:var(--gold-text);letter-spacing:.095em;text-transform:uppercase;line-height:1.35}.section .entry{grid-column:2;margin:0 0 18px;min-width:0}.entry-head{display:flex;justify-content:space-between;gap:18px;align-items:baseline;min-width:0}.entry h3{margin:0;min-width:0;color:var(--navy);font-size:14.15px;font-weight:650;letter-spacing:-.005em;line-height:1.36}.date{font-family:var(--serif);font-size:11.15px;color:#766c61;white-space:nowrap;flex:none}.meta{margin:3px 0 0;color:var(--muted);font-size:12.15px}.meta a{border-bottom:1px solid rgba(135,104,59,.35)}.entry p{margin:5px 0 0;font-size:12.8px}.entry ul{margin:7px 0 0;padding-left:17px}.entry li{font-size:12.7px;margin:4px 0}.entry.compact p{margin:4px 0}.publication p{font-family:var(--serif);font-size:13.05px;line-height:1.62}.publication .pub-author{color:var(--navy);font-weight:600}.publication b{font-weight:600;color:var(--rose-text)}.skills{grid-column:2;display:grid;grid-template-columns:112px minmax(0,1fr);gap:6px 16px;font-size:12.65px}.skills b{font-weight:650;color:var(--navy)}.skills span{color:#5f5a55}.section::after{content:"";grid-column:2;height:1px;background:linear-gradient(90deg,rgba(183,152,98,.2),transparent 76%);margin-top:1px}.section:last-child::after{display:none}@media(max-width:760px){.entry-head{display:block}.date{display:block;margin-top:2px}.cv-head{gap:28px}.contact{white-space:normal}}@media(max-width:700px){.wrap{width:min(100% - 28px,940px);padding-top:20px}.top{margin-bottom:27px}.sheet{padding-left:14px}.cv-head{display:block}.contact{text-align:left;margin-top:15px}h1{font-size:46px}.subtitle{font-size:16px}.section{grid-template-columns:1fr;gap:9px;margin-top:25px}.section h2{padding-bottom:7px;border-bottom:1px solid var(--line)}.section .entry,.skills,.section::after{grid-column:1}.skills{grid-template-columns:1fr;gap:2px}.skills span{margin-bottom:7px}}@media(max-width:380px){.wrap{width:calc(100% - 22px)}.sheet{padding-left:11px}h1{font-size:42px}.subtitle{font-size:15.2px}.entry h3{font-size:13.7px}.entry p,.entry li{font-size:12.45px}.top-right>span{display:none}}@page{size:A4;margin:13mm 14mm 15mm}@media print{html,body{background:#fff}.wrap{width:100%;padding:0}.top{display:none}.sheet{border-left:0;padding-left:0}.cv-head{padding-bottom:14px}.section{break-inside:auto;margin-top:16px;grid-template-columns:110px minmax(0,1fr);gap:24px}.section h2{font-size:10.4px}.section .entry{break-inside:avoid;margin-bottom:10px}.entry h3{font-size:11.2px}.entry p,.entry li,.skills{font-size:9.7px;line-height:1.43}.meta{font-size:9.3px}.date{font-size:8.8px}.publication p{font-size:10px}.skills{grid-template-columns:88px minmax(0,1fr);gap:3px 11px}h1{font-size:39px}.native{font-size:11.5px;margin-top:4px}.subtitle{font-size:12px;margin-top:7px}.contact{font-size:8.9px;line-height:1.55}.section::after{margin-top:0}a{color:inherit}}
''', encoding='utf-8')

Path('sitemap.xml').write_text('''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://kayui-gavo.github.io/</loc><lastmod>2026-08-12</lastmod></url>
  <url><loc>https://kayui-gavo.github.io/ja/</loc><lastmod>2026-08-12</lastmod></url>
  <url><loc>https://kayui-gavo.github.io/zh-cn/</loc><lastmod>2026-08-12</lastmod></url>
  <url><loc>https://kayui-gavo.github.io/zh-tw/</loc><lastmod>2026-08-12</lastmod></url>
  <url><loc>https://kayui-gavo.github.io/cv/</loc><lastmod>2026-08-12</lastmod></url>
</urlset>
''', encoding='utf-8')

Path('README.md').write_text('''# Kewei Liu — Personal Website

Personal academic, engineering, education, and profile site for Kewei Liu (劉 可惟).

**Website:** https://kayui-gavo.github.io/

- Speech and language processing / multimodal interaction
- Japanese learner speaking support
- Education R&D, learning design, materials, and education product development
- English / 日本語 / 简体中文 / 台灣華語

Static HTML/CSS/JavaScript, deployed with GitHub Pages.
''', encoding='utf-8')

Path('404.html').write_text(r'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><meta name="theme-color" content="#f7f2e9"><title>Page not found — Kewei Liu</title><link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><style>:root{--ivory:#f7f2e9;--navy:#1c2945;--rose:#a15b5e;--gold:#87683b;--muted:#665f58;--serif:"Iowan Old Style","Baskerville","Times New Roman",serif;--sans:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}html,body{min-height:100%;background:var(--ivory)}body{margin:0;color:var(--navy);font-family:var(--sans);display:grid;place-items:center}.nf{width:min(680px,calc(100% - 42px));padding:64px 0}.line{width:54px;height:1px;background:var(--gold);margin-bottom:28px}.no{font-family:var(--serif);font-size:13px;letter-spacing:.2em;color:var(--gold)}h1{font-family:var(--serif);font-weight:400;font-size:clamp(48px,10vw,82px);line-height:.95;letter-spacing:-.04em;margin:12px 0 18px}p{margin:0;max-width:480px;color:var(--muted);font-size:14px;line-height:1.7}.home{display:inline-flex;margin-top:28px;padding-bottom:4px;border-bottom:1px solid var(--gold);font-family:var(--serif);color:var(--navy);text-decoration:none}.dot{position:fixed;right:7vw;top:9vh;width:5px;height:5px;border-radius:50%;background:var(--rose)}</style><script>(()=>{const legacy='/kewei-liu-site';const p=location.pathname;if(p===legacy||p.startsWith(legacy+'/')){const next=p.slice(legacy.length)||'/';location.replace(next+location.search+location.hash)}})();</script></head><body><span class="dot" aria-hidden="true"></span><main class="nf"><div class="line"></div><span class="no">404</span><h1>Page not found.</h1><p>The page may have moved. Kewei Liu’s website is now served from the GitHub Pages user root.</p><a class="home" href="/">← Back home</a></main></body></html>''', encoding='utf-8')

Path('assets/favicon.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="13" fill="#f7f2e9"/><path d="M18 13h7v17l17-17h9L32 31l20 20h-10L25 34v17h-7z" fill="#1c2945"/><path d="M18 55h20" stroke="#87683b" stroke-width="2" stroke-linecap="round"/><circle cx="48" cy="11" r="2.5" fill="#a15b5e"/></svg>''', encoding='utf-8')

ivory=(247,242,233); navy=(28,41,69); rose=(161,91,94); gold=(135,104,59); muted=(102,95,88)
serif='/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'; sans='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
base=Image.new('RGB',(256,256),ivory); d=ImageDraw.Draw(base); f=ImageFont.truetype(serif,164); bbox=d.textbbox((0,0),'K',font=f); w=bbox[2]-bbox[0]; h=bbox[3]-bbox[1]; d.text(((256-w)/2-bbox[0],(236-h)/2-bbox[1]-3),'K',font=f,fill=navy); d.rounded_rectangle((63,217,151,222),radius=2,fill=gold); d.ellipse((205,28,218,41),fill=rose)
base.resize((48,48),Image.Resampling.LANCZOS).save('assets/favicon-48.png',optimize=True); base.resize((180,180),Image.Resampling.LANCZOS).save('assets/apple-touch-icon.png',optimize=True); base.save('favicon.ico',sizes=[(16,16),(32,32),(48,48)])
canvas=Image.new('RGB',(1200,630),ivory); draw=ImageDraw.Draw(canvas); draw.line((754,70,754,558),fill=gold,width=2); draw.ellipse((1120,54,1131,65),fill=rose); draw.text((90,90),'RESEARCH / SPEECH / EDUCATION',font=ImageFont.truetype(serif,20),fill=gold); draw.text((86,145),'Kewei Liu',font=ImageFont.truetype(serif,78),fill=navy); draw.text((91,257),'Speech & Language',font=ImageFont.truetype(sans,28),fill=rose); draw.text((91,300),'Multimodal Interaction · Education',font=ImageFont.truetype(sans,26),fill=rose); draw.text((92,378),'M.S. · The University of Tokyo',font=ImageFont.truetype(sans,22),fill=muted); draw.line((92,432,252,432),fill=(181,150,96),width=1); draw.text((92,508),'kayui-gavo.github.io',font=ImageFont.truetype(serif,19),fill=muted)
portrait=Image.open('assets/portrait.webp').convert('RGB'); portrait=ImageOps.fit(portrait,(340,500),method=Image.Resampling.LANCZOS,centering=(0.5,0.42)); canvas.paste(portrait,(790,65)); draw.rectangle((790,65,1129,564),outline=(255,255,255),width=1); canvas.save('assets/og-cover.png',optimize=True)

for p in [Path('index.html'),Path('ja/index.html'),Path('zh-cn/index.html'),Path('zh-tw/index.html')]:
    t=p.read_text(encoding='utf-8')
    assert '/kewei-liu-site/' not in t
    assert 'hreflang="zh-Hans"' not in t and 'hreflang="zh-Hant-TW"' not in t
    assert 'hreflang="zh-CN"' in t and 'hreflang="zh-TW"' in t
    m=re.search(r'<script type="application/ld\+json">(.*?)</script>',t,re.S); data=json.loads(m.group(1)); assert data['mainEntity']['@id']==BASE+'#person'; assert 'https://www.tabitoedu.com' not in data['mainEntity']['sameAs']
print('site polish script completed')
