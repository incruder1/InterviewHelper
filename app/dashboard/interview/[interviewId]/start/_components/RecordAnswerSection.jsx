"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { WebCamContext } from "@/app/dashboard/layout";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq, and } from "drizzle-orm";
const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
  setAnswerRecorded,
  setRecording,

}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const startRecording = async () => {
    try {
      setRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Error starting recording. Please check your microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // setRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Convert audio blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];

        const result = await model.generateContent([
          "Transcribe the following audio:",
          { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
        ]);

        const transcription = result.response.text();
        setUserAnswer((prevAnswer) => prevAnswer + " " + transcription);
        setLoading(false);
      };
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast.error("Error transcribing audio. Please try again.");
      setLoading(false);
    }
  };

  const updateUserAnswer = async () => {
    try {
      setLoading(true);
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.Question +
        ", User Answer:" +
        userAnswer +
        " , Depends on question and user answer for given interview question" +
        " please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      let MockJsonResp = result.response.text();
      // console.log(MockJsonResp);

      // Removing possible extra text around JSON
      MockJsonResp = MockJsonResp.replace("```json", "").replace("```", "");

      // Attempt to parse JSON
      let jsonFeedbackResp;
      try {
        jsonFeedbackResp = JSON.parse(MockJsonResp);
      } catch (e) {
        throw new Error("Invalid JSON response: " + MockJsonResp);
      }
      // console.log("mockId:", interviewData?.mockId);
      // console.log("question:", mockInterviewQuestion[activeQuestionIndex]?.Question);

      const existingUserAnswer = await db
    .select()
    .from(UserAnswer)
    .where(
        and(
            eq(UserAnswer.mockIdRef, interviewData?.mockId ?? null), // Use null as a fallback
            eq(UserAnswer.question, mockInterviewQuestion[activeQuestionIndex]?.Question ?? '') // Use empty string as a fallback
        )
    )
    .limit(1);
    // console.log(existingUserAnswer);
      // Use the first row if it exists
      // const userAnswer = existingUserAnswer[0] || null;

      // console.log("Existing user answer:", existingUserAnswer);
      let resp;
      if(existingUserAnswer.length>0){
          resp = await db.update(UserAnswer).set({
          userAns: userAnswer,
          feedback: jsonFeedbackResp?.feedback,
          rating: jsonFeedbackResp?.rating,
        }).where(
          and(
              eq(UserAnswer.mockIdRef, interviewData?.mockId ?? null), // Use null as a fallback
              eq(UserAnswer.question, mockInterviewQuestion[activeQuestionIndex]?.Question ?? '') // Use empty string as a fallback
          )
      );
      }
      else {
          resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.Question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
          userAns: userAnswer,
          feedback: jsonFeedbackResp?.feedback,
          rating: jsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        });
      }
      // console.log(resp);

      // const resp = await db.insert(UserAnswer).values({
      //   mockIdRef: interviewData?.mockId,
      //   question: mockInterviewQuestion[activeQuestionIndex]?.Question,
      //   correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
      //   userAns: userAnswer,
      //   feedback: jsonFeedbackResp?.feedback,
      //   rating: jsonFeedbackResp?.rating,
      //   userEmail: user?.primaryEmailAddress?.emailAddress,
      //   createdAt: moment().format("YYYY-MM-DD"),
      // });

      if (resp) {
        toast.success("User Answer recorded successfully");
        setAnswerRecorded(false);
        setRecording(false);
      }
      setUserAnswer("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while recording the user answer");
      setLoading(false);
      setAnswerRecorded(false);
      setRecording(false);
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col justify-center items-center rounded-lg p-2 bg-slate-100   ">
        {webCamEnabled ? (
          <Webcam
            mirrored={true}
            style={{ height: 400, width: "100%", zIndex: 10 }}
          />
        ) : (
          <Image src={"/camera.jpg"} width={200} height={200} alt="Camera placeholder" />
        )}
      </div>
      <div className="md:flex mt-4 md:mt-8 md:gap-5 w-full justify-center items-center sm:flex sm:gap-4 ">
        <div className="my-4 md:my-0">
          <Button onClick={() => setWebCamEnabled((prev) => !prev)}
            className="bg-slate-400 hover:bg-slate-600  dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900">
            {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
          </Button>
        </div>
        <div className="bg-primary rounded-lg">
          <Button
            // variant="outline"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={loading}
            className="bg-slate-400 hover:bg-slate-600  dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900"
          >
            {isRecording ? (
              <h2 className="text-red-400 flex gap-2 ">
                <Mic /> Stop Recording.
              </h2>
            ) : (
              " Record Answer"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordAnswerSection;
