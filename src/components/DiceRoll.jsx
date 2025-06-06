import { useContext, useState } from "react";

import { BoardContext } from "../contexts/BoardContext.jsx";
import { PlayerContext } from "../contexts/PlayerContext.jsx";

import { generateRandomNumber } from "../utils/helpers.js";

const resourceMapping = {
  lightgreen: "wool",
  yellow: "grain",
  darkgreen: "lumber",
  grey: "ore",
  orange: "brick",
};

const DiceRoll = () => {
  const { gamePhase, handleDiceRoll } = useContext(BoardContext);
  const { playersData, nextPlayer } = useContext(PlayerContext);
  console.log(playersData);

  const [dice, setDice] = useState({ d1: null, d2: null });

  const roll = () => {
    const d1 = generateRandomNumber();
    const d2 = generateRandomNumber();
    setDice({ d1, d2 });
    handleDiceRoll(d1 + d2);
  };

  return (
    <div className="roll-wrapper">
      {gamePhase !== "main" ? (
        <p>Setup game..</p>
      ) : dice.d1 === null ? (
        <button onClick={roll}>Roll Dice</button>
      ) : (
        <div>
          <p>
            You rolled: {dice.d1} + {dice.d2} = {dice.d1 + dice.d2}
          </p>
          <button
            onClick={() => {
              setDice({ d1: null, d2: null });
              nextPlayer();
            }}
          >
            Next player
          </button>
        </div>
      )}
      <div className="player-stats-wrapper">
        {playersData.map((player) => (
          <div
            className="player-stats"
            key={player.id}
            style={{
              backgroundColor: "hwb(40 50% 10%)",
              border: `4px solid ${player.color}`,
              borderRadius: "8px",
              padding: "20px",
              margin: "4px",
            }}
          >
            <strong>{player.name}</strong>
            <ul>
              {Object.entries(player.resources).map(([res, qty]) => (
                <li key={res}>
                  {res} : {qty}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiceRoll;
