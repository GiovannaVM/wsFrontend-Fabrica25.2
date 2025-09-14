import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header/page";
import { Footer } from "../components/Footer/page";


export const metadata: Metadata = {
  title: "Pokedex Next.js",
  description: "Uma Pokedex construída com Next.js e PokéAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}




