import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vitest";

const appSource = readFileSync(resolve(process.cwd(), "src/App.jsx"), "utf8");
const viteConfigSource = readFileSync(resolve(process.cwd(), "vite.config.mjs"), "utf8");
const indexSource = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
const workerPath = resolve(process.cwd(), "worker/index.js");
const hostingPath = resolve(process.cwd(), ".openai/hosting.json");
const packageLockSource = readFileSync(resolve(process.cwd(), "package-lock.json"), "utf8");

test("uses relative production paths so dist can open directly from disk", () => {
  expect(viteConfigSource).toContain('base: "./"');
  expect(appSource).toContain("import.meta.env.BASE_URL");
  expect(appSource).not.toMatch(/(?:src:|src=)[{\"']?\/?assets\//);
});

test("identifies the final guide in the browser and print metadata", () => {
  expect(indexSource).toContain('<html lang="zh-CN">');
  expect(indexSource).toContain("<title>贵州六日旅行手记｜黔蓝手作旅行簿</title>");
  expect(indexSource).toContain('name="description"');
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
