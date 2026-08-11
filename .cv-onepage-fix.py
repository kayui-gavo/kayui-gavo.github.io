from pathlib import Path
import re

cv_html = r'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kewei Liu — Resume</title>
<meta name="description" content="One-page resume of Kewei Liu, M.S. student at The University of Tokyo working on multimodal AI, speech processing, education R&D, and product development.">
<meta name="robots" content="index,follow">
<meta name="author" content="Kewei Liu">
<meta name="theme-color" content="#f7f2e9">
<link rel="canonical" href="https://kayui-gavo.github.io/cv/">
<meta property="og:type" content="profile"><meta property="og:url" content="https://kayui-gavo.github.io/cv/"><meta property="og:title" content="Kewei Liu — Resume"><meta property="og:description" content="One-page resume: multimodal AI, speech processing, research, and education product development."><meta property="og:image" content="https://kayui-gavo.github.io/assets/og-cover.png"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
<link rel="stylesheet" href="./cv.css">
</head>
<body>
<div class="page-wrap">
  <nav class="topbar"><a href="../">← Home</a><span>Resume</span></nav>
  <main class="resume">
    <header class="resume-head">
      <h1>KEWEI LIU</h1>
      <p class="role">M.S. Student <span>|</span> Multimodal AI and Speech Processing</p>
      <p class="contact">Tokyo, Japan <b>•</b> <a href="mailto:liu-kewei@gavo.t.u-tokyo.ac.jp">liu-kewei@gavo.t.u-tokyo.ac.jp</a> <b>•</b> +81 90-6670-3996 <b>•</b> <a href="https://github.com/kayui-gavo">github.com/kayui-gavo</a> <b>•</b> <a href="https://kayui-gavo.github.io/">website</a></p>
    </header>

    <section>
      <h2>EDUCATION</h2>
      <div class="edu entry">
        <div class="line"><strong>The University of Tokyo</strong><span>Apr. 2026 – Mar. 2028 expected</span></div>
        <div class="line sub"><span>M.S., Electrical Engineering and Information Systems, Graduate School of Engineering</span><span>Tokyo, Japan</span></div>
        <p>Minematsu–Saito Laboratory. Current research on AI-assisted speaking support for Japanese learners.</p>
      </div>
      <div class="edu entry">
        <div class="line"><strong>Kyoto University</strong><span>Apr. 2022 – Mar. 2026</span></div>
        <div class="line sub"><span>B.Eng., Electrical and Electronic Engineering, Faculty of Engineering</span><span>Kyoto, Japan</span></div>
        <p>Yoshii Laboratory. Bachelor's thesis on user-controlled multimodal video summarization.</p>
      </div>
    </section>

    <section>
      <h2>RESEARCH &amp; PRODUCT DEVELOPMENT</h2>
      <div class="entry project">
        <div class="line"><strong>User-Controlled Video Summarization</strong><span>First author | APSIPA ASC 2026 accepted</span></div>
        <ul>
          <li>Defined a video-summarization task in which users specify how the emotional tone should evolve while the summary still retains key scenes.</li>
          <li>Designed a multimodal model that adjusts image, audio, and subtitle contributions scene by scene and selects a sequence that balances the requested progression with content importance.</li>
          <li>On TVSum (50 YouTube videos, 5-fold cross-validation), improved internal trajectory alignment by 24% (0.427 to 0.531) while maintaining comparable overlap with human-rated key scenes. Led problem formulation, implementation, evaluation, analysis, and manuscript preparation.</li>
        </ul>
      </div>
      <div class="entry project">
        <div class="line"><strong>Multidimensional Japanese Pronunciation Evaluation R&amp;D</strong><span>Speech evaluation | Current R&amp;D</span></div>
        <ul>
          <li>Built speech-evaluation logic for Chinese-speaking learners of Japanese, producing separate feedback on pronunciation, rhythm, fluency, and pitch.</li>
          <li>Diagnosed cases where mismatched or low-quality recordings received implausibly high scores and introduced a no-score policy when the available evidence was insufficient.</li>
          <li>Used AI coding assistants to compare implementation options and draft edge-case tests, then validated changes with audio review, structured logs, automated tests, and a browser-based failure-review tool.</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>PROFESSIONAL EXPERIENCE</h2>
      <div class="entry project">
        <div class="line"><strong>China Tabito Education Group</strong><span>Shareholder · Education R&amp;D &amp; Product Development | Current</span></div>
        <ul>
          <li>Work on education research, curriculum and learning design, teaching materials, educational content, and education product development for students preparing for Japanese university admissions.</li>
          <li>Design physics curricula and materials for the EJU, Common Test, and university entrance examinations, informed by classroom practice and recurring learner difficulties.</li>
        </ul>
      </div>
      <div class="entry project compact-project">
        <div class="line"><strong>Coach Academy</strong><span>Instructor &amp; Admissions Advisor | 4 years</span></div>
        <ul>
          <li>Taught mathematics and physics to international students and advised on school selection, application planning, personal statements, interviews, and oral examinations.</li>
          <li>Used student questions and written errors to identify recurring barriers in reading Japanese problems, drawing physical models, and setting up equations; revised lessons and exercises accordingly.</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>ADDITIONAL EXPERIENCE &amp; RECOGNITION</h2>
      <div class="compact-lines">
        <p><strong>Kyoto University:</strong> Electrical &amp; Electronic Circuits OA, Oct. 2024 – Mar. 2025; International Student Tutor, Apr. 2025 – Mar. 2026.</p>
        <p><strong>Selected internships:</strong> Sony (2026); Rakuten “Summer Internship / 夏の陣” (2026).</p>
        <p><strong>Awards &amp; Scholarships:</strong> Ichikawa International Scholarship Foundation Scholar (2023–2024); MEXT/JASSO Honors Scholarship (2022–2023); Excellence Award, Electrical and Electronic Circuits Poster Presentation, Kyoto University (2023).</p>
      </div>
    </section>

    <section class="skills-section">
      <h2>TECHNICAL SKILLS &amp; LANGUAGES</h2>
      <div class="skills">
        <strong>Programming</strong><span>Python, PyTorch, NumPy, pandas, scikit-learn, MATLAB</span>
        <strong>ML / Evaluation</strong><span>Multimodal machine learning, experiment design, cross-validation, ablation studies, statistical evaluation, failure analysis</span>
        <strong>Speech / Audio</strong><span>MFCC-DTW alignment, F0, rhythm, pause, and mora-timing analysis</span>
        <strong>Development</strong><span>Git/GitHub, Linux, Docker, pytest, structured logging, HTML/CSS, LaTeX</span>
        <strong>Languages</strong><span>Mandarin Chinese (native), Japanese (JLPT N1), English (TOEFL iBT 81)</span>
        <strong>Interests</strong><span>Music, Go (amateur 2-dan), Chinese calligraphy</span>
      </div>
    </section>
  </main>
