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
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Quiz History</h2>
        <div className="flex gap-2">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded">Home</Link>
          <button onClick={onClear} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded">Clear</button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="border rounded p-4">
          <div className="text-sm text-gray-600">Average Score</div>
          <div className="text-2xl font-semibold">{stats.avg}%</div>
        </div>
        <div className="border rounded p-4">
          <div className="text-sm text-gray-600">Best Score</div>
          <div className="text-2xl font-semibold">{stats.best}%</div>
        </div>
      </div>

      {!items.length ? (
        <div className="text-gray-700">No history yet. Take a quiz to see results here.</div>
      ) : (
        <div className="space-y-3">
          {items.map((it) => {
            const percent = it.total ? Math.round((it.score / it.total) * 100) : 0;
            return (
              <div key={it.id} className="border rounded p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{new Date(it.timestamp || Date.now()).toLocaleString()}</div>
                  <div className="text-sm text-gray-600">
                    Category: {it.categoryId ? `#${it.categoryId}` : "Any"} · Difficulty: {it.difficulty || "any"} · Amount: {it.amount}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{it.score}/{it.total}</div>
                  <div className="text-sm text-gray-600">{percent}%</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
