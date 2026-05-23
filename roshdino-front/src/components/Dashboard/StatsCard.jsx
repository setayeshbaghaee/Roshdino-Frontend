const StatsCard = ({ number, title }) => {
  return (
    <div className="stats-card">
      <h1>{number}</h1>
      <p>{title}</p>
    </div>
  );
};

export default StatsCard;
