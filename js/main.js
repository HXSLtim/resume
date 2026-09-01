/* =========================================================
   终端简历引擎
   - 命令解析 / 历史 / Tab 补全 / 中文别名
   - 输出渲染（终端 + 打印版共用）
   - 主题切换 / 打印 / 开机自检
   简历内容在 js/data.js，本文件一般不需要动
   ========================================================= */

(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const D = window.RESUME_DATA;

  const termBody = $('#term-body');
  const input = $('#term-input');

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) =>
    s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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
    printLines([
      `主题已切换为 <b>${next === 'dark' ? 'dark 🌙' : 'light ☀️'}</b>（命令 <span class="cmd-link" data-cmd="theme">theme</span> 也可以随时切换）`,
    ]);
    input.focus();
  });

  $('#print-btn').addEventListener('click', () => window.print());

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
      <div class="p-head"><span class="p-name">${p.name}</span><span class="p-tag">${p.tag}</span></div>
      <p class="desc">${p.desc}</p>
      <ul class="t-points">${p.points.map((x) => `<li>${x}</li>`).join('')}</ul>
      <p class="t-result"><span class="r-label">成果</span>${p.result}</p>
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
    help: () => [
      `<b>可用命令</b> · 点击命令名可直接执行`,
      `  <span class="cmd-link" data-cmd="about">about</span> / 简介 — 关于我`,
      `  <span class="cmd-link" data-cmd="experience">experience</span> / 经历 — 工作经历`,
      `  <span class="cmd-link" data-cmd="skills">skills</span> / 技能 — 专业技能`,
      `  <span class="cmd-link" data-cmd="projects">projects</span> / 项目 — 项目经历`,
      `  <span class="cmd-link" data-cmd="advantages">advantages</span> / 优势 — 个人优势`,
      `  <span class="cmd-link" data-cmd="education">education</span> / 教育 — 教育背景`,
      `  <span class="cmd-link" data-cmd="contact">contact</span> / 联系方式 — 联系我`,
      `  <span class="cmd-link" data-cmd="resume">resume</span> / 全部 — 一键输出完整简历`,
      `  <span class="cmd-link" data-cmd="theme">theme</span> / 主题 — 切换深浅主题`,
      `  <span class="cmd-link" data-cmd="clear">clear</span> / 清空 / cls — 清屏`,
      `  <span class="cmd-link" data-cmd="print">print</span> / 打印 — 打印 / 存为 PDF`,
      `  <span class="cmd-link" data-cmd="history">history</span> / 历史 — 历史命令`,
      `<span class="dim">提示：↑/↓ 翻历史命令，Tab 补全；支持中文命令（如「简介」「项目」「全部」）</span>`,
    ],

    ls: () => [
      `about.md   skills.md   projects.md   advantages.md   education.md   contact.md`,
      `<span class="dim">这些「文件」都可以点击打开，或用 cat about.md 查看</span>`,
    ],

    whoami: () => [`${D.name} — ${D.role}`],

    about: () => [secTitle('关于我'), `<p class="desc">${D.about}</p>`],

    experience: () => [secTitle('工作经历'), ...D.experiences.map(expBlock)],

    skills: () => [secTitle('专业技能'), kvRows(D.skills)],

    projects: () => {
      const out = [secTitle('项目经历')];
      D.projects.forEach((p, i) => {
        out.push(projectBlock(p));
        if (i < D.projects.length - 1) out.push('&nbsp;');
      });
      return out;
    },

    advantages: () => [secTitle('个人优势'), kvRows(D.advantages)],

    education: () => [
      secTitle('教育背景'),
      `  ${D.education.school} · ${D.education.major} · ${D.education.degree}　<span class="date">${D.education.date}</span>`,
    ],

    contact: () => [secTitle('联系方式'), `  <span class="dim">🎂</span> ${D.ageInfo}`, ...contactLines()],

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

    theme: () => {
      const next = toggleTheme();
      return [`主题已切换为 <b>${next === 'dark' ? 'dark 🌙' : 'light ☀️'}</b>`];
    },

    clear: () => {
      termBody.innerHTML = '';
      return [];
    },

    print: () => {
      window.print();
      return [`已打开打印对话框 — 打印预览里是排版好的完整简历（A4），可另存为 PDF`];
    },

    history: () =>
      historyArr.length
        ? [historyArr.map((h, i) => `  ${String(i + 1).padStart(3)}  ${esc(h)}`).join('<br>')]
        : ['（暂无历史命令）'],

    exit: () => [
      'logout',
      `感谢阅读我的简历，期待与您共事 🤝`,
      `<span class="dim">（终端不会关闭 — 输入任意命令继续浏览）</span>`,
    ],

    sudo: () => [
      `<span class="err">zsh: permission denied</span>：sudo 权限将在 offer 签订后自动解锁 😉`,
    ],

    rm: () => [`rm: 不敢删 —— 简历只有这一份 😅`],
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
      line(
        `<span class="err">zsh: command not found: ${esc(name)}</span> — 输入 <span class="cmd-link" data-cmd="help">help</span> 查看可用命令`
      );
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
  const CHIP_CMDS = ['help', 'about', 'experience', 'skills', 'projects', 'advantages', 'education', 'contact', 'resume', 'clear'];
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
      <section class="pr-sec"><h2>${secTitle('关于我')}</h2><p class="pr-p">${D.about}</p></section>
      <section class="pr-sec"><h2>${secTitle('工作经历')}</h2>${D.experiences.map(expBlock).join('')}</section>
      <section class="pr-sec"><h2>${secTitle('专业技能')}</h2>${kvRows(D.skills)}</section>
      <section class="pr-sec"><h2>${secTitle('项目经历')}</h2>${D.projects.map(projectBlock).join('')}</section>
      <section class="pr-sec"><h2>${secTitle('个人优势')}</h2>${kvRows(D.advantages)}</section>
      <section class="pr-sec"><h2>${secTitle('教育背景')}</h2>
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
    const now = new Date().toLocaleString('zh-CN', { hour12: false });
    line(`<span class="dim">Last login: ${now} on ttys001</span>`);
    printLines([
      `<span class="ok">✔</span> resume-terminal v1.0 — ${D.name} 的交互式简历`,
      `输入 <span class="cmd-link" data-cmd="help">help</span> 查看全部命令，<span class="cmd-link" data-cmd="resume">resume</span> 一键输出完整简历，也可以点击下方按钮。`,
    ]);
    renderPrintResume();
    if (reduced) {
      run('help');
    } else {
      autoType('help');
    }
  }

  boot();
})();
