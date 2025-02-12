import Hex from "./Hex.jsx";

const Board = ({ hexData }) => {
  const rowLayout = [3, 4, 5, 4, 3];
  let startIndex = 0;

  //todo fix this return statement so it works dynamic
  return (
    <div className="hex-grid">
      <div className="hex-row">
        <Hex number={hexData[0].number} color={hexData[0].color} />
        <Hex number={hexData[1].number} color={hexData[1].color} />
        <Hex number={hexData[2].number} color={hexData[2].color} />
      </div>
      <div className="hex-row-offset">
        <Hex />
        <Hex />
        <Hex />
        <Hex />
      </div>
      <div className="hex-row">
        <Hex />
        <Hex />
        <Hex />
        <Hex />
        <Hex />
      </div>
      <div className="hex-row-offset">
        <Hex />
        <Hex />
        <Hex />
        <Hex />
      </div>
      <div className="hex-row">
        <Hex />
        <Hex />
        <Hex />
      </div>
    </div>
  );
};

export default Board;
