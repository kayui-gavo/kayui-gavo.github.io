from pathlib import Path


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text(encoding='utf-8')
    if old not in text:
        raise RuntimeError(f'Expected text not found in {path}: {old[:120]!r}')
    text = text.replace(old, new, 1)
    p.write_text(text, encoding='utf-8')

# ---------- Shared homepage cleanup ----------
pages = ['index.html', 'ja/index.html', 'zh-cn/index.html', 'zh-tw/index.html']
for path in pages:
    replace_once(path, '<div class="portrait-note">RESEARCH / EDUCATION</div>', '')
    replace_once(path, '<img class="visual-education"', '<img class="visual-education"') if False else None

# More timeless, accessible portrait alt text.
replace_once('index.html', 'alt="Kewei Liu during her undergraduate years in Kyoto"', 'alt="Portrait of Kewei Liu"')
replace_once('ja/index.html', 'alt="京都での学部時代の劉可惟"', 'alt="劉可惟のポートレート"')
replace_once('zh-cn/index.html', 'alt="刘可惟在京都度过本科阶段时的照片"', 'alt="刘可惟个人照片"')
replace_once('zh-tw/index.html', 'alt="劉可惟在京都就讀大學期間的照片"', 'alt="劉可惟個人照片"')

# ---------- Identity hierarchy + metadata consistency ----------
# English
replace_once('index.html', '<meta property="og:title" content="Kewei Liu">', '<meta property="og:title" content="Kewei Liu | University of Tokyo · Speech & Multimodal Interaction">')
replace_once('index.html', '"name":"Kewei Liu | Speech, Multimodal Interaction & Education","inLanguage":"en"', '"name":"Kewei Liu | University of Tokyo · Speech & Multimodal Interaction","inLanguage":"en"')
replace_once('index.html', '"description":"Kewei Liu is an M.S. student at The University of Tokyo studying speech, language, and multimodal interaction for Japanese-language learning, and works on education R&D and product development."', '"description":"Kewei Liu is an M.S. student at The University of Tokyo studying speech, language, and multimodal interaction for Japanese-language learning, with work in education R&D and product development."')
replace_once('index.html', '<p class="tagline">Speech &amp; Language · Multimodal Interaction · Education R&amp;D</p>', '<p class="tagline"><span>Speech &amp; Language · Multimodal Interaction</span><small>Education R&amp;D</small></p>')

# Japanese
replace_once('ja/index.html', '<meta property="og:title" content="劉 可惟">', '<meta property="og:title" content="劉 可惟 | 東京大学 · 音声言語処理・マルチモーダルインタラクション">')
replace_once('ja/index.html', '<meta property="og:description" content="音声・言語処理 · マルチモーダルインタラクション · 教育">', '<meta property="og:description" content="音声・言語処理 · マルチモーダルインタラクション · 教育設計・プロダクト開発">')
replace_once('ja/index.html', '"name":"劉 可惟 | 音声言語処理・マルチモーダルインタラクション・教育","inLanguage":"ja"', '"name":"劉 可惟 | 東京大学 · 音声言語処理・マルチモーダルインタラクション","inLanguage":"ja"')
replace_once('ja/index.html', '<p class="tagline">音声・言語処理 · マルチモーダルインタラクション · 教育研究・開発</p>', '<p class="tagline"><span>音声・言語処理 · マルチモーダルインタラクション</span><small>教育設計・プロダクト開発</small></p>')
replace_once('ja/index.html', '中国旅人教育集团株式会社（旅人教育）の株主として、教育研究、カリキュラム・学習設計、教材開発、教育コンテンツ・プロダクトの企画開発に携わっています。行知学園関西校での4年間の数学・物理指導と進学指導、京都大学でのOA・留学生チューター経験を実務に生かしています。', '中国旅人教育集团株式会社（旅人教育）で、カリキュラム・学習設計、教材開発、教育コンテンツ・プロダクトの企画開発に携わっています。行知学園関西校での4年間の数学・物理指導と進学指導、京都大学でのOA・留学生チューター経験を実務に生かしています。')

