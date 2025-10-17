import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import ScoreSummary from "../components/ScoreSummary";

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

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    params.set("amount", String(amount));
    if (category) params.set("category", String(category));
    if (difficulty) params.set("difficulty", String(difficulty));
    params.set("type", "multiple");
    fetch(`https://opentdb.com/api.php?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (!isMounted) return;
        if (!data || data.response_code !== 0 || !Array.isArray(data.results) || data.results.length === 0) {
          setError("No questions available for your selection. Try different settings.");
          setQuestions([]);
          return;
        }
        setQuestions(data.results);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Failed to fetch questions. Check your connection and try again.");
      })
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
