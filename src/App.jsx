import {
  ArrowRight,
  ArrowSquareOut,
  CalendarBlank,
  Mountains,
  Printer,
} from "@phosphor-icons/react";
import { DayChapter } from "./components/DayChapter.jsx";
import { RouteMap } from "./components/RouteMap.jsx";
import { TripOverview } from "./components/TripOverview.jsx";
import { TripSummaries } from "./components/TripSummaries.jsx";
import {
  foodTips,
  generalWarnings,
  guideMeta,
  preTripOverview,
  staySummary,
  transportComparison,
} from "./data/guide.js";
import { days } from "./data/days.js";

const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

const imageAsset = (name) => ({
  webp: asset(`${name}.webp`),
  png: asset(`${name}.png`),
});

const assetImageSets = {
  "--paper-texture-image": `image-set(url("${asset("paper-texture.webp")}") type("image/webp"), url("${asset("paper-texture.png")}") type("image/png"))`,
  "--indigo-border-image": `image-set(url("${asset("indigo-border.webp")}") type("image/webp"), url("${asset("indigo-border.png")}") type("image/png"))`,
};

function Picture({ image, alt, className, eager = false, priority = false }) {
  return (
    <picture className={className}>
      <source srcSet={image.webp} type="image/webp" />
      <img
        src={image.png}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}

const dayImages = {
  1: imageAsset("guiyang-evening"),
  2: imageAsset("huangguoshu-waterfall"),
  3: null,
  4: imageAsset("xijiang-village"),
  5: imageAsset("xijiang-village"),
  6: imageAsset("guiyang-evening"),
};

const officialSources = [
  {
    name: "黄果树 2026 年实名预约说明",
    href: "https://www.gzastv.cn/ac/b/content_193320.shtml",
  },
  {
    name: "西江千户苗寨官方推荐动线",
    href: "https://www.xjqhmz.com/news/detail?id=828296979686727682&type=news-notice",
  },
];

export function App() {
  return (
    <div className="app-shell" style={assetImageSets}>
      <header className="site-header no-print">
        <a className="brand" href="#route-map" aria-label="返回路线地图">
          <Picture image={imageAsset("indigo-seal")} alt="" eager />
          <span><strong>黔蓝手作旅行簿</strong><small>贵州六日完整环线</small></span>
        </a>
        <nav aria-label="页面导航">
          <a href="#route-map">路线地图</a>
          <a href="#preparation">行前总览</a>
          <a href="#itinerary">每日行程</a>
          <a href="#transport-stay">交通住宿</a>
          <a href="#food-tips">吃喝避坑</a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">{guideMeta.season} · 贵阳进出 · {guideMeta.duration}</p>
            <h1 id="page-title">贵州六日<br />完整旅行手记</h1>
            <p className="hero-subtitle">{guideMeta.subtitle}</p>
          <p className="hero-intro">两大名景作主线，贵阳作枢纽，沿途串起安顺山水与黔东南苗乡。</p>
          <p className="hero-pace">{guideMeta.pace}</p>
            <div className="hero-actions no-print">
              <a className="button button-primary" href="#route-map">展开六日地图 <ArrowRight aria-hidden="true" /></a>
              <button className="button button-secondary" type="button" onClick={() => window.print()}><Printer aria-hidden="true" /> 打印或保存攻略</button>
            </div>
            <p className="today-note"><CalendarBlank aria-hidden="true" /> 攻略核验：{guideMeta.verifiedAt}</p>
          </div>

          <div className="hero-collage" aria-label="黄果树、西江苗寨与贵阳风景拼贴">
            <figure className="hero-photo hero-photo-waterfall"><Picture image={imageAsset("huangguoshu-waterfall")} alt="丰水期黄果树瀑布" eager priority /></figure>
            <figure className="hero-photo hero-photo-village"><Picture image={imageAsset("xijiang-village")} alt="入夜后的西江千户苗寨" eager /></figure>
            <figure className="hero-photo hero-photo-bridge"><Picture image={imageAsset("guiyang-evening")} alt="贵阳城市夜景" eager /></figure>
            <Picture className="indigo-swatch" image={imageAsset("indigo-border")} alt="" eager />
          </div>
        </section>

        <RouteMap
          days={days}
          mapImage={imageAsset("guizhou-route-map")}
          waterfallImage={imageAsset("huangguoshu-waterfall")}
          villageImage={imageAsset("xijiang-village")}
        />
        <TripOverview overview={preTripOverview} />

        <section className="itinerary" id="itinerary" aria-labelledby="itinerary-title">
          <header className="section-heading">
            <p className="eyebrow">DAY BY DAY</p>
            <h2 id="itinerary-title">一天一页，完整展开</h2>
            <p>时间用于安排节奏；票价、班次、房价与营业时间以出发日实时信息为准。</p>
          </header>
          <div className="day-list">
            {days.map((day) => <DayChapter day={day} image={dayImages[day.day]} key={day.day} />)}
          </div>
        </section>

        <TripSummaries transport={transportComparison} stays={staySummary} foodTips={foodTips} warnings={generalWarnings} />

        <section className="sources" aria-labelledby="sources-title">
          <Mountains aria-hidden="true" />
          <div>
            <h2 id="sources-title">出发前最后核验</h2>
            <p>{guideMeta.sourceComposition}</p>
            <p>{guideMeta.sourceDisclaimer}</p>
            <p>{guideMeta.sourceNote}</p>
          </div>
          <ul>{officialSources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.name}<ArrowSquareOut aria-hidden="true" /></a></li>)}</ul>
        </section>
      </main>

      <footer>
        <Picture image={imageAsset("indigo-border")} alt="" />
        <p>山水经纬 · 苗乡人文 · 黔蓝旅行手记</p>
      </footer>
    </div>
  );
}
