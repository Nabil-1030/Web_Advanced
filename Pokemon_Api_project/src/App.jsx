import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(res => res.json())
      .then(data => {
        Promise.all(data.results.map(p =>
          fetch(p.url).then(res => res.json())
        )).then(pokemonDetails => {
          setPokemon(pokemonDetails);
          setFilteredPokemon(pokemonDetails);
        });
      });
  }, []);

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    filterAndSortPokemon(searchTerm, type, sortCriteria);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const term = searchInput.toLowerCase();
    setSearchTerm(term);
    filterAndSortPokemon(term, selectedType, sortCriteria);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    filterAndSortPokemon(searchTerm, selectedType, criteria);
  };

  const filterAndSortPokemon = (term, type, sortBy) => {
    let result = [...pokemon];

    if (term) {
      result = result.filter(p => p.name.toLowerCase().includes(term));
    }

    if (type !== 'all') {
      result = result.filter(p => p.types.some(t => t.type.name === type));
    }

    if (sortBy === "type") {
      result.sort((a, b) => {
        const typeA = a.types[0]?.type.name || "";
        const typeB = b.types[0]?.type.name || "";
        return typeA.localeCompare(typeB);
      });
    } else if (sortBy === "hp") {
      result.sort((a, b) =>
        (b.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0) -
        (a.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0)
      );
    } else if (sortBy === "speed") {
      result.sort((a, b) =>
        (b.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0) -
        (a.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0)
      );
    }

    setFilteredPokemon(result);
  };

  return (
    <div className="container">
      <h1>Pokémon Lijst</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Zoek Pokémon..."
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Zoek</button>
      </div>

      <div className="controls">
        <select onChange={handleTypeChange} value={selectedType}>
          <option value="all">Alle Type's</option>
          <option value="fire">Vuur</option>
          <option value="water">Water</option>
          <option value="grass">Gras</option>
        </select>

        <select onChange={(e) => handleSortChange(e.target.value)} className="sort-dropdown" value={sortCriteria}>
          <option value="">Sorteer op...</option>
          <option value="type">Type</option>
          <option value="hp">HP</option>
          <option value="speed">Snelheid</option>
        </select>
      </div>

      <div className="pokemon-grid">
        {filteredPokemon.map(p => (
          <div className="pokemon-card" key={p.id}>
            <img src={p.sprites.front_default} alt={p.name} />
            <h2>{p.name}</h2>
            <p><strong>ID:</strong> {p.id}</p>
            <p><strong>Hoogte:</strong> {p.height}</p>
            <p><strong>Gewicht:</strong> {p.weight}</p>
            <p><strong>Type(s):</strong> {p.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>HP:</strong> {p.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
            <p><strong>Snelheid:</strong> {p.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
