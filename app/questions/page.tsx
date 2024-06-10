"use client";

import { useEffect, useState } from "react";
import Results from "../components/Results";
import fetchQuestions from "../utils/fetchQuestions";

const Questions = () => {
  interface Question {
    question: string;
    points: number;
    category: string;
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [drugScore, setDrugScore] = useState(0);
  const [policeScore, setPoliceScore] = useState(0);
  const [hygieneScore, setHygieneScore] = useState(0);
  const [autreScore, setAutreScore] = useState(0);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState({
    drug: 0,
    police: 0,
    hygiene: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions()
      .then((questions) => {
        setQuestions(questions);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const maxScore = questions.reduce(
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
        (prevScore) => prevScore + Number(questions[currentQuestion].points)
      );

      switch (category) {
        case "Drogue":
          setDrugScore(
            (prevScore) => prevScore + Number(questions[currentQuestion].points)
          );
          break;
        case "Police":
          setPoliceScore(
            (prevScore) => prevScore + Number(questions[currentQuestion].points)
          );
          break;
        case "Hygiene":
          setHygieneScore(
            (prevScore) => prevScore + Number(questions[currentQuestion].points)
          );
          break;
        case "Autre":
          setAutreScore(
            (prevScore) => prevScore + Number(questions[currentQuestion].points)
          );
          break;
      }
    }

    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(-1);
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="h-dvh w-screen md:mt-12 p-12 flex items-center flex-col md:h-full">
      <div className="h-1/2 w-full flex flex-col justify-center items-center gap-12">
        {currentQuestion !== -1 && questions.length > 0 ? (
          <>
            <h2 className="text-xl text-center">
              {questions[currentQuestion].category}
            </h2>
            <p className="text-center">{questions[currentQuestion].question}</p>
            <div className="flex gap-20">
              <button
                onClick={() =>
                  nextQuestion(
                    "yes",
                    String(questions[currentQuestion].category)
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
            autreScore={autreScore}
            totalScore={score}
            maxScore={maxScore}
          />
        )}
      </div>
    </div>
  );
};

export default Questions;
