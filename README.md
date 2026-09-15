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
- **中英双语 i18n**：`lang` 命令 / 右上角 `en`·`中` 按钮一键切换中英文（也可用 `?lang=en` 链接直达）；语言偏好自动检测浏览器语言并记住，打印版 / PDF 同步切换语言
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
| `lang` | `语言` | 切换中英文（`lang en` / `lang zh` / 不带参数直接切换） |
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
├── js/data.js      # ★ 简历内容（zh / en 双语分包）—— 改简历只改这个文件
├── js/main.js      # 终端引擎（命令解析 / 渲染 / 主题 / i18n）
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

1. **简历内容全在 `js/data.js`**：数据按语言分为 `zh` / `en` 两份（字段完全一致），改内容时记得两份同步改；姓名、求职意向、联系方式、简介、技能、项目、优势、教育背景都是结构化字段，按注释改即可；
2. ✏️ 唯一待补的凭据：`education.verify.code`（学信网在线验证码）—— 见下方「学历可验证」；
3. 换主题色：改 `css/style.css` 顶部的 `--accent`（深色主题的强调色在 `[data-theme="dark"]` 里单独一份）；
4. 想加命令 / 彩蛋：`js/main.js` 里的 `commands` 和 `ALIASES` 两处各加一行。

### 写作口径（改内容前先读这段）

这份简历的取舍标准只有一条：**每一句都要能被面试官追问到底**。

- **技能按目标岗位权重排序**，不按个人熟悉度：AI Agent 开发 → LLM 工程 → 安全研究 → 后端与系统 → 业务与方案设计。「AI Agent 开发」里的每一项（LangGraph 状态图、ReAct 循环、ToolNode 工具链、分层记忆、MCP 服务）都在 Nai 项目里有对应实现，可当场被追问；
- **不写无法验证的副词**。「大幅提升」「显著优化」这类词一律不要；没有实测数字就写**机制**（怎么做到的、失败时怎么办），而不是编量级；
- **「核心优势」紧随「关于我」**：面试官打开页面的前几秒就该看到定位，而不是滚到底部才发现；
- **项目描述只挂真实交付物**：纯构想的方案不进项目列表（对工程岗是稀释）；
- 改完记得 `zh` / `en` 两份同步。

### 学历可验证（学信网）

`education.note` 写明了「13 岁入学、17 岁本科毕业」——这不是笔误，必须写在简历里，否则面试官会按算术错误处理。
`education.verify` 用来挂学信网在线验证码，把这段从「看起来不合理」变成「可当场核验」。

**填法**：学信档案 → 在线验证报告 → 《教育部学历证书电子注册备案表》→ 申请时**有效期选 6 个月**（这是系统允许的最长值）→ 把「在线验证码」填进 `education.verify.code`。留空则整行不渲染。

HR 侧验证入口：<https://www.chsi.com.cn/xlcx/bgcx.jsp>（用在线验证码查验）。
2002 年以前毕业的学历走 `chsi.com.cn/xlrz`；学位验证走 <https://xwrz.chsi.com.cn>。

> ⚠️ **验证码会过期**：备案表最长只能设 6 个月，到期后 HR 去验会看到「验证码无效」——**比不附更糟**，等于亲手制造一个疑点。
> 建议设日历提醒每 5 个月重新申请一次，或在每轮批量投递前统一重申请。

> 🔒 **隐私提醒**：本站在 GitHub Pages 上是**公开**的，验证码等同对全网可见（会被爬虫和聚合站抓走）。备案表含姓名、出生日期、学校、专业、毕业时间与证书编号。
> 如果不能接受公开，就把 `code` 留空，只在投递给 HR 的那份 PDF 里手写当期验证码。更稳妥的做法是「临时填 → 导出 PDF → 再清空」，避免把验证码提交进 Git 历史。

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
