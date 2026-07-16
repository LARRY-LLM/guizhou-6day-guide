# 阶段 4：打印、构建与最终 QA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为现有贵州六日攻略补齐 A4 打印样式，生成离线 `dist/`，并完成自动化、浏览器、打印与视觉 QA。

**Architecture:** 保留现有 React 组件与数据层，在 `src/styles.css` 末尾增加集中式打印媒体规则，以浏览器原生打印能力生成 PDF。使用 Vitest 保护打印契约，使用 Vite 生产构建生成相对引用的打包资源，再以真实浏览器核验屏幕与打印状态。

**Tech Stack:** React 19、Vite 6、Vitest、CSS `@media print` / `@page`、浏览器打印预览。

## Global Constraints

- 不改六日路线、景点内容或“黔蓝手作旅行簿”视觉方向。
- 不增加 PDF 或打印第三方依赖。
- A4 纵向打印，默认页边距 12 mm。
- 打印隐藏 `.no-print`，卡片内部避免分页，图片不得拉伸或越界。
- `dist/` 必须包含入口、打包 CSS/JS 和 7 张本地图片，且可离线读取。
- 项目目录不是 Git 仓库，因此本计划不执行提交命令；每个任务以测试和证据文件作为检查点。

---

### Task 1: 打印契约测试

**Files:**
- Modify: `src/styles.test.js`
- Test: `src/styles.test.js`

**Interfaces:**
- Consumes: `src/styles.css` 文本。
- Produces: 对 `@page`、`@media print`、`.no-print`、打印分页与图片规则的稳定契约。

- [ ] **Step 1: 写入失败测试**

新增测试，要求 CSS 包含 `@page`、`size: A4 portrait`、`@media print`、`.no-print`、`break-inside: avoid`、`print-color-adjust: exact`。

- [ ] **Step 2: 验证测试按预期失败**

Run: `npm test -- --reporter=verbose src/styles.test.js`

Expected: 新打印测试失败，缺失项从 `@page` 开始报告。

### Task 2: A4 打印实现

**Files:**
- Modify: `src/styles.css`
- Test: `src/styles.test.js`
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes: 现有 `.no-print`、`.hero`、`.day-entry`、`.sight-card`、`.practical-card`、`.checklist-card` 选择器。
- Produces: 浏览器原生打印可用的 A4 纵向布局。

- [ ] **Step 1: 添加最小打印样式**

在 CSS 末尾添加 `@page { size: A4 portrait; margin: 12mm; }` 与 `@media print`，隐藏 `.no-print`，清理屏幕背景/阴影，约束打印网格和图片高度，并对独立卡片使用 `break-inside: avoid`。

- [ ] **Step 2: 验证打印测试通过**

Run: `npm test -- --reporter=verbose src/styles.test.js`

Expected: 3 项样式测试全部通过。

- [ ] **Step 3: 运行全部测试**

Run: `npm test -- --reporter=verbose`

Expected: 全部测试通过，打印按钮行为仍调用一次 `window.print()`。

### Task 3: 资源、链接与生产构建

**Files:**
- Verify: `src/App.jsx`
- Verify: `public/assets/*`
- Create: `dist/index.html`
- Create: `dist/assets/*`

**Interfaces:**
- Consumes: Vite 入口与 `public/assets` 7 张图片。
- Produces: 可离线加载的 `dist/`。

- [ ] **Step 1: 核对本地资源引用**

检查页面中全部图片均使用 `/assets/...` 本地路径，官方来源只作为用户主动打开的外链。

- [ ] **Step 2: 核对三个官方来源**

在真实浏览器中依次打开黄果树、小七孔和西江链接，记录可访问、跳转、TLS 或站点拦截状态。

- [ ] **Step 3: 执行生产构建**

Run: `npm run build`

Expected: Vite 成功输出 `dist/index.html`、打包 CSS/JS 和 `dist/assets`。

- [ ] **Step 4: 检查交付结构与离线依赖**

确认 `dist/index.html` 存在，7 张命名图片存在，打包文件不引用远程字体或远程图片 URL。

### Task 4: 浏览器、打印与视觉 QA

**Files:**
- Modify: `design-qa.md`
- Create: `design-qa/stage4-*.png`
- Modify: `PROJECT_PROGRESS.md`

**Interfaces:**
- Consumes: 本地预览、参考视觉与 `dist/`。
- Produces: 最终视觉证据、QA 结论和完整项目复盘。

- [ ] **Step 1: 检查网页屏幕状态**

在 1440px 与 390 × 844 下检查导航、锚点、横向滚动、图片裁切和控制台；预期无 P0–P2 回归。

- [ ] **Step 2: 检查打印媒体与分页**

在 A4 打印媒体下捕获首页、日程和后续模块，检查隐藏控件、文字可读性、图片裁切、卡片分页与空白页。

- [ ] **Step 3: 进行视觉对照**

把参考视觉与最终网页截图组合在同一对照图中，逐项复核字体、间距、颜色、图片和内容；若发现 P0–P2，修复后重新捕获。

- [ ] **Step 4: 更新 QA 与项目进度**

在 `design-qa.md` 写入阶段 4 的来源、视口、交互、控制台、打印证据、比较历史和准确的 `final result`；在 `PROJECT_PROGRESS.md` 写入完成内容、问题、解决办法、可复用思路及完整项目复盘。

- [ ] **Step 5: 最终验证**

Run: `npm test -- --reporter=verbose && npm run build`

Expected: 测试与构建均成功，`dist/` 与最终证据文件齐全。

