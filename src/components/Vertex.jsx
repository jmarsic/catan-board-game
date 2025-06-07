import { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext.jsx";

const Vertex = ({ vertex, style }) => {
  const { handleVertexClick } = useContext(BoardContext);

  const styles = {
    position: "absolute",
    width: "20px",
    height: "20px",
    backgroundColor: vertex.color || "transparent",
    cursor: "grab",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
    ...style,
  };

  return (
    <div
      className="vertex"
      style={styles}
      onClick={() => handleVertexClick(vertex.id)}
    >
      {vertex.buildingType === "city" ? "X" : ""}
    </div>
  );
};

export default Vertex;
