import { useEffect, useState } from "react";
import { getWidthRange, getMarginRange } from "../utils/utilsFunctions";

function NormalSlider() {
  const [rightValue, setRightValue] = useState(1000);
  const [leftValue, setLeftValue] = useState(0);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleLeftMouseUp = () => {
    setIsDraggingLeft(false);
  };

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleRightMouseUp = () => {
    setIsDraggingRight(false);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDraggingLeft) {
        const newLeftValue = Math.min(
          rightValue - 1,
          Math.max(0, Math.round((event.clientX - 10) / 10))
        );
        setLeftValue(newLeftValue);
      }
      if (isDraggingRight) {
        const newRightValue = Math.min(
          1000,
          Math.max(leftValue + 1, Math.round((event.clientX - 10) / 10))
        );
        setRightValue(newRightValue);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDraggingLeft, isDraggingRight]);

  return (
    <div className="slider">
      <table>
        <tbody>
          <tr key="tr1">
            <td key="td1">
              <p className="numberSlice">{`${leftValue}`}</p>
            </td>
            <td key="td2">
              <div className="divTrSlice">
                <button
                  title="leftBullet"
                  className="bullet bullet--left"
                  onMouseDown={handleLeftMouseDown}
                  onMouseUp={handleLeftMouseUp}
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
                  title="rightBullet"
                  className="bullet bullet--right"
                  onMouseDown={handleRightMouseDown}
                  onMouseUp={handleRightMouseUp}
                >
                  &#62;
                </button>
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
