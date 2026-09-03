/* =========================================================
   终端简历引擎
   - 命令解析 / 历史 / Tab 补全 / 中文别名
   - 输出渲染（终端 + 打印版共用）
   - 主题切换 / 打印 / 开机自检
   - i18n：中英文切换（lang 命令 / 右上角按钮 / ?lang=en）
   简历内容在 js/data.js（按 zh / en 分包），本文件一般不需要动
   ========================================================= */

(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const DATA = window.RESUME_DATA; // { zh: {...}, en: {...} }
  const LANGS = ['zh', 'en'];

  const termBody = $('#term-body');
  const input = $('#term-input');

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) =>
    s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- i18n：界面文案 ---------- */
  const STRINGS = {
    zh: {
      htmlLang: 'zh-CN',
      timeLocale: 'zh-CN',
      docTitle: '刘正硕 · Resume Terminal',
      docDesc: '刘正硕的交互式终端简历 —— 后端开发工程师 / AI 应用开发工程师 / 产品技术研发',
      langName: '中文',
      placeholder: '输入 help 查看命令…',
      inputLabel: '输入命令',
      themeTitle: '切换深浅主题',
      printTitle: '打印 / 存为 PDF',
      langTitle: '切换中英文（lang en / lang zh）',
      termAria: '刘正硕的交互式简历终端',
      secAbout: '关于我',
      secExperience: '工作经历',
      secSkills: '专业技能',
      secProjects: '项目经历',
      secAdvantages: '个人优势',
      secEducation: '教育背景',
      secContact: '联系方式',
      resultLabel: '成果',
      lsHint: `这些「文件」都可以点击打开，或用 cat about.md 查看`,
      themeSwitched: (next) => `主题已切换为 <b>${next === 'dark' ? 'dark 🌙' : 'light ☀️'}</b>`,
      themeSwitchedBtn: (next) =>
        `主题已切换为 <b>${next === 'dark' ? 'dark 🌙' : 'light ☀️'}</b>（命令 <span class="cmd-link" data-cmd="theme">theme</span> 也可以随时切换）`,
      printMsg: '已打开打印对话框 — 打印预览里是排版好的完整简历（A4），可另存为 PDF',
      historyEmpty: '（暂无历史命令）',
      exitLines: [
        'logout',
        `感谢阅读我的简历，期待与您共事 🤝`,
        `<span class="dim">（终端不会关闭 — 输入任意命令继续浏览）</span>`,
      ],
      sudoMsg: `<span class="err">zsh: permission denied</span>：sudo 权限将在 offer 签订后自动解锁 😉`,
      rmMsg: `rm: 不敢删 —— 简历只有这一份 😅`,
      notFound: (name) =>
        `<span class="err">zsh: command not found: ${name}</span> — 输入 <span class="cmd-link" data-cmd="help">help</span> 查看可用命令`,
      welcome: (name) => `resume-terminal v1.0 — ${name} 的交互式简历`,
      bootHint: `输入 <span class="cmd-link" data-cmd="help">help</span> 查看全部命令，<span class="cmd-link" data-cmd="resume">resume</span> 一键输出完整简历，也可以点击下方按钮。`,
      langUsage: '用法：lang en / lang zh（或不带参数，直接切换）',
      langSwitched: (name) =>
        `语言已切换为 <b>${name}</b> — 输入 <span class="cmd-link" data-cmd="resume">resume</span> 查看完整简历`,
      langAlready: (name) => `当前已经是 <b>${name}</b>`,
      help: [
        `<b>可用命令</b> · 点击命令名可直接执行`,
        `  <span class="cmd-link" data-cmd="about">about</span> / 简介 — 关于我`,
        `  <span class="cmd-link" data-cmd="experience">experience</span> / 经历 — 工作经历`,
        `  <span class="cmd-link" data-cmd="skills">skills</span> / 技能 — 专业技能`,
        `  <span class="cmd-link" data-cmd="projects">projects</span> / 项目 — 项目经历`,
        `  <span class="cmd-link" data-cmd="advantages">advantages</span> / 优势 — 个人优势`,
        `  <span class="cmd-link" data-cmd="education">education</span> / 教育 — 教育背景`,
        `  <span class="cmd-link" data-cmd="contact">contact</span> / 联系方式 — 联系我`,
        `  <span class="cmd-link" data-cmd="resume">resume</span> / 全部 — 一键输出完整简历`,
        `  <span class="cmd-link" data-cmd="lang">lang</span> / 语言 — 切换中英文（lang en / lang zh）`,
        `  <span class="cmd-link" data-cmd="theme">theme</span> / 主题 — 切换深浅主题`,
        `  <span class="cmd-link" data-cmd="clear">clear</span> / 清空 / cls — 清屏`,
        `  <span class="cmd-link" data-cmd="print">print</span> / 打印 — 打印 / 存为 PDF`,
        `  <span class="cmd-link" data-cmd="history">history</span> / 历史 — 历史命令`,
        `<span class="dim">提示：↑/↓ 翻历史命令，Tab 补全；支持中文命令（如「简介」「项目」「全部」）</span>`,
      ],
    },

    en: {
      htmlLang: 'en',
      timeLocale: 'en-GB',
      docTitle: 'Liu Zhengshuo · Resume Terminal',
      docDesc: 'Interactive terminal resume of Liu Zhengshuo — Backend Developer / AI Application Developer / Product R&D',
      langName: 'English',
      placeholder: 'Type help for commands…',
      inputLabel: 'Command input',
      themeTitle: 'Toggle light/dark theme',
      printTitle: 'Print / save as PDF',
      langTitle: 'Switch language (lang en / lang zh)',
      termAria: "Liu Zhengshuo's interactive resume terminal",
      secAbout: 'About Me',
      secExperience: 'Work Experience',
      secSkills: 'Skills',
      secProjects: 'Projects',
      secAdvantages: 'Strengths',
      secEducation: 'Education',
      secContact: 'Contact',
      resultLabel: 'Result',
      lsHint: `These “files” are clickable, or view one with cat about.md`,
      themeSwitched: (next) => `Theme switched to <b>${next === 'dark' ? 'dark 🌙' : 'light ☀️'}</b>`,
      themeSwitchedBtn: (next) =>
        `Theme switched to <b>${next === 'dark' ? 'dark 🌙' : 'light ☀️'}</b> (the <span class="cmd-link" data-cmd="theme">theme</span> command works too)`,
      printMsg: 'Print dialog opened — the print preview is a well-formatted full resume (A4); choose “Save as PDF” to export',
      historyEmpty: '(no history yet)',
      exitLines: [
        'logout',
        `Thanks for reading my resume — looking forward to working with you 🤝`,
        `<span class="dim">(the terminal stays open — type any command to keep browsing)</span>`,
      ],
      sudoMsg: `<span class="err">zsh: permission denied</span>: sudo privileges unlock automatically once the offer is signed 😉`,
      rmMsg: `rm: not risking it — this is the only copy of my resume 😅`,
      notFound: (name) =>
        `<span class="err">zsh: command not found: ${name}</span> — type <span class="cmd-link" data-cmd="help">help</span> for available commands`,
      welcome: (name) => `resume-terminal v1.0 — ${name} · interactive resume`,
      bootHint: `Type <span class="cmd-link" data-cmd="help">help</span> for all commands, <span class="cmd-link" data-cmd="resume">resume</span> for the full resume — or just tap the buttons below.`,
      langUsage: 'Usage: lang en / lang zh (or no argument to toggle)',
      langSwitched: (name) =>
        `Language switched to <b>${name}</b> — type <span class="cmd-link" data-cmd="resume">resume</span> for the full resume`,
      langAlready: (name) => `Already in <b>${name}</b>`,
      help: [
        `<b>Available commands</b> · click a command name to run it`,
        `  <span class="cmd-link" data-cmd="about">about</span> — About me`,
        `  <span class="cmd-link" data-cmd="experience">experience</span> — Work experience`,
        `  <span class="cmd-link" data-cmd="skills">skills</span> — Skills`,
        `  <span class="cmd-link" data-cmd="projects">projects</span> — Projects`,
        `  <span class="cmd-link" data-cmd="advantages">advantages</span> — Strengths`,
        `  <span class="cmd-link" data-cmd="education">education</span> — Education`,
        `  <span class="cmd-link" data-cmd="contact">contact</span> — Contact`,
        `  <span class="cmd-link" data-cmd="resume">resume</span> — Output the full resume in one shot`,
        `  <span class="cmd-link" data-cmd="lang">lang</span> / 语言 — Switch language (lang en / lang zh)`,
        `  <span class="cmd-link" data-cmd="theme">theme</span> — Toggle light/dark theme`,
        `  <span class="cmd-link" data-cmd="clear">clear</span> / cls — Clear the screen`,
        `  <span class="cmd-link" data-cmd="print">print</span> — Print / save as PDF`,
        `  <span class="cmd-link" data-cmd="history">history</span> — Command history`,
        `<span class="dim">Tip: ↑/↓ to browse history, Tab to complete; Chinese aliases also work (e.g. 简介 / 项目 / 全部)</span>`,
      ],
    },
  };

  /* ---------- i18n：语言检测与切换 ----------
     优先级：URL ?lang= > localStorage > 浏览器语言 > 中文 */
  function detectLang() {
    const url = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem('resume-lang');
    const nav = (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
    const pick = LANGS.includes(url) ? url : LANGS.includes(saved) ? saved : nav;
    return LANGS.includes(pick) ? pick : 'zh';
  }

  let LANG = detectLang();
  let D = DATA[LANG]; // 当前语言的简历数据
  let S = STRINGS[LANG]; // 当前语言的界面文案
  localStorage.setItem('resume-lang', LANG);

  function applyLangToDom() {
    document.documentElement.lang = S.htmlLang;
    document.title = S.docTitle;
    document.querySelector('meta[name="description"]').setAttribute('content', S.docDesc);
    input.placeholder = S.placeholder;
    input.setAttribute('aria-label', S.inputLabel);
    $('#theme-toggle').title = S.themeTitle;
    $('#print-btn').title = S.printTitle;
    const langBtn = $('#lang-btn');
    langBtn.textContent = LANG === 'zh' ? 'en' : '中';
    langBtn.title = S.langTitle;
    $('.terminal').setAttribute('aria-label', S.termAria);
  }

  function setLang(next) {
    if (!LANGS.includes(next) || next === LANG) return false;
    LANG = next;
    D = DATA[LANG];
    S = STRINGS[LANG];
    localStorage.setItem('resume-lang', LANG);
    applyLangToDom();
    renderPrintResume(); // 打印版同步换成新语言
    return true;
  }

  /* ---------- 主题 ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('resume-theme');
  if (savedTheme) {
    root.dataset.theme = savedTheme;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.dataset.theme = 'dark';
  }

  function toggleTheme() {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('resume-theme', next);
    return next;
  }

  $('#theme-toggle').addEventListener('click', () => {
    const next = toggleTheme();
    printLines([S.themeSwitchedBtn(next)]);
    input.focus();
  });

  $('#print-btn').addEventListener('click', () => window.print());

  $('#lang-btn').addEventListener('click', () => {
    const next = LANG === 'zh' ? 'en' : 'zh';
    setLang(next);
    printLines([S.langSwitched(STRINGS[next].langName)]);
    input.focus();
  });

  /* ---------- 移动端软键盘适配 ----------
     iOS 键盘弹出时 dvh 不变，输入行会被键盘盖住；
     用 visualViewport 把真实可视高度写入 --app-h，让终端整体收窄到键盘上方 */
  if (window.visualViewport) {
    const setAppHeight = () => {
      const h = window.visualViewport.height;
      if (h < window.innerHeight - 24) {
        document.documentElement.style.setProperty('--app-h', h + 'px');
      } else {
        document.documentElement.style.removeProperty('--app-h');
      }
    };
    window.visualViewport.addEventListener('resize', setAppHeight);
  }

  /* ---------- 输出 ---------- */
  function line(html, cls = 'out', delayIdx) {
    const div = document.createElement('div');
    div.className = 'line ' + cls;
    div.innerHTML = html;
    if (!reduced && delayIdx) {
      div.style.animationDelay = Math.min(delayIdx * 22, 360) + 'ms';
    }
    termBody.appendChild(div);
    while (termBody.children.length > 600) termBody.removeChild(termBody.firstChild);
    requestAnimationFrame(() => {
      termBody.scrollTop = termBody.scrollHeight;
    });
    return div;
  }

  function printLines(htmls) {
    htmls.forEach((h, i) => line(h, 'out', i));
  }

  function echoCmd(text) {
    line(
      `<span class="p-user">lzs</span><span class="p-at">@</span><span class="p-host">resume</span><span class="p-sep">:</span><span class="p-path">~</span><span class="p-dollar">$</span> <span class="cmd-text">${esc(text)}</span>`,
      'cmd'
    );
  }

  /* ---------- 渲染片段（终端与打印版共用） ---------- */
  const secTitle = (t) => `<span class="hash">##</span>${t}`;

  const kvRows = (items) =>
    `<div class="kv">` +
    items.map((i) => `<span class="k">${i.tag}</span><span class="v">${i.desc}</span>`).join('') +
    `</div>`;

  const projectBlock = (p) => `
    <div class="t-project">
      <div class="p-head"><span class="p-name">${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">${p.name}</a>` : p.name}</span><span class="p-tag">${p.tag}</span></div>
      <p class="desc">${p.desc}</p>
      ${p.points && p.points.length ? `<ul class="t-points">${p.points.map((x) => `<li>${x}</li>`).join('')}</ul>` : ''}
      ${p.result ? `<p class="t-result"><span class="r-label">${S.resultLabel}</span>${p.result}</p>` : ''}
    </div>`;

  const expBlock = (e) => `
    <div class="t-project">
      <div class="p-head"><span class="p-name">${e.company} · ${e.role}</span><span class="p-tag">${e.industry}</span><span class="date">${e.date}</span></div>
      <ul class="t-points">${e.points.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>`;

  const contactLines = () =>
    D.contacts.map((c) =>
      c.href
        ? `  <span class="dim">${c.icon}</span> <a href="${c.href}" target="_blank" rel="noopener">${c.text}</a>`
        : `  <span class="dim">${c.icon}</span> ${c.text}`
    );

  /* ---------- 命令表 ---------- */
  const commands = {
    help: () => S.help,

    ls: () => [
      `about.md   skills.md   projects.md   advantages.md   education.md   contact.md`,
      `<span class="dim">${S.lsHint}</span>`,
    ],

    whoami: () => [`${D.name} — ${D.role}`],

    about: () => [secTitle(S.secAbout), `<p class="desc">${D.about}</p>`],

    experience: () => [secTitle(S.secExperience), ...D.experiences.map(expBlock)],

    skills: () => [secTitle(S.secSkills), kvRows(D.skills)],

    projects: () => {
      const out = [secTitle(S.secProjects)];
      D.projects.forEach((p, i) => {
        out.push(projectBlock(p));
        if (i < D.projects.length - 1) out.push('&nbsp;');
      });
      return out;
    },

    advantages: () => [secTitle(S.secAdvantages), kvRows(D.advantages)],

    education: () => [
      secTitle(S.secEducation),
      `  ${D.education.school} · ${D.education.major} · ${D.education.degree}　<span class="date">${D.education.date}</span>`,
    ],

    contact: () => [secTitle(S.secContact), `  <span class="dim">🎂</span> ${D.ageInfo}`, ...contactLines()],

    resume: () => [
      ...commands.about(),
      '&nbsp;',
      ...commands.experience(),
      '&nbsp;',
      ...commands.skills(),
      '&nbsp;',
      ...commands.projects(),
      '&nbsp;',
      ...commands.advantages(),
      '&nbsp;',
      ...commands.education(),
      '&nbsp;',
      ...commands.contact(),
    ],

    lang: (arg) => {
      const want = (arg || '').trim().toLowerCase();
      if (want && !LANGS.includes(want)) return [S.langUsage];
      const next = want || (LANG === 'zh' ? 'en' : 'zh');
      if (next === LANG) return [S.langAlready(S.langName)];
      setLang(next);
      return [S.langSwitched(STRINGS[next].langName)];
    },

    theme: () => {
      const next = toggleTheme();
      return [S.themeSwitched(next)];
    },

    clear: () => {
      termBody.innerHTML = '';
      return [];
    },

    print: () => {
      window.print();
      return [S.printMsg];
    },

    history: () =>
      historyArr.length
        ? [historyArr.map((h, i) => `  ${String(i + 1).padStart(3)}  ${esc(h)}`).join('<br>')]
        : [S.historyEmpty],

    exit: () => S.exitLines,

    sudo: () => [S.sudoMsg],

    rm: () => [S.rmMsg],
  };

  const ALIASES = {
    help: 'help', 帮助: 'help',
    ls: 'ls', 目录: 'ls',
    whoami: 'whoami', 我是谁: 'whoami',
    about: 'about', 简介: 'about', cat: 'about',
    experience: 'experience', 经历: 'experience', 工作: 'experience', 实习: 'experience', exp: 'experience',
    skills: 'skills', 技能: 'skills',
    projects: 'projects', 项目: 'projects',
    advantages: 'advantages', 优势: 'advantages',
    education: 'education', 教育: 'education',
    contact: 'contact', 联系方式: 'contact',
    resume: 'resume', 全部: 'resume',
    lang: 'lang', 语言: 'lang',
    theme: 'theme', 主题: 'theme',
    clear: 'clear', 清空: 'clear', cls: 'clear',
    print: 'print', 打印: 'print',
    history: 'history', 历史: 'history',
    exit: 'exit', 退出: 'exit',
    sudo: 'sudo',
    rm: 'rm',
  };

  /* ---------- 执行 ---------- */
  const historyArr = [];
  let histIdx = -1;

  function run(raw) {
    echoCmd(raw);
    input.value = '';
    const text = raw.trim();
    if (!text) return;

    if (historyArr[historyArr.length - 1] !== text) historyArr.push(text);
    if (historyArr.length > 100) historyArr.shift();
    histIdx = -1;

    const parts = text.split(/\s+/);
    let name = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    // cat about.md / open skills.md → 对应命令
    if ((name === 'cat' || name === 'open') && arg) {
      name = arg.toLowerCase().replace(/\.md$/, '');
    }

    const key = ALIASES[name];
    const fn = commands[key];
    if (fn) {
      const out = fn(arg);
      if (out && out.length) printLines(out);
    } else {
      line(S.notFound(esc(name)));
    }
  }

  function tabComplete() {
    const v = input.value.trim().toLowerCase();
    if (!v) return;
    const hit = Object.keys(ALIASES).find((c) => c.startsWith(v));
    if (hit) input.value = hit;
  }

  input.addEventListener('keydown', (e) => {
    if (e.isComposing) return; // 中文输入法组词中
    if (e.key === 'Enter') {
      run(input.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!historyArr.length) return;
      histIdx = histIdx === -1 ? historyArr.length - 1 : Math.max(0, histIdx - 1);
      input.value = historyArr[histIdx];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      histIdx += 1;
      if (histIdx >= historyArr.length) {
        histIdx = -1;
        input.value = '';
      } else {
        input.value = historyArr[histIdx];
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      tabComplete();
    }
  });

  /* ---------- 快捷命令 chips ---------- */
  const CHIP_CMDS = ['help', 'about', 'experience', 'skills', 'projects', 'advantages', 'education', 'contact', 'resume', 'lang', 'clear'];
  $('#chips').innerHTML = CHIP_CMDS.map(
    (c) => `<button class="chip" type="button" data-cmd="${c}">${c}</button>`
  ).join('');

  /* ---------- 全局点击：命令链接 / chips / 空白处聚焦 ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-cmd]');
    if (t && !t.classList.contains('tool-btn')) {
      run(t.dataset.cmd);
      input.focus();
      return;
    }
    if (e.target.closest('.terminal') && window.getSelection().toString() === '') {
      input.focus();
    }
  });

  /* ---------- 打印版完整简历（打印 / Ctrl+P 时展示） ---------- */
  function renderPrintResume() {
    $('#print-resume').innerHTML = `
      <header class="pr-header">
        <h1>${D.name}<span class="pr-cursor">▍</span></h1>
        <p class="pr-role">&gt; ${D.role}</p>
        <p class="pr-contact">${D.ageInfo}　·　${D.contacts.map((c) => c.text).join('　·　')}</p>
      </header>
      <section class="pr-sec"><h2>${secTitle(S.secAbout)}</h2><p class="pr-p">${D.about}</p></section>
      <section class="pr-sec"><h2>${secTitle(S.secExperience)}</h2>${D.experiences.map(expBlock).join('')}</section>
      <section class="pr-sec"><h2>${secTitle(S.secSkills)}</h2>${kvRows(D.skills)}</section>
      <section class="pr-sec"><h2>${secTitle(S.secProjects)}</h2>${D.projects.map(projectBlock).join('')}</section>
      <section class="pr-sec"><h2>${secTitle(S.secAdvantages)}</h2>${kvRows(D.advantages)}</section>
      <section class="pr-sec"><h2>${secTitle(S.secEducation)}</h2>
        <p class="pr-p">${D.education.school} · ${D.education.major} · ${D.education.degree}　<span class="pr-date">${D.education.date}</span></p>
      </section>`;
  }

  /* ---------- 开机 ---------- */
  async function autoType(cmd) {
    await sleep(600);
    input.focus();
    for (const ch of cmd) {
      input.value += ch;
      await sleep(70);
    }
    await sleep(320);
    run(input.value);
  }

  function boot() {
    const now = new Date().toLocaleString(S.timeLocale, { hour12: false });
    line(`<span class="dim">Last login: ${now} on ttys001</span>`);
    printLines([
      `<span class="ok">✔</span> ${S.welcome(D.name)}`,
      S.bootHint,
    ]);
    applyLangToDom();
    renderPrintResume();
    if (reduced) {
      run('help');
    } else {
      autoType('help');
    }
  }

  boot();
})();
