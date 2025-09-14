"use client"

import Image from "next/image"
import Masterball from "@/assets/masterball.png"

type AddFavoriteProps = {
  pokemon: { id: number; name: string; sprite: string }
}

export default function AddToFavoritesButton({ pokemon }: AddFavoriteProps) {
  const handleAddToFavorites = () => {
    const stored = localStorage.getItem("favorites")
    const favorites = stored ? JSON.parse(stored) : []

    // evita duplicados
    if (!favorites.some((fav: any) => fav.id === pokemon.id)) {
      favorites.push(pokemon)
      localStorage.setItem("favorites", JSON.stringify(favorites))
      alert(`${pokemon.name} capturado!`)
    } else {
      alert(`${pokemon.name} já está nos favoritos!`)
    }
  }

  return (
    <button id="addToFavorites" onClick={handleAddToFavorites}>
      <Image src={Masterball} alt="Masterball" width={30} height={30} />
      Capturar
    </button>
  )
}