import { createContext, useMemo, useState } from "react";

export const PlayerContext = createContext();

const PlayerProvider = ({ children, selectedPlayers }) => {
  const numberOfPlayers = Number(selectedPlayers);

  const initialPlayerStats = Array.from(
    { length: numberOfPlayers },
    (_, i) => ({
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
    })
  );

  const [playersData, setPlayersData] = useState(initialPlayerStats);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const currentPlayer = playersData[currentPlayerIndex];

  const nextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % numberOfPlayers);
  };

  const cachedPlayerValues = useMemo(
    () => ({ playersData, currentPlayer, nextPlayer }),
    [playersData, currentPlayer]
  );

  return (
    <PlayerContext.Provider value={cachedPlayerValues}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
