import { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext";

const Vertex = ({ vertex, style }) => {
  const { handleVertexClick } = useContext(BoardContext);

  const styles = {
    position: "absolute",
    width: "20px",
    height: "20px",
    backgroundColor: vertex.color || "transparent",
    cursor: "grab",
    ...style,
  };

  return (
    <div
      className="vertex"
      style={styles}
      onClick={() => handleVertexClick(vertex.id)}
    ></div>
  );
};

export default Vertex;
