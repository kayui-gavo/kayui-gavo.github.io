from pathlib import Path
p=Path('education/index.html')
s=p.read_text(encoding='utf-8')
s=s.replace('我的 EJU 最高成绩：<b>数学 200 / 200</b>　物理 96 / 100　化学 98 / 100','我的 EJU 成绩：<b>数学 200 / 200</b>　物理 92 / 100（当次最高分 96）　化学 98 / 100（当次最高分 98）')
assert '物理 96 / 100' not in s
assert '物理 92 / 100（当次最高分 96）' in s
assert '化学 98 / 100（当次最高分 98）' in s
p.write_text(s,encoding='utf-8')
