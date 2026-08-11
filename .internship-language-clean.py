from pathlib import Path

changes = {
    'index.html': [
        ('UPCOMING INTERNSHIPS / 2026', 'INTERNSHIPS / 2026'),
        ('<h2>Upcoming internships</h2>', '<h2>Internships</h2>'),
        ('Sony Corporation · Workplace Immersion Internship', 'Sony Corporation · Internship · 2026'),
        ('Rakuten Group, Inc. · 夏の陣 2026 / Software Engineer', 'Rakuten Group, Inc. · Software Engineering Internship · 2026'),
        ('<span class="visual-caption">upcoming internships</span>', '<span class="visual-caption">internships</span>'),
    ],
    'ja/index.html': [
        ('UPCOMING INTERNSHIPS / 2026', 'INTERNSHIPS / 2026'),
        ('<h2>参加予定インターン</h2>', '<h2>インターンシップ</h2>'),
        ('ソニー株式会社 · 職場密着インターン', 'ソニー株式会社 · 職場密着インターン · 2026'),
        ('楽天グループ株式会社 · 夏の陣 2026 / Software Engineer', '楽天グループ株式会社 · エンジニアインターンシップ · 2026'),
        ('<span class="visual-caption">upcoming internships</span>', '<span class="visual-caption">internships</span>'),
    ],
    'zh-cn/index.html': [
        ('UPCOMING INTERNSHIPS / 2026', 'INTERNSHIPS / 2026'),
        ('<h2>计划参加的实习</h2>', '<h2>实习</h2>'),
        ('Sony Corporation · 职场密着实习', 'Sony Corporation · 技术实习 · 2026'),
        ('Rakuten Group, Inc. · 夏の陣 2026 / Software Engineer', 'Rakuten Group, Inc. · 软件工程实习 · 2026'),
        ('<span class="visual-caption">upcoming internships</span>', '<span class="visual-caption">internships</span>'),
    ],
    'zh-tw/index.html': [
        ('UPCOMING INTERNSHIPS / 2026', 'INTERNSHIPS / 2026'),
        ('<h2>預計參加的實習</h2>', '<h2>實習</h2>'),
        ('Sony Corporation · 職場密著實習', 'Sony Corporation · 技術實習 · 2026'),
        ('Rakuten Group, Inc. · 夏の陣 2026 / Software Engineer', 'Rakuten Group, Inc. · 軟體工程實習 · 2026'),
        ('<span class="visual-caption">upcoming internships</span>', '<span class="visual-caption">internships</span>'),
    ],
    'cv/index.html': [
        ('<strong>Upcoming technical internships (2026):</strong> Sony Corporation — 職場密着インターン; Rakuten Group, Inc. — 夏の陣 2026 / Software Engineer.', '<strong>Selected internships (2026):</strong> Sony Corporation — Internship; Rakuten Group, Inc. — Software Engineering Internship.'),
    ],
}

for path, pairs in changes.items():
    p = Path(path)
    text = p.read_text(encoding='utf-8')
    for old, new in pairs:
        if old not in text:
            raise RuntimeError(f'{path}: missing expected text: {old}')
        text = text.replace(old, new, 1)
    p.write_text(text, encoding='utf-8')

checks = {
    'index.html': ['Sony Corporation · Internship · 2026', 'Rakuten Group, Inc. · Software Engineering Internship · 2026'],
    'ja/index.html': ['ソニー株式会社 · 職場密着インターン · 2026', '楽天グループ株式会社 · エンジニアインターンシップ · 2026'],
    'zh-cn/index.html': ['Sony Corporation · 技术实习 · 2026', 'Rakuten Group, Inc. · 软件工程实习 · 2026'],
    'zh-tw/index.html': ['Sony Corporation · 技術實習 · 2026', 'Rakuten Group, Inc. · 軟體工程實習 · 2026'],
}
for path, expected in checks.items():
    text = Path(path).read_text(encoding='utf-8')
    assert 'UPCOMING INTERNSHIPS' not in text
    assert 'upcoming internships' not in text.lower()
    for s in expected:
        assert s in text

cv = Path('cv/index.html').read_text(encoding='utf-8')
assert 'Upcoming technical internships' not in cv
assert '職場密着' not in cv
assert '夏の陣' not in cv
assert 'Software Engineering Internship' in cv
