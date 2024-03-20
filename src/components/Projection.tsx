import { useState } from "react";
import { useControls } from "leva";

export default function Projection({
  svgRef,
}: {
  svgRef: React.RefObject<SVGSVGElement>;
}) {
  const { fixed } = useControls({
    fixed: { value: false },
  });
  const bounds = svgRef?.current.getBoundingClientRect();
  const [atan, setAtan] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [length, setLength] = useState(1);
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const handlePointerMove = (e: PointerEvent) => {
    const xy = { x: e.clientX, y: e.clientY };
    const x = xy.x - bounds.left - bounds.width * 0.5;
    const y = xy.y - bounds.top - bounds.height * 0.5;
    // setCoord({ x: Math.round(x), y: Math.round(y) });
    setCoord({ x, y });
    setAtan(Math.atan2(y, x));
    setLength(fixed ? Math.cos(Math.atan2(y, x)) : 1);
    setRotation(Math.round(Math.atan2(y, x) * (180 / Math.PI)));
  };
  const clamp = (num: number, min: number, max: number) => {
    return Math.min(Math.max(num, min), max);
  };
  const radius = Math.hypot(coord.x, coord.y);
  // const scale = 1;
  const scale = clamp(
    (Math.hypot(coord.x, coord.y) / 260) * 2 * length,
    0.1,
    1.9
  );
  const sect = Math.abs(radius * 2 * (atan / (Math.PI * 2)) * Math.PI);
  const arc = Math.abs(
    radius * 2 * (1 - Math.abs(atan) / (Math.PI * 2)) * Math.PI
  );
  return (
    <g>
      <rect
        onPointerMove={handlePointerMove}
        x={-260}
        y={-260}
        width={520}
        height={520}
        fill="transparent"
      />
      <rect
        pointerEvents="none"
        transform={`scale(${scale})`}
        x={-130}
        y={-130}
        width={260}
        height={260}
        fill="white"
        stroke="black"
        strokeWidth={4}
      />
      <line
        pointerEvents="none"
        x1={0}
        y1={0}
        x2={190}
        y2={0}
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={10}
      />
      <line
        pointerEvents="none"
        x1={0}
        y1={0}
        x2={Math.hypot(coord.x, coord.y) * length}
        y2={0}
        stroke="royalblue"
        strokeWidth={4}
        strokeLinecap="round"
      />
      {/* <g transform={`rotate(${rotation})`}> */}
      {fixed && (
        <line
          pointerEvents="none"
          x1={coord.x}
          y1={0}
          x2={coord.x}
          y2={coord.y}
          stroke="black"
          strokeWidth={2}
          strokeDasharray={10}
        />
      )}
      <line
        pointerEvents="none"
        x1={0}
        y1={0}
        x2={coord.x}
        y2={coord.y}
        stroke="indianred"
        strokeWidth={4}
        strokeLinecap="round"
      />
      {/* </g> */}
      {!fixed && (
        <circle
          pointerEvents="none"
          cx={0}
          cy={0}
          r={radius}
          stroke="black"
          strokeWidth={2}
          fill="none"
          transform={atan > 0 ? `rotate(0)` : `rotate(${rotation})`}
          strokeDasharray={`${sect} ${arc}`}
        />
      )}
      <text
        x={0}
        y={200}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="royalblue"
      >
        {`distance: ${Math.round(Math.hypot(coord.x, coord.y) * length)}`}
      </text>
      <text
        x={0}
        y={220}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="indianred"
      >
        {`distance: ${Math.round(Math.hypot(coord.x, coord.y))}`}
      </text>
    </g>
  );
}
