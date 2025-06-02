import { createContext, useContext, useMemo, useState } from "react";

import { PlayerContext } from "./PlayerContext.jsx";

import { initialBoardData } from "../data/initialBoardData.js";

export const BoardContext = createContext();

const resourceMapping = {
  lightgreen: "wool",
  yellow: "grain",
  darkgreen: "lumber",
  grey: "ore",
  orange: "brick",
};

const BoardProvider = ({ children, numberOfPlayers, hexData }) => {
  const {
    currentPlayer,
    nextPlayer,
    prevPlayer,
    addResources,
    updatePieces,
    addPoints,
    canBuild,
    build,
  } = useContext(PlayerContext);

  const [gamePhase, setGamePhase] = useState("setup");
  const [setupRound, setSetupRound] = useState(1);
  const [currentSetupPlayer, setCurrentSetupPlayer] = useState(0);
  const [setupStep, setSetupStep] = useState("settlement");
  const [lastSettlement, setLastSettlement] = useState(null);
  const [boardData, setBoardData] = useState(initialBoardData);

  const distributeInitial = (vertex, playerId) => {
    vertex.hexes.forEach((hexId) => {
      const hex = hexData.find((h) => h.id === hexId);
      if (!hex) return false;
      const resource = resourceMapping[hex.color];
      if (!resource) return false;
      addResources(playerId, resource, 1);
    });
  };

  const handleVertexClick = (vertexId) => {
    if (gamePhase === "setup" && setupStep === "settlement") {
      const success = buildSettlement(vertexId, currentPlayer);
      if (success) {
        setLastSettlement(vertexId);
        setSetupStep("road");
      }
      return success;
    }

    if (gamePhase === "main") {
      return buildSettlement(vertexId, currentPlayer);
    }

    return false;
  };

  const handleEdgeClick = (edgeId) => {
    if (gamePhase === "setup" && setupStep === "road") {
      const success = buildRoad(edgeId, currentPlayer);
      if (success) {
        setLastSettlement(null);
        nextSetupPlayer();
        setSetupStep("settlement");
      }
      return success;
    }

    if (gamePhase === "main") {
      return buildRoad(edgeId, currentPlayer);
    }

    return false;
  };

  const buildSettlement = (vertexId, player) => {
    console.log(`You clicked on vertex: ${vertexId}`);
    console.log(
      "Current boardDara.vertices keys: ",
      Object.keys(boardData.vertices)
    );
    const oldVertex = boardData.vertices[vertexId];
    if (!oldVertex) {
      console.warn(`--> vertexId ${vertexId} NOT FOUND in boardData.vertices!`);
      return false;
    }

    if (oldVertex.owner !== null) {
      console.log("Settlement is already occupied!");
      return false;
    }

    const blockedByEnemy = oldVertex.neighbours.some(
      (neigbourVertexId) =>
        boardData.vertices[neigbourVertexId].owner !== null &&
        boardData.vertices[neigbourVertexId].owner !== player.id
    );

    if (blockedByEnemy) {
      console.log("Too close to another player's settlement!");
      return false;
    }

    if (gamePhase === "main") {
      const touchingEdges = initialBoardData.vertices[vertexId].edges;
      const hasRoad = touchingEdges.some(
        (edgeId) => boardData.edges[edgeId].owner === player.id
      );
      const hasOwnNeighbourSettlement = oldVertex.neighbours.some(
        (neigbourVertexId) =>
          boardData.vertices[neigbourVertexId].owner === player.id
      );
      if (!hasRoad && !hasOwnNeighbourSettlement) {
        console.log("Must build next to your road or own settlement");
        return false;
      }
    }

    if (gamePhase === "setup") {
      updatePieces(player.id, "settlements", -1);
      addPoints(player.id, 1);
    } else {
      if (!build(player.id, "settlement")) return false;
    }

    const newVertex = {
      ...oldVertex,
      owner: player.id,
      color: player.color,
      buildingType: "settlement",
    };

    setBoardData((prevData) => ({
      ...prevData,
      vertices: {
        ...prevData.vertices,
        [vertexId]: newVertex,
      },
    }));

    if (gamePhase === "setup" && setupRound === 2) {
      distributeInitial(newVertex, player.id);
    }

    return true;
  };

  const canUpgradeAtVertex = (vertexId) => {
    if (!vertexId) return false;

    const vertex = boardData.vertices[vertexId];
    if (!vertex) return false;

    return (
      vertex.owner === currentPlayer.id &&
      vertex.buildingType === "settlement" &&
      canBuild(currentPlayer.id, "city")
    );
  };

  const handleUpgradeClick = (vertexId) => {
    if (!vertexId || !boardData.vertices[vertexId]) return false;

    const vertex = boardData.vertices[vertexId];

    if (!canUpgradeAtVertex(vertex)) {
      console.log("Can't upgrade to city!");
      return false;
    }

    if (!build(currentPlayer.id, "city")) {
      console.log("It must be your settlement!");
      return false;
    }

    setBoardData((prevData) => ({
      ...prevData,
      vertices: {
        ...prevData.vertices,
        [vertexId]: {
          ...vertex,
          buildingType: "city",
        },
      },
    }));
  };

  const buildRoad = (edgeId, player) => {
    console.log(`You clicked on road: ${edgeId}`);
    const edge = boardData.edges[edgeId];

    if (edge.owner !== null) {
      console.log("Edge is already occupied!");
      return false;
    }

    if (gamePhase === "setup" && setupStep === "road") {
      if (!edge.vertices.includes(lastSettlement)) {
        console.log("Road must attach to your last settlement!");
        return false;
      }
    } else if (gamePhase === "main") {
      const adjacentRoad = edge.neighbours.some(
        (neigbourEdgeId) => boardData.edges[neigbourEdgeId].owner === player.id
      );
      const [v1, v2] = edge.vertices;

      const adjacentSettlement =
        boardData.vertices[v1].owner === player.id ||
        boardData.vertices[v2].owner === player.id;

      if (!adjacentRoad && !adjacentSettlement) {
        console.log("Road must connect to your road or settlement");
        return false;
      }
    }

    if (gamePhase === "setup") {
      updatePieces(player.id, "roads", -1);
    } else {
      if (!build(player.id, "road")) return false;
    }

    setBoardData((prevData) => ({
      ...prevData,
      edges: {
        ...prevData.edges,
        [edgeId]: {
          ...prevData.edges[edgeId],
          owner: player.id,
          color: player.color,
        },
      },
    }));

    return true;
  };

  const nextSetupPlayer = () => {
    if (setupRound === 1) {
      if (currentSetupPlayer < numberOfPlayers - 1) {
        setCurrentSetupPlayer((prevPlayer) => prevPlayer + 1);
        nextPlayer();
      } else {
        setSetupRound(2);
        setCurrentSetupPlayer(numberOfPlayers - 1);
      }
    } else {
      if (currentSetupPlayer > 0) {
        setCurrentSetupPlayer((prevPlayer) => prevPlayer - 1);
        prevPlayer();
      } else {
        setGamePhase("main");
      }
    }
  };

  const cachedBoardValues = useMemo(
    () => ({
      gamePhase,
      setupRound,
      currentSetupPlayer,
      setupStep,
      nextSetupPlayer,
      boardData,
      buildSettlement,
      buildRoad,
      handleVertexClick,
      handleEdgeClick,
      canUpgradeAtVertex,
      handleUpgradeClick,
    }),
    [
      gamePhase,
      setupRound,
      currentSetupPlayer,
      setupStep,
      boardData,
      buildRoad,
      buildSettlement,
    ]
  );

  return (
    <BoardContext.Provider value={cachedBoardValues}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
