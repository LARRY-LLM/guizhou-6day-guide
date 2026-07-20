# 贵州六天攻略全量迁移 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `D:/workbuddy/project/2026-07-16-16-34-33/贵州6天攻略_完整整合版.md` 的全部信息迁入现有“黔蓝手作旅行簿”网页，完成专业信息架构、响应式视觉与本地 QA，并在用户检查前停止部署。

**Architecture:** 继续使用 React + Vite 单页应用，以 `guide.js` 承载全局信息、`days.js` 承载逐日信息，组件只负责语义化渲染。新增源内容覆盖契约保护所有路线、表格、清单和长说明；现有视觉参考图与本地栅格素材继续作为视觉真值。

**Tech Stack:** React 19、Vite 6、Vitest、Testing Library、Phosphor Icons、CSS、现有 PNG/WebP 素材。

## Global Constraints

- 源 Markdown 是唯一内容事实来源，网页必须包含其中全部信息，不得摘要删减。
- 新路线固定为广州→贵阳→黄果树/安顺→龙宫/屯堡→下司→朗德→西江→贵阳→广州。
- 保留“黔蓝手作旅行簿”米白纸张、黔蓝墨色、朱红点缀、摄影拼贴和真实图片素材。
- 保留 1440px/1024px/390px 响应式、A4 打印、本地 PNG/WebP 与相对资源路径。
- 不新增地图 API、登录、预订、支付、后端或新的 UI 框架。
- 本轮仅完成本地网页与设计 QA；不得推送远端、运行部署工作流、发布 GitHub Pages 或更新 Sites。
- 子代理用于独立内容审查与最终复核；生产文件由单一实现者按任务顺序修改，避免并发冲突。

---

### Task 1: 建立源攻略覆盖契约

**Files:**
- Modify: `src/data/guide.test.js`
- Modify: `src/App.test.jsx`

**Interfaces:**
- Consumes: `guideMeta`、`intercityTravel`、`preTripOverview`、`transportComparison`、`staySummary`、`foodTips`、`generalWarnings`、`days`。
- Produces: 对源攻略全局章节、D1–D6 路线和逐字段渲染的回归契约。

- [ ] **Step 1: 写入失败的数据契约测试**

新增断言，要求 `days.map(day => [day.location, day.stay])` 精确匹配源路线；预约共 6 项；D2 包含五步“上帝视角”、大瀑布省力/常规方案；D3 住下司；D4 为下司→朗德→西江；D5 回贵阳；D6 含黔灵山省力路线和青岩备选；全局数据包含广州往返交通与接驳。

- [ ] **Step 2: 验证测试因旧数据而失败**

Run: `npm test -- --reporter=verbose src/data/guide.test.js src/App.test.jsx`

Expected: FAIL，失败项明确指出旧 D3–D6 路线、5 项预约和缺失的广州往返/下司/黔灵山内容。

- [ ] **Step 3: 扩展页面完整性断言**

在 `App.test.jsx` 遍历全部结构化字段；对字符串、数组、对象行和编号步骤统一检查 `container.textContent`，确保任一源字段未渲染都会失败。

- [ ] **Step 4: 再次确认 RED 状态**

Run: `npm test -- --reporter=verbose src/App.test.jsx`

Expected: FAIL，原因是新接口或源字段尚未实现，而不是语法或导入错误。

### Task 2: 迁移全局信息与行前/汇总架构

**Files:**
- Modify: `src/data/guide.js`
- Modify: `src/components/TripOverview.jsx`
- Modify: `src/components/TripSummaries.jsx`
- Modify: `src/App.jsx`
- Test: `src/data/guide.test.js`
- Test: `src/App.test.jsx`

**Interfaces:**
- Produces: `intercityTravel = { options, transfers, booking }`；`preTripOverview` 的完整衣物、必带、预算与 6 项预约；源文档中的交通对比、住宿速览、吃货避坑和全程避坑。

- [ ] **Step 1: 将全局章节逐项迁入数据层**

加入广州高铁/飞机价格与耗时、贵阳北/东站和机场接驳、12306 候补；预算保留 5 类当地成本、合计与广州往返附加成本；预约按源文档保留 6 项。

- [ ] **Step 2: 重组行前总览**

让 `TripOverview` 先展示“广州往返”横向交通带，再展示衣、必带、预算、预约四区；预算必须同时呈现“不含往返大交通”和“+广州↔贵阳高铁往返约 700–960”。

- [ ] **Step 3: 更新全程汇总**

让 `TripSummaries` 精确渲染源文档 6 行交通费用、D1–D6 住宿速览、四类吃货提示与六类全程避坑，口诀改为“进大景坐高铁，串小景包个车，古镇之间拼个车。”。

- [ ] **Step 4: 运行目标测试**

Run: `npm test -- --reporter=verbose src/data/guide.test.js src/App.test.jsx`

Expected: 全局信息相关测试 PASS；逐日路线相关测试继续 FAIL。

- [ ] **Step 5: 提交全局信息变更**

Run: `git add src/data/guide.js src/components/TripOverview.jsx src/components/TripSummaries.jsx src/App.jsx src/data/guide.test.js src/App.test.jsx && git commit -m "feat: migrate complete guide-level information"`

### Task 3: 迁移 D1–D6 全部档案内容

**Files:**
- Modify: `src/data/days.js`
- Modify: `src/components/DayChapter.jsx`
- Test: `src/data/guide.test.js`
- Test: `src/App.test.jsx`

