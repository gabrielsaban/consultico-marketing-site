/**
 * The Loop ring: three thin rings and one thick blue arc that runs from a
 * small dot at the top, round the right-hand side, to a larger sky dot at the
 * lower left. It's the Loop mark from the brand material, used plainly (Paul,
 * 2026-11-01), in place of the earlier labelled orbit.
 *
 * Plain SVG, no animation: the hero's LCP is fragile (see HeroSection), so this
 * adds nothing that waits on hydration.
 */
const CENTRE = 210;
const ARC_RADIUS = 140;

// The arc starts at the top (-90°) and runs clockwise to 157°, lower left.
const END_ANGLE = (157 * Math.PI) / 180;
const END_X = CENTRE + ARC_RADIUS * Math.cos(END_ANGLE);
const END_Y = CENTRE + ARC_RADIUS * Math.sin(END_ANGLE);

export default function HeroOrbit() {
  return (
    <svg viewBox="0 0 420 420" role="img" aria-label="The Loop ring" className="mx-auto h-auto w-full max-w-[30rem]">
      <circle cx={CENTRE} cy={CENTRE} r="190" fill="none" className="stroke-blue-primary/15" strokeWidth="1.5" />
      <circle cx={CENTRE} cy={CENTRE} r={ARC_RADIUS} fill="none" className="stroke-blue-primary/30" strokeWidth="1.5" />
      <circle cx={CENTRE} cy={CENTRE} r="100" fill="none" className="stroke-blue-primary/25" strokeWidth="1.5" />

      <path
        d={`M ${CENTRE} ${CENTRE - ARC_RADIUS} A ${ARC_RADIUS} ${ARC_RADIUS} 0 1 1 ${END_X.toFixed(1)} ${END_Y.toFixed(1)}`}
        fill="none"
        stroke="#007BFF"
        strokeWidth="16"
        strokeLinecap="round"
      />

      <circle cx={CENTRE} cy={CENTRE - ARC_RADIUS} r="7" fill="#FFFFFF" stroke="#007BFF" strokeWidth="3" />
      <circle cx={END_X.toFixed(1)} cy={END_Y.toFixed(1)} r="18" fill="#7FB0FF" />
    </svg>
  );
}
