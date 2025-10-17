import React, { useMemo, useState } from "react";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const shuffle = (arr) => arr.map((v) => ({ v, r: Math.random() }))
  .sort((a, b) => a.r - b.r)
  .map(({ v }) => v);

const QuestionCard = ({ data, onAnswer, questionIndex, totalQuestions }) => {
  const [selected, setSelected] = useState("");
  const options = useMemo(() => {
    if (!data) return [];
    const all = [data.correct_answer, ...(data.incorrect_answers || [])];
    return shuffle(all);
  }, [data]);

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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded shadow p-6">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xl font-semibold">Question {questionIndex + 1} of {totalQuestions}</h2>
        <span className="text-sm text-gray-600 capitalize">{data.difficulty}</span>
      </div>
      <p className="mb-6 text-gray-900" dangerouslySetInnerHTML={{ __html: decodeHtml(data.question) }} />
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className={`w-full border rounded px-4 py-2 flex items-center gap-3 cursor-pointer ${selected === opt ? "border-blue-600 bg-blue-50" : ""}`}>
            <input
              type="radio"
              name="answer"
              value={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
            />
            <span dangerouslySetInnerHTML={{ __html: decodeHtml(opt) }} />
          </label>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={!selected}
          className="bg-green-600 disabled:opacity-60 hover:bg-green-700 text-white font-medium px-4 py-2 rounded"
        >
          {questionIndex + 1 === totalQuestions ? "Finish" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default QuestionCard;


