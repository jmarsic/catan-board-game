import { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext.jsx";

const Edge = ({ edge, style, className }) => {
  const { handleEdgeClick } = useContext(BoardContext);

  const styles = {
    position: "absolute",
    width: "50px",
    height: "8px",
    backgroundColor: edge.color || "transparent",
    cursor: "grab",
    ...style,
  };

  return (
    <div
      className={className}
      style={styles}
      onClick={() => handleEdgeClick(edge.id)}
    ></div>
  );
};

export default Edge;
