from pathlib import Path
import re


def sub_article(path, new_article):
    p=Path(path)
    t=p.read_text(encoding='utf-8')
    pattern=r'<article class="detail-panel" id="panel-internships".*?</article>'
    t2,n=re.subn(pattern,new_article,t,count=1,flags=re.S)
    if n!=1:
        raise RuntimeError(f'internship article replacement failed for {path}: {n}')
    p.write_text(t2,encoding='utf-8')


def replace_once(path, old, new):
    p=Path(path)
    t=p.read_text(encoding='utf-8')
    if old not in t:
        raise RuntimeError(f'expected text not found in {path}: {old[:100]}')
    p.write_text(t.replace(old,new,1),encoding='utf-8')

# Tab summaries: use legal company identities, not brand shorthand.
replace_once('index.html','<span class="topic-sub">Sony · Rakuten</span>','<span class="topic-sub">Sony Corporation · Rakuten Group</span>')
replace_once('ja/index.html','<span class="topic-sub">ソニー · 楽天</span>','<span class="topic-sub">ソニー株式会社 · 楽天グループ</span>')
replace_once('zh-cn/index.html','<span class="topic-sub">索尼 · 乐天</span>','<span class="topic-sub">Sony Corporation · Rakuten Group</span>')
replace_once('zh-tw/index.html','<span class="topic-sub">Sony · 樂天</span>','<span class="topic-sub">Sony Corporation · Rakuten Group</span>')

sub_article('index.html','''<article class="detail-panel" id="panel-internships" role="tabpanel" aria-labelledby="topic-internships" data-panel="internships" aria-hidden="true" hidden>
          <div class="detail-layout internship-layout">
            <div class="detail-copy"><p class="detail-kicker">TECHNICAL INTERNSHIPS / 2026</p><h2>Selected technical internships</h2><div class="internship-list">
              <div class="internship-entry"><div class="internship-head"><strong>Sony Corporation</strong><span>Aug 31–Sep 11 · Minatomirai</span></div><p class="internship-program">職場密着インターン · 02_AI活用 クリエイター向け クラウドサービス・ソリューション開発</p><p class="internship-desc">AI-enabled cloud services and applications for creators, linked with Sony products and services.</p></div>
              <div class="internship-entry"><div class="internship-head"><strong>Rakuten Group, Inc.</strong><span>Sep 14–18 · Online</span></div><p class="internship-program">夏の陣 2026 · Software Engineer (SWE) 新規開発コース · Term 4</p><p class="internship-desc">Hackathon-style team development in the technology division of the Commerce &amp; Marketing Company.</p></div>
            </div></div>
            <div class="visual-cell visual-internships" aria-hidden="true"><span class="intern-year">2026</span><span class="intern-companies">SONY CORP. / RAKUTEN GROUP</span><span class="visual-caption">technical internships</span></div>
          </div>
        </article>''')

sub_article('ja/index.html','''<article class="detail-panel" id="panel-internships" role="tabpanel" aria-labelledby="topic-internships" data-panel="internships" aria-hidden="true" hidden>
          <div class="detail-layout internship-layout">
            <div class="detail-copy"><p class="detail-kicker">TECHNICAL INTERNSHIPS / 2026</p><h2>技術系インターンシップ</h2><div class="internship-list">
              <div class="internship-entry"><div class="internship-head"><strong>ソニー株式会社</strong><span>8/31–9/11 · みなとみらい</span></div><p class="internship-program">職場密着インターン · 02_AI活用 クリエイター向け クラウドサービス・ソリューション開発</p><p class="internship-desc">AIを活用し、ソニーの製品・サービスと連携するクリエイター向けクラウドサービス／アプリケーション開発。</p></div>
              <div class="internship-entry"><div class="internship-head"><strong>楽天グループ株式会社</strong><span>9/14–9/18 · オンライン</span></div><p class="internship-program">夏の陣 2026 · Software Engineer (SWE) 新規開発コース · Term 4</p><p class="internship-desc">コマース＆マーケティングカンパニーのテクノロジー部門で行う、ハッカソン型のチーム開発。</p></div>
            </div></div>
            <div class="visual-cell visual-internships" aria-hidden="true"><span class="intern-year">2026</span><span class="intern-companies">SONY CORP. / RAKUTEN GROUP</span><span class="visual-caption">technical internships</span></div>
          </div>
        </article>''')

sub_article('zh-cn/index.html','''<article class="detail-panel" id="panel-internships" role="tabpanel" aria-labelledby="topic-internships" data-panel="internships" aria-hidden="true" hidden><div class="detail-layout internship-layout"><div class="detail-copy"><p class="detail-kicker">TECHNICAL INTERNSHIPS / 2026</p><h2>技术类实习</h2><div class="internship-list"><div class="internship-entry"><div class="internship-head"><strong>Sony Corporation</strong><span>8/31–9/11 · 港未来</span></div><p class="internship-program">职场密着实习 · 官方课程 02「AI活用 クリエイター向け クラウドサービス・ソリューション開発」</p><p class="internship-desc">参与利用 AI、并与索尼产品和服务联动的创作者向云服务／应用开发。</p></div><div class="internship-entry"><div class="internship-head"><strong>Rakuten Group, Inc.</strong><span>9/14–9/18 · 在线</span></div><p class="internship-program">夏の陣 2026 · Software Engineer (SWE) 新規開発コース · Term 4</p><p class="internship-desc">在 Commerce &amp; Marketing Company 技术部门进行 Hackathon 型团队开发。</p></div></div></div><div class="visual-cell visual-internships" aria-hidden="true"><span class="intern-year">2026</span><span class="intern-companies">SONY CORP. / RAKUTEN GROUP</span><span class="visual-caption">technical internships</span></div></div></article>''')

