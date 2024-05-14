'use client'

import { useState } from 'react';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [score, setScore] = useState(0);

  const questions: [string, number][] = [
    ["As tu déjà conduit sous gougoutte", 20],
    ["As tu déjà fait des strats de fou pour vesqui les decks ?", 10],
    ["As tu déjà pris plus de 5 drogues différente en une tawa ?", 30],
    ["T'es tu déjà fait niquer ton permis en sortant de tawa ?", 20],
  ];

  const nextQuestion = (anwser : string) => {
    if (anwser === "yes") {
      setScore(prevScore => prevScore + questions[currentQuestion][1]);
    }

    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(-1);
    } else {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 p-12 text-center">
      <h1 className="text-2xl">Test de pureké by Desheitanland</h1>

      <div className="h-28 w-1/2 md:mt-24 mt-24">
        <div className="h-1/2 w-full text-center">
          {currentQuestion !== -1 ? questions[currentQuestion][0] : "Tu as fini, voici tes résultats !"}
        </div>
        <div className="h-1/2 w-full flex justify-center items-center gap-20 mt-8 md:mt-0">
          {currentQuestion !== -1 ? (
            <>
              <button onClick={() => nextQuestion("yes")} className="bg-green-600 p-4 rounded-sm">Oui</button>
              <button onClick={() => nextQuestion("no")} className="bg-red-500 p-4 rounded-sm">Non</button>
            </>
          ) : (
            "Ton score est : " + score
          )}
        </div>
      </div>
    </main>
  );
}
