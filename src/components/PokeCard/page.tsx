import Link from "next/link";
import Image from "next/image";

interface PokemonCardProps {
  id: number;
  name: string;
  isGrid: boolean;
}

export function PokemonCard({ id, name, isGrid }: PokemonCardProps) {
  return (
    <Link href={`/detalhes/${id}`}>
      <article
        className={`rounded-xl p-4 bg-gradient-to-br from-gray-100 to-gray-200 shadow-md 
        cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl 
        flex ${isGrid ? "flex-col items-center" : "flex-row items-center gap-4"}`}
        
      >
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          width={96}
          height={96}
          className="drop-shadow-md"
        />

        <div className={`text-center ${isGrid ? "" : "sm:text-left"}`}>
          <h2 className="font-semibold capitalize text-lg">{name}</h2>
          <span className="text-gray-600 text-sm">
            #{id.toString().padStart(3, "0")}
          </span>
        </div>
      </article>
    </Link>
  );
}
