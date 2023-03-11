function NormalSlider() {
  const [rightValue, setRightValue] = useState(1000);
  const [leftValue, setLeftValue] = useState(0);
  const [draggingLeft, setDraggingLeft] = useState(false);
  const [draggingRight, setDraggingRight] = useState(false);
  const [mousePos, setMousePos] = useState(0);

  const handleMouseDownLeft = (e) => {
    setDraggingLeft(true);
    setMousePos(e.clientX);
  };

  const handleMouseDownRight = (e) => {
    setDraggingRight(true);
    setMousePos(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggingLeft) {
        const diff = e.clientX - mousePos;
        const newLeft = Math.min(Math.max(leftValue + diff, 0), rightValue);
        setLeftValue(newLeft);
        setMousePos(e.clientX);
      }
      if (draggingRight) {
        const diff = e.clientX - mousePos;
        const newRight = Math.min(Math.max(rightValue + diff, leftValue), 1000);
        setRightValue(newRight);
        setMousePos(e.clientX);
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
  }, [draggingLeft, draggingRight, leftValue, rightValue, mousePos]);

  return (
    <div className="slider">
      <p className="numberSlice">{`${leftValue}`}</p>

      <div className="divTrSlice">
        <button
          onMouseDown={handleMouseDownLeft}
          className="bullet bullet--left"
          style={{ marginLeft: getMarginRange(leftValue) }}
        >
          x
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
          x
        </button>
      </div>
      <p className="numberSlice">{`${rightValue}`}</p>
    </div>
  );
}

