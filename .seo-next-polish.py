from pathlib import Path
import re


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text(encoding='utf-8')
    if old not in text:
        raise RuntimeError(f'Expected text not found in {path}: {old[:80]}')
    text = text.replace(old, new, 1)
    p.write_text(text, encoding='utf-8')

pages = ['index.html','ja/index.html','zh-cn/index.html','zh-tw/index.html']
for path in pages:
    replace_once(path,
        '<div class="portrait-caption"><span>KYOTO / 2022—2026</span><i></i><span>B.ENG.</span></div>',
        '<div class="portrait-caption"><span>TOKYO / KYOTO</span><i></i><span>M.S. / B.ENG.</span></div>')
    replace_once(path, '<div class="portrait-note">UNDERGRADUATE YEARS</div>', '<div class="portrait-note">RESEARCH / EDUCATION</div>')
    replace_once(path, '<p class="kicker">research / speech / education</p>', '<p class="kicker">UTOKYO EEIS / MINEMATSU–SAITO LAB</p>')
    replace_once(path, '<span class="utility-note">TOKYO · 2026</span>', '<span class="utility-note">TOKYO, JAPAN</span>')
    # Make the above-the-fold portrait explicitly high priority without changing the image itself.
    text = Path(path).read_text(encoding='utf-8')
    text, n = re.subn(r'(<img class="portrait"[^>]+)(>)', r'\1 fetchpriority="high" decoding="async"\2', text, count=1)
    if n != 1:
        raise RuntimeError(f'portrait img not found in {path}')
    Path(path).write_text(text, encoding='utf-8')

# English: stronger name + affiliation search signals, less repetitive identity copy.
replace_once('index.html', '<title>Kewei Liu | Speech, Multimodal Interaction & Education</title>', '<title>Kewei Liu | University of Tokyo · Speech & Multimodal Interaction</title>')
replace_once('index.html', 'Kewei Liu is an M.S. student at The University of Tokyo studying speech, language, and multimodal interaction for Japanese-language learning, and works on education R&amp;D and product development.', 'Kewei Liu is an M.S. student at The University of Tokyo studying speech, language, and multimodal interaction for Japanese-language learning, with work in education R&amp;D and product development.')
replace_once('index.html', '<meta property="og:description" content="Speech & Language · Multimodal Interaction · Education">', '<meta property="og:description" content="University of Tokyo · Speech & Language · Multimodal Interaction · Education R&D">')
replace_once('index.html', '<p class="tagline">Speech &amp; Language · Multimodal Interaction · Education</p>', '<p class="tagline">Speech &amp; Language · Multimodal Interaction · Education R&amp;D</p>')
replace_once('index.html', '<span>APSIPA ASC 2026 · accepted</span>', '<span>First-author paper · APSIPA ASC 2026 · Accepted</span>')
replace_once('index.html', 'At China Tabito Education Group, I work on education R&amp;D, curriculum and learning design, teaching materials, educational content, and education product development. This work draws on four years of mathematics and physics teaching and admissions advising, together with teaching-support roles at Kyoto University.', 'At China Tabito Education Group, I work on curriculum and learning design, teaching materials, educational content, and product development for students preparing for Japanese university admissions. This work draws on four years of mathematics and physics teaching and admissions advising, together with teaching-support roles at Kyoto University.')

# Add WebSite structured data on the canonical homepage to help Google infer the site name.
root = Path('index.html')
t = root.read_text(encoding='utf-8')
website_json = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","@id":"https://kayui-gavo.github.io/#website","url":"https://kayui-gavo.github.io/","name":"Kewei Liu","alternateName":["劉 可惟","刘可惟","劉可惟"],"inLanguage":["en","ja","zh-CN","zh-TW"]}</script>\n'
if '#website' not in t:
    marker = '</head>'
    if marker not in t:
        raise RuntimeError('head marker missing')
    t = t.replace(marker, website_json + marker, 1)
    root.write_text(t, encoding='utf-8')

# Japanese.
replace_once('ja/index.html', '<title>劉 可惟 | 音声言語処理・マルチモーダルインタラクション・教育</title>', '<title>劉 可惟 | 東京大学 · 音声言語処理・マルチモーダルインタラクション</title>')
replace_once('ja/index.html', '<p class="tagline">音声・言語処理 · マルチモーダルインタラクション · 教育</p>', '<p class="tagline">音声・言語処理 · マルチモーダルインタラクション · 教育研究・開発</p>')
replace_once('ja/index.html', '<span>APSIPA ASC 2026 · 採択</span>', '<span>第一著者論文 · APSIPA ASC 2026 · 採択</span>')

