import tdnaLogo from "../assets/tdna_logo.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-logo">
        <img src={tdnaLogo} alt="TalentDNA logo" />
      </div>

      <h1>
        Selamat, Alisha!
      </h1>

      <p>
        45 talenta dalam dirimu
        telah teridentifikasi.
      </p>

      <span>
        Temukan kekuatan unik yang
        membentuk cara kamu berpikir,
        berinteraksi, dan berkembang.
      </span>
    </section>
  );
}

export default Hero;