import { useContext, useEffect, useState } from "react";

import Hex from "./Hex.jsx";
import Vertex from "./Vertex.jsx";
import Edge from "./Edge.jsx";

import { RowLayout } from "../constants/hexConstants.js";
import { PlayerContext } from "../contexts/PlayerContext.jsx";
import { BoardContext } from "../contexts/BoardContext.jsx";
import {
  generateUniqueRoads,
  generateVertexPositions,
} from "../utils/boardUtils.js";

const Board = ({ hexData }) => {
  const { currentPlayer, playersData } = useContext(PlayerContext);
  const { boardData, gamePhase } = useContext(BoardContext);

  const rowLayout = RowLayout;
  let startIndex = 0;

  const [vertexPositions, setVertexPositions] = useState([]);
  const [edgesPositions, setEdgesPositions] = useState([]);

  useEffect(() => {
    setVertexPositions(generateVertexPositions());
    setEdgesPositions(generateUniqueRoads());
  }, [generateVertexPositions]);

  return (
    <>
      {gamePhase === "setup" ? (
        <p className="active-player--text">{currentPlayer.name} setup:</p>
      ) : (
        <p className="active-player--text">{currentPlayer.name} turn:</p>
      )}
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
          {vertexPositions.map((vertex) => {
            const vState = boardData.vertices[vertex.id];
            return (
              <Vertex
                key={vertex.id}
                vertex={vState}
                style={{ left: vertex.x, top: vertex.y, color: vertex.color }}
              />
            );
          })}
        </div>
        <div>
          {edgesPositions.map((edge) => {
            const eState = boardData.edges[edge.id];
            return (
              <Edge
                key={edge.id}
                className={edge.className}
                edge={eState}
                style={{ left: edge.x, top: edge.y }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Board;
