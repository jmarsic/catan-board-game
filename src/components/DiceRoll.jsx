import { useContext, useState } from "react";

import { BoardContext } from "../contexts/BoardContext.jsx";
import { PlayerContext } from "../contexts/PlayerContext.jsx";

import { generateRandomNumber } from "../utils/helpers.js";

import sheepIcon from "../assets/icons/sheep.png";
import grainIcon from "../assets/icons/grain.png";
import woodIcon from "../assets/icons/wood.png";
import oreIcon from "../assets/icons/ore.png";
import brickIcon from "../assets/icons/brick.png";

const resourceIcons = {
  wool: sheepIcon,
  grain: grainIcon,
  lumber: woodIcon,
  ore: oreIcon,
  brick: brickIcon,
};

const DiceRoll = ({}) => {
  const { gamePhase, handleDiceRoll } = useContext(BoardContext);
  const { playersData, addResources, nextPlayer } = useContext(PlayerContext);
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
        <p className="roll-status">
          Click on vertex and then adjancent edge to build
        </p>
      ) : dice.d1 === null ? (
        <button className="roll-btn" onClick={roll}>
          Roll Dice
        </button>
      ) : (
        <div className="dice-wrapper">
          <div className="dice-results">
            <div className="die">{dice.d1}</div>
            <div className="die">{dice.d2}</div>
          </div>
          <button
            className="next-player-btn"
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
            <br />
            <span className="player-stats-about">
              Victory points: {player.points}
            </span>
            <ul className="player-stats-list">
              {Object.entries(player.resources).map(([res, qty]) => (
                <li key={res}>
                  <img
                    className="player-stats-list-icon"
                    src={resourceIcons[res]}
                    alt={res}
                  />
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
