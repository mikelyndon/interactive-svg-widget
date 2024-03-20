import "./styles.css";
import { useState, useRef, ChangeEvent } from "react";
import Atan from "./components/Atan";
import Projection from "./components/Projection";
import PointerPosition from "./components/PointerPosition";
import PointerEvents from "./components/PointerEvents";
import TransformationOrder from "./components/TransformationOrder";
import OrientIcons from "./components/OrientIcons";

export default function App() {
  const svgRef = useRef<SVGSVGElement>(null);

  type Demo = "PointerPosition" | "PointerEvents" | "Atan2" | "Projection" | "TransformationOrder" | "OrientIcons"
  const [selectedDemo, setSelectedDemo] = useState<Demo>("PointerPosition")

  const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDemo(evt.target.value as Demo)
  }

  return (
    <div className="App" >
      <div>
        <select value={selectedDemo} onChange={handleChange}>
          <option value="PointerPosition">Pointer Position</option>
          <option value="PointerEvents">Pointer Events</option>
          <option value="Atan2">atan2</option>
          <option value="Projection">Projection</option>
          <option value="TransformationOrder">Transformation Order</option>
          <option value="OrientIcons">Orient Icons</option>
        </select>
      </div>
      {selectedDemo !== "PointerPosition" && (
        <svg
          ref={svgRef}
          className="svgCanvas"
          width="520"
          viewBox="-260 -260 520 520"
        >
          <rect
            x="-260"
            y="-260"
            width="520"
            height="520"
            fill="lightgrey"
            stroke="black"
            strokeWidth={8}
          />
          {selectedDemo === "PointerEvents" && <PointerEvents />}
          {selectedDemo === "Atan2" && svgRef.current && <Atan svgRef={svgRef} />}
          {selectedDemo === "OrientIcons" && svgRef.current && <OrientIcons svgRef={svgRef} />}
          {selectedDemo === "Projection" && svgRef.current && <Projection svgRef={svgRef} />}
          {selectedDemo === "TransformationOrder" && <TransformationOrder />}
        </svg>
      )}
      {selectedDemo === "PointerPosition" && <PointerPosition />}
    </div>
  );
}
