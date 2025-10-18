import React from "react";
import QuizStart from "../components/QuizStart";

const Home = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">Test Your Knowledge</h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600">Choose a topic and difficulty to begin. Questions are sourced from the Open Trivia Database.</p>
      </div>
      <div className="flex justify-center">
        <QuizStart />
      </div>
    </div>
  );
};

export default Home;
