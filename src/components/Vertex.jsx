import { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext";
import { PlayerContext } from "../contexts/PlayerContext";

const Vertex = ({ vertex }) => {
  const { buildSettlement } = useContext(BoardContext);
  const { currentPlayer } = useContext(PlayerContext);

  return (
    <div
      className="vertex"
      onClick={() => buildSettlement(vertex.id, currentPlayer)}
    ></div>
  );
};

export default Vertex;
