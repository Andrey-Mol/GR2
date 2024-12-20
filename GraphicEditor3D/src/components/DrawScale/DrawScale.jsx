import React, { useEffect, useState } from "react";
import DrawPoints from "../DrawPoints/DrawPoints";
import Point from "../../entities/Point";
import pointRegimes from "../../constants/pointRegimes";

const DrawScale = ({ points, shift, params }) => {
  const [newPoints, newPointsChange] = useState([]);

  useEffect(() => {
    const p = points.map(
      (p) =>
        new Point(
          p.x * shift.x,
          p.y * shift.y,
          p.z * shift.z,
          pointRegimes.scale
        )
    );
    newPointsChange(p);
  }, [shift]);

  return <DrawPoints points={newPoints} params={params} />;
};

export default DrawScale;