# Simplified Chinese
replace_once('zh-cn/index.html', '<meta property="og:title" content="刘可惟">', '<meta property="og:title" content="刘可惟 | 东京大学 · 语音语言处理与多模态交互">')
replace_once('zh-cn/index.html', '<meta property="og:description" content="语音语言处理 · 多模态交互 · 教育">', '<meta property="og:description" content="语音语言处理 · 多模态交互 · 教育研发">')
replace_once('zh-cn/index.html', '"name":"刘可惟 | 语音语言处理、多模态交互与教育","inLanguage":"zh-CN"', '"name":"刘可惟 | 东京大学 · 语音语言处理与多模态交互","inLanguage":"zh-CN"')
replace_once('zh-cn/index.html', '<p class="tagline">语音语言处理 · 多模态交互 · 教育研发</p>', '<p class="tagline"><span>语音语言处理 · 多模态交互</span><small>教育研发</small></p>')
replace_once('zh-cn/index.html', '目前作为中国旅人教育集团株式会社股东，参与教研、课程与学习设计、教材与教育内容开发，以及教育产品开发。此前在行知学园关西校有4年数学、物理教学与升学指导经验，并曾在京都大学担任电气电子回路 OA 和留学生辅导员。', '目前在中国旅人教育集团株式会社参与课程与学习设计、教材与教育内容开发，以及教育产品开发。此前在行知学园关西校有4年数学、物理教学与升学指导经验，并曾在京都大学担任电气电子回路 OA 和留学生辅导员。')

# Traditional Chinese
replace_once('zh-tw/index.html', '<meta property="og:title" content="劉可惟">', '<meta property="og:title" content="劉可惟｜東京大學 · 語音語言處理與多模態互動">')
replace_once('zh-tw/index.html', '<meta property="og:description" content="語音語言處理 · 多模態互動 · 教育">', '<meta property="og:description" content="語音語言處理 · 多模態互動 · 教育研發">')
replace_once('zh-tw/index.html', '"name":"劉可惟｜語音語言處理、多模態互動與教育","inLanguage":"zh-TW"', '"name":"劉可惟｜東京大學 · 語音語言處理與多模態互動","inLanguage":"zh-TW"')
replace_once('zh-tw/index.html', '<p class="tagline">語音語言處理 · 多模態互動 · 教育研發</p>', '<p class="tagline"><span>語音語言處理 · 多模態互動</span><small>教育研發</small></p>')
replace_once('zh-tw/index.html', '目前為中国旅人教育集团株式会社股東，參與教育研究、課程與學習設計、教材與教學內容開發，以及教育產品規劃與開發。過去曾在行知學園關西校累積4年數學、物理教學與升學輔導經驗，也曾在京都大學擔任電氣電子回路 OA 與國際學生輔導員。', '目前在中国旅人教育集团株式会社參與課程與學習設計、教材與教學內容開發，以及教育產品規劃與開發。過去曾在行知學園關西校累積4年數學、物理教學與升學輔導經驗，也曾在京都大學擔任電氣電子回路 OA 與國際學生輔導員。')

# ---------- Interests: keep Music, remove karaoke-specific searchable wording ----------
replace_once('index.html', '<div><b>Music</b><span>Karaoke Club</span></div>', '<div><b>Music</b><span>Listening · live music</span></div>')
replace_once('ja/index.html', '<div><b>音楽</b><span>カラオケ同好会</span></div>', '<div><b>音楽</b><span>音楽鑑賞・ライブ</span></div>')
replace_once('zh-cn/index.html', '<div><b>音乐</b><span>卡拉 OK 社团</span></div>', '<div><b>音乐</b><span>音乐欣赏</span></div>')
replace_once('zh-tw/index.html', '<div><b>音樂</b><span>卡拉 OK 社團</span></div>', '<div><b>音樂</b><span>音樂欣賞</span></div>')

# ---------- Lazy load images behind non-default tabs ----------
for path in pages:
    p = Path(path)
    t = p.read_text(encoding='utf-8')
    t = t.replace('decor-education.webp" alt="">', 'decor-education.webp" alt="" loading="lazy" decoding="async">')
    t = t.replace('decor-personal.webp" alt="">', 'decor-personal.webp" alt="" loading="lazy" decoding="async">')
    p.write_text(t, encoding='utf-8')

