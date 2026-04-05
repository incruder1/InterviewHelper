"use client";
import { Volume2 } from "lucide-react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };

  if (!mockInterviewQuestion) return null;

  return (
    <div className="rounded-2xl p-6" style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Question tabs */}
      <div className="hidden md:flex flex-wrap gap-2 mb-6">
        {mockInterviewQuestion.map((_, index) => (
          <div
            key={index}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200 ${
              activeQuestionIndex === index
                ? "text-white"
                : "text-zinc-500 hover:text-white"
            }`}
            style={{
              background: activeQuestionIndex === index ? "#7c3aed" : "rgba(255,255,255,0.05)",
              boxShadow: activeQuestionIndex === index ? "0 0 15px -4px rgba(124,58,237,0.7)" : "none",
            }}
          >
            Q{index + 1}
          </div>
        ))}
      </div>

      <p className="text-white text-base md:text-lg leading-relaxed mb-5">
        {mockInterviewQuestion[activeQuestionIndex]?.Question}
      </p>

      <button
        onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)}
        className="flex items-center gap-2 text-[#6b6b8a] hover:text-violet-400 transition-colors text-sm"
      >
        <Volume2 className="w-4 h-4" />
        Read aloud
      </button>

      {process.env.NEXT_PUBLIC_QUESTION_NOTE && (
        <div className="mt-6 rounded-xl p-4 hidden md:block" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}>
          <p className="text-violet-300 text-xs font-semibold uppercase tracking-wider mb-1">Note</p>
          <p className="text-violet-400/80 text-sm leading-relaxed">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionSection;
