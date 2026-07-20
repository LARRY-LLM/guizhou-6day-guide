# 阶段 2 设计 QA

## 对照基准

- 唯一视觉基准：`C:/Users/LarryLiang/.codex/generated_images/019f687a-b9ca-7200-a804-38d6d67e241d/exec-c1ee675c-c1d7-4b33-8b84-718d14d93bec.png`
- 实现截图：`design-qa/stage2-1024-final.png`、`design-qa/stage2-1440-final.png`
- 整体并排对照：`design-qa/stage2-comparison-final.png`
- 路线局部对照：`design-qa/stage2-route-comparison.png`
- 检查状态：页面顶部、首屏拼贴、D1–D6 路线速览。
- 检查视口：1024 × 1000（与参考稿同宽）及 1440 × 1100（目标桌面端）。

## 修复记录

1. P1：初版首屏纵向位置偏低，路线卡未能在参考视口内完整露出。将桌面首屏改为顶部对齐并收紧文字区上边距后，首屏底部为 734.7px，路线卡从 748.7px 开始。
2. P2：靛蓝纹样使用负右边距造成约 24px 横向溢出。将纹样限制在拼贴容器内后，1024px 和 1440px 下 `scrollWidth` 均等于 `clientWidth`。
3. P2：路线节点只有文字，弱于参考稿中的手绘地标。复用 Phosphor 图标，为 D1–D6 增加火车、水滴、山景、定位和日落节点；测试确认共 6 个图标。

## 最终核验

- 信息层级：靛蓝手写感标题、朱红主按钮、米白纸张和摄影拼贴与参考稿方向一致。
- 构图：左侧标题/操作区与右侧三图拼贴保持相同视觉重心；路线速览紧接首屏。
- 路线：由于本项目为 6 日行程，路线条按用户要求保留 D1–D6，而不是照搬参考稿的 5 个节点。
- 交互：“展开这趟旅程”唯一匹配并成功进入 `#itinerary`。
- 稳定性：1024px、1440px 均无横向溢出；浏览器控制台无 warning/error。
- 测试：Vitest 7/7 通过。

## 可接受的 P3 差异

- 参考稿使用撕纸边缘、红色织物和植物贴纸；当前本地素材没有完全对应的资产，本阶段采用旋转相纸边框与现有靛蓝织物，避免用 CSS 绘图伪造真实素材。
- 顶部增加了用户计划要求的页面导航；次按钮使用“打印或保存攻略”，对应最终交付需求。

stage 2 final result: passed

# 阶段 3 设计 QA

## 对照基准与证据

- 视觉真值仍为阶段 2 的“黔蓝手作旅行簿”参考稿，不新增第二套视觉语言。
- 1024px 同视口对照：`design-qa/stage3-reference-comparison.png`。
- 1440px 桌面截图：`stage3-itinerary-1440.png`、`stage3-sights-1440.png`、`stage3-practical-1440.png`。
- 390 × 844 手机截图总表：`design-qa/stage3-mobile-contact-sheet.png`。
- 手机关键状态：首屏、路线速览、D1 日程、三大景点、交通住宿、行前清单。

## 视觉判断

- 完整日程沿用参考稿的米白纸张、靛蓝手写标题、朱红节点、摄影相纸和手记边注；没有引入新的圆角卡片或渐变风格。
- 桌面日程使用三栏纸页：照片、时间轴和边注。D1–D6 视觉结构一致，同时通过轻微错落避免机械重复。
- 三大景点使用三联相纸卡；交通住宿、预算美食和行前清单使用同一纸张与图标体系，层级连续。
- 手机端转为单列时间轴，路线节点、日程、景点、实用信息及清单均无文字或图片裁切。

## 问题与修复

1. P2：初次捕获长页面锚点时，平滑滚动尚未结束，截图落在目标区块之前。将截图等待时间延长并重新捕获后，所有证据均对应正确区块。
2. P2：首次桌面检查时仅 12/15 张图片进入懒加载范围。逐段访问关键锚点后复核，15/15 图片均完成加载且自然宽度有效。
3. P2：390px 需要同时容纳五个顶部导航项。导航保持单行、允许容器内部横向滚动；实际 390px 截图中五项均可见，页面本身没有横向溢出。

## 最终核验

