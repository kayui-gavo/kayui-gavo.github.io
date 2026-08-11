from pathlib import Path

repls = {
'index.html': [
('UPCOMING INTERNSHIPS / 2026','INTERNSHIPS / 2026'),
('<h2>Upcoming internships</h2>','<h2>Internships</h2>'),
('Sony Corporation · Workplace Immersion Internship','Sony Corporation · 職場密着インターン · 2026'),
('Rakuten Group, Inc. · 夏の陣 2026 / Software Engineer','Rakuten Group, Inc. · 夏の陣 2026 / Software Engineer'),
('<span class="visual-caption">upcoming internships</span>','<span class="visual-caption">internships</span>'),
],
'ja/index.html': [
('UPCOMING INTERNSHIPS / 2026','INTERNSHIPS / 2026'),
('<h2>参加予定インターン</h2>','<h2>インターンシップ</h2>'),
('ソニー株式会社 · 職場密着インターン','ソニー株式会社 · 職場密着インターン · 2026'),
('<span class="visual-caption">upcoming internships</span>','<span class="visual-caption">internships</span>'),
],
'zh-cn/index.html': [
('UPCOMING INTERNSHIPS / 2026','INTERNSHIPS / 2026'),
('<h2>计划参加的实习</h2>','<h2>实习</h2>'),
('Sony Corporation · 職場密着インターン','Sony Corporation · 職場密着インターン · 2026'),
('<span class="visual-caption">upcoming internships</span>','<span class="visual-caption">internships</span>'),
],
'zh-tw/index.html': [
('UPCOMING INTERNSHIPS / 2026','INTERNSHIPS / 2026'),
('<h2>預計參加的實習</h2>','<h2>實習</h2>'),
('Sony Corporation · 職場密着インターン','Sony Corporation · 職場密着インターン · 2026'),
('<span class="visual-caption">upcoming internships</span>','<span class="visual-caption">internships</span>'),
],
'cv/index.html': [
('<strong>Upcoming technical internships (2026):</strong> Sony Corporation — 職場密着インターン; Rakuten Group, Inc. — 夏の陣 2026 / Software Engineer.','<strong>Selected internships (2026):</strong> Sony Corporation — 職場密着インターン; Rakuten Group, Inc. — 夏の陣 / Software Engineer.'),
],
}

for path, pairs in repls.items():
    p=Path(path)
    t=p.read_text(encoding='utf-8')
    for old,new in pairs:
        if old not in t:
            # Rakuten English pair can be identical; skip intentional no-op.
            if old==new:
                continue
            raise RuntimeError(f'{path}: missing {old!r}')
        t=t.replace(old,new,1)
    p.write_text(t,encoding='utf-8')

for path in ['index.html','ja/index.html','zh-cn/index.html','zh-tw/index.html','cv/index.html']:
    t=Path(path).read_text(encoding='utf-8')
    assert 'UPCOMING INTERNSHIPS' not in t
    assert 'upcoming internships' not in t.lower()
    assert 'Workplace Immersion Internship' not in t
