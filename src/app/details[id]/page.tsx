import Link from "next/link";
import Image from "next/image";

interface PokemonDetalhesProps {
  params: { id: string };
}

export default async function PokemonDetalhes({ params }: PokemonDetalhesProps) {
  const { id } = params;

  // usando fetch ao invés de axios
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error("Falha ao carregar Pokémon");
  const pokemon = await res.json();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          ⬅ Voltar
        </Link>
      </header>

      <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={200}
          height={200}
          className="mb-4"
        />

        <h2 className="text-xl font-semibold capitalize mb-2">
          {pokemon.name} <span className="text-gray-500">#{pokemon.id}</span>
        </h2>

        <div className="grid grid-cols-2 gap-4 mt-4 text-center">
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="font-medium">Tipo(s)</p>
            <p className="capitalize">
              {pokemon.types.map((t: any) => t.type.name).join(", ")}
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-3">
            <p className="font-medium">Peso</p>
            <p>{pokemon.weight / 10} kg</p>
          </div>

          <div className="bg-gray-100 rounded-lg p-3">
            <p className="font-medium">Altura</p>
            <p>{pokemon.height / 10} m</p>
          </div>

          <div className="bg-gray-100 rounded-lg p-3">
            <p className="font-medium">XP Base</p>
            <p>{pokemon.base_experience}</p>
          </div>
        </div>
      </section>

      <footer className="mt-6 text-center text-sm text-gray-500">
        Dados fornecidos pela PokéAPI
      </footer>
    </main>
  );
}
