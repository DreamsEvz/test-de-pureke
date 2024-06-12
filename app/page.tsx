import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center md:p-24 p-12 text-center gap-6">
      <p>
        <span className="text-2xl text-semibold">
          Bienvenue dans ce test de pureté !
        </span>{" "}
        <br />
        <span className="text-lg mt-4 block">
          Nous allons évaluer tes expériences en tant que teufeur afin de
          t&apos;attribuer une note de teuf !*
        </span>
        <br />
        <span className="text-xs block">
          *Ce test a uniquement été conçu pour le divertissement, il n&apos;y a
          pas de bon ou de mauvais teufeur !
        </span>
      </p>

      <Link
        href="/questions"
        className="bg-green-500 p-4 rounded-sm hover:bg-green-600"
      >
        C&apos;est parti !
      </Link>
    </main>
  );
}
