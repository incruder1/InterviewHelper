"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateInterview } from "@/hooks/useInterviews";

const AddNewInterview = () => {
  const [open, setOpen] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const { create, isLoading } = useCreateInterview();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const interview = await create({
        jobPosition,
        jobDesc,
        jobExperience: String(jobExperience),
      });
      setOpen(false);
      resetForm();
      router.push("/dashboard/interview/" + interview.mockId);
    } catch (error) {
      console.error("Failed to create interview:", error.message);
    }
  };

  const resetForm = () => {
    setJobPosition("");
    setJobDesc("");
    setJobExperience("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative w-full h-36 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden"
        style={{ background: "rgba(124,58,237,0.04)", borderColor: "rgba(124,58,237,0.25)", borderStyle: "dashed" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.08)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.04)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)"; }}
      >
        <div className="w-9 h-9 rounded-xl bg-violet-600/20 flex items-center justify-center group-hover:bg-violet-600/30 transition-colors">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </div>
        <span className="text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors">New Interview</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg border-0 p-0 overflow-hidden" style={{ background: "#13131f" }}>
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-white text-xl font-semibold">New mock interview</DialogTitle>
              <DialogDescription className="text-[#6b6b8a] text-sm mt-1">Tell us about the role you&apos;re preparing for</DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="space-y-5">
              <FormField label="Job role / position">
                <Input placeholder="e.g. Full Stack Developer" required value={jobPosition} onChange={(e) => setJobPosition(e.target.value)}
                  className="w-full rounded-xl text-white placeholder-[#4a4a6a] border-0 text-sm h-10 px-3" style={{ background: "#1e1e30", color: "white" }} />
              </FormField>
              <FormField label="Tech stack / description">
                <Textarea placeholder="e.g. React, Node.js, PostgreSQL, TypeScript" required value={jobDesc} onChange={(e) => setJobDesc(e.target.value)}
                  className="w-full rounded-xl text-white placeholder-[#4a4a6a] border-0 text-sm resize-none px-3 py-2.5" style={{ background: "#1e1e30", color: "white" }} rows={3} />
              </FormField>
              <FormField label="Years of experience">
                <Input placeholder="e.g. 3" max="50" type="number" required value={jobExperience} onChange={(e) => setJobExperience(e.target.value)}
                  className="w-full rounded-xl text-white placeholder-[#4a4a6a] border-0 text-sm h-10 px-3" style={{ background: "#1e1e30", color: "white" }} />
              </FormField>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)}
                  className="flex-1 h-10 rounded-xl text-sm font-medium text-[#7070a0] transition-colors hover:text-white hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Cancel</button>
                <button type="submit" disabled={isLoading}
                  className="flex-1 h-10 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
                  style={{ background: isLoading ? "#5b21b6" : "#7c3aed", boxShadow: "0 0 20px -6px rgba(124,58,237,0.7)" }}>
                  {isLoading ? (<><LoaderCircle className="animate-spin w-4 h-4" />Generating…</>) : "Start Interview"}
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#a0a0c0] mb-2">{label}</label>
      {children}
    </div>
  );
}

export default AddNewInterview;
