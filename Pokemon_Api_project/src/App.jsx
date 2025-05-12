import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(res => res.json())
      .then(data => {
        Promise.all(data.results.map(p =>
          fetch(p.url).then(res => res.json())
        )).then(pokemonDetails => setPokemon(pokemonDetails));
      });
  }, []);

  return (
    <div className="container">
      <h1>Pokémon Lijst</h1>
      <div className="pokemon-grid">
        {pokemon.map(p => (
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
