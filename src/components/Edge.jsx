import { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext";
import { PlayerContext } from "../contexts/PlayerContext";

const Edge = ({ edge }) => {
  const { buildRoad } = useContext(BoardContext);
  const { currentPlayer } = useContext(PlayerContext);

  return (
    <div
      className="edge"
      onClick={() => buildRoad(edge.id, currentPlayer)}
    ></div>
  );
};

export default Edge;
