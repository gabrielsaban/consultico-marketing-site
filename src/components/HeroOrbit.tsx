/**
 * The hero's orbit: the strategist at the centre, with the team, the in-house
 * frameworks and the AI tools around them. It's the "people first, machines
 * behind" order drawn as a picture, and it borrows the Loop ring (thin rings,
 * one thick blue arc ending in a sky dot) so the January rebrand can restyle it
 * rather than redraw it.
 *
 * Plain SVG, no animation: the hero's LCP is fragile (see HeroSection), so this
 * adds nothing that waits on hydration.
 */
const SATELLITES = [
  // All three sit on a 160px orbit around the centre, clear of it and of the
  // Loop arc along the bottom left.
  { label: ['Your', 'team'], cx: 323, cy: 97, r: 50, fill: '#8FC1FF', ink: '#0B2A4A' },
  { label: ['Our', 'frameworks'], cx: 60, cy: 155, r: 60, fill: '#CFE4FF', ink: '#0B2A4A' },
  { label: ['AI', 'tools'], cx: 290, cy: 349, r: 44, fill: '#1B2A4A', ink: '#FFFFFF' },
] as const;

export default function HeroOrbit() {
  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-label="Your strategist at the centre, with our team, our own frameworks and AI tools around them"
      className="mx-auto h-auto w-full max-w-[30rem]"
    >
      {/* Orbits */}
      <circle cx="210" cy="210" r="178" fill="none" className="stroke-blue-primary/25" strokeWidth="1.5" strokeDasharray="6 8" />
      <circle cx="210" cy="210" r="122" fill="none" className="stroke-blue-primary/20" strokeWidth="1.5" strokeDasharray="4 7" />

      {/* The Loop arc: thick blue, ending in a sky dot */}
      <path d="M 210 388 A 178 178 0 0 1 84 336" fill="none" stroke="#007BFF" strokeWidth="7" strokeLinecap="round" />
      <circle cx="84" cy="336" r="9" fill="#7FB0FF" />

      {SATELLITES.map((satellite) => (
        <g key={satellite.label.join(' ')}>
          <circle cx={satellite.cx} cy={satellite.cy} r={satellite.r} fill={satellite.fill} />
          <text
            x={satellite.cx}
            y={satellite.cy - 4}
            textAnchor="middle"
            fill={satellite.ink}
            fontSize="14"
            fontWeight="700"
            fontFamily="Futura, 'Century Gothic', 'Helvetica Neue', Arial, sans-serif"
          >
            <tspan x={satellite.cx}>{satellite.label[0]}</tspan>
            <tspan x={satellite.cx} dy="18">
              {satellite.label[1]}
            </tspan>
          </text>
        </g>
      ))}

      {/* The centre */}
      <circle cx="210" cy="210" r="78" fill="#007BFF" />
      <text
        x="210"
        y="204"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="20"
        fontWeight="800"
        fontFamily="Futura, 'Century Gothic', 'Helvetica Neue', Arial, sans-serif"
      >
        <tspan x="210">Your</tspan>
        <tspan x="210" dy="24">
          strategist
        </tspan>
      </text>
    </svg>
  );
}
