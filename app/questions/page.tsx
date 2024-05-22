"use client";

import { useEffect, useState } from "react";
import Results from "../components/Results";

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

  const questionsJson = {
    questions: [
      {
        question: "As tu déjà pris 4 drogues ou plus en une seule teuf ?",
        points: 30,
        category: "Drogue",
      },
      {
        question: "As tu déjà conduit sous LSD",
        points: 20,
        category: "Drogue",
      },
      {
        question: "As tu déjà fait des strats de fou pour vesqui les decks ?",
        points: 10,
        category: "Police",
      },
      {
        question: "T'es tu déjà fait niquer ton permis en sortant de teuf ?",
        points: 20,
        category: "Police",
      },
      {
        question: "As tu déjà mangé un truc vraiment suspect en teuf ?",
        points: 10,
        category: "Hygiene",
      },
      {
        question: "As tu déjà fait caca en teuf ?",
        points: 20,
        category: "Hygiene",
      },
      {
        question: "Danse tu pied nu en teuf ?",
        points: 10,
        category: "Hygiene",
      },
    ],
  };

  const maxScore = questionsJson.questions.reduce(
    (acc, question) => acc + Number(question.points),
    0
  );

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
        (prevScore) =>
          prevScore + Number(questionsJson.questions[currentQuestion].points)
      );
    }

    if (currentQuestion === questionsJson.questions.length - 1) {
      setCurrentQuestion(-1);
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }

    switch (category) {
      case "Drogue":
        setDrugScore(
          (prevScore) =>
            prevScore + Number(questionsJson.questions[currentQuestion].points)
        );
        break;
      case "Police":
        setPoliceScore(
          (prevScore) =>
            prevScore + Number(questionsJson.questions[currentQuestion].points)
        );
        break;
      case "Hygiene":
        setHygieneScore(
          (prevScore) =>
            prevScore + Number(questionsJson.questions[currentQuestion].points)
        );
        break;
    }
  };

  return (
    <div className="h-full w-screen md:mt-12 p-12 flex items-center flex-col">
      <div className="h-1/2 w-full flex flex-col justify-center items-center gap-12">
        {currentQuestion !== -1 ? (
          <>
            <h2 className="text-xl text-center">
              {currentQuestion !== -1 &&
                questionsJson.questions[currentQuestion].category}
            </h2>
            <p className="text-center">
              {questionsJson.questions[currentQuestion].question}
            </p>
            <div className="flex gap-20">
              <button
                onClick={() =>
                  nextQuestion(
                    "yes",
                    String(questionsJson.questions[currentQuestion].category)
                  )
                }
                className="bg-green-500 p-4 rounded-sm hover:bg-green-600 min-w-16"
              >
                Oui
              </button>
              <button
                onClick={() => nextQuestion("no", "")}
                className="bg-red-500 p-4 rounded-sm hover:bg-red-600 min-w-16"
              >
                Non
              </button>
            </div>
          </>
        ) : (
          <Results
            drugScore={drugScore}
            policeScore={policeScore}
            hygieneScore={hygieneScore}
            totalScore={score}
            maxScore={maxScore}
          ></Results>
        )}
      </div>
    </div>
  );
};

export default Questions;
