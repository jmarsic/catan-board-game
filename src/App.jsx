import { useState } from "react";

import Board from "./components/Board.jsx";
import Select from "./components/Select.jsx";
import DiceRoll from "./components/DiceRoll.jsx";
import BuildPanel from "./components/BuildPanel.jsx";

import BoardProvider from "./contexts/BoardContext.jsx";
import PlayerProvider from "./contexts/PlayerContext.jsx";

import { initialData } from "./data/initialHexData.js";

const initialState = initialData;
console.log(initialState);

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [hexData, setHexData] = useState(initialState);
  const [selectedPlayers, setSelectedPlayers] = useState("2");

  const startGame = () => {
    console.log(`Number of active players: ${selectedPlayers}`);
    setIsGameRunning(true);
  };

  return (
    <div className="main">
      {!isGameRunning && (
        <>
          <h1 className="main-header">CATAN</h1>
          <p className="main-text">Famous board game "Catan"</p>
          <form action={startGame} className="form">
            <label className="label-text" htmlFor="players">
              Please select number of players:
            </label>
            <Select
              options={["2", "3", "4"]}
              onSelect={(value) => setSelectedPlayers(value)}
            />
            <button className="main-start-btn" type="submit">
              Start Game
            </button>
          </form>
        </>
      )}
      {isGameRunning && (
        <PlayerProvider selectedPlayers={selectedPlayers}>
          <BoardProvider
            numberOfPlayers={Number(selectedPlayers)}
            hexData={hexData}
          >
            <h2 className="active-game--header">CATAN</h2>
            <h3 className="active-game--text">Trade, build, settle</h3>
            <Board hexData={hexData} />
            <BuildPanel />
            <DiceRoll />
          </BoardProvider>
        </PlayerProvider>
      )}
    </div>
  );
}

export default App;
