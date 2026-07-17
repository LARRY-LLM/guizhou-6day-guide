# 贵州六日完整攻略与路线地图 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有“黔蓝手作旅行簿”网站中完整迁移新版六日攻略，并按用户选定的第 2 版模板加入大幅贵州路线地图和适合长内容的旅行档案页。

**Architecture:** 保留 React + Vite 单页结构，把长内容从 `App.jsx` 拆分为旅行总览数据和每日数据，再由地图、行前总览、每日档案和全程汇总组件组合。地图使用真实栅格底图资产和语义化 HTML 标签，桌面采用大画幅地图，手机采用地图加纵向路线列表。

**Tech Stack:** React 19、Vite 6、Vitest、Testing Library、Phosphor Icons、CSS、现有本地 PNG 素材。

## Global Constraints

- 在现有项目上修改，不新建站点，不更换公开 URL 或部署方式。
- `贵州6天攻略_完整整合版.md` 中的行程、酒店、餐饮、价格、交通、预约和避坑信息全部进入页面。
- 选定视觉目标为 `C:/Users/LarryLiang/.codex/generated_images/019f6df4-1123-7b50-bac5-2be44378f5e6/exec-852d6737-bbf6-456d-a6dd-b1cdef73b2da.png`。
- 保持米白纸张、黔蓝墨色、朱红点缀、靛蓝织物和摄影拼贴风格。
- 删除小七孔路线；新版路线包含黄果树、龙宫/屯堡、西江和朗德。
- 不使用 emoji、渐变、通用 SaaS 圆角卡片、CSS 绘图或手写 SVG 代替真实素材。
- 390px 页面无横向溢出；保留 A4 打印和离线构建能力。

## Review Checkpoints

- 阶段 1（Task 1）：完整内容数据迁移，停下核对路线与原文覆盖。
- 阶段 2（Task 2–3）：首屏、路线地图、行前总览和 D1–D6 档案页，停下核对桌面主体页面。
- 阶段 3（Task 4–5）：全程汇总、手机端和打印视觉，停下核对 390px 与打印效果。
- 阶段 4（Task 6）：构建、视觉 QA 和交付记录，停下进行最终验收。

---

### Task 1: 建立完整攻略数据契约

**Files:**
- Create: `src/data/guide.js`
- Create: `src/data/days.js`
- Create: `src/data/guide.test.js`
- Modify: `src/data/itinerary.js`

**Interfaces:**
- Produces: `guideMeta`, `preTripOverview`, `transportComparison`, `staySummary`, `foodTips`, `generalWarnings`, `days`。
- `days` 中每项为 `{ day, title, location, transit, stay, schedule, transportSections, hotels, foodSections, tips }`。

- [ ] **Step 1: 写出会失败的数据完整性测试**

```js
import { describe, expect, test } from "vitest";
import { preTripOverview, transportComparison } from "./guide.js";
import { days } from "./days.js";

describe("complete guide data", () => {
  test("contains the complete six-day replacement route", () => {
    expect(days).toHaveLength(6);
    expect(days.flatMap((day) => day.schedule)).toHaveLength(24);
    expect(days.map((day) => day.title)).toEqual([
      "贵阳抵达，城市夜游",
      "黄果树瀑布",
      "龙宫与屯堡",
      "西江千户苗寨",
      "西江晨游与朗德上寨",
      "贵阳半日与返程",
    ]);
  });

  test("keeps every planning summary", () => {
    expect(preTripOverview.reservations).toHaveLength(5);
    expect(preTripOverview.budget.total).toBe("约 2700–4300");
    expect(transportComparison).toHaveLength(6);
  });

  test("includes the named hotel inventory", () => {
    expect(days.flatMap((day) => day.hotels)).toHaveLength(12);
  });
});
```

- [ ] **Step 2: 运行测试并确认因模块不存在而失败**

Run: `npm test -- src/data/guide.test.js`

Expected: FAIL，提示无法解析 `./guide.js` 或 `./days.js`。

- [ ] **Step 3: 创建数据模块并逐段迁移 Markdown 原文**

