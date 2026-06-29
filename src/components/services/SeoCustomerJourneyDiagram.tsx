export default function SeoCustomerJourneyDiagram() {
  const steps: { lines: string[]; x: number; width: number; highlight: boolean }[] = [
    { lines: ['They search'], x: 36, width: 130, highlight: false },
    { lines: ['They find', 'you'], x: 196, width: 130, highlight: false },
    { lines: ['They enquire'], x: 356, width: 130, highlight: false },
    { lines: ['You get', 'the work'], x: 516, width: 168, highlight: true },
  ];

  return (
    <svg
      viewBox="0 0 720 220"
      role="img"
      aria-label="Customer journey: they search, they find you, they enquire, you get the work"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="seoJourneyBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#007BFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#007BFF" stopOpacity="0.18" />
        </linearGradient>
        <marker id="seoJourneyArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#007BFF" />
        </marker>
      </defs>

      <rect x="12" y="12" width="696" height="196" rx="16" fill="url(#seoJourneyBg)" />

      <text x="36" y="44" fill="#007BFF" fontSize="12" fontWeight="700" letterSpacing="0.14em">
        THE CUSTOMER JOURNEY
      </text>

      {steps.map((step, index) => {
        const centerX = step.x + step.width / 2;
        const lineStartY = step.lines.length > 1 ? 100 : 108;

        return (
          <g key={step.lines.join('-')}>
            <rect
              x={step.x}
              y="72"
              width={step.width}
              height="72"
              rx="12"
              fill={step.highlight ? '#007BFF' : '#ffffff'}
              stroke="#007BFF"
              strokeWidth={step.highlight ? 0 : 2}
            />
            <text
              textAnchor="middle"
              fill={step.highlight ? '#ffffff' : '#007BFF'}
              fontSize="14"
              fontWeight="700"
            >
              {step.lines.map((line, lineIndex) => (
                <tspan key={line} x={centerX} y={lineStartY + lineIndex * 18}>
                  {line}
                </tspan>
              ))}
            </text>
            {index < steps.length - 1 && (
              <path
                d={`M${step.x + step.width + 6} 108 H${steps[index + 1].x - 6}`}
                stroke="#007BFF"
                strokeWidth="2"
                strokeLinecap="round"
                markerEnd="url(#seoJourneyArrow)"
              />
            )}
          </g>
        );
      })}

      <text x="360" y="178" textAnchor="middle" fill="#64748b" fontSize="12">
        Google and AI search, turned into real enquiries
      </text>
    </svg>
  );
}
