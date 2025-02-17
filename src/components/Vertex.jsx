const Vertex = ({ vertex, onBuildHouse }) => {
  return <div className="vertex" onClick={() => onBuildHouse(vertex.id)}></div>;
};

export default Vertex;