```js
// src/data/guide.js
export const guideMeta = {
  title: "贵州六日完整旅行手记",
  subtitle: "黄果树 · 西江苗寨 · 贵阳",
  season: "7–8 月",
  duration: "6 天 5 晚",
  verifiedAt: "2026-07-16",
};

export const preTripOverview = {
  clothing: [
    "短袖 T × 3–4、薄长袖 × 1–2",
    "薄外套 × 1（溶洞 16℃、山顶风、车内空调）",
    "薄长裤 × 2、短裤 × 1、防滑运动鞋、凉鞋",
    "轻便雨衣、折叠伞、手机防水袋",
    "帽子、墨镜、防晒霜、充电宝",
  ],
  essentials: [
    "贵州山路弯道多，易晕车备药",
    "不坐黑车，用合规直通车或 12306",
    "西江寨内无行李车，大箱寄存贵阳",
    "不吃折耳根需提前说明",
  ],
  budget: {
    rows: [
      ["交通", "600–900"], ["住宿（5 晚）", "900–1500"],
      ["门票", "500–700"], ["餐饮", "500–800"], ["其他", "200–400"],
    ],
    total: "约 2700–4300",
  },
  reservations: [
    "黄果树门票 + 水帘洞时段",
    "西江千户苗寨门票 + 观光车",
    "贵州省博物馆",
    "甲秀楼",
    "往返高铁票",
  ],
};
```

将 Markdown 中每个表格行和列表项转换为对象或字符串；不改写价格、评分、酒店名和餐厅名。

- [ ] **Step 4: 运行数据测试并确认通过**

Run: `npm test -- src/data/guide.test.js`

Expected: PASS，3 项测试全部通过。

- [ ] **Step 5: 提交数据迁移**

```bash
git add src/data/guide.js src/data/days.js src/data/guide.test.js src/data/itinerary.js
git commit -m "feat: migrate complete Guizhou guide content"
```

### Task 2: 更新首屏、导航和路线地图

**Files:**
- Create: `src/components/RouteMap.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`
- Create: `public/assets/guizhou-route-map.png`

**Interfaces:**
- Consumes: `guideMeta`、`days`。
- Produces: `<RouteMap days={days} />`，包含 `#route-map` 锚点和 6 个 `data-testid="map-stop"` 节点。

- [ ] **Step 1: 写出新首屏和地图的失败测试**

