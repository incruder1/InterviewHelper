"use client";
import { useRouter } from "next/navigation";
import Badge from "@/components/common/Badge";
import GlowButton from "@/components/common/GlowButton";
import DarkCard from "@/components/common/DarkCard";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();

  return (
    <DarkCard hoverBorder="rgba(59,130,246,0.3)">
      <Badge variant="blue" className="mb-4">
        {question?.jobPosition}
      </Badge>

      <p className="text-white/80 text-sm mb-1">{question?.jobExperience} yrs experience</p>
      <p className="text-[#4a4a6a] text-xs mb-5">Created {question?.createdAt}</p>

      <GlowButton
        variant="blue"
        className="w-full"
        onClick={() => router.push(`/dashboard/pyq/${question?.mockId}`)}
      >
        Start →
      </GlowButton>
    </DarkCard>
  );
};

export default QuestionItemCard;
