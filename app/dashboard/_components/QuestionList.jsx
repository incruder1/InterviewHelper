"use client";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import QuestionItemCard from "./QuestionItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { listQuestions } from "@/utils/api";

const QuestionList = () => {
  const { getToken } = useAuth();
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetQuestionList();
  }, []);

  const GetQuestionList = async () => {
    try {
      const token = await getToken();
      const result = await listQuestions(token);
      setQuestionList(result);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="my-10 flex flex-col gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full sm:w-[20rem] h-10 rounded-full animate-pulse bg-gray-300"
            />
          ))}
        </div>
      ) : questionList.length > 0 ? (
        <>
          <h2 className="font-medium text-xl">Previous Mock Interview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
            {questionList.map((question, index) => (
              <QuestionItemCard key={index} question={question} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center my-10 text-gray-500">
          <p>No questions found. Start by adding some mock interview questions!</p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
