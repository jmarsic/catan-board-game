import { createContext, useMemo, useState } from "react";

export const BoardContext = createContext();

const BoardProvider = () => {
  const [boardData, setBoardData] = useState({
    vertices: {
      v1: { id: "v1", hexes: [1], owner: null, neighbours: ["v4", "v5"] },
      v2: { id: "v2", hexes: [2], owner: null, neighbours: ["v5", "v6"] },
      v3: { id: "v3", hexes: [3], owner: null, neighbours: ["v6", "v7"] },
      v4: { id: "v4", hexes: [1], owner: null, neighbours: ["v1", "v8"] },
      v5: {
        id: "v5",
        hexes: [1, 2],
        owner: null,
        neighbours: ["v1", "v2", "v9"],
      },
      v6: {
        id: "v6",
        hexes: [2, 3],
        owner: null,
        neighbours: ["v2", "v3", "v10"],
      },
      v7: { id: "v7", hexes: [3], owner: null, neighbours: ["v3", "v11"] },
      v8: {
        id: "v8",
        hexes: [1, 4],
        owner: null,
        neighbours: ["v4", "v12", "v13"],
      },
      v9: {
        id: "v9",
        hexes: [1, 2, 5],
        owner: null,
        neighbours: ["v5", "v13", "v14"],
      },
      v10: {
        id: "v10",
        hexes: [2, 3, 6],
        owner: null,
        neighbours: ["v6", "v14", "v15"],
      },
      v11: {
        id: "v11",
        hexes: [3, 7],
        owner: null,
        neighbours: ["v7", "v15", "v16"],
      },
      v12: { id: "v12", hexes: [4], owner: null, neighbours: ["v8", "v17"] },
      v13: {
        id: "v13",
        hexes: [1, 4, 5],
        owner: null,
        neighbours: ["v8", "v9", "v18"],
      },
      v14: {
        id: "v14",
        hexes: [2, 5, 6],
        owner: null,
        neighbours: ["v9", "v10", "v19"],
      },
      v15: {
        id: "v15",
        hexes: [3, 6, 7],
        owner: null,
        neighbours: ["v10", "v11", "v20"],
      },
      v16: { id: "v16", hexes: [7], owner: null, neighbours: ["v11", "v21"] },
      v17: {
        id: "v17",
        hexes: [4, 8],
        owner: null,
        neighbours: ["v12", "v22", "v23"],
      },
      v18: {
        id: "v18",
        hexes: [4, 5, 9],
        owner: null,
        neighbours: ["v13", "v23", "v24"],
      },
      v19: {
        id: "v19",
        hexes: [5, 6, 10],
        owner: null,
        neighbours: ["v14", "v24", "v25"],
      },
      v20: {
        id: "v20",
        hexes: [6, 7, 11],
        owner: null,
        neighbours: ["v15", "v25", "v26"],
      },
      v21: {
        id: "v21",
        hexes: [7, 12],
        owner: null,
        neighbours: ["v16", "v26", "v27"],
      },
      v22: { id: "v22", hexes: [8], owner: null, neighbours: ["v17", "v28"] },
      v23: {
        id: "v23",
        hexes: [4, 8, 9],
        owner: null,
        neighbours: ["v17", "v18", "v29"],
      },
      v24: {
        id: "v24",
        hexes: [5, 9, 10],
        owner: null,
        neighbours: ["v18", "v19", "v30"],
      },
      v25: {
        id: "v25",
        hexes: [6, 10, 11],
        owner: null,
        neighbours: ["v19", "v20", "v31"],
      },
      v26: {
        id: "v26",
        hexes: [7, 11, 12],
        owner: null,
        neighbours: ["v20", "v21", "v32"],
      },
      v27: { id: "v27", hexes: [12], owner: null, neighbours: ["v21", "v33"] },
      v28: { id: "v28", hexes: [8], owner: null, neighbours: ["v22", "v34"] },
      v29: {
        id: "v29",
        hexes: [8, 9, 13],
        owner: null,
        neighbours: ["v23", "v34", "v35"],
      },
      v30: {
        id: "v30",
        hexes: [9, 10, 14],
        owner: null,
        neighbours: ["v24", "v35", "v36"],
      },
      v31: {
        id: "v31",
        hexes: [10, 11, 15],
        owner: null,
        neighbours: ["v25", "v36", "v37"],
      },
      v32: {
        id: "v32",
        hexes: [11, 12, 16],
        owner: null,
        neighbours: ["v26", "v37", "v38"],
      },
      v33: { id: "v33", hexes: [12], owner: null, neighbours: ["v27", "v38"] },
      v34: {
        id: "v34",
        hexes: [8, 13],
        owner: null,
        neighbours: ["v28", "v29", "v39"],
      },
      v35: {
        id: "v35",
        hexes: [9, 13, 14],
        owner: null,
        neighbours: ["v29", "v30", "v40"],
      },
      v36: {
        id: "v36",
        hexes: [10, 14, 15],
        owner: null,
        neighbours: ["v30", "v31", "v41"],
      },
      v37: {
        id: "v37",
        hexes: [11, 15, 16],
        owner: null,
        neighbours: ["v31", "v32", "v42"],
      },
      v38: {
        id: "v38",
        hexes: [12, 16],
        owner: null,
        neighbours: ["v32", "v33", "v43"],
      },
      v39: { id: "v39", hexes: [13], owner: null, neighbours: ["v34", "v44"] },
      v40: {
        id: "v40",
        hexes: [13, 14, 17],
        owner: null,
        neighbours: ["v35", "v44", "v45"],
      },
      v41: {
        id: "v41",
        hexes: [14, 15, 18],
        owner: null,
        neighbours: ["v36", "v45", "v46"],
      },
      v42: {
        id: "v42",
        hexes: [15, 16, 19],
        owner: null,
        neighbours: ["v37", "v46", "v47"],
      },
      v43: { id: "v43", hexes: [16], owner: null, neighbours: ["v38", "v47"] },
      v44: {
        id: "v44",
        hexes: [13, 17],
        owner: null,
        neighbours: ["v39", "v40", "v48"],
      },
      v45: {
        id: "v45",
        hexes: [14, 17, 18],
        owner: null,
        neighbours: ["v40", "v41", "v49"],
      },
      v46: {
        id: "v46",
        hexes: [15, 18, 19],
        owner: null,
        neighbours: ["v41", "v42", "v50"],
      },
      v47: {
        id: "v47",
        hexes: [16, 19],
        owner: null,
        neighbours: ["v42", "v43", "v51"],
      },
      v48: { id: "v48", hexes: [17], owner: null, neighbours: ["v44", "v52"] },
      v49: {
        id: "v49",
        hexes: [17, 18],
        owner: null,
        neighbours: ["v45", "v52", "v53"],
      },
      v50: {
        id: "v50",
        hexes: [18, 19],
        owner: null,
        neighbours: ["v46", "v53", "v54"],
      },
      v51: { id: "v51", hexes: [19], owner: null, neighbours: ["v47", "v54"] },
      v52: { id: "v52", hexes: [17], owner: null, neighbours: ["v48", "v49"] },
      v53: { id: "v53", hexes: [18], owner: null, neighbours: ["v49", "v50"] },
      v54: { id: "v54", hexes: [19], owner: null, neighbours: ["v50", "v51"] },
    },
  });

  const buildHouse = () => {};

  const buildRoad = () => {};

  const value = useMemo(
    () => ({ boardData, buildHouse, buildRoad }),
    [boardData]
  );

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

export default BoardProvider;
