import React from "react";
import { Link } from "react-router-dom";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const ScoreSummary = ({ score = 0, total = 0, answers = [] }) => {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  return (
    <div className="w-full max-w-3xl bg-white rounded shadow p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Quiz Complete</h2>
        <p className="text-gray-700">You scored <span className="font-semibold">{score}</span> out of {total} ({percent}%).</p>
      </div>
      <div className="space-y-3 mb-6">
        {answers.map((a, idx) => {
          const correct = a.selected === a.correct_answer;
          return (
            <div key={idx} className={`border rounded p-3 ${correct ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
              <div className="font-medium mb-1" dangerouslySetInnerHTML={{ __html: decodeHtml(a.question) }} />
              <div className="text-sm">Your answer: <span className="font-medium" dangerouslySetInnerHTML={{ __html: decodeHtml(a.selected || "—") }} /></div>
              {!correct && (
                <div className="text-sm">Correct answer: <span className="font-medium" dangerouslySetInnerHTML={{ __html: decodeHtml(a.correct_answer) }} /></div>
              )}
            </div>
          );
        })}
      </div>
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


