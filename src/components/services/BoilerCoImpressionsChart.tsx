/** Weekly impressions curve for The Boiler Co (GSC: ~8k at engagement start to a peak above 21k). */
const DATA_POINTS = [
  { x: 0, y: 8000 },
  { x: 1, y: 9200 },
  { x: 2, y: 10500 },
  { x: 3, y: 12500 },
  { x: 4, y: 13500 },
  { x: 5, y: 16000 },
  { x: 6, y: 18500 },
  { x: 7, y: 21000 },
];

const WIDTH = 420;
const HEIGHT = 220;
const PAD = { top: 36, right: 24, bottom: 40, left: 48 };
const CHART_W = WIDTH - PAD.left - PAD.right;
const CHART_H = HEIGHT - PAD.top - PAD.bottom;
const Y_MAX = 24000;

function toSvg(point: { x: number; y: number }) {
  const px = PAD.left + (point.x / (DATA_POINTS.length - 1)) * CHART_W;
  const py = PAD.top + CHART_H - (point.y / Y_MAX) * CHART_H;
  return { px, py };
}

export default function BoilerCoImpressionsChart() {
  const coords = DATA_POINTS.map(toSvg);
  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.px} ${c.py}`).join(' ');
  const areaPath = `${linePath} L ${coords[coords.length - 1].px} ${PAD.top + CHART_H} L ${coords[0].px} ${PAD.top + CHART_H} Z`;
  const last = coords[coords.length - 1];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="The Boiler Co organic search impressions grew from around 8,000 to a peak above 21,000 weekly impressions over the engagement"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="boilerCoArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#007BFF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#007BFF" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width={WIDTH - 16} height={HEIGHT - 16} rx="12" fill="#ffffff" stroke="#e5e7eb" />

      <text x={PAD.left} y={22} fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="0.12em">
        THE BOILER CO · WEEKLY IMPRESSIONS
      </text>

      {[0, 6000, 12000, 18000, 21000].map((tick) => {
        const y = PAD.top + CHART_H - (tick / Y_MAX) * CHART_H;
        return (
          <g key={tick}>
            <line x1={PAD.left} y1={y} x2={WIDTH - PAD.right} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={PAD.left - 8} y={y + 4} textAnchor="end" fill="#94a3b8" fontSize="10">
              {tick >= 1000 ? `${Math.round(tick / 1000)}k` : tick}
            </text>
          </g>
        );
      })}

      <path d={areaPath} fill="url(#boilerCoArea)" />
      <path d={linePath} fill="none" stroke="#007BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {coords.map((c, i) => (
        <circle key={i} cx={c.px} cy={c.py} r={i === coords.length - 1 ? 5 : 3} fill="#007BFF" />
      ))}

      <rect x={last.px - 72} y={last.py - 36} width="144" height="28" rx="6" fill="#007BFF" />
      <text x={last.px} y={last.py - 18} textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">
        21k weekly impressions
      </text>
    </svg>
  );
}
