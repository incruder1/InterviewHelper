"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "../../../components/ui/Spinner"; // Assuming you have a spinner component for loading


const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));

      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interview list:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>

      {loading ? (
        <div className="flex justify-center items-center ">
          <Spinner /> {/* Spinner component to indicate loading */}
        </div>
      ) : interviewList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
        </div>
      ) : (
        <p className="text-red-600 text-lg  ">No Previous interviews found.</p>
      )}
    </div>
  );
};

export default InterviewList;
