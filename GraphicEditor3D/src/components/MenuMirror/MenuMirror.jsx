import React, { useState } from "react";
import Transformer from "../../functions/Transformer";
import classes from "./MenuMirror.module.css";

const MenuMirror = ({
                      baseCords,
                      cords,
                      cordsChange,
                      groupPoints,
                      groupPointsChange,
                      setTransformationCords,
                    }) => {
  const [selectedValue, setSelectedValue] = useState("0"); // Состояние для выбранной опции

  const change = () => {
    const tr = new Transformer(cords, baseCords);
    for (const point of groupPoints) {
      point.x = tr.x(point.x);
      point.y = tr.y(point.y);
      point.z = tr.z(point.z);
    }
    groupPointsChange([...groupPoints]);
    setTransformationCords(groupPoints);

    setSelectedValue("0"); // Сбрасываем выбор
  };

  const mirror = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (value === "1") {
      cordsChange({ ...cords, minx: -cords.minx, maxx: -cords.maxx });
    } else if (value === "2") {
      cordsChange({ ...cords, miny: -cords.miny, maxy: -cords.maxy });
    } else if (value === "3") {
      cordsChange({ ...cords, minz: -cords.minz, maxz: -cords.maxz });
    }
  };

  return (
      <div className={classes.container}>
        <div className={classes.selectContainer}>
          <select onChange={mirror} value={selectedValue} className={classes.select}>
            <option value="0" disabled>
              -- Выберите --
            </option>
            <option value="1">Перевернуть по X</option>
            <option value="2">Перевернуть по Y</option>
            <option value="3">Перевернуть по Z</option>
          </select>
        </div>
        <button onClick={change} className={classes.button}>
          Применить
        </button>
      </div>
  );
};

export default MenuMirror;