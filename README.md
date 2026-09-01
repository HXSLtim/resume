# Resume · 刘正硕的交互式终端简历

一个纯 HTML / CSS / JavaScript 的**终端风格交互式简历**：打开是一个仿 zsh 的终端窗口，
输入命令浏览简历内容。零依赖、零构建，直接部署到 GitHub Pages。

```
┌──────────────────────────────────────────────┐
│ ● ● ●   lzs@resume: ~/portfolio — zsh        │
├──────────────────────────────────────────────┤
│ ✔ resume-terminal v1.0 — 刘正硕 的交互式简历  │
│ 输入 help 查看全部命令…                       │
│                                              │
│ lzs@resume:~$ projects                       │
│ ## 项目经历 …                                │
├──────────────────────────────────────────────┤
│ lzs@resume:~$ ▌                              │
│ [help][about][skills][projects][resume]…     │
└──────────────────────────────────────────────┘
```

线上地址：<https://hxsltim.github.io/resume/>（仓库：<https://github.com/HXSLtim/resume>）

## 特性

- **真·可交互**：命令输入、命令历史（↑/↓）、Tab 补全、中文别名（「简介」「项目」「全部」）、`cat about.md`、点击命令名直接执行
- **移动端友好**：响应式布局，终端铺满屏幕；底部快捷命令 chips 可点按，免打字；输入框 16px 防 iOS 聚焦缩放
- **深浅主题**：浅色为极简黑白 + 克莱因蓝 `#002FA7`，深色为 GitHub Dark 终端风；跟随系统偏好并记住选择
- **打印即完整简历**：`print` 命令 / 右上角按钮 / Ctrl+P，打印预览是排版好的 A4 完整简历（自动切浅色、项目不跨页）
- **单数据源**：终端展示与打印版共用 `js/data.js` 一份数据，改一处全局生效

## 命令列表

| 命令 | 中文别名 | 作用 |
| --- | --- | --- |
| `help` | `帮助` | 全部命令 |
| `about` | `简介` | 关于我 |
| `experience` | `经历` / `工作` / `实习` | 工作经历 |
| `skills` | `技能` | 专业技能 |
| `projects` | `项目` | 项目经历 |
| `advantages` | `优势` | 个人优势 |
| `education` | `教育` | 教育背景 |
| `contact` | `联系方式` | 联系方式 |
| `resume` | `全部` | 一键输出完整简历 |
| `theme` | `主题` | 切换深浅主题 |
| `clear` | `清空` / `cls` | 清屏 |
| `print` | `打印` | 打印 / 存为 PDF |
| `history` | `历史` | 历史命令 |
| `ls` / `cat about.md` | `目录` | 彩蛋：把分区当文件浏览 |
| `whoami` | `我是谁` | 一句话自我介绍 |
| `exit` / `sudo` / `rm` | — | 彩蛋 |

## 目录结构

```
Resume/
├── index.html      # 页面骨架（终端窗口 + 打印容器）
├── css/style.css   # 全部样式（主题、响应式、打印）
├── js/data.js      # ★ 简历内容 —— 改简历只改这个文件
├── js/main.js      # 终端引擎（命令解析 / 渲染 / 主题）
└── README.md
```

## 本地预览

直接双击 `index.html` 用浏览器打开即可；或起一个本地服务：

```bash
cd Resume
python3 -m http.server 8000
# 浏览器访问 http://localhost:8000
```

## 修改内容

1. **简历内容全在 `js/data.js`**：姓名、求职意向、联系方式、简介、技能、项目、优势、教育背景都是结构化字段，按注释改即可；
2. ✏️ 待补的真实信息：`contacts` 里的手机 / 邮箱 / GitHub（目前是占位）、`education.date` 入学毕业时间（目前是 20XX）；
3. 换主题色：改 `css/style.css` 顶部的 `--accent`（深色主题的强调色在 `[data-theme="dark"]` 里单独一份）；
4. 想加命令 / 彩蛋：`js/main.js` 里的 `commands` 和 `ALIASES` 两处各加一行。

> **字体说明**：Inter 与 JetBrains Mono 通过 Google Fonts 的 `<link>` 引入（在 `index.html` 的 `<head>` 里）。
> 如果目标访客主要在国内、加载慢，直接删掉那三行 `<link>` 即可，页面会自动回退到
> PingFang SC / SF Mono / Menlo 等系统字体。

## 部署到 GitHub Pages

### 方式一：网页操作（推荐首次使用）

1. 在 GitHub 上新建一个仓库（例如 `resume`）；
2. 把本地代码推上去：

   ```bash
   git remote add origin git@github.com:<你的用户名>/resume.git
   git push -u origin main
   ```

3. 打开仓库 **Settings → Pages**，Source 选 **Deploy from a branch**，
   Branch 选 `main` / `(root)`，点 Save；
4. 等待 1–2 分钟，访问 `https://<你的用户名>.github.io/resume/`。

### 方式二：gh 命令行一把梭

```bash
# 创建远程仓库并推送（需已安装 gh 并 gh auth login）
gh repo create resume --public --source=. --push

# 启用 GitHub Pages（main 分支根目录）
gh api -X POST repos/:owner/resume/pages -f 'source[branch]'=main -f 'source[path]'=/
```

> 以后每次改完简历，只需 `git add -A && git commit -m "更新简历" && git push`，Pages 会自动重新部署。

## 绑定自定义域名（可选）

在仓库 Settings → Pages 的 Custom domain 里填入你的域名，并在域名 DNS 添加 CNAME 记录
指向 `<你的用户名>.github.io`；勾选 Enforce HTTPS。

## 导出 PDF 简历

终端里输入 `print`（或点右上角 print 按钮）→ 目标打印机选「另存为 PDF」。
打印内容是排版好的 A4 完整简历，与终端里的交互内容互不干扰。