sub_article('zh-tw/index.html','''<article class="detail-panel" id="panel-internships" role="tabpanel" aria-labelledby="topic-internships" data-panel="internships" aria-hidden="true" hidden><div class="detail-layout internship-layout"><div class="detail-copy"><p class="detail-kicker">TECHNICAL INTERNSHIPS / 2026</p><h2>技術類實習</h2><div class="internship-list"><div class="internship-entry"><div class="internship-head"><strong>Sony Corporation</strong><span>8/31–9/11 · 港未來</span></div><p class="internship-program">職場密著實習 · 官方課程 02「AI活用 クリエイター向け クラウドサービス・ソリューション開発」</p><p class="internship-desc">參與運用 AI、並與 Sony 產品及服務連動的創作者向雲端服務／應用程式開發。</p></div><div class="internship-entry"><div class="internship-head"><strong>Rakuten Group, Inc.</strong><span>9/14–9/18 · 線上</span></div><p class="internship-program">夏の陣 2026 · Software Engineer (SWE) 新規開発コース · Term 4</p><p class="internship-desc">在 Commerce &amp; Marketing Company 技術部門進行 Hackathon 型團隊開發。</p></div></div></div><div class="visual-cell visual-internships" aria-hidden="true"><span class="intern-year">2026</span><span class="intern-companies">SONY CORP. / RAKUTEN GROUP</span><span class="visual-caption">technical internships</span></div></div></article>''')

# Resume: preserve one-line density but make legal companies and programs unambiguous.
replace_once('cv/index.html','<p><strong>Selected internships:</strong> Sony (2026); Rakuten “Summer Internship / 夏の陣” (2026).</p>','<p><strong>Technical internships (2026):</strong> Sony Corporation — Workplace Immersion Internship, Course 02 (AI/cloud services for creators); Rakuten Group, Inc. — 夏の陣, SWE 新規開発コース, Term 4.</p>')

# Add compact editorial styling for the richer, factual internship records.
style=Path('assets/style.css')
s=style.read_text(encoding='utf-8')
anchor='.internship-proofs{margin-top:18px;gap:10px;font-size:11.1px}\n'
addition='''.internship-proofs{margin-top:18px;gap:10px;font-size:11.1px}\n.internship-layout{grid-template-columns:minmax(0,1fr) 138px;gap:18px}\n.internship-list{display:grid;gap:10px;margin-top:11px;max-width:510px}\n.internship-entry{padding-top:8px;border-top:1px solid rgba(36,34,40,.095)}\n.internship-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:baseline}\n.internship-head strong{font-family:var(--serif);font-size:12.6px;font-weight:400;line-height:1.25;color:var(--navy)}\n.internship-head span{font-size:8.7px;line-height:1.3;white-space:nowrap;color:var(--gold-text)}\n.detail-panel .internship-program{margin:4px 0 0;max-width:510px;font-size:9.8px;line-height:1.45;color:#5d5854}\n.detail-panel .internship-desc{margin:2px 0 0;max-width:510px;font-size:10.15px;line-height:1.5;color:#756e67}\n'''
if anchor not in s:
    raise RuntimeError('CSS internship anchor missing')
s=s.replace(anchor,addition,1)
# Mobile: drop the decorative duplicate block; factual records should own the space.
needle='  .internship-proofs{gap:9px;margin-top:16px}\n'
mobile='''  .internship-proofs{gap:9px;margin-top:16px}\n  .internship-layout{grid-template-columns:1fr}\n  .internship-list{gap:11px;margin-top:12px;max-width:none}\n  .internship-head{grid-template-columns:1fr;gap:2px}\n  .internship-head strong{font-size:12.9px}\n  .internship-head span{font-size:8.9px}\n  .detail-panel .internship-program{font-size:10.15px;max-width:none}\n  .detail-panel .internship-desc{font-size:10.35px;max-width:none}\n  .internship-layout .visual-internships{display:none}\n'''
if needle not in s:
    raise RuntimeError('mobile internship anchor missing')
s=s.replace(needle,mobile,1)
style.write_text(s,encoding='utf-8')

# Sanity checks.
for path in ['index.html','ja/index.html','zh-cn/index.html','zh-tw/index.html']:
    text=Path(path).read_text(encoding='utf-8')
    assert 'Sony · 2026' not in text and 'Rakuten · 2026' not in text
    assert 'Sony Corporation' in text or 'ソニー株式会社' in text
    assert 'Term 4' in text
assert 'Sony Corporation' in Path('cv/index.html').read_text(encoding='utf-8')
assert 'Rakuten Group, Inc.' in Path('cv/index.html').read_text(encoding='utf-8')
