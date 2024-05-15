"use client";

import { useEffect, useState } from "react";

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [drugScore, setDrugScore] = useState(0);
  const [policeScore, setPoliceScore] = useState(0);
  const [hygieneScore, setHygieneScore] = useState(0);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState({
    drug: 0,
    police: 0,
    hygiene: 0,
  });

  const questions = [
    ["As tu déjà pris 4 drogues ou plus en une seule teuf ?", 30, "Drogue"],
    ["As tu déjà conduit sous LSD", 20, "Drogue"],
    ["As tu déjà fait des strats de fou pour vesqui les decks ?", 10, "Police"],
    ["T'es tu déjà fait niquer ton permis en sortant de teuf ?", 20, "Police"],
    ["As tu déjà mangé un truc vraiment suspect en teuf ?", 10, "Hygiene"],
  ];

  const calculatePercentages = () => {
    const totalScore = score;
    if (totalScore === 0) return { drug: 0, police: 0, hygiene: 0 };
    return {
      drug: (drugScore / totalScore) * 100,
      police: (policeScore / totalScore) * 100,
      hygiene: (hygieneScore / totalScore) * 100,
    };
  };

  useEffect(() => {
    setPercentage(calculatePercentages());
  }, [score, drugScore, policeScore, hygieneScore]);

  const nextQuestion = (answer: string, category: string) => {
    if (answer === "yes") {
      setScore(
        (prevScore) => prevScore + Number(questions[currentQuestion][1])
      );
    }

    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(-1);
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }

    switch (category) {
      case "Drogue":
        setDrugScore(
          (prevScore) => prevScore + Number(questions[currentQuestion][1])
        );
        break;
      case "Police":
        setPoliceScore(
          (prevScore) => prevScore + Number(questions[currentQuestion][1])
        );
        break;
      case "Hygiene":
        setHygieneScore(
          (prevScore) => prevScore + Number(questions[currentQuestion][1])
        );
        break;
    }
  };

  const getPieChartBackground = () => {
    const drugEnd = percentage.drug;
    const policeEnd = drugEnd + percentage.police;
    const hygieneEnd = policeEnd + percentage.hygiene;
    return `conic-gradient(
      #DFFF00 0% ${drugEnd}%,
      #FFBF00 ${drugEnd}% ${policeEnd}%,
      #FF7F50 ${policeEnd}% ${hygieneEnd}%,
      #fff ${hygieneEnd}% 100%
    )`;
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
              onClick={() =>
                nextQuestion("yes", String(questions[currentQuestion][2]))
              }
              className="bg-green-600 p-4 rounded-sm"
            >
              Oui
            </button>
            <button
              onClick={() => nextQuestion("no", "")}
              className="bg-red-500 p-4 rounded-sm"
            >
              Non
            </button>
          </>
        ) : (
          <div className="flex flex-col mt-48">
            <div
              className="rounded-full h-40 w-40 relative perspective-3d"
              style={{
                background: getPieChartBackground(),
              }}
            ></div>
            <div className="flex flex-col justify-between mt-4">
              <p>
                {" "}
                <span className="text-[#DFFF00]">Drogue</span>:{" "}
                {percentage.drug.toFixed(2)}%
              </p>
              <p>
                {" "}
                <span className="text-[#FFBF00]">Police</span>:{" "}
                {percentage.police.toFixed(2)}%
              </p>
              <p>
                <span className="text-[#FF7F50]">Hygiène</span>:{" "}
                {percentage.hygiene.toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
