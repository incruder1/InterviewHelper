"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { useContext } from 'react';
import { WebCamContext } from "../../layout";
import { toTitleCase } from "@/utils/utilities";
import { Spinner } from "@/components/ui/Spinner";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState();
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

    setInterviewData(result[0]);
    } catch (error) {
      console.log("Error fetching interview details:", error);
    }finally {
      setLoading(false); // Set loading to false after fetching data
    }
   
     
  };

  return (
    <div className="my-10">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner /> {/* Spinner component to indicate loading */}
        </div>
      ) : (
        <>
          <h2 className="font-bold text-2xl text-center">Let's Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col my-5 gap-5 justify-center">
              <div className="flex flex-col p-5 rounded-lg border gap-5">
                <h2 className="text-lg">
                  <strong>Job Role/Job Position: </strong>
                  {toTitleCase(interviewData?.jobPosition)}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description/Job Stack: </strong>
                  {toTitleCase(interviewData?.jobDesc)}
                </h2>
                <h2 className="text-lg">
                  <strong>Years of Experience: </strong>
                  {toTitleCase(interviewData?.jobExperience)}
                </h2>
              </div>
              <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                <h2 className="flex gap-2 items-center text-yellow-700 mb-2">
                  <Lightbulb />
                  <strong>Information</strong>
                </h2>
                <h2 className="mt-3 text-yellow-500">
                  {process.env.NEXT_PUBLIC_INFORMATION}
                </h2>
              </div>
            </div>
            <div>
              {webCamEnabled ? (
                <div className="flex items-center justify-center p-5">
                  <Webcam
                    onUserMedia={() => setWebCamEnabled(true)}
                    onUserMediaError={() => setWebCamEnabled(false)}
                    height={600}
                    width={600}
                    mirrored={true}
                  />
                </div>
              ) : (
                <div>
                  <WebcamIcon className="h-72 w-full my-6 p-20 bg-secondary rounded-lg border" />
                </div>
              )}
              <div className="flex w-full flex-wrap items-center justify-center gap-4">
                <Button
                  className="m-1 px-5 bg-slate-400 hover:bg-slate-600 dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900"
                  onClick={() => setWebCamEnabled((prev) => !prev)}
                >
                  {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
                </Button>
                <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
                  <Button className="m-1 px-5 bg-slate-400 hover:bg-slate-600 dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900">
                    Start Interview
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Interview;
