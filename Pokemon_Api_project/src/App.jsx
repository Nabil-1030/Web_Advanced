import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  const [favorites, setFavorites] = useState(() => {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
});


  // Laad favorieten bij opstart
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Sla favorieten op bij wijziging
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Haal Pokémon data op bij laden
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(res => res.json())
      .then(data => {
        Promise.all(
          data.results.map(p =>
            fetch(p.url).then(res => res.json())
          )
        ).then(pokemonDetails => {
          setPokemon(pokemonDetails);
        });
      });
  }, []);

  // Voer filtering en sortering uit bij wijziging van relevante state
  useEffect(() => {
    filterAndSortPokemon(searchTerm, selectedType, sortCriteria);
  }, [pokemon, searchTerm, selectedType, sortCriteria, favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
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
    setSearchTerm(searchInput.toLowerCase());
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const filterAndSortPokemon = (term, type, sortBy) => {
    let result = [...pokemon];

    if (term) {
      result = result.filter(p => p.name.toLowerCase().includes(term));
    }

    if (type !== 'all') {
      result = result.filter(p => p.types.some(t => t.type.name === type));
    }

    if (sortBy === 'type') {
      result.sort((a, b) => {
        const typeA = a.types[0]?.type.name || '';
        const typeB = b.types[0]?.type.name || '';
        return typeA.localeCompare(typeB);
      });
    } else if (sortBy === 'hp') {
      result.sort((a, b) => (
        (b.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0) -
        (a.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0)
      ));
    } else if (sortBy === 'speed') {
      result.sort((a, b) => (
        (b.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0) -
        (a.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0)
      ));
    } else if (sortBy === 'favorites') {
      result.sort((a, b) => (
        (favorites.includes(b.id) ? 1 : 0) -
        (favorites.includes(a.id) ? 1 : 0)
      ));
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
          <option value="all">Alle Types</option>
          <option value="fire">Vuur</option>
          <option value="water">Water</option>
          <option value="grass">Gras</option>
        </select>

        <select onChange={(e) => handleSortChange(e.target.value)} value={sortCriteria} className="sort-dropdown">
          <option value="">Sorteer op...</option>
          <option value="type">Type</option>
          <option value="hp">HP</option>
          <option value="speed">Snelheid</option>
          <option value="favorites">Favorieten</option>
        </select>
      </div>

      <div className="pokemon-grid">
        {filteredPokemon.map(p => (
          <div
            key={p.id}
            className={`pokemon-card ${favorites.includes(p.id) ? 'favorite' : ''}`}
            onClick={() => toggleFavorite(p.id)}
            style={{ cursor: 'pointer' }}
          >
            <img src={p.sprites.front_default} alt={p.name} />
            <h2>{p.name}</h2>
            <p><strong>ID:</strong> {p.id}</p>
            <p><strong>Hoogte:</strong> {p.height}</p>
            <p><strong>Gewicht:</strong> {p.weight}</p>
            <p><strong>Type(s):</strong> {p.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>HP:</strong> {p.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
            <p><strong>Snelheid:</strong> {p.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
            {favorites.includes(p.id) && <p style={{ color: 'blue' }}><strong>★ Favoriet</strong></p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
