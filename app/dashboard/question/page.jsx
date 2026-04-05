import React from "react";
import AddQuestions from "../_components/AddQuestions";
import QuestionList from "../_components/QuestionList";

const Questions = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white tracking-tight">Master Your Interviews</h1>
        <p className="text-[#6b6b8a] mt-1 text-sm">Comprehensive question preparation with AI</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <AddQuestions />
      </div>
      <QuestionList />
    </div>
  );
};

export default Questions;
