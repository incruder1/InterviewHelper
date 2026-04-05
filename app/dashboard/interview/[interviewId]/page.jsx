"use client";
import React, { useContext } from "react";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import Link from "next/link";
import { WebCamContext } from "../../layout";
import { toTitleCase } from "@/utils/utilities";
import { Spinner } from "@/components/ui/Spinner";
import { useInterview } from "@/hooks/useInterviews";
import GlowButton from "@/components/common/GlowButton";
import GhostButton from "@/components/common/GhostButton";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const { interview, isLoading } = useInterview(params.interviewId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-white text-center mb-8">Let&apos;s Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left — details */}
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl p-6" style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}>
            <InfoRow label="Job Position" value={toTitleCase(interview?.jobPosition)} />
            <InfoRow label="Tech Stack" value={toTitleCase(interview?.jobDesc)} />
            <InfoRow label="Experience" value={`${interview?.jobExperience} years`} />
          </div>
          <div className="rounded-2xl p-5" style={{ background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)" }}>
            <h2 className="flex gap-2 items-center text-amber-400 mb-2 text-sm font-semibold">
              <Lightbulb className="w-4 h-4" />Information
            </h2>
            <p className="text-amber-400/70 text-sm leading-relaxed">{process.env.NEXT_PUBLIC_INFORMATION}</p>
          </div>
        </div>

        {/* Right — webcam */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-2xl overflow-hidden mb-4" style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}>
            {webCamEnabled ? (
              <Webcam onUserMedia={() => setWebCamEnabled(true)} onUserMediaError={() => setWebCamEnabled(false)} height={400} width="100%" mirrored />
            ) : (
              <div className="flex items-center justify-center h-64">
                <WebcamIcon className="w-20 h-20 text-[#3a3a5a]" />
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <GhostButton className="px-5 h-10" onClick={() => setWebCamEnabled((prev) => !prev)}>
              {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
            </GhostButton>
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
              <GlowButton className="px-5 h-10">Start Interview</GlowButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function InfoRow({ label, value }) {
  return (
    <div className="py-3 border-b last:border-b-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
      <span className="text-[#6b6b8a] text-xs uppercase tracking-wider">{label}</span>
      <p className="text-white text-sm mt-1">{value}</p>
    </div>
  );
}

export default Interview;
