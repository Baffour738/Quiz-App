import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { getHistory, clearHistory } from "../lib/storage/history";

const History = () => {
  const items = getHistory();
  const stats = useMemo(() => {
    if (!items.length) return { avg: 0, best: 0 };
    const totals = items.map((i) => (i.total || i.amount || 0));
    const scores = items.map((i) => i.score || 0);
    const avg = Math.round((scores.reduce((a, b) => a + b, 0) / totals.reduce((a, b) => a + b, 0)) * 100) || 0;
    const best = Math.max(...scores.map((s, idx) => Math.round(((s / (totals[idx] || 1)) * 100))));
    return { avg, best };
  }, [items]);

  const onClear = () => {
    clearHistory();
    // Force a refresh by using location replace (simple approach)
    window.location.replace("/history");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Quiz History</h2>
          <div className="flex gap-2">
            <Link to="/" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition">Home</Link>
            <button onClick={onClear} className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition">Clear</button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600">Average Score</div>
            <div className="text-2xl font-semibold text-blue-700">{stats.avg}%</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600">Best Score</div>
            <div className="text-2xl font-semibold text-green-700">{stats.best}%</div>
          </div>
        </div>

        {!items.length ? (
          <div className="text-gray-700">No history yet. Take a quiz to see results here.</div>
        ) : (
          <div className="space-y-3">
            {items.map((it) => {
              const percent = it.total ? Math.round((it.score / it.total) * 100) : 0;
              return (
                <div key={it.id} className="border border-gray-200 rounded-lg p-3 flex items-center justify-between hover:bg-gray-50 transition">
                  <div>
                    <div className="font-medium text-gray-900">{new Date(it.timestamp || Date.now()).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">
                      Category: {it.categoryId ? `#${it.categoryId}` : "Any"} · Difficulty: {it.difficulty || "any"} · Amount: {it.amount}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{it.score}/{it.total}</div>
                    <div className="text-sm text-gray-600">{percent}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
