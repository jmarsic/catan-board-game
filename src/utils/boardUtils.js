import {
  VerticesTopPositions,
  RowVerticesNumber,
  VerticesRowOffsets,
  VerticesColumnOffsets,
  VerticesBottomPositions,
  RowEdgeNumber,
  EdgesRowOffsets,
  EdgesColumnOffsets,
  EdgesTopPositions,
  EdgesVerticalPositions,
} from "../constants/hexConstants";

export const generateVertexPositions = () => {
  let vertices = {};
  let vertexId = 1;
  let startX = 0;
  let startY = 0;

  RowVerticesNumber.forEach((verticesNumber, rowIndex) => {
    if (rowIndex < 3) {
      startX = VerticesRowOffsets[rowIndex];
      startY = VerticesColumnOffsets[rowIndex];
      for (let i = 0; i < verticesNumber; i++) {
        const [dx, dy] = VerticesTopPositions[i];

        const vx = startX + dx;
        const vy = startY + dy;
        const key = `v${vertexId}`;

        if (!vertices[key]) {
          vertices[key] = { id: vertexId++, x: vx, y: vy };
        }
      }
    } else if (rowIndex > 2) {
      startX = VerticesRowOffsets[rowIndex];
      startY = VerticesColumnOffsets[rowIndex];
      for (let i = 0; i < verticesNumber; i++) {
        const [dx, dy] = VerticesBottomPositions[i];

        const vx = startX + dx;
        const vy = startY + dy;
        const key = `v${vertexId}`;

        if (!vertices[key]) {
          vertices[key] = { id: vertexId++, x: vx, y: vy };
        }
      }
    }
  });
  console.log(vertices);
  return Object.values(vertices);
};

export const generateUniqueRoads = () => {
  let roads = {};
  let roadId = 1;
  let startX = 0;
  let startY = 0;

  RowEdgeNumber.forEach((edgeNumber, rowIndex) => {
    if (rowIndex < 6 && rowIndex % 2 === 0) {
      startX = EdgesRowOffsets[rowIndex];
      startY = EdgesColumnOffsets[rowIndex];
      for (let i = 0; i < edgeNumber; i++) {
        const [dx, dy] = EdgesTopPositions[i];

        const ex = startX + dx;
        const ey = startY + dy;
        const key = `e${roadId}`;

        if (!roads[key] && roadId < 24) {
          const className =
            roadId % 2 ? "edge-right-rotate" : "edge-left-rotate";
          roads[key] = { id: roadId++, x: ex, y: ey, className };
        } else if (!roads[key] && roadId >= 24) {
          const className =
            roadId % 2 ? "edge-left-rotate" : "edge-right-rotate";
          roads[key] = { id: roadId++, x: ex, y: ey, className };
        }
      }
    } else if (rowIndex % 2 !== 0) {
      startX = EdgesRowOffsets[rowIndex];
      startY = EdgesColumnOffsets[rowIndex];
      for (let i = 0; i < edgeNumber; i++) {
        const [dx, dy] = EdgesVerticalPositions[i];

        const ex = startX + dx;
        const ey = startY + dy;
        const key = `e${roadId}`;

        if (!roads[key]) {
          const className = "edge";
          roads[key] = { id: roadId++, x: ex, y: ey, className };
        }
      }
    } else if (rowIndex >= 6 && rowIndex % 2 === 0) {
      startX = EdgesRowOffsets[rowIndex];
      startY = EdgesColumnOffsets[rowIndex];
      for (let i = 0; i < edgeNumber; i++) {
        const [dx, dy] = EdgesTopPositions[i];

        const ex = startX + dx;
        const ey = startY + dy;
        const key = `e${roadId}`;

        if (!roads[key] && roadId < 55) {
          const className =
            roadId % 2 ? "edge-right-rotate" : "edge-left-rotate";
          roads[key] = { id: roadId++, x: ex, y: ey, className };
        } else if (!roads[key] && roadId >= 55) {
          const className =
            roadId % 2 ? "edge-left-rotate" : "edge-right-rotate";
          roads[key] = { id: roadId++, x: ex, y: ey, className };
        }
      }
    }
  });
  console.log(roads);

  return Object.values(roads);
};