**Interfaces:**
- Produces: 每日对象 `{ day, title, mapLabel, location, transit, stay, schedule, featureSections, transportSections, hotels, hotelNote, foodSections, tips }`；`featureSections` 支持标题、说明、编号步骤和列表。

- [ ] **Step 1: 迁移六日时间表与转场**

按源文档逐行迁移 D1–D6，包含所有时间、活动、耗时、提示；删除旧 D3–D6 主线并使用下司/朗德/西江/贵阳的新住宿与交通顺序。

- [ ] **Step 2: 迁移长说明和所有日内细节**

将 D2 上帝视角五步、黄果树完整时间表、大瀑布省力/常规方案；D4 下司玩法；D6 黔灵山省力路线与青岩备选放入 `featureSections`。每日交通、酒店、餐饮和提示逐项复制源文档事实。

- [ ] **Step 3: 扩展每日档案组件**

在日程表之后、交通区之前渲染 `featureSections`；编号步骤使用 `<ol>`，普通要点使用 `<ul>`，保留标题层级和移动端可读标签。

- [ ] **Step 4: 运行数据与渲染测试**

Run: `npm test -- --reporter=verbose src/data/guide.test.js src/App.test.jsx`

Expected: 新路线、全字段覆盖与所有源内容测试 PASS。

- [ ] **Step 5: 提交每日档案变更**

Run: `git add src/data/days.js src/components/DayChapter.jsx src/data/guide.test.js src/App.test.jsx && git commit -m "feat: migrate complete six-day source itinerary"`

### Task 4: 更新地图、信息层级与响应式视觉

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/RouteMap.jsx`
- Modify: `src/styles.css`
- Modify: `src/styles.test.js`
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: 新 `guideMeta` 与 `days`。
- Produces: 专业长篇攻略结构、六个正确地图节点、桌面/平板/手机/打印视觉。

- [ ] **Step 1: 写视觉契约失败测试**

要求 CSS 包含城际交通带、重点攻略区、移动端编号步骤、长表格字段标签、路线地图和 A4 打印分页保护选择器。

- [ ] **Step 2: 验证测试失败**

Run: `npm test -- --reporter=verbose src/styles.test.js`

Expected: FAIL，缺少新信息架构选择器。

- [ ] **Step 3: 更新首屏与路线地图**

首屏明确“广州往返 · 贵阳枢纽 · 6天5晚”；路线图和移动路线条使用贵阳、黄果树/安顺、龙宫/屯堡/下司、朗德/西江、贵阳夜市、贵阳返程的六日语义，不在地图图片内伪造文字。

- [ ] **Step 4: 实现长内容视觉系统**

用章节眉题、朱红重点线、账簿分隔和有限的纸面容器建立层级；D2/D6 长说明采用清晰编号和重点提示；避免把每段文字都做成通用圆角卡片。

- [ ] **Step 5: 完成响应式和打印规则**

在 999px 由多栏收束为两栏，在 640px 变为单列；所有表格使用 `data-label`；390px 无横向溢出；打印隐藏导航/按钮并保护地图、每日章节、表格行与编号步骤分页。

- [ ] **Step 6: 更新项目持久设计决定并运行测试**

Run: `npm test -- --reporter=verbose`

Expected: 全部 Vitest 测试 PASS，无 warning/error。

- [ ] **Step 7: 提交视觉变更**

Run: `git add src/App.jsx src/components/RouteMap.jsx src/styles.css src/styles.test.js AGENTS.md && git commit -m "style: restructure complete guide for long-form reading"`

### Task 5: 本地构建、浏览器与设计 QA（停止部署）

**Files:**
- Modify: `design-qa.md`
- Create: `design-qa/full-source-desktop-1440.png`
- Create: `design-qa/full-source-tablet-1024.png`
- Create: `design-qa/full-source-mobile-390.png`
- Modify: `PROJECT_PROGRESS.md`

**Interfaces:**
- Consumes: 本地 Vite 页面与已选参考图。
- Produces: `design-qa.md` 的 `final result: passed`、可供用户检查的本地页面和未部署状态记录。

- [ ] **Step 1: 运行完整测试与生产构建**

Run: `npm test -- --reporter=verbose`

Expected: 所有测试 PASS。

Run: `npm run build`

Expected: 构建退出码 0，输出到 `dist/client/`，无 warning。

- [ ] **Step 2: 启动本地预览并检查交互**

打开本地页面，验证导航锚点、六个地图节点、打印按钮、图片加载和控制台；不得打开部署页面或推送远端。

- [ ] **Step 3: 捕获三种视口与打印状态**

保存 1440px、1024px、390×844 截图；验证 `scrollWidth === clientWidth`、长表格标签完整、D2/D6 重点说明可读。

- [ ] **Step 4: 执行 Product Design 对照 QA**

把参考图与实现截图放入同一比较画布，逐项核对字体、间距、颜色、图片、图标、文案和响应式；修复全部 P0/P1/P2，更新 `design-qa.md` 直到 `final result: passed`。

- [ ] **Step 5: 更新进度并提交本地验收材料**

在 `PROJECT_PROGRESS.md` 明确记录“全量迁移与本地设计 QA 已完成，尚未部署，等待用户检查”。

Run: `git add design-qa.md design-qa PROJECT_PROGRESS.md && git commit -m "docs: record full guide local design review"`

- [ ] **Step 6: 停止**

不得执行 `git push`、GitHub Actions、GitHub Pages 或 Sites 发布。向用户提供本地预览地址和关键截图，等待人工检查。

