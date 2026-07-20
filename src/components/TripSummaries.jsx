import { Bed, Bus, ForkKnife, Warning } from "@phosphor-icons/react";

export function TripSummaries({ transport, stays, foodTips, warnings }) {
  return (
    <div className="trip-summaries">
      <section id="transport-stay" aria-labelledby="transport-stay-title">
        <header className="section-heading">
          <p className="eyebrow">MOVE & STAY</p>
          <h2 id="transport-stay-title">全程交通与住宿</h2>
        </header>

        <div className="summary-ledger">
          <article>
            <Bus aria-hidden="true" />
            <h3>交通费用对比</h3>
            <div className="summary-table transport-summary-table" role="table" aria-label="全程交通费用对比">
              <div className="summary-row summary-header" role="row">
                <div role="columnheader">路段</div>
                <div role="columnheader">公共交通人均</div>
                <div role="columnheader">包车整车</div>
                <div role="columnheader">建议</div>
              </div>
              {transport.map((row) => (
                <div data-testid="transport-comparison-row" key={row.segment} role="row">
                  <strong data-label="路段" role="rowheader">{row.segment}</strong><span data-label="公共交通人均" role="cell">{row.publicCost}</span><span data-label="包车整车" role="cell">{row.charterCost}</span><span data-label="建议" role="cell">{row.advice}</span>
                </div>
              ))}
            </div>
            <p className="route-aphorism">进大景坐高铁，串小景包个车，古镇之间拼个车。</p>
          </article>

          <article>
            <Bed aria-hidden="true" />
            <h3>住宿速览</h3>
            <div className="summary-table stay-summary-table" role="table" aria-label="全程住宿速览">
              <div className="summary-row summary-header" role="row">
                <div role="columnheader">晚</div>
                <div role="columnheader">住哪</div>
                <div role="columnheader">推荐酒店</div>
              </div>
              {stays.map((row) => (
                <div data-testid="stay-summary-row" key={row.night} role="row">
                  <strong data-label="晚" role="rowheader">{row.night}</strong><span data-label="住哪" role="cell">{row.location}</span><span data-label="推荐酒店" role="cell">{row.recommendation}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="food-tips" aria-labelledby="food-tips-title">
        <header className="section-heading">
          <p className="eyebrow">EAT & TRAVEL SMART</p>
          <h2 id="food-tips-title">吃喝与避坑</h2>
        </header>
        <div className="food-warning-layout">
          <article className="food-tip-list">
            <ForkKnife aria-hidden="true" /><h3>吃货通用避坑与省钱</h3>
            <ul>{foodTips.map((item) => <li key={item.title}><strong>{item.title}</strong><p>{item.detail}</p></li>)}</ul>
          </article>
          <article className="warning-strip">
            <Warning aria-hidden="true" /><h3>全程避坑提示</h3>
            <ol>{warnings.map((item) => <li key={item}>{item}</li>)}</ol>
          </article>
        </div>
      </section>
    </div>
  );
}