- 1440px：`clientWidth = scrollWidth = 1425`。
- 390px 视口：浏览器内容宽 375px，`clientWidth = scrollWidth = 375`，溢出元素扫描为空。
- 内容结构：6 个日程页、22 个时间段、4 个交通住宿卡、3 个行前清单卡。
- 图片：15/15 加载完成。
- 交互：手机端“行前准备”唯一匹配并成功进入 `#checklist`。
- 控制台：无 warning/error。
- 自动化测试：Vitest 9/9 通过。
- 未执行打印预览、生产构建或生成 `dist/`，保持阶段 4 边界。

final result: passed

# 源文档全量迁移设计 QA（2026-07-20）

## 视觉基准与检查证据

- source visual truth path：`C:/Users/LarryLiang/.codex/generated_images/019f6df4-1123-7b50-bac5-2be44378f5e6/exec-852d6737-bbf6-456d-a6dd-b1cdef73b2da.png`
- 桌面首屏：`design-qa/design-qa-desktop-top.png`
- 桌面路线图：`design-qa/design-qa-route-overview-focused.png`
- 平板信息总览：`design-qa/design-qa-tablet-1024.png`
- 手机首屏：`design-qa/design-qa-mobile-top-390.png`
- 手机每日行程：`design-qa/design-qa-mobile-itinerary.png`
- 检查视口：1440 × 900、1024 × 768、390 × 844。
- 已将视觉基准与 1440px 实现首屏放在同一次图像对照中检查；构图、纸张肌理、黔蓝/朱红色系、摄影拼贴和书写标题语言连续。

## 信息架构结果

- 页面顺序固定为：六日路线地图 → 行前总览（城际交通、衣物、通用避坑、预算、预约）→ D1–D6 完整日程 → 全程交通与住宿 → 吃喝与全程避坑 → 来源与时效说明。
- D2、D4、D6 的长篇玩法使用独立步骤章，避免把关键路线压进小字卡片；D1–D6 仍保留统一的时间、安排、耗时、提示、交通、住宿、饮食和避坑结构。
- 源文档的 29 个时间表行、12 个具名酒店方案、6 条预约、6 段交通费用、5 条吃货提示和 7 条全程避坑均进入页面数据层并由组件实际消费。
- 独立只读 subagent 分两段复核 D1–D3 与 D4–D6/全程汇总，结论均为“无明确遗漏”。

## Findings 与修复

1. `[P2]` 首轮数据迁移把 D4 的 17:00 入寨与 19:30 晚餐合并成一行，虽保留文字但丢失原稿的两个独立时间节点。已拆回两行，并把日程覆盖断言从 28 更新为 29。
2. `[P2]` 交通口诀沿用了旧版“苗寨之间拼个车”。已按唯一源文档改为“进大景坐高铁，串小景包个车，古镇之间拼个车。”并增加渲染断言。
3. `[P2]` 全量内容加入后需要更清晰的阅读层级。已增加城际交通台账、往返预算补充、重点玩法步骤章与长文告警样式，同时维持原有黔蓝手作旅行簿视觉语言。

## 响应式、运行与构建核验

- 1440px：`scrollWidth 1425 === clientWidth 1425`，无横向溢出；首屏左右构图与路线图标签清晰。
- 1024px：`scrollWidth 1009 === clientWidth 1009`，两列信息台账可读。
- 390px：`scrollWidth 375 === clientWidth 375`，导航可横向容纳，日程转为单列时间轴，图片与正文没有裁切。
- 浏览器控制台 warning/error 列表为空；路线图图片加载完成；导航“每日行程”成功定位 `#itinerary`。
- Vitest 31/31 通过；Vite 生产构建成功；`git diff --check` 无空白错误。

## 发布边界

- 本轮只完成本地网页排版与构建核验；没有 push，没有触发 GitHub Actions，也没有更新 GitHub Pages 或 Sites。
- 当前停在用户人工检查节点，收到明确确认后才进入部署阶段。

final result: passed

# 完整攻略重构最终设计 QA（2026-07-17）

## 对照基准与实现证据

