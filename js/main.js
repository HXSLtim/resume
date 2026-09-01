/* =========================================================
   交互脚本：主题切换 / 打印 / 滚动进入动画
   全部为渐进增强，禁用 JS 后页面仍完整可用
   ========================================================= */

// ---------- 深浅主题切换 ----------
const root = document.documentElement;
const savedTheme = localStorage.getItem('resume-theme');

if (savedTheme) {
  root.dataset.theme = savedTheme;
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.dataset.theme = 'dark';
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('resume-theme', next);
});

// ---------- 打印 / 存为 PDF ----------
document.getElementById('print-btn').addEventListener('click', () => window.print());

// ---------- 滚动进入动画 ----------
const revealTargets = document.querySelectorAll('.content section, .side-block');

if ('IntersectionObserver' in window) {
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

// ---------- 页脚年份 ----------
document.getElementById('year').textContent = new Date().getFullYear();
