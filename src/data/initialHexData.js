import {
  FieldNumbers,
  FieldTypes,
  HexDetails,
} from "../constants/fieldConstants.js";
import { shuffleArray } from "../utils/helpers.js";

const shuffledNumbers = shuffleArray([...FieldNumbers]);
const shuffledTypes = shuffleArray([...FieldTypes]);

// shuffeled data without robber
const shuffledData = shuffledNumbers.map((number, index) => ({
  number: number,
  color: shuffledTypes[index],
}));

// add robber {7, 'beige'}
shuffledData.push({ number: 7, color: "beige" });

const shuffledTiles = shuffleArray([...shuffledData]);

export const initialData = shuffledTiles.map((tile, index) => ({
  ...tile,
  id: HexDetails[index].id,
  vertices: HexDetails[index].vertices,
  edges: HexDetails[index].edges,
}));