</div>
</body>
</html>
'''

cv_css = r''':root{--ivory:#f7f2e9;--paper:#fff;--ink:#202322;--accent:#1c4d34;--muted:#59655f;--rule:#d4ded8;--sans:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans","Noto Sans JP",Arial,sans-serif}
*{box-sizing:border-box}html{background:var(--ivory)}body{margin:0;color:var(--ink);background:linear-gradient(180deg,#fcfaf5,var(--ivory));font-family:var(--sans);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}a{color:inherit;text-decoration:none}.page-wrap{width:min(960px,calc(100% - 40px));margin:0 auto;padding:24px 0 56px}.topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:#6a655f}.topbar a{border-bottom:1px solid #b79a6c}.resume{background:var(--paper);box-shadow:0 18px 48px rgba(28,41,69,.11);padding:11mm 14.5mm 10mm}.resume-head{text-align:center;padding-bottom:6px;border-bottom:1px solid var(--accent)}h1{margin:0;color:var(--accent);font-size:31px;line-height:1;font-weight:750;letter-spacing:.03em}.role{margin:4px 0 0;color:var(--muted);font-size:11.5px}.role span{color:#a8b2ac;margin:0 5px}.contact{margin:5px 0 0;font-size:10.5px;line-height:1.35}.contact b{font-weight:400;color:#b8c1bc;margin:0 5px}section{margin-top:8px}h2{margin:0 0 4px;color:var(--accent);font-size:10.6px;line-height:1.2;letter-spacing:.055em;font-weight:760;border-bottom:1px solid var(--rule);padding-bottom:2px}.entry{margin-top:4px}.line{display:flex;justify-content:space-between;align-items:baseline;gap:14px;font-size:10.45px;line-height:1.25}.line strong{font-weight:700}.line>span:last-child{color:var(--muted);white-space:nowrap;font-size:9.8px}.line.sub{margin-top:1px;color:#4e5551;font-size:9.75px}.line.sub>span:last-child{font-size:9.4px}.entry p{margin:2px 0 0;color:var(--muted);font-size:9.55px;line-height:1.34}.project{margin-top:5px}.project ul{margin:2.5px 0 0;padding-left:14px}.project li{margin:1.2px 0;font-size:9.65px;line-height:1.34}.compact-project{margin-top:4px}.compact-lines p{margin:2.1px 0;font-size:9.45px;line-height:1.32}.compact-lines strong{font-weight:700}.skills-section{margin-top:7px}.skills{display:grid;grid-template-columns:103px minmax(0,1fr);gap:1.8px 10px;font-size:9.4px;line-height:1.27}.skills strong{font-weight:700}.skills span{color:#454c48}@media(max-width:700px){.page-wrap{width:calc(100% - 18px);padding-top:14px}.resume{padding:24px 20px;box-shadow:none}.line{display:block}.line>span:last-child{display:block;margin-top:1px;white-space:normal}.line.sub>span:last-child{display:block}.skills{grid-template-columns:1fr;gap:1px}.skills span{margin-bottom:3px}.contact{font-size:10px}.contact b{margin:0 3px}}@page{size:A4;margin:0}@media print{html,body{background:#fff}.page-wrap{width:210mm;margin:0;padding:0}.topbar{display:none}.resume{width:210mm;height:297mm;overflow:hidden;box-shadow:none;padding:10.5mm 14.5mm 9mm}h1{font-size:29px}.role{font-size:10.8px}.contact{font-size:9.7px}section{margin-top:6.8px}h2{font-size:10px;margin-bottom:3.5px}.line{font-size:9.9px}.line>span:last-child{font-size:9.25px}.line.sub{font-size:9.15px}.line.sub>span:last-child{font-size:8.9px}.entry p{font-size:9.05px;line-height:1.28}.project{margin-top:4.3px}.project ul{margin-top:2px}.project li{font-size:9.05px;line-height:1.27;margin:1px 0}.compact-lines p{font-size:8.95px;line-height:1.25}.skills{grid-template-columns:96px minmax(0,1fr);font-size:8.9px;line-height:1.2;gap:1.3px 9px}a{color:inherit}}
'''

Path('cv/index.html').write_text(cv_html, encoding='utf-8')
Path('cv/cv.css').write_text(cv_css, encoding='utf-8')

# Remove the homepage PDF shortcut from every localized homepage.
for path in ['index.html','ja/index.html','zh-cn/index.html','zh-tw/index.html']:
    p=Path(path)
    t=p.read_text(encoding='utf-8')
    t,n=re.subn(r'<a class="cv-pdf-link"[^>]*>PDF <span>↓</span></a>', '', t, count=1)
    if n != 1:
        raise RuntimeError(f'PDF shortcut not found in {path}')
    p.write_text(t, encoding='utf-8')

print('one-page CV source written')
