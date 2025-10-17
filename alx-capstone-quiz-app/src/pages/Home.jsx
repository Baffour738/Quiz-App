import React from "react";
import QuizStart from "../components/QuizStart";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Welcome to the Quiz App!</h1>
      <QuizStart />
    </div>
  );
};

export default Home;
