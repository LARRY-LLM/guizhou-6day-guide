# 贵州 6 日攻略阶段 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成 D1–D6 详细攻略、三大景点、交通住宿、预算美食、行前清单与 390px 手机端单列布局。

**Architecture:** 保留 `itinerary.js` 的 `DayPlan` 数据与 `App.jsx` 的语义区块，新增稳定测试标记并将阶段 3 的主要实现集中在 `src/styles.css`。桌面端采用旅行杂志式错落日程卡，手机端在 640px 以下转为单列时间轴，同时保留阶段 2 的首屏视觉语言。

**Tech Stack:** React 19、Vite 6、CSS3、Phosphor Icons、Vitest 4、Testing Library、Codex in-app Browser。

## Global Constraints

- 唯一视觉真值为 `C:/Users/LarryLiang/.codex/generated_images/019f687a-b9ca-7200-a804-38d6d67e241d/exec-c1ee675c-c1d7-4b33-8b84-718d14d93bec.png`。
- 固定路线为贵阳进出 → 黄果树 → 荔波小七孔 → 西江千户苗寨 → 贵阳；不加入梵净山。
- D5 白天继续游西江、晚上回贵阳；D6 上午贵阳小景点、下午高铁返程。
- 本阶段只完成完整攻略与 390px 手机端；打印样式、生产构建和 `dist/` 留到阶段 4。
- 不引入运行时网络资源；图片继续使用 `public/assets/` 中的本地素材。
- 不使用自制 SVG、CSS 绘图、表情或占位图代替真实素材与图标。

---

### Task 1: 完整攻略内容契约

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/App.jsx`
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes: `itinerary: DayPlan[]` 与现有日程、实用信息和清单区块。
- Produces: `data-testid="day-entry"`、`data-testid="schedule-row"`、`data-testid="practical-card"`、`data-testid="checklist-card"` 稳定测试契约。

- [x] **Step 1: 写入失败测试**

```jsx
test("renders the complete stage three guide content", () => {
  render(<App />);

  expect(screen.getAllByTestId("day-entry")).toHaveLength(6);
  expect(screen.getAllByTestId("schedule-row")).toHaveLength(22);
  expect(screen.getAllByTestId("practical-card")).toHaveLength(4);
  expect(screen.getAllByTestId("checklist-card")).toHaveLength(3);
  expect(screen.getByText("¥2,500–4,200")).toBeInTheDocument();
  expect(screen.getByText(/强降雨或景区临时关闭/)).toBeInTheDocument();
});
```

- [x] **Step 2: 运行测试确认失败**

Run: `npm test -- --reporter=verbose src/App.test.jsx`

Expected: 因缺少阶段 3 的 `data-testid` 标记而失败。

- [x] **Step 3: 添加最小语义标记**

```jsx
<article data-testid="day-entry" ...>
<div data-testid="schedule-row" ...>
<article data-testid="practical-card">...</article>
<article data-testid="checklist-card">...</article>
```

- [x] **Step 4: 运行测试确认通过**

Run: `npm test -- --reporter=verbose src/App.test.jsx`

Expected: 阶段 3 内容契约通过，既有测试保持通过。

### Task 2: 桌面端完整攻略视觉

**Files:**
- Modify: `src/styles.test.js`
- Modify: `src/styles.css`
- Test: `src/styles.test.js`

**Interfaces:**
- Consumes: `.day-list`、`.day-entry`、`.sight-grid`、`.practical-grid`、`.budget-food`、`.checklist-grid` 与现有设计令牌。
- Produces: 错落日程卡、相纸照片、手记边注、三大景点卡及实用信息纸片布局。

- [x] **Step 1: 写入失败的阶段 3 样式测试**

```js
test("defines the complete guide and mobile layout contracts", () => {
  for (const contract of [
    ".day-entry:nth-child(even)",
    ".schedule-row::before",
    ".sight-grid",
    ".budget-food",
    "@media (max-width: 640px)",
    ".mobile-day-line",
  ]) expect(css).toContain(contract);
});
```

- [x] **Step 2: 运行测试确认失败**

Run: `npm test -- --reporter=verbose src/styles.test.js`

Expected: 缺少阶段 3 视觉与手机端契约而失败。

- [x] **Step 3: 实现桌面端日程与实用模块**

```css
.day-entry { position: relative; padding: 34px; background: rgba(255, 253, 247, .84); }
.day-entry:nth-child(even) { transform: rotate(.25deg); }
.day-body { grid-template-columns: minmax(250px, .82fr) minmax(360px, 1.18fr) 220px; }
.sight-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.practical-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
```

- [x] **Step 4: 实现照片、时间轴与边注细节**

```css
.schedule-row { position: relative; grid-template-columns: 130px 1fr; }
.schedule-row::before { content: ""; position: absolute; }
.margin-note { border-left: 2px solid var(--vermilion); }
.day-photo { padding: 9px; background: var(--paper-light); }
```

- [x] **Step 5: 运行测试确认桌面契约通过**

Run: `npm test -- --reporter=verbose src/styles.test.js`

Expected: 两项样式测试全部通过。

### Task 3: 390px 手机端单列布局

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/styles.css`
- Test: `src/styles.test.js`

