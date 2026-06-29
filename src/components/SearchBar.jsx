function SearchBar({
  searchTerm,
  setSearchTerm
}) {
  return (
    <section className="search-section">
      <input
        type="text"
        className="search-input"
        placeholder="Cari talent..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />
    </section>
  );
}

export default SearchBar;