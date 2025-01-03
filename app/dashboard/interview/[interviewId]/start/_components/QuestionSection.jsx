 
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";
import { Spinner } from "@/components/ui/Spinner";


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
  return (
    mockInterviewQuestion && (
      <div className=" flex flex-col justify-between p-5 border rounded-lg my-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                className={`p-2  rounded-full text-center text-xs md:text-sm cursor-pointer md:block hidden ${
                  activeQuestionIndex == index
                    ? "bg-slate-600 text-white"
                    : "dark:bg-slate-800 dark:font-white bg-slate-100  "
                }`}
                key={index}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.Question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)
          }
        />
        <div className="border rounded-lg p-5 bg-blue-100 mt-18 md:block hidden">
          <h2 className="flex gap-2 items-center text-blue-800">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-600 my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