# Simplified Chinese.
replace_once('zh-cn/index.html', '<title>刘可惟 | 语音语言处理、多模态交互与教育</title>', '<title>刘可惟 | 东京大学 · 语音语言处理与多模态交互</title>')
replace_once('zh-cn/index.html', '<p class="tagline">语音语言处理 · 多模态交互 · 教育</p>', '<p class="tagline">语音语言处理 · 多模态交互 · 教育研发</p>')
replace_once('zh-cn/index.html', '<span>APSIPA ASC 2026 · 录用</span>', '<span>第一作者论文 · APSIPA ASC 2026 · 录用</span>')
replace_once('zh-cn/index.html', '<span>日语发音多维度评价研究开发</span>', '<span>日语发音多维度评价方法研发</span>')
replace_once('zh-cn/index.html', '<span>卡拉 OK 同好会</span>', '<span>卡拉 OK 社团</span>')

# Traditional Chinese / Taiwan.
replace_once('zh-tw/index.html', '<title>劉可惟｜語音語言處理、多模態互動與教育</title>', '<title>劉可惟｜東京大學 · 語音語言處理與多模態互動</title>')
replace_once('zh-tw/index.html', '<p class="tagline">語音語言處理 · 多模態互動 · 教育</p>', '<p class="tagline">語音語言處理 · 多模態互動 · 教育研發</p>')
replace_once('zh-tw/index.html', '<span>APSIPA ASC 2026 · 接受</span>', '<span>第一作者論文 · APSIPA ASC 2026 · 接受發表</span>')
replace_once('zh-tw/index.html', '<span>日語發音多維度評估研究開發</span>', '<span>日語發音多維度評估方法研發</span>')
replace_once('zh-tw/index.html', '<span>卡拉 OK 同好會</span>', '<span>卡拉 OK 社團</span>')

# Public resume: align vocabulary and remove the permanently indexable phone number.
replace_once('cv/index.html', '<p class="role">M.S. Student <span>|</span> Multimodal AI and Speech Processing</p>', '<p class="role">M.S. Student <span>|</span> Multimodal AI · Speech &amp; Language Processing</p>')
replace_once('cv/index.html', ' <b>•</b> +81 90-6670-3996', '')

# CSS: remove obsolete PDF-link styles and fix the tablet portrait-first hierarchy.
cssp = Path('assets/style.css')
css = cssp.read_text(encoding='utf-8')
css, n = re.subn(r'\.cv-pdf-link\{[^}]*\}\n\.cv-pdf-link span\{[^}]*\}\.cv-pdf-link:hover\{[^}]*\}\.cv-pdf-link:hover span\{[^}]*\}\n', '', css, count=1)
if n != 1:
    raise RuntimeError('obsolete cv-pdf-link styles not found')

tablet = '''\n@media(min-width:601px) and (max-width:1060px){\n  .editorial{display:contents}\n  .identity{grid-row:1}\n  .portrait-column{grid-row:2;width:min(46vw,360px);justify-self:center;margin-left:0}\n  .explore{grid-row:3}\n  .utility{grid-row:4}\n  .landing{gap:34px}\n}\n'''
if '@media(min-width:601px) and (max-width:1060px)' not in css:
    css = css.replace('@media(prefers-reduced-motion:reduce){', tablet + '\n@media(prefers-reduced-motion:reduce){', 1)
cssp.write_text(css, encoding='utf-8')

# JS: remove a leftover dataset state that no longer drives any styling.
jsp = Path('assets/motion.js')
js = jsp.read_text(encoding='utf-8')
old = "const showPanel=(topic)=>{if(!topic)return;if(shell)shell.dataset.topic=topic;panels.forEach"
new = "const showPanel=(topic)=>{if(!topic)return;panels.forEach"
if old not in js:
    raise RuntimeError('obsolete dataset state not found')
js = js.replace(old, new, 1)
jsp.write_text(js, encoding='utf-8')

# Validation.
for path in pages:
    s = Path(path).read_text(encoding='utf-8')
    assert 'TOKYO / KYOTO' in s and 'RESEARCH / EDUCATION' in s and 'TOKYO, JAPAN' in s
    assert 'fetchpriority="high"' in s
assert '<title>Kewei Liu | University of Tokyo · Speech & Multimodal Interaction</title>' in Path('index.html').read_text(encoding='utf-8')
assert '#website' in Path('index.html').read_text(encoding='utf-8')
assert '+81 90-6670-3996' not in Path('cv/index.html').read_text(encoding='utf-8')
assert '.cv-pdf-link' not in css
assert 'shell.dataset.topic=topic' not in js
print('SEO and editorial polish applied')
