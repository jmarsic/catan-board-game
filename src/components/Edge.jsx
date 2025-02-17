const Edge = ({ edge, onBuildRoad }) => {
  return <div className="edge" onClick={() => onBuildRoad(edge.id)}></div>;
};

export default Edge;
