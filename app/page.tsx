"use client";

import { useState } from "react";
import Questions from "./components/questions";

export default function Home() {
  const [start, setStart] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 p-12 text-center">
      <h1 className="text-2xl">Test de pureké by Desheitanland</h1>
      {!start && (
        <p>
          Bievenue dans ce test de pureké, nous allons juger tes faits en tant
          que teufeur afin de t&apos;attribuer une note de teuf !{" "}
        </p>
      )}

      {!start && (
        <button
          onClick={() => setStart(true)}
          className="bg-green-500 p-4 rounded-sm mt-8"
        >
          Commencer
        </button>
      )}
      {start && <Questions setStart={setStart} />}
    </main>
  );
}