- source visual truth path：`C:/Users/LarryLiang/.codex/generated_images/019f6df4-1123-7b50-bac5-2be44378f5e6/exec-852d6737-bbf6-456d-a6dd-b1cdef73b2da.png`
- 目标状态：模板 2 的“黔蓝手作旅行簿”路线地图、纸张台账与摄影碎片方向；实现增加完整 6 天正文，因此以同一“路线地图”区域做归一化比较，不把长页内容密度误判为视觉漂移。
- browser-rendered implementation screenshot：`design-qa/desktop-route-focused-final.webp`
- full-view combined comparison evidence：`design-qa/comparison-route-map-final-pass.webp`
- focused region evidence：`design-qa/desktop-route-focused-final.webp`、`design-qa/mobile-390x844-route-map.webp`、`design-qa/mobile-390x844-preparation.webp`、`design-qa/mobile-390x844-day3.webp`
- 视口：1440 × 900、1024 × 900、390 × 844。
- 状态：首屏、路线地图、行前总览、D3 行程卡、桌面/平板/手机响应式。

## Findings 与修复历史

1. `[P2]` 行前总览标题未与四列台账对齐。初始代码遗漏 `.preparation-section > .section-heading` 容器约束，桌面与手机标题贴左。修复为桌面 `width: min(calc(100% - 48px), 1320px)`、手机 `calc(100% - 24px)`、打印 `100%`。修复后 390px 标题与台账左缘均为 12px，1440px 均为 52.33px；证据：`mobile-390x844-preparation.webp`。
2. `[P2]` 桌面路线图 D2 / D3 标签在统一向右展开时重叠。将标签宽度约束为 145–170px，并让 D2 向节点左侧展开；同一 1440 × 900 视口复查计算 `overlaps=[]`。修复后证据：`desktop-route-focused-final.webp`、`comparison-route-map-final-pass.webp`。
3. `[P3]` 手机路线地图的节点交通清单后仍有六日速览，信息略重复。两者分别承担“详细交通”与“每日概览”，没有布局或可用性问题，保留为后续可选精简项。

## 必查视觉面

- Fonts and typography：标题使用楷体书写感，正文采用可读的中文衬线/系统字体；桌面、平板与手机均无裁切，D3 长标题和交通文字正常换行。
- Spacing and layout rhythm：首屏左右构图、路线图纸页、四列/两列/单列总览保持连续节奏；1440、1024、390 三档均无横向溢出。
- Colors and visual tokens：米白纸张、靛蓝主色、朱红强调、低饱和墨绿色正文与参考模板一致，按钮和焦点态对比明确。
- Image quality and asset fidelity：路线图源文件为 2048 × 1152 真实生成位图，页面优先交付 1600 × 900 WebP 并保留原 PNG 回退；照片使用黄果树、西江、贵阳本地素材；没有用 CSS/手写 SVG/占位形状伪造地图、照片或核心装饰。
- Copy and content：页面已呈现原稿的 6 天行程、交通、价格、住宿、餐饮、预约、预算、避坑、来源与时效说明；D3 起点和 D5 住宿备选均与固定路线一致。

## 响应式、交互与可访问性

- 1440 × 900：路线图 6 个 HTML 标签对应 6 个 raster 圆点，无相交；`body.scrollWidth === documentElement.clientWidth`。
- 1024 × 900：行前总览为两列，标题与台账左缘均为 24px，无横向溢出。
- 390 × 844：行前总览为单列；路线节点改为静态清单；日程与汇总表通过 `data-label` 卡片化，D3 行程可读，无横向溢出。
- Primary interactions tested：顶部“路线地图”“行前总览”锚点、路线图 D3 节点均在真实浏览器中成功定位；“打印或保存攻略”由交互测试验证会调用 `window.print()`。
- Console errors checked：真实浏览器 warning/error 列表为空。
- 自动化：Vitest 29/29 通过；Vite 生产构建无警告；生产源码与产物旧路线扫描为空。

## Open Questions

- 无 P0/P1/P2 阻断项。是否在后续版本合并手机端两套 D1–D6 信息，由用户体验偏好决定。

## Implementation Checklist

- [x] 完整内容替换与来源说明
- [x] 六日地图与六节点标注
- [x] 桌面/平板/手机响应式
- [x] 表格移动端标签与打印样式
- [x] 真实浏览器、控制台与生产构建验证
- [x] 参考模板与实现同屏对照

final result: passed
