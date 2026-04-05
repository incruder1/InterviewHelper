"use client";
import React, { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";
import { useAnswers } from "@/hooks/useInterviews";
import GlowButton from "@/components/common/GlowButton";

const Feedback = ({ params }) => {
  const router = useRouter();
  const { answers, isLoading } = useAnswers(params.interviewId);

  const overallRating = useMemo(() => {
    if (!answers || answers.length === 0) return 0;
    const total = answers.reduce((sum, item) => sum + Number(item.rating), 0);
    return (total / answers.length).toFixed(1);
  }, [answers]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="w-16 h-16" color="border-t-violet-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {answers.length === 0 ? (
        <p className="text-[#6b6b8a] text-lg text-center py-16">No feedback recorded yet</p>
      ) : (
        <>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-emerald-400 mb-2">Congratulations!</h2>
            <p className="text-white text-lg mb-4">Here is your interview feedback</p>
            <div className="inline-flex items-center gap-2 rounded-2xl px-6 py-3" style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-[#6b6b8a] text-sm">Overall rating</span>
              <span className={`text-2xl font-bold ${Number(overallRating) >= 5 ? "text-emerald-400" : "text-red-400"}`}>
                {overallRating}
              </span>
              <span className="text-[#4a4a6a] text-lg">/10</span>
            </div>
          </div>

          <p className="text-[#6b6b8a] text-sm mb-6">Below are your answers with AI feedback for each question</p>

          <div className="space-y-3">
            {answers.map((item, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger
                  className="w-full p-4 text-left flex justify-between gap-4 rounded-2xl text-sm text-white font-medium"
                  style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {item.question}
                  <ChevronDown className="h-4 w-4 text-[#6b6b8a] flex-shrink-0" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2 mt-2">
                    <FeedbackRow label="Rating" value={item.rating} color="violet" />
                    <FeedbackRow label="Your Answer" value={item.userAns} color="red" />
                    <FeedbackRow label="Correct Answer" value={item.correctAns} color="green" />
                    <FeedbackRow label="Feedback" value={item.feedback} color="blue" />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </>
      )}

      <div className="mt-8">
        <GlowButton className="px-6 h-10" onClick={() => router.replace("/dashboard")}>
          Go Home
        </GlowButton>
      </div>
    </div>
  );
};

const COLOR_MAP = {
  violet: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.15)", text: "text-violet-300" },
  red: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.15)", text: "text-red-300" },
  green: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.15)", text: "text-emerald-300" },
  blue: { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.15)", text: "text-blue-300" },
};

function FeedbackRow({ label, value, color }) {
  const c = COLOR_MAP[color];
  return (
    <div className="rounded-xl p-3 text-sm" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <strong className={c.text}>{label}: </strong>
      <span className="text-zinc-300">{value}</span>
    </div>
  );
}

export default Feedback;
