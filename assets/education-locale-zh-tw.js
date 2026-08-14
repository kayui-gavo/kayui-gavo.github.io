(() => {
  const protectedPhrases = [
    '時間雇用教職員', '電気電子回路 OA', '留学生 Tutor', '株式会社',
    '東京都中野区中野1-55-3', 'フェリスビル 4F', 'でんでん🐌⚡'
  ];
  const phraseMap = new Map([
    ['日本学部留学咨询','日本學部留學諮詢'],
    ['从数学表达回到物理现象，从基本模型走向复杂问题。','從數學式看懂物理現象，從基本模型拆解複雜問題。'],
    ['旅人教育官网','旅人教育官網'],['官方网站','官方網站'],['官方内容与账号','官方內容與帳號'],
    ['小红书','小紅書'],['微信公众号','微信公眾號'],['百度百科','百度百科'],
    ['信息通信','資訊通訊'],['信息工程','資訊工程'],['信息系统','資訊系統'],['多模态信息处理','多模態資訊處理'],
    ['信号处理','訊號處理'],['语音 / 音频','語音 / 音訊'],['机器学习','機器學習'],['通信与网络','通訊與網路'],['通信・网络','通訊・網路'],
    ['电子器件','電子元件'],['半导体・器件','半導體・元件'],['网页开发','網頁開發'],['官网与网页开发','官網與網頁開發'],
    ['课程咨询','課程諮詢'],['咨询课程','諮詢課程'],['报考规划','報考規劃'],['本科报考规划','本科報考規劃'],
    ['教学经历','教學經歷'],['教学记录','教學記錄'],['指导实绩','指導實績'],['本科入试指导实绩','本科入試指導實績'],
    ['实际教学与录取反馈','實際教學與錄取回饋'],['学生课程反馈','學生課程回饋'],['录取反馈','錄取回饋'],
    ['理科口试','理科口試'],['校内考','校內考'],['共通考试','共通考試'],['本人 EJU 成绩','本人 EJU 成績'],
    ['当次最高分','當次最高分'],['当年最低合格分','當年最低合格分'],['高出 213 分','高出 213 分'],
    ['页面导航','頁面導覽'],['手机端页面导航','手機版頁面導覽'],['查看上一条记录','查看上一則記錄'],['查看下一条记录','查看下一則記錄'],
    ['左右滑动查看','左右滑動查看'],['已复制','已複製'],['扫码添加好友','掃碼新增好友'],['添加好友时请备注来意','新增好友時請備註來意'],
    ['请使用 QQ 扫码添加好友','請使用 QQ 掃碼新增好友'],['个人主页','個人首頁'],['研究与个人经历','研究與個人經歷'],
    ['东京科学大学','東京科學大學'],['东京工业大学','東京工業大學'],['东京大学大学院','東京大學大學院'],['京都大学','京都大學'],['早稻田大学','早稻田大學'],['北海道大学','北海道大學'],['九州工业大学','九州工業大學'],
    ['行知学园关西校','行知學園關西校'],['东京・中野','東京・中野'],['东京中野教室','東京中野教室'],
    ['电气电子・信息通信・AI','電氣電子・資訊通訊・AI'],['电气电子・信息方向咨询','電氣電子・資訊方向諮詢'],['电气电子・信息通信方向咨询','電氣電子・資訊通訊方向諮詢'],
    ['电力・能源','電力・能源'],['电路・控制','電路・控制'],['信号处理・信息','訊號處理・資訊'],['电磁波・光电子','電磁波・光電子'],['计算机・AI','計算機・AI'],
    ['暂态过程','暫態過程'],['频率响应','頻率響應'],['小信号分析','小訊號分析'],['自动控制','自動控制'],['电能转换','電能轉換'],
    ['书面作答','書面作答'],['材料审查','材料審查'],['志望理由、面试与口试准备','志望理由、面試與口試準備'],
    ['面试 / 口试','面試 / 口試'],['面试与专业问答','面試與專業問答'],['专业口试','專業口試'],['口头试问','口頭試問'],
    ['理工科讲师','理工科講師'],['物理讲师','物理講師'],['教学支持','教學支援'],['留学生','留學生'],
    ['简中','簡中'],['繁中','繁中']
  ]);
  const charMap = {
    '刘':'劉','东':'東','学':'學','业':'業','专':'專','讲':'講','导':'導','实':'實','绩':'績','试':'試','验':'驗','图':'圖','标':'標','规':'規','划':'劃',
    '课':'課','录':'錄','类':'類','师':'師','场':'場','网':'網','络':'絡','页':'頁','开':'開','发':'發','产':'產','经':'經','历':'歷','园':'園',
    '与':'與','从':'從','为':'為','并':'並','会':'會','个':'個','门':'門','长':'長','应':'應','时':'時','过':'過','这':'這','内':'內','还':'還','写':'寫',
    '书':'書','数':'數','变':'變','复':'複','现':'現','对':'對','达':'達','项':'項','结':'結','构':'構','组':'組','练':'練','习':'習','调':'調','顺':'順',
    '础':'礎','说':'說','题':'題','样':'樣','总':'總','区':'區','体':'體','统':'統','电':'電','气':'氣','线':'線','暂':'暫','态':'態','静':'靜',
    '麦':'麥','带':'帶','极':'極','积':'積','仅':'僅','则':'則','间':'間','简':'簡','华':'華','万':'萬','后':'後','国':'國','团':'團','处':'處',
    '声':'聲','频':'頻','资':'資','讯':'訊','脑':'腦','机':'機','习':'習','维':'維','评':'評','价':'價','筛':'篩','选':'選','权':'權','总':'總',
    '毕':'畢','设':'設','计':'計','备':'備','签':'簽','证':'證','确':'確','认':'認','问':'問','关':'關','块':'塊','较':'較','给':'給','该':'該',
    '历':'歷','届':'屆','员':'員','别':'別','层':'層','优':'優','势':'勢','换':'換','计':'計','额':'額','记':'記','述':'述','稳':'穩','准':'準',
    '获':'獲','达':'達','属':'屬','围':'圍','汇':'匯','归':'歸','谐':'諧','摆':'擺','递':'遞','归':'歸','减':'減','误':'誤','读':'讀','懂':'懂',
    '毕':'畢','简':'簡','繁':'繁','线':'線','径':'徑','载':'載','还':'還','冲':'衝','筛':'篩','围':'圍','联':'聯','系':'系','质':'質','热':'熱'
  };

  const convert = input => {
    if (!input) return input;
    const tokens = [];
    let text = input;
    protectedPhrases.forEach((phrase, i) => {
      if (!text.includes(phrase)) return;
      const token = `__EDUP${i}__`;
      tokens[i] = phrase;
      text = text.split(phrase).join(token);
    });
    [...phraseMap.entries()].sort((a,b) => b[0].length - a[0].length).forEach(([from,to]) => {
      text = text.split(from).join(to);
    });
    text = [...text].map(ch => charMap[ch] || ch).join('');
    tokens.forEach((phrase, i) => { if (phrase) text = text.split(`__EDUP${i}__`).join(phrase); });
    return text;
  };

  const convertTree = root => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        const p = node.parentElement;
        if (!p || /^(SCRIPT|STYLE|NOSCRIPT|CODE|PRE|TEXTAREA)$/i.test(p.tagName)) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { node.nodeValue = convert(node.nodeValue); });
    root.querySelectorAll('[alt],[title],[aria-label],[data-copy-state]').forEach(el => {
      ['alt','title','aria-label','data-copy-state'].forEach(attr => {
        if (el.hasAttribute(attr)) el.setAttribute(attr, convert(el.getAttribute(attr)));
      });
    });
  };

  const apply = () => {
    document.documentElement.lang = 'zh-Hant-TW';
    convertTree(document.body);
    const personal = document.querySelectorAll('a[href="../zh-cn/"],a[href="/zh-cn/"],a[href$="/zh-cn/"]');
    personal.forEach(a => { a.href = '/zh-tw/'; a.textContent = convert(a.textContent); });
    const contactTitle = document.querySelector('.contact-copy h2');
    if (contactTitle) contactTitle.textContent = '日本學部留學諮詢';
    const thesis = document.querySelector('.hero-thesis');
    if (thesis) thesis.textContent = '從數學式看懂物理現象，從基本模型拆解複雜問題。';
  };

  let scheduled = false;
  const scheduleApply = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; apply(); });
  };
  apply();
  const observer = new MutationObserver(scheduleApply);
  observer.observe(document.body, { childList:true, subtree:true, characterData:true });
  window.setTimeout(() => observer.disconnect(), 3500);
  window.applyEducationZhTW = apply;
})();
