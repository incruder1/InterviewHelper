"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toTitleCase } from "@/utils/utilities";

const AddNewInterview = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `
  Job Positions: ${jobPosition}, 
  Job Description: ${jobDesc}, 
  Years of Experience: ${jobExperience}. 
  Based on this information, please provide 5 interview questions with answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.
`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();
    // console.log(JSON.parse(MockJsonResp));
    // const parsedResp = MockJsonResp
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ mockId: MockInterview.mockId });

      // console.log("Inserted ID:", resp);

      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    } else {
      console.log("ERROR");
    }
    setLoading(false);
  };
  const header = "Add Details about your job position, job descritpion and years of experience";

  return (
    <div>
      <div
        className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-sm transition-all cursor-pointer bg-slate-300
        dark:bg-transparent dark:hover:bg-gray-700"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl bg-slate-200 dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviwing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <h2>
                    {toTitleCase(header)}
                  </h2>

                  <div className="mt-4 mb-3">
                    <label className="text-black dark:text-white text-base">Job Role/job Position</label>
                    <Input
                      className="mt-1 rounded-xl"
                      placeholder="Ex. Full stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-5">
                    <label className="text-black dark:text-white text-base ">
                      Job Description/ Tech stack ( In Short seperated by ' , ' )
                    </label>
                    <Textarea
                      className="placeholder-opacity-50 rounded-xl"
                      placeholder="Ex. React, Angular, Nodejs, Mysql, Nosql, Python"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-5">
                    <label className="text-black dark:text-white text-base">Years of Experience</label>
                    <Input
                      className="mt-1 rounded-xl"
                      placeholder="Ex. 5"
                      max="50"
                      type="number"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    className="bg-slate-400 hover:bg-slate-600  dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900"
                    // variant="goast"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="bg-slate-400 hover:bg-slate-600  dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900 ">
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating From AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
