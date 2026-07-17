import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { App } from "./App.jsx";
import { days } from "./data/days.js";
import {
  foodTips,
  generalWarnings,
  guideMeta,
  preTripOverview,
  staySummary,
  transportComparison,
} from "./data/guide.js";

test("renders the selected complete-guide hero and six-stop route atlas", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: "贵州六日完整旅行手记", level: 1 }),
  ).toBeInTheDocument();
  expect(screen.getByText("黄果树 · 西江苗寨 · 贵阳")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "六日行程路线图", level: 2 })).toBeInTheDocument();
  expect(screen.getAllByTestId("map-stop")).toHaveLength(6);
  expect(screen.getAllByTestId("route-day")).toHaveLength(6);
  expect(screen.getAllByText("龙宫 · 天龙屯堡").length).toBeGreaterThan(0);
  expect(screen.getAllByText("朗德上寨").length).toBeGreaterThan(0);
  expect(screen.queryByText(/小七孔/)).not.toBeInTheDocument();
});

test("provides stable navigation anchors and a working print action", async () => {
  const user = userEvent.setup();
  const print = vi.spyOn(window, "print").mockImplementation(() => {});
  render(<App />);

  expect(screen.getByRole("link", { name: "路线地图" })).toHaveAttribute("href", "#route-map");
  expect(screen.getByRole("link", { name: "行前总览" })).toHaveAttribute("href", "#preparation");
  expect(screen.getByRole("link", { name: "每日行程" })).toHaveAttribute("href", "#itinerary");
  expect(screen.getByRole("link", { name: "交通住宿" })).toHaveAttribute("href", "#transport-stay");
  expect(screen.getByRole("link", { name: "吃喝避坑" })).toHaveAttribute("href", "#food-tips");

  await user.click(screen.getByRole("button", { name: "打印或保存攻略" }));
  expect(print).toHaveBeenCalledOnce();
  print.mockRestore();
});

test("renders every preparation and daily-guide module", () => {
  const { container } = render(<App />);

  expect(screen.getAllByTestId("day-entry")).toHaveLength(6);
  expect(screen.getAllByTestId("schedule-row")).toHaveLength(24);
  expect(screen.getAllByTestId("hotel-row")).toHaveLength(12);
  expect(screen.getAllByTestId("reservation-item")).toHaveLength(5);
  expect(screen.getByText("约 2700–4300")).toBeInTheDocument();
  expect(screen.getAllByText(/12 道拦门酒/).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/夺夺粉/).length).toBeGreaterThan(0);

  const visibleText = container.textContent;
  const expectVisible = (value) => {
    if (value !== undefined && value !== null && String(value).length > 0) {
      expect(visibleText).toContain(String(value));
    }
  };
  for (const day of days) {
    for (const value of [day.title, day.location, day.transit, day.stay, day.hotelNote]) expectVisible(value);
    for (const row of day.schedule) {
      for (const value of Object.values(row)) expectVisible(value);
    }
    for (const section of day.transportSections) {
      expectVisible(section.title);
      for (const detail of section.details) expectVisible(detail);
    }
    for (const hotel of day.hotels) {
      for (const value of Object.values(hotel)) expectVisible(value);
    }
    for (const section of day.foodSections) {
      expectVisible(section.title);
      for (const item of section.items) expectVisible(item);
    }
    for (const tip of day.tips) expectVisible(tip);
  }
  for (const item of [...preTripOverview.clothing, ...preTripOverview.essentials, ...preTripOverview.reservations]) expectVisible(item);
  for (const row of preTripOverview.budget.rows) for (const value of Object.values(row)) expectVisible(value);
  for (const value of [preTripOverview.budget.total, preTripOverview.budget.note]) expectVisible(value);
  for (const row of transportComparison) for (const value of Object.values(row)) expectVisible(value);
  for (const row of staySummary) for (const value of Object.values(row)) expectVisible(value);
  for (const item of foodTips) for (const value of Object.values(item)) expectVisible(value);
  for (const warning of generalWarnings) expectVisible(warning);
  for (const key of ["pace", "sourceComposition", "sourceDisclaimer", "sourceNote"]) expectVisible(guideMeta[key]);
  expect(visibleText).not.toContain("傍晚经凯里南返回贵阳");
  expect(visibleText).not.toContain("文昌阁、电台街");
});

test("renders complete transport, stay, food, and warning summaries", () => {
  render(<App />);

  expect(screen.getAllByTestId("transport-comparison-row")).toHaveLength(6);
  expect(screen.getAllByTestId("stay-summary-row")).toHaveLength(6);
  expect(
    screen.getByText("进大景坐高铁，串小景包个车，苗寨之间拼个车。"),
  ).toBeInTheDocument();
  expect(screen.getByText(/实际票价、班次、房价、预约政策/)).toBeInTheDocument();
});

test("keeps the two relevant official verification sources", () => {
  render(<App />);

  expect(screen.getByRole("link", { name: /黄果树 2026 年实名预约说明/ })).toHaveAttribute(
    "href",
    "https://www.gzastv.cn/ac/b/content_193320.shtml",
  );
  expect(screen.getByRole("link", { name: /西江千户苗寨官方推荐动线/ })).toHaveAttribute(
    "href",
    "https://www.xjqhmz.com/news/detail?id=828296979686727682&type=news-notice",
  );
});
