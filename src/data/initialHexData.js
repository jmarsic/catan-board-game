import { FieldNumbers, FieldTypes } from "../constants/fieldConstants.js";
import { shuffleArray } from "../utils/helpers.js";

const shuffledNumbers = shuffleArray([...FieldNumbers]);
const shuffledTypes = shuffleArray([...FieldTypes]);

// shuffeled data without robber
const shuffeledData = shuffledNumbers.map((number, index) => ({
  number: number,
  color: shuffledTypes[index],
}));

// add robber {7, 'beige'}
shuffeledData.push({ number: 7, color: "beige" });

export const initialData = shuffleArray([...shuffeledData]);
