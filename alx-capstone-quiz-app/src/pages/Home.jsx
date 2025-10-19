import React from "react";
import QuizStart from "../components/QuizStart";

const Home = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Quiz App</h1>
      </div>
      <div className="flex justify-center">
        <QuizStart />
      </div>
    </div>
  );
};

export default Home;
