import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vitest";

const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");

test("defines the stage two travel-journal visual system", () => {
  for (const contract of [
    "--ink: #123f43",
    "var(--paper-texture-image)",
    ".site-header",
    ".hero-collage",
    ".route-overview",
    "@media (min-width: 1000px)",
  ]) {
    expect(css).toContain(contract);
  }
});

test("keeps public image-set URLs out of compiled CSS input", () => {
  expect(css).not.toContain('image-set(url("/assets/');
  expect(css).toContain("var(--indigo-border-image)");
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

test("defines the route atlas and overview ledger visual contracts", () => {
  for (const contract of [
    ".route-atlas",
    ".route-atlas-visual",
    ".route-atlas-map",
    ".route-atlas-stops",
    ".map-stop",
    ".trip-overview",
    ".budget-ledger",
    ".reservation-list",
  ]) {
    expect(css).toContain(contract);
  }
});

test("defines responsive day dossiers and printable summary ledgers", () => {
  for (const contract of [
    ".day-ledger",
    ".schedule-table",
    ".day-detail-grid",
    ".transport-notes",
    ".hotel-ledger",
    ".food-notes",
    ".day-tips",
    ".trip-summaries",
    ".summary-ledger",
    ".warning-strip",
    '.schedule-row > [data-label]::before',
    '.hotel-row > [data-label]::before',
    '.summary-table [role="row"] > [data-label]::before',
    "@media (max-width: 640px)",
  ]) {
    expect(css).toContain(contract);
  }
});

test("aligns HTML labels to raster stops without CSS node drawings", () => {
  for (const coordinate of [
    ".map-stop-1 { left: 49.8%; top: 28%; }",
    ".map-stop-2 { left: 31.9%; top: 51.8%; }",
    ".map-stop-3 { left: 33.5%; top: 69.2%; }",
    ".map-stop-4 { left: 48.6%; top: 85%; }",
    ".map-stop-5 { left: 66%; top: 62.6%; }",
    ".map-stop-6 { left: 70.4%; top: 39.1%; }",
  ]) {
    expect(css).toContain(coordinate);
  }
  expect(css).not.toMatch(/\.map-stop(?:\s+a)?::(?:before|after)/);
  expect(css).toContain(".map-stop-2 {\n  transform: translate(calc(-100% - 16px), -50%);")
});

test("ends with an authoritative four two one overview cascade", () => {
  const contractStart = css.lastIndexOf("/* Final atlas alignment and overview cascade. */");
  expect(contractStart).toBeGreaterThan(-1);

  const finalContract = css.slice(contractStart);
  expect(finalContract).toMatch(/\.trip-overview\s*\{[^}]*repeat\(4, minmax\(0, 1fr\)\)/s);
  expect(finalContract).toMatch(/@media \(max-width: 1100px\)[\s\S]*?\.trip-overview\s*\{[^}]*repeat\(2, minmax\(0, 1fr\)\)/);
  expect(finalContract).toMatch(/@media \(max-width: 640px\)[\s\S]*?\.trip-overview\s*\{[^}]*grid-template-columns: 1fr/);
});

test("aligns the preparation heading with the overview ledger", () => {
  expect(css).toMatch(/\.preparation-section > \.section-heading\s*\{[^}]*width: min\(calc\(100% - 48px\), 1320px\)[^}]*margin-inline: auto/s);
  expect(css).toMatch(/@media \(max-width: 640px\)[\s\S]*?\.preparation-section > \.section-heading\s*\{[^}]*width: calc\(100% - 24px\)/);
  expect(css).toMatch(/@media print[\s\S]*?\.preparation-section > \.section-heading\s*\{[^}]*width: 100%/);
});

test("defines the full-source information architecture contracts", () => {
  for (const contract of [
    ".intercity-ledger",
    ".intercity-options",
    ".intercity-transfers",
    ".budget-round-trip",
    ".day-feature-sections",
    ".feature-section",
    ".feature-steps",
    ".feature-warning",
    ".feature-steps > li",
  ]) {
    expect(css).toContain(contract);
  }

  expect(css).toMatch(/@media \(max-width: 999px\)[\s\S]*?\.intercity-ledger/);
  expect(css).toMatch(/@media \(max-width: 640px\)[\s\S]*?\.feature-steps/);
  expect(css).toMatch(/@media print[\s\S]*?\.day-feature-sections/);
});
