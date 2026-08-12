from pathlib import Path

# Root: strengthen Google site-name fallback without changing the preferred name.
p = Path('index.html')
s = p.read_text(encoding='utf-8')
old = '"name":"Kewei Liu","alternateName":["劉 可惟","刘可惟","劉可惟"],"inLanguage"'
new = '"name":"Kewei Liu","alternateName":["Kewei Liu / 劉可惟","劉 可惟","刘可惟","劉可惟"],"inLanguage"'
assert old in s
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')

# Simplified Chinese profile: explicit, natural female reference in visible copy + machine-readable Person data.
p = Path('zh-cn/index.html')
s = p.read_text(encoding='utf-8')
s = s.replace(
    'content="刘可惟，东京大学工学系研究科电气系工学专攻硕士生，研究日语学习者口语表达支持、语音语言处理与多模态交互，并在中国旅人教育集团株式会社参与教研、课程设计、教材与教育产品开发。"',
    'content="刘可惟，东京大学工学系研究科电气系工学专攻硕士生。她研究日语学习者口语表达支持、语音语言处理与多模态交互，并在中国旅人教育集团株式会社参与教研、课程设计、教材与教育产品开发。"',
    1,
)
s = s.replace(
    '"name":"Kewei Liu","alternateName":["劉 可惟","刘可惟","劉可惟"]',
    '"name":"Kewei Liu","gender":"Female","pronouns":"she/her","alternateName":["劉 可惟","刘可惟","劉可惟"]',
    1,
)
s = s.replace(
    '"description":"刘可惟，东京大学工学系研究科电气系工学专攻硕士生，研究日语学习者口语表达支持、语音语言处理与多模态交互，并在中国旅人教育集团株式会社参与教研、课程设计、教材与教育产品开发。"',
    '"description":"刘可惟，东京大学工学系研究科电气系工学专攻硕士生。她研究日语学习者口语表达支持、语音语言处理与多模态交互，并在中国旅人教育集团株式会社参与教研、课程设计、教材与教育产品开发。"',
    1,
)
s = s.replace(
    '目前在中国旅人教育集团株式会社参与课程与学习设计、教材与教育内容开发，以及教育产品开发。此前在行知学园关西校有4年数学、物理教学与升学指导经验，并曾在京都大学担任电气电子回路 OA 和留学生辅导员。',
    '目前在中国旅人教育集团株式会社参与课程与学习设计、教材与教育内容开发，以及教育产品开发。她此前在行知学园关西校有4年数学、物理教学与升学指导经验，并曾在京都大学担任电气电子回路课程教学支持和留学生辅导员。',
    1,
)
p.write_text(s, encoding='utf-8')

# Education page: use natural third-person biography and the same machine-readable identity.
p = Path('education/index.html')
s = p.read_text(encoding='utf-8')
s = s.replace(
    '"name":"Kewei Liu","alternateName":["刘可惟","劉可惟","劉 可惟"]',
    '"name":"Kewei Liu","gender":"Female","pronouns":"she/her","alternateName":["刘可惟","劉可惟","劉 可惟"]',
    1,
)
s = s.replace(
    '<p class="intro">本科毕业于京都大学电气电子工学科，现就读东京大学工学系研究科。长期面向中国留学生教授数学、物理，并提供理工科学部与电气电子方向大学院入学考试指导。</p>',
    '<p class="intro">刘可惟本科毕业于京都大学电气电子工学科，现就读东京大学工学系研究科。她长期面向中国留学生教授数学、物理，并提供理工科学部与电气电子方向大学院入学考试指导。</p>',
    1,
)
p.write_text(s, encoding='utf-8')

# Sanity checks.
assert '"name":"Kewei Liu","alternateName":["Kewei Liu / 劉可惟"' in Path('index.html').read_text(encoding='utf-8')
for f in ['zh-cn/index.html', 'education/index.html']:
    t = Path(f).read_text(encoding='utf-8')
    assert '"gender":"Female"' in t and '"pronouns":"she/her"' in t
assert '她此前在行知学园关西校' in Path('zh-cn/index.html').read_text(encoding='utf-8')
assert '她长期面向中国留学生' in Path('education/index.html').read_text(encoding='utf-8')
