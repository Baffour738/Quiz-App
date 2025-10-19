import React, { useEffect, useMemo, useState } from "react";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const shuffle = (arr) => arr.map((v) => ({ v, r: Math.random() }))
  .sort((a, b) => a.r - b.r)
  .map(({ v }) => v);

const QuestionCard = ({ data, onAnswer, onPrevious, questionIndex, totalQuestions, selectedAnswer = "" }) => {
  const [selected, setSelected] = useState(selectedAnswer || "");
  const options = useMemo(() => {
    if (!data) return [];
    const all = [data.correct_answer, ...(data.incorrect_answers || [])];
    return shuffle(all);
  }, [data]);
  const progress = totalQuestions > 0 ? Math.round(((questionIndex + 1) / totalQuestions) * 100) : 0;

  useEffect(() => {
    setSelected(selectedAnswer || "");
  }, [selectedAnswer, questionIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data) return;
    const isCorrect = selected === data.correct_answer;
    onAnswer(Boolean(isCorrect), {
      question: data.question,
      correct_answer: data.correct_answer,
      selected,
      options,
    });
    setSelected("");
  };

  if (!data) return null;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Question {questionIndex + 1} of {totalQuestions}</h2>
          <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">{data.difficulty}</div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <p className="mb-6 text-gray-900 text-lg" dangerouslySetInnerHTML={{ __html: decodeHtml(data.question) }} />
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`w-full rounded-lg px-4 py-2 flex items-center gap-3 cursor-pointer transition shadow-sm hover:shadow ${selected === opt ? "ring-2 ring-blue-500 bg-blue-50" : "bg-white hover:bg-gray-50"}`}
          >
            <input
              className="h-4 w-4 text-blue-600 focus:ring-blue-600"
              type="radio"
              name="answer"
              value={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
            />
            <span className="text-gray-900" dangerouslySetInnerHTML={{ __html: decodeHtml(opt) }} />
          </label>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevious}
          disabled={questionIndex === 0}
          className="inline-flex items-center justify-center bg-gray-600 disabled:opacity-60 hover:bg-gray-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 transition"
        >
          Previous
        </button>
        <button
          type="submit"
          disabled={!selected}
          className="inline-flex items-center justify-center bg-green-600 disabled:opacity-60 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition"
        >
          {questionIndex + 1 === totalQuestions ? "Finish" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default QuestionCard;


