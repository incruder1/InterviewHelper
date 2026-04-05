"use client";
import { useQuestionList } from "@/hooks/useQuestions";
import QuestionItemCard from "./QuestionItemCard";
import LoadingGrid from "@/components/common/LoadingGrid";
import EmptyState from "@/components/common/EmptyState";

const QuestionList = () => {
  const { list, isLoading } = useQuestionList();

  return (
    <div>
      {isLoading ? (
        <LoadingGrid />
      ) : list.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">Previous Question Sets</h2>
            <span className="text-xs text-[#6b6b8a]">
              {list.length} set{list.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((question, index) => (
              <QuestionItemCard key={question.mockId ?? index} question={question} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          message="No question sets yet — add your first one above"
        />
      )}
    </div>
  );
};

export default QuestionList;
