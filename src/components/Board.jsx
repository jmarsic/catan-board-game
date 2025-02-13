import Hex from "./Hex.jsx";

const Board = ({ hexData }) => {
  const rowLayout = [3, 4, 5, 4, 3];
  let startIndex = 0;

  return (
    <div className="hex-grid">
      {rowLayout.map((hexCount, rowIndex) => {
        const rowClassName = rowIndex % 2 === 0 ? "hex-row" : "hex-row-offset";
        const rowHexes = hexData.slice(startIndex, startIndex + hexCount);
        startIndex += hexCount;

        return (
          <div key={rowIndex} className={rowClassName}>
            {rowHexes.map((hex, index) => (
              <Hex key={index} number={hex.number} color={hex.color} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
