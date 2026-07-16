# GitHub Pages 手机端公开访问设计

## 背景与根因

Sites 版本 3 已解决静态资源目录错误，桌面端公网根页面、HTML、JS、CSS 和 15 张图片均能正常加载。但用户在手机浏览器访问同一 `chatgpt.site` 地址时收到 Cloudflare “Attention Required” 拦截页。

使用 iPhone Safari、Android Chrome 和微信 Android User-Agent 复测时，服务器均返回 HTTP 200；Sites 项目也保持公开、启用且版本 3 生效。因此当前问题不在 React 页面、Vite 构建、资源路径或 Sites 项目权限，而是 Cloudflare 托管边缘根据手机网络出口 IP 或请求特征触发了站点所有者无法调整的安全规则。

## 目标与成功标准

- 为同一份静态攻略提供不经过 `chatgpt.site` Cloudflare 托管规则的公开地址。
- 使用 GitHub Pages 和 GitHub Actions 自动构建，避免手工上传 `dist/`。
- 手机浏览器能直接打开首页，不再出现 Cloudflare 拦截页。
- 页面正文、样式、脚本和 15 张本地图片均正常加载，桌面端不回归。
- 保留现有 Sites 地址作为备用入口，不删除当前部署。

## 已选方案

创建公开 GitHub 仓库 `guizhou-six-day-guide`，推送当前项目源码，并启用 GitHub Pages。用户已明确批准公开仓库及此发布方案。

发布链路如下：

`main` 分支源码 → GitHub Actions 执行 `npm ci` 和 `npm run build` → 上传 `dist/client/` → GitHub Pages 发布

公开地址由 GitHub 根据实际账户名和仓库名 `guizhou-six-day-guide` 自动生成，并在首次成功部署后写回项目进度。项目当前使用相对资源路径，适合部署在仓库子路径下；实施时仍需通过真实构建和浏览器请求验证这一点。

## 实现边界

### GitHub 仓库

- 仓库设为公开，仅包含该旅行攻略项目现有源码、配置和本地图片。
- 不上传密码、令牌、浏览器资料或其他工作空间内容。
- 默认分支使用 `main`；若 GitHub Desktop 创建远端时保留当前本地分支名称，则在发布前统一为 `main`。

### GitHub Actions

- 新增一个 Pages 工作流，在推送到 `main` 和手动触发时运行。
- 使用 Node.js 安装锁定依赖并执行现有生产构建。
- 上传目录固定为 `dist/client/`，与已验证的 Vite 输出契约一致。
- 工作流只申请 `contents: read`、`pages: write` 和 `id-token: write` 所需权限。
- 不引入部署密钥或第三方服务。

### 托管与回退

- GitHub Pages 成为手机分享的主要地址。
- Sites 版本 3 保留为备用地址和既有发布记录。
- 若新的 Actions 构建失败，GitHub Pages 保留上一次成功版本，不影响 Sites 备用入口。

## 验证方案

1. 本地执行现有 15 项测试和生产构建，确认 `dist/client/` 完整。
2. 确认 GitHub Actions Pages 工作流成功完成。
3. 检查 Pages 首页、HTML 引用的 JS/CSS 和代表性图片均返回 HTTP 200。
4. 在真实桌面浏览器检查 React 正文渲染、15/15 图片、横向溢出和控制台错误。
5. 请用户在此前被拦截的同一手机浏览器及网络下打开 GitHub Pages 地址，确认不再出现 Cloudflare 拦截页。

## 项目记录要求

从本次迁移起，用户沟通过的每项任务、问题、决定、诊断证据、处理结果和阻塞都应及时写入 `PROJECT_PROGRESS.md`，不再只在阶段结束时汇总。
