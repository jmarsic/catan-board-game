import { useState, useEffect } from "react";

import Board from "./components/Board.jsx";

import { initialData } from "./data/initialHexData.js";

const initialState = initialData;
console.log(initialState);

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [hexData, setHexData] = useState(initialData);

  const startGame = () => {
    console.log("Let's play!");
    setIsGameRunning(true);
  };

  return (
    <div className="main">
      <h1 className="main-header">CATAN</h1>
      {!isGameRunning && (
        <>
          <p className="main-text">Famous board game "Catan"</p>
          <label className="label-text" htmlFor="players">
            Please select number of players:
          </label>
          <select className="select-dropdown" name="players" id="players">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <button className="main-start-btn" onClick={startGame}>
            Start Game
          </button>
        </>
      )}
      {isGameRunning && (
        <>
          <p className="main-text">Player one:</p>
          <Board hexData={hexData} />
        </>
      )}
    </div>
  );
}

export default App;
