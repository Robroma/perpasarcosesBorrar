import { useEffect, useState } from "react";
import { getWidthRange, getMarginRange } from "../utils/utilsFunctions";

function NormalSlider() {
  const [rightValue, setRightValue] = useState(1000);
  const [leftValue, setLeftValue] = useState(0);
  const [draggingLeft, setDraggingLeft] = useState(false);
  const [draggingRight, setDraggingRight] = useState(false);

  const handleMouseDownLeft = () => {
    setDraggingLeft(true);
  };

  const handleMouseDownRight = () => {
    setDraggingRight(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggingLeft) {
        const newValue = leftValue + e.movementX;
        if (newValue >= 0 && newValue < rightValue) {
          setLeftValue(newValue);
        }
      }
      if (draggingRight) {
        const newValue = rightValue - e.movementX;
        if (newValue > leftValue && newValue <= 1000) {
          setRightValue(newValue);
        }
      }
    };
    const handleMouseUp = () => {
      setDraggingLeft(false);
      setDraggingRight(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingLeft, draggingRight, leftValue, rightValue]);

  return (
    <div className="slider">
      <table >
        <tbody>
        <tr key="tr1">
          <td key="td1"><p className="numberSlice">{`${leftValue}`}</p></td>
          <td key="td2">
            <div className="divTrSlice">
              <button
                onMouseDown={handleMouseDownLeft}
                className="bullet bullet--left"
                style={{ marginLeft: getMarginRange(leftValue) }}
              >
                &#60;
              </button>
              <div className="bullet--line" />
              <div
                style={{
                  width: getWidthRange(rightValue, leftValue),
                  marginLeft: getMarginRange(leftValue),
                }}
                className="bullet--line2"
              />
              <button
                onMouseDown={handleMouseDownRight}
                className="bullet bullet--right"
                style={{ marginLeft: getMarginRange(rightValue) }}
              >
                &#62;
              </button>
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