```jsx
test("renders the selected complete-guide hero and six-stop map", () => {
  render(<App />);

  expect(screen.getByRole("heading", {
    name: "贵州六日完整旅行手记",
    level: 1,
  })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "六日行程路线图" })).toBeInTheDocument();
  expect(screen.getAllByTestId("map-stop")).toHaveLength(6);
  expect(screen.getByText("龙宫 · 天龙屯堡")).toBeInTheDocument();
  expect(screen.getByText("朗德上寨")).toBeInTheDocument();
  expect(screen.queryByText(/小七孔/)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: 运行测试并确认旧首屏导致失败**

Run: `npm test -- src/App.test.jsx`

Expected: FAIL，找不到新标题和“六日行程路线图”。

- [ ] **Step 3: 生成并保存无文字地图底图**

使用选定模板作为视觉参考生成无文字贵州水彩地形图，要求包含黔蓝环线路径、六个无文字节点和黄果树/西江照片留位，不生成地点文字。将确认后的图片保存为 `public/assets/guizhou-route-map.png` 并目视检查路线、留白、颜色和裁切。

- [ ] **Step 4: 实现语义化路线地图和新首屏**

```jsx
export function RouteMap({ days }) {
  return (
    <section className="route-atlas" id="route-map" aria-labelledby="route-map-title">
      <header className="section-heading">
        <p className="eyebrow">SIX-DAY ROUTE</p>
        <h2 id="route-map-title">六日行程路线图</h2>
      </header>
      <div className="route-atlas-visual">
        <img src={asset("guizhou-route-map.png")} alt="贵州六日环线路线手绘地图" />
        <ol className="route-atlas-stops">
          {days.map((day) => (
            <li key={day.day} data-testid="map-stop">
              <a href={`#day-${day.day}`}><span>D{day.day}</span><strong>{day.mapLabel}</strong></a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: 运行首屏测试并确认通过**

Run: `npm test -- src/App.test.jsx`

Expected: 新标题、地图节点和旧路线移除测试通过。

- [ ] **Step 6: 提交首屏和地图**

```bash
git add src/App.jsx src/App.test.jsx src/components/RouteMap.jsx public/assets/guizhou-route-map.png
git commit -m "feat: add six-day Guizhou route atlas"
```

### Task 3: 构建行前总览和六天档案页

**Files:**
- Create: `src/components/TripOverview.jsx`
- Create: `src/components/DayChapter.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`

**Interfaces:**
- Consumes: `preTripOverview`、`days`。
- Produces: `<TripOverview overview={preTripOverview} />` 和 `<DayChapter day={day} image={image} />`。

- [ ] **Step 1: 写出全部内容模块的失败测试**

```jsx
test("renders complete preparation and daily-guide modules", () => {
  render(<App />);

  expect(screen.getAllByTestId("day-entry")).toHaveLength(6);
  expect(screen.getAllByTestId("schedule-row")).toHaveLength(24);
  expect(screen.getAllByTestId("hotel-row")).toHaveLength(12);
  expect(screen.getAllByTestId("reservation-item")).toHaveLength(5);
  expect(screen.getByText("约 2700–4300")).toBeInTheDocument();
  expect(screen.getByText(/12 道拦门酒/)).toBeInTheDocument();
  expect(screen.getByText(/夺夺粉/)).toBeInTheDocument();
});
```

- [ ] **Step 2: 运行测试并确认缺少组件导致失败**

Run: `npm test -- src/App.test.jsx`

Expected: FAIL，数量为 0 或找不到新内容。

- [ ] **Step 3: 实现账簿式行前总览**

```jsx
export function TripOverview({ overview }) {
  return (
    <section className="trip-overview" id="preparation">
      <div className="overview-column"><h3>衣</h3><ul>{overview.clothing.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div className="overview-column"><h3>必带</h3><ul>{overview.essentials.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div className="overview-column"><h3>预算</h3><dl>{overview.budget.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><strong>{overview.budget.total}</strong></div>
      <div className="overview-column">
        <h3>预约</h3>
        {overview.reservations.map((item) => <p data-testid="reservation-item" key={item}>□ {item}</p>)}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 实现每日档案组件**

`DayChapter` 依次渲染标题、住宿、时间表、交通段落、酒店表、餐饮段落和提示；所有数组使用源文案稳定键，表头使用 `<th>`，酒店价格保留 `/晚`。

- [ ] **Step 5: 运行测试并确认 6 天完整内容通过**

Run: `npm test -- src/App.test.jsx src/data/guide.test.js`

Expected: PASS，6 天、24 个时段、12 条酒店、5 项预约全部命中。

- [ ] **Step 6: 提交内容组件**

```bash
git add src/App.jsx src/App.test.jsx src/components/TripOverview.jsx src/components/DayChapter.jsx
git commit -m "feat: render complete daily travel dossiers"
```

### Task 4: 添加全程汇总与时效声明

**Files:**
- Create: `src/components/TripSummaries.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`

**Interfaces:**
- Consumes: `transportComparison`、`staySummary`、`foodTips`、`generalWarnings`。
- Produces: `#transport-stay`、`#food-tips` 两个导航锚点。

- [ ] **Step 1: 写出汇总内容的失败测试**

```jsx
test("renders complete trip summaries and freshness notice", () => {
  render(<App />);
  expect(screen.getAllByTestId("transport-comparison-row")).toHaveLength(6);
  expect(screen.getAllByTestId("stay-summary-row")).toHaveLength(6);
  expect(screen.getByText("进大景坐高铁，串小景包个车，苗寨之间拼个车。")).toBeInTheDocument();
  expect(screen.getByText(/实际票价、班次、房价、预约政策/)).toBeInTheDocument();
});
```

- [ ] **Step 2: 运行测试并确认汇总区尚未存在**

Run: `npm test -- src/App.test.jsx`

Expected: FAIL，找不到交通和住宿汇总行。

- [ ] **Step 3: 实现汇总组件并接入页面**

```jsx
export function TripSummaries({ transport, stays, foodTips, warnings }) {
  return (
    <>
      <section id="transport-stay">
        <h2>全程交通与住宿</h2>
        <table><tbody>{transport.map((row) => <tr data-testid="transport-comparison-row" key={row.segment}><th>{row.segment}</th><td>{row.publicCost}</td><td>{row.charterCost}</td><td>{row.advice}</td></tr>)}</tbody></table>
        <table><tbody>{stays.map((row) => <tr data-testid="stay-summary-row" key={row.night}><th>{row.night}</th><td>{row.location}</td><td>{row.recommendation}</td></tr>)}</tbody></table>
      </section>
      <section id="food-tips">
        <h2>吃喝与避坑</h2>
        <ul>{foodTips.map((item) => <li key={item.title}><strong>{item.title}</strong>{item.detail}</li>)}</ul>
        <ol>{warnings.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>
    </>
  );
}
```

- [ ] **Step 4: 运行测试并确认通过**

Run: `npm test -- src/App.test.jsx`

Expected: PASS，交通、住宿、口诀和时效声明全部出现。

- [ ] **Step 5: 提交汇总区**

```bash
git add src/App.jsx src/App.test.jsx src/components/TripSummaries.jsx
git commit -m "feat: add complete trip comparison summaries"
```

### Task 5: 落实选定模板的桌面、手机和打印视觉

**Files:**
- Modify: `src/styles.css`
- Modify: `src/styles.test.js`

**Interfaces:**
- Consumes: Task 2–4 的类名。
- Produces: 1440px 大幅地图布局、1024px 收敛布局、390px 单列布局和 A4 打印规则。

- [ ] **Step 1: 写出关键视觉契约的失败测试**

```js
test("defines route atlas, mobile table, and print contracts", () => {
  expect(styles).toContain(".route-atlas-visual");
  expect(styles).toContain(".day-ledger");
  expect(styles).toContain("@media (max-width: 640px)");
  expect(styles).toContain("@media print");
  expect(styles).toContain("break-inside: avoid");
});
```

- [ ] **Step 2: 运行测试并确认新选择器缺失**

Run: `npm test -- src/styles.test.js`

Expected: FAIL，找不到 `.route-atlas-visual`。

- [ ] **Step 3: 实现地图和档案页视觉**

以选定模板为基准设置：地图宽度、账簿细线、朱红节点、黔蓝标题、正文行宽、桌面双栏、照片碎片和靛蓝底边。复用现有 CSS 变量，不引入新 UI 框架。

- [ ] **Step 4: 实现 390px 与打印规则**

手机端将地图标注变为纵向列表、表格行变为标签值块；打印端隐藏交互控件并为 `.day-entry`、`.route-atlas`、表头和标题设置分页保护。

- [ ] **Step 5: 运行全部自动化测试**

Run: `npm test`

Expected: 所有 Vitest 通过，无 warning/error。

- [ ] **Step 6: 提交视觉实现**

```bash
git add src/styles.css src/styles.test.js
git commit -m "style: apply route-atlas travel journal layout"
```

### Task 6: 构建、浏览器视觉 QA 与项目记录

**Files:**
- Modify: `design-qa.md`
- Create: `design-qa/complete-guide-selected-reference.png`
- Create: `design-qa/complete-guide-desktop-1440.png`
- Create: `design-qa/complete-guide-mobile-390.png`
- Modify: `PROJECT_PROGRESS.md`

**Interfaces:**
- Consumes: 完整实现和选定模板。
- Produces: `design-qa.md` 中的 `final result: passed` 与更新后的 `dist/`。

- [ ] **Step 1: 执行生产构建**

Run: `npm run build`

Expected: Vite 成功输出 `dist/client/`，构建退出码为 0。

- [ ] **Step 2: 启动本地预览并检查核心交互**

启动项目预览，打开页面，依次点击路线地图、每日行程、交通住宿、吃喝避坑和打印按钮；确认锚点正确、图片完成加载、控制台无 warning/error。

- [ ] **Step 3: 捕获三种视图**

保存 1440px 全页关键区、1024px 地图/表格、390×844 首屏/地图/日程，以及打印预览证据；核对 `document.documentElement.scrollWidth === document.documentElement.clientWidth`。

- [ ] **Step 4: 执行 Product Design 视觉对照**

将选定参考稿与 1440px 实现截图组合对照，记录布局、密度、字体、间距、地图比例、照片裁切、边框与分页问题；修复全部 P0、P1、P2 后重新截图，直到 `design-qa.md` 写入 `final result: passed`。

- [ ] **Step 5: 更新进度记录并做最终验证**

Run: `npm test`

Expected: 全部测试成功。

Run: `npm run build`

Expected: 构建成功；`PROJECT_PROGRESS.md` 记录内容来源、选定模板、地图方案、验证证据、遗留 P3 与发布状态。

- [ ] **Step 6: 提交最终交付物**

```bash
git add design-qa.md design-qa PROJECT_PROGRESS.md dist
git commit -m "docs: verify complete Guizhou guide redesign"
```
