import { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext";

const Hex = ({ number, color, id }) => {
  const { robberHex } = useContext(BoardContext);

  const styles = {
    backgroundColor: color,
  };

  return (
    <div className={`hexagone ${color}`} style={styles}>
      {number}
      {robberHex === id && (
        <div
          style={{
            position: "absolute",
            top: -10,
            left: 50,
            transform: "translateX(-50%)",
            width: "20px",
            height: "20px",
            backgroundColor: "black",
            borderRadius: "50%",
            opacity: 0.7,
          }}
        ></div>
      )}
    </div>
  );
};

export default Hex;
