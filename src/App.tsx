import "./styles.css";
import { useState, useRef, useEffect } from "react";
import Atan from "./components/Atan";
import Projection from "./components/Projection";
import PointerPosition from "./components/PointerPosition";
import PointerEvents from "./components/PointerEvents";
import TransformationOrder from "./components/TransformationOrder";
import OrientIcons from "./components/OrientIcons";

export default function App() {
  const [xy, setXy] = useState({ x: 0, y: 0 });
  const [svgP, setSvgP] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(0);
  const svgRef = useRef();
  const handlePointerMove = (e: React.PointerEvent) => {
    setXy({ x: e.clientX, y: e.clientY });
  };
  const handlePointerMoveSvg = (e: React.PointerEvent) => {
    const bounds = svgRef.current.getBoundingClientRect();
    setSvgP({
      x: Math.round(e.clientX - bounds.left),
      y: Math.round(e.clientY - bounds.top),
    });
  };

  // const updateWidth = () => {
  //   console.log("resizing");
  //   setWidth(svgRef.current?.getBBox().width);
  // };

  // useEffect(() => {
  //   const updateWidth = () => {
  //     console.log("resizing");
  //     setWidth(svgRef.current.getBBox().width);
  //   };

  //   // Update the width state initially after the component mounts
  //   updateWidth();

  //   // Add a listener for 'resize' events
  //   const app = document.getElementsByClassName("App")[0];
  //   app.addEventListener("resize", updateWidth);

  //   // Cleanup - remove the listener when the component unmounts
  //   return () => {
  //     app.removeEventListener("resize", updateWidth);
  //   };
  // }, []);

  return (
    <div className="App" onPointerMove={handlePointerMove}>
      {false && (
        <svg
          ref={svgRef}
          className="svgCanvas"
          width="520"
          viewBox="-260 -260 520 520"
          onPointerMove={handlePointerMoveSvg}
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
          {/* <PointerEvents /> */}
          {/* {svgRef.current && <Atan svgRef={svgRef} />} */}
          {/* {svgRef.current && <OrientIcons svgRef={svgRef} />} */}
          {/* {svgRef.current && <Projection svgRef={svgRef} />} */}
          {/* <TransformationOrder /> */}
          {/* <text x={0} y={160} textAnchor="middle" dominantBaseline="middle">
          {`SVG Canvas Width: ${width}`}
        </text> */}
        </svg>
      )}
      <PointerPosition />
      {/* <div>
        <span>{`clientX: ${xy.x}, clientY: ${xy.y}`}</span>
        <br />
        <span>{`svgClienttX: ${svgP.x}, svgClientY: ${svgP.y}`}</span>
  </div> */}
    </div>
  );
}
