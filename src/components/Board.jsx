import { useContext, useEffect, useState, useRef } from "react";

import Hex from "./Hex.jsx";
import Vertex from "./Vertex.jsx";

import { RowLayout } from "../constants/hexConstants.js";
import { PlayerContext } from "../contexts/PlayerContext.jsx";
import { BoardContext } from "../contexts/BoardContext.jsx";
import { generateVertexPositions } from "../utils/boardUtils.js";

const Board = ({ hexData }) => {
  const rowLayout = RowLayout;
  let startIndex = 0;

  const [vertexPositions, setVertexPositions] = useState([]);
  useEffect(() => {
    setVertexPositions(generateVertexPositions());
  }, []);

  const { currentPlayer, playersData } = useContext(PlayerContext);
  const { boardData } = useContext(BoardContext);
  console.log(playersData);
  console.log(boardData.vertices);

  return (
    <>
      <p className="active-player--text">{currentPlayer.name} turn:</p>
      <div style={{ position: "relative" }}>
        <div className="hex-grid">
          {rowLayout.map((hexCount, rowIndex) => {
            const rowClassName =
              rowIndex % 2 === 0 ? "hex-row" : "hex-row-offset";
            const rowHexes = hexData.slice(startIndex, startIndex + hexCount);
            startIndex += hexCount;

            return (
              <div key={rowIndex} className={rowClassName}>
                {rowHexes.map((hex, index) => (
                  <Hex key={index} number={hex.number} color={hex.color} />
                ))}
              </div>
            );
          })}
        </div>
        <div className="vertex-layer">
          {vertexPositions.map((vertex) => (
            <Vertex
              key={vertex.id}
              vertex={vertex}
              style={{ left: vertex.x, top: vertex.y }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
