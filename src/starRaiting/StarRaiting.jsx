import { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

StarRaiting.propTypes = {
  maxRaiting: PropTypes.number,
  defaultRaiting: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.arrayOf(PropTypes.string),
  onSetRaiting: PropTypes.func,
  className: PropTypes.string,
};

function StarRaiting({
  maxRaiting = 5,
  defaultRaiting = 0,
  color = "#fcc419",
  size = 40,
  messages,
  onSetRaiting,
  className,
}) {
  const [raiting, setRaiting] = useState(
    defaultRaiting > maxRaiting ? maxRaiting : defaultRaiting
  );
  const [tempRaiting, setTempRaiting] = useState(0);

  const handleRaiting = (raiting) => {
    setRaiting(raiting);
    onSetRaiting(raiting);
  };
  const handleHover = (hovered) => {
    setTempRaiting(hovered);
  };

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRaiting }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRaiting(i + 1)}
            onHoverIn={() => handleHover(i + 1)}
            onHoverOut={() => handleHover(0)}
            color={color}
            size={size}
            full={tempRaiting ? tempRaiting >= i + 1 : raiting >= i + 1}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages?.length === maxRaiting
          ? messages[tempRaiting ? tempRaiting - 1 : raiting - 1]
          : tempRaiting || raiting || ""}
      </p>
    </div>
  );
}

export default StarRaiting;
