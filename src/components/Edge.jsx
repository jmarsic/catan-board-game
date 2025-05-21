import { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext";

const Edge = ({ edge, style, className }) => {
  const { handleEdgeClick } = useContext(BoardContext);

  const styles = {
    position: "absolute",
    width: "50px",
    height: "5px",
    backgroundColor: edge.color || "trasparent",
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
