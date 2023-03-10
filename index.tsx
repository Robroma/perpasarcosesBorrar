import { useEffect, useState } from "react";
import { getWidthRange, getMarginRange } from "../utils/utilsFunctions";

function NormalSlider() {
  const [rightValue, setRightValue] = useState(1000);
  const [leftValue, setLeftValue] = useState(0);

  const handleLeftMove = () => {
    if (leftValue < rightValue) {
      setLeftValue(leftValue + 1);
    }
  };

  const handleRightMove = () => {
    if (rightValue > leftValue) {
      setRightValue(rightValue - 1);
    }
  };

  return (
    <div className="slider">
      <table >
        <tbody>
        <tr key="tr1">
          <td key="td1"><p className="numberSlice">{`${leftValue}`}</p></td>
          <td key="td2">
            <div className="divTrSlice">
              <button onClick={handleLeftMove} className="bullet bullet--left">&#60;</button>
              <div className="bullet--line" />
              <div
                style={{
                  width: getWidthRange(rightValue, leftValue),
                  marginLeft: getMarginRange(leftValue),
                }}
                className="bullet--line2"
              />
              <button onClick={handleRightMove} className="bullet bullet--right">&#62;</button>
            </div>
          </td>
          <td key="td3"><p className="numberSlice">{`${rightValue}`}</p></td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NormalSlider;
