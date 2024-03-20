import { useControls } from "leva";

export default function TransformationOrder() {
  const { scale, rotate, translate } = useControls({
    scale: { value: 1, min: 0.1, max: 2.0, step: 0.1 },
    rotate: { value: 0, min: 0, max: 360, step: 1 },
    translate: { value: [0, 0], min: [0, 0], max: [100, 100], step: 1 },
  });
  return (
    <g>
      {/* <g transform={`rotate(${rotate}, 0, 0)`}> */}
      <g transform={`translate(${translate[0]}, ${translate[1]})`}>
        <g transform={`rotate(${rotate}, 0, 0)`}>
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
            {/* <circle x={0} y={0} r={50} fill="red" />; */}
          </g>
        </g>
      </g>
      <text x={0} y={140} textAnchor="middle" dominantBaseline="middle">
        Transformation Order: Translate, Rotate, Scale
      </text>
    </g>
  );
}
