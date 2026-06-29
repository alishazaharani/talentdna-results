function TalentModal({ talent, onClose }) {
  if (!talent) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-rank">
          #{talent.rank}
        </div>

        <h2>{talent.name}</h2>

        <span>{talent.domain}</span>

        <p>
          {talent.description}
        </p>

        <button onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
}

export default TalentModal;