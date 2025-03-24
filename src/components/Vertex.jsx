import { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext";
import { PlayerContext } from "../contexts/PlayerContext";

const Vertex = ({ vertex, style }) => {
  const { buildSettlement } = useContext(BoardContext);
  const { currentPlayer } = useContext(PlayerContext);

  const styles = {
    position: "absolute",
    width: "20px",
    height: "20px",
    backgroundColor: "transparent",
    ...style,
  };

  return (
    <div
      className="vertex"
      style={styles}
      onClick={() => buildSettlement(vertex.id, currentPlayer)}
    ></div>
  );
};

export default Vertex;
