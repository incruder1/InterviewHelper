"use client";
import React, { useState, useMemo } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import Link from "next/link";
import { Spinner } from "@/components/ui/Spinner";
import { useInterview } from "@/hooks/useInterviews";
import GlowButton from "@/components/common/GlowButton";
import GhostButton from "@/components/common/GhostButton";

const StartInterview = ({ params }) => {
  const { interview, isLoading } = useInterview(params.interviewId);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answerRecorded, setAnswerRecorded] = useState(false);
  const [recording, setRecording] = useState(false);

  const questions = useMemo(() => {
    if (!interview?.jsonMockResp) return null;
    try {
      return JSON.parse(interview.jsonMockResp);
    } catch {
      return null;
    }
  }, [interview]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64"><Spinner /></div>
        ) : (
          <QuestionSection mockInterviewQuestion={questions} activeQuestionIndex={activeQuestionIndex} />
        )}
        <RecordAnswerSection
          mockInterviewQuestion={questions}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interview}
          setAnswerRecorded={setAnswerRecorded}
          setRecording={setRecording}
        />
      </div>

      <div className="flex gap-3 mt-8 justify-end">
        {activeQuestionIndex > 0 && (
          <GhostButton className="px-5 h-10" onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)} disabled={recording}>
            Previous
          </GhostButton>
        )}
        {questions && activeQuestionIndex < questions.length - 1 && (
          <GlowButton className="px-5 h-10"
            onClick={() => { setActiveQuestionIndex(activeQuestionIndex + 1); setAnswerRecorded(false); }}
            disabled={answerRecorded || recording}>
            Next
          </GlowButton>
        )}
        {questions && activeQuestionIndex === questions.length - 1 && (
          <Link href={`/dashboard/interview/${interview?.mockId}/feedback`}>
            <GlowButton className="px-5 h-10" disabled={recording}>End Interview</GlowButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
