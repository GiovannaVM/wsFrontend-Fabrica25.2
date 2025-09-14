import React from 'react'

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header>
      <h1 id='title'>Pokedex Fabrica — Next.ts</h1>
      <div>{children}</div>
    </header>
  )
}