**Interfaces:**
- Consumes: 阶段 2 首屏、路线条及 Task 2 完整内容布局。
- Produces: 390px 宽度无横向滚动的单列时间轴与可操作导航、按钮、链接。

- [x] **Step 1: 添加手机时间轴装饰节点**

```jsx
<span className="mobile-day-line" aria-hidden="true" />
```

- [x] **Step 2: 实现 640px 以下单列规则**

```css
@media (max-width: 640px) {
  .site-header, .hero, .route-overview, main > section { width: min(100% - 24px, var(--page)); }
  .site-header nav { overflow-x: auto; flex-wrap: nowrap; }
  .hero-collage { min-height: 420px; }
  .route-strip, .day-body, .sight-grid, .practical-grid, .budget-food, .checklist-grid { grid-template-columns: 1fr; }
  .day-entry { padding: 22px 18px 22px 30px; }
  .mobile-day-line { display: block; }
}
```

- [x] **Step 3: 运行完整自动化测试**

Run: `npm test -- --reporter=verbose`

Expected: 全部测试通过。

### Task 4: 浏览器视觉 QA 与阶段记录

**Files:**
- Modify: `design-qa.md`
- Modify: `PROJECT_PROGRESS.md`
- Verify: `src/styles.css`

**Interfaces:**
- Consumes: 1024px 参考视觉、1440px 桌面实现与 390px 手机实现。
- Produces: 阶段 3 截图、对照证据、无溢出指标和等待用户检查状态。

- [x] **Step 1: 捕获 1440px 完整攻略关键区块**

Run: 在 Codex in-app Browser 中打开本地页面，截图日程、三大景点和实用信息区域。

Expected: 日程卡错落但不遮挡，图片裁切正常，文字层级与阶段 2 一致。

- [x] **Step 2: 捕获并检查 390 × 844 手机页面**

Run: 设置 390 × 844 视口，检查首屏、路线、D1–D6、实用信息与页面底部。

Expected: `scrollWidth === clientWidth`，无文字、按钮或图片横向溢出。

- [x] **Step 3: 验证导航和控制台**

Run: 点击手机端“行前准备”导航并检查 URL 与浏览器控制台。

Expected: URL 进入 `#checklist`，控制台无 warning/error。

- [x] **Step 4: 写入 QA 与项目进度**

Run: 更新 `design-qa.md` 与 `PROJECT_PROGRESS.md`，记录完成内容、问题、解决办法和可复用思路。

Expected: 阶段 3 状态为“等待用户检查”，QA 的阶段 3 `final result` 为 `passed`。

- [x] **Step 5: 最终验证**

Run: `npm test -- --reporter=verbose`

Expected: 全部测试通过；不生成 `dist/`，不添加打印样式。
