import { useState, useEffect } from "react";

import Board from "./components/Board.jsx";
import Select from "./components/Select.jsx";

import { initialData } from "./data/initialHexData.js";

const initialState = initialData;
console.log(initialState);

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [hexData, setHexData] = useState(initialState);
  const [selectedPlayers, setSelectedPlayers] = useState("2");
  const [players, setPlayers] = useState();

  console.log(players);

  const startGame = () => {
    console.log(`Number of active players: ${selectedPlayers}`);
    const numberOfPlayers = Number(selectedPlayers);

    const initialPlayers = Array.from({ length: numberOfPlayers }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      resources: {
        brick: 0,
        lumber: 0,
        ore: 0,
        grain: 0,
        wool: 0,
      },
      points: 0,
      cards: [],
    }));
    setPlayers(initialPlayers);
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
        <>
          <h2 className="active-game--header">CATAN</h2>
          <h3 className="active-game--text">Trade, build, settle</h3>
          <p className="active-player--text">Player one:</p>
          <Board hexData={hexData} />
        </>
      )}
    </div>
  );
}

export default App;
