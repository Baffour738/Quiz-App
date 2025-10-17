import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import ScoreSummary from "../components/ScoreSummary";

const Quiz = () => {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <div className="flex flex-col items-center mt-10">
      {!isFinished ? (
        <QuestionCard onFinish={() => setIsFinished(true)} />
      ) : (
        <ScoreSummary />
      )}
    </div>
  );
};

export default Quiz;
