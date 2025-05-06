import { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext";
import { PlayerContext } from "../contexts/PlayerContext";

const Edge = ({ edge, style, className }) => {
  const { buildRoad } = useContext(BoardContext);
  const { currentPlayer } = useContext(PlayerContext);

  const styles = {
    position: "absolute",
    width: "50px",
    height: "5px",
    backgroundColor: "black",
    ...style,
  };

  return (
    <div
      className={className}
      style={styles}
      onClick={() => buildRoad(edge.id, currentPlayer)}
    ></div>
  );
};

export default Edge;
