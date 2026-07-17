import { Backpack, CalendarCheck, CurrencyCny, TShirt } from "@phosphor-icons/react";

function OverviewList({ items }) {
  return <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export function TripOverview({ overview }) {
  return (
    <section className="preparation-section" id="preparation" aria-labelledby="preparation-title">
      <header className="section-heading">
        <p className="eyebrow">BEFORE YOU GO</p>
        <h2 id="preparation-title">行前总览</h2>
        <p>7–8 月 18–28℃，避暑但天气多变；门票、车次与住宿建议提前 2–4 周确认。</p>
      </header>
      <div className="trip-overview">
        <article className="overview-column">
          <TShirt aria-hidden="true" />
          <h3>衣</h3>
          <OverviewList items={overview.clothing} />
        </article>
        <article className="overview-column">
          <Backpack aria-hidden="true" />
          <h3>必带与通用避坑</h3>
          <OverviewList items={overview.essentials} />
        </article>
        <article className="overview-column budget-ledger">
          <CurrencyCny aria-hidden="true" />
          <h3>预算（人均）</h3>
          <dl>
            {overview.budget.rows.map((row) => {
              const label = Array.isArray(row) ? row[0] : row.label;
              const value = Array.isArray(row) ? row[1] : row.value;
              return <div key={label}><dt>{label}</dt><dd>{value}</dd></div>;
            })}
          </dl>
          <strong>{overview.budget.total}</strong>
          <p className="budget-note">{overview.budget.note}</p>
        </article>
        <article className="overview-column reservation-list">
          <CalendarCheck aria-hidden="true" />
          <h3>必做预约</h3>
          <ul>
            {overview.reservations.map((item) => (
              <li data-testid="reservation-item" key={item}><span aria-hidden="true">□</span>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
