"use client";
import Image from "next/image";
import React, { useContext, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { WebCamContext } from "@/app/dashboard/layout";
import { useSubmitAnswer } from "@/hooks/useInterviews";
import GlowButton from "@/components/common/GlowButton";
import GhostButton from "@/components/common/GhostButton";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
  setAnswerRecorded,
  setRecording,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const { submit, isLoading } = useSubmitAnswer();
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
      toast.error("Microphone error. Check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const submitAnswer = async (audioBlob) => {
    try {
      const base64Audio = await blobToBase64(audioBlob);
      const currentQuestion = mockInterviewQuestion[activeQuestionIndex];
      await submit(interviewData?.mockId, {
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
      toast.error("An error occurred. Please try again.");
      setAnswerRecorded(false);
      setRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="w-full rounded-2xl overflow-hidden mb-4"
        style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {webCamEnabled ? (
          <Webcam mirrored style={{ height: 300, width: "100%", objectFit: "cover" }} />
        ) : (
          <div className="flex items-center justify-center h-64">
            <Image src="/camera.jpg" width={150} height={150} alt="Camera" className="opacity-40" />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <GhostButton className="px-4 h-10" onClick={() => setWebCamEnabled((prev) => !prev)}>
          {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
        </GhostButton>
        <GlowButton
          className="px-4 h-10 flex items-center gap-2"
          variant={isRecording ? "blue" : "violet"}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading}
        >
          {isRecording ? (
            <><Mic className="w-4 h-4 text-red-400" />Stop Recording</>
          ) : isLoading ? "Processing…" : "Record Answer"}
        </GlowButton>
      </div>
    </div>
  );
};

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default RecordAnswerSection;
