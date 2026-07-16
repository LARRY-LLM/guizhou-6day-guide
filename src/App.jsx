import {
  ArrowRight,
  ArrowSquareOut,
  Backpack,
  Bed,
  CalendarBlank,
  Car,
  CheckCircle,
  Clock,
  CurrencyCny,
  Drop,
  ForkKnife,
  Info,
  ListChecks,
  MapPin,
  Mountains,
  NavigationArrow,
  Printer,
  SunHorizon,
  Train,
  Umbrella,
} from "@phosphor-icons/react";
import { itinerary } from "./data/itinerary.js";

const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

const dayImages = {
  1: asset("guiyang-evening.png"),
  2: asset("huangguoshu-waterfall.png"),
  3: asset("xiaoqikong-bridge.png"),
  4: asset("xijiang-village.png"),
  5: asset("xijiang-village.png"),
  6: asset("guiyang-evening.png"),
};

const routeIcons = {
  1: Train,
  2: Drop,
  3: Mountains,
  4: MapPin,
  5: SunHorizon,
  6: Train,
};

const officialSources = [
  {
    name: "黄果树 2026 年实名预约说明",
    href: "https://www.gzastv.cn/ac/b/content_193320.shtml",
  },
  {
    name: "荔波小七孔景区官网",
    href: "https://www.liboxiaoqikong.com/",
  },
  {
    name: "西江千户苗寨官方推荐动线",
    href: "https://www.xjqhmz.com/news/detail?id=828296979686727682&type=news-notice",
  },
];