# ---------- CSS: hierarchy + cleaner portrait + proper tablet composition ----------
style = Path('assets/style.css')
s = style.read_text(encoding='utf-8')
s = s.replace('.portrait-note{position:absolute;right:-2px;bottom:-20px;font-family:var(--serif);font-size:8.9px;letter-spacing:.18em;color:#918575}\n', '')
s = s.replace('.tagline{margin:15px 0 0;font-family:var(--serif);font-size:clamp(19px,1.66vw,24px);line-height:1.28;color:var(--rose-text)}\n', '.tagline{margin:15px 0 0;font-family:var(--serif);font-size:clamp(19px,1.66vw,24px);line-height:1.28;color:var(--rose-text)}\n.tagline span{display:block}\n.tagline small{display:block;margin-top:5px;font-family:var(--sans);font-size:11.5px;font-weight:500;line-height:1.35;letter-spacing:.055em;color:var(--muted-light)}\n')
s = s.replace('  .portrait-note{right:0;bottom:-18px;font-size:8.2px}\n', '')
old_tablet = '''@media(min-width:601px) and (max-width:1060px){
  .editorial{display:contents}
  .identity{grid-row:1}
  .portrait-column{grid-row:2;width:min(46vw,360px);justify-self:center;margin-left:0}
  .explore{grid-row:3}
  .utility{grid-row:4}
  .landing{gap:34px}
}
'''
new_tablet = '''@media(min-width:721px) and (max-width:1060px){
  .editorial{display:contents}
  .landing{grid-template-columns:minmax(0,1fr) minmax(220px,280px);column-gap:clamp(30px,5vw,54px);row-gap:34px;align-items:center}
  .identity{grid-column:1;grid-row:1;align-self:center}
  .portrait-column{grid-column:2;grid-row:1;width:min(29vw,270px);justify-self:end;margin-left:0;padding-left:17px}
  .portrait-caption{font-size:8.3px}
  .explore{grid-column:1/-1;grid-row:2;padding-top:4px}
  .utility{grid-column:1/-1;grid-row:3;margin-top:2px}
}

@media(min-width:601px) and (max-width:720px){
  .editorial{display:contents}
  .identity{grid-row:1}
  .portrait-column{grid-row:2;width:min(58vw,340px);justify-self:center;margin-left:0}
  .explore{grid-row:3}
  .utility{grid-row:4}
  .landing{gap:34px}
}
'''
if old_tablet not in s:
    raise RuntimeError('Old tablet CSS block not found')
s = s.replace(old_tablet, new_tablet, 1)
style.write_text(s, encoding='utf-8')

# ---------- Public resume: keep accessible, but do not compete in name search ----------
replace_once('cv/index.html', '<meta name="robots" content="index,follow">', '<meta name="robots" content="noindex,follow">')
replace_once('cv/index.html', '<strong>Interests</strong><span>Music, Go (amateur 2-dan), Chinese calligraphy</span>', '<strong>Interests</strong><span>Music, fashion, Go (amateur 2-dan), Chinese calligraphy</span>')

# A sitemap should list URLs we actually want indexed.
sitemap = Path('sitemap.xml')
sm = sitemap.read_text(encoding='utf-8')
sm = sm.replace('  <url><loc>https://kayui-gavo.github.io/cv/</loc><lastmod>2026-08-12</lastmod></url>\n', '')
sitemap.write_text(sm, encoding='utf-8')

# ---------- Assertions ----------
all_text = '\n'.join(Path(p).read_text(encoding='utf-8') for p in pages)
for forbidden in ['Karaoke Club', 'カラオケ同好会', '卡拉 OK 社团', '卡拉 OK 社團', 'portrait-note']:
    if forbidden in all_text:
        raise RuntimeError(f'Forbidden residual: {forbidden}')
if 'noindex,follow' not in Path('cv/index.html').read_text(encoding='utf-8'):
    raise RuntimeError('CV noindex missing')
if '/cv/' in Path('sitemap.xml').read_text(encoding='utf-8'):
    raise RuntimeError('CV still in sitemap')
print('Final editorial polish applied successfully')
