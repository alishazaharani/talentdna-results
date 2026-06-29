function DomainSnapshot() {
  return (
    <section className="domain-section">
      <div className="section-title">
        <h2>Domain Talenta</h2>
        <p>Gambaran umum komposisi talenta dalam dirimu</p>
      </div>

      <div className="domain-grid">
        <div className="domain-card drive">
          <span className="domain-label">Drive</span>
          <h3>40%</h3>
          <p>Target & Pencapaian</p>
        </div>

        <div className="domain-card network">
          <span className="domain-label">Network</span>
          <h3>35%</h3>
          <p>Relasi & Kolaborasi</p>
        </div>

        <div className="domain-card action">
          <span className="domain-label">Action</span>
          <h3>25%</h3>
          <p>Inisiatif & Eksekusi</p>
        </div>
      </div>
    </section>
  );
}

export default DomainSnapshot;