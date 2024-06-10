"use client";
import Link from "next/link";
import { useState } from "react";

const Results = ({
  drugScore,
  policeScore,
  hygieneScore,
  autreScore,
  totalScore,
  maxScore,
}: {
  drugScore: number;
  policeScore: number;
  hygieneScore: number;
  autreScore: number;
  totalScore: number;
  maxScore: number;
}) => {
  const [percentage, setPercentage] = useState({
    drug: 0,
    police: 0,
    hygiene: 0,
    autre: 0,
  });

  const calculatePercentages = () => {
    if (totalScore === 0) return { drug: 0, police: 0, hygiene: 0, autre: 0 };
    return {
      drug: (drugScore / totalScore) * 100,
      police: (policeScore / totalScore) * 100,
      hygiene: (hygieneScore / totalScore) * 100,
      autre: (autreScore / totalScore) * 100,
    };
  };

  const sayScore = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;

    if (percentage < 25) {
      return (
        <span className="text-green-500">
          Tu es un petit teufeur persévère !
        </span>
      );
    }
    if (percentage < 50) {
      return (
        <span className="text-orange-400">
          Tu es un teufeur moyen, tu es sur la bonne voie !
        </span>
      );
    }
    if (percentage < 75) {
      return (
        <span className="text-red-500">
          Tu es un teufeur confirmé bien joué !
        </span>
      );
    }
    return (
      <span className="text-red-700">
        Tu es un teufeur expert, elle est où la kééééé ?!
      </span>
    );
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-center font-semibold">
        Voici tes résultats
      </h1>

      <p>
        Tu as obtenu un score de{" "}
        <b>
          {totalScore} / {maxScore}
        </b>
        <br />
        {sayScore(totalScore, maxScore)}
      </p>

      <Link href={"/"} className="bg-green-500 p-4 rounded-sm text-center mt-8">
        Refaire le test
      </Link>
    </div>
  );
};

export default Results;
