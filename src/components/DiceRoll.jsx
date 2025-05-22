import { useContext, useState } from "react";

import { BoardContext } from "../contexts/BoardContext";
import { PlayerContext } from "../contexts/PlayerContext";

import { generateRandomNumber } from "../utils/helpers";

const resourceMapping = {
  lightgreen: "wool",
  yellow: "grain",
  darkgreen: "lumber",
  grey: "ore",
  orange: "brick",
};

const DiceRoll = ({ hexData }) => {
  const { boardData, gamePhase } = useContext(BoardContext);
  const { playersData, addResources } = useContext(PlayerContext);
  console.log(playersData);

  const [dice, setDice] = useState({ d1: null, d2: null });

  const roll = () => {
    const d1 = generateRandomNumber();
    const d2 = generateRandomNumber();
    setDice({ d1, d2 });
    distribute(d1 + d2);
  };

  const distribute = (sum) => {
    console.log("--- boardData is: ", boardData);
    hexData.forEach((hex, idx) => {
      if (hex.number !== sum) return;
      const resource = resourceMapping[hex.color];
      console.log(resource);
      if (!resource) return;

      Object.values(boardData.vertices).forEach((v) => {
        if (!v.hexes.includes(idx + 1) || v.owner === null) return;
        const amount = v.buildingType === "city" ? 2 : 1;
        console.log(`Player ${v.owner} gets ${amount} ${resource}.`);
        addResources(v.owner, resource, amount);
      });
    });
  };

  return (
    <div>
      {gamePhase !== "main" ? (
        <p>Setup game..</p>
      ) : dice.d1 === null ? (
        <button onClick={roll}>Roll Dice</button>
      ) : (
        <div>
          <p>
            You rolled: {dice.d1} + {dice.d2} = {dice.d1 + dice.d2}
          </p>
          <button onClick={() => setDice({ d1: null, d2: null })}>
            Next player
          </button>
        </div>
      )}
      <div className="player-stats">
        {playersData.map((player) => (
          <div
            key={player.id}
            style={{
              border: `2px solid ${player.color}`,
              padding: "4px",
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
