import { useEffect, useState } from "react";
import { getWidthRange, getMarginRange } from "../utils/utilsFunctions";

function NormalSlider() {
  const [rightValue, setRightValue] = useState(1000);
  const [leftValue, setLeftValue] = useState(0);
  const [draggingLeft, setDraggingLeft] = useState(false);
  const [draggingRight, setDraggingRight] = useState(false);

  function handleMouseDownLeft() {
    setDraggingLeft(true);
  }

  function handleMouseDownRight() {
    setDraggingRight(true);
  }

  function handleMouseUp() {
    setDraggingLeft(false);
    setDraggingRight(false);
  }

  function handleMouseMove(event) {
    if (draggingLeft) {
      const x = event.clientX;
      const rect = event.target.getBoundingClientRect();
      const left = x - rect.left;
      const percentage = (left / rect.width) * 100;
      const newValue = Math.min(rightValue - 1, Math.round((percentage / 100) * 1000));
      setLeftValue(newValue);
    } else if (draggingRight) {
      const x = event.clientX;
      const rect = event.target.getBoundingClientRect();
      const left = x - rect.left;
      const percentage = (left / rect.width) * 100;
      const newValue = Math.max(leftValue + 1, Math.round((percentage / 100) * 1000));
      setRightValue(newValue);
    }
  }

  return (
    <div className="slider">
      <table onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
        <tbody>
          <tr key="tr1">
            <td key="td1">
              <p className="numberSlice">{`${leftValue}`}</p>
            </td>
            <td key="td2">
              <div className="divTrSlice">
                <div
                  className="bullet bullet--left"
                  style={{
                    left: `${(leftValue / 1000) * 100}%`,
                    zIndex: draggingLeft ? 2 : 1,
                  }}
                  onMouseDown={handleMouseDownLeft}
                />
                <div className="bullet--line" />
                <div
                  className="bullet--line2"
                  style={{
                    width: `${getWidthRange(rightValue, leftValue)}%`,
                    marginLeft: `${getMarginRange(leftValue)}%`,
                  }}
                />
                <div
                  className="bullet bullet--right"
                  style={{
                    left: `${(rightValue / 1000) * 100}%`,
                    zIndex: draggingRight ? 2 : 1,
                  }}
                  onMouseDown={handleMouseDownRight}
                />
              </div>
            </td>
            <td key="td3">
              <p className="numberSlice">{`${rightValue}`}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NormalSlider;


