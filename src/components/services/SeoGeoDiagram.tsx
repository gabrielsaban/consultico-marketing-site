export default function SeoGeoDiagram() {
  return (
    <svg
      viewBox="0 0 720 420"
      role="img"
      aria-label="SEO and GEO flow diagram: crawl, index, rank, click, convert, with a generative engine optimisation layer for AI citation"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="seoGeoFlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#007BFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#007BFF" stopOpacity="0.35" />
        </linearGradient>
        <marker id="seoGeoArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#007BFF" />
        </marker>
      </defs>

      <rect x="12" y="12" width="696" height="396" rx="16" fill="url(#seoGeoFlow)" />
      <text x="36" y="44" fill="#007BFF" fontSize="13" fontWeight="700" letterSpacing="0.12em">
        ORGANIC SEARCH
      </text>

      {[
        { x: 36, label: 'Crawl' },
        { x: 156, label: 'Index' },
        { x: 276, label: 'Rank' },
        { x: 396, label: 'Click' },
        { x: 516, label: 'Convert' },
      ].map((step, index, arr) => (
        <g key={step.label}>
          <rect x={step.x} y="68" width="96" height="52" rx="10" fill="#ffffff" stroke="#007BFF" strokeWidth="2" />
          <text x={step.x + 48} y="99" textAnchor="middle" fill="#007BFF" fontSize="14" fontWeight="700">
            {step.label}
          </text>
          {index < arr.length - 1 && (
            <path
              d={`M${step.x + 102} 94 H${arr[index + 1].x - 6}`}
              stroke="#007BFF"
              strokeWidth="2"
              strokeLinecap="round"
              markerEnd="url(#seoGeoArrow)"
            />
          )}
        </g>
      ))}

      <rect x="36" y="168" width="648" height="108" rx="12" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="52" y="196" fill="#007BFF" fontSize="13" fontWeight="700" letterSpacing="0.12em">
        GEO LAYER
      </text>
      <text x="52" y="222" fill="#334155" fontSize="13">
        Entity signals · answer-first copy · schema · llms.txt
      </text>
      <text x="52" y="246" fill="#64748b" fontSize="12">
        Structured so Google and AI assistants can find, understand, and cite your brand
      </text>

      <rect x="36" y="304" width="200" height="72" rx="10" fill="#007BFF" />
      <text x="136" y="334" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">
        Compounding asset
      </text>
      <text x="136" y="356" textAnchor="middle" fill="#ffffff" fontSize="11" opacity="0.9">
        Traffic that keeps working
      </text>

      <rect x="256" y="304" width="200" height="72" rx="10" fill="#ffffff" stroke="#007BFF" strokeWidth="1.5" />
      <text x="356" y="334" textAnchor="middle" fill="#007BFF" fontSize="13" fontWeight="700">
        High-intent demand
      </text>
      <text x="356" y="356" textAnchor="middle" fill="#64748b" fontSize="11">
        Buyers already searching
      </text>

      <rect x="476" y="304" width="208" height="72" rx="10" fill="#ffffff" stroke="#007BFF" strokeWidth="1.5" />
      <text x="580" y="334" textAnchor="middle" fill="#007BFF" fontSize="13" fontWeight="700">
        Business outcomes
      </text>
      <text x="580" y="356" textAnchor="middle" fill="#64748b" fontSize="11">
        Enquiries, bookings, revenue
      </text>
    </svg>
  );
}
