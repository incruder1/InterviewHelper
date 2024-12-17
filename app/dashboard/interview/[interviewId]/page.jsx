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
import {toTitleCase} from "@/utils/utilities";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState();
  // const [webCamEnabled, setWebCamEnebled] = useState(false);
  useEffect(() => {
    // console.log(params.interviewId);
    GetInterviewDetails();
  }, []);
  
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
      
    setInterviewData(result[0]);
  };
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl text-center">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <div className="flex flex-col my-5 gap-5">
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
            <div className=" flex items-center justify-center p-5">
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                height={400}
                width={400}
                mirrored={true}
              />
            </div>
          ) : (
            <div>
              <WebcamIcon className="h-72 w-full my-6 p-20 bg-secondary rounded-lg border" />
            </div>
          )}
          <div className="flex w-full items-center justify-center">
            <Button
              className={`${webCamEnabled ? "w-[30%]" : "w-[30%]"} m-1 bg-slate-400 hover:bg-slate-600  dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900`}
              onClick={() => setWebCamEnabled((prev) => !prev)}
            >
              {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
            </Button>
            <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button className="w-full m-1 bg-slate-400 hover:bg-slate-600  dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900">  Start Interview</Button>
          </Link>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center my-4 md:my-0 md:justify-end md:items-end">
      
      </div> */}
    </div>
  );
};

export default Interview;
