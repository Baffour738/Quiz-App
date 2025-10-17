import React from "react";

const QuestionCard = ({ onFinish }) => {
  return (
    <div className="w-full max-w-xl bg-white rounded shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Sample Question</h2>
      <p className="mb-6 text-gray-700">This is a placeholder question. Choose any option.</p>
      <div className="space-y-2">
        <button className="w-full text-left border rounded px-4 py-2">Option A</button>
        <button className="w-full text-left border rounded px-4 py-2">Option B</button>
        <button className="w-full text-left border rounded px-4 py-2">Option C</button>
        <button className="w-full text-left border rounded px-4 py-2">Option D</button>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onFinish}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;


