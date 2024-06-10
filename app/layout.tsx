import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test de pureké by Desheitanland",
  description: "Vous aussi passez le test de pureké by Desheitanland !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <h1 className="text-4xl px-4 pt-4 text-center font-bold">
          Test de pureké by Desheitanland
        </h1>
        {children}
      </body>
    </html>
  );
}
