from pathlib import Path
import re


def replace_once(path, old, new):
    p=Path(path)
    t=p.read_text(encoding='utf-8')
    if old not in t:
        raise RuntimeError(f'expected text not found in {path}: {old[:120]}')
    p.write_text(t.replace(old,new,1),encoding='utf-8')


def replace_article(path, article):
    p=Path(path)
    t=p.read_text(encoding='utf-8')
    pat=r'<article class="detail-panel" id="panel-internships".*?</article>'
    t2,n=re.subn(pat,article,t,count=1,flags=re.S)
    if n!=1:
        raise RuntimeError(f'internship article replace failed in {path}: {n}')
    p.write_text(t2,encoding='utf-8')

replace_article('index.html','''<article class="detail-panel" id="panel-internships" role="tabpanel" aria-labelledby="topic-internships" data-panel="internships" aria-hidden="true" hidden>
          <div class="detail-layout">
            <div class="detail-copy"><p class="detail-kicker">UPCOMING INTERNSHIPS / 2026</p><h2>Upcoming internships</h2><div class="proofs internship-proofs"><span>Sony Corporation · Workplace Immersion Internship</span><span>Rakuten Group, Inc. · 夏の陣 2026 / Software Engineer</span></div></div>
            <div class="visual-cell visual-internships" aria-hidden="true"><span class="intern-year">2026</span><span class="intern-companies">SONY / RAKUTEN</span><span class="visual-caption">upcoming internships</span></div>
          </div>
        </article>''')

replace_article('ja/index.html','''<article class="detail-panel" id="panel-internships" role="tabpanel" aria-labelledby="topic-internships" data-panel="internships" aria-hidden="true" hidden>
          <div class="detail-layout">
            <div class="detail-copy"><p class="detail-kicker">UPCOMING INTERNSHIPS / 2026</p><h2>参加予定インターン</h2><div class="proofs internship-proofs"><span>ソニー株式会社 · 職場密着インターン</span><span>楽天グループ株式会社 · 夏の陣 2026 / Software Engineer</span></div></div>
            <div class="visual-cell visual-internships" aria-hidden="true"><span class="intern-year">2026</span><span class="intern-companies">SONY / RAKUTEN</span><span class="visual-caption">upcoming internships</span></div>
          </div>
        </article>''')

replace_article('zh-cn/index.html','''<article class="detail-panel" id="panel-internships" role="tabpanel" aria-labelledby="topic-internships" data-panel="internships" aria-hidden="true" hidden><div class="detail-layout"><div class="detail-copy"><p class="detail-kicker">UPCOMING INTERNSHIPS / 2026</p><h2>计划参加的实习</h2><div class="proofs internship-proofs"><span>Sony Corporation · 职场密着实习</span><span>Rakuten Group, Inc. · 夏の陣 2026 / Software Engineer</span></div></div><div class="visual-cell visual-internships" aria-hidden="true"><span class="intern-year">2026</span><span class="intern-companies">SONY / RAKUTEN</span><span class="visual-caption">upcoming internships</span></div></div></article>''')

replace_article('zh-tw/index.html','''<article class="detail-panel" id="panel-internships" role="tabpanel" aria-labelledby="topic-internships" data-panel="internships" aria-hidden="true" hidden><div class="detail-layout"><div class="detail-copy"><p class="detail-kicker">UPCOMING INTERNSHIPS / 2026</p><h2>預計參加的實習</h2><div class="proofs internship-proofs"><span>Sony Corporation · 職場密著實習</span><span>Rakuten Group, Inc. · 夏の陣 2026 / Software Engineer</span></div></div><div class="visual-cell visual-internships" aria-hidden="true"><span class="intern-year">2026</span><span class="intern-companies">SONY / RAKUTEN</span><span class="visual-caption">upcoming internships</span></div></div></article>''')

replace_once('cv/index.html','<p><strong>Technical internships (2026):</strong> Sony Corporation — Workplace Immersion Internship, Course 02 (AI/cloud services for creators); Rakuten Group, Inc. — 夏の陣, SWE 新規開発コース, Term 4.</p>','<p><strong>Upcoming internships (2026):</strong> Sony Corporation — Workplace Immersion Internship; Rakuten Group, Inc. — 夏の陣 / Software Engineer.</p>')

# Remove the richer internship-only CSS introduced in the previous revision.
style=Path('assets/style.css')
s=style.read_text(encoding='utf-8')
s=re.sub(r'\.internship-layout\{grid-template-columns:minmax\(0,1fr\) 138px;gap:18px\}\n\.internship-list\{.*?\.detail-panel \.internship-desc\{margin:2px 0 0;max-width:510px;font-size:10\.15px;line-height:1\.5;color:#756e67\}\n','',s,flags=re.S)
s=re.sub(r'  \.internship-layout\{grid-template-columns:1fr\}\n  \.internship-list\{.*?  \.internship-layout \.visual-internships\{display:none\}\n','',s,flags=re.S)
style.write_text(s,encoding='utf-8')

# Sanity checks: no private scheduling/detail strings remain on homepage/CV.
for path in ['index.html','ja/index.html','zh-cn/index.html','zh-tw/index.html','cv/index.html']:
    t=Path(path).read_text(encoding='utf-8')
    for forbidden in ['Aug 31','Sep 11','Sep 14','Sep 18','8/31','9/11','9/14','9/18','Minatomirai','みなとみらい','港未来','港未來','Term 4','Course 02','新規開発コース','Commerce &amp; Marketing','ハッカソン']:
        assert forbidden not in t, (path, forbidden)
assert 'Upcoming internships' in Path('index.html').read_text(encoding='utf-8')
assert '参加予定インターン' in Path('ja/index.html').read_text(encoding='utf-8')
