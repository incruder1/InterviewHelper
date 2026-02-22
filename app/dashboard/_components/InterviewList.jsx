"use client";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { Spinner } from "@/components/ui/Spinner";
import { listInterviews } from "@/utils/api";

const InterviewList = () => {
  const { getToken } = useAuth();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewList();
  }, []);

  const GetInterviewList = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const result = await listInterviews(token);
      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interview list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : interviewList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
        </div>
      ) : (
        <p className="text-red-600 text-lg">No Previous interviews found.</p>
      )}
    </div>
  );
};

export default InterviewList;
