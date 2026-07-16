# GitHub Pages 手机端公开访问 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将当前贵州六日攻略以公开 GitHub 仓库和 GitHub Actions 自动发布到 GitHub Pages，为手机端提供不经过 `chatgpt.site` Cloudflare 规则的稳定入口。

**Architecture:** 在现有 Vite 构建之外增加单一 GitHub Pages 工作流，将已经验证的 `dist/client/` 作为静态发布物。通过 GitHub Desktop 使用用户已登录的会话创建公开远端并推送，通过 GitHub 网页确认 Pages 与 Actions 状态；现有 Sites 版本 3 保持不变，作为回退入口。

**Tech Stack:** React 19、Vite 6、Vitest、GitHub Actions、GitHub Pages、GitHub Desktop、Chrome。

## Global Constraints

- 公开仓库名称固定为 `guizhou-six-day-guide`，用户已批准公开访问。
- 仅发布当前项目源码、配置和本地图片；不得上传密码、令牌、浏览器资料或工作空间其他内容。
- GitHub Pages 产物目录固定为 `dist/client/`。
- Actions 权限只包含 `contents: read`、`pages: write` 和 `id-token: write`。
- GitHub Pages 作为手机分享主入口；Sites 版本 3 保留为备用入口。
- 所有沟通过的任务、问题、决定、诊断结果、解决办法和阻塞都要及时写入 `PROJECT_PROGRESS.md`。
- 若出现 GitHub 登录、密码、双重验证或其他身份确认，停止自动操作并交由用户本人完成。

---

### Task 1: GitHub Pages 工作流契约测试

**Files:**
- Modify: `src/build.test.js`
- Test: `src/build.test.js`

**Interfaces:**
- Consumes: `.github/workflows/deploy-pages.yml` 的文件内容。
- Produces: 对 Pages 触发分支、最小权限、构建命令和发布目录的稳定回归契约。

- [ ] **Step 1: 写入失败测试**

在 `src/build.test.js` 的现有路径常量后增加：

```js
const pagesWorkflowPath = resolve(
  process.cwd(),
  ".github/workflows/deploy-pages.yml",
);
```

在文件末尾增加：

```js
test("defines a least-privilege GitHub Pages deployment", () => {
  expect(existsSync(pagesWorkflowPath)).toBe(true);
  const workflowSource = readFileSync(pagesWorkflowPath, "utf8");
  expect(workflowSource).toContain("branches: [main]");
  expect(workflowSource).toContain("contents: read");
  expect(workflowSource).toContain("pages: write");
  expect(workflowSource).toContain("id-token: write");
  expect(workflowSource).toContain("run: npm ci");
  expect(workflowSource).toContain("run: npm run build");
  expect(workflowSource).toContain("path: dist/client");
  expect(workflowSource).toContain("actions/upload-pages-artifact@v4");
  expect(workflowSource).toContain("actions/deploy-pages@v4");
});
```

- [ ] **Step 2: 运行测试并确认按预期失败**

Run: `npm test -- --reporter=verbose src/build.test.js`

Expected: 新测试失败，错误指出 `.github/workflows/deploy-pages.yml` 不存在；原有 5 项构建测试仍通过。

### Task 2: 最小权限 Pages 自动部署

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Test: `src/build.test.js`
- Verify: `dist/client/index.html`

**Interfaces:**
- Consumes: `main` 分支源码、`package-lock.json`、`npm run build` 和 Vite 的 `dist/client/` 输出。
- Produces: GitHub Pages 可直接部署的 Actions 工作流。

- [ ] **Step 1: 创建工作流**

创建 `.github/workflows/deploy-pages.yml`，内容固定为：

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v6
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - name: Configure Pages
        uses: actions/configure-pages@v5
      - name: Install dependencies
        run: npm ci
      - name: Build site
        run: npm run build
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: dist/client

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 运行工作流契约测试**

Run: `npm test -- --reporter=verbose src/build.test.js`

Expected: 6 项构建测试全部通过。

- [ ] **Step 3: 运行完整测试和生产构建**

Run: `npm test -- --reporter=verbose`

Expected: 16 项测试全部通过。

Run: `npm run build`

Expected: Vite 构建成功，`dist/client/index.html`、打包 JS/CSS、7 张命名图片、`dist/server/index.js` 与 `dist/.openai/hosting.json` 均存在。

- [ ] **Step 4: 提交实现**

