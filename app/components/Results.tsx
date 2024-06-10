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
        <p className="text-center font-bold mt-8">
          Tu es un <span className="text-green-500">jeune teufeur</span>,
          persévère !
        </p>
      );
    }
    if (percentage < 50) {
      return (
        <p className="text-center font-bold mt-8">
          Tu es un{" "}
          <span className="text-orange-400">teufeur en apprentisage</span>, tu
          es sur la bonne voie !
        </p>
      );
    }
    if (percentage < 75) {
      return (
        <p className="text-center font-bold mt-8">
          Tu es un{" "}
          <span className="text-orange-600">teufeur confirm&eacute;</span>, les
          caissons n&apos;ont plus de secret pour toi !
        </p>
      );
    }
    return (
      <p className="text-center font-bold mt-8">
        Tu es un <span className="text-red-500">teufeur expert</span>, elle est
        où la kééééé ?!
      </p>
    );
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-center font-semibold mt-8">
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
