"use client";

import { useState } from "react";

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [drugScore, setDrugScore] = useState(0);
  const [policeScore, setPoliceScore] = useState(0);
  const [hygieneScore, setHygieneScore] = useState(0);

  const [score, setScore] = useState(0);

  const questions: [string, number, string][] = [
    ["As tu déjà pris 4 drogues ou plus en une seule teuf ?", 30, "Drogue"],
    ["As tu déjà conduit sous LSD", 20, "Drogue"],
    ["As tu déjà fait des strats de fou pour vesqui les decks ?", 10, "Police"],
    ["T'es tu déjà fait niquer ton permis en sortant de teuf ?", 20, "Police"],
    ["As tu déjà mangé un truc vraiment suspect en teuf ?", 10, "Hygiene"],
  ];

  const nextQuestion = (anwser: string, categorie: string | null) => {
    if (anwser === "yes") {
      setScore((prevScore) => prevScore + questions[currentQuestion][1]);
    }

    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(-1);
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }

    switch (categorie) {
      case "Drogue":
        setDrugScore((prevScore) => prevScore + questions[currentQuestion][1]);
        break;
      case "Police":
        setPoliceScore(
          (prevScore) => prevScore + questions[currentQuestion][1]
        );
        break;
      case "Hygiene":
        setHygieneScore(
          (prevScore) => prevScore + questions[currentQuestion][1]
        );
        break;
    }
  };

  return (
    <div className="h-28 w-1/2 md:mt-12 mt-24">
      <h2 className="mb-4 text-xl">
        {currentQuestion !== -1 && questions[currentQuestion][2]}
      </h2>
      <div className="h-1/2 w-full text-center">
        {currentQuestion !== -1
          ? questions[currentQuestion][0]
          : "Tu as fini, voici tes résultats !"}
      </div>
      <div className="h-1/2 w-full flex justify-center items-center gap-20 mt-8 md:mt-0">
        {currentQuestion !== -1 ? (
          <>
            <button
              onClick={() => nextQuestion("yes", questions[currentQuestion][2])}
              className="bg-green-600 p-4 rounded-sm"
            >
              Oui
            </button>
            <button
              onClick={() => nextQuestion("no", null)}
              className="bg-red-500 p-4 rounded-sm"
            >
              Non
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4 mt-24">
            <p>
              Ton score drogue est de{" "}
              <span className="text-red-500">{drugScore}</span>
            </p>
            <p>
              Ton score police est de{" "}
              <span className="text-red-500">{policeScore}</span>
            </p>
            <p>
              Ton score hygiène est de{" "}
              <span className="text-red-500">{hygieneScore}</span>
            </p>
            <p className="text-xl">
              Ton score total est de{" "}
              <span className="text-red-500">{score}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
