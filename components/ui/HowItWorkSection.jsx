import { STEPS } from "@/constants/landing";
import SectionDivider from "@/components/common/SectionDivider";
import SectionHeader from "@/components/common/SectionHeader";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-32 bg-[#050505] relative">
      <SectionDivider />

      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader tag="Process" title="How it works" subtitle="From setup to success in three simple steps" />

        <div className="space-y-4">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className="flex gap-6 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-7 transition-all duration-300 hover:bg-zinc-900/60"
            >
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-sm font-bold">{step.number}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.points.map((point, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-800/60 rounded-lg px-3 py-1.5">
                      <span className="w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0" />
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a href="/dashboard">
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-3.5 rounded-xl text-base font-medium transition-all duration-200 shadow-[0_0_30px_-8px_rgba(124,58,237,0.7)] hover:shadow-[0_0_40px_-8px_rgba(124,58,237,1)]">
              Start your first interview →
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
