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
import { useCreateQuestion } from "@/hooks/useQuestions";

const FIELDS = [
  { key: "jobPosition", label: "Job role / position", placeholder: "e.g. Frontend Engineer" },
  { key: "jobDesc", label: "Tech stack / description", placeholder: "e.g. React, TypeScript, CSS", multiline: true },
  { key: "typeQuestion", label: "Type of questions", placeholder: "e.g. DSA, System Design, Behavioral" },
  { key: "company", label: "Target company", placeholder: "e.g. Google, Microsoft, Startup" },
  { key: "jobExperience", label: "Years of experience", placeholder: "e.g. 2", type: "number" },
];

const AddQuestions = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ jobPosition: "", jobDesc: "", typeQuestion: "", company: "", jobExperience: "" });
  const { create, isLoading } = useCreateQuestion();
  const router = useRouter();

  const handleChange = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const question = await create({ ...form, jobExperience: String(form.jobExperience) });
      setOpen(false);
      setForm({ jobPosition: "", jobDesc: "", typeQuestion: "", company: "", jobExperience: "" });
      router.push("/dashboard/pyq/" + question.mockId);
    } catch (error) {
      console.error("Failed to generate questions:", error.message);
    }
  };

  const inputStyle = { background: "#1e1e30", color: "white" };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative w-full h-36 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer"
        style={{ background: "rgba(59,130,246,0.04)", borderColor: "rgba(59,130,246,0.25)", borderStyle: "dashed" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.08)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.04)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.25)"; }}
      >
        <div className="w-9 h-9 rounded-xl bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </div>
        <span className="text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">New Question Set</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg border-0 p-0 overflow-hidden" style={{ background: "#13131f" }}>
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-white text-xl font-semibold">New question set</DialogTitle>
              <DialogDescription className="text-[#6b6b8a] text-sm mt-1">Generate tailored questions for your target role and company</DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="space-y-4">
              {FIELDS.map(({ key, label, placeholder, multiline, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-[#a0a0c0] mb-2">{label}</label>
                  {multiline ? (
                    <Textarea placeholder={placeholder} required value={form[key]} onChange={handleChange(key)}
                      className="w-full rounded-xl text-white placeholder-[#4a4a6a] border-0 text-sm resize-none px-3 py-2.5" style={inputStyle} rows={2} />
                  ) : (
                    <Input placeholder={placeholder} required value={form[key]} onChange={handleChange(key)}
                      type={type || "text"} max={type === "number" ? "50" : undefined}
                      className="w-full rounded-xl text-white placeholder-[#4a4a6a] border-0 text-sm h-10 px-3" style={inputStyle} />
                  )}
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)}
                  className="flex-1 h-10 rounded-xl text-sm font-medium text-[#7070a0] transition-colors hover:text-white hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Cancel</button>
                <button type="submit" disabled={isLoading}
                  className="flex-1 h-10 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
                  style={{ background: isLoading ? "#1d4ed8" : "#2563eb", boxShadow: "0 0 20px -6px rgba(37,99,235,0.7)" }}>
                  {isLoading ? (<><LoaderCircle className="animate-spin w-4 h-4" />Generating…</>) : "Generate Questions"}
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddQuestions;
