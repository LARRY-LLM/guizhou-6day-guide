import { Bus, MapPin, Train } from "@phosphor-icons/react";

const stopPositions = [
  "map-stop-1",
  "map-stop-2",
  "map-stop-3",
  "map-stop-4",
  "map-stop-5",
  "map-stop-6",
];

function ResponsiveImage({ image, alt, className }) {
  return (
    <picture className={className}>
      <source srcSet={image.webp} type="image/webp" />
      <img src={image.png} alt={alt} loading="lazy" decoding="async" />
    </picture>
  );
}

export function RouteMap({ days, mapImage, waterfallImage, villageImage }) {
  return (
    <section className="route-atlas" id="route-map" aria-labelledby="route-map-title">
      <header className="section-heading route-atlas-heading">
        <div>
          <p className="eyebrow">SIX-DAY ROUTE</p>
          <h2 id="route-map-title">六日行程路线图</h2>
        </div>
        <p>广州往返、贵阳作枢纽；黄果树与西江为主线，下司、朗德、龙宫和屯堡顺路串联。</p>
      </header>

      <div className="route-atlas-visual">
        <ResponsiveImage className="route-atlas-map" image={mapImage} alt="贵州六日环线路线手绘地图" />
        <ol className="route-atlas-stops" aria-label="六日地图节点">
          {days.map((day, index) => (
            <li className={`map-stop ${stopPositions[index]}`} data-testid="map-stop" key={day.day}>
              <a href={`#day-${day.day}`}>
                <MapPin aria-hidden="true" />
                <span>D{day.day}</span>
                <strong>{day.mapLabel}</strong>
                <small>{day.transit}</small>
              </a>
            </li>
          ))}
        </ol>
        <figure className="route-map-photo route-map-photo-waterfall" aria-hidden="true">
          <ResponsiveImage image={waterfallImage} alt="" />
        </figure>
        <figure className="route-map-photo route-map-photo-village" aria-hidden="true">
          <ResponsiveImage image={villageImage} alt="" />
        </figure>
        <div className="route-atlas-legend" aria-label="地图交通图例">
          <span><Train aria-hidden="true" /> 高铁</span>
          <span><Bus aria-hidden="true" /> 巴士 / 包车</span>
        </div>
      </div>

      <ol className="route-strip" aria-label="六日路线速览">
        {days.map((day) => (
          <li data-testid="route-day" key={day.day}>
            <a href={`#day-${day.day}`}>
              <span>D{day.day}</span>
              <strong>{day.mapLabel}</strong>
              <small>{day.location}</small>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
