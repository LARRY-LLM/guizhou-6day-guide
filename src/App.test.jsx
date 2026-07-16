import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { App } from "./App.jsx";

test("renders the selected travel-journal hero copy", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: "贵州六日旅行手记", level: 1 }),
  ).toBeInTheDocument();
  expect(screen.getByText("高铁往返 · 四日经典环线")).toBeInTheDocument();
});

test("renders all six days and the three signature sights", () => {
  render(<App />);

  expect(screen.getAllByTestId("route-day")).toHaveLength(6);
  expect(screen.getAllByTestId("route-icon")).toHaveLength(6);
  expect(screen.getByRole("heading", { name: /黄果树瀑布/, level: 3 })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /荔波小七孔/, level: 3 })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /西江千户苗寨/, level: 3 })).toBeInTheDocument();
});

test("provides stable navigation anchors and a working print action", async () => {
  const user = userEvent.setup();
  const print = vi.spyOn(window, "print").mockImplementation(() => {});
  render(<App />);

  expect(screen.getByRole("link", { name: "每日路线" })).toHaveAttribute("href", "#itinerary");
  expect(screen.getByRole("link", { name: "交通住宿" })).toHaveAttribute("href", "#transport");
  expect(screen.getByRole("link", { name: "行前准备" })).toHaveAttribute("href", "#checklist");

  await user.click(screen.getByRole("button", { name: "打印或保存攻略" }));
  expect(print).toHaveBeenCalledOnce();
});

test("links to the three official trip-verification sources", () => {
  render(<App />);

  expect(screen.getByRole("link", { name: /黄果树 2026 年实名预约说明/ })).toHaveAttribute(
    "href",
    "https://www.gzastv.cn/ac/b/content_193320.shtml",
  );
  expect(screen.getByRole("link", { name: /荔波小七孔景区官网/ })).toHaveAttribute(
    "href",
    "https://www.liboxiaoqikong.com/",
  );
  expect(screen.getByRole("link", { name: /西江千户苗寨官方推荐动线/ })).toHaveAttribute(
    "href",
    "https://www.xjqhmz.com/news/detail?id=828296979686727682&type=news-notice",
  );
});

test("keeps day five in Xijiang until the evening return to Guiyang", () => {
  render(<App />);

  expect(
    screen.getByText("傍晚经凯里南返回贵阳，晚上抵达酒店休息。"),
  ).toBeInTheDocument();
});

test("uses day six morning for a compact Guiyang city walk", () => {
  render(<App />);

  expect(screen.getByText(/文昌阁、电台街/)).toBeInTheDocument();
  expect(screen.getByText(/下午乘高铁返程/)).toBeInTheDocument();
});

test("renders the complete stage three guide content", () => {
  render(<App />);

  expect(screen.getAllByTestId("day-entry")).toHaveLength(6);
  expect(screen.getAllByTestId("schedule-row")).toHaveLength(22);
  expect(screen.getAllByTestId("practical-card")).toHaveLength(4);
  expect(screen.getAllByTestId("checklist-card")).toHaveLength(3);
  expect(screen.getByText("¥2,500–4,200")).toBeInTheDocument();
  expect(screen.getByText(/强降雨或景区临时关闭/)).toBeInTheDocument();
});
