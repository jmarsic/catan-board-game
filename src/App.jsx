import { useState } from "react";

import Board from "./components/Board.jsx";

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);

  const startGame = () => {
    console.log("Let's play!");
  };

  return (
    <div className="main">
      <h1 className="main-header">CATAN</h1>
      <p className="main-text">Famous board game "Catan"</p>
      <label className="label-text" htmlFor="players">
        Please select number of players:
      </label>
      <select className="select-dropdown" name="players" id="players">
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      {!isGameRunning && (
        <button className="main-start-btn" onClick={startGame}>
          Start Game
        </button>
      )}
      {isGameRunning && <Board />}
    </div>
  );
}

export default App;
