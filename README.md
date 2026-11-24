# pages1 — Cloudflare Workers & Pages 纯前端测试演示站

这是一个专为 **葛琛 (`gcc1021`)** 准备的纯静态前端网站演示项目，用于展示如何通过 **Cloudflare Pages** 快速搭建并发布网站。

## 📁 文件结构说明

```text
├── index.html   # 网页主体结构与具体展示内容（默认入口文件）
├── style.css    # 网页样式表（包含响应式布局与深色/浅色主题）
├── script.js    # 前端交互逻辑（主题切换、边缘延迟模拟、建站进度清单）
└── README.md    # 项目说明文档
```

## 🚀 如何部署到 Cloudflare Pages

### 方法一：直接上传 ZIP 压缩包（最简单，适合快速预览）
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)，在左侧菜单找到 **Workers & Pages**。
2. 点击 **Create（创建）** -> 选择 **Pages** -> 点击 **Upload assets（直接上传资产）**。
3. 为项目命名（例如 `pages1`），直接将本 `.zip` 压缩包拖拽上传。
4. 点击 **Deploy site**，几秒钟后即可获得一个 `https://pages1-xxx.pages.dev` 的公网访问地址。

### 方法二：关联 GitHub 仓库 `gcc1021/pages1`（推荐，改代码自动更新）
1. 将本压缩包解压，把里面的 4 个文件上传到 GitHub 仓库 `github.com/gcc1021/pages1` 的根目录中。
2. 在 Cloudflare 的 **Workers & Pages** 中选择 **Connect to Git**，授权并选中 `gcc1021/pages1` 仓库。
3. 构建设置保持默认即可：
   - **Framework preset（框架预设）**：`None`
   - **Build command（构建命令）**：留空
   - **Build output directory（输出目录）**：留空（或 `/`）
4. 点击 **Save and Deploy**。此后每次在 GitHub 修改代码并提交，网站都会自动重新部署。
