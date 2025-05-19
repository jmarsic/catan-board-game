import { createContext, useContext, useMemo, useState } from "react";
import { PlayerContext } from "./PlayerContext";

export const BoardContext = createContext();

const BoardProvider = ({ children, numberOfPlayers }) => {
  const { currentPlayer, nextPlayer, prevPlayer } = useContext(PlayerContext);

  const [gamePhase, setGamePhase] = useState("setup");
  const [setupRound, setSetupRound] = useState(1);
  const [currentSetupPlayer, setCurrentSetupPlayer] = useState(0);
  const [setupStep, setSetupStep] = useState("settlement");

  const [boardData, setBoardData] = useState({
    vertices: {
      v1: { id: "v1", hexes: [1], owner: null, neighbours: ["v2", "v9"] },
      v2: { id: "v2", hexes: [1], owner: null, neighbours: ["v1", "v3"] },
      v3: {
        id: "v3",
        hexes: [1, 2],
        owner: null,
        neighbours: ["v2", "v4", "v11"],
      },
      v4: { id: "v4", hexes: [2], owner: null, neighbours: ["v3", "v5"] },
      v5: {
        id: "v5",
        hexes: [2, 3],
        owner: null,
        neighbours: ["v4", "v6", "v13"],
      },
      v6: {
        id: "v6",
        hexes: [3],
        owner: null,
        neighbours: ["v5", "v7"],
      },
      v7: { id: "v7", hexes: [3], owner: null, neighbours: ["v6", "v15"] },
      v8: {
        id: "v8",
        hexes: [4],
        owner: null,
        neighbours: ["v9", "v18"],
      },
      v9: {
        id: "v9",
        hexes: [1, 4],
        owner: null,
        neighbours: ["v1", "v8", "v10"],
      },
      v10: {
        id: "v10",
        hexes: [1, 4, 5],
        owner: null,
        neighbours: ["v9", "v11", "v20"],
      },
      v11: {
        id: "v11",
        hexes: [1, 2, 5],
        owner: null,
        neighbours: ["v3", "v10", "v12"],
      },
      v12: {
        id: "v12",
        hexes: [2, 5, 6],
        owner: null,
        neighbours: ["v11", "v13", "v22"],
      },
      v13: {
        id: "v13",
        hexes: [2, 3, 6],
        owner: null,
        neighbours: ["v5", "v12", "v14"],
      },
      v14: {
        id: "v14",
        hexes: [3, 6, 7],
        owner: null,
        neighbours: ["v13", "v15", "v24"],
      },
      v15: {
        id: "v15",
        hexes: [3, 7],
        owner: null,
        neighbours: ["v7", "v14", "v16"],
      },
      v16: { id: "v16", hexes: [7], owner: null, neighbours: ["v15", "v26"] },
      v17: {
        id: "v17",
        hexes: [8],
        owner: null,
        neighbours: ["v18", "v28"],
      },
      v18: {
        id: "v18",
        hexes: [4, 8],
        owner: null,
        neighbours: ["v8", "v17", "v19"],
      },
      v19: {
        id: "v19",
        hexes: [4, 8, 9],
        owner: null,
        neighbours: ["v18", "v20", "v30"],
      },
      v20: {
        id: "v20",
        hexes: [4, 5, 9],
        owner: null,
        neighbours: ["v10", "v19", "v21"],
      },
      v21: {
        id: "v21",
        hexes: [5, 9, 10],
        owner: null,
        neighbours: ["v20", "v22", "v32"],
      },
      v22: {
        id: "v22",
        hexes: [5, 6, 10],
        owner: null,
        neighbours: ["v12", "v21", "v23"],
      },
      v23: {
        id: "v23",
        hexes: [6, 10, 11],
        owner: null,
        neighbours: ["v22", "v24", "v34"],
      },
      v24: {
        id: "v24",
        hexes: [6, 7, 11],
        owner: null,
        neighbours: ["v14", "v23", "v25"],
      },
      v25: {
        id: "v25",
        hexes: [7, 11, 12],
        owner: null,
        neighbours: ["v24", "v26", "v36"],
      },
      v26: {
        id: "v26",
        hexes: [7, 12],
        owner: null,
        neighbours: ["v16", "v25", "v27"],
      },
      v27: { id: "v27", hexes: [12], owner: null, neighbours: ["v26", "v38"] },
      v28: { id: "v28", hexes: [8], owner: null, neighbours: ["v17", "v29"] },
      v29: {
        id: "v29",
        hexes: [8, 13],
        owner: null,
        neighbours: ["v28", "v30", "v39"],
      },
      v30: {
        id: "v30",
        hexes: [8, 9, 13],
        owner: null,
        neighbours: ["v19", "v29", "v31"],
      },
      v31: {
        id: "v31",
        hexes: [9, 13, 14],
        owner: null,
        neighbours: ["v30", "v32", "v41"],
      },
      v32: {
        id: "v32",
        hexes: [9, 10, 14],
        owner: null,
        neighbours: ["v21", "v31", "v33"],
      },
      v33: {
        id: "v33",
        hexes: [10, 14, 15],
        owner: null,
        neighbours: ["v32", "v34", "v43"],
      },
      v34: {
        id: "v34",
        hexes: [10, 11, 15],
        owner: null,
        neighbours: ["v23", "v33", "v35"],
      },
      v35: {
        id: "v35",
        hexes: [11, 15, 16],
        owner: null,
        neighbours: ["v34", "v36", "v45"],
      },
      v36: {
        id: "v36",
        hexes: [11, 12, 16],
        owner: null,
        neighbours: ["v25", "v35", "v37"],
      },
      v37: {
        id: "v37",
        hexes: [12, 16],
        owner: null,
        neighbours: ["v36", "v38", "v47"],
      },
      v38: {
        id: "v38",
        hexes: [12],
        owner: null,
        neighbours: ["v27", "v37"],
      },
      v39: { id: "v39", hexes: [13], owner: null, neighbours: ["v29", "v40"] },
      v40: {
        id: "v40",
        hexes: [13, 17],
        owner: null,
        neighbours: ["v39", "v41", "v48"],
      },
      v41: {
        id: "v41",
        hexes: [13, 14, 17],
        owner: null,
        neighbours: ["v31", "v40", "v42"],
      },
      v42: {
        id: "v42",
        hexes: [14, 17, 18],
        owner: null,
        neighbours: ["v41", "v43", "v50"],
      },
      v43: {
        id: "v43",
        hexes: [14, 15, 18],
        owner: null,
        neighbours: ["v33", "v42", "v44"],
      },
      v44: {
        id: "v44",
        hexes: [15, 18, 19],
        owner: null,
        neighbours: ["v43", "v45", "v52"],
      },
      v45: {
        id: "v45",
        hexes: [15, 16, 19],
        owner: null,
        neighbours: ["v35", "v44", "v46"],
      },
      v46: {
        id: "v46",
        hexes: [16, 19],
        owner: null,
        neighbours: ["v45", "v47", "v54"],
      },
      v47: {
        id: "v47",
        hexes: [16],
        owner: null,
        neighbours: ["v37", "v46"],
      },
      v48: { id: "v48", hexes: [17], owner: null, neighbours: ["v40", "v49"] },
      v49: {
        id: "v49",
        hexes: [17],
        owner: null,
        neighbours: ["v48", "v50"],
      },
      v50: {
        id: "v50",
        hexes: [17, 18],
        owner: null,
        neighbours: ["v42", "v49", "v51"],
      },
      v51: { id: "v51", hexes: [18], owner: null, neighbours: ["v50", "v52"] },
      v52: {
        id: "v52",
        hexes: [18, 19],
        owner: null,
        neighbours: ["v44", "v51", "v53"],
      },
      v53: { id: "v53", hexes: [19], owner: null, neighbours: ["v52", "v54"] },
      v54: { id: "v54", hexes: [19], owner: null, neighbours: ["v46", "v53"] },
    },

    edges: {
      e1: {
        id: "e1",
        hexes: [1],
        owner: null,
        neighbours: ["e2", "e7"],
        vertices: ["v1", "v2"],
      },
      e2: {
        id: "e2",
        hexes: [1],
        owner: null,
        neighbours: ["e1", "e3", "e8"],
        vertices: ["v2", "v3"],
      },
      e3: {
        id: "e3",
        hexes: [2],
        owner: null,
        neighbours: ["e2", "e4", "e8"],
        vertices: ["v3", "v4"],
      },
      e4: {
        id: "e4",
        hexes: [2],
        owner: null,
        neighbours: ["e3", "e5", "e9"],
        vertices: ["v4", "v5"],
      },
      e5: {
        id: "e5",
        hexes: [3],
        owner: null,
        neighbours: ["e4", "e6", "e9"],
        vertices: ["v5", "v6"],
      },
      e6: {
        id: "e6",
        hexes: [3],
        owner: null,
        neighbours: ["e5", "e10"],
        vertices: ["v6", "v7"],
      },
      e7: {
        id: "e7",
        hexes: [1],
        owner: null,
        neighbours: ["e1", "e11", "e12"],
        vertices: ["v1", "v9"],
      },
      e8: {
        id: "e8",
        hexes: [1, 2],
        owner: null,
        neighbours: ["e2", "e3", "e13", "e14"],
        vertices: ["v3", "v11"],
      },
      e9: {
        id: "e9",
        hexes: [2, 3],
        owner: null,
        neighbours: ["e4", "e5", "e15", "e16"],
        vertices: ["v5", "v13"],
      },
      e10: {
        id: "e10",
        hexes: [3],
        owner: null,
        neighbours: ["e6", "e17", "e18"],
        vertices: ["v7", "v15"],
      },
      e11: {
        id: "e11",
        hexes: [4],
        owner: null,
        neighbours: ["e7", "e12", "e19"],
        vertices: ["v8", "v9"],
      },
      e12: {
        id: "e12",
        hexes: [1, 4],
        owner: null,
        neighbours: ["e7", "e11", "e13", "e20"],
        vertices: ["v9", "v10"],
      },
      e13: {
        id: "e13",
        hexes: [1, 5],
        owner: null,
        neighbours: ["e8", "e12", "e14", "e20"],
        vertices: ["v10", "v11"],
      },
      e14: {
        id: "e14",
        hexes: [2, 5],
        owner: null,
        neighbours: ["e8", "e13", "e15", "e21"],
        vertices: ["v11", "v12"],
      },
      e15: {
        id: "e15",
        hexes: [2, 6],
        owner: null,
        neighbours: ["e9", "e14", "e16", "e21"],
        vertices: ["v12", "v13"],
      },
      e16: {
        id: "e16",
        hexes: [3, 6],
        owner: null,
        neighbours: ["e9", "e15", "e17", "e22"],
        vertices: ["v13", "v14"],
      },
      e17: {
        id: "e17",
        hexes: [3, 7],
        owner: null,
        neighbours: ["e10", "e16", "e18", "e22"],
        vertices: ["v14", "v15"],
      },
      e18: {
        id: "e18",
        hexes: [7],
        owner: null,
        neighbours: ["e10", "e17", "e23"],
        vertices: ["v15", "v16"],
      },
      e19: {
        id: "e19",
        hexes: [4],
        owner: null,
        neighbours: ["e11", "e24", "e25"],
        vertices: ["v8", "v18"],
      },
      e20: {
        id: "e20",
        hexes: [4, 5],
        owner: null,
        neighbours: ["e12", "e13", "e26", "e27"],
        vertices: ["v10", "v20"],
      },
      e21: {
        id: "e21",
        hexes: [5, 6],
        owner: null,
        neighbours: ["e14", "e15", "e28", "e29"],
        vertices: ["v12", "v22"],
      },
      e22: {
        id: "e22",
        hexes: [6, 7],
        owner: null,
        neighbours: ["e16", "e17", "e30", "e31"],
        vertices: ["v14", "v24"],
      },
      e23: {
        id: "e23",
        hexes: [7],
        owner: null,
        neighbours: ["e18", "e32", "e33"],
        vertices: ["v16", "v26"],
      },
      e24: {
        id: "e24",
        hexes: [8],
        owner: null,
        neighbours: ["e19", "e25", "e34"],
        vertices: ["v17", "v18"],
      },
      e25: {
        id: "e25",
        hexes: [4, 8],
        owner: null,
        neighbours: ["e19", "e24", "e26", "e35"],
        vertices: ["v18", "v19"],
      },
      e26: {
        id: "e26",
        hexes: [4, 9],
        owner: null,
        neighbours: ["e20", "e25", "e27", "e35"],
        vertices: ["v19", "v20"],
      },
      e27: {
        id: "e27",
        hexes: [5, 9],
        owner: null,
        neighbours: ["e20", "e26", "e28", "e36"],
        vertices: ["v20", "v21"],
      },
      e28: {
        id: "e28",
        hexes: [5, 10],
        owner: null,
        neighbours: ["e21", "e27", "e29", "e36"],
        vertices: ["v21", "v22"],
      },
      e29: {
        id: "e29",
        hexes: [6, 10],
        owner: null,
        neighbours: ["e21", "e28", "e30", "e37"],
        vertices: ["v22", "v23"],
      },
      e30: {
        id: "e30",
        hexes: [6, 11],
        owner: null,
        neighbours: ["e22", "e29", "e31", "e37"],
        vertices: ["v23", "v24"],
      },
      e31: {
        id: "e31",
        hexes: [7, 11],
        owner: null,
        neighbours: ["e22", "e30", "e32", "e38"],
        vertices: ["v24", "v25"],
      },
      e32: {
        id: "e32",
        hexes: [7, 12],
        owner: null,
        neighbours: ["e23", "e31", "e33", "e38"],
        vertices: ["v25", "v26"],
      },
      e33: {
        id: "e33",
        hexes: [12],
        owner: null,
        neighbours: ["e23", "e32", "e39"],
        vertices: ["v26", "v27"],
      },
      e34: {
        id: "e34",
        hexes: [8],
        owner: null,
        neighbours: ["e24", "e40"],
        vertices: ["v17", "v28"],
      },
      e35: {
        id: "e35",
        hexes: [8, 9],
        owner: null,
        neighbours: ["e25", "e26", "e41", "e42"],
        vertices: ["v19", "v30"],
      },
      e36: {
        id: "e36",
        hexes: [9, 10],
        owner: null,
        neighbours: ["e27", "e28", "e43", "e44"],
        vertices: ["v21", "v32"],
      },
      e37: {
        id: "e37",
        hexes: [10, 11],
        owner: null,
        neighbours: ["e29", "e30", "e45", "e46"],
        vertices: ["v23", "v34"],
      },
      e38: {
        id: "e38",
        hexes: [11, 12],
        owner: null,
        neighbours: ["e31", "e32", "e47", "e48"],
        vertices: ["v25", "v36"],
      },
      e39: {
        id: "e39",
        hexes: [12],
        owner: null,
        neighbours: ["e33", "e49"],
        vertices: ["v27", "v38"],
      },
      e40: {
        id: "e40",
        hexes: [8],
        owner: null,
        neighbours: ["e34", "e41", "e50"],
        vertices: ["v28", "v29"],
      },
      e41: {
        id: "e41",
        hexes: [8, 13],
        owner: null,
        neighbours: ["e35", "e40", "e42", "e50"],
        vertices: ["v29", "v30"],
      },
      e42: {
        id: "e42",
        hexes: [9, 13],
        owner: null,
        neighbours: ["e35", "e41", "e43", "e51"],
        vertices: ["v30", "v31"],
      },
      e43: {
        id: "e43",
        hexes: [9, 14],
        owner: null,
        neighbours: ["e36", "e42", "e44", "e51"],
        vertices: ["v31", "v32"],
      },
      e44: {
        id: "e44",
        hexes: [10, 14],
        owner: null,
        neighbours: ["e36", "e43", "e45", "e52"],
        vertices: ["v32", "v33"],
      },
      e45: {
        id: "e45",
        hexes: [10, 15],
        owner: null,
        neighbours: ["e37", "e44", "e46", "e52"],
        vertices: ["v33", "v34"],
      },
      e46: {
        id: "e46",
        hexes: [11, 15],
        owner: null,
        neighbours: ["e37", "e45", "e47", "e53"],
        vertices: ["v34", "v35"],
      },
      e47: {
        id: "e47",
        hexes: [11, 16],
        owner: null,
        neighbours: ["e38", "e46", "e48", "e53"],
        vertices: ["v35", "v36"],
      },
      e48: {
        id: "e48",
        hexes: [12, 16],
        owner: null,
        neighbours: ["e38", "e47", "e49", "e54"],
        vertices: ["v36", "v37"],
      },
      e49: {
        id: "e49",
        hexes: [12],
        owner: null,
        neighbours: ["e39", "e48", "e54"],
        vertices: ["v37", "v38"],
      },
      e50: {
        id: "e50",
        hexes: [13],
        owner: null,
        neighbours: ["e40", "e41", "e55"],
        vertices: ["v29", "v39"],
      },
      e51: {
        id: "e51",
        hexes: [13, 14],
        owner: null,
        neighbours: ["e42", "e43", "e56", "e57"],
        vertices: ["v31", "v41"],
      },
      e52: {
        id: "e52",
        hexes: [14, 15],
        owner: null,
        neighbours: ["e44", "e45", "e58", "e59"],
        vertices: ["v33", "v43"],
      },
      e53: {
        id: "e53",
        hexes: [15, 16],
        owner: null,
        neighbours: ["e46", "e47", "e60", "e61"],
        vertices: ["v35", "v45"],
      },
      e54: {
        id: "e54",
        hexes: [16],
        owner: null,
        neighbours: ["e48", "e49", "e62"],
        vertices: ["v37", "v47"],
      },
      e55: {
        id: "e55",
        hexes: [13],
        owner: null,
        neighbours: ["e50", "e56", "e63"],
        vertices: ["v39", "v40"],
      },
      e56: {
        id: "e56",
        hexes: [13, 17],
        owner: null,
        neighbours: ["e51", "e55", "e57", "e63"],
        vertices: ["v40", "v41"],
      },
      e57: {
        id: "e57",
        hexes: [14, 17],
        owner: null,
        neighbours: ["e51", "e56", "e58", "e64"],
        vertices: ["v41", "v42"],
      },
      e58: {
        id: "e58",
        hexes: [14, 18],
        owner: null,
        neighbours: ["e52", "e57", "e59", "e64"],
        vertices: ["v42", "v43"],
      },
      e59: {
        id: "e59",
        hexes: [15, 18],
        owner: null,
        neighbours: ["e52", "e58", "e60", "e65"],
        vertices: ["v43", "v44"],
      },
      e60: {
        id: "e60",
        hexes: [15, 19],
        owner: null,
        neighbours: ["e53", "e59", "e61", "e65"],
        vertices: ["v44", "v45"],
      },
      e61: {
        id: "e61",
        hexes: [16, 19],
        owner: null,
        neighbours: ["e53", "e60", "e62", "e66"],
        vertices: ["v45", "v46"],
      },
      e62: {
        id: "e62",
        hexes: [16],
        owner: null,
        neighbours: ["e54", "e61", "e66"],
        vertices: ["v46", "v47"],
      },
      e63: {
        id: "e63",
        hexes: [17],
        owner: null,
        neighbours: ["e55", "e56", "e67"],
        vertices: ["v40", "v48"],
      },
      e64: {
        id: "e64",
        hexes: [17, 18],
        owner: null,
        neighbours: ["e57", "e58", "e68", "e69"],
        vertices: ["v42", "v50"],
      },
      e65: {
        id: "e65",
        hexes: [18, 19],
        owner: null,
        neighbours: ["e59", "e60", "e70", "e71"],
        vertices: ["v44", "v52"],
      },
      e66: {
        id: "e66",
        hexes: [19],
        owner: null,
        neighbours: ["e61", "e62", "e72"],
        vertices: ["v46", "v54"],
      },
      e67: {
        id: "e67",
        hexes: [17],
        owner: null,
        neighbours: ["e63", "e68"],
        vertices: ["v48", "v49"],
      },
      e68: {
        id: "e68",
        hexes: [17],
        owner: null,
        neighbours: ["e64", "e67", "e69"],
        vertices: ["v49", "v50"],
      },
      e69: {
        id: "e69",
        hexes: [18],
        owner: null,
        neighbours: ["e64", "e68", "e70"],
        vertices: ["v50", "v51"],
      },
      e70: {
        id: "e70",
        hexes: [18],
        owner: null,
        neighbours: ["e65", "e69", "e71"],
        vertices: ["v51", "v52"],
      },
      e71: {
        id: "e71",
        hexes: [19],
        owner: null,
        neighbours: ["e65", "e70", "e72"],
        vertices: ["v52", "v53"],
      },
      e72: {
        id: "e72",
        hexes: [19],
        owner: null,
        neighbours: ["e66", "e71"],
        vertices: ["v53", "v54"],
      },
    },
  });

  const handleVertexClick = (vertexId) => {
    if (gamePhase !== "setup" || setupStep !== "settlement") return;
    buildSettlement(vertexId, currentPlayer);
    setSetupStep("road");
  };

  const handleEdgeClick = (edgeId) => {
    if (gamePhase !== "setup" || setupStep !== "road") return;
    buildRoad(edgeId, currentPlayer);
    nextSetupPlayer();
    setSetupStep("settlement");
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

  const buildSettlement = (vertexId, player) => {
    console.log(`You clicked on vertex: ${vertexId}`);
    const vertex = boardData.vertices[vertexId];

    if (vertex.owner !== null) {
      console.log("Settlement is already occupied!");
      return;
    }

    const hasNeighbours = vertex.neighbours.some(
      (neighbourId) => boardData.vertices[neighbourId].owner !== null
    );

    if (hasNeighbours) {
      console.log(
        "Cannot be built! Settlement must be at least 1 space away from other player's settlement."
      );
      return;
    }

    setBoardData((prevData) => ({
      ...prevData,
      vertices: {
        ...prevData.vertices,
        [vertexId]: {
          ...prevData.vertices[vertexId],
          owner: player.id,
          color: player.color,
        },
      },
    }));
  };

  const buildRoad = (edgeId, player) => {
    console.log(`You clicked on road: ${edgeId}`);
    const edge = boardData.edges[edgeId];

    if (edge.owner !== null) {
      console.log("Edge is already occupied!");
      return;
    }

    const hasNeighbours = edge.neighbours.some(
      (edgeId) => boardData.edges[edgeId].owner !== null
    );

    if (hasNeighbours) {
      console.log(
        "A road cannot be built, it must be at least 1 space away from other player's road. "
      );
      return;
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
    }),
    [gamePhase, setupRound, currentSetupPlayer, setupStep]
  );

  return (
    <BoardContext.Provider value={cachedBoardValues}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
