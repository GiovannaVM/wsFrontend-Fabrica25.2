import React from 'react'

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="container" role="banner">
      <h1>Pokedex Fabrica — Next.ts</h1>
      <div>{children}</div>
    </header>
  )
}