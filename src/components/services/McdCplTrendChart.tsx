/** MCD Gas cost-per-lead trend (approx. monthly CPL declining toward ~£8 within 3 months). */
const DATA_POINTS = [
  { x: 0, y: 42 },
  { x: 1, y: 28 },
  { x: 2, y: 16 },
  { x: 3, y: 10 },
  { x: 4, y: 8 },
];

const WIDTH = 420;
const HEIGHT = 220;
const PAD = { top: 36, right: 24, bottom: 40, left: 48 };
const CHART_W = WIDTH - PAD.left - PAD.right;
const CHART_H = HEIGHT - PAD.top - PAD.bottom;
const Y_MAX = 48;

function toSvg(point: { x: number; y: number }) {
  const px = PAD.left + (point.x / (DATA_POINTS.length - 1)) * CHART_W;
  const py = PAD.top + CHART_H - (point.y / Y_MAX) * CHART_H;
  return { px, py };
}

export default function McdCplTrendChart() {
  const coords = DATA_POINTS.map(toSvg);
  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.px} ${c.py}`).join(' ');
  const last = coords[coords.length - 1];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="MCD Gas Google Ads cost per lead trend declining to around £8 within three months"
      className="h-auto w-full"
    >
      <rect x="8" y="8" width={WIDTH - 16} height={HEIGHT - 16} rx="12" fill="#ffffff" stroke="#e5e7eb" />

      <text x={PAD.left} y={22} fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="0.12em">
        MCD GAS · COST PER LEAD
      </text>

      {[0, 16, 32, 48].map((tick) => {
        const y = PAD.top + CHART_H - (tick / Y_MAX) * CHART_H;
        return (
          <g key={tick}>
            <line x1={PAD.left} y1={y} x2={WIDTH - PAD.right} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={PAD.left - 8} y={y + 4} textAnchor="end" fill="#94a3b8" fontSize="10">
              £{tick}
            </text>
          </g>
        );
      })}

      <path d={linePath} fill="none" stroke="#007BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {coords.map((c, i) => (
        <circle key={i} cx={c.px} cy={c.py} r={i === coords.length - 1 ? 5 : 3} fill="#007BFF" />
      ))}

      <rect x={last.px - 64} y={last.py - 36} width="128" height="28" rx="6" fill="#007BFF" />
      <text x={last.px} y={last.py - 18} textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">
        ~£8 cost per lead
      </text>
    </svg>
  );
}
