"use client";
import { useRouter } from "next/navigation";
import Badge from "@/components/common/Badge";
import GlowButton from "@/components/common/GlowButton";
import GhostButton from "@/components/common/GhostButton";
import DarkCard from "@/components/common/DarkCard";
import { useDispatch } from "react-redux";
import { deleteInterview } from "@/store/slices/interviewSlice";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const handleDelete = async (mockId) => {
    const token = await getToken();
    await dispatch(deleteInterview({ token, mockId })).unwrap().then(() => {
      toast.success("Interview deleted successfully");
    }).catch((error) => {
      toast.error(error.message);
      throw error;
    })
  };
  return (
    <DarkCard>
      <div className="flex items-center justify-between">
      <Badge variant="violet" className="mb-4">
        {interview?.jobPosition?.toUpperCase()}
      </Badge>
      <Badge variant="violet" className="mb-4 cursor-pointer" onClick={() => handleDelete(interview.mockId)}>X</Badge>
      </div>
      <p className="text-white/80 text-sm mb-1">{interview?.jobExperience} yrs experience</p>
      <p className="text-[#4a4a6a] text-xs mb-5">Created {interview?.createdAt}</p>

      <div className="flex gap-2">
        <GhostButton
          className="flex-1"
          onClick={() => router.push(`/dashboard/interview/${interview?.mockId}/feedback`)}
        >
          Feedback
        </GhostButton>
        <GlowButton
          className="flex-1"
          onClick={() => router.push(`/dashboard/interview/${interview?.mockId}`)}
        >
          Start →
        </GlowButton>
      </div>
    </DarkCard>
  );
};

export default InterviewItemCard;
