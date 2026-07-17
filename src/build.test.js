import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vitest";

const appSource = readFileSync(resolve(process.cwd(), "src/App.jsx"), "utf8");
const viteConfigSource = readFileSync(resolve(process.cwd(), "vite.config.mjs"), "utf8");
const indexSource = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
const workerPath = resolve(process.cwd(), "worker/index.js");
const hostingPath = resolve(process.cwd(), ".openai/hosting.json");
const packageLockSource = readFileSync(resolve(process.cwd(), "package-lock.json"), "utf8");
const npmConfigSource = readFileSync(resolve(process.cwd(), ".npmrc"), "utf8");
const pagesWorkflowPath = resolve(
  process.cwd(),
  ".github/workflows/deploy-pages.yml",
);
const legacyItineraryPath = resolve(process.cwd(), "src/data/itinerary.js");
const legacyBridgeAssetPath = resolve(process.cwd(), "public/assets/xiaoqikong-bridge.png");
const efficientImageAssets = [
  "guizhou-route-map.webp",
  "huangguoshu-waterfall.webp",
  "indigo-border.webp",
  "guiyang-evening.webp",
  "indigo-seal.webp",
  "xijiang-village.webp",
  "paper-texture.webp",
];

test("uses relative production paths so dist can open directly from disk", () => {
  expect(viteConfigSource).toContain('base: "./"');
  expect(appSource).toContain("import.meta.env.BASE_URL");
  expect(appSource).not.toMatch(/(?:src:|src=)[{\"']?\/?assets\//);
});

test("identifies the final guide in the browser and print metadata", () => {
  expect(indexSource).toContain('<html lang="zh-CN">');
  expect(indexSource).toContain("<title>贵州六日完整旅行手记｜黔蓝手作旅行簿</title>");
  expect(indexSource).toContain('name="description"');
});

test("does not ship legacy Libo route material", () => {
  expect(existsSync(legacyItineraryPath)).toBe(false);
  expect(existsSync(legacyBridgeAssetPath)).toBe(false);
});

test("ships WebP alternatives and lazy-loads below-the-fold photography", () => {
  const totalBytes = efficientImageAssets.reduce((sum, filename) => {
    const imagePath = resolve(process.cwd(), "public/assets", filename);
    expect(existsSync(imagePath)).toBe(true);
    return sum + statSync(imagePath).size;
  }, 0);
  expect(totalBytes).toBeLessThan(4.5 * 1024 * 1024);

  const routeMapSource = readFileSync(resolve(process.cwd(), "src/components/RouteMap.jsx"), "utf8");
  const dayChapterSource = readFileSync(resolve(process.cwd(), "src/components/DayChapter.jsx"), "utf8");
  expect(appSource).toContain('type="image/webp"');
  expect(routeMapSource).toContain('loading="lazy"');
  expect(dayChapterSource).toContain('loading="lazy"');
});

test("defines runtime image sets so Vite does not rewrite public CSS URLs", () => {
  expect(appSource).toContain('"--paper-texture-image"');
  expect(appSource).toContain('"--indigo-border-image"');
  expect(appSource).toContain('image-set(url("${asset("paper-texture.webp")}")');
  expect(appSource).toContain('image-set(url("${asset("indigo-border.webp")}")');
});

test("packages a Sites-compatible static worker", () => {
  expect(existsSync(workerPath)).toBe(true);
  expect(existsSync(hostingPath)).toBe(true);
  const workerSource = readFileSync(workerPath, "utf8");
  const hostingConfig = JSON.parse(readFileSync(hostingPath, "utf8"));
  expect(viteConfigSource).toContain("staticSites()");
  expect(workerSource).toContain("env.ASSETS.fetch");
  expect(hostingConfig.project_id).toMatch(/^appgprj_/);
});

test("places browser assets in the Sites client directory", () => {
  expect(viteConfigSource).toContain('outDir: "dist/client"');
});

test("uses the supported public npm registry for hosted builds", () => {
  expect(packageLockSource).not.toContain("registry.npmmirror.com");
  expect(packageLockSource).toContain("registry.npmjs.org");
});

test("does not force hosted builds to use a local machine npm cache", () => {
  expect(npmConfigSource).not.toMatch(/^cache=/m);
});

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
