# 贵州 6 日攻略阶段 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在保留现有工程、组件和素材的前提下，完成调整后的 D5/D6 行程数据、自动化测试、官方来源状态记录及项目进度档案。

**Architecture:** `src/data/itinerary.js` 继续作为 D1–D6 的单一数据源，`App.jsx` 负责渲染。Vitest 从用户可见文本验证 D5 晚归贵阳和 D6 上午城市漫游，`PROJECT_PROGRESS.md` 记录阶段状态与复盘。

**Tech Stack:** React 19、Vite 6、Vitest 4、Testing Library。

## Global Constraints

- 本阶段不制作视觉 CSS，不进入阶段 2。
- D5 晚上返回贵阳；D6 上午城区漫游、下午高铁返程。
- 不写死易变票价、车次和景区开放时间。
- 直接使用现有项目目录；该目录当前没有 Git 仓库，无法创建工作树或阶段提交。

---

### Task 1: 新行程验收测试

**Files:**
- Modify: `src/App.test.jsx`

**Interfaces:**
- Consumes: `App` 渲染出的 D5/D6 用户可见文本。
- Produces: 对晚归贵阳、D6 城区漫游和下午返程的回归保护。

- [x] **Step 1: 添加 D5/D6 新节奏测试**

```jsx
test("keeps day five in Xijiang until the evening return to Guiyang", () => {
  render(<App />);
  expect(screen.getByText("傍晚经凯里南返回贵阳，晚上抵达酒店休息。"))
    .toBeInTheDocument();
});

test("uses day six morning for a compact Guiyang city walk", () => {
  render(<App />);
  expect(screen.getByText(/文昌阁、电台街/)).toBeInTheDocument();
  expect(screen.getByText(/下午乘高铁返程/)).toBeInTheDocument();
});
```

- [x] **Step 2: 运行测试并确认因旧行程仍在而失败**

Run: `npm test -- --reporter=verbose`

Expected: 两项新增测试失败，既有四项测试通过。

### Task 2: D5/D6 数据更新

**Files:**
- Modify: `src/data/itinerary.js`
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes: `DayPlan` 既有字段。
- Produces: 调整后的 D5/D6 页面内容。

- [x] **Step 1: 更新 D5 为白天苗寨、晚上回贵阳**

```js
{ label: "傍晚", time: "17:00–20:30", detail: "傍晚经凯里南返回贵阳，晚上抵达酒店休息。" }
```

- [x] **Step 2: 更新 D6 为上午城市漫游、下午返程**

```js
{ label: "上午", time: "08:30–11:30", detail: "早餐后轻逛文昌阁、电台街；若 D1 未去甲秀楼，可顺路补游。" }
{ label: "下午", time: "按车次", detail: "午餐后回酒店取行李，前往贵阳北站，下午乘高铁返程。" }
```

- [x] **Step 3: 运行完整测试**

Run: `npm test -- --reporter=verbose`

Expected: 六项测试全部通过。

### Task 3: 阶段记录与内容检查

**Files:**
- Create: `PROJECT_PROGRESS.md`
- Verify: `src/data/itinerary.js`
- Verify: `src/App.test.jsx`

**Interfaces:**
- Consumes: 阶段 1 的测试及来源检查结果。
- Produces: 后续阶段持续维护的项目档案。

- [x] **Step 1: 记录复用项、问题、解决办法和来源状态**

```markdown
## 阶段 1：内容、数据与项目基线
- 状态：等待用户检查
- 已完成：D5/D6 更新、测试、官方来源状态记录
```

- [x] **Step 2: 检查计划无占位符或范围漂移**

Run: `rg -n "[T]BD|[T]ODO|[i]mplement later" docs/superpowers/plans/2026-07-16-stage-1-content-baseline.md PROJECT_PROGRESS.md`

Expected: 无匹配结果。

- [x] **Step 3: 运行最终阶段验收**

Run: `npm test -- --reporter=verbose`

Expected: 六项测试全部通过。
