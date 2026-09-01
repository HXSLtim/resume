# Resume · 个人简历

一个纯 HTML / CSS / JavaScript 的单页个人简历网站：

- **零依赖、零构建**：不需要 Node.js 和 npm，代码即产物，天然适配 GitHub Pages
- **深浅色主题切换**，跟随系统偏好，选择会记住
- **移动端自适应**，手机上也是完整排版
- **打印 / 导出 PDF** 样式已优化（点右上角按钮即可存为 PDF 简历）

线上地址（部署后替换成你自己的）：<https://yourname.github.io/resume/>

## 目录结构

```
Resume/
├── index.html      # 简历内容全部在这里
├── css/style.css   # 样式（主题色在顶部 --accent 变量）
├── js/main.js      # 主题切换 / 打印 / 滚动动画
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

1. 打开 `index.html`，搜索「你的名字」「XX」「yourname」等占位内容，替换成自己的真实信息；
2. 换主题色：改 `css/style.css` 顶部的 `--accent`（如 `#16a34a` 绿色、`#dc2626` 红色）；
3. 换真实头像：把图片命名 `avatar.jpg` 放到 `assets/` 目录（需自建），然后把
   `<div class="avatar">简</div>` 换成 `<img class="avatar" src="assets/avatar.jpg" alt="头像" />`。

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

浏览器打开页面 → 点击右上角「🖨️ 打印 / 存为 PDF」→ 目标打印机选「另存为 PDF」。
打印样式会自动切回浅色并去掉按钮。
