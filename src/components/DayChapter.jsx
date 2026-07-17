import { Bed, BowlFood, Bus, Clock, MapPin } from "@phosphor-icons/react";

function TextSections({ sections }) {
  return sections.map((section, index) => {
    if (typeof section === "string") return <p key={section}>{section}</p>;
    const items = section.items ?? section.options ?? section.details ?? [];
    return (
      <section key={`${section.title ?? "section"}-${index}`}>
        {section.title ? <h4>{section.title}</h4> : null}
        {section.detail ? <p>{section.detail}</p> : null}
        {items.length ? <ul>{items.map((item) => <li key={typeof item === "string" ? item : item.label}>{typeof item === "string" ? item : <><strong>{item.label}</strong>{item.detail}</>}</li>)}</ul> : null}
      </section>
    );
  });
}

export function DayChapter({ day, imageSrc }) {
  return (
    <article className={`day-entry day-${day.day}`} id={`day-${day.day}`} data-testid="day-entry">
      <header className="day-header">
        <div className="day-number">D{day.day}</div>
        <div>
          <p className="day-location"><MapPin aria-hidden="true" />{day.location}</p>
          <h2>{day.title}</h2>
          {day.subtitle ? <p>{day.subtitle}</p> : null}
        </div>
        <div className="day-meta">
          <span><Bus aria-hidden="true" />{day.transit}</span>
          <span><Bed aria-hidden="true" />住：{day.stay}</span>
        </div>
      </header>

      <div className="day-ledger">
        {imageSrc ? (
          <figure className="day-photo">
            <img src={imageSrc} alt={`${day.title}行程风景`} loading="lazy" />
            <figcaption>{day.mapLabel} · 第 {day.day} 日记录</figcaption>
          </figure>
        ) : null}

        <div className="schedule-table" role="table" aria-label={`D${day.day} 时间安排`}>
          <div className="schedule-row schedule-header" role="row">
            <div role="columnheader">时间</div>
            <div role="columnheader">行程安排</div>
            <div role="columnheader">耗时</div>
            <div role="columnheader">提示</div>
          </div>
          {day.schedule.map((row, index) => (
            <div className="schedule-row" data-testid="schedule-row" key={`${row.time}-${index}`} role="row">
              <div className="schedule-time" data-label="时间" role="rowheader"><Clock aria-hidden="true" /><strong>{row.time}</strong></div>
              <div data-label="行程安排" role="cell"><strong>{row.activity ?? row.arrangement ?? row.title}</strong>{row.detail ? <p>{row.detail}</p> : null}</div>
              <div className="schedule-duration" data-label="耗时" role="cell">{row.duration ?? "—"}</div>
              <div className="schedule-note" data-label="提示" role="cell">{row.note ?? row.tip ?? ""}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="day-detail-grid">
        <section className="transport-notes">
          <Bus aria-hidden="true" />
          <h3>怎么走</h3>
          <TextSections sections={day.transportSections} />
        </section>

        <section className="hotel-ledger">
          <Bed aria-hidden="true" />
          <h3>住哪</h3>
          {day.hotels.length ? (
            <div className="hotel-table" role="table" aria-label={`D${day.day} 酒店推荐`}>
              <div className="hotel-row hotel-header" role="row">
                <div role="columnheader">酒店</div>
                <div role="columnheader">评分</div>
                <div role="columnheader">区位</div>
                <div role="columnheader">亮点</div>
                <div role="columnheader">参考价/晚</div>
              </div>
              {day.hotels.map((hotel) => (
                <div className="hotel-row" data-testid="hotel-row" key={hotel.name} role="row">
                  <strong data-label="酒店" role="rowheader">{hotel.name}</strong>
                  <span data-label="评分" role="cell">{hotel.rating}</span>
                  <span data-label="区位" role="cell">{hotel.location}</span>
                  <span data-label="亮点" role="cell">{hotel.highlight}</span>
                  <span data-label="参考价/晚" role="cell">{hotel.price}</span>
                </div>
              ))}
            </div>
          ) : <p>{day.hotelNote ?? `住宿沿用：${day.stay}`}</p>}
        </section>

        <section className="food-notes">
          <BowlFood aria-hidden="true" />
          <h3>吃什么</h3>
          <TextSections sections={day.foodSections} />
        </section>

        <aside className="day-tips" aria-label={`D${day.day} 当日提醒`}>
          <h3>旅行小贴士</h3>
          <ul>{day.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
        </aside>
      </div>
    </article>
  );
}
