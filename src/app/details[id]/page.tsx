import { useEffect, useState } from "react";
import axios from "axios";
import { PokemonCard } from "@/src/components/PokeCard/page";


interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
}

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

export default function Pokedex() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getPoke = async () => {
    try {
      const response = await axios.get<PokemonListResponse>(
        "https://pokeapi.co/api/v2/pokemon?limit=500"
      );

      // Buscar detalhes de cada Pokémon
      const results = await Promise.all(
        response.data.results.map(async (poke) => {
          const res = await axios.get<Pokemon>(poke.url);
          return res.data;
        })
      );

      setPokemon(results);
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
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
                id={poke.id}
                isGrid={false}
              />
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
