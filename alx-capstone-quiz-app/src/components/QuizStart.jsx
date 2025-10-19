import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultForm = { category: "", amount: 10, difficulty: "medium" };

const QuizStart = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(defaultForm);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch("https://opentdb.com/api_category.php")
      .then((r) => r.json())
      .then((data) => {
        if (!isMounted) return;
        setCategories(Array.isArray(data.trivia_categories) ? data.trivia_categories : []);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Failed to load categories. Try again.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, query]);

  const canStart = useMemo(() => {
    return Number(form.amount) > 0 && (!loading || categories.length > 0);
  }, [form.amount, loading, categories]);

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("amount", String(form.amount));
    if (form.category) params.set("category", String(form.category));
    if (form.difficulty) params.set("difficulty", String(form.difficulty));
    params.set("type", "multiple");
    navigate(`/quiz?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-1 text-gray-900">Configure Your Quiz</h2>
      <p className="text-gray-600 mb-4">Choose a topic, difficulty and number of questions.</p>
      {error ? (
        <div className="mb-4 text-red-600">{error}</div>
      ) : null}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics..."
            className="w-full rounded-md px-3 py-2 mb-2 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {filtered.length === 0 ? (
            <div className="text-sm text-gray-600">No topics match your search.</div>
          ) : (
            <select
              className="w-full rounded-md px-3 py-2 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              <option value="">Any Category</option>
              {filtered.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Difficulty</label>
            <select
              className="w-full rounded-md px-3 py-2 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={form.difficulty}
              onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Number of Questions</label>
            <input
              type="number"
              min={1}
              max={50}
              className="w-full rounded-md px-3 py-2 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value || 0) }))}
            />
            </div>
        </div>
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={!canStart}
            className="inline-flex items-center justify-center bg-blue-600 disabled:opacity-60 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition no-underline"
          >
            {loading ? "Loading..." : "Start Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizStart;


