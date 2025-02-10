import Hex from "./Hex.jsx";

const Board = () => {
  return (
    <div className="hex-grid">
      <div className="hex-row">
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
