# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable project decisions

- Preserve the original “黔蓝手作旅行簿” design language, and use the user-selected complete-guide map template at `C:/Users/LarryLiang/.codex/generated_images/019f6df4-1123-7b50-bac5-2be44378f5e6/exec-852d6737-bbf6-456d-a6dd-b1cdef73b2da.png` as the source of truth for the next redesign.
- Keep the project as a React + Vite static site with local assets and a production deliverable in `dist/`.
- Replace the old 小七孔 route with the complete-guide route: 贵阳 → 黄果树/安顺 → 龙宫/屯堡 → 贵阳 → 西江 → 朗德 → 贵阳返程; do not add 梵净山.
- Include every hotel, restaurant, price, transport, reservation, budget, and warning item from `D:/workbuddy/project/2026-07-16-16-34-33/贵州6天攻略_完整整合版.md`.
- Add a prominent six-day Guizhou route map between the hero and pre-trip overview; on mobile, pair the map with a readable vertical six-day list.
- Stop after each of the four agreed implementation stages for user review before continuing.
- Update `PROJECT_PROGRESS.md` at the end of every stage with completed work, issues, solutions, reusable ideas, and review status.
- Record every user-communicated task, issue, decision, diagnostic result, resolution, and blocker in `PROJECT_PROGRESS.md` promptly; stage-end summaries are not sufficient on their own.
- Publish a public `guizhou-six-day-guide` repository through GitHub Pages with GitHub Actions as the primary mobile-sharing route; retain Sites version 3 as a fallback.
- Use the Product Design plugin for the remaining webpage design and visual QA work.
