from pathlib import Path
p=Path('education/index.html')
s=p.read_text(encoding='utf-8')
s=s.replace('我的 EJU 成绩：<b>数学 200 / 200</b>　物理 92　化学 98','我的 EJU 最高成绩：<b>数学 200 / 200</b>　物理 96 / 100　化学 98 / 100')
s=s.replace('高出资格基准 213 分合格</strong><small>总分 820 分 · 当年有资格者基准 410 分','高出当年合格最低线 213 分</strong><small>总分 820 分 · 当年合格最低线 410 分')
assert '物理 92' not in s
assert '资格基准 213' not in s
p.write_text(s,encoding='utf-8')
