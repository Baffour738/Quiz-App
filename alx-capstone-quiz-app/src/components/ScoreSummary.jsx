import React from "react";
import { Link } from "react-router-dom";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const ScoreSummary = ({ score = 0, total = 0, answers = [], onRetake }) => {
  const btnStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    border: "1px solid #6b7280",
    borderRadius: 6,
    background: "#f8f8f8",
    color: "#111827",
    textDecoration: "none",
    fontWeight: 500,
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    cursor: "pointer",
  };
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Quiz Complete</h2>
        <p className="text-gray-600">You scored <span className="font-semibold text-gray-900">{score}</span> out of {total} ({percent}%).</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600">Correct</div>
          <div className="text-2xl font-semibold text-green-700">{score}</div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600">Accuracy</div>
          <div className="text-2xl font-semibold text-blue-700">{percent}%</div>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        {answers.map((a, idx) => {
          const correct = a.selected === a.correct_answer;
          return (
            <div key={idx} className={`border rounded-lg p-3 ${correct ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}>
              <div className="font-medium mb-1 text-gray-900" dangerouslySetInnerHTML={{ __html: decodeHtml(a.question) }} />
              <div className="text-sm text-gray-800">Your answer: <span className="font-medium" dangerouslySetInnerHTML={{ __html: decodeHtml(a.selected || "—") }} /></div>
              {!correct && (
                <div className="text-sm text-gray-800">Correct answer: <span className="font-medium" dangerouslySetInnerHTML={{ __html: decodeHtml(a.correct_answer) }} /></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center" style={{ gap: 24 }}>
        <Link to="/" style={{ ...btnStyle, marginRight: 24 }}>
          Back to Home
        </Link>
        {onRetake ? (
          <button type="button" onClick={onRetake} style={btnStyle}>
            Retake Quiz
          </button>
        ) : (
          <Link to="/quiz" style={btnStyle}>
            Retake Quiz
          </Link>
        )}
      </div>
    </div>
  );
};

export default ScoreSummary;