export function App() {
  return (
    <>
      <header className="site-header no-print">
        <a className="brand" href="#overview" aria-label="返回行程总览">
          <img src={asset("indigo-seal.png")} alt="" />
          <span><strong>黔蓝手作旅行簿</strong><small>贵州六日经典环线</small></span>
        </a>
        <nav aria-label="页面导航">
          <a href="#overview">总览</a>
          <a href="#itinerary">每日路线</a>
          <a href="#sights">景点</a>
          <a href="#transport">交通住宿</a>
          <a href="#checklist">行前准备</a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">7–8 月 · 贵阳进出 · 6 天 5 晚</p>
            <h1 id="page-title">贵州六日<br />旅行手记</h1>
            <p className="hero-subtitle">高铁往返 · 四日经典环线</p>
            <p className="hero-intro">山水为线，织就这本属于你的贵州夏日手记。</p>
            <div className="hero-actions no-print">
              <a className="button button-primary" href="#itinerary">
                展开这趟旅程 <ArrowRight aria-hidden="true" />
              </a>
              <button className="button button-secondary" type="button" onClick={() => window.print()}>
                <Printer aria-hidden="true" /> 打印或保存攻略
              </button>
            </div>
            <p className="today-note"><CalendarBlank aria-hidden="true" /> 攻略核验：2026-07-16</p>
          </div>

          <div className="hero-collage" aria-label="黄果树、小七孔与西江苗寨风景拼贴">
            <figure className="hero-photo hero-photo-waterfall">
              <img src={asset("huangguoshu-waterfall.png")} alt="丰水期黄果树瀑布" />
            </figure>
            <figure className="hero-photo hero-photo-village">
              <img src={asset("xijiang-village.png")} alt="入夜后的西江千户苗寨" />
            </figure>
            <figure className="hero-photo hero-photo-bridge">
              <img src={asset("xiaoqikong-bridge.png")} alt="荔波小七孔古桥与碧绿河水" />
            </figure>
            <img className="indigo-swatch" src={asset("indigo-border.png")} alt="" />
          </div>
        </section>

        <section className="route-overview" id="overview" aria-labelledby="route-title">
          <div className="section-heading section-heading-compact">
            <p className="eyebrow">ROUTE OVERVIEW</p>
            <h2 id="route-title">行程速览</h2>
            <p>贵阳为中转枢纽，三大名景连起来，不走重复路。</p>
          </div>
          <ol className="route-strip">
            {itinerary.map((item) => {
              const RouteIcon = routeIcons[item.day];

              return (
                <li key={item.day} data-testid="route-day">
                  <a href={`#day-${item.day}`}>
                    <span>D{item.day}</span>
                    <RouteIcon className="route-icon" data-testid="route-icon" aria-hidden="true" />
                    <strong>{item.title}</strong>
                    <small>{item.location}</small>
                  </a>
                </li>
              );
            })}
          </ol>
          <p className="route-note"><NavigationArrow aria-hidden="true" /> 贵阳为中转枢纽，不走回头路</p>
        </section>

        <section className="itinerary" id="itinerary" aria-labelledby="itinerary-title">
          <div className="section-heading">
            <p className="eyebrow">DAY BY DAY</p>
            <h2 id="itinerary-title">一天一页，慢慢展开</h2>
            <p>车次和景区开放时间会变，时间段用于安排节奏，出发前请再次核验。</p>
          </div>

          <div className="day-list">
            {itinerary.map((item) => (
              <article className={`day-entry day-${item.day}`} id={`day-${item.day}`} key={item.day} data-testid="day-entry">
                <span className="mobile-day-line" aria-hidden="true" />
                <header className="day-header">
                  <div className="day-number">D{item.day}</div>
                  <div>
                    <p className="day-location"><MapPin aria-hidden="true" /> {item.location}</p>
                    <h2>{item.title}</h2>
                  </div>
                  <div className="day-meta">
                    <span><Train aria-hidden="true" /> {item.transit}</span>
                    <span><Bed aria-hidden="true" /> 住：{item.stay}</span>
                  </div>
                </header>

                <div className="day-body">
                  <figure className="day-photo">
                    <img src={dayImages[item.day]} alt={`${item.title}行程风景`} loading="lazy" />
                    <figcaption>{item.highlights.join(" · ")}</figcaption>
                  </figure>
                  <div className="day-schedule">
                    {item.periods.map((period) => (
                      <div className="schedule-row" key={`${item.day}-${period.label}`} data-testid="schedule-row">
                        <div className="schedule-time"><Clock aria-hidden="true" /><strong>{period.time}</strong><span>{period.label}</span></div>
                        <p>{period.detail}</p>
                      </div>
                    ))}
                  </div>
                  <aside className="margin-note" aria-label={`D${item.day} 手记边注`}>
                    <strong>手记边注</strong>
                    <ul>{item.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sights" id="sights" aria-labelledby="sights-title">
          <div className="section-heading">
            <p className="eyebrow">SIGNATURE PLACES</p>
            <h2 id="sights-title">三大名景，三种贵州</h2>
          </div>
          <div className="sight-grid">
            <article>
              <img src={asset("huangguoshu-waterfall.png")} alt="黄果树大瀑布水雾" loading="lazy" />
              <p className="sight-index">01 · 安顺</p><h3>黄果树瀑布</h3>
              <p>丰水期最有气势。大瀑布、水帘洞、天星桥和陡坡塘组成完整的“玩瀑”体验。</p>
              <span><Umbrella aria-hidden="true" /> 防水 + 防滑</span>
            </article>
            <article>
              <img src={asset("xiaoqikong-bridge.png")} alt="小七孔古桥与碧绿水面" loading="lazy" />
              <p className="sight-index">02 · 荔波</p><h3>荔波小七孔</h3>
              <p>喀斯特山水最清秀的一面。从西门顺势而下，卧龙潭到古桥一路层层展开。</p>
              <span><Drop aria-hidden="true" /> 西门进更省力</span>
            </article>
            <article>
              <img src={asset("xijiang-village.png")} alt="西江千户苗寨夜景" loading="lazy" />
              <p className="sight-index">03 · 雷山</p><h3>西江千户苗寨</h3>
              <p>下午入寨，日落前到观景台。灯火亮起后再回风雨桥，夜色最有层次。</p>
              <span><SunHorizon aria-hidden="true" /> 日落前抵达</span>
            </article>
          </div>
        </section>

        <section className="practical" id="transport" aria-labelledby="transport-title">
          <div className="section-heading">
            <p className="eyebrow">MOVE & STAY</p>
            <h2 id="transport-title">交通与住宿，照着订就好</h2>
          </div>
          <div className="practical-grid">
            <article data-testid="practical-card"><Train aria-hidden="true" /><h3>大交通</h3><p>往返贵阳北站。D3 用贵阳北—荔波站高铁，D5 用凯里南—贵阳北高铁衔接。</p></article>
            <article data-testid="practical-card"><Car aria-hidden="true" /><h3>省内接驳</h3><p>黄果树可选高铁转专线或包车；荔波到西江建议拼车/包车，减少多次换乘。</p></article>
            <article data-testid="practical-card"><Bed aria-hidden="true" /><h3>住哪里</h3><p>贵阳选北站或喷水池；荔波选古镇/东门；西江选一号风雨桥附近，少爬坡。</p></article>
            <article data-testid="practical-card"><Backpack aria-hidden="true" /><h3>行李策略</h3><p>苗寨石板路与台阶多，D4 只带一晚轻便行李，大箱寄存在贵阳酒店。</p></article>
          </div>

          <div className="budget-food">
            <article>
              <CurrencyCny aria-hidden="true" />
              <div><p className="eyebrow">参考预算 / 人</p><h3>¥2,500–4,200</h3><p>按双人拼房估算，不含往返贵州的大交通；暑期周末住宿浮动较大。</p></div>
            </article>
            <article>
              <ForkKnife aria-hidden="true" />
              <div><p className="eyebrow">一路吃什么</p><h3>酸汤鱼 · 丝娃娃 · 烙锅</h3><p>再留一顿给肠旺面、豆腐圆子和苗寨长桌宴；点酸辣前先确认辣度。</p></div>
            </article>
          </div>
        </section>

        <section className="checklist" id="checklist" aria-labelledby="checklist-title">
          <div className="section-heading">
            <p className="eyebrow">BEFORE YOU GO</p>
            <h2 id="checklist-title">出发前，逐项打勾</h2>
          </div>
          <div className="checklist-grid">
            <article data-testid="checklist-card"><ListChecks aria-hidden="true" /><h3>预约顺序</h3><ul><li>先锁定往返高铁与住宿</li><li>黄果树门票及水帘洞时段</li><li>小七孔、西江门票与接驳</li></ul></article>
            <article data-testid="checklist-card"><Umbrella aria-hidden="true" /><h3>雨季装备</h3><ul><li>轻薄雨衣与折叠伞</li><li>防滑透气鞋、备用袜</li><li>手机防水袋与充电宝</li></ul></article>
            <article data-testid="checklist-card"><CheckCircle aria-hidden="true" /><h3>每天确认</h3><ul><li>天气与临时开放公告</li><li>次日车次、接送地点</li><li>身份证与随身药品</li></ul></article>
          </div>
          <div className="weather-plan">
            <Info aria-hidden="true" />
            <p><strong>雨天替代：</strong>小雨照常游山水；强降雨或景区临时关闭时，优先改为贵阳市内的贵州省博物馆、甲秀楼周边与美食路线，并保留退改空间。</p>
          </div>
        </section>

        <section className="sources" aria-labelledby="sources-title">
          <Mountains aria-hidden="true" />
          <div><h2 id="sources-title">出发前最后核验</h2><p>开放时间、票价、车次与临时管控以出发日官方公告为准。</p></div>
          <ul>
            {officialSources.map((source) => (
              <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.name}<ArrowSquareOut aria-hidden="true" /></a></li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <img src={asset("indigo-border.png")} alt="" />
        <p>山水经纬 · 苗乡人文 · 黔蓝旅行手记</p>
      </footer>
    </>
  );
}
