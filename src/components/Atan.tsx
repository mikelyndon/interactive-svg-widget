import { useState } from "react";

export default function Atan({
  svgRef,
}: {
  svgRef: React.RefObject<SVGSVGElement>;
}) {
  const bounds = svgRef?.current.getBoundingClientRect();
  const [atan, setAtan] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const handlePointerMove = (e: PointerEvent) => {
    const xy = { x: e.clientX, y: e.clientY };
    const x = xy.x - bounds.left - 260;
    const y = xy.y - bounds.top - 260;
    setCoord({ x: Math.round(x), y: Math.round(y) });
    setAtan(Math.atan2(y, x));
    setRotation(Math.round(Math.atan2(y, x) * (180 / Math.PI)));
  };
  const sect = Math.abs(50 * 2 * (atan / (Math.PI * 2)) * Math.PI);
  const arc = Math.abs(50 * 2 * (1 - Math.abs(atan) / (Math.PI * 2)) * Math.PI);
  return (
    <g>
      <rect
        onPointerMove={handlePointerMove}
        x={-175}
        y={-175}
        width={350}
        height={350}
        fill="transparent"
      />
      <line
        x1={0}
        y1={0}
        x2={150}
        y2={0}
        stroke="black"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <g transform={`rotate(${rotation})`}>
        <line
          x1={0}
          y1={0}
          x2={150}
          y2={0}
          stroke="black"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </g>
      <circle
        cx={0}
        cy={0}
        r={50}
        stroke="black"
        strokeWidth={2}
        fill="none"
        transform={atan > 0 ? `rotate(0)` : `rotate(${rotation})`}
        // strokeDasharray={atan > 0 ? `${sect} ${arc}` : `${arc} ${sect}`}
        // transform={`rotate(${rotation})`}
        strokeDasharray={`${sect} ${arc}`}
      />
      <text x={0} y={160} textAnchor="middle" dominantBaseline="middle">
        {`atan2(${coord.y}, ${coord.x}) = ${Math.round(atan * 100) / 100}`}
      </text>
    </g>
  );
}
