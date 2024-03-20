import { useState } from "react";
import { useControls } from "leva"

export default function PointerEvents() {
  const [pointerDown, setPointerDown] = useState(false);
  const [pointerId, setPointerId] = useState<null | number>(null);
  const [hover, setHover] = useState("none");
  const { capture } = useControls({
    capture: { value: false },
  })

  const handlePointerOver: React.PointerEventHandler = (e: React.PointerEvent) => {
    if (e.target instanceof SVGRectElement) {
      setHover(e.target.className.baseVal);
    }
  };
  const handlePointerDown: React.PointerEventHandler = (e: React.PointerEvent) => {
    setPointerDown(true);
    if (capture) {
      setPointerId(e.pointerId);
      if (e.target instanceof SVGRectElement) {
        e.target.setPointerCapture(e.pointerId);
      }
    }
  };
  const handlePointerUp: React.PointerEventHandler = () => {
    setPointerId(null);
    setPointerDown(false);
  };
  return (
    <g
      onPointerOver={handlePointerOver}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <rect
        className="left_square"
        x="-140"
        y="-160"
        width="100"
        height="100"
        fill="slategrey"
        stroke="black"
        strokeWidth={2}
      />
      <rect
        className="right_square"
        x="20"
        y="0"
        width="125"
        height="125"
        fill="lightslategrey"
        stroke="black"
        strokeWidth={1}
      />
      <rect
        className="middle_square"
        x="-75"
        y="-95"
        width="150"
        height="150"
        fill="white"
        stroke="black"
        strokeWidth={4}
      />
      {capture && <text
        className="black_text"
        x="0"
        y="140"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Pointer ID: {pointerId}
      </text>}
      <text
        className="black_text"
        x="0"
        y="160"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Mouse Button: {pointerDown ? "down" : "up"}
      </text>
      <text
        className="black_text"
        x="0"
        y="180"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Hover event firing on: {hover}
      </text>
    </g>
  );
}
