"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  const getPieChartBackground = () => {
    const drugEnd = percentage.drug;
    const policeEnd = drugEnd + percentage.police;
    const hygieneEnd = policeEnd + percentage.hygiene;
    const autreEnd = hygieneEnd + percentage.autre;
    return `conic-gradient(
      #DFFF00 0% ${drugEnd}%,
      #FFBF00 ${drugEnd}% ${policeEnd}%,
      #FF7F50 ${policeEnd}% ${hygieneEnd}%,
      #6AE64E ${hygieneEnd}% ${autreEnd}%,
      #fff ${autreEnd}% 100%
    )`;
  };

  useEffect(() => {
    setPercentage(calculatePercentages());
  }, [totalScore, drugScore, policeScore, hygieneScore]);

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-center font-semibold">
        Voici tes résultats
      </h1>
      <div
        className="rounded-full h-40 w-40 relative perspective-3d mx-auto"
        style={{
          background: getPieChartBackground(),
        }}
      ></div>
      <div className="flex flex-col justify-between mt-4 gap-4 items-center">
        <p>
          {" "}
          <span className="text-[#DFFF00]">Drogue</span>:{" "}
          {percentage.drug.toFixed(2)}% soit <b>{drugScore}</b> points
        </p>
        <p>
          {" "}
          <span className="text-[#FFBF00]">Police</span>:{" "}
          {percentage.police.toFixed(2)}% soit <b>{policeScore}</b> points
        </p>
        <p>
          <span className="text-[#FF7F50]">Hygiène</span>:{" "}
          {percentage.hygiene.toFixed(2)}% soit <b>{hygieneScore}</b> points
        </p>
        <p>
          <span className="text-[#6AE64E]">Autre</span>:{" "}
          {percentage.autre.toFixed(2)}% soit <b>{autreScore}</b> points
        </p>
        <p>
          Enfin ton score total est de{" "}
          <b>
            {totalScore} / {maxScore}
          </b>
        </p>

        <Link
          href={"/"}
          className="bg-green-500 p-4 rounded-sm text-center mt-8"
        >
          Refaire le test
        </Link>
      </div>
    </div>
  );
};

export default Results;
