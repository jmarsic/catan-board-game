import { useContext } from "react";
import { BoardContext } from "../contexts/BoardContext";

const Vertex = ({ vertex }) => {
  const { buildSettlement } = useContext(BoardContext);

  return (
    <div className="vertex" onClick={() => buildSettlement(vertex.id)}></div>
  );
};

export default Vertex;
