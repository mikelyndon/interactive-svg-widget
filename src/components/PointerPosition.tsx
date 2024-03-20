import { useState, useRef } from "react";
import { useControls } from "leva";

export default function PointerPosition() {
  const [client, setClient] = useState({ x: 0, y: 0 });
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const svgRef = useRef();
  const bounds = svgRef?.current?.getBoundingClientRect();

  const { min_xy, calc_bounds, calc_viewbox } = useControls({
    calc_bounds: false,
    calc_viewbox: false,
    min_xy: {
      value: { x: 0, y: 0 },
      step: 10,
      min: { x: -200, y: -200 },
      max: { x: 200, y: 200 },
    },
  });

  const handlePointerMove = (evt: PointerEvent) => {
    if (bounds) {
      const xy = { x: evt.clientX, y: evt.clientY };
      const x = xy.x - bounds.left - 266;
      const y = xy.y - bounds.top - 263;
      setClient(xy);
      setCoord({ x, y });
    }
  };
  const calculated = calc_viewbox
    ? {
        x: -1 * (-200 - min_xy.x - Math.round(coord.x)),
        y: -1 * (-120 - min_xy.y - Math.round(coord.y)),
      }
    : calc_bounds
    ? { x: Math.round(coord.x) + 200, y: Math.round(coord.y) + 120 }
    : { x: client.x, y: client.y };

  return (
    <svg
      ref={svgRef}
      className="svgCanvas"
      width="526"
      height="675"
      viewBox="-263 -263 526 681"
      onPointerMove={handlePointerMove}
    >
      <rect
        x="-260"
        y="-260"
        width="520"
        height="675"
        fill="lightgrey"
        stroke="black"
        strokeWidth={6}
        strokeLinejoin="round"
        rx="10px"
        ry="10px"
      />
      <line
        pointerEvents="none"
        x1={-260}
        y1={coord.y}
        x2={coord.x}
        y2={coord.y}
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <line
        pointerEvents="none"
        x1={coord.x}
        y1={-260}
        x2={coord.x}
        y2={coord.y}
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <rect
        x={-200}
        y={-120}
        width={400}
        height={400}
        fill="white"
        stroke="black"
        strokeWidth={4}
        strokeLinejoin="round"
        rx="4px"
        ry="4px"
      />
      <text
        pointerEvents="none"
        x={coord.x + 10}
        y={coord.y + 10}
        textAnchor="start"
        dominantBaseline="hanging"
      >
        {`clientXY: ${Math.round(client.x)}, ${Math.round(client.y)}`}
      </text>
      <text
        pointerEvents="none"
        x={coord.x + 10}
        y={coord.y + 30}
        textAnchor="start"
        dominantBaseline="hanging"
      >
        {`calculated: ${calculated.x}, ${calculated.y}`}
      </text>
      <line
        pointerEvents="none"
        x1={-260}
        y1={coord.y}
        x2={coord.x}
        y2={coord.y}
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={"5, 5"}
      />
      <line
        pointerEvents="none"
        x1={coord.x}
        y1={-260}
        x2={coord.x}
        y2={coord.y}
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={"5, 5"}
      />
      <g>
        {calc_viewbox && (
          <g
            className="origin-indicator"
            transform={`translate(${-200 - min_xy.x}, ${-40 - min_xy.y - 80})`}
          >
            <line
              pointerEvents="none"
              x1={0}
              y1={-10}
              x2={0}
              y2={10}
              stroke="white"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <line
              pointerEvents="none"
              x1={-10}
              y1={0}
              x2={10}
              y2={0}
              stroke="white"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <line
              pointerEvents="none"
              x1={-10}
              y1={0}
              x2={10}
              y2={0}
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              pointerEvents="none"
              x1={0}
              y1={-10}
              x2={0}
              y2={10}
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <text x={10} y={10} textAnchor="start" dominantBaseline="hanging">
              {`0, 0`}
            </text>
          </g>
        )}
        {calc_viewbox && (
          <text
            x={0}
            y={230}
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight={500}
          >
            {`viewBox(${min_xy.x}, ${min_xy.y}, 400, 400)`}
          </text>
        )}
        <text
          x={0}
          y={260}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight={500}
          fontSize="1.5em"
        >
          SVG Container
        </text>
        <text
          x={0}
          y={390}
          stroke="white"
          strokeWidth={4}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight={500}
          fontSize="1.5em"
        >
          VIEWPORT
        </text>
        <text
          x={0}
          y={390}
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight={500}
          fontSize="1.5em"
        >
          VIEWPORT
        </text>
      </g>
      {calc_bounds && (
        <g>
          <line
            x1={-260}
            y1={0}
            x2={-200}
            y2={0}
            stroke="black"
            strokeWidth={2}
          />
          <text
            x={-110}
            y={-150}
            stroke="white"
            strokeWidth={3}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            bounds.top
          </text>
          <text x={-110} y={-150} textAnchor="middle" dominantBaseline="middle">
            bounds.top
          </text>
          <line
            x1={-160}
            y1={-260}
            x2={-160}
            y2={-120}
            stroke="black"
            strokeWidth={2}
          />
          <text
            x={-200}
            y={15}
            stroke="white"
            strokeWidth={3}
            // fontWeight={500}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            bounds.left
          </text>
          <text x={-200} y={15} textAnchor="middle" dominantBaseline="middle">
            bounds.left
          </text>
        </g>
      )}
    </svg>
  );
}
