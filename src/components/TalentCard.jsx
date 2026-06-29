function TalentCard({ talent, onClick }) {
  return (
    <div
      className={`talent-card ${talent.domain.toLowerCase()}`}
      onClick={() => onClick(talent)}
    >
      <div className="talent-rank">
        #{talent.rank}
      </div>

      <h3>{talent.name}</h3>

      <span className="talent-domain">
        {talent.domain}
      </span>

      <p>
        {talent.shortDescription}
      </p>
    </div>
  );
}

export default TalentCard;