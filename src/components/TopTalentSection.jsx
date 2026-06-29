import { useState } from "react";
import TalentCard from "./TalentCard";
import TalentModal from "./TalentModal";
import { talents } from "../data/talents";

function TopTalentSection({ searchTerm }) {
const [selectedTalent, setSelectedTalent] =
useState(null);

const filteredTalents = talents.filter(
(talent) =>
talent.name
.toLowerCase()
.includes(searchTerm.toLowerCase())
);

return ( <section className="top-talent-section"> <div className="section-title"> <h2>Top 10 Talent</h2>
    <p>
      Talenta yang paling menonjol
      dalam dirimu
    </p>
  </div>

  <div className="talent-list">
    {filteredTalents.length > 0 ? (
      filteredTalents.map((talent) => (
        <TalentCard
          key={talent.rank}
          talent={talent}
          onClick={setSelectedTalent}
        />
      ))
    ) : (
      <p className="empty-state">
        Talent tidak ditemukan
      </p>
    )}
  </div>

  <TalentModal
    talent={selectedTalent}
    onClose={() =>
      setSelectedTalent(null)
    }
  />
</section>


);
}

export default TopTalentSection;
