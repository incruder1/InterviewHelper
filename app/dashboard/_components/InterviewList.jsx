"use client";
import { useInterviewList } from "@/hooks/useInterviews";
import InterviewItemCard from "./InterviewItemCard";
import LoadingGrid from "@/components/common/LoadingGrid";
import EmptyState from "@/components/common/EmptyState";

const InterviewList = () => {
  const { list, isLoading } = useInterviewList();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-white">Previous Mock Interviews</h2>
        {!isLoading && list.length > 0 && (
          <span className="text-xs text-[#6b6b8a]">
            {list.length} session{list.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {isLoading ? (
        <LoadingGrid />
      ) : list.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((interview, index) => (
            <InterviewItemCard key={interview.mockId ?? index} interview={interview} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={
            <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          message="No interviews yet — start your first one above"
        />
      )}
    </div>
  );
};

export default InterviewList;
