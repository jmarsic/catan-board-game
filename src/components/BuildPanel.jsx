import { useContext, useEffect, useState } from "react";

import { PlayerContext } from "../contexts/PlayerContext.jsx";
import { BoardContext } from "../contexts/BoardContext.jsx";

const BuildPanel = () => {
  const { currentPlayer, playersData, canBuild, tradeBank } =
    useContext(PlayerContext);

  const { gamePhase, victimOptions, isStealing, stealFrom } =
    useContext(BoardContext);

  const [mode, setMode] = useState(null);
  const [giveResource, setGiveResource] = useState("wool");
  const [receiveResource, setReceiveResource] = useState("grain");
  const [tradeError, setTradeError] = useState("");

  useEffect(() => {
    setMode(null);
    setTradeError("");
  }, [currentPlayer.id]);

  if (isStealing && gamePhase === "main") {
    return (
      <div className="steal-panel">
        <h3>Choose a player to steal from:</h3>
        {victimOptions.map((pid) => {
          const p = playersData.find((p) => p.id === pid);
          return (
            <button
              className="steal-panel-btn"
              key={p.id}
              onClick={() => stealFrom(pid)}
              style={{
                margin: "6px",
                padding: "10px",
                backgroundColor: p.color,
              }}
            >
              {p.name}
            </button>
          );
        })}
      </div>
    );
  }
  if (gamePhase !== "main") return null;

  const allResources = ["wool", "grain", "lumber", "ore", "brick"];

  const handleTrade = () => {
    setTradeError("");
    if (giveResource === receiveResource) {
      setTradeError("Choose two different resources.");
      return false;
    }
    const success = tradeBank(currentPlayer.id, giveResource, receiveResource);
    if (!success) {
      setTradeError(`Not enough ${giveResource} to trade.`);
    }
  };

  return (
    <div className="build-panel">
      <h3 className="build-panel-player">
        {currentPlayer.name} resources & actions:
      </h3>
      <div className="build-panel-player-resources">
        {Object.entries(currentPlayer.resources).map(([res, qty]) => (
          <span key={res}>{`${res}: ${qty} `}</span>
        ))}
      </div>
      <button
        className="build-panel-btn"
        disabled={!canBuild(currentPlayer.id, "road")}
        onClick={() => setMode("road")}
      >
        Build Road
      </button>
      <button
        className="build-panel-btn"
        disabled={!canBuild(currentPlayer.id, "settlement")}
        onClick={() => setMode("settlement")}
      >
        Build Settlement
      </button>
      <p className="build-panel-info">
        To build a city, click on one of your settlements.
      </p>
      <div className="build-panel-trade-container">
        <h4 className="build-panel-trade-info">Trade 4:1 with Bank</h4>
        <div className="trade-wrapper">
          <label className="build-panel-label">
            Give:
            <select
              className="build-panel-select"
              value={giveResource}
              onChange={(e) => setGiveResource(e.target.value)}
            >
              {allResources.map((res) => (
                <option key={res} value={res}>
                  {res}
                </option>
              ))}
            </select>
          </label>
          <label className="build-panel-label" style={{ marginLeft: "10px" }}>
            Receive:
            <select
              className="build-panel-select"
              value={receiveResource}
              onChange={(e) => setReceiveResource(e.target.value)}
            >
              {allResources.map((res) => (
                <option key={res} value={res}>
                  {res}
                </option>
              ))}
            </select>
          </label>
          <button
            className="build-panel-trade-btn"
            disabled={
              giveResource === receiveResource ||
              currentPlayer.resources[giveResource] < 4
            }
            onClick={handleTrade}
          >
            Trade 4 : 1
          </button>
        </div>
        {tradeError && <p style={{ color: "yellow" }}>{tradeError}</p>}
      </div>
      {mode === "road" && (
        <p className="build-info-text">Click on an edge to build a road.</p>
      )}
      {mode === "settlement" && (
        <p className="build-info-text">
          Click on a vertex to build a settlement.
        </p>
      )}
    </div>
  );
};

export default BuildPanel;
