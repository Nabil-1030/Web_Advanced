import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedType, setSelectedType] = useState('all');

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

    if (type === 'all') {
      setFilteredPokemon(pokemon);
    } else {
      const filtered = pokemon.filter(p =>
        p.types.some(t => t.type.name === type)
      );
      setFilteredPokemon(filtered);
    }
  };

  return (
    <div className="container">
      <h1>Pokémon Lijst</h1>

      <select onChange={handleTypeChange} value={selectedType}>
        <option value="all">Alle Type's</option>
        <option value="fire">Vuur</option>
        <option value="water">Water</option>
        <option value="grass">Gras</option>
        <option value="electric">Elektrisch</option>
      </select>

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
