import { useControls } from "leva";

export default function TransformationOrder() {

  const { scale, rotate, translate, order } = useControls({
    scale: { value: 1, min: 0.1, max: 2.0, step: 0.1 },
    rotate: { value: 0, min: 0, max: 360, step: 1 },
    translate: { value: { x: 0, y: 0 }, min: 0, max: 100, step: 1 },
    order: {
      value: "trs",
      options: ["trs", "rts"],
    },
  });

  return (
    <g>
      <g transform={order === "trs" ? `translate(${translate.x} ${translate.y}) rotate(${rotate})` : `rotate(${rotate}) translate(${translate.x} ${translate.y})`}>
        <g transform={`scale(${scale}, ${scale})`}>
          <rect
            x={-50}
            y={-50}
            width={100}
            height={100}
            fill="white"
            stroke="black"
            strokeWidth={4}
          />
        </g>
      </g>
      <text x={0} y={140} textAnchor="middle" dominantBaseline="middle">
        {`Transformation Order: ${order === "trs" ? "Translate, Rotate, Scale" : "Rotate, Translate, Scale"}`}
      </text>
    </g>
  );
}