```bash
git add src/build.test.js .github/workflows/deploy-pages.yml
git commit -m "ci: deploy guide to GitHub Pages"
```

Expected: 工作树干净，新提交包含且只包含测试与 Pages 工作流。

### Task 3: 创建公开 GitHub 仓库并启用 Pages

**Files:**
- No local file changes.
- Publish: current Git repository to `guizhou-six-day-guide`.

**Interfaces:**
- Consumes: 当前 `main` 分支及用户已登录的 GitHub Desktop/Chrome 会话。
- Produces: GitHub 公开远端 `origin`、成功的 `Deploy GitHub Pages` Actions 运行和实际 Pages URL。

- [ ] **Step 1: 在 GitHub Desktop 添加本地仓库**

通过 “Add an Existing Repository from your local drive” 选择当前项目目录，确认识别到 `main` 分支和最新提交。

- [ ] **Step 2: 发布公开仓库**

使用 “Publish repository”，仓库名填写 `guizhou-six-day-guide`，取消 “Keep this code private”，然后发布。若出现登录、密码、双重验证或系统凭据确认，停止自动操作并请用户本人完成。

- [ ] **Step 3: 验证远端和源码推送**

Run: `git remote -v`

Expected: `origin` 的 fetch/push 地址均指向 GitHub 上的 `guizhou-six-day-guide`。

Run: `git status --short --branch`

Expected: `main` 跟踪 `origin/main`，没有未提交变更或未推送提交。

- [ ] **Step 4: 在 GitHub 网页启用 Actions 发布源**

打开 Settings → Pages，在 “Build and deployment” 下将 Source 选择为 “GitHub Actions”，不选择分支目录发布。GitHub 官方要求先为仓库启用自定义 Actions 发布源；首次推送自动触发的工作流若已因此失败，启用后在 Actions 页面手动重新运行。

- [ ] **Step 5: 确认 Pages 构建成功**

打开仓库的 Actions 页面，等待 `Deploy GitHub Pages` 工作流完成；若首次运行发生在 Step 4 之前并失败，使用 “Re-run all jobs” 重新运行。完成后回到 Settings → Pages，确认页面显示已发布地址。

- [ ] **Step 6: 从远端推导并记录实际地址**

Run:

```powershell
$remote = git remote get-url origin
$owner = [regex]::Match($remote, 'github\.com[/:]([^/]+)/').Groups[1].Value
"https://$owner.github.io/guizhou-six-day-guide/"
```

Expected: 输出与 Settings → Pages 显示一致的 HTTPS 地址。

### Task 4: 公网、浏览器和项目记录验收

**Files:**
- Modify: `PROJECT_PROGRESS.md`
- Modify only if the generated Pages URL changes the durable delivery decision: `AGENTS.md`

**Interfaces:**
- Consumes: Task 3 产生的实际 GitHub Pages URL。
- Produces: HTTP、真实浏览器和手机端验收记录，以及完整的项目进度更新。

- [ ] **Step 1: 验证公开静态请求**

请求 Pages 根页面，解析 HTML 中的实际 JS/CSS 地址，并检查代表性本地图片。

Expected: 根页面、入口 HTML、实际 JS、实际 CSS 和图片连续请求均返回 HTTP 200。

- [ ] **Step 2: 真实桌面浏览器验收**

在 Chrome 打开实际 Pages 地址，检查主标题和完整正文已经由 React 渲染；滚动经过全部图片区域。

Expected: 15/15 图片加载成功，页面没有横向溢出，控制台没有 warning/error。

- [ ] **Step 3: 更新项目记录**

在 `PROJECT_PROGRESS.md` 记录：工作流测试与完整测试结果、构建结果、公开仓库地址、Actions 运行结果、Pages 实际地址、HTTP/浏览器结果、任何遇到的问题及处理方式，以及“等待用户在原手机网络验收”的状态。

- [ ] **Step 4: 提交并推送验收记录**

```bash
git add PROJECT_PROGRESS.md AGENTS.md
git commit -m "docs: record GitHub Pages release"
git push origin main
```

Expected: `main` 与 `origin/main` 同步；由文档提交触发的新一轮 Pages 工作流也成功。

- [ ] **Step 5: 手机端最终验收**

把实际 GitHub Pages 地址交给用户，请用户在此前出现 Cloudflare 拦截的同一手机浏览器和网络下打开。

Expected: 首页正常显示，不再出现 Cloudflare “Attention Required”；用户确认后将结果补写入 `PROJECT_PROGRESS.md`。
