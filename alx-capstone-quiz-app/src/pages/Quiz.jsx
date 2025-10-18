import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import ScoreSummary from "../components/ScoreSummary";
import { saveHistory } from "../lib/storage/history";

const Quiz = () => {
  const location = useLocation();
  const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const amount = Number(search.get("amount") || 10);
  const category = search.get("category") || "";
  const difficulty = search.get("difficulty") || "";

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); // {question, correct_answer, selected}
  const [isFinished, setIsFinished] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reloads, setReloads] = useState(0);
  const [attemptSummary, setAttemptSummary] = useState([]);
  const [autoRetried, setAutoRetried] = useState(false);
  const [globalRetries, setGlobalRetries] = useState(0);
  const [info, setInfo] = useState("");

  useEffect(() => {
    let isMounted = true;
    // Reset state on new selection or retry so a refresh is not required
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setIsFinished(false);
    setSaved(false);
    setAttemptSummary([]);
    setAutoRetried(false);
    setInfo("");
    setGlobalRetries(0);
    setLoading(true);
    setError("");
    const fetchQuestions = async () => {
      const buildUrl = (opts) => {
        const p = new URLSearchParams();
        p.set("amount", String(opts.amount));
        if (opts.category) p.set("category", String(opts.category));
        if (opts.difficulty) p.set("difficulty", String(opts.difficulty));
        p.set("type", "multiple");
        // cache-buster to avoid stale/cached responses
        p.set("cb", String(Date.now()));
        return `https://opentdb.com/api.php?${p.toString()}`;
      };

      const amounts = [amount || 10, Math.min(5, amount || 5), 3, 1];
      const attempts = [
        // exact
        { amount: amounts[0], category, difficulty },
        // relax one filter
        { amount: amounts[0], category, difficulty: "" },
        { amount: amounts[0], category: "", difficulty },
        // relax both and reduce amount progressively
        { amount: amounts[1], category: "", difficulty: "" },
        { amount: amounts[2], category: "", difficulty: "" },
        { amount: amounts[3], category: "", difficulty: "" },
      ];

      const tried = [];
      for (const opts of attempts) {
        try {
          const url = buildUrl(opts);
          tried.push({ ...opts, url });
          // Mini-retry for transient failures per attempt
          let data = null;
          let lastErr = null;
          for (let i = 0; i < 2; i++) {
            try {
              const res = await fetch(url, { cache: 'no-store' });
              data = await res.json();
              lastErr = null;
              break;
            } catch (e) {
              lastErr = e;
            }
          }
          if (
            data && data.response_code === 0 && Array.isArray(data.results) && data.results.length > 0
          ) {
            if (!isMounted) return;
            setQuestions(data.results);
            setError("");
            setAttemptSummary(tried);
            return;
          }
        } catch (_) {
          // continue to next attempt
        }
      }

      if (!isMounted) return;
      setQuestions([]);
      setAttemptSummary(tried);
      // Auto-trigger retries (up to 3 total cycles) to avoid requiring manual Retry on first load
      if (!autoRetried || globalRetries < 2) {
        setAutoRetried(true);
        setGlobalRetries((g) => g + 1);
        setReloads((n) => n + 1);
        return;
      }
      // Final fallback: fetch unfiltered so user sees questions immediately
      try {
        const finalUrl = buildUrl({ amount: Math.max(5, amount || 5), category: "", difficulty: "" });
        const res = await fetch(finalUrl, { cache: 'no-store' });
        const data = await res.json();
        if (data && data.response_code === 0 && Array.isArray(data.results) && data.results.length > 0) {
          if (!isMounted) return;
          setQuestions(data.results);
          setError("");
          setInfo("No questions matched your filters. Showing similar questions instead.");
          return;
        }
      } catch (_) {
        // ignore and show error below
      }
      setError(
        "No questions matched your selection. Try lowering the amount, removing difficulty/category, or choosing Any Category."
      );
    };

    fetchQuestions()
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [amount, category, difficulty, reloads]);

  const onAnswer = (isCorrect, record) => {
    setAnswers((prev) => [...prev, record]);
    if (isCorrect) setScore((s) => s + 1);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    if (isFinished && !saved) {
      // Persist a single history entry when completed
      try {
        saveHistory({
          timestamp: Date.now(),
          categoryId: category ? Number(category) : undefined,
          difficulty: difficulty || "",
          amount: amount || 0,
          total: questions.length || 0,
          score,
        });
      } catch {
        // ignore storage errors
      }
      setSaved(true);
    }
  }, [isFinished, saved, amount, category, difficulty, questions.length, score]);

  const isEffectivelyLoading = loading || (!error && !isFinished && questions.length === 0);

  return (
    <div className="flex flex-col items-center mt-10">
      {isEffectivelyLoading ? (
        <div className="text-gray-700">Loading questions...</div>
      ) : error ? (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm ring-1 ring-red-200 p-6">
          <div className="text-red-700 font-medium mb-2">{error}</div>
          {attemptSummary?.length ? (
            <div className="text-sm text-gray-600 mb-4">
              Attempts tried:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {attemptSummary.map((a, i) => (
                  <li key={i}>
                    amount {a.amount}{a.category ? ` · category ${a.category}` : ""}{a.difficulty ? ` · ${a.difficulty}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="flex justify-end">
            <button
              onClick={() => setReloads((n) => n + 1)}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition"
            >
              Retry
            </button>
          </div>
        </div>
      ) : !isFinished ? (
        <>
          {info ? (
            <div className="mb-4 w-full max-w-2xl text-sm text-blue-800 bg-blue-50 border border-blue-200 rounded-lg p-3">{info}</div>
          ) : null}
          <QuestionCard
          questionIndex={currentIndex}
          totalQuestions={questions.length}
          data={questions[currentIndex]}
          onAnswer={onAnswer}
          />
        </>
      ) : (
        <ScoreSummary score={score} total={questions.length} answers={answers} />
      )}
    </div>
  );
};

export default Quiz;
