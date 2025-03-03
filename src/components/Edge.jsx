import { useContext } from "react";
import { BoardContext } from "../contexts/BoardContext";

const Edge = ({ edge, onBuildRoad }) => {
  const { buildRoad } = useContext(BoardContext);

  return <div className="edge" onClick={() => buildRoad(edge.id)}></div>;
};

export default Edge;
