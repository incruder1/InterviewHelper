"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState } from "react";
import { useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/ui/Spinner";


const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answerRecorded, setAnswerRecorded] = useState(false);
  const [recording, setRecording] = useState(false); // New state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      setLoading(true);
      const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
    } catch (error) {
      console.log("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
   
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10">
      {loading?(
              <div className="flex justify-center items-center h-64">
                <Spinner /> {/* Spinner component to indicate loading */}
              </div>
            ):
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
      }
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          setAnswerRecorded={setAnswerRecorded}
          setRecording={setRecording} // Pass recording state handler
        />
      </div>
      <div className="flex gap-3 my-5 md:my-0 md:justify-end md:gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            disabled={recording} // Disable while recording
            className="bg-slate-400 hover:bg-slate-600  dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900"
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => {
              setActiveQuestionIndex(activeQuestionIndex + 1);
              setAnswerRecorded(false); // Reset the recording status
            }}
            disabled={ answerRecorded || recording}  
            className="bg-slate-400 hover:bg-slate-600  dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900"
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button disabled={recording} className="bg-slate-400 hover:bg-slate-600  dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900">End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};


export default StartInterview;
