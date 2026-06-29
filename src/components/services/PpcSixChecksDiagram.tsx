export default function PpcSixChecksDiagram() {
  const checks: { label: string; x: number; y: number }[] = [
    { label: 'Tracking', x: 36, y: 72 },
    { label: 'Targeting', x: 256, y: 72 },
    { label: 'Creative', x: 476, y: 72 },
    { label: 'Landing page', x: 36, y: 168 },
    { label: 'Budget', x: 256, y: 168 },
    { label: 'Reporting', x: 476, y: 168 },
  ];

  const cellWidth = 188;
  const cellHeight = 72;

  return (
    <svg
      viewBox="0 0 720 280"
      role="img"
      aria-label="Six paid media checks: tracking, targeting, creative, landing page, budget, reporting"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="ppcChecksBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#007BFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#007BFF" stopOpacity="0.18" />
        </linearGradient>
        <marker id="ppcChecksArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#007BFF" />
        </marker>
      </defs>

      <rect x="12" y="12" width="696" height="256" rx="16" fill="url(#ppcChecksBg)" />

      <text x="36" y="44" fill="#007BFF" fontSize="12" fontWeight="700" letterSpacing="0.14em">
        WHERE PAID BUDGET LEAKS
      </text>

      {checks.map((check) => {
        const centerX = check.x + cellWidth / 2;
        const lines = check.label.includes(' ')
          ? check.label.split(' ')
          : [check.label];
        const lineStartY = lines.length > 1 ? check.y + 36 : check.y + 44;

        return (
          <g key={check.label}>
            <rect
              x={check.x}
              y={check.y}
              width={cellWidth}
              height={cellHeight}
              rx="12"
              fill="#ffffff"
              stroke="#007BFF"
              strokeWidth="2"
            />
            <text textAnchor="middle" fill="#007BFF" fontSize="14" fontWeight="700">
              {lines.map((line, lineIndex) => (
                <tspan key={line} x={centerX} y={lineStartY + lineIndex * 18}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}

      <path
        d="M 360 252 L 360 262"
        stroke="#007BFF"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#ppcChecksArrow)"
      />
      <text x="360" y="276" textAnchor="middle" fill="#007BFF" fontSize="13" fontWeight="700">
        Measurable return
      </text>
    </svg>
  );
}
