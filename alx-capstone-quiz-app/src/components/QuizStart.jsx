import React from "react";
import { Link } from "react-router-dom";

const QuizStart = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-gray-700">Test your knowledge by starting the quiz.</p>
      <Link
        to="/quiz"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizStart;


