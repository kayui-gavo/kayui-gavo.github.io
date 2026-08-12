from pathlib import Path


def replace_once(path, old, new):
    p=Path(path)
    text=p.read_text(encoding='utf-8')
    if old not in text:
        raise RuntimeError(f'not found in {path}: {old[:120]}')
    p.write_text(text.replace(old,new,1),encoding='utf-8')

# English personal profile: visible copy is clearly first-person; metadata stays third-person and carries entity gender.
replace_once('index.html',
'<meta name="description" content="Kewei Liu is an M.S. student at The University of Tokyo studying speech, language, and multimodal interaction for Japanese-language learning, with work in education R&amp;D and product development.">',
'<meta name="description" content="Kewei Liu is an M.S. student at The University of Tokyo. She studies speech, language, and multimodal interaction for Japanese-language learning and also works in education R&amp;D and product development.">')
replace_once('index.html',
'"name":"Kewei Liu","alternateName"',
'"name":"Kewei Liu","gender":"Female","pronouns":"she/her","alternateName"')
replace_once('index.html',
'"description":"Kewei Liu is an M.S. student at The University of Tokyo studying speech, language, and multimodal interaction for Japanese-language learning, with work in education R&D and product development."',
'"description":"Kewei Liu is an M.S. student at The University of Tokyo. She studies speech, language, and multimodal interaction for Japanese-language learning and also works in education R&D and product development."')
replace_once('index.html',
'<p class="lede">M.S. student at The University of Tokyo studying speech, language, and multimodal interaction for Japanese-language learning.</p>',
'<p class="lede">I am an M.S. student at The University of Tokyo, studying speech, language, and multimodal interaction for Japanese-language learning.</p>')

# Japanese personal profile: Japanese subject omission is already the most natural self-authored voice; only strengthen machine-readable identity.
replace_once('ja/index.html',
'"name":"Kewei Liu","alternateName"',
'"name":"Kewei Liu","gender":"Female","pronouns":"she/her","alternateName"')

# Simplified Chinese personal profile: remove the visible third-person switch inside an otherwise self-authored page.
replace_once('zh-cn/index.html',
'目前在中国旅人教育集团株式会社参与课程与学习设计、教材与教育内容开发，以及教育产品开发。她此前在行知学园关西校有4年数学、物理教学与升学指导经验，并曾在京都大学担任电气电子回路课程教学支持和留学生辅导员。',
'目前在中国旅人教育集团株式会社参与课程与学习设计、教材与教育内容开发，以及教育产品开发。此前在行知学园关西校有4年数学、物理教学与升学指导经验，也曾在京都大学担任电气电子回路课程教学支持和留学生辅导员。')

# Traditional Chinese: keep visible copy subject-omitting and natural; metadata provides an explicit female signal.
replace_once('zh-tw/index.html',
'<meta name="description" content="劉可惟，東京大學工學系研究科電氣系工學專攻碩士生，研究日語學習者的口語表達支援、語音語言處理與多模態互動，並在中国旅人教育集团株式会社參與教育研究、課程設計、教材與教育產品開發。">',
'<meta name="description" content="劉可惟為東京大學工學系研究科電氣系工學專攻碩士生。她研究日語學習者的口語表達支援、語音語言處理與多模態互動，並參與課程設計、教材與教育產品開發。">')
replace_once('zh-tw/index.html',
'"name":"Kewei Liu","alternateName"',
'"name":"Kewei Liu","gender":"Female","pronouns":"she/her","alternateName"')
replace_once('zh-tw/index.html',
'"description":"劉可惟，東京大學工學系研究科電氣系工學專攻碩士生，研究日語學習者的口語表達支援、語音語言處理與多模態互動，並在中国旅人教育集团株式会社參與教育研究、課程設計、教材與教育產品開發。"',
'"description":"劉可惟為東京大學工學系研究科電氣系工學專攻碩士生。她研究日語學習者的口語表達支援、語音語言處理與多模態互動，並參與課程設計、教材與教育產品開發。"')

# Education page: metadata/structured data are third-person; visible page uses neutral bio + first-person for lived experience and teaching method.
replace_once('education/index.html',
'<meta name="description" content="刘可惟，日本理工科升学指导。京都大学工学部电气电子工学科毕业，现就读东京大学大学院工学系研究科。累计授课800小时以上，具有东京科学大学、京都大学、早稻田大学等理工科升学指导实绩，擅长数学、物理及电气电子方向大学院入学考试指导。">',
'<meta name="description" content="刘可惟，日本理工科升学指导教师。她本科毕业于京都大学工学部电气电子工学科，现就读东京大学大学院工学系研究科，累计授课800小时以上，擅长数学、物理及电气电子方向大学院入学考试指导。">')
replace_once('education/index.html',
'"image":"https://kayui-gavo.github.io/assets/portrait.webp","affiliation"',
'"image":"https://kayui-gavo.github.io/assets/portrait.webp","description":"刘可惟是日本理工科升学指导教师。她本科毕业于京都大学工学部电气电子工学科，现就读东京大学大学院工学系研究科，长期从事数学、物理及电气电子方向升学指导。","affiliation"')
replace_once('education/index.html',
'<p class="intro">刘可惟本科毕业于京都大学电气电子工学科，现就读东京大学工学系研究科。她长期面向中国留学生教授数学、物理，并提供理工科学部与电气电子方向大学院入学考试指导。</p>',
'<p class="intro">本科毕业于京都大学电气电子工学科，现就读东京大学工学系研究科。长期面向中国留学生教授数学、物理，并提供理工科学部与电气电子方向大学院入学考试指导。</p>')
replace_once('education/index.html',
'以上学生均接受过本人负责的专项班课、一对一课程，或口头试问、面试指导；人数按录取学校分别统计。',
'以上学生均接受过我负责的专项班课、一对一课程，或口头试问、面试指导；人数按录取学校分别统计。')
replace_once('education/index.html',
'本人 EJU：<b>数学 200 / 200</b>　物理 92　化学 98',
'我的 EJU 成绩：<b>数学 200 / 200</b>　物理 92　化学 98')
replace_once('education/index.html',
'本人选考：数学1、数学2、电磁学1、电磁学2、电路、电子电路、自动控制',
'我当时选择：数学1、数学2、电磁学1、电磁学2、电路、电子电路、自动控制')
replace_once('education/index.html',
'本人选考：电气回路、控制与电气能源工程',
'我当时选择：电气回路、控制与电气能源工程')
replace_once('education/index.html',
'<p>课程会先确认招生简章、历年试题和学校公开资料。笔试里要把思路写清楚，口试里要把原理讲清楚；志望理由也要能经得起教授继续追问。</p>',
'<p>我会先根据招生简章、历年试题和学校公开资料确定训练重点。笔试要把思路写清楚，口试要把原理讲清楚；志望理由也要能经得起教授继续追问。</p>')

# Sanity checks: visible personal-profile copy should not unexpectedly narrate the owner as "she".
assert '她此前在行知学园' not in Path('zh-cn/index.html').read_text(encoding='utf-8')
assert '刘可惟本科毕业于京都大学电气电子工学科，现就读东京大学工学系研究科。她长期' not in Path('education/index.html').read_text(encoding='utf-8')
assert '我当时选择：' in Path('education/index.html').read_text(encoding='utf-8')
assert '"gender":"Female"' in Path('index.html').read_text(encoding='utf-8')
assert '"gender":"Female"' in Path('ja/index.html').read_text(encoding='utf-8')
assert '"gender":"Female"' in Path('zh-tw/index.html').read_text(encoding='utf-8')
