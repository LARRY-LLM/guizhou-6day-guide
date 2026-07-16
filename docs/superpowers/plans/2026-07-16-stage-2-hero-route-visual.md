# 贵州 6 日攻略阶段 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 依据“黔蓝手作旅行簿”视觉稿完成桌面端首屏、顶部导航和 D1–D6 路线速览，并通过浏览器视觉对照。

**Architecture:** 保留现有 React 结构和本地图片，将阶段 2 的主要变化集中在 `src/styles.css`。Vitest 检查核心视觉契约，浏览器在 1024px 和 1440px 验证布局、锚点与控制台状态，`design-qa.md` 记录与参考稿的对照结果。

**Tech Stack:** React 19、Vite 6、CSS3、Vitest 4、Codex in-app Browser。

## Global Constraints

- 唯一视觉真值为 `C:/Users/LarryLiang/.codex/generated_images/019f687a-b9ca-7200-a804-38d6d67e241d/exec-c1ee675c-c1d7-4b33-8b84-718d14d93bec.png`。
- 本阶段只完成桌面端首屏、导航和路线速览；完整日程、390px 手机端、打印样式和 `dist/` 留给后续阶段。
- 使用现有本地图片与 Phosphor 图标，不引入运行时网络资源。
- 不使用自制 SVG、占位图、表情符号或 CSS 绘图代替参考稿中的真实图片。

---

### Task 1: 桌面视觉契约

**Files:**
- Create: `src/styles.test.js`
- Test: `src/styles.test.js`

**Interfaces:**
- Consumes: `src/styles.css` 文本。
- Produces: 对纸张纹理、黔蓝色板、首屏拼贴和路线条选择器的回归保护。

- [x] **Step 1: 写入失败测试**

```js
import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

test("defines the stage two travel-journal visual system", () => {
  for (const contract of [
    "--ink: #123f43",
    'url("/assets/paper-texture.png")',
    ".site-header",
    ".hero-collage",
    ".route-overview",
    "@media (min-width: 1000px)",
  ]) expect(css).toContain(contract);
});
```

- [x] **Step 2: 运行测试确认旧样式失败**

Run: `npm test -- --reporter=verbose src/styles.test.js`

Expected: 缺少阶段 2 视觉契约而失败。

### Task 2: 首屏、导航与路线条

**Files:**
- Modify: `src/styles.css`
- Test: `src/styles.test.js`

**Interfaces:**
- Consumes: 现有 `.site-header`、`.hero`、`.hero-collage`、`.route-overview` 与本地图片。
- Produces: 与参考稿一致的米白纸面、靛蓝标题、朱红按钮、摄影拼贴及旅行簿路线条。

- [x] **Step 1: 定义色板、字体与全局纸张背景**

```css
:root {
  --paper: #f4efe3;
  --ink: #123f43;
  --indigo: #173c61;
  --vermilion: #b64737;
  --muted: #64716e;
  --line: rgba(18, 63, 67, 0.2);
}

html { scroll-behavior: smooth; }
body {
  color: var(--ink);
  background: var(--paper) url("/assets/paper-texture.png") center top / 760px auto repeat;
}
```

- [x] **Step 2: 实现桌面首屏与摄影拼贴**

```css
@media (min-width: 1000px) {
  .hero { grid-template-columns: minmax(390px, 0.78fr) minmax(600px, 1.22fr); }
  .hero-collage { min-height: 650px; position: relative; }
  .hero-photo { position: absolute; overflow: hidden; background: #fffdf7; padding: 10px; }
}
```

- [x] **Step 3: 实现旅行簿路线速览**

```css
.route-overview {
  background: rgba(255, 253, 247, 0.86) url("/assets/paper-texture.png") center / 640px auto repeat;
  border: 1px solid rgba(18, 63, 67, 0.12);
  box-shadow: 0 18px 50px rgba(30, 45, 42, 0.12);
}
.route-strip { display: grid; grid-template-columns: repeat(6, 1fr); }
```

- [x] **Step 4: 运行完整测试**

Run: `npm test -- --reporter=verbose`

Expected: 七项测试全部通过。

### Task 3: 浏览器与设计 QA

**Files:**
- Create: `design-qa.md`
- Modify: `PROJECT_PROGRESS.md`
- Verify: `src/styles.css`

**Interfaces:**
- Consumes: 参考稿与浏览器渲染截图。
- Produces: 阶段 2 的视觉证据、差异修复历史和最终结果。

- [x] **Step 1: 在 1024px 与 1440px 捕获首屏及路线条**

Run: 通过 Codex in-app Browser 打开本地 Vite 页面并截图。

Expected: 两个宽度均无横向滚动、图片遮挡标题或路线节点溢出。

- [x] **Step 2: 验证主要交互**

Run: 点击“展开这趟旅程”，确认 URL 进入 `#itinerary`，并检查控制台错误。

Expected: 锚点跳转成功，控制台无错误。

- [x] **Step 3: 对照参考稿修复所有 P0–P2 差异**

Run: 将参考稿与实现截图放入同一对照图后检查字体、布局、色板、图片质量和文案。

Expected: `design-qa.md` 的 `final result` 为 `passed`。

- [x] **Step 4: 更新项目进度并运行最终测试**

Run: `npm test -- --reporter=verbose`

Expected: 七项测试全部通过，项目状态为“阶段 2 等待用户检查”。
