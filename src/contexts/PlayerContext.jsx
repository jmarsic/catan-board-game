import { createContext, useMemo, useState } from "react";

export const PlayerContext = createContext();

const PlayerProvider = ({ children, selectedPlayers }) => {
  const numberOfPlayers = Number(selectedPlayers);

  const playerColor = ["blue", "green", "white", "red"];

  const initialPlayerStats = Array.from(
    { length: numberOfPlayers },
    (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      color: playerColor[i],
      resources: {
        wool: 0,
        grain: 0,
        lumber: 0,
        ore: 0,
        brick: 0,
      },
      points: 0,
      cards: [],
    })
  );

  const [playersData, setPlayersData] = useState(initialPlayerStats);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const currentPlayer = playersData[currentPlayerIndex];

  const nextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % numberOfPlayers);
  };

  const prevPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex - 1) % numberOfPlayers);
  };

  const addResources = (playerId, resourceType, amount) => {
    setPlayersData((prevData) =>
      prevData.map((p) =>
        p.id === playerId
          ? {
              ...p,
              [resourceType]: p.resources[resourceType] + amount,
            }
          : p
      )
    );
  };

  const cachedPlayerValues = useMemo(
    () => ({
      playersData,
      currentPlayer,
      nextPlayer,
      prevPlayer,
      addResources,
    }),
    [playersData, currentPlayer]
  );

  return (
    <PlayerContext.Provider value={cachedPlayerValues}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
