// src/components/Pokedex.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { PokemonCard } from "../PokeCard/page";



export default function Pokedex() {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getPoke = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=500");
      const results = await Promise.all(
        response.data.results.map((poke: any) => axios.get(poke.url))
      );
      setPokemon(results.map((res) => res.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPoke();
  }, []);

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Pokédex</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Pesquisar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Carregando Pokémons...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredPokemon.length > 0 ? (
            filteredPokemon.map((poke) => (
              <PokemonCard
                key={poke.id}
                name={poke.name}
                id={poke.id} isGrid={false}              />
            ))
          ) : (
            <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              Nenhum Pokémon encontrado!
            </p>
          )}
        </div>
      )}
    </main>
  );
}
