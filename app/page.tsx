import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 p-12 text-center">
      <h1 className="text-2xl">Test de pureké by Desheitanland</h1>
      <p>
        Bievenue dans ce test de pureké, nous allons juger tes faits en tant que
        teufeur afin de t&apos;attribuer une note de teuf !{" "}
      </p>

      <Link
        href="/questions"
        className="bg-green-500 p-4 rounded-sm mt-8 hover:bg-green-600"
      >
        Commencer
      </Link>
    </main>
  );
}
