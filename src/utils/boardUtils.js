import {
  HexHeight,
  HexWidth,
  HexGap,
  HexOffsetY,
  VertexOffsets,
  RowLayout,
} from "../constants/hexConstants";

export const generateVertexPositions = () => {
  let vertices = {};
  let vertexId = 0;
  let startY = 0;

  RowLayout.forEach((hexCount, rowIndex) => {
    let startX = rowIndex % 2 === 0 ? 0 : HexWidth / 2 + HexGap / 2;

    for (let i = 0; i < hexCount; i++) {
      const hexX = startX + i * (HexWidth + HexGap);
      const hexY = startY;

      VertexOffsets.forEach(([dx, dy]) => {
        const vx = hexX + dx;
        const vy = hexY + dy;
        const key = `${vx},${vy}`;

        if (!vertices[key]) {
          vertices[key] = { id: vertexId++, x: vx, y: vy };
        }
      });
    }
    startY += HexHeight + HexOffsetY;
  });
  return Object.values(vertices);
};
