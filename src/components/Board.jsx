import { useContext } from "react";

import Hex from "./Hex.jsx";

import { PlayerContext } from "../contexts/PlayerContext.jsx";

const Board = ({ hexData }) => {
  const { currentPlayer, playersData } = useContext(PlayerContext);
  console.log(playersData);

  const rowLayout = [3, 4, 5, 4, 3];
  let startIndex = 0;

  return (
    <>
      <p className="active-player--text">{currentPlayer.name} turn:</p>
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
    </>
  );
};

export default Board;
