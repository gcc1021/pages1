// =========================================
// 1. 深浅色主题切换 (支持本地记忆)
// =========================================
const themeToggle = document.getElementById("themeToggle");
const htmlEl = document.documentElement;

function applyTheme(theme) {
  htmlEl.setAttribute("data-theme", theme);
  localStorage.setItem("gechen_demo_theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️ 浅色模式" : "🌙 深色模式";
}

const savedTheme = localStorage.getItem("gechen_demo_theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

// =========================================
// 2. 本地访问次数统计
// =========================================
const visitCounterEl = document.getElementById("visitCounter");
let visits = parseInt(localStorage.getItem("gechen_demo_visits") || "0", 10) + 1;
localStorage.setItem("gechen_demo_visits", visits);
visitCounterEl.textContent = `${visits} 次`;

// =========================================
// 3. 文件架构原理切换面板
// =========================================
const fileDetails = {
  html: {
    title: "index.html — 网页的内容与结构骨架",
    desc: "浏览器访问网站时默认加载的第一个文件。它负责定义页面里有哪些标题、段落、按钮、卡片和链接。Cloudflare Pages 部署静态网站时，默认就会寻找根目录下的 index.html。",
    code: `<!-- index.html 示例片段 -->
<section class="hero">
  <h1>你好，葛琛！这是你的首个纯前端演示网站</h1>
  <button id="pingTestBtn">重新测速</button>
</section>`
  },
  css: {
    title: "style.css — 网页的排版、配色与响应式样式",
    desc: "负责让网页变得好看。比如本页面的卡片阴影、Cloudflare 橙色主题、深色模式切换以及手机端自动适配，全部由 style.css 控制。",
    code: `/* style.css 示例片段 */
:root {
  --primary: #f97316; /* Cloudflare 主题橙 */
}
.feature-card:hover {
  transform: translateY(-4px);
}`
  },
  js: {
    title: "script.js — 网页的动态交互与逻辑大脑",
    desc: "让静态网页“动起来”。即使没有后端服务器，JavaScript 也能响应点击事件、修改页面文字，并借助浏览器的 localStorage 保存用户的操作记录。",
    code: `// script.js 示例片段
document.getElementById("likeBtn").addEventListener("click", () => {
  likes += 1;
  localStorage.setItem("gechen_demo_likes", likes);
});`
  }
};

const archPanel = document.getElementById("archPanel");
const tabBtns = document.querySelectorAll(".tab-btn");

function renderArchPanel(key) {
  const item = fileDetails[key];
  archPanel.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.desc}</p>
    <pre><code>${item.code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
  `;
}

renderArchPanel("html");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderArchPanel(btn.dataset.file);
  });
});

// =========================================
// 4. 互动演示：边缘延迟测速与点赞
// =========================================
const pingValueEl = document.getElementById("pingValue");
const pingTestBtn = document.getElementById("pingTestBtn");
const likeCountEl = document.getElementById("likeCount");
const likeBtn = document.getElementById("likeBtn");

let likes = parseInt(localStorage.getItem("gechen_demo_likes") || "0", 10);
likeCountEl.textContent = likes;

pingTestBtn.addEventListener("click", () => {
  pingValueEl.textContent = "测试中...";
  setTimeout(() => {
    const simulatedPing = Math.floor(Math.random() * 19) + 11; // 11ms - 29ms
    pingValueEl.textContent = `${simulatedPing} ms`;
  }, 260);
});

likeBtn.addEventListener("click", () => {
  likes += 1;
  localStorage.setItem("gechen_demo_likes", likes);
  likeCountEl.textContent = likes;
});

// =========================================
// 5. 互动演示：葛琛的建站进度清单
// =========================================
const defaultTodos = [
  { text: "在 GitHub 创建仓库 gcc1021/pages1", done: true },
  { text: "获取前端测试压缩包并查看页面效果", done: true },
  { text: "上传前端文件到 Cloudflare Pages 完成首次部署", done: false },
  { text: "尝试修改 index.html 里的标题文字体验自动更新", done: false }
];

let todos = JSON.parse(localStorage.getItem("gechen_demo_todos") || "null") || defaultTodos;

const todoListEl = document.getElementById("todoList");
const todoInputEl = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");

function saveAndRenderTodos() {
  localStorage.setItem("gechen_demo_todos", JSON.stringify(todos));
  todoListEl.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.done ? "done" : ""}`;
    li.innerHTML = `
      <label class="todo-left">
        <input type="checkbox" ${todo.done ? "checked" : ""} data-index="${index}" />
        <span>${todo.text}</span>
      </label>
      <button class="delete-todo" data-del="${index}" title="删除">删除</button>
    `;
    todoListEl.appendChild(li);
  });
}

todoListEl.addEventListener("change", (e) => {
  if (e.target.matches("input[type='checkbox']")) {
    const idx = Number(e.target.dataset.index);
    todos[idx].done = e.target.checked;
    saveAndRenderTodos();
  }
});

todoListEl.addEventListener("click", (e) => {
  if (e.target.matches(".delete-todo")) {
    const idx = Number(e.target.dataset.del);
    todos.splice(idx, 1);
    saveAndRenderTodos();
  }
});

function addTodo() {
  const val = todoInputEl.value.trim();
  if (!val) return;
  todos.push({ text: val, done: false });
  todoInputEl.value = "";
  saveAndRenderTodos();
}

addTodoBtn.addEventListener("click", addTodo);
todoInputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

saveAndRenderTodos();
