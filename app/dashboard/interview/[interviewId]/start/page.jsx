"use client";
import React, { useState, useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@clerk/nextjs";
import { getInterview } from "@/utils/api";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answerRecorded, setAnswerRecorded] = useState(false);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const result = await getInterview(token, params.interviewId);
      setMockInterviewQuestion(JSON.parse(result.jsonMockResp));
      setInterviewData(result);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <QuestionSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
          />
        )}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          setAnswerRecorded={setAnswerRecorded}
          setRecording={setRecording}
        />
      </div>
      <div className="flex gap-3 my-5 md:my-0 md:justify-end md:gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            disabled={recording}
            className="bg-slate-400 hover:bg-slate-600 dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900"
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => {
              setActiveQuestionIndex(activeQuestionIndex + 1);
              setAnswerRecorded(false);
            }}
            disabled={answerRecorded || recording}
            className="bg-slate-400 hover:bg-slate-600 dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900"
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}>
            <Button
              disabled={recording}
              className="bg-slate-400 hover:bg-slate-600 dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900"
            >
              End Interview
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
