const Hex = ({ number, color }) => {
  const styles = {
    backgroundColor: color,
  };
  return (
    <div className="hexagone" style={styles}>
      {number}
    </div>
  );
};

export default Hex;
