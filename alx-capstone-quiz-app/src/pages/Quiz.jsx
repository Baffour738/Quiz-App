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

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");
    const fetchQuestions = async () => {
      const buildUrl = (opts) => {
        const p = new URLSearchParams();
        p.set("amount", String(opts.amount));
        if (opts.category) p.set("category", String(opts.category));
        if (opts.difficulty) p.set("difficulty", String(opts.difficulty));
        p.set("type", "multiple");
        return `https://opentdb.com/api.php?${p.toString()}`;
      };

      const attempts = [
        { amount, category, difficulty },
        { amount, category, difficulty: "" },
        { amount, category: "", difficulty },
        { amount: Math.min(5, amount || 5), category: "", difficulty: "" },
      ];

      for (const opts of attempts) {
        try {
          const res = await fetch(buildUrl(opts));
          const data = await res.json();
          if (
            data && data.response_code === 0 && Array.isArray(data.results) && data.results.length > 0
          ) {
            if (!isMounted) return;
            setQuestions(data.results);
            setError("");
            return;
          }
        } catch (_) {
          // continue to next attempt
        }
      }

      if (!isMounted) return;
      setQuestions([]);
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
  }, [amount, category, difficulty]);

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

  return (
    <div className="flex flex-col items-center mt-10">
      {loading ? (
        <div className="text-gray-700">Loading questions...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : !isFinished ? (
        <QuestionCard
          questionIndex={currentIndex}
          totalQuestions={questions.length}
          data={questions[currentIndex]}
          onAnswer={onAnswer}
        />
      ) : (
        <ScoreSummary score={score} total={questions.length} answers={answers} />
      )}
    </div>
  );
};

export default Quiz;
