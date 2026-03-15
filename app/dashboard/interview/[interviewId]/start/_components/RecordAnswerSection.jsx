"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { WebCamContext } from "@/app/dashboard/layout";
import { upsertAnswer } from "@/utils/api";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
  setAnswerRecorded,
  setRecording,
}) => {
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const { getToken } = useAuth();
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      setRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        await submitAnswer(audioBlob);
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
    }
  };

  const submitAnswer = async (audioBlob) => {
    setLoading(true);
    try {
      // Convert audio blob → base64 and send to the Go backend.
      // The backend handles transcription + AI feedback + DB upsert in one call.
      const base64Audio = await blobToBase64(audioBlob);
      const token = await getToken();

      const currentQuestion = mockInterviewQuestion[activeQuestionIndex];

      await upsertAnswer(token, interviewData?.mockId, {
        question: currentQuestion?.Question,
        correctAns: currentQuestion?.Answer,
        audioBase64: base64Audio,
        audioMimeType: "audio/webm",
      });

      toast.success("Answer recorded successfully");
      setAnswerRecorded(false);
      setRecording(false);
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("An error occurred while recording the answer. Please try again.");
      setAnswerRecorded(false);
      setRecording(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col justify-center items-center rounded-lg p-2 bg-slate-100">
        {webCamEnabled ? (
          <Webcam
            mirrored={true}
            style={{ height: 400, width: "100%", zIndex: 10 }}
          />
        ) : (
          <Image src={"/camera.jpg"} width={200} height={200} alt="Camera placeholder" />
        )}
      </div>
      <div className="md:flex mt-4 md:mt-8 md:gap-5 w-full justify-center items-center sm:flex sm:gap-4">
        <div className="my-4 md:my-0">
          <Button
            onClick={() => setWebCamEnabled((prev) => !prev)}
            className="bg-slate-400 hover:bg-slate-600 dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900"
          >
            {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
          </Button>
        </div>
        <div className="bg-primary rounded-lg">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={loading}
            className="bg-slate-400 hover:bg-slate-600 dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900"
          >
            {isRecording ? (
              <h2 className="text-red-400 flex gap-2">
                <Mic /> Stop Recording.
              </h2>
            ) : loading ? (
              "Processing…"
            ) : (
              "Record Answer"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ── helpers ───────────────────────────────────────────────────────────────────

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Strip the data-URL prefix ("data:audio/webm;base64,")
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default RecordAnswerSection;
