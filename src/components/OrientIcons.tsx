import { useState } from "react";
import { useControls } from "leva";

function Icon(rotation: number) {
  return {
    cursor: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' ><g fill='none' transform='rotate(${rotation} 12 12)'><circle cx='12' cy='12' r='10'></circle><path d='M8 14s1.5 2 4 2 4-2 4-2'></path><line x1='9' y1='9' x2='9.01' y2='9'></line><line x1='15' y1='9' x2='15.01' y2='9'></line></g></svg>") 12 12, auto`,
  };
}

export default function OrientIcons({
  svgRef,
}: {
  svgRef: React.RefObject<SVGSVGElement>;
}) {
  const bounds = svgRef?.current.getBoundingClientRect();
  const [atan, setAtan] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  const { orient } = useControls({
    orient: { value: false },
  });

  const handlePointerMove = (e: PointerEvent) => {
    e.target.setPointerCapture(e.poinerId);
    const xy = { x: e.clientX, y: e.clientY };
    const x = xy.x - bounds.left - 260;
    const y = xy.y - bounds.top - 260;
    console.log(x, y);
    setCoord({ x: Math.round(x), y: Math.round(y) });
    setAtan(Math.atan2(y, x));
    setRotation(Math.atan2(y, x) * (180 / Math.PI));
  };
  const sect = Math.abs(50 * 2 * (atan / (Math.PI * 2)) * Math.PI);
  const arc = Math.abs(50 * 2 * (1 - Math.abs(atan) / (Math.PI * 2)) * Math.PI);

  return (
    <g onPointerMove={handlePointerMove}>
      <rect
        // style={{ cursor: "crosshair" }}
        x={-175}
        y={-175}
        width={350}
        height={350}
        fill="transparent"
      />
      <line
        pointerEvents="none"
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
          pointerEvents="none"
          //   style={Icon(rotation)}
          x1={0}
          y1={0}
          x2={150}
          y2={0}
          stroke="black"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <rect
          pointerEvents="auto"
          style={Icon(orient ? rotation : 0)}
          x={100}
          y={-20}
          width={40}
          height={40}
          fill="white"
          stroke="black"
          strokeWidth={4}
        />
      </g>
      <circle
        pointerEvents="none"
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
        {`Orient Icon: ${orient}`}
      </text>
    </g>
  );
}
