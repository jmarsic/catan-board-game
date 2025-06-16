import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  InitialPieces,
  PieceCost,
  DevelopmentCardCost,
} from "../constants/gameConstants.js";
import { shuffleArray } from "../utils/helpers.js";
import { toast } from "react-toastify";

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
        wool: 4,
        grain: 4,
        lumber: 0,
        ore: 4,
        brick: 0,
      },
      pieces: {
        roads: InitialPieces.roads,
        settlements: InitialPieces.settlements,
        cities: InitialPieces.cities,
      },
      points: 0,
      devCards: {
        unplayed: [],
        played: [],
      },
      knightsPlayed: 0,
    })
  );

  const initialPlayersDeck = [
    ...Array(2).fill("roadBuilding"),
    ...Array(5).fill("victoryPoint"),
    ...Array(5).fill("yearOfPlenty"),
    ...Array(8).fill("knight"),
  ];

  const [developmentDeck, setDevelopmentDeck] = useState(
    shuffleArray(initialPlayersDeck)
  );

  const [playersData, setPlayersData] = useState(initialPlayerStats);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const currentPlayer = playersData[currentPlayerIndex];
  const [largestArmyHolder, setLargestArmyHolder] = useState(null);

  const prevKnightsRef = useRef({});

  const nextPlayer = useCallback(
    () =>
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % numberOfPlayers),
    [numberOfPlayers]
  );

  const prevPlayer = useCallback(
    () =>
      setCurrentPlayerIndex((prevIndex) => (prevIndex - 1) % numberOfPlayers),
    [numberOfPlayers]
  );

  const addResources = useCallback((playerId, resourceType, amount) => {
    setPlayersData((prevData) =>
      prevData.map((p) =>
        p.id === playerId
          ? {
              ...p,
              resources: {
                ...p.resources,
                [resourceType]: p.resources[resourceType] + amount,
              },
            }
          : p
      )
    );
  }, []);

  const deductResources = useCallback((playerId, cost) => {
    setPlayersData((prevPlayer) =>
      prevPlayer.map((p) =>
        p.id === playerId
          ? {
              ...p,
              resources: Object.fromEntries(
                Object.entries(p.resources).map(([res, qty]) => [
                  res,
                  qty - (cost[res] || 0),
                ])
              ),
            }
          : p
      )
    );
  }, []);

  const updatePieces = useCallback((playerId, pieceType, delta) => {
    setPlayersData((prevPlayerData) =>
      prevPlayerData.map((p) =>
        p.id === playerId
          ? {
              ...p,
              pieces: {
                ...p.pieces,
                [pieceType]: p.pieces[pieceType] + delta,
              },
            }
          : p
      )
    );
  }, []);

  const addPoints = useCallback((playerId, delta) => {
    setPlayersData((prevData) =>
      prevData.map((p) =>
        p.id === playerId
          ? {
              ...p,
              points: p.points + delta,
            }
          : p
      )
    );
  }, []);

  const canBuild = useCallback(
    (playerId, pieceType) => {
      const player = playersData.find((p) => p.id === playerId);
      const cost = PieceCost[pieceType];

      if (!player || !cost) {
        console.log("No player or not enough");
        return false;
      }

      const pieceKey =
        pieceType === "city"
          ? "cities"
          : pieceType === "settlement"
          ? "settlements"
          : "roads";

      if (player.pieces[pieceKey] < 1) return false;

      return Object.entries(cost).every(
        ([res, qty]) => player.resources[res] >= qty
      );
    },
    [playersData]
  );

  const build = useCallback(
    (playerId, pieceType, options = {}) => {
      const { free = false } = options;

      if (!free) {
        if (!canBuild(playerId, pieceType)) return false;
        const cost = PieceCost[pieceType];
        deductResources(playerId, cost);
      }

      if (pieceType === "road") {
        updatePieces(playerId, "roads", -1);
      } else if (pieceType === "settlement") {
        updatePieces(playerId, "settlements", -1);
        addPoints(playerId, 1);
      } else if (pieceType === "city") {
        updatePieces(playerId, "cities", -1);
        updatePieces(playerId, "settlemnts", +1);
        addPoints(playerId, 1);
      }

      return true;
    },
    [canBuild, deductResources, updatePieces, addPoints]
  );

  const canBuyDevelopmentCard = useCallback(
    (playerId) => {
      const player = playersData.find((p) => p.id === playerId);
      if (!player) return false;
      return Object.entries(DevelopmentCardCost).every(
        ([res, qty]) => player.resources[res] >= qty
      );
    },
    [playersData]
  );

  const buyDevelopmentCard = useCallback(
    (playerId) => {
      const player = playersData.find((p) => p.id === playerId);

      if (!player) {
        console.log("Player not found.");
        return false;
      }

      if (developmentDeck.length === 0) {
        console.warn("Deck is empty!");
        return false;
      }

      if (!canBuyDevelopmentCard(playerId)) {
        console.log("Not enough resources for develompent card.");
        return false;
      }

      const cost = DevelopmentCardCost;
      deductResources(playerId, cost);

      const [drawn, ...rest] = developmentDeck;

      setDevelopmentDeck(rest);

      if (drawn === "victoryPoint") {
        addPoints(playerId, 1);
        setPlayersData((prevData) =>
          prevData.map((p) =>
            p.id === playerId
              ? {
                  ...p,
                  devCards: {
                    ...p.devCards,
                    played: [...p.devCards.played, drawn],
                  },
                }
              : p
          )
        );
      }

      setPlayersData((prevData) =>
        prevData.map((p) =>
          p.id === playerId
            ? {
                ...p,
                devCards: {
                  ...p.devCards,
                  unplayed: [...p.devCards.unplayed, drawn],
                },
              }
            : p
        )
      );

      return drawn;
    },
    [
      playersData,
      developmentDeck,
      deductResources,
      canBuyDevelopmentCard,
      addPoints,
    ]
  );

  const playDevelopmentCard = useCallback(
    (playerId, cardType, opts) => {
      setPlayersData((prevData) => {
        const updated = prevData.map((p) => {
          if (p.id !== playerId) return p;
          const idx = p.devCards.unplayed.indexOf(cardType);
          if (idx === -1) return p;
          const newUnplayed = [...p.devCards.unplayed];
          newUnplayed.splice(idx, 1);
          const newPlayed = [...p.devCards.played, cardType];
          return {
            ...p,
            devCards: { unplayed: newUnplayed, played: newPlayed },
          };
        });

        if (cardType === "buildRoad") {
          build(playerId, "road", { free: true });
          build(playerId, "road", { free: true });
        } else if (cardType === "victoryPoint") {
          addPoints(playerId, 1);
        } else if (cardType === "yearOfPlenty") {
          const [r1, r2] = opts;
          if (r1 === r2) {
            addResources(playerId, r1, 2);
          } else {
            addResources(playerId, r1, 1);
            addResources(playerId, r2, 1);
          }
        }

        return updated;
      });
    },
    [build, addPoints, addResources]
  );

  const removeRandomResource = useCallback(
    (playerId) => {
      const player = playersData.find((p) => p.id === playerId);

      if (!player) {
        console.log("Did not find any player!");
        return null;
      }

      const available = Object.entries(player.resources).filter(
        ([_, qty]) => qty > 0
      );

      if (available.length === 0) {
        console.log("No available resources from player.");
        return null;
      }

      const [resType] = available[Math.floor(Math.random() * available.length)];

      setPlayersData((prevData) =>
        prevData.map((p) =>
          p.id === playerId
            ? {
                ...p,
                resources: {
                  ...p.resources,
                  [resType]: p.resources[resType] - 1,
                },
              }
            : p
        )
      );

      return resType;
    },
    [playersData]
  );

  const discardHalfResources = useCallback(() => {
    setPlayersData((prevData) =>
      prevData.map((p) => {
        const totalResources = Object.values(p.resources).reduce(
          (sum, value) => sum + value,
          0
        );

        if (totalResources <= 7) return p;

        let toDiscard = Math.ceil(totalResources / 2);

        const newResources = { ...p.resources };

        while (toDiscard > 0) {
          const choices = Object.entries(newResources)
            .filter(([_, qty]) => qty > 0)
            .map(([resType]) => resType);

          if (choices.length === 0) break;

          const pick = choices[Math.floor(Math.random() * choices.length)];

          newResources[pick]--;
          toDiscard--;
        }

        return { ...p, resources: newResources };
      })
    );
  }, []);

  const tradeBank = useCallback(
    (playerId, giveResource, receiveResource) => {
      const player = playersData.find((p) => p.id === playerId);

      if (!player) return false;

      if (player.resources[giveResource] < 4) {
        console.log("Not enough resources for trade!");
        return false;
      }

      setPlayersData((prevData) =>
        prevData.map((p) =>
          p.id === playerId
            ? {
                ...p,
                resources: {
                  ...p.resources,
                  [giveResource]: p.resources[giveResource] - 4,
                  [receiveResource]: p.resources[receiveResource] + 1,
                },
              }
            : p
        )
      );

      return true;
    },
    [playersData]
  );

  const playKnightCard = useCallback((playerId) => {
    setPlayersData((prev) =>
      prev.map((p) =>
        p.id === playerId
          ? { ...p, knightsPlayed: (p.knightsPlayed || 0) + 1 }
          : p
      )
    );
  }, []);

  useEffect(() => {
    const prevKnights = prevKnightsRef.current;
    let newHolder = largestArmyHolder;
    let highestCount = prevKnights[largestArmyHolder] || 0;

    playersData.forEach((p) => {
      const curr = p.knightsPlayed || 0;
      const prev = prevKnights[p.id] || 0;

      if (prev < 3 && curr >= 3 && curr > highestCount) {
        highestCount = curr;
        newHolder = p.id;
      } else if (
        largestArmyHolder &&
        p.id !== largestArmyHolder &&
        curr >
          (playersData.find((x) => x.id === largestArmyHolder)?.knightsPlayed ||
            0) &&
        curr >= 3
      ) {
        highestCount = curr;
        newHolder = p.id;
      }
    });

    if (newHolder !== null && newHolder !== largestArmyHolder) {
      if (largestArmyHolder) addPoints(largestArmyHolder, -2);
      addPoints(newHolder, 2);

      const newcomer = playersData.find((p) => p.id === newHolder).name;
      if (!largestArmyHolder) {
        toast.success(`${newcomer} has earned the Largest Army bonus! +2 VP`);
      } else {
        const oldName = playersData.find(
          (p) => p.id === largestArmyHolder
        ).name;
        toast.info(
          `${newcomer} has taken Largest Army from ${oldName} and gained +2 VP`
        );
      }

      setLargestArmyHolder(newHolder);
    }

    const snapshot = {};
    playersData.forEach((p) => (snapshot[p.id] = p.knightsPlayed || 0));
    prevKnightsRef.current = snapshot;
  }, [playersData, largestArmyHolder, addPoints]);

  const cachedPlayerValues = useMemo(
    () => ({
      playersData,
      currentPlayer,
      largestArmyHolder,
      nextPlayer,
      prevPlayer,
      addResources,
      deductResources,
      updatePieces,
      addPoints,
      canBuild,
      build,
      canBuyDevelopmentCard,
      buyDevelopmentCard,
      playDevelopmentCard,
      playKnightCard,
      removeRandomResource,
      discardHalfResources,
      tradeBank,
    }),
    [
      playersData,
      currentPlayer,
      nextPlayer,
      prevPlayer,
      canBuild,
      build,
      canBuyDevelopmentCard,
      buyDevelopmentCard,
      playDevelopmentCard,
      removeRandomResource,
      discardHalfResources,
      tradeBank,
    ]
  );

  return (
    <PlayerContext.Provider value={cachedPlayerValues}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
