import React from "react";
import { Link } from "react-router-dom";

const ScoreSummary = () => {
  return (
    <div className="w-full max-w-xl bg-white rounded shadow p-6 text-center">
      <h2 className="text-2xl font-semibold mb-2">Quiz Complete</h2>
      <p className="text-gray-700 mb-6">Thanks for taking the quiz. More features coming soon!</p>
      <div className="flex gap-3 justify-center">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
        >
          Back to Home
        </Link>
        <Link
          to="/quiz"
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded"
        >
          Retake Quiz
        </Link>
      </div>
    </div>
  );
};

export default ScoreSummary;


