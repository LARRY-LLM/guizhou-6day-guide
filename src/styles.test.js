import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vitest";

const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");

test("defines the stage two travel-journal visual system", () => {
  for (const contract of [
    "--ink: #123f43",
    'url("/assets/paper-texture.png")',
    ".site-header",
    ".hero-collage",
    ".route-overview",
    "@media (min-width: 1000px)",
  ]) {
    expect(css).toContain(contract);
  }
});

test("defines the complete guide and mobile layout contracts", () => {
  for (const contract of [
    ".day-entry:nth-child(even)",
    ".schedule-row::before",
    ".sight-grid",
    ".budget-food",
    "@media (max-width: 640px)",
    ".mobile-day-line",
  ]) {
    expect(css).toContain(contract);
  }
});

test("defines an A4 print contract for saving the guide as PDF", () => {
  for (const contract of [
    "@page",
    "size: A4 portrait",
    "@media print",
    ".no-print",
    "break-inside: avoid",
    "print-color-adjust: exact",
  ]) {
    expect(css).toContain(contract);
  }
});
