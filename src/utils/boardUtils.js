import {
  VerticesTopPositions,
  RowVerticesNumber,
  VerticesRowOffsets,
  VerticesColumnOffsets,
  VerticesBottomPositions,
} from "../constants/hexConstants";

export const generateVertexPositions = () => {
  let vertices = {};
  let vertexId = 0;
  let startY = 0;
  let startX = 0;

  RowVerticesNumber.forEach((verticesNumber, rowIndex) => {
    if (rowIndex < 3) {
      startX = VerticesRowOffsets[rowIndex];
      startY = VerticesColumnOffsets[rowIndex];
      for (let i = 0; i < verticesNumber; i++) {
        const [dx, dy] = VerticesTopPositions[i];

        const vx = startX + dx;
        const vy = startY + dy;
        const key = `${vx}, ${vy}`;

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
        const key = `${vx}, ${vy}`;

        if (!vertices[key]) {
          vertices[key] = { id: vertexId++, x: vx, y: vy };
        }
      }
    }
  });
  console.log(vertices);
  return Object.values(vertices);
};
